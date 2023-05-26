/**
 * BLOCK: Base Tabs
 */

/**
 * Register sub blocks.
 */
 import './tab/block.js';

 /**
 * Import Css
 */
  import './style.scss';
/**
 * Import Icons
 */
import { blockTabsIcon } from '@base/icons';
/**
 * Import attributes
 */
import metadata from './block.json';

/**
 * Import edit
 */
import edit from './edit';
import deprecated from './deprecated';
/**
 * Import save
 */
import save from './save';
/**
 * Import Css
 */
// import './style.scss';
// import './editor.scss';

/**
 * Internal block libraries
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Register: a Gutenberg Block.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'base/tabs', {
	...metadata,
	title: __( 'Tabs', 'gutenam-blocks' ),
	keywords: [
		__( 'tabs', 'gutenam-blocks' ),
		__( 'tab', 'gutenam-blocks' ),
		'BB',
	],
	icon: {
		src: blockTabsIcon,
	},
	getEditWrapperProps( { blockAlignment } ) {
		if ( 'full' === blockAlignment || 'wide' === blockAlignment || 'center' === blockAlignment ) {
			return { 'data-align': blockAlignment };
		}
	},
	edit,
	save,
	deprecated,
	example: {
		attributes: {
			uniqueID: '123456789',
			titleColor: '#FFFFFF',
			titleBg: '#2B6CB0'
		},
		innerBlocks: [
			{
				name: 'base/tab',
				innerBlocks: [
					{
						name: 'core/heading',
						attributes: {
							content: __( 'Tab 1 Content', 'gutenam-blocks' ),
						}
					}
				]
			}
		]
	}
} );
