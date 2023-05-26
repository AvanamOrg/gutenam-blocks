/**
 * BLOCK: Base Advanced Heading
 */

/**
 * External dependencies
 */
import classnames from 'classnames';
import { getBlockDefaultClassName } from '@wordpress/blocks';
import {
	RichText,
	getColorClassName,
} from '@wordpress/block-editor';

function Save( { attributes } ) {
	const {
		anchor,
		level,
		content,
		colorClass,
		uniqueID,
		className,
		baseAnimation,
		baseAOSOptions,
		htmlTag,
		link,
		linkNoFollow,
		linkSponsored,
		linkTarget,
		backgroundColorClass,
		linkStyle,
		icon,
	} = attributes;
	const tagName = htmlTag && htmlTag !== 'heading' ? htmlTag : 'h' + level;
	const textColorClass = getColorClassName( 'color', colorClass );
	const textBackgroundColorClass = getColorClassName( 'background-color', backgroundColorClass );
	const revealAnimation = ( baseAnimation && ( 'reveal-left' === baseAnimation || 'reveal-right' === baseAnimation || 'reveal-up' === baseAnimation || 'reveal-down' === baseAnimation ) ? true : false );
	const wrapper = ( revealAnimation ? true : false );
	const classes = classnames( {
		[ `bst-adv-heading${ uniqueID }` ]: uniqueID,
		[ className ]: ! wrapper && ! link && className,
		[ getBlockDefaultClassName( 'base/advancedheading' ) ]: getBlockDefaultClassName( 'base/advancedheading' ),
		[ textColorClass ]: textColorClass,
		'has-text-color': textColorClass,
		[ textBackgroundColorClass ]: textBackgroundColorClass,
		'has-background': textBackgroundColorClass,
		[ `hls-${ linkStyle }` ]: ! link && linkStyle
	} );
	let relAttr;
	if ( linkTarget ) {
		relAttr = 'noopener noreferrer';
	}
	if ( undefined !== linkNoFollow && true === linkNoFollow ) {
		relAttr = ( relAttr ? relAttr.concat( ' nofollow' ) : 'nofollow' );
	}
	if ( undefined !== linkSponsored && true === linkSponsored ) {
		relAttr = ( relAttr ? relAttr.concat( ' sponsored' ) : 'sponsored' );
	}
	const htmlItem = (
		<RichText.Content
			tagName={ tagName }
			id={ anchor ? anchor : undefined }
			className={ classes }
			data-bsb-block={ `bsb-adv-heading${ uniqueID }` }
			data-aos={ ( baseAnimation ? baseAnimation : undefined ) }
			data-aos-offset={ ( baseAOSOptions && baseAOSOptions[ 0 ] && baseAOSOptions[ 0 ].offset ? baseAOSOptions[ 0 ].offset : undefined ) }
			data-aos-duration={ ( baseAOSOptions && baseAOSOptions[ 0 ] && baseAOSOptions[ 0 ].duration ? baseAOSOptions[ 0 ].duration : undefined ) }
			data-aos-delay={ ( baseAOSOptions && baseAOSOptions[ 0 ] && baseAOSOptions[ 0 ].delay ? baseAOSOptions[ 0 ].delay : undefined ) }
			data-aos-easing={ ( baseAOSOptions && baseAOSOptions[ 0 ] && baseAOSOptions[ 0 ].easing ? baseAOSOptions[ 0 ].easing : undefined ) }
			data-aos-once={ ( baseAOSOptions && baseAOSOptions[ 0 ] && undefined !== baseAOSOptions[ 0 ].once && '' !== baseAOSOptions[ 0 ].once ? baseAOSOptions[ 0 ].once : undefined ) }
			value={ content }
		/>
	);
	const linkHTMLItem = (
		<a
			href={ link }
			className={ `bsb-advanced-heading-link bst-adv-heading-link${ uniqueID }${ ( ! wrapper && className ? ' ' + className : '' ) }${ ( linkStyle ? ' hls-' + linkStyle : '' ) }` }
			target={ linkTarget ? '_blank' : undefined }
			rel={ relAttr ? relAttr : undefined }
		>
			{ htmlItem }
		</a>
	);
	const readyContent = ( link ? linkHTMLItem : htmlItem );
	if ( icon && '' !== icon ) {
		return ( htmlItem );
	}
	return (
		<>
			{ wrapper && (
				<div className={ `bsb-adv-heading-wrap${ uniqueID } base-advanced-heading-wrapper${ ( revealAnimation ? ' base-heading-clip-animation' : '' ) }${ ( className ? ' ' + className : '' ) }` }>
					{ readyContent }
				</div>
			) }
			{ ! wrapper && (
				readyContent
			) }
		</>
	);
}

export default Save;
