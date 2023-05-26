/**
 * BLOCK: Base Field Overlay
 *
 * Registering a basic block with Gutenberg.
 */

/**
 * Import External
 */
import classnames from 'classnames';
import { times, filter, map } from 'lodash';
import {
	PopColorControl,
	TypographyControls,
	BasePanelBody,
	ResponsiveRangeControls,
	URLInputControl,
	WebfontLoader,
	BoxShadowControl,
	MeasurementControls,
	InspectorControlTabs,
	BaseBlockDefaults,
	BaseInspectorControls,
	ResponsiveMeasureRangeControl,
	SpacingVisualizer,
	CopyPasteAttributes,
} from '@base/components';
import MailerLiteControls from './mailerlite.js';
import FluentCRMControls from './fluentcrm.js';
import {
	getPreviewSize,
	BaseColorOutput,
	mouseOverVisualizer,
	getSpacingOptionOutput,
	getUniqueId,
	setBlockDefaults,
	getFontSizeOptionOutput
} from '@base/helpers';

/**
 * Import Css
 */
import './editor.scss';
import metadata from './block.json';

/**
 * Internal block libraries
 */
import { __, sprintf } from '@wordpress/i18n';
import { getWidgetIdFromBlock } from '@wordpress/widgets';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useState, Fragment } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import {
	RichText,
	AlignmentToolbar,
	InspectorControls,
	BlockControls,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	Button,
	ToggleControl,
	PanelRow,
	ButtonGroup,
	TextControl,
	Dashicon,
	RangeControl,
	CheckboxControl,
	SelectControl,
	TabPanel,
	ExternalLink
} from '@wordpress/components';

import {
	applyFilters,
} from '@wordpress/hooks';
import { DELETE } from '@wordpress/keycodes';

const RETRIEVE_KEY_URL = 'https://www.google.com/recaptcha/admin';
const HELP_URL = 'https://developers.google.com/recaptcha/docs/v3';
const LANGUAGE_URL = 'https://developers.google.com/recaptcha/docs/language';

const actionOptionsList = [
	{ value: 'email', label: __( 'Email', 'gutenam-blocks' ), help: '', isDisabled: false },
	{ value: 'redirect', label: __( 'Redirect', 'gutenam-blocks' ), help: '', isDisabled: false },
	{ value: 'mailerlite', label: __( 'Mailerlite', 'gutenam-blocks' ), help: __( 'Add User to MailerLite list', 'gutenam-blocks' ), isDisabled: false },
	{ value: 'fluentCRM', label: __( 'FluentCRM', 'gutenam-blocks' ), help: __( 'Add User to FluentCRM list', 'gutenam-blocks' ), isDisabled: false },
	{ value: 'autoEmail', label: __( 'Auto Respond Email (Pro addon)', 'gutenam-blocks' ), help: __( 'Send instant response to form entrant', 'gutenam-blocks' ), isDisabled: true },
	{ value: 'entry', label: __( 'Database Entry (Pro addon)', 'gutenam-blocks' ), help: __( 'Log each form submission', 'gutenam-blocks' ), isDisabled: true },
	{ value: 'sendinblue', label: __( 'SendInBlue (Pro addon)', 'gutenam-blocks' ), help: __( 'Add user to SendInBlue list', 'gutenam-blocks' ), isDisabled: true },
	{ value: 'mailchimp', label: __( 'MailChimp (Pro addon)', 'gutenam-blocks' ), help: __( 'Add user to MailChimp list', 'gutenam-blocks' ), isDisabled: true },
	{ value: 'webhook', label: __( 'WebHook (Pro addon)', 'gutenam-blocks' ), help: __( 'Send form information to any third party webhook', 'gutenam-blocks' ), isDisabled: true },
];

/**
 * Build the form edit
 */
function BaseForm( props ) {

	const { attributes, className, isSelected, setAttributes, clientId } = props;

	const {
		uniqueID,
		style,
		fields,
		submit,
		actions,
		align,
		labelFont,
		recaptcha,
		redirect,
		messages,
		messageFont,
		email,
		hAlign,
		honeyPot,
		submitFont,
		baseAnimation,
		baseAOSOptions,
		submitMargin,
		recaptchaVersion,
		mailerlite,
		fluentcrm,
		containerMargin,
		tabletContainerMargin,
		mobileContainerMargin,
		containerMarginType,
		submitLabel,
		hAlignFormFeilds,
	} = attributes;

	const getID = () => {
		let postID;

		if ( getWidgetIdFromBlock( props ) ) {
			if ( !postID ) {
				setAttributes( {
					postID: getWidgetIdFromBlock( props ),
				} );
			} else if ( getWidgetIdFromBlock( props ) !== postID ) {
				setAttributes( {
					postID: getWidgetIdFromBlock( props ),
				} );
			}
		} else if ( wp.data.select( 'core/editor' ) ) {
			const { getCurrentPostId } = wp.data.select( 'core/editor' );
			if ( !postID && getCurrentPostId() ) {
				setAttributes( {
					postID: getCurrentPostId().toString(),
				} );
			} else if ( getCurrentPostId() && getCurrentPostId().toString() !== postID ) {
				setAttributes( {
					postID: getCurrentPostId().toString(),
				} );
			}
		} else {
			if ( !postID ) {
				setAttributes( {
					postID: 'block-unknown',
				} );
			}
		}
	};
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
		setBlockDefaults( 'base/form', attributes);

		let uniqueId = getUniqueId( uniqueID, clientId, isUniqueID, isUniqueBlock );
		if ( uniqueId !== uniqueID ) {
			attributes.uniqueID = uniqueId;
			setAttributes( { uniqueID: uniqueId } );
			addUniqueID( uniqueId, clientId );
		} else {
			addUniqueID( uniqueID, clientId );
		}
	}, [] );
	useEffect( () => {
		setActionOptions( applyFilters( 'base.actionOptions', actionOptionsList ) );

		if ( style && style[ 0 ] ) {
			if ( style[ 0 ].deskPadding[ 0 ] === style[ 0 ].deskPadding[ 1 ] && style[ 0 ].deskPadding[ 0 ] === style[ 0 ].deskPadding[ 2 ] && style[ 0 ].deskPadding[ 0 ] === style[ 0 ].deskPadding[ 3 ] ) {
				setDeskPaddingControl( 'linked' );
			} else {
				setDeskPaddingControl( 'individual' );
			}
			if ( style[ 0 ].tabletPadding[ 0 ] === style[ 0 ].tabletPadding[ 1 ] && style[ 0 ].tabletPadding[ 0 ] === style[ 0 ].tabletPadding[ 2 ] && style[ 0 ].tabletPadding[ 0 ] === style[ 0 ].tabletPadding[ 3 ] ) {
				setTabletPaddingControl( 'linked' );
			} else {
				setTabletPaddingControl( 'individual' );
			}
			if ( style[ 0 ].mobilePadding[ 0 ] === style[ 0 ].mobilePadding[ 1 ] && style[ 0 ].mobilePadding[ 0 ] === style[ 0 ].mobilePadding[ 2 ] && style[ 0 ].mobilePadding[ 0 ] === style[ 0 ].mobilePadding[ 3 ] ) {
				setMobilePaddingControl( 'linked' );
			} else {
				setMobilePaddingControl( 'individual' );
			}
			if ( style[ 0 ].borderWidth[ 0 ] === style[ 0 ].borderWidth[ 1 ] && style[ 0 ].borderWidth[ 0 ] === style[ 0 ].borderWidth[ 2 ] && style[ 0 ].borderWidth[ 0 ] === style[ 0 ].borderWidth[ 3 ] ) {
				setBorderControl( 'linked' );
			} else {
				setBorderControl( 'individual' );
			}
		}
		if ( submit && submit[ 0 ] ) {
			if ( submit[ 0 ].deskPadding[ 0 ] === submit[ 0 ].deskPadding[ 1 ] && submit[ 0 ].deskPadding[ 0 ] === submit[ 0 ].deskPadding[ 2 ] && submit[ 0 ].deskPadding[ 0 ] === submit[ 0 ].deskPadding[ 3 ] ) {
				setSubmitDeskPaddingControl( 'linked' );
			} else {
				setSubmitDeskPaddingControl( 'individual' );
			}
			if ( submit[ 0 ].tabletPadding[ 0 ] === submit[ 0 ].tabletPadding[ 1 ] && submit[ 0 ].tabletPadding[ 0 ] === submit[ 0 ].tabletPadding[ 2 ] && submit[ 0 ].tabletPadding[ 0 ] === submit[ 0 ].tabletPadding[ 3 ] ) {
				setSubmitTabletPaddingControl( 'linked' );
			} else {
				setSubmitTabletPaddingControl( 'individual' );
			}
			if ( submit[ 0 ].mobilePadding[ 0 ] === submit[ 0 ].mobilePadding[ 1 ] && submit[ 0 ].mobilePadding[ 0 ] === submit[ 0 ].mobilePadding[ 2 ] && submit[ 0 ].mobilePadding[ 0 ] === submit[ 0 ].mobilePadding[ 3 ] ) {
				setSubmitMobilePaddingControl( 'linked' );
			} else {
				setSubmitMobilePaddingControl( 'individual' );
			}
			if ( submit[ 0 ].borderWidth[ 0 ] === submit[ 0 ].borderWidth[ 1 ] && submit[ 0 ].borderWidth[ 0 ] === submit[ 0 ].borderWidth[ 2 ] && submit[ 0 ].borderWidth[ 0 ] === submit[ 0 ].borderWidth[ 3 ] ) {
				setSubmitBorderControl( 'linked' );
			} else {
				setSubmitBorderControl( 'individual' );
			}
		}

		if ( messageFont && messageFont[ 0 ] ) {
			if ( messageFont[ 0 ].borderWidth[ 0 ] === messageFont[ 0 ].borderWidth[ 1 ] && messageFont[ 0 ].borderWidth[ 0 ] === messageFont[ 0 ].borderWidth[ 2 ] && messageFont[ 0 ].borderWidth[ 0 ] === messageFont[ 0 ].borderWidth[ 3 ] ) {
				setMessageFontBorderControl( 'linked' );
			} else {
				setMessageFontBorderControl( 'individual' );
			}
		}

		getID();

		/**
		 * Get settings
		 */
		apiFetch( {
			path: '/wp/v2/settings',
			method: 'GET',
		} ).then( ( response ) => {
			setSiteKey( response.base_blocks_recaptcha_site_key );
			setSecretKey( response.base_blocks_recaptcha_secret_key );
			setRecaptchaLanguage( response.base_blocks_recaptcha_language );

			if ( '' !== siteKey && '' !== secretKey ) {
				setIsSavedKey( true );
			}
		});

	}, [] );

	const [ actionOptions, setActionOptions ] = useState( null );
	const [ selectedField, setSelectedField ] = useState( null );
	const [ deskPaddingControl, setDeskPaddingControl ] = useState( 'linked' );
	const [ tabletPaddingControl, setTabletPaddingControl ] = useState( 'linked' );
	const [ mobilePaddingControl, setMobilePaddingControl ] = useState( 'linked' );
	const [ borderControl, setBorderControl ] = useState( 'linked' );
	const [ labelPaddingControl, setLabelPaddingControl ] = useState( 'individual' );
	const [ labelMarginControl, setLabelMarginControl ] = useState( 'individual' );
	const [ submitBorderControl, setSubmitBorderControl ] = useState( 'linked' );
	const [ submitDeskPaddingControl, setSubmitDeskPaddingControl ] = useState( 'linked' );
	const [ submitTabletPaddingControl, setSubmitTabletPaddingControl ] = useState( 'linked' );
	const [ submitMobilePaddingControl, setSubmitMobilePaddingControl ] = useState( 'linked' );
	const [ messageFontBorderControl, setMessageFontBorderControl ] = useState( 'linked' );
	const [ messagePaddingControl, setMessagePaddingControl ] = useState( 'individual' );
	const [ messageMarginControl, setMessageMarginControl ] = useState( 'individual' );
	const [ deskMarginControl, setDeskMarginControl ] = useState( 'individual' );
	const [ tabletMarginControl, setTabletMarginControl ] = useState( 'individual' );
	const [ mobileMarginControl, setMobileMarginControl ] = useState( 'individual' );
	const [ siteKey, setSiteKey ] = useState( '' );
	const [ secretKey, setSecretKey ] = useState( '' );
	const [ recaptchaLanguage, setRecaptchaLanguage ] = useState( '' );

	const [ isSavedKey, setIsSavedKey ] = useState( false );
	const [ isSaving, setIsSaving ] = useState( false );

	const [ activeTab, setActiveTab ] = useState( 'general' );

	const marginMouseOver = mouseOverVisualizer();

	const nonTransAttrs = [ 'postID' ];

	const deselectField = () => {
		setSelectedField( null );
	};

	const onSelectField = ( index ) => {
		if ( selectedField !== index ) {
			setSelectedField( index );
		}
	};

	const onMove = ( oldIndex, newIndex ) => {
		const tempFields = [ ...fields ];
		tempFields.splice( newIndex, 1, fields[ oldIndex ] );
		tempFields.splice( oldIndex, 1, fields[ newIndex ] );
		setSelectedField( newIndex );
		setAttributes( {
			fields: tempFields,
		} );
	};

	const onMoveForward = ( oldIndex ) => {

		if ( oldIndex === fields.length - 1 ) {
			return;
		}

		onMove( oldIndex, oldIndex + 1 );
	};

	const onMoveBackward = ( oldIndex ) => {
		if ( oldIndex === 0 ) {
			return;
		}
		onMove( oldIndex, oldIndex - 1 );
	};

	const onRemoveField = ( index ) => {
		const tempFields = filter( fields, ( item, i ) => index !== i );
		setSelectedField( null );
		setAttributes( {
			fields: tempFields,
		} );
	};
	const onKeyRemoveField = ( index ) => {
		const tempFields = filter( fields, ( item, i ) => index !== i );
		setSelectedField( null );
		setAttributes( {
			fields: tempFields,
		} );
	};
	const onDuplicateField = ( index ) => {
		const tempFields = fields;
		const duplicate = tempFields[ index ];
		tempFields.splice( index + 1, 0, duplicate );
		setSelectedField( index + 1 );
		setAttributes( {
			fields: tempFields,
		} );
		//saveFields( { multiSelect: fields[ 0 ].multiSelect }, 0 );
	};
	const saveFields = ( value, index ) => {

		const newItems = fields.map( ( item, thisIndex ) => {
			if ( index === thisIndex ) {
				item = { ...item, ...value };
			}

			return item;
		} );

		setAttributes( {
			fields: newItems,
		} );
	};
	const saveFieldsOptions = ( value, index, subIndex ) => {
		const newOptions = fields[ index ].options.map( ( item, thisIndex ) => {
			if ( subIndex === thisIndex ) {
				item = { ...item, ...value };
			}

			return item;
		} );

		saveFields( { options: newOptions }, index );
	};
	const saveSubmit = ( value ) => {

		const newItems = submit.map( ( item, thisIndex ) => {
			if ( 0 === thisIndex ) {
				item = { ...item, ...value };
			}

			return item;
		} );

		setAttributes( {
			submit: newItems,
		} );
	};
	const saveSubmitMargin = ( value ) => {

		let margin;
		if ( undefined === submitMargin || ( undefined !== submitMargin && undefined === submitMargin[ 0 ] ) ) {
			margin = [ {
				desk   : [ '', '', '', '' ],
				tablet : [ '', '', '', '' ],
				mobile : [ '', '', '', '' ],
				unit   : 'px',
				control: 'linked',
			} ];
		} else {
			margin = submitMargin;
		}
		const newItems = margin.map( ( item, thisIndex ) => {
			if ( 0 === thisIndex ) {
				item = { ...item, ...value };
			}

			return item;
		} );

		setAttributes( {
			submitMargin: newItems,
		} );
	};
	const saveSubmitGradient = ( value, index ) => {

		const newItems = submit[ 0 ].gradient.map( ( item, thisIndex ) => {
			if ( index === thisIndex ) {
				item = value;
			}

			return item;
		} );
		saveSubmit( { gradient: newItems } );
	};
	const saveSubmitGradientHover = ( value, index ) => {

		const newItems = submit[ 0 ].gradientHover.map( ( item, thisIndex ) => {
			if ( index === thisIndex ) {
				item = value;
			}

			return item;
		} );

		saveSubmit( { gradientHover: newItems } );
	};
	const saveSubmitBoxShadow = ( value, index ) => {

		const newItems = submit[ 0 ].boxShadow.map( ( item, thisIndex ) => {
			if ( index === thisIndex ) {
				item = value;
			}

			return item;
		} );
		saveSubmit( { boxShadow: newItems } );
	};
	const saveSubmitBoxShadowHover = ( value, index ) => {

		const newItems = submit[ 0 ].boxShadowHover.map( ( item, thisIndex ) => {
			if ( index === thisIndex ) {
				item = value;
			}

			return item;
		} );
		saveSubmit( { boxShadowHover: newItems } );
	};
	const saveSubmitFont = ( value ) => {

		const newItems = submitFont.map( ( item, thisIndex ) => {
			if ( 0 === thisIndex ) {
				item = { ...item, ...value };
			}

			return item;
		} );

		setAttributes( {
			submitFont: newItems,
		} );
	};
	const saveEmail = ( value ) => {

		const newItems = email.map( ( item, thisIndex ) => {
			if ( 0 === thisIndex ) {
				item = { ...item, ...value };
			}

			return item;
		} );

		setAttributes( {
			email: newItems,
		} );
	};
	const saveStyle = ( value ) => {

		const newItems = style.map( ( item, thisIndex ) => {
			if ( 0 === thisIndex ) {
				item = { ...item, ...value };
			}

			return item;
		} );

		setAttributes( {
			style: newItems,
		} );
	};
	const saveStyleGradient = ( value, index ) => {
		const newItems = style[ 0 ].gradient.map( ( item, thisIndex ) => {
			if ( index === thisIndex ) {
				item = value;
			}

			return item;
		} );

		saveStyle( { gradient: newItems } );
	};
	const saveStyleGradientActive = ( value, index ) => {

		const newItems = style[ 0 ].gradientActive.map( ( item, thisIndex ) => {
			if ( index === thisIndex ) {
				item = value;
			}

			return item;
		} );

		saveStyle( { gradientActive: newItems } );
	};
	const saveStyleBoxShadow = ( value, index ) => {
		const newItems = style[ 0 ].boxShadow.map( ( item, thisIndex ) => {
			if ( index === thisIndex ) {
				item = value;
			}

			return item;
		} );

		saveStyle( { boxShadow: newItems } );
	};
	const saveStyleBoxShadowActive = ( value, index ) => {

		const newItems = style[ 0 ].boxShadowActive.map( ( item, thisIndex ) => {
			if ( index === thisIndex ) {
				item = value;
			}

			return item;
		} );

		saveStyle( { boxShadowActive: newItems } );
	};
	const saveLabelFont = ( value ) => {

		const newItems = labelFont.map( ( item, thisIndex ) => {
			if ( 0 === thisIndex ) {
				item = { ...item, ...value };
			}

			return item;
		} );

		setAttributes( {
			labelFont: newItems,
		} );
	};
	const saveMessageFont = ( value ) => {

		const newItems = messageFont.map( ( item, thisIndex ) => {
			if ( 0 === thisIndex ) {
				item = { ...item, ...value };
			}

			return item;
		} );

		setAttributes( {
			messageFont: newItems,
		} );
	};
	const saveMessages = ( value ) => {

		const newItems = messages.map( ( item, thisIndex ) => {
			if ( 0 === thisIndex ) {
				item = { ...item, ...value };
			}

			return item;
		} );

		setAttributes( {
			messages: newItems,
		} );
	};
	const addAction = ( value ) => {

		const newItems = actions.map( ( item, thisIndex ) => {
			return item;
		} );
		newItems.push( value );

		setAttributes( {
			actions: newItems,
		} );
	};

	const removeAction = ( value ) => {

		const newItems = actions.filter( item => item !== value );

		setAttributes( {
			actions: newItems,
		} );
	};

	const removeKeys = () => {
		setSiteKey( '' );
		setSecretKey( '' );

		if ( isSavedKey ) {
			setIsSaving( true );

			const settingModel = new wp.api.models.Settings( {
				base_blocks_recaptcha_site_key  : '',
				base_blocks_recaptcha_secret_key: '',
				base_blocks_recaptcha_language: ''
			} );
			settingModel.save().then( () => {
				setIsSavedKey( false );
				setIsSaving( false );
			} );
		}
	};
	const saveKeys = () => {
		setIsSaving( true );

		const settingModel = new wp.api.models.Settings( {
			base_blocks_recaptcha_site_key  : siteKey,
			base_blocks_recaptcha_secret_key: secretKey,
			base_blocks_recaptcha_language: recaptchaLanguage,
		} );

		settingModel.save().then( response => {
			setIsSaving( false );
			setIsSavedKey( true );
		} );
	};

	const onOptionMove = ( oldIndex, newIndex, fieldIndex ) => {

		const options = fields[ fieldIndex ] && fields[ fieldIndex ].options ? [ ...fields[ fieldIndex ].options ] : [];
		if ( !options ) {
			return;
		}
		options.splice( newIndex, 1, fields[ fieldIndex ].options[ oldIndex ] );
		options.splice( oldIndex, 1, fields[ fieldIndex ].options[ newIndex ] );
		saveFields( { options: options }, fieldIndex );

	};

	const onOptionMoveDown = ( oldIndex, fieldIndex ) => {
		if ( oldIndex === fields[ fieldIndex ].options.length - 1 ) {
			return;
		}
		onOptionMove( oldIndex, oldIndex + 1, fieldIndex );
	};

  	const onOptionMoveUp = ( oldIndex, fieldIndex ) => {
		if ( oldIndex === 0 ) {
			return;
		}

		onOptionMove( oldIndex, oldIndex - 1, fieldIndex );
	};

	const previewSubmitMarginType = ( undefined !== submitMargin && undefined !== submitMargin[0] && submitMargin[0].unit ? submitMargin[0].unit : 'px' );
	const previewSubmitMarginTop = getPreviewSize( previewDevice, ( undefined !== submitMargin && undefined !== submitMargin[ 0 ] && submitMargin[0].desk ? submitMargin[0].desk[ 0 ] : '' ), ( undefined !== submitMargin && undefined !== submitMargin[0] && submitMargin[0].tablet ? submitMargin[0].tablet[ 0 ] : '' ), ( undefined !== submitMargin && undefined !== submitMargin[ 0 ] && submitMargin[0].mobile ? submitMargin[0].mobile[ 0 ] : '' ) );
	const previewSubmitMarginRight = getPreviewSize( previewDevice, ( undefined !== submitMargin && undefined !== submitMargin[ 0 ] && submitMargin[0].desk ? submitMargin[0].desk[ 1 ] : '' ), ( undefined !== submitMargin && undefined !== submitMargin[0] && submitMargin[0].tablet ? submitMargin[0].tablet[ 1 ] : '' ), ( undefined !== submitMargin && undefined !== submitMargin[ 0 ] && submitMargin[0].mobile ? submitMargin[0].mobile[ 1 ] : '' ) );
	const previewSubmitMarginBottom = getPreviewSize( previewDevice, ( undefined !== submitMargin && undefined !== submitMargin[ 0 ] && submitMargin[0].desk ? submitMargin[0].desk[ 2 ] : '' ), ( undefined !== submitMargin && undefined !== submitMargin[0] && submitMargin[0].tablet ? submitMargin[0].tablet[ 2 ] : '' ), ( undefined !== submitMargin && undefined !== submitMargin[ 0 ] && submitMargin[0].mobile ? submitMargin[0].mobile[ 2 ] : '' ) );
	const previewSubmitMarginLeft = getPreviewSize( previewDevice, ( undefined !== submitMargin && undefined !== submitMargin[ 0 ] && submitMargin[0].desk ? submitMargin[0].desk[ 3 ] : '' ), ( undefined !== submitMargin && undefined !== submitMargin[0] && submitMargin[0].tablet ? submitMargin[0].tablet[ 3 ] : '' ), ( undefined !== submitMargin && undefined !== submitMargin[ 0 ] && submitMargin[0].mobile ? submitMargin[0].mobile[ 3 ] : '' ) );

	const previewSubmitColumnWidth = getPreviewSize( previewDevice, ( undefined !== submit && undefined !== submit[ 0 ] && submit[0].width ? submit[0].width[ 0 ] : '' ), ( undefined !== submit && undefined !== submit[ 0 ] && submit[0].width ? submit[0].width[ 1 ] : '' ), ( undefined !== submit && undefined !== submit[ 0 ] && submit[0].width ? submit[0].width[ 2 ] : '' ) );

	const previewSubmitLineHeightType = ( undefined !== submitFont && undefined !== submitFont[0] && submitFont[0].lineType ? submitFont[0].lineType : 'px' );
	const previewSubmitLineHeight = getPreviewSize( previewDevice, ( undefined !== submitFont && undefined !== submitFont[ 0 ] && submitFont[0].lineHeight ? submitFont[0].lineHeight[ 0 ] : '' ), ( undefined !== submitFont && undefined !== submitFont[ 0 ] && submitFont[0].lineHeight ? submitFont[0].lineHeight[ 1 ] : '' ), ( undefined !== submitFont && undefined !== submitFont[ 0 ] && submitFont[0].lineHeight ? submitFont[0].lineHeight[ 2 ] : '' ) );


	const previewContainerMarginType = ( undefined !== containerMarginType ? containerMarginType : 'px' );
	const previewContainerMarginTop = getPreviewSize( previewDevice, ( undefined !== containerMargin && undefined !== containerMargin[ 0 ] ? containerMargin[ 0 ] : '' ), ( undefined !== tabletContainerMargin && undefined !== tabletContainerMargin[ 0 ] ? tabletContainerMargin[ 0 ] : '' ), ( undefined !== mobileContainerMargin && undefined !== mobileContainerMargin[ 0 ] ? mobileContainerMargin[ 0 ] : '' ) );
	const previewContainerMarginRight = getPreviewSize( previewDevice, ( undefined !== containerMargin && undefined !== containerMargin[ 1 ] ? containerMargin[ 1 ] : '' ), ( undefined !== tabletContainerMargin && undefined !== tabletContainerMargin[ 1 ] ? tabletContainerMargin[ 1 ] : '' ), ( undefined !== mobileContainerMargin && undefined !== mobileContainerMargin[ 1 ] ? mobileContainerMargin[ 1 ] : '' ) );
	const previewContainerMarginBottom = getPreviewSize( previewDevice, ( undefined !== containerMargin && undefined !== containerMargin[ 2 ] ? containerMargin[ 2 ] : '' ), ( undefined !== tabletContainerMargin && undefined !== tabletContainerMargin[ 2 ] ? tabletContainerMargin[ 2 ] : '' ), ( undefined !== mobileContainerMargin && undefined !== mobileContainerMargin[ 2 ] ? mobileContainerMargin[ 2 ] : '' ) );
	const previewContainerMarginLeft = getPreviewSize( previewDevice, ( undefined !== containerMargin && undefined !== containerMargin[ 3 ] ? containerMargin[ 3 ] : '' ), ( undefined !== tabletContainerMargin && undefined !== tabletContainerMargin[ 3 ] ? tabletContainerMargin[ 3 ] : '' ), ( undefined !== mobileContainerMargin && undefined !== mobileContainerMargin[ 3 ] ? mobileContainerMargin[ 3 ] : '' ) );

	const previewStyleFontSize = getPreviewSize( previewDevice, style[ 0 ].fontSize[ 0 ], style[ 0 ].fontSize[ 1 ], style[ 0 ].fontSize[ 2 ] );
	const previewStyleFontSizeType = style[ 0 ].fontSizeType;
	const previewStyleLineHeight = getPreviewSize( previewDevice, style[ 0 ].lineHeight[ 0 ], style[ 0 ].lineHeight[ 1 ], style[ 0 ].lineHeight[ 2 ] );
	const previewStyleLineHeightType = style[ 0 ].lineType;

	const previewLabelFontSize = getPreviewSize( previewDevice, labelFont[ 0 ].size[ 0 ], labelFont[ 0 ].size[ 1 ], labelFont[ 0 ].size[ 2 ] );
	const previewLabelFontSizeType = labelFont[ 0 ].sizeType;
	const previewLabelLineHeight = getPreviewSize( previewDevice, labelFont[ 0 ].lineHeight[ 0 ], labelFont[ 0 ].lineHeight[ 1 ], labelFont[ 0 ].lineHeight[ 2 ] );
	const previewLabelLineHeightType = labelFont[ 0 ].lineType;

	const previewSubmitFontSize = getPreviewSize( previewDevice, submitFont[ 0 ].size[ 0 ], submitFont[ 0 ].size[ 1 ], submitFont[ 0 ].size[ 2 ] );
	const previewSubmitFontSizeType = submitFont[ 0 ].sizeType;

	const previewRowGap = getPreviewSize( previewDevice, ( undefined !== style[ 0 ].rowGap && '' !== style[ 0 ].rowGap ? style[ 0 ].rowGap + 'px' : '' ), ( undefined !== style[ 0 ].tabletRowGap && '' !== style[ 0 ].tabletRowGap ? style[ 0 ].tabletRowGap + 'px' : '' ), ( undefined !== style[ 0 ].mobileRowGap && '' !== style[ 0 ].mobileRowGap ? style[ 0 ].mobileRowGap + 'px' : '' ) );
	const previewGutter = getPreviewSize( previewDevice, ( undefined !== style[ 0 ].gutter && '' !== style[ 0 ].gutter ? style[ 0 ].gutter : '' ), ( undefined !== style[ 0 ].tabletGutter && '' !== style[ 0 ].tabletGutter ? style[ 0 ].tabletGutter : '' ), ( undefined !== style[ 0 ].mobileGutter && '' !== style[ 0 ].mobileGutter ? style[ 0 ].mobileGutter : '' ) );
	const containerMarginMin = ( containerMarginType === 'em' || containerMarginType === 'rem' ? -25 : -400 );
	const containerMarginMax = ( containerMarginType === 'em' || containerMarginType === 'rem' ? 25 : 400 );
	const containerMarginStep = ( containerMarginType === 'em' || containerMarginType === 'rem' ? 0.1 : 1 );
	const saveMailerlite = ( value ) => {
		const newItems = mailerlite.map( ( item, thisIndex ) => {
			if ( 0 === thisIndex ) {
				item = { ...item, ...value };
			}

			return item;
		} );
		setAttributes( {
			mailerlite: newItems,
		} );
	};
	const saveFluentCRM = ( value ) => {
		const newItems = fluentcrm.map( ( item, thisIndex ) => {
			if ( 0 === thisIndex ) {
				item = { ...item, ...value };
			}

			return item;
		} );
		setAttributes( {
			fluentcrm: newItems,
		} );
	};
	const saveFluentCRMMap = ( value, index ) => {
		const newItems = fields.map( ( item, thisIndex ) => {
			let newString = '';
			if ( index === thisIndex ) {
				newString = value;
			} else if ( undefined !== fluentcrm[ 0 ].map && undefined !== fluentcrm[ 0 ].map[ thisIndex ] ) {
				newString = fluentcrm[ 0 ].map[ thisIndex ];
			} else {
				newString = '';
			}

			return newString;
		} );
		saveFluentCRM( { map: newItems } );
	};
	const saveMailerliteMap = ( value, index ) => {
		const newItems = fields.map( ( item, thisIndex ) => {
			let newString = '';
			if ( index === thisIndex ) {
				newString = value;
			} else if ( undefined !== mailerlite[ 0 ].map && undefined !== mailerlite[ 0 ].map[ thisIndex ] ) {
				newString = mailerlite[ 0 ].map[ thisIndex ];
			} else {
				newString = '';
			}

			return newString;
		} );
		saveMailerlite( { map: newItems } );
	};
	const btnSizes = [
		{ key: 'small', name: __( 'S', 'gutenam-blocks' ) },
		{ key: 'standard', name: __( 'M', 'gutenam-blocks' ) },
		{ key: 'large', name: __( 'L', 'gutenam-blocks' ) },
		{ key: 'custom', name: <Dashicon icon="admin-generic"/> },
	];
	const recaptchaVersions = [
		{ key: 'v3', name: __( 'V3', 'gutenam-blocks' ) },
		{ key: 'v2', name: __( 'V2', 'gutenam-blocks' ) },
	];
	const btnWidths = [
		{ key: 'auto', name: __( 'Auto' ) },
		{ key: 'fixed', name: __( 'Fixed' ) },
		{ key: 'full', name: __( 'Full' ) },
	];
	const gradTypes = [
		{ key: 'linear', name: __( 'Linear', 'gutenam-blocks' ) },
		{ key: 'radial', name: __( 'Radial', 'gutenam-blocks' ) },
	];
	const bgType = [
		{ key: 'solid', name: __( 'Solid', 'gutenam-blocks' ) },
		{ key: 'gradient', name: __( 'Gradient', 'gutenam-blocks' ) },
	];
	const marginTypes = [
		{ key: 'px', name: 'px' },
		{ key: 'em', name: 'em' },
		{ key: '%', name: '%' },
		{ key: 'vh', name: 'vh' },
		{ key: 'rem', name: 'rem' },
	];
	const marginUnit = ( undefined !== submitMargin && undefined !== submitMargin[ 0 ] && submitMargin[ 0 ].unit ? submitMargin[ 0 ].unit : 'px' );
	const marginMin = ( marginUnit === 'em' || marginUnit === 'rem' ? -12 : -100 );
	const marginMax = ( marginUnit === 'em' || marginUnit === 'rem' ? 12 : 100 );
	const marginStep = ( marginUnit === 'em' || marginUnit === 'rem' ? 0.1 : 1 );
	const lgconfig = {
		google: {
			families: [ labelFont[ 0 ].family + ( labelFont[ 0 ].variant ? ':' + labelFont[ 0 ].variant : '' ) ],
		},
	};
	const lconfig = ( labelFont[ 0 ].google ? lgconfig : '' );
	const bgconfig = {
		google: {
			families: [ submitFont[ 0 ].family + ( submitFont[ 0 ].variant ? ':' + submitFont[ 0 ].variant : '' ) ],
		},
	};
	const bconfig = ( submitFont[ 0 ].google ? bgconfig : '' );
	let btnBG;
	let btnGrad;
	let btnGrad2;
	if ( undefined !== submit[ 0 ].backgroundType && 'gradient' === submit[ 0 ].backgroundType ) {
		btnGrad = ( undefined === submit[ 0 ].background ? 'rgba(255,255,255,0)' : BaseColorOutput( submit[ 0 ].background, ( submit[ 0 ].backgroundOpacity !== undefined ? submit[ 0 ].backgroundOpacity : 1 ) ) );
		btnGrad2 = ( undefined !== submit[ 0 ].gradient && undefined !== submit[ 0 ].gradient[ 0 ] && '' !== submit[ 0 ].gradient[ 0 ] ? BaseColorOutput( submit[ 0 ].gradient[ 0 ], ( undefined !== submit[ 0 ].gradient && submit[ 0 ].gradient[ 1 ] !== undefined ? submit[ 0 ].gradient[ 1 ] : 1 ) ) : BaseColorOutput( '#999999', ( undefined !== submit[ 0 ].gradient && submit[ 0 ].gradient[ 1 ] !== undefined ? submit[ 0 ].gradient[ 1 ] : 1 ) ) );
		if ( undefined !== submit[ 0 ].gradient && 'radial' === submit[ 0 ].gradient[ 4 ] ) {
			btnBG = `radial-gradient(at ${( undefined === submit[ 0 ].gradient[ 6 ] ? 'center center' : submit[ 0 ].gradient[ 6 ] )}, ${btnGrad} ${( undefined === submit[ 0 ].gradient[ 2 ] ? '0' : submit[ 0 ].gradient[ 2 ] )}%, ${btnGrad2} ${( undefined === submit[ 0 ].gradient[ 3 ] ? '100' : submit[ 0 ].gradient[ 3 ] )}%)`;
		} else if ( undefined === submit[ 0 ].gradient || 'radial' !== submit[ 0 ].gradient[ 4 ] ) {
			btnBG = `linear-gradient(${( undefined !== submit[ 0 ].gradient && undefined !== submit[ 0 ].gradient[ 5 ] ? submit[ 0 ].gradient[ 5 ] : '180' )}deg, ${btnGrad} ${( undefined !== submit[ 0 ].gradient && undefined !== submit[ 0 ].gradient[ 2 ] ? submit[ 0 ].gradient[ 2 ] : '0' )}%, ${btnGrad2} ${( undefined !== submit[ 0 ].gradient && undefined !== submit[ 0 ].gradient[ 3 ] ? submit[ 0 ].gradient[ 3 ] : '100' )}%)`;
		}
	} else {
		btnBG = ( undefined === submit[ 0 ].background ? undefined : BaseColorOutput( submit[ 0 ].background, ( submit[ 0 ].backgroundOpacity !== undefined ? submit[ 0 ].backgroundOpacity : 1 ) ) );
	}
	let inputBG;
	let inputGrad;
	let inputGrad2;
	if ( undefined !== style[ 0 ].backgroundType && 'gradient' === style[ 0 ].backgroundType ) {
		inputGrad = ( undefined === style[ 0 ].background ? 'rgba(255,255,255,0)' : BaseColorOutput( style[ 0 ].background, ( style[ 0 ].backgroundOpacity !== undefined ? style[ 0 ].backgroundOpacity : 1 ) ) );
		inputGrad2 = ( undefined !== style[ 0 ].gradient && undefined !== style[ 0 ].gradient[ 0 ] && '' !== style[ 0 ].gradient[ 0 ] ? BaseColorOutput( style[ 0 ].gradient[ 0 ], ( undefined !== style[ 0 ].gradient && style[ 0 ].gradient[ 1 ] !== undefined ? style[ 0 ].gradient[ 1 ] : 1 ) ) : BaseColorOutput( '#999999', ( undefined !== style[ 0 ].gradient && style[ 0 ].gradient[ 1 ] !== undefined ? style[ 0 ].gradient[ 1 ] : 1 ) ) );
		if ( undefined !== style[ 0 ].gradient && 'radial' === style[ 0 ].gradient[ 4 ] ) {
			inputBG = `radial-gradient(at ${( undefined === style[ 0 ].gradient[ 6 ] ? 'center center' : style[ 0 ].gradient[ 6 ] )}, ${inputGrad} ${( undefined === style[ 0 ].gradient[ 2 ] ? '0' : style[ 0 ].gradient[ 2 ] )}%, ${inputGrad2} ${( undefined === style[ 0 ].gradient[ 3 ] ? '100' : style[ 0 ].gradient[ 3 ] )}%)`;
		} else if ( undefined === style[ 0 ].gradient || 'radial' !== style[ 0 ].gradient[ 4 ] ) {
			inputBG = `linear-gradient(${( undefined !== style[ 0 ].gradient && undefined !== style[ 0 ].gradient[ 5 ] ? style[ 0 ].gradient[ 5 ] : '180' )}deg, ${inputGrad} ${( undefined !== style[ 0 ].gradient && undefined !== style[ 0 ].gradient[ 2 ] ? style[ 0 ].gradient[ 2 ] : '0' )}%, ${inputGrad2} ${( undefined !== style[ 0 ].gradient && undefined !== style[ 0 ].gradient[ 3 ] ? style[ 0 ].gradient[ 3 ] : '100' )}%)`;
		}
	} else {
		inputBG = ( undefined === style[ 0 ].background ? undefined : BaseColorOutput( style[ 0 ].background, ( style[ 0 ].backgroundOpacity !== undefined ? style[ 0 ].backgroundOpacity : 1 ) ) );
	}
	const removeOptionItem = ( previousIndex, fieldIndex ) => {
		const amount = Math.abs( fields[ fieldIndex ].options.length );
		if ( amount === 1 ) {
			return;
		}
		const currentItems = filter( fields[ fieldIndex ].options, ( item, i ) => previousIndex !== i );
		saveFields( { options: currentItems }, fieldIndex );
	};
	const fieldControls = ( index ) => {
		const isFieldSelected = ( isSelected && selectedField === index );
		if ( 'hidden' === fields[ index ].type ) {
			return (
				<BasePanelBody
					title={( undefined !== fields[ index ].label && null !== fields[ index ].label && '' !== fields[ index ].label ? fields[ index ].label : __( 'Field', 'gutenam-blocks' ) + ' ' + ( index + 1 ) ) + ' ' + __( 'Settings', 'gutenam-blocks' )}
					initialOpen={false}
					key={'field-panel-' + index.toString()}
					opened={( true === isFieldSelected ? true : undefined )}
					panelName={'bsb-form-field-' + index}
				>
					<SelectControl
						label={__( 'Field Type', 'gutenam-blocks' )}
						value={fields[ index ].type}
						options={[
							{ value: 'text', label: __( 'Text', 'gutenam-blocks' ) },
							{ value: 'email', label: __( 'Email', 'gutenam-blocks' ) },
							{ value: 'textarea', label: __( 'Textarea', 'gutenam-blocks' ) },
							{ value: 'accept', label: __( 'Accept', 'gutenam-blocks' ) },
							{ value: 'select', label: __( 'Select', 'gutenam-blocks' ) },
							{ value: 'tel', label: __( 'Telephone', 'gutenam-blocks' ) },
							{ value: 'checkbox', label: __( 'Checkboxes', 'gutenam-blocks' ) },
							{ value: 'radio', label: __( 'Radio', 'gutenam-blocks' ) },
							{ value: 'hidden', label: __( 'Hidden', 'gutenam-blocks' ) },
						]}
						onChange={value => {
							saveFields( { type: value }, index );
						}}
					/>
					<TextControl
						label={__( 'Field Name', 'gutenam-blocks' )}
						placeholder={__( 'Field Name', 'gutenam-blocks' )}
						value={( undefined !== fields[ index ].label ? fields[ index ].label : '' )}
						onChange={( value ) => saveFields( { label: value }, index )}
					/>
					<TextControl
						label={__( 'Field Input', 'gutenam-blocks' )}
						value={( undefined !== fields[ index ].default ? fields[ index ].default : '' )}
						onChange={( value ) => saveFields( { default: value }, index )}
					/>
				</BasePanelBody>
			);
		}
		return (
			<BasePanelBody
				title={( undefined !== fields[ index ].label && null !== fields[ index ].label && '' !== fields[ index ].label ? fields[ index ].label : __( 'Field', 'gutenam-blocks' ) + ' ' + ( index + 1 ) ) + ' ' + __( 'Settings', 'gutenam-blocks' )}
				initialOpen={false}
				key={'field-panel-' + index.toString()}
				opened={( true === isFieldSelected ? true : undefined )}
				panelName={'bsb-form-field-label-' + index}
			>
				<SelectControl
					label={__( 'Field Type', 'gutenam-blocks' )}
					value={fields[ index ].type}
					options={[
						{ value: 'text', label: __( 'Text', 'gutenam-blocks' ) },
						{ value: 'email', label: __( 'Email', 'gutenam-blocks' ) },
						{ value: 'textarea', label: __( 'Textarea', 'gutenam-blocks' ) },
						{ value: 'accept', label: __( 'Accept', 'gutenam-blocks' ) },
						{ value: 'select', label: __( 'Select', 'gutenam-blocks' ) },
						{ value: 'tel', label: __( 'Telephone', 'gutenam-blocks' ) },
						{ value: 'checkbox', label: __( 'Checkboxes', 'gutenam-blocks' ) },
						{ value: 'radio', label: __( 'Radio', 'gutenam-blocks' ) },
						{ value: 'hidden', label: __( 'Hidden', 'gutenam-blocks' ) },
					]}
					onChange={value => {
						saveFields( { type: value }, index );
					}}
				/>
				<ToggleControl
					label={__( 'Required?', 'gutenam-blocks' )}
					checked={( undefined !== fields[ index ].required ? fields[ index ].required : false )}
					onChange={( value ) => saveFields( { required: value }, index )}
				/>
				{'textarea' === fields[ index ].type && (
					<RangeControl
						label={__( 'Textarea Rows', 'gutenam-blocks' )}
						value={( undefined !== fields[ index ].rows ? fields[ index ].rows : '4' )}
						onChange={value => saveFields( { rows: value }, index )}
						min={1}
						max={100}
						step={1}
					/>
				)}
				{( 'select' === fields[ index ].type || 'radio' === fields[ index ].type || 'checkbox' === fields[ index ].type ) && (
					<>
						<div className='bsb-field-options-wrap'>
							{times( fields[ index ].options.length, n => (
								<div className="field-options-wrap">

									<TextControl
										className={'bsb-option-text-control'}
										key={n}
										label={__( 'Option', 'gutenam-blocks' ) + ' ' + ( n + 1 )}
										placeholder={__( 'Option', 'gutenam-blocks' )}
										value={( undefined !== fields[ index ].options[ n ].label ? fields[ index ].options[ n ].label : '' )}
										onChange={( text ) => saveFieldsOptions( { label: text, value: text }, index, n )}
									/>
									<div className="base-blocks-list-item__control-menu">
										<Button
											icon="arrow-up"
											onClick={() => n === 0 ? undefined : onOptionMoveUp( n, index )}
											className="base-blocks-list-item__move-up"
											label={__( 'Move Item Up' )}
											aria-disabled={n === 0}
											disabled={n === 0}
										/>
										<Button
											icon="arrow-down"
											onClick={() => ( n + 1 ) === fields[ index ].options.length ? undefined : onOptionMoveDown( n, index )}
											className="base-blocks-list-item__move-down"
											label={__( 'Move Item Down' )}
											aria-disabled={( n + 1 ) === fields[ index ].options.length}
											disabled={( n + 1 ) === fields[ index ].options.length}
										/>
										<Button
											icon="no-alt"
											onClick={() => removeOptionItem( n, index )}
											className="base-blocks-list-item__remove"
											label={__( 'Remove Item' )}
											disabled={1 === fields[ index ].options.length}
										/>
									</div>
								</div>
							) )}
						</div>
						<Button
							className="bsb-add-option"
							isPrimary={true}
							onClick={() => {
								const newOptions = fields[ index ].options;
								newOptions.push( {
									value: '',
									label: '',
								} );
								saveFields( { options: newOptions }, index );
							}}
						>
							<Dashicon icon="plus"/>
							{__( 'Add Option', 'gutenam-blocks' )}
						</Button>
					</>
				)}
				{'select' === fields[ index ].type && (
					<ToggleControl
						label={__( 'Multi Select?' )}
						checked={( undefined !== fields[ index ].multiSelect ? fields[ index ].multiSelect : false )}
						onChange={( value ) => saveFields( { multiSelect: value }, index )}
					/>
				)}
				{( 'checkbox' === fields[ index ].type || 'radio' === fields[ index ].type ) && (
					<ToggleControl
						label={__( 'Show inline?', 'gutenam-blocks' )}
						checked={( undefined !== fields[ index ].inline ? fields[ index ].inline : false )}
						onChange={( value ) => saveFields( { inline: value }, index )}
					/>
				)}
				{( 'accept' === fields[ index ].type ) && (
					<ToggleControl
						label={__( 'Show Policy Link', 'gutenam-blocks' )}
						checked={( undefined !== fields[ index ].showLink ? fields[ index ].showLink : false )}
						onChange={( value ) => saveFields( { showLink: value }, index )}
					/>
				)}
				{( 'accept' === fields[ index ].type && fields[ index ].showLink ) && (
					<>
						<TextControl
							label={__( 'Link Text', 'gutenam-blocks' )}
							placeholder={__( 'View Privacy Policy', 'gutenam-blocks' )}
							value={( undefined !== fields[ index ].placeholder ? fields[ index ].placeholder : '' )}
							onChange={( value ) => saveFields( { placeholder: value }, index )}
						/>
						<URLInputControl
							label={__( 'Link URL', 'gutenam-blocks' )}
							url={( undefined !== fields[ index ].default ? fields[ index ].default : '' )}
							onChangeUrl={( value ) => saveFields( { default: value }, index )}
							additionalControls={false}
							{...props}
						/>
					</>
				)}
				{( 'accept' === fields[ index ].type ) && (
					<ToggleControl
						label={__( 'Start checked?', 'gutenam-blocks' )}
						checked={( undefined !== fields[ index ].inline ? fields[ index ].inline : false )}
						onChange={( value ) => saveFields( { inline: value }, index )}
					/>
				)}
				<TextControl
					label={__( 'Field Label', 'gutenam-blocks' )}
					placeholder={__( 'Field Label', 'gutenam-blocks' )}
					value={( undefined !== fields[ index ].label ? fields[ index ].label : '' )}
					onChange={( value ) => saveFields( { label: value }, index )}
				/>
				<ToggleControl
					label={__( 'Show Label', 'gutenam-blocks' )}
					checked={( undefined !== fields[ index ].showLabel ? fields[ index ].showLabel : true )}
					onChange={( value ) => saveFields( { showLabel: value }, index )}
				/>
				{( 'accept' !== fields[ index ].type || 'select' !== fields[ index ].type ) && (
					<TextControl
						label={__( 'Field Placeholder', 'gutenam-blocks' )}
						value={( undefined !== fields[ index ].placeholder ? fields[ index ].placeholder : '' )}
						onChange={( value ) => saveFields( { placeholder: value }, index )}
					/>
				)}
				{( 'accept' !== fields[ index ].type ) && (
					<TextControl
						label={__( 'Input Default', 'gutenam-blocks' )}
						value={( undefined !== fields[ index ].default ? fields[ index ].default : '' )}
						onChange={( value ) => saveFields( { default: value }, index )}
					/>
				)}
				<TextControl
					label={__( 'Help Text', 'gutenam-blocks' )}
					value={( undefined !== fields[ index ].description ? fields[ index ].description : '' )}
					onChange={( value ) => saveFields( { description: value }, index )}
				/>
				<TextControl
					label={__( 'Input aria description', 'gutenam-blocks' )}
					help={__( 'Provide more context for screen readers', 'gutenam-blocks' )}
					value={( undefined !== fields[ index ].ariaLabel ? fields[ index ].ariaLabel : '' )}
					onChange={( value ) => saveFields( { ariaLabel: value }, index )}
				/>
				{( 'text' === fields[ index ].type || 'email' === fields[ index ].type || 'tel' === fields[ index ].type ) && (
					<SelectControl
						label={__( 'Field Auto Fill', 'gutenam-blocks' )}
						value={fields[ index ].auto}
						options={[
							{ value: '', label: __( 'Default', 'gutenam-blocks' ) },
							{ value: 'name', label: __( 'Name', 'gutenam-blocks' ) },
							{ value: 'given-name', label: __( 'First Name', 'gutenam-blocks' ) },
							{ value: 'family-name', label: __( 'Last Name', 'gutenam-blocks' ) },
							{ value: 'email', label: __( 'Email', 'gutenam-blocks' ) },
							{ value: 'organization', label: __( 'Organization', 'gutenam-blocks' ) },
							{ value: 'street-address', label: __( 'Street Address', 'gutenam-blocks' ) },
							{ value: 'address-line1', label: __( 'Address Line 1', 'gutenam-blocks' ) },
							{ value: 'address-line2', label: __( 'Address Line 1', 'gutenam-blocks' ) },
							{ value: 'country-name', label: __( 'Country Name', 'gutenam-blocks' ) },
							{ value: 'postal-code', label: __( 'Postal Code', 'gutenam-blocks' ) },
							{ value: 'tel', label: __( 'Telephone', 'gutenam-blocks' ) },
							{ value: 'off', label: __( 'Off', 'gutenam-blocks' ) },
						]}
						onChange={value => {
							saveFields( { auto: value }, index );
						}}
					/>
				)}
				<h2 className="bst-heading-size-title bst-secondary-color-size">{__( 'Column Width', 'gutenam-blocks' )}</h2>
				<TabPanel className="bst-size-tabs"
						  activeClass="active-tab"
						  tabs={[
							  {
								  name     : 'desk',
								  title    : <Dashicon icon="desktop"/>,
								  className: 'bst-desk-tab',
							  },
							  {
								  name     : 'tablet',
								  title    : <Dashicon icon="tablet"/>,
								  className: 'bst-tablet-tab',
							  },
							  {
								  name     : 'mobile',
								  title    : <Dashicon icon="smartphone"/>,
								  className: 'bst-mobile-tab',
							  },
						  ]}>
					{
						( tab ) => {
							let tabout;
							if ( tab.name ) {
								if ( 'mobile' === tab.name ) {
									tabout = (
										<>
											<SelectControl
												value={fields[ index ].width[ 2 ]}
												options={[
													{ value: '20', label: __( '20%', 'gutenam-blocks' ) },
													{ value: '25', label: __( '25%', 'gutenam-blocks' ) },
													{ value: '33', label: __( '33%', 'gutenam-blocks' ) },
													{ value: '40', label: __( '40%', 'gutenam-blocks' ) },
													{ value: '50', label: __( '50%', 'gutenam-blocks' ) },
													{ value: '60', label: __( '60%', 'gutenam-blocks' ) },
													{ value: '66', label: __( '66%', 'gutenam-blocks' ) },
													{ value: '75', label: __( '75%', 'gutenam-blocks' ) },
													{ value: '80', label: __( '80%', 'gutenam-blocks' ) },
													{ value: '100', label: __( '100%', 'gutenam-blocks' ) },
													{ value: '', label: __( 'Unset', 'gutenam-blocks' ) },
												]}
												onChange={value => {
													saveFields( { width: [ ( fields[ index ].width[ 0 ] ? fields[ index ].width[ 0 ] : '100' ), ( fields[ index ].width[ 1 ] ? fields[ index ].width[ 1 ] : '' ), value ] }, index );
												}}
											/>
										</>
									);
								} else if ( 'tablet' === tab.name ) {
									tabout = (
										<>
											<SelectControl
												value={fields[ index ].width[ 1 ]}
												options={[
													{ value: '20', label: __( '20%', 'gutenam-blocks' ) },
													{ value: '25', label: __( '25%', 'gutenam-blocks' ) },
													{ value: '33', label: __( '33%', 'gutenam-blocks' ) },
													{ value: '40', label: __( '40%', 'gutenam-blocks' ) },
													{ value: '50', label: __( '50%', 'gutenam-blocks' ) },
													{ value: '60', label: __( '60%', 'gutenam-blocks' ) },
													{ value: '66', label: __( '66%', 'gutenam-blocks' ) },
													{ value: '75', label: __( '75%', 'gutenam-blocks' ) },
													{ value: '80', label: __( '80%', 'gutenam-blocks' ) },
													{ value: '100', label: __( '100%', 'gutenam-blocks' ) },
													{ value: '', label: __( 'Unset', 'gutenam-blocks' ) },
												]}
												onChange={value => {
													saveFields( { width: [ ( fields[ index ].width[ 0 ] ? fields[ index ].width[ 0 ] : '100' ), value, ( fields[ index ].width[ 2 ] ? fields[ index ].width[ 2 ] : '' ) ] }, index );
												}}
											/>
										</>
									);
								} else {
									tabout = (
										<>
											<SelectControl
												value={fields[ index ].width[ 0 ]}
												options={[
													{ value: '20', label: __( '20%', 'gutenam-blocks' ) },
													{ value: '25', label: __( '25%', 'gutenam-blocks' ) },
													{ value: '33', label: __( '33%', 'gutenam-blocks' ) },
													{ value: '40', label: __( '40%', 'gutenam-blocks' ) },
													{ value: '50', label: __( '50%', 'gutenam-blocks' ) },
													{ value: '60', label: __( '60%', 'gutenam-blocks' ) },
													{ value: '66', label: __( '66%', 'gutenam-blocks' ) },
													{ value: '75', label: __( '75%', 'gutenam-blocks' ) },
													{ value: '80', label: __( '80%', 'gutenam-blocks' ) },
													{ value: '100', label: __( '100%', 'gutenam-blocks' ) },
													{ value: 'unset', label: __( 'Unset', 'gutenam-blocks' ) },
												]}
												onChange={value => {
													saveFields( { width: [ value, ( fields[ index ].width[ 1 ] ? fields[ index ].width[ 1 ] : '' ), ( fields[ index ].width[ 2 ] ? fields[ index ].width[ 2 ] : '' ) ] }, index );
												}}
											/>
										</>
									);
								}
							}
							return <div className={tab.className} key={tab.className}>{tabout}</div>;
						}
					}
				</TabPanel>
				{( undefined !== fields[ index ].required ? fields[ index ].required : false ) && (
					<TextControl
						label={__( 'Field error message when required', 'gutenam-blocks' )}
						value={( undefined !== fields[ index ].requiredMessage ? fields[ index ].requiredMessage : '' )}
						onChange={( value ) => saveFields( { requiredMessage: value }, index )}
						placeholder={( undefined !== fields[ index ].label ? fields[ index ].label : '' ) + ' ' + __( 'is required', 'gutenam-blocks' )}
					/>
				)}
				{( 'tel' === fields[ index ].type || 'email' === fields[ index ].type ) && (
					<TextControl
						label={__( 'Field error message when invalid', 'gutenam-blocks' )}
						value={( undefined !== fields[ index ].errorMessage ? fields[ index ].errorMessage : '' )}
						onChange={( value ) => saveFields( { errorMessage: value }, index )}
						placeholder={( undefined !== fields[ index ].label ? fields[ index ].label : '' ) + ' ' + __( 'is not valid', 'gutenam-blocks' )}
					/>
				)}
			</BasePanelBody>
		);
	};
	const renderFieldControls = (
		<>
			{times( fields.length, n => fieldControls( n ) )}
		</>
	);
	const fieldOutput = ( index ) => {
		if ( 'hidden' === fields[ index ].type ) {
			return (
				<input type="hidden" name={`bsb_field_${index}`} value={fields[ index ].default}/>
			);
		}
		const isFieldSelected = ( isSelected && selectedField === index );
		const fieldClassName = classnames( {
			'base-blocks-form-field'           : true,
			'is-selected'                         : isFieldSelected,
			[ `bsb-input-size-${style[ 0 ].size}` ]: style[ 0 ].size,
		} );
		const ariaLabel = sprintf(
			/* translators: %1$d: field number %2$d: max amount of fields */
			__( 'Field %1$d of %2$d in form', 'gutenam-blocks' ),
			( index + 1 ),
			fields.length,
		);
		let acceptLabel;
		let acceptLabelBefore;
		let acceptLabelAfter;
		if ( fields[ index ].label && fields[ index ].label.includes( '{privacy_policy}' ) ) {
			acceptLabelBefore = fields[ index ].label.split( '{' )[ 0 ];
			acceptLabelAfter = fields[ index ].label.split( '}' )[ 1 ];
			acceptLabel = (
				<>
					{acceptLabelBefore}<a href={( '' !== base_blocks_params.privacy_link ? base_blocks_params.privacy_link : '#' )} target="blank"
										  rel="noopener noreferrer">{( '' !== base_blocks_params.privacy_title ? base_blocks_params.privacy_title : 'Privacy policy' )}</a>{acceptLabelAfter}
				</>
			);
		} else {
			acceptLabel = fields[ index ].label;
		}

		return (
			<div
				className={fieldClassName}
				key={'field-' + index.toString()}
				style={{
					width       : ( '33' === fields[ index ].width[ 0 ] ? '33.33' : fields[ index ].width[ 0 ] ) + '%',
					marginBottom: ( previewRowGap ? previewRowGap : undefined ),
					paddingRight: ( undefined !== previewGutter && '' !== previewGutter ? ( previewGutter / 2 ) + 'px' : undefined ),
					paddingLeft : ( undefined !== previewGutter && '' !== previewGutter ? ( previewGutter / 2 ) + 'px' : undefined ),
				}}
				tabIndex="0"
				aria-label={ariaLabel}
				role="button"
				onClick={() => onSelectField( index )}
				onFocus={() => onSelectField( index )}
				onKeyDown={( event ) => {
					const { keyCode } = event;
					if ( keyCode === DELETE ) {
						onKeyRemoveField( index );
					}
				}}
			>
				{'accept' === fields[ index ].type && (
					<>
						{fields[ index ].showLink && (
							<a href={( undefined !== fields[ index ].default && '' !== fields[ index ].default ? fields[ index ].default : '#' )}
							   className={'bsb-accept-link'}>{( undefined !== fields[ index ].placeholder && '' !== fields[ index ].placeholder ? fields[ index ].placeholder :
								<span className="bsb-placeholder">{'View Privacy Policy'}</span> )}</a>
						)}
						<input type="checkbox" name={`bsb_field_${index}`} id={`bsb_field_${index}`} className={`bsb-field bsb-checkbox-style bsb-${fields[ index ].type}`} value="accept"
							   checked={fields[ index ].inline ? true : false} style={{
							borderColor: ( undefined === style[ 0 ].border ? undefined : BaseColorOutput( style[ 0 ].border, ( style[ 0 ].borderOpacity !== undefined ? style[ 0 ].borderOpacity : 1 ) ) ),
						}}/>
						<label htmlFor={`bsb_field_${index}`} style={{
							fontWeight   : labelFont[ 0 ].weight,
							fontStyle    : labelFont[ 0 ].style,
							color        : BaseColorOutput( labelFont[ 0 ].color ),
							fontSize     : getFontSizeOptionOutput( previewLabelFontSize, previewLabelFontSizeType ),
							lineHeight   : previewLabelLineHeight + previewLabelLineHeightType,
							letterSpacing: labelFont[ 0 ].letterSpacing + 'px',
							textTransform: ( labelFont[ 0 ].textTransform ? labelFont[ 0 ].textTransform : undefined ),
							fontFamily   : ( labelFont[ 0 ].family ? labelFont[ 0 ].family : undefined ),
							paddingTop   : ( '' !== labelFont[ 0 ].padding[ 0 ] ? labelFont[ 0 ].padding[ 0 ] + 'px' : undefined ),
							paddingRight : ( '' !== labelFont[ 0 ].padding[ 1 ] ? labelFont[ 0 ].padding[ 1 ] + 'px' : undefined ),
							paddingBottom: ( '' !== labelFont[ 0 ].padding[ 2 ] ? labelFont[ 0 ].padding[ 2 ] + 'px' : undefined ),
							paddingLeft  : ( '' !== labelFont[ 0 ].padding[ 3 ] ? labelFont[ 0 ].padding[ 3 ] + 'px' : undefined ),
							marginTop    : ( '' !== labelFont[ 0 ].margin[ 0 ] ? labelFont[ 0 ].margin[ 0 ] + 'px' : undefined ),
							marginRight  : ( '' !== labelFont[ 0 ].margin[ 1 ] ? labelFont[ 0 ].margin[ 1 ] + 'px' : undefined ),
							marginBottom : ( '' !== labelFont[ 0 ].margin[ 2 ] ? labelFont[ 0 ].margin[ 2 ] + 'px' : undefined ),
							marginLeft   : ( '' !== labelFont[ 0 ].margin[ 3 ] ? labelFont[ 0 ].margin[ 3 ] + 'px' : undefined ),
						}}>{( fields[ index ].label ? acceptLabel : <span className="bsb-placeholder">{'Field Label'}</span> )} {( fields[ index ].required && style[ 0 ].showRequired ?
							<span className="required" style={{ color: BaseColorOutput( style[ 0 ].requiredColor ) }}>*</span> : '' )}</label>
					</>
				)}
				{'accept' !== fields[ index ].type && (
					<>
						{fields[ index ].showLabel && (
							<label htmlFor={`bsb_field_${index}`} style={{
								fontWeight   : labelFont[ 0 ].weight,
								fontStyle    : labelFont[ 0 ].style,
								color        : BaseColorOutput( labelFont[ 0 ].color ),
								fontSize     : getFontSizeOptionOutput( previewLabelFontSize, previewLabelFontSizeType ),
								lineHeight   : previewLabelLineHeight + previewLabelLineHeightType,
								letterSpacing: labelFont[ 0 ].letterSpacing + 'px',
								textTransform: ( labelFont[ 0 ].textTransform ? labelFont[ 0 ].textTransform : undefined ),
								fontFamily   : ( labelFont[ 0 ].family ? labelFont[ 0 ].family : undefined ),
								paddingTop   : ( '' !== labelFont[ 0 ].padding[ 0 ] ? labelFont[ 0 ].padding[ 0 ] + 'px' : undefined ),
								paddingRight : ( '' !== labelFont[ 0 ].padding[ 1 ] ? labelFont[ 0 ].padding[ 1 ] + 'px' : undefined ),
								paddingBottom: ( '' !== labelFont[ 0 ].padding[ 2 ] ? labelFont[ 0 ].padding[ 2 ] + 'px' : undefined ),
								paddingLeft  : ( '' !== labelFont[ 0 ].padding[ 3 ] ? labelFont[ 0 ].padding[ 3 ] + 'px' : undefined ),
								marginTop    : ( '' !== labelFont[ 0 ].margin[ 0 ] ? labelFont[ 0 ].margin[ 0 ] + 'px' : undefined ),
								marginRight  : ( '' !== labelFont[ 0 ].margin[ 1 ] ? labelFont[ 0 ].margin[ 1 ] + 'px' : undefined ),
								marginBottom : ( '' !== labelFont[ 0 ].margin[ 2 ] ? labelFont[ 0 ].margin[ 2 ] + 'px' : undefined ),
								marginLeft   : ( '' !== labelFont[ 0 ].margin[ 3 ] ? labelFont[ 0 ].margin[ 3 ] + 'px' : undefined ),
							}}>{( fields[ index ].label ? fields[ index ].label : <span className="bsb-placeholder">{'Field Label'}</span> )} {( fields[ index ].required && style[ 0 ].showRequired ?
								<span className="required" style={{ color: BaseColorOutput( style[ 0 ].requiredColor ) }}>*</span> : '' )}</label>
						)}
						{'textarea' === fields[ index ].type && (
							<textarea name={`bsb_field_${index}`} id={`bsb_field_${index}`} type={fields[ index ].type} placeholder={fields[ index ].placeholder} value={fields[ index ].default}
									  data-type={fields[ index ].type} className={`bsb-field bsb-text-style-field bsb-${fields[ index ].type}-field bsb-field-${index}`} rows={fields[ index ].rows}
									  data-required={( fields[ index ].required ? 'yes' : undefined )} readOnly style={{
								paddingTop       : ( 'custom' === style[ 0 ].size && '' !== style[ 0 ].deskPadding[ 0 ] ? style[ 0 ].deskPadding[ 0 ] + 'px' : undefined ),
								paddingRight     : ( 'custom' === style[ 0 ].size && '' !== style[ 0 ].deskPadding[ 1 ] ? style[ 0 ].deskPadding[ 1 ] + 'px' : undefined ),
								paddingBottom    : ( 'custom' === style[ 0 ].size && '' !== style[ 0 ].deskPadding[ 2 ] ? style[ 0 ].deskPadding[ 2 ] + 'px' : undefined ),
								paddingLeft      : ( 'custom' === style[ 0 ].size && '' !== style[ 0 ].deskPadding[ 3 ] ? style[ 0 ].deskPadding[ 3 ] + 'px' : undefined ),
								background       : ( undefined !== inputBG ? inputBG : undefined ),
								color            : ( undefined !== style[ 0 ].color ? BaseColorOutput( style[ 0 ].color ) : undefined ),
								fontSize         : getFontSizeOptionOutput( previewStyleFontSize, previewStyleFontSizeType ),
								lineHeight       : previewStyleLineHeight + previewStyleLineHeightType,
								borderRadius     : ( undefined !== style[ 0 ].borderRadius ? style[ 0 ].borderRadius + 'px' : undefined ),
								borderTopWidth   : ( style[ 0 ].borderWidth && '' !== style[ 0 ].borderWidth[ 0 ] ? style[ 0 ].borderWidth[ 0 ] + 'px' : undefined ),
								borderRightWidth : ( style[ 0 ].borderWidth && '' !== style[ 0 ].borderWidth[ 1 ] ? style[ 0 ].borderWidth[ 1 ] + 'px' : undefined ),
								borderBottomWidth: ( style[ 0 ].borderWidth && '' !== style[ 0 ].borderWidth[ 2 ] ? style[ 0 ].borderWidth[ 2 ] + 'px' : undefined ),
								borderLeftWidth  : ( style[ 0 ].borderWidth && '' !== style[ 0 ].borderWidth[ 3 ] ? style[ 0 ].borderWidth[ 3 ] + 'px' : undefined ),
								borderColor      : ( undefined === style[ 0 ].border ? undefined : BaseColorOutput( style[ 0 ].border, ( style[ 0 ].borderOpacity !== undefined ? style[ 0 ].borderOpacity : 1 ) ) ),
								boxShadow        : ( undefined !== style[ 0 ].boxShadow && undefined !== style[ 0 ].boxShadow[ 0 ] && style[ 0 ].boxShadow[ 0 ] ? ( undefined !== style[ 0 ].boxShadow[ 7 ] && style[ 0 ].boxShadow[ 7 ] ? 'inset ' : '' ) + ( undefined !== style[ 0 ].boxShadow[ 3 ] ? style[ 0 ].boxShadow[ 3 ] : 1 ) + 'px ' + ( undefined !== style[ 0 ].boxShadow[ 4 ] ? style[ 0 ].boxShadow[ 4 ] : 1 ) + 'px ' + ( undefined !== style[ 0 ].boxShadow[ 5 ] ? style[ 0 ].boxShadow[ 5 ] : 2 ) + 'px ' + ( undefined !== style[ 0 ].boxShadow[ 6 ] ? style[ 0 ].boxShadow[ 6 ] : 0 ) + 'px ' + BaseColorOutput( ( undefined !== style[ 0 ].boxShadow[ 1 ] ? style[ 0 ].boxShadow[ 1 ] : '#000000' ), ( undefined !== style[ 0 ].boxShadow[ 2 ] ? style[ 0 ].boxShadow[ 2 ] : 1 ) ) : undefined ),
							}}/>
						)}
						{'select' === fields[ index ].type && (
							<select name={`bsb_field_${index}`} id={`bsb_field_${index}`} type={fields[ index ].type} data-type={fields[ index ].type}
									multiple={( fields[ index ].multiSelect ? true : false )} className={`bsb-field bsb-select-style-field bsb-${fields[ index ].type}-field bsb-field-${index}`}
									data-required={( fields[ index ].required ? 'yes' : undefined )} style={{
								background       : ( undefined !== inputBG ? inputBG : undefined ),
								color            : ( undefined !== style[ 0 ].color ? BaseColorOutput( style[ 0 ].color ) : undefined ),
								fontSize         : getFontSizeOptionOutput( previewStyleFontSize, previewStyleFontSizeType ),
								lineHeight       : previewStyleLineHeight + previewStyleLineHeightType,
								borderRadius     : ( undefined !== style[ 0 ].borderRadius ? style[ 0 ].borderRadius + 'px' : undefined ),
								borderTopWidth   : ( style[ 0 ].borderWidth && '' !== style[ 0 ].borderWidth[ 0 ] ? style[ 0 ].borderWidth[ 0 ] + 'px' : undefined ),
								borderRightWidth : ( style[ 0 ].borderWidth && '' !== style[ 0 ].borderWidth[ 1 ] ? style[ 0 ].borderWidth[ 1 ] + 'px' : undefined ),
								borderBottomWidth: ( style[ 0 ].borderWidth && '' !== style[ 0 ].borderWidth[ 2 ] ? style[ 0 ].borderWidth[ 2 ] + 'px' : undefined ),
								borderLeftWidth  : ( style[ 0 ].borderWidth && '' !== style[ 0 ].borderWidth[ 3 ] ? style[ 0 ].borderWidth[ 3 ] + 'px' : undefined ),
								borderColor      : ( undefined === style[ 0 ].border ? undefined : BaseColorOutput( style[ 0 ].border, ( style[ 0 ].borderOpacity !== undefined ? style[ 0 ].borderOpacity : 1 ) ) ),
								boxShadow        : ( undefined !== style[ 0 ].boxShadow && undefined !== style[ 0 ].boxShadow[ 0 ] && style[ 0 ].boxShadow[ 0 ] ? ( undefined !== style[ 0 ].boxShadow[ 7 ] && style[ 0 ].boxShadow[ 7 ] ? 'inset ' : '' ) + ( undefined !== style[ 0 ].boxShadow[ 3 ] ? style[ 0 ].boxShadow[ 3 ] : 1 ) + 'px ' + ( undefined !== style[ 0 ].boxShadow[ 4 ] ? style[ 0 ].boxShadow[ 4 ] : 1 ) + 'px ' + ( undefined !== style[ 0 ].boxShadow[ 5 ] ? style[ 0 ].boxShadow[ 5 ] : 2 ) + 'px ' + ( undefined !== style[ 0 ].boxShadow[ 6 ] ? style[ 0 ].boxShadow[ 6 ] : 0 ) + 'px ' + BaseColorOutput( ( undefined !== style[ 0 ].boxShadow[ 1 ] ? style[ 0 ].boxShadow[ 1 ] : '#000000' ), ( undefined !== style[ 0 ].boxShadow[ 2 ] ? style[ 0 ].boxShadow[ 2 ] : 1 ) ) : undefined ),
							}}>
								{undefined !== fields[ index ].placeholder && '' !== fields[ index ].placeholder && (
									<option
										value=""
										disabled={true}
										selected={'' === fields[ index ].default ? true : false}
									>
										{fields[ index ].placeholder}
									</option>
								)}
								{times( fields[ index ].options.length, n => (
									<option
										key={n}
										selected={( undefined !== fields[ index ].options[ n ].value && fields[ index ].options[ n ].value === fields[ index ].default ? true : false )}
										value={( undefined !== fields[ index ].options[ n ].value ? fields[ index ].options[ n ].value : '' )}
									>{( undefined !== fields[ index ].options[ n ].label ? fields[ index ].options[ n ].label : '' )}</option>
								) )}
							</select>
						)}
						{'checkbox' === fields[ index ].type && (
							<div data-type={fields[ index ].type}
								 className={`bsb-field bsb-checkbox-style-field bsb-${fields[ index ].type}-field bsb-field-${index} bsb-radio-style-${fields[ index ].inline ? 'inline' : 'normal'}`}>
								{times( fields[ index ].options.length, n => (
									<div key={n} data-type={fields[ index ].type} className={`bsb-checkbox-item bsb-checkbox-item-${n}`}>
										<input type="checkbox" name={`bsb_field_${index}[]${n}`} id={`bsb_field_${index}[]${n}`} className={'bsb-sub-field bsb-checkbox-style'}
											   value={( undefined !== fields[ index ].options[ n ].value ? fields[ index ].options[ n ].value : '' )}
											   checked={( undefined !== fields[ index ].options[ n ].value && fields[ index ].options[ n ].value === fields[ index ].default ? true : false )} style={{
											borderColor: ( undefined === style[ 0 ].border ? undefined : BaseColorOutput( style[ 0 ].border, ( style[ 0 ].borderOpacity !== undefined ? style[ 0 ].borderOpacity : 1 ) ) ),
										}}/>
										<label htmlFor={`bsb_field_${index}[]${n}`}>{( undefined !== fields[ index ].options[ n ].label ? fields[ index ].options[ n ].label : '' )}</label>
									</div>
								) )}
							</div>
						)}
						{'radio' === fields[ index ].type && (
							<div data-type={fields[ index ].type}
								 className={`bsb-field bsb-radio-style-field bsb-${fields[ index ].type}-field bsb-field-${index} bsb-radio-style-${fields[ index ].inline ? 'inline' : 'normal'}`}>
								{times( fields[ index ].options.length, n => (
									<div key={n} data-type={fields[ index ].type} className={`bsb-radio-item bsb-radio-item-${n}`}>
										<input type="radio" name={`bsb_field_${index}[]${n}`} id={`bsb_field_${index}[]${n}`} className={'bsb-sub-field bsb-radio-style'}
											   value={( undefined !== fields[ index ].options[ n ].value ? fields[ index ].options[ n ].value : '' )}
											   checked={( undefined !== fields[ index ].options[ n ].value && fields[ index ].options[ n ].value === fields[ index ].default ? true : false )} style={{
											borderColor: ( undefined === style[ 0 ].border ? undefined : BaseColorOutput( style[ 0 ].border, ( style[ 0 ].borderOpacity !== undefined ? style[ 0 ].borderOpacity : 1 ) ) ),
										}}/>
										<label htmlFor={`bsb_field_${index}[]${n}`}>{( undefined !== fields[ index ].options[ n ].label ? fields[ index ].options[ n ].label : '' )}</label>
									</div>
								) )}
							</div>
						)}
						{'email' === fields[ index ].type && (
							<input
								name={`bsb_field_${index}`}
								id={`bsb_field_${index}`}
								type={'text'}
								readOnly
								placeholder={fields[ index ].placeholder}
								value={fields[ index ].default}
								data-type={fields[ index ].type}
								className={`bsb-field bsb-text-style-field bsb-${fields[ index ].type}-field bsb-field-${index}`}
								autoComplete="off"
								data-required={( fields[ index ].required ? 'yes' : undefined )}
								style={{
									paddingTop       : ( 'custom' === style[ 0 ].size && '' !== style[ 0 ].deskPadding[ 0 ] ? style[ 0 ].deskPadding[ 0 ] + 'px' : undefined ),
									paddingRight     : ( 'custom' === style[ 0 ].size && '' !== style[ 0 ].deskPadding[ 1 ] ? style[ 0 ].deskPadding[ 1 ] + 'px' : undefined ),
									paddingBottom    : ( 'custom' === style[ 0 ].size && '' !== style[ 0 ].deskPadding[ 2 ] ? style[ 0 ].deskPadding[ 2 ] + 'px' : undefined ),
									paddingLeft      : ( 'custom' === style[ 0 ].size && '' !== style[ 0 ].deskPadding[ 3 ] ? style[ 0 ].deskPadding[ 3 ] + 'px' : undefined ),
									background       : ( undefined !== inputBG ? inputBG : undefined ),
									color            : ( undefined !== style[ 0 ].color ? BaseColorOutput( style[ 0 ].color ) : undefined ),
									fontSize         : getFontSizeOptionOutput( previewStyleFontSize, previewStyleFontSizeType ),
									lineHeight       : previewStyleLineHeight + previewStyleLineHeightType,
									borderRadius     : ( undefined !== style[ 0 ].borderRadius ? style[ 0 ].borderRadius + 'px' : undefined ),
									borderTopWidth   : ( style[ 0 ].borderWidth && '' !== style[ 0 ].borderWidth[ 0 ] ? style[ 0 ].borderWidth[ 0 ] + 'px' : undefined ),
									borderRightWidth : ( style[ 0 ].borderWidth && '' !== style[ 0 ].borderWidth[ 1 ] ? style[ 0 ].borderWidth[ 1 ] + 'px' : undefined ),
									borderBottomWidth: ( style[ 0 ].borderWidth && '' !== style[ 0 ].borderWidth[ 2 ] ? style[ 0 ].borderWidth[ 2 ] + 'px' : undefined ),
									borderLeftWidth  : ( style[ 0 ].borderWidth && '' !== style[ 0 ].borderWidth[ 3 ] ? style[ 0 ].borderWidth[ 3 ] + 'px' : undefined ),
									borderColor      : ( undefined === style[ 0 ].border ? undefined : BaseColorOutput( style[ 0 ].border, ( style[ 0 ].borderOpacity !== undefined ? style[ 0 ].borderOpacity : 1 ) ) ),
									boxShadow        : ( undefined !== style[ 0 ].boxShadow && undefined !== style[ 0 ].boxShadow[ 0 ] && style[ 0 ].boxShadow[ 0 ] ? ( undefined !== style[ 0 ].boxShadow[ 7 ] && style[ 0 ].boxShadow[ 7 ] ? 'inset ' : '' ) + ( undefined !== style[ 0 ].boxShadow[ 3 ] ? style[ 0 ].boxShadow[ 3 ] : 1 ) + 'px ' + ( undefined !== style[ 0 ].boxShadow[ 4 ] ? style[ 0 ].boxShadow[ 4 ] : 1 ) + 'px ' + ( undefined !== style[ 0 ].boxShadow[ 5 ] ? style[ 0 ].boxShadow[ 5 ] : 2 ) + 'px ' + ( undefined !== style[ 0 ].boxShadow[ 6 ] ? style[ 0 ].boxShadow[ 6 ] : 0 ) + 'px ' + BaseColorOutput( ( undefined !== style[ 0 ].boxShadow[ 1 ] ? style[ 0 ].boxShadow[ 1 ] : '#000000' ), ( undefined !== style[ 0 ].boxShadow[ 2 ] ? style[ 0 ].boxShadow[ 2 ] : 1 ) ) : undefined ),
								}}
							/>
						)}
						{'textarea' !== fields[ index ].type && 'select' !== fields[ index ].type && 'checkbox' !== fields[ index ].type && 'radio' !== fields[ index ].type && 'email' !== fields[ index ].type && (
							<input
								name={`bsb_field_${index}`}
								id={`bsb_field_${index}`}
								type={fields[ index ].type}
								placeholder={fields[ index ].placeholder}
								value={fields[ index ].default}
								data-type={fields[ index ].type}
								className={`bsb-field bsb-text-style-field bsb-${fields[ index ].type}-field bsb-field-${index}`}
								autoComplete="off"
								readOnly
								data-required={( fields[ index ].required ? 'yes' : undefined )}
								style={{
									paddingTop       : ( 'custom' === style[ 0 ].size && '' !== style[ 0 ].deskPadding[ 0 ] ? style[ 0 ].deskPadding[ 0 ] + 'px' : undefined ),
									paddingRight     : ( 'custom' === style[ 0 ].size && '' !== style[ 0 ].deskPadding[ 1 ] ? style[ 0 ].deskPadding[ 1 ] + 'px' : undefined ),
									paddingBottom    : ( 'custom' === style[ 0 ].size && '' !== style[ 0 ].deskPadding[ 2 ] ? style[ 0 ].deskPadding[ 2 ] + 'px' : undefined ),
									paddingLeft      : ( 'custom' === style[ 0 ].size && '' !== style[ 0 ].deskPadding[ 3 ] ? style[ 0 ].deskPadding[ 3 ] + 'px' : undefined ),
									background       : ( undefined !== inputBG ? inputBG : undefined ),
									color            : ( undefined !== style[ 0 ].color ? BaseColorOutput( style[ 0 ].color ) : undefined ),
									fontSize         : getFontSizeOptionOutput( previewStyleFontSize, previewStyleFontSizeType ),
									lineHeight       : previewStyleLineHeight + previewStyleLineHeightType,
									borderRadius     : ( undefined !== style[ 0 ].borderRadius ? style[ 0 ].borderRadius + 'px' : undefined ),
									borderTopWidth   : ( style[ 0 ].borderWidth && '' !== style[ 0 ].borderWidth[ 0 ] ? style[ 0 ].borderWidth[ 0 ] + 'px' : undefined ),
									borderRightWidth : ( style[ 0 ].borderWidth && '' !== style[ 0 ].borderWidth[ 1 ] ? style[ 0 ].borderWidth[ 1 ] + 'px' : undefined ),
									borderBottomWidth: ( style[ 0 ].borderWidth && '' !== style[ 0 ].borderWidth[ 2 ] ? style[ 0 ].borderWidth[ 2 ] + 'px' : undefined ),
									borderLeftWidth  : ( style[ 0 ].borderWidth && '' !== style[ 0 ].borderWidth[ 3 ] ? style[ 0 ].borderWidth[ 3 ] + 'px' : undefined ),
									borderColor      : ( undefined === style[ 0 ].border ? undefined : BaseColorOutput( style[ 0 ].border, ( style[ 0 ].borderOpacity !== undefined ? style[ 0 ].borderOpacity : 1 ) ) ),
									boxShadow        : ( undefined !== style[ 0 ].boxShadow && undefined !== style[ 0 ].boxShadow[ 0 ] && style[ 0 ].boxShadow[ 0 ] ? ( undefined !== style[ 0 ].boxShadow[ 7 ] && style[ 0 ].boxShadow[ 7 ] ? 'inset ' : '' ) + ( undefined !== style[ 0 ].boxShadow[ 3 ] ? style[ 0 ].boxShadow[ 3 ] : 1 ) + 'px ' + ( undefined !== style[ 0 ].boxShadow[ 4 ] ? style[ 0 ].boxShadow[ 4 ] : 1 ) + 'px ' + ( undefined !== style[ 0 ].boxShadow[ 5 ] ? style[ 0 ].boxShadow[ 5 ] : 2 ) + 'px ' + ( undefined !== style[ 0 ].boxShadow[ 6 ] ? style[ 0 ].boxShadow[ 6 ] : 0 ) + 'px ' + BaseColorOutput( ( undefined !== style[ 0 ].boxShadow[ 1 ] ? style[ 0 ].boxShadow[ 1 ] : '#000000' ), ( undefined !== style[ 0 ].boxShadow[ 2 ] ? style[ 0 ].boxShadow[ 2 ] : 1 ) ) : undefined ),
								}}
							/>
						)}
					</>
				)}
				{undefined !== fields[ index ].description && '' !== fields[ index ].description && (
					<span className={'bsb-field-help'}>{( fields[ index ].description ? fields[ index ].description : '' )}</span>
				)}
				{isFieldSelected && (
					<>
						<div className="base-blocks-field-item-controls base-blocks-field-item__move-menu">
							<Button
								icon="arrow-up"
								onClick={() => index === 0 ? undefined : onMoveBackward( index )}
								className="base-blocks-field-item__move-backward"
								label={__( 'Move Field Up', 'gutenam-blocks' )}
								aria-disabled={index === 0}
								disabled={!isFieldSelected || index === 0}
							/>
							<Button
								icon="arrow-down"
								onClick={() => ( index + 1 ) === fields.length ? undefined : onMoveForward( index )}
								className="base-blocks-field-item__move-forward"
								label={__( 'Move Field Down', 'gutenam-blocks' )}
								aria-disabled={( index + 1 ) === fields.length}
								disabled={!isFieldSelected || ( index + 1 ) === fields.length}
							/>
						</div>
						<div className="base-blocks-field-item-controls base-blocks-field-item__inline-menu">
							<Button
								icon="admin-page"
								onClick={() => onDuplicateField( index )}
								className="base-blocks-field-item__duplicate"
								label={__( 'Duplicate Field', 'gutenam-blocks' )}
								disabled={!isFieldSelected}
							/>
							<Button
								icon="no-alt"
								onClick={() => onRemoveField( index )}
								className="base-blocks-field-item__remove"
								label={__( 'Remove Field', 'gutenam-blocks' )}
								disabled={!isFieldSelected || 1 === fields.length}
							/>
						</div>
					</>
				)}
			</div>
		);
	};
	const renderFieldOutput = (
		<>
			{times( fields.length, n => fieldOutput( n ) )}
		</>
	);
	const actionControls = ( index ) => {

		return (
			<CheckboxControl
				key={'action-controls-' + index.toString()}
				label={actionOptions[ index ].label}
				help={( '' !== actionOptions[ index ].help ? actionOptions[ index ].help : undefined )}
				checked={actions.includes( actionOptions[ index ].value )}
				disabled={actionOptions[ index ].isDisabled}
				onChange={( isChecked ) => {
					if ( isChecked && !actionOptions[ index ].isDisabled ) {
						addAction( actionOptions[ index ].value );
					} else {
						removeAction( actionOptions[ index ].value );
					}
				}}
			/>
		);
	};

	const renderCSS = () => {
		let inputBGA = '';
		let inputGradA;
		let inputGradA2;
		let inputBox = '';
		let btnHBG = '';
		let btnHBGnorm;
		let btnHGrad;
		let btnHGrad2;
		let btnHBox = '';
		let btnRad = '0';
		let btnBox2 = '';
		if ( undefined !== style[ 0 ].backgroundActiveType && 'gradient' === style[ 0 ].backgroundActiveType && undefined !== style[ 0 ].gradientActive ) {
			inputGradA = ( undefined === style[ 0 ].backgroundActive ? BaseColorOutput( '#ffffff', ( style[ 0 ].backgroundActiveOpacity !== undefined ? style[ 0 ].backgroundActiveOpacity : 1 ) ) : BaseColorOutput( style[ 0 ].backgroundActive, ( style[ 0 ].backgroundActiveOpacity !== undefined ? style[ 0 ].backgroundActiveOpacity : 1 ) ) );
			inputGradA2 = ( undefined === style[ 0 ].gradientActive[ 0 ] ? BaseColorOutput( '#777777', ( style[ 0 ].gradientActive[ 1 ] !== undefined ? style[ 0 ].gradientActive[ 1 ] : 1 ) ) : BaseColorOutput( style[ 0 ].gradientActive[ 0 ], ( style[ 0 ].gradientActive[ 1 ] !== undefined ? style[ 0 ].gradientActive[ 1 ] : 1 ) ) );
			if ( 'radial' === style[ 0 ].gradientActive[ 4 ] ) {
				inputBGA = `radial-gradient(at ${( undefined === style[ 0 ].gradientActive[ 6 ] ? 'center center' : style[ 0 ].gradientActive[ 6 ] )}, ${inputGradA} ${( undefined === style[ 0 ].gradientActive[ 2 ] ? '0' : style[ 0 ].gradientActive[ 2 ] )}%, ${inputGradA2} ${( undefined === style[ 0 ].gradientActive[ 3 ] ? '100' : style[ 0 ].gradientActive[ 3 ] )}%)`;
			} else if ( 'linear' === style[ 0 ].gradientActive[ 4 ] ) {
				inputBGA = `linear-gradient(${( undefined === style[ 0 ].gradientActive[ 5 ] ? '180' : style[ 0 ].gradientActive[ 5 ] )}deg, ${inputGradA} ${( undefined === style[ 0 ].gradientActive[ 2 ] ? '0' : style[ 0 ].gradientActive[ 2 ] )}%, ${inputGradA2} ${( undefined === style[ 0 ].gradientActive[ 3 ] ? '100' : style[ 0 ].gradientActive[ 3 ] )}%)`;
			}
		} else if ( undefined !== style[ 0 ].backgroundActive && '' !== style[ 0 ].backgroundActive ) {
			inputBGA = BaseColorOutput( style[ 0 ].backgroundActive, ( style[ 0 ].backgroundActiveOpacity !== undefined ? style[ 0 ].backgroundActiveOpacity : 1 ) );
		}
		if ( undefined !== style[ 0 ].boxShadowActive && undefined !== style[ 0 ].boxShadowActive[ 0 ] && style[ 0 ].boxShadowActive[ 0 ] ) {
			inputBox = `${( undefined !== style[ 0 ].boxShadowActive && undefined !== style[ 0 ].boxShadowActive[ 0 ] && style[ 0 ].boxShadowActive[ 0 ] ? ( undefined !== style[ 0 ].boxShadowActive[ 7 ] && style[ 0 ].boxShadowActive[ 7 ] ? 'inset ' : '' ) + ( undefined !== style[ 0 ].boxShadowActive[ 3 ] ? style[ 0 ].boxShadowActive[ 3 ] : 1 ) + 'px ' + ( undefined !== style[ 0 ].boxShadowActive[ 4 ] ? style[ 0 ].boxShadowActive[ 4 ] : 1 ) + 'px ' + ( undefined !== style[ 0 ].boxShadowActive[ 5 ] ? style[ 0 ].boxShadowActive[ 5 ] : 2 ) + 'px ' + ( undefined !== style[ 0 ].boxShadowActive[ 6 ] ? style[ 0 ].boxShadowActive[ 6 ] : 0 ) + 'px ' + BaseColorOutput( ( undefined !== style[ 0 ].boxShadowActive[ 1 ] ? style[ 0 ].boxShadowActive[ 1 ] : '#000000' ), ( undefined !== style[ 0 ].boxShadowActive[ 2 ] ? style[ 0 ].boxShadowActive[ 2 ] : 1 ) ) : undefined )}`;
		}
		if ( undefined !== submit[ 0 ].backgroundHoverType && 'gradient' === submit[ 0 ].backgroundHoverType && undefined !== submit[ 0 ].gradientHover ) {
			btnHGrad = ( undefined === submit[ 0 ].backgroundHover ? BaseColorOutput( '#ffffff', ( submit[ 0 ].backgroundHoverOpacity !== undefined ? submit[ 0 ].backgroundHoverOpacity : 1 ) ) : BaseColorOutput( submit[ 0 ].backgroundHover, ( submit[ 0 ].backgroundHoverOpacity !== undefined ? submit[ 0 ].backgroundHoverOpacity : 1 ) ) );
			btnHGrad2 = ( undefined === submit[ 0 ].gradientHover[ 0 ] ? BaseColorOutput( '#777777', ( submit[ 0 ].gradientHover[ 1 ] !== undefined ? submit[ 0 ].gradientHover[ 1 ] : 1 ) ) : BaseColorOutput( submit[ 0 ].gradientHover[ 0 ], ( submit[ 0 ].gradientHover[ 1 ] !== undefined ? submit[ 0 ].gradientHover[ 1 ] : 1 ) ) );
			if ( 'radial' === submit[ 0 ].gradientHover[ 4 ] ) {
				btnHBG = `radial-gradient(at ${( undefined === submit[ 0 ].gradientHover[ 6 ] ? 'center center' : submit[ 0 ].gradientHover[ 6 ] )}, ${btnHGrad} ${( undefined === submit[ 0 ].gradientHover[ 2 ] ? '0' : submit[ 0 ].gradientHover[ 2 ] )}%, ${btnHGrad2} ${( undefined === submit[ 0 ].gradientHover[ 3 ] ? '100' : submit[ 0 ].gradientHover[ 3 ] )}%)`;
			} else if ( 'linear' === submit[ 0 ].gradientHover[ 4 ] ) {
				btnHBG = `linear-gradient(${( undefined === submit[ 0 ].gradientHover[ 5 ] ? '180' : submit[ 0 ].gradientHover[ 5 ] )}deg, ${btnHGrad} ${( undefined === submit[ 0 ].gradientHover[ 2 ] ? '0' : submit[ 0 ].gradientHover[ 2 ] )}%, ${btnHGrad2} ${( undefined === submit[ 0 ].gradientHover[ 3 ] ? '100' : submit[ 0 ].gradientHover[ 3 ] )}%)`;
			}
		} else if ( undefined !== submit[ 0 ].backgroundHover && '' !== submit[ 0 ].backgroundHover ) {
			btnHBGnorm = BaseColorOutput( submit[ 0 ].backgroundHover, ( submit[ 0 ].backgroundHoverOpacity !== undefined ? submit[ 0 ].backgroundHoverOpacity : 1 ) );
		}
		if ( undefined !== submit[ 0 ].boxShadowHover && undefined !== submit[ 0 ].boxShadowHover[ 0 ] && submit[ 0 ].boxShadowHover[ 0 ] && undefined !== submit[ 0 ].boxShadowHover[ 7 ] && false === submit[ 0 ].boxShadowHover[ 7 ] ) {
			btnHBox = `${( undefined !== submit[ 0 ].boxShadowHover && undefined !== submit[ 0 ].boxShadowHover[ 0 ] && submit[ 0 ].boxShadowHover[ 0 ] ? ( undefined !== submit[ 0 ].boxShadowHover[ 7 ] && submit[ 0 ].boxShadowHover[ 7 ] ? 'inset ' : '' ) + ( undefined !== submit[ 0 ].boxShadowHover[ 3 ] ? submit[ 0 ].boxShadowHover[ 3 ] : 1 ) + 'px ' + ( undefined !== submit[ 0 ].boxShadowHover[ 4 ] ? submit[ 0 ].boxShadowHover[ 4 ] : 1 ) + 'px ' + ( undefined !== submit[ 0 ].boxShadowHover[ 5 ] ? submit[ 0 ].boxShadowHover[ 5 ] : 2 ) + 'px ' + ( undefined !== submit[ 0 ].boxShadowHover[ 6 ] ? submit[ 0 ].boxShadowHover[ 6 ] : 0 ) + 'px ' + BaseColorOutput( ( undefined !== submit[ 0 ].boxShadowHover[ 1 ] ? submit[ 0 ].boxShadowHover[ 1 ] : '#000000' ), ( undefined !== submit[ 0 ].boxShadowHover[ 2 ] ? submit[ 0 ].boxShadowHover[ 2 ] : 1 ) ) : undefined )}`;
			btnBox2 = 'none';
			btnRad = '0';
		}
		if ( undefined !== submit[ 0 ].boxShadowHover && undefined !== submit[ 0 ].boxShadowHover[ 0 ] && submit[ 0 ].boxShadowHover[ 0 ] && undefined !== submit[ 0 ].boxShadowHover[ 7 ] && true === submit[ 0 ].boxShadowHover[ 7 ] ) {
			btnBox2 = `${( undefined !== submit[ 0 ].boxShadowHover && undefined !== submit[ 0 ].boxShadowHover[ 0 ] && submit[ 0 ].boxShadowHover[ 0 ] ? ( undefined !== submit[ 0 ].boxShadowHover[ 7 ] && submit[ 0 ].boxShadowHover[ 7 ] ? 'inset ' : '' ) + ( undefined !== submit[ 0 ].boxShadowHover[ 3 ] ? submit[ 0 ].boxShadowHover[ 3 ] : 1 ) + 'px ' + ( undefined !== submit[ 0 ].boxShadowHover[ 4 ] ? submit[ 0 ].boxShadowHover[ 4 ] : 1 ) + 'px ' + ( undefined !== submit[ 0 ].boxShadowHover[ 5 ] ? submit[ 0 ].boxShadowHover[ 5 ] : 2 ) + 'px ' + ( undefined !== submit[ 0 ].boxShadowHover[ 6 ] ? submit[ 0 ].boxShadowHover[ 6 ] : 0 ) + 'px ' + BaseColorOutput( ( undefined !== submit[ 0 ].boxShadowHover[ 1 ] ? submit[ 0 ].boxShadowHover[ 1 ] : '#000000' ), ( undefined !== submit[ 0 ].boxShadowHover[ 2 ] ? submit[ 0 ].boxShadowHover[ 2 ] : 1 ) ) : undefined )}`;
			btnRad = ( undefined !== submit[ 0 ].borderRadius ? submit[ 0 ].borderRadius : undefined );
			btnHBox = 'none';
		}
		return (
			`#bsb-form-${uniqueID} .base-blocks-form-field input.bsb-field:focus, #bsb-form-${uniqueID} .base-blocks-form-field textarea:focus {
					${( style[ 0 ].colorActive ? 'color:' + BaseColorOutput( style[ 0 ].colorActive ) + '!important;' : '' )}
					${( inputBGA ? 'background:' + inputBGA + '!important;' : '' )}
					${( inputBox ? 'box-shadow:' + inputBox + '!important;' : '' )}
					${( style[ 0 ].borderActive ? 'border-color:' + BaseColorOutput( style[ 0 ].borderActive ) + '!important;' : '' )}
				}
				#bsb-form-${uniqueID} .base-blocks-form-field .bsb-forms-submit:hover {
					${( submit[ 0 ].colorHover ? 'color:' + BaseColorOutput( submit[ 0 ].colorHover ) + '!important;' : '' )}
					${( btnHBGnorm ? 'background:' + btnHBGnorm + '!important;' : '' )}
					${( btnHBox ? 'box-shadow:' + btnHBox + '!important;' : '' )}
					${( submit[ 0 ].borderHover ? 'border-color:' + BaseColorOutput( submit[ 0 ].borderHover ) + '!important;' : '' )}
				}
				#bsb-form-${uniqueID} .base-blocks-form-field .bsb-forms-submit::before {
					${( btnHBG ? 'background:' + btnHBG + ';' : '' )}
					${( btnBox2 ? 'box-shadow:' + btnBox2 + ';' : '' )}
					${( btnRad ? 'border-radius:' + btnRad + 'px;' : '' )}
				}`
		);
	};
	const blockProps = useBlockProps( {
		className: className,
	} );
	return (
		<div {...blockProps}>
			<style>
				{renderCSS()}
			</style>
			{labelFont[ 0 ].google && (
				<WebfontLoader config={lconfig}>
				</WebfontLoader>
			)}
			{submitFont[ 0 ].google && (
				<WebfontLoader config={bconfig}>
				</WebfontLoader>
			)}
			<BlockControls key="controls">
				<AlignmentToolbar
					value={hAlign}
					label={ __('Align Submit', 'gutenam-blocks')}
					onChange={value => setAttributes( { hAlign: value } )}
				/>
				<CopyPasteAttributes
					attributes={ attributes }
					excludedAttrs={ nonTransAttrs }
					defaultAttributes={ metadata['attributes'] }
					blockSlug={ metadata['name'] }
					onPaste={ attributesToPaste => setAttributes( attributesToPaste ) }
				/>
			</BlockControls>
			<BaseInspectorControls blockSlug={ 'base/form' }>

				<InspectorControlTabs
					panelName={'form'}
					setActiveTab={( value ) => setActiveTab( value )}
					activeTab={activeTab}
				/>

				{( activeTab === 'general' ) &&
					<>
						{renderFieldControls}
						<PanelRow>
							<Button
								className="bsb-add-field"
								isPrimary={true}
								onClick={() => {
									const newFields = fields;
									newFields.push( {
										label          : '',
										showLabel      : true,
										placeholder    : '',
										default        : '',
										rows           : 4,
										options        : [],
										multiSelect    : false,
										inline         : false,
										showLink       : false,
										min            : '',
										max            : '',
										type           : 'text',
										required       : false,
										width          : [ '100', '', '' ],
										auto           : '',
										errorMessage   : '',
										requiredMessage: '',
									} );
									setAttributes( { fields: newFields } );
									saveFields( { multiSelect: fields[ 0 ].multiSelect }, 0 );
								}}
							>
								<Dashicon icon="plus"/>
								{__( 'Add Field', 'gutenam-blocks' )}
							</Button>
						</PanelRow>
						<BasePanelBody
							title={__( 'Actions After Submit', 'gutenam-blocks' )}
							initialOpen={false}
							panelName={'bsb-form-action-after-submit'}
						>
							{actionOptions &&
								times( actionOptions.length, n => actionControls( n ) )
							}
						</BasePanelBody>
						{actions.includes( 'email' ) && (
							<BasePanelBody
								title={__( 'Email Settings', 'gutenam-blocks' )}
								initialOpen={false}
								panelName={'bsb-form-email-settings'}
							>
								<TextControl
									label={__( 'Email To Address', 'gutenam-blocks' )}
									placeholder={__( 'name@example.com', 'gutenam-blocks' )}
									value={( undefined !== email[ 0 ].emailTo ? email[ 0 ].emailTo : '' )}
									onChange={( value ) => saveEmail( { emailTo: value } )}
									help={__( 'Seperate with comma for more then one email address.', 'gutenam-blocks' )}
								/>
								<TextControl
									label={__( 'Email Subject', 'gutenam-blocks' )}
									value={( undefined !== email[ 0 ].subject ? email[ 0 ].subject : '' )}
									onChange={( value ) => saveEmail( { subject: value } )}
								/>
								<TextControl
									label={__( 'From Email', 'gutenam-blocks' )}
									value={( undefined !== email[ 0 ].fromEmail ? email[ 0 ].fromEmail : '' )}
									onChange={( value ) => saveEmail( { fromEmail: value } )}
								/>
								<TextControl
									label={__( 'From Name', 'gutenam-blocks' )}
									value={( undefined !== email[ 0 ].fromName ? email[ 0 ].fromName : '' )}
									onChange={( value ) => saveEmail( { fromName: value } )}
								/>
								<SelectControl
									label={__( 'Reply To', 'gutenam-blocks' )}
									value={email[ 0 ].replyTo}
									options={[
										{ value: 'email_field', label: __( 'Email Field', 'gutenam-blocks' ) },
										{ value: 'from_email', label: __( 'From Email', 'gutenam-blocks' ) },
									]}
									onChange={value => {
										saveEmail( { replyTo: value } );
									}}
								/>
								<TextControl
									label={__( 'Cc', 'gutenam-blocks' )}
									value={( undefined !== email[ 0 ].cc ? email[ 0 ].cc : '' )}
									onChange={( value ) => saveEmail( { cc: value } )}
								/>
								<TextControl
									label={__( 'Bcc', 'gutenam-blocks' )}
									value={( undefined !== email[ 0 ].bcc ? email[ 0 ].bcc : '' )}
									onChange={( value ) => saveEmail( { bcc: value } )}
								/>
								<ToggleControl
									label={__( 'Send as HTML email?', 'gutenam-blocks' )}
									help={__( 'If off plain text is used.', 'gutenam-blocks' )}
									checked={( undefined !== email[ 0 ].html ? email[ 0 ].html : true )}
									onChange={( value ) => saveEmail( { html: value } )}
								/>
							</BasePanelBody>
						)}
						{actions.includes( 'redirect' ) && (
							<BasePanelBody
								title={__( 'Redirect Settings', 'gutenam-blocks' )}
								initialOpen={false}
								panelName={'bsb-form-redirect-settings'}
							>
								<URLInputControl
									label={__( 'Redirect to', 'gutenam-blocks' )}
									url={redirect}
									onChangeUrl={value => setAttributes( { redirect: value } )}
									additionalControls={false}
									{...props}
								/>
							</BasePanelBody>
						)}
						<BasePanelBody
							title={__( 'Basic Spam Check', 'gutenam-blocks' )}
							initialOpen={false}
							panelName={'bsb-form-basic-spam-check'}
						>
							<ToggleControl
								label={__( 'Enable Basic Honey Pot Spam Check', 'gutenam-blocks' )}
								help={__( 'This adds a hidden field that if filled out prevents the form from submitting.', 'gutenam-blocks' )}
								checked={honeyPot}
								onChange={( value ) => setAttributes( { honeyPot: value } )}
							/>
						</BasePanelBody>
						<BasePanelBody
							title={__( 'Google reCAPTCHA', 'gutenam-blocks' )}
							initialOpen={false}
							panelname={'bsb-form-google-recaptcha'}
						>
							<ToggleControl
								label={__( 'Enable Google reCAPTCHA', 'gutenam-blocks' )}
								checked={recaptcha}
								onChange={( value ) => setAttributes( { recaptcha: value } )}
							/>
							{recaptcha && (
								<>
									<div className="bst-btn-recaptch-settings-container components-base-control">
										<p className="bsb-component-label">{__( 'Recaptcha Version', 'gutenam-blocks' )}</p>
										<ButtonGroup className="bsb-radio-button-flex-fill" aria-label={__( 'Recaptcha Version', 'gutenam-blocks' )}>
											{map( recaptchaVersions, ( { name, key } ) => (
												<Button
													key={key}
													className="bst-btn-size-btn"
													isSmall
													isPrimary={recaptchaVersion === key}
													aria-pressed={recaptchaVersion === key}
													onClick={() => setAttributes( { recaptchaVersion: key } )}
												>
													{name}
												</Button>
											) )}
										</ButtonGroup>
									</div>

									<p>
											<ExternalLink href={RETRIEVE_KEY_URL}>{__( 'Get keys', 'gutenam-blocks' )}</ExternalLink>
											|&nbsp;
											<ExternalLink href={HELP_URL}>{__( 'Get help', 'gutenam-blocks' )}</ExternalLink>
											<br/>
											<ExternalLink href={LANGUAGE_URL}>{__( 'Language Codes', 'gutenam-blocks' )}</ExternalLink>
									</p>

									<TextControl
										label={__( 'Force Specific Language', 'gutenam-blocks' )}
										value={recaptchaLanguage}
										onChange={ ( value ) => setRecaptchaLanguage( value )}
									/>
									<TextControl
										label={__( 'Site Key', 'gutenam-blocks' )}
										value={siteKey}
										onChange={value => setSiteKey( value )}
									/>
									<TextControl
										label={__( 'Secret Key', 'gutenam-blocks' )}
										value={secretKey}
										onChange={value => setSecretKey( value )}
									/>
									<div className="components-base-control">
										<Button
											isPrimary
											onClick={() => saveKeys()}
											disabled={'' === siteKey || '' === secretKey}
										>
											{isSaving ? __( 'Saving', 'gutenam-blocks' ) : __( 'Save', 'gutenam-blocks' )}
										</Button>
										{isSavedKey && (
											<>
												&nbsp;
												<Button
													isSecondary
													onClick={() => removeKeys()}
												>
													{__( 'Remove', 'gutenam-blocks' )}
												</Button>
											</>
										)}
									</div>
								</>
							)}
						</BasePanelBody>
						<BasePanelBody
							title={__( 'Message Settings', 'gutenam-blocks' )}
							initialOpen={false}
							panelName={'bsb-form-message-settings'}
						>
							<TextControl
								label={__( 'Success Message', 'gutenam-blocks' )}
								placeholder={__( 'Submission Success, Thanks for getting in touch!', 'gutenam-blocks' )}
								value={( undefined !== messages[ 0 ].success ? messages[ 0 ].success : '' )}
								onChange={( value ) => saveMessages( { success: value } )}
							/>
							<BasePanelBody
								title={__( 'Success Message Colors', 'gutenam-blocks' )}
								initialOpen={false}
								panelName={'bsb-form-success-message-colors'}
							>
								<PopColorControl
									label={__( 'Success Message Color', 'gutenam-blocks' )}
									value={( messageFont[ 0 ].colorSuccess ? messageFont[ 0 ].colorSuccess : '' )}
									default={''}
									onChange={value => {
										saveMessageFont( { colorSuccess: value } );
									}}
								/>
								<PopColorControl
									label={__( 'Success Message Background', 'gutenam-blocks' )}
									value={( messageFont[ 0 ].backgroundSuccess ? messageFont[ 0 ].backgroundSuccess : '' )}
									default={''}
									onChange={value => {
										saveMessageFont( { backgroundSuccess: value } );
									}}
									opacityValue={messageFont[ 0 ].backgroundSuccessOpacity}
									onOpacityChange={value => saveMessageFont( { backgroundSuccessOpacity: value } )}
								/>
								<PopColorControl
									label={__( 'Success Message Border', 'gutenam-blocks' )}
									value={( messageFont[ 0 ].borderSuccess ? messageFont[ 0 ].borderSuccess : '' )}
									default={''}
									onChange={value => {
										saveMessageFont( { borderSuccess: value } );
									}}
								/>
							</BasePanelBody>
							<PanelRow>
								<TextControl
									label={__( 'Pre Submit Form Validation Error Message', 'gutenam-blocks' )}
									placeholder={__( 'Please fix the errors to proceed', 'gutenam-blocks' )}
									value={( undefined !== messages[ 0 ].preError ? messages[ 0 ].preError : '' )}
									onChange={( value ) => saveMessages( { preError: value } )}
								/>
							</PanelRow>
							<PanelRow>
								<TextControl
									label={__( 'Error Message', 'gutenam-blocks' )}
									placeholder={__( 'Submission Failed', 'gutenam-blocks' )}
									value={( undefined !== messages[ 0 ].error ? messages[ 0 ].error : '' )}
									onChange={( value ) => saveMessages( { error: value } )}
								/>
							</PanelRow>
							{recaptcha && (
								<PanelRow>
									<TextControl
										label={__( 'Recapcha Error Message', 'gutenam-blocks' )}
										placeholder={__( 'Submission Failed, reCaptcha spam prevention.', 'gutenam-blocks' )}
										value={( undefined !== messages[ 0 ].recaptchaerror ? messages[ 0 ].recaptchaerror : '' )}
										onChange={( value ) => saveMessages( { recaptchaerror: value } )}
									/>
								</PanelRow>
							)}
							<BasePanelBody
								title={__( 'Error Message Colors', 'gutenam-blocks' )}
								initialOpen={false}
								panelName={'bsb-form-error-message-colors'}
							>
								<PopColorControl
									label={__( 'Error Message Color', 'gutenam-blocks' )}
									value={( messageFont[ 0 ].colorError ? messageFont[ 0 ].colorError : '' )}
									default={''}
									onChange={value => {
										saveMessageFont( { colorError: value } );
									}}
								/>
								<PopColorControl
									label={__( 'Error Message Background', 'gutenam-blocks' )}
									value={( messageFont[ 0 ].backgroundError ? messageFont[ 0 ].backgroundError : '' )}
									default={''}
									onChange={value => {
										saveMessageFont( { backgroundError: value } );
									}}
									opacityValue={messageFont[ 0 ].backgroundErrorOpacity}
									onOpacityChange={value => saveMessageFont( { backgroundErrorOpacity: value } )}
								/>
								<PopColorControl
									label={__( 'Error Message Border', 'gutenam-blocks' )}
									value={( messageFont[ 0 ].borderError ? messageFont[ 0 ].borderError : '' )}
									default={''}
									onChange={value => {
										saveMessageFont( { borderError: value } );
									}}
								/>
							</BasePanelBody>
							<TypographyControls
								fontSize={messageFont[ 0 ].size}
								onFontSize={( value ) => saveMessageFont( { size: value } )}
								fontSizeType={messageFont[ 0 ].sizeType}
								onFontSizeType={( value ) => saveMessageFont( { sizeType: value } )}
								lineHeight={messageFont[ 0 ].lineHeight}
								onLineHeight={( value ) => saveMessageFont( { lineHeight: value } )}
								lineHeightType={messageFont[ 0 ].lineType}
								onLineHeightType={( value ) => saveMessageFont( { lineType: value } )}
							/>
							<h2>{__( 'Border Settings', 'gutenam-blocks' )}</h2>
							<MeasurementControls
								label={__( 'Border Width', 'gutenam-blocks' )}
								measurement={messageFont[ 0 ].borderWidth}
								control={messageFontBorderControl}
								onChange={( value ) => saveMessageFont( { borderWidth: value } )}
								onControl={( value ) => setMessageFontBorderControl( value )}
								min={0}
								max={20}
								step={1}
							/>
							<RangeControl
								label={__( 'Border Radius', 'gutenam-blocks' )}
								value={messageFont[ 0 ].borderRadius}
								onChange={value => {
									saveMessageFont( { borderRadius: value } );
								}}
								min={0}
								max={50}
							/>
							<BasePanelBody
								title={__( 'Advanced Message Font Settings', 'gutenam-blocks' )}
								initialOpen={false}
								panelName={'bsb-form-advanced-message-font-settings'}
							>
								<TypographyControls
									letterSpacing={messageFont[ 0 ].letterSpacing}
									onLetterSpacing={( value ) => saveMessageFont( { letterSpacing: value } )}
									fontFamily={messageFont[ 0 ].family}
									onFontFamily={( value ) => saveMessageFont( { family: value } )}
									onFontChange={( select ) => {
										saveMessageFont( {
											family: select.value,
											google: select.google,
										} );
									}}
									onFontArrayChange={( values ) => saveMessageFont( values )}
									googleFont={messageFont[ 0 ].google}
									onGoogleFont={( value ) => saveMessageFont( { google: value } )}
									loadGoogleFont={messageFont[ 0 ].loadGoogle}
									onLoadGoogleFont={( value ) => saveMessageFont( { loadGoogle: value } )}
									fontVariant={messageFont[ 0 ].variant}
									onFontVariant={( value ) => saveMessageFont( { variant: value } )}
									fontWeight={messageFont[ 0 ].weight}
									onFontWeight={( value ) => saveMessageFont( { weight: value } )}
									fontStyle={messageFont[ 0 ].style}
									onFontStyle={( value ) => saveMessageFont( { style: value } )}
									fontSubset={messageFont[ 0 ].subset}
									onFontSubset={( value ) => saveMessageFont( { subset: value } )}
									padding={messageFont[ 0 ].padding}
									onPadding={( value ) => saveMessageFont( { padding: value } )}
									paddingControl={messagePaddingControl}
									onPaddingControl={( value ) => setMessagePaddingControl( value )}
									margin={messageFont[ 0 ].margin}
									onMargin={( value ) => saveMessageFont( { margin: value } )}
									marginControl={messageMarginControl}
									onMarginControl={( value ) => setMessageMarginControl( value )}
								/>
							</BasePanelBody>
						</BasePanelBody>
						{actions.includes( 'mailerlite' ) && (
							<MailerLiteControls
								fields={fields}
								settings={mailerlite}
								save={( value ) => saveMailerlite( value )}
								saveMap={( value, i ) => saveMailerliteMap( value, i )}
							/>
						)}
						{actions.includes( 'fluentCRM' ) && (
							<FluentCRMControls
								fields={fields}
								settings={fluentcrm}
								save={( value ) => saveFluentCRM( value )}
								saveMap={( value, i ) => saveFluentCRMMap( value, i )}
							/>
						)}
					</>
				}

				{( activeTab === 'style' ) &&
					<>

						<BasePanelBody
							title={__( 'Field Styles', 'gutenam-blocks' )}
							panelName={'bsb-form-field-styles'}
						>
							<TypographyControls
								fontSize={style[ 0 ].fontSize}
								onFontSize={( value ) => saveStyle( { fontSize: value } )}
								fontSizeType={style[ 0 ].fontSizeType}
								onFontSizeType={( value ) => saveStyle( { fontSizeType: value } )}
								lineHeight={style[ 0 ].lineHeight}
								onLineHeight={( value ) => saveStyle( { lineHeight: value } )}
								lineHeightType={style[ 0 ].lineType}
								onLineHeightType={( value ) => saveStyle( { lineType: value } )}
							/>

							<div className="bst-btn-size-settings-container">
								<h2 className="bst-beside-btn-group">{__( 'Input Size' )}</h2>
								<ButtonGroup className="bst-button-size-type-options" aria-label={__( 'Input Size', 'gutenam-blocks' )}>
									{map( btnSizes, ( { name, key } ) => (
										<Button
											key={key}
											className="bst-btn-size-btn"
											isSmall
											isPrimary={style[ 0 ].size === key}
											aria-pressed={style[ 0 ].size === key}
											onClick={() => saveStyle( { size: key } )}
										>
											{name}
										</Button>
									) )}
								</ButtonGroup>
							</div>
							{'custom' === style[ 0 ].size && (
								<div className="bst-inner-sub-section">
									<h2 className="bst-heading-size-title bst-secondary-color-size">{__( 'Input Padding', 'gutenam-blocks' )}</h2>
									<TabPanel className="bst-size-tabs"
											  activeClass="active-tab"
											  tabs={[
												  {
													  name     : 'desk',
													  title    : <Dashicon icon="desktop"/>,
													  className: 'bst-desk-tab',
												  },
												  {
													  name     : 'tablet',
													  title    : <Dashicon icon="tablet"/>,
													  className: 'bst-tablet-tab',
												  },
												  {
													  name     : 'mobile',
													  title    : <Dashicon icon="smartphone"/>,
													  className: 'bst-mobile-tab',
												  },
											  ]}>
										{
											( tab ) => {
												let tabout;
												if ( tab.name ) {
													if ( 'mobile' === tab.name ) {
														tabout = (
															<>
																<MeasurementControls
																	label={__( 'Mobile Padding', 'gutenam-blocks' )}
																	measurement={style[ 0 ].mobilePadding}
																	control={mobilePaddingControl}
																	onChange={( value ) => saveStyle( { mobilePadding: value } )}
																	onControl={( value ) => setMobilePaddingControl( value )}
																	min={0}
																	max={100}
																	step={1}
																/>
															</>
														);
													} else if ( 'tablet' === tab.name ) {
														tabout = (
															<MeasurementControls
																label={__( 'Tablet Padding', 'gutenam-blocks' )}
																measurement={style[ 0 ].tabletPadding}
																control={tabletPaddingControl}
																onChange={( value ) => saveStyle( { tabletPadding: value } )}
																onControl={( value ) => setTabletPaddingControl( value )}
																min={0}
																max={100}
																step={1}
															/>
														);
													} else {
														tabout = (
															<MeasurementControls
																label={__( 'Desktop Padding', 'gutenam-blocks' )}
																measurement={style[ 0 ].deskPadding}
																control={deskPaddingControl}
																onChange={( value ) => saveStyle( { deskPadding: value } )}
																onControl={( value ) => setDeskPaddingControl( value )}
																min={0}
																max={100}
																step={1}
															/>
														);
													}
												}
												return <div className={tab.className} key={tab.className}>{tabout}</div>;
											}
										}
									</TabPanel>
								</div>
							)}
							<h2 className="bst-heading-size-title bst-secondary-color-size">{__( 'Input Colors', 'gutenam-blocks' )}</h2>
							<TabPanel className="bst-inspect-tabs bst-hover-tabs"
									  activeClass="active-tab"
									  tabs={[
										  {
											  name     : 'normal',
											  title    : __( 'Normal', 'gutenam-blocks' ),
											  className: 'bst-normal-tab',
										  },
										  {
											  name     : 'focus',
											  title    : __( 'Focus', 'gutenam-blocks' ),
											  className: 'bst-focus-tab',
										  },
									  ]}>
								{
									( tab ) => {
										let tabout;
										if ( tab.name ) {
											if ( 'focus' === tab.name ) {
												tabout = (
													<>
														<PopColorControl
															label={__( 'Input Focus Color', 'gutenam-blocks' )}
															value={( style[ 0 ].colorActive ? style[ 0 ].colorActive : '' )}
															default={''}
															onChange={value => {
																saveStyle( { colorActive: value } );
															}}
														/>
														<div className="bst-btn-size-settings-container">
															<h2 className="bst-beside-btn-group">{__( 'Background Type', 'gutenam-blocks' )}</h2>
															<ButtonGroup className="bst-button-size-type-options" aria-label={__( 'Background Type', 'gutenam-blocks' )}>
																{map( bgType, ( { name, key } ) => (
																	<Button
																		key={key}
																		className="bst-btn-size-btn"
																		isSmall
																		isPrimary={( undefined !== style[ 0 ].backgroundActiveType ? style[ 0 ].backgroundActiveType : 'solid' ) === key}
																		aria-pressed={( undefined !== style[ 0 ].backgroundActiveType ? style[ 0 ].backgroundActiveType : 'solid' ) === key}
																		onClick={() => saveStyle( { backgroundActiveType: key } )}
																	>
																		{name}
																	</Button>
																) )}
															</ButtonGroup>
														</div>
														{'gradient' !== style[ 0 ].backgroundActiveType && (
															<div className="bst-inner-sub-section">
																<PopColorControl
																	label={__( 'Input Focus Background', 'gutenam-blocks' )}
																	value={( style[ 0 ].backgroundActive ? style[ 0 ].backgroundActive : '' )}
																	default={''}
																	onChange={value => {
																		saveStyle( { backgroundActive: value } );
																	}}
																	opacityValue={style[ 0 ].backgroundActiveOpacity}
																	onOpacityChange={value => saveStyle( { backgroundActiveOpacity: value } )}
																	onArrayChange={( color, opacity ) => saveStyle( { backgroundActive: color, backgroundActiveOpacity: opacity } )}
																/>
															</div>
														)}
														{'gradient' === style[ 0 ].backgroundActiveType && (
															<div className="bst-inner-sub-section">
																<PopColorControl
																	label={__( 'Gradient Color 1', 'gutenam-blocks' )}
																	value={( style[ 0 ].backgroundActive ? style[ 0 ].backgroundActive : '' )}
																	default={''}
																	onChange={value => {
																		saveStyle( { backgroundActive: value } );
																	}}
																	opacityValue={style[ 0 ].backgroundActiveOpacity}
																	onOpacityChange={value => saveStyle( { backgroundActiveOpacity: value } )}
																	onArrayChange={( color, opacity ) => saveStyle( { backgroundActive: color, backgroundActiveOpacity: opacity } )}
																/>
																<RangeControl
																	label={__( 'Location', 'gutenam-blocks' )}
																	value={( style[ 0 ].gradientActive && undefined !== style[ 0 ].gradientActive[ 2 ] ? style[ 0 ].gradientActive[ 2 ] : 0 )}
																	onChange={( value ) => {
																		saveStyleGradientActive( value, 2 );
																	}}
																	min={0}
																	max={100}
																/>
																<PopColorControl
																	label={__( 'Gradient Color 2', 'gutenam-blocks' )}
																	value={( style[ 0 ].gradientActive && undefined !== style[ 0 ].gradientActive[ 0 ] ? style[ 0 ].gradientActive[ 0 ] : '#999999' )}
																	default={'#999999'}
																	opacityValue={( style[ 0 ].gradientActive && undefined !== style[ 0 ].gradientActive[ 1 ] ? style[ 0 ].gradientActive[ 1 ] : 1 )}
																	onChange={value => {
																		saveStyleGradientActive( value, 0 );
																	}}
																	onOpacityChange={value => {
																		saveStyleGradientActive( value, 1 );
																	}}
																/>
																<RangeControl
																	label={__( 'Location' )}
																	value={( style[ 0 ].gradientActive && undefined !== style[ 0 ].gradientActive[ 3 ] ? style[ 0 ].gradientActive[ 3 ] : 100 )}
																	onChange={( value ) => {
																		saveStyleGradientActive( value, 3 );
																	}}
																	min={0}
																	max={100}
																/>
																<div className="bst-btn-size-settings-container">
																	<h2 className="bst-beside-btn-group">{__( 'Gradient Type', 'gutenam-blocks' )}</h2>
																	<ButtonGroup className="bst-button-size-type-options" aria-label={__( 'Gradient Type', 'gutenam-blocks' )}>
																		{map( gradTypes, ( { name, key } ) => (
																			<Button
																				key={key}
																				className="bst-btn-size-btn"
																				isSmall
																				isPrimary={( style[ 0 ].gradientActive && undefined !== style[ 0 ].gradientActive[ 4 ] ? style[ 0 ].gradientActive[ 4 ] : 'linear' ) === key}
																				aria-pressed={( style[ 0 ].gradientActive && undefined !== style[ 0 ].gradientActive[ 4 ] ? style[ 0 ].gradientActive[ 4 ] : 'linear' ) === key}
																				onClick={() => {
																					saveStyleGradientActive( key, 4 );
																				}}
																			>
																				{name}
																			</Button>
																		) )}
																	</ButtonGroup>
																</div>
																{'radial' !== ( style[ 0 ].gradientActive && undefined !== style[ 0 ].gradientActive[ 4 ] ? style[ 0 ].gradientActive[ 4 ] : 'linear' ) && (
																	<RangeControl
																		label={__( 'Gradient Angle', 'gutenam-blocks' )}
																		value={( style[ 0 ].gradientActive && undefined !== style[ 0 ].gradientActive[ 5 ] ? style[ 0 ].gradientActive[ 5 ] : 180 )}
																		onChange={( value ) => {
																			saveStyleGradientActive( value, 5 );
																		}}
																		min={0}
																		max={360}
																	/>
																)}
																{'radial' === ( style[ 0 ].gradientActive && undefined !== style[ 0 ].gradientActive[ 4 ] ? style[ 0 ].gradientActive[ 4 ] : 'linear' ) && (
																	<SelectControl
																		label={__( 'Gradient Position', 'gutenam-blocks' )}
																		value={( style[ 0 ].gradientActive && undefined !== style[ 0 ].gradientActive[ 6 ] ? style[ 0 ].gradientActive[ 6 ] : 'center center' )}
																		options={[
																			{ value: 'center top', label: __( 'Center Top', 'gutenam-blocks' ) },
																			{ value: 'center center', label: __( 'Center Center', 'gutenam-blocks' ) },
																			{ value: 'center bottom', label: __( 'Center Bottom', 'gutenam-blocks' ) },
																			{ value: 'left top', label: __( 'Left Top', 'gutenam-blocks' ) },
																			{ value: 'left center', label: __( 'Left Center', 'gutenam-blocks' ) },
																			{ value: 'left bottom', label: __( 'Left Bottom', 'gutenam-blocks' ) },
																			{ value: 'right top', label: __( 'Right Top', 'gutenam-blocks' ) },
																			{ value: 'right center', label: __( 'Right Center', 'gutenam-blocks' ) },
																			{ value: 'right bottom', label: __( 'Right Bottom', 'gutenam-blocks' ) },
																		]}
																		onChange={value => {
																			saveStyleGradientActive( value, 6 );
																		}}
																	/>
																)}
															</div>
														)}
														<PopColorControl
															label={__( 'Input Focus Border', 'gutenam-blocks' )}
															value={( style[ 0 ].borderActive ? style[ 0 ].borderActive : '' )}
															default={''}
															onChange={value => {
																saveStyle( { borderActive: value } );
															}}
															opacityValue={style[ 0 ].borderActiveOpacity}
															onOpacityChange={value => saveStyle( { borderActiveOpacity: value } )}
															onArrayChange={( color, opacity ) => saveStyle( { borderActive: color, borderActiveOpacity: opacity } )}
														/>
														<BoxShadowControl
															label={__( 'Input Focus Box Shadow', 'gutenam-blocks' )}
															enable={( undefined !== style[ 0 ].boxShadowActive && undefined !== style[ 0 ].boxShadowActive[ 0 ] ? style[ 0 ].boxShadowActive[ 0 ] : false )}
															color={( undefined !== style[ 0 ].boxShadowActive && undefined !== style[ 0 ].boxShadowActive[ 1 ] ? style[ 0 ].boxShadowActive[ 1 ] : '#000000' )}
															default={'#000000'}
															opacity={( undefined !== style[ 0 ].boxShadowActive && undefined !== style[ 0 ].boxShadowActive[ 2 ] ? style[ 0 ].boxShadowActive[ 2 ] : 0.4 )}
															hOffset={( undefined !== style[ 0 ].boxShadowActive && undefined !== style[ 0 ].boxShadowActive[ 3 ] ? style[ 0 ].boxShadowActive[ 3 ] : 2 )}
															vOffset={( undefined !== style[ 0 ].boxShadowActive && undefined !== style[ 0 ].boxShadowActive[ 4 ] ? style[ 0 ].boxShadowActive[ 4 ] : 2 )}
															blur={( undefined !== style[ 0 ].boxShadowActive && undefined !== style[ 0 ].boxShadowActive[ 5 ] ? style[ 0 ].boxShadowActive[ 5 ] : 3 )}
															spread={( undefined !== style[ 0 ].boxShadowActive && undefined !== style[ 0 ].boxShadowActive[ 6 ] ? style[ 0 ].boxShadowActive[ 6 ] : 0 )}
															inset={( undefined !== style[ 0 ].boxShadowActive && undefined !== style[ 0 ].boxShadowActive[ 7 ] ? style[ 0 ].boxShadowActive[ 7 ] : false )}
															onEnableChange={value => {
																saveStyleBoxShadowActive( value, 0 );
															}}
															onColorChange={value => {
																saveStyleBoxShadowActive( value, 1 );
															}}
															onOpacityChange={value => {
																saveStyleBoxShadowActive( value, 2 );
															}}
															onHOffsetChange={value => {
																saveStyleBoxShadowActive( value, 3 );
															}}
															onVOffsetChange={value => {
																saveStyleBoxShadowActive( value, 4 );
															}}
															onBlurChange={value => {
																saveStyleBoxShadowActive( value, 5 );
															}}
															onSpreadChange={value => {
																saveStyleBoxShadowActive( value, 6 );
															}}
															onInsetChange={value => {
																saveStyleBoxShadowActive( value, 7 );
															}}
														/>
													</>
												);
											} else {
												tabout = (
													<>
														<PopColorControl
															label={__( 'Input Color', 'gutenam-blocks' )}
															value={( style[ 0 ].color ? style[ 0 ].color : '' )}
															default={''}
															onChange={value => {
																saveStyle( { color: value } );
															}}
														/>
														<div className="bst-btn-size-settings-container">
															<h2 className="bst-beside-btn-group">{__( 'Background Type', 'gutenam-blocks' )}</h2>
															<ButtonGroup className="bst-button-size-type-options" aria-label={__( 'Background Type', 'gutenam-blocks' )}>
																{map( bgType, ( { name, key } ) => (
																	<Button
																		key={key}
																		className="bst-btn-size-btn"
																		isSmall
																		isPrimary={( undefined !== style[ 0 ].backgroundType ? style[ 0 ].backgroundType : 'solid' ) === key}
																		aria-pressed={( undefined !== style[ 0 ].backgroundType ? style[ 0 ].backgroundType : 'solid' ) === key}
																		onClick={() => saveStyle( { backgroundType: key } )}
																	>
																		{name}
																	</Button>
																) )}
															</ButtonGroup>
														</div>
														{'gradient' !== style[ 0 ].backgroundType && (
															<div className="bst-inner-sub-section">
																<PopColorControl
																	label={__( 'Input Background', 'gutenam-blocks' )}
																	value={( style[ 0 ].background ? style[ 0 ].background : '' )}
																	default={''}
																	onChange={value => {
																		saveStyle( { background: value } );
																	}}
																	opacityValue={style[ 0 ].backgroundOpacity}
																	onOpacityChange={value => saveStyle( { backgroundOpacity: value } )}
																	onArrayChange={( color, opacity ) => saveStyle( { background: color, backgroundOpacity: opacity } )}
																/>
															</div>
														)}
														{'gradient' === style[ 0 ].backgroundType && (
															<div className="bst-inner-sub-section">
																<PopColorControl
																	label={__( 'Gradient Color 1', 'gutenam-blocks' )}
																	value={( style[ 0 ].background ? style[ 0 ].background : '' )}
																	default={''}
																	onChange={value => {
																		saveStyle( { background: value } );
																	}}
																	opacityValue={style[ 0 ].backgroundOpacity}
																	onOpacityChange={value => saveStyle( { backgroundOpacity: value } )}
																	onArrayChange={( color, opacity ) => saveStyle( { background: color, backgroundOpacity: opacity } )}
																/>
																<RangeControl
																	label={__( 'Location', 'gutenam-blocks' )}
																	value={( style[ 0 ].gradient && undefined !== style[ 0 ].gradient[ 2 ] ? style[ 0 ].gradient[ 2 ] : 0 )}
																	onChange={( value ) => {
																		saveStyleGradient( value, 2 );
																	}}
																	min={0}
																	max={100}
																/>
																<PopColorControl
																	label={__( 'Gradient Color 2', 'gutenam-blocks' )}
																	value={( style[ 0 ].gradient && undefined !== style[ 0 ].gradient[ 0 ] ? style[ 0 ].gradient[ 0 ] : '#999999' )}
																	default={'#999999'}
																	opacityValue={( style[ 0 ].gradient && undefined !== style[ 0 ].gradient[ 1 ] ? style[ 0 ].gradient[ 1 ] : 1 )}
																	onChange={value => {
																		saveStyleGradient( value, 0 );
																	}}
																	onOpacityChange={value => {
																		saveStyleGradient( value, 1 );
																	}}
																/>
																<RangeControl
																	label={__( 'Location', 'gutenam-blocks' )}
																	value={( style[ 0 ].gradient && undefined !== style[ 0 ].gradient[ 3 ] ? style[ 0 ].gradient[ 3 ] : 100 )}
																	onChange={( value ) => {
																		saveStyleGradient( value, 3 );
																	}}
																	min={0}
																	max={100}
																/>
																<div className="bst-btn-size-settings-container">
																	<h2 className="bst-beside-btn-group">{__( 'Gradient Type', 'gutenam-blocks' )}</h2>
																	<ButtonGroup className="bst-button-size-type-options" aria-label={__( 'Gradient Type', 'gutenam-blocks' )}>
																		{map( gradTypes, ( { name, key } ) => (
																			<Button
																				key={key}
																				className="bst-btn-size-btn"
																				isSmall
																				isPrimary={( style[ 0 ].gradient && undefined !== style[ 0 ].gradient[ 4 ] ? style[ 0 ].gradient[ 4 ] : 'linear' ) === key}
																				aria-pressed={( style[ 0 ].gradient && undefined !== style[ 0 ].gradient[ 4 ] ? style[ 0 ].gradient[ 4 ] : 'linear' ) === key}
																				onClick={() => {
																					saveStyleGradient( key, 4 );
																				}}
																			>
																				{name}
																			</Button>
																		) )}
																	</ButtonGroup>
																</div>
																{'radial' !== ( style[ 0 ].gradient && undefined !== style[ 0 ].gradient[ 4 ] ? style[ 0 ].gradient[ 4 ] : 'linear' ) && (
																	<RangeControl
																		label={__( 'Gradient Angle', 'gutenam-blocks' )}
																		value={( style[ 0 ].gradient && undefined !== style[ 0 ].gradient[ 5 ] ? style[ 0 ].gradient[ 5 ] : 180 )}
																		onChange={( value ) => {
																			saveStyleGradient( value, 5 );
																		}}
																		min={0}
																		max={360}
																	/>
																)}
																{'radial' === ( style[ 0 ].gradient && undefined !== style[ 0 ].gradient[ 4 ] ? style[ 0 ].gradient[ 4 ] : 'linear' ) && (
																	<SelectControl
																		label={__( 'Gradient Position', 'gutenam-blocks' )}
																		value={( style[ 0 ].gradient && undefined !== style[ 0 ].gradient[ 6 ] ? style[ 0 ].gradient[ 6 ] : 'center center' )}
																		options={[
																			{ value: 'center top', label: __( 'Center Top', 'gutenam-blocks' ) },
																			{ value: 'center center', label: __( 'Center Center', 'gutenam-blocks' ) },
																			{ value: 'center bottom', label: __( 'Center Bottom', 'gutenam-blocks' ) },
																			{ value: 'left top', label: __( 'Left Top', 'gutenam-blocks' ) },
																			{ value: 'left center', label: __( 'Left Center', 'gutenam-blocks' ) },
																			{ value: 'left bottom', label: __( 'Left Bottom', 'gutenam-blocks' ) },
																			{ value: 'right top', label: __( 'Right Top', 'gutenam-blocks' ) },
																			{ value: 'right center', label: __( 'Right Center', 'gutenam-blocks' ) },
																			{ value: 'right bottom', label: __( 'Right Bottom', 'gutenam-blocks' ) },
																		]}
																		onChange={value => {
																			saveStyleGradient( value, 6 );
																		}}
																	/>
																)}
															</div>
														)}
														<PopColorControl
															label={__( 'Input Border', 'gutenam-blocks' )}
															value={( style[ 0 ].border ? style[ 0 ].border : '' )}
															default={''}
															onChange={value => {
																saveStyle( { border: value } );
															}}
															opacityValue={style[ 0 ].borderOpacity}
															onOpacityChange={value => saveStyle( { borderOpacity: value } )}
															onArrayChange={( color, opacity ) => saveStyle( { border: color, borderOpacity: opacity } )}
														/>
														<BoxShadowControl
															label={__( 'Input Box Shadow', 'gutenam-blocks' )}
															enable={( undefined !== style[ 0 ].boxShadow && undefined !== style[ 0 ].boxShadow[ 0 ] ? style[ 0 ].boxShadow[ 0 ] : false )}
															color={( undefined !== style[ 0 ].boxShadow && undefined !== style[ 0 ].boxShadow[ 1 ] ? style[ 0 ].boxShadow[ 1 ] : '#000000' )}
															default={'#000000'}
															opacity={( undefined !== style[ 0 ].boxShadow && undefined !== style[ 0 ].boxShadow[ 2 ] ? style[ 0 ].boxShadow[ 2 ] : 0.4 )}
															hOffset={( undefined !== style[ 0 ].boxShadow && undefined !== style[ 0 ].boxShadow[ 3 ] ? style[ 0 ].boxShadow[ 3 ] : 2 )}
															vOffset={( undefined !== style[ 0 ].boxShadow && undefined !== style[ 0 ].boxShadow[ 4 ] ? style[ 0 ].boxShadow[ 4 ] : 2 )}
															blur={( undefined !== style[ 0 ].boxShadow && undefined !== style[ 0 ].boxShadow[ 5 ] ? style[ 0 ].boxShadow[ 5 ] : 3 )}
															spread={( undefined !== style[ 0 ].boxShadow && undefined !== style[ 0 ].boxShadow[ 6 ] ? style[ 0 ].boxShadow[ 6 ] : 0 )}
															inset={( undefined !== style[ 0 ].boxShadow && undefined !== style[ 0 ].boxShadow[ 7 ] ? style[ 0 ].boxShadow[ 7 ] : false )}
															onEnableChange={value => {
																saveStyleBoxShadow( value, 0 );
															}}
															onColorChange={value => {
																saveStyleBoxShadow( value, 1 );
															}}
															onOpacityChange={value => {
																saveStyleBoxShadow( value, 2 );
															}}
															onHOffsetChange={value => {
																saveStyleBoxShadow( value, 3 );
															}}
															onVOffsetChange={value => {
																saveStyleBoxShadow( value, 4 );
															}}
															onBlurChange={value => {
																saveStyleBoxShadow( value, 5 );
															}}
															onSpreadChange={value => {
																saveStyleBoxShadow( value, 6 );
															}}
															onInsetChange={value => {
																saveStyleBoxShadow( value, 7 );
															}}
														/>
													</>
												);
											}
										}
										return <div className={tab.className} key={tab.className}>{tabout}</div>;
									}
								}
							</TabPanel>
							<h2>{__( 'Border Settings', 'gutenam-blocks' )}</h2>
							<MeasurementControls
								label={__( 'Border Width', 'gutenam-blocks' )}
								measurement={style[ 0 ].borderWidth}
								control={borderControl}
								onChange={( value ) => saveStyle( { borderWidth: value } )}
								onControl={( value ) => setBorderControl( value )}
								min={0}
								max={20}
								step={1}
							/>
							<RangeControl
								label={__( 'Border Radius', 'gutenam-blocks' )}
								value={style[ 0 ].borderRadius}
								onChange={value => {
									saveStyle( { borderRadius: value } );
								}}
								min={0}
								max={50}
							/>
							<ResponsiveRangeControls
								label={__( 'Field Row Gap', 'gutenam-blocks' )}
								value={( undefined !== style[ 0 ].rowGap ? style[ 0 ].rowGap : '' )}
								onChange={value => {
									saveStyle( { rowGap: value } );
								}}
								tabletValue={( undefined !== style[ 0 ].tabletRowGap ? style[ 0 ].tabletRowGap : '' )}
								onChangeTablet={value => {
									saveStyle( { tabletRowGap: value } );
								}}
								mobileValue={( undefined !== style[ 0 ].mobileRowGap ? style[ 0 ].mobileRowGap : '' )}
								onChangeMobile={value => {
									saveStyle( { mobileRowGap: value } );
								}}
								min={0}
								max={100}
								step={1}
								showUnit={true}
								unit={'px'}
								units={[ 'px' ]}
							/>
							<ResponsiveRangeControls
								label={__( 'Field Column Gutter', 'gutenam-blocks' )}
								value={( undefined !== style[ 0 ].gutter ? style[ 0 ].gutter : '' )}
								onChange={value => {
									saveStyle( { gutter: value } );
								}}
								tabletValue={( undefined !== style[ 0 ].tabletGutter ? style[ 0 ].tabletGutter : '' )}
								onChangeTablet={value => {
									saveStyle( { tabletGutter: value } );
								}}
								mobileValue={( undefined !== style[ 0 ].mobileGutter ? style[ 0 ].mobileGutter : '' )}
								onChangeMobile={value => {
									saveStyle( { mobileGutter: value } );
								}}
								min={0}
								max={50}
								step={2}
								showUnit={true}
								unit={'px'}
								units={[ 'px' ]}
							/>
						</BasePanelBody>
						<BasePanelBody
							title={__( 'Label Styles', 'gutenam-blocks' )}
							initialOpen={false}
							panelName={'bsb-form-label-styles'}
						>
							<PopColorControl
								label={__( 'Label Color', 'gutenam-blocks' )}
								value={( labelFont[ 0 ].color ? labelFont[ 0 ].color : '' )}
								default={''}
								onChange={value => {
									saveLabelFont( { color: value } );
								}}
							/>
							<ToggleControl
								label={__( 'Show Required?', 'gutenam-blocks' )}
								help={__( 'If off required asterisk is removed.', 'gutenam-blocks' )}
								checked={( undefined !== style[ 0 ].showRequired ? style[ 0 ].showRequired : true )}
								onChange={( value ) => saveStyle( { showRequired: value } )}
							/>
							{style[ 0 ].showRequired && (
								<PopColorControl
									label={__( 'Required Color', 'gutenam-blocks' )}
									value={( style[ 0 ].requiredColor ? style[ 0 ].requiredColor : '' )}
									default={''}
									onChange={value => {
										saveStyle( { requiredColor: value } );
									}}
								/>
							)}
							<TypographyControls
								fontSize={labelFont[ 0 ].size}
								onFontSize={( value ) => saveLabelFont( { size: value } )}
								fontSizeType={labelFont[ 0 ].sizeType}
								onFontSizeType={( value ) => saveLabelFont( { sizeType: value } )}
								lineHeight={labelFont[ 0 ].lineHeight}
								onLineHeight={( value ) => saveLabelFont( { lineHeight: value } )}
								lineHeightType={labelFont[ 0 ].lineType}
								onLineHeightType={( value ) => saveLabelFont( { lineType: value } )}
							/>
							<BasePanelBody
								title={__( 'Advanced Label Settings', 'gutenam-blocks' )}
								initialOpen={false}
								panelName={'bsb-form-advanced-label-settings'}
							>
								<TypographyControls
									letterSpacing={labelFont[ 0 ].letterSpacing}
									onLetterSpacing={( value ) => saveLabelFont( { letterSpacing: value } )}
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
									padding={labelFont[ 0 ].padding}
									onPadding={( value ) => saveLabelFont( { padding: value } )}
									paddingControl={labelPaddingControl}
									onPaddingControl={( value ) => setLabelPaddingControl( value )}
									margin={labelFont[ 0 ].margin}
									onMargin={( value ) => saveLabelFont( { margin: value } )}
									marginControl={labelMarginControl}
									onMarginControl={( value ) => setLabelMarginControl( value )}
								/>
							</BasePanelBody>
						</BasePanelBody>
						<BasePanelBody
							title={__( 'Submit Styles', 'gutenam-blocks' )}
							initialOpen={false}
							panelName={'bsb-form-submit-styles'}
						>
							<h2 className="bst-heading-size-title bst-secondary-color-size">{__( 'Column Width', 'gutenam-blocks' )}</h2>
							<TabPanel className="bst-size-tabs"
									  activeClass="active-tab"
									  tabs={[
										  {
											  name     : 'desk',
											  title    : <Dashicon icon="desktop"/>,
											  className: 'bst-desk-tab',
										  },
										  {
											  name     : 'tablet',
											  title    : <Dashicon icon="tablet"/>,
											  className: 'bst-tablet-tab',
										  },
										  {
											  name     : 'mobile',
											  title    : <Dashicon icon="smartphone"/>,
											  className: 'bst-mobile-tab',
										  },
									  ]}>
								{
									( tab ) => {
										let tabout;
										if ( tab.name ) {
											if ( 'mobile' === tab.name ) {
												tabout = (
													<>
														<SelectControl
															value={submit[ 0 ].width[ 2 ]}
															options={[
																{ value: '20', label: __( '20%', 'gutenam-blocks' ) },
																{ value: '25', label: __( '25%', 'gutenam-blocks' ) },
																{ value: '33', label: __( '33%', 'gutenam-blocks' ) },
																{ value: '40', label: __( '40%', 'gutenam-blocks' ) },
																{ value: '50', label: __( '50%', 'gutenam-blocks' ) },
																{ value: '60', label: __( '60%', 'gutenam-blocks' ) },
																{ value: '66', label: __( '66%', 'gutenam-blocks' ) },
																{ value: '75', label: __( '75%', 'gutenam-blocks' ) },
																{ value: '80', label: __( '80%', 'gutenam-blocks' ) },
																{ value: '100', label: __( '100%', 'gutenam-blocks' ) },
																{ value: 'unset', label: __( 'Unset', 'gutenam-blocks' ) },
															]}
															onChange={value => {
																saveSubmit( { width: [ ( submit[ 0 ].width[ 0 ] ? submit[ 0 ].width[ 0 ] : '100' ), ( submit[ 0 ].width[ 1 ] ? submit[ 0 ].width[ 1 ] : '' ), value ] } );
															}}
														/>
													</>
												);
											} else if ( 'tablet' === tab.name ) {
												tabout = (
													<>
														<SelectControl
															value={submit[ 0 ].width[ 1 ]}
															options={[
																{ value: '20', label: __( '20%', 'gutenam-blocks' ) },
																{ value: '25', label: __( '25%', 'gutenam-blocks' ) },
																{ value: '33', label: __( '33%', 'gutenam-blocks' ) },
																{ value: '40', label: __( '40%', 'gutenam-blocks' ) },
																{ value: '50', label: __( '50%', 'gutenam-blocks' ) },
																{ value: '60', label: __( '60%', 'gutenam-blocks' ) },
																{ value: '66', label: __( '66%', 'gutenam-blocks' ) },
																{ value: '75', label: __( '75%', 'gutenam-blocks' ) },
																{ value: '80', label: __( '80%', 'gutenam-blocks' ) },
																{ value: '100', label: __( '100%', 'gutenam-blocks' ) },
																{ value: 'unset', label: __( 'Unset', 'gutenam-blocks' ) },
															]}
															onChange={value => {
																saveSubmit( { width: [ ( submit[ 0 ].width[ 0 ] ? submit[ 0 ].width[ 0 ] : '100' ), value, ( submit[ 0 ].width[ 2 ] ? submit[ 0 ].width[ 2 ] : '' ) ] } );
															}}
														/>
													</>
												);
											} else {
												tabout = (
													<>
														<SelectControl
															value={submit[ 0 ].width[ 0 ]}
															options={[
																{ value: '20', label: __( '20%', 'gutenam-blocks' ) },
																{ value: '25', label: __( '25%', 'gutenam-blocks' ) },
																{ value: '33', label: __( '33%', 'gutenam-blocks' ) },
																{ value: '40', label: __( '40%', 'gutenam-blocks' ) },
																{ value: '50', label: __( '50%', 'gutenam-blocks' ) },
																{ value: '60', label: __( '60%', 'gutenam-blocks' ) },
																{ value: '66', label: __( '66%', 'gutenam-blocks' ) },
																{ value: '75', label: __( '75%', 'gutenam-blocks' ) },
																{ value: '80', label: __( '80%', 'gutenam-blocks' ) },
																{ value: '100', label: __( '100%', 'gutenam-blocks' ) },
																{ value: 'unset', label: __( 'Unset', 'gutenam-blocks' ) },
															]}
															onChange={value => {
																saveSubmit( { width: [ value, ( submit[ 0 ].width[ 1 ] ? submit[ 0 ].width[ 1 ] : '' ), ( submit[ 0 ].width[ 2 ] ? submit[ 0 ].width[ 2 ] : '' ) ] } );
															}}
														/>
													</>
												);
											}
										}
										return <div className={tab.className} key={tab.className}>{tabout}</div>;
									}
								}
							</TabPanel>
							<div className="bst-btn-size-settings-container">
								<h2 className="bst-beside-btn-group">{__( 'Button Size' )}</h2>
								<ButtonGroup className="bst-button-size-type-options" aria-label={__( 'Button Size', 'gutenam-blocks' )}>
									{map( btnSizes, ( { name, key } ) => (
										<Button
											key={key}
											className="bst-btn-size-btn"
											isSmall
											isPrimary={submit[ 0 ].size === key}
											aria-pressed={submit[ 0 ].size === key}
											onClick={() => saveSubmit( { size: key } )}
										>
											{name}
										</Button>
									) )}
								</ButtonGroup>
							</div>
							{'custom' === submit[ 0 ].size && (
								<div className="bst-inner-sub-section">
									<h2 className="bst-heading-size-title bst-secondary-color-size">{__( 'Input Padding', 'gutenam-blocks' )}</h2>
									<TabPanel className="bst-size-tabs"
											  activeClass="active-tab"
											  tabs={[
												  {
													  name     : 'desk',
													  title    : <Dashicon icon="desktop"/>,
													  className: 'bst-desk-tab',
												  },
												  {
													  name     : 'tablet',
													  title    : <Dashicon icon="tablet"/>,
													  className: 'bst-tablet-tab',
												  },
												  {
													  name     : 'mobile',
													  title    : <Dashicon icon="smartphone"/>,
													  className: 'bst-mobile-tab',
												  },
											  ]}>
										{
											( tab ) => {
												let tabout;
												if ( tab.name ) {
													if ( 'mobile' === tab.name ) {
														tabout = (
															<>
																<MeasurementControls
																	label={__( 'Mobile Padding', 'gutenam-blocks' )}
																	measurement={submit[ 0 ].mobilePadding}
																	control={submitMobilePaddingControl}
																	onChange={( value ) => saveSubmit( { mobilePadding: value } )}
																	onControl={( value ) => setSubmitMobilePaddingControl( value )}
																	min={0}
																	max={100}
																	step={1}
																/>
															</>
														);
													} else if ( 'tablet' === tab.name ) {
														tabout = (
															<MeasurementControls
																label={__( 'Tablet Padding', 'gutenam-blocks' )}
																measurement={submit[ 0 ].tabletPadding}
																control={submitTabletPaddingControl}
																onChange={( value ) => saveSubmit( { tabletPadding: value } )}
																onControl={( value ) => setSubmitTabletPaddingControl( value )}
																min={0}
																max={100}
																step={1}
															/>
														);
													} else {
														tabout = (
															<MeasurementControls
																label={__( 'Desktop Padding', 'gutenam-blocks' )}
																measurement={submit[ 0 ].deskPadding}
																control={submitDeskPaddingControl}
																onChange={( value ) => saveSubmit( { deskPadding: value } )}
																onControl={( value ) => setSubmitDeskPaddingControl( value )}
																min={0}
																max={100}
																step={1}
															/>
														);
													}
												}
												return <div className={tab.className} key={tab.className}>{tabout}</div>;
											}
										}
									</TabPanel>
								</div>
							)}
							<div className="bst-btn-size-settings-container">
								<h2 className="bst-beside-btn-group">{__( 'Button Width' )}</h2>
								<ButtonGroup className="bst-button-size-type-options" aria-label={__( 'Button Width' )}>
									{map( btnWidths, ( { name, key } ) => (
										<Button
											key={key}
											className="bst-btn-size-btn"
											isSmall
											isPrimary={submit[ 0 ].widthType === key}
											aria-pressed={submit[ 0 ].widthType === key}
											onClick={() => saveSubmit( { widthType: key } )}
										>
											{name}
										</Button>
									) )}
								</ButtonGroup>
							</div>
							{'fixed' === submit[ 0 ].widthType && (
								<div className="bst-inner-sub-section">
									<h2 className="bst-heading-size-title bst-secondary-color-size">{__( 'Fixed Width' )}</h2>
									<TabPanel className="bst-size-tabs"
											  activeClass="active-tab"
											  tabs={[
												  {
													  name     : 'desk',
													  title    : <Dashicon icon="desktop"/>,
													  className: 'bst-desk-tab',
												  },
												  {
													  name     : 'tablet',
													  title    : <Dashicon icon="tablet"/>,
													  className: 'bst-tablet-tab',
												  },
												  {
													  name     : 'mobile',
													  title    : <Dashicon icon="smartphone"/>,
													  className: 'bst-mobile-tab',
												  },
											  ]}>
										{
											( tab ) => {
												let tabout;
												if ( tab.name ) {
													if ( 'mobile' === tab.name ) {
														tabout = (
															<RangeControl
																value={( submit[ 0 ].fixedWidth && undefined !== submit[ 0 ].fixedWidth[ 2 ] ? submit[ 0 ].fixedWidth[ 2 ] : undefined )}
																onChange={value => {
																	saveSubmit( { fixedWidth: [ ( undefined !== submit[ 0 ].fixedWidth && undefined !== submit[ 0 ].fixedWidth[ 0 ] ? submit[ 0 ].fixedWidth[ 0 ] : '' ), ( undefined !== submit[ 0 ].fixedWidth && undefined !== submit[ 0 ].fixedWidth[ 1 ] ? submit[ 0 ].fixedWidth[ 1 ] : '' ), value ] } );
																}}
																min={10}
																max={500}
															/>
														);
													} else if ( 'tablet' === tab.name ) {
														tabout = (
															<RangeControl
																value={( submit[ 0 ].fixedWidth && undefined !== submit[ 0 ].fixedWidth[ 1 ] ? submit[ 0 ].fixedWidth[ 1 ] : undefined )}
																onChange={value => {
																	saveSubmit( { fixedWidth: [ ( undefined !== submit[ 0 ].fixedWidth && undefined !== submit[ 0 ].fixedWidth[ 0 ] ? submit[ 0 ].fixedWidth[ 0 ] : '' ), value, ( undefined !== submit[ 0 ].fixedWidth && undefined !== submit[ 0 ].fixedWidth[ 2 ] ? submit[ 0 ].fixedWidth[ 2 ] : '' ) ] } );
																}}
																min={10}
																max={500}
															/>
														);
													} else {
														tabout = (
															<RangeControl
																value={( submit[ 0 ].fixedWidth && undefined !== submit[ 0 ].fixedWidth[ 0 ] ? submit[ 0 ].fixedWidth[ 0 ] : undefined )}
																onChange={value => {
																	saveSubmit( { fixedWidth: [ value, ( undefined !== submit[ 0 ].fixedWidth && undefined !== submit[ 0 ].fixedWidth[ 1 ] ? submit[ 0 ].fixedWidth[ 1 ] : '' ), ( undefined !== submit[ 0 ].fixedWidth && undefined !== submit[ 0 ].fixedWidth[ 2 ] ? submit[ 0 ].fixedWidth[ 2 ] : '' ) ] } );
																}}
																min={10}
																max={500}
															/>
														);
													}
												}
												return <div className={tab.className} key={tab.className}>{tabout}</div>;
											}
										}
									</TabPanel>
								</div>
							)}
							<h2 className="bst-heading-size-title bst-secondary-color-size">{__( 'Button Colors', 'gutenam-blocks' )}</h2>
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
															label={__( 'Text Hover Color', 'gutenam-blocks' )}
															value={( submit[ 0 ].colorHover ? submit[ 0 ].colorHover : '' )}
															default={''}
															onChange={value => {
																saveSubmit( { colorHover: value } );
															}}
														/>
														<div className="bst-btn-size-settings-container">
															<h2 className="bst-beside-btn-group">{__( 'Background Type', 'gutenam-blocks' )}</h2>
															<ButtonGroup className="bst-button-size-type-options" aria-label={__( 'Background Type', 'gutenam-blocks' )}>
																{map( bgType, ( { name, key } ) => (
																	<Button
																		key={key}
																		className="bst-btn-size-btn"
																		isSmall
																		isPrimary={( undefined !== submit[ 0 ].backgroundHoverType ? submit[ 0 ].backgroundHoverType : 'solid' ) === key}
																		aria-pressed={( undefined !== submit[ 0 ].backgroundHoverType ? submit[ 0 ].backgroundHoverType : 'solid' ) === key}
																		onClick={() => saveSubmit( { backgroundHoverType: key } )}
																	>
																		{name}
																	</Button>
																) )}
															</ButtonGroup>
														</div>
														{'gradient' !== submit[ 0 ].backgroundHoverType && (
															<div className="bst-inner-sub-section">
																<PopColorControl
																	label={__( 'Button Hover Background', 'gutenam-blocks' )}
																	value={( submit[ 0 ].backgroundHover ? submit[ 0 ].backgroundHover : '' )}
																	default={''}
																	onChange={value => {
																		saveSubmit( { backgroundHover: value } );
																	}}
																	opacityValue={submit[ 0 ].backgroundHoverOpacity}
																	onOpacityChange={value => saveSubmit( { backgroundHoverOpacity: value } )}
																	onArrayChange={( color, opacity ) => saveSubmit( { backgroundHover: color, backgroundHoverOpacity: opacity } )}
																/>
															</div>
														)}
														{'gradient' === submit[ 0 ].backgroundHoverType && (
															<div className="bst-inner-sub-section">
																<PopColorControl
																	label={__( 'Gradient Color 1', 'gutenam-blocks' )}
																	value={( submit[ 0 ].backgroundHover ? submit[ 0 ].backgroundHover : '' )}
																	default={''}
																	onChange={value => {
																		saveSubmit( { backgroundHover: value } );
																	}}
																	opacityValue={submit[ 0 ].backgroundHoverOpacity}
																	onOpacityChange={value => saveSubmit( { backgroundHoverOpacity: value } )}
																	onArrayChange={( color, opacity ) => saveSubmit( { backgroundHover: color, backgroundHoverOpacity: opacity } )}
																/>
																<RangeControl
																	label={__( 'Location', 'gutenam-blocks' )}
																	value={( submit[ 0 ].gradientHover && undefined !== submit[ 0 ].gradientHover[ 2 ] ? submit[ 0 ].gradientHover[ 2 ] : 0 )}
																	onChange={( value ) => {
																		saveSubmitGradientHover( value, 2 );
																	}}
																	min={0}
																	max={100}
																/>
																<PopColorControl
																	label={__( 'Gradient Color 2', 'gutenam-blocks' )}
																	value={( submit[ 0 ].gradientHover && undefined !== submit[ 0 ].gradientHover[ 0 ] ? submit[ 0 ].gradientHover[ 0 ] : '#999999' )}
																	default={'#999999'}
																	opacityValue={( submit[ 0 ].gradientHover && undefined !== submit[ 0 ].gradientHover[ 1 ] ? submit[ 0 ].gradientHover[ 1 ] : 1 )}
																	onChange={value => {
																		saveSubmitGradientHover( value, 0 );
																	}}
																	onOpacityChange={value => {
																		saveSubmitGradientHover( value, 1 );
																	}}
																/>
																<RangeControl
																	label={__( 'Location' )}
																	value={( submit[ 0 ].gradientHover && undefined !== submit[ 0 ].gradientHover[ 3 ] ? submit[ 0 ].gradientHover[ 3 ] : 100 )}
																	onChange={( value ) => {
																		saveSubmitGradientHover( value, 3 );
																	}}
																	min={0}
																	max={100}
																/>
																<div className="bst-btn-size-settings-container">
																	<h2 className="bst-beside-btn-group">{__( 'Gradient Type', 'gutenam-blocks' )}</h2>
																	<ButtonGroup className="bst-button-size-type-options" aria-label={__( 'Gradient Type', 'gutenam-blocks' )}>
																		{map( gradTypes, ( { name, key } ) => (
																			<Button
																				key={key}
																				className="bst-btn-size-btn"
																				isSmall
																				isPrimary={( submit[ 0 ].gradientHover && undefined !== submit[ 0 ].gradientHover[ 4 ] ? submit[ 0 ].gradientHover[ 4 ] : 'linear' ) === key}
																				aria-pressed={( submit[ 0 ].gradientHover && undefined !== submit[ 0 ].gradientHover[ 4 ] ? submit[ 0 ].gradientHover[ 4 ] : 'linear' ) === key}
																				onClick={() => {
																					saveSubmitGradientHover( key, 4 );
																				}}
																			>
																				{name}
																			</Button>
																		) )}
																	</ButtonGroup>
																</div>
																{'radial' !== ( submit[ 0 ].gradientHover && undefined !== submit[ 0 ].gradientHover[ 4 ] ? submit[ 0 ].gradientHover[ 4 ] : 'linear' ) && (
																	<RangeControl
																		label={__( 'Gradient Angle', 'gutenam-blocks' )}
																		value={( submit[ 0 ].gradientHover && undefined !== submit[ 0 ].gradientHover[ 5 ] ? submit[ 0 ].gradientHover[ 5 ] : 180 )}
																		onChange={( value ) => {
																			saveSubmitGradientHover( value, 5 );
																		}}
																		min={0}
																		max={360}
																	/>
																)}
																{'radial' === ( submit[ 0 ].gradientHover && undefined !== submit[ 0 ].gradientHover[ 4 ] ? submit[ 0 ].gradientHover[ 4 ] : 'linear' ) && (
																	<SelectControl
																		label={__( 'Gradient Position', 'gutenam-blocks' )}
																		value={( submit[ 0 ].gradientHover && undefined !== submit[ 0 ].gradientHover[ 6 ] ? submit[ 0 ].gradientHover[ 6 ] : 'center center' )}
																		options={[
																			{ value: 'center top', label: __( 'Center Top', 'gutenam-blocks' ) },
																			{ value: 'center center', label: __( 'Center Center', 'gutenam-blocks' ) },
																			{ value: 'center bottom', label: __( 'Center Bottom', 'gutenam-blocks' ) },
																			{ value: 'left top', label: __( 'Left Top', 'gutenam-blocks' ) },
																			{ value: 'left center', label: __( 'Left Center', 'gutenam-blocks' ) },
																			{ value: 'left bottom', label: __( 'Left Bottom', 'gutenam-blocks' ) },
																			{ value: 'right top', label: __( 'Right Top', 'gutenam-blocks' ) },
																			{ value: 'right center', label: __( 'Right Center', 'gutenam-blocks' ) },
																			{ value: 'right bottom', label: __( 'Right Bottom', 'gutenam-blocks' ) },
																		]}
																		onChange={value => {
																			saveSubmitGradientHover( value, 6 );
																		}}
																	/>
																)}
															</div>
														)}
														<PopColorControl
															label={__( 'Button Hover Border', 'gutenam-blocks' )}
															value={( submit[ 0 ].borderHover ? submit[ 0 ].borderHover : '' )}
															default={''}
															onChange={value => {
																saveSubmit( { borderHover: value } );
															}}
															opacityValue={submit[ 0 ].borderHoverOpacity}
															onOpacityChange={value => saveSubmit( { borderHoverOpacity: value } )}
															onArrayChange={( color, opacity ) => saveSubmit( { borderHover: color, borderHoverOpacity: opacity } )}
														/>
														<BoxShadowControl
															label={__( 'Button Hover Box Shadow', 'gutenam-blocks' )}
															enable={( undefined !== submit[ 0 ].boxShadowHover && undefined !== submit[ 0 ].boxShadowHover[ 0 ] ? submit[ 0 ].boxShadowHover[ 0 ] : false )}
															color={( undefined !== submit[ 0 ].boxShadowHover && undefined !== submit[ 0 ].boxShadowHover[ 1 ] ? submit[ 0 ].boxShadowHover[ 1 ] : '#000000' )}
															default={'#000000'}
															opacity={( undefined !== submit[ 0 ].boxShadowHover && undefined !== submit[ 0 ].boxShadowHover[ 2 ] ? submit[ 0 ].boxShadowHover[ 2 ] : 0.4 )}
															hOffset={( undefined !== submit[ 0 ].boxShadowHover && undefined !== submit[ 0 ].boxShadowHover[ 3 ] ? submit[ 0 ].boxShadowHover[ 3 ] : 2 )}
															vOffset={( undefined !== submit[ 0 ].boxShadowHover && undefined !== submit[ 0 ].boxShadowHover[ 4 ] ? submit[ 0 ].boxShadowHover[ 4 ] : 2 )}
															blur={( undefined !== submit[ 0 ].boxShadowHover && undefined !== submit[ 0 ].boxShadowHover[ 5 ] ? submit[ 0 ].boxShadowHover[ 5 ] : 3 )}
															spread={( undefined !== submit[ 0 ].boxShadowHover && undefined !== submit[ 0 ].boxShadowHover[ 6 ] ? submit[ 0 ].boxShadowHover[ 6 ] : 0 )}
															inset={( undefined !== submit[ 0 ].boxShadowHover && undefined !== submit[ 0 ].boxShadowHover[ 7 ] ? submit[ 0 ].boxShadowHover[ 7 ] : false )}
															onEnableChange={value => {
																saveSubmitBoxShadowHover( value, 0 );
															}}
															onColorChange={value => {
																saveSubmitBoxShadowHover( value, 1 );
															}}
															onOpacityChange={value => {
																saveSubmitBoxShadowHover( value, 2 );
															}}
															onHOffsetChange={value => {
																saveSubmitBoxShadowHover( value, 3 );
															}}
															onVOffsetChange={value => {
																saveSubmitBoxShadowHover( value, 4 );
															}}
															onBlurChange={value => {
																saveSubmitBoxShadowHover( value, 5 );
															}}
															onSpreadChange={value => {
																saveSubmitBoxShadowHover( value, 6 );
															}}
															onInsetChange={value => {
																saveSubmitBoxShadowHover( value, 7 );
															}}
														/>
													</>
												);
											} else {
												tabout = (
													<>
														<PopColorControl
															label={__( 'Text Color', 'gutenam-blocks' )}
															value={( submit[ 0 ].color ? submit[ 0 ].color : '' )}
															default={''}
															onChange={value => {
																saveSubmit( { color: value } );
															}}
														/>
														<div className="bst-btn-size-settings-container">
															<h2 className="bst-beside-btn-group">{__( 'Background Type', 'gutenam-blocks' )}</h2>
															<ButtonGroup className="bst-button-size-type-options" aria-label={__( 'Background Type', 'gutenam-blocks' )}>
																{map( bgType, ( { name, key } ) => (
																	<Button
																		key={key}
																		className="bst-btn-size-btn"
																		isSmall
																		isPrimary={( undefined !== submit[ 0 ].backgroundType ? submit[ 0 ].backgroundType : 'solid' ) === key}
																		aria-pressed={( undefined !== submit[ 0 ].backgroundType ? submit[ 0 ].backgroundType : 'solid' ) === key}
																		onClick={() => saveSubmit( { backgroundType: key } )}
																	>
																		{name}
																	</Button>
																) )}
															</ButtonGroup>
														</div>
														{'gradient' !== submit[ 0 ].backgroundType && (
															<div className="bst-inner-sub-section">
																<PopColorControl
																	label={__( 'Button Background', 'gutenam-blocks' )}
																	value={( submit[ 0 ].background ? submit[ 0 ].background : '' )}
																	default={''}
																	onChange={value => {
																		saveSubmit( { background: value } );
																	}}
																	opacityValue={submit[ 0 ].backgroundOpacity}
																	onOpacityChange={value => saveSubmit( { backgroundOpacity: value } )}
																	onArrayChange={( color, opacity ) => saveSubmit( { background: color, backgroundOpacity: opacity } )}
																/>
															</div>
														)}
														{'gradient' === submit[ 0 ].backgroundType && (
															<div className="bst-inner-sub-section">
																<PopColorControl
																	label={__( 'Gradient Color 1', 'gutenam-blocks' )}
																	value={( submit[ 0 ].background ? submit[ 0 ].background : '' )}
																	default={''}
																	onChange={value => {
																		saveSubmit( { background: value } );
																	}}
																	opacityValue={submit[ 0 ].backgroundOpacity}
																	onOpacityChange={value => saveSubmit( { backgroundOpacity: value } )}
																	onArrayChange={( color, opacity ) => saveSubmit( { background: color, backgroundOpacity: opacity } )}
																/>
																<RangeControl
																	label={__( 'Location', 'gutenam-blocks' )}
																	value={( submit[ 0 ].gradient && undefined !== submit[ 0 ].gradient[ 2 ] ? submit[ 0 ].gradient[ 2 ] : 0 )}
																	onChange={( value ) => {
																		saveSubmitGradient( value, 2 );
																	}}
																	min={0}
																	max={100}
																/>
																<PopColorControl
																	label={__( 'Gradient Color 2', 'gutenam-blocks' )}
																	value={( submit[ 0 ].gradient && undefined !== submit[ 0 ].gradient[ 0 ] ? submit[ 0 ].gradient[ 0 ] : '#999999' )}
																	default={'#999999'}
																	opacityValue={( submit[ 0 ].gradient && undefined !== submit[ 0 ].gradient[ 1 ] ? submit[ 0 ].gradient[ 1 ] : 1 )}
																	onChange={value => {
																		saveSubmitGradient( value, 0 );
																	}}
																	onOpacityChange={value => {
																		saveSubmitGradient( value, 1 );
																	}}
																/>
																<RangeControl
																	label={__( 'Location', 'gutenam-blocks' )}
																	value={( submit[ 0 ].gradient && undefined !== submit[ 0 ].gradient[ 3 ] ? submit[ 0 ].gradient[ 3 ] : 100 )}
																	onChange={( value ) => {
																		saveSubmitGradient( value, 3 );
																	}}
																	min={0}
																	max={100}
																/>
																<div className="bst-btn-size-settings-container">
																	<h2 className="bst-beside-btn-group">{__( 'Gradient Type', 'gutenam-blocks' )}</h2>
																	<ButtonGroup className="bst-button-size-type-options" aria-label={__( 'Gradient Type', 'gutenam-blocks' )}>
																		{map( gradTypes, ( { name, key } ) => (
																			<Button
																				key={key}
																				className="bst-btn-size-btn"
																				isSmall
																				isPrimary={( submit[ 0 ].gradient && undefined !== submit[ 0 ].gradient[ 4 ] ? submit[ 0 ].gradient[ 4 ] : 'linear' ) === key}
																				aria-pressed={( submit[ 0 ].gradient && undefined !== submit[ 0 ].gradient[ 4 ] ? submit[ 0 ].gradient[ 4 ] : 'linear' ) === key}
																				onClick={() => {
																					saveSubmitGradient( key, 4 );
																				}}
																			>
																				{name}
																			</Button>
																		) )}
																	</ButtonGroup>
																</div>
																{'radial' !== ( submit[ 0 ].gradient && undefined !== submit[ 0 ].gradient[ 4 ] ? submit[ 0 ].gradient[ 4 ] : 'linear' ) && (
																	<RangeControl
																		label={__( 'Gradient Angle', 'gutenam-blocks' )}
																		value={( submit[ 0 ].gradient && undefined !== submit[ 0 ].gradient[ 5 ] ? submit[ 0 ].gradient[ 5 ] : 180 )}
																		onChange={( value ) => {
																			saveSubmitGradient( value, 5 );
																		}}
																		min={0}
																		max={360}
																	/>
																)}
																{'radial' === ( submit[ 0 ].gradient && undefined !== submit[ 0 ].gradient[ 4 ] ? submit[ 0 ].gradient[ 4 ] : 'linear' ) && (
																	<SelectControl
																		label={__( 'Gradient Position', 'gutenam-blocks' )}
																		value={( submit[ 0 ].gradient && undefined !== submit[ 0 ].gradient[ 6 ] ? submit[ 0 ].gradient[ 6 ] : 'center center' )}
																		options={[
																			{ value: 'center top', label: __( 'Center Top', 'gutenam-blocks' ) },
																			{ value: 'center center', label: __( 'Center Center', 'gutenam-blocks' ) },
																			{ value: 'center bottom', label: __( 'Center Bottom', 'gutenam-blocks' ) },
																			{ value: 'left top', label: __( 'Left Top', 'gutenam-blocks' ) },
																			{ value: 'left center', label: __( 'Left Center', 'gutenam-blocks' ) },
																			{ value: 'left bottom', label: __( 'Left Bottom', 'gutenam-blocks' ) },
																			{ value: 'right top', label: __( 'Right Top', 'gutenam-blocks' ) },
																			{ value: 'right center', label: __( 'Right Center', 'gutenam-blocks' ) },
																			{ value: 'right bottom', label: __( 'Right Bottom', 'gutenam-blocks' ) },
																		]}
																		onChange={value => {
																			saveSubmitGradient( value, 6 );
																		}}
																	/>
																)}
															</div>
														)}
														<PopColorControl
															label={__( 'Button Border', 'gutenam-blocks' )}
															value={( submit[ 0 ].border ? submit[ 0 ].border : '' )}
															default={''}
															onChange={value => {
																saveSubmit( { border: value } );
															}}
															opacityValue={submit[ 0 ].borderOpacity}
															onOpacityChange={value => saveSubmit( { borderOpacity: value } )}
															onArrayChange={( color, opacity ) => saveSubmit( { border: color, borderOpacity: opacity } )}
														/>
														<BoxShadowControl
															label={__( 'Button Box Shadow', 'gutenam-blocks' )}
															enable={( undefined !== submit[ 0 ].boxShadow && undefined !== submit[ 0 ].boxShadow[ 0 ] ? submit[ 0 ].boxShadow[ 0 ] : false )}
															color={( undefined !== submit[ 0 ].boxShadow && undefined !== submit[ 0 ].boxShadow[ 1 ] ? submit[ 0 ].boxShadow[ 1 ] : '#000000' )}
															default={'#000000'}
															opacity={( undefined !== submit[ 0 ].boxShadow && undefined !== submit[ 0 ].boxShadow[ 2 ] ? submit[ 0 ].boxShadow[ 2 ] : 0.4 )}
															hOffset={( undefined !== submit[ 0 ].boxShadow && undefined !== submit[ 0 ].boxShadow[ 3 ] ? submit[ 0 ].boxShadow[ 3 ] : 2 )}
															vOffset={( undefined !== submit[ 0 ].boxShadow && undefined !== submit[ 0 ].boxShadow[ 4 ] ? submit[ 0 ].boxShadow[ 4 ] : 2 )}
															blur={( undefined !== submit[ 0 ].boxShadow && undefined !== submit[ 0 ].boxShadow[ 5 ] ? submit[ 0 ].boxShadow[ 5 ] : 3 )}
															spread={( undefined !== submit[ 0 ].boxShadow && undefined !== submit[ 0 ].boxShadow[ 6 ] ? submit[ 0 ].boxShadow[ 6 ] : 0 )}
															inset={( undefined !== submit[ 0 ].boxShadow && undefined !== submit[ 0 ].boxShadow[ 7 ] ? submit[ 0 ].boxShadow[ 7 ] : false )}
															onEnableChange={value => {
																saveSubmitBoxShadow( value, 0 );
															}}
															onColorChange={value => {
																saveSubmitBoxShadow( value, 1 );
															}}
															onOpacityChange={value => {
																saveSubmitBoxShadow( value, 2 );
															}}
															onHOffsetChange={value => {
																saveSubmitBoxShadow( value, 3 );
															}}
															onVOffsetChange={value => {
																saveSubmitBoxShadow( value, 4 );
															}}
															onBlurChange={value => {
																saveSubmitBoxShadow( value, 5 );
															}}
															onSpreadChange={value => {
																saveSubmitBoxShadow( value, 6 );
															}}
															onInsetChange={value => {
																saveSubmitBoxShadow( value, 7 );
															}}
														/>
													</>
												);
											}
										}
										return <div className={tab.className} key={tab.className}>{tabout}</div>;
									}
								}
							</TabPanel>
							<h2>{__( 'Border Settings', 'gutenam-blocks' )}</h2>
							<MeasurementControls
								label={__( 'Border Width', 'gutenam-blocks' )}
								measurement={submit[ 0 ].borderWidth}
								control={submitBorderControl}
								onChange={( value ) => saveSubmit( { borderWidth: value } )}
								onControl={( value ) => setSubmitBorderControl( value )}
								min={0}
								max={20}
								step={1}
							/>
							<RangeControl
								label={__( 'Border Radius', 'gutenam-blocks' )}
								value={submit[ 0 ].borderRadius}
								onChange={value => {
									saveSubmit( { borderRadius: value } );
								}}
								min={0}
								max={50}
							/>
							<TypographyControls
								fontSize={submitFont[ 0 ].size}
								onFontSize={( value ) => saveSubmitFont( { size: value } )}
								fontSizeType={submitFont[ 0 ].sizeType}
								onFontSizeType={( value ) => saveSubmitFont( { sizeType: value } )}
								lineHeight={submitFont[ 0 ].lineHeight}
								onLineHeight={( value ) => saveSubmitFont( { lineHeight: value } )}
								lineHeightType={submitFont[ 0 ].lineType}
								onLineHeightType={( value ) => saveSubmitFont( { lineType: value } )}
							/>
							<BasePanelBody
								title={__( 'Advanced Button Settings', 'gutenam-blocks' )}
								initialOpen={false}
								panelName={'bsb-form-advanced-button-settings'}
							>
								<TypographyControls
									letterSpacing={submitFont[ 0 ].letterSpacing}
									onLetterSpacing={( value ) => saveSubmitFont( { letterSpacing: value } )}
									textTransform={submitFont[ 0 ].textTransform}
									onTextTransform={( value ) => saveSubmitFont( { textTransform: value } )}
									fontFamily={submitFont[ 0 ].family}
									onFontFamily={( value ) => saveSubmitFont( { family: value } )}
									onFontChange={( select ) => {
										saveSubmitFont( {
											family: select.value,
											google: select.google,
										} );
									}}
									onFontArrayChange={( values ) => saveSubmitFont( values )}
									googleFont={submitFont[ 0 ].google}
									onGoogleFont={( value ) => saveSubmitFont( { google: value } )}
									loadGoogleFont={submitFont[ 0 ].loadGoogle}
									onLoadGoogleFont={( value ) => saveSubmitFont( { loadGoogle: value } )}
									fontVariant={submitFont[ 0 ].variant}
									onFontVariant={( value ) => saveSubmitFont( { variant: value } )}
									fontWeight={submitFont[ 0 ].weight}
									onFontWeight={( value ) => saveSubmitFont( { weight: value } )}
									fontStyle={submitFont[ 0 ].style}
									onFontStyle={( value ) => saveSubmitFont( { style: value } )}
									fontSubset={submitFont[ 0 ].subset}
									onFontSubset={( value ) => saveSubmitFont( { subset: value } )}
								/>
								<ButtonGroup className="bst-size-type-options bst-row-size-type-options" aria-label={__( 'Margin Type', 'gutenam-blocks' )}>
									{map( marginTypes, ( { name, key } ) => (
										<Button
											key={key}
											className="bst-size-btn"
											isSmall
											isPrimary={marginUnit === key}
											aria-pressed={marginUnit === key}
											onClick={() => saveSubmitMargin( { unit: key } )}
										>
											{name}
										</Button>
									) )}
								</ButtonGroup>
								<h2 className="bst-heading-size-title bst-secondary-color-size">{__( 'Margin Unit', 'gutenam-blocks' )}</h2>
								<h2 className="bst-heading-size-title">{__( 'Margin', 'gutenam-blocks' )}</h2>
								<TabPanel className="bst-size-tabs"
										  activeClass="active-tab"
										  tabs={[
											  {
												  name     : 'desk',
												  title    : <Dashicon icon="desktop"/>,
												  className: 'bst-desk-tab',
											  },
											  {
												  name     : 'tablet',
												  title    : <Dashicon icon="tablet"/>,
												  className: 'bst-tablet-tab',
											  },
											  {
												  name     : 'mobile',
												  title    : <Dashicon icon="smartphone"/>,
												  className: 'bst-mobile-tab',
											  },
										  ]}>
									{
										( tab ) => {
											let tabout;
											if ( tab.name ) {
												if ( 'mobile' === tab.name ) {
													tabout = (
														<MeasurementControls
															label={__( 'Mobile Margin', 'gutenam-blocks' )}
															measurement={( undefined !== submitMargin && undefined !== submitMargin[ 0 ] && submitMargin[ 0 ].mobile ? submitMargin[ 0 ].mobile : [ '', '', '', '' ] )}
															control={( undefined !== submitMargin && undefined !== submitMargin[ 0 ] && submitMargin[ 0 ].control ? submitMargin[ 0 ].control : 'linked' )}
															onChange={( value ) => saveSubmitMargin( { mobile: value } )}
															onControl={( value ) => saveSubmitMargin( { control: value } )}
															min={marginMin}
															max={marginMax}
															step={marginStep}
															allowEmpty={true}
														/>
													);
												} else if ( 'tablet' === tab.name ) {
													tabout = (
														<MeasurementControls
															label={__( 'Tablet Margin', 'gutenam-blocks' )}
															measurement={( undefined !== submitMargin && undefined !== submitMargin[ 0 ] && submitMargin[ 0 ].tablet ? submitMargin[ 0 ].tablet : [ '', '', '', '' ] )}
															control={( undefined !== submitMargin && undefined !== submitMargin[ 0 ] && submitMargin[ 0 ].control ? submitMargin[ 0 ].control : 'linked' )}
															onChange={( value ) => saveSubmitMargin( { tablet: value } )}
															onControl={( value ) => saveSubmitMargin( { control: value } )}
															min={marginMin}
															max={marginMax}
															step={marginStep}
															allowEmpty={true}
														/>
													);
												} else {
													tabout = (
														<MeasurementControls
															label={__( 'Desktop Margin', 'gutenam-blocks' )}
															measurement={( undefined !== submitMargin && undefined !== submitMargin[ 0 ] && submitMargin[ 0 ].desk ? submitMargin[ 0 ].desk : [ '', '', '', '' ] )}
															control={( undefined !== submitMargin && undefined !== submitMargin[ 0 ] && submitMargin[ 0 ].control ? submitMargin[ 0 ].control : 'linked' )}
															onChange={( value ) => saveSubmitMargin( { desk: value } )}
															onControl={( value ) => saveSubmitMargin( { control: value } )}
															min={marginMin}
															max={marginMax}
															step={marginStep}
															allowEmpty={true}
														/>
													);
												}
											}
											return <div className={tab.className} key={tab.className}>{tabout}</div>;
										}
									}
								</TabPanel>
							</BasePanelBody>
							<TextControl
								label={__( 'Submit aria description', 'gutenam-blocks' )}
								help={__( 'Provide more context for screen readers', 'gutenam-blocks' )}
								value={( undefined !== submitLabel ? submitLabel : '' )}
								onChange={( value ) => setAttributes( { submitLabel: value } )}
							/>
						</BasePanelBody>
					</>
				}

				{ (activeTab === 'advanced') && (
					<>
						<BasePanelBody panelName={'bsb-row-padding'}>
							<ResponsiveMeasureRangeControl
								label={__( 'Margin', 'gutenam-blocks' )}
								tabletControl={tabletMarginControl}
								mobileControl={mobileMarginControl}
								value={( undefined !== containerMargin ? containerMargin : [ '', '', '', '' ] )}
								tabletValue={( undefined !== tabletContainerMargin ? tabletContainerMargin : [ '', '', '', '' ] )}
								mobileValue={( undefined !== mobileContainerMargin ? mobileContainerMargin : [ '', '', '', '' ] )}
								onChange={( value ) => {
									setAttributes( { containerMargin: value } );
								}}
								onChangeTablet={( value ) => {
									setAttributes( { tabletContainerMargin: value } );
								}}
								onChangeMobile={( value ) => {
									setAttributes( { mobileContainerMargin: value } );
								}}
								min={containerMarginMin}
								max={containerMarginMax}
								step={containerMarginStep}
								unit={containerMarginType}
								units={[ 'px', 'em', 'rem', '%', 'vh' ]}
								onUnit={( value ) => setAttributes( { containerMarginType: value } )}
								onMouseOver={ marginMouseOver.onMouseOver }
								onMouseOut={ marginMouseOver.onMouseOut }
							/>
							<ToggleControl
								label={__( 'Align field labels with submit alignment?', 'gutenam-blocks' )}
								checked={( undefined !== hAlignFormFeilds ? hAlignFormFeilds : false )}
								onChange={( value ) => setAttributes( { hAlignFormFeilds: value } )}
							/>
						</BasePanelBody>

						<div className="bst-sidebar-settings-spacer"></div>

						<BaseBlockDefaults attributes={attributes} defaultAttributes={metadata['attributes']} blockSlug={ metadata['name'] } excludedAttrs={ nonTransAttrs } />
					</>
				)}
			</BaseInspectorControls>
			<div id={`animate-id${uniqueID}`} className={`bsb-form-wrap aos-animate${( hAlign ? ' bsb-form-align-' + hAlign : '' )}${ ( hAlignFormFeilds ? ' bsb-form-field-align' : '' ) }`} data-aos={( baseAnimation ? baseAnimation : undefined )}
				 data-aos-duration={( baseAOSOptions && baseAOSOptions[ 0 ] && baseAOSOptions[ 0 ].duration ? baseAOSOptions[ 0 ].duration : undefined )}
				 data-aos-easing={( baseAOSOptions && baseAOSOptions[ 0 ] && baseAOSOptions[ 0 ].easing ? baseAOSOptions[ 0 ].easing : undefined )} style={{
				marginLeft  : ( undefined !== previewContainerMarginLeft ? getSpacingOptionOutput( previewContainerMarginLeft, previewContainerMarginType ) : undefined ),
				marginRight : ( undefined !== previewContainerMarginRight ? getSpacingOptionOutput( previewContainerMarginRight, previewContainerMarginType ) : undefined ),
				marginTop   : ( undefined !== previewContainerMarginTop ? getSpacingOptionOutput( previewContainerMarginTop, previewContainerMarginType ) : undefined ),
				marginBottom: ( undefined !== previewContainerMarginBottom ? getSpacingOptionOutput( previewContainerMarginBottom, previewContainerMarginType ) : undefined ),
			}}>
				<SpacingVisualizer
					type="outside"
					forceShow={ marginMouseOver.isMouseOver }
					spacing={ [ getSpacingOptionOutput( previewContainerMarginTop, previewContainerMarginType ), getSpacingOptionOutput( previewContainerMarginRight, previewContainerMarginType ), getSpacingOptionOutput( previewContainerMarginBottom, previewContainerMarginType ), getSpacingOptionOutput( previewContainerMarginLeft, previewContainerMarginType ) ] }
				/>
				<div id={`bsb-form-${uniqueID}`} className={'bsb-form'} style={{
					marginRight: ( undefined !== style[ 0 ].gutter && '' !== style[ 0 ].gutter ? '-' + ( style[ 0 ].gutter / 2 ) + 'px' : undefined ),
					marginLeft : ( undefined !== style[ 0 ].gutter && '' !== style[ 0 ].gutter ? '-' + ( style[ 0 ].gutter / 2 ) + 'px' : undefined ),
				}}>
					{renderFieldOutput}
					<div
						className="base-blocks-form-field bsb-submit-field"
						style={{
							width       : submit[ 0 ].width[ 0 ] + '%',
							paddingRight: ( undefined !== style[ 0 ].gutter && '' !== style[ 0 ].gutter ? ( style[ 0 ].gutter / 2 ) + 'px' : undefined ),
							paddingLeft : ( undefined !== style[ 0 ].gutter && '' !== style[ 0 ].gutter ? ( style[ 0 ].gutter / 2 ) + 'px' : undefined ),
						}}
						tabIndex="0"
						role="button"
						onClick={() => deselectField}
						onFocus={() => deselectField}
						onKeyDown={() => deselectField}
					>
						<RichText
							tagName="div"
							placeholder={__( 'Submit' )}
							onFocus={() => deselectField}
							value={submit[ 0 ].label}
							onChange={value => {
								saveSubmit( { label: value } );
							}}
							allowedFormats={applyFilters( 'base.whitelist_richtext_formats', [ 'base/insert-dynamic', 'core/bold', 'core/italic', 'core/strikethrough', 'toolset/inline-field' ] )}
							className={`bsb-forms-submit bsb-button-size-${submit[ 0 ].size} bsb-button-width-${submit[ 0 ].widthType}`}
							style={{
								background: ( undefined !== btnBG ? btnBG : undefined ),
									color: ( undefined !== submit[ 0 ].color ? BaseColorOutput( submit[ 0 ].color ) : undefined ),
									fontSize: getFontSizeOptionOutput( previewSubmitFontSize, previewSubmitFontSizeType ),
									lineHeight: previewSubmitLineHeight + previewSubmitLineHeightType,
									fontWeight: submitFont[ 0 ].weight,
									fontStyle: submitFont[ 0 ].style,
									letterSpacing: submitFont[ 0 ].letterSpacing + 'px',
									textTransform: ( submitFont[ 0 ].textTransform ? submitFont[ 0 ].textTransform  : undefined ),
									fontFamily: ( submitFont[ 0 ].family ? submitFont[ 0 ].family : '' ),
									borderRadius: ( undefined !== submit[ 0 ].borderRadius ? submit[ 0 ].borderRadius + 'px' : undefined ),
									borderColor: ( undefined === submit[ 0 ].border ? undefined : BaseColorOutput( submit[ 0 ].border, ( submit[ 0 ].borderOpacity !== undefined ? submit[ 0 ].borderOpacity : 1 ) ) ),
									width: ( undefined !== submit[ 0 ].widthType && 'fixed' === submit[ 0 ].widthType && undefined !== submit[ 0 ].fixedWidth && undefined !== submit[ 0 ].fixedWidth[ 0 ] ? submit[ 0 ].fixedWidth[ 0 ] + 'px' : undefined ),
									paddingTop: ( 'custom' === submit[ 0 ].size && '' !== submit[ 0 ].deskPadding[ 0 ] ? submit[ 0 ].deskPadding[ 0 ] + 'px' : undefined ),
									paddingRight: ( 'custom' === submit[ 0 ].size && '' !== submit[ 0 ].deskPadding[ 1 ] ? submit[ 0 ].deskPadding[ 1 ] + 'px' : undefined ),
									paddingBottom: ( 'custom' === submit[ 0 ].size && '' !== submit[ 0 ].deskPadding[ 2 ] ? submit[ 0 ].deskPadding[ 2 ] + 'px' : undefined ),
									paddingLeft: ( 'custom' === submit[ 0 ].size && '' !== submit[ 0 ].deskPadding[ 3 ] ? submit[ 0 ].deskPadding[ 3 ] + 'px' : undefined ),
									borderTopWidth: ( submit[ 0 ].borderWidth && '' !== submit[ 0 ].borderWidth[ 0 ] ? submit[ 0 ].borderWidth[ 0 ] + 'px' : undefined ),
									borderRightWidth: ( submit[ 0 ].borderWidth && '' !== submit[ 0 ].borderWidth[ 1 ] ? submit[ 0 ].borderWidth[ 1 ] + 'px' : undefined ),
									borderBottomWidth: ( submit[ 0 ].borderWidth && '' !== submit[ 0 ].borderWidth[ 2 ] ? submit[ 0 ].borderWidth[ 2 ] + 'px' : undefined ),
									borderLeftWidth: ( submit[ 0 ].borderWidth && '' !== submit[ 0 ].borderWidth[ 3 ] ? submit[ 0 ].borderWidth[ 3 ] + 'px' : undefined ),
									boxShadow: ( undefined !== submit[ 0 ].boxShadow && undefined !== submit[ 0 ].boxShadow[ 0 ] && submit[ 0 ].boxShadow[ 0 ] ? ( undefined !== submit[ 0 ].boxShadow[ 7 ] && submit[ 0 ].boxShadow[ 7 ] ? 'inset ' : '' ) + ( undefined !== submit[ 0 ].boxShadow[ 3 ] ? submit[ 0 ].boxShadow[ 3 ] : 1 ) + 'px ' + ( undefined !== submit[ 0 ].boxShadow[ 4 ] ? submit[ 0 ].boxShadow[ 4 ] : 1 ) + 'px ' + ( undefined !== submit[ 0 ].boxShadow[ 5 ] ? submit[ 0 ].boxShadow[ 5 ] : 2 ) + 'px ' + ( undefined !== submit[ 0 ].boxShadow[ 6 ] ? submit[ 0 ].boxShadow[ 6 ] : 0 ) + 'px ' + BaseColorOutput( ( undefined !== submit[ 0 ].boxShadow[ 1 ] ? submit[ 0 ].boxShadow[ 1 ] : '#000000' ), ( undefined !== submit[ 0 ].boxShadow[ 2 ] ? submit[ 0 ].boxShadow[ 2 ] : 1 ) ) : undefined ),
									marginTop: previewSubmitMarginTop + previewSubmitMarginType,
									marginRight: previewSubmitMarginRight + previewSubmitMarginType,
									marginBottom: previewSubmitMarginBottom + previewSubmitMarginType,
									marginLeft: previewSubmitMarginLeft + previewSubmitMarginType,
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
export default BaseForm;
