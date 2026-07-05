import PageTransition from "../components/PageTransition";

const exhibitions = [
	{
		year: "2013",
		venues: [
			"Tucson Museum of Art, Tucson, AZ",
			"Stricoff Fine Art, New York, NY",
		],
	},
	{
		year: "2012",
		venues: [
			"Stricoff Fine Art, New York, NY",
			"OK Harris Works of Art, New York, NY",
			"Etra Fine Art, Miami, FL",
			"Art Basel, Miami, FL",
		],
	},
	{
		year: "2011",
		venues: ["Art Basel, Miami, FL", "Ogilvie-Pertl Gallery, Chicago, IL"],
	},
	{
		year: "2010",
		venues: ["Stricoff Fine Art, New York, NY"],
	},
	{
		year: "2009",
		venues: ["Plus One Gallery, London, England"],
	},
	{
		year: "2008",
		venues: ["Ogilvie-Pertl Gallery, Chicago, IL"],
	},
	{
		year: "2007",
		venues: ["Introductions II, Stremmel Gallery, Reno, NV"],
	},
	{
		year: "2006",
		venues: ["Arts Botanica, Loyola University Museum of Art, Chicago, IL"],
	},
	{
		year: "2005",
		venues: ["Paint on Metal, Tucson Museum of Art, Tucson, AZ"],
	},
	{
		year: "2003",
		venues: [
			"Hyperrealism, USA, 1965–1975, Strasbourg Museum of Contemporary Art, Strasbourg, France",
		],
	},
	{
		year: "2002",
		venues: [
			"As Real as it Gets: Superrealism and Photorealism, Tucson Museum of Contemporary Art, Tucson, AZ",
		],
	},
	{
		year: "2001",
		venues: ["Inaugural Show, Vanier Fine Art, Tucson, AZ"],
	},
	{
		year: "2000",
		venues: ["Davis Dominguez Gallery, Tucson, AZ"],
	},
	{
		year: "1999",
		venues: [
			"New Acquisitions Show, Scottsdale Center for the Arts, Scottsdale, AZ",
		],
	},
	{
		year: "1997",
		venues: ["Landscapes, Virginia Miller Galleries, Miami, FL"],
	},
	{
		year: "1996",
		venues: [
			"Living with Art, Bruce Kapson Gallery, Santa Monica, CA",
			"Riva Yares Gallery, Santa Fe, NM",
		],
	},
	{
		year: "1995",
		venues: ["Paintings, Barrington Area Arts Center, Barrington, IL"],
	},
	{
		year: "1994",
		venues: [
			"Getting Real: 20th Century American Realism, South Bend Regional Museum of Art, South Bend, IN",
		],
	},
	{
		year: "1993",
		venues: [
			"Arizona Artists, Arizona State University Art Museum, Tempe, AZ",
		],
	},
	{
		year: "1992",
		venues: ["Riva Yares Gallery, Scottsdale, AZ"],
	},
	{
		year: "1989",
		venues: [
			"Exhibition of Master Works, Riva Yares Gallery, Scottsdale, AZ",
			"Sazama Gallery, Chicago, IL",
		],
	},
	{
		year: "1988",
		venues: [
			"Elemental Visions / Personal Landscapes, Art Museum of South Texas, Corpus Christi, TX",
		],
	},
	{
		year: "1987",
		venues: [
			"Boundless Realism: Contemporary Landscape Painting of the West, The Rockwell Museum, Corning, NY",
			"The Phil Sescind Collection, Butler Institute of American Art, Youngstown, OH",
		],
	},
	{
		year: "1986",
		venues: [
			"Elaine Horwitch Galleries, Palm Springs, CA",
			"Arizona Collects: 20th Century Painting, Tucson Museum of Contemporary Art, Tucson, AZ",
		],
	},
	{
		year: "1985",
		venues: [
			"Centennial Distinguished Alumni Exhibition, Arizona State University, Phoenix, AZ",
		],
	},
	{
		year: "1984",
		venues: [
			"A Sense of Place: The Essence of Contemporary Southwest Art, Elaine Horwitch Gallery, Scottsdale, AZ",
		],
	},
	{
		year: "1983",
		venues: ["The Southwest Invitational, Yuma, AZ"],
	},
	{
		year: "1982",
		venues: [
			"Contemporary Watercolors from Frumkin-Struve Gallery, University of Wisconsin Foster Art Gallery, Eau Claire, WI",
			"14th Annual Watercolor West, Utah State University, Logan, UT",
		],
	},
	{
		year: "1981",
		venues: [
			"Watercolors, Dubins Gallery, Los Angeles, CA",
			"Contemporary American Watercolors, Illinois Bell Lobby Gallery, Chicago, IL",
		],
	},
	{
		year: "1980",
		venues: ["Watercolors 1980, Frumkin-Struve Gallery, Chicago, IL"],
	},
];

export default function GroupExhibitions() {
	return (
		<PageTransition>
			<div className="mx-auto max-w-4xl space-y-10">
				<header className="space-y-3 text-center">
					<p className="text-sm uppercase tracking-[0.3em] text-gray-400 dark:text-zinc-500">
						David T. Kessler
					</p>

					<h1 className="mt-3 text-5xl font-light tracking-wide text-gray-900 dark:text-zinc-100">
						Group Exhibitions
					</h1>

					<p className="mx-auto mt-6 max-w-3xl leading-8 text-gray-600 dark:text-zinc-300">
						Selected group exhibitions from David T. Kessler's
						exhibition history.
					</p>
				</header>

				<section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
					<div className="space-y-8">
						{exhibitions.map((entry) => (
							<div
								key={entry.year}
								className="grid gap-3 border-b border-gray-100 pb-8 last:border-b-0 dark:border-zinc-800 md:grid-cols-[90px_1fr]"
							>
								<div className="text-lg font-light">
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
