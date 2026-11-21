import puppeteer from "puppeteer";
import { preview } from "vite";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(webRoot, "dist");

const routes = [
	"/",
	"/about",
	"/contact",
	"/corporate",
	"/museums",
	"/solo-exhibitions",
	"/group-exhibitions",
	"/painting-on-metal",
	...Array.from({ length: 12 }, (_, i) => `/gallery/${i}`),
];

const siteUrl = "https://davidtkesslerstudios.com";
const artist = "David T. Kessler";

const galleryNames = [
	"New Paintings",
	"Gallery I",
	"Gallery II",
	"Gallery III",
	"Gallery IV",
	"Gallery V",
	"Gallery VI",
	"Public Commissions",
	"Gallery 1",
	"Gallery 2",
	"Gallery 3",
	"Luminous Rhythms",
];

const pageSeo = {
	"/": {
		title: "David Kessler | Contemporary Artist & Painter | David T. Kessler Studios",
		description:
			"Official website of David Kessler (David T. Kessler), a contemporary artist known for photorealistic paintings on polished and abraded metal, exploring water, reflections, and light.",
	},
	"/about": {
		title: "About David Kessler | Contemporary Artist",
		description:
			"Learn about contemporary artist David T. Kessler, his artistic background, and his distinctive approach to painting.",
	},
	"/contact": {
		title: "Contact David T. Kessler Studios",
		description:
			"Contact David T. Kessler Studios for inquiries about original artwork, paintings, and commissions.",
	},
	"/corporate": {
		title: "Corporate Collections | David T. Kessler",
		description:
			"Explore corporate collections featuring original artwork by contemporary artist David T. Kessler.",
	},
	"/museums": {
		title: "Museum Collections | David T. Kessler",
		description:
			"Discover museum collections featuring the paintings of contemporary artist David T. Kessler.",
	},
	"/solo-exhibitions": {
		title: "Solo Exhibitions | David T. Kessler",
		description:
			"Explore the solo exhibition history of contemporary artist David T. Kessler.",
	},
	"/group-exhibitions": {
		title: "Group Exhibitions | David T. Kessler",
		description:
			"Explore group exhibitions featuring contemporary artist David T. Kessler.",
	},
	"/painting-on-metal": {
		title: "Painting on Metal | David T. Kessler",
		description:
			"Discover how David T. Kessler creates photorealistic paintings on polished and abraded metal, exploring water, reflections, and light.",
	},
};

galleryNames.forEach((name, id) => {
	pageSeo[`/gallery/${id}`] = {
		title: `${name} | David T. Kessler`,
		description: `Explore ${name}, a collection of original artwork by contemporary artist David T. Kessler.`,
	};
});

const server = await preview({
	root: webRoot,
	preview: {
		host: "127.0.0.1",
		port: 4173,
		strictPort: true,
	},
});

let browser;

try {
	browser = await puppeteer.launch({
		headless: true,
		args: ["--no-sandbox", "--disable-setuid-sandbox"],
	});

	for (const route of routes) {
		const page = await browser.newPage();

		try {
			console.log(`Prerendering: ${route}`);

			const response = await page.goto(`http://127.0.0.1:4173${route}`, {
				waitUntil: "networkidle2",
				timeout: 30000,
			});

			if (!response?.ok()) {
				throw new Error(`HTTP ${response?.status()} for ${route}`);
			}

			await page.waitForSelector("h1", { timeout: 15000 });

			if (route.startsWith("/gallery/")) {
				await page.waitForFunction(
					() =>
						!document.body.innerText.includes(
							"Loading paintings...",
						),
					{ timeout: 15000 },
				);

				const hasCards = await page.$('a[href*="/painting/"]');

				if (!hasCards) {
					throw new Error(
						`No painting links found on ${route}. Check gallery rendering.`,
					);
				}
			}

			const canonical = new URL(route, siteUrl).href;
			const seo = pageSeo[route];

			if (!seo) {
				throw new Error(`Missing SEO metadata for ${route}`);
			}

			await page.evaluate(
				({ title, description, canonical }) => {
					document.title = title;

					let meta = document.querySelector(
						'meta[name="description"]',
					);

					if (!meta) {
						meta = document.createElement("meta");
						meta.setAttribute("name", "description");
						document.head.appendChild(meta);
					}

					meta.setAttribute("content", description);

					let link = document.querySelector('link[rel="canonical"]');

					if (!link) {
						link = document.createElement("link");
						link.setAttribute("rel", "canonical");
						document.head.appendChild(link);
					}

					link.setAttribute("href", canonical);
				},
				{
					title: seo.title,
					description: seo.description,
					canonical,
				},
			);

			const html = await page.content();

			const output =
				route === "/"
					? join(dist, "index.html")
					: join(dist, route.slice(1), "index.html");

			await mkdir(dirname(output), { recursive: true });
			await writeFile(output, html, "utf8");

			console.log(`  Saved: ${output}`);
		} finally {
			await page.close();
		}
	}

	console.log("Prerendering completed successfully.");
} finally {
	await browser?.close();
	await new Promise((resolveClose, rejectClose) => {
		server.httpServer.close((error) =>
			error ? rejectClose(error) : resolveClose(),
		);
	});
}
