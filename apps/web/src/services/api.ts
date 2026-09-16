import type { Painting } from "@david/shared";

type PaintingModule = {
	default: Omit<Painting, "gallery"> & {
		gallery?: number;
	};
};

type StatusOverrides = Record<string, boolean>;

const modules = import.meta.glob<PaintingModule>(
	"../../../../content/galleries/gallery*/*.json",
	{ eager: true },
);

function loadPaintings(): Painting[] {
	return Object.entries(modules).map(([path, module]) => {
		const match = path.match(/gallery(\d+)/);

		const galleryFromFolder = match
			? Number(match[1])
			: module.default.gallery;

		if (galleryFromFolder === undefined) {
			throw new Error(
				`Unable to determine gallery number for ${path}`,
			);
		}

		return {
			...module.default,
			gallery: galleryFromFolder,
			image:
				module.default.image ??
				`/images/gallery${galleryFromFolder}/${module.default.originalImage}`,
		} as Painting;
	});
}

const paintings = loadPaintings();

/*
 * Retrieve live Sold/Available overrides from the Netlify Function.
 *
 * If the function is unavailable for any reason, the site falls back
 * to the sold value stored in each painting's JSON file.
 */
async function getStatusOverrides(): Promise<StatusOverrides> {
	try {
		const response = await fetch("/api/painting-status");

		if (!response.ok) {
			console.warn(
				"Painting status service unavailable. Using JSON statuses.",
			);
			return {};
		}

		const contentType = response.headers.get("content-type");

		if (!contentType?.includes("application/json")) {
			console.warn(
				"Painting status service returned a non-JSON response. Using JSON statuses.",
			);
			return {};
		}

		return (await response.json()) as StatusOverrides;
	} catch (error) {
		console.warn(
			"Unable to retrieve painting status overrides. Using JSON statuses.",
			error,
		);

		return {};
	}
}

/*
 * Apply live Sold/Available overrides to the static painting data.
 *
 * An override takes precedence over the sold value in the JSON file.
 */
async function getPaintingsWithStatuses(): Promise<Painting[]> {
	const statusOverrides = await getStatusOverrides();

	return paintings.map((painting) => ({
		...painting,
		sold:
			statusOverrides[painting.id] ??
			painting.sold ??
			false,
	}));
}

export const getPaintings = async (): Promise<Painting[]> => {
	return getPaintingsWithStatuses();
};

export const getPainting = async (
	id: string,
): Promise<Painting | undefined> => {
	const paintingsWithStatuses =
		await getPaintingsWithStatuses();

	return paintingsWithStatuses.find(
		(painting) => painting.id === id,
	);
};

export const getGallery = async (
	gallery: number,
): Promise<Painting[]> => {
	const paintingsWithStatuses =
		await getPaintingsWithStatuses();

	return paintingsWithStatuses.filter(
		(painting) => painting.gallery === gallery,
	);
};