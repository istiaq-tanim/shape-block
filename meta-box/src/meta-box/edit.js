import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";
import { useEntityProp } from "@wordpress/core-data";
import "./editor.scss";
import { TextControl } from "@wordpress/components";
import { useSelect } from "@wordpress/data";

export default function Edit() {
	const postType = useSelect((select) => {
		return select("core/editor").getCurrentPostType();
	}, []);
	const [meta, setMeta] = useEntityProp("postType", postType, "meta");
	const subtitle = meta._create_block_post_subtitle;
	const onSubtitleChange = (value) => {
		setMeta({ ...meta, _create_block_post_subtitle: value });
	};
	return (
		<div {...useBlockProps()}>
			{subtitle ? (
				<TextControl
					label={__("Post Subtitle", "meta-box")}
					value={subtitle}
					onChange={onSubtitleChange}
				></TextControl>
			) : (
				<p>{__("Meta Field is Not Register", "meta-box")}</p>
			)}
		</div>
	);
}
