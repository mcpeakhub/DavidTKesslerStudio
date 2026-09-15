import PageTransition from "../components/PageTransition";

const museums = [
	"Achenbach Foundation, San Francisco, California",
	"Arizona State University Art Museum, Tempe, Arizona",
	"Barrington Arts Center, Barrington, Illinois",
	"Davidson College, Davidson, North Carolina",
	"De Anza College, Cupertino, California",
	"Minnesota Museum of Art, St. Paul, Minnesota",
	"Monterey Peninsula Museum of Art, Monterey, California",
	"Northern Arizona University Art Museum, Flagstaff, Arizona",
	"Phoenix Art Museum, Phoenix, Arizona",
	"Portsmouth Community Arts Center, Portsmouth, Oregon",
	"Santa Barbara Museum of Art, Santa Barbara, California",
	"Strasbourg Museum of Contemporary Art, Strasbourg, France",
	"University of Minnesota, St. Paul, Minnesota",
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
