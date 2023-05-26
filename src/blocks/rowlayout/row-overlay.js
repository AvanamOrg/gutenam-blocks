/**
 * BLOCK Section: Base Row / Layout Overlay
 */

 import memoize from 'memize';

 import { BaseColorOutput, getPreviewSize } from '@base/helpers';

import {
	Fragment,
} from '@wordpress/element';
const overlayOpacityOutput = memoize( ( opacity ) => {
	if ( opacity < 10 ) {
		return '0.0' + opacity;
	} else if ( opacity >= 100 ) {
		return '1';
	}
	return '0.' + opacity;
} );
/**
 * Build the row edit
 */
 function Overlay( {
	attributes,
	previewDevice,
} ) {
	const { uniqueID, columns, mobileLayout, currentTab, colLayout, tabletLayout, columnGutter, collapseGutter, collapseOrder, topPadding, bottomPadding, leftPadding, rightPadding, topPaddingM, bottomPaddingM, leftPaddingM, rightPaddingM, topMargin, bottomMargin, topMarginM, bottomMarginM, bgColor, bgImg, bgImgAttachment, bgImgSize, bgImgPosition, bgImgRepeat, bgImgID, verticalAlignment, overlayOpacity, overlayBgImg, overlayBgImgAttachment, overlayBgImgID, overlayBgImgPosition, overlayBgImgRepeat, overlayBgImgSize, currentOverlayTab, overlayBlendMode, overlayGradAngle, overlayGradLoc, overlayGradLocSecond, overlayGradType, overlay, overlaySecond, tabletOverlay,  mobileOverlay, overlaySecondOpacity, overlayFirstOpacity, overlayGradient } = attributes;
	// Overlay Color.
	const previewOverlayColor = getPreviewSize( previewDevice, ( overlay ? BaseColorOutput( overlay, ( undefined !== overlayFirstOpacity && '' !== overlayFirstOpacity ? overlayFirstOpacity : 1 ) ) : undefined ), ( undefined !== tabletOverlay && tabletOverlay[0] && tabletOverlay[0].overlay && tabletOverlay[0].enable ? BaseColorOutput( tabletOverlay[0].overlay ) : '' ), ( undefined !== mobileOverlay && mobileOverlay[0] && mobileOverlay[0].overlay && mobileOverlay[0].enable ? BaseColorOutput( mobileOverlay[0].overlay ) : '' ) );
	const previewOverlaySecondColor = getPreviewSize( previewDevice, ( overlaySecond ? BaseColorOutput( overlaySecond, ( undefined !== overlaySecondOpacity && '' !== overlaySecondOpacity ? overlaySecondOpacity : 1 ) ) : undefined ), BaseColorOutput( undefined !== tabletOverlay && tabletOverlay[0] && tabletOverlay[0].overlaySecond && tabletOverlay[0].enable ? tabletOverlay[0].overlaySecond : '' ), BaseColorOutput( undefined !== mobileOverlay && mobileOverlay[0] && mobileOverlay[0].overlaySecond && mobileOverlay[0].enable ? mobileOverlay[0].overlaySecond : '' ) );
	// Overlay Tab.
	const previewCurrentOverlayTab = getPreviewSize( previewDevice, ( currentOverlayTab ? currentOverlayTab : 'normal' ), ( undefined !== tabletOverlay && tabletOverlay[0] && tabletOverlay[0].currentOverlayTab && tabletOverlay[0].enable ? tabletOverlay[0].currentOverlayTab : '' ), ( undefined !== mobileOverlay && mobileOverlay[0] && mobileOverlay[0].currentOverlayTab && mobileOverlay[0].enable ? mobileOverlay[0].currentOverlayTab : '' ) );
	// Grad Type.
	const previewOverlayGradType = getPreviewSize( previewDevice, ( overlayGradType ? overlayGradType : 'linear' ), ( undefined !== tabletOverlay && tabletOverlay[0] && tabletOverlay[0].overlayGradType && tabletOverlay[0].enable ? tabletOverlay[0].overlayGradType : '' ), ( undefined !== mobileOverlay && mobileOverlay[0] && mobileOverlay[0].overlayGradType && mobileOverlay[0].enable ? mobileOverlay[0].overlayGradType : '' ) );
	// Grad Angle.
	const previewOverlayGradAngle = getPreviewSize( previewDevice, ( overlayGradAngle ? overlayGradAngle : 180 ), ( undefined !== tabletOverlay && tabletOverlay[0] && tabletOverlay[0].overlayGradAngle && tabletOverlay[0].enable ? tabletOverlay[0].overlayGradAngle : '' ), ( undefined !== mobileOverlay && mobileOverlay[0] && mobileOverlay[0].overlayGradAngle && mobileOverlay[0].enable ? mobileOverlay[0].overlayGradAngle : '' ) );
	// Overlay Background Image.
	const previewOverlayImage = getPreviewSize( previewDevice, ( overlayBgImg ? `url(${ overlayBgImg })` : undefined ), ( undefined !== tabletOverlay && tabletOverlay[0] && tabletOverlay[0].overlayBgImg && tabletOverlay[0].enable ? `url(${ tabletOverlay[0].overlayBgImg })` : '' ), ( undefined !== mobileOverlay && mobileOverlay[0] && mobileOverlay[0].overlayBgImg && mobileOverlay[0].enable ? `url(${ mobileOverlay[0].overlayBgImg })` : '' ) );

	const previewOverlaySize = getPreviewSize( previewDevice, ( overlayBgImgSize ? overlayBgImgSize : undefined ), ( undefined !== tabletOverlay && tabletOverlay[0] && tabletOverlay[0].overlayBgImgSize && tabletOverlay[0].enable ? tabletOverlay[0].overlayBgImgSize : '' ), ( undefined !== mobileOverlay && mobileOverlay[0] && mobileOverlay[0].overlayBgImgSize && mobileOverlay[0].enable ? mobileOverlay[0].overlayBgImgSize : '' ) );
	const previewOverlayPosition = getPreviewSize( previewDevice, ( overlayBgImgPosition ? overlayBgImgPosition : undefined ), ( undefined !== tabletOverlay && tabletOverlay[0] && tabletOverlay[0].overlayBgImgPosition && tabletOverlay[0].enable ? tabletOverlay[0].overlayBgImgPosition : '' ), ( undefined !== mobileOverlay && mobileOverlay[0] && mobileOverlay[0].overlayBgImgPosition && mobileOverlay[0].enable ? mobileOverlay[0].overlayBgImgPosition : '' ) );
	const previewOverlayRepeat = getPreviewSize( previewDevice, ( overlayBgImgRepeat ? overlayBgImgRepeat : undefined ), ( undefined !== tabletOverlay && tabletOverlay[0] && tabletOverlay[0].overlayBgImgRepeat && tabletOverlay[0].enable ? tabletOverlay[0].overlayBgImgRepeat : '' ), ( undefined !== mobileOverlay && mobileOverlay[0] && mobileOverlay[0].overlayBgImgRepeat && mobileOverlay[0].enable ? mobileOverlay[0].overlayBgImgRepeat : '' ) );
	const previewOverlayAttachment = getPreviewSize( previewDevice, ( overlayBgImgAttachment ? overlayBgImgAttachment : undefined ), ( undefined !== tabletOverlay && tabletOverlay[0] && tabletOverlay[0].overlayBgImgAttachment && tabletOverlay[0].enable ? tabletOverlay[0].overlayBgImgAttachment : '' ), ( undefined !== mobileOverlay && mobileOverlay[0] && mobileOverlay[0].overlayBgImgAttachment && mobileOverlay[0].enable ? mobileOverlay[0].overlayBgImgAttachment : '' ) );
	const previewOverlayOpacity = getPreviewSize( previewDevice, ( undefined !== overlayOpacity ? overlayOpacity : undefined ), ( undefined !== tabletOverlay && tabletOverlay[0] && '' !== tabletOverlay[0].overlayOpacity && tabletOverlay[0].enable ? tabletOverlay[0].overlayOpacity : '' ), ( undefined !== mobileOverlay && mobileOverlay[0] && '' !== mobileOverlay[0].overlayOpacity && mobileOverlay[0].enable ? mobileOverlay[0].overlayOpacity : '' ) );
	const previewOverlayBlendMode = getPreviewSize( previewDevice, ( overlayBlendMode ? overlayBlendMode : undefined ), ( undefined !== tabletOverlay && tabletOverlay[0] && tabletOverlay[0].overlayBlendMod && tabletOverlay[0].enable ? tabletOverlay[0].overlayBlendMod : '' ), ( undefined !== mobileOverlay && mobileOverlay[0] && mobileOverlay[0].overlayBlendMod && mobileOverlay[0].enable ? mobileOverlay[0].overlayBlendMod : '' ) );
	const previewOverlayGradLoc = getPreviewSize( previewDevice, ( overlayGradLoc ? overlayGradLoc : 0 ), ( undefined !== tabletOverlay && tabletOverlay[0] && tabletOverlay[0].overlayGradLoc && tabletOverlay[0].enable ? tabletOverlay[0].overlayGradLoc : '' ), ( undefined !== mobileOverlay && mobileOverlay[0] && mobileOverlay[0].overlayGradLoc && mobileOverlay[0].enable ? mobileOverlay[0].overlayGradLoc : '' ) );

	const previewOverlayGradLocSecond = getPreviewSize( previewDevice, ( undefined !== overlayGradLocSecond ? overlayGradLocSecond : 100 ), ( undefined !== tabletOverlay && tabletOverlay[0] && tabletOverlay[0].overlayGradLocSecond && tabletOverlay[0].enable ? tabletOverlay[0].overlayGradLocSecond : '' ), ( undefined !== mobileOverlay && mobileOverlay[0] && mobileOverlay[0].overlayGradLocSecond && mobileOverlay[0].enable ? mobileOverlay[0].overlayGradLocSecond : '' ) );
	const previewOverlayGradient = getPreviewSize( previewDevice, ( undefined !== overlayGradient ? overlayGradient : '' ), ( undefined !== tabletOverlay && tabletOverlay[0] && tabletOverlay[0].gradient && tabletOverlay[0].enable ? tabletOverlay[0].gradient : '' ), ( undefined !== mobileOverlay && mobileOverlay[0] && mobileOverlay[0].gradient && mobileOverlay[0].enable ? mobileOverlay[0].gradient : '' ) );
	return (
		<>
			{ ( ! previewCurrentOverlayTab || ( 'grad' !== previewCurrentOverlayTab && 'gradient' !== previewCurrentOverlayTab ) ) && (
				<div className={ `bst-row-layout-overlay bst-row-overlay-normal${ previewOverlayImage && previewOverlayAttachment === 'parallax' ? ' bst-jarallax' : '' }` } data-bg-img-id={ overlayBgImgID } style={ {
					backgroundColor: ( previewOverlayColor ? previewOverlayColor : undefined ),
					backgroundImage: ( previewOverlayImage ? previewOverlayImage : undefined ),
					backgroundSize: ( previewOverlaySize ? previewOverlaySize : undefined ),
					backgroundPosition: ( previewOverlayPosition ? previewOverlayPosition : undefined ),
					backgroundRepeat: ( previewOverlayRepeat ? previewOverlayRepeat : undefined ),
					backgroundAttachment: ( previewOverlayAttachment === 'parallax' ? 'fixed' : previewOverlayAttachment ),
					mixBlendMode:  ( previewOverlayBlendMode ? previewOverlayBlendMode : undefined ),
					opacity: ( undefined !== previewOverlayOpacity && Number.isInteger( previewOverlayOpacity ) ? overlayOpacityOutput( previewOverlayOpacity ) : undefined ),
				} }>
				</div>
			) }
			{ previewCurrentOverlayTab && 'grad' === previewCurrentOverlayTab && (
				<div className={ 'bst-row-layout-overlay bst-row-overlay-gradient' } data-bg-img-id={ overlayBgImgID } style={ {
					backgroundImage: ( 'radial' === previewOverlayGradType ? `radial-gradient(at ${ previewOverlayPosition }, ${ ( previewOverlayColor ? previewOverlayColor : '' ) } ${ previewOverlayGradLoc }%, ${ ( previewOverlaySecondColor ? previewOverlaySecondColor : '' ) } ${ previewOverlayGradLocSecond }%)` : `linear-gradient(${ previewOverlayGradAngle }deg, ${ ( previewOverlayColor ? previewOverlayColor : '' ) } ${ previewOverlayGradLoc }%, ${ ( previewOverlaySecondColor ? previewOverlaySecondColor : '' ) } ${ previewOverlayGradLocSecond }%)` ),
					mixBlendMode:  ( previewOverlayBlendMode ? previewOverlayBlendMode : undefined ),
					opacity: ( undefined !== previewOverlayOpacity && Number.isInteger( previewOverlayOpacity ) ? overlayOpacityOutput( previewOverlayOpacity ) : undefined ),
				} }>
				</div>
			) }
			{ previewCurrentOverlayTab && 'gradient' === previewCurrentOverlayTab && (
				<div className={ 'bst-row-layout-overlay bst-row-overlay-gradient' } data-bg-img-id={ overlayBgImgID } style={ {
					backgroundImage: previewOverlayGradient ? previewOverlayGradient : undefined,
					mixBlendMode:  ( previewOverlayBlendMode ? previewOverlayBlendMode : undefined ),
					opacity: ( undefined !== previewOverlayOpacity && Number.isInteger( previewOverlayOpacity ) ? overlayOpacityOutput( previewOverlayOpacity ) : undefined ),
				} }>
				</div>
			) }
		</>
	);
}
export default Overlay;
