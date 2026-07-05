import { Link } from "react-router-dom";
import type { Painting } from "@david/shared";
import ArtworkImage from "./ArtworkImage";

type ArtworkCardProps = {
	painting: Painting;
};

export default function ArtworkCard({ painting }: ArtworkCardProps) {
	return (
		<Link to={`/painting/${painting.id}`} className="group block">
			<div className="relative overflow-hidden rounded-lg bg-gray-100 shadow-sm dark:bg-zinc-900 dark:shadow-zinc-950">
				<ArtworkImage
					painting={painting}
					loading="eager"
					className="block h-auto w-full transition duration-700 group-hover:scale-[1.02]"
				/>

				{painting.sold && (
					<div className="absolute right-4 top-4 rounded bg-white/90 px-3 py-1 text-xs uppercase tracking-widest text-gray-600 shadow-sm dark:bg-zinc-950/90 dark:text-zinc-300">
						{painting.soldLabel ?? "Sold"}
					</div>
				)}
			</div>

			<div className="mt-4 border-t border-gray-200 pt-4 dark:border-zinc-800">
				<h2 className="text-2xl font-light text-gray-900 dark:text-zinc-100">
					{painting.title}
				</h2>

				<p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">
					{painting.medium}
					{painting.dimensions ? ` · ${painting.dimensions}` : ""}
					{painting.year ? ` · ${painting.year}` : ""}
				</p>
			</div>
		</Link>
	);
}
