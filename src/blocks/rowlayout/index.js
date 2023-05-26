/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Import Icons
 */
import { blockRowIcon } from '@base/icons';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Import Css
 */
 import './style.scss';

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';
import save from './save';
import deprecated from './deprecated';

registerBlockType( 'base/rowlayout', {
	...metadata,
	title: __( 'Row Layout', 'gutenam-blocks' ),
	description: __( 'A container to hold a grid layout.', 'gutenam-blocks' ),
	keywords: [
		__( 'column', 'gutenam-blocks' ),
		__( 'row/layout', 'gutenam-blocks' ),
		'BB',
	],
	icon: {
		src: blockRowIcon,
	},
	edit,
	save,
	deprecated,
	supports: {
		anchor: true,
		btdynamic: true,
		bbcss: true,
	},
	example: {
		attributes: {
			colLayout: 'equal',
			columns: 2,
			customGutter: [ 0, 0, 0 ]
		},
		innerBlocks: [
			{
				name: 'base/column',
				attributes: {
					background: '#DADADA',
					padding: [ 30, 20, 30, 20 ],
				},
				innerBlocks: [
					{
						name: 'core/paragraph',
						attributes: {
							content: __( 'Column 1', 'gutenam-blocks' ),
						}
					}
				]
			},
			{
				name: 'base/column',
				attributes: {
					background: '#f5f5f5',
					padding: [ 30, 20, 30, 20 ],
				},
				innerBlocks: [
					{
						name: 'core/paragraph',
						attributes: {
							content: __( 'Column 2', 'gutenam-blocks' ),
						}
					}
				]
			}
		]
	}
});
