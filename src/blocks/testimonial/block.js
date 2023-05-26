import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';

const { name } = metadata;
import { testimonialSingleBlockIcon } from '@base/icons';
import { __ } from '@wordpress/i18n';

export { metadata, name };

registerBlockType( 'base/testimonial', {
	...metadata,
	title   : __( 'Testimonial', 'gutenam-blocks' ),
	keywords: [
		__( 'testimonial', 'gutenam-blocks' ),
		__( 'rating', 'gutenam-blocks' ),
		'BB',
	],
	icon    : {
		src: testimonialSingleBlockIcon,
	},
	edit,
	example: {}
} );
