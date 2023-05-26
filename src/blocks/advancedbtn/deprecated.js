/**
 * BLOCK: Base Advanced Btn
 */
/**
 * Internal libraries
 */
import { IconRender, IconSpanTag } from '@base/components';

import {
	RichText,
	useBlockProps
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal block libraries
 */
import { times } from 'lodash';
import { migrateToInnerblocks } from './utils';
import classnames from 'classnames';

 export default [
	{
		attributes: {
			hAlign: {
				type: 'string',
				default: 'center',
			},
			thAlign: {
				type: 'string',
				default: '',
			},
			mhAlign: {
				type: 'string',
				default: '',
			},
			btnCount: {
				type: 'number',
				default: 1,
			},
			uniqueID: {
				type: 'string',
				default: '',
			},
			btns: {
				type: 'array',
				default: [ {
					text: '',
					link: '',
					target: '_self',
					size: '',
					paddingBT: '',
					paddingLR: '',
					color: '#555555',
					background: '',
					border: '#555555',
					backgroundOpacity: 1,
					borderOpacity: 1,
					borderRadius: '',
					borderWidth: '',
					colorHover: '#ffffff',
					backgroundHover: '#444444',
					borderHover: '#444444',
					backgroundHoverOpacity: 1,
					borderHoverOpacity: 1,
					icon: '',
					iconSide: 'right',
					iconHover: false,
					cssClass: '',
					noFollow: false,
					gap: 5,
					responsiveSize: [ '', '' ],
					gradient: [ '#999999', 1, 0, 100, 'linear', 180, 'center center' ],
					gradientHover: [ '#777777', 1, 0, 100, 'linear', 180, 'center center' ],
					btnStyle: 'basic',
					btnSize: 'standard',
					backgroundType: 'solid',
					backgroundHoverType: 'solid',
					width: [ '', '', '' ],
					responsivePaddingBT: [ '', '' ],
					responsivePaddingLR: [ '', '' ],
					boxShadow: [ false, '#000000', 0.2, 1, 1, 2, 0, false ],
					boxShadowHover: [ false, '#000000', 0.4, 2, 2, 3, 0, false ],
					sponsored: false,
					download: false,
					tabletGap: '',
					mobileGap: '',
					inheritStyles: '',
					iconSize: [ '', '', '' ],
					iconPadding: [ '', '', '', '' ],
					iconTabletPadding: [ '', '', '', '' ],
					iconMobilePadding: [ '', '', '', '' ],
					onlyIcon: [ false, '', '' ],
					iconColor: '',
					iconColorHover: '',
					sizeType: 'px',
					iconSizeType: 'px',
					label: '',
					marginUnit: 'px',
					margin: [ '', '', '', '' ],
					tabletMargin: [ '', '', '', '' ],
					mobileMargin: [ '', '', '', '' ],
					anchor: '',
					borderStyle: '',
				} ],
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
			textTransform: {
				type: 'string',
				default: '',
			},
			widthType: {
				type: 'string',
				default: 'auto',
			},
			widthUnit: {
				type: 'string',
				default: 'px',
			},
			forceFullwidth: {
				type: 'boolean',
				default: false,
			},
			collapseFullwidth: {
				type: 'boolean',
				default: false,
			},
			margin: {
				type: 'array',
				default: [ {
					desk: [ '', '', '', '' ],
					tablet: [ '', '', '', '' ],
					mobile: [ '', '', '', '' ],
				} ],
			},
			marginUnit: {
				type: 'string',
				default: 'px',
			},
			inQueryBlock: {
				type: 'boolean',
				default: false,
			},
			lockBtnCount: {
				type: 'boolean',
				default: false
			},
			hideLink: {
				type: 'boolean',
				default: false
			}
		},
		supports: {
			btanimate: true,
			btanimateadd: true,
			btanimatepreview: true,
			btdynamic: true
		},
		save: ( { attributes } ) => {
			const { btnCount, btns, hAlign, uniqueID, letterSpacing, forceFullwidth, thAlign, mhAlign, collapseFullwidth } = attributes;
			const renderSaveBtns = ( index ) => {
				let relAttr;
				if ( '_blank' === btns[ index ].target ) {
					relAttr = 'noreferrer noopener';
				}
				if ( true === btns[ index ].noFollow ) {
					relAttr = ( relAttr ? relAttr.concat( ' nofollow' ) : 'nofollow' );
				}
				if ( undefined !== btns[ index ].sponsored && true === btns[ index ].sponsored ) {
					relAttr = ( relAttr ? relAttr.concat( ' sponsored' ) : 'sponsored' );
				}
				let btnSize;
				if ( undefined !== btns[ index ].paddingLR || undefined !== btns[ index ].paddingBT ) {
					btnSize = 'custom';
				} else {
					btnSize = 'standard';
				}
				let globalStyles;
				if ( undefined !== btns[ index ].inheritStyles && '' !== btns[ index ].inheritStyles ) {
					globalStyles = 'bsb-btn-global-' + btns[ index ].inheritStyles;
				} else {
					globalStyles = '';
				}
				let themeStyles;
				if ( undefined !== btns[ index ].inheritStyles && 'inherit' === btns[ index ].inheritStyles ) {
					themeStyles = 'wp-block-button__link';
				} else {
					themeStyles = '';
				}
				const btnClasses = classnames( {
					'bst-button': true,
					'button': true,
					[ `bst-btn-${ index }-action` ]: true,
					[ `bst-btn-size-${ ( btns[ index ].btnSize ? btns[ index ].btnSize : btnSize ) }` ]: true,
					[ `bst-btn-style-${ ( btns[ index ].btnStyle ? btns[ index ].btnStyle : 'basic' ) }` ]: true,
					[ `bst-btn-svg-show-${ ( ! btns[ index ].iconHover ? 'always' : 'hover' ) }` ]: true,
					[ `bst-btn-has-text-${ ( ! btns[ index ].text ? 'false' : 'true' ) }` ] : true,
					[ `bst-btn-has-svg-${ ( ! btns[ index ].icon ? 'false' : 'true' ) }` ]: true,
					'btblocksvideopop': 'video' === btns[ index ].target,
					[ btns[ index ].cssClass ]: btns[ index ].cssClass,
					[ globalStyles ]: globalStyles,
					[ themeStyles ]: themeStyles,
					[ `bsb-btn-only-icon` ]: ( btns[ index ].icon && btns[ index ].onlyIcon && btns[ index ].onlyIcon[0] ),
					[ `bsb-btn-tablet-only-icon` ]:( btns[ index ].icon && btns[ index ].onlyIcon && btns[ index ].onlyIcon[1] ),
					[ `bsb-btn-mobile-only-icon` ]: ( btns[ index ].icon && btns[ index ].onlyIcon && btns[ index ].onlyIcon[2] ),
				} );
				return (
					<div className={ `bst-btn-wrap bst-btn-wrap-${ index }` }>
						<a id={ btns[ index ].anchor ? btns[ index ].anchor : undefined } className={ btnClasses } aria-label={ btns[ index ].label ? btns[ index ].label : undefined } download={ ( undefined !== btns[ index ].download && true === btns[ index ].download ? '' : undefined ) } href={ ( ! btns[ index ].link ? '#' : btns[ index ].link ) } target={ ( '_blank' === btns[ index ].target ? btns[ index ].target : undefined ) } rel={ relAttr } style={ {
							borderRadius: ( undefined !== btns[ index ].borderRadius && '' !== btns[ index ].borderRadius ? btns[ index ].borderRadius + 'px' : undefined ),
							borderWidth: ( undefined !== btns[ index ].borderWidth && '' !== btns[ index ].borderWidth ? btns[ index ].borderWidth + 'px' : undefined ),
							letterSpacing: ( undefined !== letterSpacing && '' !== letterSpacing ? letterSpacing + 'px' : undefined ),
						} } >
							{ btns[ index ].icon && 'left' === btns[ index ].iconSide && (
								<IconSpanTag extraClass={ `bst-btn-side-${ btns[ index ].iconSide }` } name={ btns[ index ].icon }/>
							) }
							<RichText.Content
								tagName={ 'span' }
								className="bst-btn-inner-text"
								value={ btns[ index ].text }
							/>
							{ btns[ index ].icon && 'left' !== btns[ index ].iconSide && (
								<IconSpanTag extraClass={ `bst-btn-side-${ btns[ index ].iconSide }` } name={ btns[ index ].icon }/>
							) }
						</a>
					</div>
				);
			};

			const blockProps = useBlockProps.save( {
				className: `bst-btn-align-${ hAlign } bst-btn-tablet-align-${ ( thAlign ? thAlign : 'inherit' ) } bst-btn-mobile-align-${ ( mhAlign ? mhAlign : 'inherit' ) } bst-btns-wrap bst-btns${ uniqueID }${ ( forceFullwidth ? ' bst-force-btn-fullwidth' : '' ) }${ ( collapseFullwidth ? ' bst-mobile-collapse-btn-fullwidth' : '' ) }`,
			} );

			return (
				<div {...blockProps}>
					{ times( btnCount, n => renderSaveBtns( n ) ) }
				</div>
			);
		},
		migrate: migrateToInnerblocks,
	},
	{
		attributes: {
			hAlign: {
				type: 'string',
				default: 'center',
			},
			thAlign: {
				type: 'string',
				default: '',
			},
			mhAlign: {
				type: 'string',
				default: '',
			},
			btnCount: {
				type: 'number',
				default: 1,
			},
			uniqueID: {
				type: 'string',
				default: '',
			},
			btns: {
				type: 'array',
				default: [ {
					text: '',
					link: '',
					target: '_self',
					size: '',
					paddingBT: '',
					paddingLR: '',
					color: '#555555',
					background: '',
					border: '#555555',
					backgroundOpacity: 1,
					borderOpacity: 1,
					borderRadius: '',
					borderWidth: '',
					colorHover: '#ffffff',
					backgroundHover: '#444444',
					borderHover: '#444444',
					backgroundHoverOpacity: 1,
					borderHoverOpacity: 1,
					icon: '',
					iconSide: 'right',
					iconHover: false,
					cssClass: '',
					noFollow: false,
					gap: 5,
					responsiveSize: [ '', '' ],
					gradient: [ '#999999', 1, 0, 100, 'linear', 180, 'center center' ],
					gradientHover: [ '#777777', 1, 0, 100, 'linear', 180, 'center center' ],
					btnStyle: 'basic',
					btnSize: 'standard',
					backgroundType: 'solid',
					backgroundHoverType: 'solid',
					width: [ '', '', '' ],
					responsivePaddingBT: [ '', '' ],
					responsivePaddingLR: [ '', '' ],
					boxShadow: [ false, '#000000', 0.2, 1, 1, 2, 0, false ],
					boxShadowHover: [ false, '#000000', 0.4, 2, 2, 3, 0, false ],
					sponsored: false,
					download: false,
					tabletGap: '',
					mobileGap: '',
					inheritStyles: '',
					iconSize: [ '', '', '' ],
					iconPadding: [ '', '', '', '' ],
					iconTabletPadding: [ '', '', '', '' ],
					iconMobilePadding: [ '', '', '', '' ],
					onlyIcon: [ false, '', '' ],
					iconColor: '',
					iconColorHover: '',
					sizeType: 'px',
					iconSizeType: 'px',
					label: '',
					marginUnit: 'px',
					margin: [ '', '', '', '' ],
					tabletMargin: [ '', '', '', '' ],
					mobileMargin: [ '', '', '', '' ],
					anchor: '',
					borderStyle: '',
				} ],
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
			textTransform: {
				type: 'string',
				default: '',
			},
			widthType: {
				type: 'string',
				default: 'auto',
			},
			widthUnit: {
				type: 'string',
				default: 'px',
			},
			forceFullwidth: {
				type: 'boolean',
				default: false,
			},
			collapseFullwidth: {
				type: 'boolean',
				default: false,
			},
			margin: {
				type: 'array',
				default: [ {
					desk: [ '', '', '', '' ],
					tablet: [ '', '', '', '' ],
					mobile: [ '', '', '', '' ],
				} ],
			},
			marginUnit: {
				type: 'string',
				default: 'px',
			},
			inQueryBlock: {
				type: 'boolean',
				default: false,
			},
			lockBtnCount: {
				type: 'boolean',
				default: false
			},
			hideLink: {
				type: 'boolean',
				default: false
			}
		},
		supports: {
			btanimate: true,
			btanimateadd: true,
			btanimatepreview: true,
			btdynamic: true
		},
		save: ( { attributes } ) => {
			const { btnCount, btns, hAlign, uniqueID, letterSpacing, forceFullwidth, thAlign, mhAlign, collapseFullwidth } = attributes;
			const renderSaveBtns = ( index ) => {
				let relAttr;
				if ( '_blank' === btns[ index ].target ) {
					relAttr = 'noreferrer noopener';
				}
				if ( true === btns[ index ].noFollow ) {
					relAttr = ( relAttr ? relAttr.concat( ' nofollow' ) : 'nofollow' );
				}
				if ( undefined !== btns[ index ].sponsored && true === btns[ index ].sponsored ) {
					relAttr = ( relAttr ? relAttr.concat( ' sponsored' ) : 'sponsored' );
				}
				let btnSize;
				if ( undefined !== btns[ index ].paddingLR || undefined !== btns[ index ].paddingBT ) {
					btnSize = 'custom';
				} else {
					btnSize = 'standard';
				}
				let globalStyles;
				if ( undefined !== btns[ index ].inheritStyles && '' !== btns[ index ].inheritStyles ) {
					globalStyles = 'bsb-btn-global-' + btns[ index ].inheritStyles;
				} else {
					globalStyles = '';
				}
				let themeStyles;
				if ( undefined !== btns[ index ].inheritStyles && 'inherit' === btns[ index ].inheritStyles ) {
					themeStyles = 'wp-block-button__link';
				} else {
					themeStyles = '';
				}
				const btnClasses = classnames( {
					'bst-button': true,
					'button': true,
					[ `bst-btn-${ index }-action` ]: true,
					[ `bst-btn-size-${ ( btns[ index ].btnSize ? btns[ index ].btnSize : btnSize ) }` ]: true,
					[ `bst-btn-style-${ ( btns[ index ].btnStyle ? btns[ index ].btnStyle : 'basic' ) }` ]: true,
					[ `bst-btn-svg-show-${ ( ! btns[ index ].iconHover ? 'always' : 'hover' ) }` ]: true,
					[ `bst-btn-has-text-${ ( ! btns[ index ].text ? 'false' : 'true' ) }` ] : true,
					[ `bst-btn-has-svg-${ ( ! btns[ index ].icon ? 'false' : 'true' ) }` ]: true,
					'btblocksvideopop': 'video' === btns[ index ].target,
					[ btns[ index ].cssClass ]: btns[ index ].cssClass,
					[ globalStyles ]: globalStyles,
					[ themeStyles ]: themeStyles,
					[ `bsb-btn-only-icon` ]: ( btns[ index ].icon && btns[ index ].onlyIcon && btns[ index ].onlyIcon[0] ),
					[ `bsb-btn-tablet-only-icon` ]:( btns[ index ].icon && btns[ index ].onlyIcon && btns[ index ].onlyIcon[1] ),
					[ `bsb-btn-mobile-only-icon` ]: ( btns[ index ].icon && btns[ index ].onlyIcon && btns[ index ].onlyIcon[2] ),
				} );
				return (
					<div className={ `bst-btn-wrap bst-btn-wrap-${ index }` }>
						<a id={ btns[ index ].anchor ? btns[ index ].anchor : undefined } className={ btnClasses } aria-label={ btns[ index ].label ? btns[ index ].label : undefined } download={ ( undefined !== btns[ index ].download && true === btns[ index ].download ? '' : undefined ) } href={ ( ! btns[ index ].link ? '#' : btns[ index ].link ) } target={ ( '_blank' === btns[ index ].target ? btns[ index ].target : undefined ) } rel={ relAttr } style={ {
							borderRadius: ( undefined !== btns[ index ].borderRadius && '' !== btns[ index ].borderRadius ? btns[ index ].borderRadius + 'px' : undefined ),
							borderWidth: ( undefined !== btns[ index ].borderWidth && '' !== btns[ index ].borderWidth ? btns[ index ].borderWidth + 'px' : undefined ),
							letterSpacing: ( undefined !== letterSpacing && '' !== letterSpacing ? letterSpacing + 'px' : undefined ),
						} } >
							{ btns[ index ].icon && 'left' === btns[ index ].iconSide && (
								<IconRender className={ `bst-btn-svg-icon bst-btn-svg-icon-${ btns[ index ].icon } bst-btn-side-${ btns[ index ].iconSide }` } name={ btns[ index ].icon } size={ '1em' } />
							) }
							<RichText.Content
								tagName={ 'span' }
								className="bst-btn-inner-text"
								value={ btns[ index ].text }
							/>
							{ btns[ index ].icon && 'left' !== btns[ index ].iconSide && (
								<IconRender className={ `bst-btn-svg-icon bst-btn-svg-icon-${ btns[ index ].icon } bst-btn-side-${ btns[ index ].iconSide }` } name={ btns[ index ].icon } size={ '1em' } />
							) }
						</a>
					</div>
				);
			};
			return (
				<div className={ `bst-btn-align-${ hAlign } bst-btn-tablet-align-${ ( thAlign ? thAlign : 'inherit' ) } bst-btn-mobile-align-${ ( mhAlign ? mhAlign : 'inherit' ) } bst-btns-wrap bst-btns${ uniqueID }${ ( forceFullwidth ? ' bst-force-btn-fullwidth' : '' ) }${ ( collapseFullwidth ? ' bst-mobile-collapse-btn-fullwidth' : '' ) }` }>
					{ times( btnCount, n => renderSaveBtns( n ) ) }
				</div>
			);
		},
		migrate: migrateToInnerblocks,
	},
	{
		attributes: {
			hAlign: {
				type: 'string',
				default: 'center',
			},
			thAlign: {
				type: 'string',
				default: '',
			},
			mhAlign: {
				type: 'string',
				default: '',
			},
			btnCount: {
				type: 'number',
				default: 1,
			},
			uniqueID: {
				type: 'string',
				default: '',
			},
			btns: {
				type: 'array',
				default: [ {
					text: '',
					link: '',
					target: '_self',
					size: '',
					paddingBT: '',
					paddingLR: '',
					color: '#555555',
					background: '',
					border: '#555555',
					backgroundOpacity: 1,
					borderOpacity: 1,
					borderRadius: '',
					borderWidth: '',
					colorHover: '#ffffff',
					backgroundHover: '#444444',
					borderHover: '#444444',
					backgroundHoverOpacity: 1,
					borderHoverOpacity: 1,
					icon: '',
					iconSide: 'right',
					iconHover: false,
					cssClass: '',
					noFollow: false,
					gap: 5,
					responsiveSize: [ '', '' ],
					gradient: [ '#999999', 1, 0, 100, 'linear', 180, 'center center' ],
					gradientHover: [ '#777777', 1, 0, 100, 'linear', 180, 'center center' ],
					btnStyle: 'basic',
					btnSize: 'standard',
					backgroundType: 'solid',
					backgroundHoverType: 'solid',
					width: [ '', '', '' ],
					responsivePaddingBT: [ '', '' ],
					responsivePaddingLR: [ '', '' ],
					boxShadow: [ false, '#000000', 0.2, 1, 1, 2, 0, false ],
					boxShadowHover: [ false, '#000000', 0.4, 2, 2, 3, 0, false ],
					sponsored: false,
					download: false,
					tabletGap: '',
					mobileGap: '',
					inheritStyles: '',
					iconSize: [ '', '', '' ],
					iconPadding: [ '', '', '', '' ],
					iconTabletPadding: [ '', '', '', '' ],
					iconMobilePadding: [ '', '', '', '' ],
					onlyIcon: [ false, '', '' ],
					iconColor: '',
					iconColorHover: '',
					sizeType: 'px',
				} ],
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
			textTransform: {
				type: 'string',
				default: '',
			},
			widthType: {
				type: 'string',
				default: 'auto',
			},
			widthUnit: {
				type: 'string',
				default: 'px',
			},
			forceFullwidth: {
				type: 'boolean',
				default: false,
			},
			collapseFullwidth: {
				type: 'boolean',
				default: false,
			},
			margin: {
				type: 'array',
				default: [ {
					desk: [ '', '', '', '' ],
					tablet: [ '', '', '', '' ],
					mobile: [ '', '', '', '' ],
				} ],
			},
			marginUnit: {
				type: 'string',
				default: 'px',
			},
		},
		supports: {
			btanimate: true,
			btanimateadd: true,
			btanimatepreview: true,
			btdynamic: true
		},
		save: ( { attributes } ) => {
			const { btnCount, btns, hAlign, uniqueID, letterSpacing, forceFullwidth, thAlign, mhAlign, collapseFullwidth } = attributes;
			const renderSaveBtns = ( index ) => {
				let relAttr;
				if ( '_blank' === btns[ index ].target ) {
					relAttr = 'noreferrer noopener';
				}
				if ( true === btns[ index ].noFollow ) {
					relAttr = ( relAttr ? relAttr.concat( ' nofollow' ) : 'nofollow' );
				}
				if ( undefined !== btns[ index ].sponsored && true === btns[ index ].sponsored ) {
					relAttr = ( relAttr ? relAttr.concat( ' sponsored' ) : 'sponsored' );
				}
				let btnSize;
				if ( undefined !== btns[ index ].paddingLR || undefined !== btns[ index ].paddingBT ) {
					btnSize = 'custom';
				} else {
					btnSize = 'standard';
				}
				let globalStyles;
				if ( undefined !== btns[ index ].inheritStyles && '' !== btns[ index ].inheritStyles ) {
					globalStyles = 'bsb-btn-global-' + btns[ index ].inheritStyles;
				} else {
					globalStyles = '';
				}
				let themeStyles;
				if ( undefined !== btns[ index ].inheritStyles && 'inherit' === btns[ index ].inheritStyles ) {
					themeStyles = 'wp-block-button__link';
				} else {
					themeStyles = '';
				}
				const btnClasses = classnames( {
					'bst-button': true,
					'button': true,
					[ `bst-btn-${ index }-action` ]: true,
					[ `bst-btn-size-${ ( btns[ index ].btnSize ? btns[ index ].btnSize : btnSize ) }` ]: true,
					[ `bst-btn-style-${ ( btns[ index ].btnStyle ? btns[ index ].btnStyle : 'basic' ) }` ]: true,
					[ `bst-btn-svg-show-${ ( ! btns[ index ].iconHover ? 'always' : 'hover' ) }` ]: true,
					[ `bst-btn-has-text-${ ( ! btns[ index ].text ? 'false' : 'true' ) }` ] : true,
					[ `bst-btn-has-svg-${ ( ! btns[ index ].icon ? 'false' : 'true' ) }` ]: true,
					'btblocksvideopop': 'video' === btns[ index ].target,
					[ btns[ index ].cssClass ]: btns[ index ].cssClass,
					[ globalStyles ]: globalStyles,
					[ themeStyles ]: themeStyles,
					[ `bsb-btn-only-icon` ]: ( btns[ index ].icon && btns[ index ].onlyIcon && btns[ index ].onlyIcon[0] ),
					[ `bsb-btn-tablet-only-icon` ]:( btns[ index ].icon && btns[ index ].onlyIcon && btns[ index ].onlyIcon[1] ),
					[ `bsb-btn-mobile-only-icon` ]: ( btns[ index ].icon && btns[ index ].onlyIcon && btns[ index ].onlyIcon[2] ),
				} );
				return (
					<div className={ `bst-btn-wrap bst-btn-wrap-${ index }` }>
						<a className={ btnClasses } download={ ( undefined !== btns[ index ].download && true === btns[ index ].download ? '' : undefined ) } href={ ( ! btns[ index ].link ? '#' : btns[ index ].link ) } target={ ( '_blank' === btns[ index ].target ? btns[ index ].target : undefined ) } rel={ relAttr } style={ {
							borderRadius: ( undefined !== btns[ index ].borderRadius && '' !== btns[ index ].borderRadius ? btns[ index ].borderRadius + 'px' : undefined ),
							borderWidth: ( undefined !== btns[ index ].borderWidth && '' !== btns[ index ].borderWidth ? btns[ index ].borderWidth + 'px' : undefined ),
							letterSpacing: ( undefined !== letterSpacing && '' !== letterSpacing ? letterSpacing + 'px' : undefined ),
						} } >
							{ btns[ index ].icon && 'left' === btns[ index ].iconSide && (
								<IconRender className={ `bst-btn-svg-icon bst-btn-svg-icon-${ btns[ index ].icon } bst-btn-side-${ btns[ index ].iconSide }` } name={ btns[ index ].icon } size={ ( ! btns[ index ].size ? '14' : btns[ index ].size ) } />
							) }
							<RichText.Content
								tagName={ 'span' }
								className="bst-btn-inner-text"
								value={ btns[ index ].text }
							/>
							{ btns[ index ].icon && 'left' !== btns[ index ].iconSide && (
								<IconRender className={ `bst-btn-svg-icon bst-btn-svg-icon-${ btns[ index ].icon } bst-btn-side-${ btns[ index ].iconSide }` } name={ btns[ index ].icon } size={ ( ! btns[ index ].size ? '14' : btns[ index ].size ) } />
							) }
						</a>
					</div>
				);
			};
			return (
				<div className={ `bst-btn-align-${ hAlign } bst-btn-tablet-align-${ ( thAlign ? thAlign : 'inherit' ) } bst-btn-mobile-align-${ ( mhAlign ? mhAlign : 'inherit' ) } bst-btns-wrap bst-btns${ uniqueID }${ ( forceFullwidth ? ' bst-force-btn-fullwidth' : '' ) }${ ( collapseFullwidth ? ' bst-mobile-collapse-btn-fullwidth' : '' ) }` }>
					{ times( btnCount, n => renderSaveBtns( n ) ) }
				</div>
			);
		},
		migrate: migrateToInnerblocks,
	},
	{
		attributes: {
			hAlign: {
				type: 'string',
				default: 'center',
			},
			thAlign: {
				type: 'string',
				default: '',
			},
			mhAlign: {
				type: 'string',
				default: '',
			},
			btnCount: {
				type: 'number',
				default: 1,
			},
			uniqueID: {
				type: 'string',
				default: '',
			},
			btns: {
				type: 'array',
				default: [ {
					text: '',
					link: '',
					target: '_self',
					size: '',
					paddingBT: '',
					paddingLR: '',
					color: '#555555',
					background: '',
					border: '#555555',
					backgroundOpacity: 1,
					borderOpacity: 1,
					borderRadius: '',
					borderWidth: '',
					colorHover: '#ffffff',
					backgroundHover: '#444444',
					borderHover: '#444444',
					backgroundHoverOpacity: 1,
					borderHoverOpacity: 1,
					icon: '',
					iconSide: 'right',
					iconHover: false,
					cssClass: '',
					noFollow: false,
					gap: 5,
					responsiveSize: [ '', '' ],
					gradient: [ '#999999', 1, 0, 100, 'linear', 180, 'center center' ],
					gradientHover: [ '#777777', 1, 0, 100, 'linear', 180, 'center center' ],
					btnStyle: 'basic',
					btnSize: 'standard',
					backgroundType: 'solid',
					backgroundHoverType: 'solid',
					width: [ '', '', '' ],
					responsivePaddingBT: [ '', '' ],
					responsivePaddingLR: [ '', '' ],
					boxShadow: [ false, '#000000', 0.2, 1, 1, 2, 0, false ],
					boxShadowHover: [ false, '#000000', 0.4, 2, 2, 3, 0, false ],
				} ],
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
			widthType: {
				type: 'string',
				default: 'auto',
			},
			widthUnit: {
				type: 'string',
				default: 'px',
			},
			forceFullwidth: {
				type: 'boolean',
				default: false,
			},
		},
		supports: {
			btanimate: true,
			btanimateadd: true,
			btanimatepreview: true,
			btdynamic: true
		},
		save: ( { attributes } ) => {
			const { btnCount, btns, hAlign, uniqueID, letterSpacing, forceFullwidth, thAlign, mhAlign } = attributes;
			const renderSaveBtns = ( index ) => {
				let relAttr;
				if ( '_blank' === btns[ index ].target && true === btns[ index ].noFollow ) {
					relAttr = 'noreferrer noopener nofollow';
				} else if ( '_blank' === btns[ index ].target ) {
					relAttr = 'noreferrer noopener';
				} else if ( true === btns[ index ].noFollow ) {
					relAttr = 'nofollow';
				} else {
					relAttr = undefined;
				}
				let btnSize;
				if ( undefined !== btns[ index ].paddingLR || undefined !== btns[ index ].paddingBT ) {
					btnSize = 'custom';
				} else {
					btnSize = 'standard';
				}
				return (
					<div className={ `bst-btn-wrap bst-btn-wrap-${ index }` }>
						<a className={ `bst-button bst-btn-${ index }-action bst-btn-size-${ ( btns[ index ].btnSize ? btns[ index ].btnSize : btnSize ) } bst-btn-style-${ ( btns[ index ].btnStyle ? btns[ index ].btnStyle : 'basic' ) } bst-btn-svg-show-${ ( ! btns[ index ].iconHover ? 'always' : 'hover' ) } bst-btn-has-text-${ ( ! btns[ index ].text ? 'false' : 'true' ) } bst-btn-has-svg-${ ( ! btns[ index ].icon ? 'false' : 'true' ) }${ ( 'video' === btns[ index ].target ? ' btblocksvideopop' : '' ) }${ ( btns[ index ].cssClass ? ' ' + btns[ index ].cssClass : '' ) }` } href={ ( ! btns[ index ].link ? '#' : btns[ index ].link ) } target={ ( '_blank' === btns[ index ].target ? btns[ index ].target : undefined ) } rel={ relAttr } style={ {
							borderRadius: ( undefined !== btns[ index ].borderRadius && '' !== btns[ index ].borderRadius ? btns[ index ].borderRadius + 'px' : undefined ),
							borderWidth: ( undefined !== btns[ index ].borderWidth && '' !== btns[ index ].borderWidth ? btns[ index ].borderWidth + 'px' : undefined ),
							letterSpacing: ( undefined !== letterSpacing && '' !== letterSpacing ? letterSpacing + 'px' : undefined ),
						} } >
							{ btns[ index ].icon && 'left' === btns[ index ].iconSide && (
								<IconRender className={ `bst-btn-svg-icon bst-btn-svg-icon-${ btns[ index ].icon } bst-btn-side-${ btns[ index ].iconSide }` } name={ btns[ index ].icon } size={ ( ! btns[ index ].size ? '14' : btns[ index ].size ) } />
							) }
							<RichText.Content
								tagName={ 'span' }
								className="bst-btn-inner-text"
								value={ btns[ index ].text }
							/>
							{ btns[ index ].icon && 'left' !== btns[ index ].iconSide && (
								<IconRender className={ `bst-btn-svg-icon bst-btn-svg-icon-${ btns[ index ].icon } bst-btn-side-${ btns[ index ].iconSide }` } name={ btns[ index ].icon } size={ ( ! btns[ index ].size ? '14' : btns[ index ].size ) } />
							) }
						</a>
					</div>
				);
			};
			return (
				<div className={ `bst-btn-align-${ hAlign } bst-btn-tablet-align-${ ( thAlign ? thAlign : 'inherit' ) } bst-btn-mobile-align-${ ( mhAlign ? mhAlign : 'inherit' ) } bst-btns-wrap bst-btns${ uniqueID }${ ( forceFullwidth ? ' bst-force-btn-fullwidth' : '' ) }` }>
					{ times( btnCount, n => renderSaveBtns( n ) ) }
				</div>
			);
		},
		migrate: migrateToInnerblocks,
	},
	{
		attributes: {
			hAlign: {
				type: 'string',
				default: 'center',
			},
			btnCount: {
				type: 'number',
				default: 1,
			},
			uniqueID: {
				type: 'string',
				default: '',
			},
			btns: {
				type: 'array',
				default: [ {
					text: '',
					link: '',
					target: '_self',
					size: 18,
					paddingBT: '',
					paddingLR: '',
					color: '#555555',
					background: 'transparent',
					border: '#555555',
					backgroundOpacity: 1,
					borderOpacity: 1,
					borderRadius: 3,
					borderWidth: 2,
					colorHover: '#ffffff',
					backgroundHover: '#444444',
					borderHover: '#444444',
					backgroundHoverOpacity: 1,
					borderHoverOpacity: 1,
					icon: '',
					iconSide: 'right',
					iconHover: false,
					cssClass: '',
					noFollow: false,
					gap: 5,
				} ],
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
			forceFullwidth: {
				type: 'boolean',
				default: false,
			},
		},
		supports: {
			btanimate: true,
			btanimateadd: true,
			btanimatepreview: true,
			btdynamic: true
		},
		save: ( { attributes } ) => {
			const { btnCount, btns, hAlign, uniqueID, letterSpacing, forceFullwidth } = attributes;
			const renderSaveBtns = ( index ) => {
				let relAttr;
				if ( '_blank' === btns[ index ].target && true === btns[ index ].noFollow ) {
					relAttr = 'noreferrer noopener nofollow';
				} else if ( '_blank' === btns[ index ].target ) {
					relAttr = 'noreferrer noopener';
				} else if ( true === btns[ index ].noFollow ) {
					relAttr = 'nofollow';
				} else {
					relAttr = undefined;
				}
				return (
					<div className={ `bst-btn-wrap bst-btn-wrap-${ index }` }>
						<a className={ `bst-button bst-btn-${ index }-action bst-btn-svg-show-${ ( ! btns[ index ].iconHover ? 'always' : 'hover' ) } bst-btn-has-text-${ ( ! btns[ index ].text ? 'false' : 'true' ) } bst-btn-has-svg-${ ( ! btns[ index ].icon ? 'false' : 'true' ) }${ ( 'video' === btns[ index ].target ? ' btblocksvideopop' : '' ) }${ ( btns[ index ].cssClass ? ' ' + btns[ index ].cssClass : '' ) }` } href={ ( ! btns[ index ].link ? '#' : btns[ index ].link ) } target={ ( '_blank' === btns[ index ].target ? btns[ index ].target : undefined ) } rel={ relAttr } style={ {
							fontSize: ( btns[ index ].size ? btns[ index ].size + 'px' : undefined ),
							borderRadius: ( btns[ index ].borderRadius ? btns[ index ].borderRadius + 'px' : undefined ),
							borderWidth: btns[ index ].borderWidth + 'px',
							paddingLeft: ( btns[ index ].paddingLR ? btns[ index ].paddingLR + 'px' : undefined ),
							paddingRight: ( btns[ index ].paddingLR ? btns[ index ].paddingLR + 'px' : undefined ),
							paddingTop: ( btns[ index ].paddingBT ? btns[ index ].paddingBT + 'px' : undefined ),
							paddingBottom: ( btns[ index ].paddingBT ? btns[ index ].paddingBT + 'px' : undefined ),
							letterSpacing: ( letterSpacing ? letterSpacing + 'px' : undefined ),
						} } >
							{ btns[ index ].icon && 'left' === btns[ index ].iconSide && (
								<IconRender className={ `bst-btn-svg-icon bst-btn-svg-icon-${ btns[ index ].icon } bst-btn-side-${ btns[ index ].iconSide }` } name={ btns[ index ].icon } size={ ( ! btns[ index ].size ? '14' : btns[ index ].size ) } />
							) }
							<span className="bst-btn-inner-text">
								{ btns[ index ].text }
							</span>
							{ btns[ index ].icon && 'left' !== btns[ index ].iconSide && (
								<IconRender className={ `bst-btn-svg-icon bst-btn-svg-icon-${ btns[ index ].icon } bst-btn-side-${ btns[ index ].iconSide }` } name={ btns[ index ].icon } size={ ( ! btns[ index ].size ? '14' : btns[ index ].size ) } />
							) }
						</a>
					</div>
				);
			};
			return (
				<div className={ `bst-btn-align-${ hAlign } bst-btns-wrap bst-btns${ uniqueID }${ ( forceFullwidth ? ' bst-force-btn-fullwidth' : '' ) }` }>
					{ times( btnCount, n => renderSaveBtns( n ) ) }
				</div>
			);
		},
		migrate: migrateToInnerblocks,
	},
	{
		attributes: {
			hAlign: {
				type: 'string',
				default: 'center',
			},
			btnCount: {
				type: 'number',
				default: 1,
			},
			uniqueID: {
				type: 'string',
				default: '',
			},
			btns: {
				type: 'array',
				default: [ {
					text: '',
					link: '',
					target: '_self',
					size: 18,
					paddingBT: '',
					paddingLR: '',
					color: '#555555',
					background: 'transparent',
					border: '#555555',
					borderRadius: 3,
					borderWidth: 2,
					colorHover: '#ffffff',
					backgroundHover: '#444444',
					borderHover: '#444444',
					icon: '',
					iconSide: 'right',
					iconHover: false,
					cssClass: '',
				} ],
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
		supports: {
			btanimate: true,
			btanimateadd: true,
			btanimatepreview: true,
			btdynamic: true
		},
		save: ( { attributes } ) => {
			const { btnCount, btns, hAlign, uniqueID, letterSpacing } = attributes;
			const renderSaveBtns = ( index ) => {
				return (
					<div className={ `bst-btn-wrap bst-btn-wrap-${ index }` }>
						<a className={ `bst-button bst-btn-${ index }-action bst-btn-svg-show-${ ( ! btns[ index ].iconHover ? 'always' : 'hover' ) } bst-btn-has-text-${ ( ! btns[ index ].text ? 'false' : 'true' ) } bst-btn-has-svg-${ ( ! btns[ index ].icon ? 'false' : 'true' ) }${ ( btns[ index ].cssClass ? ' ' + btns[ index ].cssClass : '' ) }` } href={ ( ! btns[ index ].link ? '#' : btns[ index ].link ) } target={ btns[ index ].target } rel={ btns[ index ].target ? 'noopener noreferrer' : undefined } style={ {
							fontSize: ( btns[ index ].size ? btns[ index ].size + 'px' : undefined ),
							borderRadius: ( btns[ index ].borderRadius ? btns[ index ].borderRadius + 'px' : undefined ),
							borderWidth: btns[ index ].borderWidth + 'px',
							paddingLeft: ( btns[ index ].paddingLR ? btns[ index ].paddingLR + 'px' : undefined ),
							paddingRight: ( btns[ index ].paddingLR ? btns[ index ].paddingLR + 'px' : undefined ),
							paddingTop: ( btns[ index ].paddingBT ? btns[ index ].paddingBT + 'px' : undefined ),
							paddingBottom: ( btns[ index ].paddingBT ? btns[ index ].paddingBT + 'px' : undefined ),
							letterSpacing: ( letterSpacing ? letterSpacing + 'px' : undefined ),
						} } >
							{ btns[ index ].icon && 'left' === btns[ index ].iconSide && (
								<IconRender className={ `bst-btn-svg-icon bst-btn-svg-icon-${ btns[ index ].icon } bst-btn-side-${ btns[ index ].iconSide }` } name={ btns[ index ].icon } size={ ( ! btns[ index ].size ? '14' : btns[ index ].size ) } />
							) }
							<span className="bst-btn-inner-text">
								{ btns[ index ].text }
							</span>
							{ btns[ index ].icon && 'left' !== btns[ index ].iconSide && (
								<IconRender className={ `bst-btn-svg-icon bst-btn-svg-icon-${ btns[ index ].icon } bst-btn-side-${ btns[ index ].iconSide }` } name={ btns[ index ].icon } size={ ( ! btns[ index ].size ? '14' : btns[ index ].size ) } />
							) }
						</a>
					</div>
				);
			};
			return (
				<div className={ `bst-btn-align-${ hAlign } bst-btns-wrap bst-btns${ uniqueID }` }>
					{ times( btnCount, n => renderSaveBtns( n ) ) }
				</div>
			);
		},
		migrate: migrateToInnerblocks,
	},
	{
		attributes: {
			hAlign: {
				type: 'string',
				default: 'center',
			},
			btnCount: {
				type: 'number',
				default: 1,
			},
			uniqueID: {
				type: 'string',
				default: '',
			},
			btns: {
				type: 'array',
				default: [ {
					text: '',
					link: '',
					target: '_self',
					size: 18,
					paddingBT: '',
					paddingLR: '',
					color: '#555555',
					background: 'transparent',
					border: '#555555',
					borderRadius: 3,
					borderWidth: 2,
					colorHover: '#ffffff',
					backgroundHover: '#444444',
					borderHover: '#444444',
					icon: '',
					iconSide: 'right',
					iconHover: false,
					cssClass: '',
				} ],
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
		supports: {
			btanimate: true,
			btanimateadd: true,
			btanimatepreview: true,
			btdynamic: true
		},
		save: ( { attributes } ) => {
			const { btnCount, btns, hAlign, uniqueID, letterSpacing } = attributes;
			const renderSaveBtns = ( index ) => {
				return (
					<div className={ `bst-btn-wrap bst-btn-wrap-${ index }` }>
						<a className={ `bst-button bst-btn-${ index }-action bst-btn-svg-show-${ ( ! btns[ index ].iconHover ? 'always' : 'hover' ) } bst-btn-has-text-${ ( ! btns[ index ].text ? 'false' : 'true' ) } bst-btn-has-svg-${ ( ! btns[ index ].icon ? 'false' : 'true' ) }${ ( btns[ index ].cssClass ? ' ' + btns[ index ].cssClass : '' ) }` } href={ ( ! btns[ index ].link ? '#' : btns[ index ].link ) } target={ btns[ index ].target } rel={ '_blank' === btns[ index ].target ? 'noreferrer noopener' : undefined } style={ {
							fontSize: ( btns[ index ].size ? btns[ index ].size + 'px' : undefined ),
							borderRadius: ( btns[ index ].borderRadius ? btns[ index ].borderRadius + 'px' : undefined ),
							borderWidth: btns[ index ].borderWidth + 'px',
							paddingLeft: ( btns[ index ].paddingLR ? btns[ index ].paddingLR + 'px' : undefined ),
							paddingRight: ( btns[ index ].paddingLR ? btns[ index ].paddingLR + 'px' : undefined ),
							paddingTop: ( btns[ index ].paddingBT ? btns[ index ].paddingBT + 'px' : undefined ),
							paddingBottom: ( btns[ index ].paddingBT ? btns[ index ].paddingBT + 'px' : undefined ),
							letterSpacing: ( letterSpacing ? letterSpacing + 'px' : undefined ),
						} } >
							{ btns[ index ].icon && 'left' === btns[ index ].iconSide && (
								<IconRender className={ `bst-btn-svg-icon bst-btn-svg-icon-${ btns[ index ].icon } bst-btn-side-${ btns[ index ].iconSide }` } name={ btns[ index ].icon } size={ ( ! btns[ index ].size ? '14' : btns[ index ].size ) } />
							) }
							<span className="bst-btn-inner-text">
								{ btns[ index ].text }
							</span>
							{ btns[ index ].icon && 'left' !== btns[ index ].iconSide && (
								<IconRender className={ `bst-btn-svg-icon bst-btn-svg-icon-${ btns[ index ].icon } bst-btn-side-${ btns[ index ].iconSide }` } name={ btns[ index ].icon } size={ ( ! btns[ index ].size ? '14' : btns[ index ].size ) } />
							) }
						</a>
					</div>
				);
			};
			return (
				<div className={ `bst-btn-align-${ hAlign } bst-btns-wrap bst-btns${ uniqueID }` }>
					{ times( btnCount, n => renderSaveBtns( n ) ) }
				</div>
			);
		},
		migrate: migrateToInnerblocks,
	},
	{
		attributes: {
			hAlign: {
				type: 'string',
				default: 'center',
			},
			btnCount: {
				type: 'number',
				default: 1,
			},
			uniqueID: {
				type: 'string',
				default: '',
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
			btns: {
				type: 'array',
				default: [ {
					text: '',
					link: '',
					target: '_self',
					size: 18,
					paddingBT: '',
					paddingLR: '',
					color: '#555555',
					background: 'transparent',
					border: '#555555',
					borderRadius: 3,
					borderWidth: 2,
					colorHover: '#ffffff',
					backgroundHover: '#444444',
					borderHover: '#444444',
					icon: '',
					iconSide: 'right',
					iconHover: false,
				} ],
			},
		},
		supports: {
			btanimate: true,
			btanimateadd: true,
			btanimatepreview: true,
			btdynamic: true
		},
		save: ( { attributes } ) => {
			const { btnCount, btns, hAlign, uniqueID, letterSpacing } = attributes;
			const renderSaveBtns = ( index ) => {
				return (
					<div className={ `bst-btn-wrap bst-btn-wrap-${ index }` }>
						<a className={ `bst-button bst-btn-${ index }-action bst-btn-svg-show-${ ( ! btns[ index ].iconHover ? 'always' : 'hover' ) } bst-btn-has-text-${ ( ! btns[ index ].text ? 'false' : 'true' ) } bst-btn-has-svg-${ ( ! btns[ index ].icon ? 'false' : 'true' ) }` } href={ ( ! btns[ index ].link ? '#' : btns[ index ].link ) } target={ btns[ index ].target } style={ {
							fontSize: ( btns[ index ].size ? btns[ index ].size + 'px' : undefined ),
							borderRadius: ( btns[ index ].borderRadius ? btns[ index ].borderRadius + 'px' : undefined ),
							borderWidth: btns[ index ].borderWidth + 'px',
							paddingLeft: ( btns[ index ].paddingLR ? btns[ index ].paddingLR + 'px' : undefined ),
							paddingRight: ( btns[ index ].paddingLR ? btns[ index ].paddingLR + 'px' : undefined ),
							paddingTop: ( btns[ index ].paddingTB ? btns[ index ].paddingTB + 'px' : undefined ),
							paddingBottom: ( btns[ index ].paddingTB ? btns[ index ].paddingTB + 'px' : undefined ),
							letterSpacing: ( letterSpacing ? letterSpacing + 'px' : undefined ),
						} } >
							{ btns[ index ].icon && 'left' === btns[ index ].iconSide && (
								<IconRender className={ `bst-btn-svg-icon bst-btn-svg-icon-${ btns[ index ].icon } bst-btn-side-${ btns[ index ].iconSide }` } name={ btns[ index ].icon } size={ ( ! btns[ index ].size ? '14' : btns[ index ].size ) } />
							) }
							<span className="bst-btn-inner-text">
								{ btns[ index ].text }
							</span>
							{ btns[ index ].icon && 'left' !== btns[ index ].iconSide && (
								<IconRender className={ `bst-btn-svg-icon bst-btn-svg-icon-${ btns[ index ].icon } bst-btn-side-${ btns[ index ].iconSide }` } name={ btns[ index ].icon } size={ ( ! btns[ index ].size ? '14' : btns[ index ].size ) } />
							) }
						</a>
					</div>
				);
			};
			return (
				<div className={ `bst-btn-align-${ hAlign } bst-btns-wrap bst-btns${ uniqueID }` }>
					{ times( btnCount, n => renderSaveBtns( n ) ) }
				</div>
			);
		},
		migrate: migrateToInnerblocks,
	},
	{
		attributes: {
			hAlign: {
				type: 'string',
				default: 'center',
			},
			btnCount: {
				type: 'number',
				default: 1,
			},
			uniqueID: {
				type: 'string',
				default: '',
			},
			btns: {
				type: 'array',
				default: [ {
					text: '',
					link: '',
					target: '_self',
					size: 18,
					paddingBT: '',
					paddingLR: '',
					color: '#555555',
					background: 'transparent',
					border: '#555555',
					borderRadius: 3,
					borderWidth: 2,
					colorHover: '#ffffff',
					backgroundHover: '#444444',
					borderHover: '#444444',
					icon: '',
					iconSide: 'right',
					iconHover: false,
				} ],
			},
		},
		supports: {
			btanimate: true,
			btanimateadd: true,
			btanimatepreview: true,
			btdynamic: true
		},
		save: ( { attributes } ) => {
			const { btnCount, btns, hAlign, uniqueID } = attributes;
			const renderSaveBtns = ( index ) => {
				return (
					<div className={ `bst-btn-wrap bst-btn-wrap-${ index }` }>
						<a className={ `bst-button bst-btn-${ index }-action bst-btn-svg-show-${ ( ! btns[ index ].iconHover ? 'always' : 'hover' ) } bst-btn-has-text-${ ( ! btns[ index ].text ? 'false' : 'true' ) } bst-btn-has-svg-${ ( ! btns[ index ].icon ? 'false' : 'true' ) }` } href={ ( ! btns[ index ].link ? '#' : btns[ index ].link ) } target={ btns[ index ].target } style={ {
							backgroundColor: ( btns[ index ].background ? btns[ index ].background : 'transparent' ),
							color: btns[ index ].color,
							fontSize: ( btns[ index ].size ? btns[ index ].size + 'px' : undefined ),
							borderRadius: ( btns[ index ].borderRadius ? btns[ index ].borderRadius + 'px' : undefined ),
							borderWidth: ( btns[ index ].borderWidth ? btns[ index ].borderWidth + 'px' : undefined ),
							borderColor: btns[ index ].border,
							paddingLeft: ( btns[ index ].paddingLR ? btns[ index ].paddingLR + 'px' : undefined ),
							paddingRight: ( btns[ index ].paddingLR ? btns[ index ].paddingLR + 'px' : undefined ),
							paddingTop: ( btns[ index ].paddingTB ? btns[ index ].paddingTB + 'px' : undefined ),
							paddingBottom: ( btns[ index ].paddingTB ? btns[ index ].paddingTB + 'px' : undefined ),
						} } onMouseOver={ `this.style.background='${ btns[ index ].backgroundHover }',this.style.color='${ btns[ index ].colorHover }',this.style.borderColor='${ btns[ index ].borderHover }'` } onFocus={ `this.style.background='${ btns[ index ].backgroundHover }',this.style.color='${ btns[ index ].colorHover }',this.style.borderColor='${ btns[ index ].borderHover }'` } onBlur={ `this.style.background='${ ( btns[ index ].background ? btns[ index ].background : 'transparent' ) }',this.style.color='${ btns[ index ].color }',this.style.borderColor='${ btns[ index ].border }'` } onMouseOut={ `this.style.background='${ ( btns[ index ].background ? btns[ index ].background : 'transparent' ) }',this.style.color='${ btns[ index ].color }',this.style.borderColor='${ btns[ index ].border }'` }>
							{ btns[ index ].icon && 'left' === btns[ index ].iconSide && (
								<IconRender className={ `bst-btn-svg-icon bst-btn-svg-icon-${ btns[ index ].icon } bst-btn-side-${ btns[ index ].iconSide }` } name={ btns[ index ].icon } size={ ( ! btns[ index ].size ? '14' : btns[ index ].size ) } />
							) }
							<span className="bst-btn-inner-text">
								{ btns[ index ].text }
							</span>
							{ btns[ index ].icon && 'left' !== btns[ index ].iconSide && (
								<IconRender className={ `bst-btn-svg-icon bst-btn-svg-icon-${ btns[ index ].icon } bst-btn-side-${ btns[ index ].iconSide }` } name={ btns[ index ].icon } size={ ( ! btns[ index ].size ? '14' : btns[ index ].size ) } />
							) }
						</a>
					</div>
				);
			};
			return (
				<div className={ `bst-btn-align-${ hAlign } bst-btns-wrap bst-btns${ uniqueID }` }>
					{ times( btnCount, n => renderSaveBtns( n ) ) }
				</div>
			);
		},
		migrate: migrateToInnerblocks,
	},
	{
		attributes: {
			hAlign: {
				type: 'string',
				default: 'center',
			},
			btnCount: {
				type: 'number',
				default: 1,
			},
			uniqueID: {
				type: 'string',
				default: '',
			},
			btns: {
				type: 'array',
				default: [ {
					text: '',
					link: '',
					target: '_self',
					size: 18,
					paddingBT: '',
					paddingLR: '',
					color: '#555555',
					background: 'transparent',
					border: '#555555',
					borderRadius: 3,
					borderWidth: 2,
					colorHover: '#ffffff',
					backgroundHover: '#444444',
					borderHover: '#444444',
					icon: '',
					iconSide: 'right',
					iconHover: false,
				} ],
			},
		},
		supports: {
			btanimate: true,
			btanimateadd: true,
			btanimatepreview: true,
			btdynamic: true
		},
		save: ( { attributes } ) => {
			const { btnCount, btns, hAlign, uniqueID } = attributes;
			const renderSaveBtns = ( index ) => {
				return (
					<div className={ `bst-btn-wrap bst-btn-wrap-${ index }` }>
						<a className={ `bst-button bst-btn-${ index }-action bst-btn-svg-show-${ ( ! btns[ index ].iconHover ? 'always' : 'hover' ) } bst-btn-has-text-${ ( ! btns[ index ].text ? 'false' : 'true' ) } bst-btn-has-svg-${ ( ! btns[ index ].icon ? 'false' : 'true' ) }` } href={ ( ! btns[ index ].link ? '#' : btns[ index ].link ) } target={ btns[ index ].target } style={ {
							backgroundColor: ( btns[ index ].background ? btns[ index ].background : 'transparent' ),
							color: btns[ index ].color,
							fontSize: ( btns[ index ].size ? btns[ index ].size + 'px' : undefined ),
							borderRadius: ( btns[ index ].borderRadius ? btns[ index ].borderRadius + 'px' : undefined ),
							borderWidth: btns[ index ].borderWidth + 'px',
							borderColor: btns[ index ].border,
							paddingLeft: ( btns[ index ].paddingLR ? btns[ index ].paddingLR + 'px' : undefined ),
							paddingRight: ( btns[ index ].paddingLR ? btns[ index ].paddingLR + 'px' : undefined ),
							paddingTop: ( btns[ index ].paddingTB ? btns[ index ].paddingTB + 'px' : undefined ),
							paddingBottom: ( btns[ index ].paddingTB ? btns[ index ].paddingTB + 'px' : undefined ),
						} } onMouseOver={ `this.style.background='${ btns[ index ].backgroundHover }',this.style.color='${ btns[ index ].colorHover }',this.style.borderColor='${ btns[ index ].borderHover }'` } onFocus={ `this.style.background='${ btns[ index ].backgroundHover }',this.style.color='${ btns[ index ].colorHover }',this.style.borderColor='${ btns[ index ].borderHover }'` } onBlur={ `this.style.background='${ ( btns[ index ].background ? btns[ index ].background : 'transparent' ) }',this.style.color='${ btns[ index ].color }',this.style.borderColor='${ btns[ index ].border }'` } onMouseOut={ `this.style.background='${ ( btns[ index ].background ? btns[ index ].background : 'transparent' ) }',this.style.color='${ btns[ index ].color }',this.style.borderColor='${ btns[ index ].border }'` }>
							{ btns[ index ].icon && 'left' === btns[ index ].iconSide && (
								<IconRender className={ `bst-btn-svg-icon bst-btn-svg-icon-${ btns[ index ].icon } bst-btn-side-${ btns[ index ].iconSide }` } name={ btns[ index ].icon } size={ ( ! btns[ index ].size ? '14' : btns[ index ].size ) } />
							) }
							<span className="bst-btn-inner-text">
								{ btns[ index ].text }
							</span>
							{ btns[ index ].icon && 'left' !== btns[ index ].iconSide && (
								<IconRender className={ `bst-btn-svg-icon bst-btn-svg-icon-${ btns[ index ].icon } bst-btn-side-${ btns[ index ].iconSide }` } name={ btns[ index ].icon } size={ ( ! btns[ index ].size ? '14' : btns[ index ].size ) } />
							) }
						</a>
					</div>
				);
			};
			return (
				<div className={ `bst-btn-align-${ hAlign } bst-btns-wrap bst-btns${ uniqueID }` }>
					{ times( btnCount, n => renderSaveBtns( n ) ) }
				</div>
			);
		},
		migrate: migrateToInnerblocks,
	},
];
