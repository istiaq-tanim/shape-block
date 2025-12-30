import {
	MediaPlaceholder,
	RichText,
	useBlockProps,
} from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import { isBlobURL } from "@wordpress/blob";
import { Spinner, withNotices } from "@wordpress/components";

function Edit({ attributes, setAttributes, noticeOperations, noticeUI }) {
	const { name, bio, url, alt } = attributes;
	const onChangeName = (newName) => {
		setAttributes({ name: newName });
	};
	const onChangeBio = (newBio) => {
		setAttributes({ bio: newBio });
	};

	const onSelectUrl = (newUrl) => {
		setAttributes({ url: newUrl, id: undefined, alt: "" });
	};

	const onHandleError = (errorMessage) => {
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice(errorMessage);
	};

	const onSelectImage = (image) => {
		if (!image || !image.url) {
			setAttributes({ url: undefined, id: undefined, alt: "" });
			return;
		}
		setAttributes({ url: image.url, id: image.id, alt: image.alt });
	};
	return (
		<div {...useBlockProps()}>
			{url && (
				<div
					className={`wp-block-blocks-course-team-member-img${
						isBlobURL(url) ? " isLoading" : ""
					}`}
				>
					<img src={url} alt={alt} />
					{isBlobURL(url) && <Spinner></Spinner>}
				</div>
			)}
			<MediaPlaceholder
				icon="admin-users"
				onSelect={onSelectImage}
				onSelectURL={onSelectUrl}
				allowedTypes={["image"]}
				// accept="image/*"
				disableMediaButtons={url}
				onError={onHandleError}
				notices={noticeUI}
			></MediaPlaceholder>
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

export default withNotices(Edit);
