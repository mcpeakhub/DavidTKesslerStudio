import { ReactNode, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { site } from "../config/site";
import ThemeToggle from "./ThemeToggle";
import { navigation } from "../config/navigation";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
	[
		"relative whitespace-nowrap transition-colors",
		"hover:text-black dark:hover:text-white",
		"after:absolute after:left-0 after:-bottom-1 after:h-px after:bg-current after:transition-all",
		isActive
			? "text-black after:w-full dark:text-white"
			: "text-gray-600 after:w-0 hover:after:w-full dark:text-zinc-300",
	].join(" ");

export default function Layout({ children }: { children: ReactNode }) {
	const [open, setOpen] = useState(false);

	return (
		<div className="flex min-h-screen flex-col bg-white text-gray-900 transition-colors dark:bg-black dark:text-zinc-100">
			<header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur transition-colors dark:border-zinc-800 dark:bg-black/90">
				<div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
					<Link
						to="/"
						className="whitespace-nowrap text-lg font-light tracking-wide"
					>
						David T. Kessler
					</Link>

					<nav className="hidden items-center gap-4 text-sm xl:flex">
						{navigation.map((item) => {
							if (!item.children) {
								return (
									<NavLink
										key={item.title}
										to={item.path!}
										className={navLinkClass}
									>
										{item.title}
									</NavLink>
								);
							}

							return (
								<div
									key={item.title}
									className="group relative"
								>
									<button className="whitespace-nowrap text-gray-600 transition-colors hover:text-black dark:text-zinc-300 dark:hover:text-white">
										{item.title} ▾
									</button>

									<div className="pointer-events-none absolute left-0 top-full w-64 translate-y-0 rounded-xl border border-gray-200 bg-white p-4 opacity-0 shadow-xl transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 dark:border-zinc-800 dark:bg-zinc-900">
										<div className="mb-3 text-xs uppercase tracking-[0.25em] text-gray-400 dark:text-zinc-500">
											{item.title}
										</div>

										<div className="mb-2 border-t border-gray-200 dark:border-zinc-800" />

										<div className="space-y-1">
											{item.children.map((child) => (
												<NavLink
													key={child.title}
													to={child.path}
													className={({ isActive }) =>
														[
															"block rounded-md px-3 py-2 transition-colors",
															isActive
																? "bg-gray-100 text-black dark:bg-zinc-800 dark:text-white"
																: "text-gray-600 hover:bg-gray-100 hover:text-black dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white",
														].join(" ")
													}
												>
													{child.title}
												</NavLink>
											))}
										</div>
									</div>
								</div>
							);
						})}

						<ThemeToggle />
					</nav>

					<button
						className="xl:hidden"
						onClick={() => setOpen((value) => !value)}
						aria-label="Toggle navigation"
					>
						{open ? <X size={22} /> : <Menu size={22} />}
					</button>
				</div>

				{open && (
					<nav className="flex flex-col gap-3 border-t border-gray-200 px-6 py-4 text-sm text-gray-600 dark:border-zinc-800 dark:text-zinc-300 xl:hidden">
						{navigation.map((item) => {
							if (!item.children) {
								return (
									<NavLink
										key={item.title}
										to={item.path!}
										onClick={() => setOpen(false)}
										className={({ isActive }) =>
											isActive
												? "text-black dark:text-white"
												: "transition-colors hover:text-black dark:hover:text-white"
										}
									>
										{item.title}
									</NavLink>
								);
							}

							return (
								<div key={item.title} className="space-y-2">
									<div className="font-medium text-gray-900 dark:text-zinc-100">
										{item.title}
									</div>

									<div className="ml-4 flex flex-col gap-2">
										{item.children.map((child) => (
											<NavLink
												key={child.title}
												to={child.path}
												onClick={() => setOpen(false)}
												className={({ isActive }) =>
													isActive
														? "text-black dark:text-white"
														: "transition-colors hover:text-black dark:hover:text-white"
												}
											>
												{child.title}
											</NavLink>
										))}
									</div>
								</div>
							);
						})}

						<div className="pt-2">
							<ThemeToggle />
						</div>
					</nav>
				)}
			</header>

			<main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
				{children}
			</main>

			<footer className="mt-20 border-t border-gray-200 dark:border-zinc-800">
				<div className="mx-auto max-w-6xl space-y-2 px-6 py-10 text-center text-sm text-gray-500 dark:text-zinc-400">
					<div>{site.studio}</div>
					<div>{site.tagline}</div>
					<div>
						© {site.copyrightStartYear}–{new Date().getFullYear()}{" "}
						{site.studio}
					</div>
				</div>
			</footer>
		</div>
	);
}
