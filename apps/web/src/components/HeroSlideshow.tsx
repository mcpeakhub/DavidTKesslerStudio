import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Painting } from "@david/shared";
import ArtworkImage from "./ArtworkImage";
import { AnimatePresence, motion } from "framer-motion";

type HeroSlideshowProps = {
	paintings: Painting[];
	intervalMs?: number;
};

export default function HeroSlideshow({
	paintings,
	intervalMs = 5000,
}: HeroSlideshowProps) {
	const availablePaintings = useMemo(
		() => paintings.filter((painting) => !painting.sold),
		[paintings],
	);

	const [currentIndex, setCurrentIndex] = useState(() => {
		const savedIndex = sessionStorage.getItem("heroSlideshowIndex");
		return savedIndex ? Number(savedIndex) : 0;
	});
	const [paused, setPaused] = useState(false);
	const [pageVisible, setPageVisible] = useState(true);

	useEffect(() => {
		const handleVisibilityChange = () => {
			setPageVisible(!document.hidden);
		};

		document.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			document.removeEventListener(
				"visibilitychange",
				handleVisibilityChange,
			);
		};
	}, []);

	const safeIndex =
		availablePaintings.length === 0
			? 0
			: currentIndex % availablePaintings.length;

	useEffect(() => {
		sessionStorage.setItem("heroSlideshowIndex", String(safeIndex));
	}, [safeIndex]);

	useEffect(() => {
		const shouldRun =
			pageVisible && !paused && availablePaintings.length > 1;

		if (!shouldRun) {
			return;
		}

		const timer = window.setInterval(() => {
			setCurrentIndex((index) => (index + 1) % availablePaintings.length);
		}, intervalMs);

		return () => window.clearInterval(timer);
	}, [pageVisible, paused, intervalMs, availablePaintings.length]);

	if (availablePaintings.length === 0) {
		return (
			<div className="flex min-h-[420px] items-center justify-center rounded-xl bg-gray-100 text-gray-500 dark:bg-zinc-900 dark:text-zinc-400">
				No available paintings to display.
			</div>
		);
	}

	const currentPainting = availablePaintings[safeIndex];

	const showPrevious = () => {
		setCurrentIndex((index) =>
			index === 0 ? availablePaintings.length - 1 : index - 1,
		);
	};

	const showNext = () => {
		setCurrentIndex((index) => (index + 1) % availablePaintings.length);
	};

	return (
		<section
			className="relative mx-auto max-w-6xl"
			onMouseEnter={() => setPaused(true)}
			onMouseLeave={() => setPaused(false)}
			aria-label="Available paintings slideshow"
		>
			<div className="relative h-[68vh] min-h-[420px] overflow-hidden rounded-xl bg-zinc-900">
				// slideshow
				<AnimatePresence initial={false}>
					<motion.div
						key={currentPainting.id}
						className="absolute inset-0"
						initial={{ opacity: 0, scale: 1.0 }}
						animate={{ opacity: 1, scale: 1.02 }}
						exit={{ opacity: 0, scale: 1.04 }}
						transition={{
							duration: 1.4,
							ease: [0.4, 0, 0.2, 1],
						}}
					>
						<Link
							to={`/painting/${currentPainting.id}`}
							className="block"
							aria-label={`View ${currentPainting.title}`}
						>
							<ArtworkImage
								painting={currentPainting}
								loading="eager"
								className="block h-[68vh] min-h-[420px] w-full object-contain"
							/>
						</Link>
					</motion.div>
				</AnimatePresence>
				{availablePaintings.length > 1 && (
					<>
						<button
							type="button"
							onClick={showPrevious}
							aria-label="Previous painting"
							className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/45 p-3 text-white backdrop-blur-sm transition hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white"
						>
							<ChevronLeft size={24} />
						</button>

						<button
							type="button"
							onClick={showNext}
							aria-label="Next painting"
							className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/45 p-3 text-white backdrop-blur-sm transition hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white"
						>
							<ChevronRight size={24} />
						</button>
					</>
				)}
			</div>

			<div className="mt-5 text-center">
				<h2 className="text-2xl font-light tracking-wide text-gray-900 dark:text-zinc-100">
					{currentPainting.title}
				</h2>

				<p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">
					{currentPainting.medium}
					{currentPainting.dimensions
						? ` · ${currentPainting.dimensions}`
						: ""}
					{currentPainting.year ? ` · ${currentPainting.year}` : ""}
				</p>
			</div>

			{availablePaintings.length > 1 && (
				<div className="mt-5 flex justify-center gap-2">
					{availablePaintings.map((painting, index) => (
						<button
							key={painting.id}
							type="button"
							onClick={() => setCurrentIndex(index)}
							aria-label={`Show ${painting.title}`}
							aria-current={
								index === safeIndex ? "true" : undefined
							}
							className={`h-2.5 w-2.5 rounded-full transition ${
								index === safeIndex
									? "bg-gray-900 dark:bg-white"
									: "bg-gray-300 hover:bg-gray-500 dark:bg-zinc-700 dark:hover:bg-zinc-500"
							}`}
						/>
					))}
				</div>
			)}
		</section>
	);
}
