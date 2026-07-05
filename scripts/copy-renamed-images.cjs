const fs = require("fs");
const path = require("path");

const repoRoot = process.cwd();

const contentDir = path.join(repoRoot, "content", "galleries");
const legacyImagesDir = path.join(repoRoot, "legacy-images");
const outputImagesDir = path.join(repoRoot, "apps", "web", "public", "images");

const galleries = [2, 3, 4, 5, 6];

function ensureDir(dir) {
	fs.mkdirSync(dir, { recursive: true });
}

function findLegacyImage(originalImage) {
	for (const gallery of galleries) {
		const possiblePath = path.join(
			legacyImagesDir,
			`gallery${gallery}`,
			originalImage,
		);

		if (fs.existsSync(possiblePath)) {
			return possiblePath;
		}
	}

	return null;
}

for (const gallery of galleries) {
	const galleryContentDir = path.join(contentDir, `gallery${gallery}`);
	const galleryOutputDir = path.join(outputImagesDir, `gallery${gallery}`);

	if (!fs.existsSync(galleryContentDir)) continue;

	ensureDir(galleryOutputDir);

	const jsonFiles = fs
		.readdirSync(galleryContentDir)
		.filter((file) => file.endsWith(".json"));

	for (const jsonFile of jsonFiles) {
		const jsonPath = path.join(galleryContentDir, jsonFile);
		const painting = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

		if (!painting.originalImage) {
			console.warn(`Skipping ${jsonFile}: no originalImage`);
			continue;
		}

		const sourceImage = findLegacyImage(painting.originalImage);

		if (!sourceImage) {
			console.warn(
				`Missing image for ${painting.title}: ${painting.originalImage}`,
			);
			continue;
		}

		const outputImage = path.join(galleryOutputDir, `${painting.id}.jpg`);

		fs.copyFileSync(sourceImage, outputImage);

		console.log(
			`Copied ${painting.originalImage} -> images/gallery${gallery}/${painting.id}.jpg`,
		);
	}
}

console.log("Image copy complete.");
