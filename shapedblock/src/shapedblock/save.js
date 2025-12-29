import { RichText, useBlockProps } from '@wordpress/block-editor';
import classNames from 'classnames';
export default function save( { attributes } ) {
	const { text, alignment, shadow, shadowOpacity } = attributes;

	const classes = classNames( `text-box-align-${ alignment }`, {
		'has-shadow': shadow,
		[ `shadow-opacity-${ shadowOpacity }` ]: shadow && shadowOpacity,
	} );

	return (
		<RichText.Content
			value={ text }
			{ ...useBlockProps.save( {
				className: classes,
			} ) }
			tagName="p"
		></RichText.Content>
	);
}
