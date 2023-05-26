/**
 * BLOCK: Base Advanced Heading
 *
 */

/**
 * Internal dependencies
 */
import classnames from 'classnames';
import {
	PopColorControl,
	TextShadowControl,
	TypographyControls,
	InlineTypographyControls,
	ResponsiveMeasurementControls,
	ResponsiveRangeControls,
	BasePanelBody,
	URLInputControl,
	BaseWebfontLoader,
	HeadingLevelIcon,
	InlinePopColorControl,
	ResponsiveAlignControls,
	InspectorControlTabs,
	BaseBlockDefaults,
	ResponsiveMeasureRangeControl,
	SpacingVisualizer,
	ResponsiveUnitControl,
	TwoColumn,
	ColorGroup,
	ResponsiveFontSizeControl,
	BaseRadioButtons,
	TagSelect,
	ResponsiveBorderControl,
	CopyPasteAttributes,
	BaseIconPicker,
	IconRender
} from '@base/components';

import {
	BaseColorOutput,
	showSettings,
	getPreviewSize,
	getSpacingOptionOutput,
	mouseOverVisualizer,
	getFontSizeOptionOutput,
	getBorderStyle,
	getBorderColor,
	getUniqueId,
	getInQueryBlock,
	setBlockDefaults,
} from '@base/helpers';

/**
 * Block dependencies
 */
import './formats/markformat';
import './formats/typed-text';

import Typed from 'typed.js';

/**
 * Import Css
 */
import './editor.scss';
import metadata from './block.json';
/**
 * Internal block libraries
 */
import { __ } from '@wordpress/i18n';
import { useDispatch, useSelect } from '@wordpress/data';
import {
	createBlock,
} from '@wordpress/blocks';
import {
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
	InspectorAdvancedControls,
	RichText,
	getColorClassName,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	useEffect,
	useState,
	useRef,
} from '@wordpress/element';

import {
	ToolbarGroup,
	Spinner,
	SelectControl,
	ToolbarDropdownMenu,
	TextControl,
} from '@wordpress/components';

import {
	applyFilters,
} from '@wordpress/hooks';

/**
 * Regular expression matching invalid anchor characters for replacement.
 *
 * @type {RegExp}
 */
const ANCHOR_REGEX = /[\s#]/g;

function BaseAdvancedHeading( props ) {

	const { attributes, className, isSelected, setAttributes, mergeBlocks, onReplace, clientId, context } = props;
	const {
		inQueryBlock,
		uniqueID,
		align,
		level,
		content,
		color,
		colorClass,
		textShadow,
		mobileAlign,
		tabletAlign,
		size,
		sizeType,
		lineType,
		lineHeight,
		tabLineHeight,
		tabSize,
		mobileSize,
		mobileLineHeight,
		letterSpacing,
		typography,
		fontVariant,
		fontWeight,
		fontStyle,
		fontSubset,
		googleFont,
		loadGoogleFont,
		marginType,
		topMargin,
		bottomMargin,
		markSize,
		markSizeType,
		markLineHeight,
		markLineType,
		markLetterSpacing,
		markTypography,
		markGoogleFont,
		markLoadGoogleFont,
		markFontSubset,
		markFontVariant,
		markFontWeight,
		markFontStyle,
		markPadding,
		markColor,
		markBG,
		markBGOpacity,
		markBorder,
		markBorderWidth,
		markBorderOpacity,
		markBorderStyle,
		anchor,
		textTransform,
		markTextTransform,
		baseAnimation,
		baseAOSOptions,
		htmlTag,
		leftMargin,
		rightMargin,
		tabletMargin,
		mobileMargin,
		margin,
		padding,
		tabletPadding,
		mobilePadding,
		paddingType,
		markMobilePadding,
		markTabPadding,
		loadItalic,
		baseDynamic,
		link,
		linkTarget,
		linkNoFollow,
		linkSponsored,
		background,
		backgroundColorClass,
		linkStyle,
		linkColor,
		linkHoverColor,
		fontSize,
		fontHeight,
		fontHeightType,
		letterSpacingType,
		tabletLetterSpacing,
		mobileLetterSpacing,
		markLetterSpacingType,
		markPaddingType,
		tabletMarkLetterSpacing,
		mobileMarkLetterSpacing,
		markBorderStyles,
		tabletMarkBorderStyles,
		mobileMarkBorderStyles,
		maxWidthType,
		maxWidth,
		beforeIcon,
		afterIcon,
		icon,
		iconColor,
		iconColorHover,
		iconSide,
		iconVerticalAlign,
		iconPadding,
		tabletIconPadding,
		mobileIconPadding,
		iconSize,
		iconSizeUnit,
		iconPaddingUnit,
		borderStyle,
		tabletBorderStyle,
		mobileBorderStyle,
		borderRadius,
		tabletBorderRadius,
		mobileBorderRadius,
		borderRadiusUnit,
	} = attributes;
	const [ activeTab, setActiveTab ] = useState( 'style' );
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

	const paddingMouseOver = mouseOverVisualizer();
	const marginMouseOver = mouseOverVisualizer();

	useEffect( () => {
		setBlockDefaults( 'base/advancedheading', attributes);

		let uniqueId = getUniqueId( uniqueID, clientId, isUniqueID, isUniqueBlock );
		if ( uniqueId !== uniqueID ) {
			attributes.uniqueID = uniqueId;
			setAttributes( { uniqueID: uniqueId } );
			addUniqueID( uniqueId, clientId );
		} else {
			addUniqueID( uniqueID, clientId );
		}

		setAttributes( { inQueryBlock: getInQueryBlock( context, inQueryBlock ) } );

		// Update Old Styles
		if ( ( '' !== topMargin || '' !== rightMargin || '' !== bottomMargin || '' !== leftMargin ) ) {
			setAttributes( { margin: [ topMargin, rightMargin, bottomMargin, leftMargin ], topMargin:'', rightMargin:'', bottomMargin:'', leftMargin:'' } );
		}
		// Update Old font Styles
		if ( ( size || tabSize || mobileSize ) ) {
			setAttributes( { fontSize: [ size, tabSize, mobileSize ], size:'', tabSize:'', mobileSize:'' } );
		}
		// Update Old Line height Styles
		if ( ( lineHeight || tabLineHeight || mobileLineHeight ) ) {
			setAttributes( { fontHeight: [ lineHeight, tabLineHeight, mobileLineHeight ], fontHeightType: lineType, lineHeight:'', tabLineHeight:'', mobileLineHeight:'' } );
		}

		// Update "regular" to Normal font weight
		if ( 'regular' === fontWeight ) {
			setAttributes( { fontWeight: 'normal' } );
		}

		// Update from old border settings.
		let tempBorderStyle = JSON.parse( JSON.stringify( attributes.markBorderStyles ? attributes.markBorderStyles : [{
			top: [ '', '', '' ],
			right: [ '', '', '' ],
			bottom: [ '', '', '' ],
			left: [ '', '', '' ],
			unit: 'px'
		  }] ) );
		let updateBorderStyle = false;
		if ( ( '' !== markBorder ) ) {
			tempBorderStyle[0].top[0] = BaseColorOutput( markBorder, markBorderOpacity );
			tempBorderStyle[0].right[0] = BaseColorOutput( markBorder, markBorderOpacity );
			tempBorderStyle[0].bottom[0] = BaseColorOutput( markBorder, markBorderOpacity );
			tempBorderStyle[0].left[0] = BaseColorOutput( markBorder, markBorderOpacity );
			updateBorderStyle = true;
			setAttributes( { markBorder: '' } );
		}
		if ( '' !== markBorderWidth && 0 !== markBorderWidth ) {
			tempBorderStyle[0].top[2] = markBorderWidth;
			tempBorderStyle[0].right[2] = markBorderWidth;
			tempBorderStyle[0].bottom[2] = markBorderWidth;
			tempBorderStyle[0].left[2] = markBorderWidth;
			updateBorderStyle = true;
			setAttributes( { markBorderWidth:0 } );
		}
		if ( '' !== markBorderStyle && 'solid' !== markBorderStyle ) {
			tempBorderStyle[0].top[1] = markBorderStyle;
			tempBorderStyle[0].right[1] = markBorderStyle;
			tempBorderStyle[0].bottom[1] = markBorderStyle;
			tempBorderStyle[0].left[1] = markBorderStyle;
			updateBorderStyle = true;
			setAttributes( { markBorderStyle:'solid' } );
		}
		if ( updateBorderStyle ) {
			setAttributes( { markBorderStyles: tempBorderStyle } );
			setAttributes( { tabletMarkBorderStyles: tempBorderStyle } );
			setAttributes( { mobileMarkBorderStyles: tempBorderStyle } );
		}
	}, [] );

	const saveShadow = ( value ) => {
		const newItems = textShadow.map( ( item, thisIndex ) => {
			if ( 0 === thisIndex ) {
				item = { ...item, ...value };
			}

			return item;
		} );
		setAttributes( {
			textShadow: newItems,
		} );
	};

	const renderTypography = typography && !typography.includes( ',' ) ? '\'' + typography + '\'' : typography;
	const markBGString = ( markBG ? BaseColorOutput( markBG, markBGOpacity ) : '' );
	const markBorderString = ( markBorder ? BaseColorOutput( markBorder, markBorderOpacity ) : '' );
	const textColorClass = getColorClassName( 'color', colorClass );
	const textBackgroundColorClass = getColorClassName( 'background-color', backgroundColorClass );
	const tagName = htmlTag && htmlTag !== 'heading' ? htmlTag : 'h' + level;
	const TagHTML = tagName;

	const previewMarginTop = getPreviewSize( previewDevice, ( undefined !== margin ? margin[ 0 ] : '' ), ( undefined !== tabletMargin ? tabletMargin[ 0 ] : '' ), ( undefined !== mobileMargin ? mobileMargin[ 0 ] : '' ) );
	const previewMarginRight = getPreviewSize( previewDevice, ( undefined !== margin ? margin[ 1 ] : '' ), ( undefined !== tabletMargin ? tabletMargin[ 1 ] : '' ), ( undefined !== mobileMargin ? mobileMargin[ 1 ] : '' ) );
	const previewMarginBottom = getPreviewSize( previewDevice, ( undefined !== margin ? margin[ 2 ] : '' ), ( undefined !== tabletMargin ? tabletMargin[ 2 ] : '' ), ( undefined !== mobileMargin ? mobileMargin[ 2 ] : '' ) );
	const previewMarginLeft = getPreviewSize( previewDevice, ( undefined !== margin ? margin[ 3 ] : '' ), ( undefined !== tabletMargin ? tabletMargin[ 3 ] : '' ), ( undefined !== mobileMargin ? mobileMargin[ 3 ] : '' ) );
	const previewPaddingTop = getPreviewSize( previewDevice, ( undefined !== padding ? padding[ 0 ] : '' ), ( undefined !== tabletPadding ? tabletPadding[ 0 ] : '' ), ( undefined !== mobilePadding ? mobilePadding[ 0 ] : '' ) );
	const previewPaddingRight = getPreviewSize( previewDevice, ( undefined !== padding ? padding[ 1 ] : '' ), ( undefined !== tabletPadding ? tabletPadding[ 1 ] : '' ), ( undefined !== mobilePadding ? mobilePadding[ 1 ] : '' ) );
	const previewPaddingBottom = getPreviewSize( previewDevice, ( undefined !== padding ? padding[ 2 ] : '' ), ( undefined !== tabletPadding ? tabletPadding[ 2 ] : '' ), ( undefined !== mobilePadding ? mobilePadding[ 2 ] : '' ) );
	const previewPaddingLeft = getPreviewSize( previewDevice, ( undefined !== padding ? padding[ 3 ] : '' ), ( undefined !== tabletPadding ? tabletPadding[ 3 ] : '' ), ( undefined !== mobilePadding ? mobilePadding[ 3 ] : '' ) );
	const previewFontSize = getPreviewSize( previewDevice, ( undefined !== fontSize?.[0] ? fontSize[0] : '' ), ( undefined !== fontSize?.[1] ? fontSize[1] : '' ), ( undefined !== fontSize?.[2] ? fontSize[2] : '' ) );
	const previewLineHeight = getPreviewSize( previewDevice, ( undefined !== fontHeight?.[0] ? fontHeight[0] : '' ), ( undefined !== fontHeight?.[1] ? fontHeight[1] : '' ), ( undefined !== fontHeight?.[2] ? fontHeight[2] : '' ) );

	const previewLetterSpacing = getPreviewSize( previewDevice, ( undefined !== letterSpacing ? letterSpacing : '' ), ( undefined !== tabletLetterSpacing ? tabletLetterSpacing : '' ), ( undefined !== mobileLetterSpacing ? mobileLetterSpacing : '' ) );

	const previewAlign = getPreviewSize( previewDevice, ( undefined !== align ? align : '' ), ( undefined !== tabletAlign ? tabletAlign : '' ), ( undefined !== mobileAlign ? mobileAlign : '' ) );
	let previewJustifyAlign = previewAlign;
	switch (previewAlign) {
		case 'left':
			previewJustifyAlign = 'flex-start';
			break;
		case 'right':
			previewJustifyAlign = 'flex-end';
			break;
	}
	const previewMarkPaddingTop = getPreviewSize( previewDevice, ( undefined !== markPadding ? markPadding[ 0 ] : 0 ), ( undefined !== markTabPadding ? markTabPadding[ 0 ] : '' ), ( undefined !== markMobilePadding ? markMobilePadding[ 0 ] : '' ) );
	const previewMarkPaddingRight = getPreviewSize( previewDevice, ( undefined !== markPadding ? markPadding[ 1 ] : 0 ), ( undefined !== markTabPadding ? markTabPadding[ 1 ] : '' ), ( undefined !== markMobilePadding ? markMobilePadding[ 1 ] : '' ) );
	const previewMarkPaddingBottom = getPreviewSize( previewDevice, ( undefined !== markPadding ? markPadding[ 2 ] : 0 ), ( undefined !== markTabPadding ? markTabPadding[ 2 ] : '' ), ( undefined !== markMobilePadding ? markMobilePadding[ 2 ] : '' ) );
	const previewMarkPaddingLeft = getPreviewSize( previewDevice, ( undefined !== markPadding ? markPadding[ 3 ] : 0 ), ( undefined !== markTabPadding ? markTabPadding[ 3 ] : '' ), ( undefined !== markMobilePadding ? markMobilePadding[ 3 ] : '' ) );
	const previewMarkSize = getPreviewSize( previewDevice, ( undefined !== markSize ? markSize[ 0 ] : '' ), ( undefined !== markSize ? markSize[ 1 ] : '' ), ( undefined !== markSize ? markSize[ 2 ] : '' ) );
	const previewMarkLineHeight = getPreviewSize( previewDevice, ( undefined !== markLineHeight ? markLineHeight[ 0 ] : '' ), ( undefined !== markLineHeight ? markLineHeight[ 1 ] : '' ), ( undefined !== markLineHeight ? markLineHeight[ 2 ] : '' ) );

	const previewIconSize = getPreviewSize( previewDevice, ( undefined !== iconSize?.[0] ? iconSize[0] : '' ), ( undefined !== iconSize?.[1] ? iconSize[1] : '' ), ( undefined !== iconSize?.[2] ? iconSize[2] : '' ) );
	const previewIconPaddingTop = getPreviewSize( previewDevice, ( undefined !== iconPadding?.[0] ? iconPadding[0] : '' ), ( undefined !== tabletIconPadding?.[0] ? tabletIconPadding[0] : '' ), ( undefined !== mobileIconPadding?.[0] ? mobileIconPadding[0] : '' ) );
	const previewIconPaddingRight = getPreviewSize( previewDevice, ( undefined !== iconPadding?.[1] ? iconPadding[1] : '' ), ( undefined !== tabletIconPadding?.[1] ? tabletIconPadding[1] : '' ), ( undefined !== mobileIconPadding?.[1] ? mobileIconPadding[1] : '' ) );
	const previewIconPaddingBottom = getPreviewSize( previewDevice, ( undefined !== iconPadding?.[2] ? iconPadding[2] : '' ), ( undefined !== tabletIconPadding?.[2] ? tabletIconPadding[2] : '' ), ( undefined !== mobileIconPadding?.[2] ? mobileIconPadding[2] : '' ) );
	const previewIconPaddingLeft = getPreviewSize( previewDevice, ( undefined !== iconPadding?.[ 3 ] ? iconPadding[ 3 ] : '' ), ( undefined !== tabletIconPadding?.[ 3 ] ? tabletIconPadding[ 3 ] : '' ), ( undefined !== mobileIconPadding?.[ 3 ] ? mobileIconPadding[ 3 ] : '' ) );

	const previewMarkLetterSpacing = getPreviewSize( previewDevice, ( undefined !== markLetterSpacing ? markLetterSpacing : '' ), ( undefined !== tabletMarkLetterSpacing ? tabletMarkLetterSpacing : '' ), ( undefined !== mobileMarkLetterSpacing ? mobileMarkLetterSpacing : '' ) );

	const previewMaxWidth = getPreviewSize( previewDevice, ( maxWidth && maxWidth[ 0 ] ? maxWidth[ 0 ] : '' ) , ( maxWidth && maxWidth[ 1 ] ? maxWidth[ 1 ] : '' ), ( maxWidth && maxWidth[ 2 ] ? maxWidth[ 2 ] : '' ) );

	const previewMarkBorderTopStyle = getBorderStyle( previewDevice, 'top', markBorderStyles, tabletMarkBorderStyles, mobileMarkBorderStyles );
	const previewMarkBorderRightStyle = getBorderStyle( previewDevice, 'right', markBorderStyles, tabletMarkBorderStyles, mobileMarkBorderStyles );
	const previewMarkBorderBottomStyle = getBorderStyle( previewDevice, 'bottom', markBorderStyles, tabletMarkBorderStyles, mobileMarkBorderStyles );
	const previewMarkBorderLeftStyle = getBorderStyle( previewDevice, 'left', markBorderStyles, tabletMarkBorderStyles, mobileMarkBorderStyles );

	const previewBorderTop = getBorderStyle( previewDevice, 'top', borderStyle, tabletBorderStyle, mobileBorderStyle );
	const previewBorderRight = getBorderStyle( previewDevice, 'right', borderStyle, tabletBorderStyle, mobileBorderStyle );
	const previewBorderBottom = getBorderStyle( previewDevice, 'bottom', borderStyle, tabletBorderStyle, mobileBorderStyle );
	const previewBorderLeft = getBorderStyle( previewDevice, 'left', borderStyle, tabletBorderStyle, mobileBorderStyle );
	// const previewBorderTopColor = getBorderColor( previewDevice, 'top', borderStyle, tabletBorderStyle, mobileBorderStyle );
	// const previewBorderRightColor = getBorderColor( previewDevice, 'right', borderStyle, tabletBorderStyle, mobileBorderStyle );
	// const previewBorderBottomColor = getBorderColor( previewDevice, 'bottom', borderStyle, tabletBorderStyle, mobileBorderStyle );
	// const previewBorderLeftColor = getBorderColor( previewDevice, 'left', borderStyle, tabletBorderStyle, mobileBorderStyle );

	const previewBorderRadiusTop = getPreviewSize( previewDevice, ( undefined !== borderRadius ? borderRadius[ 0 ] : '' ), ( undefined !== tabletBorderRadius ? tabletBorderRadius[ 0 ] : '' ), ( undefined !== mobileBorderRadius ? mobileBorderRadius[ 0 ] : '' ) );
	const previewBorderRadiusRight = getPreviewSize( previewDevice, ( undefined !== borderRadius ? borderRadius[ 1 ] : '' ), ( undefined !== tabletBorderRadius ? tabletBorderRadius[ 1 ] : '' ), ( undefined !== mobileBorderRadius ? mobileBorderRadius[ 1 ] : '' ) );
	const previewBorderRadiusBottom = getPreviewSize( previewDevice, ( undefined !== borderRadius ? borderRadius[ 2 ] : '' ), ( undefined !== tabletBorderRadius ? tabletBorderRadius[ 2 ] : '' ), ( undefined !== mobileBorderRadius ? mobileBorderRadius[ 2 ] : '' ) );
	const previewBorderRadiusLeft = getPreviewSize( previewDevice, ( undefined !== borderRadius ? borderRadius[ 3 ] : '' ), ( undefined !== tabletBorderRadius ? tabletBorderRadius[ 3 ] : '' ), ( undefined !== mobileBorderRadius ? mobileBorderRadius[ 3 ] : '' ) );
	let backgroundIgnoreClass = backgroundColorClass ? false : true;
	if ( ! backgroundIgnoreClass && ! base_blocks_params.isBaseT && background && background.startsWith( 'palette' ) ) {
		backgroundIgnoreClass = true;
	}
	const headingOptions = [
		[
			{
				icon    : <HeadingLevelIcon level={1} isPressed={( 1 === level && htmlTag && htmlTag === 'heading' ? true : false )}/>,
				title   : __( 'Heading 1', 'gutenam-blocks' ),
				isActive: ( 1 === level && htmlTag && htmlTag === 'heading' ? true : false ),
				onClick : () => setAttributes( { level: 1, htmlTag: 'heading' } ),
			},
		],
		[
			{
				icon    : <HeadingLevelIcon level={2} isPressed={( 2 === level && htmlTag && htmlTag === 'heading' ? true : false )}/>,
				title   : __( 'Heading 2', 'gutenam-blocks' ),
				isActive: ( 2 === level && htmlTag && htmlTag === 'heading' ? true : false ),
				onClick : () => setAttributes( { level: 2, htmlTag: 'heading' } ),
			},
		],
		[
			{
				icon    : <HeadingLevelIcon level={3} isPressed={( 3 === level && htmlTag && htmlTag === 'heading' ? true : false )}/>,
				title   : __( 'Heading 3', 'gutenam-blocks' ),
				isActive: ( 3 === level && htmlTag && htmlTag === 'heading' ? true : false ),
				onClick : () => setAttributes( { level: 3, htmlTag: 'heading' } ),
			},
		],
		[
			{
				icon    : <HeadingLevelIcon level={4} isPressed={( 4 === level && htmlTag && htmlTag === 'heading' ? true : false )}/>,
				title   : __( 'Heading 4', 'gutenam-blocks' ),
				isActive: ( 4 === level && htmlTag && htmlTag === 'heading' ? true : false ),
				onClick : () => setAttributes( { level: 4, htmlTag: 'heading' } ),
			},
		],
		[
			{
				icon    : <HeadingLevelIcon level={5} isPressed={( 5 === level && htmlTag && htmlTag === 'heading' ? true : false )}/>,
				title   : __( 'Heading 5', 'gutenam-blocks' ),
				isActive: ( 5 === level && htmlTag && htmlTag === 'heading' ? true : false ),
				onClick : () => setAttributes( { level: 5, htmlTag: 'heading' } ),
			},
		],
		[
			{
				icon    : <HeadingLevelIcon level={6} isPressed={( 6 === level && htmlTag && htmlTag === 'heading' ? true : false )}/>,
				title   : __( 'Heading 6', 'gutenam-blocks' ),
				isActive: ( 6 === level && htmlTag && htmlTag === 'heading' ? true : false ),
				onClick : () => setAttributes( { level: 6, htmlTag: 'heading' } ),
			},
		],
		[
			{
				icon    : <HeadingLevelIcon level={'p'} isPressed={( htmlTag && htmlTag === 'p' ? true : false )}/>,
				title   : __( 'Paragraph', 'gutenam-blocks' ),
				isActive: ( htmlTag && htmlTag === 'p' ? true : false ),
				onClick : () => setAttributes( { htmlTag: 'p' } ),
			},
		],
		[
			{
				icon    : <HeadingLevelIcon level={'span'} isPressed={( htmlTag && htmlTag === 'span' ? true : false )}/>,
				title   : __( 'Span', 'gutenam-blocks' ),
				isActive: ( htmlTag && htmlTag === 'span' ? true : false ),
				onClick : () => setAttributes( { htmlTag: 'span' } ),
			},
		],
		[
			{
				icon    : <HeadingLevelIcon level={'div'} isPressed={( htmlTag && htmlTag === 'div' ? true : false )}/>,
				title   : __( 'div', 'gutenam-blocks' ),
				isActive: ( htmlTag && htmlTag === 'div' ? true : false ),
				onClick : () => setAttributes( { htmlTag: 'div' } ),
			},
		],
	];

	const classes = classnames( {
		[ `bst-adv-heading${uniqueID}` ]: uniqueID,
		[ 'base-advancedheading-text' ]                  : true,
		'bsb-content-is-dynamic'        : undefined !== baseDynamic && undefined !== baseDynamic[ 'content' ] && undefined !== baseDynamic[ 'content' ].enable && baseDynamic[ 'content' ].enable,
		[ textColorClass ]             : textColorClass,
		'has-text-color'               : textColorClass,
		[ textBackgroundColorClass ]   : textBackgroundColorClass,
		'has-background'               : textBackgroundColorClass,
		[ `hls-${linkStyle}` ]         : !link && linkStyle,
		[ `bst-adv-heading-has-icon` ]  : icon,
	} );
	const renderIcon = () => {

		if( !icon ) {
			return null;
		}

		return (
			<IconRender className={`bsb-advanced-heading-svg-icon bsb-advanced-heading-svg-icon-${icon} bsb-advanced-heading-icon-side-${iconSide}`} name={icon} size={'1em'} style={{
				fontSize     : previewIconSize ? getFontSizeOptionOutput( previewIconSize, ( undefined !== iconSizeUnit ? iconSizeUnit : 'px' ) ) : undefined,
				color        : ( '' !== iconColor ? BaseColorOutput( iconColor ) : undefined ),
				paddingTop   : ( previewIconPaddingTop ? getSpacingOptionOutput( previewIconPaddingTop, iconPaddingUnit ) : undefined ),
				paddingRight : ( previewIconPaddingRight ? getSpacingOptionOutput( previewIconPaddingRight, iconPaddingUnit ) : undefined ),
				paddingBottom: ( previewIconPaddingBottom ? getSpacingOptionOutput( previewIconPaddingBottom, iconPaddingUnit ) : undefined ),
				paddingLeft  : ( previewIconPaddingLeft ? getSpacingOptionOutput( previewIconPaddingLeft, iconPaddingUnit ) : undefined ),
			}}/>
		);

	}
	const dynamicHeadingContent = (
			<TagHTML
				style={{
					display: icon ? 'flex' : undefined,
					alignItems: icon ? iconVerticalAlign : undefined,
					gap: icon ? '0.25em' : undefined,
					justifyContent: icon && previewJustifyAlign ? previewJustifyAlign : undefined,
					textAlign: previewAlign ? previewAlign : undefined,
					backgroundColor: background && backgroundIgnoreClass ? BaseColorOutput( background ) : undefined,
					color          : color ? BaseColorOutput( color ) : undefined,
					fontWeight     : fontWeight,
					fontStyle      : fontStyle,
					fontSize       : ( previewFontSize ? getFontSizeOptionOutput( previewFontSize, ( sizeType ? sizeType : 'px' ) ) : undefined ),
					lineHeight     : ( previewLineHeight ? previewLineHeight + ( fontHeightType ? fontHeightType : '' ) : undefined ),
					letterSpacing  : ( previewLetterSpacing ? previewLetterSpacing + ( letterSpacingType ? letterSpacingType : 'px' ) : undefined ),
					textTransform  : ( textTransform ? textTransform : undefined ),
					fontFamily     : ( typography ? renderTypography : '' ),
					paddingTop     : ( '' !== previewPaddingTop ? getSpacingOptionOutput( previewPaddingTop, paddingType ) : undefined ),
					paddingRight   : ( '' !== previewPaddingRight ? getSpacingOptionOutput( previewPaddingRight, paddingType ) : undefined ),
					paddingBottom  : ( '' !== previewPaddingBottom ? getSpacingOptionOutput( previewPaddingBottom, paddingType ) : undefined ),
					paddingLeft    : ( '' !== previewPaddingLeft ? getSpacingOptionOutput( previewPaddingLeft, paddingType ) : undefined ),
					marginTop      : ( '' !== previewMarginTop ? getSpacingOptionOutput( previewMarginTop, marginType ) : undefined ),
					marginRight    : ( '' !== previewMarginRight ? getSpacingOptionOutput( previewMarginRight, marginType ) : undefined ),
					marginBottom   : ( '' !== previewMarginBottom ? getSpacingOptionOutput( previewMarginBottom, marginType ) : undefined ),
					marginLeft     : ( '' !== previewMarginLeft ? getSpacingOptionOutput( previewMarginLeft, marginType ) : undefined ),
					textShadow     : ( undefined !== textShadow && undefined !== textShadow[ 0 ] && undefined !== textShadow[ 0 ].enable && textShadow[ 0 ].enable ? ( undefined !== textShadow[ 0 ].hOffset ? textShadow[ 0 ].hOffset : 1 ) + 'px ' + ( undefined !== textShadow[ 0 ].vOffset ? textShadow[ 0 ].vOffset : 1 ) + 'px ' + ( undefined !== textShadow[ 0 ].blur ? textShadow[ 0 ].blur : 1 ) + 'px ' + ( undefined !== textShadow[ 0 ].color ? BaseColorOutput( textShadow[ 0 ].color ) : 'rgba(0,0,0,0.2)' ) : undefined ),
				}}
				className={classes}
			>
					{iconSide === 'left' && renderIcon()}

					{applyFilters( 'base.dynamicContent', <Spinner/>, attributes, 'content' )}

					{iconSide === 'right' && renderIcon()}
		</TagHTML>
	);
	const headingContent = (
			<TagHTML
			className={classes}
			style={{
				display: icon ? 'flex' : undefined,
				alignItems: icon ? iconVerticalAlign : undefined,
				gap: icon ? '0.25em' : undefined,
				justifyContent: icon && previewJustifyAlign ? previewJustifyAlign : undefined,
				textAlign: previewAlign ? previewAlign : undefined,
				backgroundColor: background && backgroundIgnoreClass ? BaseColorOutput(background) : undefined,
				paddingTop: ('' !== previewPaddingTop ? getSpacingOptionOutput(previewPaddingTop, paddingType) : undefined),
				paddingRight: ('' !== previewPaddingRight ? getSpacingOptionOutput(previewPaddingRight, paddingType) : undefined),
				paddingBottom: ('' !== previewPaddingBottom ? getSpacingOptionOutput(previewPaddingBottom, paddingType) : undefined),
				paddingLeft: ('' !== previewPaddingLeft ? getSpacingOptionOutput(previewPaddingLeft, paddingType) : undefined),
				marginTop: ('' !== previewMarginTop ? getSpacingOptionOutput(previewMarginTop, marginType) : undefined),
				marginRight: ('' !== previewMarginRight ? getSpacingOptionOutput(previewMarginRight, marginType) : undefined),
				marginBottom: ('' !== previewMarginBottom ? getSpacingOptionOutput(previewMarginBottom, marginType) : undefined),
				marginLeft: ('' !== previewMarginLeft ? getSpacingOptionOutput(previewMarginLeft, marginType) : undefined),
				lineHeight: (previewLineHeight ? previewLineHeight + (fontHeightType ? fontHeightType : '') : undefined),
				color: color ? BaseColorOutput(color) : undefined,
				fontSize: (previewFontSize ? getFontSizeOptionOutput(previewFontSize, (sizeType ? sizeType : 'px')) : undefined),
				borderTopLeftRadius: previewBorderRadiusTop + borderRadiusUnit,
				borderTopRightRadius: previewBorderRadiusRight + borderRadiusUnit,
				borderBottomRightRadius: previewBorderRadiusBottom + borderRadiusUnit,
				borderBottomLeftRadius: previewBorderRadiusLeft + borderRadiusUnit,
				borderTop: ( previewBorderTop ? previewBorderTop : undefined ),
				borderRight: ( previewBorderRight ? previewBorderRight : undefined ),
				borderBottom: ( previewBorderBottom ? previewBorderBottom : undefined ),
				borderLeft: ( previewBorderLeft ? previewBorderLeft : undefined ),
			}}>
				{iconSide === 'left' && renderIcon()}

				<RichText
					id={ 'adv-heading' + uniqueID }
					tagName="span"
					className={'bsb-adv-heading-inner'}
					allowedFormats={(link ? applyFilters('base.whitelist_richtext_formats', ['core/bold', 'core/italic', 'base/insert-dynamic', 'base/mark', 'base/typed', 'core/strikethrough', 'core/superscript', 'core/superscript', 'toolset/inline-field'], 'base/advancedheading') : undefined)}
					value={content}
					onChange={(value) => setAttributes({content: value})}
					onMerge={mergeBlocks}
					onSplit={(value) => {
						if (!value) {
							return createBlock('core/paragraph');
						}
						return createBlock('base/advancedheading', {
							...attributes,
							content: value,
						});
					}}
					onReplace={onReplace}
					onRemove={() => onReplace([])}
					style={{
						fontWeight: fontWeight,
						fontStyle: fontStyle,
						letterSpacing: (previewLetterSpacing ? previewLetterSpacing + (letterSpacingType ? letterSpacingType : 'px') : undefined),
						textTransform: (textTransform ? textTransform : undefined),
						fontFamily: (typography ? renderTypography : ''),
						textShadow: (undefined !== textShadow && undefined !== textShadow[0] && undefined !== textShadow[0].enable && textShadow[0].enable ? (undefined !== textShadow[0].hOffset ? textShadow[0].hOffset : 1) + 'px ' + (undefined !== textShadow[0].vOffset ? textShadow[0].vOffset : 1) + 'px ' + (undefined !== textShadow[0].blur ? textShadow[0].blur : 1) + 'px ' + (undefined !== textShadow[0].color ? BaseColorOutput(textShadow[0].color) : 'rgba(0,0,0,0.2)') : undefined),
					}}
					placeholder={__('Write something…', 'gutenam-blocks')}
				/>

				{iconSide === 'right' && renderIcon()}

			</TagHTML>
	);

	const headingLinkContent = (
		<a
			href={link}
			className={`bsb-advanced-heading-link${( linkStyle ? ' hls-' + linkStyle : '' )}`}
			onClick={( event ) => {
				event.preventDefault();
			}}
		>
			{undefined !== baseDynamic && undefined !== baseDynamic[ 'content' ] && undefined !== baseDynamic[ 'content' ].enable && baseDynamic[ 'content' ].enable ? dynamicHeadingContent : headingContent}
		</a>
	);
	const wrapperClasses = classnames({
		'bsb-is-heading' : htmlTag && htmlTag === 'heading',
		'bsb-adv-text'   : true,
	});
	const nonTransAttrs = [ 'content' ];
	const blockProps = useBlockProps( {
		className: wrapperClasses,
	} );

	const typed = useRef(null);
	useEffect( () => {
		if ( !isSelected && undefined !== attributes.content && attributes.content.includes( "bst-typed-text" ) ) {
			const parser = new DOMParser();
			const contentHtml = parser.parseFromString( attributes.content, 'text/html' );

			if ( contentHtml.querySelectorAll( '.bst-typed-text' )[ 0 ] ) {
				let typedElement = contentHtml.querySelectorAll( '.bst-typed-text' )[ 0 ];
				let dataStrings = typedElement.getAttribute('data-strings');
				let strings = dataStrings ? JSON.parse( dataStrings ) : [];

				// Adding the default/existing string twice is required for displaying properly
				strings.unshift( typedElement.textContent );
				strings.unshift( typedElement.textContent );

				let options = {
					strings: strings,
					cursorChar: typedElement.getAttribute('data-cursor-char') ?? '_',
					startDelay: typedElement.getAttribute('data-start-delay') ? parseInt( typedElement.getAttribute('data-start-delay') ) : 0,
					backDelay: typedElement.getAttribute('data-back-delay') ? parseInt( typedElement.getAttribute('data-back-delay') ) : 700,
					typeSpeed: typedElement.getAttribute('data-type-speed') ? parseInt( typedElement.getAttribute('data-type-speed') ) : 40,
					backSpeed: typedElement.getAttribute('data-back-speed') ? parseInt( typedElement.getAttribute('data-back-speed') ) : 0,
					smartBackspace: typedElement.getAttribute( 'data-smart-backspace' ) === 'true',
					loop: typedElement.getAttribute( 'data-loop' ) !== 'false',
					loopCount: false,
					showCursor: typedElement.getAttribute( 'data-cursor-char' ) !== '',
					shuffle: typedElement.getAttribute( 'data-shuffle' ) === 'true',
				};

				const iFrameSelector = document.getElementsByName( 'editor-canvas' );
				const selector = iFrameSelector.length > 0 ? document.getElementsByName( 'editor-canvas' )[ 0 ].contentWindow.document : document;
				const typedElementHtml = selector.getElementById( 'adv-heading' + uniqueID ).querySelector( '.bst-typed-text' );

				typed.current = new Typed( typedElementHtml, options );
			}

			return function cleanup() {
				// Destroy the typed instance and reset richtext content
				typed.current.destroy();

				const iFrameSelector = document.getElementsByName( 'editor-canvas' );
				const selector = iFrameSelector.length > 0 ? document.getElementsByName( 'editor-canvas' )[ 0 ].contentWindow.document : document;
				if ( selector.getElementById( 'adv-heading' + uniqueID) ) {
					selector.getElementById( 'adv-heading' + uniqueID).innerHTML = attributes.content;
				}
			}
		}

	}, [ isSelected ] );

	return (
		<div {...blockProps}>
			<style>
				{`.bst-adv-heading${uniqueID} mark, .bst-adv-heading${uniqueID} .rich-text:focus mark[data-rich-text-format-boundary] {
						color: ${BaseColorOutput( markColor )};
						background: ${( markBG ? markBGString : 'transparent' )};
						font-weight: ${( markFontWeight ? markFontWeight : 'inherit' )};
						font-style: ${( markFontStyle ? markFontStyle : 'inherit' )};
						font-size: ${( previewMarkSize ? getFontSizeOptionOutput( previewMarkSize, markSizeType ) : 'inherit' )};
						line-height: ${( previewMarkLineHeight ? previewMarkLineHeight + markLineType : 'inherit' )};
						letter-spacing: ${( previewMarkLetterSpacing ? previewMarkLetterSpacing + ( markLetterSpacingType ? markLetterSpacingType : 'px' ) : 'inherit' )};
						text-transform: ${( markTextTransform ? markTextTransform : 'inherit' )};
						font-family: ${( markTypography ? markTypography : 'inherit' )};
						border-top: ${( previewMarkBorderTopStyle ? previewMarkBorderTopStyle : 'inherit' )};
						border-right: ${( previewMarkBorderRightStyle ? previewMarkBorderRightStyle : 'inherit' )};
						border-bottom: ${( previewMarkBorderBottomStyle ? previewMarkBorderBottomStyle : 'inherit' )};
						border-left: ${( previewMarkBorderLeftStyle ? previewMarkBorderLeftStyle : 'inherit' )};
						padding-top: ${( previewMarkPaddingTop ? getSpacingOptionOutput( previewMarkPaddingTop, markPaddingType ) : '0' )};
						padding-right: ${( previewMarkPaddingRight ? getSpacingOptionOutput( previewMarkPaddingRight, markPaddingType ) : '0' )};
						padding-bottom: ${( previewMarkPaddingBottom ? getSpacingOptionOutput( previewMarkPaddingBottom, markPaddingType ) : '0' )};
						padding-left: ${( previewMarkPaddingLeft ? getSpacingOptionOutput( previewMarkPaddingLeft, markPaddingType ) : '0' )};
					}`}
				{ ( previewMaxWidth ? `.editor-styles-wrapper .wp-block-base-advancedheading .bst-adv-heading${uniqueID } { max-width:${ previewMaxWidth + ( maxWidthType ? maxWidthType : 'px' ) } !important; }` : '' ) }
				{ ( previewMaxWidth && previewAlign === 'center' ? `.editor-styles-wrapper .wp-block-base-advancedheading .bst-adv-heading${uniqueID } { margin-left: auto; margin-right:auto; }` : '' ) }
				{ ( previewMaxWidth && previewAlign === 'right' ? `.editor-styles-wrapper .wp-block-base-advancedheading .bst-adv-heading${uniqueID } { margin-left: auto; margin-right:0; }` : '' ) }
				{linkColor && (
					`.bst-adv-heading${uniqueID} a, #block-${clientId} a.bsb-advanced-heading-link, #block-${clientId} a.bsb-advanced-heading-link > .base-advancedheading-text {
							color: ${BaseColorOutput( linkColor )} !important;
						}`
				)}
				{linkHoverColor && (
					`.bst-adv-heading${uniqueID} a:hover, #block-${clientId} a.bsb-advanced-heading-link:hover, #block-${clientId} a.bsb-advanced-heading-link:hover > .base-advancedheading-text {
							color: ${BaseColorOutput( linkHoverColor )}!important;
						}`
				)}
				{ iconColorHover && (
					`#block-${clientId} .base-advancedheading-text:hover > .bsb-advanced-heading-svg-icon {
							color: ${BaseColorOutput( iconColorHover )}!important;
						}`
				)}
			</style>
			<BlockControls>
				<ToolbarGroup group="tag">
					<ToolbarDropdownMenu
						icon={<HeadingLevelIcon level={( htmlTag !== 'heading' ? htmlTag : level )}/>}
						label={__( 'Change heading tag', 'gutenam-blocks' )}
						controls={headingOptions}
					/>
				</ToolbarGroup>
				{showSettings( 'allSettings', 'base/advancedheading' ) && showSettings( 'toolbarTypography', 'base/advancedheading', false ) && (
					<InlineTypographyControls
						uniqueID={uniqueID}
						fontGroup={'heading'}
						letterSpacing={letterSpacing}
						onLetterSpacing={( value ) => setAttributes( { letterSpacing: value } )}
						fontFamily={typography}
						onFontFamily={( value ) => setAttributes( { typography: value } )}
						onFontChange={( select ) => {
							setAttributes( {
								typography: select.value,
								googleFont: select.google,
							} );
						}}
						googleFont={googleFont}
						onGoogleFont={( value ) => setAttributes( { googleFont: value } )}
						loadGoogleFont={loadGoogleFont}
						onLoadGoogleFont={( value ) => setAttributes( { loadGoogleFont: value } )}
						fontVariant={fontVariant}
						onFontVariant={( value ) => setAttributes( { fontVariant: value } )}
						fontWeight={fontWeight}
						onFontWeight={( value ) => setAttributes( { fontWeight: value } )}
						fontStyle={fontStyle}
						onFontStyle={( value ) => setAttributes( { fontStyle: value } )}
						fontSubset={fontSubset}
						onFontSubset={( value ) => setAttributes( { fontSubset: value } )}
						textTransform={textTransform}
						onTextTransform={( value ) => setAttributes( { textTransform: value } )}
						fontSizeArray={false}
						fontSizeType={sizeType}
						onFontSizeType={( value ) => setAttributes( { sizeType: value } )}
						lineHeightType={fontHeightType}
						onLineHeightType={( value ) => setAttributes( { fontHeightType: value } )}
						fontSize={ ( undefined !== fontSize?.[0] ? fontSize[0] : '' ) }
						onFontSize={ value => setAttributes( { fontSize: [value,( undefined !== fontSize[1] ? fontSize[1] : '' ),( undefined !== fontSize[2] ? fontSize[2] : '' )] } )}
						tabSize={( undefined !== fontSize?.[1] ? fontSize[1] : '' )}
						onTabSize={( value ) => setAttributes( { fontSize: [( undefined !== fontSize[0] ? fontSize[0] : '' ),value,( undefined !== fontSize[2] ? fontSize[2] : '' )] } )}
						mobileSize={( undefined !== fontSize?.[2] ? fontSize[2] : '' )}
						onMobileSize={( value ) => setAttributes( { fontSize: [( undefined !== fontSize[0] ? fontSize[0] : '' ),( undefined !== fontSize[1] ? fontSize[1] : '' ),value] } )}
						lineHeight={( undefined !== fontHeight?.[0] ? fontHeight[0] : '' )}
						onLineHeight={value => setAttributes( { fontHeight: [value,( undefined !== fontHeight[1] ? fontHeight[1] : '' ),( undefined !== fontHeight[2] ? fontHeight[2] : '' )] } )}
						tabLineHeight={( undefined !== fontHeight?.[1] ? fontHeight[1] : '' )}
						onTabLineHeight={( value ) => setAttributes( { fontHeight: [( undefined !== fontHeight[0] ? fontHeight[0] : '' ),value,( undefined !== fontHeight[2] ? fontHeight[2] : '' )] } )}
						mobileLineHeight={( undefined !== fontHeight?.[2] ? fontHeight[2] : '' )}
						onMobileLineHeight={( value ) => setAttributes( { fontHeight: [( undefined !== fontHeight[0] ? fontHeight[0] : '' ),( undefined !== fontHeight[1] ? fontHeight[1] : '' ),value] } )}
					/>
				)}
				{showSettings( 'allSettings', 'base/advancedheading' ) && showSettings( 'toolbarColor', 'base/advancedheading', false ) && (
					<InlinePopColorControl
						label={__( 'Color', 'gutenam-blocks' )}
						value={( color ? color : '' )}
						default={''}
						onChange={( value ) => setAttributes( { color: value } )}
						onClassChange={value => setAttributes( { colorClass: value } )}
					/>
				)}
				<AlignmentToolbar
					value={align}
					onChange={( nextAlign ) => {
						setAttributes( { align: nextAlign } );
					}}
				/>
				<CopyPasteAttributes
					attributes={ attributes }
					excludedAttrs={ nonTransAttrs }
					defaultAttributes={ metadata['attributes'] }
					blockSlug={ metadata['name'] }
					onPaste={ attributesToPaste => setAttributes( attributesToPaste ) }
				/>
			</BlockControls>
			{showSettings( 'allSettings', 'base/advancedheading' ) && (
				<InspectorControls>

					<InspectorControlTabs
						panelName={'advancedheading'}
						initialOpen={ 'style' }
						setActiveTab={( value ) => setActiveTab( value )}
						activeTab={activeTab}
					/>

					{( activeTab === 'general' ) &&
						<>
							<BasePanelBody panelName={'bsb-adv-heading-general-settings'}>
								<TagSelect
									label={__( 'HTML Tag', 'gutenam-blocks' )}
									value={ 'heading' === htmlTag ? level : htmlTag }
									onChange={ (value) => {
										if ( 'div' === value || 'p' === value || 'span' === value ) {
											setAttributes( { level: 2, htmlTag: value } );
										} else {
											setAttributes( { level: value, htmlTag: 'heading' } );
										}
									} }
								/>
								<ResponsiveAlignControls
									label={__( 'Text Alignment', 'gutenam-blocks' )}
									value={( align ? align : '' )}
									mobileValue={( mobileAlign ? mobileAlign : '' )}
									tabletValue={( tabletAlign ? tabletAlign : '' )}
									onChange={( nextAlign ) => setAttributes( { align: nextAlign } )}
									onChangeTablet={( nextAlign ) => setAttributes( { tabletAlign: nextAlign } )}
									onChangeMobile={( nextAlign ) => setAttributes( { mobileAlign: nextAlign } )}
								/>
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
									max={( maxWidthType === 'px' ? 2000 : 100 )}
									step={1}
									unit={maxWidthType ? maxWidthType : 'px'}
									onUnit={( value ) => {
										setAttributes( { maxWidthType: value } );
									}}
									units={[ 'px', '%', 'vw' ]}
								/>
							</BasePanelBody>
							{showSettings( 'linkSettings', 'base/advancedheading' ) && (
								<BasePanelBody
									title={__( 'Link Settings', 'gutenam-blocks' )}
									initialOpen={false}
									panelName={'bsb-adv-heading-link-settings'}
								>
									<PopColorControl
										label={__( 'Link Color', 'gutenam-blocks' )}
										swatchLabel={__( 'Link Color', 'gutenam-blocks' )}
										value={( linkColor ? linkColor : '' )}
										default={''}
										onChange={value => setAttributes( { linkColor: value } )}
										swatchLabel2={__( 'Hover Color', 'gutenam-blocks' )}
										value2={( linkHoverColor ? linkHoverColor : '' )}
										default2={''}
										onChange2={value => setAttributes( { linkHoverColor: value } )}
									/>
									<SelectControl
										label={__( 'Link Style', 'gutenam-blocks' )}
										value={linkStyle}
										options={[
											{ value: '', label: __( 'Unset', 'gutenam-blocks' ) },
											{ value: 'none', label: __( 'None', 'gutenam-blocks' ) },
											{ value: 'underline', label: __( 'Underline', 'gutenam-blocks' ) },
											{ value: 'hover_underline', label: __( 'Underline on Hover', 'gutenam-blocks' ) },
										]}
										onChange={value => setAttributes( { linkStyle: value } )}
									/>
									<URLInputControl
										label={__( 'Text Wrap Link', 'gutenam-blocks' )}
										url={link}
										onChangeUrl={value => setAttributes( { link: value } )}
										additionalControls={true}
										opensInNewTab={( undefined !== linkTarget ? linkTarget : false )}
										onChangeTarget={value => setAttributes( { linkTarget: value } )}
										linkNoFollow={( undefined !== linkNoFollow ? linkNoFollow : false )}
										onChangeFollow={value => setAttributes( { linkNoFollow: value } )}
										linkSponsored={( undefined !== linkSponsored ? linkSponsored : false )}
										onChangeSponsored={value => setAttributes( { linkSponsored: value } )}
										dynamicAttribute={'link'}
										allowClear={true}
										{...props}
									/>
								</BasePanelBody>
							)}
						</>
					}

					{( activeTab === 'style' ) &&
						<>
							<BasePanelBody panelName={'bsb-adv-heading-style'}>
								{showSettings( 'colorSettings', 'base/advancedheading' ) && (
									<ColorGroup>
										<PopColorControl
											label={__( 'Color', 'gutenam-blocks' )}
											value={( color ? color : '' )}
											default={''}
											onChange={value => setAttributes( { color: value } )}
											onClassChange={value => setAttributes( { colorClass: value } )}
										/>
										<PopColorControl
											label={__( 'Background Color', 'gutenam-blocks' )}
											value={( background ? background : '' )}
											default={''}
											onChange={value => setAttributes( { background: value } )}
											onClassChange={value => setAttributes( { backgroundColorClass: value } )}
										/>
									</ColorGroup>
								)}
								{showSettings( 'sizeSettings', 'base/advancedheading' ) && (
									<>
										<ResponsiveFontSizeControl
											label={__( 'Font Size', 'gutenam-blocks' )}
											value={ ( undefined !== fontSize?.[0] ? fontSize[0] : '' ) }
											onChange={ value => setAttributes( { fontSize: [value,( undefined !== fontSize[1] ? fontSize[1] : '' ),( undefined !== fontSize[2] ? fontSize[2] : '' )] } )}
											tabletValue={( undefined !== fontSize?.[1] ? fontSize[1] : '' )}
											onChangeTablet={( value ) => setAttributes( { fontSize: [( undefined !== fontSize[0] ? fontSize[0] : '' ),value,( undefined !== fontSize[2] ? fontSize[2] : '' )] } )}
											mobileValue={( undefined !== fontSize?.[2] ? fontSize[2] : '' )}
											onChangeMobile={( value ) => setAttributes( { fontSize: [( undefined !== fontSize[0] ? fontSize[0] : '' ),( undefined !== fontSize[1] ? fontSize[1] : '' ),value] } )}
											min={0}
											max={( sizeType === 'px' ? 200 : 12 )}
											step={( sizeType === 'px' ? 1 : 0.1 )}
											unit={ sizeType ? sizeType : 'px' }
											onUnit={( value ) => {
												setAttributes( { sizeType: value } );
											}}
											units={[ 'px', 'em', 'rem', 'vw' ]}
										/>
										<TwoColumn className="bsb-font-settings">
											<ResponsiveUnitControl
												label={__( 'Line Height', 'gutenam-blocks' )}
												value={( undefined !== fontHeight?.[0] ? fontHeight[0] : '' )}
												onChange={value => setAttributes( { fontHeight: [value,( undefined !== fontHeight[1] ? fontHeight[1] : '' ),( undefined !== fontHeight[2] ? fontHeight[2] : '' )] } )}
												tabletValue={( undefined !== fontHeight?.[1] ? fontHeight[1] : '' )}
												onChangeTablet={( value ) => setAttributes( { fontHeight: [( undefined !== fontHeight[0] ? fontHeight[0] : '' ),value,( undefined !== fontHeight[2] ? fontHeight[2] : '' )] } )}
												mobileValue={( undefined !== fontHeight?.[2] ? fontHeight[2] : '' )}
												onChangeMobile={( value ) => setAttributes( { fontHeight: [( undefined !== fontHeight[0] ? fontHeight[0] : '' ),( undefined !== fontHeight[1] ? fontHeight[1] : '' ),value] } )}
												min={0}
												max={( fontHeightType === 'px' ? 200 : 12 )}
												step={( fontHeightType === 'px' ? 1 : 0.1 )}
												unit={ fontHeightType ? fontHeightType : '' }
												onUnit={( value ) => setAttributes( { fontHeightType: value } )}
												units={[ '-', 'px', 'em', 'rem' ]}
												compressedDevice={ true }
											/>
											<BaseRadioButtons
												label={__( 'Letter Case', 'gutenam-blocks' )}
												value={textTransform}
												className={ 'bsb-letter-case' }
												options={[
													{ value: 'none', label: __( '-', 'gutenam-blocks' ), tooltip: __( 'None', 'gutenam-blocks' ) },
													{ value: 'uppercase', label: __( 'AB', 'gutenam-blocks' ), tooltip: __( 'Uppercase', 'gutenam-blocks' ) },
													{ value: 'lowercase', label: __( 'ab', 'gutenam-blocks' ), tooltip: __( 'Lowercase', 'gutenam-blocks' ) },
													{ value: 'capitalize', label: __( 'Ab', 'gutenam-blocks' ), tooltip: __( 'Capitalize', 'gutenam-blocks' ) },
												]}
												allowClear={ true }
												onChange={value => setAttributes( { textTransform: value } )}
											/>
										</TwoColumn>
									</>
								)}
							</BasePanelBody>
							{showSettings( 'advancedSettings', 'base/advancedheading' ) && (
								<BasePanelBody
									title={__( 'Advanced Typography Settings', 'gutenam-blocks' )}
									initialOpen={false}
									panelName={'bsb-adv-heading-typography-settings'}
								>
									<TypographyControls
										fontGroup={'heading'}
										reLetterSpacing={[letterSpacing, tabletLetterSpacing, mobileLetterSpacing]}
										onLetterSpacing={( value ) => setAttributes( {  letterSpacing: value[0], tabletLetterSpacing: value[1], mobileLetterSpacing: value[2] } )}
										letterSpacingType={ letterSpacingType }
										onLetterSpacingType={( value ) => setAttributes( { letterSpacingType: value } )}
										fontFamily={typography}
										onFontFamily={( value ) => setAttributes( { typography: value } )}
										onFontChange={( select ) => {
											setAttributes( {
												typography: select.value,
												googleFont: select.google,
											} );
										}}
										googleFont={googleFont}
										onGoogleFont={( value ) => setAttributes( { googleFont: value } )}
										loadGoogleFont={loadGoogleFont}
										onLoadGoogleFont={( value ) => setAttributes( { loadGoogleFont: value } )}
										fontVariant={fontVariant}
										onFontVariant={( value ) => setAttributes( { fontVariant: value } )}
										fontWeight={fontWeight}
										onFontWeight={( value ) => setAttributes( { fontWeight: value } )}
										fontStyle={fontStyle}
										onFontStyle={( value ) => setAttributes( { fontStyle: value } )}
										fontSubset={fontSubset}
										onFontSubset={( value ) => setAttributes( { fontSubset: value } )}
										loadItalic={loadItalic}
										onLoadItalic={( value ) => setAttributes( { loadItalic: value } )}
									/>
								</BasePanelBody>
							)}
							<BasePanelBody
								title={__( 'Border Settings', 'gutenam-blocks' )}
								initialOpen={false}
								panelName={'bsb-adv-heading-border'}
							>
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
							</BasePanelBody>
							<BasePanelBody
								title={__( 'Text Shadow Settings', 'gutenam-blocks' )}
								initialOpen={false}
								panelName={'bsb-adv-heading-text-shadow'}
							>
								<TextShadowControl
									label={__( 'Text Shadow', 'gutenam-blocks' )}
									enable={( undefined !== textShadow && undefined !== textShadow[ 0 ] && undefined !== textShadow[ 0 ].enable ? textShadow[ 0 ].enable : false )}
									color={( undefined !== textShadow && undefined !== textShadow[ 0 ] && undefined !== textShadow[ 0 ].color ? textShadow[ 0 ].color : 'rgba(0, 0, 0, 0.2)' )}
									colorDefault={'rgba(0, 0, 0, 0.2)'}
									hOffset={( undefined !== textShadow && undefined !== textShadow[ 0 ] && undefined !== textShadow[ 0 ].hOffset ? textShadow[ 0 ].hOffset : 1 )}
									vOffset={( undefined !== textShadow && undefined !== textShadow[ 0 ] && undefined !== textShadow[ 0 ].vOffset ? textShadow[ 0 ].vOffset : 1 )}
									blur={( undefined !== textShadow && undefined !== textShadow[ 0 ] && undefined !== textShadow[ 0 ].blur ? textShadow[ 0 ].blur : 1 )}
									onEnableChange={value => {
										saveShadow( { enable: value } );
									}}
									onColorChange={value => {
										saveShadow( { color: value } );
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
								/>
							</BasePanelBody>
							{showSettings( 'iconSettings', 'base/advancedheading' ) && (
								<BasePanelBody
									title={__( 'Icon Settings', 'gutenam-blocks' ) }
									initialOpen={false}
									panelName={'bsb-adv-heading-icon'}
								>
									<div className="bst-select-icon-container">
										<BaseIconPicker
											value={icon}
											onChange={value => {
												setAttributes( { icon: value } );
											}}
											allowClear={ true }
										/>
									</div>
									<SelectControl
										label={__( 'Icon Location', 'gutenam-blocks' )}
										value={iconSide}
										options={[
											{ value: 'left', label: __( 'Left' ) },
											{ value: 'right', label: __( 'Right' ) },
										]}
										onChange={value => {
											setAttributes( { iconSide: value } );
										}}
									/>
									<SelectControl
										label={__( 'Vertical Alignment', 'gutenam-blocks' )}
										value={iconVerticalAlign}
										options={[
											{ value: 'unset', label: __( 'Unset' ) },
											{ value: 'baseline', label: __( 'Baseline' ) },
											{ value: 'center', label: __( 'Center' ) },
											{ value: 'end', label: __( 'End' ) },
											{ value: 'start', label: __( 'Start' ) },
										]}
										onChange={value => {
											setAttributes( { iconVerticalAlign: value } );
										}}
									/>
									<ResponsiveRangeControls
										label={__( 'Icon Size', 'gutenam-blocks' )}
										value={( undefined !== iconSize?.[0] ? iconSize[0] : '' )}
										onChange={value => {
											setAttributes( { iconSize: [ value, ( undefined !==iconSize[1] ? iconSize[1] : '' ), ( undefined !== iconSize?.[2] && iconSize[2] ?iconSize[2] : '' ) ] } );
										}}
										tabletValue={( undefined !== iconSize?.[1] ? iconSize[1] : '' )}
										onChangeTablet={( value ) => {
											setAttributes( { iconSize: [ ( undefined !== iconSize?.[0] ? iconSize[0] : '' ), value, ( undefined !== iconSize?.[2] ? iconSize[2] : '' ) ] } );
										}}
										mobileValue={( undefined !== iconSize?.[2] ? iconSize[2] : '' )}
										onChangeMobile={( value ) => {
											setAttributes( { iconSize: [ ( undefined !== iconSize?.[0] ? iconSize[0] : '' ), ( undefined !== iconSize?.[1] ? iconSize[1] : '' ), value ] } );
										}}
										min={0}
										max={( ( iconSizeUnit ? iconSizeUnit : 'px' ) !== 'px' ? 12 : 200 )}
										step={( ( iconSizeUnit ? iconSizeUnit : 'px' ) !== 'px' ? 0.1 : 1 )}
										unit={ iconSizeUnit ? iconSizeUnit : 'px'}
										onUnit={( value ) => {
											setAttributes( { iconSizeUnit: value });
										}}
										units={[ 'px', 'em', 'rem' ]}
									/>
									<PopColorControl
										label={__( 'Icon Color', 'gutenam-blocks' )}
										value={(iconColor ? iconColor : '' )}
										default={''}
										onChange={value => {
											setAttributes( { iconColor: value });
										}}
										swatchLabel2={__( 'Hover Color', 'gutenam-blocks' )}
										value2={(iconColorHover ?iconColorHover : '' )}
										default2={''}
										onChange2={value => {
											setAttributes( { iconColorHover: value });
										}}
									/>
									<ResponsiveMeasureRangeControl
										label={__( 'Icon Padding', 'gutenam-blocks' )}
										value={undefined !== iconPadding ? iconPadding : [ '', '', '', '' ]}
										tabletValue={undefined !== tabletIconPadding ? tabletIconPadding : [ '', '', '', '' ]}
										mobileValue={undefined !== mobileIconPadding ? mobileIconPadding : [ '', '', '', '' ]}
										onChange={( value ) => setAttributes( { iconPadding: value } )}
										onChangeTablet={( value ) => setAttributes( { tabletIconPadding: value } )}
										onChangeMobile={( value ) => setAttributes( { mobileIconPadding: value } )}
										min={( iconPaddingUnit === 'em' || iconPaddingUnit === 'rem' ? -2 : -200 )}
										max={( iconPaddingUnit === 'em' || iconPaddingUnit === 'rem' ? 12 : 200 )}
										step={( iconPaddingUnit === 'em' || iconPaddingUnit === 'rem' ? 0.1 : 1 )}
										unit={iconPaddingUnit}
										units={[ 'px', 'em', 'rem' ]}
										onUnit={( value ) => setAttributes( { iconPaddingUnit: value } )}
									/>
								</BasePanelBody>
							)}
							{showSettings( 'highlightSettings', 'base/advancedheading' ) && (
								<BasePanelBody
									title={__( 'Highlight Settings', 'gutenam-blocks' )}
									initialOpen={false}
									panelName={'bsb-adv-heading-highlight-settings'}
								>
									<PopColorControl
										label={__( 'Color', 'gutenam-blocks' )}
										value={( markColor ? markColor : '' )}
										default={''}
										onChange={value => setAttributes( { markColor: value } )}
									/>
									<PopColorControl
										label={__( 'Background', 'gutenam-blocks' )}
										value={( markBG ? markBG : '' )}
										default={''}
										onChange={value => setAttributes( { markBG: value } )}
										opacityValue={markBGOpacity}
										onOpacityChange={value => setAttributes( { markBGOpacity: value } )}
										onArrayChange={( color, opacity ) => setAttributes( { markBG: color, markBGOpacity: opacity } )}
									/>
									<ResponsiveBorderControl
										label={__( 'Border', 'gutenam-blocks' )}
										value={markBorderStyles}
										tabletValue={tabletMarkBorderStyles}
										mobileValue={mobileMarkBorderStyles}
										onChange={( value ) => setAttributes( { markBorderStyles: value } )}
										onChangeTablet={( value ) => setAttributes( { tabletMarkBorderStyles: value } )}
										onChangeMobile={( value ) => setAttributes( { mobileMarkBorderStyles: value } )}
									/>
									<TypographyControls
										fontGroup={'mark-heading'}
										fontSize={markSize}
										onFontSize={( value ) => setAttributes( { markSize: value } )}
										fontSizeType={markSizeType}
										onFontSizeType={( value ) => setAttributes( { markSizeType: value } )}
										lineHeight={markLineHeight}
										onLineHeight={( value ) => setAttributes( { markLineHeight: value } )}
										lineHeightType={markLineType}
										onLineHeightType={( value ) => setAttributes( { markLineType: value } )}
										reLetterSpacing={[markLetterSpacing, tabletMarkLetterSpacing, mobileMarkLetterSpacing]}
										onLetterSpacing={( value ) => setAttributes( {  markLetterSpacing: value[0], tabletMarkLetterSpacing: value[1], mobileMarkLetterSpacing: value[2] } )}
										letterSpacingType={ markLetterSpacingType }
										onLetterSpacingType={( value ) => setAttributes( { markLetterSpacingType: value } )}
										fontFamily={markTypography}
										onFontFamily={( value ) => setAttributes( { markTypography: value } )}
										onFontChange={( select ) => {
											setAttributes( {
												markTypography: select.value,
												markGoogleFont: select.google,
											} );
										}}
										googleFont={markGoogleFont}
										onGoogleFont={( value ) => setAttributes( { markGoogleFont: value } )}
										loadGoogleFont={markLoadGoogleFont}
										onLoadGoogleFont={( value ) => setAttributes( { markLoadGoogleFont: value } )}
										fontVariant={markFontVariant}
										onFontVariant={( value ) => setAttributes( { markFontVariant: value } )}
										fontWeight={markFontWeight}
										onFontWeight={( value ) => setAttributes( { markFontWeight: value } )}
										fontStyle={markFontStyle}
										onFontStyle={( value ) => setAttributes( { markFontStyle: value } )}
										fontSubset={markFontSubset}
										onFontSubset={( value ) => setAttributes( { markFontSubset: value } )}
										textTransform={markTextTransform}
										onTextTransform={( value ) => setAttributes( { markTextTransform: value } )}
									/>
									<ResponsiveMeasureRangeControl
										label={__('Padding', 'gutenam-blocks')}
										value={markPadding}
										tabletValue={markTabPadding}
										mobileValue={markMobilePadding}
										onChange={( value ) => setAttributes( { markPadding: value } )}
										onChangeTablet={( value ) => setAttributes( { markTabPadding: value } )}
										onChangeMobile={( value ) => setAttributes( { markMobilePadding: value } )}
										min={0}
										max={( markPaddingType === 'em' || markPaddingType === 'rem' ? 12 : 200 )}
										step={( markPaddingType === 'em' || markPaddingType === 'rem' ? 0.1 : 1 )}
										unit={markPaddingType}
										units={['px', 'em', 'rem', '%']}
										onUnit={(value) => setAttributes({markPaddingType: value})}
									/>
								</BasePanelBody>
							)}
						</>
					}

					{( activeTab === 'advanced' ) && (
						<>
							{showSettings('marginSettings', 'base/advancedheading') && (
								<>
									<BasePanelBody panelName={'bsb-row-padding'}>
										<ResponsiveMeasureRangeControl
											label={__('Padding', 'gutenam-blocks')}
											value={padding}
											tabletValue={tabletPadding}
											mobileValue={mobilePadding}
											onChange={(value) => setAttributes({padding: value})}
											onChangeTablet={(value) => setAttributes({tabletPadding: value})}
											onChangeMobile={(value) => setAttributes({mobilePadding: value})}
											min={0}
											max={( paddingType === 'em' || paddingType === 'rem' ? 12 : 200 )}
											step={( paddingType === 'em' || paddingType === 'rem' ? 0.1 : 1 )}
											unit={paddingType}
											units={['px', 'em', 'rem', '%']}
											onUnit={(value) => setAttributes({paddingType: value})}
											onMouseOver={paddingMouseOver.onMouseOver}
											onMouseOut={paddingMouseOver.onMouseOut}
										/>
										<ResponsiveMeasureRangeControl
											label={__('Margin', 'gutenam-blocks')}
											value={margin}
											tabletValue={tabletMargin}
											mobileValue={mobileMargin}
											onChange={(value) => {
												setAttributes({margin: value})
											}}
											onChangeTablet={(value) => setAttributes({tabletMargin: value})}
											onChangeMobile={(value) => setAttributes({mobileMargin: value})}
											min={( marginType === 'em' || marginType === 'rem' ? -25 : -400 )}
											max={( marginType === 'em' || marginType === 'rem' ? 25 : 400 )}
											step={( marginType === 'em' || marginType === 'rem' ? 0.1 : 1 )}
											unit={marginType}
											units={['px', 'em', 'rem', '%', 'vh']}
											onUnit={(value) => setAttributes({marginType: value})}
											onMouseOver={marginMouseOver.onMouseOver}
											onMouseOut={marginMouseOver.onMouseOut}
										/>
									</BasePanelBody>

									<div className="bst-sidebar-settings-spacer"></div>
								</>
							)}

							<BaseBlockDefaults attributes={attributes} defaultAttributes={metadata['attributes']} blockSlug={ metadata['name'] } excludedAttrs={ nonTransAttrs }  />

						</>

					)}

						</InspectorControls>
			)}
			<InspectorAdvancedControls>
				<TextControl
					label={__( 'HTML Anchor', 'gutenam-blocks' )}
					help={__( 'Anchors lets you link directly to a section on a page.', 'gutenam-blocks' )}
					value={anchor || ''}
					onChange={( nextValue ) => {
						nextValue = nextValue.replace( ANCHOR_REGEX, '-' );
						setAttributes( {
							anchor: nextValue,
						} );
					}}/>
			</InspectorAdvancedControls>
			{baseAnimation && (
				<div className={`bst-animation-wrap-${baseAnimation}`}>
					<div id={`animate-id${uniqueID}`} className={'aos-animate bst-animation-wrap'} data-aos={( baseAnimation ? baseAnimation : undefined )}
						 data-aos-duration={( baseAOSOptions && baseAOSOptions[ 0 ] && baseAOSOptions[ 0 ].duration ? baseAOSOptions[ 0 ].duration : undefined )}
						 data-aos-easing={( baseAOSOptions && baseAOSOptions[ 0 ] && baseAOSOptions[ 0 ].easing ? baseAOSOptions[ 0 ].easing : undefined )}
					>
						{link ? headingLinkContent : headingContent}
					</div>
				</div>
			)}
			{!baseAnimation && (
				link ? headingLinkContent : headingContent
			)}
			{ googleFont && typography && (
				<BaseWebfontLoader typography={ [{family: typography, variant: ( fontVariant ? fontVariant : '' ) }] } clientId={ clientId } id={ 'advancedHeading' } />
			) }
			{ markGoogleFont && markTypography && (
				<BaseWebfontLoader typography={ [{family: markTypography, variant: ( markFontVariant ? markFontVariant : '' ) }] } clientId={ clientId } id={ 'advancedHeadingMark' } />
			) }

			<SpacingVisualizer
				type="outsideVertical"
				forceShow={ marginMouseOver.isMouseOver }
				spacing={ [ getSpacingOptionOutput( previewMarginTop, marginType ), getSpacingOptionOutput( previewMarginRight, marginType ), getSpacingOptionOutput( previewMarginBottom, marginType ), getSpacingOptionOutput( previewMarginLeft, marginType ) ] }
			/>
			<SpacingVisualizer
				style={ {
					marginLeft: ( undefined !== previewMarginLeft ? getSpacingOptionOutput( previewMarginLeft, marginType ) : undefined ),
					marginRight: ( undefined !== previewMarginRight ? getSpacingOptionOutput( previewMarginRight, marginType ) : undefined ),
					marginTop: ( undefined !== previewMarginTop ? getSpacingOptionOutput( previewMarginTop, marginType ) : undefined ),
					marginBottom: ( undefined !== previewMarginBottom ? getSpacingOptionOutput( previewMarginBottom, marginType ) : undefined ),
				} }
				type="inside"
				forceShow={ paddingMouseOver.isMouseOver }
				spacing={ [ getSpacingOptionOutput( previewPaddingTop, paddingType ), getSpacingOptionOutput( previewPaddingRight, paddingType ), getSpacingOptionOutput( previewPaddingBottom, paddingType ), getSpacingOptionOutput( previewPaddingLeft, paddingType ) ] }
			/>
		</div>
	);

}

export default BaseAdvancedHeading;
