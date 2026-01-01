import { createBlock, registerBlockType } from "@wordpress/blocks";
import "./style.scss";
import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";
import "./team-member";

registerBlockType(metadata.name, {
	edit: Edit,
	save,
	transforms: {
		from: [
			{
				type: "block",
				blocks: ["core/gallery"],
				transform: ({ columns, images }) => {
					const innerBlocks = images.map(({ url, id, alt }) => {
						return createBlock("create-block/shape-team-member", {
							alt,
							id,
							url,
						});
					});
					return createBlock(
						"create-block/shape-team-members",
						{
							columns: columns || 2,
						},
						innerBlocks,
					);
				},
			},
			{
				type: "block",
				blocks: ["core/image"],
				isMultiBlock: true,
				transform: (attributes) => {
					console.log(attributes);
					const innerBlocks = attributes.map(({ url, id, alt }) => {
						return createBlock("create-block/shape-team-member", {
							alt,
							id,
							url,
						});
					});
					return createBlock(
						"create-block/shape-team-members",
						{
							column: attributes.length > 3 ? 3 : attributes.length,
						},
						innerBlocks,
					);
				},
			},
		],
	},
});
