/**
 * BLOCK: Base Countdown
 *
 * Registering a basic block with Gutenberg.
 */

/**
 * External dependencies
 */
import classnames from 'classnames';
import { get } from 'lodash';

/**
 * Import Icons
 */
import {
	bottomLeftIcon,
	bottomRightIcon,
	radiusIndividualIcon,
	radiusLinkedIcon,
	topLeftIcon,
	topRightIcon,
} from '@base/icons';

import {
	PopColorControl,
	TypographyControls,
	ResponsiveMeasurementControls,
	RangeControl,
	BasePanelBody,
	URLInputControl,
	BaseRadioButtons,
	ResponsiveAlignControls,
	WebfontLoader,
	InspectorControlTabs,
	MeasurementControls,
	BaseBlockDefaults,
	ResponsiveMeasureRangeControl,
	SpacingVisualizer,
	CopyPasteAttributes
} from '@base/components';
import {
	BaseColorOutput,
	showSettings,
	getPreviewSize,
	setBlockDefaults,
	getSpacingOptionOutput,
	mouseOverVisualizer,
	getFontSizeOptionOutput,
	getUniqueId,
} from '@base/helpers';

/**
 * Import Css
 */
import './editor.scss';
import metadata from './block.json';
/**
 * Internal block libraries
 */
import { __ } from '@wordpress/i18n';
import { __experimentalGetSettings as getDateSettings } from '@wordpress/date';

import { applyFilters } from '@wordpress/hooks';

import { useSelect, useDispatch } from '@wordpress/data';

import {
	Component,
	useEffect,
	useState,
} from '@wordpress/element';

import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import {
	InnerBlocks,
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
	store as blockEditorStore,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	Panel,
	ToggleControl,
	Button,
	TextControl,
	DateTimePicker,
	SelectControl,
	ToolbarGroup,
} from '@wordpress/components';

/**
 * This allows for checking to see if the block needs to generate a new ID.
 */
const COUNTDOWN_TEMPLATE = [
	[ 'base/countdown-timer', {} ],
];
const COUNTDOWN_TEMPLATE_WITH_MESSAGE = [
	[ 'base/countdown-timer', {} ],
	[ 'base/countdown-inner', { location: 'complete' } ],
];
const COUNTDOWN_NO_TIMER_WITH_MESSAGE = [
	[ 'base/countdown-inner', { location: 'first' } ],
	[ 'base/countdown-inner', { location: 'complete' } ],
];
const COUNTDOWN_NO_TIMER = [
	[ 'base/countdown-inner', { location: 'first' } ],
];
const ALLOWED_BLOCKS = [ 'base/countdown-timer', 'base/countdown-inner' ];
const typeOptions = [
	{ value: 'date', label: __( 'Date', 'gutenam-blocks' ), disabled: false },
	{ value: 'evergreen', label: __( 'Evergreen (Pro addon)', 'gutenam-blocks' ), disabled: true },
];
const actionOptions = [
	{ value: 'none', label: __( 'Show Timer at Zero', 'gutenam-blocks' ), disabled: false },
	{ value: 'hide', label: __( 'Hide (Pro addon)', 'gutenam-blocks' ), disabled: true },
	{ value: 'message', label: __( 'Replace with Content (Pro addon)', 'gutenam-blocks' ), disabled: true },
	{ value: 'redirect', label: __( 'Redirect (Pro addon)', 'gutenam-blocks' ), disabled: true },
];
const ANCHOR_REGEX = /[\s#]/g;

/**
 * Build the spacer edit
 */
function BaseCountdown( { attributes, setAttributes, className, clientId, isNested, parentBlock, getPreviewDevice } ) {

	const {
		uniqueID,
		expireAction,
		units,
		enableTimer,
		evergreenHours,
		evergreenMinutes,
		redirectURL,
		timerLayout,
		date,
		timestamp,
		evergreenReset,
		timezone,
		timeOffset,
		preLabel,
		postLabel,
		daysLabel,
		hoursLabel,
		minutesLabel,
		secondsLabel,
		counterAlign,
		campaignID,
		numberColor,
		numberFont,
		labelColor,
		labelFont,
		preLabelColor,
		preLabelFont,
		postLabelColor,
		postLabelFont,
		border,
		borderRadius,
		borderWidth,
		mobileBorderWidth,
		tabletBorderWidth,
		background,
		vsdesk,
		vstablet,
		vsmobile,
		countdownType,
		paddingType,
		marginType,
		containerMobilePadding,
		containerTabletPadding,
		containerPadding,
		containerMobileMargin,
		containerTabletMargin,
		containerMargin,
		itemBorder,
		itemBorderWidth,
		itemBackground,
		itemTabletBorderWidth,
		itemMobileBorderWidth,
		itemPadding,
		itemTabletPadding,
		itemMobilePadding,
		itemBorderRadius,
		itemPaddingType,
		timeNumbers,
		countdownDivider,
		revealOnLoad,
		evergreenStrict,
	} = attributes;

	const { addUniqueID } = useDispatch( 'baseblocks/data' );
	const { isUniqueID, isUniqueBlock } = useSelect(
		( select ) => {
			return {
				isUniqueID: ( value ) => select( 'baseblocks/data' ).isUniqueID( value ),
				isUniqueBlock: ( value, clientId ) => select( 'baseblocks/data' ).isUniqueBlock( value, clientId ),
			};
		},
		[ clientId ]
	);

	useEffect( () => {
		setBlockDefaults( 'base/countdown', attributes);

		let uniqueId = getUniqueId( uniqueID, clientId, isUniqueID, isUniqueBlock );
		if ( uniqueId !== uniqueID ) {
			attributes.uniqueID = uniqueId;
			setAttributes( { uniqueID: uniqueId } );
			addUniqueID( uniqueId, clientId );
		} else {
			addUniqueID( uniqueID, clientId );
		}

		if ( borderRadius && borderRadius[ 0 ] === borderRadius[ 1 ] && borderRadius[ 0 ] === borderRadius[ 2 ] && borderRadius[ 0 ] === borderRadius[ 3 ] ) {
			setBorderRadiusControl( 'linked' );
		} else {
			setBorderRadiusControl( 'individual' );
		}

		if ( !date ) {
			dateSettings = getDateSettings();

			const { timezone } = dateSettings;
			const today = new Date();
			const newDate = new Date();
			newDate.setDate( today.getDate() + 2 );
			const theTimeOffset = ( timezone && timezone.offset ? timezone.offset : 0 );
			const theSiteTimezoneTimestamp = getTimestamp( newDate, theTimeOffset );
			setAttributes( { date: newDate, timestamp: theSiteTimezoneTimestamp, timezone: ( timezone && timezone.string ? timezone.string : '' ), timeOffset: theTimeOffset } );
		}
	}, [] );

	const [ borderWidthControl, setBorderWidthControl ] = useState( 'individual' );
	const [ borderRadiusControl, setBorderRadiusControl ] = useState( 'linked' );
	const [ paddingControl, setPaddingControl ] = useState( 'individual' );
	const [ marginControl, setMarginControl ] = useState( 'individual' );
	const [ itemBorderWidthControl, setItemBorderWidthControl ] = useState( 'individual' );
	const [ itemBorderRadiusControl, setItemBorderRadiusControl ] = useState( 'linked' );
	const [ itemPaddingControl, setItemPaddingControl ] = useState( 'linked' );
	const [ previewExpired, setPreviewExpired ] = useState( false );
	const [ activeTab, setActiveTab ] = useState( 'general' );

	const paddingMouseOver = mouseOverVisualizer();
	const marginMouseOver = mouseOverVisualizer();

	let dateSettings = {};

	const getTimestamp = ( value, theTimeOffset ) => {
		const userTimezoneOffset = -1 * ( new Date().getTimezoneOffset() / 60 );
		if ( Number( theTimeOffset ) === userTimezoneOffset ) {
			return new Date( value ).getTime();
		}
		return timezoneShifter( value, theTimeOffset );
	};

	const timezoneShifter = ( value, theTimeOffset ) => {
		// Get the timezone offset of current site user.
		const userTimezoneOffset = -1 * ( new Date().getTimezoneOffset() / 60 );
		// Get the difference in offset from the sites set timezone.
		const shiftDiff = ( userTimezoneOffset - theTimeOffset );
		// Get the date in the timezone of the user.
		const currentDate = new Date( value );
		// Shift that date the difference in timezones from the user to the site.
		return new Date( currentDate.getTime() + ( shiftDiff * 60 * 60 * 1000 ) ).getTime();
	};

	const countdownTypes = applyFilters( 'base.countdownTypes', typeOptions );
	const countdownActions = applyFilters( 'base.countdownActions', actionOptions );
	dateSettings = getDateSettings();
	// To know if the current timezone is a 12 hour time with look for "a" in the time format
	// We also make sure this a is not escaped by a "/"
	const is12HourTime = /a(?!\\)/i.test(
		dateSettings.formats.time
			.toLowerCase() // Test only the lower case a
			.replace( /\\\\/g, '' ) // Replace "//" with empty strings
			.split( '' )
			.reverse()
			.join( '' ), // Reverse the string and test for "a" not followed by a slash
	);
	const saveUnits = ( value ) => {
		const newUpdate = units.map( ( item, index ) => {
			if ( 0 === index ) {
				item = { ...item, ...value };
			}
			return item;
		} );
		setAttributes( {
			units: newUpdate,
		} );
	};
	const saveDate = ( value ) => {
		const theTimezone = get( dateSettings, ['timezone', 'string' ], '');
		const theTimeOffset = get( dateSettings, ['timezone', 'offset' ], 0);

		const theSiteTimezoneTimestamp = getTimestamp( value, theTimeOffset );
		setAttributes( {
			date      : value,
			timestamp : theSiteTimezoneTimestamp,
			timezone  : theTimezone,
			timeOffset: theTimeOffset,
		} );
	};
	const getEverGreenTimestamp = ( value ) => {
		const newDate = new Date();
		newDate.setTime( newDate.getTime() + ( Number( value ) * 60 * 60 * 1000 ) );
		newDate.setTime( newDate.getTime() + ( ( evergreenMinutes ? Number( evergreenMinutes ) : 0 ) * 60 * 1000 ) );
		return newDate.getTime();
	};
	const saveEvergreenHours = ( value ) => {
		const theEvergreenTimeStamp = getEverGreenTimestamp( value );
		setAttributes( {
			evergreenHours: value,
			timestamp     : theEvergreenTimeStamp,
		} );
	};
	const getEverGreenMinTimestamp = ( value ) => {
		const newDate = new Date();
		newDate.setTime( newDate.getTime() + ( ( evergreenHours ? Number( evergreenHours ) : 0 ) * 60 * 60 * 1000 ) );
		newDate.setTime( newDate.getTime() + ( Number( value ) * 60 * 1000 ) );
		return newDate.getTime();
	};
	const saveEvergreenMinutes = ( value ) => {
		const theEvergreenTimeStamp = getEverGreenMinTimestamp( value );
		setAttributes( {
			evergreenMinutes: value,
			timestamp       : theEvergreenTimeStamp,
		} );
	};
	const saveNumberFont = ( value ) => {
		const newUpdate = numberFont.map( ( item, index ) => {
			if ( 0 === index ) {
				item = { ...item, ...value };
			}
			return item;
		} );
		setAttributes( {
			numberFont: newUpdate,
		} );
	};
	const saveLabelFont = ( value ) => {
		const newUpdate = labelFont.map( ( item, index ) => {
			if ( 0 === index ) {
				item = { ...item, ...value };
			}
			return item;
		} );
		setAttributes( {
			labelFont: newUpdate,
		} );
	};
	const savePreFont = ( value ) => {
		const newUpdate = preLabelFont.map( ( item, index ) => {
			if ( 0 === index ) {
				item = { ...item, ...value };
			}
			return item;
		} );
		setAttributes( {
			preLabelFont: newUpdate,
		} );
	};
	const savePostFont = ( value ) => {
		const newUpdate = postLabelFont.map( ( item, index ) => {
			if ( 0 === index ) {
				item = { ...item, ...value };
			}
			return item;
		} );
		setAttributes( {
			postLabelFont: newUpdate,
		} );
	};
	const numberConfigSettings = {
		google: {
			families: [ ( undefined !== numberFont && undefined !== numberFont[ 0 ] && undefined !== numberFont[ 0 ].family && '' !== numberFont[ 0 ].family && numberFont[ 0 ].google ? numberFont[ 0 ].family : '' ) + ( undefined !== numberFont && undefined !== numberFont[ 0 ] && undefined !== numberFont[ 0 ].variant && '' !== numberFont[ 0 ].variant ? ':' + numberFont[ 0 ].variant : '' ) ],
		},
	};
	const labelConfigSettings = {
		google: {
			families: [ ( undefined !== labelFont && undefined !== labelFont[ 0 ] && undefined !== labelFont[ 0 ].family && '' !== labelFont[ 0 ].family && labelFont[ 0 ].google ? labelFont[ 0 ].family : '' ) + ( undefined !== labelFont && undefined !== labelFont[ 0 ] && undefined !== labelFont[ 0 ].variant && '' !== labelFont[ 0 ].variant ? ':' + labelFont[ 0 ].variant : '' ) ],
		},
	};
	const preLabelConfigSettings = {
		google: {
			families: [ ( undefined !== preLabelFont && undefined !== preLabelFont[ 0 ] && undefined !== preLabelFont[ 0 ].family && '' !== preLabelFont[ 0 ].family && preLabelFont[ 0 ].google ? preLabelFont[ 0 ].family : '' ) + ( undefined !== preLabelFont && undefined !== preLabelFont[ 0 ] && undefined !== preLabelFont[ 0 ].variant && '' !== preLabelFont[ 0 ].variant ? ':' + preLabelFont[ 0 ].variant : '' ) ],
		},
	};
	const postLabelConfigSettings = {
		google: {
			families: [ ( undefined !== postLabelFont && undefined !== postLabelFont[ 0 ] && undefined !== postLabelFont[ 0 ].family && '' !== postLabelFont[ 0 ].family && postLabelFont[ 0 ].google ? postLabelFont[ 0 ].family : '' ) + ( undefined !== postLabelFont && undefined !== postLabelFont[ 0 ] && undefined !== postLabelFont[ 0 ].variant && '' !== postLabelFont[ 0 ].variant ? ':' + postLabelFont[ 0 ].variant : '' ) ],
		},
	};
	const numberConfig = ( undefined !== numberFont && undefined !== numberFont[ 0 ] && undefined !== numberFont[ 0 ].family && '' !== numberFont[ 0 ].family && numberFont[ 0 ].google ? numberConfigSettings : '' );
	const labelConfig = ( undefined !== labelFont && undefined !== labelFont[ 0 ] && undefined !== labelFont[ 0 ].family && '' !== labelFont[ 0 ].family && labelFont[ 0 ].google ? labelConfigSettings : '' );
	const preLabelConfig = ( undefined !== preLabelFont && undefined !== preLabelFont[ 0 ] && undefined !== preLabelFont[ 0 ].family && '' !== preLabelFont[ 0 ].family && preLabelFont[ 0 ].google ? preLabelConfigSettings : '' );
	const postLabelConfig = ( undefined !== postLabelFont && undefined !== postLabelFont[ 0 ] && undefined !== postLabelFont[ 0 ].family && '' !== postLabelFont[ 0 ].family && postLabelFont[ 0 ].google ? postLabelConfigSettings : '' );
	const templateWithTimer = ( 'message' === expireAction ? COUNTDOWN_TEMPLATE_WITH_MESSAGE : COUNTDOWN_TEMPLATE );
	const templateNoTimer = ( 'message' === expireAction ? COUNTDOWN_NO_TIMER_WITH_MESSAGE : COUNTDOWN_NO_TIMER );
	const marginMin = ( marginType === 'em' || marginType === 'rem' ? -25 : -400 );
	const marginMax = ( marginType === 'em' || marginType === 'rem' ? 25 : 400 );
	const marginStep = ( marginType === 'em' || marginType === 'rem' ? 0.1 : 1 );
	const paddingMin = ( paddingType === 'em' || paddingType === 'rem' ? 0 : 0 );
	const paddingMax = ( paddingType === 'em' || paddingType === 'rem' ? 25 : 400 );
	const paddingStep = ( paddingType === 'em' || paddingType === 'rem' ? 0.1 : 1 );
	const previewPaddingType = ( undefined !== paddingType ? paddingType : 'px' );
	const itemPaddingMin = ( itemPaddingType === 'em' || itemPaddingType === 'rem' ? 0 : 0 );
	const itemPaddingMax = ( itemPaddingType === 'em' || itemPaddingType === 'rem' ? 12 : 200 );
	const itemPaddingStep = ( itemPaddingType === 'em' || itemPaddingType === 'rem' ? 0.1 : 1 );
	const previewItemPaddingType = ( undefined !== itemPaddingType ? itemPaddingType : 'px' );
	const previewMarginType = ( undefined !== marginType ? marginType : 'px' );
	const previewMarginTop = getPreviewSize( getPreviewDevice, ( undefined !== containerMargin && undefined !== containerMargin[ 0 ] ? containerMargin[ 0 ] : '' ), ( undefined !== containerTabletMargin && undefined !== containerTabletMargin[ 0 ] ? containerTabletMargin[ 0 ] : '' ), ( undefined !== containerMobileMargin && undefined !== containerMobileMargin[ 0 ] ? containerMobileMargin[ 0 ] : '' ) );
	const previewMarginRight = getPreviewSize( getPreviewDevice, ( undefined !== containerMargin && undefined !== containerMargin[ 1 ] ? containerMargin[ 1 ] : '' ), ( undefined !== containerTabletMargin && undefined !== containerTabletMargin[ 1 ] ? containerTabletMargin[ 1 ] : '' ), ( undefined !== containerMobileMargin && undefined !== containerMobileMargin[ 1 ] ? containerMobileMargin[ 1 ] : '' ) );
	const previewMarginBottom = getPreviewSize( getPreviewDevice, ( undefined !== containerMargin && undefined !== containerMargin[ 2 ] ? containerMargin[ 2 ] : '' ), ( undefined !== containerTabletMargin && undefined !== containerTabletMargin[ 2 ] ? containerTabletMargin[ 2 ] : '' ), ( undefined !== containerMobileMargin && undefined !== containerMobileMargin[ 2 ] ? containerMobileMargin[ 2 ] : '' ) );
	const previewMarginLeft = getPreviewSize( getPreviewDevice, ( undefined !== containerMargin && undefined !== containerMargin[ 3 ] ? containerMargin[ 3 ] : '' ), ( undefined !== containerTabletMargin && undefined !== containerTabletMargin[ 3 ] ? containerTabletMargin[ 3 ] : '' ), ( undefined !== containerMobileMargin && undefined !== containerMobileMargin[ 3 ] ? containerMobileMargin[ 3 ] : '' ) );
	const previewPaddingTop = getPreviewSize( getPreviewDevice, ( undefined !== containerPadding && undefined !== containerPadding[ 0 ] ? containerPadding[ 0 ] : '' ), ( undefined !== containerTabletPadding && undefined !== containerTabletPadding[ 0 ] ? containerTabletPadding[ 0 ] : '' ), ( undefined !== containerMobilePadding && undefined !== containerMobilePadding[ 0 ] ? containerMobilePadding[ 0 ] : '' ) );
	const previewPaddingRight = getPreviewSize( getPreviewDevice, ( undefined !== containerPadding && undefined !== containerPadding[ 1 ] ? containerPadding[ 1 ] : '' ), ( undefined !== containerTabletPadding && undefined !== containerTabletPadding[ 1 ] ? containerTabletPadding[ 1 ] : '' ), ( undefined !== containerMobilePadding && undefined !== containerMobilePadding[ 1 ] ? containerMobilePadding[ 1 ] : '' ) );
	const previewPaddingBottom = getPreviewSize( getPreviewDevice, ( undefined !== containerPadding && undefined !== containerPadding[ 2 ] ? containerPadding[ 2 ] : '' ), ( undefined !== containerTabletPadding && undefined !== containerTabletPadding[ 2 ] ? containerTabletPadding[ 2 ] : '' ), ( undefined !== containerMobilePadding && undefined !== containerMobilePadding[ 2 ] ? containerMobilePadding[ 2 ] : '' ) );
	const previewPaddingLeft = getPreviewSize( getPreviewDevice, ( undefined !== containerPadding && undefined !== containerPadding[ 3 ] ? containerPadding[ 3 ] : '' ), ( undefined !== containerTabletPadding && undefined !== containerTabletPadding[ 3 ] ? containerTabletPadding[ 3 ] : '' ), ( undefined !== containerMobilePadding && undefined !== containerMobilePadding[ 3 ] ? containerMobilePadding[ 3 ] : '' ) );
	const previewBorderTop = getPreviewSize( getPreviewDevice, ( undefined !== borderWidth ? borderWidth[ 0 ] : '' ), ( undefined !== tabletBorderWidth ? tabletBorderWidth[ 0 ] : '' ), ( undefined !== mobileBorderWidth ? mobileBorderWidth[ 0 ] : '' ) );
	const previewBorderRight = getPreviewSize( getPreviewDevice, ( undefined !== borderWidth ? borderWidth[ 1 ] : '' ), ( undefined !== tabletBorderWidth ? tabletBorderWidth[ 1 ] : '' ), ( undefined !== mobileBorderWidth ? mobileBorderWidth[ 1 ] : '' ) );
	const previewBorderBottom = getPreviewSize( getPreviewDevice, ( undefined !== borderWidth ? borderWidth[ 2 ] : '' ), ( undefined !== tabletBorderWidth ? tabletBorderWidth[ 2 ] : '' ), ( undefined !== mobileBorderWidth ? mobileBorderWidth[ 2 ] : '' ) );
	const previewBorderLeft = getPreviewSize( getPreviewDevice, ( undefined !== borderWidth ? borderWidth[ 3 ] : '' ), ( undefined !== tabletBorderWidth ? tabletBorderWidth[ 3 ] : '' ), ( undefined !== mobileBorderWidth ? mobileBorderWidth[ 3 ] : '' ) );

	const previewItemPaddingTop = getPreviewSize( getPreviewDevice, ( undefined !== itemPadding && undefined !== itemPadding[ 0 ] ? itemPadding[ 0 ] : '' ), ( undefined !== itemTabletPadding && undefined !== itemTabletPadding[ 0 ] ? itemTabletPadding[ 0 ] : '' ), ( undefined !== itemMobilePadding && undefined !== itemMobilePadding[ 0 ] ? itemMobilePadding[ 0 ] : '' ) );
	const previewItemPaddingRight = getPreviewSize( getPreviewDevice, ( undefined !== itemPadding && undefined !== itemPadding[ 1 ] ? itemPadding[ 1 ] : '' ), ( undefined !== itemTabletPadding && undefined !== itemTabletPadding[ 1 ] ? itemTabletPadding[ 1 ] : '' ), ( undefined !== itemMobilePadding && undefined !== itemMobilePadding[ 1 ] ? itemMobilePadding[ 1 ] : '' ) );
	const previewItemPaddingBottom = getPreviewSize( getPreviewDevice, ( undefined !== itemPadding && undefined !== itemPadding[ 2 ] ? itemPadding[ 2 ] : '' ), ( undefined !== itemTabletPadding && undefined !== itemTabletPadding[ 2 ] ? itemTabletPadding[ 2 ] : '' ), ( undefined !== itemMobilePadding && undefined !== itemMobilePadding[ 2 ] ? itemMobilePadding[ 2 ] : '' ) );
	const previewItemPaddingLeft = getPreviewSize( getPreviewDevice, ( undefined !== itemPadding && undefined !== itemPadding[ 3 ] ? itemPadding[ 3 ] : '' ), ( undefined !== itemTabletPadding && undefined !== itemTabletPadding[ 3 ] ? itemTabletPadding[ 3 ] : '' ), ( undefined !== itemMobilePadding && undefined !== itemMobilePadding[ 3 ] ? itemMobilePadding[ 3 ] : '' ) );
	const previewItemBorderTop = getPreviewSize( getPreviewDevice, ( undefined !== itemBorderWidth ? itemBorderWidth[ 0 ] : '' ), ( undefined !== itemTabletBorderWidth ? itemTabletBorderWidth[ 0 ] : '' ), ( undefined !== itemMobileBorderWidth ? itemMobileBorderWidth[ 0 ] : '' ) );
	const previewItemBorderRight = getPreviewSize( getPreviewDevice, ( undefined !== itemBorderWidth ? itemBorderWidth[ 1 ] : '' ), ( undefined !== itemTabletBorderWidth ? itemTabletBorderWidth[ 1 ] : '' ), ( undefined !== itemMobileBorderWidth ? itemMobileBorderWidth[ 1 ] : '' ) );
	const previewItemBorderBottom = getPreviewSize( getPreviewDevice, ( undefined !== itemBorderWidth ? itemBorderWidth[ 2 ] : '' ), ( undefined !== itemTabletBorderWidth ? itemTabletBorderWidth[ 2 ] : '' ), ( undefined !== itemMobileBorderWidth ? itemMobileBorderWidth[ 2 ] : '' ) );
	const previewItemBorderLeft = getPreviewSize( getPreviewDevice, ( undefined !== itemBorderWidth ? itemBorderWidth[ 3 ] : '' ), ( undefined !== itemTabletBorderWidth ? itemTabletBorderWidth[ 3 ] : '' ), ( undefined !== itemMobileBorderWidth ? itemMobileBorderWidth[ 3 ] : '' ) );

	const previewNumberSizeType = ( undefined !== numberFont && undefined !== numberFont[ 0 ] && '' !== numberFont[ 0 ].sizeType ? numberFont[ 0 ].sizeType : 'px' );
	const previewNumberLineType = ( undefined !== numberFont && undefined !== numberFont[ 0 ] && '' !== numberFont[ 0 ].lineType ? numberFont[ 0 ].lineType : 'px' );
	const previewNumberLetterType = ( undefined !== numberFont && undefined !== numberFont[ 0 ] && '' !== numberFont[ 0 ].letterType ? numberFont[ 0 ].letterType : 'px' );
	const previewNumberFontSize = getPreviewSize( getPreviewDevice, ( undefined !== numberFont && undefined !== numberFont[ 0 ] && undefined !== numberFont[ 0 ].size && undefined !== numberFont[ 0 ].size[ 0 ] && '' !== numberFont[ 0 ].size[ 0 ] ? numberFont[ 0 ].size[ 0 ] : '' ), ( undefined !== numberFont && undefined !== numberFont[ 0 ] && undefined !== numberFont[ 0 ].size && undefined !== numberFont[ 0 ].size[ 1 ] && '' !== numberFont[ 0 ].size[ 1 ] ? numberFont[ 0 ].size[ 1 ] : '' ), ( undefined !== numberFont && undefined !== numberFont[ 0 ] && undefined !== numberFont[ 0 ].size && undefined !== numberFont[ 0 ].size[ 2 ] && '' !== numberFont[ 0 ].size[ 2 ] ? numberFont[ 0 ].size[ 2 ] : '' ) );
	const previewNumberLineSize = getPreviewSize( getPreviewDevice, ( undefined !== numberFont && undefined !== numberFont[ 0 ] && undefined !== numberFont[ 0 ].lineHeight && undefined !== numberFont[ 0 ].lineHeight[ 0 ] && '' !== numberFont[ 0 ].lineHeight[ 0 ] ? numberFont[ 0 ].lineHeight[ 0 ] : '' ), ( undefined !== numberFont && undefined !== numberFont[ 0 ] && undefined !== numberFont[ 0 ].lineHeight && undefined !== numberFont[ 0 ].lineHeight[ 1 ] && '' !== numberFont[ 0 ].lineHeight[ 1 ] ? numberFont[ 0 ].lineHeight[ 1 ] : '' ), ( undefined !== numberFont && undefined !== numberFont[ 0 ] && undefined !== numberFont[ 0 ].lineHeight && undefined !== numberFont[ 0 ].lineHeight[ 2 ] && '' !== numberFont[ 0 ].lineHeight[ 2 ] ? numberFont[ 0 ].lineHeight[ 2 ] : '' ) );
	const previewNumberLetterSize = getPreviewSize( getPreviewDevice, ( undefined !== numberFont && undefined !== numberFont[ 0 ] && undefined !== numberFont[ 0 ].letterSpacing && undefined !== numberFont[ 0 ].letterSpacing[ 0 ] && '' !== numberFont[ 0 ].letterSpacing[ 0 ] ? numberFont[ 0 ].letterSpacing[ 0 ] : '' ), ( undefined !== numberFont && undefined !== numberFont[ 0 ] && undefined !== numberFont[ 0 ].letterSpacing && undefined !== numberFont[ 0 ].letterSpacing[ 1 ] && '' !== numberFont[ 0 ].letterSpacing[ 1 ] ? numberFont[ 0 ].letterSpacing[ 1 ] : '' ), ( undefined !== numberFont && undefined !== numberFont[ 0 ] && undefined !== numberFont[ 0 ].letterSpacing && undefined !== numberFont[ 0 ].letterSpacing[ 2 ] && '' !== numberFont[ 0 ].letterSpacing[ 2 ] ? numberFont[ 0 ].letterSpacing[ 2 ] : '' ) );
	const previewLabelSizeType = ( undefined !== labelFont && undefined !== labelFont[ 0 ] && '' !== labelFont[ 0 ].sizeType ? labelFont[ 0 ].sizeType : 'px' );
	const previewLabelLineType = ( undefined !== labelFont && undefined !== labelFont[ 0 ] && '' !== labelFont[ 0 ].lineType ? labelFont[ 0 ].lineType : 'px' );
	const previewLabelLetterType = ( undefined !== labelFont && undefined !== labelFont[ 0 ] && '' !== labelFont[ 0 ].letterType ? labelFont[ 0 ].letterType : 'px' );
	const previewLabelFontSize = getPreviewSize( getPreviewDevice, ( undefined !== labelFont && undefined !== labelFont[ 0 ] && undefined !== labelFont[ 0 ].size && undefined !== labelFont[ 0 ].size[ 0 ] && '' !== labelFont[ 0 ].size[ 0 ] ? labelFont[ 0 ].size[ 0 ] : '' ), ( undefined !== labelFont && undefined !== labelFont[ 0 ] && undefined !== labelFont[ 0 ].size && undefined !== labelFont[ 0 ].size[ 1 ] && '' !== labelFont[ 0 ].size[ 1 ] ? labelFont[ 0 ].size[ 1 ] : '' ), ( undefined !== labelFont && undefined !== labelFont[ 0 ] && undefined !== labelFont[ 0 ].size && undefined !== labelFont[ 0 ].size[ 2 ] && '' !== labelFont[ 0 ].size[ 2 ] ? labelFont[ 0 ].size[ 2 ] : '' ) );
	const previewLabelLineSize = getPreviewSize( getPreviewDevice, ( undefined !== labelFont && undefined !== labelFont[ 0 ] && undefined !== labelFont[ 0 ].lineHeight && undefined !== labelFont[ 0 ].lineHeight[ 0 ] && '' !== labelFont[ 0 ].lineHeight[ 0 ] ? labelFont[ 0 ].lineHeight[ 0 ] : '' ), ( undefined !== labelFont && undefined !== labelFont[ 0 ] && undefined !== labelFont[ 0 ].lineHeight && undefined !== labelFont[ 0 ].lineHeight[ 1 ] && '' !== labelFont[ 0 ].lineHeight[ 1 ] ? labelFont[ 0 ].lineHeight[ 1 ] : '' ), ( undefined !== labelFont && undefined !== labelFont[ 0 ] && undefined !== labelFont[ 0 ].lineHeight && undefined !== labelFont[ 0 ].lineHeight[ 2 ] && '' !== labelFont[ 0 ].lineHeight[ 2 ] ? labelFont[ 0 ].lineHeight[ 2 ] : '' ) );
	const previewLabelLetterSize = getPreviewSize( getPreviewDevice, ( undefined !== labelFont && undefined !== labelFont[ 0 ] && undefined !== labelFont[ 0 ].letterSpacing && undefined !== labelFont[ 0 ].letterSpacing[ 0 ] && '' !== labelFont[ 0 ].letterSpacing[ 0 ] ? labelFont[ 0 ].letterSpacing[ 0 ] : '' ), ( undefined !== labelFont && undefined !== labelFont[ 0 ] && undefined !== labelFont[ 0 ].letterSpacing && undefined !== labelFont[ 0 ].letterSpacing[ 1 ] && '' !== labelFont[ 0 ].letterSpacing[ 1 ] ? labelFont[ 0 ].letterSpacing[ 1 ] : '' ), ( undefined !== labelFont && undefined !== labelFont[ 0 ] && undefined !== labelFont[ 0 ].letterSpacing && undefined !== labelFont[ 0 ].letterSpacing[ 2 ] && '' !== labelFont[ 0 ].letterSpacing[ 2 ] ? labelFont[ 0 ].letterSpacing[ 2 ] : '' ) );
	const previewPreLabelSizeType = ( undefined !== preLabelFont && undefined !== preLabelFont[ 0 ] && '' !== preLabelFont[ 0 ].sizeType ? preLabelFont[ 0 ].sizeType : 'px' );
	const previewPreLabelLineType = ( undefined !== preLabelFont && undefined !== preLabelFont[ 0 ] && '' !== preLabelFont[ 0 ].lineType ? preLabelFont[ 0 ].lineType : 'px' );
	const previewPreLabelLetterType = ( undefined !== preLabelFont && undefined !== preLabelFont[ 0 ] && '' !== preLabelFont[ 0 ].letterType ? preLabelFont[ 0 ].letterType : 'px' );
	const previewPreLabelFontSize = getPreviewSize( getPreviewDevice, ( undefined !== preLabelFont && undefined !== preLabelFont[ 0 ] && undefined !== preLabelFont[ 0 ].size && undefined !== preLabelFont[ 0 ].size[ 0 ] && '' !== preLabelFont[ 0 ].size[ 0 ] ? preLabelFont[ 0 ].size[ 0 ] : '' ), ( undefined !== preLabelFont && undefined !== preLabelFont[ 0 ] && undefined !== preLabelFont[ 0 ].size && undefined !== preLabelFont[ 0 ].size[ 1 ] && '' !== preLabelFont[ 0 ].size[ 1 ] ? preLabelFont[ 0 ].size[ 1 ] : '' ), ( undefined !== preLabelFont && undefined !== preLabelFont[ 0 ] && undefined !== preLabelFont[ 0 ].size && undefined !== preLabelFont[ 0 ].size[ 2 ] && '' !== preLabelFont[ 0 ].size[ 2 ] ? preLabelFont[ 0 ].size[ 2 ] : '' ) );
	const previewPreLabelLineSize = getPreviewSize( getPreviewDevice, ( undefined !== preLabelFont && undefined !== preLabelFont[ 0 ] && undefined !== preLabelFont[ 0 ].lineHeight && undefined !== preLabelFont[ 0 ].lineHeight[ 0 ] && '' !== preLabelFont[ 0 ].lineHeight[ 0 ] ? preLabelFont[ 0 ].lineHeight[ 0 ] : '' ), ( undefined !== preLabelFont && undefined !== preLabelFont[ 0 ] && undefined !== preLabelFont[ 0 ].lineHeight && undefined !== preLabelFont[ 0 ].lineHeight[ 1 ] && '' !== preLabelFont[ 0 ].lineHeight[ 1 ] ? preLabelFont[ 0 ].lineHeight[ 1 ] : '' ), ( undefined !== preLabelFont && undefined !== preLabelFont[ 0 ] && undefined !== preLabelFont[ 0 ].lineHeight && undefined !== preLabelFont[ 0 ].lineHeight[ 2 ] && '' !== preLabelFont[ 0 ].lineHeight[ 2 ] ? preLabelFont[ 0 ].lineHeight[ 2 ] : '' ) );
	const previewPreLabelLetterSize = getPreviewSize( getPreviewDevice, ( undefined !== preLabelFont && undefined !== preLabelFont[ 0 ] && undefined !== preLabelFont[ 0 ].letterSpacing && undefined !== preLabelFont[ 0 ].letterSpacing[ 0 ] && '' !== preLabelFont[ 0 ].letterSpacing[ 0 ] ? preLabelFont[ 0 ].letterSpacing[ 0 ] : '' ), ( undefined !== preLabelFont && undefined !== preLabelFont[ 0 ] && undefined !== preLabelFont[ 0 ].letterSpacing && undefined !== preLabelFont[ 0 ].letterSpacing[ 1 ] && '' !== preLabelFont[ 0 ].letterSpacing[ 1 ] ? preLabelFont[ 0 ].letterSpacing[ 1 ] : '' ), ( undefined !== preLabelFont && undefined !== preLabelFont[ 0 ] && undefined !== preLabelFont[ 0 ].letterSpacing && undefined !== preLabelFont[ 0 ].letterSpacing[ 2 ] && '' !== preLabelFont[ 0 ].letterSpacing[ 2 ] ? preLabelFont[ 0 ].letterSpacing[ 2 ] : '' ) );
	const previewPostLabelSizeType = ( undefined !== postLabelFont && undefined !== postLabelFont[ 0 ] && '' !== postLabelFont[ 0 ].sizeType ? postLabelFont[ 0 ].sizeType : 'px' );
	const previewPostLabelLineType = ( undefined !== postLabelFont && undefined !== postLabelFont[ 0 ] && '' !== postLabelFont[ 0 ].lineType ? postLabelFont[ 0 ].lineType : 'px' );
	const previewPostLabelLetterType = ( undefined !== postLabelFont && undefined !== postLabelFont[ 0 ] && '' !== postLabelFont[ 0 ].letterType ? postLabelFont[ 0 ].letterType : 'px' );
	const previewPostLabelFontSize = getPreviewSize( getPreviewDevice, ( undefined !== postLabelFont && undefined !== postLabelFont[ 0 ] && undefined !== postLabelFont[ 0 ].size && undefined !== postLabelFont[ 0 ].size[ 0 ] && '' !== postLabelFont[ 0 ].size[ 0 ] ? postLabelFont[ 0 ].size[ 0 ] : '' ), ( undefined !== postLabelFont && undefined !== postLabelFont[ 0 ] && undefined !== postLabelFont[ 0 ].size && undefined !== postLabelFont[ 0 ].size[ 1 ] && '' !== postLabelFont[ 0 ].size[ 1 ] ? postLabelFont[ 0 ].size[ 1 ] : '' ), ( undefined !== postLabelFont && undefined !== postLabelFont[ 0 ] && undefined !== postLabelFont[ 0 ].size && undefined !== postLabelFont[ 0 ].size[ 2 ] && '' !== postLabelFont[ 0 ].size[ 2 ] ? postLabelFont[ 0 ].size[ 2 ] : '' ) );
	const previewPostLabelLineSize = getPreviewSize( getPreviewDevice, ( undefined !== postLabelFont && undefined !== postLabelFont[ 0 ] && undefined !== postLabelFont[ 0 ].lineHeight && undefined !== postLabelFont[ 0 ].lineHeight[ 0 ] && '' !== postLabelFont[ 0 ].lineHeight[ 0 ] ? postLabelFont[ 0 ].lineHeight[ 0 ] : '' ), ( undefined !== postLabelFont && undefined !== postLabelFont[ 0 ] && undefined !== postLabelFont[ 0 ].lineHeight && undefined !== postLabelFont[ 0 ].lineHeight[ 1 ] && '' !== postLabelFont[ 0 ].lineHeight[ 1 ] ? postLabelFont[ 0 ].lineHeight[ 1 ] : '' ), ( undefined !== postLabelFont && undefined !== postLabelFont[ 0 ] && undefined !== postLabelFont[ 0 ].lineHeight && undefined !== postLabelFont[ 0 ].lineHeight[ 2 ] && '' !== postLabelFont[ 0 ].lineHeight[ 2 ] ? postLabelFont[ 0 ].lineHeight[ 2 ] : '' ) );
	const previewPostLabelLetterSize = getPreviewSize( getPreviewDevice, ( undefined !== postLabelFont && undefined !== postLabelFont[ 0 ] && undefined !== postLabelFont[ 0 ].letterSpacing && undefined !== postLabelFont[ 0 ].letterSpacing[ 0 ] && '' !== postLabelFont[ 0 ].letterSpacing[ 0 ] ? postLabelFont[ 0 ].letterSpacing[ 0 ] : '' ), ( undefined !== postLabelFont && undefined !== postLabelFont[ 0 ] && undefined !== postLabelFont[ 0 ].letterSpacing && undefined !== postLabelFont[ 0 ].letterSpacing[ 1 ] && '' !== postLabelFont[ 0 ].letterSpacing[ 1 ] ? postLabelFont[ 0 ].letterSpacing[ 1 ] : '' ), ( undefined !== postLabelFont && undefined !== postLabelFont[ 0 ] && undefined !== postLabelFont[ 0 ].letterSpacing && undefined !== postLabelFont[ 0 ].letterSpacing[ 2 ] && '' !== postLabelFont[ 0 ].letterSpacing[ 2 ] ? postLabelFont[ 0 ].letterSpacing[ 2 ] : '' ) );
	const classes = classnames( {
		'bsb-countdown-container'                            : true,
		[ `bsb-countdown-container-${uniqueID}` ]            : uniqueID,
		[ `bsb-countdown-timer-layout-${timerLayout}` ]      : timerLayout && enableTimer,
		'bsb-countdown-enable-dividers'                      : 'inline' !== timerLayout && countdownDivider && enableTimer,
		'bsb-countdown-has-timer'                            : enableTimer,
		'bsb-countdown-preview-expired'                      : previewExpired,
		[ `bsb-countdown-align-${counterAlign[ 0 ]}` ]       : ( undefined !== counterAlign && undefined !== counterAlign[ 0 ] && enableTimer ? counterAlign[ 0 ] : false ),
		[ `bsb-countdown-align-tablet-${counterAlign[ 1 ]}` ]: ( undefined !== counterAlign && undefined !== counterAlign[ 1 ] && enableTimer ? counterAlign[ 1 ] : false ),
		[ `bsb-countdown-align-mobile-${counterAlign[ 2 ]}` ]: ( undefined !== counterAlign && undefined !== counterAlign[ 2 ] && enableTimer ? counterAlign[ 2 ] : false ),
		'kvs-lg-false'                                      : vsdesk !== 'undefined' && vsdesk,
		'kvs-md-false'                                      : vstablet !== 'undefined' && vstablet,
		'kvs-sm-false'                                      : vsmobile !== 'undefined' && vsmobile,
		[ className ]                                       : className,
	} );
	if ( isNested && parentBlock ) {
		if ( undefined !== parentBlock.attributes.countdownType && parentBlock.attributes.countdownType !== countdownType ) {
			setAttributes( { countdownType: parentBlock.attributes.countdownType } );
		}
		if ( undefined !== parentBlock.attributes.evergreenMinutes && parentBlock.attributes.evergreenMinutes !== evergreenMinutes ) {
			setAttributes( { evergreenMinutes: parentBlock.attributes.evergreenMinutes } );
		}
		if ( undefined !== parentBlock.attributes.timeOffset && parentBlock.attributes.timeOffset !== timeOffset ) {
			setAttributes( { timeOffset: parentBlock.attributes.timeOffset } );
		}
		if ( undefined !== parentBlock.attributes.timezone && parentBlock.attributes.timezone !== timezone ) {
			setAttributes( { timezone: parentBlock.attributes.timezone } );
		}
		if ( undefined !== parentBlock.attributes.timestamp && parentBlock.attributes.timestamp !== timestamp ) {
			setAttributes( { timestamp: parentBlock.attributes.timestamp } );
		}
		if ( undefined !== parentBlock.attributes.evergreenHours && parentBlock.attributes.evergreenHours !== evergreenHours ) {
			setAttributes( { evergreenHours: parentBlock.attributes.evergreenHours } );
		}
		if ( undefined !== parentBlock.attributes.date && parentBlock.attributes.date !== date ) {
			setAttributes( { date: parentBlock.attributes.date } );
		}
		if ( undefined !== parentBlock.attributes.campaignID && parentBlock.attributes.campaignID !== campaignID ) {
			setAttributes( { campaignID: parentBlock.attributes.campaignID } );
		}
		if ( undefined !== parentBlock.attributes.evergreenReset && parentBlock.attributes.evergreenReset !== evergreenReset ) {
			setAttributes( { evergreenReset: parentBlock.attributes.evergreenReset } );
		}
		if ( undefined !== parentBlock.attributes.evergreenStrict && parentBlock.attributes.evergreenStrict !== evergreenStrict ) {
			setAttributes( { evergreenStrict: parentBlock.attributes.evergreenStrict } );
		}
	}

	const nonTransAttrs = [ 'date', 'timestamp' ];

	const blockProps = useBlockProps( {
		className: classes,
	} );

	return (
		<div {...blockProps} style={{
			background             : ( background ? BaseColorOutput( background ) : undefined ),
			borderColor            : ( border ? BaseColorOutput( border ) : undefined ),
			borderTopWidth         : ( previewBorderTop ? previewBorderTop + 'px' : undefined ),
			borderRightWidth       : ( previewBorderRight ? previewBorderRight + 'px' : undefined ),
			borderBottomWidth      : ( previewBorderBottom ? previewBorderBottom + 'px' : undefined ),
			borderLeftWidth        : ( previewBorderLeft ? previewBorderLeft + 'px' : undefined ),
			borderTopLeftRadius    : ( borderRadius && borderRadius[ 0 ] ? borderRadius[ 0 ] + 'px' : undefined ),
			borderTopRightRadius   : ( borderRadius && borderRadius[ 1 ] ? borderRadius[ 1 ] + 'px' : undefined ),
			borderBottomRightRadius: ( borderRadius && borderRadius[ 2 ] ? borderRadius[ 2 ] + 'px' : undefined ),
			borderBottomLeftRadius : ( borderRadius && borderRadius[ 3 ] ? borderRadius[ 3 ] + 'px' : undefined ),
			paddingTop             : ( '' !== previewPaddingTop ? getSpacingOptionOutput( previewPaddingTop, previewPaddingType ) : undefined ),
			paddingRight           : ( '' !== previewPaddingRight ? getSpacingOptionOutput( previewPaddingRight, previewPaddingType ) : undefined ),
			paddingBottom          : ( '' !== previewPaddingBottom ? getSpacingOptionOutput( previewPaddingBottom, previewPaddingType ) : undefined ),
			paddingLeft            : ( '' !== previewPaddingLeft ? getSpacingOptionOutput( previewPaddingLeft, previewPaddingType ) : undefined ),
			marginTop              : ( previewMarginTop ? getSpacingOptionOutput( previewMarginTop, previewMarginType ) : undefined ),
			marginRight            : ( previewMarginRight ? getSpacingOptionOutput( previewMarginRight, previewMarginType ) : undefined ),
			marginBottom           : ( previewMarginBottom ? getSpacingOptionOutput( previewMarginBottom, previewMarginType ) : undefined ),
			marginLeft             : ( previewMarginLeft ? getSpacingOptionOutput( previewMarginLeft, previewMarginType ) : undefined ),
		}}>
			<style>
				{`.bsb-countdown-container #bsb-timer-${uniqueID} .bsb-countdown-date-item .bsb-countdown-number {`}
				{( numberColor ? `color: ${BaseColorOutput( numberColor )};` : '' )}
				{( numberFont && numberFont[ 0 ] && numberFont[ 0 ].family ? `font-family: ${numberFont[ 0 ].family};` : '' )}
				{( numberFont && numberFont[ 0 ] && numberFont[ 0 ].textTransform ? `text-transform: ${numberFont[ 0 ].textTransform};` : '' )}
				{( numberFont && numberFont[ 0 ] && numberFont[ 0 ].weight ? `font-weight: ${numberFont[ 0 ].weight};` : '' )}
				{( numberFont && numberFont[ 0 ] && numberFont[ 0 ].style ? `font-style: ${numberFont[ 0 ].style};` : '' )}
				{( previewNumberFontSize ? `font-size: ${ getFontSizeOptionOutput( previewNumberFontSize, previewNumberSizeType )};` : '' )}
				{( previewNumberLineSize ? `line-height: ${previewNumberLineSize + previewNumberLineType};` : '' )}
				{( previewNumberLetterSize ? `letter-spacing: ${previewNumberLetterSize + previewNumberLetterType};` : '' )}
				{'}'}
				{`.bsb-countdown-container #bsb-timer-${uniqueID} .bsb-countdown-date-item  {`}
				{( previewNumberFontSize ? `font-size: ${ getFontSizeOptionOutput( previewNumberFontSize, previewNumberSizeType ) };` : '' )}
				{'}'}
				{`#bsb-timer-${uniqueID} .bsb-countdown-date-item .bsb-countdown-label {`}
				{( labelColor ? `color: ${BaseColorOutput( labelColor )};` : '' )}
				{( labelFont && labelFont[ 0 ] && labelFont[ 0 ].family ? `font-family: ${labelFont[ 0 ].family};` : '' )}
				{( labelFont && labelFont[ 0 ] && labelFont[ 0 ].textTransform ? `text-transform: ${labelFont[ 0 ].textTransform};` : '' )}
				{( labelFont && labelFont[ 0 ] && labelFont[ 0 ].weight ? `font-weight: ${labelFont[ 0 ].weight};` : '' )}
				{( labelFont && labelFont[ 0 ] && labelFont[ 0 ].style ? `font-style: ${labelFont[ 0 ].style};` : '' )}
				{( previewLabelFontSize ? `font-size: ${ getFontSizeOptionOutput( previewLabelFontSize, previewLabelSizeType ) };` : '' )}
				{( previewLabelLineSize ? `line-height: ${previewLabelLineSize + previewLabelLineType};` : '' )}
				{( previewLabelLetterSize ? `letter-spacing: ${previewLabelLetterSize + previewLabelLetterType};` : '' )}
				{'}'}
				{'' !== preLabel && (
					<>
						{`#bsb-timer-${uniqueID} .bsb-countdown-item.bsb-pre-timer {`}
						{( preLabelColor ? `color: ${BaseColorOutput( preLabelColor )};` : '' )}
						{( preLabelFont && preLabelFont[ 0 ] && preLabelFont[ 0 ].family ? `font-family: ${preLabelFont[ 0 ].family};` : '' )}
						{( preLabelFont && preLabelFont[ 0 ] && preLabelFont[ 0 ].textTransform ? `text-transform: ${preLabelFont[ 0 ].textTransform};` : '' )}
						{( preLabelFont && preLabelFont[ 0 ] && preLabelFont[ 0 ].weight ? `font-weight: ${preLabelFont[ 0 ].weight};` : '' )}
						{( preLabelFont && preLabelFont[ 0 ] && preLabelFont[ 0 ].style ? `font-style: ${preLabelFont[ 0 ].style};` : '' )}
						{( previewPreLabelFontSize ? `font-size: ${ getFontSizeOptionOutput( previewPreLabelFontSize, previewPreLabelSizeType ) };` : '' )}
						{( previewPreLabelLineSize ? `line-height: ${previewPreLabelLineSize + previewPreLabelLineType};` : '' )}
						{( previewPreLabelLetterSize ? `letter-spacing: ${previewPreLabelLetterSize + previewPreLabelLetterType};` : '' )}
						{'}'}
					</>
				)}
				{'' !== postLabel && (
					<>
						{`#bsb-timer-${uniqueID} .bsb-countdown-item.bsb-post-timer {`}
						{( postLabelColor ? `color: ${BaseColorOutput( postLabelColor )};` : '' )}
						{( postLabelFont && postLabelFont[ 0 ] && postLabelFont[ 0 ].family ? `font-family: ${postLabelFont[ 0 ].family};` : '' )}
						{( postLabelFont && postLabelFont[ 0 ] && postLabelFont[ 0 ].textTransform ? `text-transform: ${postLabelFont[ 0 ].textTransform};` : '' )}
						{( postLabelFont && postLabelFont[ 0 ] && postLabelFont[ 0 ].weight ? `font-weight: ${postLabelFont[ 0 ].weight};` : '' )}
						{( postLabelFont && postLabelFont[ 0 ] && postLabelFont[ 0 ].style ? `font-style: ${postLabelFont[ 0 ].style};` : '' )}
						{( previewPostLabelFontSize ? `font-size: ${ getFontSizeOptionOutput( previewPostLabelFontSize, previewPostLabelSizeType ) };` : '' )}
						{( previewPostLabelLineSize ? `line-height: ${previewPostLabelLineSize + previewPostLabelLineType};` : '' )}
						{( previewPostLabelLetterSize ? `letter-spacing: ${previewPostLabelLetterSize + previewPostLabelLetterType};` : '' )}
						{'}'}
					</>
				)}
				{`.bsb-countdown-container #bsb-timer-${uniqueID} .bsb-countdown-date-item:not( .bsb-countdown-divider-item ) {`}
				{( itemBackground ? `background: ${BaseColorOutput( itemBackground )};` : '' )}
				{( itemBorder ? `border-color: ${BaseColorOutput( itemBorder )};` : '' )}
				{( itemBorderRadius && itemBorderRadius[ 0 ] ? `border-top-left-radius: ${itemBorderRadius[ 0 ] + 'px'};` : '' )}
				{( itemBorderRadius && itemBorderRadius[ 1 ] ? `border-top-right-radius: ${itemBorderRadius[ 1 ] + 'px'};` : '' )}
				{( itemBorderRadius && itemBorderRadius[ 2 ] ? `border-bottom-right-radius: ${itemBorderRadius[ 2 ] + 'px'};` : '' )}
				{( itemBorderRadius && itemBorderRadius[ 3 ] ? `border-bottom-left-radius: ${itemBorderRadius[ 3 ] + 'px'};` : '' )}
				{( previewItemBorderTop ? `border-top-width: ${previewItemBorderTop + 'px'};` : '' )}
				{( previewItemBorderRight ? `border-right-width: ${previewItemBorderRight + 'px'};` : '' )}
				{( previewItemBorderBottom ? `border-bottom-width: ${previewItemBorderBottom + 'px'};` : '' )}
				{( previewItemBorderLeft ? `border-left-width: ${previewItemBorderLeft + 'px'};` : '' )}
				{( previewItemPaddingTop ? `padding-top: ${previewItemPaddingTop + previewItemPaddingType};` : '' )}
				{( previewItemPaddingRight ? `padding-right: ${previewItemPaddingRight + previewItemPaddingType};` : '' )}
				{( previewItemPaddingBottom ? `padding-bottom: ${previewItemPaddingBottom + previewItemPaddingType};` : '' )}
				{( previewItemPaddingLeft ? `padding-left: ${previewItemPaddingLeft + previewItemPaddingType};` : '' )}
				{'}'}
				{`.bsb-countdown-container #bsb-timer-${uniqueID} .bsb-countdown-date-item.bsb-countdown-divider-item {`}
				{( previewItemBorderTop ? `border-top-width: ${previewItemBorderTop + 'px'};` : '' )}
				{( previewItemBorderBottom ? `border-bottom-width: ${previewItemBorderBottom + 'px'};` : '' )}
				{( previewItemPaddingTop ? `padding-top: ${previewItemPaddingTop + previewItemPaddingType};` : '' )}
				{( previewItemPaddingBottom ? `padding-bottom: ${previewItemPaddingBottom + previewItemPaddingType};` : '' )}
				{'}'}
			</style>
			{showSettings( 'allSettings', 'base/countdown' ) && (
				<>
					<BlockControls>
						{enableTimer && (
							<AlignmentToolbar
								value={( undefined !== counterAlign && undefined !== counterAlign[ 0 ] ? counterAlign[ 0 ] : '' )}
								onChange={( nextAlign ) => setAttributes( { counterAlign: [ nextAlign, ( undefined !== counterAlign && undefined !== counterAlign[ 1 ] ? counterAlign[ 1 ] : '' ), ( undefined !== counterAlign && undefined !== counterAlign[ 2 ] ? counterAlign[ 2 ] : '' ) ] } )}
							/>
						)}
						{'message' === expireAction && (
							<>
								<ToolbarGroup>
									<Button
										className="components-tab-button"
										isPressed={!previewExpired}
										onClick={() => setPreviewExpired( false )}
									>
										<span>{__( 'Live', 'gutenam-blocks' )}</span>
									</Button>
									<Button
										className="components-tab-button"
										isPressed={previewExpired}
										onClick={() => setPreviewExpired( true )}
									>
										<span>{__( 'Expired', 'gutenam-blocks' )}</span>
									</Button>
								</ToolbarGroup>
							</>
						)}
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
							panelName={'countdown'}
							setActiveTab={( value ) => setActiveTab( value )}
							activeTab={activeTab}
						/>

						{( activeTab === 'general' ) &&
							<>
								<Panel
									className={'components-panel__body is-opened'}
								>
									{isNested && (
										<>
											<h2>{__( 'Countdown Time Settings Synced to Parent Block', 'gutenam-blocks' )}</h2>
											<Button
												className="bsb-select-parent-button"
												isSecondary
												onClick={() => selectBlock( parentBlock.clientId )}
											>
												<span>{__( 'Edit Settings', 'gutenam-blocks' )}</span>
											</Button>
										</>
									)}
									{!isNested && (
										<>
											<SelectControl
												label={__( 'Countdown Type', 'gutenam-blocks' )}
												options={countdownTypes}
												value={countdownType}
												onChange={( value ) => setAttributes( { countdownType: value } )}
											/>
											{'date' === countdownType && (
												<div className="components-base-control">
													<DateTimePicker
														currentDate={( !date ? undefined : date )}
														onChange={value => {
															saveDate( value );
														}}
														is12Hour={is12HourTime}
														help={__( 'Date set according to your sites timezone', 'gutenam-blocks' )}
													/>
												</div>
											)}
											{'evergreen' === countdownType && (
												<>
													<RangeControl
														label={__( 'Evergreen Hours', 'gutenam-blocks' )}
														value={evergreenHours}
														onChange={value => {
															saveEvergreenHours( value );
														}}
														min={0}
														max={100}
														step={1}
													/>
													<RangeControl
														label={__( 'Evergreen Minutes', 'gutenam-blocks' )}
														value={evergreenMinutes}
														onChange={value => {
															saveEvergreenMinutes( value );
														}}
														min={0}
														max={59}
														step={1}
													/>
													<TextControl
														label={__( 'Campaign ID' )}
														help={__( 'Create a unique ID. To reset the timer for everyone change this id. To link with other timers give them all the same ID.', 'gutenam-blocks' )}
														value={campaignID || ''}
														onChange={( nextValue ) => {
															nextValue = nextValue.replace( ANCHOR_REGEX, '-' );
															setAttributes( {
																campaignID: nextValue,
															} );
														}}
													/>
													<RangeControl
														label={__( 'Amount of days to wait until the evergreen is reset for visitors', 'gutenam-blocks' )}
														value={evergreenReset}
														onChange={value => {
															setAttributes( {
																evergreenReset: value,
															} );
														}}
														min={0}
														max={100}
														step={1}
													/>
													<ToggleControl
														label={__( 'Verify by IP Address', 'gutenam-blocks' )}
														checked={evergreenStrict}
														onChange={value => setAttributes( { evergreenStrict: value } )}
														help={__( 'This will add a delay to the rendering of the countdown if no cookie found as it will query the server database to see if the user can be found by their IP address', 'gutenam-blocks' )}
													/>
												</>
											)}
											<SelectControl
												label={__( 'Action on Expire', 'gutenam-blocks' )}
												options={countdownActions}
												value={expireAction}
												onChange={( value ) => setAttributes( { expireAction: value } )}
											/>
											{'redirect' === expireAction && (
												<>
													<URLInputControl
														label={__( 'Redirect URL', 'gutenam-blocks' )}
														url={redirectURL}
														onChangeUrl={value => setAttributes( { redirectURL: value } )}
														additionalControls={false}
													/>
												</>
											)}
											{expireAction && 'none' !== expireAction && (
												<ToggleControl
													label={__( 'Reveal onLoad', 'gutenam-blocks' )}
													checked={revealOnLoad}
													onChange={value => setAttributes( { revealOnLoad: value } )}
												/>
											)}
										</>
									)}
								</Panel>
								<BasePanelBody
									title={__( 'Countdown Layout', 'gutenam-blocks' )}
									initialOpen={false}
									panelName={'bsb-countdown-layout'}
								>
									{expireAction && 'none' !== expireAction && (
										<ToggleControl
											label={__( 'Display Countdown', 'gutenam-blocks' )}
											checked={enableTimer}
											onChange={value => setAttributes( { enableTimer: value } )}
										/>
									)}
									{enableTimer && (
										<>
											<ResponsiveAlignControls
												label={__( 'Countdown Alignment', 'gutenam-blocks' )}
												value={( undefined !== counterAlign && undefined !== counterAlign[ 0 ] ? counterAlign[ 0 ] : '' )}
												tabletValue={( undefined !== counterAlign && undefined !== counterAlign[ 1 ] ? counterAlign[ 1 ] : '' )}
												mobileValue={( undefined !== counterAlign && undefined !== counterAlign[ 2 ] ? counterAlign[ 2 ] : '' )}
												onChange={( nextAlign ) => setAttributes( { counterAlign: [ nextAlign, ( undefined !== counterAlign && undefined !== counterAlign[ 1 ] ? counterAlign[ 1 ] : '' ), ( undefined !== counterAlign && undefined !== counterAlign[ 2 ] ? counterAlign[ 2 ] : '' ) ] } )}
												onChangeTablet={( nextAlign ) => setAttributes( { counterAlign: [ ( undefined !== counterAlign && undefined !== counterAlign[ 0 ] ? counterAlign[ 0 ] : '' ), nextAlign, ( undefined !== counterAlign && undefined !== counterAlign[ 2 ] ? counterAlign[ 2 ] : '' ) ] } )}
												onChangeMobile={( nextAlign ) => setAttributes( { counterAlign: [ ( undefined !== counterAlign && undefined !== counterAlign[ 0 ] ? counterAlign[ 0 ] : '' ), ( undefined !== counterAlign && undefined !== counterAlign[ 1 ] ? counterAlign[ 1 ] : '' ), nextAlign ] } )}
											/>
											<BaseRadioButtons
												label={__( 'Countdown Layout', 'gutenam-blocks' )}
												value={timerLayout}
												options={[
													{ value: 'block', label: __( 'Block', 'gutenam-blocks' ) },
													{ value: 'inline', label: __( 'Inline', 'gutenam-blocks' ) },
												]}
												onChange={value => setAttributes( { timerLayout: value } )}
											/>
											{'inline' !== timerLayout && (
												<ToggleControl
													label={__( 'Enable Divider', 'gutenam-blocks' )}
													checked={countdownDivider}
													onChange={value => setAttributes( { countdownDivider: value } )}
												/>
											)}
											<ToggleControl
												label={__( 'Enable 00 Number format', 'gutenam-blocks' )}
												checked={timeNumbers}
												onChange={value => setAttributes( { timeNumbers: value } )}
											/>
											<TextControl
												label={__( 'Countdown Pre Text' )}
												value={preLabel}
												onChange={value => setAttributes( { preLabel: value } )}
											/>
											<TextControl
												label={__( 'Countdown Post Text' )}
												value={postLabel}
												onChange={value => setAttributes( { postLabel: value } )}
											/>
											<ToggleControl
												label={__( 'Display Days Unit', 'gutenam-blocks' )}
												checked={undefined !== units && undefined !== units[ 0 ] && undefined !== units[ 0 ].days ? units[ 0 ].days : true}
												onChange={value => saveUnits( { days: value } )}
											/>
											{undefined !== units && undefined !== units[ 0 ] && undefined !== units[ 0 ].days && !units[ 0 ].days && (
												<>
													<ToggleControl
														label={__( 'Hours', 'gutenam-blocks' )}
														checked={undefined !== units && undefined !== units[ 0 ] && undefined !== units[ 0 ].hours ? units[ 0 ].hours : true}
														onChange={value => saveUnits( { hours: value } )}
													/>
													{undefined !== units && undefined !== units[ 0 ] && undefined !== units[ 0 ].hours && !units[ 0 ].hours && (
														<>
															<ToggleControl
																label={__( 'Minutes', 'gutenam-blocks' )}
																checked={undefined !== units && undefined !== units[ 0 ] && undefined !== units[ 0 ].minutes ? units[ 0 ].minutes : true}
																onChange={value => saveUnits( { minutes: value } )}
															/>
														</>
													)}
												</>
											)}
											<h2>{__( 'Labels', 'gutenam-blocks' )}</h2>
											<TextControl
												label={__( 'Days Label' )}
												value={daysLabel}
												onChange={value => setAttributes( { daysLabel: value } )}
											/>
											<TextControl
												label={__( 'Hours Label' )}
												value={hoursLabel}
												onChange={value => setAttributes( { hoursLabel: value } )}
											/>
											<TextControl
												label={__( 'Minutes Label' )}
												value={minutesLabel}
												onChange={value => setAttributes( { minutesLabel: value } )}
											/>
											<TextControl
												label={__( 'Seconds Label' )}
												value={secondsLabel}
												onChange={value => setAttributes( { secondsLabel: value } )}
											/>
										</>
									)}
								</BasePanelBody>
							</>
						}

						{( activeTab === 'style' ) &&
							<>
							{ enableTimer && (
									<BasePanelBody
										title={__( 'Count Item Settings', 'gutenam-blocks' )}
										panelName={'itemStyle'}
										blockSlug={ 'base/countdown' }
									>
										<PopColorControl
											label={__( 'Background Color', 'gutenam-blocks' )}
											value={( itemBackground ? itemBackground : '' )}
											default={''}
											onChange={value => setAttributes( { itemBackground: value } )}
										/>
										<PopColorControl
											label={__( 'Border Color', 'gutenam-blocks' )}
											value={( itemBorder ? itemBorder : '' )}
											default={''}
											onChange={value => setAttributes( { itemBorder: value } )}
										/>
										<ResponsiveMeasurementControls
											label={__( 'Border Width', 'gutenam-blocks' )}
											value={itemBorderWidth}
											control={itemBorderWidthControl}
											tabletValue={itemTabletBorderWidth}
											mobileValue={itemMobileBorderWidth}
											onChange={( value ) => setAttributes( { itemBorderWidth: value } )}
											onChangeTablet={( value ) => setAttributes( { itemTabletBorderWidth: value } )}
											onChangeMobile={( value ) => setAttributes( { itemMobileBorderWidth: value } )}
											onChangeControl={( value ) => setItemBorderWidthControl( value )}
											min={0}
											max={40}
											step={1}
											unit={'px'}
											units={[ 'px' ]}
											showUnit={true}
											preset={[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]}
										/>
										<MeasurementControls
											label={__( 'Border Radius', 'gutenam-blocks' )}
											measurement={itemBorderRadius}
											control={itemBorderRadiusControl}
											onChange={( value ) => setAttributes( { itemBorderRadius: value } )}
											onControl={( value ) => setItemBorderRadiusControl( value )}
											min={0}
											max={200}
											step={1}
											controlTypes={[
												{ key: 'linked', name: __( 'Linked', 'gutenam-blocks' ), icon: radiusLinkedIcon },
												{ key: 'individual', name: __( 'Individual', 'gutenam-blocks' ), icon: radiusIndividualIcon },
											]}
											firstIcon={topLeftIcon}
											secondIcon={topRightIcon}
											thirdIcon={bottomRightIcon}
											fourthIcon={bottomLeftIcon}
										/>
										<ResponsiveMeasurementControls
											label={__( 'Padding', 'gutenam-blocks' )}
											value={itemPadding}
											control={itemPaddingControl}
											tabletValue={itemTabletPadding}
											mobileValue={itemMobilePadding}
											onChange={( value ) => setAttributes( { itemPadding: value } )}
											onChangeTablet={( value ) => setAttributes( { itemTabletPadding: value } )}
											onChangeMobile={( value ) => setAttributes( { itemMobilePadding: value } )}
											onChangeControl={( value ) => setItemPaddingControl( value )}
											min={itemPaddingMin}
											max={itemPaddingMax}
											step={itemPaddingStep}
											unit={itemPaddingType}
											units={[ 'px', 'em', 'rem', '%' ]}
											onUnit={( value ) => setAttributes( { itemPaddingType: value } )}
										/>
									</BasePanelBody>
								)}
								{ enableTimer && (
									<BasePanelBody
										title={__( 'Number Settings', 'gutenam-blocks' )}
										initialOpen={false}
										panelName={'numberStyle'}
										blockSlug={ 'base/countdown' }
									>
										<PopColorControl
											label={__( 'Color', 'gutenam-blocks' )}
											value={( numberColor ? numberColor : '' )}
											default={''}
											onChange={value => setAttributes( { numberColor: value } )}
										/>
										<TypographyControls
											fontGroup={'number-item'}
											fontSize={numberFont[ 0 ].size}
											onFontSize={( value ) => saveNumberFont( { size: value } )}
											fontSizeType={numberFont[ 0 ].sizeType}
											onFontSizeType={( value ) => saveNumberFont( { sizeType: value } )}
											lineHeight={numberFont[ 0 ].lineHeight}
											onLineHeight={( value ) => saveNumberFont( { lineHeight: value } )}
											lineHeightType={numberFont[ 0 ].lineType}
											onLineHeightType={( value ) => saveNumberFont( { lineType: value } )}
											reLetterSpacing={numberFont[ 0 ].letterSpacing}
											onLetterSpacing={( value ) => saveNumberFont( { letterSpacing: value } )}
											letterSpacingType={numberFont[ 0 ].letterType}
											onLetterSpacingType={( value ) => saveNumberFont( { letterType: value } )}
											textTransform={numberFont[ 0 ].textTransform}
											onTextTransform={( value ) => saveNumberFont( { textTransform: value } )}
											fontFamily={numberFont[ 0 ].family}
											onFontFamily={( value ) => saveNumberFont( { family: value } )}
											onFontChange={( select ) => {
												saveNumberFont( {
													family: select.value,
													google: select.google,
												} );
											}}
											onFontArrayChange={( values ) => saveNumberFont( values )}
											googleFont={numberFont[ 0 ].google}
											onGoogleFont={( value ) => saveNumberFont( { google: value } )}
											loadGoogleFont={numberFont[ 0 ].loadGoogle}
											onLoadGoogleFont={( value ) => saveNumberFont( { loadGoogle: value } )}
											fontVariant={numberFont[ 0 ].variant}
											onFontVariant={( value ) => saveNumberFont( { variant: value } )}
											fontWeight={numberFont[ 0 ].weight}
											onFontWeight={( value ) => saveNumberFont( { weight: value } )}
											fontStyle={numberFont[ 0 ].style}
											onFontStyle={( value ) => saveNumberFont( { style: value } )}
											fontSubset={numberFont[ 0 ].subset}
											onFontSubset={( value ) => saveNumberFont( { subset: value } )}
										/>
									</BasePanelBody>
								)}
								{ enableTimer && (
									<BasePanelBody
										title={__( 'Label Settings', 'gutenam-blocks' )}
										initialOpen={false}
										panelName={'labelStyle'}
										blockSlug={ 'base/countdown' }
									>
										<PopColorControl
											label={__( 'Color', 'gutenam-blocks' )}
											value={( labelColor ? labelColor : '' )}
											default={''}
											onChange={value => setAttributes( { labelColor: value } )}
										/>
										<TypographyControls
											fontGroup={'label-item'}
											fontSize={labelFont[ 0 ].size}
											onFontSize={( value ) => saveLabelFont( { size: value } )}
											fontSizeType={labelFont[ 0 ].sizeType}
											onFontSizeType={( value ) => saveLabelFont( { sizeType: value } )}
											lineHeight={labelFont[ 0 ].lineHeight}
											onLineHeight={( value ) => saveLabelFont( { lineHeight: value } )}
											lineHeightType={labelFont[ 0 ].lineType}
											onLineHeightType={( value ) => saveLabelFont( { lineType: value } )}
											reLetterSpacing={labelFont[ 0 ].letterSpacing}
											onLetterSpacing={( value ) => saveLabelFont( { letterSpacing: value } )}
											letterSpacingType={labelFont[ 0 ].letterType}
											onLetterSpacingType={( value ) => saveLabelFont( { letterType: value } )}
											textTransform={labelFont[ 0 ].textTransform}
											onTextTransform={( value ) => saveLabelFont( { textTransform: value } )}
											fontFamily={labelFont[ 0 ].family}
											onFontFamily={( value ) => saveLabelFont( { family: value } )}
											onFontChange={( select ) => {
												saveLabelFont( {
													family: select.value,
													google: select.google,
												} );
											}}
											onFontArrayChange={( values ) => saveLabelFont( values )}
											googleFont={labelFont[ 0 ].google}
											onGoogleFont={( value ) => saveLabelFont( { google: value } )}
											loadGoogleFont={labelFont[ 0 ].loadGoogle}
											onLoadGoogleFont={( value ) => saveLabelFont( { loadGoogle: value } )}
											fontVariant={labelFont[ 0 ].variant}
											onFontVariant={( value ) => saveLabelFont( { variant: value } )}
											fontWeight={labelFont[ 0 ].weight}
											onFontWeight={( value ) => saveLabelFont( { weight: value } )}
											fontStyle={labelFont[ 0 ].style}
											onFontStyle={( value ) => saveLabelFont( { style: value } )}
											fontSubset={labelFont[ 0 ].subset}
											onFontSubset={( value ) => saveLabelFont( { subset: value } )}
										/>
									</BasePanelBody>
								)}
								{enableTimer && '' !== preLabel && (
									<BasePanelBody
										title={__( 'Pre Text', 'gutenam-blocks' )}
										initialOpen={false}
										panelName={'bsb-countdown-pre-text'}
									>
										<PopColorControl
											label={__( 'Color', 'gutenam-blocks' )}
											value={( preLabelColor ? preLabelColor : '' )}
											default={''}
											onChange={value => setAttributes( { preLabelColor: value } )}
										/>
										<TypographyControls
											fontGroup={'prelabel-item'}
											fontSize={preLabelFont[ 0 ].size}
											onFontSize={( value ) => savePreFont( { size: value } )}
											fontSizeType={preLabelFont[ 0 ].sizeType}
											onFontSizeType={( value ) => savePreFont( { sizeType: value } )}
											lineHeight={preLabelFont[ 0 ].lineHeight}
											onLineHeight={( value ) => savePreFont( { lineHeight: value } )}
											lineHeightType={preLabelFont[ 0 ].lineType}
											onLineHeightType={( value ) => savePreFont( { lineType: value } )}
											reLetterSpacing={preLabelFont[ 0 ].letterSpacing}
											onLetterSpacing={( value ) => savePreFont( { letterSpacing: value } )}
											letterSpacingType={preLabelFont[ 0 ].letterType}
											onLetterSpacingType={( value ) => savePreFont( { letterType: value } )}
											textTransform={preLabelFont[ 0 ].textTransform}
											onTextTransform={( value ) => savePreFont( { textTransform: value } )}
											fontFamily={preLabelFont[ 0 ].family}
											onFontFamily={( value ) => savePreFont( { family: value } )}
											onFontChange={( select ) => {
												savePreFont( {
													family: select.value,
													google: select.google,
												} );
											}}
											onFontArrayChange={( values ) => savePreFont( values )}
											googleFont={preLabelFont[ 0 ].google}
											onGoogleFont={( value ) => savePreFont( { google: value } )}
											loadGoogleFont={preLabelFont[ 0 ].loadGoogle}
											onLoadGoogleFont={( value ) => savePreFont( { loadGoogle: value } )}
											fontVariant={preLabelFont[ 0 ].variant}
											onFontVariant={( value ) => savePreFont( { variant: value } )}
											fontWeight={preLabelFont[ 0 ].weight}
											onFontWeight={( value ) => savePreFont( { weight: value } )}
											fontStyle={preLabelFont[ 0 ].style}
											onFontStyle={( value ) => savePreFont( { style: value } )}
											fontSubset={preLabelFont[ 0 ].subset}
											onFontSubset={( value ) => savePreFont( { subset: value } )}
										/>
									</BasePanelBody>
								)}
								{enableTimer && '' !== postLabel && (
									<BasePanelBody
										title={__( 'Post Text', 'gutenam-blocks' )}
										initialOpen={false}
										panelName={'bsb-countdown-post-text'}
									>
										<PopColorControl
											label={__( 'Color', 'gutenam-blocks' )}
											value={( postLabelColor ? postLabelColor : '' )}
											default={''}
											onChange={value => setAttributes( { postLabelColor: value } )}
										/>
										<TypographyControls
											fontGroup={'postlabel-item'}
											fontSize={postLabelFont[ 0 ].size}
											onFontSize={( value ) => savePostFont( { size: value } )}
											fontSizeType={postLabelFont[ 0 ].sizeType}
											onFontSizeType={( value ) => savePostFont( { sizeType: value } )}
											lineHeight={postLabelFont[ 0 ].lineHeight}
											onLineHeight={( value ) => savePostFont( { lineHeight: value } )}
											lineHeightType={postLabelFont[ 0 ].lineType}
											onLineHeightType={( value ) => savePostFont( { lineType: value } )}
											reLetterSpacing={postLabelFont[ 0 ].letterSpacing}
											onLetterSpacing={( value ) => savePostFont( { letterSpacing: value } )}
											letterSpacingType={postLabelFont[ 0 ].letterType}
											onLetterSpacingType={( value ) => savePostFont( { letterType: value } )}
											textTransform={postLabelFont[ 0 ].textTransform}
											onTextTransform={( value ) => savePostFont( { textTransform: value } )}
											fontFamily={postLabelFont[ 0 ].family}
											onFontFamily={( value ) => savePostFont( { family: value } )}
											onFontChange={( select ) => {
												savePostFont( {
													family: select.value,
													google: select.google,
												} );
											}}
											onFontArrayChange={( values ) => savePostFont( values )}
											googleFont={postLabelFont[ 0 ].google}
											onGoogleFont={( value ) => savePostFont( { google: value } )}
											loadGoogleFont={postLabelFont[ 0 ].loadGoogle}
											onLoadGoogleFont={( value ) => savePostFont( { loadGoogle: value } )}
											fontVariant={postLabelFont[ 0 ].variant}
											onFontVariant={( value ) => savePostFont( { variant: value } )}
											fontWeight={postLabelFont[ 0 ].weight}
											onFontWeight={( value ) => savePostFont( { weight: value } )}
											fontStyle={postLabelFont[ 0 ].style}
											onFontStyle={( value ) => savePostFont( { style: value } )}
											fontSubset={postLabelFont[ 0 ].subset}
											onFontSubset={( value ) => savePostFont( { subset: value } )}
										/>
									</BasePanelBody>
								)}
							</>
						}

						{( activeTab === 'advanced' ) &&
							<>
								<BasePanelBody panelName={'bsb-countdown-spacing-settings'}>
									<ResponsiveMeasureRangeControl
										label={__( 'Container Padding', 'gutenam-blocks' )}
										value={containerPadding}
										tabletValue={containerTabletPadding}
										mobileValue={containerMobilePadding}
										onChange={( value ) => setAttributes( { containerPadding: value } )}
										onChangeTablet={( value ) => setAttributes( { containerTabletPadding: value } )}
										onChangeMobile={( value ) => setAttributes( { containerMobilePadding: value } )}
										min={paddingMin}
										max={paddingMax}
										step={paddingStep}
										unit={paddingType}
										units={[ 'px', 'em', 'rem', '%' ]}
										onUnit={( value ) => setAttributes( { paddingType: value } )}
										onMouseOver={ paddingMouseOver.onMouseOver }
										onMouseOut={ paddingMouseOver.onMouseOut }
									/>
									<ResponsiveMeasureRangeControl
										label={__( 'Container Margin', 'gutenam-blocks' )}
										value={containerMargin}
										tabletValue={containerTabletMargin}
										mobileValue={containerMobileMargin}
										onChange={( value ) => setAttributes( { containerMargin: value } )}
										onChangeTablet={( value ) => setAttributes( { containerTabletMargin: value } )}
										onChangeMobile={( value ) => setAttributes( { containerMobileMargin: value } )}
										min={marginMin}
										max={marginMax}
										step={marginStep}
										unit={marginType}
										units={[ 'px', 'em', 'rem', '%', 'vh' ]}
										onUnit={( value ) => setAttributes( { marginType: value } )}
										onMouseOver={ marginMouseOver.onMouseOver }
										onMouseOut={ marginMouseOver.onMouseOut }
									/>
								</BasePanelBody>

								<div className="bst-sidebar-settings-spacer"></div>

								<BasePanelBody
									title={__( 'Container Settings', 'gutenam-blocks' )}
									panelName={'containerSettings'}
									blockSlug={ 'base/countdown' }
								>
									<PopColorControl
										label={__( 'Background Color', 'gutenam-blocks' )}
										value={( background ? background : '' )}
										default={''}
										onChange={value => setAttributes( { background: value } )}
									/>
									<PopColorControl
										label={__( 'Border Color', 'gutenam-blocks' )}
										value={( border ? border : '' )}
										default={''}
										onChange={value => setAttributes( { border: value } )}
									/>
									<ResponsiveMeasurementControls
										label={__( 'Border Width', 'gutenam-blocks' )}
										value={borderWidth}
										control={borderWidthControl}
										tabletValue={tabletBorderWidth}
										mobileValue={mobileBorderWidth}
										onChange={( value ) => setAttributes( { borderWidth: value } )}
										onChangeTablet={( value ) => setAttributes( { tabletBorderWidth: value } )}
										onChangeMobile={( value ) => setAttributes( { mobileBorderWidth: value } )}
										onChangeControl={( value ) => setBorderWidthControl( value )}
										min={0}
										max={40}
										step={1}
										unit={'px'}
										units={[ 'px' ]}
										showUnit={true}
										preset={[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]}
									/>
									<MeasurementControls
										label={__( 'Border Radius', 'gutenam-blocks' )}
										measurement={borderRadius}
										control={borderRadiusControl}
										onChange={( value ) => setAttributes( { borderRadius: value } )}
										onControl={( value ) => setBorderRadiusControl( value )}
										min={0}
										max={200}
										step={1}
										controlTypes={[
											{ key: 'linked', name: __( 'Linked', 'gutenam-blocks' ), icon: radiusLinkedIcon },
											{ key: 'individual', name: __( 'Individual', 'gutenam-blocks' ), icon: radiusIndividualIcon },
										]}
										firstIcon={topLeftIcon}
										secondIcon={topRightIcon}
										thirdIcon={bottomRightIcon}
										fourthIcon={bottomLeftIcon}
									/>
								</BasePanelBody>

								<BasePanelBody
									title={__('Visibility Settings', 'gutenam-blocks')}
									initialOpen={false}
									panelName={'visibilitySettings'}
									blockSlug={ 'base/countdown' }
								>
									<ToggleControl
										label={__('Hide on Desktop', 'gutenam-blocks')}
										checked={(undefined !== vsdesk ? vsdesk : false)}
										onChange={(value) => setAttributes({vsdesk: value})}
									/>
									<ToggleControl
										label={__('Hide on Tablet', 'gutenam-blocks')}
										checked={(undefined !== vstablet ? vstablet : false)}
										onChange={(value) => setAttributes({vstablet: value})}
									/>
									<ToggleControl
										label={__('Hide on Mobile', 'gutenam-blocks')}
										checked={(undefined !== vsmobile ? vsmobile : false)}
										onChange={(value) => setAttributes({vsmobile: value})}
									/>
								</BasePanelBody>

								<BaseBlockDefaults attributes={attributes} defaultAttributes={metadata['attributes']} blockSlug={ metadata['name'] } excludedAttrs={ nonTransAttrs } />

							</>
						}

					</InspectorControls>
				</>
			)}
			{undefined !== numberFont && undefined !== numberFont[ 0 ] && undefined !== numberFont[ 0 ].family && '' !== numberFont[ 0 ].family && numberFont[ 0 ].google && (
				<WebfontLoader config={numberConfig}>
				</WebfontLoader>
			)}
			{undefined !== labelFont && undefined !== labelFont[ 0 ] && undefined !== labelFont[ 0 ].family && '' !== labelFont[ 0 ].family && labelFont[ 0 ].google && (
				<WebfontLoader config={labelConfig}>
				</WebfontLoader>
			)}
			{'' !== preLabel && undefined !== preLabelFont && undefined !== preLabelFont[ 0 ] && undefined !== preLabelFont[ 0 ].family && '' !== preLabelFont[ 0 ].family && preLabelFont[ 0 ].google && (
				<WebfontLoader config={preLabelConfig}>
				</WebfontLoader>
			)}
			{'' !== postLabel && undefined !== postLabelFont && undefined !== postLabelFont[ 0 ] && undefined !== postLabelFont[ 0 ].family && '' !== postLabelFont[ 0 ].family && postLabelFont[ 0 ].google && (
				<WebfontLoader config={postLabelConfig}>
				</WebfontLoader>
			)}
			<InnerBlocks
				templateLock="all"
				template={!enableTimer ? templateNoTimer : templateWithTimer}
			/>
			<SpacingVisualizer
				style={ {
					marginLeft: ( undefined !== previewMarginLeft ? getSpacingOptionOutput( previewMarginLeft, previewMarginType ) : undefined ),
					marginRight: ( undefined !== previewMarginRight ? getSpacingOptionOutput( previewMarginRight, previewMarginType ) : undefined ),
					marginTop: ( undefined !== previewMarginTop ? getSpacingOptionOutput( previewMarginTop, previewMarginType ) : undefined ),
					marginBottom: ( undefined !== previewMarginBottom ? getSpacingOptionOutput( previewMarginBottom, previewMarginType ) : undefined ),
				} }
				type="inside"
				forceShow={ marginMouseOver.isMouseOver }
				spacing={ [ getSpacingOptionOutput( previewMarginTop, previewMarginType ), getSpacingOptionOutput( previewMarginRight, previewMarginType ), getSpacingOptionOutput( previewMarginBottom, previewMarginType ), getSpacingOptionOutput( previewMarginLeft, previewMarginType ) ] }
			/>
			<SpacingVisualizer
				type="inside"
				forceShow={ paddingMouseOver.isMouseOver }
				spacing={ [ getSpacingOptionOutput( previewPaddingTop, previewPaddingType ), getSpacingOptionOutput( previewPaddingRight, previewPaddingType ), getSpacingOptionOutput( previewPaddingBottom, previewPaddingType ), getSpacingOptionOutput( previewPaddingLeft, previewPaddingType ) ] }
			/>
		</div>
	);
}

export default compose( [
	withSelect( ( select, ownProps ) => {
		const { clientId } = ownProps;
		let isNested = false;
		const {
			getBlock,
			getBlockParentsByBlockName,
		} = select( 'core/block-editor' );
		const parentBlocks = getBlockParentsByBlockName( clientId, 'base/countdown' );
		if ( parentBlocks.length && undefined !== parentBlocks[ 0 ] && '' !== parentBlocks[ 0 ] ) {
			isNested = true;
		}
		return {
			isNested        : isNested,
			parentBlock     : ( isNested ? getBlock( parentBlocks[ 0 ] ) : '' ),
			getPreviewDevice: select( 'baseblocks/data' ).getPreviewDeviceType(),
		};
	} ),
	withDispatch( ( dispatch, { clientId } ) => {
		const { selectBlock } = dispatch( blockEditorStore );
		return {
			selectBlock: ( id ) => selectBlock( id ),
		};
	} ),
] )( BaseCountdown );
