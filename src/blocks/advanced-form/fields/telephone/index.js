/**
 * External dependencies
 */
import { phoneInputIcon } from '@base/icons';

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

registerBlockType('base/advanced-form-telephone', {
	...metadata,
	title: __( 'Telephone Field', 'gutenam-blocks' ),
	/* translators: block description */
	description: __( 'Base Form telephone input field', 'gutenam-blocks' ),
	keywords: [
		'gutenam',
	],
	parent: [ 'base/advanced-form' ],
	icon: {
		src: phoneInputIcon,
	},
	edit,
	save: () => null,

});
