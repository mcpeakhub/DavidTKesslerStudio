export type NavigationItem = {
	title: string;
	path?: string;
	children?: {
		title: string;
		path: string;
	}[];
};

export const navigation: NavigationItem[] = [
	{ title: "Home", path: "/" },

	{ title: "New Paintings", path: "/gallery/0" },

	{
		title: "Galleries",
		children: [
			{ title: "Gallery 1", path: "/gallery/1" },
			{ title: "Gallery 2", path: "/gallery/2" },
			{ title: "Gallery 3", path: "/gallery/3" },
			{ title: "Gallery 4", path: "/gallery/4" },
			{ title: "Gallery 5", path: "/gallery/5" },
			{ title: "Gallery 6", path: "/gallery/6" },
		],
	},

	{ title: "Corporate", path: "/corporate" },
	{ title: "Museums", path: "/museums" },

	{
		title: "Exhibitions",
		children: [
			{ title: "Solo Exhibitions", path: "/solo-exhibitions" },
			{ title: "Group Exhibitions", path: "/group-exhibitions" },
		],
	},

	{ title: "Painting on Metal", path: "/painting-on-metal" },
	{ title: "About", path: "/about" },
	{ title: "Contact", path: "/contact" },
];
