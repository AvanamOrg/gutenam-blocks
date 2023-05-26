import { registerBlockType } from '@wordpress/blocks';

/**
 * Register sub blocks.
 */
import '../testimonial/block.js';

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';
import save from './save';
import deprecated from './deprecated';

const { name } = metadata;
import { testimonialBlockIcon } from '@base/icons';
import { __ } from '@wordpress/i18n';
import './style.scss';

export { metadata, name };

registerBlockType( 'base/testimonials', {
	...metadata,
	title   : __( 'Testimonials', 'gutenam-blocks' ),
	keywords: [
		__( 'testimonials', 'gutenam-blocks' ),
		__( 'rating', 'gutenam-blocks' ),
		'BB',
	],
	icon    : {
		src: testimonialBlockIcon,
	},
	edit,
	save,
	deprecated,
	example: {}
} );
