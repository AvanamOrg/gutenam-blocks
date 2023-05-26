import { showMoreIcon } from '@base/icons';

import { registerBlockType } from '@wordpress/blocks';
import { __, _x } from '@wordpress/i18n';
/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';

registerBlockType('base/show-more', {
	...metadata,
	title: _x( 'Show More', 'block title', 'gutenam-blocks' ),
	description: _x( 'Hide content and enable a show more button to reveal', 'block description', 'gutenam-blocks' ),
	keywords: [
		__( 'show', 'gutenam-blocks' ),
		__( 'hide', 'gutenam-blocks' ),
		"bb",
	],
	icon: {
		src: showMoreIcon,
	},
	transforms,
	edit,
	save,
	example: {
		attributes: {},
		innerBlocks: [
			{
				name: 'base/column',
				innerBlocks: [
					{
						name: 'core/paragraph',
						attributes: {
							content: __( 'This content will be partially hidden. Click the button below to reveal more.', 'gutenam-blocks' ),
						}
					}
				]
			},
		]
	}
});
