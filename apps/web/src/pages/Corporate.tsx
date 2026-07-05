import PageTransition from "../components/PageTransition";

const collections = [
	"AT&T",
	"Arco",
	"Bank of America",
	"Citicorp",
	"Crown Zellerbach",
	"Dean Witter",
	"Dupont deNemours",
	"Foremost McKesson",
	"IBM",
	"Illinois Bell",
	"ITEL",
	"Kemper Art Collection",
	"McDonald's",
	"Prudential Life Insurance",
	"Rainier Life Insurance",
	"Shaklee",
	"St. Joseph Hospital",
	"Transamerica",
	"U.S. Leasing",
];

export default function Corporate() {
	return (
		<PageTransition>
			<div className="mx-auto max-w-4xl space-y-10">
				<header className="space-y-3 text-center">
					<p className="text-sm uppercase tracking-[0.3em] text-gray-400 dark:text-zinc-500">
						David T. Kessler
					</p>

					<h1 className="mt-3 text-5xl font-light tracking-wide text-gray-900 dark:text-zinc-100">
						Corporate
					</h1>

					<p className="mx-auto mt-6 max-w-3xl leading-8 text-gray-600 dark:text-zinc-300">
						Selected corporate collections featuring work by David
						T. Kessler.
					</p>
				</header>

				<section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
					<h2 className="mb-6 text-sm uppercase tracking-[0.25em] text-gray-400 dark:text-zinc-500">
						Selected Corporate Collections
					</h2>

					<div className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
						{collections.map((collection) => (
							<div
								key={collection}
								className="border-b border-gray-100 pb-3 text-gray-700 dark:border-zinc-800 dark:text-zinc-300"
							>
								{collection}
							</div>
						))}
					</div>
				</section>
			</div>
		</PageTransition>
	);
}
