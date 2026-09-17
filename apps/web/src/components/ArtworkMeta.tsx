import { Link } from "react-router-dom";
import type { Painting } from "@david/shared";
import { galleries } from "../config/galleries";

type ArtworkMetaProps = {
	painting: Painting;
	previousPainting?: Painting | null;
	nextPainting?: Painting | null;
	centered?: boolean;
};

export default function ArtworkMeta({
	painting,
	previousPainting = null,
	nextPainting = null,
	centered = false,
}: ArtworkMetaProps) {
	const currentGallery = galleries.find(
		(gallery) => gallery.id === painting.gallery,
	);

	return (
		<section className={`space-y-5 ${centered ? "text-center" : ""}`}>
			<div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
				<div className="text-left">
					{previousPainting && (
						<Link
							to={`/painting/${previousPainting.id}`}
							className="text-sm text-gray-500 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white"
						>
							← Previous
						</Link>
					)}
				</div>

				<div className="text-center">
					<h1 className="text-4xl font-light tracking-wide text-gray-900 dark:text-zinc-100 md:text-5xl">
						{painting.title}
					</h1>

					<p className="mt-3 text-sm uppercase tracking-[0.2em] text-gray-500 dark:text-zinc-400">
						{painting.medium}
						{painting.dimensions ? ` · ${painting.dimensions}` : ""}
						{painting.sold
							? ""
							: painting.showIsAvailable
								? " · available"
								: ""}
					</p>

					<Link
						to={`/gallery/${painting.gallery}`}
						className="mt-3 inline-block text-sm text-gray-500 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white"
					>
						← Return to {currentGallery?.title ?? `Gallery ${painting.gallery}`}
					</Link>
				</div>

				<div className="text-right">
					{nextPainting && (
						<Link
							to={`/painting/${nextPainting.id}`}
							className="text-sm text-gray-500 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white"
						>
							Next →
						</Link>
					)}
				</div>
			</div>

			{painting.sold && (
				<div className="inline-block rounded border border-gray-300 px-3 py-1 text-xs uppercase tracking-widest text-gray-500 dark:border-zinc-700 dark:text-zinc-400">
					{painting.soldLabel ?? "Sold"}
				</div>
			)}

			{painting.description && (
				<p
					className={`leading-8 text-gray-700 dark:text-zinc-300 ${
						centered ? "text-center" : ""
					}`}
				>
					{painting.description} 
				</p>
			)}
		</section>
	);
}