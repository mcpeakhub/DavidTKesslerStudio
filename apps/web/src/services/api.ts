import type { Painting } from "@david/shared";

type PaintingModule = {
	default: Painting;
};

const modules = import.meta.glob<PaintingModule>(
	"../../../../content/galleries/gallery*/*.json",
	{
		eager: true,
	},
);

function loadPaintings(): Painting[] {
	return Object.entries(modules).map(([path, module]) => {
		const galleryMatch = path.match(/gallery(\d+)/);
		const gallery = galleryMatch ? Number(galleryMatch[1]) : 0;

		const painting = module.default;

		return {
			...painting,
			gallery,
			image:
				painting.image ??
				`/images/gallery${gallery}/${painting.id}.jpg`,
		};
	});
}

const paintings = loadPaintings();

export const getPaintings = async (): Promise<Painting[]> => {
	return paintings;
};

export const getPainting = async (id: string): Promise<Painting> => {
	const painting = paintings.find((painting) => painting.id === id);

	if (!painting) {
		throw new Error(`Painting not found: ${id}`);
	}

	return painting;
};

export const getGallery = async (id: number): Promise<Painting[]> => {
	return paintings.filter((painting) => painting.gallery === id);
};





// import axios from "axios";
// import type { Painting } from "@david/shared";

// const api = axios.create({
// 	baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3001/api",
// });

// export const getPaintings = async (): Promise<Painting[]> => {
// 	const res = await api.get("/paintings");
// 	return res.data;
// };

// export const getPainting = async (id: string): Promise<Painting> => {
// 	const res = await api.get(`/paintings/${id}`);
// 	return res.data;
// };

// export const getGallery = async (id: number): Promise<Painting[]> => {
// 	const res = await api.get(`/galleries/${id}`);
// 	return res.data;
// };
