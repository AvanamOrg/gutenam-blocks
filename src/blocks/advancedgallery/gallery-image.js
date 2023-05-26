/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { Fragment, useEffect, useRef, useState } from '@wordpress/element';
import { Spinner, ToggleControl, Button } from '@wordpress/components';

import { __ } from '@wordpress/i18n';
import { BACKSPACE, DELETE } from '@wordpress/keycodes';
import { withSelect } from '@wordpress/data';
import { RichText, URLInput } from '@wordpress/block-editor';
import { isBlobURL } from '@wordpress/blob';
import { applyFilters } from '@wordpress/hooks';
import {
	BaseColorOutput,
	showSettings,
	getSpacingOptionOutput,
	mouseOverVisualizer,
	getPreviewSize,
	getFontSizeOptionOutput,
} from '@base/helpers';

function GalleryImage( props ) {

	const {
		onSelect,
		container,
		url,
		width,
		height,
		imageRatio,
		lightUrl,
		thumbUrl,
		customLink,
		linkTarget,
		linkSponsored,
		alt,
		id,
		index,
		linkTo,
		link,
		isFirstItem,
		isLastItem,
		isSelected,
		showCaption,
		caption,
		captionStyle,
		captionStyles,
		onRemove,
		onMoveForward,
		onMoveBackward,
		setAttributes,
		setLinkAttributes,
		'aria-label': ariaLabel,
		type,
		thumbnail,
		dynamicSource,
		previewDevice,
		image
	} = props;

	const [ showSettings, setShowSettings ] = useState( false );

	const toggleSettingsVisibility = () => {
		setShowSettings( !showSettings );
	};

	const onSelectImage = () => {

		if ( ! isSelected ) {
			onSelect( index );
		}

	};

	const onRemoveImage = ( event ) => {
		if (
			container === document.activeElement &&
			isSelected && [ BACKSPACE, DELETE ].indexOf( event.keyCode ) !== -1
		) {
			event.stopPropagation();
			event.preventDefault();
			onRemove();
		}
	};
	const previewFont = getPreviewSize( previewDevice, ( undefined !== captionStyles?.[ 0 ]?.size?.[ 0 ] ? captionStyles[ 0 ].size[ 0 ] : '' ), ( undefined !== captionStyles?.[ 0 ]?.size?.[ 1 ] ? captionStyles[ 0 ].size[ 1 ] : '' ), ( undefined !== captionStyles?.[ 0 ]?.size?.[ 2 ] ? captionStyles[ 0 ].size[ 2 ] : '' ) );

	// const componentDidUpdate = ( prevProps ) => {
	// 	if ( image && !url ) {
	// 		setAttributes( {
	// 			url: image.source_url,
	// 			alt: image.alt_text,
	// 		} );
	// 	}
	//
	// 	// unselect the caption so when the user selects other image and comeback
	// 	// the caption is not immediately selected
	// 	if ( captionSelected && !isSelected && prevProps.isSelected ) {
	// 		setCaptionSelected( false );
	// 	}
	// }

	// useEffect( () => {
	// 	if ( image && !url ) {
	// 		setAttributes( {
	// 			url: image.source_url,
	// 			alt: image.alt_text,
	// 		} );
	// 	}
	//
	// 	// unselect the caption so when the user selects other image and comeback
	// 	// the caption is not immediately selected
	// 	if ( captionSelected && !isSelected && prevProps.isSelected ) {
	// 		setCaptionSelected( false );
	// 	}
	// }, [] );

	let href;

	switch ( linkTo ) {
		case 'media':
			href = url;
			break;
		case 'custom':
			href = ( customLink ? customLink : url );
			break;
		case 'attachment':
			href = link;
			break;
	}
	const imgContainClassName = classnames( {
		'bsb-gallery-image-contain'                : true,
		'base-blocks-gallery-intrinsic'        : ( ( type === 'grid' && 'inherit' !== imageRatio ) || ( ( type === 'carousel' || type === 'slider' || type === 'thumbslider' ) && imageRatio ) || ( type !== 'fluidcarousel' && type !== 'tiles' && width && height ) ),
		[ `bsb-gallery-image-ratio-${imageRatio}` ]: imageRatio && ( type === 'grid' || type === 'carousel' || type === 'slider' || type === 'thumbslider' ),
	} );

	const btnRef = useRef();

	const img = (
		<button
			className={imgContainClassName}
			onClick={ () => { onSelectImage(); }}
			unstableOnFocus={ () => { onSelectImage(); }}
			onKeyDown={ () => { onRemoveImage() } }
			tabIndex="0"
			aria-label={ariaLabel}
			ref={ btnRef }
			style={{
				paddingBottom: ( ( type === 'masonry' && width && height ) || ( type === 'grid' && imageRatio === 'inherit' && width && height ) ? ( ( height / width ) * 100 ) + '%' : undefined ),
			}}
		>
			<img
				src={thumbUrl || url}
				alt={alt}
				width={width}
				height={height}
				data-id={id}
				data-full-image={url}
				data-light-image={lightUrl}
				data-link={link}
				data-custom-link={customLink}
				data-custom-link-target={linkTarget}
			/>
			{isBlobURL( url ) && <Spinner/>}
		</button>
	);

	const thumbImg = (
		<div
			className={imgContainClassName}
			style={{
				paddingBottom: ( ( type === 'masonry' && width && height ) || ( type === 'grid' && imageRatio === 'inherit' && width && height ) ? ( ( height / width ) * 100 ) + '%' : undefined ),
			}}
		>
			<img
				src={thumbUrl || url}
				alt={alt}
				width={width}
				height={height}
				data-id={id}
				data-full-image={url}
				data-light-image={lightUrl}
				data-link={link}
				data-custom-link={customLink}
				data-custom-link-target={linkTarget}
			/>
			{isBlobURL( url ) && <Spinner/>}
		</div>
	);
	const figcap = (
		<RichText
			tagName="figcaption"
			className={`base-blocks-gallery-item__caption`}
			placeholder={isSelected ? __( 'Write caption…', 'gutenam-blocks' ) : null}
			value={caption}
			onChange={( newCaption ) => setAttributes( { caption: newCaption } )}
			inlineToolbar
			keepPlaceholderOnFocus
			unstableOnFocus={ () => { onSelectImage(); }}
			style={{
				fontWeight   : '' !== captionStyles[ 0 ].weight ? captionStyles[ 0 ].weight : undefined,
				fontStyle    : '' !== captionStyles[ 0 ].style ? captionStyles[ 0 ].style : undefined,
				fontSize     : previewFont ? getFontSizeOptionOutput( previewFont, captionStyles[ 0 ].sizeType ) : undefined,
				lineHeight   : ( captionStyles[ 0 ].lineHeight && captionStyles[ 0 ].lineHeight[ 0 ] ? captionStyles[ 0 ].lineHeight[ 0 ] + captionStyles[ 0 ].lineType : undefined ),
				textTransform: ( '' !== captionStyles[ 0 ].textTransform ? captionStyles[ 0 ].textTransform : undefined ),
				letterSpacing: '' !== captionStyles[ 0 ].letterSpacing ? captionStyles[ 0 ].letterSpacing + 'px' : undefined,
				fontFamily   : ( '' !== captionStyles[ 0 ].family ? captionStyles[ 0 ].family : '' ),
			}}
		/>
	);
	const figcapDynamic = (
		<figcaption
			className={`base-blocks-gallery-item__caption`}
			style={{
				fontWeight   : '' !== captionStyles[ 0 ].weight ? captionStyles[ 0 ].weight : undefined,
				fontStyle    : '' !== captionStyles[ 0 ].style ? captionStyles[ 0 ].style : undefined,
				fontSize     : undefined !== captionStyles[ 0 ].size && '' !== captionStyles[ 0 ].size[ 0 ] ? captionStyles[ 0 ].size[ 0 ] + captionStyles[ 0 ].sizeType : undefined,
				lineHeight   : ( captionStyles[ 0 ].lineHeight && captionStyles[ 0 ].lineHeight[ 0 ] ? captionStyles[ 0 ].lineHeight[ 0 ] + captionStyles[ 0 ].lineType : undefined ),
				textTransform: ( '' !== captionStyles[ 0 ].textTransform ? captionStyles[ 0 ].textTransform : undefined ),
				letterSpacing: '' !== captionStyles[ 0 ].letterSpacing ? captionStyles[ 0 ].letterSpacing + 'px' : undefined,
				fontFamily   : ( '' !== captionStyles[ 0 ].family ? captionStyles[ 0 ].family : '' ),
			}}
		>
			{caption}
		</figcaption>
	);
	const capOutput = dynamicSource ? figcapDynamic : figcap;
	const className = classnames( {
		'bsb-gallery-figure'                       : true,
		'is-selected'                             : ! thumbnail && isSelected,
		'is-transient'                            : isBlobURL( thumbUrl || url ),
		'base-blocks-gallery-item-has-caption' : showCaption && caption,
		'base-blocks-gallery-item-hide-caption': !showCaption,
		[ `bsb-has-image-ratio-${imageRatio}` ]    : imageRatio && ( type === 'grid' || type === 'carousel' || type === 'slider' || type === 'thumbslider' ),
	} );

	return (
		<Fragment>
			<figure className={className}>
				<div className="bsb-gal-image-radius" style={{
					maxWidth: ( ( type === 'masonry' && width && height ) ? width + 'px' : undefined ),
				}}>
					{!thumbnail &&
						img
					}
					{thumbnail &&
						thumbImg
					}
					{!thumbnail && ( 'below' !== captionStyle && showCaption ) && (
						capOutput
					)}
				</div>
				{ ! thumbnail && (
					<>
						{'below' === captionStyle && showCaption && (
							capOutput
						)}
						{ ! dynamicSource && (
							<>
								<div className="base-blocks-library-gallery-item__move-menu">
									<Button
										icon="arrow-left"
										onClick={isFirstItem ? undefined : onMoveBackward}
										className="base-blocks-gallery-item__move-backward"
										label={__( 'Move Image Backward', 'gutenam-blocks' )}
										aria-disabled={isFirstItem}
										disabled={!isSelected}
									/>
									<Button
										icon="arrow-right"
										onClick={isLastItem ? undefined : onMoveForward}
										className="base-blocks-gallery-item__move-forward"
										label={__( 'Move Image Forward', 'gutenam-blocks' )}
										aria-disabled={isLastItem}
										disabled={!isSelected}
									/>
								</div>
								<div className="base-blocks-library-gallery-item__inline-menu">
									<Button
										icon="no-alt"
										onClick={onRemove}
										className="base-blocks-gallery-item__remove"
										label={__( 'Remove Image', 'gutenam-blocks' )}
										disabled={!isSelected}
									/>
								</div>
							</>
						)}
					</>
				)}
			</figure>
			{! thumbnail && linkTo === 'custom' && isSelected && ! dynamicSource && (
				<>
					<div className="bsb-gallery-custom-link block-editor-url-popover__row" onClick={ () => toggleSettingsVisibility()}>
						<URLInput
							aria-label={__( 'URL', 'gutenam-blocks' )}
							placeholder={__( 'Paste or type URL', 'gutenam-blocks' )}
							unstableOnFocus={ () => toggleSettingsVisibility() }
							onClick={ () => toggleSettingsVisibility() }
							className="editor-media-placeholder__url-input-field block-editor-media-placeholder__url-input-field"
							value={customLink}
							onChange={value => setLinkAttributes( { customLink: value } )}
						/>
						<Button
							className="editor-url-popover__settings-toggle block-editor-url-popover__settings-toggle"
							icon="arrow-down-alt2"
							label={__( 'Link Settings', 'gutenam-blocks' )}
							onClick={ () => toggleSettingsVisibility}
							aria-expanded={ () => showSettings }
						/>
					</div>
					{ showSettings && (
						<div className="editor-url-popover__row block-editor-url-popover__row editor-url-popover__settings block-editor-url-popover__settings">
							<ToggleControl
								label={__( 'Open in New Tab', 'gutenam-blocks' )}
								checked={linkTarget === '_blank'}
								onChange={( target ) => setLinkAttributes( { linkTarget: ( target ? '_blank' : '' ) } )}
							/>
							<ToggleControl
								label={__( 'Sponsored', 'gutenam-blocks' )}
								checked={linkSponsored === 'sponsored'}
								onChange={( value ) => setLinkAttributes( { linkSponsored: ( value ? 'sponsored' : '' ) } )}
							/>
						</div>
					)}
				</>
			)}
		</Fragment>
	);

}

export default withSelect( ( select, ownProps ) => {
	const { getMedia } = select( 'core' );
	const { id } = ownProps;
	return {
		image: id ? getMedia( id ) : null,
	};
} )( GalleryImage );
