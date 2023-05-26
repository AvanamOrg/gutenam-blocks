/**
 * External dependencies
 */
import { every } from 'lodash';

/**
 * WordPress dependencies
 */
import { createBlobURL } from '@wordpress/blob';
import { createBlock, getBlockAttributes } from '@wordpress/blocks';
import { dispatch } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';
import { __ } from '@wordpress/i18n';

const transforms = {
	from: [
		{
			type: 'block',
			blocks: [
				'base/advanced-form-checkbox',
				'base/advanced-form-select',
			],
			transform: ( attributes ) => {
				return createBlock( 'base/advanced-form-radio', attributes );
			},
		}
	],
	to: [
		{
			type: 'block',
			blocks: [ 'base/advanced-form-radio' ],
			transform: ( attributes ) => {
				return createBlock( 'base/advanced-form-checkbox', attributes );
			},
		},
		{
			type: 'block',
			blocks: [ 'base/advanced-form-radio' ],
			transform: ( attributes ) => {
				return createBlock( 'base/advanced-form-select', attributes );
			},
		},
	],
};

export default transforms;
