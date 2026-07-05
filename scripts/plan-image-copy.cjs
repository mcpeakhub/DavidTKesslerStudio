const fs = require("fs");
const path = require("path");

const repoRoot = process.cwd();
const contentDir = path.join(repoRoot, "content", "galleries");

const galleries = [1, 2, 3, 4, 5, 6];

for (const gallery of galleries) {
	const galleryDir = path.join(contentDir, `gallery${gallery}`);

	if (!fs.existsSync(galleryDir)) continue;

	const files = fs
		.readdirSync(galleryDir)
		.filter((file) => file.endsWith(".json"));

	console.log(`\nGallery ${gallery}`);
	console.log("----------");

	for (const file of files) {
		const fullPath = path.join(galleryDir, file);
		const painting = JSON.parse(fs.readFileSync(fullPath, "utf8"));

		console.log(
			`${painting.originalImage}  ->  images/gallery${gallery}/${painting.id}.jpg`,
		);
	}
}
