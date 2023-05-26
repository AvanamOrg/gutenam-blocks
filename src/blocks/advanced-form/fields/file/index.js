/**
 * External dependencies
 */
import { fileInputIcon } from '@base/icons';

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';
import { registerBlockType } from '@wordpress/blocks';


/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';

registerBlockType('base/advanced-form-file', {
	...metadata,
	title: __( 'File', 'gutenam-blocks' ),
	description: __( 'Base Form file upload', 'gutenam-blocks' ),
	keywords: [
		'gutenam',
	],
	parent: [ 'base/advanced-form' ],
	icon: {
		src: fileInputIcon,
	},
	edit,
	save: () => null,

});
