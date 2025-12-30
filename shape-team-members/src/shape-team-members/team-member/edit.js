import { RichText, useBlockProps } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

function Edit({ attributes, setAttributes }) {
	const { name, bio } = attributes;
	const onChangeName = (newName) => {
		setAttributes({ name: newName });
	};
	const onChangeBio = (newBio) => {
		setAttributes({ bio: newBio });
	};
	return (
		<div {...useBlockProps()}>
			<RichText
				placeholder={__("Member Name", "shape-team-members")}
				onChange={onChangeName}
				tagName="h4"
				value={name}
				allowedFormats={[]}
			></RichText>

			<RichText
				placeholder={__("Member Bio", "shape-team-members")}
				onChange={onChangeBio}
				tagName="p"
				value={bio}
				allowedFormats={[]}
			></RichText>
		</div>
	);
}

export default Edit;
