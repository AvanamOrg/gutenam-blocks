/**
 * BLOCK: Base Count Up
 */

/**
 * Import Icons
 */
import { countUpIcon } from '@base/icons';

/**
 * Import edit
 */
import edit from './edit';

/**
 * Import save
 */
import save from './save';

/**
 * Import metadata
 */
import metadata from './block.json';

/**
 * Import deprecated
 */
import deprecated from './deprecated';
/**
 * Import Css
 */
import './editor.scss';

/**
 * Internal block libraries
 */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Register: a Gutenberg Block.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'base/countup', {
	...metadata,
	title: __( 'Count Up', 'gutenam-blocks' ),
	description: __( 'An animated count up or down to a specific value.', 'gutenam-blocks' ),
	keywords: [
		__( 'count down', 'gutenam-blocks' ),
		__( 'count up', 'gutenam-blocks' ),
		__( 'counter', 'gutenam-blocks' ),
		__( 'number', 'gutenam-blocks' ),
		'BB',
	],
	icon: {
		src: countUpIcon,
	},
	edit,
	save,
	deprecated,
	example: {
		attributes: {
			title: __( 'My count up title', 'gutenam-blocks' ),
		}
	}
} );
