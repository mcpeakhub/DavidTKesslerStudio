import { getStore } from "@netlify/blobs";
import type { Config } from "@netlify/functions";

type PaintingStatusRequest = {
	password?: string;
	paintingId?: string;
	sold?: boolean;
};

const STORE_NAME = "painting-status";

export default async (request: Request) => {
	if (request.method === "GET") {
		const store = getStore(STORE_NAME);

		const statuses =
			(await store.get("statuses", {
				type: "json",
				consistency: "strong",
			})) ?? {};

		return Response.json(statuses);
	}

	if (request.method !== "POST") {
		return Response.json(
			{ error: "Method not allowed." },
			{ status: 405 },
		);
	}

	try {
		const body = (await request.json()) as PaintingStatusRequest;

		const adminPassword = process.env.PAINTING_ADMIN_PASSWORD;

		if (!adminPassword) {
			console.error(
				"PAINTING_ADMIN_PASSWORD environment variable is not configured.",
			);

			return Response.json(
				{ error: "Server configuration error." },
				{ status: 500 },
			);
		}

		if (!body.password || body.password !== adminPassword) {
			return Response.json(
				{ error: "Invalid password." },
				{ status: 401 },
			);
		}

		if (!body.paintingId) {
			return Response.json(
				{ error: "Painting ID is required." },
				{ status: 400 },
			);
		}

		if (typeof body.sold !== "boolean") {
			return Response.json(
				{ error: "Sold status is required." },
				{ status: 400 },
			);
		}

		const store = getStore(STORE_NAME);

		const statuses =
			((await store.get("statuses", {
				type: "json",
				consistency: "strong",
			})) as Record<string, boolean> | null) ?? {};

		statuses[body.paintingId] = body.sold;

		await store.set(
			"statuses",
			JSON.stringify(statuses),
		);

		return Response.json({
			success: true,
			paintingId: body.paintingId,
			sold: body.sold,
		});
	} catch (error) {
		console.error("Unable to update painting status:", error);

		return Response.json(
			{ error: "Unable to update painting status." },
			{ status: 500 },
		);
	}
};

export const config: Config = {
	path: "/api/painting-status",
};