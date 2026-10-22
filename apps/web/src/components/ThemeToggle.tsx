import { Moon, Sun } from "lucide-react";

type ThemeToggleProps = {
    dark: boolean;
    onToggle: () => void;
};

export default function ThemeToggle({
    dark,
    onToggle,
}: ThemeToggleProps) {
    return (
        <button
            type="button"
            onClick={onToggle}
            className="rounded-full border border-gray-300 p-2 text-gray-600 transition hover:border-black hover:text-black dark:border-gray-700 dark:text-gray-300 dark:hover:border-white dark:hover:text-white"
            aria-label="Toggle dark mode"
            aria-pressed={dark}
        >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    );
}
