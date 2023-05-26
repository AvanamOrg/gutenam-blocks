/**
 * External dependencies
 */
import { hiddenInputIcon } from '@base/icons';

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

registerBlockType('base/advanced-form-hidden', {
	...metadata,
	title: __( 'Hidden Field', 'gutenam-blocks' ),
	description: __( 'Base Form hidden field', 'gutenam-blocks' ),
	keywords: [
		'gutenam',
	],
	parent: [ 'base/advanced-form' ],
	icon: {
		src: hiddenInputIcon,
	},
	edit,
	save: () => null,

});
