import { __ } from "@wordpress/i18n";
import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
} from "@wordpress/block-editor";
import "./editor.scss";
import { PanelBody } from "@wordpress/components";
import { RangeControl } from "@wordpress/components";
export default function Edit({ attributes, setAttributes }) {
	const { columns } = attributes;

	const handleColumnChange = (newColumnValue) => {
		setAttributes({ columns: newColumnValue });
	};

	return (
		<div
			{...useBlockProps({
				className: `has-${columns}-columns`,
			})}
		>
			<InspectorControls>
				<PanelBody>
					<RangeControl
						label={__("Columns", "shape-team-members")}
						min={1}
						max={6}
						value={columns}
						onChange={handleColumnChange}
					></RangeControl>
				</PanelBody>
			</InspectorControls>
			<InnerBlocks
				allowedBlocks={["create-block/shape-team-member"]}
				orientation="horizontal "
				template={[
					["create-block/shape-team-member"],
					["create-block/shape-team-member"],
				]}
			></InnerBlocks>
		</div>
	);
}
