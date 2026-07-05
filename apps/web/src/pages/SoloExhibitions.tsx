import PageTransition from "../components/PageTransition";

const exhibitions = [
	{ year: "2013", venues: ["Stricoff Fine Art, New York, NY"] },
	{
		year: "2012",
		venues: [
			"Stricoff Fine Art, New York, NY",
			"Dean Day Gallery, Houston, TX",
		],
	},
	{ year: "2011", venues: ["Stricoff Fine Art, New York, NY"] },
	{ year: "2010", venues: ["Phoenix Airport Museum, Phoenix, AZ"] },
	{ year: "2009", venues: ["O.K. Harris Works of Art, New York, NY"] },
	{
		year: "2008",
		venues: [
			"Bentley Gallery, Scottsdale, AZ",
			"Susan Street Gallery, Solana Beach, CA",
		],
	},
	{ year: "2007", venues: ["Bentley Projects, Phoenix, AZ"] },
	{
		year: "2006",
		venues: [
			"OK Harris Works of Art, New York, NY",
			"Ogilvie-Pertl Gallery, Chicago, IL",
			"Meyer East Gallery, Santa Fe, NM",
		],
	},
	{
		year: "2004",
		venues: [
			"Bentley Gallery, Scottsdale, AZ",
			"Ogilvie-Pertl Gallery, Chicago, IL",
		],
	},
	{ year: "2003", venues: ["Vanier Galleries, Scottsdale, AZ"] },
	{ year: "2002", venues: ["Vanier Galleries, Scottsdale, AZ"] },
	{ year: "2001", venues: ["Davis Dominguez Gallery, Tucson, AZ"] },
	{ year: "2000", venues: ["Vanier Galleries, Scottsdale, AZ"] },
	{ year: "1999", venues: ["Vanier Galleries, Scottsdale, AZ"] },
	{
		year: "1996",
		venues: [
			"Riva Yares Gallery, Santa Fe, NM",
			"Northern Arizona University Art Museum, Flagstaff, AZ",
			"Riva Yares Gallery, Scottsdale, AZ",
		],
	},
	{ year: "1987", venues: ["Elaine Horwitch Galleries, Scottsdale, AZ"] },
	{ year: "1985", venues: ["Elaine Horwitch Galleries, Scottsdale, AZ"] },
	{
		year: "1983",
		venues: [
			"Elaine Horwitch Galleries, Scottsdale, AZ",
			"Sedona Art Museum, Sedona, AZ",
		],
	},
	{ year: "1981", venues: ["Elaine Horwitch Galleries, Scottsdale, AZ"] },
	{
		year: "1979",
		venues: ["Phil Descind's Capricorn Gallery, Bethesda, MD"],
	},
	{ year: "1977", venues: ["Gallery 4, Alexandria, VA"] },
	{ year: "1976", venues: ["ADI Gallery, San Francisco, CA"] },
	{ year: "1973", venues: ["Arizona State University, Tempe, AZ"] },
];

export default function SoloExhibitions() {
	return (
		<PageTransition>
			<div className="mx-auto max-w-4xl space-y-10">
				<header className="space-y-3 text-center">
					<p className="text-sm uppercase tracking-[0.3em] text-gray-400 dark:text-zinc-500">
						David T. Kessler
					</p>

					<h1 className="mt-3 text-5xl font-light tracking-wide text-gray-900 dark:text-zinc-100">
						Solo Exhibitions
					</h1>

					<p className="mx-auto mt-6 max-w-3xl leading-8 text-gray-600 dark:text-zinc-300">
						Selected solo exhibitions from David T. Kessler’s
						exhibition history.
					</p>
				</header>

				<section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
					<h2 className="mb-8 text-sm uppercase tracking-[0.25em] text-gray-400 dark:text-zinc-500">
						Selected Solo Exhibitions
					</h2>

					<div className="space-y-8">
						{exhibitions.map((entry) => (
							<div
								key={entry.year + entry.venues.join("|")}
								className="grid gap-3 border-b border-gray-100 pb-8 last:border-b-0 last:pb-0 dark:border-zinc-800 md:grid-cols-[90px_1fr]"
							>
								<div className="text-lg font-light text-gray-900 dark:text-zinc-100">
									{entry.year}
								</div>

								<div className="space-y-2 text-gray-700 dark:text-zinc-300">
									{entry.venues.map((venue) => (
										<div key={venue}>{venue}</div>
									))}
								</div>
							</div>
						))}
					</div>
				</section>
			</div>
		</PageTransition>
	);
}
