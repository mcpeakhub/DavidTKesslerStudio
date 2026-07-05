import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Painting } from "@david/shared";
import { getPaintings } from "../services/api";
import { galleries } from "../config/galleries";
import { site } from "../config/site";
import PageTransition from "../components/PageTransition";
import ArtworkImage from "../components/ArtworkImage";
import GalleryPreviewCard from "../components/GalleryPreviewCard";

export default function Home() {
	const [paintings, setPaintings] = useState<Painting[]>([]);

	useEffect(() => {
		getPaintings().then(setPaintings);
	}, []);

	const featured =
		paintings.find((painting) => painting.featured) ?? paintings[0];

	return (
		<PageTransition>
			<div className="space-y-20">
				{featured && (
					<section className="mx-auto max-w-6xl text-center">
						<Link
							to={`/painting/${featured.id}`}
							className="group block"
						>
							<div className="overflow-hidden rounded-xl bg-gray-100 shadow-sm dark:bg-zinc-900">
								<ArtworkImage
									painting={featured}
									loading="eager"
									className="block max-h-[78vh] w-full object-contain transition duration-700 group-hover:scale-[1.01]"
								/>
							</div>
						</Link>
					</section>
				)}

				<section className="mx-auto max-w-4xl pb-0 text-center">
					<p className="text-sm uppercase tracking-[0.35em] text-gray-400 dark:text-zinc-500">
						Contemporary Water Paintings
					</p>

					<h1 className="mt-4 text-5xl font-light tracking-wide text-gray-900 dark:text-zinc-100 md:text-7xl">
						{site.artist}
					</h1>

					<p className="mx-auto mt-5 max-w-3xl text-xl font-light tracking-wide text-gray-700 dark:text-zinc-300">
						Contemporary Realist Painter
					</p>

					<p className="mx-auto mt-5 max-w-2xl leading-8 text-gray-600 dark:text-zinc-400">
						{site.tagline}
					</p>

					<Link
						to="/gallery/0"
						className="mt-10 inline-flex items-center rounded-md border border-gray-300 px-8 py-3 text-sm font-medium tracking-wide text-gray-700 transition-all duration-200 hover:border-black hover:bg-black hover:text-white dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-white dark:hover:bg-white dark:hover:text-zinc-950"
					>
						View Paintings →
					</Link>
				</section>

				<section className="border-t border-gray-200 pt-12 dark:border-zinc-800">
					<h2 className="mb-8 text-3xl font-light tracking-wide text-gray-900 dark:text-zinc-100">
						Galleries
					</h2>

					<div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
						{galleries.map((gallery) => {
							const galleryPaintings =
								gallery.id === 0
									? paintings
											.filter(
												(painting) =>
													painting.dateAdded,
											)
											.sort(
												(a, b) =>
													new Date(
														b.dateAdded ?? "",
													).getTime() -
													new Date(
														a.dateAdded ?? "",
													).getTime(),
											)
											.slice(0, 12)
									: paintings.filter(
											(painting) =>
												painting.gallery === gallery.id,
										);

							return (
								<GalleryPreviewCard
									key={gallery.id}
									title={gallery.title}
									path={`/gallery/${gallery.id}`}
									paintings={galleryPaintings}
								/>
							);
						})}
					</div>
				</section>
			</div>
		</PageTransition>
	);
}
