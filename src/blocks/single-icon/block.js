/**
 * BLOCK: Base Icon
 */

import metadata from './block.json';

/**
 * Import Icon stuff
 */
import { iconIcon } from '@base/icons';
import edit from './edit';
import save from './save';

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
registerBlockType( 'base/single-icon', {
    ...metadata,
    title: __( 'Single Icon', 'gutenam-blocks' ),
    description: __( 'Single icon within Icon block', 'gutenam-blocks' ),
    keywords: [
        __( 'icon', 'gutenam-blocks' ),
        __( 'svg', 'gutenam-blocks' ),
        'BB',
    ],
    icon: {
        src: iconIcon,
    },
    getEditWrapperProps( { blockAlignment } ) {
        if ( 'left' === blockAlignment || 'right' === blockAlignment || 'center' === blockAlignment ) {
            return { 'data-align': blockAlignment };
        }
    },
    edit,
    save,
	example: {}
} );
