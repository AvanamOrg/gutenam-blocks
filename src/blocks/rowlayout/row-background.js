/**
 * BLOCK Section: Base Row / Layout Background
 */

 import { times } from 'lodash';
 import { Splide, SplideSlide } from '@splidejs/react-splide';
 import { BaseColorOutput, getPreviewSize, getBorderStyle } from '@base/helpers';
import {
	useBlockProps,
} from '@wordpress/block-editor';

import { getSpacingOptionOutput } from './utils';

/**
 * Build the row edit
 */
 function RowBackground( {
	attributes,
	previewDevice,
	backgroundClasses,
	children,
} ) {
	const { uniqueID, columns, mobileLayout, currentTab, colLayout, tabletLayout, columnGutter, collapseGutter, collapseOrder, tabletPadding, mobilePadding, padding, topMargin, bottomMargin, topMarginM, bottomMarginM, bgColor, bgImg, bgImgAttachment, bgImgSize, bgImgPosition, bgImgRepeat, bgImgID, verticalAlignment, overlayOpacity, overlayBgImg, overlayBgImgAttachment, overlayBgImgID, overlayBgImgPosition, overlayBgImgRepeat, overlayBgImgSize, currentOverlayTab, overlayBlendMode, overlayGradAngle, overlayGradLoc, overlayGradLocSecond, overlayGradType, overlay, overlaySecond, htmlTag, minHeight, maxWidth, bottomSep, bottomSepColor, bottomSepHeight, bottomSepHeightMobile, bottomSepHeightTab, bottomSepWidth, bottomSepWidthMobile, bottomSepWidthTab, topSep, topSepColor, topSepHeight, topSepHeightMobile, topSepHeightTab, topSepWidth, topSepWidthMobile, topSepWidthTab, firstColumnWidth, secondColumnWidth, textColor, linkColor, linkHoverColor, topMarginT, bottomMarginT, minHeightUnit, maxWidthUnit, marginUnit, columnsUnlocked, tabletBackground, tabletOverlay, mobileBackground, mobileOverlay, columnsInnerHeight, zIndex, backgroundInline, backgroundSettingTab, backgroundSliderCount, backgroundSlider, inheritMaxWidth, backgroundSliderSettings, backgroundVideo, backgroundVideoType, overlaySecondOpacity, overlayFirstOpacity, paddingUnit, align, minHeightTablet, minHeightMobile, bgColorClass, vsdesk, vstablet, vsmobile, loggedInUser, loggedIn, loggedOut, loggedInShow, borderWidth, tabletBorderWidth, mobileBorderWidth, borderRadius, tabletBorderRadius, mobileBorderRadius, border, tabletBorder, mobileBorder, gradient, margin, tabletMargin, mobileMargin, borderStyle, tabletBorderStyle, mobileBorderStyle, borderRadiusUnit } = attributes;
	const previewMarginTop = getPreviewSize( previewDevice, ( undefined !== margin && undefined !== margin[0] ? margin[0] : '' ), ( undefined !== tabletMargin && undefined !== tabletMargin[0] ? tabletMargin[0] : '' ), ( undefined !== mobileMargin && undefined !== mobileMargin[0] ? mobileMargin[0] : '' ) );
	const previewMarginBottom = getPreviewSize( previewDevice, ( undefined !== margin && undefined !== margin[2] ? margin[2] : '' ), ( undefined !== tabletMargin && undefined !== tabletMargin[2] ? tabletMargin[2] : '' ), ( undefined !== mobileMargin && undefined !== mobileMargin[2] ? mobileMargin[2] : '' ) );
	const tabletBackgroundType = tabletBackground?.[ 0 ]?.type || 'normal';
	const mobileBackgroundType = mobileBackground?.[ 0 ]?.type || 'normal';
	const mobileAllowForceOverride = ( 'normal' === mobileBackgroundType && '' === mobileBackground?.[ 0 ]?.bgImg && ( ( 'normal' === tabletBackgroundType && '' !== tabletBackground?.[ 0 ]?.bgImg ) || ( 'gradient' === tabletBackgroundType && '' !== tabletBackground?.[ 0 ]?.gradient ) || ( 'normal' === backgroundSettingTab && '' !== bgImg ) || ( 'gradient' === backgroundSettingTab && '' !== gradient ) ) ? true : false );
	const tabletAllowForceOverride = ( 'normal' === tabletBackgroundType && '' === tabletBackground?.[ 0 ]?.bgImg && ( ( 'normal' === backgroundSettingTab && '' !== bgImg ) || ( 'gradient' === backgroundSettingTab && '' !== gradient ) ) ? true : false );
	const previewBackgroundColor = getPreviewSize( previewDevice, ( undefined !== bgColor ? bgColor : '' ), ( undefined !== tabletBackground && tabletBackground[0] && tabletBackground[0].bgColor && tabletBackground[0].enable ? tabletBackground[0].bgColor : '' ), ( undefined !== mobileBackground && mobileBackground[0] && mobileBackground[0].bgColor && mobileBackground[0].enable ? mobileBackground[0].bgColor : '' ) );
	// Border.
	const previewBorderTopStyle = getBorderStyle( previewDevice, 'top', borderStyle, tabletBorderStyle, mobileBorderStyle );
	const previewBorderRightStyle = getBorderStyle( previewDevice, 'right', borderStyle, tabletBorderStyle, mobileBorderStyle );
	const previewBorderBottomStyle = getBorderStyle( previewDevice, 'bottom', borderStyle, tabletBorderStyle, mobileBorderStyle );
	const previewBorderLeftStyle = getBorderStyle( previewDevice, 'left', borderStyle, tabletBorderStyle, mobileBorderStyle );
	const previewRadiusTop = getPreviewSize( previewDevice, ( undefined !== borderRadius ? borderRadius[ 0 ] : '' ), ( undefined !== tabletBorderRadius ? tabletBorderRadius[ 0 ] : '' ), ( undefined !== mobileBorderRadius ? mobileBorderRadius[ 0 ] : '' ) );
	const previewRadiusRight = getPreviewSize( previewDevice, ( undefined !== borderRadius ? borderRadius[ 1 ] : '' ), ( undefined !== tabletBorderRadius ? tabletBorderRadius[ 1 ] : '' ), ( undefined !== mobileBorderRadius ? mobileBorderRadius[ 1 ] : '' ) );
	const previewRadiusBottom = getPreviewSize( previewDevice, ( undefined !== borderRadius ? borderRadius[ 2 ] : '' ), ( undefined !== tabletBorderRadius ? tabletBorderRadius[ 2 ] : '' ), ( undefined !== mobileBorderRadius ? mobileBorderRadius[ 2 ] : '' ) );
	const previewRadiusLeft = getPreviewSize( previewDevice, ( undefined !== borderRadius ? borderRadius[ 3 ] : '' ), ( undefined !== tabletBorderRadius ? tabletBorderRadius[ 3 ] : '' ), ( undefined !== mobileBorderRadius ? mobileBorderRadius[ 3 ] : '' ) );
	const previewMinHeight = getPreviewSize( previewDevice, ( undefined !== minHeight ? minHeight : '' ), ( undefined !== minHeightTablet ? minHeightTablet : '' ), ( undefined !== minHeightMobile ? minHeightMobile : '' ) );
	// Background Image.
	let previewBackgroundImage = getPreviewSize( previewDevice, ( bgImg ? `url(${ bgImg })` : undefined ), ( undefined !== tabletBackground && tabletBackground[0] && tabletBackground[0].bgImg && tabletBackground[0].enable ? `url(${ tabletBackground[0].bgImg })` : '' ), ( undefined !== mobileBackground && mobileBackground[0] && mobileBackground[0].bgImg && mobileBackground[0].enable ? `url(${ mobileBackground[0].bgImg })` : '' ) );

	previewBackgroundImage = getPreviewSize(  previewDevice, ( backgroundSettingTab && 'gradient' == backgroundSettingTab ? gradient : previewBackgroundImage ), ( 'gradient' == tabletBackground?.[0]?.type && tabletBackground?.[0]?.gradient && tabletBackground?.[0]?.enable ? tabletBackground[0].gradient : previewBackgroundImage ), ( undefined !== mobileBackground[0] && undefined !== mobileBackground[0].type && 'gradient' == mobileBackground[0].type && undefined !== mobileBackground[0].gradient && mobileBackground[0].gradient && mobileBackground[0].enable ? mobileBackground[0].gradient : previewBackgroundImage ) );

	previewBackgroundImage = getPreviewSize( previewDevice, previewBackgroundImage, ( tabletAllowForceOverride && tabletBackground?.[0]?.forceOverDesk && tabletBackground?.[0]?.enable ? 'none' : previewBackgroundImage ), ( mobileAllowForceOverride && mobileBackground?.[0]?.forceOverDesk && mobileBackground?.[0]?.enable ? 'none' : previewBackgroundImage ) );

	previewBackgroundImage = getPreviewSize( previewDevice, previewBackgroundImage, ( 'gradient' !== tabletBackground?.[0]?.type && '' === tabletBackground?.[0]?.bgImg && tabletBackground?.[0]?.enable ? 'none' : previewBackgroundImage ), ( 'gradient' !== mobileBackground?.[0]?.type && '' === mobileBackground?.[0]?.bgImg && mobileBackground?.[0]?.enable ? 'none' : previewBackgroundImage ) );
	
	if ( previewBackgroundImage === 'none' ) {
		previewBackgroundImage = undefined;
	}
	// let disableBGImage = false;
	// if ( 'Mobile' === previewDevice && undefined !== mobileBackground && mobileBackground[0] && mobileBackground[0].enable && 'gradient' !== mobileBackground[0].type && '' === mobileBackground[0].bgImg ) {
	// 	disableBGImage = true;
	// } else if ( 'Tablet' === previewDevice && undefined !== tabletBackground && tabletBackground[0] && tabletBackground[0].enable && 'gradient' !== tabletBackground[0].type && '' === tabletBackground[0].bgImg ) {
	// 	disableBGImage = true;
	// }
	const previewBackgroundSize = getPreviewSize( previewDevice, ( bgImgSize ? bgImgSize : undefined ), ( undefined !== tabletBackground && tabletBackground[0] && tabletBackground[0].bgImgSize && tabletBackground[0].enable ? tabletBackground[0].bgImgSize : '' ), ( undefined !== mobileBackground && mobileBackground[0] && mobileBackground[0].bgImgSize && mobileBackground[0].enable ? mobileBackground[0].bgImgSize : '' ) );
	const previewBackgroundPosition = getPreviewSize( previewDevice, ( bgImgPosition ? bgImgPosition : undefined ), ( undefined !== tabletBackground && tabletBackground[0] && tabletBackground[0].bgImgPosition && tabletBackground[0].enable ? tabletBackground[0].bgImgPosition : '' ), ( undefined !== mobileBackground && mobileBackground[0] && mobileBackground[0].bgImgPosition && mobileBackground[0].enable ? mobileBackground[0].bgImgPosition : '' ) );
	const previewBackgroundRepeat = getPreviewSize( previewDevice, ( bgImgRepeat ? bgImgRepeat : undefined ), ( undefined !== tabletBackground && tabletBackground[0] && tabletBackground[0].bgImgRepeat && tabletBackground[0].enable ? tabletBackground[0].bgImgRepeat : '' ), ( undefined !== mobileBackground && mobileBackground[0] && mobileBackground[0].bgImgRepeat && mobileBackground[0].enable ? mobileBackground[0].bgImgRepeat : '' ) );
	const previewBackgroundAttachment = getPreviewSize( previewDevice, ( bgImgAttachment ? bgImgAttachment : undefined ), ( undefined !== tabletBackground && tabletBackground[0] && tabletBackground[0].bgImgAttachment && tabletBackground[0].enable ? tabletBackground[0].bgImgAttachment : '' ), ( undefined !== mobileBackground && mobileBackground[0] && mobileBackground[0].bgImgAttachment && mobileBackground[0].enable ? mobileBackground[0].bgImgAttachment : '' ) );
	const previewBackgroundSettingTab = getPreviewSize( previewDevice, ( backgroundSettingTab ? backgroundSettingTab : 'normal' ), ( undefined !== tabletBackground && tabletBackground?.[0] && tabletBackground?.[0]?.enable ? 'normal' : '' ), ( undefined !== mobileBackground && mobileBackground?.[0] && mobileBackground?.[0]?.enable ? 'normal' : '' ) );

	const sliderSettings = {
		type         : backgroundSliderSettings && backgroundSliderSettings[ 0 ] && undefined !== backgroundSliderSettings[ 0 ].fade && backgroundSliderSettings[ 0 ].fade ? 'fade' : 'slide',
		dots         : ( backgroundSliderSettings && backgroundSliderSettings[ 0 ] && backgroundSliderSettings[ 0 ].dotStyle === 'none' ? false : true ),
		arrows       : ( backgroundSliderSettings && backgroundSliderSettings[ 0 ] && backgroundSliderSettings[ 0 ].arrowStyle !== 'none' ? true : false ),
		rewind       : true,
		perPage      : 1,
		rewind       : true,
		pagination   : ( backgroundSliderSettings && backgroundSliderSettings[ 0 ] && backgroundSliderSettings[ 0 ].dotStyle === 'none' ? false : true ),
		speed        : ( backgroundSliderSettings && backgroundSliderSettings[ 0 ] && undefined !== backgroundSliderSettings[ 0 ].tranSpeed ? backgroundSliderSettings[ 0 ].tranSpeed : 400 ),
		drag         : false,
		interval     : ( backgroundSliderSettings && backgroundSliderSettings[ 0 ] && undefined !== backgroundSliderSettings[ 0 ].speed ? backgroundSliderSettings[ 0 ].speed : 7000 ),
		autoplay     : ( backgroundSliderSettings && backgroundSliderSettings[ 0 ] && undefined !== backgroundSliderSettings[ 0 ].autoPlay ? backgroundSliderSettings[ 0 ].autoPlay : true ),
	};

	const renderSliderImages = ( index ) => {
		return (
			<div className="bsb-bg-slide-contain">
				<div className={ `bsb-bg-slide bsb-bg-slide-${ index }` } style={ {
					backgroundColor: ( undefined !== backgroundSlider && undefined !== backgroundSlider[ index ] && undefined !== backgroundSlider[ index ].bgColor ? BaseColorOutput( backgroundSlider[ index ].bgColor ) : undefined ),
					backgroundImage: ( undefined !== backgroundSlider && undefined !== backgroundSlider[ index ] && undefined !== backgroundSlider[ index ].bgImg ? 'url("' + backgroundSlider[ index ].bgImg + '")' : undefined ),
					backgroundSize: bgImgSize,
					backgroundPosition: bgImgPosition,
					backgroundRepeat: bgImgRepeat,
				} }></div>
			</div>
		);
	};
	const blockProps = useBlockProps( {
		className: backgroundClasses,
		style: {
			marginBottom: getSpacingOptionOutput( previewMarginBottom, ( marginUnit ? marginUnit : 'px' ) ),
			marginTop: getSpacingOptionOutput( previewMarginTop, ( marginUnit ? marginUnit : 'px' ) ),
			borderTop: ( previewBorderTopStyle ? previewBorderTopStyle : undefined ),
			borderRight: ( previewBorderRightStyle ? previewBorderRightStyle : undefined ),
			borderBottom: ( previewBorderBottomStyle ? previewBorderBottomStyle : undefined ),
			borderLeft: ( previewBorderLeftStyle ? previewBorderLeftStyle : undefined ),
			borderTopLeftRadius: ( previewRadiusTop ? previewRadiusTop + ( borderRadiusUnit ? borderRadiusUnit : 'px' ) : undefined ),
			borderTopRightRadius: ( previewRadiusRight ? previewRadiusRight + ( borderRadiusUnit ? borderRadiusUnit : 'px' ) : undefined ),
			borderBottomRightRadius: ( previewRadiusBottom ? previewRadiusBottom + ( borderRadiusUnit ? borderRadiusUnit : 'px' ) : undefined ),
			borderBottomLeftRadius: ( previewRadiusLeft ? previewRadiusLeft + ( borderRadiusUnit ? borderRadiusUnit : 'px' ) : undefined ),
			minHeight: previewMinHeight ? previewMinHeight + minHeightUnit : undefined,
			zIndex: ( zIndex ? zIndex : undefined ),
		 },
		'data-align': ( 'full' === align || 'wide' === align || 'center' === align ? align : undefined ),
	} );
	return (
		<>
			<div { ...blockProps }>
				{ ( 'slider' !== previewBackgroundSettingTab && 'video' !== previewBackgroundSettingTab ) && (
					<div className={ `bst-row-layout-background${ previewBackgroundImage && previewBackgroundAttachment === 'parallax' ? ' bst-jarallax' : '' }` } data-bg-img-id={ bgImgID } style={ {
						backgroundColor: ( previewBackgroundColor ? BaseColorOutput( previewBackgroundColor ) : undefined ),
						backgroundImage: ( previewBackgroundImage ? previewBackgroundImage : undefined ),
						backgroundSize: ( previewBackgroundSize ? previewBackgroundSize : undefined ),
						backgroundPosition: ( previewBackgroundPosition ? previewBackgroundPosition : undefined ),
						backgroundRepeat: ( previewBackgroundRepeat ? previewBackgroundRepeat : undefined ),
					} }></div>
				) }
				{ ( 'slider' === previewBackgroundSettingTab ) && (
					<div className={ `bst-blocks-carousel bsb-blocks-bg-slider bst-carousel-container-dotstyle-${ ( backgroundSliderSettings && backgroundSliderSettings[ 0 ] && undefined !== backgroundSliderSettings[ 0 ].dotStyle ? backgroundSliderSettings[ 0 ].dotStyle : 'dark' ) }` }>
						{ backgroundSliderCount !== 1 && (
							<Splide options={ sliderSettings } className={ `bst-carousel-arrowstyle-${ ( backgroundSliderSettings && backgroundSliderSettings[ 0 ] && undefined !== backgroundSliderSettings[ 0 ].arrowStyle ? backgroundSliderSettings[ 0 ].arrowStyle : 'none' ) } bst-carousel-dotstyle-${ ( backgroundSliderSettings && backgroundSliderSettings[ 0 ] && undefined !== backgroundSliderSettings[ 0 ].dotStyle ? backgroundSliderSettings[ 0 ].dotStyle : 'dark' ) }` } { ...sliderSettings }>
								{ times( backgroundSliderCount, n =>
									<SplideSlide className={ 'base-blocks-gallery-item' }>
										{renderSliderImages( n )}
									</SplideSlide>
								) }
								{/* {theImages.map( ( img, index ) => {
									return (
										<SplideSlide className={ 'base-blocks-gallery-item' } key={img.id || img.url}>
											{ renderGalleryImages( img, index ) }
										</SplideSlide>
									);
								} )} */}
							</Splide>
						) }
						{ ( undefined !== backgroundSliderCount ? backgroundSliderCount : 1 ) === 1 && (
							times( ( undefined !== backgroundSliderCount ? backgroundSliderCount : 1 ), n => renderSliderImages( n ) )
						) }
					</div>
				) }
				{ ( 'video' === previewBackgroundSettingTab ) && (
					<div className={ 'bsb-blocks-bg-video-container' } style={ { backgroundColor: ( previewBackgroundColor ? BaseColorOutput( previewBackgroundColor ) : undefined ) } }>
						{ ( undefined === backgroundVideoType || 'local' === backgroundVideoType ) && (
							<video className="bsb-blocks-bg-video" playsinline="" loop="" src={ ( undefined !== backgroundVideo && undefined !== backgroundVideo[ 0 ] && undefined !== backgroundVideo[ 0 ].local ? backgroundVideo[ 0 ].local : undefined ) }></video>
						) }
						{ ( 'youtube' === backgroundVideoType ) && (
							<div className="bsb-blocks-bg-video" style={ { backgroundImage: `url(https://img.youtube.com/vi/${ backgroundVideo[ 0 ].youtube }/maxresdefault.jpg)` } }></div>
						) }
					</div>
				) }
				{ children }
			</div>
		</>
	);
}
export default RowBackground;
