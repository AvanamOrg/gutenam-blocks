/**
 * BLOCK: Base Latest Posts
 *
 * Registering a block with Gutenberg.
 */

/**
 * Import Icons
 */
import { postsIcon } from '@base/icons';

/**
 * Import Css
 */
import './editor.scss';
import './style.scss';

import edit from './edit';
import metadata from './block.json';


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
registerBlockType( 'base/posts', {
	...metadata,
	title: __( 'Posts', 'gutenam-blocks' ),
	keywords: [
		__( 'posts', 'gutenam-blocks' ),
		__( 'latest posts', 'gutenam-blocks' ),
		__( 'blog', 'gutenam-blocks' ),
		'BB',
	],
	icon: {
		src: postsIcon,
	},
	edit,
	save() {
		return null;
	},
	example: {
		attributes: {
			columns: 1,
			postsToShow: 2
		}
	}
} );
