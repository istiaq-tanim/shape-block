import { useBlockProps, RichText } from "@wordpress/block-editor";
export default function Save({ attributes }) {
	const { name, bio, url, alt, id } = attributes;
	return (
		<div {...useBlockProps.save()}>
			{url && (
				<img className={id ? `wp-image-${id}` : null} src={url} alt={alt} />
			)}
			<RichText.Content tagName="h4" value={name}></RichText.Content>
			<RichText.Content tagName="p" value={bio}></RichText.Content>
		</div>
	);
}
