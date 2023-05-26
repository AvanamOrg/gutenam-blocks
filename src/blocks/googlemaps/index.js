import { googleMapsIcon } from '@base/icons';

import { registerBlockType } from '@wordpress/blocks';
import { __, _x } from '@wordpress/i18n';
/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';

registerBlockType('base/googlemaps', {
	...metadata,
	title: _x( 'Google Maps', 'block title', 'gutenam-blocks' ),
	description: _x( 'Display google maps on your site', 'block description', 'gutenam-blocks' ),
	keywords: [
		__( 'google', 'gutenam-blocks' ),
		__( 'maps', 'gutenam-blocks' ),
		'BB',
	],
	icon: {
		src: googleMapsIcon,
	},
	getEditWrapperProps( attributes ) {
		return {
			'data-align': attributes.align,
		};
	},
	transforms,
	edit,
	save
});
