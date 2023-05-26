/**
 * BLOCK: Base Icon
 */

import metadata from './block.json';

/**
 * Register sub blocks.
 */
import '../single-icon/block.js';

/**
 * Import Icon stuff
 */
import { iconIcon } from '@base/icons';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';

/**
 * Import Css
 */
 import './style.scss';

/**
 * Internal block libraries
 */
import {
	registerBlockType,
} from '@wordpress/blocks';
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
registerBlockType( 'base/icon', {
	...metadata,
	title: __( 'Icon', 'gutenam-blocks' ),
	description: __( 'Create engaging lists with icons for bullets.', 'gutenam-blocks' ),
	keywords: [
		__( 'icon', 'gutenam-blocks' ),
		__( 'svg', 'gutenam-blocks' ),
		'BB',
	],
	icon: {
		src: iconIcon,
	},
	edit,
	save,
	deprecated,
	example: {}
} );
