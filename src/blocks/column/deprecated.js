/**
 * BLOCK: Base Section
 *
 * Registering Deprecations.
 */
/**
 * External dependencies
 */
import classnames from 'classnames';
import { hexToRGBA, BaseColorOutput } from '@base/helpers';

/**
 * Internal dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
/**
 * BLOCK: Base Section
 *
 * Registering Deprecations.
 */
export default [
	{
		attributes: {
			id: {
				type: 'number',
				default: 1
			},
			topPadding: {
				type: 'number',
				default: ''
			},
			bottomPadding: {
				type: 'number',
				default: ''
			},
			leftPadding: {
				type: 'number',
				default: ''
			},
			rightPadding: {
				type: 'number',
				default: ''
			},
			topPaddingM: {
				type: 'number',
				default: ''
			},
			bottomPaddingM: {
				type: 'number',
				default: ''
			},
			leftPaddingM: {
				type: 'number',
				default: ''
			},
			rightPaddingM: {
				type: 'number',
				default: ''
			},
			topMargin: {
				type: 'number',
				default: ''
			},
			bottomMargin: {
				type: 'number',
				default: ''
			},
			topMarginM: {
				type: 'number',
				default: ''
			},
			bottomMarginM: {
				type: 'number',
				default: ''
			},
			leftMargin: {
				type: 'number',
				default: ''
			},
			rightMargin: {
				type: 'number',
				default: ''
			},
			leftMarginM: {
				type: 'number',
				default: ''
			},
			rightMarginM: {
				type: 'number',
				default: ''
			},
			zIndex: {
				type: 'number',
				default: ''
			},
			background: {
				type: 'string',
				default: ''
			},
			backgroundOpacity: {
				type: 'number',
				default: 1
			},
			border: {
				type: 'string',
				default: ''
			},
			borderOpacity: {
				type: 'number',
				default: 1
			},
			borderWidth: {
				type: 'array',
				default: [ 0, 0, 0, 0 ]
			},
			tabletBorderWidth: {
				type: 'array',
				default: [ '', '', '', '' ]
			},
			mobileBorderWidth: {
				type: 'array',
				default: [ '', '', '', '' ]
			},
			borderRadius: {
				type: 'array',
				default: [ 0, 0, 0, 0 ]
			},
			uniqueID: {
				type: 'string',
				default: ''
			},
			collapseOrder: {
				type: 'number'
			},
			backgroundImg: {
				type: 'array',
				default: [ {
					bgImg: '',
					bgImgID: '',
					bgImgSize: 'cover',
					bgImgPosition: 'center center',
					bgImgAttachment: 'scroll',
					bgImgRepeat: 'no-repeat',
				} ]
			},
			textAlign: {
				type: 'array',
				default: [ '', '', '' ]
			},
			textColor: {
				type: 'string',
				default: ''
			},
			linkColor: {
				type: 'string',
				default: ''
			},
			linkHoverColor: {
				type: 'string',
				default: ''
			},
			topPaddingT: {
				type: 'number',
				default: ''
			},
			bottomPaddingT: {
				type: 'number',
				default: ''
			},
			leftPaddingT: {
				type: 'number',
				default: ''
			},
			rightPaddingT: {
				type: 'number',
				default: ''
			},
			topMarginT: {
				type: 'number',
				default: ''
			},
			bottomMarginT: {
				type: 'number',
				default: ''
			},
			leftMarginT: {
				type: 'number',
				default: ''
			},
			rightMarginT: {
				type: 'number',
				default: ''
			},
			displayShadow: {
				type: 'boolean',
				default: false
			},
			shadow: {
				type: 'array',
				default: [ {
					color: '#000000',
					opacity: 0.2,
					spread: 0,
					blur: 14,
					hOffset: 0,
					vOffset: 0,
					inset: false,
				} ]
			},
			noCustomDefaults: {
				type: 'boolean',
				default: false
			},
			vsdesk: {
				type: 'boolean',
				default: false
			},
			vstablet: {
				type: 'boolean',
				default: false
			},
			vsmobile: {
				type: 'boolean',
				default: false
			},
			paddingType: {
				type: 'string',
				default: 'px'
			},
			marginType: {
				type: 'string',
				default: 'px'
			},
			bgColorClass: {
				type: 'string',
				default: ''
			},
			templateLock: {
				type: 'string'
			},
			direction: {
				type: 'array',
				default: [ '', '', '' ]
			},
			justifyContent: {
				type: 'array',
				default: [ '', '', '' ]
			},
			wrapContent: {
				type: 'array',
				default: [ '', '', '' ]
			},
			gutter: {
				type: 'array',
				default: [ '', '', '' ]
			},
			gutterUnit: {
				type: 'string',
				default: 'px'
			},
			verticalAlignment: {
				type: 'string'
			},
			backgroundImgHover: {
				type: 'array',
				default: [ {
					bgImg: '',
					bgImgID: '',
					bgImgSize: 'cover',
					bgImgPosition: 'center center',
					bgImgAttachment: 'scroll',
					bgImgRepeat: 'no-repeat',
				} ]
			},
			backgroundHover: {
				type: 'string',
				default: ''
			},
			overlayOpacity: {
				type: 'number',
				default: 0.3
			},
			overlay: {
				type: 'string',
				default: ''
			},
			overlayImg: {
				type: 'array',
				default: [ {
					bgImg: '',
					bgImgID: '',
					bgImgSize: 'cover',
					bgImgPosition: 'center center',
					bgImgAttachment: 'scroll',
					bgImgRepeat: 'no-repeat',
				} ]
			},
			overlayHoverOpacity: {
				type: 'number',
				default: ''
			},
			overlayHover: {
				type: 'string',
				default: ''
			},
			overlayImgHover: {
				type: 'array',
				default: [ {
					bgImg: '',
					bgImgID: '',
					bgImgSize: 'cover',
					bgImgPosition: 'center center',
					bgImgAttachment: 'scroll',
					bgImgRepeat: 'no-repeat',
				} ]
			},
			overlayGradient: {
				type: 'string',
				default: ''
			},
			overlayGradientHover: {
				type: 'string',
				default: ''
			},
			borderHover: {
				type: 'string',
				default: ''
			},
			borderHoverWidth: {
				type: 'array',
				default: [ '', '', '', '' ]
			},
			tabletBorderHoverWidth: {
				type: 'array',
				default: [ '', '', '', '' ]
			},
			mobileBorderHoverWidth: {
				type: 'array',
				default: [ '', '', '', '' ]
			},
			borderHoverRadius: {
				type: 'array',
				default: [ '', '', '', '' ]
			},
			displayHoverShadow: {
				type: 'boolean',
				default: false
			},
			shadowHover: {
				type: 'array',
				default: [ {
					color: '#000000',
					opacity: 0.2,
					spread: 0,
					blur: 14,
					hOffset: 0,
					vOffset: 0,
					inset: false,
				} ]
			},
			textColorHover: {
				type: 'string',
				default: ''
			},
			linkColorHover: {
				type: 'string',
				default: ''
			},
			linkHoverColorHover: {
				type: 'string',
				default: ''
			},
			link: {
				type: 'string',
				default: ''
			},
			linkTitle: {
				type: 'string',
				default: ''
			},
			linkTarget: {
				type: 'boolean',
				default: false
			},
			linkNoFollow: {
				type: 'boolean',
				default: false
			},
			linkSponsored: {
				type: 'boolean',
				default: false
			},
			maxWidth: {
				type: 'array',
				default: [ '', '', '' ]
			},
			maxWidthUnit: {
				type: 'string',
				default: 'px'
			},
			height: {
				type: 'array',
				default: [ '', '', '' ]
			},
			heightUnit: {
				type: 'string',
				default: 'px'
			},
			htmlTag: {
				type: 'string',
				default: 'div'
			},
			inQueryBlock: {
				type: 'boolean',
				default: false
			},
			overlayType: {
				type: 'string',
				default: 'normal'
			},
			sticky: {
				type: 'boolean',
				default: false
			},
			stickyOffset: {
				type: 'array',
				default: [ '', '', '' ]
			},
			stickyOffsetUnit: {
				type: 'string',
				default: 'px'
			},
			baseBlockCSS: {
				type: 'string',
				default: '',
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
			baseDynamic: {
				type: 'object',
			},
			baseConditional: {
				type: 'object',
			},
		},
		supports: {
			anchor: true,
			btanimate: true,
			btanimateadd: true,
			btanimatepreview: true,
			btanimateswipe: true,
			btdynamic: true,
			bbcss: true,
			editorsKitBlockNavigator: true
		},
		save: ( { attributes } ) => {
			const { id, uniqueID, vsdesk, vstablet, vsmobile, link, linkNoFollow, linkSponsored, sticky, linkTarget, linkTitle, htmlTag, overlay, overlayImg, overlayHover, overlayImgHover, align, direction, overlayGradient, overlayGradientHover, baseAnimation, baseAOSOptions } = attributes;
			const hasOverlay = ( overlay || overlayGradient || overlayGradientHover || ( overlayImg && overlayImg[ 0 ] && overlayImg[ 0 ].bgImg ) || overlayHover || ( overlayImgHover && overlayImgHover[ 0 ] && overlayImgHover[ 0 ].bgImg ) ? true : false );
			const deskDirection = ( direction && '' !== direction[ 0 ] ? direction[ 0 ] : false );
			const tabDirection = ( direction && '' !== direction[ 1 ] ? direction[ 1 ] : false );
			const mobileDirection = ( direction && '' !== direction[ 2 ] ? direction[ 2 ] : false );
			const classes = classnames( {
				[ `inner-column-${ id }` ]: id,
				[ `base-column${ uniqueID }` ]: uniqueID,
				'kvs-lg-false': vsdesk !== undefined && vsdesk,
				'kvs-md-false': vstablet !== undefined && vstablet,
				'kvs-sm-false': vsmobile !== undefined && vsmobile,
				'bsb-section-has-link': undefined !== link && '' !== link,
				'bsb-section-is-sticky': undefined !== sticky && sticky,
				'bsb-section-has-overlay': undefined !== hasOverlay && hasOverlay,
				[ `align${ align }`] : align === 'full' || align === 'wide',
				[ `bsb-section-dir-${ deskDirection }` ]: deskDirection,
				[ `bsb-section-md-dir-${ tabDirection }` ]: tabDirection,
				[ `bsb-section-sm-dir-${ mobileDirection }` ]: mobileDirection,
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
			const HtmlTagOut = ( ! htmlTag ? 'div' : htmlTag );
			return (
				<HtmlTagOut { ...useBlockProps.save( { className: classes } ) }
							data-aos={ ( baseAnimation ? baseAnimation : undefined ) }
							data-aos-offset={ ( baseAnimation && baseAOSOptions && baseAOSOptions[ 0 ] && baseAOSOptions[ 0 ].offset ? baseAOSOptions[ 0 ].offset : undefined ) }
							data-aos-duration={ ( baseAnimation && baseAOSOptions && baseAOSOptions[ 0 ] && baseAOSOptions[ 0 ].duration ? baseAOSOptions[ 0 ].duration : undefined ) }
							data-aos-delay={ ( baseAnimation && baseAOSOptions && baseAOSOptions[ 0 ] && baseAOSOptions[ 0 ].delay ? baseAOSOptions[ 0 ].delay : undefined ) }
							data-aos-easing={ ( baseAnimation && baseAOSOptions && baseAOSOptions[ 0 ] && baseAOSOptions[ 0 ].easing ? baseAOSOptions[ 0 ].easing : undefined ) }
							data-aos-once={ ( baseAnimation && baseAOSOptions && baseAOSOptions[ 0 ] && undefined !== baseAOSOptions[ 0 ].once && '' !== baseAOSOptions[ 0 ].once ? baseAOSOptions[ 0 ].once : undefined ) }
				>
					<div className={ 'bst-inside-inner-col' }>
						<InnerBlocks.Content />
					</div>
					{ link && (
						<a
							href={ link }
							className={ `bsb-section-link-overlay` }
							target={ linkTarget ? '_blank' : undefined }
							rel={ relAttr ? relAttr : undefined }
							aria-label={ linkTitle ? linkTitle : undefined }
						>
						</a>
					) }
				</HtmlTagOut>
			);
		}
	},
	{
		attributes: {
			id: {
				type: 'number',
				default: 1
			},
			topPadding: {
				type: 'number',
				default: ''
			},
			bottomPadding: {
				type: 'number',
				default: ''
			},
			leftPadding: {
				type: 'number',
				default: ''
			},
			rightPadding: {
				type: 'number',
				default: ''
			},
			topPaddingM: {
				type: 'number',
				default: ''
			},
			bottomPaddingM: {
				type: 'number',
				default: ''
			},
			leftPaddingM: {
				type: 'number',
				default: ''
			},
			rightPaddingM: {
				type: 'number',
				default: ''
			},
			topMargin: {
				type: 'number',
				default: ''
			},
			bottomMargin: {
				type: 'number',
				default: ''
			},
			topMarginM: {
				type: 'number',
				default: ''
			},
			bottomMarginM: {
				type: 'number',
				default: ''
			},
			leftMargin: {
				type: 'number',
				default: ''
			},
			rightMargin: {
				type: 'number',
				default: ''
			},
			leftMarginM: {
				type: 'number',
				default: ''
			},
			rightMarginM: {
				type: 'number',
				default: ''
			},
			zIndex: {
				type: 'number',
				default: ''
			},
			background: {
				type: 'string',
				default: ''
			},
			backgroundOpacity: {
				type: 'number',
				default: 1
			},
			border: {
				type: 'string',
				default: ''
			},
			borderOpacity: {
				type: 'number',
				default: 1
			},
			borderWidth: {
				type: 'array',
				default: [ 0, 0, 0, 0 ]
			},
			tabletBorderWidth: {
				type: 'array',
				default: [ '', '', '', '' ]
			},
			mobileBorderWidth: {
				type: 'array',
				default: [ '', '', '', '' ]
			},
			borderRadius: {
				type: 'array',
				default: [ 0, 0, 0, 0 ]
			},
			uniqueID: {
				type: 'string',
				default: ''
			},
			collapseOrder: {
				type: 'number'
			},
			backgroundImg: {
				type: 'array',
				default: [ {
					bgImg: '',
					bgImgID: '',
					bgImgSize: 'cover',
					bgImgPosition: 'center center',
					bgImgAttachment: 'scroll',
					bgImgRepeat: 'no-repeat',
				} ]
			},
			textAlign: {
				type: 'array',
				default: [ '', '', '' ]
			},
			textColor: {
				type: 'string',
				default: ''
			},
			linkColor: {
				type: 'string',
				default: ''
			},
			linkHoverColor: {
				type: 'string',
				default: ''
			},
			topPaddingT: {
				type: 'number',
				default: ''
			},
			bottomPaddingT: {
				type: 'number',
				default: ''
			},
			leftPaddingT: {
				type: 'number',
				default: ''
			},
			rightPaddingT: {
				type: 'number',
				default: ''
			},
			topMarginT: {
				type: 'number',
				default: ''
			},
			bottomMarginT: {
				type: 'number',
				default: ''
			},
			leftMarginT: {
				type: 'number',
				default: ''
			},
			rightMarginT: {
				type: 'number',
				default: ''
			},
			displayShadow: {
				type: 'boolean',
				default: false
			},
			shadow: {
				type: 'array',
				default: [ {
					color: '#000000',
					opacity: 0.2,
					spread: 0,
					blur: 14,
					hOffset: 0,
					vOffset: 0,
					inset: false,
				} ]
			},
			noCustomDefaults: {
				type: 'boolean',
				default: false
			},
			vsdesk: {
				type: 'boolean',
				default: false
			},
			vstablet: {
				type: 'boolean',
				default: false
			},
			vsmobile: {
				type: 'boolean',
				default: false
			},
			paddingType: {
				type: 'string',
				default: 'px'
			},
			marginType: {
				type: 'string',
				default: 'px'
			},
			bgColorClass: {
				type: 'string',
				default: ''
			},
			templateLock: {
				type: 'string'
			},
			direction: {
				type: 'array',
				default: [ '', '', '' ]
			},
			justifyContent: {
				type: 'array',
				default: [ '', '', '' ]
			},
			wrapContent: {
				type: 'array',
				default: [ '', '', '' ]
			},
			gutter: {
				type: 'array',
				default: [ '', '', '' ]
			},
			gutterUnit: {
				type: 'string',
				default: 'px'
			},
			verticalAlignment: {
				type: 'string'
			},
			backgroundImgHover: {
				type: 'array',
				default: [ {
					bgImg: '',
					bgImgID: '',
					bgImgSize: 'cover',
					bgImgPosition: 'center center',
					bgImgAttachment: 'scroll',
					bgImgRepeat: 'no-repeat',
				} ]
			},
			backgroundHover: {
				type: 'string',
				default: ''
			},
			overlayOpacity: {
				type: 'number',
				default: 0.3
			},
			overlay: {
				type: 'string',
				default: ''
			},
			overlayImg: {
				type: 'array',
				default: [ {
					bgImg: '',
					bgImgID: '',
					bgImgSize: 'cover',
					bgImgPosition: 'center center',
					bgImgAttachment: 'scroll',
					bgImgRepeat: 'no-repeat',
				} ]
			},
			overlayHoverOpacity: {
				type: 'number',
				default: ''
			},
			overlayHover: {
				type: 'string',
				default: ''
			},
			overlayImgHover: {
				type: 'array',
				default: [ {
					bgImg: '',
					bgImgID: '',
					bgImgSize: 'cover',
					bgImgPosition: 'center center',
					bgImgAttachment: 'scroll',
					bgImgRepeat: 'no-repeat',
				} ]
			},
			borderHover: {
				type: 'string',
				default: ''
			},
			borderHoverWidth: {
				type: 'array',
				default: [ '', '', '', '' ]
			},
			tabletBorderHoverWidth: {
				type: 'array',
				default: [ '', '', '', '' ]
			},
			mobileBorderHoverWidth: {
				type: 'array',
				default: [ '', '', '', '' ]
			},
			borderHoverRadius: {
				type: 'array',
				default: [ '', '', '', '' ]
			},
			displayHoverShadow: {
				type: 'boolean',
				default: false
			},
			shadowHover: {
				type: 'array',
				default: [ {
					color: '#000000',
					opacity: 0.2,
					spread: 0,
					blur: 14,
					hOffset: 0,
					vOffset: 0,
					inset: false,
				} ]
			},
			textColorHover: {
				type: 'string',
				default: ''
			},
			linkColorHover: {
				type: 'string',
				default: ''
			},
			linkHoverColorHover: {
				type: 'string',
				default: ''
			},
			link: {
				type: 'string',
				default: ''
			},
			linkTitle: {
				type: 'string',
				default: ''
			},
			linkTarget: {
				type: 'boolean',
				default: false
			},
			linkNoFollow: {
				type: 'boolean',
				default: false
			},
			linkSponsored: {
				type: 'boolean',
				default: false
			},
			maxWidth: {
				type: 'array',
				default: [ '', '', '' ]
			},
			maxWidthUnit: {
				type: 'string',
				default: 'px'
			},
			height: {
				type: 'array',
				default: [ '', '', '' ]
			},
			heightUnit: {
				type: 'string',
				default: 'px'
			},
			htmlTag: {
				type: 'string',
				default: 'div'
			},
			inQueryBlock: {
				type: 'boolean',
				default: false
			},
			overlayType: {
				type: 'string',
				default: 'normal'
			},
			sticky: {
				type: 'boolean',
				default: false
			},
			stickyOffset: {
				type: 'array',
				default: [ '', '', '' ]
			},
			stickyOffsetUnit: {
				type: 'string',
				default: 'px'
			},
			baseBlockCSS: {
				type: 'string',
				default: '',
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
			baseDynamic: {
				type: 'object',
			},
			baseConditional: {
				type: 'object',
			},
		},
		supports: {
			anchor: true,
			btanimate: true,
			btanimateadd: true,
			btanimatepreview: true,
			btanimateswipe: true,
			btdynamic: true,
			bbcss: true,
			editorsKitBlockNavigator: true
		},
		save: ( { attributes } ) => {
			const { id, uniqueID, vsdesk, vstablet, vsmobile, link, linkNoFollow, linkSponsored, sticky, direction, linkTarget, linkTitle, htmlTag, overlay, overlayImg, overlayHover, overlayImgHover, baseAnimation, baseAOSOptions } = attributes;
			const hasOverlay = ( overlay || ( overlayImg && overlayImg[ 0 ] && overlayImg[ 0 ].bgImg ) || overlayHover || ( overlayImgHover && overlayImgHover[ 0 ] && overlayImgHover[ 0 ].bgImg ) ? true : false );
			const classes = classnames( {
				[ `inner-column-${ id }` ]: id,
				[ `base-column${ uniqueID }` ]: uniqueID,
				'kvs-lg-false': vsdesk !== undefined && vsdesk,
				'kvs-md-false': vstablet !== undefined && vstablet,
				'kvs-sm-false': vsmobile !== undefined && vsmobile,
				'bsb-section-has-link': undefined !== link && '' !== link,
				'bsb-section-is-sticky': undefined !== sticky && sticky,
				'bsb-section-has-overlay': undefined !== hasOverlay && hasOverlay,
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
			const HtmlTagOut = ( ! htmlTag ? 'div' : htmlTag );
			return (
				<HtmlTagOut { ...useBlockProps.save( { className: classes } ) }
							data-aos={ ( baseAnimation ? baseAnimation : undefined ) }
							data-aos-offset={ ( baseAnimation && baseAOSOptions && baseAOSOptions[ 0 ] && baseAOSOptions[ 0 ].offset ? baseAOSOptions[ 0 ].offset : undefined ) }
							data-aos-duration={ ( baseAnimation && baseAOSOptions && baseAOSOptions[ 0 ] && baseAOSOptions[ 0 ].duration ? baseAOSOptions[ 0 ].duration : undefined ) }
							data-aos-delay={ ( baseAnimation && baseAOSOptions && baseAOSOptions[ 0 ] && baseAOSOptions[ 0 ].delay ? baseAOSOptions[ 0 ].delay : undefined ) }
							data-aos-easing={ ( baseAnimation && baseAOSOptions && baseAOSOptions[ 0 ] && baseAOSOptions[ 0 ].easing ? baseAOSOptions[ 0 ].easing : undefined ) }
							data-aos-once={ ( baseAnimation && baseAOSOptions && baseAOSOptions[ 0 ] && undefined !== baseAOSOptions[ 0 ].once && '' !== baseAOSOptions[ 0 ].once ? baseAOSOptions[ 0 ].once : undefined ) }
				>
					<div className={ 'bst-inside-inner-col' }>
						<InnerBlocks.Content />
					</div>
					{ link && (
						<a
							href={ link }
							className={ `bsb-section-link-overlay` }
							target={ linkTarget ? '_blank' : undefined }
							rel={ relAttr ? relAttr : undefined }
							aria-label={ linkTitle ? linkTitle : undefined }
						>
						</a>
					) }
				</HtmlTagOut>
			);
		}
	},
	{
		attributes: {
			id: {
				type: 'number',
				default: 1,
			},
			topPadding: {
				type: 'number',
				default: '',
			},
			bottomPadding: {
				type: 'number',
				default: '',
			},
			leftPadding: {
				type: 'number',
				default: '',
			},
			rightPadding: {
				type: 'number',
				default: '',
			},
			topPaddingM: {
				type: 'number',
				default: '',
			},
			bottomPaddingM: {
				type: 'number',
				default: '',
			},
			leftPaddingM: {
				type: 'number',
				default: '',
			},
			rightPaddingM: {
				type: 'number',
				default: '',
			},
			topMargin: {
				type: 'number',
				default: '',
			},
			bottomMargin: {
				type: 'number',
				default: '',
			},
			topMarginM: {
				type: 'number',
				default: '',
			},
			bottomMarginM: {
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
			leftMarginM: {
				type: 'number',
				default: '',
			},
			rightMarginM: {
				type: 'number',
				default: '',
			},
			zIndex: {
				type: 'number',
				default: '',
			},
			background: {
				type: 'string',
				default: '',
			},
			backgroundOpacity: {
				type: 'number',
				default: 1,
			},
			border: {
				type: 'string',
				default: '',
			},
			borderOpacity: {
				type: 'number',
				default: 1,
			},
			borderWidth: {
				type: 'array',
				default: [ 0, 0, 0, 0 ],
			},
			tabletBorderWidth: {
				type: 'array',
				default: [ '', '', '', '' ],
			},
			mobileBorderWidth: {
				type: 'array',
				default: [ '', '', '', '' ],
			},
			borderRadius: {
				type: 'array',
				default: [ 0, 0, 0, 0 ],
			},
			uniqueID: {
				type: 'string',
				default: '',
			},
			collapseOrder: {
				type: 'number',
			},
			backgroundImg: {
				type: 'array',
				default: [ {
					bgImg: '',
					bgImgID: '',
					bgImgSize: 'cover',
					bgImgPosition: 'center center',
					bgImgAttachment: 'scroll',
					bgImgRepeat: 'no-repeat',
				} ],
			},
			textAlign: {
				type: 'array',
				default: [ '', '', '' ],
			},
			textColor: {
				type: 'string',
				default: '',
			},
			linkColor: {
				type: 'string',
				default: '',
			},
			linkHoverColor: {
				type: 'string',
				default: '',
			},
			topPaddingT: {
				type: 'number',
				default: '',
			},
			bottomPaddingT: {
				type: 'number',
				default: '',
			},
			leftPaddingT: {
				type: 'number',
				default: '',
			},
			rightPaddingT: {
				type: 'number',
				default: '',
			},
			topMarginT: {
				type: 'number',
				default: '',
			},
			bottomMarginT: {
				type: 'number',
				default: '',
			},
			leftMarginT: {
				type: 'number',
				default: '',
			},
			rightMarginT: {
				type: 'number',
				default: '',
			},
			displayShadow: {
				type: 'bool',
				default: false,
			},
			shadow: {
				type: 'array',
				default: [ {
					color: '#000000',
					opacity: 0.2,
					spread: 0,
					blur: 14,
					hOffset: 0,
					vOffset: 0,
					inset: false,
				} ],
			},
			noCustomDefaults: {
				type: 'bool',
				default: false,
			},
			vsdesk: {
				type: 'bool',
				default: false,
			},
			vstablet: {
				type: 'bool',
				default: false,
			},
			vsmobile: {
				type: 'bool',
				default: false,
			},
			paddingType: {
				type: 'string',
				default: 'px',
			},
			marginType: {
				type: 'string',
				default: 'px',
			},
			bgColorClass: {
				type: 'string',
				default: '',
			},
			templateLock: {
				type: 'string',
			},
			direction: {
				type: 'array',
				default: [ '', '', '' ],
			},
			justifyContent: {
				type: 'array',
				default: [ '', '', '' ],
			},
			gutter: {
				type: 'array',
				default: [ '', '', '' ],
			},
			gutterUnit: {
				type: 'string',
				default: 'px',
			},
			verticalAlignment: {
				type: 'string',
			},
			backgroundImgHover: {
				type: 'array',
				default: [ {
					bgImg: '',
					bgImgID: '',
					bgImgSize: 'cover',
					bgImgPosition: 'center center',
					bgImgAttachment: 'scroll',
					bgImgRepeat: 'no-repeat',
				} ],
			},
			backgroundHover: {
				type: 'string',
				default: '',
			},
			borderHover: {
				type: 'string',
				default: '',
			},
			borderHoverWidth: {
				type: 'array',
				default: [ '', '', '', '' ],
			},
			tabletBorderHoverWidth: {
				type: 'array',
				default: [ '', '', '', '' ],
			},
			mobileBorderHoverWidth: {
				type: 'array',
				default: [ '', '', '', '' ],
			},
			borderHoverRadius: {
				type: 'array',
				default: [ '', '', '', '' ],
			},
			displayHoverShadow: {
				type: 'bool',
				default: false,
			},
			shadowHover: {
				type: 'array',
				default: [ {
					color: '#000000',
					opacity: 0.2,
					spread: 0,
					blur: 14,
					hOffset: 0,
					vOffset: 0,
					inset: false,
				} ],
			},
			textColorHover: {
				type: 'string',
				default: '',
			},
			linkColorHover: {
				type: 'string',
				default: '',
			},
			linkHoverColorHover: {
				type: 'string',
				default: '',
			},
			inQueryBlock: {
				type: 'bool',
				default: false,
			},
			baseBlockCSS: {
				type: 'string',
				default: '',
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
			baseDynamic: {
				type: 'object',
			},
			baseConditional: {
				type: 'object',
			},
		},
		supports: {
			anchor: true,
			btanimate: true,
			btanimateadd: true,
			btanimatepreview: true,
			btanimateswipe: true,
			btdynamic: true,
			bbcss: true,
			editorsKitBlockNavigator: true
		},
		save: ( { attributes } ) => {
			const { id, background, backgroundOpacity, backgroundImg, uniqueID, vsdesk, vstablet, vsmobile, bgColorClass, baseAnimation, baseAOSOptions } = attributes;
			const bgImg = ( backgroundImg && backgroundImg[ 0 ] && backgroundImg[ 0 ].bgImg ? backgroundImg[ 0 ].bgImg : '' );
			const backgroundString = ( background && '' === bgImg ? BaseColorOutput( background, backgroundOpacity ) : undefined );
			const classes = classnames( {
				[ `inner-column-${ id }` ]: id,
				[ `base-column${ uniqueID }` ]: uniqueID,
				'kvs-lg-false': vsdesk !== 'undefined' && vsdesk,
				'kvs-md-false': vstablet !== 'undefined' && vstablet,
				'kvs-sm-false': vsmobile !== 'undefined' && vsmobile,
			} );
			return (
				<div className={ classes }
					 data-aos={ ( baseAnimation ? baseAnimation : undefined ) }
					 data-aos-offset={ ( baseAnimation && baseAOSOptions && baseAOSOptions[ 0 ] && baseAOSOptions[ 0 ].offset ? baseAOSOptions[ 0 ].offset : undefined ) }
					 data-aos-duration={ ( baseAnimation && baseAOSOptions && baseAOSOptions[ 0 ] && baseAOSOptions[ 0 ].duration ? baseAOSOptions[ 0 ].duration : undefined ) }
					 data-aos-delay={ ( baseAnimation && baseAOSOptions && baseAOSOptions[ 0 ] && baseAOSOptions[ 0 ].delay ? baseAOSOptions[ 0 ].delay : undefined ) }
					 data-aos-easing={ ( baseAnimation && baseAOSOptions && baseAOSOptions[ 0 ] && baseAOSOptions[ 0 ].easing ? baseAOSOptions[ 0 ].easing : undefined ) }
					 data-aos-once={ ( baseAnimation && baseAOSOptions && baseAOSOptions[ 0 ] && undefined !== baseAOSOptions[ 0 ].once && '' !== baseAOSOptions[ 0 ].once ? baseAOSOptions[ 0 ].once : undefined ) }
				>
					<div className={ 'bst-inside-inner-col' } style={ {
						background: backgroundString,
					} } >
						<InnerBlocks.Content />
					</div>
				</div>
			);
		}
	},
	{
		attributes: {
			id: {
				type: 'number',
				default: 1,
			},
			topPadding: {
				type: 'number',
				default: '',
			},
			bottomPadding: {
				type: 'number',
				default: '',
			},
			leftPadding: {
				type: 'number',
				default: '',
			},
			rightPadding: {
				type: 'number',
				default: '',
			},
			topPaddingM: {
				type: 'number',
				default: '',
			},
			bottomPaddingM: {
				type: 'number',
				default: '',
			},
			leftPaddingM: {
				type: 'number',
				default: '',
			},
			rightPaddingM: {
				type: 'number',
				default: '',
			},
			topMargin: {
				type: 'number',
				default: '',
			},
			bottomMargin: {
				type: 'number',
				default: '',
			},
			topMarginM: {
				type: 'number',
				default: '',
			},
			bottomMarginM: {
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
			leftMarginM: {
				type: 'number',
				default: '',
			},
			rightMarginM: {
				type: 'number',
				default: '',
			},
			zIndex: {
				type: 'number',
				default: '',
			},
			background: {
				type: 'string',
				default: '',
			},
			backgroundOpacity: {
				type: 'number',
				default: 1,
			},
			border: {
				type: 'string',
				default: '',
			},
			borderOpacity: {
				type: 'number',
				default: 1,
			},
			borderWidth: {
				type: 'array',
				default: [ 0, 0, 0, 0 ],
			},
			tabletBorderWidth: {
				type: 'array',
				default: [ '', '', '', '' ],
			},
			mobileBorderWidth: {
				type: 'array',
				default: [ '', '', '', '' ],
			},
			borderRadius: {
				type: 'array',
				default: [ 0, 0, 0, 0 ],
			},
			uniqueID: {
				type: 'string',
				default: '',
			},
			collapseOrder: {
				type: 'number',
			},
			backgroundImg: {
				type: 'array',
				default: [ {
					bgImg: '',
					bgImgID: '',
					bgImgSize: 'cover',
					bgImgPosition: 'center center',
					bgImgAttachment: 'scroll',
					bgImgRepeat: 'no-repeat',
				} ],
			},
			textAlign: {
				type: 'array',
				default: [ '', '', '' ],
			},
			textColor: {
				type: 'string',
				default: '',
			},
			linkColor: {
				type: 'string',
				default: '',
			},
			linkHoverColor: {
				type: 'string',
				default: '',
			},
			topPaddingT: {
				type: 'number',
				default: '',
			},
			bottomPaddingT: {
				type: 'number',
				default: '',
			},
			leftPaddingT: {
				type: 'number',
				default: '',
			},
			rightPaddingT: {
				type: 'number',
				default: '',
			},
			topMarginT: {
				type: 'number',
				default: '',
			},
			bottomMarginT: {
				type: 'number',
				default: '',
			},
			leftMarginT: {
				type: 'number',
				default: '',
			},
			rightMarginT: {
				type: 'number',
				default: '',
			},
			displayShadow: {
				type: 'bool',
				default: false,
			},
			shadow: {
				type: 'array',
				default: [ {
					color: '#000000',
					opacity: 0.2,
					spread: 0,
					blur: 14,
					hOffset: 0,
					vOffset: 0,
					inset: false,
				} ],
			},
			noCustomDefaults: {
				type: 'bool',
				default: false,
			},
			vsdesk: {
				type: 'bool',
				default: false,
			},
			vstablet: {
				type: 'bool',
				default: false,
			},
			vsmobile: {
				type: 'bool',
				default: false,
			},
			paddingType: {
				type: 'string',
				default: 'px',
			},
			marginType: {
				type: 'string',
				default: 'px',
			},
			bgColorClass: {
				type: 'string',
				default: '',
			},
			templateLock: {
				type: 'string',
			}
		},
		supports: {
			anchor: true,
			btanimate: true,
			btanimateadd: true,
			btanimatepreview: true,
			btanimateswipe: true,
			btdynamic: true,
			bbcss: true,
			editorsKitBlockNavigator: true
		},
		save: ( { attributes } ) => {
			const { id, background, backgroundOpacity, backgroundImg, uniqueID, vsdesk, vstablet, vsmobile } = attributes;
			const bgImg = ( backgroundImg && backgroundImg[ 0 ] && backgroundImg[ 0 ].bgImg ? backgroundImg[ 0 ].bgImg : '' );
			const backgroundString = ( background && '' === bgImg ? BaseColorOutput( background, backgroundOpacity ) : undefined );
			const classes = classnames( {
				[ `inner-column-${ id }` ]: id,
				[ `base-column${ uniqueID }` ]: uniqueID,
				'kvs-lg-false': vsdesk !== 'undefined' && vsdesk,
				'kvs-md-false': vstablet !== 'undefined' && vstablet,
				'kvs-sm-false': vsmobile !== 'undefined' && vsmobile,
			} );
			return (
				<div className={ classes }>
					<div className={ 'bst-inside-inner-col' } style={ {
						background: backgroundString,
					} } >
						<InnerBlocks.Content />
					</div>
				</div>
			);
		},
	},
	{
		attributes: {
			id: {
				type: 'number',
				default: 1,
			},
			topPadding: {
				type: 'number',
				default: '',
			},
			bottomPadding: {
				type: 'number',
				default: '',
			},
			leftPadding: {
				type: 'number',
				default: '',
			},
			rightPadding: {
				type: 'number',
				default: '',
			},
			topPaddingM: {
				type: 'number',
				default: '',
			},
			bottomPaddingM: {
				type: 'number',
				default: '',
			},
			leftPaddingM: {
				type: 'number',
				default: '',
			},
			rightPaddingM: {
				type: 'number',
				default: '',
			},
			topMargin: {
				type: 'number',
				default: '',
			},
			bottomMargin: {
				type: 'number',
				default: '',
			},
			topMarginM: {
				type: 'number',
				default: '',
			},
			bottomMarginM: {
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
			leftMarginM: {
				type: 'number',
				default: '',
			},
			rightMarginM: {
				type: 'number',
				default: '',
			},
			zIndex: {
				type: 'number',
				default: '',
			},
			background: {
				type: 'string',
				default: '',
			},
			backgroundOpacity: {
				type: 'number',
				default: 1,
			},
			border: {
				type: 'string',
				default: '',
			},
			borderOpacity: {
				type: 'number',
				default: 1,
			},
			borderWidth: {
				type: 'array',
				default: [ 0, 0, 0, 0 ],
			},
			borderRadius: {
				type: 'array',
				default: [ 0, 0, 0, 0 ],
			},
			uniqueID: {
				type: 'string',
				default: '',
			},
			collapseOrder: {
				type: 'number',
			},
			backgroundImg: {
				type: 'array',
				default: [ {
					bgImg: '',
					bgImgID: '',
					bgImgSize: 'cover',
					bgImgPosition: 'center center',
					bgImgAttachment: 'scroll',
					bgImgRepeat: 'no-repeat',
				} ],
			},
			textAlign: {
				type: 'array',
				default: [ '', '', '' ],
			},
			textColor: {
				type: 'string',
				default: '',
			},
			linkColor: {
				type: 'string',
				default: '',
			},
			linkHoverColor: {
				type: 'string',
				default: '',
			},
			topPaddingT: {
				type: 'number',
				default: '',
			},
			bottomPaddingT: {
				type: 'number',
				default: '',
			},
			leftPaddingT: {
				type: 'number',
				default: '',
			},
			rightPaddingT: {
				type: 'number',
				default: '',
			},
			topMarginT: {
				type: 'number',
				default: '',
			},
			bottomMarginT: {
				type: 'number',
				default: '',
			},
			leftMarginT: {
				type: 'number',
				default: '',
			},
			rightMarginT: {
				type: 'number',
				default: '',
			},
			displayShadow: {
				type: 'bool',
				default: false,
			},
			shadow: {
				type: 'array',
				default: [ {
					color: '#000000',
					opacity: 0.2,
					spread: 0,
					blur: 14,
					hOffset: 0,
					vOffset: 0,
					inset: false,
				} ],
			},
			noCustomDefaults: {
				type: 'bool',
				default: false,
			},
			vsdesk: {
				type: 'bool',
				default: false,
			},
			vstablet: {
				type: 'bool',
				default: false,
			},
			vsmobile: {
				type: 'bool',
				default: false,
			}
		},
		supports: {
			anchor: true,
			btanimate: true,
			btanimateadd: true,
			btanimatepreview: true,
			btanimateswipe: true,
			btdynamic: true,
			bbcss: true,
			editorsKitBlockNavigator: true
		},
		save: ( { attributes } ) => {
			const { id, background, backgroundOpacity, backgroundImg, uniqueID } = attributes;
			const bgImg = ( backgroundImg && backgroundImg[ 0 ] && backgroundImg[ 0 ].bgImg ? backgroundImg[ 0 ].bgImg : '' );
			const backgroundString = ( background && '' === bgImg ? BaseColorOutput( background, backgroundOpacity ) : undefined );
			return (
				<div className={ `inner-column-${ id } base-column${ uniqueID }` }>
					<div className={ 'bst-inside-inner-col' } style={ {
						background: backgroundString,
					} } >
						<InnerBlocks.Content />
					</div>
				</div>
			);
		},
	},
	{
		attributes: {
			id: {
				type: 'number',
				default: 1,
			},
			topPadding: {
				type: 'number',
				default: '',
			},
			bottomPadding: {
				type: 'number',
				default: '',
			},
			leftPadding: {
				type: 'number',
				default: '',
			},
			rightPadding: {
				type: 'number',
				default: '',
			},
			topPaddingM: {
				type: 'number',
				default: '',
			},
			bottomPaddingM: {
				type: 'number',
				default: '',
			},
			leftPaddingM: {
				type: 'number',
				default: '',
			},
			rightPaddingM: {
				type: 'number',
				default: '',
			},
			topMargin: {
				type: 'number',
				default: '',
			},
			bottomMargin: {
				type: 'number',
				default: '',
			},
			topMarginM: {
				type: 'number',
				default: '',
			},
			bottomMarginM: {
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
			leftMarginM: {
				type: 'number',
				default: '',
			},
			rightMarginM: {
				type: 'number',
				default: '',
			},
			zIndex: {
				type: 'number',
				default: '',
			},
			background: {
				type: 'string',
				default: '',
			},
			backgroundOpacity: {
				type: 'number',
				default: 1,
			},
		},
		save: ( { attributes } ) => {
			const { id, background, backgroundOpacity } = attributes;
			const backgroundString = ( background ? hexToRGBA( background, backgroundOpacity ) : undefined );
			return (
				<div className={ `inner-column-${ id }` }>
					<div className={ 'bst-inside-inner-col' } style={ {
						background: backgroundString,
					} } >
						<InnerBlocks.Content />
					</div>
				</div>
			);
		},
	},
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
				<div className={ `inner-column-${ id }` }>
					<div className={ 'bst-inside-inner-col' } >
						<InnerBlocks.Content />
					</div>
				</div>
			);
		},
	},
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
				<div className={ `inner-column-${ id }` }>
					<InnerBlocks.Content />
				</div>
			);
		},
	},
];