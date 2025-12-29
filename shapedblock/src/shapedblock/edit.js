import { __ } from '@wordpress/i18n';
import {
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import './editor.scss';
import classnames from 'classnames';
import { PanelBody, RadioControl } from '@wordpress/components';
import { RangeControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const { text, alignment, shadow, shadowOpacity } = attributes;

	const onAlignmentChange = ( value ) => {
		setAttributes( { alignment: value } );
	};

	const onChangeText = ( value ) => {
		setAttributes( { text: value } );
	};

	const toggleShadow = () => {
		setAttributes( { shadow: ! shadow } );
	};

	const onOpacityChange = ( newOpacity ) => {
		setAttributes( { shadowOpacity: newOpacity } );
	};

	const classes = classnames( `text-box-align-${ alignment }`, {
		'has-shadow': shadow,
		[ `shadow-opacity-${ shadowOpacity }` ]: shadow && shadowOpacity,
	} );

	// const onBackGroundChange = ( value ) => {
	// 	setAttributes( { backGround: value } );
	// };

	// const handleTextColorChange = ( value ) => {
	// 	setAttributes( { textColor: value } );
	// };
	return (
		<>
			{ /* <InspectorControls>
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
			</InspectorControls> */ }

			{ shadow && (
				<InspectorControls>
					<PanelBody title={ __( 'Opacity Control', 'shaped-text' ) }>
						<RangeControl
							label={ __( 'Opacity Value', 'shaped-text' ) }
							value={ shadowOpacity }
							min={ 10 }
							max={ 40 }
							range={ 10 }
							onChange={ onOpacityChange }
						></RangeControl>
					</PanelBody>
				</InspectorControls>
			) }
			<BlockControls
				controls={ [
					{
						icon: 'admin-page',
						title: __( 'Shadow', 'shaped-text' ),
						onClick: toggleShadow,
						isActive: shadow,
					},
				] }
			>
				<AlignmentToolbar
					onChange={ onAlignmentChange }
					value={ alignment }
				></AlignmentToolbar>
			</BlockControls>
			<div
				{ ...useBlockProps( {
					className: classes,
				} ) }
			>
				<RichText
					onChange={ onChangeText }
					value={ text }
					tagName="p"
					placeholder={ __( 'Your Text', 'shaped-text' ) }
					allowedFormats={ [] }
				/>
			</div>
		</>
	);
}
