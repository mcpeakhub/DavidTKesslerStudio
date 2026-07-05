export type Painting = {
	id: string;
	title: string;
	gallery: number;
	year?: number;
	medium: string;
	dimensions?: string;
	framed?: boolean;
	sold?: boolean;
	soldLabel?: string;
	image: string;
	thumbnail?: string;
	description?: string;
	location?: string;
	featured?: boolean;
	dateAdded?: string;
	objectPosition?: string;
};
