import type { Painting } from "@david/shared";

type ArtworkImageProps = {
	painting: Painting;
	className?: string;
	onClick?: () => void;
	loading?: "eager" | "lazy";
};

export default function ArtworkImage({
	painting,
	className = "",
	onClick,
	loading = "lazy",
}: ArtworkImageProps) {
	return (
		<img
			src={painting.image}
			alt={painting.title}
			loading={loading}
			decoding="async"
			onClick={onClick}
			onError={(event) => {
				event.currentTarget.src =
					"/images/placeholders/image-coming-soon.jpg";
			}}
			style={{
				objectPosition: painting.objectPosition ?? "center center",
			}}
			className={className}
		/>
	);
}
