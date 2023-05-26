/**
 * BLOCK: Base Advanced Heading
 *
 * Depreciated.
 */
import classnames from 'classnames';

import { BaseColorOutput } from '@base/helpers';

import {
	Fragment,
} from '@wordpress/element';
import {
	RichText,
	getColorClassName,
} from '@wordpress/block-editor';
import {
	getBlockDefaultClassName,
} from '@wordpress/blocks';

export default [
	{
		attributes: {
			content: {
				type: 'string',
				source: 'html',
				selector: 'h1,h2,h3,h4,h5,h6,p',
			},
			level: {
				type: 'number',
				default: 2,
			},
			uniqueID: {
				type: 'string',
			},
			align: {
				type: 'string',
			},
			color: {
				type: 'string',
			},
			size: {
				type: 'number',
			},
			sizeType: {
				type: 'string',
				default: 'px',
			},
			lineHeight: {
				type: 'number',
			},
			lineType: {
				type: 'string',
				default: 'px',
			},
			tabSize: {
				type: 'number',
			},
			tabLineHeight: {
				type: 'number',
			},
			mobileSize: {
				type: 'number',
			},
			mobileLineHeight: {
				type: 'number',
			},
			letterSpacing: {
				type: 'number',
			},
			typography: {
				type: 'string',
				default: '',
			},
			googleFont: {
				type: 'boolean',
				default: false,
			},
			loadGoogleFont: {
				type: 'boolean',
				default: true,
			},
			fontSubset: {
				type: 'string',
				default: '',
			},
			fontVariant: {
				type: 'string',
				default: '',
			},
			fontWeight: {
				type: 'string',
				default: '',
			},
			fontStyle: {
				type: 'string',
				default: 'normal',
			},
			topMargin: {
				type: 'number',
				default: '',
			},
			bottomMargin: {
				type: 'number',
				default: '',
			},
			leftMargin: {
				type: 'number',
				default: '',
			},
			rightMargin: {
				type: 'number',
				default: '',
			},
			marginType: {
				type: 'string',
				default: 'px',
			},
			tabletMargin: {
				type: 'array',
				default: [ '', '', '', '' ],
			},
			mobileMargin: {
				type: 'array',
				default: [ '', '', '', '' ],
			},
			tabletMarginType: {
				type: 'string',
				default: 'px',
			},
			mobileMarginType: {
				type: 'string',
				default: 'px',
			},
			paddingType: {
				type: 'string',
				default: 'px',
			},
			padding: {
				type: 'array',
				default: [ '', '', '', '' ],
			},
			tabletPadding: {
				type: 'array',
				default: [ '', '', '', '' ],
			},
			mobilePadding: {
				type: 'array',
				default: [ '', '', '', '' ],
			},
			markSize: {
				type: 'array',
				default: [ '', '', '' ],
			},
			markSizeType: {
				type: 'string',
				default: 'px',
			},
			markLineHeight: {
				type: 'array',
				default: [ '', '', '' ],
			},
			markLineType: {
				type: 'string',
				default: 'px',
			},
			markLetterSpacing: {
				type: 'number',
			},
			markTypography: {
				type: 'string',
				default: '',
			},
			markGoogleFont: {
				type: 'boolean',
				default: false,
			},
			markLoadGoogleFont: {
				type: 'boolean',
				default: true,
			},
			markFontSubset: {
				type: 'string',
				default: '',
			},
			markFontVariant: {
				type: 'string',
				default: '',
			},
			markFontWeight: {
				type: 'string',
				default: '',
			},
			markFontStyle: {
				type: 'string',
				default: 'normal',
			},
			markColor: {
				type: 'string',
				default: '#f76a0c',
			},
			markBG: {
				type: 'string',
			},
			markBGOpacity: {
				type: 'number',
				default: 1,
			},
			markPadding: {
				type: 'array',
				default: [ 0, 0, 0, 0 ],
			},
			markTabPadding: {
				type: 'array',
				default: [ '', '', '', '' ],
			},
			markMobilePadding: {
				type: 'array',
				default: [ '', '', '', '' ],
			},
			markPaddingControl: {
				type: 'string',
				default: 'linked',
			},
			markBorder: {
				type: 'string',
			},
			markBorderOpacity: {
				type: 'number',
				default: 1,
			},
			markBorderWidth: {
				type: 'number',
				default: 0,
			},
			markBorderStyle: {
				type: 'string',
				default: 'solid',
			},
			textTransform: {
				type: 'string',
				default: '',
			},
			markTextTransform: {
				type: 'string',
				default: '',
			},
			anchor: {
				type: 'string',
			},
			colorClass: {
				type: 'string',
			},
			tabletAlign: {
				type: 'string',
			},
			mobileAlign: {
				type: 'string',
			},
			textShadow: {
				type: 'array',
				default: [ {
					enable: false,
					color: 'rgba(0, 0, 0, 0.2)',
					blur: 1,
					hOffset: 1,
					vOffset: 1,
				} ],
			},
			htmlTag: {
				type: 'string',
				default: 'heading',
			},
			loadItalic: {
				type: 'boolean',
				default: false,
			},
			link: {
				type: 'string',
			},
			linkTarget: {
				type: 'boolean',
				default: false,
			},
			linkNoFollow: {
				type: 'boolean',
				default: false,
			},
			linkSponsored: {
				type: 'boolean',
				default: false,
			},
			background: {
				type: 'string',
			},
			backgroundColorClass: {
				type: 'string',
			},
			linkStyle: {
				type: 'string',
			},
			linkColor: {
				type: 'string',
			},
			linkHoverColor: {
				type: 'string',
			},
			inQueryBlock: {
				type: 'boolean',
				default: false,
			},
		},
		save: ( { attributes } ) => {
			const { anchor, level, content, colorClass, color, textShadow, letterSpacing, topMargin, bottomMargin, marginType, align, uniqueID, className, baseAnimation, baseAOSOptions, htmlTag, link, linkNoFollow, linkSponsored, linkTarget, backgroundColorClass, linkStyle } = attributes;
			const tagName = htmlTag && htmlTag !== 'heading' ? htmlTag : 'h' + level;
			const mType = ( marginType ? marginType : 'px' );
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
			//const readyContent = ( link ? `<a href="${link}" class="bsb-advanced-heading-link"${ linkTarget ? ' target="_blank"' : '' }${ relAttr ? ` rel="${relAttr}"` : '' }>${content}</a>` : content );
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
					relAttr={ relAttr ? relAttr : undefined }
				>
					{ htmlItem }
				</a>
			);
			const readyContent = ( link ? linkHTMLItem : htmlItem );
			return (
				<Fragment>
					{ wrapper && (
						<div className={ `bsb-adv-heading-wrap${ uniqueID } base-advanced-heading-wrapper${ ( revealAnimation ? ' base-heading-clip-animation' : '' ) }${ ( className ? ' ' + className : '' ) }` }>
							{ readyContent }
						</div>
					) }
					{ ! wrapper && (
						readyContent
					) }
				</Fragment>
			);
		}
	},
	{
		attributes: {
			content: {
				type: 'string',
				source: 'html',
				selector: 'h1,h2,h3,h4,h5,h6,p',
			},
			level: {
				type: 'number',
				default: 2,
			},
			uniqueID: {
				type: 'string',
			},
			align: {
				type: 'string',
			},
			color: {
				type: 'string',
			},
			size: {
				type: 'number',
			},
			sizeType: {
				type: 'string',
				default: 'px',
			},
			lineHeight: {
				type: 'number',
			},
			lineType: {
				type: 'string',
				default: 'px',
			},
			tabSize: {
				type: 'number',
			},
			tabLineHeight: {
				type: 'number',
			},
			mobileSize: {
				type: 'number',
			},
			mobileLineHeight: {
				type: 'number',
			},
			letterSpacing: {
				type: 'number',
			},
			typography: {
				type: 'string',
				default: '',
			},
			googleFont: {
				type: 'boolean',
				default: false,
			},
			loadGoogleFont: {
				type: 'boolean',
				default: true,
			},
			fontSubset: {
				type: 'string',
				default: '',
			},
			fontVariant: {
				type: 'string',
				default: '',
			},
			fontWeight: {
				type: 'string',
				default: 'regular',
			},
			fontStyle: {
				type: 'string',
				default: 'normal',
			},
			topMargin: {
				type: 'number',
				default: '',
			},
			bottomMargin: {
				type: 'number',
				default: '',
			},
			leftMargin: {
				type: 'number',
				default: '',
			},
			rightMargin: {
				type: 'number',
				default: '',
			},
			marginType: {
				type: 'string',
				default: 'px',
			},
			tabletMargin: {
				type: 'array',
				default: [ '', '', '', '' ],
			},
			mobileMargin: {
				type: 'array',
				default: [ '', '', '', '' ],
			},
			tabletMarginType: {
				type: 'string',
				default: 'px',
			},
			mobileMarginType: {
				type: 'string',
				default: 'px',
			},
			paddingType: {
				type: 'string',
				default: 'px',
			},
			padding: {
				type: 'array',
				default: [ '', '', '', '' ],
			},
			tabletPadding: {
				type: 'array',
				default: [ '', '', '', '' ],
			},
			mobilePadding: {
				type: 'array',
				default: [ '', '', '', '' ],
			},
			markSize: {
				type: 'array',
				default: [ '', '', '' ],
			},
			markSizeType: {
				type: 'string',
				default: 'px',
			},
			markLineHeight: {
				type: 'array',
				default: [ '', '', '' ],
			},
			markLineType: {
				type: 'string',
				default: 'px',
			},
			markLetterSpacing: {
				type: 'number',
			},
			markTypography: {
				type: 'string',
				default: '',
			},
			markGoogleFont: {
				type: 'boolean',
				default: false,
			},
			markLoadGoogleFont: {
				type: 'boolean',
				default: true,
			},
			markFontSubset: {
				type: 'string',
				default: '',
			},
			markFontVariant: {
				type: 'string',
				default: '',
			},
			markFontWeight: {
				type: 'string',
				default: 'regular',
			},
			markFontStyle: {
				type: 'string',
				default: 'normal',
			},
			markColor: {
				type: 'string',
				default: '#f76a0c',
			},
			markBG: {
				type: 'string',
			},
			markBGOpacity: {
				type: 'number',
				default: 1,
			},
			markPadding: {
				type: 'array',
				default: [ 0, 0, 0, 0 ],
			},
			markTabPadding: {
				type: 'array',
				default: [ '', '', '', '' ],
			},
			markMobilePadding: {
				type: 'array',
				default: [ '', '', '', '' ],
			},
			markPaddingControl: {
				type: 'string',
				default: 'linked',
			},
			markBorder: {
				type: 'string',
			},
			markBorderOpacity: {
				type: 'number',
				default: 1,
			},
			markBorderWidth: {
				type: 'number',
				default: 0,
			},
			markBorderStyle: {
				type: 'string',
				default: 'solid',
			},
			textTransform: {
				type: 'string',
				default: '',
			},
			markTextTransform: {
				type: 'string',
				default: '',
			},
			anchor: {
				type: 'string',
			},
			colorClass: {
				type: 'string',
			},
			tabletAlign: {
				type: 'string',
			},
			mobileAlign: {
				type: 'string',
			},
			textShadow: {
				type: 'array',
				default: [ {
					enable: false,
					color: 'rgba(0, 0, 0, 0.2)',
					blur: 1,
					hOffset: 1,
					vOffset: 1,
				} ],
			},
			htmlTag: {
				type: 'string',
				default: 'heading',
			},
			loadItalic: {
				type: 'boolean',
				default: false,
			},
			link: {
				type: 'string',
			},
			linkTarget: {
				type: 'boolean',
				default: false,
			},
			linkNoFollow: {
				type: 'boolean',
				default: false,
			},
			linkSponsored: {
				type: 'boolean',
				default: false,
			},
			background: {
				type: 'string',
			},
			backgroundColorClass: {
				type: 'string',
			},
		},
		save: ( { attributes } ) => {
			const { anchor, level, content, colorClass, color, textShadow, letterSpacing, topMargin, bottomMargin, marginType, align, uniqueID, className, baseAnimation, baseAOSOptions, htmlTag, link, linkNoFollow, linkSponsored, linkTarget, backgroundColorClass, linkStyle } = attributes;
			const tagName = htmlTag && htmlTag !== 'heading' ? htmlTag : 'h' + level;
			const mType = ( marginType ? marginType : 'px' );
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
			//const readyContent = ( link ? `<a href="${link}" class="bsb-advanced-heading-link"${ linkTarget ? ' target="_blank"' : '' }${ relAttr ? ` rel="${relAttr}"` : '' }>${content}</a>` : content );
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
					className={ 'bsb-advanced-heading-link' }
					target={ linkTarget ? '_blank' : undefined }
					relAttr={ relAttr ? relAttr : undefined }
				>
					{ htmlItem }
				</a>
			);
			const readyContent = ( link ? linkHTMLItem : htmlItem );
			return (
				<Fragment>
					{ wrapper && (
						<div className={ `bsb-adv-heading-wrap${ uniqueID } base-advanced-heading-wrapper${ ( revealAnimation ? ' base-heading-clip-animation' : '' ) }${ ( className ? ' ' + className : '' ) }` }>
							{ readyContent }
						</div>
					) }
					{ ! wrapper && (
						readyContent
					) }
				</Fragment>
			);
		}
	},
	{
		attributes: {
			content: {
				type: 'string',
				source: 'html',
				selector: 'h1,h2,h3,h4,h5,h6,p',
			},
			level: {
				type: 'number',
				default: 2,
			},
			uniqueID: {
				type: 'string',
			},
			align: {
				type: 'string',
			},
			color: {
				type: 'string',
			},
			size: {
				type: 'number',
			},
			sizeType: {
				type: 'string',
				default: 'px',
			},
			lineHeight: {
				type: 'number',
			},
			lineType: {
				type: 'string',
				default: 'px',
			},
			tabSize: {
				type: 'number',
			},
			tabLineHeight: {
				type: 'number',
			},
			mobileSize: {
				type: 'number',
			},
			mobileLineHeight: {
				type: 'number',
			},
			letterSpacing: {
				type: 'number',
			},
			typography: {
				type: 'string',
				default: '',
			},
			googleFont: {
				type: 'boolean',
				default: false,
			},
			loadGoogleFont: {
				type: 'boolean',
				default: true,
			},
			fontSubset: {
				type: 'string',
				default: '',
			},
			fontVariant: {
				type: 'string',
				default: '',
			},
			fontWeight: {
				type: 'string',
				default: 'regular',
			},
			fontStyle: {
				type: 'string',
				default: 'normal',
			},
			topMargin: {
				type: 'number',
				default: '',
			},
			bottomMargin: {
				type: 'number',
				default: '',
			},
			leftMargin: {
				type: 'number',
				default: '',
			},
			rightMargin: {
				type: 'number',
				default: '',
			},
			marginType: {
				type: 'string',
				default: 'px',
			},
			tabletMargin: {
				type: 'array',
				default: [ '', '', '', '' ],
			},
			mobileMargin: {
				type: 'array',
				default: [ '', '', '', '' ],
			},
			tabletMarginType: {
				type: 'string',
				default: 'px',
			},
			mobileMarginType: {
				type: 'string',
				default: 'px',
			},
			paddingType: {
				type: 'string',
				default: 'px',
			},
			padding: {
				type: 'array',
				default: [ '', '', '', '' ],
			},
			tabletPadding: {
				type: 'array',
				default: [ '', '', '', '' ],
			},
			mobilePadding: {
				type: 'array',
				default: [ '', '', '', '' ],
			},
			markSize: {
				type: 'array',
				default: [ '', '', '' ],
			},
			markSizeType: {
				type: 'string',
				default: 'px',
			},
			markLineHeight: {
				type: 'array',
				default: [ '', '', '' ],
			},
			markLineType: {
				type: 'string',
				default: 'px',
			},
			markLetterSpacing: {
				type: 'number',
			},
			markTypography: {
				type: 'string',
				default: '',
			},
			markGoogleFont: {
				type: 'boolean',
				default: false,
			},
			markLoadGoogleFont: {
				type: 'boolean',
				default: true,
			},
			markFontSubset: {
				type: 'string',
				default: '',
			},
			markFontVariant: {
				type: 'string',
				default: '',
			},
			markFontWeight: {
				type: 'string',
				default: 'regular',
			},
			markFontStyle: {
				type: 'string',
				default: 'normal',
			},
			markColor: {
				type: 'string',
				default: '#f76a0c',
			},
			markBG: {
				type: 'string',
			},
			markBGOpacity: {
				type: 'number',
				default: 1,
			},
			markPadding: {
				type: 'array',
				default: [ 0, 0, 0, 0 ],
			},
			markTabPadding: {
				type: 'array',
				default: [ '', '', '', '' ],
			},
			markMobilePadding: {
				type: 'array',
				default: [ '', '', '', '' ],
			},
			markPaddingControl: {
				type: 'string',
				default: 'linked',
			},
			markBorder: {
				type: 'string',
			},
			markBorderOpacity: {
				type: 'number',
				default: 1,
			},
			markBorderWidth: {
				type: 'number',
				default: 0,
			},
			markBorderStyle: {
				type: 'string',
				default: 'solid',
			},
			textTransform: {
				type: 'string',
				default: '',
			},
			markTextTransform: {
				type: 'string',
				default: '',
			},
			anchor: {
				type: 'string',
			},
			colorClass: {
				type: 'string',
			},
			tabletAlign: {
				type: 'string',
			},
			mobileAlign: {
				type: 'string',
			},
			textShadow: {
				type: 'array',
				default: [ {
					enable: false,
					color: 'rgba(0, 0, 0, 0.2)',
					blur: 1,
					hOffset: 1,
					vOffset: 1,
				} ],
			},
			htmlTag: {
				type: 'string',
				default: 'heading',
			},
			loadItalic: {
				type: 'boolean',
				default: false,
			},
			link: {
				type: 'string',
			},
			linkTarget: {
				type: 'boolean',
				default: false,
			},
			linkNoFollow: {
				type: 'boolean',
				default: false,
			},
			linkSponsored: {
				type: 'boolean',
				default: false,
			},
			background: {
				type: 'string',
			},
			backgroundColorClass: {
				type: 'string',
			},
		},
		save: ( { attributes } ) => {
			const { anchor, level, content, colorClass, color, textShadow, letterSpacing, topMargin, bottomMargin, marginType, align, uniqueID, className, baseAnimation, baseAOSOptions, htmlTag, link, linkNoFollow, linkSponsored, linkTarget, backgroundColorClass } = attributes;
			const tagName = htmlTag && htmlTag !== 'heading' ? htmlTag : 'h' + level;
			const mType = ( marginType ? marginType : 'px' );
			const textColorClass = getColorClassName( 'color', colorClass );
			const textBackgroundColorClass = getColorClassName( 'background-color', backgroundColorClass );
			const revealAnimation = ( baseAnimation && ( 'reveal-left' === baseAnimation || 'reveal-right' === baseAnimation || 'reveal-up' === baseAnimation || 'reveal-down' === baseAnimation ) ? true : false );
			const wrapper = ( revealAnimation ? true : false );
			const classes = classnames( {
				[ `bst-adv-heading${ uniqueID }` ]: uniqueID,
				[ className ]: ! wrapper && className,
				[ getBlockDefaultClassName( 'base/advancedheading' ) ]: getBlockDefaultClassName( 'base/advancedheading' ),
				[ textColorClass ]: textColorClass,
				'has-text-color': textColorClass,
				[ textBackgroundColorClass ]: textBackgroundColorClass,
				'has-background': textBackgroundColorClass,
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
					className={ 'bsb-advanced-heading-link' }
					target={ linkTarget ? '_blank' : undefined }
					relAttr={ relAttr ? relAttr : undefined }
				>
					{ htmlItem }
				</a>
			);
			const readyContent = ( link ? linkHTMLItem : htmlItem );
			return (
				<Fragment>
					{ wrapper && (
						<div className={ `bsb-adv-heading-wrap${ uniqueID } base-advanced-heading-wrapper${ ( revealAnimation ? ' base-heading-clip-animation' : '' ) }${ ( className ? ' ' + className : '' ) }` }>
							{ readyContent }
						</div>
					) }
					{ ! wrapper && (
						readyContent
					) }
				</Fragment>
			);
		}
	},
	{
		attributes: {
			content: {
				type: 'string',
				source: 'html',
				selector: 'h1,h2,h3,h4,h5,h6,p',
			},
			level: {
				type: 'number',
				default: 2,
			},
			uniqueID: {
				type: 'string',
			},
			align: {
				type: 'string',
			},
			color: {
				type: 'string',
			},
			size: {
				type: 'number',
			},
			sizeType: {
				type: 'string',
				default: 'px',
			},
			lineHeight: {
				type: 'number',
			},
			lineType: {
				type: 'string',
				default: 'px',
			},
			tabSize: {
				type: 'number',
			},
			tabLineHeight: {
				type: 'number',
			},
			mobileSize: {
				type: 'number',
			},
			mobileLineHeight: {
				type: 'number',
			},
			letterSpacing: {
				type: 'number',
			},
			typography: {
				type: 'string',
				default: '',
			},
			googleFont: {
				type: 'boolean',
				default: false,
			},
			loadGoogleFont: {
				type: 'boolean',
				default: true,
			},
			fontSubset: {
				type: 'string',
				default: '',
			},
			fontVariant: {
				type: 'string',
				default: '',
			},
			fontWeight: {
				type: 'string',
				default: 'regular',
			},
			fontStyle: {
				type: 'string',
				default: 'normal',
			},
			topMargin: {
				type: 'number',
				default: '',
			},
			bottomMargin: {
				type: 'number',
				default: '',
			},
			leftMargin: {
				type: 'number',
				default: '',
			},
			rightMargin: {
				type: 'number',
				default: '',
			},
			marginType: {
				type: 'string',
				default: 'px',
			},
			tabletMargin: {
				type: 'array',
				default: [ '', '', '', '' ],
			},
			mobileMargin: {
				type: 'array',
				default: [ '', '', '', '' ],
			},
			tabletMarginType: {
				type: 'string',
				default: 'px',
			},
			mobileMarginType: {
				type: 'string',
				default: 'px',
			},
			paddingType: {
				type: 'string',
				default: 'px',
			},
			padding: {
				type: 'array',
				default: [ '', '', '', '' ],
			},
			tabletPadding: {
				type: 'array',
				default: [ '', '', '', '' ],
			},
			mobilePadding: {
				type: 'array',
				default: [ '', '', '', '' ],
			},
			markSize: {
				type: 'array',
				default: [ '', '', '' ],
			},
			markSizeType: {
				type: 'string',
				default: 'px',
			},
			markLineHeight: {
				type: 'array',
				default: [ '', '', '' ],
			},
			markLineType: {
				type: 'string',
				default: 'px',
			},
			markLetterSpacing: {
				type: 'number',
			},
			markTypography: {
				type: 'string',
				default: '',
			},
			markGoogleFont: {
				type: 'boolean',
				default: false,
			},
			markLoadGoogleFont: {
				type: 'boolean',
				default: true,
			},
			markFontSubset: {
				type: 'string',
				default: '',
			},
			markFontVariant: {
				type: 'string',
				default: '',
			},
			markFontWeight: {
				type: 'string',
				default: 'regular',
			},
			markFontStyle: {
				type: 'string',
				default: 'normal',
			},
			markColor: {
				type: 'string',
				default: '#f76a0c',
			},
			markBG: {
				type: 'string',
			},
			markBGOpacity: {
				type: 'number',
				default: 1,
			},
			markPadding: {
				type: 'array',
				default: [ 0, 0, 0, 0 ],
			},
			markTabPadding: {
				type: 'array',
				default: [ '', '', '', '' ],
			},
			markMobilePadding: {
				type: 'array',
				default: [ '', '', '', '' ],
			},
			markPaddingControl: {
				type: 'string',
				default: 'linked',
			},
			markBorder: {
				type: 'string',
			},
			markBorderOpacity: {
				type: 'number',
				default: 1,
			},
			markBorderWidth: {
				type: 'number',
				default: 0,
			},
			markBorderStyle: {
				type: 'string',
				default: 'solid',
			},
			textTransform: {
				type: 'string',
				default: '',
			},
			markTextTransform: {
				type: 'string',
				default: '',
			},
			anchor: {
				type: 'string',
			},
			colorClass: {
				type: 'string',
			},
			tabletAlign: {
				type: 'string',
			},
			mobileAlign: {
				type: 'string',
			},
			textShadow: {
				type: 'array',
				default: [ {
					enable: false,
					color: 'rgba(0, 0, 0, 0.2)',
					blur: 1,
					hOffset: 1,
					vOffset: 1,
				} ],
			},
			htmlTag: {
				type: 'string',
				default: 'heading',
			},
			loadItalic: {
				type: 'boolean',
				default: false,
			},
		},
		save: ( { attributes } ) => {
			const { anchor, level, content, colorClass, color, textShadow, letterSpacing, topMargin, bottomMargin, marginType, align, uniqueID, className, baseAnimation, baseAOSOptions, htmlTag } = attributes;
			const tagName = htmlTag && htmlTag !== 'heading' ? htmlTag : 'h' + level;
			const mType = ( marginType ? marginType : 'px' );
			const textColorClass = getColorClassName( 'color', colorClass );
			const revealAnimation = ( baseAnimation && ( 'reveal-left' === baseAnimation || 'reveal-right' === baseAnimation || 'reveal-up' === baseAnimation || 'reveal-down' === baseAnimation ) ? true : false );
			const wrapper = ( revealAnimation ? true : false );
			const classes = classnames( {
				[ `bst-adv-heading${ uniqueID }` ]: uniqueID,
				[ className ]: ! wrapper && className,
				[ getBlockDefaultClassName( 'base/advancedheading' ) ]: getBlockDefaultClassName( 'base/advancedheading' ),
				[ textColorClass ]: textColorClass,
			} );
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
			return (
				<Fragment>
					{ wrapper && (
						<div className={ `bsb-adv-heading-wrap${ uniqueID } base-advanced-heading-wrapper${ ( revealAnimation ? ' base-heading-clip-animation' : '' ) }${ ( className ? ' ' + className : '' ) }` }>
							{ htmlItem }
						</div>
					) }
					{ ! wrapper && (
						htmlItem
					) }
				</Fragment>
			);
		}
	},
	{
		attributes: {
			content: {
				type: 'string',
				source: 'html',
				selector: 'h1,h2,h3,h4,h5,h6,p',
			},
			level: {
				type: 'number',
				default: 2,
			},
			uniqueID: {
				type: 'string',
			},
			align: {
				type: 'string',
			},
			color: {
				type: 'string',
			},
			size: {
				type: 'number',
			},
			sizeType: {
				type: 'string',
				default: 'px',
			},
			lineHeight: {
				type: 'number',
			},
			lineType: {
				type: 'string',
				default: 'px',
			},
			tabSize: {
				type: 'number',
			},
			tabLineHeight: {
				type: 'number',
			},
			mobileSize: {
				type: 'number',
			},
			mobileLineHeight: {
				type: 'number',
			},
			letterSpacing: {
				type: 'number',
			},
			typography: {
				type: 'string',
				default: '',
			},
			googleFont: {
				type: 'boolean',
				default: false,
			},
			loadGoogleFont: {
				type: 'boolean',
				default: true,
			},
			fontSubset: {
				type: 'string',
				default: '',
			},
			fontVariant: {
				type: 'string',
				default: '',
			},
			fontWeight: {
				type: 'string',
				default: 'regular',
			},
			fontStyle: {
				type: 'string',
				default: 'normal',
			},
			topMargin: {
				type: 'number',
				default: '',
			},
			bottomMargin: {
				type: 'number',
				default: '',
			},
			marginType: {
				type: 'string',
				default: 'px',
			},
			markSize: {
				type: 'array',
				default: [ '', '', '' ],
			},
			markSizeType: {
				type: 'string',
				default: 'px',
			},
			markLineHeight: {
				type: 'array',
				default: [ '', '', '' ],
			},
			markLineType: {
				type: 'string',
				default: 'px',
			},
			markLetterSpacing: {
				type: 'number',
			},
			markTypography: {
				type: 'string',
				default: '',
			},
			markGoogleFont: {
				type: 'boolean',
				default: false,
			},
			markLoadGoogleFont: {
				type: 'boolean',
				default: true,
			},
			markFontSubset: {
				type: 'string',
				default: '',
			},
			markFontVariant: {
				type: 'string',
				default: '',
			},
			markFontWeight: {
				type: 'string',
				default: 'regular',
			},
			markFontStyle: {
				type: 'string',
				default: 'normal',
			},
			markColor: {
				type: 'string',
				default: '#f76a0c',
			},
			markBG: {
				type: 'string',
			},
			markBGOpacity: {
				type: 'number',
				default: 1,
			},
			markPadding: {
				type: 'array',
				default: [ 0, 0, 0, 0 ],
			},
			markPaddingControl: {
				type: 'string',
				default: 'linked',
			},
			markBorder: {
				type: 'string',
			},
			markBorderOpacity: {
				type: 'number',
				default: 1,
			},
			markBorderWidth: {
				type: 'number',
				default: 0,
			},
			markBorderStyle: {
				type: 'string',
				default: 'solid',
			},
			textTransform: {
				type: 'string',
				default: '',
			},
			markTextTransform: {
				type: 'string',
				default: '',
			},
			anchor: {
				type: 'string',
			},
			colorClass: {
				type: 'string',
			},
			textShadow: {
				type: 'array',
				default: [ {
					enable: false,
					color: 'rgba(0, 0, 0, 0.2)',
					blur: 1,
					hOffset: 1,
					vOffset: 1,
				} ],
			},
			htmlTag: {
				type: 'string',
				default: 'heading',
			},
			baseAnimation: {
				type: 'string',
			},
			baseAOSOptions: {
				type: 'array',
				default: [ {
					duration: '',
					offset: '',
					easing: '',
					once: '',
					delay: '',
					delayOffset: '',
				} ],
			},
		},
		save: ( { attributes } ) => {
			const { anchor, align, level, content, color, colorClass, textShadow, uniqueID, letterSpacing, topMargin, bottomMargin, marginType, className, baseAnimation, baseAOSOptions, htmlTag } = attributes;
			//const tagName = 'h' + level;
			const tagName = htmlTag && htmlTag !== 'heading' ? htmlTag : 'h' + level;
			const textColorClass = getColorClassName( 'color', colorClass );
			const mType = ( marginType ? marginType : 'px' );
			let tagId = ( anchor ? anchor : `bst-adv-heading${ uniqueID }` );
			const revealAnimation = ( baseAnimation && ( 'reveal-left' === baseAnimation || 'reveal-right' === baseAnimation || 'reveal-up' === baseAnimation || 'reveal-down' === baseAnimation ) ? true : false );
			const wrapper = ( anchor || revealAnimation ? true : false );
			tagId = ( revealAnimation && ! anchor ? `bst-adv-inner-heading${ uniqueID }` : tagId );
			//const classes = ( ! wrapper && className ? `${ className } ${ getBlockDefaultClassName( 'base/advancedheading' ) }` : getBlockDefaultClassName( 'base/advancedheading' ) );
			const classes = classnames( {
				[ `bst-adv-heading${ uniqueID }` ]: uniqueID,
				[ className ]: ! wrapper && className,
				[ getBlockDefaultClassName( 'base/advancedheading' ) ]: getBlockDefaultClassName( 'base/advancedheading' ),
				[ textColorClass ]: textColorClass,
			} );
			const htmlItem = (
				<RichText.Content
					tagName={ tagName }
					id={ tagId }
					className={ classes }
					data-aos={ ( baseAnimation ? baseAnimation : undefined ) }
					data-aos-offset={ ( baseAOSOptions && baseAOSOptions[ 0 ] && baseAOSOptions[ 0 ].offset ? baseAOSOptions[ 0 ].offset : undefined ) }
					data-aos-duration={ ( baseAOSOptions && baseAOSOptions[ 0 ] && baseAOSOptions[ 0 ].duration ? baseAOSOptions[ 0 ].duration : undefined ) }
					data-aos-delay={ ( baseAOSOptions && baseAOSOptions[ 0 ] && baseAOSOptions[ 0 ].delay ? baseAOSOptions[ 0 ].delay : undefined ) }
					data-aos-easing={ ( baseAOSOptions && baseAOSOptions[ 0 ] && baseAOSOptions[ 0 ].easing ? baseAOSOptions[ 0 ].easing : undefined ) }
					data-aos-once={ ( baseAOSOptions && baseAOSOptions[ 0 ] && undefined !== baseAOSOptions[ 0 ].once && '' !== baseAOSOptions[ 0 ].once ? baseAOSOptions[ 0 ].once : undefined ) }
					style={ {
						textAlign: align,
						color: ! textColorClass && color ? BaseColorOutput( color ) : undefined,
						letterSpacing: ( letterSpacing ? letterSpacing + 'px' : undefined ),
						marginTop: ( undefined !== topMargin && '' !== topMargin ? topMargin + mType : undefined ),
						marginBottom: ( undefined !== bottomMargin && '' !== bottomMargin ? bottomMargin + mType : undefined ),
						textShadow: ( undefined !== textShadow && undefined !== textShadow[ 0 ] && undefined !== textShadow[ 0 ].enable && textShadow[ 0 ].enable ? ( undefined !== textShadow[ 0 ].hOffset ? textShadow[ 0 ].hOffset : 1 ) + 'px ' + ( undefined !== textShadow[ 0 ].vOffset ? textShadow[ 0 ].vOffset : 1 ) + 'px ' + ( undefined !== textShadow[ 0 ].blur ? textShadow[ 0 ].blur : 1 ) + 'px ' + ( undefined !== textShadow[ 0 ].color ? BaseColorOutput( textShadow[ 0 ].color ) : 'rgba(0,0,0,0.2)' ) : undefined ),
					} }
					value={ content }
				/>
			);
			return (
				<Fragment>
					{ wrapper && (
						<div id={ `bst-adv-heading${ uniqueID }` } className={ `base-advanced-heading-wrapper${ ( revealAnimation ? ' base-heading-clip-animation' : '' ) }${ ( className ? ' ' + className : '' ) }` }>
							{ htmlItem }
						</div>
					) }
					{ ! wrapper && (
						htmlItem
					) }
				</Fragment>
			);
		},
	},
	{
		attributes: {
			content: {
				type: 'string',
				source: 'html',
				selector: 'h1,h2,h3,h4,h5,h6',
			},
			level: {
				type: 'number',
				default: 2,
			},
			uniqueID: {
				type: 'string',
			},
			align: {
				type: 'string',
			},
			color: {
				type: 'string',
			},
			size: {
				type: 'number',
			},
			sizeType: {
				type: 'string',
				default: 'px',
			},
			lineHeight: {
				type: 'number',
			},
			lineType: {
				type: 'string',
				default: 'px',
			},
			tabSize: {
				type: 'number',
			},
			tabLineHeight: {
				type: 'number',
			},
			mobileSize: {
				type: 'number',
			},
			mobileLineHeight: {
				type: 'number',
			},
			letterSpacing: {
				type: 'number',
			},
			typography: {
				type: 'string',
				default: '',
			},
			googleFont: {
				type: 'boolean',
				default: false,
			},
			loadGoogleFont: {
				type: 'boolean',
				default: true,
			},
			fontSubset: {
				type: 'string',
				default: '',
			},
			fontVariant: {
				type: 'string',
				default: '',
			},
			fontWeight: {
				type: 'string',
				default: 'regular',
			},
			fontStyle: {
				type: 'string',
				default: 'normal',
			},
			topMargin: {
				type: 'number',
				default: '',
			},
			bottomMargin: {
				type: 'number',
				default: '',
			},
			marginType: {
				type: 'string',
				default: 'px',
			},
			markSize: {
				type: 'array',
				default: [ '', '', '' ],
			},
			markSizeType: {
				type: 'string',
				default: 'px',
			},
			markLineHeight: {
				type: 'array',
				default: [ '', '', '' ],
			},
			markLineType: {
				type: 'string',
				default: 'px',
			},
			markLetterSpacing: {
				type: 'number',
			},
			markTypography: {
				type: 'string',
				default: '',
			},
			markGoogleFont: {
				type: 'boolean',
				default: false,
			},
			markLoadGoogleFont: {
				type: 'boolean',
				default: true,
			},
			markFontSubset: {
				type: 'string',
				default: '',
			},
			markFontVariant: {
				type: 'string',
				default: '',
			},
			markFontWeight: {
				type: 'string',
				default: 'regular',
			},
			markFontStyle: {
				type: 'string',
				default: 'normal',
			},
			markColor: {
				type: 'string',
				default: '#f76a0c',
			},
			markBG: {
				type: 'string',
			},
			markBGOpacity: {
				type: 'number',
				default: 1,
			},
			markPadding: {
				type: 'array',
				default: [ 0, 0, 0, 0 ],
			},
			markPaddingControl: {
				type: 'string',
				default: 'linked',
			},
			markBorder: {
				type: 'string',
			},
			markBorderOpacity: {
				type: 'number',
				default: 1,
			},
			markBorderWidth: {
				type: 'number',
				default: 0,
			},
			markBorderStyle: {
				type: 'string',
				default: 'solid',
			},
			textTransform: {
				type: 'string',
				default: '',
			},
			markTextTransform: {
				type: 'string',
				default: '',
			},
			anchor: {
				type: 'string',
			},
		},
		save: ( { attributes } ) => {
			const { anchor, align, level, content, color, uniqueID, letterSpacing, topMargin, bottomMargin, marginType, className, baseAnimation, baseAOSOptions } = attributes;
			const tagName = 'h' + level;
			const mType = ( marginType ? marginType : 'px' );
			let tagId = ( anchor ? anchor : `bst-adv-heading${ uniqueID }` );
			const revealAnimation = ( baseAnimation && ( 'reveal-left' === baseAnimation || 'reveal-right' === baseAnimation || 'reveal-up' === baseAnimation || 'reveal-down' === baseAnimation ) ? true : false );
			const wrapper = ( anchor || revealAnimation ? true : false );
			tagId = ( revealAnimation && ! anchor ? `bst-adv-inner-heading${ uniqueID }` : tagId );
			const classes = ( className ? `${ className } ${ getBlockDefaultClassName( 'base/advancedheading' ) }` : getBlockDefaultClassName( 'base/advancedheading' ) );
			const htmlItem = (
				<RichText.Content
					tagName={ tagName }
					id={ tagId }
					className={ `bst-adv-heading${ uniqueID } ${ classes }` }
					data-aos={ ( baseAnimation ? baseAnimation : undefined ) }
					data-aos-offset={ ( baseAOSOptions && baseAOSOptions[ 0 ] && baseAOSOptions[ 0 ].offset ? baseAOSOptions[ 0 ].offset : undefined ) }
					data-aos-duration={ ( baseAOSOptions && baseAOSOptions[ 0 ] && baseAOSOptions[ 0 ].duration ? baseAOSOptions[ 0 ].duration : undefined ) }
					data-aos-delay={ ( baseAOSOptions && baseAOSOptions[ 0 ] && baseAOSOptions[ 0 ].delay ? baseAOSOptions[ 0 ].delay : undefined ) }
					data-aos-easing={ ( baseAOSOptions && baseAOSOptions[ 0 ] && baseAOSOptions[ 0 ].easing ? baseAOSOptions[ 0 ].easing : undefined ) }
					data-aos-once={ ( baseAOSOptions && baseAOSOptions[ 0 ] && undefined !== baseAOSOptions[ 0 ].once && '' !== baseAOSOptions[ 0 ].once ? baseAOSOptions[ 0 ].once : undefined ) }
					style={ {
						textAlign: align,
						color: color,
						letterSpacing: ( letterSpacing ? letterSpacing + 'px' : undefined ),
						marginTop: ( undefined !== topMargin && '' !== topMargin ? topMargin + mType : undefined ),
						marginBottom: ( undefined !== bottomMargin && '' !== bottomMargin ? bottomMargin + mType : undefined ),
					} }
					value={ content }
				/>
			);
			return (
				<Fragment>
					{ wrapper && (
						<div id={ `bst-adv-heading${ uniqueID }` } className={ `base-advanced-heading-wrapper${ ( revealAnimation ? ' base-heading-clip-animation' : '' ) }` }>
							{ htmlItem }
						</div>
					) }
					{ ! wrapper && (
						htmlItem
					) }
				</Fragment>
			);
		},
	},
	{
		attributes: {
			content: {
				type: 'string',
				source: 'html',
				selector: 'h1,h2,h3,h4,h5,h6',
			},
			level: {
				type: 'number',
				default: 2,
			},
			uniqueID: {
				type: 'string',
			},
			align: {
				type: 'string',
			},
			color: {
				type: 'string',
			},
			size: {
				type: 'number',
			},
			sizeType: {
				type: 'string',
				default: 'px',
			},
			lineHeight: {
				type: 'number',
			},
			lineType: {
				type: 'string',
				default: 'px',
			},
			tabSize: {
				type: 'number',
			},
			tabLineHeight: {
				type: 'number',
			},
			mobileSize: {
				type: 'number',
			},
			mobileLineHeight: {
				type: 'number',
			},
			letterSpacing: {
				type: 'number',
			},
			typography: {
				type: 'string',
				default: '',
			},
			googleFont: {
				type: 'boolean',
				default: false,
			},
			loadGoogleFont: {
				type: 'boolean',
				default: true,
			},
			fontSubset: {
				type: 'string',
				default: '',
			},
			fontVariant: {
				type: 'string',
				default: '',
			},
			fontWeight: {
				type: 'string',
				default: 'regular',
			},
			fontStyle: {
				type: 'string',
				default: 'normal',
			},
			topMargin: {
				type: 'number',
				default: '',
			},
			bottomMargin: {
				type: 'number',
				default: '',
			},
			marginType: {
				type: 'string',
				default: 'px',
			},
			markSize: {
				type: 'array',
				default: [ '', '', '' ],
			},
			markSizeType: {
				type: 'string',
				default: 'px',
			},
			markLineHeight: {
				type: 'array',
				default: [ '', '', '' ],
			},
			markLineType: {
				type: 'string',
				default: 'px',
			},
			markLetterSpacing: {
				type: 'number',
			},
			markTypography: {
				type: 'string',
				default: '',
			},
			markGoogleFont: {
				type: 'boolean',
				default: false,
			},
			markLoadGoogleFont: {
				type: 'boolean',
				default: true,
			},
			markFontSubset: {
				type: 'string',
				default: '',
			},
			markFontVariant: {
				type: 'string',
				default: '',
			},
			markFontWeight: {
				type: 'string',
				default: 'regular',
			},
			markFontStyle: {
				type: 'string',
				default: 'normal',
			},
			markColor: {
				type: 'string',
				default: '#f76a0c',
			},
			markBG: {
				type: 'string',
			},
			markBGOpacity: {
				type: 'number',
				default: 1,
			},
			markPadding: {
				type: 'array',
				default: [ 0, 0, 0, 0 ],
			},
			markPaddingControl: {
				type: 'string',
				default: 'linked',
			},
			markBorder: {
				type: 'string',
			},
			markBorderOpacity: {
				type: 'number',
				default: 1,
			},
			markBorderWidth: {
				type: 'number',
				default: 0,
			},
			markBorderStyle: {
				type: 'string',
				default: 'solid',
			},
			textTransform: {
				type: 'string',
				default: '',
			},
			markTextTransform: {
				type: 'string',
				default: '',
			},
			anchor: {
				type: 'string',
			},
		},
		save: ( { attributes } ) => {
			const { anchor, align, level, content, color, uniqueID, letterSpacing, topMargin, bottomMargin, marginType, className, baseAnimation, baseAOSOptions } = attributes;
			const tagName = 'h' + level;
			const mType = ( marginType ? marginType : 'px' );
			let tagId = ( anchor ? anchor : `bst-adv-heading${ uniqueID }` );
			const revealAnimation = ( baseAnimation && ( 'reveal-left' === baseAnimation || 'reveal-right' === baseAnimation || 'reveal-up' === baseAnimation || 'reveal-down' === baseAnimation ) ? true : false );
			const wrapper = ( anchor || revealAnimation ? true : false );
			tagId = ( revealAnimation && ! anchor ? `bst-adv-inner-heading${ uniqueID }` : tagId );
			const classes = ( className ? `${ className } ${ getBlockDefaultClassName( 'base/advancedheading' ) }` : getBlockDefaultClassName( 'base/advancedheading' ) );
			const htmlItem = (
				<RichText.Content
					tagName={ tagName }
					id={ tagId }
					className={ `bst-adv-heading${ uniqueID } ${ classes }` }
					data-aos={ ( baseAnimation ? baseAnimation : undefined ) }
					data-aos-offset={ ( baseAOSOptions && baseAOSOptions[ 0 ] && baseAOSOptions[ 0 ].offset ? baseAOSOptions[ 0 ].offset : undefined ) }
					data-aos-duration={ ( baseAOSOptions && baseAOSOptions[ 0 ] && baseAOSOptions[ 0 ].duration ? baseAOSOptions[ 0 ].duration : undefined ) }
					data-aos-delay={ ( baseAOSOptions && baseAOSOptions[ 0 ] && baseAOSOptions[ 0 ].delay ? baseAOSOptions[ 0 ].delay : undefined ) }
					data-aos-easing={ ( baseAOSOptions && baseAOSOptions[ 0 ] && baseAOSOptions[ 0 ].easing ? baseAOSOptions[ 0 ].easing : undefined ) }
					data-aos-once={ ( baseAOSOptions && baseAOSOptions[ 0 ] && undefined !== baseAOSOptions[ 0 ].once && '' !== baseAOSOptions[ 0 ].once ? baseAOSOptions[ 0 ].once : undefined ) }
					style={ {
						textAlign: align,
						color: color,
						letterSpacing: ( letterSpacing ? letterSpacing + 'px' : undefined ),
						marginTop: ( topMargin ? topMargin + mType : undefined ),
						marginBottom: ( bottomMargin ? bottomMargin + mType : undefined ),
					} }
					value={ content }
				/>
			);
			return (
				<Fragment>
					{ wrapper && (
						<div id={ `bst-adv-heading${ uniqueID }` } className={ `base-advanced-heading-wrapper${ ( revealAnimation ? ' base-heading-clip-animation' : '' ) }` }>
							{ htmlItem }
						</div>
					) }
					{ ! wrapper && (
						htmlItem
					) }
				</Fragment>
			);
		},
	},
	{
		attributes: {
			content: {
				type: 'array',
				source: 'children',
				selector: 'h1,h2,h3,h4,h5,h6',
			},
			level: {
				type: 'number',
				default: 2,
			},
			uniqueID: {
				type: 'string',
			},
			align: {
				type: 'string',
			},
			color: {
				type: 'string',
			},
			size: {
				type: 'number',
			},
			sizeType: {
				type: 'string',
				default: 'px',
			},
			lineHeight: {
				type: 'number',
			},
			lineType: {
				type: 'string',
				default: 'px',
			},
			tabSize: {
				type: 'number',
			},
			tabLineHeight: {
				type: 'number',
			},
			mobileSize: {
				type: 'number',
			},
			mobileLineHeight: {
				type: 'number',
			},
			letterSpacing: {
				type: 'number',
			},
			typography: {
				type: 'string',
				default: '',
			},
			googleFont: {
				type: 'boolean',
				default: false,
			},
			loadGoogleFont: {
				type: 'boolean',
				default: true,
			},
			fontSubset: {
				type: 'string',
				default: '',
			},
			fontVariant: {
				type: 'string',
				default: '',
			},
			fontWeight: {
				type: 'string',
				default: 'regular',
			},
			fontStyle: {
				type: 'string',
				default: 'normal',
			},
			topMargin: {
				type: 'number',
				default: '',
			},
			bottomMargin: {
				type: 'number',
				default: '',
			},
			marginType: {
				type: 'string',
				default: 'px',
			},
			markSize: {
				type: 'array',
				default: [ '', '', '' ],
			},
			markSizeType: {
				type: 'string',
				default: 'px',
			},
			markLineHeight: {
				type: 'array',
				default: [ '', '', '' ],
			},
			markLineType: {
				type: 'string',
				default: 'px',
			},
			markLetterSpacing: {
				type: 'number',
			},
			markTypography: {
				type: 'string',
				default: '',
			},
			markGoogleFont: {
				type: 'boolean',
				default: false,
			},
			markLoadGoogleFont: {
				type: 'boolean',
				default: true,
			},
			markFontSubset: {
				type: 'string',
				default: '',
			},
			markFontVariant: {
				type: 'string',
				default: '',
			},
			markFontWeight: {
				type: 'string',
				default: 'regular',
			},
			markFontStyle: {
				type: 'string',
				default: 'normal',
			},
			markColor: {
				type: 'string',
				default: '#f76a0c',
			},
			markBG: {
				type: 'string',
			},
			markBGOpacity: {
				type: 'number',
				default: 1,
			},
			markPadding: {
				type: 'array',
				default: [ 0, 0, 0, 0 ],
			},
			markPaddingControl: {
				type: 'string',
				default: 'linked',
			},
			markBorder: {
				type: 'string',
			},
			markBorderOpacity: {
				type: 'number',
				default: 1,
			},
			markBorderWidth: {
				type: 'number',
				default: 0,
			},
			markBorderStyle: {
				type: 'string',
				default: 'solid',
			},
			anchor: {
				type: 'string',
			},
		},
		save: ( { attributes } ) => {
			const { anchor, align, level, content, color, uniqueID, letterSpacing, topMargin, bottomMargin, marginType, className, baseAnimation, baseAOSOptions } = attributes;
			const tagName = 'h' + level;
			const mType = ( marginType ? marginType : 'px' );
			let tagId = ( anchor ? anchor : `bst-adv-heading${ uniqueID }` );
			const revealAnimation = ( baseAnimation && ( 'reveal-left' === baseAnimation || 'reveal-right' === baseAnimation || 'reveal-up' === baseAnimation || 'reveal-down' === baseAnimation ) ? true : false );
			const wrapper = ( anchor || revealAnimation ? true : false );
			tagId = ( revealAnimation && ! anchor ? `bst-adv-inner-heading${ uniqueID }` : `bst-adv-heading${ uniqueID }` );
			const classes = ( className ? `${ className } ${ getBlockDefaultClassName( 'base/advancedheading' ) }` : getBlockDefaultClassName( 'base/advancedheading' ) );
			const htmlItem = (
				<RichText.Content
					tagName={ tagName }
					id={ tagId }
					className={ `bst-adv-heading${ uniqueID } ${ classes }` }
					data-aos={ ( baseAnimation ? baseAnimation : undefined ) }
					data-aos-offset={ ( baseAOSOptions && baseAOSOptions[ 0 ] && baseAOSOptions[ 0 ].offset ? baseAOSOptions[ 0 ].offset : undefined ) }
					data-aos-duration={ ( baseAOSOptions && baseAOSOptions[ 0 ] && baseAOSOptions[ 0 ].duration ? baseAOSOptions[ 0 ].duration : undefined ) }
					data-aos-delay={ ( baseAOSOptions && baseAOSOptions[ 0 ] && baseAOSOptions[ 0 ].delay ? baseAOSOptions[ 0 ].delay : undefined ) }
					data-aos-easing={ ( baseAOSOptions && baseAOSOptions[ 0 ] && baseAOSOptions[ 0 ].easing ? baseAOSOptions[ 0 ].easing : undefined ) }
					data-aos-once={ ( baseAOSOptions && baseAOSOptions[ 0 ] && undefined !== baseAOSOptions[ 0 ].once && '' !== baseAOSOptions[ 0 ].once ? baseAOSOptions[ 0 ].once : undefined ) }
					style={ {
						textAlign: align,
						color: color,
						letterSpacing: ( letterSpacing ? letterSpacing + 'px' : undefined ),
						marginTop: ( topMargin ? topMargin + mType : undefined ),
						marginBottom: ( bottomMargin ? bottomMargin + mType : undefined ),
					} }
					value={ content }
				/>
			);
			return (
				<Fragment>
					{ wrapper && (
						<div id={ `bst-adv-heading${ uniqueID }` } className={ `base-advanced-heading-wrapper${ ( revealAnimation ? ' base-heading-clip-animation' : '' ) }` }>
							{ htmlItem }
						</div>
					) }
					{ ! wrapper && (
						htmlItem
					) }
				</Fragment>
			);
		},
	},
	{
		attributes: {
			content: {
				type: 'array',
				source: 'children',
				selector: 'h1,h2,h3,h4,h5,h6',
			},
			level: {
				type: 'number',
				default: 2,
			},
			uniqueID: {
				type: 'string',
			},
			align: {
				type: 'string',
			},
			color: {
				type: 'string',
			},
			size: {
				type: 'number',
			},
			sizeType: {
				type: 'string',
				default: 'px',
			},
			lineHeight: {
				type: 'number',
			},
			lineType: {
				type: 'string',
				default: 'px',
			},
			tabSize: {
				type: 'number',
			},
			tabLineHeight: {
				type: 'number',
			},
			mobileSize: {
				type: 'number',
			},
			mobileLineHeight: {
				type: 'number',
			},
			letterSpacing: {
				type: 'number',
			},
			typography: {
				type: 'string',
				default: '',
			},
			googleFont: {
				type: 'boolean',
				default: false,
			},
			loadGoogleFont: {
				type: 'boolean',
				default: true,
			},
			fontSubset: {
				type: 'string',
				default: '',
			},
			fontVariant: {
				type: 'string',
				default: '',
			},
			fontWeight: {
				type: 'string',
				default: 'regular',
			},
			fontStyle: {
				type: 'string',
				default: 'normal',
			},
			topMargin: {
				type: 'number',
				default: '',
			},
			bottomMargin: {
				type: 'number',
				default: '',
			},
			marginType: {
				type: 'string',
				default: 'px',
			},
			markSize: {
				type: 'array',
				default: [ '', '', '' ],
			},
			markSizeType: {
				type: 'string',
				default: 'px',
			},
			markLineHeight: {
				type: 'array',
				default: [ '', '', '' ],
			},
			markLineType: {
				type: 'string',
				default: 'px',
			},
			markLetterSpacing: {
				type: 'number',
			},
			markTypography: {
				type: 'string',
				default: '',
			},
			markGoogleFont: {
				type: 'boolean',
				default: false,
			},
			markLoadGoogleFont: {
				type: 'boolean',
				default: true,
			},
			markFontSubset: {
				type: 'string',
				default: '',
			},
			markFontVariant: {
				type: 'string',
				default: '',
			},
			markFontWeight: {
				type: 'string',
				default: 'regular',
			},
			markFontStyle: {
				type: 'string',
				default: 'normal',
			},
			markColor: {
				type: 'string',
				default: '#f76a0c',
			},
			markBG: {
				type: 'string',
			},
			markBGOpacity: {
				type: 'number',
				default: 1,
			},
			markPadding: {
				type: 'array',
				default: [ 0, 0, 0, 0 ],
			},
			markPaddingControl: {
				type: 'string',
				default: 'linked',
			},
			markBorder: {
				type: 'string',
			},
			markBorderOpacity: {
				type: 'number',
				default: 1,
			},
			markBorderWidth: {
				type: 'number',
				default: 0,
			},
			markBorderStyle: {
				type: 'string',
				default: 'solid',
			},
		},
		save: ( { attributes } ) => {
			const { align, level, content, color, uniqueID, letterSpacing, topMargin, bottomMargin, marginType } = attributes;
			const tagName = 'h' + level;
			const mType = ( marginType ? marginType : 'px' );
			return (
				<RichText.Content
					tagName={ tagName }
					id={ `bst-adv-heading${ uniqueID }` }
					style={ {
						textAlign: align,
						color: color,
						letterSpacing: ( letterSpacing ? letterSpacing + 'px' : undefined ),
						marginTop: ( topMargin ? topMargin + mType : undefined ),
						marginBottom: ( bottomMargin ? bottomMargin + mType : undefined ),
					} }
					value={ content }
				/>
			);
		},
	},
	{
		attributes: {
			content: {
				type: 'array',
				source: 'children',
				selector: 'h1,h2,h3,h4,h5,h6',
			},
			level: {
				type: 'number',
				default: 2,
			},
			uniqueID: {
				type: 'string',
			},
			align: {
				type: 'string',
			},
			color: {
				type: 'string',
			},
			size: {
				type: 'number',
			},
			sizeType: {
				type: 'string',
				default: 'px',
			},
			lineHeight: {
				type: 'number',
			},
			lineType: {
				type: 'string',
				default: 'px',
			},
			tabSize: {
				type: 'number',
			},
			tabLineHeight: {
				type: 'number',
			},
			mobileSize: {
				type: 'number',
			},
			mobileLineHeight: {
				type: 'number',
			},
			letterSpacing: {
				type: 'number',
			},
			typography: {
				type: 'string',
				default: '',
			},
			googleFont: {
				type: 'boolean',
				default: false,
			},
			loadGoogleFont: {
				type: 'boolean',
				default: true,
			},
			fontSubset: {
				type: 'string',
				default: '',
			},
			fontVariant: {
				type: 'string',
				default: '',
			},
			fontWeight: {
				type: 'string',
				default: 'regular',
			},
			fontStyle: {
				type: 'string',
				default: 'normal',
			},
		},
		save: ( { attributes } ) => {
			const { align, level, content, color, uniqueID, letterSpacing } = attributes;
			const tagName = 'h' + level;
			return (
				<RichText.Content
					tagName={ tagName }
					id={ `bst-adv-heading${ uniqueID }` }
					style={ {
						textAlign: align,
						color: color,
						letterSpacing: ( letterSpacing ? letterSpacing + 'px' : undefined ),
					} }
					value={ content }
				/>
			);
		},
	},
];
