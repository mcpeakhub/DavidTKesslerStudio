import PageTransition from "../components/PageTransition";

export default function PaintingOnMetal() {
	return (
		<PageTransition>
			<div className="mx-auto max-w-4xl space-y-10">
				<header className="space-y-3 text-center">
					<p className="text-sm uppercase tracking-[0.3em] text-gray-400 dark:text-zinc-500">
						David T. Kessler
					</p>

					<h1 className="mt-3 text-5xl font-light tracking-wide text-gray-900 dark:text-zinc-100">
						Painting on Metal
					</h1>
				</header>

				<div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
					<div className="overflow-hidden rounded-lg bg-gray-100 shadow-sm dark:bg-zinc-900">
						<img
							src="/images/closeup.jpg"
							alt="Close-up detail of a David T. Kessler painting on metal"
							className="block h-auto w-full"
							onError={(event) => {
								event.currentTarget.style.display = "none";
							}}
						/>
					</div>

					<div className="space-y-6 leading-8 text-gray-700 dark:text-zinc-300">
						<p>
							<strong className="font-medium text-gray-900 dark:text-zinc-100">
								David Kessler
							</strong>{" "}
							[American, b. 1950] is an extraordinary painter who
							has created a unique art form that holds a
							viewer&apos;s attention by accentuating the paradox
							of the flat painted surface with the visual illusion
							of depth and space.
						</p>

						<p>
							Using a perfected technique in the photo-realist
							tradition developed over the past twenty-five years,
							the artist has created a series of spectacular
							waterscape paintings that incorporate realistic
							imagery painted over a surface of abraded and
							polished aluminum.
						</p>

						<p>
							This combination of hybrid elements forces the
							viewer to shift their perception to accommodate the
							incongruity of light being reflected from the metal
							surface, while at the same time being absorbed by
							the painted areas.
						</p>

						<p>
							This reinforces the strange visual perplexity of the
							paintings that are at the same time realistic and
							holographic.
						</p>
					</div>
				</div>
			</div>
		</PageTransition>
	);
}
