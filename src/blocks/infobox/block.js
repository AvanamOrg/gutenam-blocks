/**
 * BLOCK: Base Info Box
 */

/**
 * Import Icons
 */
import { infoboxIcon } from '@base/icons';
import metadata from './block.json';
import deprecated from './deprecated.js'
import save from './save';

import { IconRender, IconSpanTag } from '@base/components';

/**
 * Import edit
 */
import edit from './edit';
/**
 * Import Css
 */
 import './style.scss';

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
registerBlockType( 'base/infobox', {
	...metadata,
	title: __( 'Info Box', 'gutenam-blocks' ),
	description: __( 'Create beautiful information boxes using icons or images.', 'gutenam-blocks' ),
	keywords: [
		__( 'icon', 'gutenam-blocks' ),
		__( 'info', 'gutenam-blocks' ),
		'BB',
	],
	icon: {
		src: infoboxIcon,
	},
	deprecated,
	edit,
	save,
	example: {}
} );
