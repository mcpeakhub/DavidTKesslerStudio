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

console.log("Paintings in Gallery component:", paintings);

	return (
		<PageTransition>
			<div className="space-y-16">
				<header className="text-center space-y-3">
					<p className="text-sm uppercase tracking-[0.3em] text-gray-400 dark:text-zinc-500">
						David T. Kessler
					</p>

					<h1 className="mt-3 text-5xl font-light tracking-wide text-gray-900 dark:text-zinc-100">
						{galleryId === 7 ? "Public Commissions" : title}
					</h1>

					<p className="mx-auto mt-6 max-w-3xl leading-8 text-gray-600 dark:text-zinc-300">
						{galleryId === 0 ? "In my current paintings, I incorporate mylar to further explore the concept of hybridization. In the water paintings, for example, I manipulate the mylar to mimic patterns and movement within the water. Similar to the abraded aluminum areas, portions of the mylar are left untouched to define the image, while others are enhanced with transparent or opaque layers of paint." 
						: "Water-inspired contemporary paintings exploring reflection, movement, atmosphere, and light."}
					</p>
				</header>

				{paintings.length === 0 ? (
					<p className="mt-4 max-w-3xl leading-8 text-gray-600 dark:text-zinc-300">
						No paintings have been added to this gallery yet.
					</p>
						) : galleryId === 11 ? (
							<div className="space-y-12">
								{/* Main painting */}
								<div className="mx-auto max-w-3xl">
									{paintings
										.filter((painting) => !painting.id.toLowerCase().includes("detail"))
										.map((painting) => (
											<ArtworkCard
												key={painting.id}
												painting={painting}
												galleryId={galleryId}
											/>
										))}
								</div>

								{/* Detail images */}
								<div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:gap-16">
									{paintings
										.filter((painting) => painting.id.toLowerCase().includes("detail"))
										.map((painting) => (
											<ArtworkCard
												key={painting.id}
												painting={painting}
												galleryId={galleryId}
											/>
										))}
								</div>
							</div>
						) : (
							<div
								className={
									galleryId === 7
										? "galleryCorporate"
										: "grid grid-cols-1 gap-12 md:grid-cols-2 xl:gap-16"
								}
							>
								{paintings.map((painting) => (
									<ArtworkCard
										key={painting.id}
										painting={painting}
										galleryId={galleryId}
									/>
								))}
							</div>
						)}
			</div>
		</PageTransition>
	);
}
