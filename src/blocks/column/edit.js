/**
 * BLOCK: Base Column
 *
 * Registering a basic block with Gutenberg.
 */

/**
 * Import Controls
 */
import classnames from 'classnames';
import { debounce } from 'lodash';

/**
 * Base Components.
 */
import {
	PopColorControl,
	ResponsiveMeasurementControls,
	SmallResponsiveControl,
	RangeControl,
	ResponsiveRangeControls,
	BasePanelBody,
	URLInputControl,
	VerticalAlignmentIcon,
	BaseRadioButtons,
	ResponsiveAlignControls,
	BoxShadowControl,
	BackgroundControl as BaseBackgroundControl,
	ResponsiveBorderControl,
	BackgroundTypeControl,
	GradientControl,
	InspectorControlTabs,
	BaseBlockDefaults,
	ResponsiveMeasureRangeControl,
	SpacingVisualizer,
	ColorGroup,
	HoverToggleControl,
	CopyPasteAttributes
} from '@base/components';

/**
 * Base Helpers.
 */
import {
	BaseColorOutput,
	getPreviewSize,
	showSettings,
	mouseOverVisualizer,
	getSpacingOptionOutput,
	getBorderStyle,
	setBlockDefaults,
	getUniqueId,
	getInQueryBlock,
} from '@base/helpers';

import './editor.scss';
import metadata from './block.json';
//import ResizeGridSection from './resize-grid-section';
/**
 * Import WordPress
 */
import { __ } from '@wordpress/i18n';

import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useState, Fragment } from '@wordpress/element';
import {
	BlockAlignmentToolbar,
	BlockVerticalAlignmentControl,
	BlockControls,
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import {
	ToggleControl,
	SelectControl,
	ToolbarGroup,
} from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';
import { BLEND_OPTIONS } from '../rowlayout/constants';
/**
 * Build the section edit.
 */
function SectionEdit( {
	attributes,
	setAttributes,
	isSelected,
	clientId,
	context,
	className,
} ) {
	const { id, topPadding, bottomPadding, leftPadding, rightPadding, topPaddingM, bottomPaddingM, leftPaddingM, rightPaddingM, topMargin, bottomMargin, topMarginM, bottomMarginM, leftMargin, rightMargin, leftMarginM, rightMarginM, topMarginT, bottomMarginT, leftMarginT, rightMarginT, topPaddingT, bottomPaddingT, leftPaddingT, rightPaddingT, backgroundOpacity, background, zIndex, border, borderWidth, borderOpacity, borderRadius, uniqueID, baseAnimation, baseAOSOptions, collapseOrder, backgroundImg, textAlign, textColor, linkColor, linkHoverColor, shadow, displayShadow, vsdesk, vstablet, vsmobile, paddingType, marginType, mobileBorderWidth, tabletBorderWidth, templateLock, baseBlockCSS, baseDynamic, direction, gutter, gutterUnit, verticalAlignment, justifyContent, backgroundImgHover, backgroundHover, borderHover, borderHoverWidth, borderHoverRadius, shadowHover, displayHoverShadow, tabletBorderHoverWidth, mobileBorderHoverWidth, textColorHover, linkColorHover, linkHoverColorHover, linkNoFollow, linkSponsored, link, linkTarget, linkTitle, wrapContent, heightUnit, height, maxWidth, maxWidthUnit, htmlTag, sticky, stickyOffset, stickyOffsetUnit, overlay, overlayHover, overlayImg, overlayImgHover, overlayOpacity, overlayHoverOpacity, align, padding, tabletPadding, mobilePadding, margin, tabletMargin, mobileMargin, backgroundType, backgroundHoverType, gradient, gradientHover, overlayType, overlayHoverType, overlayGradient, overlayGradientHover, borderRadiusUnit, borderHoverRadiusUnit, tabletBorderRadius, mobileBorderRadius, borderStyle, mobileBorderStyle, tabletBorderStyle, borderHoverStyle, tabletBorderHoverStyle, mobileBorderHoverStyle, tabletBorderHoverRadius, mobileBorderHoverRadius, inQueryBlock, hoverOverlayBlendMode, overlayBlendMode } = attributes;
	const getDynamic = () => {
		let contextPost = null;
		if ( context && ( context.queryId || Number.isFinite( context.queryId ) ) && context.postId ) {
			contextPost = context.postId;
		}
		if ( attributes.baseDynamic && attributes.baseDynamic['backgroundImg:0:bgImg'] && attributes.baseDynamic['backgroundImg:0:bgImg'].enable ) {
			applyFilters( 'base.dynamicBackground', '', attributes, setAttributes, 'backgroundImg:0:bgImg', contextPost );
		}
		if ( attributes.baseDynamic && attributes.baseDynamic['backgroundImgHover:0:bgImg'] && attributes.baseDynamic['backgroundImgHover:0:bgImg'].enable ) {
			applyFilters( 'base.dynamicBackground', '', attributes, setAttributes, 'backgroundImgHover:0:bgImg', contextPost );
		}
	}
	const { addUniqueID } = useDispatch( 'baseblocks/data' );
	const { isUniqueID, isUniqueBlock, previewDevice } = useSelect(
		( select ) => {
			return {
				isUniqueID: ( value ) => select( 'baseblocks/data' ).isUniqueID( value ),
				isUniqueBlock: ( value, clientId ) => select( 'baseblocks/data' ).isUniqueBlock( value, clientId ),
				previewDevice: select( 'baseblocks/data' ).getPreviewDeviceType(),
			};
		},
		[ clientId ]
	);

	useEffect( () => {
		setBlockDefaults( 'base/column', attributes);

		let uniqueId = getUniqueId( uniqueID, clientId, isUniqueID, isUniqueBlock );
		if ( uniqueId !== uniqueID ) {
			attributes.uniqueID = uniqueId;
			setAttributes( { uniqueID: uniqueId } );
			addUniqueID( uniqueId, clientId );
		} else {
			addUniqueID( uniqueID, clientId );
		}
		const isInQueryBlock = getInQueryBlock( context, inQueryBlock );
		if ( attributes.inQueryBlock !== isInQueryBlock ) {
			attributes.inQueryBlock = isInQueryBlock;
			setAttributes( { inQueryBlock: isInQueryBlock } );
		}

		// Update Old Styles
		if ( ( '' !== topPadding || '' !== rightPadding || '' !== bottomPadding || '' !== leftPadding ) ) {
			setAttributes( { padding: [ topPadding, rightPadding, bottomPadding, leftPadding ], topPadding:'', rightPadding:'', bottomPadding:'', leftPadding:'' } );
		}
		if ( ( '' !== topPaddingT || '' !== rightPaddingT || '' !== bottomPaddingT || '' !== leftPaddingT ) ) {
			setAttributes( { tabletPadding: [ topPaddingT, rightPaddingT, bottomPaddingT, leftPaddingT ], topPaddingT:'', rightPaddingT:'', bottomPaddingT:'',leftPaddingT:'' } );
		}
		if ( ( '' !== topPaddingM || '' !== rightPaddingM || '' !== bottomPaddingM || '' !== leftPaddingM ) ) {
			setAttributes( { mobilePadding: [ topPaddingM, rightPaddingM, bottomPaddingM, leftPaddingM ], topPaddingM:'', rightPaddingM:'', bottomPaddingM:'',leftPaddingM:'' } );
		}
		if ( ( '' !== topMargin || '' !== rightMargin || '' !== bottomMargin || '' !== leftMargin ) ) {
			setAttributes( { margin: [ topMargin, rightMargin, bottomMargin, leftMargin ], topMargin:'', rightMargin:'', bottomMargin:'', leftMargin:'' } );
		}
		if ( ( '' !== topMarginT || '' !== rightMarginT || '' !== bottomMarginT || '' !== leftMarginT ) ) {
			setAttributes( { tabletMargin: [ topMarginT, rightMarginT, bottomMarginT, leftMarginT ], topMarginT:'', rightMarginT:'', bottomMarginT:'',leftMarginT:'' } );
		}
		if ( ( '' !== topMarginM || '' !== rightMarginM || '' !== bottomMarginM || '' !== leftMarginM ) ) {
			setAttributes( { mobileMargin: [ topMarginM, rightMarginM, bottomMarginM, leftMarginM ], topMarginM:'', rightMarginM:'', bottomMarginM:'',leftMarginM:'' } );
		}
		// Update from old border settings.
		let tempBorderStyle = JSON.parse( JSON.stringify( attributes.borderStyle ? attributes.borderStyle : [{
			top: [ '', '', '' ],
			right: [ '', '', '' ],
			bottom: [ '', '', '' ],
			left: [ '', '', '' ],
			unit: 'px'
		  }] ) );
		let updateBorderStyle = false;
		if ( ( '' !== border ) ) {
			tempBorderStyle[0].top[0] = border;
			tempBorderStyle[0].right[0] = border;
			tempBorderStyle[0].bottom[0] = border;
			tempBorderStyle[0].left[0] = border;
			updateBorderStyle = true;
			setAttributes( { border: '' } );
		}
		if ( ( '' !== borderWidth?.[0] || '' !== borderWidth?.[1] || '' !== borderWidth?.[2] || '' !== borderWidth?.[3] ) ) {
			tempBorderStyle[0].top[2] = borderWidth?.[0] || '';
			tempBorderStyle[0].right[2] = borderWidth?.[1] || '';
			tempBorderStyle[0].bottom[2] = borderWidth?.[2] || '';
			tempBorderStyle[0].left[2] = borderWidth?.[3] || '';
			updateBorderStyle = true;
			setAttributes( { borderWidth:[ '', '', '', '' ] } );
		}
		if ( updateBorderStyle ) {
			setAttributes( { borderStyle: tempBorderStyle } );
		}
		let tempBorderHoverStyle = JSON.parse(JSON.stringify( attributes.borderHoverStyle ? attributes.borderHoverStyle : [{
			top: [ '', '', '' ],
			right: [ '', '', '' ],
			bottom: [ '', '', '' ],
			left: [ '', '', '' ],
			unit: 'px'
		  }] ));
		let updateBorderHoverStyle = false;
		if ( ( '' !== borderHover ) ) {
			tempBorderHoverStyle[0].top[0] = borderHover;
			tempBorderHoverStyle[0].right[0] = borderHover;
			tempBorderHoverStyle[0].bottom[0] = borderHover;
			tempBorderHoverStyle[0].left[0] = borderHover;
			updateBorderHoverStyle = true;
			setAttributes( { borderHover:'' } );
		}
		if ( ( '' !== borderHoverWidth?.[0] || '' !== borderHoverWidth?.[1] || '' !== borderHoverWidth?.[2] || '' !== borderHoverWidth?.[3] ) ) {
			tempBorderHoverStyle[0].top[2] = borderHoverWidth?.[0] || '';
			tempBorderHoverStyle[0].right[2] = borderHoverWidth?.[1] || '';
			tempBorderHoverStyle[0].bottom[2] = borderHoverWidth?.[2] || '';
			tempBorderHoverStyle[0].left[2] = borderHoverWidth?.[3] || '';
			updateBorderHoverStyle = true;
			setAttributes( { borderHoverWidth:[ '', '', '', '' ] } );
		}
		if ( updateBorderHoverStyle ) {
			setAttributes( { borderHoverStyle: tempBorderHoverStyle } );
		}
		let tempTabBorderStyle = JSON.parse( JSON.stringify( attributes.tabletBorderStyle ? attributes.tabletBorderStyle : [{
			top: [ '', '', '' ],
			right: [ '', '', '' ],
			bottom: [ '', '', '' ],
			left: [ '', '', '' ],
			unit: 'px'
		  }] ) );
		if ( ( '' !== tabletBorderWidth?.[0] || '' !== tabletBorderWidth?.[1] || '' !== tabletBorderWidth?.[2] || '' !== tabletBorderWidth?.[3] ) ) {
			tempTabBorderStyle[0].top[2] = tabletBorderWidth?.[0] || '';
			tempTabBorderStyle[0].right[2] = tabletBorderWidth?.[1] || '';
			tempTabBorderStyle[0].bottom[2] = tabletBorderWidth?.[2] || '';
			tempTabBorderStyle[0].left[2] = tabletBorderWidth?.[3] || '';
			const tempTabBorderWidth = JSON.parse(JSON.stringify(tempTabBorderStyle));
			setAttributes( { tabletBorderStyle: tempTabBorderWidth, tabletBorderWidth:[ '', '', '', '' ] } );
		}
		let tempTabBorderHoverStyle = JSON.parse( JSON.stringify( attributes.tabletBorderHoverStyle ? attributes.tabletBorderHoverStyle : [{
			top: [ '', '', '' ],
			right: [ '', '', '' ],
			bottom: [ '', '', '' ],
			left: [ '', '', '' ],
			unit: 'px'
		  }] ) );
		if ( ( '' !== tabletBorderHoverWidth?.[0] || '' !== tabletBorderHoverWidth?.[1] || '' !== tabletBorderHoverWidth?.[2] || '' !== tabletBorderHoverWidth?.[3] ) ) {
			tempTabBorderHoverStyle[0].top[2] = tabletBorderHoverWidth?.[0] || '';
			tempTabBorderHoverStyle[0].right[2] = tabletBorderHoverWidth?.[1] || '';
			tempTabBorderHoverStyle[0].bottom[2] = tabletBorderHoverWidth?.[2] || '';
			tempTabBorderHoverStyle[0].left[2] = tabletBorderHoverWidth?.[3] || '';
			const tempTabBorderHoverWidth = JSON.parse(JSON.stringify(tempTabBorderHoverStyle));
			setAttributes( { tabletBorderHoverStyle: tempTabBorderHoverWidth, tabletBorderHoverWidth:[ '', '', '', '' ] } );
		}
		let tempMobileBorderStyle = JSON.parse( JSON.stringify( attributes.mobileBorderStyle ? attributes.mobileBorderStyle : [{
			top: [ '', '', '' ],
			right: [ '', '', '' ],
			bottom: [ '', '', '' ],
			left: [ '', '', '' ],
			unit: 'px'
		  }] ) );
		if ( ( '' !== mobileBorderWidth?.[0] || '' !== mobileBorderWidth?.[1] || '' !== mobileBorderWidth?.[2] || '' !== mobileBorderWidth?.[3] ) ) {
			tempMobileBorderStyle[0].top[2] = mobileBorderWidth?.[0] || '';
			tempMobileBorderStyle[0].right[2] = mobileBorderWidth?.[1] || '';
			tempMobileBorderStyle[0].bottom[2] = mobileBorderWidth?.[2] || '';
			tempMobileBorderStyle[0].left[2] = mobileBorderWidth?.[3] || '';
			setAttributes( { mobileBorderStyle: tempMobileBorderStyle, mobileBorderWidth:[ '', '', '', '' ] } );
		}
		let tempMobileBorderHoverStyle = JSON.parse( JSON.stringify( attributes.mobileBorderHoverStyle ? attributes.mobileBorderHoverStyle : [{
			top: [ '', '', '' ],
			right: [ '', '', '' ],
			bottom: [ '', '', '' ],
			left: [ '', '', '' ],
			unit: 'px'
		  }] ) );
		if ( ( '' !== mobileBorderHoverWidth?.[0] || '' !== mobileBorderHoverWidth?.[1] || '' !== mobileBorderHoverWidth?.[2] || '' !== mobileBorderHoverWidth?.[3] ) ) {
			tempMobileBorderHoverStyle[0].top[2] = mobileBorderHoverWidth?.[0] || '';
			tempMobileBorderHoverStyle[0].right[2] = mobileBorderHoverWidth?.[1] || '';
			tempMobileBorderHoverStyle[0].bottom[2] = mobileBorderHoverWidth?.[2] || '';
			tempMobileBorderHoverStyle[0].left[2] = mobileBorderHoverWidth?.[3] || '';
			const tempMobileBorderHoverWidth = JSON.parse(JSON.stringify(tempMobileBorderHoverStyle));
			setAttributes( { mobileBorderHoverStyle: tempMobileBorderHoverWidth, mobileBorderWidth:[ '', '', '', '' ] } );
		}
		debounce( getDynamic, 200 );
	}, [] );
	const { hasInnerBlocks, inRowBlock } = useSelect(
		( select ) => {
			const { getBlock, getBlockRootClientId, getBlocksByClientId } = select( blockEditorStore );
			const block = getBlock( clientId );
			const rootID = getBlockRootClientId( clientId );
			let inRowBlock = false;
			if ( rootID ) {
				const parentBlock = getBlocksByClientId( rootID );
				inRowBlock = ( undefined !== parentBlock && undefined !== parentBlock[0] && undefined !== parentBlock[0].name && parentBlock[0].name === 'base/rowlayout' ? true : false );
			}
			return {
				inRowBlock: inRowBlock,
				hasInnerBlocks: !! ( block && block.innerBlocks.length ),
			};
		},
		[ clientId ]
	);
	const [ activeTab, setActiveTab ] = useState( 'general' );
	const paddingMouseOver = mouseOverVisualizer();
	const marginMouseOver = mouseOverVisualizer();
	const saveShadow = ( value ) => {
		const newUpdate = shadow.map( ( item, index ) => {
			if ( 0 === index ) {
				item = { ...item, ...value };
			}
			return item;
		} );
		setAttributes( {
			shadow: newUpdate,
		} );
	};
	const saveShadowHover = ( value ) => {
		const newItems = shadowHover.map( ( item, thisIndex ) => {
			if ( 0 === thisIndex ) {
				item = { ...item, ...value };
			}

			return item;
		} );
		setAttributes( {
			shadowHover: newItems,
		} );
	}
	const saveBackgroundImage = ( value ) => {
		const newUpdate = backgroundImg.map( ( item, index ) => {
			if ( 0 === index ) {
				item = { ...item, ...value };
			}
			return item;
		} );
		setAttributes( {
			backgroundImg: newUpdate,
		} );
	};
	const saveHoverBackgroundImage = ( value ) => {
		const newUpdate = backgroundImgHover.map( ( item, index ) => {
			if ( 0 === index ) {
				item = { ...item, ...value };
			}
			return item;
		} );
		setAttributes( {
			backgroundImgHover: newUpdate,
		} );
	};
	const onRemoveBGImage = () => {
		saveBackgroundImage( {
			bgImgID: '',
			bgImg: '',
		} );
	};
	const onRemoveHoverBGImage = () => {
		saveHoverBackgroundImage( {
			bgImgID: '',
			bgImg: '',
		} );
	};
	const saveOverlayImage = ( value ) => {
		const newUpdate = overlayImg.map( ( item, index ) => {
			if ( 0 === index ) {
				item = { ...item, ...value };
			}
			return item;
		} );
		setAttributes( {
			overlayImg: newUpdate,
		} );
	};
	const saveHoverOverlayImage = ( value ) => {
		const newUpdate = overlayImgHover.map( ( item, index ) => {
			if ( 0 === index ) {
				item = { ...item, ...value };
			}
			return item;
		} );
		setAttributes( {
			overlayImgHover: newUpdate,
		} );
	};
	const onRemoveOverlayImage = () => {
		saveOverlayImage( {
			bgImgID: '',
			bgImg: '',
		} );
	};
	const onRemoveHoverOverlayImage = () => {
		saveHoverOverlayImage( {
			bgImgID: '',
			bgImg: '',
		} );
	};
	const gutterMax = ( gutterUnit !== 'px' ? 12 : 200 );
	const gutterStep = ( gutterUnit !== 'px' ? 0.1 : 1 );
	const previewPaddingType = ( undefined !== paddingType ? paddingType : 'px' );
	const previewMarginType = ( undefined !== marginType ? marginType : 'px' );
	// Margin
	const previewMarginTop = getPreviewSize( previewDevice, ( undefined !== margin ? margin[0] : '' ), ( undefined !== tabletMargin ? tabletMargin[ 0 ] : '' ), ( undefined !== mobileMargin ? mobileMargin[0] : '' ) );
	const previewMarginRight = getPreviewSize( previewDevice, ( undefined !== margin && undefined !== margin[1] && '' !== margin[1] ? margin[1] : '' ), ( undefined !== tabletMargin ? tabletMargin[ 1 ] : '' ), ( undefined !== mobileMargin ? mobileMargin[1] : '' ) );
	const previewMarginBottom = getPreviewSize( previewDevice, ( undefined !== margin ? margin[2] : '' ), ( undefined !== tabletMargin ? tabletMargin[ 2] : '' ), ( undefined !== mobileMargin ? mobileMargin[2] : '' ) );
	const previewMarginLeft = getPreviewSize( previewDevice, ( undefined !== margin && undefined !== margin[3] && '' !== margin[3] ? ( margin[3] ) : '' ), ( undefined !== tabletMargin ? tabletMargin[ 3 ] : '' ), ( undefined !== mobileMargin ? mobileMargin[3] : '' ) );

	const previewPaddingTop = getPreviewSize( previewDevice, ( undefined !== padding ? padding[0] : '' ), ( undefined !== tabletPadding ? tabletPadding[ 0 ] : '' ), ( undefined !== mobilePadding ? mobilePadding[0] : '' ) );
	const previewPaddingRight = getPreviewSize( previewDevice, ( undefined !== padding && undefined !== padding[1] && '' !== padding[1] ? padding[1] : '' ), ( undefined !== tabletPadding ? tabletPadding[ 1 ] : '' ), ( undefined !== mobilePadding ? mobilePadding[1] : '' ) );
	const previewPaddingBottom = getPreviewSize( previewDevice, ( undefined !== padding ? padding[2] : '' ), ( undefined !== tabletPadding ? tabletPadding[ 2] : '' ), ( undefined !== mobilePadding ? mobilePadding[2] : '' ) );
	const previewPaddingLeft = getPreviewSize( previewDevice, ( undefined !== padding && undefined !== padding[3] && '' !== padding[3] ? ( padding[3] ) : '' ), ( undefined !== tabletPadding ? tabletPadding[ 3 ] : '' ), ( undefined !== mobilePadding ? mobilePadding[3] : '' ) );
	// Border.
	const previewBorderTopStyle = getBorderStyle( previewDevice, 'top', borderStyle, tabletBorderStyle, mobileBorderStyle );
	const previewBorderRightStyle = getBorderStyle( previewDevice, 'right', borderStyle, tabletBorderStyle, mobileBorderStyle );
	const previewBorderBottomStyle = getBorderStyle( previewDevice, 'bottom', borderStyle, tabletBorderStyle, mobileBorderStyle );
	const previewBorderLeftStyle = getBorderStyle( previewDevice, 'left', borderStyle, tabletBorderStyle, mobileBorderStyle );
	const previewRadiusTop = getPreviewSize( previewDevice, ( undefined !== borderRadius ? borderRadius[ 0 ] : '' ), ( undefined !== tabletBorderRadius ? tabletBorderRadius[ 0 ] : '' ), ( undefined !== mobileBorderRadius ? mobileBorderRadius[ 0 ] : '' ) );
	const previewRadiusRight = getPreviewSize( previewDevice, ( undefined !== borderRadius ? borderRadius[ 1 ] : '' ), ( undefined !== tabletBorderRadius ? tabletBorderRadius[ 1 ] : '' ), ( undefined !== mobileBorderRadius ? mobileBorderRadius[ 1 ] : '' ) );
	const previewRadiusBottom = getPreviewSize( previewDevice, ( undefined !== borderRadius ? borderRadius[ 2 ] : '' ), ( undefined !== tabletBorderRadius ? tabletBorderRadius[ 2 ] : '' ), ( undefined !== mobileBorderRadius ? mobileBorderRadius[ 2 ] : '' ) );
	const previewRadiusLeft = getPreviewSize( previewDevice, ( undefined !== borderRadius ? borderRadius[ 3 ] : '' ), ( undefined !== tabletBorderRadius ? tabletBorderRadius[ 3 ] : '' ), ( undefined !== mobileBorderRadius ? mobileBorderRadius[ 3 ] : '' ) );
	// Hover Border
	const previewBorderHoverTopStyle = getBorderStyle( previewDevice, 'top', borderHoverStyle, tabletBorderHoverStyle, mobileBorderHoverStyle );
	const previewBorderHoverRightStyle = getBorderStyle( previewDevice, 'right', borderHoverStyle, tabletBorderHoverStyle, mobileBorderHoverStyle );
	const previewBorderHoverBottomStyle = getBorderStyle( previewDevice, 'bottom', borderHoverStyle, tabletBorderHoverStyle, mobileBorderHoverStyle );
	const previewBorderHoverLeftStyle = getBorderStyle( previewDevice, 'left', borderHoverStyle, tabletBorderHoverStyle, mobileBorderHoverStyle );
	const previewHoverRadiusTop = getPreviewSize( previewDevice, ( undefined !== borderHoverRadius ? borderHoverRadius[ 0 ] : '' ), ( undefined !== tabletBorderHoverRadius ? tabletBorderHoverRadius[ 0 ] : '' ), ( undefined !== mobileBorderHoverRadius ? mobileBorderHoverRadius[ 0 ] : '' ) );
	const previewHoverRadiusRight = getPreviewSize( previewDevice, ( undefined !== borderHoverRadius ? borderHoverRadius[ 1 ] : '' ), ( undefined !== tabletBorderHoverRadius ? tabletBorderHoverRadius[ 1 ] : '' ), ( undefined !== mobileBorderHoverRadius ? mobileBorderHoverRadius[ 1 ] : '' ) );
	const previewHoverRadiusBottom = getPreviewSize( previewDevice, ( undefined !== borderHoverRadius ? borderHoverRadius[ 2 ] : '' ), ( undefined !== tabletBorderHoverRadius ? tabletBorderHoverRadius[ 2 ] : '' ), ( undefined !== mobileBorderHoverRadius ? mobileBorderHoverRadius[ 2 ] : '' ) );
	const previewHoverRadiusLeft = getPreviewSize( previewDevice, ( undefined !== borderHoverRadius ? borderHoverRadius[ 3 ] : '' ), ( undefined !== tabletBorderHoverRadius ? tabletBorderHoverRadius[ 3 ] : '' ), ( undefined !== mobileBorderHoverRadius ? mobileBorderHoverRadius[ 3 ] : '' ) );

	const previewAlign = getPreviewSize( previewDevice, ( textAlign && textAlign[ 0 ] ? textAlign[ 0 ] : '' ) , ( textAlign && textAlign[ 1 ] ? textAlign[ 1 ] : '' ), ( textAlign && textAlign[ 2 ] ? textAlign[ 2 ] : '' ) );
	const previewGutter = getPreviewSize( previewDevice, ( gutter && '' !== gutter[ 0 ] ? gutter[ 0 ] : '' ) , ( gutter && '' !== gutter[ 1 ] ? gutter[ 1 ] : '' ), ( gutter && '' !== gutter[ 2 ] ? gutter[ 2 ] : '' ) );
	const previewDirection = getPreviewSize( previewDevice, ( direction && '' !== direction[ 0 ] ? direction[ 0 ] : '' ) , ( direction && '' !== direction[ 1 ] ? direction[ 1 ] : '' ), ( direction && '' !== direction[ 2 ] ? direction[ 2 ] : '' ) );
	const previewJustify = getPreviewSize( previewDevice, ( justifyContent && '' !== justifyContent[ 0 ] ? justifyContent[ 0 ] : '' ) , ( justifyContent && '' !== justifyContent[ 1 ] ? justifyContent[ 1 ] : '' ), ( justifyContent && '' !== justifyContent[ 2 ] ? justifyContent[ 2 ] : '' ) );
	const previewWrap = getPreviewSize( previewDevice, ( wrapContent && '' !== wrapContent[ 0 ] ? wrapContent[ 0 ] : '' ) , ( wrapContent && '' !== wrapContent[ 1 ] ? wrapContent[ 1 ] : '' ), ( wrapContent && '' !== wrapContent[ 2 ] ? wrapContent[ 2 ] : '' ) );
	const backgroundString = ( background ? BaseColorOutput( background, backgroundOpacity ) : undefined );

	const previewMaxWidth = getPreviewSize( previewDevice, ( maxWidth && maxWidth[ 0 ] ? maxWidth[ 0 ] : '' ) , ( maxWidth && maxWidth[ 1 ] ? maxWidth[ 1 ] : '' ), ( maxWidth && maxWidth[ 2 ] ? maxWidth[ 2 ] : '' ) );
	const previewMinHeight = getPreviewSize( previewDevice, ( height && '' !== height[ 0 ] ? height[ 0 ] : '' ) , ( height && '' !== height[ 1 ] ? height[ 1 ] : '' ), ( height && '' !== height[ 2 ] ? height[ 2 ] : '' ) );
	const previewStickyOffset = getPreviewSize( previewDevice, ( stickyOffset && stickyOffset[ 0 ] ? stickyOffset[ 0 ] : '' ) , ( stickyOffset && stickyOffset[ 1 ] ? stickyOffset[ 1 ] : '' ), ( stickyOffset && stickyOffset[ 2 ] ? stickyOffset[ 2 ] : '' ) );
	const previewMinHeightUnit = ( heightUnit ? heightUnit : 'px' );
	const previewMaxWidthUnit = ( maxWidthUnit ? maxWidthUnit : 'px' );
	const previewStickyOffsetUnit = ( stickyOffsetUnit ? stickyOffsetUnit : 'px' );
	const classes = classnames( {
		[ className ]: className,
		'base-column': true,
		[ `inner-column-${ id }` ]: id,
		[ `base-column-${ uniqueID }` ]: uniqueID,
		[ `base-section-sticky` ]: ( sticky !== undefined ? sticky : false ),
		'kvs-lg-false': vsdesk !== 'undefined' && vsdesk,
		'kvs-md-false': vstablet !== 'undefined' && vstablet,
		'kvs-sm-false': vsmobile !== 'undefined' && vsmobile,
	} );
	const hasBackgroundImage = ( backgroundImg && backgroundImg[ 0 ] && backgroundImg[ 0 ].bgImg ? true : false );
	const previewBackgroundImg = hasBackgroundImage ? `url( ${ backgroundImg[ 0 ].bgImg } )` : '';
	const previewBackground = backgroundType === 'gradient' ? gradient : previewBackgroundImg;
	const hasHoverBackgroundImage = ( backgroundImgHover && backgroundImgHover[ 0 ] && backgroundImgHover[ 0 ].bgImg ? true : false );
	const previewHoverBackgroundImg = hasHoverBackgroundImage ? `url( ${ backgroundImgHover[ 0 ].bgImg } )` : '';
	const previewHoverBackground = backgroundHoverType === 'gradient' ? gradientHover : previewHoverBackgroundImg;
	const hasOverlayImage = ( overlayImg && overlayImg[ 0 ] && overlayImg[ 0 ].bgImg ? true : false );
	const previewOverlayImg = hasOverlayImage ? `url( ${ overlayImg[ 0 ].bgImg } )` : '';
	const previewOverlay = overlayType === 'gradient' ? overlayGradient : previewOverlayImg;
	const hasHoverOverlayImage = ( overlayImgHover && overlayImgHover[ 0 ] && overlayImgHover[ 0 ].bgImg ? true : false );
	const previewHoverOverlayImg = hasHoverOverlayImage ? `url( ${ overlayImgHover[ 0 ].bgImg } )` : '';
	const previewHoverOverlay = overlayHoverType === 'gradient' ? overlayGradientHover : previewHoverOverlayImg;
	const nonTransAttrs = [ 'images', 'imagesDynamic' ];
	const innerClasses = classnames( {
		'base-inner-column-inner': true,
		'aos-animate': true,
		'bst-animation-wrap': true,
		'bsb-section-only-appender': ! hasInnerBlocks,
		[ `base-inner-column-direction-${ ( previewDirection ? previewDirection : 'vertical' ) }` ]: true,
		[ `base-inner-column-text-align-${ ( previewAlign ? previewAlign : 'normal' ) }` ]: true,
		[ `base-inner-column-vertical-align-${ ( verticalAlignment ? verticalAlignment : 'inherit' ) }` ]: true,
	} );
	const blockProps = useBlockProps( {
		className: classes,
		style: {
			top: ( sticky && undefined !== previewStickyOffset ? previewStickyOffset + previewStickyOffsetUnit : undefined ),
		},
		'data-align': ( ! inRowBlock && ( 'full' === align || 'wide' === align ) ? align : undefined ),
		'data-vertical-align': ( 'top' === verticalAlignment || 'middle' === verticalAlignment || 'bottom' === verticalAlignment ? verticalAlignment : undefined ),
	} );
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: innerClasses,
		},
		{
			orientation: ( direction && direction[ 0 ] ? direction[ 0 ] : 'vertical' ),
			templateLock: ( templateLock ? templateLock : false ),
			renderAppender: hasInnerBlocks
				? undefined
				: InnerBlocks.ButtonBlockAppender,
		}
	);
	const previewVerticalAlign = ( verticalAlignment ? verticalAlignment : ( direction && direction[ 0 ] && direction[ 0 ] === 'horizontal' ? 'middle' : 'top' ) );
	return (
		<div { ...blockProps }>
			<style>
			{ ( overlayOpacity !== undefined && overlayOpacity !== '' ? `.base-column-${ uniqueID } > .base-inner-column-inner:before { opacity: ${ overlayOpacity } }` : '' ) }
				{ ( overlay ? `.base-column-${ uniqueID } > .base-inner-column-inner:before { background-color: ${ BaseColorOutput( overlay ) }; }` : '' ) }
				{ ( overlayBlendMode ? `.base-column-${ uniqueID } > .base-inner-column-inner:before { mix-blend-mode: ${overlayBlendMode}; }` : '' ) }
				{ ( previewOverlay ? `.base-column-${ uniqueID } > .base-inner-column-inner:before { background-image:${ previewOverlay }; }` : '' ) }
				{ ( hasOverlayImage && overlayImg[ 0 ].bgImgPosition ? `.base-column-${ uniqueID } > .base-inner-column-inner:before { background-position:${ overlayImg[ 0 ].bgImgPosition }; }` : '' ) }
				{ ( hasOverlayImage && overlayImg[ 0 ].bgImgSize ? `.base-column-${ uniqueID } > .base-inner-column-inner:before { background-size:${ overlayImg[ 0 ].bgImgSize }; }` : '' ) }
				{ ( hasOverlayImage && overlayImg[ 0 ].bgImgRepeat ? `.base-column-${ uniqueID } > .base-inner-column-inner:before { background-repeat:${ overlayImg[ 0 ].bgImgRepeat }; }` : '' ) }
				{ ( hasOverlayImage && overlayImg[ 0 ].bgImgAttachment ? `.base-column-${ uniqueID } > .base-inner-column-inner:before { background-attachment:${ overlayImg[ 0 ].bgImgAttachment }; }` : '' ) }

				{ ( previewRadiusTop ? `.base-column-${ uniqueID } > .base-inner-column-inner:before { border-top-left-radius:${ previewRadiusTop + ( borderRadiusUnit ? borderRadiusUnit : 'px' )  }; }` : '' ) }
				{ ( previewRadiusRight ? `.base-column-${ uniqueID } > .base-inner-column-inner:before { border-top-right-radius:${ previewRadiusRight + ( borderRadiusUnit ? borderRadiusUnit : 'px' )  }; }` : '' ) }
				{ ( previewRadiusBottom ? `.base-column-${ uniqueID } > .base-inner-column-inner:before { border-bottom-right-radius:${ previewRadiusBottom + ( borderRadiusUnit ? borderRadiusUnit : 'px' )  }; }` : '' ) }
				{ ( previewRadiusLeft ? `.base-column-${ uniqueID } > .base-inner-column-inner:before { border-bottom-left-radius:${ previewRadiusLeft + ( borderRadiusUnit ? borderRadiusUnit : 'px' )  }; }` : '' ) }

				{ ( overlayHoverOpacity !== undefined && overlayHoverOpacity !== '' ? `.base-column-${ uniqueID }:hover > .base-inner-column-inner:before { opacity: ${ overlayHoverOpacity } }` : '' ) }
				{ ( overlayHover ? `.base-column-${ uniqueID }:hover > .base-inner-column-inner:before { background-color: ${ BaseColorOutput( overlayHover ) }; ; }` : '' ) }
				{ ( hoverOverlayBlendMode ? `.base-column-${ uniqueID }:hover > .base-inner-column-inner:before { mix-blend-mode: ${hoverOverlayBlendMode} !important; }` : '' ) }
				{ ( previewHoverOverlay ? `.base-column-${ uniqueID }:hover > .base-inner-column-inner:before { background-image:${ previewHoverOverlay }; }` : '' ) }
				{ ( ! previewHoverOverlay && overlayHover ? `.base-column-${ uniqueID }:hover .base-inner-column-inner:before { background-image:none; }` : '' ) }
				{ ( hasHoverOverlayImage && overlayImgHover[ 0 ].bgImgPosition ? `.base-column-${ uniqueID }:hover > .base-inner-column-inner:before { background-position:${ overlayImgHover[ 0 ].bgImgPosition }; }` : '' ) }
				{ ( hasHoverOverlayImage && overlayImgHover[ 0 ].bgImgSize ? `.base-column-${ uniqueID }:hover > .base-inner-column-inner:before { background-size:${ overlayImgHover[ 0 ].bgImgSize }; }` : '' ) }
				{ ( hasHoverOverlayImage && overlayImgHover[ 0 ].bgImgRepeat ? `.base-column-${ uniqueID }:hover > .base-inner-column-inner:before { background-repeat:${ overlayImgHover[ 0 ].bgImgRepeat }; }` : '' ) }
				{ ( hasHoverOverlayImage && overlayImgHover[ 0 ].bgImgAttachment ? `.base-column-${ uniqueID }:hover > .base-inner-column-inner:before { background-attachment:${ overlayImgHover[ 0 ].bgImgAttachment }; }` : '' ) }

				{ ( previewHoverRadiusTop ? `.base-column-${ uniqueID }:hover > .base-inner-column-inner:before { border-top-left-radius:${ previewHoverRadiusTop + ( borderHoverRadiusUnit ? borderHoverRadiusUnit : 'px' ) } !important; }` : '' ) }
				{ ( previewHoverRadiusRight ? `.base-column-${ uniqueID }:hover > .base-inner-column-inner:before { border-top-right-radius:${ previewHoverRadiusRight + ( borderHoverRadiusUnit ? borderHoverRadiusUnit : 'px' ) } !important; }` : '' ) }
				{ ( previewHoverRadiusBottom ? `.base-column-${ uniqueID }:hover > .base-inner-column-inner:before { border-bottom-right-radius:${ previewHoverRadiusBottom + ( borderHoverRadiusUnit ? borderHoverRadiusUnit : 'px' ) } !important; }` : '' ) }
				{ (  previewHoverRadiusLeft ? `.base-column-${ uniqueID }:hover > .base-inner-column-inner:before { border-bottom-left-radius:${  previewHoverRadiusLeft + ( borderHoverRadiusUnit ? borderHoverRadiusUnit : 'px' ) } !important; }` : '' ) }

				{ ( previewMaxWidth ? `.base-column-${ uniqueID } > .base-inner-column-inner { max-width:${ previewMaxWidth + previewMaxWidthUnit }; margin-left: auto; margin-right:auto; }` : '' ) }
				{ ( previewMaxWidth ? `.wp-block-base-column > .base-inner-column-direction-horizontal > .wp-block-base-column.base-column-${ uniqueID } > .base-inner-column-inner { max-width:100%; margin-left: unset; margin-right:unset; }` : '' ) }
				{ ( previewMaxWidth ? `.wp-block-base-column > .base-inner-column-direction-horizontal > .wp-block-base-column.base-column-${ uniqueID } { flex: 0 1 ${ previewMaxWidth + previewMaxWidthUnit }; }` : '' ) }
				{ ( ( undefined !== zIndex && '' !== zIndex ) ? `.base-column-${ uniqueID } { z-index: ${ zIndex }; }` : '' ) }
				{ ( textColor ? `.base-column-${ uniqueID }, .base-column-${ uniqueID } .bst-svg-icon-list-item-wrap, .base-column-${ uniqueID } p, .base-column-${ uniqueID } h1, .base-column-${ uniqueID } h1.base-advancedheading-text, .base-column-${ uniqueID } h2, .base-column-${ uniqueID } h2.base-advancedheading-text, .base-column-${ uniqueID } h3, .base-column-${ uniqueID } h3.base-advancedheading-text, .base-column-${ uniqueID } h4, .base-column-${ uniqueID } h4.base-advancedheading-text, .base-column-${ uniqueID } h5, .base-column-${ uniqueID } h5.base-advancedheading-text, .base-column-${ uniqueID } h6, .base-column-${ uniqueID } h6.base-advancedheading-text { color: ${ BaseColorOutput( textColor ) }; }` : '' ) }
				{ ( linkColor ? `.base-column-${ uniqueID } a { color: ${ BaseColorOutput( linkColor ) }; }` : '' ) }
				{ ( linkHoverColor ? `.base-column-${ uniqueID } a:hover { color: ${ BaseColorOutput( linkHoverColor ) }; }` : '' ) }
				{ ( '' !== previewGutter ? `.base-column-${ uniqueID } > .base-inner-column-direction-horizontal { gap: ${ previewGutter + ( gutterUnit ? gutterUnit : 'px' )}; }` : '' ) }
				{ ( previewJustify ? `.base-column-${ uniqueID } > .base-inner-column-direction-horizontal { justify-content: ${ previewJustify }; }` : '' ) }
				{ ( previewWrap ? `.base-column-${ uniqueID } > .base-inner-column-direction-horizontal { flex-wrap: ${ previewWrap }; }` : '' ) }
				{ ( previewJustify && ( 'space-around' == previewJustify || 'space-between' == previewJustify || 'space-evenly' == previewJustify ) ? `.base-column-${ uniqueID } > .base-inner-column-direction-horizontal > .block-list-appender { display:none; }` : '' ) }
				{ ( textColorHover ? `.base-column-${ uniqueID }:hover, .base-column-${ uniqueID }:hover .bst-svg-icon-list-item-wrap, .base-column-${ uniqueID }:hover p, .base-column-${ uniqueID }:hover h1, .base-column-${ uniqueID }:hover h2, .base-column-${ uniqueID }:hover h3, .base-column-${ uniqueID }:hover h4, .base-column-${ uniqueID }:hover h5, .base-column-${ uniqueID }:hover h6 { color: ${ BaseColorOutput( textColorHover ) }; }` : '' ) }
				{ ( linkColorHover ? `.base-column-${ uniqueID }:hover a { color: ${ BaseColorOutput( linkColorHover ) }; }` : '' ) }
				{ ( linkHoverColorHover ? `.base-column-${ uniqueID }:hover a:hover { color: ${ BaseColorOutput( linkHoverColorHover ) }; }` : '' ) }
				{ ( backgroundHover ? `.base-column-${ uniqueID }:hover .base-inner-column-inner { background-color: ${ BaseColorOutput( backgroundHover ) }!important; }` : '' ) }
				{ ( previewHoverBackground ? `.base-column-${ uniqueID }:hover .base-inner-column-inner { background-image:${ previewHoverBackground } !important; }` : '' ) }
				{ ( ! previewHoverBackground && backgroundHover ? `.base-column-${ uniqueID }:hover .base-inner-column-inner { background-image:none!important; }` : '' ) }
				{ ( hasHoverBackgroundImage && backgroundImgHover[ 0 ].bgImgPosition ? `.base-column-${ uniqueID } > .base-inner-column-inner:hover { background-position:${ backgroundImgHover[ 0 ].bgImgPosition } !important; }` : '' ) }
				{ ( hasHoverBackgroundImage && backgroundImgHover[ 0 ].bgImgSize ? `.base-column-${ uniqueID } > .base-inner-column-inner:hover { background-size:${ backgroundImgHover[ 0 ].bgImgSize } !important; }` : '' ) }
				{ ( hasHoverBackgroundImage && backgroundImgHover[ 0 ].bgImgRepeat ? `.base-column-${ uniqueID } > .base-inner-column-inner:hover { background-repeat:${ backgroundImgHover[ 0 ].bgImgRepeat } !important; }` : '' ) }
				{ ( hasHoverBackgroundImage && backgroundImgHover[ 0 ].bgImgAttachment ? `.base-column-${ uniqueID } > .base-inner-column-inner:hover { background-attachment:${ backgroundImgHover[ 0 ].bgImgAttachment } !important; }` : '' ) }
				{ ( previewBorderHoverTopStyle ? `.base-column-${ uniqueID } > .base-inner-column-inner:hover { border-top:${ previewBorderHoverTopStyle } !important; }` : '' ) }
				{ ( previewBorderHoverRightStyle ? `.base-column-${ uniqueID } > .base-inner-column-inner:hover { border-right:${ previewBorderHoverRightStyle } !important; }` : '' ) }
				{ ( previewBorderHoverBottomStyle ? `.base-column-${ uniqueID } > .base-inner-column-inner:hover { border-bottom:${ previewBorderHoverBottomStyle } !important; }` : '' ) }
				{ ( previewBorderHoverLeftStyle ? `.base-column-${ uniqueID } > .base-inner-column-inner:hover { border-left:${ previewBorderHoverLeftStyle } !important; }` : '' ) }

				{ ( previewHoverRadiusTop ? `.base-column-${ uniqueID } > .base-inner-column-inner:hover { border-top-left-radius:${ previewHoverRadiusTop + ( borderHoverRadiusUnit ? borderHoverRadiusUnit : 'px' ) } !important; }` : '' ) }
				{ ( previewHoverRadiusRight ? `.base-column-${ uniqueID } > .base-inner-column-inner:hover { border-top-right-radius:${ previewHoverRadiusRight + ( borderHoverRadiusUnit ? borderHoverRadiusUnit : 'px' ) } !important; }` : '' ) }
				{ ( previewHoverRadiusBottom ? `.base-column-${ uniqueID } > .base-inner-column-inner:hover { border-bottom-right-radius:${ previewHoverRadiusBottom + ( borderHoverRadiusUnit ? borderHoverRadiusUnit : 'px' ) } !important; }` : '' ) }
				{ (  previewHoverRadiusLeft ? `.base-column-${ uniqueID } > .base-inner-column-inner:hover { border-bottom-left-radius:${  previewHoverRadiusLeft + ( borderHoverRadiusUnit ? borderHoverRadiusUnit : 'px' ) } !important; }` : '' ) }
				{ ( collapseOrder && previewDevice === 'Tablet' ? `.bst-row-layout-row > .innerblocks-wrap > .base-column-${ uniqueID } { order:${  collapseOrder }; }` : '' ) }
				{ ( collapseOrder && previewDevice === 'Mobile' ? `.base-column-${ uniqueID } { order:${  collapseOrder }; }` : '' ) }

				{ ( displayHoverShadow && undefined !== shadowHover && undefined !== shadowHover[ 0 ] && undefined !== shadowHover[ 0 ].color ? `.base-column-${ uniqueID } > .base-inner-column-inner:hover { box-shadow:${ ( undefined !== shadowHover[ 0 ].inset && shadowHover[ 0 ].inset ? 'inset ' : '' ) + ( undefined !== shadowHover[ 0 ].hOffset ? shadowHover[ 0 ].hOffset : 0 ) + 'px ' + ( undefined !== shadowHover[ 0 ].vOffset ? shadowHover[ 0 ].vOffset : 0 ) + 'px ' + ( undefined !== shadowHover[ 0 ].blur ? shadowHover[ 0 ].blur : 14 ) + 'px ' + ( undefined !== shadowHover[ 0 ].spread ? shadowHover[ 0 ].spread : 0 ) + 'px ' + BaseColorOutput( ( undefined !== shadowHover[ 0 ].color ? shadowHover[ 0 ].color : '#000000' ), ( undefined !== shadowHover[ 0 ].opacity ? shadowHover[ 0 ].opacity : 1 ) ) } !important; }` : '' ) }
				{ baseBlockCSS && (
					<>
						{ baseBlockCSS.replace( /selector/g, `.base-column-${ uniqueID }` ) }
					</>
				) }
			</style>
			{ showSettings( 'allSettings', 'base/column' ) && (
				<>
					<BlockControls>
						{ ! inRowBlock && (
							<BlockAlignmentToolbar
								value={ align }
								controls={ [ 'wide', 'full' ] }
								onChange={ value => setAttributes( { align: value } ) }
							/>
						) }
						<ToolbarGroup group="align">
							<BlockVerticalAlignmentControl
								value={previewVerticalAlign === 'middle' ? 'center' : previewVerticalAlign }
								onChange={ value => {
									if ( value === 'center' ) {
										setAttributes( { verticalAlignment: 'middle' } );
									} else if ( value === 'bottom' ) {
										setAttributes( { verticalAlignment: 'bottom' } );
									}  else if ( value === 'top' ) {
										setAttributes( { verticalAlignment: 'top' } );
									}  else {
										setAttributes( { verticalAlignment: '' } );
									}
								}}
							/>
						</ToolbarGroup>
						<CopyPasteAttributes
							attributes={ attributes }
							excludedAttrs={ nonTransAttrs }
							defaultAttributes={ metadata['attributes'] }
							blockSlug={ metadata['name'] }
							onPaste={ attributesToPaste => setAttributes( attributesToPaste ) }
						/>
					</BlockControls>
					<InspectorControls>
						<InspectorControlTabs
							panelName={ 'column' }
							setActiveTab={ setActiveTab }
							activeTab={ activeTab }
						/>
						{( activeTab === 'general' ) &&
							<>
								{showSettings( 'textAlign', 'base/column' ) && (
									<BasePanelBody
										title={__( 'Flex Align Settings', 'gutenam-blocks' )}
										panelName={'bsb-col-align-settings'}
									>
										<SmallResponsiveControl
											label={__( 'Inner Block Direction', 'gutenam-blocks' )}
											desktopChildren={<BaseRadioButtons
												//label={ __( 'Inner Block Direction', 'gutenam-blocks' ) }
												value={( direction && direction[ 0 ] ? direction[ 0 ] : 'vertical' )}
												options={[
													{ value: 'vertical', label: __( 'Vertical', 'gutenam-blocks' ) },
													{ value: 'horizontal', label: __( 'Horizontal', 'gutenam-blocks' ) },
												]}
												onChange={value => setAttributes( { direction: [ value, ( direction && direction[ 1 ] ? direction[ 1 ] : '' ), ( direction && direction[ 2 ] ? direction[ 2 ] : '' ) ] } )}
											/>}
											tabletChildren={<BaseRadioButtons
												//label={ __( 'Inner Block Direction', 'gutenam-blocks' ) }
												value={( direction && direction[ 1 ] ? direction[ 1 ] : '' )}
												options={[
													{ value: 'vertical', label: __( 'Vertical', 'gutenam-blocks' ) },
													{ value: 'horizontal', label: __( 'Horizontal', 'gutenam-blocks' ) },
												]}
												onChange={value => setAttributes( { direction: [ ( direction && direction[ 0 ] ? direction[ 0 ] : 'vertical' ), value, ( direction && direction[ 2 ] ? direction[ 2 ] : '' ) ] } )}
											/>}
											mobileChildren={<BaseRadioButtons
												//label={ __( 'Inner Block Direction', 'gutenam-blocks' ) }
												value={( direction && direction[ 2 ] ? direction[ 2 ] : '' )}
												options={[
													{ value: 'vertical', label: __( 'Vertical', 'gutenam-blocks' ) },
													{ value: 'horizontal', label: __( 'Horizontal', 'gutenam-blocks' ) },
												]}
												onChange={value => setAttributes( { direction: [ ( direction && direction[ 0 ] ? direction[ 0 ] : 'vertical' ), ( direction && direction[ 1 ] ? direction[ 1 ] : '' ), value ] } )}
											/>}
										/>
										{( previewDirection ? previewDirection : 'vertical' ) === 'horizontal' && (
											<>
												<ResponsiveRangeControls
													label={__( 'Gutter', 'gutenam-blocks' )}
													value={( gutter && '' !== gutter[ 0 ] ? gutter[ 0 ] : 10 )}
													onChange={value => setAttributes( { gutter: [ value, ( gutter && gutter[ 1 ] ? gutter[ 1 ] : '' ), ( gutter && gutter[ 2 ] ? gutter[ 2 ] : '' ) ] } )}
													tabletValue={( gutter && '' !== gutter[ 1 ] ? gutter[ 1 ] : '' )}
													onChangeTablet={value => setAttributes( { gutter: [ ( gutter && gutter[ 0 ] ? gutter[ 0 ] : 10 ), value, ( gutter && gutter[ 2 ] ? gutter[ 2 ] : '' ) ] } )}
													mobileValue={( gutter && '' !== gutter[ 2 ] ? gutter[ 2 ] : '' )}
													onChangeMobile={value => setAttributes( { gutter: [ ( gutter && gutter[ 0 ] ? gutter[ 0 ] : 10 ), ( gutter && gutter[ 2 ] ? gutter[ 2 ] : '' ), value ] } )}
													min={0}
													max={gutterMax}
													step={gutterStep}
													unit={gutterUnit}
													onUnit={( value ) => setAttributes( { gutterUnit: value } )}
													units={[ 'px', 'em', 'rem' ]}
												/>
												<SmallResponsiveControl
													label={__( 'Justify Content', 'gutenam-blocks' )}
													desktopChildren={<SelectControl
														//label={ __( 'Justify Content', 'gutenam-blocks' ) }
														value={( justifyContent && justifyContent[ 0 ] ? justifyContent[ 0 ] : '' )}
														options={[
															{ value: '', label: __( 'Inherit', 'gutenam-blocks' ) },
															{ value: 'flex-start', label: __( 'Start', 'gutenam-blocks' ) },
															{ value: 'center', label: __( 'Center', 'gutenam-blocks' ) },
															{ value: 'flex-end', label: __( 'End', 'gutenam-blocks' ) },
															{ value: 'space-between', label: __( 'Space Between', 'gutenam-blocks' ) },
															{ value: 'space-around', label: __( 'Space Around', 'gutenam-blocks' ) },
															{ value: 'space-evenly', label: __( 'Space Evenly', 'gutenam-blocks' ) },
														]}
														onChange={value => setAttributes( { justifyContent: [ value, ( justifyContent && justifyContent[ 1 ] ? justifyContent[ 1 ] : '' ), ( justifyContent && justifyContent[ 2 ] ? justifyContent[ 2 ] : '' ) ] } )}
													/>}
													tabletChildren={<SelectControl
														//label={ __( 'Justify Content', 'gutenam-blocks' ) }
														value={( justifyContent && justifyContent[ 1 ] ? justifyContent[ 1 ] : '' )}
														options={[
															{ value: '', label: __( 'Inherit', 'gutenam-blocks' ) },
															{ value: 'flex-start', label: __( 'Start', 'gutenam-blocks' ) },
															{ value: 'center', label: __( 'Center', 'gutenam-blocks' ) },
															{ value: 'flex-end', label: __( 'End', 'gutenam-blocks' ) },
															{ value: 'space-between', label: __( 'Space Between', 'gutenam-blocks' ) },
															{ value: 'space-around', label: __( 'Space Around', 'gutenam-blocks' ) },
															{ value: 'space-evenly', label: __( 'Space Evenly', 'gutenam-blocks' ) },
														]}
														onChange={value => setAttributes( { justifyContent: [ ( justifyContent && justifyContent[ 0 ] ? justifyContent[ 0 ] : '' ), value, ( justifyContent && justifyContent[ 2 ] ? justifyContent[ 2 ] : '' ) ] } )}
													/>}
													mobileChildren={<SelectControl
														//label={ __( 'Justify Content', 'gutenam-blocks' ) }
														value={( justifyContent && justifyContent[ 2 ] ? justifyContent[ 2 ] : '' )}
														options={[
															{ value: '', label: __( 'Inherit', 'gutenam-blocks' ) },
															{ value: 'flex-start', label: __( 'Start', 'gutenam-blocks' ) },
															{ value: 'center', label: __( 'Center', 'gutenam-blocks' ) },
															{ value: 'flex-end', label: __( 'End', 'gutenam-blocks' ) },
															{ value: 'space-between', label: __( 'Space Between', 'gutenam-blocks' ) },
															{ value: 'space-around', label: __( 'Space Around', 'gutenam-blocks' ) },
															{ value: 'space-evenly', label: __( 'Space Evenly', 'gutenam-blocks' ) },
														]}
														onChange={value => setAttributes( { justifyContent: [ ( justifyContent && justifyContent[ 0 ] ? justifyContent[ 0 ] : '' ), ( justifyContent && justifyContent[ 1 ] ? justifyContent[ 1 ] : '' ), value ] } )}
													/>}
												/>
												<SmallResponsiveControl
													label={__( 'Wrap Content', 'gutenam-blocks' )}
													desktopChildren={<SelectControl
														//label={ __( 'Justify Content', 'gutenam-blocks' ) }
														value={( wrapContent && wrapContent[ 0 ] ? wrapContent[ 0 ] : '' )}
														options={[
															{ value: '', label: __( 'Inherit', 'gutenam-blocks' ) },
															{ value: 'nowrap', label: __( 'No Wrap', 'gutenam-blocks' ) },
															{ value: 'wrap', label: __( 'Wrap', 'gutenam-blocks' ) },
															{ value: 'wrap-reverse', label: __( 'Wrap Reverse', 'gutenam-blocks' ) },
														]}
														onChange={value => setAttributes( { wrapContent: [ value, ( wrapContent && wrapContent[ 1 ] ? wrapContent[ 1 ] : '' ), ( wrapContent && wrapContent[ 2 ] ? wrapContent[ 2 ] : '' ) ] } )}
													/>}
													tabletChildren={<SelectControl
														//label={ __( 'Justify Content', 'gutenam-blocks' ) }
														value={( wrapContent && wrapContent[ 1 ] ? wrapContent[ 1 ] : '' )}
														options={[
															{ value: '', label: __( 'Inherit', 'gutenam-blocks' ) },
															{ value: 'nowrap', label: __( 'No Wrap', 'gutenam-blocks' ) },
															{ value: 'wrap', label: __( 'Wrap', 'gutenam-blocks' ) },
															{ value: 'wrap-reverse', label: __( 'Wrap Reverse', 'gutenam-blocks' ) },
														]}
														onChange={value => setAttributes( { wrapContent: [ ( wrapContent && wrapContent[ 0 ] ? wrapContent[ 0 ] : '' ), value, ( wrapContent && wrapContent[ 2 ] ? wrapContent[ 2 ] : '' ) ] } )}
													/>}
													mobileChildren={<SelectControl
														//label={ __( 'Justify Content', 'gutenam-blocks' ) }
														value={( wrapContent && wrapContent[ 2 ] ? wrapContent[ 2 ] : '' )}
														options={[
															{ value: '', label: __( 'Inherit', 'gutenam-blocks' ) },
															{ value: 'nowrap', label: __( 'No Wrap', 'gutenam-blocks' ) },
															{ value: 'wrap', label: __( 'Wrap', 'gutenam-blocks' ) },
															{ value: 'wrap-reverse', label: __( 'Wrap Reverse', 'gutenam-blocks' ) },
														]}
														onChange={value => setAttributes( { wrapContent: [ ( wrapContent && wrapContent[ 0 ] ? wrapContent[ 0 ] : '' ), ( wrapContent && wrapContent[ 1 ] ? wrapContent[ 1 ] : '' ), value ] } )}
													/>}
												/>
											</>
										)}
										<ResponsiveAlignControls
											label={__( 'Text Alignment', 'gutenam-blocks' )}
											value={( textAlign && textAlign[ 0 ] ? textAlign[ 0 ] : '' )}
											mobileValue={( textAlign && textAlign[ 2 ] ? textAlign[ 2 ] : '' )}
											tabletValue={( textAlign && textAlign[ 1 ] ? textAlign[ 1 ] : '' )}
											onChange={( nextAlign ) => setAttributes( { textAlign: [ nextAlign, ( textAlign && textAlign[ 1 ] ? textAlign[ 1 ] : '' ), ( textAlign && textAlign[ 2 ] ? textAlign[ 2 ] : '' ) ] } )}
											onChangeTablet={( nextAlign ) => setAttributes( { textAlign: [ ( textAlign && textAlign[ 0 ] ? textAlign[ 0 ] : '' ), nextAlign, ( textAlign && textAlign[ 2 ] ? textAlign[ 2 ] : '' ) ] } )}
											onChangeMobile={( nextAlign ) => setAttributes( { textAlign: [ ( textAlign && textAlign[ 0 ] ? textAlign[ 0 ] : '' ), ( textAlign && textAlign[ 1 ] ? textAlign[ 1 ] : '' ), nextAlign ] } )}
										/>
									</BasePanelBody>
								)}
								{ ! inRowBlock && showSettings( 'container', 'base/column' ) && (
									<BasePanelBody
										title={__( 'Content Max Width', 'gutenam-blocks' )}
										initialOpen={false}
										panelName={'bsb-col-width-style-settings'}
									>
										<ResponsiveRangeControls
											label={__( 'Max Width', 'gutenam-blocks' )}
											value={( undefined !== maxWidth && undefined !== maxWidth[ 0 ] ? maxWidth[ 0 ] : '' )}
											onChange={value => {
												setAttributes( { maxWidth: [ value, ( undefined !== maxWidth && undefined !== maxWidth[ 1 ] ? maxWidth[ 1 ] : '' ), ( undefined !== maxWidth && undefined !== maxWidth[ 2 ] ? maxWidth[ 2 ] : '' ) ] } );
											}}
											tabletValue={( undefined !== maxWidth && undefined !== maxWidth[ 1 ] ? maxWidth[ 1 ] : '' )}
											onChangeTablet={( value ) => {
												setAttributes( { maxWidth: [ ( undefined !== maxWidth && undefined !== maxWidth[ 0 ] ? maxWidth[ 0 ] : '' ), value, ( undefined !== maxWidth && undefined !== maxWidth[ 2 ] ? maxWidth[ 2 ] : '' ) ] } );
											}}
											mobileValue={( undefined !== maxWidth && undefined !== maxWidth[ 2 ] ? maxWidth[ 2 ] : '' )}
											onChangeMobile={( value ) => {
												setAttributes( { maxWidth: [ ( undefined !== maxWidth && undefined !== maxWidth[ 0 ] ? maxWidth[ 0 ] : '' ), ( undefined !== maxWidth && undefined !== maxWidth[ 1 ] ? maxWidth[ 1 ] : '' ), value ] } );
											}}
											min={0}
											max={( maxWidthUnit === 'px' ? 2000 : 100 )}
											step={1}
											unit={maxWidthUnit ? maxWidthUnit : 'px'}
											onUnit={( value ) => {
												setAttributes( { maxWidthUnit: value } );
											}}
											units={[ 'px', '%', 'vw' ]}
										/>
									</BasePanelBody>
								)}

								{showSettings( 'overlayLink', 'base/column' ) && (
									<BasePanelBody
										title={__( 'Overlay Link', 'gutenam-blocks' )}
										initialOpen={false}
										panelName={'bsb-col-overlay-link'}
									>
										<p className="base-sidebar-notice">{__( 'Please note, If a link is added nothing else inside of the section will be selectable.', 'gutenam-blocks' )}</p>
										<URLInputControl
											label={__( 'Link entire section', 'gutenam-blocks' )}
											url={link}
											onChangeUrl={value => setAttributes( { link: value } )}
											additionalControls={true}
											opensInNewTab={( undefined !== linkTarget ? linkTarget : false )}
											onChangeTarget={value => setAttributes( { linkTarget: value } )}
											linkNoFollow={( undefined !== linkNoFollow ? linkNoFollow : false )}
											onChangeFollow={value => setAttributes( { linkNoFollow: value } )}
											linkSponsored={( undefined !== linkSponsored ? linkSponsored : false )}
											onChangeSponsored={value => setAttributes( { linkSponsored: value } )}
											linkTitle={linkTitle}
											onChangeTitle={value => {
												setAttributes( { linkTitle: value } )
											}}
											dynamicAttribute={'link'}
											allowClear={true}
											isSelected={isSelected}
											attributes={attributes}
											setAttributes={setAttributes}
											name={'base/column'}
											clientId={clientId}
										/>
									</BasePanelBody>
								)}
							</>
						}

						{( activeTab === 'advanced') &&
							<>
								{showSettings( 'paddingMargin', 'base/column' ) && (
									<BasePanelBody panelName={ 'bsb-column-padding' }>
										<ResponsiveMeasureRangeControl
											label={__( 'Padding', 'gutenam-blocks' )}
											value={ padding }
											tabletValue={tabletPadding}
											mobileValue={mobilePadding}
											onChange={( value ) => {
												setAttributes( { padding: value } );
											}}
											onChangeTablet={( value ) => {
												setAttributes( { tabletPadding: value } );
											}}
											onChangeMobile={( value ) => {
												setAttributes( { mobilePadding: value } );
											}}
											min={ 0 }
											max={ ( paddingType === 'em' || paddingType === 'rem' ? 24 : 500 ) }
											step={ ( paddingType === 'em' || paddingType === 'rem' ? 0.1 : 1 ) }
											unit={ paddingType }
											units={ [ 'px', 'em', 'rem', '%', 'vh', 'vw' ] }
											onUnit={( value ) => setAttributes( { paddingType: value } )}
											onMouseOver={ paddingMouseOver.onMouseOver }
											onMouseOut={ paddingMouseOver.onMouseOut }
										/>
										<ResponsiveMeasureRangeControl
											label={__( 'Margin', 'gutenam-blocks' )}
											value={margin}
											tabletValue={tabletMargin}
											mobileValue={mobileMargin}
											onChange={( value ) => {
												setAttributes( { margin: value } );
											}}
											onChangeTablet={( value ) => {
												setAttributes( { tabletMargin: value } );
											}}
											onChangeMobile={( value ) => {
												setAttributes( { mobileMargin: value } );
											}}
											min={ ( marginType === 'em' || marginType === 'rem' ? -24 : -500 ) }
											max={ ( marginType === 'em' || marginType === 'rem' ? 24 : 500 ) }
											step={ ( marginType === 'em' || marginType === 'rem' ? 0.1 : 1 ) }
											unit={ marginType }
											units={ [ 'px', 'em', 'rem', '%', 'vh', 'vw' ] }
											onUnit={ ( value ) => setAttributes( { marginType: value } ) }
											onMouseOver={ marginMouseOver.onMouseOver }
											onMouseOut={ marginMouseOver.onMouseOut }
										/>
									</BasePanelBody>
								)}
								<div className="bst-sidebar-settings-spacer"></div>
								{showSettings( 'container', 'base/column' ) && (
									<BasePanelBody
										title={__( 'Structure Settings', 'gutenam-blocks' )}
										initialOpen={false}
										panelName={'bsb-col-container-style-settings'}
									>
										<SelectControl
											label={__( 'Container HTML tag', 'gutenam-blocks' )}
											value={htmlTag}
											options={[
												{ value: 'div', label: 'div' },
												{ value: 'header', label: 'header' },
												{ value: 'section', label: 'section' },
												{ value: 'article', label: 'article' },
												{ value: 'main', label: 'main' },
												{ value: 'aside', label: 'aside' },
												{ value: 'footer', label: 'footer' },
											]}
											onChange={value => setAttributes( { htmlTag: value } )}
										/>
										<ResponsiveRangeControls
											label={__( 'Min Height', 'gutenam-blocks' )}
											value={( undefined !== height && undefined !== height[ 0 ] ? height[ 0 ] : '' )}
											onChange={value => {
												setAttributes( { height: [ value, ( undefined !== height && undefined !== height[ 1 ] ? height[ 1 ] : '' ), ( undefined !== height && undefined !== height[ 2 ] ? height[ 2 ] : '' ) ] } );
											}}
											tabletValue={( undefined !== height && undefined !== height[ 1 ] ? height[ 1 ] : '' )}
											onChangeTablet={( value ) => {
												setAttributes( { height: [ ( undefined !== height && undefined !== height[ 0 ] ? height[ 0 ] : '' ), value, ( undefined !== height && undefined !== height[ 2 ] ? height[ 2 ] : '' ) ] } );
											}}
											mobileValue={( undefined !== height && undefined !== height[ 2 ] ? height[ 2 ] : '' )}
											onChangeMobile={( value ) => {
												setAttributes( { height: [ ( undefined !== height && undefined !== height[ 0 ] ? height[ 0 ] : '' ), ( undefined !== height && undefined !== height[ 1 ] ? height[ 1 ] : '' ), value ] } );
											}}
											min={0}
											max={( heightUnit === 'px' ? 2000 : 200 )}
											step={1}
											unit={heightUnit ? heightUnit : 'px'}
											onUnit={( value ) => {
												setAttributes( { heightUnit: value } );
											}}
											units={[ 'px', 'vw', 'vh' ]}
										/>
										<RangeControl
											label={ __( 'Z Index Control', 'gutenam-blocks' ) }
											value={ zIndex }
											onChange={ ( value ) => {
												setAttributes( {
													zIndex: value,
												} );
											} }
											min={ -200 }
											max={ 200 }
										/>
										{ inRowBlock && (
											<RangeControl
												label={ __( 'Mobile Collapse Order' ) }
												value={ collapseOrder }
												onChange={ ( value ) => {
													setAttributes( {
														collapseOrder: value,
													} );
												} }
												min={ -10 }
												max={ 10 }
											/>
										) }
									</BasePanelBody>
								)}
								<BasePanelBody
									title={ __( 'Sticky Settings', 'gutenam-blocks' ) }
									initialOpen={ false }
									panelName={ 'bsb-col-sticky-settings' }
								>
									<ToggleControl
										label={ __( 'Make sticky', 'gutenam-blocks' ) }
										help={ __( 'This will stick the section to viewport for the height of outer container.', 'gutenam-blocks' ) }
										checked={ ( undefined !== sticky ? sticky : false ) }
										onChange={ ( value ) => setAttributes( { sticky: value } ) }
									/>
									{ sticky && (
										<ResponsiveRangeControls
											label={ __( 'Sticky Header Offset', 'gutenam-blocks' ) }
											value={ ( undefined !== stickyOffset && undefined !== stickyOffset[ 0 ] ? stickyOffset[ 0 ] : '' ) }
											onChange={ value => {
												setAttributes( { stickyOffset: [ value, ( undefined !== stickyOffset && undefined !== stickyOffset[ 1 ] ? stickyOffset[ 1 ] : '' ), ( undefined !== stickyOffset && undefined !== stickyOffset[ 2 ] ? stickyOffset[ 2 ] : '' ) ] } );
											} }
											tabletValue={ ( undefined !== stickyOffset && undefined !== stickyOffset[ 1 ] ? stickyOffset[ 1 ] : '' ) }
											onChangeTablet={ ( value ) => {
												setAttributes( { stickyOffset: [ ( undefined !== stickyOffset && undefined !== stickyOffset[ 0 ] ? stickyOffset[ 0 ] : '' ), value, ( undefined !== stickyOffset && undefined !== stickyOffset[ 2 ] ? stickyOffset[ 2 ] : '' ) ] } );
											} }
											mobileValue={ ( undefined !== stickyOffset && undefined !== stickyOffset[ 2 ] ? stickyOffset[ 2 ] : '' ) }
											onChangeMobile={ ( value ) => {
												setAttributes( { stickyOffset: [ ( undefined !== stickyOffset && undefined !== stickyOffset[ 0 ] ? stickyOffset[ 0 ] : '' ), ( undefined !== stickyOffset && undefined !== stickyOffset[ 1 ] ? stickyOffset[ 1 ] : '' ), value ] } );
											} }
											min={ 0 }
											max={ ( stickyOffsetUnit === 'px' ? 2000 : 100 ) }
											step={ 1 }
											unit={ stickyOffsetUnit ? stickyOffsetUnit : 'px' }
											onUnit={ ( value ) => {
												setAttributes( { stickyOffsetUnit: value } );
											} }
											units={ [ 'px', 'rem', 'vh' ] }
										/>
									) }
								</BasePanelBody>
								<BasePanelBody
									title={__( 'Visibility Settings', 'gutenam-blocks' )}
									panelName={'bsb-col-visibility-settings'}
									initialOpen={ false }
								>
									<ToggleControl
										label={__( 'Hide on Desktop', 'gutenam-blocks' )}
										checked={( undefined !== vsdesk ? vsdesk : false )}
										onChange={( value ) => setAttributes( { vsdesk: value } )}
									/>
									<ToggleControl
										label={__( 'Hide on Tablet', 'gutenam-blocks' )}
										checked={( undefined !== vstablet ? vstablet : false )}
										onChange={( value ) => setAttributes( { vstablet: value } )}
									/>
									<ToggleControl
										label={__( 'Hide on Mobile', 'gutenam-blocks' )}
										checked={( undefined !== vsmobile ? vsmobile : false )}
										onChange={( value ) => setAttributes( { vsmobile: value } )}
									/>
								</BasePanelBody>

								<BaseBlockDefaults attributes={attributes} defaultAttributes={metadata['attributes']} blockSlug={ metadata['name'] } excludedAttrs={ nonTransAttrs }  />

							</>
						}

						{ ( activeTab === 'style' ) &&
							<>
								<BasePanelBody
									title={__( 'Background', 'gutenam-blocks' )}
									initialOpen={ true }
									panelName={'bsb-col-bg-settings'}
								>
									<HoverToggleControl
										hover={
											<>
												<BackgroundTypeControl
													label={ __( 'Hover Type', 'gutenam-blocks' ) }
													type={ backgroundHoverType ? backgroundHoverType : 'normal' }
													onChange={ value => setAttributes( { backgroundHoverType: value } ) }
													allowedTypes={ [ 'normal', 'gradient' ] }
												/>
												{ 'gradient' === backgroundHoverType && (
													<GradientControl
														value={ gradientHover }
														onChange={ value => setAttributes( { gradientHover: value } ) }
														gradients={ [] }
													/>
												) }
												{ 'gradient' !== backgroundHoverType && (
													<>
														<PopColorControl
															label={__( 'Background Color', 'gutenam-blocks' )}
															value={( backgroundHover ? backgroundHover : '' )}
															default={''}
															onChange={value => setAttributes( { backgroundHover: value } )}
														/>
														<BaseBackgroundControl
															label={__( 'Background Image', 'gutenam-blocks' )}
															hasImage={hasHoverBackgroundImage}
															imageURL={( backgroundImgHover && backgroundImgHover[ 0 ] && backgroundImgHover[ 0 ].bgImg ? backgroundImgHover[ 0 ].bgImg : '' )}
															imageID={( backgroundImgHover && backgroundImgHover[ 0 ] && backgroundImgHover[ 0 ].bgImgID ? backgroundImgHover[ 0 ].bgImgID : '' )}
															imagePosition={( backgroundImgHover && backgroundImgHover[ 0 ] && backgroundImgHover[ 0 ].bgImgPosition ? backgroundImgHover[ 0 ].bgImgPosition : 'center center' )}
															imageSize={( backgroundImgHover && backgroundImgHover[ 0 ] && backgroundImgHover[ 0 ].bgImgSize ? backgroundImgHover[ 0 ].bgImgSize : 'cover' )}
															imageRepeat={( backgroundImgHover && backgroundImgHover[ 0 ] && backgroundImgHover[ 0 ].bgImgRepeat ? backgroundImgHover[ 0 ].bgImgRepeat : 'no-repeat' )}
															imageAttachment={( backgroundImgHover && backgroundImgHover[ 0 ] && backgroundImgHover[ 0 ].bgImgAttachment ? backgroundImgHover[ 0 ].bgImgAttachment : 'scroll' )}
															onRemoveImage={onRemoveHoverBGImage}
															onSaveImage={( img ) => {
																saveHoverBackgroundImage( {
																	bgImgID: img.id,
																	bgImg  : img.url,
																} );
															}}
															onSaveURL={( newURL ) => {
																if ( newURL !== ( backgroundImgHover && backgroundImgHover[ 0 ] && backgroundImgHover[ 0 ].bgImg ? backgroundImgHover[ 0 ].bgImg : '' ) ) {
																	saveHoverBackgroundImage( {
																		bgImgID: undefined,
																		bgImg  : newURL,
																	} );
																}
															}}
															onSavePosition={value => saveHoverBackgroundImage( { bgImgPosition: value } )}
															onSaveSize={value => saveHoverBackgroundImage( { bgImgSize: value } )}
															onSaveRepeat={value => saveHoverBackgroundImage( { bgImgRepeat: value } )}
															onSaveAttachment={value => saveHoverBackgroundImage( { bgImgAttachment: value } )}
															disableMediaButtons={( backgroundImgHover && backgroundImgHover[ 0 ] && backgroundImgHover[ 0 ].bgImg ? backgroundImgHover[ 0 ].bgImg : '' )}
															dynamicAttribute="backgroundImgHover:0:bgImg"
															isSelected={isSelected}
															attributes={attributes}
															setAttributes={setAttributes}
															name={'base/column'}
															clientId={clientId}
														/>
													</>
												)}
											</>
										}
										normal={
											<>
												<BackgroundTypeControl
													label={ __( 'Type', 'gutenam-blocks' ) }
													type={ backgroundType ? backgroundType : 'normal' }
													onChange={ value => setAttributes( { backgroundType: value } ) }
													allowedTypes={ [ 'normal', 'gradient' ] }
												/>
												{ 'gradient' === backgroundType && (
													<GradientControl
														value={ gradient }
														onChange={ value => setAttributes( { gradient: value } ) }
														gradients={ [] }
													/>
												) }
												{ 'gradient' !== backgroundType && (
													<>
														<PopColorControl
															label={__( 'Background Color', 'gutenam-blocks' )}
															value={( background ? background : '' )}
															default={''}
															opacityValue={backgroundOpacity}
															onChange={value => setAttributes( { background: value } )}
															onOpacityChange={value => setAttributes( { backgroundOpacity: value } )}
														/>
														<BaseBackgroundControl
															label={__( 'Background Image', 'gutenam-blocks' )}
															hasImage={hasBackgroundImage}
															imageURL={( backgroundImg && backgroundImg[ 0 ] && backgroundImg[ 0 ].bgImg ? backgroundImg[ 0 ].bgImg : '' )}
															imageID={( backgroundImg && backgroundImg[ 0 ] && backgroundImg[ 0 ].bgImgID ? backgroundImg[ 0 ].bgImgID : '' )}
															imagePosition={( backgroundImg && backgroundImg[ 0 ] && backgroundImg[ 0 ].bgImgPosition ? backgroundImg[ 0 ].bgImgPosition : 'center center' )}
															imageSize={( backgroundImg && backgroundImg[ 0 ] && backgroundImg[ 0 ].bgImgSize ? backgroundImg[ 0 ].bgImgSize : 'cover' )}
															imageRepeat={( backgroundImg && backgroundImg[ 0 ] && backgroundImg[ 0 ].bgImgRepeat ? backgroundImg[ 0 ].bgImgRepeat : 'no-repeat' )}
															imageAttachment={( backgroundImg && backgroundImg[ 0 ] && backgroundImg[ 0 ].bgImgAttachment ? backgroundImg[ 0 ].bgImgAttachment : 'scroll' )}
															onRemoveImage={onRemoveBGImage}
															onSaveImage={( img ) => {
																saveBackgroundImage( {
																	bgImgID: img.id,
																	bgImg  : img.url,
																} );
															}}
															onSaveURL={( newURL ) => {
																if ( newURL !== ( backgroundImg && backgroundImg[ 0 ] && backgroundImg[ 0 ].bgImg ? backgroundImg[ 0 ].bgImg : '' ) ) {
																	saveBackgroundImage( {
																		bgImgID: undefined,
																		bgImg  : newURL,
																	} );
																}
															}}
															onSavePosition={value => saveBackgroundImage( { bgImgPosition: value } )}
															onSaveSize={value => saveBackgroundImage( { bgImgSize: value } )}
															onSaveRepeat={value => saveBackgroundImage( { bgImgRepeat: value } )}
															onSaveAttachment={value => saveBackgroundImage( { bgImgAttachment: value } )}
															disableMediaButtons={( backgroundImg && backgroundImg[ 0 ] && backgroundImg[ 0 ].bgImg ? backgroundImg[ 0 ].bgImg : '' )}
															dynamicAttribute="backgroundImg:0:bgImg"
															isSelected={isSelected}
															attributes={attributes}
															setAttributes={setAttributes}
															name={'base/column'}
															clientId={clientId}
														/>
													</>
												)}
											</>
										}
									/>
								</BasePanelBody>
								<BasePanelBody
									title={ __( 'Background Overlay', 'gutenam-blocks' ) }
									initialOpen={ false }
									panelName={ 'bsb-col-bg-overlay-settings' }
								>
									<HoverToggleControl
										hover={
											<>
												<BackgroundTypeControl
													label={ __( 'Hover Type', 'gutenam-blocks' ) }
													type={ overlayHoverType ? overlayHoverType : 'normal' }
													onChange={ value => setAttributes( { overlayHoverType: value } ) }
													allowedTypes={ [ 'normal', 'gradient' ] }
												/>
												<RangeControl
													label={ __( 'Overlay Opacity', 'gutenam-blocks' ) }
													value={ overlayHoverOpacity }
													onChange={ ( value ) => {
														setAttributes( {
															overlayHoverOpacity: value,
														} );
													} }
													step={ 0.01 }
													min={ 0 }
													max={ 1 }
												/>
												{ 'gradient' === overlayHoverType && (
													<GradientControl
														value={ overlayGradientHover }
														onChange={ value => setAttributes( { overlayGradientHover: value } ) }
														gradients={ [] }
													/>
												) }
												{ 'gradient' !== overlayHoverType && (
													<>
														<PopColorControl
															label={ __( 'Background Color', 'gutenam-blocks' ) }
															value={ ( overlayHover ? overlayHover : '' ) }
															default={ '' }
															onChange={ value => setAttributes( { overlayHover: value } ) }
														/>
														<BaseBackgroundControl
															label={ __( 'Background Image', 'gutenam-blocks' ) }
															hasImage={ hasHoverOverlayImage }
															imageURL={ ( overlayImgHover && overlayImgHover[ 0 ] && overlayImgHover[ 0 ].bgImg ? overlayImgHover[ 0 ].bgImg : '' ) }
															imageID={ ( overlayImgHover && overlayImgHover[ 0 ] && overlayImgHover[ 0 ].bgImgID ? overlayImgHover[ 0 ].bgImgID : '' ) }
															imagePosition={ ( overlayImgHover && overlayImgHover[ 0 ] && overlayImgHover[ 0 ].bgImgPosition ? overlayImgHover[ 0 ].bgImgPosition : 'center center' ) }
															imageSize={ ( overlayImgHover && overlayImgHover[ 0 ] && overlayImgHover[ 0 ].bgImgSize ? overlayImgHover[ 0 ].bgImgSize : 'cover' ) }
															imageRepeat={ ( overlayImgHover && overlayImgHover[ 0 ] && overlayImgHover[ 0 ].bgImgRepeat ? overlayImgHover[ 0 ].bgImgRepeat : 'no-repeat' ) }
															imageAttachment={ ( overlayImgHover && overlayImgHover[ 0 ] && overlayImgHover[ 0 ].bgImgAttachment ? overlayImgHover[ 0 ].bgImgAttachment : 'scroll' ) }
															onRemoveImage={ onRemoveHoverOverlayImage }
															onSaveImage={ ( img ) => {
																saveHoverOverlayImage( {
																	bgImgID: img.id,
																	bgImg: img.url,
																} );
															} }
															onSaveURL={ ( newURL ) => {
																if ( newURL !== ( overlayImgHover && overlayImgHover[ 0 ] && overlayImgHover[ 0 ].bgImg ? overlayImgHover[ 0 ].bgImg : '' ) ) {
																	saveHoverOverlayImage( {
																		bgImgID: undefined,
																		bgImg: newURL,
																	} );
																}
															} }
															onSavePosition={ value => saveHoverOverlayImage( { bgImgPosition: value } ) }
															onSaveSize={ value => saveHoverOverlayImage( { bgImgSize: value } ) }
															onSaveRepeat={ value => saveHoverOverlayImage( { bgImgRepeat: value } ) }
															onSaveAttachment={ value => saveHoverOverlayImage( { bgImgAttachment: value } ) }
															disableMediaButtons={ ( overlayImgHover && overlayImgHover[ 0 ] && overlayImgHover[ 0 ].bgImg ? overlayImgHover[ 0 ].bgImg : '' ) }
															dynamicAttribute="overlayImgHover:0:bgImg"
															isSelected={ isSelected }
															attributes={ attributes }
															setAttributes={ setAttributes }
															name={ 'base/column' }
															clientId={ clientId }
														/>
														<SelectControl
															label={ __( 'Hover Blend Mode' ) }
															value={ ( hoverOverlayBlendMode ? hoverOverlayBlendMode : 'none' ) }
															options={ BLEND_OPTIONS }
															onChange={ value => setAttributes( { hoverOverlayBlendMode: value } ) }
														/>
														<p>{ __( 'Notice: Blend Mode not supported in all browsers', 'gutenam-blocks' ) }</p>
													</>
												)}
											</>
										}
										normal={
											<>
												<BackgroundTypeControl
													label={ __( 'Type', 'gutenam-blocks' ) }
													type={ overlayType ? overlayType : 'normal' }
													onChange={ value => setAttributes( { overlayType: value } ) }
													allowedTypes={ [ 'normal', 'gradient' ] }
												/>
												<RangeControl
													label={ __( 'Overlay Opacity', 'gutenam-blocks' ) }
													value={ overlayOpacity }
													onChange={ ( value ) => {
														setAttributes( {
															overlayOpacity: value,
														} );
													} }
													step={ 0.01 }
													min={ 0 }
													max={ 1 }
												/>
												{ 'gradient' === overlayType && (
													<GradientControl
														value={ overlayGradient }
														onChange={ value => setAttributes( { overlayGradient: value } ) }
														gradients={ [] }
													/>
												) }
												{ 'gradient' !== overlayType && (
													<>
														<PopColorControl
															label={ __( 'Background Color', 'gutenam-blocks' ) }
															value={ ( overlay ? overlay : '' ) }
															default={ '' }
															onChange={ value => setAttributes( { overlay: value } ) }
														/>
														<BaseBackgroundControl
															label={ __( 'Background Image', 'gutenam-blocks' ) }
															hasImage={ hasOverlayImage }
															imageURL={ ( overlayImg && overlayImg[ 0 ] && overlayImg[ 0 ].bgImg ? overlayImg[ 0 ].bgImg : '' ) }
															imageID={ ( overlayImg && overlayImg[ 0 ] && overlayImg[ 0 ].bgImgID ? overlayImg[ 0 ].bgImgID : '' ) }
															imagePosition={ ( overlayImg && overlayImg[ 0 ] && overlayImg[ 0 ].bgImgPosition ? overlayImg[ 0 ].bgImgPosition : 'center center' ) }
															imageSize={ ( overlayImg && overlayImg[ 0 ] && overlayImg[ 0 ].bgImgSize ? overlayImg[ 0 ].bgImgSize : 'cover' ) }
															imageRepeat={ ( overlayImg && overlayImg[ 0 ] && overlayImg[ 0 ].bgImgRepeat ? overlayImg[ 0 ].bgImgRepeat : 'no-repeat' ) }
															imageAttachment={ ( overlayImg && overlayImg[ 0 ] && overlayImg[ 0 ].bgImgAttachment ? overlayImg[ 0 ].bgImgAttachment : 'scroll' ) }
															onRemoveImage={ onRemoveOverlayImage }
															onSaveImage={ ( img ) => {
																saveOverlayImage( {
																	bgImgID: img.id,
																	bgImg: img.url,
																} );
															} }
															onSaveURL={ ( newURL ) => {
																if ( newURL !== ( overlayImg && overlayImg[ 0 ] && overlayImg[ 0 ].bgImg ? overlayImg[ 0 ].bgImg : '' ) ) {
																	saveOverlayImage( {
																		bgImgID: undefined,
																		bgImg: newURL,
																	} );
																}
															} }
															onSavePosition={ value => saveOverlayImage( { bgImgPosition: value } ) }
															onSaveSize={ value => saveOverlayImage( { bgImgSize: value } ) }
															onSaveRepeat={ value => saveOverlayImage( { bgImgRepeat: value } ) }
															onSaveAttachment={ value => saveOverlayImage( { bgImgAttachment: value } ) }
															disableMediaButtons={ ( overlayImg && overlayImg[ 0 ] && overlayImg[ 0 ].bgImg ? overlayImg[ 0 ].bgImg : '' ) }
															dynamicAttribute="overlayImg:0:bgImg"
															isSelected={ isSelected }
															attributes={ attributes }
															setAttributes={ setAttributes }
															name={ 'base/column' }
															clientId={ clientId }
														/>
														<SelectControl
															label={ __( 'Blend Mode' ) }
															value={ ( overlayBlendMode ? overlayBlendMode : 'none' ) }
															options={ BLEND_OPTIONS }
															onChange={ value => setAttributes( { overlayBlendMode: value } ) }
														/>
														<p>{ __( 'Notice: Blend Mode not supported in all browsers', 'gutenam-blocks' ) }</p>
													</>
												)}
											</>
										} />
								</BasePanelBody>
								<BasePanelBody
									title={__( 'Border Styles', 'gutenam-blocks' )}
									initialOpen={false}
									panelName={'bsb-col-border-settings'}
								>
									<HoverToggleControl
										hover={
											<>
												<ResponsiveBorderControl
													label={__( 'Border', 'gutenam-blocks' )}
													value={borderHoverStyle}
													tabletValue={tabletBorderHoverStyle}
													mobileValue={mobileBorderHoverStyle}
													onChange={( value ) => setAttributes( { borderHoverStyle: value } ) }
													onChangeTablet={( value ) => setAttributes( { tabletBorderHoverStyle: value } )}
													onChangeMobile={( value ) => setAttributes( { mobileBorderHoverStyle: value } )}
												/>
												<ResponsiveMeasurementControls
													label={__( 'Border Radius', 'gutenam-blocks' )}
													value={borderHoverRadius}
													tabletValue={tabletBorderHoverRadius}
													mobileValue={mobileBorderHoverRadius}
													onChange={( value ) => setAttributes( { borderHoverRadius: value } )}
													onChangeTablet={( value ) => setAttributes( { tabletBorderHoverRadius: value } )}
													onChangeMobile={( value ) => setAttributes( { mobileBorderHoverRadius: value } )}
													unit={borderHoverRadiusUnit}
													units={[ 'px', 'em', 'rem', '%' ]}
													onUnit={( value ) => setAttributes( { borderHoverRadiusUnit: value } )}
													max={(borderHoverRadiusUnit === 'em' || borderHoverRadiusUnit === 'rem' ? 24 : 500)}
													step={(borderHoverRadiusUnit === 'em' || borderHoverRadiusUnit === 'rem' ? 0.1 : 1)}
													min={ 0 }
													isBorderRadius={ true }
													allowEmpty={true}
												/>
												<BoxShadowControl
													label={__( 'Box Shadow', 'gutenam-blocks' )}
													enable={( undefined !== displayHoverShadow ? displayHoverShadow : false )}
													color={( undefined !== shadowHover && undefined !== shadowHover[ 0 ] && undefined !== shadowHover[ 0 ].color ? shadowHover[ 0 ].color : '#000000' )}
													colorDefault={'#000000'}
													onArrayChange={( color, opacity ) => {
														saveShadowHover( { color: color, opacity: opacity } );
													}}
													opacity={( undefined !== shadowHover && undefined !== shadowHover[ 0 ] && undefined !== shadowHover[ 0 ].opacity ? shadowHover[ 0 ].opacity : 0.2 )}
													hOffset={( undefined !== shadowHover && undefined !== shadowHover[ 0 ] && undefined !== shadowHover[ 0 ].hOffset ? shadowHover[ 0 ].hOffset : 0 )}
													vOffset={( undefined !== shadowHover && undefined !== shadowHover[ 0 ] && undefined !== shadowHover[ 0 ].vOffset ? shadowHover[ 0 ].vOffset : 0 )}
													blur={( undefined !== shadowHover && undefined !== shadowHover[ 0 ] && undefined !== shadowHover[ 0 ].blur ? shadowHover[ 0 ].blur : 14 )}
													spread={( undefined !== shadowHover && undefined !== shadowHover[ 0 ] && undefined !== shadowHover[ 0 ].spread ? shadowHover[ 0 ].spread : 0 )}
													inset={( undefined !== shadowHover && undefined !== shadowHover[ 0 ] && undefined !== shadowHover[ 0 ].inset ? shadowHover[ 0 ].inset : false )}
													onEnableChange={value => {
														setAttributes( {
															displayHoverShadow: value,
														} );
													}}
													onColorChange={value => {
														saveShadowHover( { color: value } );
													}}
													onOpacityChange={value => {
														saveShadowHover( { opacity: value } );
													}}
													onHOffsetChange={value => {
														saveShadowHover( { hOffset: value } );
													}}
													onVOffsetChange={value => {
														saveShadowHover( { vOffset: value } );
													}}
													onBlurChange={value => {
														saveShadowHover( { blur: value } );
													}}
													onSpreadChange={value => {
														saveShadowHover( { spread: value } );
													}}
													onInsetChange={value => {
														saveShadowHover( { inset: value } );
													}}
												/>
											</>
										}
										normal={
											<>
												<ResponsiveBorderControl
													label={__( 'Border', 'gutenam-blocks' )}
													value={ borderStyle ? JSON.parse( JSON.stringify( borderStyle ) ) : '' }
													tabletValue={tabletBorderStyle}
													mobileValue={mobileBorderStyle}
													onChange={( value ) => setAttributes( { borderStyle:value } )}
													onChangeTablet={( value ) => setAttributes( { tabletBorderStyle: value } )}
													onChangeMobile={( value ) => setAttributes( { mobileBorderStyle: value } )}
												/>
												<ResponsiveMeasurementControls
													label={__( 'Border Radius', 'gutenam-blocks' )}
													value={borderRadius}
													tabletValue={tabletBorderRadius}
													mobileValue={mobileBorderRadius}
													onChange={( value ) => setAttributes( { borderRadius: value } )}
													onChangeTablet={( value ) => setAttributes( { tabletBorderRadius: value } )}
													onChangeMobile={( value ) => setAttributes( { mobileBorderRadius: value } )}
													unit={borderRadiusUnit}
													units={[ 'px', 'em', 'rem', '%' ]}
													onUnit={( value ) => setAttributes( { borderRadiusUnit: value } )}
													max={(borderRadiusUnit === 'em' || borderRadiusUnit === 'rem' ? 24 : 500)}
													step={(borderRadiusUnit === 'em' || borderRadiusUnit === 'rem' ? 0.1 : 1)}
													min={ 0 }
													isBorderRadius={ true }
													allowEmpty={true}
												/>
												<BoxShadowControl
													label={__( 'Box Shadow', 'gutenam-blocks' )}
													enable={( undefined !== displayShadow ? displayShadow : false )}
													color={( undefined !== shadow && undefined !== shadow[ 0 ] && undefined !== shadow[ 0 ].color ? shadow[ 0 ].color : '#000000' )}
													colorDefault={'#000000'}
													onArrayChange={( color, opacity ) => {
														saveShadow( { color: color, opacity: opacity } );
													}}
													opacity={( undefined !== shadow && undefined !== shadow[ 0 ] && undefined !== shadow[ 0 ].opacity ? shadow[ 0 ].opacity : 0.2 )}
													hOffset={( undefined !== shadow && undefined !== shadow[ 0 ] && undefined !== shadow[ 0 ].hOffset ? shadow[ 0 ].hOffset : 0 )}
													vOffset={( undefined !== shadow && undefined !== shadow[ 0 ] && undefined !== shadow[ 0 ].vOffset ? shadow[ 0 ].vOffset : 0 )}
													blur={( undefined !== shadow && undefined !== shadow[ 0 ] && undefined !== shadow[ 0 ].blur ? shadow[ 0 ].blur : 14 )}
													spread={( undefined !== shadow && undefined !== shadow[ 0 ] && undefined !== shadow[ 0 ].spread ? shadow[ 0 ].spread : 0 )}
													inset={( undefined !== shadow && undefined !== shadow[ 0 ] && undefined !== shadow[ 0 ].inset ? shadow[ 0 ].inset : false )}
													onEnableChange={value => {
														setAttributes( {
															displayShadow: value,
														} );
													}}
													onColorChange={value => {
														saveShadow( { color: value } );
													}}
													onOpacityChange={value => {
														saveShadow( { opacity: value } );
													}}
													onHOffsetChange={value => {
														saveShadow( { hOffset: value } );
													}}
													onVOffsetChange={value => {
														saveShadow( { vOffset: value } );
													}}
													onBlurChange={value => {
														saveShadow( { blur: value } );
													}}
													onSpreadChange={value => {
														saveShadow( { spread: value } );
													}}
													onInsetChange={value => {
														saveShadow( { inset: value } );
													}}
												/>
											</>
										}
									/>
								</BasePanelBody>
								<div className="bst-sidebar-settings-spacer"></div>
								{showSettings( 'textColor', 'base/column' ) && (
									<BasePanelBody
										title={__( 'Text Color Settings', 'gutenam-blocks' )}
										initialOpen={false}
										panelName={'bsb-col-text-color-settings'}
									>
										<HoverToggleControl
										hover={
											<ColorGroup>
												<PopColorControl
													label={__( 'Text Color', 'gutenam-blocks' )}
													value={( textColorHover ? textColorHover : '' )}
													default={''}
													onChange={value => setAttributes( { textColorHover: value } )}
												/>
												<PopColorControl
													label={__( 'Text Link Color', 'gutenam-blocks' )}
													value={( linkColorHover ? linkColorHover : '' )}
													default={''}
													onChange={value => setAttributes( { linkColorHover: value } )}
												/>
												<PopColorControl
													label={__( 'Text Link Hover Color', 'gutenam-blocks' )}
													value={( linkHoverColorHover ? linkHoverColorHover : '' )}
													default={''}
													onChange={value => setAttributes( { linkHoverColorHover: value } )}
												/>
											</ColorGroup>
										}
										normal={
											<ColorGroup>
												<PopColorControl
													label={__( 'Text Color', 'gutenam-blocks' )}
													value={( textColor ? textColor : '' )}
													default={''}
													onChange={value => setAttributes( { textColor: value } )}
												/>
												<PopColorControl
													label={__( 'Text Link Color', 'gutenam-blocks' )}
													value={( linkColor ? linkColor : '' )}
													default={''}
													onChange={value => setAttributes( { linkColor: value } )}
												/>
												<PopColorControl
													label={__( 'Text Link Hover Color', 'gutenam-blocks' )}
													value={( linkHoverColor ? linkHoverColor : '' )}
													default={''}
													onChange={value => setAttributes( { linkHoverColor: value } )}
												/>
											</ColorGroup>
										}
										/>
									</BasePanelBody>
								) }
							</>
						}
					</InspectorControls>
				</>
			) }
			<div id={ `animate-id${ uniqueID }` } data-aos={ ( baseAnimation ? baseAnimation : undefined ) } data-aos-duration={ ( baseAOSOptions && baseAOSOptions[ 0 ] && baseAOSOptions[ 0 ].duration ? baseAOSOptions[ 0 ].duration : undefined ) } data-aos-easing={ ( baseAOSOptions && baseAOSOptions[ 0 ] && baseAOSOptions[ 0 ].easing ? baseAOSOptions[ 0 ].easing : undefined ) } style={ {
				minHeight: ( undefined !== previewMinHeight ? previewMinHeight + previewMinHeightUnit : undefined ),
				paddingLeft: ( undefined !== previewPaddingLeft ? getSpacingOptionOutput( previewPaddingLeft, previewPaddingType ) : undefined ),
				paddingRight: ( undefined !== previewPaddingRight ? getSpacingOptionOutput( previewPaddingRight, previewPaddingType ) : undefined ),
				paddingTop: ( undefined !== previewPaddingTop ? getSpacingOptionOutput( previewPaddingTop, previewPaddingType ) : undefined ),
				paddingBottom: ( undefined !== previewPaddingBottom ? getSpacingOptionOutput( previewPaddingBottom, previewPaddingType ) : undefined ),
				marginLeft: ( undefined !== previewMarginLeft ? getSpacingOptionOutput( previewMarginLeft, previewMarginType ) : undefined ),
				marginRight: ( undefined !== previewMarginRight ? getSpacingOptionOutput( previewMarginRight, previewMarginType ) : undefined ),
				marginTop: ( undefined !== previewMarginTop ? getSpacingOptionOutput( previewMarginTop, previewMarginType ) : undefined ),
				marginBottom: ( undefined !== previewMarginBottom ? getSpacingOptionOutput( previewMarginBottom, previewMarginType ) : undefined ),
				textAlign: ( previewAlign ? previewAlign : undefined ),
				backgroundColor: backgroundString,
				backgroundImage: (previewBackground ? previewBackground : undefined ),
				backgroundSize: ( backgroundImg && backgroundImg[ 0 ] && backgroundImg[ 0 ].bgImgSize ? backgroundImg[ 0 ].bgImgSize : undefined ),
				backgroundPosition: ( backgroundImg && backgroundImg[ 0 ] && backgroundImg[ 0 ].bgImgPosition ? backgroundImg[ 0 ].bgImgPosition : undefined ),
				backgroundRepeat: ( backgroundImg && backgroundImg[ 0 ] && backgroundImg[ 0 ].bgImgRepeat ? backgroundImg[ 0 ].bgImgRepeat : undefined ),
				backgroundAttachment: ( backgroundImg && backgroundImg[ 0 ] && backgroundImg[ 0 ].bgImgAttachment ? backgroundImg[ 0 ].bgImgAttachment : undefined ),
				borderTop: ( previewBorderTopStyle ? previewBorderTopStyle : undefined ),
				borderRight: ( previewBorderRightStyle ? previewBorderRightStyle : undefined ),
				borderBottom: ( previewBorderBottomStyle ? previewBorderBottomStyle : undefined ),
				borderLeft: ( previewBorderLeftStyle ? previewBorderLeftStyle : undefined ),
				borderTopLeftRadius: ( previewRadiusTop ? previewRadiusTop + ( borderRadiusUnit ? borderRadiusUnit : 'px' ) : undefined ),
				borderTopRightRadius: ( previewRadiusRight ? previewRadiusRight + ( borderRadiusUnit ? borderRadiusUnit : 'px' ) : undefined ),
				borderBottomRightRadius: ( previewRadiusBottom ? previewRadiusBottom + ( borderRadiusUnit ? borderRadiusUnit : 'px' ) : undefined ),
				borderBottomLeftRadius: ( previewRadiusLeft ? previewRadiusLeft + ( borderRadiusUnit ? borderRadiusUnit : 'px' ) : undefined ),
				boxShadow: ( undefined !== displayShadow && displayShadow && undefined !== shadow && undefined !== shadow[ 0 ] && undefined !== shadow[ 0 ].color ? ( undefined !== shadow[ 0 ].inset && shadow[ 0 ].inset ? 'inset ' : '' ) + ( undefined !== shadow[ 0 ].hOffset ? shadow[ 0 ].hOffset : 0 ) + 'px ' + ( undefined !== shadow[ 0 ].vOffset ? shadow[ 0 ].vOffset : 0 ) + 'px ' + ( undefined !== shadow[ 0 ].blur ? shadow[ 0 ].blur : 14 ) + 'px ' + ( undefined !== shadow[ 0 ].spread ? shadow[ 0 ].spread : 0 ) + 'px ' + BaseColorOutput( ( undefined !== shadow[ 0 ].color ? shadow[ 0 ].color : '#000000' ), ( undefined !== shadow[ 0 ].opacity ? shadow[ 0 ].opacity : 1 ) ) : undefined ),
			} } { ...innerBlocksProps }>
			</div>
			<SpacingVisualizer
				style={ {
					marginLeft: ( undefined !== previewMarginLeft ? getSpacingOptionOutput( previewMarginLeft, previewMarginType ) : undefined ),
					marginRight: ( undefined !== previewMarginRight ? getSpacingOptionOutput( previewMarginRight, previewMarginType ) : undefined ),
					marginTop: ( undefined !== previewMarginTop ? getSpacingOptionOutput( previewMarginTop, previewMarginType ) : undefined ),
					marginBottom: ( undefined !== previewMarginBottom ? getSpacingOptionOutput( previewMarginBottom, previewMarginType ) : undefined ),
				} }
				type="inside"
				forceShow={ paddingMouseOver.isMouseOver }
				spacing={ [ getSpacingOptionOutput( previewPaddingTop, previewPaddingType ), getSpacingOptionOutput( previewPaddingRight, previewPaddingType ), getSpacingOptionOutput( previewPaddingBottom, previewPaddingType ), getSpacingOptionOutput( previewPaddingLeft, previewPaddingType ) ] }
			/>
			<SpacingVisualizer
				type="outsideVertical"
				forceShow={ marginMouseOver.isMouseOver }
				spacing={ [ getSpacingOptionOutput( previewMarginTop, previewMarginType ), getSpacingOptionOutput( previewMarginRight, previewMarginType ), getSpacingOptionOutput( previewMarginBottom, previewMarginType ), getSpacingOptionOutput( previewMarginLeft, previewMarginType ) ] }
			/>
		</div>
	);
}
export default SectionEdit;
