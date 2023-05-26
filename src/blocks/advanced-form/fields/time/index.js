/**
 * External dependencies
 */
import { timeInputIcon } from '@base/icons';

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

registerBlockType('base/advanced-form-time', {
	...metadata,
	title: __( 'Time', 'gutenam-blocks' ),
	description: __( 'Base Form time input field', 'gutenam-blocks' ),
	keywords: [
		'gutenam',
	],
	parent: [ 'base/advanced-form' ],
	icon: {
		src: timeInputIcon,
	},
	edit,
	save: () => null,

});
