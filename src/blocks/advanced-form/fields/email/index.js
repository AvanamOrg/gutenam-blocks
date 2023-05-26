/**
 * External dependencies
 */
import { emailInputIcon } from '@base/icons';

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

registerBlockType('base/advanced-form-email', {
	...metadata,
	icon: {
		src: emailInputIcon,
	},
	title: __( 'Email Field', 'gutenam-blocks' ),
	description: __( 'Base Form email input field', 'gutenam-blocks' ),
	keywords: [
		'gutenam',
	],
	supports: {
		reusable: false,
		html: false,
	},
	parent: [ 'base/advanced-form' ],
	edit,
	save: () => null,

});
