import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';
import deprecated from './deprecated';
const { name } = metadata;
import { spacerIcon } from '@base/icons';
import { __ } from '@wordpress/i18n';

/**
 * Import Css
 */
import './style.scss';

export { metadata, name };

registerBlockType('base/spacer', {
	getEditWrapperProps( { blockAlignment } ) {
		if ( 'full' === blockAlignment || 'wide' === blockAlignment || 'center' === blockAlignment ) {
			return { 'data-align': blockAlignment };
		}
	},
	...metadata,
	title: __( 'Spacer/Divider', 'gutenam-blocks' ),
	keywords: [
		__( 'spacer', 'gutenam-blocks' ),
		__( 'divider', 'gutenam-blocks' ),
		__( 'separator', 'gutenam-blocks' ),
		'BB',
	],
	icon: {
		src: spacerIcon,
	},
	transforms,
	deprecated,
	edit,
	save,
	example: {
		attributes: {
			spacerHeight: 4,
			dividerColor: '#2B6CB0',
		}
	}
});
