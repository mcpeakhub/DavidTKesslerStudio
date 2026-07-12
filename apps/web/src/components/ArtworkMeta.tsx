import type { Painting } from "@david/shared";

type ArtworkMetaProps = {
	painting: Painting;
	centered?: boolean;
};

export default function ArtworkMeta({
	painting,
	centered = false,
}: ArtworkMetaProps) {
	return (
		<section className={`space-y-5 ${centered ? "text-center" : ""}`}>
			<h1 className="text-4xl font-light tracking-wide text-gray-900 dark:text-zinc-100 md:text-5xl">
				{painting.title}
			</h1>

			<p className="text-sm uppercase tracking-[0.2em] text-gray-500 dark:text-zinc-400">
				{painting.medium}
				{painting.dimensions ? ` · ${painting.dimensions}` : ""}
				{!painting.sold ? " · available" : ""}
			</p>

			{painting.sold && (
				<div className="inline-block rounded border border-gray-300 px-3 py-1 text-xs uppercase tracking-widest text-gray-500 dark:border-zinc-700 dark:text-zinc-400">
					{painting.soldLabel ?? "Sold"}
				</div>
			)}

			{painting.description && (
				<p
					className={`leading-8 text-gray-700 dark:text-zinc-300 ${
						centered ? "mx-auto max-w-3xl text-left" : ""
					}`}
				>
					{painting.description}
				</p>
			)}
		</section>
	);
}
