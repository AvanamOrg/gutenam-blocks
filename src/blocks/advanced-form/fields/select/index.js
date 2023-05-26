/**
 * External dependencies
 */
import { selectInputIcon } from '@base/icons';

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

registerBlockType('base/advanced-form-select', {
	...metadata,
	title: __( 'Select', 'gutenam-blocks' ),
	/* translators: block description */
	description: __( 'Base Form select input', 'gutenam-blocks' ),
	keywords: [
		'gutenam',
	],
	parent: [ 'base/advanced-form' ],
	icon: {
		src: selectInputIcon,
	},
	edit,
	save: () => null,

});
