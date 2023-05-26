/**
 * External dependencies
 */
import { dateInputIcon } from '@base/icons';

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

// export { name, category, metadata, settings };
registerBlockType('base/advanced-form-date', {
	...metadata,
	title: __( 'Date', 'gutenam-blocks' ),
	description: __( 'Base Form date', 'gutenam-blocks' ),
	keywords: [
		'gutenam',
	],
	parent: [ 'base/advanced-form' ],
	icon: {
		src: dateInputIcon,
	},
	edit,
	save: () => null,
});
