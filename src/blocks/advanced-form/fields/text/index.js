/**
 * External dependencies
 */
import { textInputIcon } from '@base/icons';

/**
 * Internal dependencies
 */
import edit from './edit';
import transforms from './transforms';
import metadata from './block.json';
import { registerBlockType } from '@wordpress/blocks';


/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';

registerBlockType('base/advanced-form-text', {
	...metadata,
	title: __( 'Text Field', 'gutenam-blocks' ),
	description: __( 'Base Form text input field', 'gutenam-blocks' ),
	keywords: [
		'gutenam',
	],
	parent: [ 'base/advanced-form' ],
	icon: {
		src: textInputIcon,
	},
	edit,
	transforms,
	save: () => null,

});
