/**
 * BLOCK: Base Countdown
 *
 * Registering a basic block with Gutenberg.
 */

/**
 * Import Icons
 */
import { countdownInnerIcon } from '@base/icons';

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
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
registerBlockType( 'base/countdown-inner', {
	...metadata,
	title: __( 'Countdown Content', 'gutenam-blocks' ),
	description: __( 'Inner Container for Countdown Block', 'gutenam-blocks' ),
	keywords: [
		__( 'countdown', 'gutenam-blocks' ),
		__( 'timer', 'gutenam-blocks' ),
		'BB',
	],
	icon: countdownInnerIcon,
	edit,
	save( { attributes } ) {
		const { location, uniqueID } = attributes;

		const blockProps = useBlockProps.save( {
			className: `bsb-countdown-inner bsb-countdown-inner-${ location } bsb-countdown-inner-${ uniqueID }`
		} );

		return (
			<div {...blockProps}>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
