export type NavigationItem = {
	title: string;
	path?: string;
	children?: NavigationItem[];
};

export const navigation: NavigationItem[] = [
	{ title: "Home", path: "/" },

	{ title: "New Paintings", path: "/gallery/0" },

	{
		title: "Galleries",
		children: [
			{ title: "Gallery 1 - (4' x 6')", path: "/gallery/8" },
			{ title: "Gallery 2 - (4' x 7')", path: "/gallery/9" },
			{ title: "Gallery 3 - (5' x 7')", path: "/gallery/10" },
			{ title: "Gallery 4", path: "/gallery/11" },
			{ title: "Public Commissions", path: "/gallery/7" },

			{
				title: "Archive Galleries",
				children: [
					{ title: "Gallery I", path: "/gallery/1" },
					{ title: "Gallery II", path: "/gallery/2" },
					{ title: "Gallery III", path: "/gallery/3" },
					{ title: "Gallery IV", path: "/gallery/4" },
					{ title: "Gallery V", path: "/gallery/5" },
					{ title: "Gallery VI", path: "/gallery/6" },
				],
			},

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