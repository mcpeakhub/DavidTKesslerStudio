import PageTransition from "../components/PageTransition";

const galleries = [
	{
		name: "1st Dibs",
		phone: "(480) 946-6060",
		address: ["215 E. Grant Street", "Phoenix, AZ 85004"],
		website: "https://www.1stdibs.com/search/?q=david%20kessler",
	},
	{
		name: "Dean Day Gallery",
		phone: "(713) 520-1021",
		address: ["2639 Colquitt St", "Houston, TX 77098"],
		website: "https://www.deandaygallery.com/kessler-david",
	},
	{
		name: "Etra Fine Art",
		phone: "(305) 438-4383",
		address: ["50 NE 40th Street", "Miami, FL 33137"],
		website: "https://www.etrafineart.com",
	},
	{
		name: "Mason Fine Art",
		phone: "(404) 879-1500",
		address: ["415 Plasters Ave NE Suite 100", "Atlanta, GA 30324"],
		website:
			"https://www.1stdibs.com/creators/david-kessler/art/prints-works-on-paper/",
	},
	{
		name: "Plus One Gallery",
		phone: "+44 20 7730 7656",
		address: [
			"Piper Building",
			"Peterborough Rd",
			"Fulham, London SW6 3EF",
			"England",
		],
		website: "https://www.plusonegallery.com",
	},
	// {
	// 	name: "Sorrel Sky Gallery",
	// 	phone: "(505) 501-6555",
	// 	address: ["125 W. Palace Avenue", "Santa Fe, NM 87501"],
	// 	website: "https://sorrelsky.com/artist/david-kessler",
	// },
	{
		name: "Stricoff Fine Art Ltd.",
		phone: "(212) 219-3977",
		address: ["424 West Broadway", "New York, NY 10012"],
		website: "https://www.singulart.com/en/search?q=David%20Kessler",
	},
];

export default function Contact() {
	return (
		<PageTransition>
			<div className="mx-auto max-w-6xl space-y-12">
				<header className="space-y-3 text-center">
					<p className="text-sm uppercase tracking-[0.3em] text-gray-400 dark:text-zinc-500">
						David T. Kessler
					</p>

					<h1 className="mt-3 text-5xl font-light tracking-wide text-gray-900 dark:text-zinc-100">
						Contact
					</h1>

					<p className="mx-auto mt-6 max-w-3xl leading-8 text-gray-600 dark:text-zinc-300">
						For inquiries regarding paintings, exhibitions,
						commissions, or acquisitions, please contact David
						directly or one of the galleries representing his work.
					</p>
				</header>

				<section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
					<h2 className="mb-4 text-2xl font-light">Contact David</h2>

					<p className="leading-8">
						<a
							href="mailto:davidtkesslerstudios@gmail.com"
							className="text-blue-600 hover:underline dark:text-blue-400"
						>
							davidtkesslerstudios@gmail.com
						</a>
					</p>
				</section>

				<section>
					<h2 className="mb-8 text-center text-2xl font-light">
						Representing Galleries
					</h2>

					<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
						{galleries.map((gallery) => (
							<div
								key={gallery.name}
								className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
							>
								<h3 className="text-xl font-light">
									{gallery.name}
								</h3>

								<div className="mt-4 space-y-2 text-sm leading-7 text-gray-600 dark:text-zinc-300">
									<div>{gallery.phone}</div>

									<div>
										{gallery.address.map((line) => (
											<div key={line}>{line}</div>
										))}
									</div>

									<div className="pt-2">
										<a
											href={gallery.website}
											target="_blank"
											rel="noreferrer"
											className="text-blue-600 hover:underline dark:text-blue-400"
										>
											Visit Website
										</a>
									</div>
								</div>
							</div>
						))}
					</div>
				</section>
			</div>
		</PageTransition>
	);
}
