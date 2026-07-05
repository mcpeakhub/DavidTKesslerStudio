import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";

export default function About() {
	return (
		<PageTransition>
			<div className="mx-auto max-w-4xl space-y-12">
				<header className="space-y-3 text-center">
					<p className="text-sm uppercase tracking-[0.3em] text-gray-400 dark:text-zinc-500">
						David T. Kessler
					</p>

					<h1 className="mt-3 text-5xl font-light tracking-wide text-gray-900 dark:text-zinc-100">
						About
					</h1>
				</header>

				<section className="space-y-6 leading-8 text-gray-700 dark:text-zinc-300">
					<h2 className="text-2xl font-light text-gray-900 dark:text-zinc-100">
						Artist Statement
					</h2>

					<p>
						As a painter, it is important for me to address the
						concerns of painting — what has been done — and what can
						I add to this. My work on aluminum is an attempt to use
						the qualities of refracted light and to have these
						qualities interact with the painting.
					</p>

					<p>
						The completed image is produced both by refracted light,
						created by the use of various wire brushes, and paint
						airbrushed in transparent layers. Within this process
						about half the image is produced by refracted light
						alone, simulating paint, and about half by paint.
					</p>

					<p>
						The dual concerns of working with simulation: refracted
						light simulating paint, and hybridization: the use of
						aluminum, wire brushes and paint; are an attempt to
						create an image working within some kind of context that
						is post-modern — and I use that term simply to mean{" "}
						<em>after</em> modern rather than <em>against</em>{" "}
						modern.
					</p>
				</section>

				<section className="grid gap-10 lg:grid-cols-[230px_1fr] lg:items-start">
					<div className="overflow-hidden rounded-lg bg-gray-100 shadow-sm dark:bg-zinc-900">
						<img
							src="/images/studio.jpg"
							alt="David T. Kessler studio"
							className="block h-auto w-full"
							onError={(event) => {
								event.currentTarget.style.display = "none";
							}}
						/>
					</div>

					<div className="space-y-6 leading-8 text-gray-700 dark:text-zinc-300">
						<h2 className="text-2xl font-light text-gray-900 dark:text-zinc-100">
							Background
						</h2>

						<p>
							David T. Kessler was born in Park Ridge, New Jersey
							on September 5, 1950. At the age of two, his family
							moved to Phoenix, Arizona. He attended Arizona State
							University, where he received the award for
							Outstanding Graduate in Studio Art in 1972.
						</p>

						<p>
							In 1973, he married Susan and was one of 12 painters
							accepted into the graduate program at The San
							Francisco Art Institute, where he received his
							M.F.A. in 1975. After seven years, David and his
							family moved back to Arizona, where he continues to
							live and work.
						</p>

						<p>
							His paintings have been exhibited internationally
							since 1977, with shows in Tokyo, Strasbourg,
							Chicago, Los Angeles, Miami, Scottsdale, and New
							York.
						</p>

						<p>
							Kessler&apos;s paintings are in the permanent
							collections of The Strasbourg Contemporary Museum of
							Art, The Brooklyn Museum, The Minnesota Museum of
							Art, The Museum of the Rhode Island School of
							Design, The Santa Barbara Museum, The Barrington Art
							Center, and others.
						</p>

						<p>
							Within Arizona, his work is in the collections of
							The Phoenix Art Museum, The Scottsdale Center for
							the Arts, The Tucson Museum of Art, Arizona State
							University Art Museum, and Northern Arizona
							University Art Museum.
						</p>
					</div>
				</section>

				<section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
					<h2 className="mb-6 text-sm uppercase tracking-[0.25em] text-gray-400 dark:text-zinc-500">
						Additional Information
					</h2>

					<div className="grid gap-4 sm:grid-cols-2">
						<Link
							className="text-gray-700 hover:text-black dark:text-zinc-300 dark:hover:text-white"
							to="/museums"
						>
							Museums
						</Link>
						<Link
							className="text-gray-700 hover:text-black dark:text-zinc-300 dark:hover:text-white"
							to="/corporate"
						>
							Corporate Collections
						</Link>
						<Link
							className="text-gray-700 hover:text-black dark:text-zinc-300 dark:hover:text-white"
							to="/solo-exhibitions"
						>
							Solo Exhibitions
						</Link>
						<Link
							className="text-gray-700 hover:text-black dark:text-zinc-300 dark:hover:text-white"
							to="/group-exhibitions"
						>
							Group Exhibitions
						</Link>
					</div>
				</section>
			</div>
		</PageTransition>
	);
}
