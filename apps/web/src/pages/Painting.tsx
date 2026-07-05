import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Painting as PaintingType } from "@david/shared";
import { getGallery, getPainting } from "../services/api";
import { galleries } from "../config/galleries";
import PageTransition from "../components/PageTransition";
import ArtworkImage from "../components/ArtworkImage";
import ArtworkMeta from "../components/ArtworkMeta";

export default function Painting() {
	const { id } = useParams();

	const [painting, setPainting] = useState<PaintingType | null>(null);
	const [galleryPaintings, setGalleryPaintings] = useState<PaintingType[]>(
		[],
	);
	const [isLightboxOpen, setIsLightboxOpen] = useState(false);

	useEffect(() => {
		if (!id) return;

		let cancelled = false;

		async function loadPainting() {
			const data = await getPainting(id!);
			const galleryItems = await getGallery(data.gallery);

			if (!cancelled) {
				setPainting(data);
				setGalleryPaintings(galleryItems);
			}
		}

		loadPainting();

		return () => {
			cancelled = true;
		};
	}, [id]);

	if (!painting) {
		return (
			<div className="py-20 text-center text-gray-500 dark:text-zinc-400">
				Loading painting...
			</div>
		);
	}

	const currentIndex = galleryPaintings.findIndex(
		(item) => item.id === painting.id,
	);

	const previousPainting =
		currentIndex > 0 ? galleryPaintings[currentIndex - 1] : null;

	const nextPainting =
		currentIndex >= 0 && currentIndex < galleryPaintings.length - 1
			? galleryPaintings[currentIndex + 1]
			: null;

	const currentGallery = galleries.find(
		(gallery) => gallery.id === painting.gallery,
	);

	return (
		<PageTransition>
			<div className="mx-auto max-w-5xl space-y-10">
				<div
					className="cursor-zoom-in overflow-hidden rounded-lg bg-gray-100 shadow-lg dark:bg-zinc-900 dark:shadow-zinc-950"
					onClick={() => setIsLightboxOpen(true)}
				>
					<ArtworkImage
						painting={painting}
						loading="eager"
						className="block max-h-[82vh] w-full max-w-full object-contain"
					/>
				</div>

				<section className="mx-auto max-w-3xl">
					<ArtworkMeta painting={painting} centered />
				</section>

				<nav className="grid grid-cols-3 items-start gap-4 border-t border-gray-200 pt-8 text-sm dark:border-zinc-800">
					<div>
						{previousPainting && (
							<Link
								to={`/painting/${previousPainting.id}`}
								className="text-gray-500 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white"
							>
								← Previous
								<span className="mt-1 block text-gray-900 dark:text-zinc-100">
									{previousPainting.title}
								</span>
							</Link>
						)}
					</div>

					<div className="text-center">
						<Link
							to={`/gallery/${painting.gallery}`}
							className="text-gray-500 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white"
						>
							{currentGallery?.title ??
								`Gallery ${painting.gallery}`}
						</Link>
					</div>

					<div className="text-right">
						{nextPainting && (
							<Link
								to={`/painting/${nextPainting.id}`}
								className="text-gray-500 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white"
							>
								Next →
								<span className="mt-1 block text-gray-900 dark:text-zinc-100">
									{nextPainting.title}
								</span>
							</Link>
						)}
					</div>
				</nav>

				{isLightboxOpen && (
					<div
						style={{
							position: "fixed",
							inset: 0,
							zIndex: 9999,
							backgroundColor: "rgba(20, 20, 20, 0.72)",
							backdropFilter: "blur(3px)",
							WebkitBackdropFilter: "blur(3px)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							padding: "24px",
							cursor: "zoom-out",
							transition: "opacity 500ms ease",
						}}
						onClick={() => setIsLightboxOpen(false)}
					>
						<button
							onClick={(e) => {
								e.stopPropagation();
								setIsLightboxOpen(false);
							}}
							aria-label="Close"
							style={{
								position: "absolute",
								top: "20px",
								right: "24px",
								width: "42px",
								height: "42px",
								borderRadius: "9999px",
								border: "none",
								background: "rgba(255,255,255,0.12)",
								color: "white",
								fontSize: "28px",
								lineHeight: "42px",
								cursor: "pointer",
								transition: "background-color 0.2s ease",
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.background =
									"rgba(255,255,255,0.22)";
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.background =
									"rgba(255,255,255,0.12)";
							}}
						>
							×
						</button>
						<img
							src={painting.image}
							alt={painting.title}
							style={{
								width: "96vw",
								height: "94vh",
								objectFit: "contain",
							}}
						/>
					</div>
				)}
			</div>
		</PageTransition>
	);
}
