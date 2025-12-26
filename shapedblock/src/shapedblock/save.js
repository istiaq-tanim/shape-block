import { RichText, useBlockProps } from '@wordpress/block-editor';
export default function save( { attributes } ) {
	const { text } = attributes;
	return (
		<RichText.Content
			value={ text }
			{ ...useBlockProps }
			tagName="h4"
		></RichText.Content>
	);
}
