import cors from "cors";
import express from "express";
import fs from "fs/promises";
import path from "path";
import type { Painting } from "@david/shared";

const app = express();
const port = process.env.PORT ?? 3001;

// const allowedOrigins = ["http://localhost:5173", process.env.WEB_URL].filter(
// 	Boolean,
// ) as string[];

// app.use(
// 	cors({
// 		origin: allowedOrigins,
// 	}),
// );
app.options("*", cors());

const allowedOrigins = [
	"http://localhost:5173",
	"https://davidtkesslerstudios.netlify.app",
	process.env.WEB_URL,
].filter(Boolean) as string[];

app.use((req, _res, next) => {
	console.log("Origin:", req.headers.origin);
	console.log("Path:", req.path);
	next();
});

app.use(
	cors({
		origin(origin, callback) {
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
				return;
			}

			console.warn("Blocked by CORS:", origin);
			callback(new Error(`Not allowed by CORS: ${origin}`));
		},
	}),
);
app.use(express.json());

const galleriesDir = path.resolve(process.cwd(), "../../content/galleries");
const galleryIds = [0, 1, 2, 3, 4, 5, 6];
const placeholderImage = "/images/placeholders/image-coming-soon.jpg";

async function readGallery(id: number): Promise<Painting[]> {
	const galleryDir = path.join(galleriesDir, `gallery${id}`);

	try {
		const files = await fs.readdir(galleryDir);
		const jsonFiles = files.filter((file) => file.endsWith(".json"));

		const paintings = await Promise.all(
			jsonFiles.map(async (file) => {
				const filePath = path.join(galleryDir, file);
				const contents = await fs.readFile(filePath, "utf-8");
				const painting = JSON.parse(contents) as Painting;

				return {
					...painting,
					gallery: id,
					image:
						painting.image ??
						`/images/gallery${id}/${painting.id}.jpg`,
				};
			}),
		);

		return paintings;
	} catch (error) {
		console.error(`Error reading gallery ${id}:`, error);
		return [];
	}
}

async function readAllPaintings(): Promise<Painting[]> {
	const galleries = await Promise.all(
		galleryIds.map((id) => readGallery(id)),
	);
	return galleries.flat();
}

function sortNewestFirst(paintings: Painting[]): Painting[] {
	return [...paintings].sort((a, b) => {
		const aDate = a.dateAdded ? new Date(a.dateAdded).getTime() : 0;
		const bDate = b.dateAdded ? new Date(b.dateAdded).getTime() : 0;

		return bDate - aDate;
	});
}

app.get("/api/health", (_req, res) => {
	res.json({ status: "ok" });
});

app.get("/api/paintings", async (_req, res) => {
	const paintings = await readAllPaintings();
	res.json(paintings);
});

app.get("/api/paintings/:id", async (req, res) => {
	const paintings = await readAllPaintings();
	const painting = paintings.find((item) => item.id === req.params.id);

	if (!painting) {
		return res.status(404).json({ error: "Painting not found" });
	}

	res.json(painting);
});

app.get("/api/galleries/:id", async (req, res) => {
	const id = Number(req.params.id);

	// this code sorts all paintings by date added and returns the 12 newest paintings if the gallery id is 0
	// if (id === 0) {
	// 	const paintings = await readAllPaintings();
	// 	const newestPaintings = sortNewestFirst(paintings).slice(0, 12);

	// 	res.json(newestPaintings);
	// 	return;
	// }

	const paintings = await readGallery(id);
	res.json(paintings);
});

app.listen(port, () => {
	console.log(`API running on http://localhost:${port}`);
});
