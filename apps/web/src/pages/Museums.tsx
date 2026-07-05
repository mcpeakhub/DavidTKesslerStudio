import PageTransition from "../components/PageTransition";

const museums = [
	"Brooklyn Museum, Brooklyn, New York",
	"Canton Art Institute, Canton, Ohio",
	"Crocker Art Museum, Sacramento, California",
	"Denver Art Museum, Denver, Colorado",
	"Fine Arts Museums of San Francisco, San Francisco, California",
	"Fort Wayne Museum of Art, Fort Wayne, Indiana",
	"Fresno Art Museum, Fresno, California",
	"Indianapolis Museum of Art, Indianapolis, Indiana",
	"Laguna Beach Museum of Art, Laguna Beach, California",
	"Los Angeles County Museum of Art, Los Angeles, California",
	"Milwaukee Art Museum, Milwaukee, Wisconsin",
	"Oakland Museum of California, Oakland, California",
	"Palm Springs Desert Museum, Palm Springs, California",
	"San Francisco Museum of Modern Art, San Francisco, California",
	"San Jose Museum of Art, San Jose, California",
	"Seattle Art Museum, Seattle, Washington",
	"Tucson Museum of Art, Tucson, Arizona",
];

export default function Museums() {
	return (
		<PageTransition>
			<div className="mx-auto max-w-4xl space-y-10">
				<header className="space-y-3 text-center">
					<p className="text-sm uppercase tracking-[0.3em] text-gray-400 dark:text-zinc-500">
						David T. Kessler
					</p>

					<h1 className="text-4xl font-light text-gray-900 dark:text-zinc-100 md:text-5xl">
						Museums
					</h1>

					<p className="mx-auto max-w-2xl leading-8 text-gray-600 dark:text-zinc-300">
						Selected museum collections featuring work by David T.
						Kessler.
					</p>
				</header>

				<section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
					<h2 className="mb-6 text-sm uppercase tracking-[0.25em] text-gray-400 dark:text-zinc-500">
						Museum Collections
					</h2>

					<div className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
						{museums.map((museum) => (
							<div
								key={museum}
								className="border-b border-gray-100 pb-3 text-gray-700 dark:border-zinc-800 dark:text-zinc-300"
							>
								{museum}
							</div>
						))}
					</div>
				</section>
			</div>
		</PageTransition>
	);
}
