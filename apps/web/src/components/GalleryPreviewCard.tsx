import { Link } from "react-router-dom";
import type { Painting } from "@david/shared";
import ArtworkImage from "./ArtworkImage";

type GalleryPreviewCardProps = {
	title: string;
	path: string;
	paintings: Painting[];
};

export default function GalleryPreviewCard({
	title,
	path,
	paintings,
}: GalleryPreviewCardProps) {
	const cover = paintings[0];

	return (
		<Link to={path} className="group block">
			<div className="overflow-hidden rounded-lg bg-gray-100 shadow-sm dark:bg-zinc-900">
				{cover ? (
					<ArtworkImage
						painting={cover}
						className="block h-64 w-full object-cover transition duration-700 group-hover:scale-[1.03]"
					/>
				) : (
					<div className="flex h-64 items-center justify-center text-sm text-gray-400 dark:text-zinc-500">
						No paintings yet
					</div>
				)}
			</div>

			<div className="mt-4 border-t border-gray-200 pt-4 dark:border-zinc-800">
				<h3 className="text-2xl font-light tracking-wide text-gray-900 dark:text-zinc-100">
					{title}
				</h3>

				<p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">
					{paintings.length}{" "}
					{paintings.length === 1 ? "painting" : "paintings"}
				</p>
			</div>
		</Link>
	);
}
