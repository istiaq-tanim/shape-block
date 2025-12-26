import { RichText, useBlockProps } from '@wordpress/block-editor';
export default function save( { attributes } ) {
	const { text, alignment, textColor, backGround } = attributes;
	return (
		<RichText.Content
			value={ text }
			{ ...useBlockProps.save( {
				className: `text-box-align-${ alignment }`,
				style: {
					color: textColor,
					backgroundColor: backGround,
				},
			} ) }
			tagName="h4"
		></RichText.Content>
	);
}
