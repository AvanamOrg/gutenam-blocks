/**
 * External dependencies
 */
import { radioInputIcon } from '@base/icons';

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

registerBlockType('base/advanced-form-radio', {
	...metadata,
	title: __( 'Radio', 'gutenam-blocks' ),
	description: __( 'Base Form radio input', 'gutenam-blocks' ),
	keywords: [
		'gutenam',
	],
	parent: [ 'base/advanced-form' ],
	icon: {
		src: radioInputIcon,
	},
	edit,
	transforms,
	save: () => null,
});
