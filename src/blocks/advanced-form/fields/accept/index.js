/**
 * External dependencies
 */
import { acceptInputIcon } from '@base/icons';

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

// export { name, category, metadata, settings };
registerBlockType('base/advanced-form-accept', {
	...metadata,
	title: __( 'Accept', 'gutenam-blocks' ),
	description: __( 'Base Form accept input', 'gutenam-blocks' ),
	keywords: [
		'gutenam',
	],
	parent: [ 'base/advanced-form' ],
	icon: {
		src: acceptInputIcon,
	},
	edit,
	save: () => null,

});
