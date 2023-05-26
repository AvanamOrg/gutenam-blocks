/**
 * External dependencies
 */
import { numberInputIcon } from '@base/icons';

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

registerBlockType('base/advanced-form-number', {
	...metadata,
	title: __( 'Number', 'gutenam-blocks' ),
	description: __( 'Base Form number input', 'gutenam-blocks' ),
	keywords: [
		'gutenam',
	],
	parent: [ 'base/advanced-form' ],
	icon: {
		src: numberInputIcon,
	},
	edit,
	save: () => null
});
