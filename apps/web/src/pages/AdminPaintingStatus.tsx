import { useEffect, useMemo, useState } from "react";
import type { Painting } from "@david/shared";
import { getPaintings } from "../services/api";

type StatusOverrides = Record<string, boolean>;

export default function AdminPaintingStatus() {
	const [paintings, setPaintings] = useState<Painting[]>([]);
	const [statusOverrides, setStatusOverrides] =
		useState<StatusOverrides>({});

	const [password, setPassword] = useState("");
	const [selectedUnsold, setSelectedUnsold] = useState("");
	const [selectedSold, setSelectedSold] = useState("");

	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

    useEffect(() => {
        async function loadData() {
            try {
                // Load the paintings first.
                const paintingData = await getPaintings();
                setPaintings(paintingData);

                // Then try to load any live sold-status overrides.
                try {
                    const response = await fetch("/api/painting-status");

                    const contentType =
                        response.headers.get("content-type");

                    if (
                        response.ok &&
                        contentType?.includes("application/json")
                    ) {
                        const statuses =
                            (await response.json()) as StatusOverrides;

                        setStatusOverrides(statuses);
                    } else {
                        console.warn(
                            "Painting status service is not available. Using JSON painting statuses.",
                        );
                    }
                } catch (statusError) {
                    console.warn(
                        "Painting status service is not available. Using JSON painting statuses.",
                        statusError,
                    );
                }
            } catch (err) {
                console.error(err);

                setError(
                    "Unable to load the painting administration page.",
                );
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

	const effectivePaintings = useMemo(() => {
		return paintings.map((painting) => ({
			...painting,
			sold:
				statusOverrides[painting.id] ??
				painting.sold ??
				false,
		}));
	}, [paintings, statusOverrides]);

	const unsoldPaintings = useMemo(
		() =>
			effectivePaintings
				.filter((painting) => !painting.sold)
				.sort((a, b) => a.title.localeCompare(b.title)),
		[effectivePaintings],
	);

	const soldPaintings = useMemo(
		() =>
			effectivePaintings
				.filter((painting) => painting.sold)
				.sort((a, b) => a.title.localeCompare(b.title)),
		[effectivePaintings],
	);

	async function updatePaintingStatus(
		paintingId: string,
		sold: boolean,
	) {
		setMessage("");
		setError("");

		if (!password.trim()) {
			setError("Please enter the administration password.");
			return;
		}

		if (!paintingId) {
			setError("Please select a painting.");
			return;
		}

		const painting = effectivePaintings.find(
			(item) => item.id === paintingId,
		);

		if (!painting) {
			setError("Painting not found.");
			return;
		}

		const action = sold
			? `mark "${painting.title}" as sold`
			: `mark "${painting.title}" as available`;

		if (!window.confirm(`Are you sure you want to ${action}?`)) {
			return;
		}

		setSaving(true);

		try {
			const response = await fetch("/api/painting-status", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					password,
					paintingId,
					sold,
				}),
			});

            const responseText = await response.text();

            let result: { error?: string } = {};

            if (responseText) {
                try {
                    result = JSON.parse(responseText);
                } catch {
                    console.error(
                        "Non-JSON response from painting status service:",
                        responseText,
                    );
                }
            }

            if (!response.ok) {
                throw new Error(
                    result.error ??
                        `Unable to update painting. Server returned ${response.status}.`,
                );
            }

			setStatusOverrides((current) => ({
				...current,
				[paintingId]: sold,
			}));

			if (sold) {
				setSelectedUnsold("");
				setMessage(
					`"${painting.title}" has been marked as sold.`,
				);
			} else {
				setSelectedSold("");
				setMessage(
					`"${painting.title}" has been marked as available.`,
				);
			}
		} catch (err) {
			console.error(err);

			setError(
				err instanceof Error
					? err.message
					: "Unable to update painting.",
			);
		} finally {
			setSaving(false);
		}
	}

	if (loading) {
		return (
			<div className="py-20 text-center text-gray-500 dark:text-zinc-400">
				Loading painting administration...
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-2xl">
			<div className="mb-10">
				<p className="text-sm uppercase tracking-[0.3em] text-gray-400 dark:text-zinc-500">
					Administration
				</p>

				<h1 className="mt-3 text-4xl font-light tracking-wide  text-gray-900 dark:text-zinc-100">
					Painting Status
				</h1>

				<p className="mt-4 text-gray-600 dark:text-zinc-400">
					Update the availability status of paintings on the
					website.
				</p>
			</div>

			<div className="mb-8 rounded-xl border border-gray-200 p-6 dark:border-zinc-800">
				<label
					htmlFor="admin-password"
					className="mb-2 block text-sm font-medium"
				>
					Administration Password
				</label>

				<input
					id="admin-password"
					type="password"
					value={password}
					onChange={(event) =>
						setPassword(event.target.value)
					}
					autoComplete="current-password"
					className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-black dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-white"
				/>
			</div>

			{error && (
				<div className="mb-8 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
					{error}
				</div>
			)}

			{message && (
				<div className="mb-8 rounded-md border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-900 dark:bg-green-950/30 dark:text-green-300">
					{message}
				</div>
			)}

			<div className="space-y-8">
				<section className="rounded-xl border border-gray-200 p-6 dark:border-zinc-800">
					<h2 className="text-2xl font-light  text-gray-900 dark:text-zinc-100">
						Available Paintings
					</h2>

					<p className="mt-2 text-sm text-gray-500 dark:text-zinc-400">
						Select a painting to mark as sold.
					</p>

					<select
						value={selectedUnsold}
						onChange={(event) =>
							setSelectedUnsold(event.target.value)
						}
						className="mt-5 w-full rounded-md border border-gray-300 bg-white px-4 py-3 dark:border-zinc-700 dark:bg-zinc-900"
					>
						<option value="">
							Select an available painting...
						</option>

						{unsoldPaintings
                            .filter((painting) => !painting.id.toLowerCase().includes("detail"))
                            .map((painting) => (
							<option
								key={painting.id}
								value={painting.id}
							>
								{painting.title} — Gallery{" "}
								{painting.gallery}
							</option>
						))}


					</select>

					<button
						type="button"
						disabled={saving || !selectedUnsold}
						onClick={() =>
							updatePaintingStatus(
								selectedUnsold,
								true,
							)
						}
						className="mt-5 rounded-md bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
					>
						{saving ? "Updating..." : "Mark as Sold"}
					</button>
				</section>

				<section className="rounded-xl border border-gray-200 p-6 dark:border-zinc-800">
					<h2 className="text-2xl font-light  text-gray-900 dark:text-zinc-100">
						Sold Paintings
					</h2>

					<p className="mt-2 text-sm text-gray-500 dark:text-zinc-400">
						Use this section if a painting needs to be
						changed back to available.
					</p>

					<select
						value={selectedSold}
						onChange={(event) =>
							setSelectedSold(event.target.value)
						}
						className="mt-5 w-full rounded-md border border-gray-300 bg-white px-4 py-3 dark:border-zinc-700 dark:bg-zinc-900"
					>
						<option value="">
							Select a sold painting...
						</option>

						{soldPaintings.map((painting) => (
							<option
								key={painting.id}
								value={painting.id}
							>
								{painting.title} — Gallery{" "}
								{painting.gallery}
							</option>
						))}
					</select>

					<button
						type="button"
						disabled={saving || !selectedSold}
						onClick={() =>
							updatePaintingStatus(
								selectedSold,
								false,
							)
						}
						className="mt-5 rounded-md border border-gray-300 px-6 py-3 text-sm font-medium transition hover:border-black hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:hover:border-white dark:hover:bg-zinc-900"
					>
						{saving
							? "Updating..."
							: "Mark as Available"}
					</button>
				</section>
			</div>
		</div>
	);
}