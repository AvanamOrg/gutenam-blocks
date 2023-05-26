import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';
import transforms from './transforms';
import deprecated from './deprecated';
import { lottieIcon } from '@base/icons';
import { __, _x } from '@wordpress/i18n';

/**
 * Import Css
 */
import './style.scss';

registerBlockType('base/lottie', {
	...metadata,
	title: _x( 'Lottie Animations', 'block title', 'gutenam-blocks' ),
	description: _x( 'Display lottie animations on your site', 'block description', 'gutenam-blocks' ),
	keywords: [
		__( 'lottie', 'gutenam-blocks' ),
		__( 'animation', 'gutenam-blocks' ),
		'BB',
	],
	getEditWrapperProps( attributes ) {
		return {
			'data-align': attributes.align,
		};
	},
	icon: {
		src: lottieIcon,
	},
	edit,
	deprecated,
	save: () => null,
	example: {}
});
