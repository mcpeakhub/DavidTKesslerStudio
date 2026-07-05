const fs = require("fs");
const path = require("path");

const repoRoot = process.cwd();

const sourceDir = path.join(repoRoot, "legacy-galleries");
const outputDir = path.join(repoRoot, "content", "galleries");

const galleryFiles = [
	{ source: "Gallery1.aspx", targetGallery: 1 },
	{ source: "Gallery2.aspx", targetGallery: 2 },
	{ source: "Gallery3.aspx", targetGallery: 3 },
	{ source: "Gallery4.aspx", targetGallery: 4 },
	{ source: "Gallery5.aspx", targetGallery: 5 },
	{ source: "Gallery6.aspx", targetGallery: 6 },
];

function slugify(value) {
	return value
		.toLowerCase()
		.replace(/&amp;/g, "and")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

function extractArray(content, variableName) {
	const regex = new RegExp(
		`var\\s+${variableName}\\s*=\\s*new\\s+Array\\((.*?)\\);`,
		"s",
	);

	const match = content.match(regex);

	if (!match) {
		return [];
	}

	return [...match[1].matchAll(/'((?:\\'|[^'])*)'/g)].map((item) =>
		item[1].trim(),
	);
}

function parseSize(value) {
	const parts = value.split(" - ");
	return {
		dimensions: parts[0]?.trim() || "",
		medium: parts[1]?.trim() || "",
	};
}

function migrateGallery({ source, targetGallery }) {
	const sourcePath = path.join(sourceDir, source);
	const content = fs.readFileSync(sourcePath, "utf8");

	const pictures = extractArray(content, "aPicture");
	const titles = extractArray(content, "aTitle");
	const sizes = extractArray(content, "aSize");
	const owners = extractArray(content, "aOwner");
	const statements = extractArray(content, "aStatement");

	const galleryOutputDir = path.join(outputDir, `gallery${targetGallery}`);
	fs.mkdirSync(galleryOutputDir, { recursive: true });

	titles.forEach((title, index) => {
		const { dimensions, medium } = parseSize(sizes[index] ?? "");
		const owner = owners[index] ?? "";
		const sold = owner.toLowerCase().includes("sold");
		const id = slugify(title);

		const painting = {
			id,
			title,
			medium,
			dimensions,
			sold,
			originalImage: pictures[index] ?? "",
			dateAdded: "2026-07-04",
			description: statements[index] ?? "",
		};

		const outputPath = path.join(galleryOutputDir, `${id}.json`);

		fs.writeFileSync(outputPath, JSON.stringify(painting, null, 2));
	});

	console.log(`Migrated ${titles.length} paintings from ${source}`);
}

fs.mkdirSync(outputDir, { recursive: true });

galleryFiles.forEach(migrateGallery);

console.log("Migration complete.");
