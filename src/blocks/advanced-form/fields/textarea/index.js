/**
 * External dependencies
 */
import { textareaInputIcon } from '@base/icons';

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

registerBlockType('base/advanced-form-textarea', {
	...metadata,
	title: __( 'Text Area', 'gutenam-blocks' ),
	description: __( 'Base Form text input field', 'gutenam-blocks' ),
	keywords: [
		'gutenam',
	],
	parent: [ 'base/advanced-form' ],
	icon: {
		src: textareaInputIcon,
	},
	edit,
	save: () => null,

});
