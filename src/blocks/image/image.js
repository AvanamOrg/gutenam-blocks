/**
 * External dependencies
 */
import { get, filter, map, pick, includes } from 'lodash';

/**
 * WordPress dependencies
 */
import { isBlobURL } from '@wordpress/blob';
import {
	ExternalLink,
	ResizableBox,
	SelectControl,
	Spinner,
	TextareaControl,
	RangeControl,
	TextControl,
	ToolbarButton,
	ToggleControl
} from '@wordpress/components';
import { useViewportMatch, usePrevious } from '@wordpress/compose';
import { useSelect, useDispatch } from '@wordpress/data';
import {
	BlockControls,
	InspectorControls,
	InspectorAdvancedControls,
	RichText,
	MediaReplaceFlow,
	store as blockEditorStore,
	BlockAlignmentControl,
	__experimentalImageEditor as ImageEditor,
} from '@wordpress/block-editor';
import { useEffect, useState, useRef, useCallback } from '@wordpress/element';
import { __, sprintf, isRTL } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { crop, upload, caption as captionIcon } from '@wordpress/icons';
import { store as noticesStore } from '@wordpress/notices';
import { store as coreStore } from '@wordpress/core-data';
/**
 * Internal dependencies
 */
import { createUpgradedEmbedBlock } from './helpers';
import useClientWidth from './use-client-width';
//import ImageEditor, { ImageEditingProvider } from './image-editing';
import { BaseColorOutput, getPreviewSize, getFontSizeOptionOutput, getSpacingOptionOutput, getBorderStyle } from '@base/helpers';
import { isExternalImage } from './edit';
import metadata from './block.json';
/**
 * Module constants
 */
import { MIN_SIZE, ALLOWED_MEDIA_TYPES } from './constants';
import {
	PopColorControl,
	TypographyControls,
	ResponsiveMeasurementControls,
	BasePanelBody,
	URLInputControl,
	BaseImageURLInputUI,
	BoxShadowControl,
	BaseImageControl,
	ResponsiveRangeControls,
	DropShadowControl,
	ImageSizeControl as BaseImageSizeControl,
	InspectorControlTabs,
	BaseBlockDefaults,
	ResponsiveMeasureRangeControl,
	SpacingVisualizer,
	ResponsiveBorderControl,
	CopyPasteAttributes,
} from '@base/components';

export default function Image( {
	temporaryURL,
	attributes,
	setAttributes,
	isSelected,
	insertBlocksAfter,
	onReplace,
	onSelectImage,
	onSelectURL,
	onUploadError,
	containerRef,
	context,
	clientId,
	previewDevice,
	marginMouseOver,
	paddingMouseOver
} ) {
	const {
		url = '',
		alt,
		caption,
		align,
		id,
		title,
		width,
		height,
		sizeSlug,
		useRatio,
		ratio,
		imgMaxWidth,
		imgMaxWidthTablet,
		imgMaxWidthMobile,
		uniqueID,
		marginDesktop,
		marginTablet,
		marginMobile,
		marginUnit,
		paddingDesktop,
		paddingTablet,
		paddingMobile,
		paddingUnit,
		backgroundColor,
		borderColor,
		borderRadius,
		borderWidthUnit,
		borderRadiusUnit,
		borderWidthDesktop,
		borderWidthTablet,
		borderWidthMobile,
		displayBoxShadow,
		boxShadow,
		displayDropShadow,
		dropShadow,
		imageFilter,
		showCaption,
		captionStyles,
		maskSvg,
		maskSize,
		maskPosition,
		maskRepeat,
		maskUrl,
		link,
		linkTarget,
		linkNoFollow,
		linkSponsored,
		linkDestination,
		linkTitle,
		zIndex,
		tabletBorderRadius,
		mobileBorderRadius,
		borderStyle,
		tabletBorderStyle,
		mobileBorderStyle,
		preventLazyLoad,
	} = attributes;

	const previewMarginTop = getPreviewSize( previewDevice, ( undefined !== marginDesktop ? marginDesktop[0] : '' ), ( undefined !== marginTablet ? marginTablet[ 0 ] : '' ), ( undefined !== marginMobile ? marginMobile[ 0 ] : '' ) );
	const previewMarginRight = getPreviewSize( previewDevice, ( undefined !== marginDesktop ? marginDesktop[1] : '' ), ( undefined !== marginTablet ? marginTablet[ 1 ] : '' ), ( undefined !== marginMobile ? marginMobile[ 1 ] : '' ) );
	const previewMarginBottom = getPreviewSize( previewDevice, ( undefined !== marginDesktop ? marginDesktop[2] : '' ), ( undefined !== marginTablet ? marginTablet[ 2 ] : '' ), ( undefined !== marginMobile ? marginMobile[ 2 ] : '' ) );
	const previewMarginLeft = getPreviewSize( previewDevice, ( undefined !== marginDesktop ? marginDesktop[3] : '' ), ( undefined !== marginTablet ? marginTablet[ 3 ] : '' ), ( undefined !== marginMobile ? marginMobile[ 3 ] : '' ) );

	const previewPaddingTop = getPreviewSize( previewDevice, ( undefined !== paddingDesktop ? paddingDesktop[0] : '' ), ( undefined !== paddingTablet ? paddingTablet[ 0 ] : '' ), ( undefined !== paddingMobile ? paddingMobile[ 0 ] : '' ) );
	const previewPaddingRight = getPreviewSize( previewDevice, ( undefined !== paddingDesktop ? paddingDesktop[1] : '' ), ( undefined !== paddingTablet ? paddingTablet[ 1 ] : '' ), ( undefined !== paddingMobile ? paddingMobile[ 1 ] : '' ) );
	const previewPaddingBottom = getPreviewSize( previewDevice, ( undefined !== paddingDesktop ? paddingDesktop[2] : '' ), ( undefined !== paddingTablet ? paddingTablet[ 2 ] : '' ), ( undefined !== paddingMobile ? paddingMobile[ 2 ] : '' ) );
	const previewPaddingLeft = getPreviewSize( previewDevice, ( undefined !== paddingDesktop ? paddingDesktop[3] : '' ), ( undefined !== paddingTablet ? paddingTablet[ 3 ] : '' ), ( undefined !== paddingMobile ? paddingMobile[ 3 ] : '' ) );

	// Border.
	const previewBorderTopStyle = getBorderStyle( previewDevice, 'top', borderStyle, tabletBorderStyle, mobileBorderStyle );
	const previewBorderRightStyle = getBorderStyle( previewDevice, 'right', borderStyle, tabletBorderStyle, mobileBorderStyle );
	const previewBorderBottomStyle = getBorderStyle( previewDevice, 'bottom', borderStyle, tabletBorderStyle, mobileBorderStyle );
	const previewBorderLeftStyle = getBorderStyle( previewDevice, 'left', borderStyle, tabletBorderStyle, mobileBorderStyle );
	const previewRadiusTop = getPreviewSize( previewDevice, ( undefined !== borderRadius ? borderRadius[ 0 ] : '' ), ( undefined !== tabletBorderRadius ? tabletBorderRadius[ 0 ] : '' ), ( undefined !== mobileBorderRadius ? mobileBorderRadius[ 0 ] : '' ) );
	const previewRadiusRight = getPreviewSize( previewDevice, ( undefined !== borderRadius ? borderRadius[ 1 ] : '' ), ( undefined !== tabletBorderRadius ? tabletBorderRadius[ 1 ] : '' ), ( undefined !== mobileBorderRadius ? mobileBorderRadius[ 1 ] : '' ) );
	const previewRadiusBottom = getPreviewSize( previewDevice, ( undefined !== borderRadius ? borderRadius[ 2 ] : '' ), ( undefined !== tabletBorderRadius ? tabletBorderRadius[ 2 ] : '' ), ( undefined !== mobileBorderRadius ? mobileBorderRadius[ 2 ] : '' ) );
	const previewRadiusLeft = getPreviewSize( previewDevice, ( undefined !== borderRadius ? borderRadius[ 3 ] : '' ), ( undefined !== tabletBorderRadius ? tabletBorderRadius[ 3 ] : '' ), ( undefined !== mobileBorderRadius ? mobileBorderRadius[ 3 ] : '' ) );

	const previewMaxWidth = getPreviewSize( previewDevice, ( undefined !== imgMaxWidth ? imgMaxWidth : '' ), ( undefined !== imgMaxWidthTablet ? imgMaxWidthTablet : '' ), ( undefined !== imgMaxWidthMobile ? imgMaxWidthMobile : '' ) );

	const previewCaptionFontSizeUnit = captionStyles[ 0 ].sizeType !== undefined ? captionStyles[ 0 ].sizeType : 'px';
	const previewCaptionFontSize = getPreviewSize( previewDevice, ( undefined !== captionStyles[ 0 ].size[0] ? captionStyles[ 0 ].size[0] : 'inherit' ), ( undefined !== captionStyles[ 0 ].size[1] ? captionStyles[ 0 ].size[ 1 ] : 'inherit' ), ( undefined !== captionStyles[ 0 ].size[2] ? captionStyles[ 0 ].size[ 2 ] : 'inherit' ) );

	const previewCaptionLineHeightUnit = captionStyles[ 0 ].lineType !== undefined ? captionStyles[ 0 ].lineType : 'px';
	const previewCaptionLineHeight = getPreviewSize( previewDevice, ( undefined !== captionStyles[ 0 ].lineHeight[0] ? captionStyles[ 0 ].lineHeight[0] + previewCaptionLineHeightUnit : 'normal' ), ( undefined !== captionStyles[ 0 ].lineHeight[1] ? captionStyles[ 0 ].lineHeight[ 1 ] + previewCaptionLineHeightUnit : 'normal' ), ( undefined !== captionStyles[ 0 ].lineHeight[2] + previewCaptionLineHeightUnit ? captionStyles[ 0 ].lineHeight[ 2 ] : 'normal' ) );

	const prevCaption = usePrevious( caption );
	const [ stateShowCaption, setStateShowCaption ] = useState( !! caption );
	const { allowResize = true } = context;
	function saveDropShadow( value ) {
		const newItems = dropShadow.map( ( item, thisIndex ) => {
			if ( 0 === thisIndex ) {
				item = { ...item, ...value };
			}
			return item;
		} );

		setAttributes( {
			dropShadow: newItems,
		} );
	}
	function saveBoxShadow( value ) {
		const newItems = boxShadow.map( ( item, thisIndex ) => {
			if ( 0 === thisIndex ) {
				item = { ...item, ...value };
			}
			return item;
		} );

		setAttributes( {
			boxShadow: newItems,
		} );
	}
	const saveCaptionFont = value => {
		const newUpdate = captionStyles.map((item, index) => {
			if (0 === index) {
				item = { ...item,
					...value
				};
			}

			return item;
		});
		setAttributes({
			captionStyles: newUpdate
		});
	};
	const { image } = useSelect(
		( select ) => {
			const { getMedia } = select( coreStore );
			return {
				image: id && isSelected ? getMedia( id ) : null,
			};
		},
		[ id, isSelected ]
	);
	const { replaceBlocks, toggleSelection } = useDispatch( blockEditorStore );
	const { createErrorNotice, createSuccessNotice } = useDispatch(
		noticesStore
	);
	const isLargeViewport = useViewportMatch( 'medium' );
	const isWideAligned = includes( [ 'wide', 'full' ], align );
	const [ { naturalWidth, naturalHeight }, setNaturalSize ] = useState( {} );
	const [ isEditingImage, setIsEditingImage ] = useState( false );
	const [ activeTab, setActiveTab ] = useState( 'general' );
	const [ externalBlob, setExternalBlob ] = useState();
	const clientWidth = useClientWidth( containerRef, [ align ] );
	const isSVG = url && url.endsWith( '.svg' ) ? true : false;
	const isResizable = allowResize && ! ( isWideAligned && isLargeViewport ) && ! ( isSVG && ! previewMaxWidth );
	const showMaxWidth = allowResize && ! isWideAligned;
	const {
		imageEditing,
		imageSizes,
		maxWidth,
		mediaUpload,
	} = useSelect(
		( select ) => {
			const {
				getSettings,
			} = select( blockEditorStore );

			const settings = pick( getSettings(), [
				'imageEditing',
				'imageSizes',
				'maxWidth',
				'mediaUpload',
			] );

			return {
				...settings,
			};
		},
		[ clientId ]
	);
	const imageSizeOptions = map(
		filter( imageSizes, ( { slug } ) =>
			get( image, [ 'media_details', 'sizes', slug, 'source_url' ] )
		),
		( { name, slug } ) => ( { value: slug, label: name } )
	);
	// If an image is externally hosted, try to fetch the image data. This may
	// fail if the image host doesn't allow CORS with the domain. If it works,
	// we can enable a button in the toolbar to upload the image.
	useEffect( () => {
		if ( ! isExternalImage( id, url ) || ! isSelected || externalBlob ) {
			return;
		}

		window
			.fetch( url )
			.then( ( response ) => response.blob() )
			.then( ( blob ) => setExternalBlob( blob ) )
			// Do nothing, cannot upload.
			.catch( () => {} );
	}, [ id, url, isSelected, externalBlob ] );


	// We need to show the caption when changes come from
	// history navigation(undo/redo).
	useEffect( () => {
		if ( caption && ! prevCaption ) {
			setStateShowCaption( true );
		}
	}, [ caption, prevCaption ] );

	// Focus the caption when we click to add one.
	const captionRef = useCallback(
		( node ) => {
			if ( node && ! caption ) {
				node.focus();
			}
		},
		[ caption ]
	);

	function onResizeStart() {
		toggleSelection( false );
	}

	function onResizeStop() {
		toggleSelection( true );
	}

	function onImageError() {
		// Check if there's an embed block that handles this URL.
		const embedBlock = createUpgradedEmbedBlock( { attributes: { url } } );
		if ( undefined !== embedBlock ) {
			onReplace( embedBlock );
		}
	}

	function onSetLink( props ) {
		setAttributes( props );
	}

	function onSetTitle( value ) {
		// This is the HTML title attribute, separate from the media object
		// title.
		setAttributes( { title: value } );
	}

	function updateAlt( newAlt ) {
		setAttributes( { alt: newAlt } );
	}

	function onUpdateSelectImage( image ) {
		setAttributes( {
			url: image.url,
			id: image.id ? image.id : undefined,
			width: undefined,
			height: undefined,
			sizeSlug: undefined,
		} );
	}
	function clearImage() {
		setAttributes( {
			url: undefined,
			id: undefined,
			width: undefined,
			height: undefined,
			sizeSlug: undefined,
		} );
	}
	function changeImageSize( imgData ) {
		setAttributes( {
			url: imgData.value,
			width: undefined,
			height: undefined,
			sizeSlug: imgData.slug,
			imgMaxWidth: undefined,
			imgMaxWidthTablet: undefined,
			imgMaxWidthMobile: undefined,
		} );
	}
	function uploadExternal() {
		mediaUpload( {
			filesList: [ externalBlob ],
			onFileChange( [ img ] ) {
				onSelectImage( img );

				if ( isBlobURL( img.url ) ) {
					return;
				}

				setExternalBlob();
				createSuccessNotice( __( 'Image uploaded.', 'gutenam-blocks' ), {
					type: 'snackbar',
				} );
			},
			allowedTypes: ALLOWED_MEDIA_TYPES,
			onError( message ) {
				createErrorNotice( message, { type: 'snackbar' } );
			},
		} );
	}

	function updateAlignment( nextAlign ) {
		const extraUpdatedAttributes = [ 'wide', 'full' ].includes( nextAlign )
			? { width: undefined, height: undefined }
			: {};
		setAttributes( {
			...extraUpdatedAttributes,
			align: nextAlign,
		} );
	}

	useEffect( () => {
		if ( ! isSelected ) {
			setIsEditingImage( false );
			if ( ! caption ) {
				setStateShowCaption( false );
			}
		}
	}, [ isSelected, caption ] );
	const isDynamic = attributes.baseDynamic && attributes.baseDynamic.url && attributes.baseDynamic.url.enable ? true : false;
	const isDynamicLink = attributes.baseDynamic && attributes.baseDynamic.link && attributes.baseDynamic.link.enable ? true : false;
	const canEditImage = id && naturalWidth && naturalHeight && imageEditing && ! isDynamic && ! isSVG;
	const allowCrop = canEditImage && ! isEditingImage;
	const nonTransAttrs = [ 'url', 'id', 'caption', 'alt' ];
	const controls = (
		<>
			<BlockControls group="block">
				<BlockAlignmentControl
					value={ align }
					onChange={ updateAlignment }
				/>
				{ showCaption && (
					<ToolbarButton
						onClick={ () => {
							setStateShowCaption( ! stateShowCaption );
							if ( stateShowCaption && caption ) {
								setAttributes( { caption: undefined } );
							}
						} }
						icon={ captionIcon }
						isPressed={ stateShowCaption }
						label={
							stateShowCaption ? __( 'Remove caption' )
								: __( 'Add caption' )
						}
					/>
				) }
				{ ! isEditingImage && ! isDynamic && ! isDynamicLink && (
					<BaseImageURLInputUI
						url={ link || '' }
						onChangeUrl={ value => setAttributes( { link: value } ) }
						linkDestination={ linkDestination }
						mediaUrl={ ( image && image.source_url ) || url }
						mediaLink={ image && image.link }
						onChangeLinkDestination={ value => setAttributes( { linkDestination: value } ) }
						onChangeAttribute={ value => setAttributes( value ) }
						additionalControls={ true }
						opensInNewTab={ ( undefined !== linkTarget ? linkTarget : false ) }
						onChangeTarget={ value => setAttributes( { linkTarget: value } ) }
						linkNoFollow={ ( undefined !== linkNoFollow ? linkNoFollow : false ) }
						onChangeFollow={ value => setAttributes( { linkNoFollow: value } ) }
						linkSponsored={ ( undefined !== linkSponsored ? linkSponsored : false ) }
						onChangeSponsored={ value => setAttributes( { linkSponsored: value } ) }
						allowClear={ true }
						dynamicAttribute={ 'link' }
						isSelected={ isSelected }
						attributes={ attributes }
						setAttributes={ setAttributes }
						name={ 'base/image' }
						clientId={ clientId }
						context={ context }
					/>
				) }
				{ allowCrop && (
					<ToolbarButton
						onClick={ () => setIsEditingImage( true ) }
						icon={ crop }
						label={ __( 'Crop' ) }
					/>
				) }
				{ externalBlob && ! isDynamic && (
					<ToolbarButton
						onClick={ uploadExternal }
						icon={ upload }
						label={ __( 'Upload external image', 'gutenam-blocks' ) }
					/>
				) }
			</BlockControls>
			<BlockControls>
				<CopyPasteAttributes
					attributes={ attributes }
					excludedAttrs={ nonTransAttrs }
					defaultAttributes={ metadata['attributes'] }
					blockSlug={ metadata['name'] }
					onPaste={ attributesToPaste => setAttributes( attributesToPaste ) }
				/>
			</BlockControls>
			{ ! isEditingImage && ! isDynamic && (
				<BlockControls group="other">
					<MediaReplaceFlow
						mediaId={ id }
						mediaURL={ url }
						allowedTypes={ ALLOWED_MEDIA_TYPES }
						accept="image/*"
						onSelect={ onSelectImage }
						onSelectURL={ onSelectURL }
						onError={ onUploadError }
					/>
				</BlockControls>
			) }
			<InspectorControls>
				<InspectorControlTabs
						panelName={ 'image' }
						setActiveTab={ setActiveTab }
						activeTab={ activeTab }
					/>

					{( activeTab === 'general' ) &&
						<>
						<BasePanelBody
							title={ __('Image settings', 'gutenam-blocks') }
							initialOpen={ true }
							panelName={ 'bsb-image-settings' }
						>
							<BaseImageControl
								label={ __( 'Image', 'gutenam-blocks' ) }
								hasImage={ ( url ? true : false ) }
								imageURL={ ( url ? url : '' ) }
								imageID={ id }
								onRemoveImage={ clearImage }
								onSaveImage={ onUpdateSelectImage }
								disableMediaButtons={ ( url ? true : false ) }
								dynamicAttribute="url"
								isSelected={ isSelected }
								attributes={ attributes }
								setAttributes={ setAttributes }
								name={ 'base/image' }
								clientId={ clientId }
								context={ context }
							/>
							{ id && (
								<BaseImageSizeControl
									label={ __( 'Image File Size', 'gutenam-blocks' ) }
									id={ id }
									url={ url }
									fullSelection={ true }
									selectByValue={ true }
									onChange={ changeImageSize }
								/>
							) }
							<ToggleControl
								label={ __( 'Use fixed ratio instead of image ratio', 'gutenam-blocks' ) }
								checked={ useRatio }
								onChange={ ( value ) => setAttributes( { useRatio: value } ) }
							/>
							{ useRatio && (
								<SelectControl
									label={ __( 'Size Ratio', 'gutenam-blocks' ) }
									value={ ratio }
									options={ [
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
									] }
									onChange={ value => setAttributes( { ratio: value } ) }
								/>
							) }
							{ showMaxWidth && (
								<ResponsiveRangeControls
									label={ __( 'Max Image Width', 'gutenam-blocks' ) }
									value={ ( imgMaxWidth ? imgMaxWidth : '' ) }
									onChange={ value => setAttributes( { imgMaxWidth: value } ) }
									tabletValue={ ( imgMaxWidthTablet ? imgMaxWidthTablet : '' ) }
									onChangeTablet={ ( value ) => setAttributes( { imgMaxWidthTablet: value } ) }
									mobileValue={ ( imgMaxWidthMobile ? imgMaxWidthMobile : '' ) }
									onChangeMobile={ ( value ) => setAttributes( { imgMaxWidthMobile: value } ) }
									min={ 5 }
									max={ 3000 }
									step={ 1 }
									unit={ 'px' }
									showUnit={ true }
									units={ [ 'px' ] }
								/>
							) }
							<TextareaControl
								label={ __( 'Alt text (alternative text)' ) }
								value={ alt }
								onChange={ updateAlt }
								help={
									<>
										<ExternalLink href="https://www.w3.org/WAI/tutorials/images/decision-tree">
											{ __( 'Describe the purpose of the image', 'gutenam-blocks' ) }
										</ExternalLink>
										{ __( 'Leave empty if the image is purely decorative.', 'gutenam-blocks' ) }
									</>
								}
							/>
							<TextControl
								label={ __( 'Title attribute', 'gutenam-blocks' ) }
								value={ title || '' }
								onChange={ onSetTitle }
								help={
									<>
										{ __( 'Describe the role of this image on the page.', 'gutenam-blocks' ) }
										<ExternalLink href="https://www.w3.org/TR/html52/dom.html#the-title-attribute">
											{ __( '(Note: many devices and browsers do not display this text.)', 'gutenam-blocks' ) }
										</ExternalLink>
									</>
								}
							/>
						</BasePanelBody>
						<BasePanelBody
							title={ __( 'Link Settings', 'gutenam-blocks' ) }
							initialOpen={ false }
							panelName={ 'bsb-image-link-settings' }
						>
							<URLInputControl
								label={ __( 'Image Link', 'gutenam-blocks' ) }
								url={ link }
								onChangeUrl={ value => setAttributes( { link: value } ) }
								additionalControls={ true }
								opensInNewTab={ ( undefined !== linkTarget ? linkTarget : false ) }
								onChangeTarget={ value => setAttributes( { linkTarget: value } ) }
								linkNoFollow={ ( undefined !== linkNoFollow ? linkNoFollow : false ) }
								onChangeFollow={ value => setAttributes( { linkNoFollow: value } ) }
								linkSponsored={ ( undefined !== linkSponsored ? linkSponsored : false ) }
								onChangeSponsored={ value => setAttributes( { linkSponsored: value } ) }
								allowClear={ true }
								linkTitle={ linkTitle }
								onChangeTitle={ value => {
									setAttributes( { linkTitle: value } )
								} }
								dynamicAttribute={ 'link' }
								isSelected={ isSelected }
								attributes={ attributes }
								setAttributes={ setAttributes }
								name={ 'base/image' }
								clientId={ clientId }
								context={ context }
							/>
						</BasePanelBody>
						<BasePanelBody
							title={ __( 'Mask Settings', 'gutenam-blocks' ) }
							initialOpen={ false }
							panelName={ 'bsb-image-mask-settings' }
						>
							<SelectControl
								label={ __( 'Mask Shape', 'gutenam-blocks' ) }
								options={ [
									{
										label: __( 'None', 'gutenam-blocks' ),
										value: 'none',
									},
									{
										label: __( 'Circle', 'gutenam-blocks' ),
										value: 'circle',
									},
									{
										label: __( 'Diamond', 'gutenam-blocks' ),
										value: 'diamond',
									},
									{
										label: __( 'Hexagon', 'gutenam-blocks' ),
										value: 'hexagon',
									},
									{
										label: __( 'Rounded', 'gutenam-blocks' ),
										value: 'rounded',
									},
									{
										label: __( 'Blob 1', 'gutenam-blocks' ),
										value: 'blob1',
									},
									{
										label: __( 'Blob 2', 'gutenam-blocks' ),
										value: 'blob2',
									},
									{
										label: __( 'Blob 3', 'gutenam-blocks' ),
										value: 'blob3',
									},
									{
										label: __( 'Custom', 'gutenam-blocks' ),
										value: 'custom',
									},
								] }
								value={ maskSvg }
								onChange={ ( value ) => setAttributes( { maskSvg: value } ) }
							/>
							{ maskSvg === 'custom' && (
								<>
									<BaseImageControl
										label={ __( 'Custom Mask Image', 'gutenam-blocks' ) }
										hasImage={ ( maskUrl ? true : false ) }
										imageURL={ ( maskUrl ? maskUrl : '' ) }
										imageID={ '' }
										onRemoveImage={ () => {
											setAttributes( {
												maskUrl: undefined,
											} );
										} }
										onSaveImage={ ( image ) => {
											setAttributes( {
												maskUrl: image.url,
											} )
										} }
										disableMediaButtons={ ( maskUrl ? true : false ) }
									/>
									<SelectControl
										label={ __( 'Mask Size', 'gutenam-blocks' ) }
										options={ [
											{
												label: __( 'Auto', 'gutenam-blocks' ),
												value: 'auto',
											},
											{
												label: __( 'Contain', 'gutenam-blocks' ),
												value: 'contain',
											},
											{
												label: __( 'Cover', 'gutenam-blocks' ),
												value: 'cover',
											},
										] }
										value={ maskSize }
										onChange={ ( value ) => setAttributes( { maskSize: value } ) }
									/>
									<SelectControl
										label={ __( 'Mask Position', 'gutenam-blocks' ) }
										options={ [
											{ value: 'center top', label: __( 'Center Top', 'gutenam-blocks' ) },
											{ value: 'center center', label: __( 'Center Center', 'gutenam-blocks' ) },
											{ value: 'center bottom', label: __( 'Center Bottom', 'gutenam-blocks' ) },
											{ value: 'left top', label: __( 'Left Top', 'gutenam-blocks' ) },
											{ value: 'left center', label: __( 'Left Center', 'gutenam-blocks' ) },
											{ value: 'left bottom', label: __( 'Left Bottom', 'gutenam-blocks' ) },
											{ value: 'right top', label: __( 'Right Top', 'gutenam-blocks' ) },
											{ value: 'right center', label: __( 'Right Center', 'gutenam-blocks' ) },
											{ value: 'right bottom', label: __( 'Right Bottom', 'gutenam-blocks' ) },
										] }
										value={ maskPosition }
										onChange={ ( value ) => setAttributes( { maskPosition: value } ) }
									/>
									<SelectControl
										label={ __( 'Mask Repeat', 'gutenam-blocks' ) }
										options={ [
											{ value: 'no-repeat', label: __( 'No Repeat', 'gutenam-blocks' ) },
											{ value: 'repeat', label: __( 'Repeat', 'gutenam-blocks' ) },
											{ value: 'repeat-x', label: __( 'Repeat-x', 'gutenam-blocks' ) },
											{ value: 'repeat-y', label: __( 'Repeat-y', 'gutenam-blocks' ) },
										] }
										value={ maskRepeat }
										onChange={ ( value ) => setAttributes( { maskRepeat: value } ) }
									/>
								</>
							) }
						</BasePanelBody>
						<BasePanelBody
							title={ __( 'Caption Settings', 'gutenam-blocks' ) }
							initialOpen={ false }
							panelName={ 'bsb-image-caption-settings' }
						>
							<ToggleControl
								label={ __( 'Enable Caption', 'gutenam-blocks' ) }
								checked={ showCaption }
								onChange={ (value) => setAttributes( { showCaption: value } ) }
							/>
							{ showCaption && (
								<Fragment>
									<PopColorControl
										label={ __( 'Caption Color', 'gutenam-blocks' ) }
										value={ ( captionStyles && captionStyles[ 0 ] && captionStyles[ 0 ].color ? captionStyles[ 0 ].color : '' ) }
										default={ '' }
										onChange={ value => saveCaptionFont( { color: value } ) }
									/>
									{/* <PopColorControl
								label={ __( 'Caption Background', 'gutenam-blocks' ) }
								value={ ( captionStyles && captionStyles[ 0 ] && captionStyles[ 0 ].background ? captionStyles[ 0 ].background : '' ) }
								default={ '' }
								onChange={ value => saveCaptionFont( { background: value } ) }
							/> */}
									<TypographyControls
										fontSize={ captionStyles[ 0 ].size }
										onFontSize={ ( value ) => saveCaptionFont( { size: value } ) }
										fontSizeType={ captionStyles[ 0 ].sizeType }
										onFontSizeType={ ( value ) => saveCaptionFont( { sizeType: value } ) }
										lineHeight={ captionStyles[ 0 ].lineHeight }
										onLineHeight={ ( value ) => saveCaptionFont( { lineHeight: value } ) }
										lineHeightType={ captionStyles[ 0 ].lineType }
										onLineHeightType={ ( value ) => saveCaptionFont( { lineType: value } ) }
										letterSpacing={ captionStyles[ 0 ].letterSpacing }
										onLetterSpacing={ ( value ) => saveCaptionFont( { letterSpacing: value } ) }
										textTransform={ captionStyles[ 0 ].textTransform }
										onTextTransform={ ( value ) => saveCaptionFont( { textTransform: value } ) }
										fontFamily={ captionStyles[ 0 ].family }
										onFontFamily={ ( value ) => saveCaptionFont( { family: value } ) }
										onFontChange={ ( select ) => {
											saveCaptionFont( {
												family: select.value,
												google: select.google,
											} );
										} }
										onFontArrayChange={ ( values ) => saveCaptionFont( values ) }
										googleFont={ captionStyles[ 0 ].google }
										onGoogleFont={ ( value ) => saveCaptionFont( { google: value } ) }
										loadGoogleFont={ captionStyles[ 0 ].loadGoogle }
										onLoadGoogleFont={ ( value ) => saveCaptionFont( { loadGoogle: value } ) }
										fontVariant={ captionStyles[ 0 ].variant }
										onFontVariant={ ( value ) => saveCaptionFont( { variant: value } ) }
										fontWeight={ captionStyles[ 0 ].weight }
										onFontWeight={ ( value ) => saveCaptionFont( { weight: value } ) }
										fontStyle={ captionStyles[ 0 ].style }
										onFontStyle={ ( value ) => saveCaptionFont( { style: value } ) }
										fontSubset={ captionStyles[ 0 ].subset }
										onFontSubset={ ( value ) => saveCaptionFont( { subset: value } ) }
									/>
								</Fragment>
							) }
						</BasePanelBody>
						<BasePanelBody
							title={ __( 'Image Filter', 'gutenam-blocks' ) }
							initialOpen={ false }
							panelName={ 'bsb-image-filter' }
						>
							<SelectControl
								label={ __( 'Image Filter', 'gutenam-blocks' ) }
								help={ __( 'Not supported in Internet Explorer', 'gutenam-blocks' ) }
								options={ [
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
								] }
								value={ imageFilter }
								onChange={ ( value ) => setAttributes( { imageFilter: value } ) }
							/>
						</BasePanelBody>
					</>
				}
				{ ( activeTab === 'style' ) &&
					<>
						<BasePanelBody
							panelName={ 'bsb-image-border-settings' }
						>
							<PopColorControl
								label={ __( 'Background Color', 'gutenam-blocks' ) }
								value={ ( backgroundColor ? backgroundColor : '' ) }
								default={ '' }
								onChange={ value => {
									setAttributes( { backgroundColor: value } );
								} }
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
								label={ __( 'Border Radius', 'gutenam-blocks' ) }
								value={ borderRadius }
								tabletValue={ tabletBorderRadius }
								mobileValue={ mobileBorderRadius }
								onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
								onChangeTablet={ ( value ) => setAttributes( { tabletBorderRadius: value } ) }
								onChangeMobile={ ( value ) => setAttributes( { mobileBorderRadius: value } ) }
								min={ 0 }
								max={ ( borderRadiusUnit === 'em' || borderRadiusUnit === 'rem' ? 24 : 200 ) }
								step={ ( borderRadiusUnit === 'em' || borderRadiusUnit === 'rem' ? 0.1 : 1 ) }
								unit={ borderRadiusUnit }
								units={ [ 'px', 'em', 'rem', '%' ] }
								onUnit={ ( value ) => setAttributes( { borderRadiusUnit: value } ) }
								isBorderRadius={ true }
								allowEmpty={true}
							/>
							<BoxShadowControl
								label={ __( 'Box Shadow', 'gutenam-blocks' ) }
								enable={ ( undefined !== displayBoxShadow ? displayBoxShadow : false ) }
								color={ ( undefined !== boxShadow && undefined !== boxShadow[ 0 ] && undefined !== boxShadow[ 0 ].color ? boxShadow[ 0 ].color : '#000000' ) }
								colorDefault={ '#000000' }
								onArrayChange={ ( color, opacity ) => saveBoxShadow( { color: color, opacity: opacity } ) }
								opacity={ ( undefined !== boxShadow && undefined !== boxShadow[ 0 ] && undefined !== boxShadow[ 0 ].opacity ? boxShadow[ 0 ].opacity : 0.2 ) }
								hOffset={ ( undefined !== boxShadow && undefined !== boxShadow[ 0 ] && undefined !== boxShadow[ 0 ].hOffset ? boxShadow[ 0 ].hOffset : 0 ) }
								vOffset={ ( undefined !== boxShadow && undefined !== boxShadow[ 0 ] && undefined !== boxShadow[ 0 ].vOffset ? boxShadow[ 0 ].vOffset : 0 ) }
								blur={ ( undefined !== boxShadow && undefined !== boxShadow[ 0 ] && undefined !== boxShadow[ 0 ].blur ? boxShadow[ 0 ].blur : 14 ) }
								spread={ ( undefined !== boxShadow && undefined !== boxShadow[ 0 ] && undefined !== boxShadow[ 0 ].spread ? boxShadow[ 0 ].spread : 0 ) }
								inset={ ( undefined !== boxShadow && undefined !== boxShadow[ 0 ] && undefined !== boxShadow[ 0 ].inset ? boxShadow[ 0 ].inset : false ) }
								onEnableChange={ value => {
									setAttributes( {
										displayBoxShadow: value,
									} );
								} }
								onColorChange={ value => {
									saveBoxShadow( { color: value } );
								} }
								onOpacityChange={ value => {
									saveBoxShadow( { opacity: value } );
								} }
								onHOffsetChange={ value => {
									saveBoxShadow( { hOffset: value } );
								} }
								onVOffsetChange={ value => {
									saveBoxShadow( { vOffset: value } );
								} }
								onBlurChange={ value => {
									saveBoxShadow( { blur: value } );
								} }
								onSpreadChange={ value => {
									saveBoxShadow( { spread: value } );
								} }
								onInsetChange={ value => {
									saveBoxShadow( { inset: value } );
								} }
							/>
							<DropShadowControl
								label={ __( 'Drop Shadow', 'gutenam-blocks' ) }
								enable={ ( undefined !== displayDropShadow ? displayDropShadow : false ) }
								color={ ( undefined !== dropShadow && undefined !== dropShadow[ 0 ] && undefined !== dropShadow[ 0 ].color ? dropShadow[ 0 ].color : '#000000' ) }
								colorDefault={ '#000000' }
								onArrayChange={ ( color, opacity ) => saveDropShadow( { color: color, opacity: opacity } ) }
								opacity={ ( undefined !== dropShadow && undefined !== dropShadow[ 0 ] && undefined !== dropShadow[ 0 ].opacity ? dropShadow[ 0 ].opacity : 0.2 ) }
								hOffset={ ( undefined !== dropShadow && undefined !== dropShadow[ 0 ] && undefined !== dropShadow[ 0 ].hOffset ? dropShadow[ 0 ].hOffset : 0 ) }
								vOffset={ ( undefined !== dropShadow && undefined !== dropShadow[ 0 ] && undefined !== dropShadow[ 0 ].vOffset ? dropShadow[ 0 ].vOffset : 0 ) }
								blur={ ( undefined !== dropShadow && undefined !== dropShadow[ 0 ] && undefined !== dropShadow[ 0 ].blur ? dropShadow[ 0 ].blur : 14 ) }
								onEnableChange={ value => {
									setAttributes( {
										displayDropShadow: value,
									} );
								} }
								onColorChange={ value => {
									saveDropShadow( { color: value } );
								} }
								onOpacityChange={ value => {
									saveDropShadow( { opacity: value } );
								} }
								onHOffsetChange={ value => {
									saveDropShadow( { hOffset: value } );
								} }
								onVOffsetChange={ value => {
									saveDropShadow( { vOffset: value } );
								} }
								onBlurChange={ value => {
									saveDropShadow( { blur: value } );
								} }
							/>
							<p className="bsb-sidebar-help">
								{ __( 'Learn about the differences:', 'gutenam-blocks' ) }
								<br></br>
								<ExternalLink href="https://css-tricks.com/breaking-css-box-shadow-vs-drop-shadow/">
									{ __( 'Box Shadow vs. Drop Shadow', 'gutenam-blocks' ) }
								</ExternalLink>
							</p>
						</BasePanelBody>
					</>
				}

				{ ( activeTab === 'advanced' ) && (
					<>
						<BasePanelBody>
							<ResponsiveMeasureRangeControl
								label={ __( 'Padding', 'gutenam-blocks' ) }
								value={ paddingDesktop }
								tabletValue={ paddingTablet }
								mobileValue={ paddingMobile }
								onChange={ ( value ) => setAttributes( { paddingDesktop: value } ) }
								onChangeTablet={ ( value ) => setAttributes( { paddingTablet: value } ) }
								onChangeMobile={ ( value ) => setAttributes( { paddingMobile: value } ) }
								min={ 0 }
								max={ ( paddingUnit === 'em' || paddingUnit === 'rem' ? 24 : 200 ) }
								step={ ( paddingUnit === 'em' || paddingUnit === 'rem' ? 0.1 : 1 ) }
								unit={ paddingUnit }
								units={ [ 'px', 'em', 'rem', '%' ] }
								onUnit={ ( value ) => setAttributes( { paddingUnit: value } ) }
								onMouseOver={ paddingMouseOver.onMouseOver }
								onMouseOut={ paddingMouseOver.onMouseOut }
							/>
							<ResponsiveMeasureRangeControl
								label={ __( 'Margin', 'gutenam-blocks' ) }
								value={ marginDesktop }
								tabletValue={ marginTablet }
								mobileValue={ marginMobile }
								onChange={ ( value ) => {
									setAttributes( { marginDesktop: value } );
								} }
								onChangeTablet={ ( value ) => setAttributes( { marginTablet: value } ) }
								onChangeMobile={ ( value ) => setAttributes( { marginMobile: value } ) }
								min={ ( marginUnit === 'em' || marginUnit === 'rem' ? -12 : -200 ) }
								max={ ( marginUnit === 'em' || marginUnit === 'rem' ? 24 : 200 ) }
								step={ ( marginUnit === 'em' || marginUnit === 'rem' ? 0.1 : 1 ) }
								unit={ marginUnit }
								units={ [ 'px', 'em', 'rem', '%', 'vh' ] }
								onUnit={ ( value ) => setAttributes( { marginUnit: value } ) }
								onMouseOver={ marginMouseOver.onMouseOver }
								onMouseOut={ marginMouseOver.onMouseOut }
							/>
						</BasePanelBody>

						<div className="bst-sidebar-settings-spacer"></div>

						<BaseBlockDefaults attributes={attributes} defaultAttributes={metadata['attributes']} blockSlug={ metadata['name'] } excludedAttrs={ nonTransAttrs } />
					</>
				)}

			</InspectorControls>
			<InspectorAdvancedControls>
				<ToggleControl
					label={ __( 'Prevent Lazy Load', 'gutenam-blocks' ) }
					help={ __( 'This adds a class to tell lazy load plugins to skip this image for lazy load.', 'gutenam-blocks' ) }
					checked={ preventLazyLoad }
					onChange={ ( value ) => setAttributes( { preventLazyLoad: value } ) }
				/>
				<RangeControl
					label={ __( 'Z-Index Control', 'gutenam-blocks' ) }
					value={ zIndex }
					onChange={ ( value ) => {
						setAttributes( {
							zIndex: value,
						} );
					} }
					min={ -200 }
					max={ 2000 }
					allowReset={true}
				/>
			</InspectorAdvancedControls>
		</>
	);

	const getFilename = ( url ) => {
		let filename;
		try {
			filename = new URL( url, 'http://example.com' ).pathname
				.split( '/' )
				.pop();
		} catch ( error ) {}

		if ( filename ) {
			return filename;
		}
	}

	const filename = getFilename( url ); // 'Screen-Shot-2021-11-04-at-9.53.09-AM.png';
	let defaultedAlt;

	if ( alt ) {
		defaultedAlt = alt;
	} else if ( filename ) {
		defaultedAlt = sprintf(
			/* translators: %s: file name */
			__( 'This image has an empty alt attribute; its file name is %s' ),
			filename
		);
	} else {
		defaultedAlt = __( 'This image has an empty alt attribute' );
	}
	let hasMask = false;
	let theMaskRepeat = 'no-repeat';
	let theMaskSize = 'auto';
	let theMaskPosition = 'center center';
	if ( maskSvg === 'custom' ) {
		if ( maskUrl ) {
			hasMask = true;
			theMaskRepeat = maskRepeat ? maskRepeat : 'no-repeat';
			theMaskSize = maskSize ? maskSize : 'auto';
			theMaskPosition = maskPosition ? maskPosition : 'center center';
		}
	} else if ( maskSvg !== 'none' ) {
		hasMask = true;
	}
	let img = (
			// Disable reason: Image itself is not meant to be interactive, but
			// should direct focus to block.
			/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
		<div>
			<img
				src={ temporaryURL || url }
				alt={ defaultedAlt }
				width={ undefined !== naturalWidth && naturalWidth && isSVG && ! previewMaxWidth ? naturalWidth : undefined }
				height={ undefined !== naturalHeight && naturalHeight && isSVG && ! previewMaxWidth ? naturalHeight : undefined }
				style={ {
					WebkitMaskImage: ( hasMask ? 'url(' + ( maskSvg === 'custom' ? maskUrl : base_blocks_params.svgMaskPath + maskSvg + '.svg' ) + ')' : undefined ),
					WebkitMaskRepeat: ( hasMask ? theMaskRepeat : undefined ),
					WebkitMaskSize: ( hasMask ? theMaskSize : undefined ),
					WebkitMaskPosition: ( hasMask ? theMaskPosition : undefined ),

					maskImage: ( hasMask ? 'url(' + ( maskSvg === 'custom' ? maskUrl : base_blocks_params.svgMaskPath + maskSvg + '.svg' ) + ')' : undefined ),
					maskRepeat: ( hasMask ? theMaskRepeat : undefined ),
					maskSize: ( hasMask ? theMaskSize : undefined ),
					maskPosition: ( hasMask ? theMaskPosition : undefined ),

					paddingTop: ( ! useRatio && '' !== previewPaddingTop ? getSpacingOptionOutput( previewPaddingTop, paddingUnit ) : undefined ),
					paddingRight: ( ! useRatio && '' !== previewPaddingRight ? getSpacingOptionOutput( previewPaddingRight, paddingUnit ) : undefined ),
					paddingBottom: ( ! useRatio && '' !== previewPaddingBottom ? getSpacingOptionOutput( previewPaddingBottom, paddingUnit ) : undefined ),
					paddingLeft: ( ! useRatio && '' !== previewPaddingLeft ? getSpacingOptionOutput( previewPaddingLeft, paddingUnit ) : undefined ),

					borderTop: ( previewBorderTopStyle ? previewBorderTopStyle : undefined ),
					borderRight: ( previewBorderRightStyle ? previewBorderRightStyle : undefined ),
					borderBottom: ( previewBorderBottomStyle ? previewBorderBottomStyle : undefined ),
					borderLeft: ( previewBorderLeftStyle ? previewBorderLeftStyle : undefined ),
					borderTopLeftRadius: ( '' !== previewRadiusTop ? previewRadiusTop + ( borderRadiusUnit ? borderRadiusUnit : 'px' ) : undefined ),
					borderTopRightRadius: ( '' !== previewRadiusRight ? previewRadiusRight + ( borderRadiusUnit ? borderRadiusUnit : 'px' ) : undefined ),
					borderBottomRightRadius: ( '' !== previewRadiusBottom ? previewRadiusBottom + ( borderRadiusUnit ? borderRadiusUnit : 'px' ) : undefined ),
					borderBottomLeftRadius: ( '' !== previewRadiusLeft ? previewRadiusLeft + ( borderRadiusUnit ? borderRadiusUnit : 'px' ) : undefined ),

					backgroundColor: ( '' !== backgroundColor ? BaseColorOutput( backgroundColor ) : undefined ),

					boxShadow: ( undefined !== displayBoxShadow && displayBoxShadow && undefined !== boxShadow && undefined !== boxShadow[ 0 ] && undefined !== boxShadow[ 0 ].color ? ( undefined !== boxShadow[ 0 ].inset && boxShadow[ 0 ].inset ? 'inset ' : '' ) + ( undefined !== boxShadow[ 0 ].hOffset ? boxShadow[ 0 ].hOffset : 0 ) + 'px ' + ( undefined !== boxShadow[ 0 ].vOffset ? boxShadow[ 0 ].vOffset : 0 ) + 'px ' + ( undefined !== boxShadow[ 0 ].blur ? boxShadow[ 0 ].blur : 14 ) + 'px ' + ( undefined !== boxShadow[ 0 ].spread ? boxShadow[ 0 ].spread : 0 ) + 'px ' + BaseColorOutput( ( undefined !== boxShadow[ 0 ].color ? boxShadow[ 0 ].color : '#000000' ), ( undefined !== boxShadow[ 0 ].opacity ? boxShadow[ 0 ].opacity : 0.2 ) ) : undefined ),
					filter: ( undefined !== displayDropShadow && displayDropShadow ? 'drop-shadow(' + ( undefined !== displayDropShadow && displayDropShadow && undefined !== dropShadow && undefined !== dropShadow[ 0 ] && undefined !== dropShadow[ 0 ].color ? ( undefined !== dropShadow[ 0 ].hOffset ? dropShadow[ 0 ].hOffset : 0 ) + 'px ' + ( undefined !== dropShadow[ 0 ].vOffset ? dropShadow[ 0 ].vOffset : 0 ) + 'px ' + ( undefined !== dropShadow[ 0 ].blur ? dropShadow[ 0 ].blur : 14 ) + 'px ' + BaseColorOutput( ( undefined !== dropShadow[ 0 ].color ? dropShadow[ 0 ].color : '#000000' ), ( undefined !== dropShadow[ 0 ].opacity ? dropShadow[ 0 ].opacity : 0.2 ) ) : undefined ) + ')' : undefined ),

				} }
				onError={ () => onImageError() }
				onLoad={ ( event ) => {
					setNaturalSize(
						pick( event.target, [
							'naturalWidth',
							'naturalHeight',
						] )
					);
				} }
			/>
			{ temporaryURL && <Spinner /> }
			{ ! useRatio && (
				<SpacingVisualizer
					type="inside"
					forceShow={ paddingMouseOver.isMouseOver }
					spacing={ [ getSpacingOptionOutput( previewPaddingTop, paddingUnit ), getSpacingOptionOutput( previewPaddingRight, paddingUnit ), getSpacingOptionOutput( previewPaddingBottom, paddingUnit ), getSpacingOptionOutput( previewPaddingLeft, paddingUnit ) ] }
				/>
			) }
		</div>
		/* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
	);
	if ( useRatio ){
		img = <div className={ `bsb-is-ratio-image bsb-image-ratio-${ ( ratio ? ratio : 'land43' )}` }>{ img }</div>;
	}
	let imageWidthWithinContainer;
	let imageHeightWithinContainer;

	if ( clientWidth && naturalWidth && naturalHeight ) {
		const exceedMaxWidth = naturalWidth > clientWidth;
		const imgRatio = naturalHeight / naturalWidth;
		imageWidthWithinContainer = exceedMaxWidth ? clientWidth : naturalWidth;
		imageHeightWithinContainer = exceedMaxWidth
			? clientWidth * imgRatio
			: naturalHeight;
	}

	if ( canEditImage && isEditingImage ) {
		img = (
			<ImageEditor
				id={ id }
				url={ url }
				width={ width }
				height={ height }
				clientWidth={ clientWidth }
				naturalHeight={ naturalHeight }
				naturalWidth={ naturalWidth }
				onSaveImage={ ( imageAttributes ) =>
					setAttributes( imageAttributes )
				}
				onFinishEditing={ () => {
					setIsEditingImage( false );
				} }
			/>
		);
	} else if ( ! isResizable || ! imageWidthWithinContainer || 'Desktop' !== previewDevice ) {
		img = <div
			className={ `bsb-image-wrap` }
			style={ {
				maxWidth: previewMaxWidth || width,
				width: ( previewMaxWidth ? '100%' : undefined ),
			} }
			>{ img }</div>;
	} else {
		const backupWidth = useRatio ? '100%' : 'auto';
		const currentWidth = previewMaxWidth || width || imageWidthWithinContainer;
		const currentHeight = height || imageHeightWithinContainer;
		let imgRatio = naturalWidth / naturalHeight;
		if ( useRatio ){
			switch ( ratio ) {
				case 'land43':
					imgRatio = 4 / 3;
					break;
				case 'land32':
					imgRatio = 3 / 2;
					break;
				case 'land169':
					imgRatio = 16 / 9;
					break;
				case 'land21':
					imgRatio = 2 / 1;
					break;
				case 'land31':
					imgRatio = 3 / 1;
					break;
				case 'land41':
					imgRatio = 4 / 1;
					break;
				case 'port34':
					imgRatio = 3 / 4;
					break;
				case 'port23':
					imgRatio = 2 / 3;
					break;
				case 'port916':
					imgRatio = 9 / 16;
					break;
				case 'square':
					imgRatio = 1 / 1;
					break;
			}
		}
		const minWidth =
			naturalWidth < naturalHeight ? MIN_SIZE : MIN_SIZE * imgRatio;
		const minHeight =
			naturalHeight < naturalWidth ? MIN_SIZE : MIN_SIZE / imgRatio;

		// With the current implementation of ResizableBox, an image needs an
		// explicit pixel value for the max-width. In absence of being able to
		// set the content-width, this max-width is currently dictated by the
		// vanilla editor style. The following variable adds a buffer to this
		// vanilla style, so 3rd party themes have some wiggleroom. This does,
		// in most cases, allow you to scale the image beyond the width of the
		// main column, though not infinitely.
		// @todo It would be good to revisit this once a content-width variable
		// becomes available.
		const maxWidthBuffer = maxWidth * 2.5;

		let showRightHandle = false;
		let showLeftHandle = false;

		/* eslint-disable no-lonely-if */
		// See https://github.com/WordPress/gutenberg/issues/7584.
		if ( align === 'center' ) {
			// When the image is centered, show both handles.
			showRightHandle = true;
			showLeftHandle = true;
		} else if ( isRTL() ) {
			// In RTL mode the image is on the right by default.
			// Show the right handle and hide the left handle only when it is
			// aligned left. Otherwise always show the left handle.
			if ( align === 'left' ) {
				showRightHandle = true;
			} else {
				showLeftHandle = true;
			}
		} else {
			// Show the left handle and hide the right handle only when the
			// image is aligned right. Otherwise always show the right handle.
			if ( align === 'right' ) {
				showLeftHandle = true;
			} else {
				showRightHandle = true;
			}
		}
		/* eslint-enable no-lonely-if */
		img = (
			<ResizableBox
				size={ {
					width: previewMaxWidth ?? backupWidth,
					height: 'auto',
				} }
				showHandle={ isSelected }
				minWidth={ minWidth }
				maxWidth={ maxWidthBuffer }
				minHeight={ minHeight }
				maxHeight={ maxWidthBuffer / imgRatio }
				lockAspectRatio
				enable={ {
					top: false,
					right: showRightHandle,
					bottom: false,
					left: showLeftHandle,
				} }
				onResizeStart={ onResizeStart }
				onResizeStop={ ( event, direction, elt, delta ) => {
					onResizeStop();
					setAttributes( {
						imgMaxWidth: parseInt( currentWidth + delta.width, 10 ),
					} );
				} }
				style={ {
					margin: align === 'center' ? '0 auto' : undefined,
				} }
			>
				{ img }
			</ResizableBox>
		);
	}

	return (
		<>
			{ /* Hide controls during upload to avoid component remount,
				which causes duplicated image upload. */ }
			{ ! temporaryURL && controls }
			{ img }
			{ ( ( ! RichText.isEmpty( caption ) || isSelected ) && stateShowCaption && showCaption !== false ) && (
				<RichText
					ref={ captionRef }
					tagName="figcaption"
					aria-label={ __( 'Image caption text', 'gutenam-blocks' ) }
					placeholder={ __( 'Add caption', 'gutenam-blocks' ) }
					value={ caption }
					onChange={ ( value ) =>
						setAttributes( { caption: value } )
					}
					style={ {
						//background: ( captionStyles && undefined !== captionStyles[ 0 ] && undefined !== captionStyles[ 0 ].background ? BaseColorOutput( captionStyles[ 0 ].background ) : undefined ),
						color: ( captionStyles && undefined !== captionStyles[ 0 ] && undefined !== captionStyles[ 0 ].color ?  BaseColorOutput( captionStyles[ 0 ].color ) : undefined ),
						fontFamily: ( captionStyles && undefined !== captionStyles[ 0 ] && undefined !== captionStyles[ 0 ].family ? captionStyles[ 0 ].family : undefined ),
						fontStyle: ( captionStyles && undefined !== captionStyles[ 0 ] && undefined !== captionStyles[ 0 ].style ? captionStyles[ 0 ].style : undefined ),
						fontWeight: ( captionStyles && undefined !== captionStyles[ 0 ] && undefined !== captionStyles[ 0 ].weight ? captionStyles[ 0 ].weight : undefined ),
						textTransform: ( captionStyles && undefined !== captionStyles[ 0 ] && undefined !== captionStyles[ 0 ].textTransform ? captionStyles[ 0 ].textTransform : undefined ),
						letterSpacing: ( captionStyles && undefined !== captionStyles[ 0 ] && undefined !== captionStyles[ 0 ].letterSpacing ? captionStyles[ 0 ].letterSpacing : undefined ),
						lineHeight: previewCaptionLineHeight,
						fontSize: getFontSizeOptionOutput( previewCaptionFontSize, previewCaptionFontSizeUnit )
					} }
					inlineToolbar
					__unstableOnSplitAtEnd={ () =>
						insertBlocksAfter( createBlock( 'core/paragraph' ) )
					}
				/>
			) }
		</>
	);
}
