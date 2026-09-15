import { ReactNode, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ChevronRight, Menu, X } from "lucide-react";
import { site } from "../config/site";
import ThemeToggle from "./ThemeToggle";
import {
	navigation,
	type NavigationItem,
} from "../config/navigation";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
	[
		"relative whitespace-nowrap transition-colors",
		"hover:text-black dark:hover:text-white",
		"after:absolute after:left-0 after:-bottom-1 after:h-px after:bg-current after:transition-all",
		isActive
			? "text-black after:w-full dark:text-white"
			: "text-gray-600 after:w-0 hover:after:w-full dark:text-zinc-300",
	].join(" ");

const dropdownLinkClass = ({ isActive }: { isActive: boolean }) =>
	[
		"block w-full rounded-md px-3 py-2 text-left transition-colors",
		isActive
			? "bg-gray-100 text-black dark:bg-zinc-800 dark:text-white"
			: "text-gray-600 hover:bg-gray-100 hover:text-black dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white",
	].join(" ");

function DesktopDropdownItem({ item }: { item: NavigationItem }) {
	if (!item.children) {
		return (
			<NavLink
				to={item.path!}
				className={dropdownLinkClass}
			>
				{item.title}
			</NavLink>
		);
	}

	return (
		<div className="group/submenu relative">
			<div className="flex cursor-default items-center justify-between rounded-md px-3 py-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-black dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white">
				<span>{item.title}</span>
				<ChevronRight size={16} />
			</div>

			<div className="pointer-events-none absolute left-full top-0 w-56 rounded-xl border border-gray-200 bg-white p-3 opacity-0 shadow-xl transition-all duration-200 group-hover/submenu:pointer-events-auto group-hover/submenu:opacity-100 dark:border-zinc-800 dark:bg-zinc-900">
				<div className="mb-2 text-xs uppercase tracking-[0.25em] text-gray-400 dark:text-zinc-500">
					{item.title}
				</div>

				<div className="mb-2 border-t border-gray-200 dark:border-zinc-800" />

				<div className="space-y-1">
					{item.children.map((child) => (
						<DesktopDropdownItem
							key={child.title}
							item={child}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

function MobileNavigationItem({
	item,
	closeMenu,
	level = 0,
}: {
	item: NavigationItem;
	closeMenu: () => void;
	level?: number;
}) {
	if (!item.children) {
		return (
			<NavLink
				to={item.path!}
				onClick={closeMenu}
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
		<div className="space-y-2">
			<div
				className={
					level === 0
						? "font-medium text-gray-900 dark:text-zinc-100"
						: "pt-1 font-medium text-gray-700 dark:text-zinc-200"
				}
			>
				{item.title}
			</div>

			<div className="ml-4 flex flex-col gap-2">
				{item.children.map((child) => (
					<MobileNavigationItem
						key={child.title}
						item={child}
						closeMenu={closeMenu}
						level={level + 1}
					/>
				))}
			</div>
		</div>
	);
}

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

									<div className="pointer-events-none absolute left-0 top-full w-64 rounded-xl border border-gray-200 bg-white p-4 opacity-0 shadow-xl transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100 dark:border-zinc-800 dark:bg-zinc-900">
										<div className="mb-3 text-xs uppercase tracking-[0.25em] text-gray-400 dark:text-zinc-500">
											{item.title}
										</div>

										<div className="mb-2 border-t border-gray-200 dark:border-zinc-800" />

										<div className="space-y-1">
											{item.children.map((child) => (
												<DesktopDropdownItem
													key={child.title}
													item={child}
												/>
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
						{navigation.map((item) => (
							<MobileNavigationItem
								key={item.title}
								item={item}
								closeMenu={() => setOpen(false)}
							/>
						))}

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