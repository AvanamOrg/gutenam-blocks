/**
 * BLOCK: Base Tab
 *
 * Registering a basic block with Gutenberg.
 */

import metadata from './block.json';
import {
	InnerBlocks,
	useBlockProps
} from '@wordpress/block-editor';

/**
 * Import Icons
 */
import { tabsBlockIcon } from '@base/icons';

/**
 * Import edit
 */
import edit from './edit';

/**
 * Internal block libraries
 */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Register: a Gutenberg Block.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'base/tab', {
	...metadata,
	title: __( 'Tab', 'gutenam-blocks' ),
	keywords: [
		__( 'tabs', 'gutenam-blocks' ),
		__( 'tab', 'gutenam-blocks' ),
		'BB',
	],
	icon: {
		src: tabsBlockIcon
	},
	getEditWrapperProps( attributes ) {
		return { 'data-tab': attributes.id };
	},
	edit,
	save( { attributes } ) {
		const { id, uniqueID } = attributes;

		const blockProps = useBlockProps.save( {
			className: `bst-tab-inner-content bst-inner-tab-${ id } bst-inner-tab${ uniqueID }`
		} );

		return (
			<div {...blockProps}>
				<div className={ 'bst-tab-inner-content-inner' } >
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
	deprecated: [
		{
			attributes: {
				id: {
					type: 'number',
					default: 1,
				},
			},
			save: ( { attributes } ) => {
				const { id } = attributes;
				return (
					<div className={ `bst-tab-inner-content bst-inner-tab-${ id }` }>
						<div className={ 'bst-tab-inner-content-inner' } >
							<InnerBlocks.Content />
						</div>
					</div>
				);
			},
		},
	],
} );
