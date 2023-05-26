/**
 * External dependencies
 */
import classnames from 'classnames';
import { every, filter, forEach, debounce, map } from 'lodash';
//import Masonry from 'react-masonry-component';
import Masonry from 'react-masonry-css'

/**
 * Base Components.
 */
import {
	BaseColorOutput,
	showSettings,
	getSpacingOptionOutput,
	mouseOverVisualizer,
	getPreviewSize,
	getUniqueId,
	getInQueryBlock,
	setBlockDefaults,
	isRTL
} from '@base/helpers';
import {
	PopColorControl,
	TypographyControls,
	BasePanelBody,
	RangeControl,
	WebfontLoader,
	StepControls,
	ImageSizeControl,
	BaseRadioButtons,
	DynamicLinkControl,
	BaseMediaPlaceholder,
	DynamicGalleryControl,
	ResponsiveMeasurementControls,
	InspectorControlTabs,
	BaseBlockDefaults,
	ResponsiveRangeControls,
	ResponsiveMeasureRangeControl,
	SpacingVisualizer,
	CopyPasteAttributes,
	BoxShadowControl
} from '@base/components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { applyFilters } from '@wordpress/hooks';
import apiFetch from '@wordpress/api-fetch';

/**
 * Import Icons
 */
import {
	topLeftIcon,
	topRightIcon,
	bottomLeftIcon,
	bottomRightIcon,
	radiusLinkedIcon,
	radiusIndividualIcon,
	galleryMasonryIcon,
	galleryGridIcon,
	galleryCarouselIcon,
	galleryFluidIcon,
	gallerySliderIcon,
	galleryTilesIcon,
	galleryThumbSliderIcon,
} from '@base/icons';

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose';
import {
	Button,
	ButtonGroup,
	Tooltip,
	SelectControl,
	ToggleControl,
	ToolbarGroup,
	TabPanel,
	Dashicon,
	Placeholder,
	withNotices,
} from '@wordpress/components';
import {
	BlockControls,
	BlockIcon,
	MediaPlaceholder,
	MediaUpload,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import { useEffect, useState, useRef } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { getBlobByURL, isBlobURL, revokeBlobURL } from '@wordpress/blob';
import { withSelect, useSelect, useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import GalleryImage from './gallery-image';
import { getRelevantMediaFiles } from './shared';

import {
	image,
	closeSmall,
	plusCircleFilled,
} from '@wordpress/icons';

/**
 * Import Css
 */
import './editor.scss';
import metadata from './block.json';

const linkOptions = [
	{ value: 'attachment', label: __( 'Attachment Page', 'gutenam-blocks' ) },
	{ value: 'media', label: __( 'Media File', 'gutenam-blocks' ) },
	{ value: 'custom', label: __( 'Custom', 'gutenam-blocks' ) },
	{ value: 'none', label: __( 'None', 'gutenam-blocks' ) },
];
const typeOptions = [
	{ value: 'masonry', label: __( 'Masonry', 'gutenam-blocks' ), icon: galleryMasonryIcon, isDisabled: false },
	{ value: 'grid', label: __( 'Grid', 'gutenam-blocks' ), icon: galleryGridIcon, isDisabled: false },
	{ value: 'carousel', label: __( 'Carousel', 'gutenam-blocks' ), icon: galleryCarouselIcon, isDisabled: false },
	{ value: 'fluidcarousel', label: __( 'Fluid Carousel', 'gutenam-blocks' ), icon: galleryFluidIcon, isDisabled: false },
	{ value: 'slider', label: __( 'Slider', 'gutenam-blocks' ), icon: gallerySliderIcon, isDisabled: false },
	{ value: 'thumbslider', label: __( 'Thumbnail Slider (Pro addon)', 'gutenam-blocks' ), icon: galleryThumbSliderIcon, isDisabled: true },
	{ value: 'tiles', label: __( 'Tiles (Pro addon)', 'gutenam-blocks' ), icon: galleryTilesIcon, isDisabled: true },
	// { value: 'mosaic', label: __( 'Mosaic (Pro only)', 'gutenam-blocks' ), icon: galSliderIcon, isDisabled: true },
];

const ALLOWED_MEDIA_TYPES = [ 'image' ];

function GalleryEdit( props ) {

	// saveImageAttributes = debounce( saveImageAttributes.bind( this ), 1000 );
	// carouselSizeTrigger = debounce( carouselSizeTrigger.bind( this ), 250 );

	const { attributes, isSelected, className, noticeUI, mediaUpload, context, clientId, setAttributes } = props;
	const {
		inQueryBlock,
		uniqueID,
		images,
		columns,
		linkTo,
		ids,
		columnControl,
		showCaption,
		captionStyles,
		lightbox,
		lightSize,
		type,
		imageRatio,
		captionStyle,
		gutter,
		thumbSize,
		autoPlay,
		autoSpeed,
		transSpeed,
		slidesScroll,
		arrowStyle,
		dotStyle,
		imageRadius,
		tabletImageRadius,
		mobileImageRadius,
		imageRadiusUnit,
		margin,
		marginUnit,
		displayShadow,
		shadow,
		shadowHover,
		carouselHeight,
		imageFilter,
		lightboxCaption,
		carouselAlign,
		thumbnailColumns,
		thumbnailControl,
		thumbnailRatio,
		mobileForceHover,
		baseDynamic,
		imagesDynamic,
		padding,
		tabletPadding,
		mobilePadding,
		paddingUnit,
		bbVersion,
		gutterUnit,
		lazyLoad,
		slideType,
	} = attributes;
	const mainRef = useRef( null );
	const thumbsRef = useRef();
	const { addUniqueID } = useDispatch( 'baseblocks/data' );
	const dynamicSource = ( baseDynamic && baseDynamic[ 'images' ] && baseDynamic[ 'images' ].enable ? true : false );
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
		if ( mainRef.current && thumbsRef.current && thumbsRef.current.splide ) {
			mainRef.current.sync( thumbsRef.current.splide );
		}
	}, [ mainRef.current, thumbsRef.current] );
	useEffect( () => {
		setBlockDefaults( 'base/advancedgallery', attributes);

		let uniqueId = getUniqueId( uniqueID, clientId, isUniqueID, isUniqueBlock );
		if ( uniqueId !== uniqueID ) {
			attributes.uniqueID = uniqueId;
			setAttributes( { uniqueID: uniqueId } );
			addUniqueID( uniqueId, clientId );
		} else {
			addUniqueID( uniqueId, clientId );
		}

		setAttributes( { inQueryBlock: getInQueryBlock( context, inQueryBlock ) } );
		// Old Static Image source.
		if ( every( images, ( { url } ) => isBlobURL( url ) ) ) {
			const filesList = map( images, ( { url } ) => getBlobByURL( url ) );
			forEach( images, ( { url } ) => revokeBlobURL( url ) );
			mediaUpload( {
				filesList,
				onFileChange: ( imgs ) => onSelectImages( imgs, 2 ),
				allowedTypes: [ 'image' ],
			} );
		}

		if ( ! bbVersion || bbVersion < 2 ) {
			if ( images && ! dynamicSource ) {
				const newImageData = [];
				forEach( images, ( image ) => {
					newImageData.push( {
						url: image?.url || '',
						thumbUrl: image?.thumbUrl || '',
						lightUrl: image?.lightUrl || '',
						link: image?.link || '',
						customLink: image?.customLink || '',
						linkTarget: image?.linkTarget || '',
						width: image?.width || '',
						height: image?.height || '',
						alt: image?.alt || '',
						id: image?.id || '',
						caption: image?.caption || '',
						linkSponsored: image?.linkSponsored || '',
					});
				} );
				setAttributes( {
					imagesDynamic: newImageData,
				} );
			}
			setAttributes( { bbVersion: 2 } );
		}
	}, [] );
	const previewPaddingUnit = ( undefined !== paddingUnit ? paddingUnit : 'px' );
	const previewMarginUnit = ( undefined !== marginUnit ? marginUnit : 'px' );
	const previewMarginTop = getPreviewSize( previewDevice, ( undefined !== margin[ 0 ].desk[0] ? margin[ 0 ].desk[0] : '' ), ( undefined !== margin[ 0 ].tablet[0] ? margin[ 0 ].tablet[0] : '' ), ( undefined !== margin[ 0 ].mobile[0] ? margin[ 0 ].mobile[0] : '' ) );
	const previewMarginRight = getPreviewSize( previewDevice, ( undefined !== margin[ 0 ].desk[0] ? margin[ 0 ].desk[1] : '' ), ( undefined !== margin[ 0 ].tablet[0] ? margin[ 0 ].tablet[1] : '' ), ( undefined !== margin[ 0 ].mobile[0] ? margin[ 0 ].mobile[1] : '' ) );
	const previewMarginBottom = getPreviewSize( previewDevice, ( undefined !== margin[ 0 ].desk[0] ? margin[ 0 ].desk[2] : '' ), ( undefined !== margin[ 0 ].tablet[0] ? margin[ 0 ].tablet[2] : '' ), ( undefined !== margin[ 0 ].mobile[0] ? margin[ 0 ].mobile[2] : '' ) );
	const previewMarginLeft = getPreviewSize( previewDevice, ( undefined !== margin[ 0 ].desk[0] ? margin[ 0 ].desk[3] : '' ), ( undefined !== margin[ 0 ].tablet[0] ? margin[ 0 ].tablet[3] : '' ), ( undefined !== margin[ 0 ].mobile[0] ? margin[ 0 ].mobile[3] : '' ) );

	const previewPaddingTop = getPreviewSize( previewDevice, ( undefined !== padding ? padding[0] : '' ), ( undefined !== tabletPadding ? tabletPadding[ 0 ] : '' ), ( undefined !== mobilePadding ? mobilePadding[0] : '' ) );
	const previewPaddingRight = getPreviewSize( previewDevice, ( undefined !== padding && undefined !== padding[1] && '' !== padding[1] ? padding[1] : '' ), ( undefined !== tabletPadding ? tabletPadding[ 1 ] : '' ), ( undefined !== mobilePadding ? mobilePadding[1] : '' ) );
	const previewPaddingBottom = getPreviewSize( previewDevice, ( undefined !== padding ? padding[2] : '' ), ( undefined !== tabletPadding ? tabletPadding[ 2] : '' ), ( undefined !== mobilePadding ? mobilePadding[2] : '' ) );
	const previewPaddingLeft = getPreviewSize( previewDevice, ( undefined !== padding && undefined !== padding[3] && '' !== padding[3] ? ( padding[3] ) : '' ), ( undefined !== tabletPadding ? tabletPadding[ 3 ] : '' ), ( undefined !== mobilePadding ? mobilePadding[3] : '' ) );

	const previewColumns = getPreviewSize( previewDevice, ( undefined !== columns[ 0 ] ? columns[ 0 ] : 3 ), ( undefined !== columns[ 3 ] ? columns[ 3 ] : '' ), ( undefined !== columns[ 5 ] ? columns[ 5 ] : '' ) );

	const previewThumbColumns = getPreviewSize( previewDevice, ( undefined !== thumbnailColumns[ 0 ] ? thumbnailColumns[ 0 ] : 4 ), ( undefined !== thumbnailColumns[ 3 ] ? thumbnailColumns[ 3 ] : '' ), ( undefined !== thumbnailColumns[ 5 ] ? thumbnailColumns[ 5 ] : '' ) );

	const previewGutter = getPreviewSize( previewDevice, ( undefined !== gutter[0] ? gutter[0] : '' ), ( undefined !== gutter[1] ? gutter[1] : '' ), ( undefined !== gutter[2] ? gutter[2] : '' ) );
	const previewGutterUnit = ( gutterUnit ? gutterUnit : 'px' );

	const previewHeight = getPreviewSize( previewDevice, ( undefined !== carouselHeight[0] ? carouselHeight[0] : '' ), ( undefined !== carouselHeight[1] ? carouselHeight[1] : '' ), ( undefined !== carouselHeight[2] ? carouselHeight[2] : '' ) );

	const blockProps = useBlockProps( {
		className: `bsb-gallery-container`,
	} );

	const spacingSettings = {
		paddingLeft: ( undefined !== previewPaddingLeft ? getSpacingOptionOutput( previewPaddingLeft, previewPaddingUnit ) : undefined ),
		paddingRight: ( undefined !== previewPaddingRight ? getSpacingOptionOutput( previewPaddingRight, previewPaddingUnit ) : undefined ),
		paddingTop: ( undefined !== previewPaddingTop ? getSpacingOptionOutput( previewPaddingTop, previewPaddingUnit ) : undefined ),
		paddingBottom: ( undefined !== previewPaddingBottom ? getSpacingOptionOutput( previewPaddingBottom, previewPaddingUnit ) : undefined ),
		marginLeft: ( undefined !== previewMarginLeft ? getSpacingOptionOutput( previewMarginLeft, previewMarginUnit ) : undefined ),
		marginRight: ( undefined !== previewMarginRight ? getSpacingOptionOutput( previewMarginRight, previewMarginUnit ) : undefined ),
		marginTop: ( undefined !== previewMarginTop ? getSpacingOptionOutput( previewMarginTop, previewMarginUnit ) : undefined ),
		marginBottom: ( undefined !== previewMarginBottom ? getSpacingOptionOutput( previewMarginBottom, previewMarginUnit ) : undefined ),
	}

	const [ selectedImage, setSelectedImage ] = useState( null );
	const [ activeTab, setActiveTab ] = useState( 'general' );

	const setAttribs = ( attribs ) => {
		let newAttribs = attribs;

		if ( newAttribs.ids ) {
			throw new Error( 'The "ids" attribute should not be changed directly. It is managed automatically when "images" attribute changes' );
		}

		if ( newAttribs.imagesDynamic ) {
			newAttribs = {
				...newAttribs,
				ids: map( newAttribs.imagesDynamic, 'id' ),
			};
		}

		setAttributes( newAttribs );
	}

	const onSelectImage = ( index ) => {
		if ( selectedImage !== index ) {
			setSelectedImage( index );
		}
	};

	const onMove = ( oldIndex, newIndex ) => {
		let newImages = [ ...imagesDynamic ];
		newImages.splice( newIndex, 1, imagesDynamic[ oldIndex ] );
		newImages.splice( oldIndex, 1, imagesDynamic[ newIndex ] );
		setSelectedImage( newIndex );
		setAttribs( { imagesDynamic: newImages } );
	};

	const onMoveForward = ( oldIndex ) => {
		if ( oldIndex === imagesDynamic.length - 1 ) {
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

	const onRemoveImage = ( index ) => {
		let newImages = filter( imagesDynamic, ( img, i ) => index !== i );
		setSelectedImage( null );
		setAttribs( {
			imagesDynamic: newImages
		} );
	};

	//async
	async function onSelectImages( imgs, src = 9 ) {
		const updatingImages = await getRelevantMediaFiles( imgs, lightSize, thumbSize, imagesDynamic );
		setAttribs( {
			imagesDynamic: updatingImages,
		} );
	};

	const onUploadError = ( message ) => {
		const { noticeOperations } = props;
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice( message );
	};

	// async
	async function setCaptions() {
		let previousShowCaption = showCaption;
		setAttribs( { showCaption: !previousShowCaption } );

		if ( previousShowCaption ) {
			if ( imagesDynamic ) {
				const updatingImages = await getRelevantMediaFiles( imagesDynamic, lightSize, thumbSize );

				setAttribs( {
					imagesDynamic: updatingImages,
				} );
			}
		}
	};

	// async
	const changeImageThumbSize = async ( img ) => {
		setAttributes( { thumbSize: img.slug } );
		try {
			const updatingImages = await getRelevantMediaFiles( imagesDynamic, lightSize, img.slug );
			setAttribs( {
				imagesDynamic: updatingImages,
			} );
		} catch ( error ) {
			console.error( error );
		}
	};

	// async
	async function changeImageLightSize( img ) {
		setAttributes( { lightSize: img.slug } );

		const updatingImages = await getRelevantMediaFiles( imagesDynamic, img.slug, thumbSize );
		setAttribs( {
			imagesDynamic: updatingImages,
		} );
	};

	const setColumnsNumber = ( value ) => {
		setAttribs( { columns: value } );
	};

	const toggleImageCrop = () => {
		setAttribs( { imageCrop: !imageCrop } );
	};

	const getImageCropHelp = ( checked ) => {
		return checked ? __( 'Thumbnails are cropped to align.', 'gutenam-blocks' ) : __( 'Thumbnails are not cropped.', 'gutenam-blocks' );
	};
	const saveImageAttributes = ( id, attributes ) => {
		const data = new window.FormData();
		forEach( attributes, ( ( value, key ) => data.append( key, value ) ) );
		apiFetch( {
			path  : '/wp/v2/media/' + id,
			body  : data,
			method: 'POST',
		} );
	};
	const setImageAttributes = ( index, attributes ) => {

		if ( !imagesDynamic[ index ] ) {
			return;
		}
		if ( imagesDynamic[ index ].id ) {
			saveImageAttributes( imagesDynamic[ index ].id, attributes );
		}
		setAttributes( {
			imagesDynamic: [
				...imagesDynamic.slice( 0, index ),
				{
					...imagesDynamic[ index ],
					...attributes,
				},
				...imagesDynamic.slice( index + 1 ),
			],
		} );
	};
	const setLinkAttributes = ( index, attributes ) => {
		if ( !imagesDynamic[ index ] ) {
			return;
		}
		setAttributes( {
			imagesDynamic: [
				...imagesDynamic.slice( 0, index ),
				{
					...imagesDynamic[ index ],
					...attributes,
				},
				...imagesDynamic.slice( index + 1 ),
			],
		} );
	};

	// const componentDidUpdate = ( prevProps ) => {
	// 	// Deselect images when deselecting the block
	// 	if ( !isSelected && prevProps.isSelected ) {
	// 		setSelectedImage( null );
	// 		setCaptionSelected( false );
	// 	}
	// };

	const carouselSizeTrigger = () => {
		const carousel = document.getElementById( 'bsb-gallery-id-' + uniqueID );
		if ( carousel ) {
			const width = Math.floor( ( 80 / 100 ) * carousel.offsetWidth );
			carousel.querySelectorAll( '.slick-slide' ).forEach( function( item ) {
				item.style.maxWidth = width + 'px';
			} );
		}

		return;
	};
	const galleryTypes = applyFilters( 'base.galleryTypes', typeOptions );
	const theImages = imagesDynamic ?? [];
	const hasImages = !!theImages.length;
	const onColumnChange = ( value ) => {
		let columnArray = [];
		if ( 1 === value ) {
			columnArray = [ 1, 1, 1, 1, 1, 1 ];
		} else if ( 2 === value ) {
			columnArray = [ 2, 2, 2, 2, 1, 1 ];
		} else if ( 3 === value ) {
			columnArray = [ 3, 3, 3, 2, 1, 1 ];
		} else if ( 4 === value ) {
			columnArray = [ 4, 4, 4, 3, 2, 2 ];
		} else if ( 5 === value ) {
			columnArray = [ 5, 5, 5, 4, 4, 3 ];
		} else if ( 6 === value ) {
			columnArray = [ 6, 6, 6, 4, 4, 3 ];
		} else if ( 7 === value ) {
			columnArray = [ 7, 7, 7, 5, 5, 4 ];
		} else if ( 8 === value ) {
			columnArray = [ 8, 8, 8, 6, 4, 4 ];
		}
		setAttributes( { columns: columnArray } );
	};
	const onThumbColumnChange = ( value ) => {
		let columnArray = [];
		if ( 1 === value ) {
			columnArray = [ 1, 1, 1, 1, 1, 1 ];
		} else if ( 2 === value ) {
			columnArray = [ 2, 2, 2, 2, 2, 2 ];
		} else if ( 3 === value ) {
			columnArray = [ 3, 3, 3, 3, 3, 3 ];
		} else if ( 4 === value ) {
			columnArray = [ 4, 4, 4, 4, 4, 4 ];
		} else if ( 5 === value ) {
			columnArray = [ 5, 5, 5, 4, 4, 4 ];
		} else if ( 6 === value ) {
			columnArray = [ 6, 6, 6, 4, 4, 4 ];
		} else if ( 7 === value ) {
			columnArray = [ 7, 7, 7, 5, 5, 4 ];
		} else if ( 8 === value ) {
			columnArray = [ 8, 8, 8, 6, 4, 4 ];
		} else if ( 9 === value ) {
			columnArray = [ 9, 9, 9, 7, 5, 5 ];
		} else if ( 10 === value ) {
			columnArray = [ 10, 10, 10, 8, 6, 6 ];
		}
		setAttributes( { thumbnailColumns: columnArray } );
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
	const saveMargin = ( value ) => {
		const newUpdate = margin.map( ( item, index ) => {
			if ( 0 === index ) {
				item = { ...item, ...value };
			}
			return item;
		} );
		setAttributes( {
			margin: newUpdate,
		} );
	};

	const marginMouseOver = mouseOverVisualizer();
	const paddingMouseOver = mouseOverVisualizer();

	const marginMin = ( marginUnit === 'em' || marginUnit === 'rem' ? -25 : -400 );
	const marginMax = ( marginUnit === 'em' || marginUnit === 'rem' ? 25 : 400 );
	const marginStep = ( marginUnit === 'em' || marginUnit === 'rem' ? 0.1 : 1 );

	const columnControlTypes = [
		{ key: 'linked', name: __( 'Linked', 'gutenam-blocks' ), icon: __( 'Linked', 'gutenam-blocks' ) },
		{ key: 'individual', name: __( 'Individual', 'gutenam-blocks' ), icon: __( 'Individual', 'gutenam-blocks' ) },
	];
	const gconfig = {
		google: {
			families: [ captionStyles[ 0 ].family + ( captionStyles[ 0 ].variant ? ':' + captionStyles[ 0 ].variant : '' ) ],
		},
	};
	const config = ( captionStyles[ 0 ].google ? gconfig : '' );
	const saveCaptionFont = ( value ) => {
		const newUpdate = captionStyles.map( ( item, index ) => {
			if ( 0 === index ) {
				item = { ...item, ...value };
			}
			return item;
		} );
		setAttributes( {
			captionStyles: newUpdate,
		} );
	};

	const carouselSettings = {
		type         : 'slide',
		autoplay     : autoPlay,
		rewind       : true,
		pagination    : ( dotStyle === 'none' ? false : true ),
		arrows        : ( arrowStyle === 'none' ? false : true ),
		speed         : transSpeed,
		drag     : false,
		focus        : 0,
		perPage      : previewColumns,
		interval     : autoSpeed,
		perMove      : ( slidesScroll === 'all' ? previewColumns : 1 ),
		gap          : previewGutter ? previewGutter + previewGutterUnit : '0',
		direction : ( isRTL ? 'rtl' : 'ltr' )
	};
	const fluidCarouselSettings = {
		type         : 'loop',
		autoplay     : autoPlay,
		rewind       : true,
		arrows       : ( arrowStyle === 'none' ? false : true ),
		perPage      : 1,
		speed        : transSpeed,
		interval     : autoSpeed,
		autoWidth    : true,
		pagination   : ( dotStyle === 'none' ? false : true ),
		focus        : carouselAlign === false ? 0 : "center",
		gap          : previewGutter ? previewGutter + previewGutterUnit : '0',
		direction : ( isRTL ? 'rtl' : 'ltr' )
	};
	const sliderSettings = {
		type          : slideType,
		dots          : ( dotStyle === 'none' ? false : true ),
		arrows        : ( arrowStyle === 'none' ? false : true ),
		rewind       : true,
		perPage      : 1,
		fade          : true,
		speed         : transSpeed,
		drag     : false,
		interval      : autoSpeed,
		autoplay      : autoPlay,
		direction : ( isRTL ? 'rtl' : 'ltr' )
	};
	const thumbsliderSettings = {
		type           : slideType,
		dots           : false,
		arrows         : ( arrowStyle === 'none' ? false : true ),
		rewind         : true,
		fade           : true,
		speed          : transSpeed,
		drag           : false,
		pagination     : false,
		autoplaySpeed  : autoSpeed,
		autoplay       : autoPlay,
		slidesToShow   : 1,
		slidesToScroll : 1,
		direction      : ( isRTL ? 'rtl' : 'ltr' )
	};
	const thumbsliderthumbsSettings = {
		focus        : 0,
		height       : '100%',
		perPage      : previewThumbColumns,
		speed         : transSpeed,
		gap          : '' !== previewGutter ? previewGutter + previewGutterUnit : '4px',
		rewind       : true,
		pagination   : false,
		isNavigation : true,
		arrows       : previewThumbColumns > theImages.length ? false : true,
		direction : ( isRTL ? 'rtl' : 'ltr' )
	};
	const nonTransAttrs = ['images', 'imagesDynamic'];
	const controls = (
		<BlockControls>
			{hasImages && !dynamicSource && (
				<ToolbarGroup>
					<MediaUpload
						onSelect={( imgs ) => onSelectImages( imgs, 3 ) }
						allowedTypes={ALLOWED_MEDIA_TYPES}
						multiple
						gallery
						value={imagesDynamic.map( ( img ) => img.id )}
						render={( { open } ) => (
							<Button
								className="components-toolbar__control"
								label={__( 'Edit/Add gallery images', 'gutenam-blocks' )}
								icon="edit"
								onClick={open}
							/>
						)}
					/>
				</ToolbarGroup>
			)}
			<CopyPasteAttributes
				attributes={ attributes }
				excludedAttrs={ nonTransAttrs }
				defaultAttributes={ metadata['attributes'] }
				blockSlug={ metadata['name'] }
				onPaste={ attributesToPaste => setAttributes( attributesToPaste ) }
			/>
		</BlockControls>
	);
	const typeLabel = galleryTypes.filter( ( item ) => ( item.value === type ) );
	const sidebarControls = (
		<>
			{showSettings( 'allSettings', 'base/advancedgallery' ) && (
				<InspectorControls>

					<InspectorControlTabs
						panelName={ 'advancedgallery' }
						setActiveTab={ ( value ) => setActiveTab( value ) }
						activeTab={ activeTab }
					/>

					{( activeTab === 'general' ) &&

						<>
							<BasePanelBody panelName={'bsb-gallery-settings'}>
								{base_blocks_params.dynamic_enabled && dynamicSource && (
									<DynamicGalleryControl dynamicAttribute="images" {...props} />
								)}
								<BaseRadioButtons
									value={ type  }
									options={ galleryTypes }
									wrap={true}
									hideLabel={true}
									label={__( 'Gallery Type:' ) + ' ' + ( undefined !== typeLabel && undefined !== typeLabel[ 0 ] && typeLabel[ 0 ].label ? typeLabel[ 0 ].label : 'Masonry' )}
									className={ 'bsb-gallery-type-select' }
									onChange={ value => {
										setAttributes( {
											type: value,
										} );
									}}
								/>
								{( type === 'grid' || type === 'carousel' || type === 'slider' || type === 'thumbslider' ) && (
									<SelectControl
										label={__( 'Image ratio', 'gutenam-blocks' )}
										options={[
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
											{
												label: __( 'Inherit', 'gutenam-blocks' ),
												value: 'inherit',
											},
										]}
										value={imageRatio}
										onChange={( value ) => setAttributes( { imageRatio: value } )}
									/>
								)}
								{( type === 'thumbslider' ) && (
									<SelectControl
										label={__( 'Thumbnail Image ratio', 'gutenam-blocks' )}
										options={[
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
											{
												label: __( 'Inherit', 'gutenam-blocks' ),
												value: 'inherit',
											},
										]}
										value={thumbnailRatio}
										onChange={( value ) => setAttributes( { thumbnailRatio: value } )}
									/>
								)}
								{type && ( type === 'carousel' || type === 'grid' || type === 'masonry' ) && (
									<>
										<ButtonGroup className="bst-size-type-options bst-outline-control" aria-label={__( 'Column Control Type', 'gutenam-blocks' )}>
											{map( columnControlTypes, ( { name, key, icon } ) => (
												<Tooltip text={name}>
													<Button
														key={key}
														className="bst-size-btn"
														isSmall
														isPrimary={columnControl === key}
														aria-pressed={columnControl === key}
														onClick={() => setAttributes( { columnControl: key } )}
													>
														{icon}
													</Button>
												</Tooltip>
											) )}
										</ButtonGroup>
										{columnControl !== 'individual' && (
											<StepControls
												label={__( 'Columns', 'gutenam-blocks' )}
												value={columns[ 2 ]}
												onChange={onColumnChange}
												min={1}
												max={8}
											/>
										)}
										{columnControl && columnControl === 'individual' && (
											<>
												<h4>{__( 'Columns', 'gutenam-blocks' )}</h4>
												<RangeControl
													label={__( 'Screen Above 1500px', 'gutenam-blocks' )}
													value={columns[ 0 ]}
													onChange={( value ) => setAttributes( { columns: [ value, columns[ 1 ], columns[ 2 ], columns[ 3 ], columns[ 4 ], columns[ 5 ] ] } )}
													min={1}
													max={8}
												/>
												<RangeControl
													label={__( 'Screen 1200px - 1499px', 'gutenam-blocks' )}
													value={columns[ 1 ]}
													onChange={( value ) => setAttributes( { columns: [ columns[ 0 ], value, columns[ 2 ], columns[ 3 ], columns[ 4 ], columns[ 5 ] ] } )}
													min={1}
													max={8}
												/>
												<RangeControl
													label={__( 'Screen 992px - 1199px', 'gutenam-blocks' )}
													value={columns[ 2 ]}
													onChange={( value ) => setAttributes( { columns: [ columns[ 0 ], columns[ 1 ], value, columns[ 3 ], columns[ 4 ], columns[ 5 ] ] } )}
													min={1}
													max={8}
												/>
												<RangeControl
													label={__( 'Screen 768px - 991px', 'gutenam-blocks' )}
													value={columns[ 3 ]}
													onChange={( value ) => setAttributes( { columns: [ columns[ 0 ], columns[ 1 ], columns[ 2 ], value, columns[ 4 ], columns[ 5 ] ] } )}
													min={1}
													max={8}
												/>
												<RangeControl
													label={__( 'Screen 544px - 767px', 'gutenam-blocks' )}
													value={columns[ 4 ]}
													onChange={( value ) => setAttributes( { columns: [ columns[ 0 ], columns[ 1 ], columns[ 2 ], columns[ 3 ], value, columns[ 5 ] ] } )}
													min={1}
													max={8}
												/>
												<RangeControl
													label={__( 'Screen Below 543px', 'gutenam-blocks' )}
													value={columns[ 5 ]}
													onChange={( value ) => setAttributes( { columns: [ columns[ 0 ], columns[ 1 ], columns[ 2 ], columns[ 3 ], columns[ 4 ], value ] } )}
													min={1}
													max={8}
												/>
											</>
										)}
									</>
								)}
								{type && ( type === 'thumbslider' ) && (
									<>
										<ButtonGroup className="bst-size-type-options bst-outline-control" aria-label={__( 'Thumb Column Control Type', 'gutenam-blocks' )}>
											{map( columnControlTypes, ( { name, key, icon } ) => (
												<Tooltip text={name}>
													<Button
														key={key}
														className="bst-size-btn"
														isSmall
														isPrimary={thumbnailControl === key}
														aria-pressed={thumbnailControl === key}
														onClick={() => setAttributes( { thumbnailControl: key } )}
													>
														{icon}
													</Button>
												</Tooltip>
											) )}
										</ButtonGroup>
										{thumbnailControl !== 'individual' && (
											<RangeControl
												label={__( 'Thumbnail Columns', 'gutenam-blocks' )}
												value={thumbnailColumns[ 2 ]}
												onChange={onThumbColumnChange}
												min={1}
												max={10}
											/>
										)}
										{thumbnailControl && thumbnailControl === 'individual' && (
											<>
												<h4>{__( 'Columns' )}</h4>
												<RangeControl
													label={__( 'Screen Above 1500px', 'gutenam-blocks' )}
													value={thumbnailColumns[ 0 ]}
													onChange={( value ) => setAttributes( { thumbnailColumns: [ value, thumbnailColumns[ 1 ], thumbnailColumns[ 2 ], thumbnailColumns[ 3 ], thumbnailColumns[ 4 ], thumbnailColumns[ 5 ] ] } )}
													min={1}
													max={8}
												/>
												<RangeControl
													label={__( 'Screen 1200px - 1499px', 'gutenam-blocks' )}
													value={thumbnailColumns[ 1 ]}
													onChange={( value ) => setAttributes( { thumbnailColumns: [ thumbnailColumns[ 0 ], value, thumbnailColumns[ 2 ], thumbnailColumns[ 3 ], thumbnailColumns[ 4 ], thumbnailColumns[ 5 ] ] } )}
													min={1}
													max={8}
												/>
												<RangeControl
													label={__( 'Screen 992px - 1199px', 'gutenam-blocks' )}
													value={thumbnailColumns[ 2 ]}
													onChange={( value ) => setAttributes( { thumbnailColumns: [ thumbnailColumns[ 0 ], thumbnailColumns[ 1 ], value, thumbnailColumns[ 3 ], thumbnailColumns[ 4 ], thumbnailColumns[ 5 ] ] } )}
													min={1}
													max={8}
												/>
												<RangeControl
													label={__( 'Screen 768px - 991px', 'gutenam-blocks' )}
													value={thumbnailColumns[ 3 ]}
													onChange={( value ) => setAttributes( { thumbnailColumns: [ thumbnailColumns[ 0 ], thumbnailColumns[ 1 ], thumbnailColumns[ 2 ], value, thumbnailColumns[ 4 ], thumbnailColumns[ 5 ] ] } )}
													min={1}
													max={8}
												/>
												<RangeControl
													label={__( 'Screen 544px - 767px', 'gutenam-blocks' )}
													value={thumbnailColumns[ 4 ]}
													onChange={( value ) => setAttributes( { thumbnailColumns: [ thumbnailColumns[ 0 ], thumbnailColumns[ 1 ], thumbnailColumns[ 2 ], thumbnailColumns[ 3 ], value, thumbnailColumns[ 5 ] ] } )}
													min={1}
													max={8}
												/>
												<RangeControl
													label={__( 'Screen Below 543px', 'gutenam-blocks' )}
													value={thumbnailColumns[ 5 ]}
													onChange={( value ) => setAttributes( { thumbnailColumns: [ thumbnailColumns[ 0 ], thumbnailColumns[ 1 ], thumbnailColumns[ 2 ], thumbnailColumns[ 3 ], thumbnailColumns[ 4 ], value ] } )}
													min={1}
													max={8}
												/>
											</>
										)}
									</>
								)}
								{type !== 'slider' && showSettings( 'gutterSettings', 'base/advancedgallery' ) && (
									<>
										<ResponsiveRangeControls
											label={__( 'Gutter', 'gutenam-blocks' )}
											value={( '' !== gutter?.[0] ? gutter[0] : '' )}
											onChange={value => setAttributes( { gutter: [ value, ( '' !== gutter?.[1] ? gutter[1] : '' ), ( '' !== gutter?.[2] ? gutter[2] : '' ) ] } )}
											tabletValue={( '' !== gutter?.[1] ? gutter[1] : '' )}
											onChangeTablet={value => setAttributes( { gutter: [ (  '' !== gutter?.[0] ? gutter[0] : '' ), value, ( '' !== gutter?.[2] ? gutter[2] : '' ) ] } )}
											mobileValue={( '' !== gutter?.[2] ? gutter[2] : '' )}
											onChangeMobile={value => setAttributes( { gutter: [ (  '' !== gutter?.[0] ? gutter[0] : '' ), ( '' !== gutter?.[1] ? gutter[1] : '' ), value ] } )}
											min={0}
											max={( gutterUnit !== 'px' ? 12 : 200 )}
											step={( gutterUnit !== 'px' ? 0.1 : 1 )}
											unit={gutterUnit}
											onUnit={( value ) => setAttributes( { gutterUnit: value } )}
											units={[ 'px', 'em', 'rem' ]}
										/>
									</>
								)}
								{( type === 'fluidcarousel' || type === 'tiles' ) && (
									<>
										<ResponsiveRangeControls
											label={( type === 'tiles' ? __( 'Row Height', 'gutenam-blocks' ) : __( 'Carousel Height', 'gutenam-blocks' ) )}
											value={( ( undefined !== carouselHeight && undefined !== carouselHeight[ 0 ] ) ? carouselHeight[ 0 ] : '' )}
											onChange={value => setAttributes( { carouselHeight: [ value, ( ( undefined !== carouselHeight && undefined !== carouselHeight[ 1 ] ) ? carouselHeight[ 1 ] : '' ), ( ( undefined !== carouselHeight && undefined !== carouselHeight[ 2 ] ) ? carouselHeight[ 2 ] : '' ) ] } )}
											tabletValue={( ( undefined !== carouselHeight && undefined !== carouselHeight[ 1 ] ) ? carouselHeight[ 1 ] : '' )}
											onChangeTablet={value => setAttributes( { carouselHeight: [ ( ( undefined !== carouselHeight && undefined !== carouselHeight[ 0 ] ) ? carouselHeight[ 0 ] : '' ), value, ( ( undefined !== carouselHeight && undefined !== carouselHeight[ 2 ] ) ? carouselHeight[ 2 ] : '' ) ] } )}
											mobileValue={( ( undefined !== carouselHeight && undefined !== carouselHeight[ 2 ] ) ? carouselHeight[ 2 ] : '' )}
											onChangeMobile={value => setAttributes( { carouselHeight: [ ( ( undefined !== carouselHeight && undefined !== carouselHeight[ 0 ] ) ? carouselHeight[ 0 ] : '' ), ( ( undefined !== carouselHeight && undefined !== carouselHeight[ 1 ] ) ? carouselHeight[ 1 ] : '' ), value ] } )}
											step={1}
											min={120}
											max={800}
											unit={'px'}
											showUnit={true}
											units={[ 'px' ]}
										/>
										{type === 'fluidcarousel' && (
											<ToggleControl
												label={__( 'Carousel Center Mode', 'gutenam-blocks' )}
												checked={carouselAlign}
												onChange={( value ) => setAttributes( { carouselAlign: value } )}
											/>
										)}
									</>
								)}
								{ids && undefined !== ids[ 0 ] && !dynamicSource && (
									<ImageSizeControl
										label={__( 'Thumbnail Image Sizes', 'gutenam-blocks' )}
										slug={thumbSize}
										id={ids[ 0 ]}
										fullSelection={true}
										selectByValue={false}
										onChange={( value ) => changeImageThumbSize( value )}
									/>
								)}
							</BasePanelBody>
							{type && ( type === 'carousel' || type === 'fluidcarousel' || type === 'slider' || type === 'thumbslider' ) && (
								<>
									{showSettings( 'carouselSettings', 'base/advancedgallery' ) && (
										<BasePanelBody
											title={__( 'Carousel Settings', 'gutenam-blocks' )}
											initialOpen={false}
											panelName={'bsb-gallery-carousel-settings'}
										>
											<ToggleControl
												label={__( 'Carousel Auto Play', 'gutenam-blocks' )}
												checked={autoPlay}
												onChange={( value ) => setAttributes( { autoPlay: value } )}
											/>
											{autoPlay && (
												<RangeControl
													label={__( 'Autoplay Speed', 'gutenam-blocks' )}
													value={autoSpeed}
													onChange={( value ) => setAttributes( { autoSpeed: value } )}
													min={0}
													max={15000}
													step={10}
												/>
											)}
											{ (type === 'thumbslider' ||  type === 'slider' ) && (
												<SelectControl
													label={__( 'Transition Style', 'gutenam-blocks' )}
													options={[
														{
															label: __( 'Fade', 'gutenam-blocks' ),
															value: 'fade',
														},
														{
															label: __( 'Slide', 'gutenam-blocks' ),
															value: 'slide',
														},
													]}
													value={slideType ? slideType : 'fade'}
													onChange={( value ) => setAttributes( { slideType: value } )}
												/>
											)}
											<RangeControl
												label={__( 'Carousel Slide Transition Speed', 'gutenam-blocks' )}
												value={transSpeed}
												onChange={( value ) => setAttributes( { transSpeed: value } )}
												min={100}
												max={15000}
												step={10}
											/>
											{type === 'carousel' && (
												<SelectControl
													label={__( 'Slides to Scroll', 'gutenam-blocks' )}
													options={[
														{
															label: __( 'One' ),
															value: '1',
														},
														{
															label: __( 'All' ),
															value: 'all',
														},
													]}
													value={slidesScroll}
													onChange={( value ) => setAttributes( { slidesScroll: value } )}
												/>
											)}
											<SelectControl
												label={__( 'Arrow Style', 'gutenam-blocks' )}
												options={[
													{
														label: __( 'White on Dark', 'gutenam-blocks' ),
														value: 'whiteondark',
													},
													{
														label: __( 'Black on Light', 'gutenam-blocks' ),
														value: 'blackonlight',
													},
													{
														label: __( 'Outline Black', 'gutenam-blocks' ),
														value: 'outlineblack',
													},
													{
														label: __( 'Outline White', 'gutenam-blocks' ),
														value: 'outlinewhite',
													},
													{
														label: __( 'None', 'gutenam-blocks' ),
														value: 'none',
													},
												]}
												value={arrowStyle}
												onChange={( value ) => setAttributes( { arrowStyle: value } )}
											/>
											{type !== 'thumbslider' && (
												<SelectControl
													label={__( 'Dot Style', 'gutenam-blocks' )}
													options={[
														{
															label: __( 'Dark', 'gutenam-blocks' ),
															value: 'dark',
														},
														{
															label: __( 'Light', 'gutenam-blocks' ),
															value: 'light',
														},
														{
															label: __( 'Outline Dark', 'gutenam-blocks' ),
															value: 'outlinedark',
														},
														{
															label: __( 'Outline Light', 'gutenam-blocks' ),
															value: 'outlinelight',
														},
														{
															label: __( 'None', 'gutenam-blocks' ),
															value: 'none',
														},
													]}
													value={dotStyle}
													onChange={( value ) => setAttributes( { dotStyle: value } )}
												/>
											)}
											<ToggleControl
												label={__( 'Enable Image Lazy Load', 'gutenam-blocks' )}
												checked={lazyLoad}
												onChange={( value ) => setAttributes( { lazyLoad: value } )}
											/>
										</BasePanelBody>
									)}
								</>
							)}
							<BasePanelBody
								title={__( 'Link Settings', 'gutenam-blocks' )}
								initialOpen={false}
								panelName={'bsb-gallery-link-settings'}
							>
								<SelectControl
									label={__( 'Link To', 'gutenam-blocks' )}
									value={linkTo}
									onChange={( value ) => setAttributes( { linkTo: value } )}
									options={linkOptions}
								/>
								{linkTo === 'custom' && dynamicSource && (
									<DynamicLinkControl dynamicAttribute="link" {...props}/>
								)}
								{linkTo === 'media' && (
									<>
										{ids && undefined !== ids[ 0 ] && !dynamicSource && (
											<ImageSizeControl
												label={__( 'Link Image Size', 'gutenam-blocks' )}
												slug={lightSize}
												id={ids[ 0 ]}
												fullSelection={true}
												selectByValue={false}
												onChange={( value ) => changeImageLightSize( value ) }
											/>
										)}
										{showSettings( 'lightboxSettings', 'base/advancedgallery' ) && (
											<>
												<SelectControl
													label={__( 'Link Triggers?', 'gutenam-blocks' )}
													value={lightbox}
													onChange={( value ) => setAttributes( { lightbox: value } )}
													options={[
														{
															label: __( 'None', 'gutenam-blocks' ),
															value: 'none',
														},
														{
															label: __( 'Lightbox', 'gutenam-blocks' ),
															value: 'magnific',
														},
														{
															label: __( 'New Tab', 'gutenam-blocks' ),
															value: 'new_tab',
														},
													]}
												/>
												{lightbox && lightbox === 'magnific' && (
													<ToggleControl
														label={__( 'Show Caption in Lightbox', 'gutenam-blocks' )}
														checked={lightboxCaption}
														onChange={( value ) => setAttributes( { lightboxCaption: value } )}
													/>
												)}
											</>
										)}
									</>
								)}
							</BasePanelBody>
							{showSettings( 'captionSettings', 'base/advancedgallery' ) && (
								<BasePanelBody
									title={__( 'Caption Settings', 'gutenam-blocks' )}
									initialOpen={false}
									panelName={'bsb-gallery-caption-settings'}
								>
									<ToggleControl
										label={__( 'Show Captions', 'gutenam-blocks' )}
										checked={showCaption}
										onChange={() => setCaptions()}
									/>
									{showCaption && (
										<>
											<SelectControl
												label={__( 'Caption Placement', 'gutenam-blocks' )}
												options={[
													{
														label: __( 'Bottom of Image - Show on Hover', 'gutenam-blocks' ),
														value: 'bottom-hover',
													},
													{
														label: __( 'Bottom of Image - Show always', 'gutenam-blocks' ),
														value: 'bottom',
													},
													{
														label: __( 'Below Image - Show always', 'gutenam-blocks' ),
														value: 'below',
													},
													{
														label: __( 'Cover Image - Show on Hover', 'gutenam-blocks' ),
														value: 'cover-hover',
													},
												]}
												value={captionStyle}
												onChange={( value ) => setAttributes( { captionStyle: value } )}
											/>
											{( 'cover-hover' === captionStyle || 'bottom-hover' === captionStyle ) && (
												<ToggleControl
													label={__( 'Force hover effect always for mobile', 'gutenam-blocks' )}
													checked={mobileForceHover}
													onChange={value => setAttributes( { mobileForceHover: value } )}
												/>
											)}
											<PopColorControl
												label={__( 'Caption Color', 'gutenam-blocks' )}
												value={( captionStyles && captionStyles[ 0 ] && captionStyles[ 0 ].color ? captionStyles[ 0 ].color : '' )}
												default={''}
												onChange={value => saveCaptionFont( { color: value } )}
											/>
											<PopColorControl
												label={__( 'Caption Background', 'gutenam-blocks' )}
												value={( captionStyles && captionStyles[ 0 ] && captionStyles[ 0 ].background ? captionStyles[ 0 ].background : '' )}
												default={'#000000'}
												onChange={value => saveCaptionFont( { background: value } )}
												opacityValue={( captionStyles && captionStyles[ 0 ] && undefined !== captionStyles[ 0 ].backgroundOpacity ? captionStyles[ 0 ].backgroundOpacity : 0.5 )}
												onOpacityChange={value => saveCaptionFont( { backgroundOpacity: value } )}
											/>
											<TypographyControls
												fontSize={captionStyles[ 0 ].size}
												onFontSize={( value ) => saveCaptionFont( { size: value } )}
												fontSizeType={captionStyles[ 0 ].sizeType}
												onFontSizeType={( value ) => saveCaptionFont( { sizeType: value } )}
												lineHeight={captionStyles[ 0 ].lineHeight}
												onLineHeight={( value ) => saveCaptionFont( { lineHeight: value } )}
												lineHeightType={captionStyles[ 0 ].lineType}
												onLineHeightType={( value ) => saveCaptionFont( { lineType: value } )}
												letterSpacing={captionStyles[ 0 ].letterSpacing}
												onLetterSpacing={( value ) => saveCaptionFont( { letterSpacing: value } )}
												textTransform={captionStyles[ 0 ].textTransform}
												onTextTransform={( value ) => saveCaptionFont( { textTransform: value } )}
												fontFamily={captionStyles[ 0 ].family}
												onFontFamily={( value ) => saveCaptionFont( { family: value } )}
												onFontChange={( select ) => {
													saveCaptionFont( {
														family: select.value,
														google: select.google,
													} );
												}}
												onFontArrayChange={( values ) => saveCaptionFont( values )}
												googleFont={captionStyles[ 0 ].google}
												onGoogleFont={( value ) => saveCaptionFont( { google: value } )}
												loadGoogleFont={captionStyles[ 0 ].loadGoogle}
												onLoadGoogleFont={( value ) => saveCaptionFont( { loadGoogle: value } )}
												fontVariant={captionStyles[ 0 ].variant}
												onFontVariant={( value ) => saveCaptionFont( { variant: value } )}
												fontWeight={captionStyles[ 0 ].weight}
												onFontWeight={( value ) => saveCaptionFont( { weight: value } )}
												fontStyle={captionStyles[ 0 ].style}
												onFontStyle={( value ) => saveCaptionFont( { style: value } )}
												fontSubset={captionStyles[ 0 ].subset}
												onFontSubset={( value ) => saveCaptionFont( { subset: value } )}
											/>
										</>
									)}
								</BasePanelBody>
							)}

						</>
					}

					{( activeTab === 'style' ) &&

						<>
							{showSettings( 'styleSettings', 'base/advancedgallery' ) && (
								<BasePanelBody
									title={__( 'Image Style', 'gutenam-blocks' )}
									panelName={'bsb-gallery-image-style'}
								>
									{!( type === 'carousel' && imageRatio === 'inherit' ) && !( type === 'slider' && imageRatio === 'inherit' ) && (
										<ResponsiveMeasurementControls
											label={__( 'Border Radius', 'gutenam-blocks' )}
											value={imageRadius}
											tabletValue={tabletImageRadius}
											mobileValue={mobileImageRadius}
											onChange={( value ) => setAttributes( { imageRadius: value } )}
											onChangeTablet={( value ) => setAttributes( { tabletImageRadius: value } )}
											onChangeMobile={( value ) => setAttributes( { mobileImageRadius: value } )}
											unit={ imageRadiusUnit}
											units={[ 'px', 'em', 'rem', '%' ]}
											onUnit={( value ) => setAttributes( { imageRadiusUnit: value } )}
											max={(imageRadiusUnit === 'em' || imageRadiusUnit === 'rem' ? 24 : 500)}
											step={(imageRadiusUnit === 'em' || imageRadiusUnit === 'rem' ? 0.1 : 1)}
											min={ 0 }
											isBorderRadius={ true }
											allowEmpty={true}
										/>
									)}
									<SelectControl
										label={__( 'Image Filter', 'gutenam-blocks' )}
										help={__( 'Not supported in Internet Explorer', 'gutenam-blocks' )}
										options={[
											{
												label: __( 'None', 'gutenam-blocks' ),
												value: 'none',
											},
											{
												label: __( 'Grayscale', 'gutenam-blocks' ),
												value: 'grayscale',
											},
											{
												label: __( 'Sepia', 'gutenam-blocks' ),
												value: 'sepia',
											},
											{
												label: __( 'Saturation', 'gutenam-blocks' ),
												value: 'saturation',
											},
											{
												label: __( 'Vintage', 'gutenam-blocks' ),
												value: 'vintage',
											},
											{
												label: __( 'Earlybird', 'gutenam-blocks' ),
												value: 'earlybird',
											},
											{
												label: __( 'Toaster', 'gutenam-blocks' ),
												value: 'toaster',
											},
											{
												label: __( 'Mayfair', 'gutenam-blocks' ),
												value: 'mayfair',
											},
										]}
										value={imageFilter}
										onChange={( value ) => setAttributes( { imageFilter: value } )}
									/>
								</BasePanelBody>
							)}
							{showSettings( 'shadowSettings', 'base/advancedgallery' ) && (
								<BasePanelBody
									title={__( 'Image Shadow', 'gutenam-blocks' )}
									initialOpen={false}
									panelName={'bsb-gallery-image-shadow'}
								>
									<ToggleControl
										label={__( 'Enable Shadow', 'gutenam-blocks' )}
										checked={displayShadow}
										onChange={value => setAttributes( { displayShadow: value } )}
										help={__( 'Sliders and carousels will cut off shadows because of how items in a carousel are hidden.', 'gutenam-blocks' )}
									/>
									{displayShadow && (
										<TabPanel className="bst-inspect-tabs bst-hover-tabs"
												  activeClass="active-tab"
												  tabs={[
													  {
														  name     : 'normal',
														  title    : __( 'Normal' ),
														  className: 'bst-normal-tab',
													  },
													  {
														  name     : 'hover',
														  title    : __( 'Hover' ),
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
																	<BoxShadowControl
																		label={ __( 'Hover Box Shadow', 'gutenam-blocks-pro' ) }
																		enable={ true }
																		color={ (shadowHover[0].color ? shadowHover[0].color : '') }
																		colorDefault={ '#000000' }
																		opacity={ shadowHover[0].opacity }
																		hOffset={ shadowHover[0].hOffset }
																		vOffset={ shadowHover[0].vOffset }
																		blur={ shadowHover[0].blur }
																		spread={ shadowHover[0].spread }
																		onColorChange={ value => {
																			saveShadowHover( { color: value } );
																		} }
																		onOpacityChange={ value => {
																			saveShadowHover( { opacity: value } );
																		} }
																		onHOffsetChange={ value => {
																			saveShadowHover( { hOffset: value } );
																		} }
																		onVOffsetChange={ value => {
																			saveShadowHover( { vOffset: value } );
																		} }
																		onBlurChange={ value => {
																			saveShadowHover( { blur: value } );
																		} }
																		onSpreadChange={ value => {
																			saveShadowHover( { spread: value } );
																		} }
																	/>
																</>
															);
														} else {
															tabout = (
																<>
																	<BoxShadowControl
																		label={ __( 'Box Shadow', 'gutenam-blocks' ) }
																		enable={ true }
																		color={ (shadow[0].color ? shadow[0].color : '') }
																		colorDefault={ '#000000' }
																		opacity={ shadow[0].opacity }
																		hOffset={ shadow[0].hOffset }
																		vOffset={ shadow[0].vOffset }
																		blur={ shadow[0].blur }
																		spread={ shadow[0].spread }
																		onColorChange={ value => {
																			saveShadow( { color: value } );
																		} }
																		onOpacityChange={ value => {
																			saveShadow( { opacity: value } );
																		} }
																		onHOffsetChange={ value => {
																			saveShadow( { hOffset: value } );
																		} }
																		onVOffsetChange={ value => {
																			saveShadow( { vOffset: value } );
																		} }
																		onBlurChange={ value => {
																			saveShadow( { blur: value } );
																		} }
																		onSpreadChange={ value => {
																			saveShadow( { spread: value } );
																		} }
																	/>
																</>
															);
														}
													}
													return <div className={tab.className} key={tab.className}>{tabout}</div>;
												}
											}
										</TabPanel>
									)}
								</BasePanelBody>
							)}

						</>
					}

					{(activeTab === 'advanced') && (

						<>
							{showSettings('spacingSettings', 'base/advancedgallery') && (

								<>
									<BasePanelBody panelName={'bsb-adv-gallery-spacing-settings'}>
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
											max={ ( paddingUnit === 'em' || paddingUnit === 'rem' ? 24 : 500 ) }
											step={ ( paddingUnit === 'em' || paddingUnit === 'rem' ? 0.1 : 1 ) }
											unit={ paddingUnit }
											units={ [ 'px', 'em', 'rem', '%', 'vh', 'vw' ] }
											onUnit={( value ) => setAttributes( { paddingUnit: value } )}
											onMouseOver={ paddingMouseOver.onMouseOver }
											onMouseOut={ paddingMouseOver.onMouseOut }
										/>
										<ResponsiveMeasureRangeControl
											label={__('Margin', 'gutenam-blocks')}
											value={margin[0].desk}
											tabletValue={margin[0].tablet}
											mobileValue={margin[0].mobile}
											onChange={(value) => {
												saveMargin({desk: value})
											}}
											onChangeTablet={(value) => {
												saveMargin({tablet: value})
											}}
											onChangeMobile={(value) => {
												saveMargin({mobile: value})
											}}
											min={marginMin}
											max={marginMax}
											step={marginStep}
											unit={marginUnit}
											units={['px', 'em', 'rem', '%', 'vh']}
											onUnit={(value) => setAttributes({marginUnit: value})}
											onMouseOver={marginMouseOver.onMouseOver}
											onMouseOut={marginMouseOver.onMouseOut}
										/>

									</BasePanelBody>

									<div className="bst-sidebar-settings-spacer"></div>

								</>
							)}

							<BaseBlockDefaults
								attributes={attributes}
								defaultAttributes={metadata['attributes']}
								blockSlug={'base/advancedgallery'}
								excludedAttrs={nonTransAttrs}
							/>
						</>
					)}

					</InspectorControls>
			)}
		</>
	);
	let instructions = '';
	let title = '';
	if ( !hasImages ) {
		title = __( 'Gallery', 'gutenam-blocks' );
		instructions = __( 'Drag images, upload new ones or select files from your library.', 'gutenam-blocks' );
	}
	const dynamicMediaPlaceholder = (
		<Placeholder
			label={__( 'Gallery', 'gutenam-blocks' )}
			instructions={__( 'Dynamic source failed to load array of images.', 'gutenam-blocks' )}
		>
			{( base_blocks_params.dynamic_enabled ? <DynamicGalleryControl dynamicAttribute="images" {...props}/> : undefined )}
		</Placeholder>
	);
	const mediaPlaceholder = (
		<BaseMediaPlaceholder
			labels={{
				title       : title,
				instructions: instructions,
			}}
			selectIcon={plusCircleFilled}
			selectLabel={__( 'Select Images', 'gutenam-blocks' )}
			onSelect={ ( imgs ) => onSelectImages( imgs, 4 ) }
			accept="image/*"
			multiple
			className={'base-image-upload'}
			allowedTypes={ALLOWED_MEDIA_TYPES}
			dynamicControl={( base_blocks_params.dynamic_enabled ? <DynamicGalleryControl dynamicAttribute="images" {...props}/> : undefined )}
		/>
	);

	const addIcon = <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<path fill="none" d="M0 0h24v24H0V0z"/>
		<g>
			<path d="M20 4v12H8V4h12m0-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 9.67l1.69 2.26 2.48-3.1L19 15H9zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z"/>
		</g>
	</svg>;

	const addMediaPlaceholder = (
		<MediaPlaceholder
			addToGallery={hasImages}
			isAppender={hasImages}
			className={className}
			dropZoneUIOnly={hasImages && !isSelected}
			icon={!hasImages && <BlockIcon icon={addIcon}/>}
			labels={{
				title       : !hasImages && __( 'Gallery', 'gutenam-blocks' ),
				instructions: !hasImages && __( 'Drag images, upload new ones or select files from your library.', 'gutenam-blocks' ),
			}}
			onSelect={( imgs ) => onSelectImages( imgs, 5 ) }
			accept="image/*"
			allowedTypes={ALLOWED_MEDIA_TYPES}
			multiple
			value={hasImages ? images : undefined}
			onError={() => onUploadError}
			notices={hasImages ? undefined : noticeUI}
		/>
	);
	const buildCSS = (
		<style>
			{`
					.wp-block-base-advancedgallery .bsb-gallery-type-tiles.bsb-gallery-id-${uniqueID}, .wp-block-base-advancedgallery .bsb-gallery-type-grid.bsb-gallery-id-${uniqueID}, .wp-block-base-advancedgallery .bsb-gallery-type-masonry.bsb-gallery-id-${uniqueID} {
						${( previewGutter ? 'margin: -' + ( previewGutter / 2 ) + previewGutterUnit + ';' : '' )}
					}
					.bsb-gallery-id-${uniqueID}.bsb-gallery-type-masonry .base-blocks-gallery-item, .bsb-gallery-id-${uniqueID}.bsb-gallery-type-grid .base-blocks-gallery-item, .bsb-gallery-id-${uniqueID}.bsb-gallery-type-tiles .base-blocks-gallery-item {
						${( previewGutter ? 'padding:' + ( previewGutter / 2 ) + previewGutterUnit + ';' : '' )}
					}
					.bsb-gallery-id-${uniqueID}.bsb-gallery-type-thumbslider .bst-blocks-carousel-main {
						${( previewGutter ? 'margin-bottom:' + previewGutter + previewGutterUnit + ';' : '' )}
					}

					${( captionStyles && undefined !== captionStyles[ 0 ] && undefined !== captionStyles[ 0 ].background ? `.bsb-gallery-id-${uniqueID}.bsb-gallery-main-contain .base-blocks-gallery-item .base-blocks-gallery-item-inner figcaption { background: linear-gradient( 0deg, ` + BaseColorOutput( ( captionStyles[ 0 ].background ? captionStyles[ 0 ].background : '#000000' ), ( '' !== captionStyles[ 0 ].backgroundOpacity ? captionStyles[ 0 ].backgroundOpacity : 0.5 ) ) + ' 0, ' + BaseColorOutput( ( captionStyles[ 0 ].background ? captionStyles[ 0 ].background : '#000000' ), 0 ) + ' 100% );}' : '' )}
					${( captionStyles && undefined !== captionStyles[ 0 ] && undefined !== captionStyles[ 0 ].background ? `.bsb-gallery-id-${uniqueID}.bsb-gallery-caption-style-cover-hover.bsb-gallery-main-contain .base-blocks-gallery-item .base-blocks-gallery-item-inner figcaption, .bsb-gallery-id-${uniqueID}.bsb-gallery-caption-style-below.bsb-gallery-main-contain .base-blocks-gallery-item .base-blocks-gallery-item-inner figcaption { background:` + BaseColorOutput( ( captionStyles[ 0 ].background ? captionStyles[ 0 ].background : '#000000' ), ( '' !== captionStyles[ 0 ].backgroundOpacity ? captionStyles[ 0 ].backgroundOpacity : 0.5 ) ) + ';}' : '' )}
					${( captionStyles && undefined !== captionStyles[ 0 ] && undefined !== captionStyles[ 0 ].color && '' !== captionStyles[ 0 ].color ? `.bsb-gallery-id-${uniqueID} .base-blocks-gallery-item .base-blocks-gallery-item-inner figcaption { color:` + BaseColorOutput( captionStyles[ 0 ].color ) + ';}' : '' )}
					.bsb-gallery-id-${uniqueID} .base-blocks-gallery-item .bsb-gal-image-radius { box-shadow:${( displayShadow ? shadow[ 0 ].hOffset + 'px ' + shadow[ 0 ].vOffset + 'px ' + shadow[ 0 ].blur + 'px ' + shadow[ 0 ].spread + 'px ' + BaseColorOutput( shadow[ 0 ].color, shadow[ 0 ].opacity ) : 'none' )}; }
					.bsb-gallery-id-${uniqueID} .base-blocks-gallery-item:hover .bsb-gal-image-radius { box-shadow:${( displayShadow ? shadowHover[ 0 ].hOffset + 'px ' + shadowHover[ 0 ].vOffset + 'px ' + shadowHover[ 0 ].blur + 'px ' + shadowHover[ 0 ].spread + 'px ' + BaseColorOutput( shadowHover[ 0 ].color, shadowHover[ 0 ].opacity ) : 'none' )}; }
					.bsb-gallery-id-${uniqueID} .base-blocks-gallery-item .bsb-gal-image-radius {
						${( imageRadius && undefined !== imageRadius[ 0 ] && '' !== imageRadius[ 0 ] ? 'border-radius:' + imageRadius[ 0 ] + 'px ' + imageRadius[ 1 ] + 'px ' + imageRadius[ 2 ] + 'px ' + imageRadius[ 3 ] + 'px;' : '' )}
					}
					.bsb-gallery-main-contain.bsb-gallery-type-fluidcarousel.bsb-gallery-id-${uniqueID} .bst-blocks-carousel .splide__list figure .bsb-gal-image-radius, .bsb-gallery-main-contain.bsb-gallery-type-fluidcarousel.bsb-gallery-id-${uniqueID} .bst-blocks-carousel .splide__list figure .bsb-gal-image-radius img {
						${( previewHeight ? 'height:' + previewHeight + 'px;' : '' )}
					}
					.wp-block-base-advancedgallery .bsb-gallery-type-tiles.bsb-gallery-id-${uniqueID} > .base-blocks-gallery-item, .wp-block-base-advancedgallery .bsb-gallery-type-tiles.bsb-gallery-id-${uniqueID} .base-blocks-gallery-item .base-blocks-gallery-item-inner img {
						${( previewHeight ? 'height:' + previewHeight + 'px;' : '' )}
					}
			`}
		</style>
	);
	if ( !hasImages || theImages.constructor !== Array ) {
		return (
			<div {...blockProps}>
				{controls}
				{sidebarControls}
				{theImages.constructor !== Array && dynamicSource ? dynamicMediaPlaceholder : mediaPlaceholder}
			</div>
		);
	}
	const galleryClassNames = classnames(
		'bsb-gallery-main-contain',
		{
			[ `bsb-gallery-type-${type}` ]                 : type,
			[ `bsb-gallery-id-${uniqueID}` ]               : uniqueID,
			[ `bsb-gallery-caption-style-${captionStyle}` ]: captionStyle,
			[ `bsb-gallery-filter-${imageFilter}` ]        : imageFilter,
			[ `bsb-gallery-preview-columns-${previewColumns}` ]        : ( type === 'grid' || type === 'carousel' ) && previewColumns,
		},
	);
	const renderGalleryImages = ( img, index, thumbnail = false ) => {
		const ariaLabel = sprintf(
			/* translators: %1$d is the order number of the image, %2$d is the total number of images. */
			__( 'image %1$d of %2$d in gallery', 'gutenam-blocks' ),
			( index + 1 ),
			theImages.length,
		);
		const ratio = ( thumbnail ? thumbnailRatio : imageRatio );
		return (
			<div className="base-blocks-gallery-item-inner">
				<GalleryImage
					thumbUrl={img.thumbUrl}
					url={img.url}
					width={img.width}
					height={img.height}
					lightUrl={img.lightUrl}
					alt={img.alt}
					id={img.id}
					index={index}
					link={img.link}
					linkTo={linkTo}
					isFirstItem={index === 0}
					isLastItem={( index + 1 ) === theImages.length}
					isSelected={isSelected && selectedImage === index}
					onMoveBackward={() => { onMoveBackward( index ) } }
					onMoveForward={() => { onMoveForward( index ) } }
					onRemove={() => { onRemoveImage( index ) } }
					onSelect={( index ) => { onSelectImage( index ) }}
					setAttributes={( attrs ) => { setImageAttributes( index, attrs ) } }
					caption={img.caption}
					customLink={img.customLink}
					linkTarget={img.linkTarget}
					linkSponsored={img.linkSponsored}
					setLinkAttributes={( attrs ) => { setLinkAttributes( index, attrs ) } }
					showCaption={showCaption}
					captionStyles={captionStyles}
					captionStyle={captionStyle}
					aria-label={ariaLabel}
					imageRatio={ratio}
					type={type}
					thumbnail={thumbnail}
					dynamicSource={dynamicSource}
					previewDevice={ previewDevice }
				/>
			</div>
		);
	};

	return (
		<div {...blockProps}>
			<SpacingVisualizer
				type="outsideVertical"
				//offset={ false }
				forceShow={ marginMouseOver.isMouseOver }
				spacing={ [ getSpacingOptionOutput( previewMarginTop, previewMarginUnit ), getSpacingOptionOutput( previewMarginRight, previewMarginUnit ), getSpacingOptionOutput( previewMarginBottom, previewMarginUnit ), getSpacingOptionOutput( previewMarginLeft, previewMarginUnit ) ] }
			/>
			<SpacingVisualizer
				style={ {
					marginLeft: ( undefined !== previewMarginLeft ? getSpacingOptionOutput( previewMarginLeft, previewMarginUnit ) : undefined ),
					marginRight: ( undefined !== previewMarginRight ? getSpacingOptionOutput( previewMarginRight, previewMarginUnit ) : undefined ),
					//marginTop: ( undefined !== previewMarginTop ? getSpacingOptionOutput( previewMarginTop, previewMarginUnit ) : undefined ),
					//marginBottom: ( undefined !== previewMarginBottom ? getSpacingOptionOutput( previewMarginBottom, previewMarginUnit ) : undefined ),
				} }
				type="inside"
				forceShow={ paddingMouseOver.isMouseOver }
				spacing={ [ getSpacingOptionOutput( previewPaddingTop, previewPaddingUnit ), getSpacingOptionOutput( previewPaddingRight, previewPaddingUnit ), getSpacingOptionOutput( previewPaddingBottom, previewPaddingUnit ), getSpacingOptionOutput( previewPaddingLeft, previewPaddingUnit ) ] }
			/>
			{buildCSS}
			{controls}
			{sidebarControls}
			{noticeUI}
			{showCaption && captionStyles[ 0 ].google && (
				<WebfontLoader config={config}>
				</WebfontLoader>
			)}
			{type && type === 'fluidcarousel' && (
				<div id={`bsb-gallery-id-${uniqueID}`} style={spacingSettings} className={galleryClassNames}>
					<div className={`bst-blocks-carousel bst-blocks-fluid-carousel bst-carousel-container-dotstyle-${dotStyle}${( carouselAlign === false ? ' bsb-carousel-mode-align-left' : '' )}`}>
						{theImages.length !== 1 && (
							<Splide options={ fluidCarouselSettings } className={`splide bst-carousel-arrowstyle-${arrowStyle} bst-carousel-dotstyle-${dotStyle}`}>
								{theImages.map( ( img, index ) => {
									return (
										<SplideSlide className={ 'base-blocks-gallery-item' } key={img.id || img.url}>
											{ renderGalleryImages( img, index ) }
										</SplideSlide>
									);
								} )}
							</Splide>
						)}
						{theImages.length === 1 && (
							theImages.map( ( img, index ) => {
								return (
									<div className="base-blocks-gallery-item" key={img.id || img.url}>
										{ renderGalleryImages( img, index ) }
									</div>
								);
							} )
						)}
					</div>
				</div>
			)}
			{type && type === 'slider' && (
				<div className={galleryClassNames} style={spacingSettings}>
					<div className={`bst-blocks-carousel bst-blocks-slider bst-carousel-container-dotstyle-${dotStyle}`}>
						{theImages.length !== 1 && (
							<Splide options={ sliderSettings } className={`splide bst-carousel-arrowstyle-${arrowStyle} bst-carousel-dotstyle-${dotStyle}`}>
								{theImages.map( ( img, index ) => {
									return (
										<SplideSlide className={ 'base-blocks-gallery-item' } key={img.id || img.url}>
											{ renderGalleryImages( img, index ) }
										</SplideSlide>
									);
								} )}
							</Splide>
						)}
						{theImages.length === 1 && (
							theImages.map( ( img, index ) => {
								return (
									<div className="base-blocks-gallery-item" key={img.id || img.url}>
										{ renderGalleryImages( img, index ) }
									</div>
								);
							} )
						)}
					</div>
				</div>
			)}
			{type && type === 'thumbslider' && (
				<div className={galleryClassNames} style={spacingSettings}>
					<div className={`bst-blocks-carousel bst-blocks-slider bst-carousel-container-dotstyle-${dotStyle}`}>
						{theImages.length !== 1 && (
							<>
								<Splide options={ thumbsliderSettings } ref={ mainRef } className={`splide bst-blocks-carousel-main bst-carousel-arrowstyle-${arrowStyle} bst-carousel-dotstyle-${dotStyle}`}>
									{theImages.map( ( img, index ) => {
										return (
											<SplideSlide className={ 'base-blocks-gallery-item' } key={img.id || img.url}>
												{ renderGalleryImages( img, index ) }
											</SplideSlide>
										);
									} )}
								</Splide>
								<Splide options={thumbsliderthumbsSettings } ref={ thumbsRef } className={`splide bst-carousel-arrowstyle-${arrowStyle} bst-blocks-carousel-thumbnails bsb-cloned-${( theImages.length < thumbnailColumns[ 0 ] ? 'hide' : 'show' )} bst-carousel-dotstyle-none`}>
									{theImages.map( ( img, index ) => {
										return (
											<SplideSlide className={ 'base-blocks-gallery-item' } key={img.id || img.url}>
												{ renderGalleryImages( img, index, true ) }
											</SplideSlide>
										);
									} )}
								</Splide>
							</>
						)}
						{theImages.length === 1 && (
							theImages.map( ( img, index ) => {
								return (
									<div className="base-blocks-gallery-item" key={img.id || img.url}>
										{ renderGalleryImages( img, index ) }
									</div>
								);
							} )
						)}
					</div>
				</div>
			)}
			{type && type === 'carousel' && (
				<div className={galleryClassNames}
				style={spacingSettings}
						data-columns-xxl={columns[ 0 ]}
						data-columns-xl={columns[ 1 ]}
						data-columns-lg={columns[ 2 ]}
						data-columns-md={columns[ 3 ]}
						data-columns-sm={columns[ 4 ]}
						data-columns-xs={columns[ 5 ]}
				>
					<div className={`bst-blocks-carousel bst-carousel-container-dotstyle-${dotStyle}`}>
						<Splide options={ carouselSettings } ref={ mainRef } className={`splide bst-carousel-arrowstyle-${arrowStyle} bst-carousel-dotstyle-${dotStyle}`}>
							{theImages.map( ( img, index ) => {
								return (
									<SplideSlide className={ 'base-blocks-gallery-item' } key={img.id || img.url}>
										{ renderGalleryImages( img, index ) }
									</SplideSlide>
								);
							} )}
						</Splide>
					</div>
				</div>
			)}
			{type && type === 'masonry' && (
				<Masonry
					style={spacingSettings}
					breakpointCols={{
						default: previewColumns,
					}}
					className={galleryClassNames}
				>
					{theImages.map( ( img, index ) => {
						return (
							<div className="base-blocks-gallery-item" key={img.id || img.url}>
								{ renderGalleryImages( img, index ) }
							</div>
						);
					} )}
				</Masonry>
			)}
			{type && type === 'grid' && (
				<ul
					style={spacingSettings}
					className={galleryClassNames}
					data-columns-xxl={columns[ 0 ]}
					data-columns-xl={columns[ 1 ]}
					data-columns-lg={columns[ 2 ]}
					data-columns-md={columns[ 3 ]}
					data-columns-sm={columns[ 4 ]}
					data-columns-xs={columns[ 5 ]}
				>
					{theImages.map( ( img, index ) => {
						return (
							<li className="base-blocks-gallery-item" key={img.id || img.url}>
								{ renderGalleryImages( img, index ) }
							</li>
						);
					} )}
				</ul>
			)}
			{type && type === 'tiles' && (
				<ul
					style={spacingSettings}
					className={galleryClassNames}
				>
					{theImages.map( ( img, index ) => {
						return (
							<li className="base-blocks-gallery-item" key={img.id || img.url}>
								{ renderGalleryImages( img, index ) }
							</li>
						);
					} )}
				</ul>
			)}
		</div>
	);
}

export default compose( [
	withSelect( ( select ) => {
		const { getSettings } = select( 'core/block-editor' );
		const {
			__experimentalMediaUpload,
			mediaUpload,
		} = getSettings();

		return {
			mediaUpload: mediaUpload ? mediaUpload : __experimentalMediaUpload,
		};
	} ),
	withNotices,
] )( GalleryEdit );
