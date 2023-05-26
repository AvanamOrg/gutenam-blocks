/**
 * BLOCK: Base Advanced Btn
 */
/**
 * Import Icons
 */
import { advancedBtnIcon } from '@base/icons';

/**
 * Register sub blocks.
 */
import '../singlebtn/block.js';

/**
 * Import Css
 */
 import './style.scss';

import edit from './edit';
import deprecated from './deprecated';
import save from './save';
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
registerBlockType( 'base/advancedbtn', {
	...metadata,
	title: __( 'Advanced Buttons', 'gutenam-blocks' ),
	description: __( 'Create an advanced button or a row of buttons. Style each one, including hover controls', 'gutenam-blocks' ),
	keywords: [
		__( 'button', 'gutenam-blocks' ),
		__( 'icon', 'gutenam-blocks' ),
		'BB',
	],
	icon: {
		src: advancedBtnIcon,
	},
	edit,
	save,
	deprecated,
	example: {
		innerBlocks: [
			{
				name: 'base/singlebtn',
				attributes: {
					text: __( 'Click Me!', 'gutenam-blocks' ),
				}
			}
		]
	}
} );
