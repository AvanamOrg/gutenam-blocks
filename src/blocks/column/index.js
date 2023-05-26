/**
 * Import Icons
 */
 import { blockColumnIcon } from '@base/icons';

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
import { __ } from '@wordpress/i18n';

registerBlockType( 'base/column', {
	...metadata,
	title: __( 'Section', 'gutenam-blocks' ),
	description: __( 'A container to style a section of content.', 'gutenam-blocks' ),
	keywords: [
		__( 'column', 'gutenam-blocks' ),
		__( 'section', 'gutenam-blocks' ),
		'BB',
	],
	icon: {
		src: blockColumnIcon,
	},
	edit,
	save,
	deprecated,
	example: {
		attributes: {
			background: '#DADADA',
			padding: [ 30, 20, 30, 20 ],
		},
		innerBlocks: [
			{
				name: 'core/paragraph',
				attributes: {
					content: __( 'Section content', 'gutenam-blocks' ),
				}
			}
		]
	}
});
