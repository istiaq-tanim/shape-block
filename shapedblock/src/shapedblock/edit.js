import { __ } from '@wordpress/i18n';
import {
	AlignmentToolbar,
	BlockControls,
	RichText,
	useBlockProps,
	InspectorControls,
	PanelColorSettings,
	ContrastChecker,
} from '@wordpress/block-editor';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { text, alignment, textColor, backGround } = attributes;

	const colors = [
		{
			name: 'red',
			color: '#f00',
		},
		{
			name: 'black',
			color: '#000',
		},
		{
			name: 'white',
			color: '#fff',
		},
		{ name: 'blue', color: '#00f' },
	];

	const onAlignmentChange = ( value ) => {
		setAttributes( { alignment: value } );
	};

	const onChangeText = ( value ) => {
		setAttributes( { text: value } );
	};
	const onBackGroundChange = ( value ) => {
		setAttributes( { backGround: value } );
	};

	const handleTextColorChange = ( value ) => {
		setAttributes( { textColor: value } );
	};
	return (
		<>
			<InspectorControls>
				<PanelColorSettings
					title={ __( 'Color Settings', 'shaped-text' ) }
					icon="admin-appearance"
					disableCustomColors={ false }
					initialOpen
					colorSettings={ [
						{
							value: backGround,
							onChange: onBackGroundChange,
							label: __( 'Background Color', 'shaped-text' ),
						},
						{
							value: textColor,
							onChange: handleTextColorChange,
							label: __( 'Text Color', 'shaped-text' ),
						},
					] }
				>
					<ContrastChecker
						backgroundColor={ backGround }
						textColor={ textColor }
					></ContrastChecker>
				</PanelColorSettings>
			</InspectorControls>
			<BlockControls>
				<AlignmentToolbar
					onChange={ onAlignmentChange }
					value={ alignment }
				></AlignmentToolbar>
			</BlockControls>
			<RichText
				{ ...useBlockProps( {
					className: `text-box-align-${ alignment }`,
					style: {
						backgroundColor: backGround,
						color: textColor,
					},
				} ) }
				onChange={ onChangeText }
				value={ text }
				tagName="h4"
				placeholder={ __( 'Your Text', 'shaped-text' ) }
				allowedFormats={ [] }
			/>
		</>
	);
}
