import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import Edit from "./edit";
import Save from "./save";

registerBlockType("create-block/shape-team-member", {
	title: __("team Member", "shape-team-members"),
	parent: ["create-block/shape-team-members"],
	description: __("A Team Members Item", "shape-team-members"),
	supports: {
		html: false,
		reusable: false,
	},
	attributes: {
		name: {
			type: "string",
			source: "html",
			selector: "h4",
		},
		bio: {
			type: "string",
			source: "html",
			selector: "p",
		},
		id: {
			type: "number",
		},
		alt: {
			type: "string",
			source: "attribute",
			selector: "img",
			attribute: "alt",
			default: "",
		},
		url: {
			type: "string",
			source: "attribute",
			selector: "img",
			attribute: "src",
		},
		socialLinks: {
			type: "array",
			default: [
				{ link: "https:/facebook.com", icon: "facebook" },
				{ link: "https:/instagram.com", icon: "instagram" },
			],
			source: "query",
			selector: ".wp-block-blocks-course-team-member-social-links ul li",
			query: {
				icon: {
					source: "attribute",
					attribute: "data-icon",
				},
				link: {
					source: "attribute",
					selector: "a",
					attribute: "href",
				},
			},
		},
	},
	icon: "admin-users",
	edit: Edit,
	save: Save,
});
