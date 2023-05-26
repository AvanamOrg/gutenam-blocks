/**
 * BLOCK: Base Info Block
 *
 * Registering a basic block with Gutenberg.
 */

/**
 * Import Css
 */
import './editor.scss';
import metadata from './block.json';
/**
 * Import Icons
 */
import {
	infoLeftIcon,
	infoStartIcon,
	infoBasicIcon,
	infoLeftAboveIcon,
	infoTopOverlayIcon,
	infoLeftOverlayIcon,
} from '@base/icons';
import classnames from 'classnames';

import { debounce, map, get } from 'lodash';
import {
	PopColorControl,
	TypographyControls,
	RangeControl,
	BasePanelBody,
	BaseIconPicker,
	IconRender,
	URLInputControl,
	WebfontLoader,
	BoxShadowControl,
	BaseImageControl,
	BaseMediaPlaceholder,
	ImageSizeControl,
	MeasurementControls,
	ResponsiveRangeControls,
	InspectorControlTabs,
	ResponsiveAlignControls,
	ResponsiveControl,
	SmallResponsiveControl,
	ResponsiveBorderControl,
	BaseBlockDefaults,
	ResponsiveMeasureRangeControl,
	ResponsiveMeasurementControls,
	SpacingVisualizer,
	HoverToggleControl,
	ColorGroup,
	CopyPasteAttributes,
} from '@base/components';

import {
	BaseColorOutput,
	getPreviewSize,
	showSettings,
	mouseOverVisualizer,
	getSpacingOptionOutput,
	ConvertColor,
	getBorderStyle,
	setBlockDefaults,
	getUniqueId,
	getInQueryBlock,
	getFontSizeOptionOutput
} from '@base/helpers';

/**
 * Internal block libraries
 */
import { __ } from '@wordpress/i18n';
import {
	useEffect,
	useState,
	Fragment,
} from '@wordpress/element';

import {
	MediaUpload,
	RichText,
	AlignmentToolbar,
	InspectorControls,
	BlockControls,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	Button,
	Dropdown,
	ButtonGroup,
	TabPanel,
	Dashicon,
	ToolbarGroup,
	TextControl,
	ToggleControl,
	SelectControl,
} from '@wordpress/components';
import {
	applyFilters,
} from '@wordpress/hooks';

import {
	image,
	starFilled,
	plusCircleFilled,
} from '@wordpress/icons';

import { useSelect, useDispatch } from '@wordpress/data';
/**
 * Build the overlay edit
 */

function BaseInfoBox( { attributes, className, setAttributes, isSelected, context, clientId, name } ) {

	const {
		uniqueID,
		link,
		linkProperty,
		target,
		hAlign,
		containerBackground,
		containerHoverBackground,
		containerBorder,
		containerHoverBorder,
		containerBorderWidth,
		containerBorderRadius,
		containerPadding,
		containerPaddingType,
		containerMobilePadding,
		containerTabletPadding,
		mediaType,
		mediaImage,
		mediaIcon,
		mediaStyle,
		mediaAlign,
		displayTitle,
		title,
		titleColor,
		titleHoverColor,
		titleFont,
		displayText,
		contentText,
		textColor,
		textHoverColor,
		textFont,
		textSpacing,
		displayLearnMore,
		learnMore,
		learnMoreStyles,
		displayShadow,
		shadow,
		shadowHover,
		containerHoverBackgroundOpacity,
		containerBackgroundOpacity,
		containerHoverBorderOpacity,
		containerBorderOpacity,
		textMinHeight,
		titleMinHeight,
		maxWidthUnit,
		maxWidth,
		mediaVAlign,
		mediaAlignMobile,
		mediaAlignTablet,
		hAlignMobile,
		hAlignTablet,
		containerMargin,
		tabletContainerMargin,
		mobileContainerMargin,
		containerMarginUnit,
		linkNoFollow,
		linkSponsored,
		number,
		mediaNumber,
		imageRatio,
		linkTitle,
		baseDynamic,
		inQueryBlock,
		borderStyle,
		borderRadius,
		borderRadiusUnit,
		tabletBorderStyle,
		tabletBorderRadius,
		mobileBorderStyle,
		mobileBorderRadius,
		borderHoverRadius,
		borderHoverStyle,
		borderHoverRadiusUnit,
		tabletBorderHoverStyle,
		tabletBorderHoverRadius,
		mobileBorderHoverStyle,
		mobileBorderHoverRadius,
		tabletMaxWidth,
		mobileMaxWidth,
		bbVersion,
		titleTagType
	} = attributes;
	const [ mediaBorderControl, setMediaBorderControl ] = useState( 'linked' );
	const [ mediaPaddingControl, setMediaPaddingControl ] = useState( 'linked' );
	const [ mediaMarginControl, setMediaMarginControl ] = useState( 'linked' );
	const [ activeTab, setActiveTab ] = useState( 'general' );

	const paddingMouseOver = mouseOverVisualizer();
	const marginMouseOver = mouseOverVisualizer();
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
		setBlockDefaults( 'base/infobox', attributes);

		let uniqueId = getUniqueId( uniqueID, clientId, isUniqueID, isUniqueBlock );
		if ( uniqueId !== uniqueID ) {
			attributes.uniqueID = uniqueId;
			setAttributes( { uniqueID: uniqueId } );
			addUniqueID( uniqueId, clientId );
		} else {
			addUniqueID( uniqueID, clientId );
		}

		setAttributes( { inQueryBlock: getInQueryBlock( context, inQueryBlock ) } );
		if ( ! bbVersion || bbVersion < 2 ) {
			setAttributes( { bbVersion: 2 } );
		}
		debounce( getDynamic.bind( this ), 200 );
	}, [] );
	useEffect( () => {
		if ( mediaStyle[ 0 ].borderWidth[ 0 ] === mediaStyle[ 0 ].borderWidth[ 1 ] && mediaStyle[ 0 ].borderWidth[ 0 ] === mediaStyle[ 0 ].borderWidth[ 2 ] && mediaStyle[ 0 ].borderWidth[ 0 ] === mediaStyle[ 0 ].borderWidth[ 3 ] ) {
			setMediaBorderControl( 'linked' );
		} else {
			setMediaBorderControl( 'individual' );
		}
		if ( mediaStyle[ 0 ].padding[ 0 ] === mediaStyle[ 0 ].padding[ 1 ] && mediaStyle[ 0 ].padding[ 0 ] === mediaStyle[ 0 ].padding[ 2 ] && mediaStyle[ 0 ].padding[ 0 ] === mediaStyle[ 0 ].padding[ 3 ] ) {
			setMediaPaddingControl( 'linked' );
		} else {
			setMediaPaddingControl( 'individual' );
		}
		if ( mediaStyle[ 0 ].margin[ 0 ] === mediaStyle[ 0 ].margin[ 1 ] && mediaStyle[ 0 ].margin[ 0 ] === mediaStyle[ 0 ].margin[ 2 ] && mediaStyle[ 0 ].margin[ 0 ] === mediaStyle[ 0 ].margin[ 3 ] ) {
			setMediaMarginControl( 'linked' );
		} else {
			setMediaMarginControl( 'individual' );
		}
		// Update from old border settings.
		if ( ( '' !== containerBorderRadius ) ) {
			setAttributes( { borderRadius: [ containerBorderRadius, containerBorderRadius, containerBorderRadius, containerBorderRadius ], containerBorderRadius: '' } );
		}
		let tempBorderStyle = JSON.parse( JSON.stringify( attributes.borderStyle ? attributes.borderStyle : [{
			top: [ '', '', '' ],
			right: [ '', '', '' ],
			bottom: [ '', '', '' ],
			left: [ '', '', '' ],
			unit: 'px'
		}] ) );
		let updateBorderStyle = false;
		if ( ( '' !== containerBorder ) ) {
			tempBorderStyle[0].top[0] = ConvertColor( containerBorder, ( undefined !== containerBorderOpacity ? containerBorderOpacity : 1 ) );
			tempBorderStyle[0].right[0] = ConvertColor( containerBorder, ( undefined !== containerBorderOpacity ? containerBorderOpacity : 1 ) );
			tempBorderStyle[0].bottom[0] = ConvertColor( containerBorder, ( undefined !== containerBorderOpacity ? containerBorderOpacity : 1 ) );
			tempBorderStyle[0].left[0] = ConvertColor( containerBorder, ( undefined !== containerBorderOpacity ? containerBorderOpacity : 1 ) );
			updateBorderStyle = true;
			setAttributes( { containerBorder: '' } );
		}
		if ( ( '' !== containerBorderWidth?.[0] || '' !== containerBorderWidth?.[1] || '' !== containerBorderWidth?.[2] || '' !== containerBorderWidth?.[3] ) ) {
			tempBorderStyle[0].top[2] = containerBorderWidth?.[0] || '';
			tempBorderStyle[0].right[2] = containerBorderWidth?.[1] || '';
			tempBorderStyle[0].bottom[2] = containerBorderWidth?.[2] || '';
			tempBorderStyle[0].left[2] = containerBorderWidth?.[3] || '';
			updateBorderStyle = true;
			setAttributes( { containerBorderWidth:[ '', '', '', '' ] } );
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
		if ( ( '' !== containerHoverBorder ) ) {
			tempBorderHoverStyle[0].top[0] = ConvertColor( containerHoverBorder, ( undefined !== containerHoverBorderOpacity ? containerHoverBorderOpacity : 1 ) );
			tempBorderHoverStyle[0].right[0] = ConvertColor( containerHoverBorder, ( undefined !== containerHoverBorderOpacity ? containerHoverBorderOpacity : 1 ) );
			tempBorderHoverStyle[0].bottom[0] = ConvertColor( containerHoverBorder, ( undefined !== containerHoverBorderOpacity ? containerHoverBorderOpacity : 1 ) );
			tempBorderHoverStyle[0].left[0] = ConvertColor( containerHoverBorder, ( undefined !== containerHoverBorderOpacity ? containerHoverBorderOpacity : 1 ) );
			setAttributes( { containerHoverBorder:'', borderHoverStyle: tempBorderHoverStyle } );
		}
		if ( '' !== containerBackgroundOpacity && 1 !== containerBackgroundOpacity && containerBackground ) {
			setAttributes( { containerBackground: ConvertColor( containerBackground, ( undefined !== containerBackgroundOpacity ? containerBackgroundOpacity : 1 ) ), containerBackgroundOpacity: '' } );
		}
		if ( '' !== containerHoverBackgroundOpacity && 1 !== containerHoverBackgroundOpacity && containerHoverBackground ) {
			setAttributes( { containerHoverBackground: ConvertColor( containerHoverBackground, ( undefined !== containerHoverBackgroundOpacity ? containerHoverBackgroundOpacity : 1 ) ), containerHoverBackgroundOpacity: '' } );
		}
	}, [] );

	const getDynamic = () => {
		let contextPost = null;
		if ( context && context.queryId && context.postId ) {
			contextPost = context.postId;
		}
		if ( baseDynamic && baseDynamic[ 'mediaImage:0:url' ] && baseDynamic[ 'mediaImage:0:url' ].enable ) {
			applyFilters( 'base.dynamicImage', '', attributes, setAttributes, 'mediaImage:0:url', contextPost );
		}
	};
	const previewPaddingType = ( undefined !== containerPaddingType ? containerPaddingType : 'px' );
	const paddingMin = ( previewPaddingType === 'em' || previewPaddingType === 'rem' ? 0 : 0 );
	const paddingMax = ( previewPaddingType === 'em' || previewPaddingType === 'rem' ? 25 : 400 );
	const paddingStep = ( previewPaddingType === 'em' || previewPaddingType === 'rem' ? 0.1 : 1 );
	const previewContainerPaddingTop = getPreviewSize( previewDevice, ( undefined !== containerPadding && undefined !== containerPadding[ 0 ] ? containerPadding[ 0 ] : '' ), ( undefined !== containerTabletPadding && undefined !== containerTabletPadding[ 0 ] ? containerTabletPadding[ 0 ] : '' ), ( undefined !== containerMobilePadding && undefined !== containerMobilePadding[ 0 ] ? containerMobilePadding[ 0 ] : '' ) );
	const previewContainerPaddingRight = getPreviewSize( previewDevice, ( undefined !== containerPadding && undefined !== containerPadding[ 1 ] ? containerPadding[ 1 ] : '' ), ( undefined !== containerTabletPadding && undefined !== containerTabletPadding[ 1 ] ? containerTabletPadding[ 1 ] : '' ), ( undefined !== containerMobilePadding && undefined !== containerMobilePadding[ 1 ] ? containerMobilePadding[ 1 ] : '' ) );
	const previewContainerPaddingBottom = getPreviewSize( previewDevice, ( undefined !== containerPadding && undefined !== containerPadding[ 2 ] ? containerPadding[ 2 ] : '' ), ( undefined !== containerTabletPadding && undefined !== containerTabletPadding[ 2 ] ? containerTabletPadding[ 2 ] : '' ), ( undefined !== containerMobilePadding && undefined !== containerMobilePadding[ 2 ] ? containerMobilePadding[ 2 ] : '' ) );
	const previewContainerPaddingLeft = getPreviewSize( previewDevice, ( undefined !== containerPadding && undefined !== containerPadding[ 3 ] ? containerPadding[ 3 ] : '' ), ( undefined !== containerTabletPadding && undefined !== containerTabletPadding[ 3 ] ? containerTabletPadding[ 3 ] : '' ), ( undefined !== containerMobilePadding && undefined !== containerMobilePadding[ 3 ] ? containerMobilePadding[ 3 ] : '' ) );

	const previewContainerMarginTop = getPreviewSize( previewDevice, ( undefined !== containerMargin && undefined !== containerMargin[ 0 ] ? containerMargin[ 0 ] : '' ), ( undefined !== tabletContainerMargin && undefined !== tabletContainerMargin[ 0 ] ? tabletContainerMargin[ 0 ] : '' ), ( undefined !== mobileContainerMargin && undefined !== mobileContainerMargin[ 0 ] ? mobileContainerMargin[ 0 ] : '' ) );
	const previewContainerMarginRight = getPreviewSize( previewDevice, ( undefined !== containerMargin && undefined !== containerMargin[ 1 ] ? containerMargin[ 1 ] : '' ), ( undefined !== tabletContainerMargin && undefined !== tabletContainerMargin[ 1 ] ? tabletContainerMargin[ 1 ] : '' ), ( undefined !== mobileContainerMargin && undefined !== mobileContainerMargin[ 1 ] ? mobileContainerMargin[ 1 ] : '' ) );
	const previewContainerMarginBottom = getPreviewSize( previewDevice, ( undefined !== containerMargin && undefined !== containerMargin[ 2 ] ? containerMargin[ 2 ] : '' ), ( undefined !== tabletContainerMargin && undefined !== tabletContainerMargin[ 2 ] ? tabletContainerMargin[ 2 ] : '' ), ( undefined !== mobileContainerMargin && undefined !== mobileContainerMargin[ 2 ] ? mobileContainerMargin[ 2 ] : '' ) );
	const previewContainerMarginLeft = getPreviewSize( previewDevice, ( undefined !== containerMargin && undefined !== containerMargin[ 3 ] ? containerMargin[ 3 ] : '' ), ( undefined !== tabletContainerMargin && undefined !== tabletContainerMargin[ 3 ] ? tabletContainerMargin[ 3 ] : '' ), ( undefined !== mobileContainerMargin && undefined !== mobileContainerMargin[ 3 ] ? mobileContainerMargin[ 3 ] : '' ) );

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

	const previewTitleFontSize = getPreviewSize( previewDevice, ( undefined !== titleFont[ 0 ].size && undefined !== titleFont[ 0 ].size[ 0 ] ? titleFont[ 0 ].size[ 0 ] : '' ), ( undefined !== titleFont[ 0 ].size && undefined !== titleFont[ 0 ].size[ 1 ] ? titleFont[ 0 ].size[ 1 ] : '' ), ( undefined !== titleFont[ 0 ].size && undefined !== titleFont[ 0 ].size[ 2 ] ? titleFont[ 0 ].size[ 2 ] : '' ) );
	const previewTitleLineHeight = getPreviewSize( previewDevice, ( undefined !== titleFont[ 0 ].lineHeight && undefined !== titleFont[ 0 ].lineHeight[ 0 ] ? titleFont[ 0 ].lineHeight[ 0 ] : '' ), ( undefined !== titleFont[ 0 ].lineHeight && undefined !== titleFont[ 0 ].lineHeight[ 1 ] ? titleFont[ 0 ].lineHeight[ 1 ] : '' ), ( undefined !== titleFont[ 0 ].lineHeight && undefined !== titleFont[ 0 ].lineHeight[ 2 ] ? titleFont[ 0 ].lineHeight[ 2 ] : '' ) );
	const previewTitleMinHeight = getPreviewSize( previewDevice, ( undefined !== titleMinHeight && undefined !== titleMinHeight[ 0 ] ? titleMinHeight[ 0 ] : '' ), ( undefined !== titleMinHeight[ 1 ] && undefined !== titleMinHeight[ 1 ] ? titleMinHeight[ 1 ] : '' ), ( undefined !== titleMinHeight[ 2 ] && undefined !== titleMinHeight[ 2 ] ? titleMinHeight[ 2 ] : '' ) );

	const previewTextFontSize = getPreviewSize( previewDevice, ( undefined !== textFont[ 0 ].size && undefined !== textFont[ 0 ].size[ 0 ] ? textFont[ 0 ].size[ 0 ] : '' ), ( undefined !== textFont[ 0 ].size && undefined !== textFont[ 0 ].size[ 1 ] ? textFont[ 0 ].size[ 1 ] : '' ), ( undefined !== textFont[ 0 ].size && undefined !== textFont[ 0 ].size[ 2 ] ? textFont[ 0 ].size[ 2 ] : '' ) );
	const previewTextLineHeight = getPreviewSize( previewDevice, ( undefined !== textFont[ 0 ].lineHeight && undefined !== textFont[ 0 ].lineHeight[ 0 ] ? textFont[ 0 ].lineHeight[ 0 ] : '' ), ( undefined !== textFont[ 0 ].lineHeight && undefined !== textFont[ 0 ].lineHeight[ 1 ] ? textFont[ 0 ].lineHeight[ 1 ] : '' ), ( undefined !== textFont[ 0 ].lineHeight && undefined !== textFont[ 0 ].lineHeight[ 2 ] ? textFont[ 0 ].lineHeight[ 2 ] : '' ) );
	const previewTextMinHeight = getPreviewSize( previewDevice, ( undefined !== textMinHeight && undefined !== textMinHeight[ 0 ] ? textMinHeight[ 0 ] : '' ), ( undefined !== textMinHeight[ 1 ] && undefined !== textMinHeight[ 1 ] ? textMinHeight[ 1 ] : '' ), ( undefined !== textMinHeight[ 2 ] && undefined !== textMinHeight[ 2 ] ? textMinHeight[ 2 ] : '' ) );

	const previewLearnMoreFontSize = getPreviewSize( previewDevice, ( undefined !== learnMoreStyles[ 0 ].size && undefined !== learnMoreStyles[ 0 ].size[ 0 ] ? learnMoreStyles[ 0 ].size[ 0 ] : '' ), ( undefined !== learnMoreStyles[ 0 ].size && undefined !== learnMoreStyles[ 0 ].size[ 1 ] ? learnMoreStyles[ 0 ].size[ 1 ] : '' ), ( undefined !== learnMoreStyles[ 0 ].size && undefined !== learnMoreStyles[ 0 ].size[ 2 ] ? learnMoreStyles[ 0 ].size[ 2 ] : '' ) );
	const previewLearnMoreLineHeight = getPreviewSize( previewDevice, ( undefined !== learnMoreStyles[ 0 ].lineHeight && undefined !== learnMoreStyles[ 0 ].lineHeight[ 0 ] ? learnMoreStyles[ 0 ].lineHeight[ 0 ] : '' ), ( undefined !== learnMoreStyles[ 0 ].lineHeight && undefined !== learnMoreStyles[ 0 ].lineHeight[ 1 ] ? learnMoreStyles[ 0 ].lineHeight[ 1 ] : '' ), ( undefined !== learnMoreStyles[ 0 ].lineHeight && undefined !== learnMoreStyles[ 0 ].lineHeight[ 2 ] ? learnMoreStyles[ 0 ].lineHeight[ 2 ] : '' ) );

	const previewMediaIconSize = getPreviewSize( previewDevice, ( undefined !== mediaIcon[ 0 ] && undefined !== mediaIcon[ 0 ].size ? mediaIcon[ 0 ].size : '14' ), ( undefined !== mediaIcon[ 0 ].tabletSize && undefined !== mediaIcon[ 0 ].tabletSize ? mediaIcon[ 0 ].tabletSize : '' ), ( undefined !== mediaIcon[ 0 ].mobileSize && undefined !== mediaIcon[ 0 ].mobileSize ? mediaIcon[ 0 ].mobileSize : '' ) );

	const previewhAlign = getPreviewSize( previewDevice, ( '' !== hAlign ? hAlign : 'center' ), ( '' !== hAlignTablet ? hAlignTablet : '' ), ( '' !== hAlignMobile ? hAlignMobile : '' ) );
	const previewMediaAlign = getPreviewSize( previewDevice, ( '' !== mediaAlign ? mediaAlign : 'top' ), ( '' !== mediaAlignTablet ? mediaAlignTablet : '' ), ( '' !== mediaAlignMobile ? mediaAlignMobile : '' ) );

	const marginMin = ( containerMarginUnit === 'em' || containerMarginUnit === 'rem' ? -25 : -400 );
	const marginMax = ( containerMarginUnit === 'em' || containerMarginUnit === 'rem' ? 25 : 400 );
	const marginStep = ( containerMarginUnit === 'em' || containerMarginUnit === 'rem' ? 0.1 : 1 );

	const layoutPresetOptions = [
		{ key: 'simple', name: __( 'Basic', 'gutenam-blocks' ), icon: infoStartIcon },
		{ key: 'basic', name: __( 'Basic', 'gutenam-blocks' ), icon: infoBasicIcon },
		{ key: 'leftabove', name: __( 'Left Above', 'gutenam-blocks' ), icon: infoLeftAboveIcon },
		{ key: 'left', name: __( 'Left', 'gutenam-blocks' ), icon: infoLeftIcon },
		{ key: 'overlay', name: __( 'Overlay', 'gutenam-blocks' ), icon: infoTopOverlayIcon },
		{ key: 'overlayleft', name: __( 'Overlay Left', 'gutenam-blocks' ), icon: infoLeftOverlayIcon },
	];
	const setPresetLayout = ( key ) => {
		if ( 'simple' === key ) {
			setAttributes( {
				hAlign                  : 'center',
				containerBackground     : ( '#ffffff' === containerBackground ? '' : containerBackground ),
				containerHoverBackground: containerHoverBackground,
				borderStyle             : [ {
					top: [ '', '', '' ],
					right: [ '', '', '' ],
					bottom: [ '', '', '' ],
					left: [ '', '', '' ],
					unit: 'px'
				}  ],
				borderRadius            : [ '', '', '', '' ],
				containerPadding        : [ 'xs', 'xs', 'xs', 'xs' ],
				containerMargin         : [ '', '', '', '' ],
				tabletContainerMargin   : [ '', '', '', '' ],
				mobileContainerMargin   : [ '', '', '', '' ],
				containerMarginUnit     : 'px',
				mediaAlign              : 'top',
				mediaIcon               : [ {
					icon          : mediaIcon[ 0 ].icon,
					size          : 50,
					width         : mediaIcon[ 0 ].width,
					title         : mediaIcon[ 0 ].title,
					color         : mediaIcon[ 0 ].color,
					hoverColor    : mediaIcon[ 0 ].hoverColor,
					hoverAnimation: mediaIcon[ 0 ].hoverAnimation,
					flipIcon      : mediaIcon[ 0 ].flipIcon,
				} ],
				mediaStyle              : [ {
					background     : ( 'var(--global-palette7, #eeeeee)' === mediaStyle[ 0 ].background || '#eeeeee' === mediaStyle[ 0 ].background ? '' : mediaStyle[ 0 ].background ),
					hoverBackground: mediaStyle[ 0 ].hoverBackground,
					border         : mediaStyle[ 0 ].border,
					hoverBorder    : mediaStyle[ 0 ].hoverBorder,
					borderRadius   : 0,
					borderWidth    : [ 0, 0, 0, 0 ],
					padding        : [ 10, 10, 10, 10 ],
					margin         : [ 0, 15, 0, 15 ],
				} ],
				titleFont               : [ {
					level         : titleFont[ 0 ].level,
					size          : titleFont[ 0 ].size,
					sizeType      : titleFont[ 0 ].sizeType,
					lineHeight    : titleFont[ 0 ].lineHeight,
					lineType      : titleFont[ 0 ].lineType,
					letterSpacing : titleFont[ 0 ].letterSpacing,
					textTransform : titleFont[ 0 ].textTransform,
					family        : titleFont[ 0 ].family,
					google        : titleFont[ 0 ].google,
					style         : titleFont[ 0 ].style,
					weight        : titleFont[ 0 ].weight,
					variant       : titleFont[ 0 ].variant,
					subset        : titleFont[ 0 ].subset,
					loadGoogle    : titleFont[ 0 ].loadGoogle,
					padding       : [ 0, 0, 0, 0 ],
					paddingControl: 'linked',
					margin        : [ 5, 0, 10, 0 ],
					marginControl : 'individual',
				} ],
			} );
		} else if ( 'basic' === key ) {
			setAttributes( {
				hAlign                  : 'center',
				containerBackground     : ( '' === containerBackground ? '#ffffff' : containerBackground ),
				containerHoverBackground: containerHoverBackground,
				borderStyle             : [ {
					top: [ 'var(--global-palette7, #eeeeee)', '', 5 ],
					right: [ 'var(--global-palette7, #eeeeee)', '', 5 ],
					bottom: [ 'var(--global-palette7, #eeeeee)', '', 5 ],
					left: [ 'var(--global-palette7, #eeeeee)', '', 5 ],
					unit: 'px'
				} ],
				borderRadius            : [ 30, 30, 30, 30 ],
				containerPadding        : [ 'xs', 'xs', 'xs', 'xs' ],
				containerMargin         : [ '', '', '', '' ],
				tabletContainerMargin   : [ '', '', '', '' ],
				mobileContainerMargin   : [ '', '', '', '' ],
				containerMarginUnit     : 'px',
				mediaAlign              : 'top',
				mediaIcon               : [ {
					icon          : mediaIcon[ 0 ].icon,
					size          : 50,
					width         : mediaIcon[ 0 ].width,
					title         : mediaIcon[ 0 ].title,
					color         : mediaIcon[ 0 ].color,
					hoverColor    : mediaIcon[ 0 ].hoverColor,
					hoverAnimation: mediaIcon[ 0 ].hoverAnimation,
					flipIcon      : mediaIcon[ 0 ].flipIcon,
				} ],
				mediaStyle              : [ {
					background     : ( '' === mediaStyle[ 0 ].background || '#ffffff' === mediaStyle[ 0 ].background ? 'var(--global-palette7, #eeeeee)' : mediaStyle[ 0 ].background ),
					hoverBackground: mediaStyle[ 0 ].hoverBackground,
					border         : mediaStyle[ 0 ].border,
					hoverBorder    : mediaStyle[ 0 ].hoverBorder,
					borderRadius   : 200,
					borderWidth    : [ 0, 0, 0, 0 ],
					padding        : ( ( 'icon' === mediaType || 'number' === mediaType ) ? [ 20, 20, 20, 20 ] : [ 0, 0, 0, 0 ] ),
					margin         : [ 0, 15, 10, 15 ],
				} ],
				mediaImage              : [ {
					url           : mediaImage[ 0 ].url,
					id            : mediaImage[ 0 ].id,
					alt           : mediaImage[ 0 ].alt,
					width         : mediaImage[ 0 ].width,
					height        : mediaImage[ 0 ].height,
					maxWidth      : 100,
					hoverAnimation: mediaImage[ 0 ].hoverAnimation,
					flipUrl       : mediaImage[ 0 ].flipUrl,
					flipId        : mediaImage[ 0 ].flipId,
					flipAlt       : mediaImage[ 0 ].flipAlt,
					flipWidth     : mediaImage[ 0 ].flipWidth,
					flipHeight    : mediaImage[ 0 ].flipHeight,
					subtype       : mediaImage[ 0 ].subtype,
					flipSubtype   : mediaImage[ 0 ].flipSubtype,
				} ],
				titleFont               : [ {
					level         : titleFont[ 0 ].level,
					size          : titleFont[ 0 ].size,
					sizeType      : titleFont[ 0 ].sizeType,
					lineHeight    : titleFont[ 0 ].lineHeight,
					lineType      : titleFont[ 0 ].lineType,
					letterSpacing : titleFont[ 0 ].letterSpacing,
					textTransform : titleFont[ 0 ].textTransform,
					family        : titleFont[ 0 ].family,
					google        : titleFont[ 0 ].google,
					style         : titleFont[ 0 ].style,
					weight        : titleFont[ 0 ].weight,
					variant       : titleFont[ 0 ].variant,
					subset        : titleFont[ 0 ].subset,
					loadGoogle    : titleFont[ 0 ].loadGoogle,
					padding       : [ 0, 0, 0, 0 ],
					paddingControl: 'linked',
					margin        : [ 5, 0, 10, 0 ],
					marginControl : 'individual',
				} ],
			} );
		} else if ( 'leftabove' === key ) {
			setAttributes( {
				hAlign                  : 'left',
				containerBackground     : ( '' === containerBackground ? '#ffffff' : containerBackground ),
				containerHoverBackground: containerHoverBackground,
				borderStyle             : [ {
					top: [ 'var(--global-palette7, #eeeeee)', '', 5 ],
					right: [ 'var(--global-palette7, #eeeeee)', '', 5 ],
					bottom: [ 'var(--global-palette7, #eeeeee)', '', 5 ],
					left: [ 'var(--global-palette7, #eeeeee)', '', 5 ],
					unit: 'px'
				} ],
				borderRadius            : [ '', '', '', '' ],
				containerPadding        : [ 'sm', 'sm', 'sm', 'sm' ],
				containerMargin         : [ '', '', '', '' ],
				tabletContainerMargin   : [ '', '', '', '' ],
				mobileContainerMargin   : [ '', '', '', '' ],
				containerMarginUnit     : 'px',
				mediaAlign              : 'top',
				mediaIcon               : [ {
					icon          : mediaIcon[ 0 ].icon,
					size          : 50,
					width         : mediaIcon[ 0 ].width,
					title         : mediaIcon[ 0 ].title,
					color         : mediaIcon[ 0 ].color,
					hoverColor    : mediaIcon[ 0 ].hoverColor,
					hoverAnimation: mediaIcon[ 0 ].hoverAnimation,
					flipIcon      : mediaIcon[ 0 ].flipIcon,
				} ],
				mediaStyle              : [ {
					background     : ( '' === mediaStyle[ 0 ].background || '#ffffff' === mediaStyle[ 0 ].background ? 'var(--global-palette7, #eeeeee)' : mediaStyle[ 0 ].background ),
					hoverBackground: mediaStyle[ 0 ].hoverBackground,
					border         : mediaStyle[ 0 ].border,
					hoverBorder    : mediaStyle[ 0 ].hoverBorder,
					borderRadius   : 0,
					borderWidth    : [ 0, 0, 0, 0 ],
					padding        : ( ( 'icon' === mediaType || 'number' === mediaType ) ? [ 20, 20, 20, 20 ] : [ 0, 0, 0, 0 ] ),
					margin         : [ 0, 0, 16, 0 ],
				} ],
				mediaImage              : [ {
					url           : mediaImage[ 0 ].url,
					id            : mediaImage[ 0 ].id,
					alt           : mediaImage[ 0 ].alt,
					width         : mediaImage[ 0 ].width,
					height        : mediaImage[ 0 ].height,
					maxWidth      : 100,
					hoverAnimation: mediaImage[ 0 ].hoverAnimation,
					flipUrl       : mediaImage[ 0 ].flipUrl,
					flipId        : mediaImage[ 0 ].flipId,
					flipAlt       : mediaImage[ 0 ].flipAlt,
					flipWidth     : mediaImage[ 0 ].flipWidth,
					flipHeight    : mediaImage[ 0 ].flipHeight,
					subtype       : mediaImage[ 0 ].subtype,
					flipSubtype   : mediaImage[ 0 ].flipSubtype,
				} ],
				titleFont               : [ {
					level         : titleFont[ 0 ].level,
					size          : titleFont[ 0 ].size,
					sizeType      : titleFont[ 0 ].sizeType,
					lineHeight    : titleFont[ 0 ].lineHeight,
					lineType      : titleFont[ 0 ].lineType,
					letterSpacing : titleFont[ 0 ].letterSpacing,
					textTransform : titleFont[ 0 ].textTransform,
					family        : titleFont[ 0 ].family,
					google        : titleFont[ 0 ].google,
					style         : titleFont[ 0 ].style,
					weight        : titleFont[ 0 ].weight,
					variant       : titleFont[ 0 ].variant,
					subset        : titleFont[ 0 ].subset,
					loadGoogle    : titleFont[ 0 ].loadGoogle,
					padding       : [ 0, 0, 0, 0 ],
					paddingControl: 'linked',
					margin        : [ 5, 0, 10, 0 ],
					marginControl : 'individual',
				} ],
			} );
		} else if ( 'left' === key ) {
			setAttributes( {
				hAlign                  : 'left',
				containerBackground     : ( '' === containerBackground ? '#ffffff' : containerBackground ),
				containerHoverBackground: containerHoverBackground,
				borderStyle             : [ {
					top: [ 'var(--global-palette7, #eeeeee)', '', 5 ],
					right: [ 'var(--global-palette7, #eeeeee)', '', 5 ],
					bottom: [ 'var(--global-palette7, #eeeeee)', '', 5 ],
					left: [ 'var(--global-palette7, #eeeeee)', '', 5 ],
					unit: 'px'
				} ],
				borderRadius            : [ 30, 30, 30, 30 ],
				containerPadding        : [ 'xs', 'xs', 'xs', 'xs' ],
				containerMargin         : [ '', '', '', '' ],
				tabletContainerMargin   : [ '', '', '', '' ],
				mobileContainerMargin   : [ '', '', '', '' ],
				containerMarginUnit     : 'px',
				mediaAlign              : 'left',
				mediaIcon               : [ {
					icon          : mediaIcon[ 0 ].icon,
					size          : 50,
					width         : mediaIcon[ 0 ].width,
					title         : mediaIcon[ 0 ].title,
					color         : mediaIcon[ 0 ].color,
					hoverColor    : mediaIcon[ 0 ].hoverColor,
					hoverAnimation: mediaIcon[ 0 ].hoverAnimation,
					flipIcon      : mediaIcon[ 0 ].flipIcon,
				} ],
				mediaStyle              : [ {
					background     : ( 'var(--global-palette7, #eeeeee)' === mediaStyle[ 0 ].background || '#eeeeee' === mediaStyle[ 0 ].background || '#ffffff' === mediaStyle[ 0 ].background ? '' : mediaStyle[ 0 ].background ),
					hoverBackground: mediaStyle[ 0 ].hoverBackground,
					border         : mediaStyle[ 0 ].border,
					hoverBorder    : mediaStyle[ 0 ].hoverBorder,
					borderRadius   : 200,
					borderWidth    : [ 0, 0, 0, 0 ],
					padding        : ( ( 'icon' === mediaType || 'number' === mediaType ) ? [ 20, 20, 20, 20 ] : [ 0, 0, 0, 0 ] ),
					margin         : [ 0, 20, 0, 0 ],
				} ],
				mediaImage              : [ {
					url           : mediaImage[ 0 ].url,
					id            : mediaImage[ 0 ].id,
					alt           : mediaImage[ 0 ].alt,
					width         : mediaImage[ 0 ].width,
					height        : mediaImage[ 0 ].height,
					maxWidth      : 100,
					hoverAnimation: mediaImage[ 0 ].hoverAnimation,
					flipUrl       : mediaImage[ 0 ].flipUrl,
					flipId        : mediaImage[ 0 ].flipId,
					flipAlt       : mediaImage[ 0 ].flipAlt,
					flipWidth     : mediaImage[ 0 ].flipWidth,
					flipHeight    : mediaImage[ 0 ].flipHeight,
					subtype       : mediaImage[ 0 ].subtype,
					flipSubtype   : mediaImage[ 0 ].flipSubtype,
				} ],
				titleFont               : [ {
					level         : titleFont[ 0 ].level,
					size          : titleFont[ 0 ].size,
					sizeType      : titleFont[ 0 ].sizeType,
					lineHeight    : titleFont[ 0 ].lineHeight,
					lineType      : titleFont[ 0 ].lineType,
					letterSpacing : titleFont[ 0 ].letterSpacing,
					textTransform : titleFont[ 0 ].textTransform,
					family        : titleFont[ 0 ].family,
					google        : titleFont[ 0 ].google,
					style         : titleFont[ 0 ].style,
					weight        : titleFont[ 0 ].weight,
					variant       : titleFont[ 0 ].variant,
					subset        : titleFont[ 0 ].subset,
					loadGoogle    : titleFont[ 0 ].loadGoogle,
					padding       : [ 0, 0, 0, 0 ],
					paddingControl: 'linked',
					margin        : [ 5, 0, 10, 0 ],
					marginControl : 'individual',
				} ],
			} );
		} else if ( 'overlay' === key ) {
			setAttributes( {
				hAlign                  : 'center',
				containerBackground     : ( '' === containerBackground ? '#ffffff' : containerBackground ),
				containerHoverBackground: containerHoverBackground,
				borderStyle             : [ {
					top: [ 'var(--global-palette7, #eeeeee)', '', 5 ],
					right: [ 'var(--global-palette7, #eeeeee)', '', 5 ],
					bottom: [ 'var(--global-palette7, #eeeeee)', '', 5 ],
					left: [ 'var(--global-palette7, #eeeeee)', '', 5 ],
					unit: 'px'
				} ],
				borderRadius            : [ 20, 20, 20, 20 ],
				containerPadding        : [ 'sm', 'sm', 'sm', 'sm' ],
				containerMargin         : [ 50, '', '', '' ],
				containerMarginUnit     : 'px',
				mediaAlign              : 'top',
				mediaIcon               : [ {
					icon          : mediaIcon[ 0 ].icon,
					size          : 50,
					width         : mediaIcon[ 0 ].width,
					title         : mediaIcon[ 0 ].title,
					color         : mediaIcon[ 0 ].color,
					hoverColor    : mediaIcon[ 0 ].hoverColor,
					hoverAnimation: mediaIcon[ 0 ].hoverAnimation,
					flipIcon      : mediaIcon[ 0 ].flipIcon,
				} ],
				mediaStyle              : [ {
					background     : ( 'var(--global-palette7, #eeeeee)' === mediaStyle[ 0 ].background || '#eeeeee' === mediaStyle[ 0 ].background || '' === mediaStyle[ 0 ].background ? '#ffffff' : mediaStyle[ 0 ].background ),
					hoverBackground: mediaStyle[ 0 ].hoverBackground,
					border         : ( '' === mediaStyle[ 0 ].border ? 'var(--global-palette7, #eeeeee)' : mediaStyle[ 0 ].border ),
					hoverBorder    : mediaStyle[ 0 ].hoverBorder,
					borderRadius   : 200,
					borderWidth    : [ 5, 5, 5, 5 ],
					padding        : ( 'icon' === mediaType ? [ 20, 20, 20, 20 ] : [ 0, 0, 0, 0 ] ),
					margin         : [ -75, 0, 20, 0 ],
				} ],
				mediaImage              : [ {
					url           : mediaImage[ 0 ].url,
					id            : mediaImage[ 0 ].id,
					alt           : mediaImage[ 0 ].alt,
					width         : mediaImage[ 0 ].width,
					height        : mediaImage[ 0 ].height,
					maxWidth      : 100,
					hoverAnimation: mediaImage[ 0 ].hoverAnimation,
					flipUrl       : mediaImage[ 0 ].flipUrl,
					flipId        : mediaImage[ 0 ].flipId,
					flipAlt       : mediaImage[ 0 ].flipAlt,
					flipWidth     : mediaImage[ 0 ].flipWidth,
					flipHeight    : mediaImage[ 0 ].flipHeight,
					subtype       : mediaImage[ 0 ].subtype,
					flipSubtype   : mediaImage[ 0 ].flipSubtype,
				} ],
				titleFont               : [ {
					level         : titleFont[ 0 ].level,
					size          : titleFont[ 0 ].size,
					sizeType      : titleFont[ 0 ].sizeType,
					lineHeight    : titleFont[ 0 ].lineHeight,
					lineType      : titleFont[ 0 ].lineType,
					letterSpacing : titleFont[ 0 ].letterSpacing,
					textTransform : titleFont[ 0 ].textTransform,
					family        : titleFont[ 0 ].family,
					google        : titleFont[ 0 ].google,
					style         : titleFont[ 0 ].style,
					weight        : titleFont[ 0 ].weight,
					variant       : titleFont[ 0 ].variant,
					subset        : titleFont[ 0 ].subset,
					loadGoogle    : titleFont[ 0 ].loadGoogle,
					padding       : [ 0, 0, 0, 0 ],
					paddingControl: 'linked',
					margin        : [ 5, 0, 10, 0 ],
					marginControl : 'individual',
				} ],
			} );
		} else if ( 'overlayleft' === key ) {
			setAttributes( {
				hAlign                  : 'left',
				containerBackground     : ( '' === containerBackground ? '#ffffff' : containerBackground ),
				containerHoverBackground: containerHoverBackground,
				borderStyle             : [ {
					top: [ 'var(--global-palette7, #eeeeee)', '', 5 ],
					right: [ 'var(--global-palette7, #eeeeee)', '', 5 ],
					bottom: [ 'var(--global-palette7, #eeeeee)', '', 5 ],
					left: [ 'var(--global-palette7, #eeeeee)', '', 5 ],
					unit: 'px'
				} ],
				borderRadius            : [ '', '', '', '' ],
				containerPadding        : [ 'sm', 'sm', 'sm', 'sm' ],
				containerMargin         : [ 50, '', '', '' ],
				containerMarginUnit     : 'px',
				mediaAlign              : 'top',
				mediaIcon               : [ {
					icon          : mediaIcon[ 0 ].icon,
					size          : 50,
					width         : mediaIcon[ 0 ].width,
					title         : mediaIcon[ 0 ].title,
					color         : mediaIcon[ 0 ].color,
					hoverColor    : mediaIcon[ 0 ].hoverColor,
					hoverAnimation: mediaIcon[ 0 ].hoverAnimation,
					flipIcon      : mediaIcon[ 0 ].flipIcon,
				} ],
				mediaStyle              : [ {
					background     : ( 'var(--global-palette7, #eeeeee)' === mediaStyle[ 0 ].background || '#eeeeee' === mediaStyle[ 0 ].background || '' === mediaStyle[ 0 ].background ? '#ffffff' : mediaStyle[ 0 ].background ),
					hoverBackground: mediaStyle[ 0 ].hoverBackground,
					border         : ( '' === mediaStyle[ 0 ].border ? 'var(--global-palette7, #eeeeee)' : mediaStyle[ 0 ].border ),
					hoverBorder    : mediaStyle[ 0 ].hoverBorder,
					borderRadius   : 0,
					borderWidth    : [ 5, 5, 5, 5 ],
					padding        : ( ( 'icon' === mediaType || 'number' === mediaType ) ? [ 20, 20, 20, 20 ] : [ 0, 0, 0, 0 ] ),
					margin         : [ -75, 0, 20, 0 ],
				} ],
				mediaImage              : [ {
					url           : mediaImage[ 0 ].url,
					id            : mediaImage[ 0 ].id,
					alt           : mediaImage[ 0 ].alt,
					width         : mediaImage[ 0 ].width,
					height        : mediaImage[ 0 ].height,
					maxWidth      : 100,
					hoverAnimation: mediaImage[ 0 ].hoverAnimation,
					flipUrl       : mediaImage[ 0 ].flipUrl,
					flipId        : mediaImage[ 0 ].flipId,
					flipAlt       : mediaImage[ 0 ].flipAlt,
					flipWidth     : mediaImage[ 0 ].flipWidth,
					flipHeight    : mediaImage[ 0 ].flipHeight,
					subtype       : mediaImage[ 0 ].subtype,
					flipSubtype   : mediaImage[ 0 ].flipSubtype,
				} ],
				titleFont               : [ {
					level         : titleFont[ 0 ].level,
					size          : titleFont[ 0 ].size,
					sizeType      : titleFont[ 0 ].sizeType,
					lineHeight    : titleFont[ 0 ].lineHeight,
					lineType      : titleFont[ 0 ].lineType,
					letterSpacing : titleFont[ 0 ].letterSpacing,
					textTransform : titleFont[ 0 ].textTransform,
					family        : titleFont[ 0 ].family,
					google        : titleFont[ 0 ].google,
					style         : titleFont[ 0 ].style,
					weight        : titleFont[ 0 ].weight,
					variant       : titleFont[ 0 ].variant,
					subset        : titleFont[ 0 ].subset,
					loadGoogle    : titleFont[ 0 ].loadGoogle,
					padding       : [ 0, 0, 0, 0 ],
					paddingControl: 'linked',
					margin        : [ 5, 0, 10, 0 ],
					marginControl : 'individual',
				} ],
			} );
		}
	};
	const onChangeTitle = value => {
		setAttributes( { title: value } );
	};
	const onChangeNumber = value => {
		setAttributes( { number: value } );
	};
	const gconfig = {
		google: {
			families: [ titleFont[ 0 ].family + ( titleFont[ 0 ].variant ? ':' + titleFont[ 0 ].variant : '' ) ],
		},
	};
	const tgconfig = {
		google: {
			families: [ textFont[ 0 ].family + ( textFont[ 0 ].variant ? ':' + textFont[ 0 ].variant : '' ) ],
		},
	};
	const lgconfig = {
		google: {
			families: [ learnMoreStyles[ 0 ].family + ( learnMoreStyles[ 0 ].variant ? ':' + learnMoreStyles[ 0 ].variant : '' ) ],
		},
	};
	const ngconfig = {
		google: {
			families: [ ( mediaNumber && mediaNumber[ 0 ] && mediaNumber[ 0 ].family ? mediaNumber[ 0 ].family : ' ' ) + ( mediaNumber && mediaNumber[ 0 ] && mediaNumber[ 0 ].variant ? ':' + mediaNumber[ 0 ].variant : '' ) ],
		},
	};
	const config = ( titleFont[ 0 ].google ? gconfig : '' );
	const tconfig = ( textFont[ 0 ].google ? tgconfig : '' );
	const lconfig = ( learnMoreStyles[ 0 ].google ? lgconfig : '' );
	const nconfig = ( mediaNumber && mediaNumber[ 0 ] && mediaNumber[ 0 ].google ? ngconfig : '' );
	const titleTagName = ( titleTagType !== 'heading' ) ? titleTagType : 'h' + titleFont[ 0 ].level;
	const ALLOWED_MEDIA_TYPES = [ 'image' ];
	const onSelectImage = media => {
		let url;
		let itemSize;
		if ( mediaImage[ 0 ] && mediaImage[ 0 ].width && mediaImage[ 0 ].height ) {
			const sizes = ( undefined !== media.sizes ? media.sizes : [] );
			const imgSizes = Object.keys( sizes ).map( ( item ) => {
				return { slug: item, name: item };
			} );
			map( imgSizes, ( { name, slug } ) => {
				const type = get( media, [ 'mime_type' ] );
				if ( 'image/svg+xml' === type ) {
					return null;
				}
				const sizeUrl = get( media, [ 'sizes', slug, 'url' ] );
				if ( !sizeUrl ) {
					return null;
				}
				const sizeWidth = get( media, [ 'sizes', slug, 'width' ] );
				if ( !sizeWidth ) {
					return null;
				}
				const sizeHeight = get( media, [ 'sizes', slug, 'height' ] );
				if ( !sizeHeight ) {
					return null;
				}
				if ( sizeHeight === mediaImage[ 0 ].height && sizeWidth === mediaImage[ 0 ].width ) {
					itemSize = slug;
					return null;
				}
			} );
		}
		const size = ( itemSize && '' !== itemSize ? itemSize : 'full' );
		if ( size !== 'full' ) {
			url =
				get( media, [ 'sizes', size, 'url' ] ) ||
				get( media, [
					'media_details',
					'sizes',
					size,
					'source_url',
				] );
		}
		const width = get( media, [ 'sizes', size, 'width' ] ) || get( media, [ 'media_details', 'sizes', size, 'width' ] ) || get( media, [ 'width' ] ) || get( media, [ 'media_details', 'width' ] );
		const height = get( media, [ 'sizes', size, 'height' ] ) || get( media, [ 'media_details', 'sizes', size, 'height' ] ) || get( media, [ 'height' ] ) || get( media, [ 'media_details', 'height' ] );
		const maxwidth = ( mediaImage[ 0 ] && mediaImage[ 0 ].maxWidth ? mediaImage[ 0 ].maxWidth : media.width );
		saveMediaImage( {
			id      : media.id,
			url     : url || media.url,
			alt     : media.alt,
			width   : width,
			height  : height,
			maxWidth: ( maxwidth ? maxwidth : 50 ),
			subtype : media.subtype,
		} );
	};
	const changeImageSize = img => {
		saveMediaImage( {
			url   : img.value,
			width : img.width,
			height: img.height,
		} );
	};
	const clearImage = () => {
		saveMediaImage( {
			id      : '',
			url     : '',
			alt     : '',
			width   : '',
			height  : '',
			maxWidth: '',
			subtype : '',
		} );
	};
	const onSelectFlipImage = media => {
		const width = get( media, [ 'width' ] ) ||
			get( media, [
				'media_details',
				'width',
			] );
		const height = get( media, [ 'height' ] ) ||
			get( media, [
				'media_details',
				'height',
			] );
		saveMediaImage( {
			flipId     : media.id,
			flipUrl    : media.url,
			flipAlt    : media.alt,
			flipWidth  : width,
			flipHeight : height,
			flipSubtype: media.subtype,
		} );
	};
	const clearFlipImage = () => {
		saveMediaImage( {
			flipId     : '',
			flipUrl    : '',
			flipAlt    : '',
			flipWidth  : '',
			flipHeight : '',
			flipSubtype: '',
		} );
	};
	const changeFlipImageSize = img => {
		saveMediaImage( {
			flipUrl   : img.value,
			flipWidth : img.width,
			flipHeight: img.height,
		} );
	};
	const isSelectedClass = ( isSelected ? 'is-selected' : 'not-selected' );
	const saveMediaImage = ( value ) => {
		const newUpdate = mediaImage.map( ( item, index ) => {
			if ( 0 === index ) {
				item = { ...item, ...value };
			}
			return item;
		} );
		setAttributes( {
			mediaImage: newUpdate,
		} );
	};
	const saveMediaIcon = ( value ) => {
		const newUpdate = mediaIcon.map( ( item, index ) => {
			if ( 0 === index ) {
				item = { ...item, ...value };
			}
			return item;
		} );
		setAttributes( {
			mediaIcon: newUpdate,
		} );
	};
	const saveMediaStyle = ( value ) => {
		const newUpdate = mediaStyle.map( ( item, index ) => {
			if ( 0 === index ) {
				item = { ...item, ...value };
			}
			return item;
		} );
		setAttributes( {
			mediaStyle: newUpdate,
		} );
	};
	const saveMediaNumber = ( value ) => {
		const newMediaNumber = mediaNumber ? mediaNumber : [ {
			family        : '',
			google        : false,
			hoverAnimation: 'none',
			style         : '',
			weight        : '',
			variant       : '',
			subset        : '',
			loadGoogle    : true,
		} ];
		const newNumberUpdate = newMediaNumber.map( ( item, index ) => {
			if ( 0 === index ) {
				item = { ...item, ...value };
			}
			return item;
		} );
		setAttributes( {
			mediaNumber: newNumberUpdate,
		} );
	};
	const saveTitleFont = ( value ) => {
		const newUpdate = titleFont.map( ( item, index ) => {
			if ( 0 === index ) {
				item = { ...item, ...value };
			}
			return item;
		} );
		setAttributes( {
			titleFont: newUpdate,
		} );
	};
	const saveTextFont = ( value ) => {
		const newUpdate = textFont.map( ( item, index ) => {
			if ( 0 === index ) {
				item = { ...item, ...value };
			}
			return item;
		} );
		setAttributes( {
			textFont: newUpdate,
		} );
	};
	const saveTextSpacing = ( value ) => {
		let tSpacing;
		if ( undefined === textSpacing || ( undefined !== textSpacing && undefined === textSpacing[ 0 ] ) ) {
			tSpacing = [ {
				padding       : [ '', '', '', '' ],
				paddingControl: 'linked',
				margin        : [ '', '', '', '' ],
				marginControl : 'linked',
			} ];
		} else {
			tSpacing = textSpacing;
		}
		const newUpdate = tSpacing.map( ( item, index ) => {
			if ( 0 === index ) {
				item = { ...item, ...value };
			}
			return item;
		} );
		setAttributes( {
			textSpacing: newUpdate,
		} );
	};
	const saveLearnMoreStyles = ( value ) => {
		const newUpdate = learnMoreStyles.map( ( item, index ) => {
			if ( 0 === index ) {
				item = { ...item, ...value };
			}
			return item;
		} );
		setAttributes( {
			learnMoreStyles: newUpdate,
		} );
	};
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
	const saveHoverShadow = ( value ) => {
		const newUpdate = shadowHover.map( ( item, index ) => {
			if ( 0 === index ) {
				item = { ...item, ...value };
			}
			return item;
		} );
		setAttributes( {
			shadowHover: newUpdate,
		} );
	};
	const onPaste = ( attributesToPaste ) => {
		if ( attributesToPaste ) {
			if ( attributesToPaste.mediaImage ) {
				saveMediaImage( attributesToPaste.mediaImage[ 0 ] );
				delete attributesToPaste.mediaImage;
			}
			if ( attributesToPaste.mediaIcon ) {
				saveMediaIcon( attributesToPaste.mediaIcon[ 0 ] );
				delete attributesToPaste.mediaIcon;
			}

			setAttributes( attributesToPaste );
		}
	}

	const mediaImagedraw = ( 'drawborder' === mediaImage[ 0 ].hoverAnimation || 'grayscale-border-draw' === mediaImage[ 0 ].hoverAnimation ? true : false );
	const renderCSS = (
		<style>
			{( mediaIcon[ 0 ].hoverColor ? `.bsb-info-box-wrap${uniqueID} .bst-blocks-info-box-link-wrap:hover .bst-info-svg-icon, .bsb-info-box-wrap${uniqueID} .bst-blocks-info-box-link-wrap:hover .bst-blocks-info-box-number { color: ${BaseColorOutput( mediaIcon[ 0 ].hoverColor )} !important; }` : '' )}
			{( mediaStyle[ 0 ].borderRadius ? `.bsb-info-box-wrap${uniqueID} .bst-blocks-info-box-link-wrap .bst-blocks-info-box-media .base-info-box-image-intrisic img, .bsb-info-box-wrap${uniqueID} .bst-blocks-info-box-link-wrap .bst-blocks-info-box-media .block-editor-media-placeholder { border-radius: ${mediaStyle[ 0 ].borderRadius}px !important; }` : '' )}
			{( titleHoverColor ? `.bsb-info-box-wrap${uniqueID} .bst-blocks-info-box-link-wrap:hover .bst-blocks-info-box-title { color: ${BaseColorOutput( titleHoverColor )} !important; }` : '' )}
			{( textHoverColor ? `.bsb-info-box-wrap${uniqueID} .bst-blocks-info-box-link-wrap:hover .bst-blocks-info-box-text { color: ${BaseColorOutput( textHoverColor )} !important; }` : '' )}
			{( learnMoreStyles[ 0 ].colorHover ? `.bsb-info-box-wrap${uniqueID} .bst-blocks-info-box-link-wrap:hover .bst-blocks-info-box-learnmore { color: ${BaseColorOutput( learnMoreStyles[ 0 ].colorHover )} !important; }` : '' )}
			{( learnMoreStyles[ 0 ].borderHover ? `.bsb-info-box-wrap${uniqueID} .bst-blocks-info-box-link-wrap:hover .bst-blocks-info-box-learnmore { border-color: ${BaseColorOutput( learnMoreStyles[ 0 ].borderHover )} !important; }` : '' )}
			{( learnMoreStyles[ 0 ].backgroundHover ? `.bsb-info-box-wrap${uniqueID} .bst-blocks-info-box-link-wrap:hover .bst-blocks-info-box-learnmore { background-color: ${BaseColorOutput( learnMoreStyles[ 0 ].backgroundHover )} !important; }` : '' )}

			{ ( previewBorderHoverTopStyle ? `.bsb-info-box-wrap${uniqueID} .bst-blocks-info-box-link-wrap:hover { border-top:${ previewBorderHoverTopStyle } !important; }` : '' ) }
			{ ( previewBorderHoverRightStyle ? `.bsb-info-box-wrap${uniqueID} .bst-blocks-info-box-link-wrap:hover { border-right:${ previewBorderHoverRightStyle } !important; }` : '' ) }
			{ ( previewBorderHoverBottomStyle ? `.bsb-info-box-wrap${uniqueID} .bst-blocks-info-box-link-wrap:hover { border-bottom:${ previewBorderHoverBottomStyle } !important; }` : '' ) }
			{ ( previewBorderHoverLeftStyle ? `.bsb-info-box-wrap${uniqueID} .bst-blocks-info-box-link-wrap:hover { border-left:${ previewBorderHoverLeftStyle } !important; }` : '' ) }

			{ ( '' !== previewHoverRadiusTop ? `.bsb-info-box-wrap${uniqueID} .bst-blocks-info-box-link-wrap:hover { border-top-left-radius:${ previewHoverRadiusTop + ( borderHoverRadiusUnit ? borderHoverRadiusUnit : 'px' ) } !important; }` : '' ) }
			{ ( '' !== previewHoverRadiusRight ? `.bsb-info-box-wrap${uniqueID} .bst-blocks-info-box-link-wrap:hover { border-top-right-radius:${ previewHoverRadiusRight + ( borderHoverRadiusUnit ? borderHoverRadiusUnit : 'px' ) } !important; }` : '' ) }
			{ ( '' !== previewHoverRadiusBottom ? `.bsb-info-box-wrap${uniqueID} .bst-blocks-info-box-link-wrap:hover { border-bottom-right-radius:${ previewHoverRadiusBottom + ( borderHoverRadiusUnit ? borderHoverRadiusUnit : 'px' ) } !important; }` : '' ) }
			{ ( '' !== previewHoverRadiusLeft ? `.bsb-info-box-wrap${uniqueID} .bst-blocks-info-box-link-wrap:hover { border-bottom-left-radius:${  previewHoverRadiusLeft + ( borderHoverRadiusUnit ? borderHoverRadiusUnit : 'px' ) } !important; }` : '' ) }

			{ ( containerHoverBackground ? `.bsb-info-box-wrap${uniqueID} .bst-blocks-info-box-link-wrap:hover { background:${ BaseColorOutput( containerHoverBackground ) } !important; }` : '' ) }
			{( displayShadow ? `.bsb-info-box-wrap${uniqueID} .bst-blocks-info-box-link-wrap:hover { box-shadow: ${shadowHover[ 0 ].hOffset + 'px ' + shadowHover[ 0 ].vOffset + 'px ' + shadowHover[ 0 ].blur + 'px ' + shadowHover[ 0 ].spread + 'px ' + BaseColorOutput( shadowHover[ 0 ].color, shadowHover[ 0 ].opacity )} !important; }` : '' )}


			{( mediaStyle[ 0 ].hoverBackground ? `.bsb-info-box-wrap${uniqueID} .bst-blocks-info-box-link-wrap:hover .bst-blocks-info-box-media { background: ${ BaseColorOutput( mediaStyle[ 0 ].hoverBackground ) } !important; }` : '' )}
			{( mediaStyle[ 0 ].hoverBorder && 'icon' === mediaType && 'drawborder' !== mediaIcon[ 0 ].hoverAnimation ? `.bsb-info-box-wrap${uniqueID} .bst-blocks-info-box-link-wrap:hover .bst-blocks-info-box-media { border-color: ${BaseColorOutput( mediaStyle[ 0 ].hoverBorder )} !important; }` : '' )}
			{( mediaStyle[ 0 ].hoverBorder && 'number' === mediaType && mediaNumber[ 0 ].hoverAnimation && 'drawborder' !== mediaNumber[ 0 ].hoverAnimation ? `.bsb-info-box-wrap${uniqueID} .bst-blocks-info-box-link-wrap:hover .bst-blocks-info-box-media { border-color: ${BaseColorOutput( mediaStyle[ 0 ].hoverBorder )} !important; }` : '' )}
			{( mediaStyle[ 0 ].hoverBorder && 'image' === mediaType && true !== mediaImagedraw ? `.bsb-info-box-wrap${uniqueID} .bst-blocks-info-box-link-wrap:hover .bst-blocks-info-box-media { border-color: ${BaseColorOutput( mediaStyle[ 0 ].hoverBorder )} !important; }` : '' )}
			{'icon' === mediaType && 'drawborder' === mediaIcon[ 0 ].hoverAnimation && (
					`.bsb-info-box-wrap${ uniqueID } .bst-blocks-info-box-link-wrap .bst-blocks-info-box-media { border-width:0 !important; box-shadow: inset 0 0 0 ${ mediaStyle[ 0 ].borderWidth[ 0 ] }px ${ BaseColorOutput( mediaStyle[ 0 ].border ) }; }
					.bsb-info-box-wrap${uniqueID} .bst-blocks-info-box-link-wrap .bst-blocks-info-box-media:before, .bsb-info-box-wrap${uniqueID} .bst-blocks-info-box-link-wrap .bst-blocks-info-box-media:after { border-radius: ${mediaStyle[ 0 ].borderRadius}px; }
					.bsb-info-box-wrap${uniqueID} .bst-blocks-info-box-link-wrap .bst-blocks-info-box-media:before { border-width: ${mediaStyle[ 0 ].borderWidth[ 0 ]}px; }
					.bsb-info-box-wrap${uniqueID} .bst-blocks-info-box-link-wrap .bst-blocks-info-box-media:after { border-width: 0; }
					.bsb-info-box-wrap${uniqueID} .bst-blocks-info-box-link-wrap:hover .bst-blocks-info-box-media:before { border-top-color: ${BaseColorOutput( mediaStyle[ 0 ].hoverBorder )} ; border-right-color: ${BaseColorOutput( mediaStyle[ 0 ].hoverBorder )}; border-bottom-color: ${BaseColorOutput( mediaStyle[ 0 ].hoverBorder )} }
					.bsb-info-box-wrap${uniqueID} .bst-blocks-info-box-link-wrap:hover .bst-blocks-info-box-media:after{ border-right-color: ${BaseColorOutput( mediaStyle[ 0 ].hoverBorder )}; border-right-width: ${mediaStyle[ 0 ].borderWidth[ 0 ]}px; border-bottom-width: ${mediaStyle[ 0 ].borderWidth[ 0 ]}px; border-top-width: ${mediaStyle[ 0 ].borderWidth[ 0 ]}px; }`
			)}
			{'number' === mediaType && mediaNumber && mediaNumber[ 0 ] && mediaNumber[ 0 ].hoverAnimation && 'drawborder' === mediaNumber[ 0 ].hoverAnimation && (
				`.bsb-info-box-wrap${uniqueID} .bst-blocks-info-box-link-wrap .bst-blocks-info-box-media { border-width:0 !important; box-shadow: inset 0 0 0 ${mediaStyle[ 0 ].borderWidth[ 0 ]}px ${mediaStyle[ 0 ].border}; }
					.bsb-info-box-wrap${uniqueID} .bst-blocks-info-box-link-wrap .bst-blocks-info-box-media:before, .bsb-info-box-wrap${uniqueID} .bst-blocks-info-box-link-wrap .bst-blocks-info-box-media:after { border-radius: ${mediaStyle[ 0 ].borderRadius}px; }
					.bsb-info-box-wrap${uniqueID} .bst-blocks-info-box-link-wrap .bst-blocks-info-box-media:before { border-width: ${mediaStyle[ 0 ].borderWidth[ 0 ]}px; }
					.bsb-info-box-wrap${uniqueID} .bst-blocks-info-box-link-wrap .bst-blocks-info-box-media:after { border-width: 0; }
					.bsb-info-box-wrap${uniqueID} .bst-blocks-info-box-link-wrap:hover .bst-blocks-info-box-media:before { border-top-color: ${BaseColorOutput( mediaStyle[ 0 ].hoverBorder )} ; border-right-color: ${BaseColorOutput( mediaStyle[ 0 ].hoverBorder )}; border-bottom-color: ${BaseColorOutput( mediaStyle[ 0 ].hoverBorder )} }
					.bsb-info-box-wrap${uniqueID} .bst-blocks-info-box-link-wrap:hover .bst-blocks-info-box-media:after{ border-right-color: ${BaseColorOutput( mediaStyle[ 0 ].hoverBorder )}; border-right-width: ${mediaStyle[ 0 ].borderWidth[ 0 ]}px; border-bottom-width: ${mediaStyle[ 0 ].borderWidth[ 0 ]}px; border-top-width: ${mediaStyle[ 0 ].borderWidth[ 0 ]}px; }`
			)}
			{'image' === mediaType && true === mediaImagedraw && (
				`.bsb-info-box-wrap${uniqueID} .bst-blocks-info-box-link-wrap .bst-blocks-info-box-media { border-width:0 !important; box-shadow: inset 0 0 0 ${mediaStyle[ 0 ].borderWidth[ 0 ]}px ${mediaStyle[ 0 ].border}; }
					.bsb-info-box-wrap${uniqueID} .bst-blocks-info-box-link-wrap .bst-blocks-info-box-media:before, .bsb-info-box-wrap${uniqueID} .bst-blocks-info-box-link-wrap .bst-blocks-info-box-media:after { border-radius: ${mediaStyle[ 0 ].borderRadius}px; }
					.bsb-info-box-wrap${uniqueID} .bst-blocks-info-box-link-wrap .bst-blocks-info-box-media:before { border-width: ${mediaStyle[ 0 ].borderWidth[ 0 ]}px; }
					.bsb-info-box-wrap${uniqueID} .bst-blocks-info-box-link-wrap .bst-blocks-info-box-media:after { border-width: 0; }
					.bsb-info-box-wrap${uniqueID} .bst-blocks-info-box-link-wrap:hover .bst-blocks-info-box-media:before { border-top-color: ${BaseColorOutput( mediaStyle[ 0 ].hoverBorder )} ; border-right-color: ${BaseColorOutput( mediaStyle[ 0 ].hoverBorder )}; border-bottom-color: ${BaseColorOutput( mediaStyle[ 0 ].hoverBorder )} }
					.bsb-info-box-wrap${uniqueID} .bst-blocks-info-box-link-wrap:hover .bst-blocks-info-box-media:after{ border-right-color: ${BaseColorOutput( mediaStyle[ 0 ].hoverBorder )}; border-right-width: ${mediaStyle[ 0 ].borderWidth[ 0 ]}px; border-bottom-width: ${mediaStyle[ 0 ].borderWidth[ 0 ]}px; border-top-width: ${mediaStyle[ 0 ].borderWidth[ 0 ]}px; }`
			)}
		</style>
	);
	let imageRatioPadding = isNaN( mediaImage[ 0 ].height ) ? undefined : ( ( mediaImage[ 0 ].height / mediaImage[ 0 ].width ) * 100 ) + '%';
	let imageRatioHeight = isNaN( mediaImage[ 0 ].height ) ? undefined : 0;
	let hasRatio = false;
	if ( imageRatio && 'inherit' !== imageRatio ) {
		hasRatio = true;
		imageRatioHeight = 0;
		switch ( imageRatio ) {
			case 'land43':
				imageRatioPadding = '75%';
				break;
			case 'land32':
				imageRatioPadding = '66.67%';
				break;
			case 'land169':
				imageRatioPadding = '56.25%';
				break;
			case 'land21':
				imageRatioPadding = '50%';
				break;
			case 'land31':
				imageRatioPadding = '33%';
				break;
			case 'land41':
				imageRatioPadding = '25%';
				break;
			case 'port34':
				imageRatioPadding = '133.33%';
				break;
			case 'port23':
				imageRatioPadding = '150%';
				break;
			default:
				imageRatioPadding = '100%';
				break;
		}
	}
	let showImageToolbar = ( 'image' === mediaType && mediaImage[ 0 ].url ? true : false );
	if ( showImageToolbar && baseDynamic && baseDynamic[ 'mediaImage:0:url' ] && baseDynamic[ 'mediaImage:0:url' ].enable ) {
		showImageToolbar = false;
	}

	const mediaSettingsMobile = <>
		<SelectControl
			value={( mediaAlignMobile ? mediaAlignMobile : mediaAlign )}
			options={[
				{ value: 'top', label: __( 'Top', 'gutenam-blocks' ) },
				{ value: 'left', label: __( 'Left', 'gutenam-blocks' ) },
				{ value: 'right', label: __( 'Right', 'gutenam-blocks' ) },
			]}
			onChange={value => setAttributes( { mediaAlignMobile: value } )}
		/>
	</>;

	const mediaSettingsTablet = <>
		<SelectControl
			value={( mediaAlignTablet ? mediaAlignTablet : mediaAlign )}
			options={[
				{ value: 'top', label: __( 'Top', 'gutenam-blocks' ) },
				{ value: 'left', label: __( 'Left', 'gutenam-blocks' ) },
				{ value: 'right', label: __( 'Right', 'gutenam-blocks' ) },
			]}
			onChange={value => setAttributes( { mediaAlignTablet: value } )}
		/>
	</>;

	const mediaSettingsDesktop = <>
		<SelectControl
			value={mediaAlign}
			options={[
				{ value: 'top', label: __( 'Top', 'gutenam-blocks' ) },
				{ value: 'left', label: __( 'Left', 'gutenam-blocks' ) },
				{ value: 'right', label: __( 'Right', 'gutenam-blocks' ) },
			]}
			onChange={value => setAttributes( { mediaAlign: value } )}
		/>
	</>;

	const nonTransAttrs = [ 'link', 'linkTitle', 'title', 'contentText', 'mediaType', 'mediaImage', 'mediaIcon' ];

	const blockProps = useBlockProps( {
		className: classnames( className, {
            [`bsb-info-box-wrap${uniqueID}`]: true
        }),
	} );

	return (
		<div {...blockProps}>
			{renderCSS}
			<BlockControls key="controls">
				{showImageToolbar && (
					<ToolbarGroup group="change-image">
						<MediaUpload
							onSelect={onSelectImage}
							type="image"
							value={mediaImage[ 0 ].id}
							allowedTypes={ALLOWED_MEDIA_TYPES}
							render={( { open } ) => (
								<Button
									className="components-toolbar__control"
									label={__( 'Edit Media', 'gutenam-blocks' )}
									icon={image}
									onClick={open}
								/>
							)}
						/>
					</ToolbarGroup>
				)}
				{'icon' === mediaType && (
					<Dropdown
						className="bsb-popover-inline-icon-container components-dropdown-menu components-toolbar"
						contentClassName="bsb-popover-inline-icon"
						placement="top"
						renderToggle={( { isOpen, onToggle } ) => (
							<Button className="components-dropdown-menu__toggle bsb-inline-icon-toolbar-icon" label={__( 'Icon Settings', 'gutenam-blocks' )} icon={starFilled} onClick={onToggle}
									aria-expanded={isOpen}/>
						)}
						renderContent={() => (
							<>
								<div className="bsb-inline-icon-control">
									<BaseIconPicker
										value={mediaIcon[ 0 ].icon}
										onChange={value => saveMediaIcon( { icon: value } )}
									/>
									<RangeControl
										label={__( 'Icon Size', 'gutenam-blocks' )}
										value={mediaIcon[ 0 ].size}
										onChange={value => saveMediaIcon( { size: value } )}
										min={5}
										max={250}
										step={1}
									/>
								</div>
							</>
						)}
					/>
				)}
				<AlignmentToolbar
					value={hAlign}
					onChange={value => setAttributes( { hAlign: value } )}
				/>
				<CopyPasteAttributes
					attributes={ attributes }
					excludedAttrs={ nonTransAttrs }
					defaultAttributes={ metadata['attributes'] }
					blockSlug={ metadata['name'] }
					onPaste={ attributesToPaste => onPaste( attributesToPaste ) }
				/>
			</BlockControls>
			{showSettings( 'allSettings', 'base/infobox' ) && (
				<InspectorControls>

					<InspectorControlTabs
						panelName={'infobox'}
						setActiveTab={( value ) => setActiveTab( value )}
						activeTab={activeTab}
					/>

					{( activeTab === 'general' ) &&
						<>

							<BasePanelBody panelName={'bsb-info-all-settings'}>
								<>
									<h2>{__( 'InfoBox Quick Layout Presets', 'gutenam-blocks' )}</h2>
									<ButtonGroup className="bst-style-btn-group bsb-info-layouts" aria-label={__( 'InfoBox Style', 'gutenam-blocks' )}>
										{map( layoutPresetOptions, ( { name, key, icon } ) => (
											<Button
												key={key}
												className="bst-style-btn"
												isSmall
												isPrimary={false}
												aria-pressed={false}
												onClick={() => {
													setPresetLayout( key );
												}}
											>
												{icon}
											</Button>
										) )}
									</ButtonGroup>
								</>
								<URLInputControl
									label={__( 'Link', 'gutenam-blocks' )}
									url={link}
									onChangeUrl={value => setAttributes( { link: value } )}
									additionalControls={true}
									opensInNewTab={( target && '_blank' == target ? true : false )}
									onChangeTarget={value => {
										if ( value ) {
											setAttributes( { target: '_blank' } );
										} else {
											setAttributes( { target: '_self' } );
										}
									}}
									linkNoFollow={( undefined !== linkNoFollow ? linkNoFollow : false )}
									onChangeFollow={value => setAttributes( { linkNoFollow: value } )}
									linkSponsored={( undefined !== linkSponsored ? linkSponsored : false )}
									onChangeSponsored={value => setAttributes( { linkSponsored: value } )}
									linkTitle={linkTitle}
									onChangeTitle={value => {
										setAttributes( { linkTitle: value } );
									}}
									dynamicAttribute={'link'}
									allowClear={true}
									isSelected={ isSelected }
									attributes={ attributes }
									setAttributes={ setAttributes }
									name={ name }
									clientId={ clientId }
									context={ context }
								/>
								<SelectControl
									label={__( 'Link Content', 'gutenam-blocks' )}
									value={linkProperty}
									options={[
										{ value: 'box', label: __( 'Entire Box', 'gutenam-blocks' ) },
										{ value: 'learnmore', label: __( 'Only Learn More Text', 'gutenam-blocks' ) },
									]}
									onChange={value => setAttributes( { linkProperty: value } )}
								/>
								<h2 className="bst-heading-size-title">{__( 'Content Align', 'gutenam-blocks' )}</h2>
								<ResponsiveAlignControls
									label={__( 'Text Alignment', 'gutenam-blocks' )}
									value={( hAlign )}
									mobileValue={( hAlignMobile )}
									tabletValue={( hAlignTablet )}
									onChange={( nextAlign ) => setAttributes( { hAlign: nextAlign } )}
									onChangeTablet={( nextAlign ) => setAttributes( { hAlignTablet: nextAlign } )}
									onChangeMobile={( nextAlign ) => setAttributes( { hAlignMobile: nextAlign } )}
								/>
							</BasePanelBody>
						</>
					}

					{( activeTab === 'style' ) &&
						<>
							{showSettings( 'containerSettings', 'base/infobox' ) && (
								<>
									<BasePanelBody
										title={__( 'Container Settings', 'gutenam-blocks' )}
										initialOpen={true}
										panelName={'bsb-info-container-settings'}
									>
										<HoverToggleControl
											hover={
												<>
													<PopColorControl
														label={__( 'Hover Background', 'gutenam-blocks' )}
														value={( containerHoverBackground ? containerHoverBackground : '' )}
														default={''}
														onChange={value => setAttributes( { containerHoverBackground: value } )}
													/>
													<ResponsiveBorderControl
														label={__( 'Border', 'gutenam-blocks' )}
														value={borderHoverStyle}
														tabletValue={tabletBorderHoverStyle}
														mobileValue={mobileBorderHoverStyle}
														onChange={( value ) => setAttributes( { borderHoverStyle: value } )}
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
													{showSettings( 'shadowSettings', 'base/infobox' ) && (
														<BoxShadowControl
															label={__( 'Box Shadow', 'gutenam-blocks' )}
															enable={( undefined !== displayShadow ? displayShadow : false )}
															color={( undefined !== shadowHover && undefined !== shadowHover[ 0 ] && undefined !== shadowHover[ 0 ].color ? shadowHover[ 0 ].color : '#000000' )}
															colorDefault={'#000000'}
															onArrayChange={( color, opacity ) => {
																saveHoverShadow( { color: color, opacity: opacity } );
															}}
															opacity={( undefined !== shadowHover && undefined !== shadowHover[ 0 ] && undefined !== shadowHover[ 0 ].opacity ? shadowHover[ 0 ].opacity : 0.2 )}
															hOffset={( undefined !== shadowHover && undefined !== shadowHover[ 0 ] && undefined !== shadowHover[ 0 ].hOffset ? shadowHover[ 0 ].hOffset : 0 )}
															vOffset={( undefined !== shadowHover && undefined !== shadowHover[ 0 ] && undefined !== shadowHover[ 0 ].vOffset ? shadowHover[ 0 ].vOffset : 0 )}
															blur={( undefined !== shadowHover && undefined !== shadowHover[ 0 ] && undefined !== shadowHover[ 0 ].blur ? shadowHover[ 0 ].blur : 14 )}
															spread={( undefined !== shadowHover && undefined !== shadowHover[ 0 ] && undefined !== shadowHover[ 0 ].spread ? shadowHover[ 0 ].spread : 0 )}
															inset={( undefined !== shadowHover && undefined !== shadowHover[ 0 ] && undefined !== shadowHover[ 0 ].inset ? shadowHover[ 0 ].inset : false )}
															onEnableChange={value => {
																setAttributes( {
																	displayShadow: value,
																} );
															}}
															onColorChange={value => {
																saveHoverShadow( { color: value } );
															}}
															onOpacityChange={value => {
																saveHoverShadow( { opacity: value } );
															}}
															onHOffsetChange={value => {
																saveHoverShadow( { hOffset: value } );
															}}
															onVOffsetChange={value => {
																saveHoverShadow( { vOffset: value } );
															}}
															onBlurChange={value => {
																saveHoverShadow( { blur: value } );
															}}
															onSpreadChange={value => {
																saveHoverShadow( { spread: value } );
															}}
															onInsetChange={value => {
																saveHoverShadow( { inset: value } );
															}}
														/>
													)}
												</>
											}
											normal={
												<>
													<PopColorControl
														label={__( 'Background', 'gutenam-blocks' )}
														value={ ( containerBackground ? containerBackground : '' )}
														default={''}
														onChange={value => setAttributes( { containerBackground: value } )}
													/>
													<ResponsiveBorderControl
														label={__( 'Border', 'gutenam-blocks' )}
														value={borderStyle}
														tabletValue={tabletBorderStyle}
														mobileValue={mobileBorderStyle}
														onChange={( value ) => setAttributes( { borderStyle: value } )}
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
													{showSettings( 'shadowSettings', 'base/infobox' ) && (
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
													)}
												</>
											}
										/>
									</BasePanelBody>
								</>
							)}
							{showSettings( 'mediaSettings', 'base/infobox' ) && (
								<BasePanelBody
									title={__( 'Media Settings', 'gutenam-blocks' )}
									initialOpen={false}
									panelName={'bsb-info-media-settings'}
								>
									<SmallResponsiveControl
										label={__( 'Media Align', 'gutenam-blocks' )}
										desktopChildren={ mediaSettingsDesktop }
										tabletChildren={ mediaSettingsTablet }
										mobileChildren={ mediaSettingsMobile }
									/>

									{mediaAlign !== 'top' && (
										<>
											<SelectControl
												label={__( 'Media Vertical Align', 'gutenam-blocks' )}
												value={mediaVAlign}
												options={[
													{ value: 'top', label: __( 'Top', 'gutenam-blocks' ) },
													{ value: 'middle', label: __( 'Middle', 'gutenam-blocks' ) },
													{ value: 'bottom', label: __( 'Bottom', 'gutenam-blocks' ) },
												]}
												onChange={value => setAttributes( { mediaVAlign: value } )}
											/>
										</>
									)}
									<SelectControl
										label={__( 'Media Type', 'gutenam-blocks' )}
										value={mediaType}
										options={[
											{ value: 'icon', label: __( 'Icon', 'gutenam-blocks' ) },
											{ value: 'image', label: __( 'Image', 'gutenam-blocks' ) },
											{ value: 'number', label: __( 'Number', 'gutenam-blocks' ) },
											{ value: 'none', label: __( 'None', 'gutenam-blocks' ) },
										]}
										onChange={value => setAttributes( { mediaType: value } )}
									/>
									{'image' === mediaType && (
										<>
											<BaseImageControl
												label={__( 'Image', 'gutenam-blocks' )}
												hasImage={( mediaImage && mediaImage[ 0 ] && mediaImage[ 0 ].url ? true : false )}
												imageURL={( mediaImage && mediaImage[ 0 ] && mediaImage[ 0 ].url ? mediaImage[ 0 ].url : '' )}
												imageID={( mediaImage && mediaImage[ 0 ] && mediaImage[ 0 ].id ? mediaImage[ 0 ].id : '' )}
												onRemoveImage={clearImage}
												onSaveImage={onSelectImage}
												disableMediaButtons={( mediaImage[ 0 ].url ? true : false )}
												dynamicAttribute="mediaImage:0:url"
												isSelected={ isSelected }
												attributes={ attributes }
												setAttributes={ setAttributes }
												name={ name }
												clientId={ clientId }
												context={ context }
											/>
											{mediaImage[ 0 ].id && 'svg+xml' !== mediaImage[ 0 ].subtype && (
												<ImageSizeControl
													label={__( 'Image File Size', 'gutenam-blocks' )}
													id={mediaImage[ 0 ].id}
													url={mediaImage[ 0 ].url}
													onChange={changeImageSize}
												/>
											)}
											<RangeControl
												label={__( 'Max Image Width', 'gutenam-blocks' )}
												value={mediaImage[ 0 ].maxWidth}
												onChange={value => saveMediaImage( { maxWidth: value } )}
												min={5}
												max={800}
												step={1}
											/>
											<SelectControl
												label={__( 'Image ratio', 'gutenam-blocks' )}
												options={[
													{
														label: __( 'Inherit', 'gutenam-blocks' ),
														value: 'inherit',
													},
													{
														label: __( 'Landscape 4:3', 'gutenam-blocks' ),
														value: 'land43',
													},
													{
														label: __( 'Landscape 3:2', 'gutenam-blocks' ),
														value: 'land32',
													},
													{
														label: __( 'Landscape 16:9', 'gutenam-blocks' ),
														value: 'land169',
													},
													{
														label: __( 'Landscape 2:1', 'gutenam-blocks' ),
														value: 'land21',
													},
													{
														label: __( 'Landscape 3:1', 'gutenam-blocks' ),
														value: 'land31',
													},
													{
														label: __( 'Landscape 4:1', 'gutenam-blocks' ),
														value: 'land41',
													},
													{
														label: __( 'Portrait 3:4', 'gutenam-blocks' ),
														value: 'port34',
													},
													{
														label: __( 'Portrait 2:3', 'gutenam-blocks' ),
														value: 'port23',
													},
													{
														label: __( 'Square 1:1', 'gutenam-blocks' ),
														value: 'square',
													},
												]}
												value={imageRatio}
												onChange={( value ) => setAttributes( { imageRatio: value } )}
											/>
											<SelectControl
												label={__( 'Image Hover Animation', 'gutenam-blocks' )}
												value={mediaImage[ 0 ].hoverAnimation}
												options={[
													{ value: 'none', label: __( 'None', 'gutenam-blocks' ) },
													{ value: 'grayscale', label: __( 'Grayscale to Color', 'gutenam-blocks' ) },
													{ value: 'drawborder', label: __( 'Border Spin In', 'gutenam-blocks' ) },
													{ value: 'grayscale-border-draw', label: __( 'Grayscale to Color & Border Spin In', 'gutenam-blocks' ) },
													{ value: 'flip', label: __( 'Flip to Another Image', 'gutenam-blocks' ) },
												]}
												onChange={value => saveMediaImage( { hoverAnimation: value } )}
											/>
											{'flip' === mediaImage[ 0 ].hoverAnimation && (
												<>
													<h2>{__( 'Flip Image (Use same size as start image', 'gutenam-blocks' )}</h2>
													<BaseImageControl
														label={__( 'Image', 'gutenam-blocks' )}
														hasImage={( mediaImage && mediaImage[ 0 ] && mediaImage[ 0 ].flipUrl ? true : false )}
														imageURL={( mediaImage && mediaImage[ 0 ] && mediaImage[ 0 ].flipUrl ? mediaImage[ 0 ].flipUrl : '' )}
														imageID={( mediaImage && mediaImage[ 0 ] && mediaImage[ 0 ].flipId ? mediaImage[ 0 ].flipId : '' )}
														onRemoveImage={clearFlipImage}
														onSaveImage={onSelectFlipImage}
														disableMediaButtons={( mediaImage && mediaImage[ 0 ] && mediaImage[ 0 ].flipUrl ? true : false )}
														setAttributes={setAttributes}
														{...attributes}
													/>
													{mediaImage[ 0 ].flipId && 'svg+xml' !== mediaImage[ 0 ].flipSubtype && (
														<ImageSizeControl
															label={__( 'Image File Size', 'gutenam-blocks' )}
															id={mediaImage[ 0 ].flipId}
															url={mediaImage[ 0 ].flipUrl}
															onChange={changeFlipImageSize}
														/>
													)}
												</>
											)}
											<MeasurementControls
												label={__( 'Image Border', 'gutenam-blocks' )}
												measurement={mediaStyle[ 0 ].borderWidth}
												control={mediaBorderControl}
												onChange={( value ) => saveMediaStyle( { borderWidth: value } )}
												onControl={( value ) => setMediaBorderControl( value )}
												min={0}
												max={40}
												step={1}
											/>
											<RangeControl
												label={__( 'Image Border Radius (px)', 'gutenam-blocks' )}
												value={mediaStyle[ 0 ].borderRadius}
												onChange={value => saveMediaStyle( { borderRadius: value } )}
												step={1}
												min={0}
												max={200}
											/>
											<TabPanel className="bst-inspect-tabs bst-hover-tabs"
													  activeClass="active-tab"
													  tabs={[
														  {
															  name     : 'normal',
															  title    : __( 'Normal', 'gutenam-blocks' ),
															  className: 'bst-normal-tab',
														  },
														  {
															  name     : 'hover',
															  title    : __( 'Hover', 'gutenam-blocks' ),
															  className: 'bst-hover-tab',
														  },
													  ]}>
												{
													( tab ) => {
														let tabout;
														if ( tab.name ) {
															if ( 'hover' === tab.name ) {
																tabout = (
																	<>
																		{mediaImage[ 0 ].subtype && 'svg+xml' === mediaImage[ 0 ].subtype && (
																			<>
																				<PopColorControl
																					label={__( 'SVG Hover Color', 'gutenam-blocks' )}
																					value={( mediaIcon[ 0 ].hoverColor ? mediaIcon[ 0 ].hoverColor : '#444444' )}
																					default={'#444444'}
																					onChange={value => saveMediaIcon( { hoverColor: value } )}
																				/>
																				<small>{__( '*you must force inline svg for this to have effect.', 'gutenam-blocks' )}</small>
																			</>
																		)}
																		<PopColorControl
																			label={__( 'Image Hover Background', 'gutenam-blocks' )}
																			value={( mediaStyle[ 0 ].hoverBackground ? mediaStyle[ 0 ].hoverBackground : '' )}
																			default={'transparent'}
																			onChange={value => saveMediaStyle( { hoverBackground: value } )}
																		/>
																		<PopColorControl
																			label={__( 'Image Hover Border', 'gutenam-blocks' )}
																			value={( mediaStyle[ 0 ].hoverBorder ? mediaStyle[ 0 ].hoverBorder : '#444444' )}
																			default={'#444444'}
																			onChange={value => saveMediaStyle( { hoverBorder: value } )}
																		/>
																	</>
																);
															} else {
																tabout = (
																	<>
																		{mediaImage[ 0 ].subtype && 'svg+xml' === mediaImage[ 0 ].subtype && (
																			<>
																				<PopColorControl
																					label={__( 'SVG Color', 'gutenam-blocks' )}
																					value={( mediaIcon[ 0 ].color ? mediaIcon[ 0 ].color : '#444444' )}
																					default={'#444444'}
																					onChange={value => saveMediaIcon( { color: value } )}
																				/>
																				<small>{__( '*you must force inline svg for this to have effect.', 'gutenam-blocks' )}</small>
																			</>
																		)}
																		<PopColorControl
																			label={__( 'Image Background', 'gutenam-blocks' )}
																			value={( mediaStyle[ 0 ].background ? mediaStyle[ 0 ].background : '' )}
																			default={'transparent'}
																			onChange={value => saveMediaStyle( { background: value } )}
																		/>
																		<PopColorControl
																			label={__( 'Image Border', 'gutenam-blocks' )}
																			value={( mediaStyle[ 0 ].border ? mediaStyle[ 0 ].border : '#444444' )}
																			default={'#444444'}
																			onChange={value => saveMediaStyle( { border: value } )}
																		/>
																	</>
																);
															}
														}
														return <div className={tab.className} key={tab.className}>{tabout}</div>;
													}
												}
											</TabPanel>
										</>
									)}
									{'icon' === mediaType && (
										<>
											<BaseIconPicker
												value={mediaIcon[ 0 ].icon}
												onChange={value => saveMediaIcon( { icon: value } )}
											/>
											<ResponsiveRangeControls
												label={__( 'Icon Size', 'gutenam-blocks' )}
												value={mediaIcon[ 0 ].size}
												mobileValue={mediaIcon[ 0 ].mobileSize ? mediaIcon[ 0 ].mobileSize : ''}
												tabletValue={mediaIcon[ 0 ].tabletSize ? mediaIcon[ 0 ].tabletSize : ''}
												onChange={( value ) => saveMediaIcon( { size: value } )}
												onChangeTablet={( value ) => saveMediaIcon( { tabletSize: value } )}
												onChangeMobile={( value ) => saveMediaIcon( { mobileSize: value } )}
												min={5}
												max={250}
												step={1}
											/>
											{mediaIcon[ 0 ].icon && 'fe' === mediaIcon[ 0 ].icon.substring( 0, 2 ) && (
												<RangeControl
													label={__( 'Icon Line Width', 'gutenam-blocks' )}
													value={mediaIcon[ 0 ].width}
													onChange={value => saveMediaIcon( { width: value } )}
													step={0.5}
													min={0.5}
													max={4}
												/>
											)}
											<MeasurementControls
												label={__( 'Icon Border', 'gutenam-blocks' )}
												measurement={mediaStyle[ 0 ].borderWidth}
												control={mediaBorderControl}
												onChange={( value ) => saveMediaStyle( { borderWidth: value } )}
												onControl={( value ) => setMediaBorderControl( value )}
												min={0}
												max={40}
												step={1}
											/>
											<RangeControl
												label={__( 'Icon Border Radius (px)', 'gutenam-blocks' )}
												value={mediaStyle[ 0 ].borderRadius}
												onChange={value => saveMediaStyle( { borderRadius: value } )}
												step={1}
												min={0}
												max={200}
											/>
											<SelectControl
												label={__( 'Icon Hover Animation', 'gutenam-blocks' )}
												value={mediaIcon[ 0 ].hoverAnimation}
												options={[
													{ value: 'none', label: __( 'None', 'gutenam-blocks' ) },
													{ value: 'drawborder', label: __( 'Border Spin In', 'gutenam-blocks' ) },
													{ value: 'flip', label: __( 'Flip to Another Icon', 'gutenam-blocks' ) },
												]}
												onChange={value => saveMediaIcon( { hoverAnimation: value } )}
											/>
											{mediaIcon[ 0 ].hoverAnimation === 'flip' && (
												<BaseIconPicker
													value={mediaIcon[ 0 ].flipIcon}
													onChange={value => saveMediaIcon( { flipIcon: value } )}
												/>
											)}
											<TabPanel className="bst-inspect-tabs bst-hover-tabs"
													  activeClass="active-tab"
													  tabs={[
														  {
															  name     : 'normal',
															  title    : __( 'Normal', 'gutenam-blocks' ),
															  className: 'bst-normal-tab',
														  },
														  {
															  name     : 'hover',
															  title    : __( 'Hover', 'gutenam-blocks' ),
															  className: 'bst-hover-tab',
														  },
													  ]}>
												{
													( tab ) => {
														let tabout;
														if ( tab.name ) {
															if ( 'hover' === tab.name ) {
																tabout = (
																	<>
																		<PopColorControl
																			label={__( 'Icon Hover Color', 'gutenam-blocks' )}
																			value={( mediaIcon[ 0 ].hoverColor ? mediaIcon[ 0 ].hoverColor : '#444444' )}
																			default={'#444444'}
																			onChange={value => saveMediaIcon( { hoverColor: value } )}
																		/>
																		<PopColorControl
																			label={__( 'Icon Hover Background', 'gutenam-blocks' )}
																			value={( mediaStyle[ 0 ].hoverBackground ? mediaStyle[ 0 ].hoverBackground : '' )}
																			default={'transparent'}
																			onChange={value => saveMediaStyle( { hoverBackground: value } )}
																		/>
																		<PopColorControl
																			label={__( 'Icon Hover Border', 'gutenam-blocks' )}
																			value={( mediaStyle[ 0 ].hoverBorder ? mediaStyle[ 0 ].hoverBorder : '#444444' )}
																			default={'#444444'}
																			onChange={value => saveMediaStyle( { hoverBorder: value } )}
																		/>
																	</>
																);
															} else {
																tabout = (
																	<>
																		<PopColorControl
																			label={__( 'Icon Color', 'gutenam-blocks' )}
																			value={( mediaIcon[ 0 ].color ? mediaIcon[ 0 ].color : '#444444' )}
																			default={'#444444'}
																			onChange={value => saveMediaIcon( { color: value } )}
																		/>
																		<PopColorControl
																			label={__( 'Icon Background', 'gutenam-blocks' )}
																			value={( mediaStyle[ 0 ].background ? mediaStyle[ 0 ].background : '' )}
																			default={'transparent'}
																			onChange={value => saveMediaStyle( { background: value } )}
																		/>
																		<PopColorControl
																			label={__( 'Icon Border Color', 'gutenam-blocks' )}
																			value={( mediaStyle[ 0 ].border ? mediaStyle[ 0 ].border : '#444444' )}
																			default={'#444444'}
																			onChange={value => saveMediaStyle( { border: value } )}
																		/>
																	</>
																);
															}
														}
														return <div className={tab.className} key={tab.className}>{tabout}</div>;
													}
												}
											</TabPanel>
											<TextControl
												label={__( 'Icon Title for Accessibility', 'gutenam-blocks' )}
												value={mediaIcon[ 0 ].title}
												onChange={value => saveMediaIcon( { title: value } )}
											/>
										</>
									)}
									{'number' === mediaType && (
										<>
											<ResponsiveRangeControls
												label={__( 'Size', 'gutenam-blocks' )}
												value={mediaIcon[ 0 ].size}
												mobileValue={mediaIcon[ 0 ].mobileSize ? mediaIcon[ 0 ].mobileSize : ''}
												tabletValue={mediaIcon[ 0 ].tabletSize ? mediaIcon[ 0 ].tabletSize : ''}
												onChange={( value ) => saveMediaIcon( { size: value } )}
												onChangeTablet={( value ) => saveMediaIcon( { tabletSize: value } )}
												onChangeMobile={( value ) => saveMediaIcon( { mobileSize: value } )}
												min={5}
												max={250}
												step={1}
											/>
											<TypographyControls
												fontFamily={mediaNumber[ 0 ] && mediaNumber[ 0 ].family ? mediaNumber[ 0 ].family : ''}
												onFontFamily={( value ) => saveMediaNumber( { family: value } )}
												onFontChange={( select ) => {
													saveMediaNumber( {
														family: select.value,
														google: select.google,
													} );
												}}
												onFontArrayChange={( values ) => saveMediaNumber( values )}
												googleFont={undefined !== mediaNumber[ 0 ].google ? mediaNumber[ 0 ].google : false}
												onGoogleFont={( value ) => saveMediaNumber( { google: value } )}
												loadGoogleFont={undefined !== mediaNumber[ 0 ].loadGoogle ? mediaNumber[ 0 ].loadGoogle : true}
												onLoadGoogleFont={( value ) => saveMediaNumber( { loadGoogle: value } )}
												fontVariant={mediaNumber[ 0 ].variant ? mediaNumber[ 0 ].variant : ''}
												onFontVariant={( value ) => saveMediaNumber( { variant: value } )}
												fontWeight={mediaNumber[ 0 ].weight ? mediaNumber[ 0 ].weight : ''}
												onFontWeight={( value ) => saveMediaNumber( { weight: value } )}
												fontStyle={mediaNumber[ 0 ].style ? mediaNumber[ 0 ].style : ''}
												onFontStyle={( value ) => saveMediaNumber( { style: value } )}
												fontSubset={mediaNumber[ 0 ].subset ? mediaNumber[ 0 ].subset : ''}
												onFontSubset={( value ) => saveMediaNumber( { subset: value } )}
											/>
											<MeasurementControls
												label={__( 'Number Border', 'gutenam-blocks' )}
												measurement={mediaStyle[ 0 ].borderWidth}
												control={mediaBorderControl}
												onChange={( value ) => saveMediaStyle( { borderWidth: value } )}
												onControl={( value ) => setMediaBorderControl( value )}
												min={0}
												max={40}
												step={1}
											/>
											<RangeControl
												label={__( 'Number Border Radius (px)', 'gutenam-blocks' )}
												value={mediaStyle[ 0 ].borderRadius}
												onChange={value => saveMediaStyle( { borderRadius: value } )}
												step={1}
												min={0}
												max={200}
											/>
											<SelectControl
												label={__( 'Number Hover Animation', 'gutenam-blocks' )}
												value={mediaNumber[ 0 ].hoverAnimation ? mediaNumber[ 0 ].hoverAnimation : 'none'}
												options={[
													{ value: 'none', label: __( 'None', 'gutenam-blocks' ) },
													{ value: 'drawborder', label: __( 'Border Spin In', 'gutenam-blocks' ) },
												]}
												onChange={value => saveMediaNumber( { hoverAnimation: value } )}
											/>
											<TabPanel className="bst-inspect-tabs bst-hover-tabs"
													  activeClass="active-tab"
													  tabs={[
														  {
															  name     : 'normal',
															  title    : __( 'Normal', 'gutenam-blocks' ),
															  className: 'bst-normal-tab',
														  },
														  {
															  name     : 'hover',
															  title    : __( 'Hover', 'gutenam-blocks' ),
															  className: 'bst-hover-tab',
														  },
													  ]}>
												{
													( tab ) => {
														let tabout;
														if ( tab.name ) {
															if ( 'hover' === tab.name ) {
																tabout = (
																	<Fragment>
																		<PopColorControl
																			label={__( 'Number Hover Color', 'gutenam-blocks' )}
																			value={( mediaIcon[ 0 ].hoverColor ? mediaIcon[ 0 ].hoverColor : '#444444' )}
																			default={'#444444'}
																			onChange={value => saveMediaIcon( { hoverColor: value } )}
																		/>
																		<PopColorControl
																			label={__( 'Number Hover Background', 'gutenam-blocks' )}
																			value={( mediaStyle[ 0 ].hoverBackground ? mediaStyle[ 0 ].hoverBackground : '' )}
																			default={'transparent'}
																			onChange={value => saveMediaStyle( { hoverBackground: value } )}
																		/>
																		<PopColorControl
																			label={__( 'Number Hover Border', 'gutenam-blocks' )}
																			value={( mediaStyle[ 0 ].hoverBorder ? mediaStyle[ 0 ].hoverBorder : '#444444' )}
																			default={'#444444'}
																			onChange={value => saveMediaStyle( { hoverBorder: value } )}
																		/>
																	</Fragment>
																);
															} else {
																tabout = (
																	<Fragment>
																		<PopColorControl
																			label={__( 'Number Color', 'gutenam-blocks' )}
																			value={( mediaIcon[ 0 ].color ? mediaIcon[ 0 ].color : '#444444' )}
																			default={'#444444'}
																			onChange={value => saveMediaIcon( { color: value } )}
																		/>
																		<PopColorControl
																			label={__( 'Number Background', 'gutenam-blocks' )}
																			value={( mediaStyle[ 0 ].background ? mediaStyle[ 0 ].background : '' )}
																			default={'transparent'}
																			onChange={value => saveMediaStyle( { background: value } )}
																		/>
																		<PopColorControl
																			label={__( 'Number Border Color', 'gutenam-blocks' )}
																			value={( mediaStyle[ 0 ].border ? mediaStyle[ 0 ].border : '#444444' )}
																			default={'#444444'}
																			onChange={value => saveMediaStyle( { border: value } )}
																		/>
																	</Fragment>
																);
															}
														}
														return <div className={tab.className} key={tab.className}>{tabout}</div>;
													}
												}
											</TabPanel>
										</>
									)}
									<MeasurementControls
										label={__( 'Media Padding', 'gutenam-blocks' )}
										measurement={mediaStyle[ 0 ].padding}
										control={mediaPaddingControl}
										onChange={( value ) => saveMediaStyle( { padding: value } )}
										onControl={( value ) => setMediaPaddingControl( value )}
										min={0}
										max={100}
										step={1}
									/>
									<MeasurementControls
										label={__( 'Media Margin', 'gutenam-blocks' )}
										measurement={mediaStyle[ 0 ].margin}
										control={mediaMarginControl}
										onChange={( value ) => saveMediaStyle( { margin: value } )}
										onControl={( value ) => setMediaMarginControl( value )}
										min={-200}
										max={200}
										step={1}
									/>
								</BasePanelBody>
							)}
							{showSettings( 'titleSettings', 'base/infobox' ) && (
								<BasePanelBody
									title={__( 'Title Settings', 'gutenam-blocks' )}
									initialOpen={false}
									panelName={'bsb-info-title-settings'}
								>
									<ToggleControl
										label={__( 'Show Title', 'gutenam-blocks' )}
										checked={displayTitle}
										onChange={( value ) => setAttributes( { displayTitle: value } )}
									/>
									{displayTitle && (
										<Fragment>
											<PopColorControl
												label={__( 'Title Color', 'gutenam-blocks' )}
												value={( titleColor ? titleColor : '' )}
												default={''}
												onChange={value => setAttributes( { titleColor: value } )}
												swatchLabel2={ __( 'Hover', 'gutenam-blocks' ) }
												value2={ ( titleHoverColor ? titleHoverColor : '' ) }
												default2={''}
												onChange2={value => setAttributes( { titleHoverColor: value } )}
											/>
											<TypographyControls
												fontGroup={'heading'}
												tagLevel={titleFont[ 0 ].level}
												htmlTag={titleTagType}
												onTagLevelHTML={ ( value, tag ) => { saveTitleFont( { level: value } ); setAttributes( { titleTagType: tag } ) } }
												onTagLevel={( value ) => saveTitleFont( { level: value } )}
												fontSize={titleFont[ 0 ].size}
												onFontSize={( value ) => saveTitleFont( { size: value } )}
												fontSizeType={titleFont[ 0 ].sizeType}
												onFontSizeType={( value ) => saveTitleFont( { sizeType: value } )}
												lineHeight={titleFont[ 0 ].lineHeight}
												onLineHeight={( value ) => saveTitleFont( { lineHeight: value } )}
												lineHeightType={titleFont[ 0 ].lineType}
												onLineHeightType={( value ) => saveTitleFont( { lineType: value } )}
												letterSpacing={titleFont[ 0 ].letterSpacing}
												onLetterSpacing={( value ) => saveTitleFont( { letterSpacing: value } )}
												fontFamily={titleFont[ 0 ].family}
												onFontFamily={( value ) => saveTitleFont( { family: value } )}
												onFontChange={( select ) => {
													saveTitleFont( {
														family: select.value,
														google: select.google,
													} );
												}}
												onFontArrayChange={( values ) => saveTitleFont( values )}
												googleFont={titleFont[ 0 ].google}
												onGoogleFont={( value ) => saveTitleFont( { google: value } )}
												loadGoogleFont={titleFont[ 0 ].loadGoogle}
												onLoadGoogleFont={( value ) => saveTitleFont( { loadGoogle: value } )}
												textTransform={titleFont[ 0 ].textTransform}
												onTextTransform={( value ) => saveTitleFont( { textTransform: value } )}
												fontVariant={titleFont[ 0 ].variant}
												onFontVariant={( value ) => saveTitleFont( { variant: value } )}
												fontWeight={titleFont[ 0 ].weight}
												onFontWeight={( value ) => saveTitleFont( { weight: value } )}
												fontStyle={titleFont[ 0 ].style}
												onFontStyle={( value ) => saveTitleFont( { style: value } )}
												fontSubset={titleFont[ 0 ].subset}
												onFontSubset={( value ) => saveTitleFont( { subset: value } )}
												padding={titleFont[ 0 ].padding}
												onPadding={( value ) => saveTitleFont( { padding: value } )}
												paddingControl={titleFont[ 0 ].paddingControl}
												onPaddingControl={( value ) => saveTitleFont( { paddingControl: value } )}
												margin={titleFont[ 0 ].margin}
												onMargin={( value ) => saveTitleFont( { margin: value } )}
												marginControl={titleFont[ 0 ].marginControl}
												onMarginControl={( value ) => saveTitleFont( { marginControl: value } )}
											/>
											<ResponsiveRangeControls
												label={__( 'Min Height', 'gutenam-blocks' )}
												value={( ( undefined !== titleMinHeight && undefined !== titleMinHeight[ 0 ] ) ? titleMinHeight[ 0 ] : '' ) }
												onChange={ ( value ) => setAttributes( { titleMinHeight: [ value, ( ( undefined !== titleMinHeight && undefined !== titleMinHeight[ 1 ] ) ? titleMinHeight[ 1 ] : '' ), ( ( undefined !== titleMinHeight && undefined !== titleMinHeight[ 2 ] ) ? titleMinHeight[ 2 ] : '' ) ] } )}
												tabletValue={( ( undefined !== titleMinHeight && undefined !== titleMinHeight[ 1 ] ) ? titleMinHeight[ 1 ] : '' )}
												onChangeTablet={( value ) => setAttributes( { titleMinHeight: [ ( ( undefined !== titleMinHeight && undefined !== titleMinHeight[ 0 ] ) ? titleMinHeight[ 0 ] : '' ), value, ( ( undefined !== titleMinHeight && undefined !== titleMinHeight[ 2 ] ) ? titleMinHeight[ 2 ] : '' ) ] } )}
												mobileValue={( ( undefined !== titleMinHeight && undefined !== titleMinHeight[ 2 ] ) ? titleMinHeight[ 2 ] : '' )}
												onChangeMobile={( value ) => setAttributes( { titleMinHeight: [ ( ( undefined !== titleMinHeight && undefined !== titleMinHeight[ 0 ] ) ? titleMinHeight[ 0 ] : '' ), ( ( undefined !== titleMinHeight && undefined !== titleMinHeight[ 1 ] ) ? titleMinHeight[ 1 ] : '' ), value ] } )}
												step={1}
												min={0}
												max={600}
												unit={'px'}
												units={[ 'px' ]}
												showUnit={true}
											/>

										</Fragment>
									)}
								</BasePanelBody>
							)}
							{showSettings( 'textSettings', 'base/infobox' ) && (
								<BasePanelBody
									title={__( 'Text Settings', 'gutenam-blocks' )}
									initialOpen={false}
									panelName={'bsb-info-text-settings'}
								>
									<ToggleControl
										label={__( 'Show Text', 'gutenam-blocks' )}
										checked={displayText}
										onChange={( value ) => setAttributes( { displayText: value } )}
									/>
									{displayText && (
										<Fragment>
											<PopColorControl
												label={__( 'Text Color', 'gutenam-blocks' )}
												value={( textColor ? textColor : '' )}
												default={''}
												onChange={value => setAttributes( { textColor: value } )}
												swatchLabel2={ __( 'Hover', 'gutenam-blocks' ) }
												value2={( textHoverColor ? textHoverColor : '' )}
												default2={''}
												onChange2={value => setAttributes( { textHoverColor: value } )}
											/>
											<TypographyControls
												fontSize={textFont[ 0 ].size}
												onFontSize={( value ) => saveTextFont( { size: value } )}
												fontSizeType={textFont[ 0 ].sizeType}
												onFontSizeType={( value ) => saveTextFont( { sizeType: value } )}
												lineHeight={textFont[ 0 ].lineHeight}
												onLineHeight={( value ) => saveTextFont( { lineHeight: value } )}
												lineHeightType={textFont[ 0 ].lineType}
												onLineHeightType={( value ) => saveTextFont( { lineType: value } )}
												letterSpacing={textFont[ 0 ].letterSpacing}
												onLetterSpacing={( value ) => saveTextFont( { letterSpacing: value } )}
												fontFamily={textFont[ 0 ].family}
												onFontFamily={( value ) => saveTextFont( { family: value } )}
												onFontChange={( select ) => {
													saveTextFont( {
														family: select.value,
														google: select.google,
													} );
												}}
												onFontArrayChange={( values ) => saveTextFont( values )}
												googleFont={textFont[ 0 ].google}
												onGoogleFont={( value ) => saveTextFont( { google: value } )}
												loadGoogleFont={textFont[ 0 ].loadGoogle}
												onLoadGoogleFont={( value ) => saveTextFont( { loadGoogle: value } )}
												fontVariant={textFont[ 0 ].variant}
												onFontVariant={( value ) => saveTextFont( { variant: value } )}
												fontWeight={textFont[ 0 ].weight}
												onFontWeight={( value ) => saveTextFont( { weight: value } )}
												fontStyle={textFont[ 0 ].style}
												onFontStyle={( value ) => saveTextFont( { style: value } )}
												fontSubset={textFont[ 0 ].subset}
												onFontSubset={( value ) => saveTextFont( { subset: value } )}
												textTransform={( undefined !== textFont[ 0 ].textTransform ? textFont[ 0 ].textTransform : '' )}
												onTextTransform={( value ) => saveTextFont( { textTransform: value } )}
											/>
											<TypographyControls
												padding={( undefined !== textSpacing && undefined !== textSpacing[ 0 ] && textSpacing[ 0 ].padding ? textSpacing[ 0 ].padding : [ '', '', '', '' ] )}
												onPadding={( value ) => saveTextSpacing( { padding: value } )}
												paddingControl={( undefined !== textSpacing && undefined !== textSpacing[ 0 ] && textSpacing[ 0 ].paddingControl ? textSpacing[ 0 ].paddingControl : 'linked' )}
												onPaddingControl={( value ) => saveTextSpacing( { paddingControl: value } )}
												margin={( undefined !== textSpacing && undefined !== textSpacing[ 0 ] && textSpacing[ 0 ].margin ? textSpacing[ 0 ].margin : [ '', '', '', '' ] )}
												onMargin={( value ) => saveTextSpacing( { margin: value } )}
												marginControl={( undefined !== textSpacing && undefined !== textSpacing[ 0 ] && textSpacing[ 0 ].marginControl ? textSpacing[ 0 ].marginControl : 'linked' )}
												onMarginControl={( value ) => saveTextSpacing( { marginControl: value } )}
											/>
											<ResponsiveRangeControls
												label={__( 'Min Height', 'gutenam-blocks' )}
												value={ ( ( undefined !== textMinHeight && undefined !== textMinHeight[ 0 ] ) ? textMinHeight[ 0 ] : '' ) }
												onChange={ ( value ) => setAttributes( { textMinHeight: [ value, ( ( undefined !== textMinHeight && undefined !== textMinHeight[ 1 ] ) ? textMinHeight[ 1 ] : '' ), ( ( undefined !== textMinHeight && undefined !== textMinHeight[ 2 ] ) ? textMinHeight[ 2 ] : '' ) ] } )}
												tabletValue={( ( undefined !== textMinHeight && undefined !== textMinHeight[ 1 ] ) ? textMinHeight[ 1 ] : '' )}
												onChangeTablet={( value ) => setAttributes( { textMinHeight: [ ( ( undefined !== textMinHeight && undefined !== textMinHeight[ 0 ] ) ? textMinHeight[ 0 ] : '' ), value, ( ( undefined !== textMinHeight && undefined !== textMinHeight[ 2 ] ) ? textMinHeight[ 2 ] : '' ) ] } )}
												mobileValue={( ( undefined !== textMinHeight && undefined !== textMinHeight[ 2 ] ) ? textMinHeight[ 2 ] : '' )}
												onChangeMobile={( value ) => setAttributes( { textMinHeight: [ ( ( undefined !== textMinHeight && undefined !== textMinHeight[ 0 ] ) ? textMinHeight[ 0 ] : '' ), ( ( undefined !== textMinHeight && undefined !== textMinHeight[ 1 ] ) ? textMinHeight[ 1 ] : '' ), value ] } )}
												step={1}
												min={0}
												max={600}
												unit={'px'}
												units={[ 'px' ]}
												showUnit={true}
											/>
										</Fragment>
									)}
								</BasePanelBody>
							)}

							{showSettings( 'learnMoreSettings', 'base/infobox' ) && (
								<BasePanelBody
									title={__( 'Learn More Settings', 'gutenam-blocks' )}
									initialOpen={false}
									panelName={'bsb-info-learn-more'}
								>
									<ToggleControl
										label={__( 'Show Learn More', 'gutenam-blocks' )}
										checked={displayLearnMore}
										onChange={( value ) => setAttributes( { displayLearnMore: value } )}
									/>
									{displayLearnMore && (
										<Fragment>
											<ColorGroup>
												<PopColorControl
													label={__( 'Text Color', 'gutenam-blocks' )}
													value={( learnMoreStyles[ 0 ].color ? learnMoreStyles[ 0 ].color : '' )}
													default={''}
													onChange={value => saveLearnMoreStyles( { color: value } )}
													swatchLabel2={ __( 'Hover', 'gutenam-blocks' ) }
													value2={( learnMoreStyles[ 0 ].colorHover ? learnMoreStyles[ 0 ].colorHover : '' )}
													default2={''}
													onChange2={value => saveLearnMoreStyles( { colorHover: value } )}
												/>
												<PopColorControl
													label={__( 'Background', 'gutenam-blocks' )}
													value={( learnMoreStyles[ 0 ].background ? learnMoreStyles[ 0 ].background : '' )}
													default={''}
													onChange={value => saveLearnMoreStyles( { background: value } )}
													value2={( learnMoreStyles[ 0 ].backgroundHover ? learnMoreStyles[ 0 ].backgroundHover : '' )}
													default2={ '' }
													onChange2={value => saveLearnMoreStyles( { backgroundHover: value } )}
												/>
												<PopColorControl
													label={__( 'Border Color', 'gutenam-blocks' )}
													value={( learnMoreStyles[ 0 ].border ? learnMoreStyles[ 0 ].border : '' )}
													default={''}
													onChange={value => saveLearnMoreStyles( { border: value } )}
													value2={( learnMoreStyles[ 0 ].borderHover ? learnMoreStyles[ 0 ].borderHover : '' )}
													default2={''}
													onChange2={value => saveLearnMoreStyles( { borderHover: value } )}
												/>
											</ColorGroup>
											<MeasurementControls
												label={__( 'Learn More Border Width (px)', 'gutenam-blocks' )}
												measurement={learnMoreStyles[ 0 ].borderWidth}
												control={learnMoreStyles[ 0 ].borderControl}
												onChange={( value ) => saveLearnMoreStyles( { borderWidth: value } )}
												onControl={( value ) => saveLearnMoreStyles( { borderControl: value } )}
												min={0}
												max={40}
												step={1}
											/>
											<RangeControl
												label={__( 'Learn More Border Radius (px)', 'gutenam-blocks' )}
												value={learnMoreStyles[ 0 ].borderRadius}
												onChange={value => saveLearnMoreStyles( { borderRadius: value } )}
												step={1}
												min={0}
												max={200}
											/>
											<TypographyControls
												fontSize={learnMoreStyles[ 0 ].size}
												onFontSize={( value ) => saveLearnMoreStyles( { size: value } )}
												fontSizeType={learnMoreStyles[ 0 ].sizeType}
												onFontSizeType={( value ) => saveLearnMoreStyles( { sizeType: value } )}
												lineHeight={learnMoreStyles[ 0 ].lineHeight}
												onLineHeight={( value ) => saveLearnMoreStyles( { lineHeight: value } )}
												lineHeightType={learnMoreStyles[ 0 ].lineType}
												onLineHeightType={( value ) => saveLearnMoreStyles( { lineType: value } )}
												letterSpacing={learnMoreStyles[ 0 ].letterSpacing}
												onLetterSpacing={( value ) => saveLearnMoreStyles( { letterSpacing: value } )}
												fontFamily={learnMoreStyles[ 0 ].family}
												onFontFamily={( value ) => saveLearnMoreStyles( { family: value } )}
												onFontChange={( select ) => {
													saveLearnMoreStyles( {
														family: select.value,
														google: select.google,
													} );
												}}
												onFontArrayChange={( values ) => saveLearnMoreStyles( values )}
												googleFont={learnMoreStyles[ 0 ].google}
												onGoogleFont={( value ) => saveLearnMoreStyles( { google: value } )}
												loadGoogleFont={learnMoreStyles[ 0 ].loadGoogle}
												onLoadGoogleFont={( value ) => saveLearnMoreStyles( { loadGoogle: value } )}
												textTransform={( undefined !== learnMoreStyles[ 0 ].textTransform ? learnMoreStyles[ 0 ].textTransform : '' )}
												onTextTransform={( value ) => saveLearnMoreStyles( { textTransform: value } )}
												fontVariant={learnMoreStyles[ 0 ].variant}
												onFontVariant={( value ) => saveLearnMoreStyles( { variant: value } )}
												fontWeight={learnMoreStyles[ 0 ].weight}
												onFontWeight={( value ) => saveLearnMoreStyles( { weight: value } )}
												fontStyle={learnMoreStyles[ 0 ].style}
												onFontStyle={( value ) => saveLearnMoreStyles( { style: value } )}
												fontSubset={learnMoreStyles[ 0 ].subset}
												onFontSubset={( value ) => saveLearnMoreStyles( { subset: value } )}
												padding={learnMoreStyles[ 0 ].padding}
												onPadding={( value ) => saveLearnMoreStyles( { padding: value } )}
												paddingControl={learnMoreStyles[ 0 ].paddingControl}
												onPaddingControl={( value ) => saveLearnMoreStyles( { paddingControl: value } )}
												margin={learnMoreStyles[ 0 ].margin}
												onMargin={( value ) => saveLearnMoreStyles( { margin: value } )}
												marginControl={learnMoreStyles[ 0 ].marginControl}
												onMarginControl={( value ) => saveLearnMoreStyles( { marginControl: value } )}
											/>
										</Fragment>
									)}
								</BasePanelBody>
							)}
						</>
					}
					{( activeTab === 'advanced') && (
						<>
							<BasePanelBody panelName={'bsb-infobox-spacing-settings'}>
								<ResponsiveMeasureRangeControl
									label={__('Padding', 'gutenam-blocks')}
									value={containerPadding}
									tabletValue={containerTabletPadding}
									mobileValue={containerMobilePadding}
									onChange={(value) => {
										setAttributes({containerPadding: value});
									}}
									onChangeTablet={(value) => {
										setAttributes({containerTabletPadding: value});
									}}
									onChangeMobile={(value) => {
										setAttributes({containerMobilePadding: value});
									}}
									min={paddingMin}
									max={paddingMax}
									step={paddingStep}
									unit={containerPaddingType}
									units={['px', 'em', 'rem', '%']}
									onUnit={(value) => setAttributes({containerPaddingType: value})}
									onMouseOver={paddingMouseOver.onMouseOver}
									onMouseOut={paddingMouseOver.onMouseOut}
								/>
								<ResponsiveMeasureRangeControl
									label={__('Margin', 'gutenam-blocks')}
									value={containerMargin}
									tabletValue={tabletContainerMargin}
									mobileValue={mobileContainerMargin}
									onChange={(value) => {
										setAttributes({containerMargin: value});
									}}
									onChangeTablet={(value) => {
										setAttributes({tabletContainerMargin: value});
									}}
									onChangeMobile={(value) => {
										setAttributes({mobileContainerMargin: value});
									}}
									min={marginMin}
									max={marginMax}
									step={marginStep}
									unit={containerMarginUnit}
									units={['px', 'em', 'rem', '%']}
									onUnit={(value) => setAttributes({containerMarginUnit: value})}
									onMouseOver={marginMouseOver.onMouseOver}
									onMouseOut={marginMouseOver.onMouseOut}
								/>
								<ResponsiveRangeControls
									label={__( 'Max Width', 'gutenam-blocks' )}
									value={ maxWidth }
									onChange={ ( value ) => setAttributes( { maxWidth: value } ) }
									tabletValue={tabletMaxWidth}
									onChangeTablet={( value ) => setAttributes( { tabletMaxWidth: value } ) }
									mobileValue={mobileMaxWidth}
									onChangeMobile={ ( value ) => setAttributes( { mobileMaxWidth: value } ) }
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

							<div className="bst-sidebar-settings-spacer"></div>

							<BaseBlockDefaults attributes={ attributes } defaultAttributes={ metadata['attributes'] } blockSlug={ metadata['name'] } excludedAttrs={ nonTransAttrs } />
						</>
					)}
				</InspectorControls>
			)}
			<div className={`bst-blocks-info-box-link-wrap bst-blocks-info-box-media-align-${previewMediaAlign} ${isSelectedClass} bst-info-halign-${previewhAlign} bsb-info-box-vertical-media-align-${mediaVAlign}`}
				 style={{
					boxShadow    : ( displayShadow ? shadow[ 0 ].hOffset + 'px ' + shadow[ 0 ].vOffset + 'px ' + shadow[ 0 ].blur + 'px ' + shadow[ 0 ].spread + 'px ' + BaseColorOutput( shadow[ 0 ].color, shadow[ 0 ].opacity ) : undefined ),
					background   : ( containerBackground ? BaseColorOutput( containerBackground ) : undefined ),
					borderTop: ( previewBorderTopStyle ? previewBorderTopStyle : undefined ),
					borderRight: ( previewBorderRightStyle ? previewBorderRightStyle : undefined ),
					borderBottom: ( previewBorderBottomStyle ? previewBorderBottomStyle : undefined ),
					borderLeft: ( previewBorderLeftStyle ? previewBorderLeftStyle : undefined ),
					borderTopLeftRadius: ( previewRadiusTop ? previewRadiusTop + ( borderRadiusUnit ? borderRadiusUnit : 'px' ) : undefined ),
					borderTopRightRadius: ( previewRadiusRight ? previewRadiusRight + ( borderRadiusUnit ? borderRadiusUnit : 'px' ) : undefined ),
					borderBottomRightRadius: ( previewRadiusBottom ? previewRadiusBottom + ( borderRadiusUnit ? borderRadiusUnit : 'px' ) : undefined ),
					borderBottomLeftRadius: ( previewRadiusLeft ? previewRadiusLeft + ( borderRadiusUnit ? borderRadiusUnit : 'px' ) : undefined ),
					paddingTop   : ( '' !== previewContainerPaddingTop ? getSpacingOptionOutput( previewContainerPaddingTop, previewPaddingType ) : undefined ),
					paddingRight : ( '' !== previewContainerPaddingRight ? getSpacingOptionOutput( previewContainerPaddingRight, previewPaddingType ) : undefined ),
					paddingBottom: ( '' !== previewContainerPaddingBottom ? getSpacingOptionOutput( previewContainerPaddingBottom, previewPaddingType ) : undefined ),
					paddingLeft  : ( '' !== previewContainerPaddingLeft ? getSpacingOptionOutput( previewContainerPaddingLeft, previewPaddingType ) : undefined ),
					maxWidth     : ( maxWidth ? maxWidth + maxWidthUnit : undefined ),
					marginTop    : ( '' !== previewContainerMarginTop ? getSpacingOptionOutput( previewContainerMarginTop, containerMarginUnit ) : undefined ),
					marginRight  : ( '' !== previewContainerMarginRight ? getSpacingOptionOutput( previewContainerMarginRight, containerMarginUnit ) : undefined ),
					marginBottom : ( '' !== previewContainerMarginBottom ? getSpacingOptionOutput( previewContainerMarginBottom, containerMarginUnit ) : undefined ),
					marginLeft   : ( '' !== previewContainerMarginLeft ? getSpacingOptionOutput( previewContainerMarginLeft, containerMarginUnit ) : undefined ),
				 }}>
				{'none' !== mediaType && (
					<div className={'bst-blocks-info-box-media-container'} style={{
						margin: ( mediaStyle[ 0 ].margin ? mediaStyle[ 0 ].margin[ 0 ] + 'px ' + mediaStyle[ 0 ].margin[ 1 ] + 'px ' + mediaStyle[ 0 ].margin[ 2 ] + 'px ' + mediaStyle[ 0 ].margin[ 3 ] + 'px' : '' ),
					}}>
						<div
							className={`bst-blocks-info-box-media ${'number' === mediaType ? 'bst-info-media-animate-' + mediaNumber[ 0 ].hoverAnimation : ''}${'image' === mediaType ? 'bst-info-media-animate-' + mediaImage[ 0 ].hoverAnimation : ''}${'icon' === mediaType ? 'bst-info-media-animate-' + mediaIcon[ 0 ].hoverAnimation : ''}`}
							style={{
								borderColor    : BaseColorOutput( mediaStyle[ 0 ].border ),
								backgroundColor: BaseColorOutput( mediaStyle[ 0 ].background ),
								borderRadius   : mediaStyle[ 0 ].borderRadius + 'px',
								borderWidth    : ( mediaStyle[ 0 ].borderWidth ? mediaStyle[ 0 ].borderWidth[ 0 ] + 'px ' + mediaStyle[ 0 ].borderWidth[ 1 ] + 'px ' + mediaStyle[ 0 ].borderWidth[ 2 ] + 'px ' + mediaStyle[ 0 ].borderWidth[ 3 ] + 'px' : '' ),
								padding        : ( mediaStyle[ 0 ].padding ? mediaStyle[ 0 ].padding[ 0 ] + 'px ' + mediaStyle[ 0 ].padding[ 1 ] + 'px ' + mediaStyle[ 0 ].padding[ 2 ] + 'px ' + mediaStyle[ 0 ].padding[ 3 ] + 'px' : '' ),
							}}>
							{!mediaImage[ 0 ].url && 'image' === mediaType && (
								<Fragment>
									<BaseMediaPlaceholder
										labels={''}
										selectIcon={plusCircleFilled}
										selectLabel={__( 'Select Image', 'gutenam-blocks' )}
										onSelect={onSelectImage}
										accept="image/*"
										className={'base-image-upload'}
										allowedTypes={ALLOWED_MEDIA_TYPES}
										disableMediaButtons={false}
									/>
								</Fragment>
							)}
							{mediaImage[ 0 ].url && 'image' === mediaType && (
								<div className="base-info-box-image-inner-intrisic-container" style={{
									maxWidth: mediaImage[ 0 ].maxWidth + 'px',
								}}>
									<div
										className={`base-info-box-image-intrisic bst-info-animate-${mediaImage[ 0 ].hoverAnimation}${( 'svg+xml' === mediaImage[ 0 ].subtype ? ' bsb-info-box-image-type-svg' : '' )}${hasRatio ? ' bsb-info-box-image-ratio bsb-info-box-image-ratio-' + imageRatio : ''}`}
										style={{
											paddingBottom: imageRatioPadding,
											height       : imageRatioHeight,
											width        : isNaN( mediaImage[ 0 ].width ) ? undefined : mediaImage[ 0 ].width + 'px',
											maxWidth     : '100%',
										}}>
										<div className="base-info-box-image-inner-intrisic">
											<img
												src={mediaImage[ 0 ].url}
												alt={mediaImage[ 0 ].alt}
												width={( mediaImage[ 0 ].subtype && 'svg+xml' === mediaImage[ 0 ].subtype ? mediaImage[ 0 ].maxWidth : mediaImage[ 0 ].width )}
												height={mediaImage[ 0 ].height}
												className={`${( mediaImage[ 0 ].id ? `bst-info-box-image wp-image-${mediaImage[ 0 ].id}` : 'bst-info-box-image wp-image-offsite' )} ${( mediaImage[ 0 ].subtype && 'svg+xml' === mediaImage[ 0 ].subtype ? ' bst-info-svg-image' : '' )}`}
											/>
											{mediaImage[ 0 ].flipUrl && 'flip' === mediaImage[ 0 ].hoverAnimation && (
												<img
													src={mediaImage[ 0 ].flipUrl}
													alt={mediaImage[ 0 ].flipAlt}
													width={( mediaImage[ 0 ].flipSubtype && 'svg+xml' === mediaImage[ 0 ].flipSubtype ? mediaImage[ 0 ].maxWidth : mediaImage[ 0 ].flipWidth )}
													height={mediaImage[ 0 ].flipHeight}
													className={`${( mediaImage[ 0 ].flipId ? `bst-info-box-image-flip wp-image-${mediaImage[ 0 ].flipId}` : 'bst-info-box-image-flip wp-image-offsite' )} ${( mediaImage[ 0 ].flipSubtype && 'svg+xml' === mediaImage[ 0 ].flipSubtype ? ' bst-info-svg-image' : '' )}`}
												/>
											)}
										</div>
									</div>
								</div>
							)}
							{'icon' === mediaType && (
								<div className={`base-info-box-icon-container bst-info-icon-animate-${mediaIcon[ 0 ].hoverAnimation}`}>
									<div className={'base-info-box-icon-inner-container'}>
										<IconRender className={`bst-info-svg-icon bst-info-svg-icon-${mediaIcon[ 0 ].icon}`} name={mediaIcon[ 0 ].icon} size={previewMediaIconSize} htmltag="span"
													strokeWidth={( 'fe' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined )} style={{
											display: 'flex',
											color  : ( mediaIcon[ 0 ].color ? BaseColorOutput( mediaIcon[ 0 ].color ) : undefined ),
										}}/>
										{mediaIcon[ 0 ].flipIcon && 'flip' === mediaIcon[ 0 ].hoverAnimation && (
											<IconRender className={`bst-info-svg-icon-flip bst-info-svg-icon-${mediaIcon[ 0 ].flipIcon}`} name={mediaIcon[ 0 ].flipIcon} size={previewMediaIconSize}
														htmltag="span" strokeWidth={( 'fe' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined )} style={{
												display: 'flex',
												color  : ( mediaIcon[ 0 ].hoverColor ? BaseColorOutput( mediaIcon[ 0 ].hoverColor ) : undefined ),
											}}/>
										)}
									</div>
								</div>
							)}
							{'number' === mediaType && (
								<div
									className={`base-info-box-number-container bst-info-number-animate-${mediaNumber && mediaNumber[ 0 ] && mediaNumber[ 0 ].hoverAnimation ? mediaNumber[ 0 ].hoverAnimation : 'none'}`}>
									<div className={'base-info-box-number-inner-container'} style={{
												fontWeight: mediaNumber[ 0 ].weight,
												fontStyle : mediaNumber[ 0 ].style,
												color     : ( mediaIcon[ 0 ].color ? BaseColorOutput( mediaIcon[ 0 ].color ) : undefined ),
												fontSize  : mediaIcon[ 0 ].size + 'px',
												fontFamily: ( mediaNumber[ 0 ].family ? mediaNumber[ 0 ].family : undefined ),
											}}>
										<RichText
											className="bst-blocks-info-box-number"
											allowedFormats={( linkProperty === 'learnmore' ? applyFilters( 'base.whitelist_richtext_formats', [ 'base/insert-dynamic', 'core/bold', 'core/italic', 'core/link', 'toolset/inline-field' ] ) : applyFilters( 'base.whitelist_richtext_formats', [ 'base/insert-dynamic', 'core/bold', 'core/italic', 'toolset/inline-field' ] ) )}
											tagName={'div'}
											placeholder={'1'}
											onChange={onChangeNumber}
											value={number}
										/>
									</div>
									{mediaNumber[ 0 ].google && (
										<WebfontLoader config={nconfig}>
										</WebfontLoader>
									)}
								</div>
							)}
						</div>
					</div>
				)}
				<div className={'bst-infobox-textcontent'}>
					{displayTitle && titleFont[ 0 ].google && (
						<WebfontLoader config={config}>
						</WebfontLoader>
					)}
					{displayTitle && (
						<RichText
							className="bst-blocks-info-box-title"
							allowedFormats={( linkProperty === 'learnmore' ? applyFilters( 'base.whitelist_richtext_formats', [ 'base/insert-dynamic', 'core/bold', 'core/italic', 'core/link', 'toolset/inline-field' ] ) : applyFilters( 'base.whitelist_richtext_formats', [ 'base/insert-dynamic', 'core/bold', 'core/italic', 'toolset/inline-field' ] ) )}
							tagName={titleTagName}
							placeholder={__( 'Title', 'gutenam-blocks' )}
							onChange={onChangeTitle}
							value={title}
							style={{
								fontWeight   : titleFont[ 0 ].weight,
								fontStyle    : titleFont[ 0 ].style,
								textTransform: titleFont[ 0 ].textTransform ? titleFont[ 0 ].textTransform : undefined,
								color        : BaseColorOutput( titleColor ),
								fontSize     : getFontSizeOptionOutput( previewTitleFontSize, titleFont[ 0 ].sizeType ),
								lineHeight   : previewTitleLineHeight + titleFont[ 0 ].lineType,
								letterSpacing: titleFont[ 0 ].letterSpacing + 'px',
								fontFamily   : ( titleFont[ 0 ].family ? titleFont[ 0 ].family : '' ),
								padding      : ( titleFont[ 0 ].padding ? titleFont[ 0 ].padding[ 0 ] + 'px ' + titleFont[ 0 ].padding[ 1 ] + 'px ' + titleFont[ 0 ].padding[ 2 ] + 'px ' + titleFont[ 0 ].padding[ 3 ] + 'px' : '' ),
								margin       : ( titleFont[ 0 ].margin ? titleFont[ 0 ].margin[ 0 ] + 'px ' + titleFont[ 0 ].margin[ 1 ] + 'px ' + titleFont[ 0 ].margin[ 2 ] + 'px ' + titleFont[ 0 ].margin[ 3 ] + 'px' : '' ),
								minHeight    : previewTitleMinHeight + 'px',
							}}
							keepPlaceholderOnFocus
						/>
					)}
					{displayText && textFont[ 0 ].google && (
						<WebfontLoader config={tconfig}>
						</WebfontLoader>
					)}
					{displayText && (
						<RichText
							className="bst-blocks-info-box-text"
							allowedFormats={( linkProperty === 'learnmore' ? applyFilters( 'base.whitelist_richtext_formats', [ 'base/insert-dynamic', 'core/bold', 'core/italic', 'core/link', 'toolset/inline-field' ] ) : applyFilters( 'base.whitelist_richtext_formats', [ 'base/insert-dynamic', 'core/bold', 'core/italic', 'toolset/inline-field' ] ) )}
							tagName={'p'}
							placeholder={__( 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean diam dolor, accumsan sed rutrum vel, dapibus et leo.', 'gutenam-blocks' )}
							onChange={( value ) => setAttributes( { contentText: value } )}
							value={contentText}
							style={{
								fontWeight   : textFont[ 0 ].weight,
								fontStyle    : textFont[ 0 ].style,
								color        : BaseColorOutput( textColor ),
								fontSize     : getFontSizeOptionOutput( previewTextFontSize, textFont[ 0 ].sizeType ),
								lineHeight   : previewTextLineHeight + textFont[ 0 ].lineType,
								letterSpacing: textFont[ 0 ].letterSpacing + 'px',
								textTransform: ( undefined !== textFont[ 0 ].textTransform && textFont[ 0 ].textTransform ) ? textFont[ 0 ].textTransform : undefined,
								fontFamily   : ( textFont[ 0 ].family ? textFont[ 0 ].family : '' ),
								padding      : ( undefined !== textSpacing && undefined !== textSpacing[ 0 ] && textSpacing[ 0 ].padding ? textSpacing[ 0 ].padding[ 0 ] + 'px ' + textSpacing[ 0 ].padding[ 1 ] + 'px ' + textSpacing[ 0 ].padding[ 2 ] + 'px ' + textSpacing[ 0 ].padding[ 3 ] + 'px' : '' ),
								margin       : ( undefined !== textSpacing && undefined !== textSpacing[ 0 ] && textSpacing[ 0 ].margin ? textSpacing[ 0 ].margin[ 0 ] + 'px ' + textSpacing[ 0 ].margin[ 1 ] + 'px ' + textSpacing[ 0 ].margin[ 2 ] + 'px ' + textSpacing[ 0 ].margin[ 3 ] + 'px' : '' ),
								minHeight    : previewTextMinHeight + 'px',
							}}
							keepPlaceholderOnFocus
						/>
					)}
					{displayLearnMore && learnMoreStyles[ 0 ].google && (
						<WebfontLoader config={lconfig}>
						</WebfontLoader>
					)}
					{displayLearnMore && (
						<div className="bst-blocks-info-box-learnmore-wrap" style={{
							margin: ( learnMoreStyles[ 0 ].margin ? learnMoreStyles[ 0 ].margin[ 0 ] + 'px ' + learnMoreStyles[ 0 ].margin[ 1 ] + 'px ' + learnMoreStyles[ 0 ].margin[ 2 ] + 'px ' + learnMoreStyles[ 0 ].margin[ 3 ] + 'px' : '' ),
						}}>
							<RichText
								allowedFormats={applyFilters( 'base.whitelist_richtext_formats', [ 'base/insert-dynamic', 'core/bold', 'core/italic', 'toolset/inline-field' ] )}
								className="bst-blocks-info-box-learnmore"
								tagName={'div'}
								placeholder={__( 'Learn More', 'gutenam-blocks' )}
								onChange={value => setAttributes( { learnMore: value } )}
								value={learnMore}
								style={{
									fontWeight   : learnMoreStyles[ 0 ].weight,
									fontStyle    : learnMoreStyles[ 0 ].style,
									color        : BaseColorOutput( learnMoreStyles[ 0 ].color ),
									borderRadius : learnMoreStyles[ 0 ].borderRadius + 'px',
									background   : BaseColorOutput( learnMoreStyles[ 0 ].background ),
									borderColor  : BaseColorOutput( learnMoreStyles[ 0 ].border ),
									fontSize     : getFontSizeOptionOutput( previewLearnMoreFontSize, learnMoreStyles[ 0 ].sizeType ),
									lineHeight   : previewLearnMoreLineHeight + learnMoreStyles[ 0 ].lineType,
									letterSpacing: learnMoreStyles[ 0 ].letterSpacing + 'px',
									textTransform: ( undefined !== learnMoreStyles[ 0 ].textTransform && learnMoreStyles[ 0 ].textTransform ) ? learnMoreStyles[ 0 ].textTransform : undefined,
									fontFamily   : ( learnMoreStyles[ 0 ].family ? learnMoreStyles[ 0 ].family : '' ),
									borderWidth  : ( learnMoreStyles[ 0 ].borderWidth ? learnMoreStyles[ 0 ].borderWidth[ 0 ] + 'px ' + learnMoreStyles[ 0 ].borderWidth[ 1 ] + 'px ' + learnMoreStyles[ 0 ].borderWidth[ 2 ] + 'px ' + learnMoreStyles[ 0 ].borderWidth[ 3 ] + 'px' : '' ),
									padding      : ( learnMoreStyles[ 0 ].padding ? learnMoreStyles[ 0 ].padding[ 0 ] + 'px ' + learnMoreStyles[ 0 ].padding[ 1 ] + 'px ' + learnMoreStyles[ 0 ].padding[ 2 ] + 'px ' + learnMoreStyles[ 0 ].padding[ 3 ] + 'px' : '' ),
								}}
								keepPlaceholderOnFocus
							/>
						</div>
					)}
				</div>
				<SpacingVisualizer
					style={ {
						marginLeft: ( undefined !== previewContainerMarginLeft ? getSpacingOptionOutput( previewContainerMarginLeft, containerMarginUnit ) : undefined ),
						marginRight: ( undefined !== previewContainerMarginRight ? getSpacingOptionOutput( previewContainerMarginRight, containerMarginUnit ) : undefined ),
						marginTop: ( undefined !== previewContainerMarginTop ? getSpacingOptionOutput( previewContainerMarginTop, containerMarginUnit ) : undefined ),
						marginBottom: ( undefined !== previewContainerMarginBottom ? getSpacingOptionOutput( previewContainerMarginBottom, containerMarginUnit ) : undefined ),
					} }
					type="inside"
					forceShow={ paddingMouseOver.isMouseOver }
					spacing={ [ getSpacingOptionOutput( previewContainerPaddingTop, previewPaddingType ), getSpacingOptionOutput( previewContainerPaddingRight, previewPaddingType ), getSpacingOptionOutput( previewContainerPaddingBottom, previewPaddingType ), getSpacingOptionOutput( previewContainerPaddingLeft, previewPaddingType ) ] }
				/>
				<SpacingVisualizer
					type="outsideVertical"
					forceShow={ marginMouseOver.isMouseOver }
					spacing={ [ getSpacingOptionOutput( previewContainerMarginTop, containerMarginUnit ), getSpacingOptionOutput( previewContainerMarginRight, containerMarginUnit ), getSpacingOptionOutput( previewContainerMarginBottom, containerMarginUnit ), getSpacingOptionOutput( previewContainerMarginLeft, containerMarginUnit ) ] }
				/>
			</div>
		</div>
	);
}

export default BaseInfoBox;
