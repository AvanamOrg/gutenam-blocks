/**
 * BLOCK: Base Countdown
 */

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

function Save( { attributes } ) {
	const { uniqueID, vsdesk, vstablet, vsmobile, timerLayout, countdownDivider, enableTimer, counterAlign, revealOnLoad } = attributes;
	const classes = classnames( {
		'bsb-countdown-container': true,
		[ `bsb-countdown-container-${ uniqueID }` ]: uniqueID,
		[ `bsb-countdown-timer-layout-${ timerLayout }` ] : enableTimer && timerLayout,
		'bsb-countdown-has-timer' : enableTimer,
		'bsb-countdown-reveal-on-load': revealOnLoad,
		'bsb-countdown-enable-dividers': 'inline' !== timerLayout && countdownDivider && enableTimer,
		[ `bsb-countdown-align-${ counterAlign[0] }` ]: ( undefined !== counterAlign && undefined !== counterAlign[0] && enableTimer ? counterAlign[0] : false ),
		[ `bsb-countdown-align-tablet-${ counterAlign[1] }` ]: ( undefined !== counterAlign && undefined !== counterAlign[1] && enableTimer ? counterAlign[1] : false ),
		[ `bsb-countdown-align-mobile-${ counterAlign[2] }` ]: ( undefined !== counterAlign && undefined !== counterAlign[2] && enableTimer ? counterAlign[2] : false ),
		'kvs-lg-false': vsdesk !== 'undefined' && vsdesk,
		'kvs-md-false': vstablet !== 'undefined' && vstablet,
		'kvs-sm-false': vsmobile !== 'undefined' && vsmobile,
	} );

	const blockProps = useBlockProps.save( {
		className: classes
	} );

	return (
		<div {...blockProps} data-id={ uniqueID }>
			<InnerBlocks.Content />
		</div>
	);
}
export default Save;
