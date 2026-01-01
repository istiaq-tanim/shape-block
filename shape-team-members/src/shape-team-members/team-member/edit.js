import { useEffect, useState, useRef } from "@wordpress/element";
import {
	useBlockProps,
	RichText,
	MediaPlaceholder,
	BlockControls,
	MediaReplaceFlow,
	InspectorControls,
	store as blockEditorStore,
} from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import { useSelect } from "@wordpress/data";
import { usePrevious } from "@wordpress/compose";
import { isBlobURL, revokeBlobURL } from "@wordpress/blob";
import {
	Spinner,
	withNotices,
	ToolbarButton,
	PanelBody,
	TextareaControl,
	SelectControl,
	Icon,
	Tooltip,
	TextControl,
	Button,
} from "@wordpress/components";
import {
	DndContext,
	useSensor,
	useSensors,
	PointerSensor,
} from "@dnd-kit/core";
import {
	SortableContext,
	arrayMove,
	horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";

function Edit({
	attributes,
	setAttributes,
	noticeOperations,
	noticeUI,
	isSelected,
}) {
	const { name, bio, url, alt, id, socialLinks } = attributes;
	const [blobURL, setBlobURL] = useState();
	const [selectedLink, setSelectedLink] = useState();
	const imageObject = useSelect(
		(select) => {
			const { getMedia } = select("core");
			return id ? getMedia(id) : null;
		},
		[id],
	);

	const imageSizes = useSelect((select) => {
		return select("core/block-editor").getSettings().imageSizes;
	}, []);

	const titleRef = useRef();

	const prevUrl = usePrevious(url);

	const previousSelected = usePrevious(isSelected);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: { distance: 5 },
		}),
	);

	const getImageOptions = () => {
		if (!imageObject) return [];
		const options = [];
		const sizes = imageObject.media_details.sizes;

		for (const key in sizes) {
			const size = sizes[key];
			const imageSize = imageSizes.find((s) => s.slug === key);
			if (imageSize) {
				options.push({
					label: imageSize.name,
					value: size.source_url,
				});
			}
		}
		return options;
	};

	useEffect(() => {
		if (!id && isBlobURL(url)) {
			setAttributes({ alt: "", url: undefined });
		}
	}, []);

	useEffect(() => {
		if (isBlobURL(url)) {
			setBlobURL(url);
		} else {
			revokeBlobURL(blobURL);
			setBlobURL();
		}
	}, [url]);

	useEffect(() => {
		if (url && !prevUrl) {
			titleRef.current.focus();
		}
	}, [url, prevUrl]);

	useEffect(() => {
		if (previousSelected && !isSelected) {
			setSelectedLink();
		}
	}, [previousSelected, isSelected]);

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

	const onRemoveImage = () => {
		setAttributes({
			url: undefined,
			alt: "",
			id: undefined,
		});
	};

	const onChangeAlt = (newAlt) => {
		setAttributes({ alt: newAlt });
	};

	const onChangeImageSize = (newUrl) => {
		setAttributes({ url: newUrl });
	};

	const addNewSocialLink = () => {
		setAttributes({
			socialLinks: [...socialLinks, { icon: "wordpress", link: "" }],
		});
		setSelectedLink(socialLinks.length);
	};

	const updateSocialLink = (type, value) => {
		const copySocialLinks = [...socialLinks];
		copySocialLinks[selectedLink][type] = value;
		setAttributes({ socialLinks: copySocialLinks });
	};

	const onRemoveLink = () => {
		setAttributes({
			socialLinks: [
				...socialLinks.slice(0, selectedLink),
				...socialLinks.slice(selectedLink + 1),
			],
		});
		setSelectedLink();
	};

	const handleDragEnd = (event) => {
		const { active, over } = event;

		if (active.id && over.id && active.id !== over.id) {
			const oldIndex = socialLinks.findIndex(
				(item) => active.id === `${item.icon}-${item.link}`,
			);
			const newIndex = socialLinks.findIndex(
				(item) => over.id === `${item.icon}-${item.link}`,
			);
			setAttributes({
				socialLinks: arrayMove(socialLinks, oldIndex, newIndex),
			});
			setSelectedLink(newIndex);
		}
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Image Settings", "shape-team-members")}>
					<SelectControl
						label={__("Image Size")}
						options={getImageOptions()}
						value={url}
						onChange={onChangeImageSize}
					></SelectControl>
					{url && !isBlobURL(url) && (
						<TextareaControl
							label={__("Alt Text", "shape-team-members")}
							value={alt}
							onChange={onChangeAlt}
							help={__(
								"Alternative text describes your image to people can not see it.",
								"shape-team-members",
							)}
						></TextareaControl>
					)}
				</PanelBody>
			</InspectorControls>
			{url && (
				<BlockControls group="inline">
					<MediaReplaceFlow
						name={__("Replace Image", "shape-team-members")}
						onSelect={onSelectImage}
						onSelectURL={onSelectUrl}
						allowedTypes={["image"]}
						accept="image/*"
						disableMediaButtons={url}
						onError={onHandleError}
						mediaId={id}
						mediaURL={url}
					></MediaReplaceFlow>

					<ToolbarButton onClick={onRemoveImage}>
						{__("Remove Image", "shape-team-members")}
					</ToolbarButton>
				</BlockControls>
			)}
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
					accept="image/*"
					disableMediaButtons={url}
					onError={onHandleError}
					notices={noticeUI}
				></MediaPlaceholder>
				<RichText
					placeholder={__("Member Name", "shape-team-members")}
					onChange={onChangeName}
					ref={titleRef}
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

				<div className="wp-block-blocks-course-team-member-social-links">
					<ul>
						<DndContext
							sensors={sensors}
							onDragEnd={handleDragEnd}
							modifiers={[restrictToHorizontalAxis]}
						>
							<SortableContext
								items={socialLinks.map((item) => `${item.icon}-${item.link}`)}
								strategy={horizontalListSortingStrategy}
							>
								{socialLinks.map((item, index) => {
									return (
										<SortableItem
											key={`${item.icon}-${item.link}`}
											id={`${item.icon}-${item.link}`}
											index={index}
											selectedLink={selectedLink}
											setSelectedLink={setSelectedLink}
											icon={item.icon}
										></SortableItem>
									);
								})}
							</SortableContext>
						</DndContext>
						{isSelected && (
							<li className="wp-block-blocks-course-team-member-add-icon-link">
								<Tooltip text={__("Add Social Link", "shape-team-members")}>
									<button
										onClick={addNewSocialLink}
										aria-label={__("Add Social Link", "shape-team-members")}
									>
										<Icon icon={"plus"}></Icon>
									</button>
								</Tooltip>
							</li>
						)}
					</ul>
				</div>
				{selectedLink !== undefined && (
					<div className="wp-block-blocks-course-team-member-link-form">
						<TextControl
							value={socialLinks[selectedLink].icon}
							label={__("Icon", "shape-team-members")}
							onChange={(icon) => {
								updateSocialLink("icon", icon);
							}}
						></TextControl>
						<TextControl
							value={socialLinks[selectedLink].link}
							label={__("URL", "shape-team-members")}
							onChange={(icon) => {
								updateSocialLink("link", icon);
							}}
						></TextControl>
						<br />
						<Button
							variant="primary"
							label={__("Remove Link", "shape-team-members")}
							onClick={onRemoveLink}
						>
							Remove
						</Button>
					</div>
				)}
			</div>
		</>
	);
}

export default withNotices(Edit);
