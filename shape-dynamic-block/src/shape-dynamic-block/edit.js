import { __ } from "@wordpress/i18n";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import "./editor.scss";
import { useSelect } from "@wordpress/data";
import { RawHTML } from "@wordpress/element";
import { PanelBody, ToggleControl, QueryControls } from "@wordpress/components";
import { format, dateI18n, getSettings } from "@wordpress/date";

export default function Edit({ attributes, setAttributes }) {
	const { numberOfPosts, displayFeaturedImage, order, orderBy } = attributes;
	const posts = useSelect((select) => {
		return select("core").getEntityRecords(
			"postType",
			"post",
			{
				per_page: numberOfPosts,
				_embed: true,
				order,
				orderby: orderBy,
			},
			[numberOfPosts, order, orderBy],
		);
	});

	const categories = useSelect((select) => {
		return select("core").getEntityRecords("taxonomy", "category");
	});

	const onNumberChanges = (value) => {
		setAttributes({ numberOfPosts: value });
	};

	const onDisplayImageChange = (value) => {
		setAttributes({ displayFeaturedImage: value });
	};

	return (
		<>
			<InspectorControls>
				<PanelBody>
					<QueryControls
						numberOfItems={numberOfPosts}
						maxItems={9}
						minItems={1}
						onNumberOfItemsChange={onNumberChanges}
						order={order}
						orderBy={orderBy}
						onOrderChange={(value) => setAttributes({ order: value })}
						onOrderByChange={(value) => setAttributes({ orderBy: value })}
					></QueryControls>
					<ToggleControl
						label={__("Display Featured Image", "shape-dynamic-block")}
						onChange={onDisplayImageChange}
						checked={displayFeaturedImage}
					></ToggleControl>
				</PanelBody>
			</InspectorControls>
			<ul {...useBlockProps()}>
				{posts &&
					posts.map((post) => {
						const featuredImage =
							post._embedded &&
							post._embedded["wp:featuredmedia"] &&
							post._embedded["wp:featuredmedia"].length > 0 &&
							post._embedded["wp:featuredmedia"][0];

						return (
							<li key={post.id}>
								{displayFeaturedImage && featuredImage && (
									<img
										src={featuredImage.media_details.sizes.medium.source_url}
										alt={featuredImage.alt_text}
									/>
								)}
								<h5>
									<a href={post.link}>
										{post.title.rendered ? (
											<RawHTML>{post.title.rendered}</RawHTML>
										) : (
											__("No title", "shape-dynamic-block")
										)}
									</a>
								</h5>
								{post.date_gmt && (
									<time dateTime={format("c", post.date_gmt)}>
										{dateI18n(getSettings().formats.date, post.date_gmt)}
									</time>
								)}
								{post.excerpt.rendered && (
									<RawHTML>{post.excerpt.rendered}</RawHTML>
								)}
							</li>
						);
					})}
			</ul>
		</>
	);
}
