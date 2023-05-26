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
import { useBlockProps } from '@wordpress/block-editor';
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
registerBlockType( 'base/countdown-timer', {
	...metadata,
	title: __( 'Countdown Timer', 'gutenam-blocks' ),
	description: __( 'The countdown timer', 'gutenam-blocks' ),
	keywords: [
		__( 'countdown', 'gutenam-blocks' ),
		__( 'timer', 'gutenam-blocks' ),
		'BB',
	],
	icon: countdownInnerIcon,
	edit,
	save: props => {
		const { attributes: { uniqueID, className } } = props;

		const blockProps = useBlockProps.save( {
			className: `bsb-countdown-timer-${ uniqueID } bsb-countdown-timer${ ( className ? ' ' + className : '' ) }`
		} );

		return (
			<div {...blockProps}>
				<div className="bsb-countdown-item bsb-countdown-date-item"><span className="bsb-countdown-number">&nbsp;</span><span className="bsb-countdown-label">&nbsp;</span></div>
			</div>
		);
	}
} );
