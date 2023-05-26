/**
 * BLOCK: Base Advanced Btn Single.
 *
 * Editor for Advanced Btn
 */
import {
	BaseColorOutput,
	getPreviewSize,
	showSettings,
	getSpacingOptionOutput,
	mouseOverVisualizer,
	getFontSizeOptionOutput,
	typographyStyle,
	getBorderStyle,
	setBlockDefaults,
	getBorderColor,
	getUniqueId,
	getInQueryBlock,
} from '@base/helpers';

import {
	PopColorControl,
	TypographyControls,
	ResponsiveMeasurementControls,
	SmallResponsiveControl,
	ResponsiveRangeControls,
	IconRender,
	HoverToggleControl,
	ResponsiveBorderControl,
	BaseIconPicker,
	BasePanelBody,
	URLInputControl,
	BaseWebfontLoader,
	BackgroundTypeControl,
	BaseRadioButtons,
	URLInputInline,
	ResponsiveAlignControls,
	GradientControl,
	BoxShadowControl,
	DynamicTextControl,
	InspectorControlTabs,
	BaseBlockDefaults,
	ResponsiveMeasureRangeControl,
	SpacingVisualizer,
	CopyPasteAttributes,
} from '@base/components';
import classnames from 'classnames';
import { times, filter, map, uniqueId } from 'lodash';

const defaultBtns = {
	text: '',
	link: '',
	target: '_self',
	color: '',
	background: '',
	borderRadius: ['', '', '', ''],
	colorHover: '',
	backgroundHover: '',
	icon: '',
	iconSide: 'right',
	iconHover: false,
	noFollow: false,
	sponsored: false,
	download: false,
	gradient: '',
	gradientHover: '',
	btnStyle: 'basic',
	sizePreset: 'standard',
	backgroundType: 'solid',
	backgroundHoverType: 'solid',
	width: [ '', '', '' ],
	widthType:'auto',
	borderStyle:[ {
		top: [ '', '', '' ],
		right: [ '', '', '' ],
		bottom: [ '', '', '' ],
		left: [ '', '', '' ],
		unit: 'px'
	} ],
	borderHoverStyle:[ {
		top: [ '', '', '' ],
		right: [ '', '', '' ],
		bottom: [ '', '', '' ],
		left: [ '', '', '' ],
		unit: 'px'
	} ],
	displayShadow: false,
	displayHoverShadow: false,
	shadow: [ {
		color: '#000000',
		opacity: 0.2,
		spread: 0,
		blur: 2,
		hOffset: 1,
		vOffset: 1,
		inset: false
	} ],
	shadowHover: [ {
		color: '#000000',
		opacity: 0.4,
		spread: 0,
		blur: 3,
		hOffset: 2,
		vOffset: 2,
		inset: false
	} ],
	typography: {
		type: 'array',
		default: [ {
			'size': [ '', '', '' ],
			'sizeType': 'px',
			'lineHeight': [ '', '', '' ],
			'lineType': 'px',
			'letterSpacing': [ '', '', '' ],
			'letterType': 'px',
			'family': '',
			'google': false,
			'style': '',
			'weight': '',
			'variant': '',
			'subset': '',
			'loadGoogle': true,
			'textTransform': ''
		} ]
	},
	inheritStyles: '',
	iconSize: [ '', '', '' ],
	iconPadding: [ '', '', '', '' ],
	iconTabletPadding: [ '', '', '', '' ],
	iconMobilePadding: [ '', '', '', '' ],
	iconPaddingUnit: 'px',
	onlyIcon: [ false, '', '' ],
	iconColor: '',
	iconColorHover: '',
	iconSizeUnit: 'px',
	label: '',
	marginUnit: 'px',
	margin: [ '', '', '', '' ],
	tabletMargin: [ '', '', '', '' ],
	mobileMargin: [ '', '', '', '' ],
	paddingUnit: 'px',
	padding: [ '', '', '', '' ],
	tabletPadding: [ '', '', '', '' ],
	mobilePadding: [ '', '', '', '' ],
	borderStyle: [{}],
};

import metadata from './block.json';
/**
 * Internal block libraries
 */
import { __ } from '@wordpress/i18n';
import { useDispatch, useSelect } from '@wordpress/data';

import {
	cog,
	pages,
	chevronRight,
	chevronLeft,
	plus,
	close,
	code,
	link as linkIcon,
} from '@wordpress/icons';
import { displayShortcut, isKeyboardEvent } from '@wordpress/keycodes';
import {
	Fragment,
	useEffect,
	useState,
} from '@wordpress/element';
import {
	RichText,
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
	InspectorAdvancedControls,
	JustifyContentControl,
	BlockVerticalAlignmentControl,
	useBlockProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import {
	Dashicon,
	TabPanel,
	Button,
	PanelRow,
	RangeControl,
	TextControl,
	ToolbarGroup,
	ButtonGroup,
	SelectControl,
	ToggleControl,
	DropdownMenu,
	MenuGroup,
	MenuItem,
	ToolbarButton,
	Icon,
} from '@wordpress/components';
import {
	applyFilters,
} from '@wordpress/hooks';


export default function BaseButtonEdit( { attributes, setAttributes, className, isSelected, context, clientId, name } ) {
	const {
		uniqueID,
		text,
		link,
		target,
		sponsored,
		download,
		noFollow,
		sizePreset,
		padding,
		tabletPadding,
		mobilePadding,
		paddingUnit,
		color,
		background,
		backgroundType,
		gradient,
		colorHover,
		backgroundHover,
		backgroundHoverType,
		gradientHover,
		borderStyle,
		tabletBorderStyle,
		mobileBorderStyle,
		borderHoverStyle,
		tabletBorderHoverStyle,
		mobileBorderHoverStyle,
		typography,
		borderRadius,
		tabletBorderRadius,
		mobileBorderRadius,
		borderRadiusUnit,
		borderHoverRadius,
		tabletBorderHoverRadius,
		mobileBorderHoverRadius,
		borderHoverRadiusUnit,
		icon,
		iconSide,
		iconHover,
		width,
		widthUnit,
		widthType,
		displayShadow,
		shadow,
		displayHoverShadow,
		shadowHover,
		inheritStyles,
		iconSize,
		iconPadding,
		tabletIconPadding,
		mobileIconPadding,
		iconPaddingUnit,
		onlyIcon,
		iconColor,
		iconColorHover,
		label,
		marginUnit,
		margin,
		iconSizeUnit,
		tabletMargin,
		mobileMargin,
		baseAOSOptions,
		baseAnimation,
		hideLink,
		inQueryBlock,
	} = attributes;
	const { updateBlockAttributes } = useDispatch( blockEditorStore );
	const { btnsBlock, rootID } = useSelect(
		( select ) => {
			const { getBlockRootClientId, getBlocksByClientId } = select( blockEditorStore );
			const rootID = getBlockRootClientId( clientId );
			const btnsBlock = getBlocksByClientId( rootID );
			return {
				btnsBlock: ( undefined !== btnsBlock ? btnsBlock : '' ),
				rootID: ( undefined !== rootID ? rootID : '' ),
			};
		},
		[ clientId ]
	);
	const updateParentBlock = ( key, value ) => {
		updateBlockAttributes( rootID, { [key]: value } );
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
	const marginMouseOver = mouseOverVisualizer();
	const paddingMouseOver = mouseOverVisualizer();
	useEffect( () => {
		setBlockDefaults( 'base/singlebtn', attributes);

		let uniqueId = getUniqueId( uniqueID, clientId, isUniqueID, isUniqueBlock );
		if ( uniqueId !== uniqueID ) {
			attributes.uniqueID = uniqueId;
			setAttributes( { uniqueID: uniqueId } );
			addUniqueID( uniqueId, clientId );
		} else {
			addUniqueID( uniqueID, clientId );
		}

		setAttributes( { inQueryBlock: getInQueryBlock( context, inQueryBlock ) } );
	}, [] );
	const [ activeTab, setActiveTab ] = useState( 'general' );
	const [ isEditingURL, setIsEditingURL ] = useState( false );
	useEffect( () => {
		if ( ! isSelected ) {
			setIsEditingURL( false );
		}
	}, [ isSelected ] );
	function startEditing( event ) {
		event.preventDefault();
		setIsEditingURL( true );
	}
	const saveTypography = ( value ) => {
		const newUpdate = typography.map( ( item, index ) => {
			if ( 0 === index ) {
				item = { ...item, ...value };
			}
			return item;
		} );
		setAttributes( {
			typography: newUpdate,
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
	const btnSizes = [
		{ value: 'small', label: __( 'SM' , 'gutenam-blocks') },
		{ value: 'standard', label: __( 'MD', 'gutenam-blocks' ) },
		{ value: 'large', label: __( 'LG', 'gutenam-blocks' ) },
		{ value: 'xlarge', label: __( 'XL', 'gutenam-blocks' ) },
	];
	const btnWidths = [
		{ value: 'auto', label: __( 'Auto', 'gutenam-blocks' ) },
		{ value: 'fixed', label: __( 'Fixed', 'gutenam-blocks' ) },
		{ value: 'full', label: __( 'Full', 'gutenam-blocks' ) },
	];
	const defineWidthType = ( type ) => {
		if ( 'full' === type ) {
			//updateParentBlock( 'forceFullwidth', true );
			setAttributes( { widthType: type } );
		} else {
			//updateParentBlock( 'forceFullwidth', false );
			setAttributes( { widthType: type } );
		}
	};
	const buttonStyleOptions = [
		{ value: 'fill', label: __( 'Fill', 'gutenam-blocks' ) },
		{ value: 'outline', label: __( 'Outline', 'gutenam-blocks' ) },
		{ value: 'inherit', label: __( 'Theme', 'gutenam-blocks' ) },
	];

	const previewMarginTop = getPreviewSize( previewDevice, ( undefined !== margin?.[0] ? margin[0] : '' ), ( undefined !== tabletMargin?.[0] ? tabletMargin[0] : '' ), ( undefined !== mobileMargin?.[0] ? mobileMargin[0] : '' ) );
	const previewMarginRight = getPreviewSize( previewDevice, ( undefined !== margin?.[1] ? margin[1] : '' ), ( undefined !== tabletMargin?.[1] ? tabletMargin[1] : '' ), ( undefined !== mobileMargin?.[1] ? mobileMargin[1] : '' ) );
	const previewMarginBottom = getPreviewSize( previewDevice, ( undefined !== margin?.[2] ? margin[2] : '' ), ( undefined !== tabletMargin?.[2] ? tabletMargin[2] : '' ), ( undefined !== mobileMargin?.[2] ? mobileMargin[2] : '' ) );
	const previewMarginLeft = getPreviewSize( previewDevice, ( undefined !== margin?.[3] ? margin[3] : '' ), ( undefined !== tabletMargin?.[3] ? tabletMargin[3] : '' ), ( undefined !== mobileMargin?.[3] ? mobileMargin[3] : '' ) );
	const previewMarginUnit = ( marginUnit ? marginUnit : 'px' );

	const previewPaddingTop = getPreviewSize( previewDevice, ( undefined !== padding?.[0] ? padding[0] : '' ), ( undefined !== tabletPadding?.[0] ? tabletPadding[0] : '' ), ( undefined !== mobilePadding?.[0] ? mobilePadding[0] : '' ) );
	const previewPaddingRight = getPreviewSize( previewDevice, ( undefined !== padding?.[1] ? padding[1] : '' ), ( undefined !== tabletPadding?.[1] ? tabletPadding[1] : '' ), ( undefined !== mobilePadding?.[1] ? mobilePadding[1] : '' ) );
	const previewPaddingBottom = getPreviewSize( previewDevice, ( undefined !== padding?.[2] ? padding[2] : '' ), ( undefined !== tabletPadding?.[2] ? tabletPadding[2] : '' ), ( undefined !== mobilePadding?.[2] ? mobilePadding[2] : '' ) );
	const previewPaddingLeft = getPreviewSize( previewDevice, ( undefined !== padding?.[3] ? padding[3] : '' ), ( undefined !== tabletPadding?.[3] ? tabletPadding[3] : '' ), ( undefined !== mobilePadding?.[3] ? mobilePadding[3] : '' ) );

	const previewRadiusTop = getPreviewSize( previewDevice, ( undefined !== borderRadius ? borderRadius[ 0 ] : '' ), ( undefined !== tabletBorderRadius ? tabletBorderRadius[ 0 ] : '' ), ( undefined !== mobileBorderRadius ? mobileBorderRadius[ 0 ] : '' ) );
	const previewRadiusRight = getPreviewSize( previewDevice, ( undefined !== borderRadius ? borderRadius[ 1 ] : '' ), ( undefined !== tabletBorderRadius ? tabletBorderRadius[ 1 ] : '' ), ( undefined !== mobileBorderRadius ? mobileBorderRadius[ 1 ] : '' ) );
	const previewRadiusBottom = getPreviewSize( previewDevice, ( undefined !== borderRadius ? borderRadius[ 2 ] : '' ), ( undefined !== tabletBorderRadius ? tabletBorderRadius[ 2 ] : '' ), ( undefined !== mobileBorderRadius ? mobileBorderRadius[ 2 ] : '' ) );
	const previewRadiusLeft = getPreviewSize( previewDevice, ( undefined !== borderRadius ? borderRadius[ 3 ] : '' ), ( undefined !== tabletBorderRadius ? tabletBorderRadius[ 3 ] : '' ), ( undefined !== mobileBorderRadius ? mobileBorderRadius[ 3 ] : '' ) );

	const previewIconSize = getPreviewSize( previewDevice, ( undefined !== iconSize?.[0] ? iconSize[0] : '' ), ( undefined !== iconSize?.[1] ? iconSize[1] : '' ), ( undefined !== iconSize?.[2] ? iconSize[2] : '' ) );
	const previewIconPaddingTop = getPreviewSize( previewDevice, ( undefined !== iconPadding?.[0] ? iconPadding[0] : '' ), ( undefined !== tabletIconPadding?.[0] ? tabletIconPadding[0] : '' ), ( undefined !== mobileIconPadding?.[0] ? mobileIconPadding[0] : '' ) );
	const previewIconPaddingRight = getPreviewSize( previewDevice, ( undefined !== iconPadding?.[1] ? iconPadding[1] : '' ), ( undefined !== tabletIconPadding?.[1] ? tabletIconPadding[1] : '' ), ( undefined !== mobileIconPadding?.[1] ? mobileIconPadding[1] : '' ) );
	const previewIconPaddingBottom = getPreviewSize( previewDevice, ( undefined !== iconPadding?.[2] ? iconPadding[2] : '' ), ( undefined !== tabletIconPadding?.[2] ? tabletIconPadding[2] : '' ), ( undefined !== mobileIconPadding?.[2] ? mobileIconPadding[2] : '' ) );
	const previewIconPaddingLeft = getPreviewSize( previewDevice, ( undefined !== iconPadding?.[ 3 ] ? iconPadding[ 3 ] : '' ), ( undefined !== tabletIconPadding?.[ 3 ] ? tabletIconPadding[ 3 ] : '' ), ( undefined !== mobileIconPadding?.[ 3 ] ? mobileIconPadding[ 3 ] : '' ) );

	const previewFixedWidth = getPreviewSize( previewDevice, ( undefined !== width?.[0] ? width[0] : '' ), ( undefined !== width?.[1] ? width[1] : undefined ), ( undefined !== width?.[2] ? width[2] : undefined ) );

	const previewBorderTopStyle = getBorderStyle( previewDevice, 'top', borderStyle, tabletBorderStyle, mobileBorderStyle );
	const previewBorderRightStyle = getBorderStyle( previewDevice, 'right', borderStyle, tabletBorderStyle, mobileBorderStyle );
	const previewBorderBottomStyle = getBorderStyle( previewDevice, 'bottom', borderStyle, tabletBorderStyle, mobileBorderStyle );
	const previewBorderLeftStyle = getBorderStyle( previewDevice, 'left', borderStyle, tabletBorderStyle, mobileBorderStyle );
	const previewBorderTopColor = getBorderColor( previewDevice, 'top', borderStyle, tabletBorderStyle, mobileBorderStyle );
	const previewBorderRightColor = getBorderColor( previewDevice, 'right', borderStyle, tabletBorderStyle, mobileBorderStyle );
	const previewBorderBottomColor = getBorderColor( previewDevice, 'bottom', borderStyle, tabletBorderStyle, mobileBorderStyle );
	const previewBorderLeftColor = getBorderColor( previewDevice, 'left', borderStyle, tabletBorderStyle, mobileBorderStyle );
	const inheritBorder = [ borderStyle, tabletBorderStyle, mobileBorderStyle ];
	const previewBorderHoverTopStyle = getBorderStyle( previewDevice, 'top', borderHoverStyle, tabletBorderHoverStyle, mobileBorderHoverStyle, inheritBorder );
	const previewBorderHoverRightStyle = getBorderStyle( previewDevice, 'right', borderHoverStyle, tabletBorderHoverStyle, mobileBorderHoverStyle, inheritBorder );
	const previewBorderHoverBottomStyle = getBorderStyle( previewDevice, 'bottom', borderHoverStyle, tabletBorderHoverStyle, mobileBorderHoverStyle, inheritBorder );
	const previewBorderHoverLeftStyle = getBorderStyle( previewDevice, 'left', borderHoverStyle, tabletBorderHoverStyle, mobileBorderHoverStyle, inheritBorder );
	const previewBorderHoverTopColor = getBorderColor( previewDevice, 'top', borderHoverStyle, tabletBorderHoverStyle, mobileBorderHoverStyle, inheritBorder );
	const previewBorderHoverRightColor = getBorderColor( previewDevice, 'right', borderHoverStyle, tabletBorderHoverStyle, mobileBorderHoverStyle, inheritBorder );
	const previewBorderHoverBottomColor = getBorderColor( previewDevice, 'bottom', borderHoverStyle, tabletBorderHoverStyle, mobileBorderHoverStyle, inheritBorder );
	const previewBorderHoverLeftColor = getBorderColor( previewDevice, 'left', borderHoverStyle, tabletBorderHoverStyle, mobileBorderHoverStyle, inheritBorder );

	const previewHoverRadiusTop = getPreviewSize( previewDevice, ( undefined !== borderHoverRadius ? borderHoverRadius[ 0 ] : '' ), ( undefined !== tabletBorderHoverRadius ? tabletBorderHoverRadius[ 0 ] : '' ), ( undefined !== mobileBorderHoverRadius ? mobileBorderHoverRadius[ 0 ] : '' ) );
	const previewHoverRadiusRight = getPreviewSize( previewDevice, ( undefined !== borderHoverRadius ? borderHoverRadius[ 1 ] : '' ), ( undefined !== tabletBorderHoverRadius ? tabletBorderHoverRadius[ 1 ] : '' ), ( undefined !== mobileBorderHoverRadius ? mobileBorderHoverRadius[ 1 ] : '' ) );
	const previewHoverRadiusBottom = getPreviewSize( previewDevice, ( undefined !== borderHoverRadius ? borderHoverRadius[ 2 ] : '' ), ( undefined !== tabletBorderHoverRadius ? tabletBorderHoverRadius[ 2 ] : '' ), ( undefined !== mobileBorderHoverRadius ? mobileBorderHoverRadius[ 2 ] : '' ) );
	const previewHoverRadiusLeft = getPreviewSize( previewDevice, ( undefined !== borderHoverRadius ? borderHoverRadius[ 3 ] : '' ), ( undefined !== tabletBorderHoverRadius ? tabletBorderHoverRadius[ 3 ] : '' ), ( undefined !== mobileBorderHoverRadius ? mobileBorderHoverRadius[ 3 ] : '' ) );

	const previewAlign = getPreviewSize( previewDevice, ( undefined !== btnsBlock?.[0]?.attributes?.hAlign ? btnsBlock?.[0]?.attributes?.hAlign : '' ), ( undefined !== btnsBlock?.[0]?.attributes?.thAlign ? btnsBlock?.[0]?.attributes?.thAlign : '' ), ( undefined !== btnsBlock?.[0]?.attributes?.mhAlign ? btnsBlock?.[0]?.attributes?.mhAlign : '' ) );
	const previewVertical = getPreviewSize( previewDevice, ( undefined !== btnsBlock?.[0]?.attributes?.vAlign ? btnsBlock?.[0]?.attributes?.vAlign : '' ), ( undefined !== btnsBlock?.[0]?.attributes?.tvAlign ? btnsBlock?.[0]?.attributes?.tvAlign : '' ), ( undefined !== btnsBlock?.[0]?.attributes?.mvAlign ? btnsBlock?.[0]?.attributes?.mvAlign : '' ) );
	const previewOnlyIcon = getPreviewSize( previewDevice, ( undefined !== onlyIcon?.[0] ? onlyIcon[0] : '' ), ( undefined !== onlyIcon?.[1] ? onlyIcon[1] : undefined ), ( undefined !== onlyIcon?.[2] ? onlyIcon[2] : undefined ) );
	let btnbg;
	// let btnGrad;
	// let btnGrad2;
	if ( undefined !== backgroundType && 'gradient' === backgroundType ) {
		btnbg = gradient;
		// btnGrad = ( 'transparent' === background || undefined === background ? 'rgba(255,255,255,0)' : BaseColorOutput( background ) );
		// btnGrad2 = ( undefined !== gradient && undefined !== gradient[ 0 ] && '' !== gradient[ 0 ] ? BaseColorOutput( gradient[ 0 ], ( undefined !== gradient && gradient[1] !== undefined ? gradient[ 1 ] : 1 ) ) : BaseColorOutput( '#999999', ( undefined !== gradient && gradient[1] !== undefined ? gradient[1] : 1 ) ) );
		// if ( undefined !== gradient && 'radial' === gradient[ 4 ] ) {
		// 	btnbg = `radial-gradient(at ${( undefined === gradient[ 6 ] ? 'center center' : gradient[ 6 ] )}, ${btnGrad} ${( undefined === gradient[ 2 ] ? '0' : gradient[ 2 ] )}%, ${btnGrad2} ${( undefined === gradient[ 3 ] ? '100' : gradient[ 3 ] )}%)`;
		// } else if ( undefined === gradient || 'radial' !== gradient[ 4 ] ) {
		// 	btnbg = `linear-gradient(${( undefined !== gradient && undefined !== gradient[ 5 ] ? gradient[ 5 ] : '180' )}deg, ${btnGrad} ${( undefined !== gradient && undefined !== gradient[ 2 ] ? gradient[ 2 ] : '0' )}%, ${btnGrad2} ${( undefined !== gradient && undefined !== gradient[ 3 ] ? gradient[ 3 ] : '100' )}%)`;
		// }
	} else {
		btnbg = ( 'transparent' === background || undefined === background ? undefined : BaseColorOutput( background ) );
	}
	const nonTransAttrs = [ 'hideLink', 'link', 'target', 'download', 'text', 'sponsor' ];
	const btnClassName = classnames( {
		'bst-button'                   : true,
		[ `bst-button-${uniqueID}` ]  : true,
		[ `bsb-btn-global-${inheritStyles}` ] : inheritStyles,
		'wp-block-button__link'              : inheritStyles && 'inherit' === inheritStyles,
		[ `bsb-btn-has-icon` ]                : icon,
		[ `bst-btn-svg-show-${( !iconHover ? 'always' : 'hover' )}` ]   : icon,
		[ `bsb-btn-only-icon` ]               : previewOnlyIcon,
		[ `bst-btn-size-${( sizePreset ? sizePreset : 'standard' )}` ]  : true,
	} );
	const classes = classnames( {
		className                  : className,
		[ `bsb-single-btn-${uniqueID}` ]  : true,
		[ `bst-btn-width-type-${( widthType ? widthType : 'auto' )}` ]   : true,
	} );
	const blockProps = useBlockProps( {
		className: classes,
		style: {
			width        : ( undefined !== widthType && 'fixed' === widthType && '%' === ( undefined !== widthUnit ? widthUnit : 'px' ) && '' !== previewFixedWidth ? previewFixedWidth + ( undefined !== widthUnit ? widthUnit : 'px' ) : undefined ),
		},
	} );
	let btnRad = '0';
	let btnBox = '';
	let btnBox2 = '';
	const btnbgHover = ( 'gradient' === backgroundHoverType ? gradientHover : BaseColorOutput( backgroundHover ) );
	if ( undefined !== displayHoverShadow && displayHoverShadow && undefined !== shadowHover?.[0] && undefined !== shadowHover?.[0].inset && false === shadowHover?.[0].inset ) {
		btnBox = `${( undefined !== shadowHover?.[0].inset && shadowHover[0].inset ? 'inset ' : '' ) + ( undefined !== shadowHover?.[0].hOffset ? shadowHover[0].hOffset : 0 ) + 'px ' + ( undefined !== shadowHover?.[0].vOffset ? shadowHover[0].vOffset : 0 ) + 'px ' + ( undefined !== shadowHover?.[0].blur ? shadowHover[0].blur : 14 ) + 'px ' + ( undefined !== shadowHover?.[0].spread ? shadowHover[0].spread : 0 ) + 'px ' + BaseColorOutput( ( undefined !== shadowHover?.[0].color ? shadowHover[0].color : '#000000' ), ( undefined !== shadowHover?.[0].opacity ? shadowHover[0].opacity : 1 ) ) }`;
		btnBox2 = 'none';
		btnRad = '0';
	}
	if ( undefined !== displayHoverShadow && displayHoverShadow && undefined !== shadowHover?.[0] && undefined !== shadowHover?.[0].inset && true === shadowHover?.[0].inset ) {
		btnBox2 = `${( undefined !== shadowHover?.[0].inset && shadowHover[0].inset ? 'inset ' : '' ) + ( undefined !== shadowHover?.[0].hOffset ? shadowHover[0].hOffset : 0 ) + 'px ' + ( undefined !== shadowHover?.[0].vOffset ? shadowHover[0].vOffset : 0 ) + 'px ' + ( undefined !== shadowHover?.[0].blur ? shadowHover[0].blur : 14 ) + 'px ' + ( undefined !== shadowHover?.[0].spread ? shadowHover[0].spread : 0 ) + 'px ' + BaseColorOutput( ( undefined !== shadowHover?.[0].color ? shadowHover[0].color : '#000000' ), ( undefined !== shadowHover?.[0].opacity ? shadowHover[0].opacity : 1 ) ) }`;
		btnRad = ( undefined !== borderRadius ? borderRadius : '3' );
		btnBox = 'none';
	}
	const previewTypographyCSS = typographyStyle( typography, `.editor-styles-wrapper .wp-block-base-advancedbtn .bsb-single-btn-${uniqueID} .bst-button-${uniqueID}`, previewDevice );
	const renderCSS = (
		<style>
			{ ( '' !== previewTypographyCSS ? previewTypographyCSS : '' ) }
			{`.bsb-single-btn-${uniqueID} .bst-button-${uniqueID}.bsb-btn-global-outline {`}
				{( ! previewBorderTopStyle && previewBorderTopColor ? 'border-top-color:' + previewBorderTopColor + ';' : '' )}
				{( ! previewBorderRightStyle && previewBorderRightColor ? 'border-right-color:' + previewBorderRightColor + ';' : '' )}
				{( ! previewBorderLeftStyle && previewBorderLeftColor ? 'border-left-color:' + previewBorderLeftColor + ';' : '' )}
				{( ! previewBorderBottomStyle && previewBorderBottomColor ? 'border-bottom-color:' + previewBorderBottomColor + ';' : '' )}
			{'}'}
			{`.bsb-single-btn-${uniqueID} .bst-button-${uniqueID}.bsb-btn-global-outline:hover {`}
				{( ! previewBorderHoverTopStyle && previewBorderHoverTopColor ? 'border-top-color:' + previewBorderHoverTopColor + ';' : '' )}
				{( ! previewBorderHoverRightStyle && previewBorderHoverRightColor ? 'border-right-color:' + previewBorderHoverRightColor + ';' : '' )}
				{( ! previewBorderHoverLeftStyle && previewBorderHoverLeftColor ? 'border-left-color:' + previewBorderHoverLeftColor + ';' : '' )}
				{( ! previewBorderHoverBottomStyle && previewBorderHoverBottomColor ? 'border-bottom-color:' + previewBorderHoverBottomColor + ';' : '' )}
			{'}'}
			{`.bsb-single-btn-${uniqueID} .bst-button-${uniqueID}:hover {`}
				{( colorHover ? 'color:' + BaseColorOutput( colorHover ) + '!important;' : '' )}
				{( btnBox ? 'box-shadow:' + btnBox + '!important;' : '' )}
				{( previewBorderHoverTopStyle ? 'border-top:' + previewBorderHoverTopStyle + '!important;' : '' )}
				{( previewBorderHoverRightStyle ? 'border-right:' + previewBorderHoverRightStyle + '!important;' : '' )}
				{( previewBorderHoverLeftStyle ? 'border-left:' + previewBorderHoverLeftStyle + '!important;' : '' )}
				{( previewBorderHoverBottomStyle ? 'border-bottom:' + previewBorderHoverBottomStyle + '!important;' : '' )}
				{( previewHoverRadiusTop ? 'border-top-left-radius:' + previewHoverRadiusTop + ( borderHoverRadiusUnit ? borderHoverRadiusUnit : 'px' ) + '!important;' : '' )}
				{( previewHoverRadiusRight ? 'border-top-right-radius:' + previewHoverRadiusRight + ( borderHoverRadiusUnit ? borderHoverRadiusUnit : 'px' ) + '!important;' : '' )}
				{( previewHoverRadiusLeft ? 'border-bottom-left-radius:' + previewHoverRadiusLeft + ( borderHoverRadiusUnit ? borderHoverRadiusUnit : 'px' ) + '!important;' : '' )}
				{( previewHoverRadiusBottom ? 'border-bottom-right-radius:' + previewHoverRadiusBottom + ( borderHoverRadiusUnit ? borderHoverRadiusUnit : 'px' ) + '!important;' : '' )}
			{'}'}
			{( iconColorHover ? `.bsb-single-btn-${uniqueID} .bst-button-${uniqueID}:hover .bst-btn-svg-icon { color:${BaseColorOutput( iconColorHover )} !important;}` : '' )}
			{`.bsb-single-btn-${uniqueID} .bst-button-${uniqueID}::before {`}
					{( btnbgHover ? 'background:' + btnbgHover + ';' : '' )}
					{( btnBox2 ? 'box-shadow:' + btnBox2 + ';' : '' )}
					{( btnRad ? 'border-radius:' + btnRad + 'px;' : '' )}
			{'}'}
		</style>
	);
	return (
		<div {...blockProps}>
			{renderCSS}
			<BlockControls>
				<ToolbarGroup>
					<JustifyContentControl
						value={ previewAlign }
						onChange={ value => {
							if ( previewDevice === 'Mobile' ) {
								updateParentBlock( 'mhAlign', ( value ? value : '' ) );
							} else if ( previewDevice === 'Tablet' ) {
								updateParentBlock( 'thAlign', ( value ? value : '' ) );
							} else {
								updateParentBlock( 'hAlign', ( value ? value : 'center' ) );
							}
						} }
					/>
					<BlockVerticalAlignmentControl
						value={previewVertical}
						onChange={ value => {
							if ( previewDevice === 'Mobile' ) {
								updateParentBlock( 'mvAlign', ( value ? value : '' ) );
							} else if ( previewDevice === 'Tablet' ) {
								updateParentBlock( 'tvAlign', ( value ? value : '' ) );
							} else {
								updateParentBlock( 'vAlign', ( value ? value : 'center' ) );
							}
						}}
					/>
				</ToolbarGroup>
				{ ! hideLink && (
					<ToolbarGroup>
						<ToolbarButton
							name="link"
							icon={ linkIcon }
							title={ __( 'Link', 'gutenam-blocks' ) }
							shortcut={ displayShortcut.primary( 'k' ) }
							onClick={ startEditing }
						/>
					</ToolbarGroup>
				) }
				<CopyPasteAttributes
					attributes={ attributes }
					excludedAttrs={ nonTransAttrs }
					defaultAttributes={ metadata['attributes'] }
					blockSlug={ metadata['name'] }
					onPaste={ attributesToPaste => setAttributes( attributesToPaste ) }
				/>
			</BlockControls>
			{ ! hideLink && isSelected && isEditingURL && (
				<URLInputInline
					url={link}
					onChangeUrl={value => {
						setAttributes( { link: value } );
					}}
					additionalControls={true}
					changeTargetType={true}
					opensInNewTab={( undefined !== target ? target : '' )}
					onChangeTarget={value => {
						setAttributes( { target: value } );
					}}
					linkNoFollow={( undefined !== noFollow ? noFollow : false )}
					onChangeFollow={value => {
						setAttributes( { noFollow: value } );
					}}
					linkSponsored={( undefined !== sponsored ? sponsored : false )}
					onChangeSponsored={value => {
						setAttributes( { sponsored: value } );
					}}
					linkDownload={( undefined !== download ? download : false )}
					onChangeDownload={value => {
						setAttributes( { download: value } );
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
			) }
			{showSettings( 'allSettings', 'base/advancedbtn' ) && (
				<>
					<InspectorControls>
						<InspectorControlTabs
							panelName={'singlebtn'}
							setActiveTab={( value ) => setActiveTab( value )}
							activeTab={ activeTab}
						/>

						{( activeTab === 'general' ) &&
							<>
								<BasePanelBody
									title={__( 'Button Settings', 'gutenam-blocks' ) }
									initialOpen={true}
									panelName={'bsb-adv-single-btn'}
								>
									{ ! hideLink && (
										<URLInputControl
											label={__( 'Button Link', 'gutenam-blocks' )}
											url={link}
											onChangeUrl={value => {
												setAttributes( { link: value });
											}}
											additionalControls={true}
											changeTargetType={true}
											opensInNewTab={( undefined !== target ? target : '' )}
											onChangeTarget={value => {
												setAttributes( { target: value });
											}}
											linkNoFollow={( undefined !== noFollow ? noFollow : false )}
											onChangeFollow={value => {
												setAttributes( { noFollow: value });
											}}
											linkSponsored={( undefined !== sponsored ? sponsored : false )}
											onChangeSponsored={value => {
												setAttributes( { sponsored: value });
											}}
											linkDownload={( undefined !== download ? download : false )}
											onChangeDownload={value => {
												setAttributes( { download: value });
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
									)}
									<BaseRadioButtons
										value={ inheritStyles }
										options={ buttonStyleOptions }
										hideLabel={false}
										label={__( 'Button Inherit Styles', 'gutenam-blocks' ) }
										onChange={ value => {
											setAttributes( {
												inheritStyles: value,
											} );
										}}
									/>
									{showSettings( 'sizeSettings', 'base/advancedbtn' ) && (
										<>
											<BaseRadioButtons
												value={ sizePreset }
												options={ btnSizes }
												hideLabel={false}
												label={__( 'Button Size', 'gutenam-blocks' ) }
												onChange={ value => {
													setAttributes( {
														sizePreset: value,
													} );
												}}
											/>
											<BaseRadioButtons
												value={ widthType }
												options={ btnWidths }
												hideLabel={false}
												label={__( 'Button Width', 'gutenam-blocks' ) }
												onChange={ value => {
													setAttributes( {
														widthType: value,
													} );
												}}
											/>
											{'fixed' === widthType && (
												<div className="bst-inner-sub-section">
													<ResponsiveRangeControls
														label={__( 'Fixed Width', 'gutenam-blocks' )}
														value={( undefined !== width?.[ 0 ] ? width[ 0 ] : undefined )}
														onChange={value => {
															setAttributes( { width: [ value, ( undefined !== width?.[1] ? width[1] : '' ), ( undefined !== width?.[2] ? width[2] : '' ) ] } );
														}}
														tabletValue={( undefined !== width?.[1] ? width[1] : undefined )}
														onChangeTablet={value => {
															setAttributes( { width: [ ( undefined !== width?.[ 0 ] ? width[ 0 ] : '' ), value, ( undefined !== width?.[2] ? width[2] : '' ) ] } );
														}}
														mobileValue={( undefined !== width?.[2] ? width[2] : undefined )}
														onChangeMobile={value => {
															setAttributes( { width: [ ( undefined !== width?.[ 0 ] ? width[ 0 ] : '' ), ( undefined !== width?.[1] ? width[1] : '' ), value ] } );
														}}
														min={0}
														max={( ( widthUnit ? widthUnit : 'px' ) !== 'px' ? 100 : 600 )}
														step={1}
														unit={widthUnit ? widthUnit : 'px'}
														onUnit={( value ) => {
															setAttributes( { widthUnit: value } );
														}}
														units={[ 'px', '%' ]}
													/>
												</div>
											)}
										</>
									)}
								</BasePanelBody>

							</>
						}

						{( activeTab === 'style' ) &&
							<>
								{ showSettings( 'colorSettings', 'base/advancedbtn' ) && (
									<BasePanelBody
										title={__( 'Button Styles', 'gutenam-blocks' ) }
										initialOpen={true}
										panelName={'bsb-adv-single-btn-styles'}
									>
										<HoverToggleControl
											hover={
												<>
													<PopColorControl
														label={__( 'Color Hover', 'gutenam-blocks' )}
														value={( colorHover ? colorHover : '' )}
														default={''}
														onChange={value => setAttributes( { colorHover: value } )}
													/>
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
													{ 'normal' === backgroundHoverType && (
														<PopColorControl
															label={__( 'Background Color', 'gutenam-blocks' )}
															value={( backgroundHover ? backgroundHover : '' )}
															default={''}
															onChange={value => setAttributes( { backgroundHover: value } )}
														/>
													)}
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
													<PopColorControl
														label={__( 'Color', 'gutenam-blocks' )}
														value={( color ? color : '' )}
														default={''}
														onChange={value => setAttributes( { color: value } )}
													/>
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
													{ 'normal' === backgroundType && (
														<PopColorControl
															label={__( 'Background Color', 'gutenam-blocks' )}
															value={( background ? background : '' )}
															default={''}
															onChange={value => setAttributes( { background: value } )}
														/>
													) }
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
								)}
								{showSettings( 'iconSettings', 'base/advancedbtn' ) && (
									<BasePanelBody
										title={__( 'Icon Settings', 'gutenam-blocks' ) }
										initialOpen={false}
										panelName={'bsb-adv-single-btn-icons'}
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
										<SmallResponsiveControl
											label={__( 'Icon and Text Display', 'gutenam-blocks' )}
											desktopChildren={<SelectControl
												value={( undefined !== onlyIcon?.[ 0 ] && onlyIcon[ 0 ] ? 'true' : 'false' )}
												options={[
													{ value: 'false', label: __( 'Show Icon and Text', 'gutenam-blocks' ) },
													{ value: 'true', label: __( 'Show Only Icon', 'gutenam-blocks' ) },
												]}
												onChange={value => {
													setAttributes( { onlyIcon: [ ( value === 'true' ? true : false ), ( undefined !== onlyIcon?.[1] ? onlyIcon[1] : '' ), ( undefined !== onlyIcon?.[2] ? onlyIcon[2] : '' ) ] } );
												}}
											/>}
											tabletChildren={<SelectControl
												value={( undefined !== onlyIcon?.[1] && onlyIcon[1] ? 'true' : ( undefined !== onlyIcon?.[1] && false === onlyIcon[1] ? 'false' : '' ) )}
												options={[
													{ value: '', label: __( 'Inherit', 'gutenam-blocks' ) },
													{ value: 'false', label: __( 'Show Icon and Text', 'gutenam-blocks' ) },
													{ value: 'true', label: __( 'Show Only Icon', 'gutenam-blocks' ) },
												]}
												onChange={value => {
													let newValue = value;
													if ( value === 'true' ) {
														newValue = true;
													} else if ( value === 'false' ) {
														newValue = false;
													}
													setAttributes( { onlyIcon: [ ( undefined !== onlyIcon?.[0] ? onlyIcon[0] : '' ), newValue, ( undefined !== onlyIcon?.[2] ? onlyIcon[2] : '' ) ] } );
												}}
											/>}
											mobileChildren={<SelectControl
												value={( undefined !== onlyIcon?.[2] && onlyIcon[2] ? 'true' : ( undefined !== onlyIcon?.[2] && false === onlyIcon[2] ? 'false' : '' ) )}
												options={[
													{ value: '', label: __( 'Inherit', 'gutenam-blocks' ) },
													{ value: 'false', label: __( 'Show Icon and Text', 'gutenam-blocks' ) },
													{ value: 'true', label: __( 'Show Only Icon', 'gutenam-blocks' ) },
												]}
												onChange={value => {
													let newValue = value;
													if ( value === 'true' ) {
														newValue = true;
													} else if ( value === 'false' ) {
														newValue = false;
													}
													setAttributes( { onlyIcon: [ ( undefined !== onlyIcon?.[0] ? onlyIcon[0] : '' ), ( undefined !== onlyIcon?.[1] ? onlyIcon[1] : '' ), newValue ] } );
												}}
											/>}
										/>
										<SelectControl
											label={__( 'Icon Location', 'gutenam-blocks' )}
											value={iconSide}
											options={[
												{ value: 'right', label: __( 'Right' ) },
												{ value: 'left', label: __( 'Left' ) },
											]}
											onChange={value => {
												setAttributes( { iconSide: value } );
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
								{ showSettings( 'fontSettings', 'base/advancedbtn' ) && (
									<BasePanelBody
										title={__( 'Typography Settings', 'gutenam-blocks' )}
										initialOpen={false}
										panelName={'bsb-adv-btn-font-family'}
									>
										<TypographyControls
											fontGroup={'typography'}
											fontSize={typography[0].size}
											onFontSize={( value ) => saveTypography( { size: value } )}
											fontSizeType={typography[0].sizeType}
											onFontSizeType={( value ) => saveTypography( { sizeType: value } )}
											lineHeight={typography[0].lineHeight}
											onLineHeight={( value ) => saveTypography( { lineHeight: value } )}
											lineHeightType={typography[0].lineType}
											onLineHeightType={( value ) => saveTypography( { lineType: value } )}
											reLetterSpacing={typography[0].letterSpacing}
											onLetterSpacing={( value ) => saveTypography( { letterSpacing: value } )}
											letterSpacingType={typography[0].letterType}
											onLetterSpacingType={( value ) => saveTypography( { letterType: value } )}
											textTransform={typography[0].textTransform}
											onTextTransform={( value ) => saveTypography( { textTransform: value } )}
											fontFamily={typography[0].family}
											onFontFamily={( value ) => saveTypography( { family: value } )}
											onFontChange={( select ) => {
												saveTypography( {
													family: select.value,
													google: select.google,
												} );
											}}
											onFontArrayChange={( values ) => saveTypography( values )}
											googleFont={typography[0].google}
											onGoogleFont={( value ) => saveTypography( { google: value } )}
											loadGoogleFont={typography[0].loadGoogle}
											onLoadGoogleFont={( value ) => saveTypography( { loadGoogle: value } )}
											fontVariant={typography[0].variant}
											onFontVariant={( value ) => saveTypography( { variant: value } )}
											fontWeight={typography[0].weight}
											onFontWeight={( value ) => saveTypography( { weight: value } )}
											fontStyle={typography[0].style}
											onFontStyle={( value ) => saveTypography( { style: value } )}
											fontSubset={typography[0].subset}
											onFontSubset={( value ) => saveTypography( { subset: value } )}
										/>
									</BasePanelBody>
								)}

							</>
						}

						{( activeTab === 'advanced' ) && (
							<>
								{showSettings('marginSettings', 'base/advancedbtn') && (
									<>
										<BasePanelBody panelName={'bsb-single-button-margin-settings'}>
											<ResponsiveMeasureRangeControl
												label={__( 'Padding', 'gutenam-blocks' )}
												value={padding}
												onChange={( value ) => setAttributes( { padding: value } )}
												tabletValue={tabletPadding}
												onChangeTablet={( value ) => setAttributes( { tabletPadding: value } )}
												mobileValue={mobilePadding}
												onChangeMobile={( value ) => setAttributes( { mobilePadding: value } )}
												min={( paddingUnit === 'em' || paddingUnit === 'rem' ? -25 : -400 )}
												max={( paddingUnit === 'em' || paddingUnit === 'rem' ? 25 : 400 )}
												step={( paddingUnit === 'em' || paddingUnit === 'rem' ? 0.1 : 1 )}
												unit={paddingUnit}
												units={[ 'px', 'em', 'rem' ]}
												onUnit={( value ) => setAttributes( { paddingUnit: value } )}
												onMouseOver={ paddingMouseOver.onMouseOver }
												onMouseOut={ paddingMouseOver.onMouseOut }
											/>
											<ResponsiveMeasureRangeControl
												label={__( 'Margin', 'gutenam-blocks' )}
												value={margin}
												onChange={( value ) => setAttributes( { margin: value } )}
												tabletValue={tabletMargin}
												onChangeTablet={( value ) => setAttributes( { tabletMargin: value } )}
												mobileValue={mobileMargin}
												onChangeMobile={( value ) => setAttributes( { mobileMargin: value } )}
												min={( marginUnit === 'em' || marginUnit === 'rem' ? -25 : -400 )}
												max={( marginUnit === 'em' || marginUnit === 'rem' ? 25 : 400 )}
												step={( marginUnit === 'em' || marginUnit === 'rem' ? 0.1 : 1 )}
												unit={marginUnit}
												units={[ 'px', 'em', 'rem' ]}
												onUnit={( value ) => setAttributes( { marginUnit: value } )}
												onMouseOver={ marginMouseOver.onMouseOver }
												onMouseOut={ marginMouseOver.onMouseOut }
											/>
											<TextControl
												label={ __( 'Add Aria Label', 'gutenam-blocks' )}
												value={ ( label ? label : '' )}
												onChange={( value ) => setAttributes( { label: value })}
												className={ 'bsb-textbox-style' }
											/>
										</BasePanelBody>

										<div className="bst-sidebar-settings-spacer"></div>
									</>
								)}

								<BaseBlockDefaults attributes={ attributes } defaultAttributes={ metadata['attributes'] } blockSlug={ metadata['name'] } excludedAttrs={ nonTransAttrs } />
							</>
						)}
					</InspectorControls>
				</>
			)}
			<div
				id={`animate-id${uniqueID}`}
				className={'btn-inner-wrap aos-animate bst-animation-wrap'}
				data-aos={( baseAnimation ? baseAnimation : undefined )}
				data-aos-duration={( baseAOSOptions && baseAOSOptions[0] && baseAOSOptions[0].duration ? baseAOSOptions[0].duration : undefined )}
				data-aos-easing={( baseAOSOptions && baseAOSOptions[ 0 ] && baseAOSOptions[ 0 ].easing ? baseAOSOptions[ 0 ].easing : undefined )}
			>
				<span
					className={btnClassName}
					style={{
						paddingTop	   : ( '' !== previewPaddingTop ? getSpacingOptionOutput( previewPaddingTop, paddingUnit) : undefined ),
						paddingRight	   : ( '' !== previewPaddingRight ? getSpacingOptionOutput( previewPaddingRight, paddingUnit) : undefined ),
						paddingBottom	   : ( '' !== previewPaddingBottom ? getSpacingOptionOutput( previewPaddingBottom, paddingUnit) : undefined ),
						paddingLeft	   : ( '' !== previewPaddingLeft ? getSpacingOptionOutput( previewPaddingLeft, paddingUnit) : undefined ),
						marginTop      : ('' !==  previewMarginTop ? getSpacingOptionOutput( previewMarginTop, previewMarginUnit ) : undefined ),
						marginRight    : ( '' !== previewMarginRight ? getSpacingOptionOutput( previewMarginRight, previewMarginUnit ) : undefined ),
						marginBottom   : ('' !==  previewMarginBottom ? getSpacingOptionOutput( previewMarginBottom, previewMarginUnit ) : undefined ),
						marginLeft     : ('' !==  previewMarginLeft ? getSpacingOptionOutput( previewMarginLeft, previewMarginUnit ) : undefined ),
						borderTop: ( previewBorderTopStyle ? previewBorderTopStyle : undefined ),
						borderRight: ( previewBorderRightStyle ? previewBorderRightStyle : undefined ),
						borderBottom: ( previewBorderBottomStyle ? previewBorderBottomStyle : undefined ),
						borderLeft: ( previewBorderLeftStyle ? previewBorderLeftStyle : undefined ),
						borderTopLeftRadius: ( '' !== previewRadiusTop ? previewRadiusTop + ( borderRadiusUnit ? borderRadiusUnit : 'px' ) : undefined ),
						borderTopRightRadius: ( '' !== previewRadiusRight ? previewRadiusRight + ( borderRadiusUnit ? borderRadiusUnit : 'px' ) : undefined ),
						borderBottomRightRadius: ( '' !== previewRadiusBottom ? previewRadiusBottom + ( borderRadiusUnit ? borderRadiusUnit : 'px' ) : undefined ),
						borderBottomLeftRadius: ( '' !== previewRadiusLeft ? previewRadiusLeft + ( borderRadiusUnit ? borderRadiusUnit : 'px' ) : undefined ),
						boxShadow      : ( undefined !== displayShadow && displayShadow && undefined !== shadow && undefined !== shadow[0] && undefined !== shadow[0].color ? ( undefined !== shadow[0].inset && shadow[0].inset ? 'inset ' : '' ) + ( undefined !== shadow[0].hOffset ? shadow[0].hOffset : 0 ) + 'px ' + ( undefined !== shadow[0].vOffset ? shadow[0].vOffset : 0 ) + 'px ' + ( undefined !== shadow[0].blur ? shadow[0].blur : 14 ) + 'px ' + ( undefined !== shadow[0].spread ? shadow[0].spread : 0 ) + 'px ' + BaseColorOutput( ( undefined !== shadow[0].color ? shadow[0].color : '#000000' ), ( undefined !== shadow[0].opacity ? shadow[0].opacity : 1 ) ) : undefined ),

						background   : ( undefined !== btnbg ? btnbg : undefined ),
						color        : ( undefined !== color ? BaseColorOutput( color ) : undefined ),
						width        : ( undefined !== widthType && 'fixed' === widthType && 'px' === ( undefined !== widthUnit ? widthUnit : 'px' ) && '' !== previewFixedWidth ? previewFixedWidth + ( undefined !== widthUnit ? widthUnit : 'px' ) : undefined ),
					}}
				>
					{icon && 'left' === iconSide && (
						<IconRender className={`bst-btn-svg-icon bst-btn-svg-icon-${icon} bst-btn-side-${iconSide}`} name={icon} size={'1em'} style={{
							fontSize     : previewIconSize ? getFontSizeOptionOutput( previewIconSize, ( undefined !== iconSizeUnit ? iconSizeUnit : 'px' ) ) : undefined,
							color        : ( '' !== iconColor ? BaseColorOutput( iconColor ) : undefined ),
							paddingTop   : ( previewIconPaddingTop ? getSpacingOptionOutput( previewIconPaddingTop, iconPaddingUnit ) : undefined ),
							paddingRight : ( previewIconPaddingRight ? getSpacingOptionOutput( previewIconPaddingRight, iconPaddingUnit ) : undefined ),
							paddingBottom: ( previewIconPaddingBottom ? getSpacingOptionOutput( previewIconPaddingBottom, iconPaddingUnit ) : undefined ),
							paddingLeft  : ( previewIconPaddingLeft ? getSpacingOptionOutput( previewIconPaddingLeft, iconPaddingUnit ) : undefined ),
						}}/>
					)}
					<RichText
						tagName="div"
						placeholder={__( 'Button...', 'gutenam-blocks' )}
						value={text}
						onChange={value => setAttributes( { text: value } ) }
						allowedFormats={applyFilters( 'base.whitelist_richtext_formats', [ 'base/insert-dynamic', 'core/bold', 'core/italic', 'core/strikethrough', 'toolset/inline-field' ], 'base/advancedbtn' )}
						className={'bst-button-text'}
						keepPlaceholderOnFocus
					/>
					{icon && 'left' !== iconSide && (
						<IconRender className={`bst-btn-svg-icon bst-btn-svg-icon-${icon} bst-btn-side-${iconSide}`} name={icon} size={'1em'} style={{
							fontSize     : previewIconSize ? getFontSizeOptionOutput( previewIconSize, ( undefined !== iconSizeUnit ? iconSizeUnit : 'px' ) ) : undefined,
							color        : ( '' !== iconColor ? BaseColorOutput( iconColor ) : undefined ),
							paddingTop   : ( previewIconPaddingTop ? getSpacingOptionOutput( previewIconPaddingTop, iconPaddingUnit ) : undefined ),
							paddingRight : ( previewIconPaddingRight ? getSpacingOptionOutput( previewIconPaddingRight, iconPaddingUnit ) : undefined ),
							paddingBottom: ( previewIconPaddingBottom ? getSpacingOptionOutput( previewIconPaddingBottom, iconPaddingUnit ) : undefined ),
							paddingLeft  : ( previewIconPaddingLeft ? getSpacingOptionOutput( previewIconPaddingLeft, iconPaddingUnit ) : undefined ),
						}}/>
					)}
					<SpacingVisualizer
						type="inside"
						forceShow={ paddingMouseOver.isMouseOver }
						spacing={ [ getSpacingOptionOutput( previewPaddingTop, paddingUnit ), getSpacingOptionOutput( previewPaddingRight, paddingUnit ), getSpacingOptionOutput( previewPaddingBottom, paddingUnit ), getSpacingOptionOutput( previewPaddingLeft, paddingUnit ) ] }
					/>
				</span>
				<SpacingVisualizer
					type="inside"
					forceShow={ marginMouseOver.isMouseOver }
					spacing={ [ getSpacingOptionOutput( previewMarginTop, previewMarginUnit ), getSpacingOptionOutput( previewMarginRight, previewMarginUnit ), getSpacingOptionOutput( previewMarginBottom, previewMarginUnit ), getSpacingOptionOutput( previewMarginLeft, previewMarginUnit ) ] }
				/>
				{ typography?.[ 0 ]?.google && (
					<BaseWebfontLoader typography={ typography } clientId={ clientId } id={ 'typography' } />
				) }
			</div>
		</div>
	);

}
