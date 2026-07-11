import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Painting } from "@david/shared";
import { getGallery } from "../services/api";
import { galleries } from "../config/galleries";
import PageTransition from "../components/PageTransition";
import ArtworkCard from "../components/ArtworkCard";

export default function Gallery() {
	const { id } = useParams();
	const [paintings, setPaintings] = useState<Painting[]>([]);

	const galleryId = Number(id);
	const currentGallery = galleries.find(
		(gallery) => gallery.id === galleryId,
	);
	const title = currentGallery?.title ?? `Gallery ${id}`;

	useEffect(() => {
		if (id) {
			getGallery(Number(id)).then(setPaintings);
		}
	}, [id]);

	return (
		<PageTransition>
			<div className="space-y-16">
				<header className="text-center space-y-3">
					<p className="text-sm uppercase tracking-[0.3em] text-gray-400 dark:text-zinc-500">
						David T. Kessler
					</p>

					<h1 className="mt-3 text-5xl font-light tracking-wide text-gray-900 dark:text-zinc-100">
						{galleryId === 7 ? " Corporate" : title}
					</h1>

					<p className="mx-auto mt-6 max-w-3xl leading-8 text-gray-600 dark:text-zinc-300">
						{galleryId === 1
							? "David’s newest water-inspired paintings."
							: "Water-inspired contemporary paintings exploring reflection, movement, atmosphere, and light."}
					</p>
				</header>

				{paintings.length === 0 ? (
					<p className="mt-4 max-w-3xl leading-8 text-gray-600 dark:text-zinc-300">
						No paintings have been added to this gallery yet.
					</p>
				) : (
					//<div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:gap-16">
					<div
						className={
							galleryId === 7
								? "galleryCorporate"
								: "grid grid-cols-1 gap-12 md:grid-cols-2 xl:gap-16llery"
						}
					>
						{paintings.map((painting) => (
							<ArtworkCard
								key={painting.id}
								painting={painting}
								galleryId={galleryId}
							/>
						))}{" "}
					</div>
				)}
			</div>
		</PageTransition>
	);
}
