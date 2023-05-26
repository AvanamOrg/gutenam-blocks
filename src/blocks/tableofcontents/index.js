import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';
import { tableOfContentsIcon } from '@base/icons';

/**
 * Import Css
 */
import './editor.scss';
import './style.scss';
import { __ } from '@wordpress/i18n';

registerBlockType( 'base/tableofcontents', {
	...metadata,
	title: __( 'Table of Contents', 'gutenam-blocks' ),
	keywords: [
		__( 'table of contents', 'gutenam-blocks' ),
		__( 'summary', 'gutenam-blocks' ),
		'BB',
	],
	icon: {
		src: tableOfContentsIcon,
	},
	edit,
	save() { return null; },
	example: {}
} );
