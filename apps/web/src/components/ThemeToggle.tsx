import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
	const [dark, setDark] = useState(() => {
		return localStorage.getItem("theme") === "dark";
	});

	useEffect(() => {
		document.documentElement.classList.toggle("dark", dark);
		localStorage.setItem("theme", dark ? "dark" : "light");
	}, [dark]);

	return (
		<button
			type="button"
			onClick={() => setDark((value) => !value)}
			className="rounded-full border border-gray-300 p-2 text-gray-600 transition hover:border-black hover:text-black dark:border-gray-700 dark:text-gray-300 dark:hover:border-white dark:hover:text-white"
			aria-label="Toggle dark mode"
		>
			{dark ? <Sun size={18} /> : <Moon size={18} />}
		</button>
	);
}
