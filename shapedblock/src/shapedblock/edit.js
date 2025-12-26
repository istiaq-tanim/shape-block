import { __ } from '@wordpress/i18n';
import {
	BlockControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import './editor.scss';
import {
	ToolbarGroup,
	ToolbarButton,
	ToolbarDropdownMenu,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const { text } = attributes;
	return (
		<>
			<BlockControls group="inline">
				<p>Inline Controls</p>
			</BlockControls>
			<BlockControls group="block">
				<p>Block Controls</p>
			</BlockControls>
			{ text && (
				<BlockControls group="other">
					<ToolbarGroup>
						<ToolbarButton
							icon="editor-alignleft"
							title="Align Left"
							onClick={ () =>
								console.log( 'Align Left Clicked' )
							}
						></ToolbarButton>
						<ToolbarButton
							icon="editor-aligncenter"
							title="Align Center"
							onClick={ () =>
								console.log( 'Align Center Clicked' )
							}
						></ToolbarButton>
						<ToolbarButton
							icon="editor-alignright"
							title="Align Right"
							onClick={ () =>
								console.log( 'Align Right Clicked' )
							}
						></ToolbarButton>

						<ToolbarDropdownMenu
							icon="arrow-down-alt2"
							label={ __( 'More Alignments', 'shaped-text' ) }
							controls={ [
								{
									title: __( 'Wide', 'shaped-text' ),
									icon: 'align-wide',
								},
								{
									title: __( 'Full', 'shaped-text' ),
									icon: 'align-full-width',
								},
							] }
						></ToolbarDropdownMenu>
					</ToolbarGroup>
				</BlockControls>
			) }
			<RichText
				{ ...useBlockProps() }
				onChange={ ( value ) => setAttributes( { text: value } ) }
				value={ text }
				tagName="h4"
				placeholder={ __( 'Your Text', 'text-box' ) }
				allowedFormats={ [] }
			/>
		</>
	);
}
