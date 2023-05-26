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
				'base/advanced-form-textarea',
				'base/advanced-form-telephone',
				'base/advanced-form-number'
			],
			transform: ( attributes ) => {
				return createBlock( 'base/advanced-form-text', attributes );
			},
		}
	],
	to: [
		{
			type: 'block',
			blocks: [ 'base/advanced-form-textarea' ],
			transform: ( attributes ) => {
				return createBlock( 'base/advanced-form-textarea', attributes );
			},
		},
		{
			type: 'block',
			blocks: [ 'base/advanced-form-telephone' ],
			transform: ( attributes ) => {
				return createBlock( 'base/advanced-form-telephone', attributes );
			},
		},
		{
			type: 'block',
			blocks: [ 'base/advanced-form-number' ],
			transform: ( attributes ) => {
				return createBlock( 'base/advanced-form-number', attributes );
			},
		},
	],
};

export default transforms;
