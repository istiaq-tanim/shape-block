import { useBlockProps, RichText } from "@wordpress/block-editor";
import { Icon } from "@wordpress/components";
export default function Save({ attributes }) {
	const { name, bio, url, alt, id, socialLinks } = attributes;
	return (
		<div {...useBlockProps.save()}>
			{url && (
				<img className={id ? `wp-image-${id}` : null} src={url} alt={alt} />
			)}
			{name && <RichText.Content tagName="h4" value={name}></RichText.Content>}
			{bio && <RichText.Content tagName="p" value={bio}></RichText.Content>}
			{socialLinks.length > 0 && (
				<div className="wp-block-blocks-course-team-member-social-links">
					<ul>
						{socialLinks.map((item, index) => {
							return (
								<li key={index} data-icon={item.icon}>
									<a href={item.link}>
										<Icon icon={item.icon}></Icon>
									</a>
								</li>
							);
						})}
					</ul>
				</div>
			)}
		</div>
	);
}
