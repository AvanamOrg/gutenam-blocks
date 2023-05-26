/**
 * BLOCK: Base Icon
 */

import metadata from './block.json';

/**
 * Import Icon stuff
 */
import { advancedBtnIcon } from '@base/icons';
import edit from './edit';

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
registerBlockType( 'base/singlebtn', {
    ...metadata,
    title: __( 'Single Button', 'gutenam-blocks' ),
    description: __( 'Single button within a button block', 'gutenam-blocks' ),
    keywords: [
        __( 'Button', 'gutenam-blocks' ),
        __( 'btn', 'gutenam-blocks' ),
        'BB',
    ],
    icon: {
        src: advancedBtnIcon,
    },
    edit,
	save() {
		return null;
	},
	example: {
		attributes: {
			text: __( 'Click Me!', 'gutenam-blocks' ),
		}
	}
} );
