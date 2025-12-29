import { RichText, useBlockProps } from '@wordpress/block-editor';
import classNames from 'classnames';
import BlockData from '../shapedblock/block.json';

const v1 = {
	supports: {
		html: false,
		color: {
			background: true,
			text: true,
			gradients: true,
			link: true,
		},
		spacing: {
			padding: true,
		},
	},

	attributes: {
		...BlockData.attributes,
		text: {
			type: 'string',
			source: 'html',
			selector: 'h4',
		},
	},
	save: ( { attributes } ) => {
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
				tagName="h4"
			></RichText.Content>
		);
	},
};

export default v1;
