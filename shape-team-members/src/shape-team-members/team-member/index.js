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
	},
	icon: "admin-users",
	edit: Edit,
	save: Save,
});
