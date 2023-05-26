/**
 * BLOCK: Base Section
 *
 * Registering Deprecations.
 */
/**
 * External dependencies
 */
import classnames from 'classnames';
import { hexToRGBA, BaseColorOutput } from '@base/helpers';
import { Fragment } from '@wordpress/element';
import {
	RichText,
	useBlockProps
} from '@wordpress/block-editor';

/**
 * BLOCK: Base Galleries
 *
 * Registering Deprecations.
 */
export default [
	{
		attributes: {
			uniqueID: {
				type: 'string',
			},
			columns: {
				type: 'array',
				default: [ 3, 3, 3, 2, 1, 1 ],
			},
			columnControl: {
				type: 'string',
				default: 'linked',
			},
			images: {
				type: 'array',
				default: [],
				source: 'query',
				selector: '.base-blocks-gallery-item',
				query: {
					url: {
						source: 'attribute',
						selector: 'img',
						attribute: 'data-full-image',
					},
					thumbUrl: {
						source: 'attribute',
						selector: 'img',
						attribute: 'src',
					},
					lightUrl: {
						source: 'attribute',
						selector: 'img',
						attribute: 'data-light-image',
					},
					link: {
						source: 'attribute',
						selector: 'img',
						attribute: 'data-link',
					},
					customLink: {
						source: 'attribute',
						selector: 'img',
						attribute: 'data-custom-link',
					},
					linkTarget: {
						source: 'attribute',
						selector: 'img',
						attribute: 'data-custom-link-target',
					},
					width: {
						source: 'attribute',
						selector: 'img',
						attribute: 'width',
					},
					height: {
						source: 'attribute',
						selector: 'img',
						attribute: 'height',
					},
					alt: {
						source: 'attribute',
						selector: 'img',
						attribute: 'alt',
						default: '',
					},
					id: {
						source: 'attribute',
						selector: 'img',
						attribute: 'data-id',
					},
					caption: {
						type: 'string',
						source: 'html',
						selector: '.base-blocks-gallery-item__caption',
					},
				},
			},
			lightSize: {
				type: 'string',
				default: 'full',
			},
			thumbSize: {
				type: 'string',
				default: 'large',
			},
			ids: {
				type: 'array',
			},
			type: {
				type: 'string',
				default: 'masonry',
			},
			imageRatio: {
				type: 'string',
				default: 'land32',
			},
			linkTo: {
				type: 'string',
				default: 'none',
			},
			showCaption: {
				type: 'boolean',
				default: false,
			},
			hoverStyle: {
				type: 'string',
				default: 'dark',
			},
			captionStyle: {
				type: 'string',
				default: 'bottom-hover',
			},
			captionStyles: {
				type: 'array',
				default: [ {
					size: [ '', '', '' ],
					sizeType: 'px',
					lineHeight: [ '', '', '' ],
					lineType: 'px',
					letterSpacing: '',
					textTransform: '',
					family: '',
					google: false,
					style: '',
					weight: '',
					variant: '',
					subset: '',
					loadGoogle: true,
					color: '',
					background: '#000000',
					backgroundOpacity: 0.5,
				} ],
			},
			captionAlignment: {
				type: 'string',
				default: 'center',
			},
			gutter: {
				type: 'array',
				default: [ 10, '', '' ],
			},
			carouselHeight: {
				type: 'array',
				default: [ 300, '', '' ],
			},
			imageRadius: {
				type: 'array',
				default: [ 0, 0, 0, 0 ],
			},
			autoPlay: {
				type: 'boolean',
				default: false,
			},
			autoSpeed: {
				type: 'number',
				default: 7000,
			},
			transSpeed: {
				type: 'number',
				default: 400,
			},
			slidesScroll: {
				type: 'string',
				default: '1',
			},
			arrowStyle: {
				type: 'string',
				default: 'whiteondark',
			},
			dotStyle: {
				type: 'string',
				default: 'dark',
			},
			displayShadow: {
				type: 'boolean',
				default: false,
			},
			shadow: {
				type: 'array',
				default: [ {
					color: '#000000',
					opacity: 0.2,
					spread: 0,
					blur: 14,
					hOffset: 4,
					vOffset: 2,
				} ],
			},
			shadowHover: {
				type: 'array',
				default: [ {
					color: '#000000',
					opacity: 0.2,
					spread: 0,
					blur: 14,
					hOffset: 4,
					vOffset: 2,
				} ],
			},
			imageFilter: {
				type: 'string',
				default: 'none',
			},
			lightbox: {
				type: 'string',
				default: 'none',
			},
			lightboxCaption: {
				type: 'boolean',
				default: true,
			},
			margin: {
				type: 'array',
				default: [ {
					desk: [ '', '', '', '' ],
					tablet: [ '', '', '', '' ],
					mobile: [ '', '', '', '' ],
				} ],
			},
			marginUnit: {
				type: 'string',
				default: 'px',
			},
			carouselAlign: {
				type: 'boolean',
				default: true,
			},
			thumbnailRatio: {
				type: 'string',
				default: 'land32',
			},
			thumbnailColumns: {
				type: 'array',
				default: [ 4, 4, 4, 4, 4, 4 ],
			},
			thumbnailControl: {
				type: 'string',
				default: 'linked',
			},
			mobileForceHover: {
				type: 'boolean',
				default: false,
			},
		},
		save: ( { attributes } ) => {
			const { uniqueID, images, columns, type, linkTo, showCaption, captionStyle, imageRatio, imageFilter, lightbox, lightboxCaption, dotStyle, transSpeed, slidesScroll, autoPlay, arrowStyle, autoSpeed, carouselAlign, thumbnailColumns, thumbnailRatio, mobileForceHover } = attributes;
			const galleryClassNames = classnames(
				{
					'bsb-gallery-ul': true,
					[ `bsb-gallery-type-${ type }` ]: type,
					'bsb-masonry-init': ( 'masonry' === type ),
					'bsb-mobile-force-hover': mobileForceHover,
					[ `bsb-gallery-id-${ uniqueID }` ]: uniqueID,
					[ `bsb-gallery-caption-style-${ captionStyle }` ]: captionStyle,
					[ `bsb-gallery-filter-${ imageFilter }` ]: imageFilter,
					'bsb-gallery-magnific-init': linkTo === 'media' && lightbox === 'magnific',
				}
			);
			const renderThumbImages = ( image ) => {
				const imgContainClassName = classnames( {
					'bsb-gallery-image-contain': true,
					'base-blocks-gallery-intrinsic': ( ( ( type === 'grid' || type === 'carousel' || type === 'slider' || type === 'thumbslider' ) && imageRatio ) || ( type !== 'fluidcarousel' && type !== 'tiles' && image.width && image.height ) ),
					[ `bsb-gallery-image-ratio-${ thumbnailRatio }` ]: thumbnailRatio && ( type === 'grid' || type === 'carousel' || type === 'slider' || type === 'thumbslider' ),
				} );
				const img = <div className={ imgContainClassName } style={ { paddingBottom: ( ( ( type !== 'grid' && type !== 'carousel' && type !== 'fluidcarousel' && type !== 'tiles' && type !== 'slider' && type !== 'thumbslider' ) && image.width && image.height ) || ( type === 'grid' && thumbnailRatio === 'inherit' && image.width && image.height ) ? ( ( image.height / image.width ) * 100 ) + '%' : undefined ) } }><img src={ image.thumbUrl || image.url } width={ image.width } height={ image.height } alt={ image.alt } data-full-image={ image.url } data-light-image={ image.lightUrl } data-id={ image.id } data-link={ image.link } data-custom-link={ image.customLink } data-custom-link-target={ image.linkTarget } className={ image.id ? `wp-image-${ image.id }` : null } /></div>;
				const figClassName = classnames( {
					'bsb-gallery-thumb-figure': true,
					[ `bsb-has-image-ratio-${ thumbnailRatio }` ]: thumbnailRatio && ( type === 'grid' || type === 'carousel' || type === 'slider' || type === 'thumbslider' ),
				} );
				const imgPack = (
					<Fragment>
						<div className="bsb-gal-image-radius" style={ {
							maxWidth: ( ( type === 'masonry' && image.width && image.height ) || ( ( type === 'grid' || type === 'carousel' || type === 'slider' || type === 'thumbslider' ) && thumbnailRatio === 'inherit' && image.width && image.height ) ? image.width + 'px' : undefined ),
						} }>
							{ img }
						</div>
					</Fragment>
				);
				return (
					<li key={ image.id || image.url } className="base-blocks-gallery-thumb-item">
						<div className="base-blocks-gallery-thumb-item-inner">
							<figure className={ figClassName }>
								{ imgPack }
							</figure>
						</div>
					</li>
				);
			};
			const renderGalleryImages = ( image ) => {
				let href;
				switch ( linkTo ) {
					case 'media':
						href = image.lightUrl || image.url;
						break;
					case 'custom':
						href = ( image.customLink ? image.customLink : '' );
						break;
					case 'attachment':
						href = image.link;
						break;
				}
				const imgContainClassName = classnames( {
					'bsb-gallery-image-contain': true,
					'base-blocks-gallery-intrinsic': ( ( ( type === 'grid' || type === 'carousel' || type === 'slider' || type === 'thumbslider' ) && imageRatio ) || ( type !== 'fluidcarousel' && type !== 'tiles' && image.width && image.height ) ),
					[ `bsb-gallery-image-ratio-${ imageRatio }` ]: imageRatio && ( type === 'grid' || type === 'carousel' || type === 'slider' || type === 'thumbslider' ),
				} );
				const img = <div className={ imgContainClassName } style={ { paddingBottom: ( ( ( type !== 'grid' && type !== 'carousel' && type !== 'fluidcarousel' && type !== 'tiles' && type !== 'slider' && type !== 'thumbslider' ) && image.width && image.height ) || ( type === 'grid' && imageRatio === 'inherit' && image.width && image.height ) ? ( ( image.height / image.width ) * 100 ) + '%' : undefined ) } }><img src={ image.thumbUrl || image.url } width={ image.width } height={ image.height } alt={ image.alt } data-full-image={ image.url } data-light-image={ image.lightUrl } data-id={ image.id } data-link={ image.link } data-custom-link={ image.customLink } data-custom-link-target={ image.linkTarget } className={ `${ ( image.id ? `wp-image-${ image.id }` : undefined ) }${ ( type === 'carousel' || type === 'fluidcarousel' || type === 'tiles' || type === 'slider' || type === 'thumbslider' ? ' skip-lazy' : undefined ) }` } /></div>;
				const figClassName = classnames( {
					'bsb-gallery-figure': true,
					'bsb-gallery-item-has-link': href,
					'base-blocks-gallery-item-has-caption': showCaption && ( image.caption && image.caption.length > 0 ),
					'base-blocks-gallery-item-hide-caption': ! showCaption,
					[ `bsb-has-image-ratio-${ imageRatio }` ]: imageRatio && ( type === 'grid' || type === 'carousel' || type === 'slider' || type === 'thumbslider' ),
				} );
				const FigTag = ( ! href && 'below' === captionStyle ? 'figcaption' : 'div' );
				const figcap = (
					<RichText.Content
						className="base-blocks-gallery-item__caption"
						tagName={ FigTag }
						value={ image.caption }
					/>
				);
				const ItemTag = ( ( type === 'carousel' || type === 'fluidcarousel' || type === 'slider' || type === 'thumbslider' ) ? 'div' : 'li' );
				const imgPack = (
					<Fragment>
						<div className="bsb-gal-image-radius" style={ {
							maxWidth: ( ( type === 'masonry' && image.width && image.height ) || ( ( type === 'grid' || type === 'carousel' || type === 'slider' || type === 'thumbslider' ) && imageRatio === 'inherit' && image.width && image.height ) ? image.width + 'px' : undefined ),
						} }>
							{ img }
							{ ( image.caption && image.caption.length > 0 ) && 'below' !== captionStyle && (
								figcap
							) }
						</div>
						{ ( image.caption && image.caption.length > 0 ) && 'below' === captionStyle && (
							figcap
						) }
					</Fragment>
				);
				let relAttr;
				if ( linkTo === 'custom' && '_blank' === image.linkTarget ) {
					relAttr = 'noopener noreferrer';
				}
				return (
					<ItemTag key={ image.id || image.url } className="base-blocks-gallery-item">
						<div className="base-blocks-gallery-item-inner">
							<figure className={ figClassName }>
								{ href ? <a href={ href } className="bsb-gallery-item-link" target={ ( linkTo === 'custom' && image.linkTarget === '_blank' ) || ( linkTo === 'media' && lightbox === 'new_tab' ) ? '_blank' : undefined } rel={ ( relAttr ? relAttr : undefined ) } >{ imgPack }</a> : imgPack }
							</figure>
						</div>
					</ItemTag>
				);
			};
			return (
				<div className={ `bsb-gallery-wrap-id-${ uniqueID }` }>
					{ type === 'carousel' && (
						<div
							className={ galleryClassNames }
							data-image-filter={ imageFilter }
							data-lightbox-caption={ ( lightboxCaption ? 'true' : false ) }
						>
							<div className={ `bst-blocks-carousel bst-carousel-container-dotstyle-${ dotStyle }` }>
								<div className={ `bst-blocks-carousel-init bsb-gallery-carousel bst-carousel-arrowstyle-${ arrowStyle } bst-carousel-dotstyle-${ dotStyle }` } data-columns-xxl={ columns[ 0 ] } data-columns-xl={ columns[ 1 ] } data-columns-md={ columns[ 2 ] } data-columns-sm={ columns[ 3 ] } data-columns-xs={ columns[ 4 ] } data-columns-ss={ columns[ 5 ] } data-slider-anim-speed={ transSpeed } data-slider-scroll={ slidesScroll } data-slider-arrows={ ( 'none' === arrowStyle ? false : true ) } data-slider-dots={ ( 'none' === dotStyle ? false : true ) } data-slider-hover-pause="false" data-slider-auto={ autoPlay } data-slider-speed={ autoSpeed }>
									{ images.map( ( image, index ) => (
										<div className="bsb-slide-item bsb-gallery-carousel-item" key={ index }>
											{ renderGalleryImages( image ) }
										</div>
									) ) }
								</div>
							</div>
						</div>
					) }
					{ type === 'fluidcarousel' && (
						<div
							className={ galleryClassNames }
							data-image-filter={ imageFilter }
							data-lightbox-caption={ ( lightboxCaption ? 'true' : false ) }
						>
							<div className={ `bst-blocks-carousel bst-carousel-container-dotstyle-${ dotStyle }` }>
								<div className={ `bst-blocks-carousel-init bsb-blocks-fluid-carousel bst-carousel-arrowstyle-${ arrowStyle } bst-carousel-dotstyle-${ dotStyle }${ ( carouselAlign === false ? ' bsb-carousel-mode-align-left' : '' ) }` } data-slider-anim-speed={ transSpeed } data-slider-type="fluidcarousel" data-slider-scroll="1" data-slider-arrows={ ( 'none' === arrowStyle ? false : true ) } data-slider-dots={ ( 'none' === dotStyle ? false : true ) } data-slider-hover-pause="false" data-slider-auto={ autoPlay } data-slider-speed={ autoSpeed } data-slider-center-mode={ ( carouselAlign === false ? 'false' : undefined ) }>
									{ images.map( ( image, index ) => (
										<div className="bsb-slide-item bsb-gallery-carousel-item" key={ index }>
											{ renderGalleryImages( image ) }
										</div>
									) ) }
								</div>
							</div>
						</div>
					) }
					{ type === 'slider' && (
						<div
							className={ galleryClassNames }
							data-image-filter={ imageFilter }
							data-lightbox-caption={ ( lightboxCaption ? 'true' : false ) }
						>
							<div className={ `bst-blocks-carousel bst-carousel-container-dotstyle-${ dotStyle }` }>
								<div className={ `bst-blocks-carousel-init bsb-blocks-slider bst-carousel-arrowstyle-${ arrowStyle } bst-carousel-dotstyle-${ dotStyle }` } data-slider-anim-speed={ transSpeed } data-slider-type="slider" data-slider-scroll="1" data-slider-arrows={ ( 'none' === arrowStyle ? false : true ) } data-slider-dots={ ( 'none' === dotStyle ? false : true ) } data-slider-hover-pause="false" data-slider-auto={ autoPlay } data-slider-speed={ autoSpeed }>
									{ images.map( ( image, index ) => (
										<div className="bsb-slide-item bsb-gallery-slide-item" key={ index }>
											{ renderGalleryImages( image ) }
										</div>
									) ) }
								</div>
							</div>
						</div>
					) }
					{ type === 'thumbslider' && (
						<div
							className={ galleryClassNames }
							data-image-filter={ imageFilter }
							data-lightbox-caption={ ( lightboxCaption ? 'true' : false ) }
						>
							<div className={ 'bst-blocks-carousel bst-carousel-container-dotstyle-none' }>
								<div id={ `bsb-slider-${ uniqueID }` } className={ `bst-blocks-carousel-init bsb-gallery-carousel bst-carousel-arrowstyle-${ arrowStyle } bst-carousel-dotstyle-none` } data-columns-xxl={ thumbnailColumns[ 0 ] } data-columns-xl={ thumbnailColumns[ 1 ] } data-columns-md={ thumbnailColumns[ 2 ] } data-columns-sm={ thumbnailColumns[ 3 ] } data-columns-xs={ thumbnailColumns[ 4 ] } data-columns-ss={ thumbnailColumns[ 5 ] } data-slider-anim-speed={ transSpeed } data-slider-type="thumbnail" data-slider-nav={ `bsb-thumb-slider-${ uniqueID }` } data-slider-scroll={ slidesScroll } data-slider-arrows={ ( 'none' === arrowStyle ? false : true ) } data-slider-dots={ false } data-slider-hover-pause="false" data-slider-auto={ autoPlay } data-slider-speed={ autoSpeed }>
									{ images.map( ( image, index ) => (
										<div className="bsb-slide-item bsb-gallery-carousel-item" key={ index }>
											{ renderGalleryImages( image ) }
										</div>
									) ) }
								</div>
								<div id={ `bsb-thumb-slider-${ uniqueID }` } className={ `bsb-gallery-carousel bsb-gallery-slider-thumbnails bst-carousel-arrowstyle-${ arrowStyle } bst-carousel-dotstyle-none` } data-slider-anim-speed={ transSpeed } data-slider-type="thumbnail" data-slider-nav={ `bsb-slider-${ uniqueID }` } data-slider-scroll={ slidesScroll } data-slider-arrows={ ( 'none' === arrowStyle ? false : true ) } data-slider-dots={ false } data-slider-hover-pause="false" data-slider-auto={ autoPlay } data-slider-speed={ autoSpeed }>
									{ images.map( ( image, index ) => (
										<div className="bsb-slide-item bsb-gallery-carousel-item" key={ index }>
											{ renderThumbImages( image ) }
										</div>
									) ) }
								</div>
							</div>
						</div>
					) }
					{ ( type === 'tiles' ) && (
						<ul
							className={ galleryClassNames }
							data-image-filter={ imageFilter }
							data-lightbox-caption={ ( lightboxCaption ? 'true' : false ) }
						>
							{ images.map( ( image ) => {
								return renderGalleryImages( image );
							} ) }
						</ul>
					) }
					{ ( type === 'masonry' || type === 'grid' ) && (
						<ul
							className={ galleryClassNames }
							data-item-selector=".base-blocks-gallery-item"
							data-image-filter={ imageFilter }
							data-lightbox-caption={ ( lightboxCaption ? 'true' : false ) }
							data-columns-xxl={ columns[ 0 ] }
							data-columns-xl={ columns[ 1 ] }
							data-columns-lg={ columns[ 2 ] }
							data-columns-md={ columns[ 3 ] }
							data-columns-sm={ columns[ 4 ] }
							data-columns-xs={ columns[ 5 ] }
						>
							{ images.map( ( image ) => {
								return renderGalleryImages( image );
							} ) }
						</ul>
					) }
				</div>
			);
		}
	},
	{
		attributes: {
			uniqueID: {
				type: 'string',
			},
			columns: {
				type: 'array',
				default: [ 3, 3, 3, 2, 1, 1 ],
			},
			columnControl: {
				type: 'string',
				default: 'linked',
			},
			images: {
				type: 'array',
				default: [],
				source: 'query',
				selector: '.base-blocks-gallery-item',
				query: {
					url: {
						source: 'attribute',
						selector: 'img',
						attribute: 'data-full-image',
					},
					thumbUrl: {
						source: 'attribute',
						selector: 'img',
						attribute: 'src',
					},
					lightUrl: {
						source: 'attribute',
						selector: 'img',
						attribute: 'data-light-image',
					},
					link: {
						source: 'attribute',
						selector: 'img',
						attribute: 'data-link',
					},
					customLink: {
						source: 'attribute',
						selector: 'img',
						attribute: 'data-custom-link',
					},
					linkTarget: {
						source: 'attribute',
						selector: 'img',
						attribute: 'data-custom-link-target',
					},
					width: {
						source: 'attribute',
						selector: 'img',
						attribute: 'width',
					},
					height: {
						source: 'attribute',
						selector: 'img',
						attribute: 'height',
					},
					alt: {
						source: 'attribute',
						selector: 'img',
						attribute: 'alt',
						default: '',
					},
					id: {
						source: 'attribute',
						selector: 'img',
						attribute: 'data-id',
					},
					caption: {
						type: 'string',
						source: 'html',
						selector: 'figcaption',
					},
				},
			},
			lightSize: {
				type: 'string',
				default: 'full',
			},
			thumbSize: {
				type: 'string',
				default: 'large',
			},
			ids: {
				type: 'array',
			},
			type: {
				type: 'string',
				default: 'masonry',
			},
			imageRatio: {
				type: 'string',
				default: 'land32',
			},
			linkTo: {
				type: 'string',
				default: 'none',
			},
			showCaption: {
				type: 'boolean',
				default: false,
			},
			hoverStyle: {
				type: 'string',
				default: 'dark',
			},
			captionStyle: {
				type: 'string',
				default: 'bottom-hover',
			},
			captionStyles: {
				type: 'array',
				default: [ {
					size: [ '', '', '' ],
					sizeType: 'px',
					lineHeight: [ '', '', '' ],
					lineType: 'px',
					letterSpacing: '',
					textTransform: '',
					family: '',
					google: false,
					style: '',
					weight: '',
					variant: '',
					subset: '',
					loadGoogle: true,
					color: '',
					background: '#000000',
					backgroundOpacity: 0.5,
				} ],
			},
			captionAlignment: {
				type: 'string',
				default: 'center',
			},
			gutter: {
				type: 'array',
				default: [ 10, '', '' ],
			},
			carouselHeight: {
				type: 'array',
				default: [ 300, '', '' ],
			},
			imageRadius: {
				type: 'array',
				default: [ 0, 0, 0, 0 ],
			},
			autoPlay: {
				type: 'boolean',
				default: false,
			},
			autoSpeed: {
				type: 'number',
				default: 7000,
			},
			transSpeed: {
				type: 'number',
				default: 400,
			},
			slidesScroll: {
				type: 'string',
				default: '1',
			},
			arrowStyle: {
				type: 'string',
				default: 'whiteondark',
			},
			dotStyle: {
				type: 'string',
				default: 'dark',
			},
			displayShadow: {
				type: 'boolean',
				default: false,
			},
			shadow: {
				type: 'array',
				default: [ {
					color: '#000000',
					opacity: 0.2,
					spread: 0,
					blur: 14,
					hOffset: 4,
					vOffset: 2,
				} ],
			},
			shadowHover: {
				type: 'array',
				default: [ {
					color: '#000000',
					opacity: 0.2,
					spread: 0,
					blur: 14,
					hOffset: 4,
					vOffset: 2,
				} ],
			},
			imageFilter: {
				type: 'string',
				default: 'none',
			},
			lightbox: {
				type: 'string',
				default: 'none',
			},
			lightboxCaption: {
				type: 'boolean',
				default: true,
			},
			margin: {
				type: 'array',
				default: [ {
					desk: [ '', '', '', '' ],
					tablet: [ '', '', '', '' ],
					mobile: [ '', '', '', '' ],
				} ],
			},
			marginUnit: {
				type: 'string',
				default: 'px',
			},
			carouselAlign: {
				type: 'boolean',
				default: true,
			},
			thumbnailRatio: {
				type: 'string',
				default: 'land32',
			},
			thumbnailColumns: {
				type: 'array',
				default: [ 4, 4, 4, 4, 4, 4 ],
			},
			thumbnailControl: {
				type: 'string',
				default: 'linked',
			},
			mobileForceHover: {
				type: 'boolean',
				default: false,
			},
		},
		save: ( { attributes } ) => {
			const { uniqueID, images, columns, type, linkTo, showCaption, captionStyle, imageRatio, imageFilter, lightbox, lightboxCaption, dotStyle, transSpeed, slidesScroll, autoPlay, arrowStyle, autoSpeed, carouselAlign, thumbnailColumns, thumbnailRatio, mobileForceHover } = attributes;
			const galleryClassNames = classnames(
				{
					'bsb-gallery-ul': true,
					[ `bsb-gallery-type-${ type }` ]: type,
					'bsb-masonry-init': ( 'masonry' === type ),
					'bsb-mobile-force-hover': mobileForceHover,
					[ `bsb-gallery-id-${ uniqueID }` ]: uniqueID,
					[ `bsb-gallery-caption-style-${ captionStyle }` ]: captionStyle,
					[ `bsb-gallery-filter-${ imageFilter }` ]: imageFilter,
					'bsb-gallery-magnific-init': linkTo === 'media' && lightbox === 'magnific',
				}
			);
			const renderThumbImages = ( image ) => {
				const imgContainClassName = classnames( {
					'bsb-gallery-image-contain': true,
					'base-blocks-gallery-intrinsic': ( ( ( type === 'grid' || type === 'carousel' || type === 'slider' || type === 'thumbslider' ) && imageRatio ) || ( type !== 'fluidcarousel' && type !== 'tiles' && image.width && image.height ) ),
					[ `bsb-gallery-image-ratio-${ thumbnailRatio }` ]: thumbnailRatio && ( type === 'grid' || type === 'carousel' || type === 'slider' || type === 'thumbslider' ),
				} );
				const img = <div className={ imgContainClassName } style={ { paddingBottom: ( ( ( type !== 'grid' && type !== 'carousel' && type !== 'fluidcarousel' && type !== 'tiles' && type !== 'slider' && type !== 'thumbslider' ) && image.width && image.height ) || ( type === 'grid' && thumbnailRatio === 'inherit' && image.width && image.height ) ? ( ( image.height / image.width ) * 100 ) + '%' : undefined ) } }><img src={ image.thumbUrl || image.url } width={ image.width } height={ image.height } alt={ image.alt } data-full-image={ image.url } data-light-image={ image.lightUrl } data-id={ image.id } data-link={ image.link } data-custom-link={ image.customLink } data-custom-link-target={ image.linkTarget } className={ image.id ? `wp-image-${ image.id }` : null } /></div>;
				const figClassName = classnames( {
					'bsb-gallery-thumb-figure': true,
					[ `bsb-has-image-ratio-${ thumbnailRatio }` ]: thumbnailRatio && ( type === 'grid' || type === 'carousel' || type === 'slider' || type === 'thumbslider' ),
				} );
				const imgPack = (
					<Fragment>
						<div className="bsb-gal-image-radius" style={ {
							maxWidth: ( ( type === 'masonry' && image.width && image.height ) || ( ( type === 'grid' || type === 'carousel' || type === 'slider' || type === 'thumbslider' ) && thumbnailRatio === 'inherit' && image.width && image.height ) ? image.width + 'px' : undefined ),
						} }>
							{ img }
						</div>
					</Fragment>
				);
				return (
					<li key={ image.id || image.url } className="base-blocks-gallery-thumb-item">
						<div className="base-blocks-gallery-thumb-item-inner">
							<figure className={ figClassName }>
								{ imgPack }
							</figure>
						</div>
					</li>
				);
			};
			const renderGalleryImages = ( image ) => {
				let href;
				switch ( linkTo ) {
					case 'media':
						href = image.lightUrl || image.url;
						break;
					case 'custom':
						href = ( image.customLink ? image.customLink : '' );
						break;
					case 'attachment':
						href = image.link;
						break;
				}
				const imgContainClassName = classnames( {
					'bsb-gallery-image-contain': true,
					'base-blocks-gallery-intrinsic': ( ( ( type === 'grid' || type === 'carousel' || type === 'slider' || type === 'thumbslider' ) && imageRatio ) || ( type !== 'fluidcarousel' && type !== 'tiles' && image.width && image.height ) ),
					[ `bsb-gallery-image-ratio-${ imageRatio }` ]: imageRatio && ( type === 'grid' || type === 'carousel' || type === 'slider' || type === 'thumbslider' ),
				} );
				const img = <div className={ imgContainClassName } style={ { paddingBottom: ( ( ( type !== 'grid' && type !== 'carousel' && type !== 'fluidcarousel' && type !== 'tiles' && type !== 'slider' && type !== 'thumbslider' ) && image.width && image.height ) || ( type === 'grid' && imageRatio === 'inherit' && image.width && image.height ) ? ( ( image.height / image.width ) * 100 ) + '%' : undefined ) } }><img src={ image.thumbUrl || image.url } width={ image.width } height={ image.height } alt={ image.alt } data-full-image={ image.url } data-light-image={ image.lightUrl } data-id={ image.id } data-link={ image.link } data-custom-link={ image.customLink } data-custom-link-target={ image.linkTarget } className={ `${ ( image.id ? `wp-image-${ image.id }` : undefined ) }${ ( type === 'carousel' || type === 'fluidcarousel' || type === 'tiles' || type === 'slider' || type === 'thumbslider' ? ' skip-lazy' : undefined ) }` } /></div>;
				const figClassName = classnames( {
					'bsb-gallery-figure': true,
					'bsb-gallery-item-has-link': href,
					'base-blocks-gallery-item-has-caption': showCaption && ( image.caption && image.caption.length > 0 ),
					'base-blocks-gallery-item-hide-caption': ! showCaption,
					[ `bsb-has-image-ratio-${ imageRatio }` ]: imageRatio && ( type === 'grid' || type === 'carousel' || type === 'slider' || type === 'thumbslider' ),
				} );
				const figcap = (
					<RichText.Content
						className="base-blocks-gallery-item__caption"
						tagName="figcaption"
						value={ image.caption }
					/>
				);
				const imgPack = (
					<Fragment>
						<div className="bsb-gal-image-radius" style={ {
							maxWidth: ( ( type === 'masonry' && image.width && image.height ) || ( ( type === 'grid' || type === 'carousel' || type === 'slider' || type === 'thumbslider' ) && imageRatio === 'inherit' && image.width && image.height ) ? image.width + 'px' : undefined ),
						} }>
							{ img }
							{ ( image.caption && image.caption.length > 0 ) && 'below' !== captionStyle && (
								figcap
							) }
						</div>
						{ ( image.caption && image.caption.length > 0 ) && 'below' === captionStyle && (
							figcap
						) }
					</Fragment>
				);
				return (
					<li key={ image.id || image.url } className="base-blocks-gallery-item">
						<div className="base-blocks-gallery-item-inner">
							<figure className={ figClassName }>
								{ href ? <a href={ href } className="bsb-gallery-item-link" target={ ( linkTo === 'custom' && image.linkTarget === '_blank' ) || ( linkTo === 'media' && lightbox === 'new_tab' ) ? '_blank' : undefined } rel={ ( linkTo === 'custom' && '_blank' === image.linkTarget ? 'noopener noreferrer' : undefined ) } >{ imgPack }</a> : imgPack }
							</figure>
						</div>
					</li>
				);
			};
			return (
				<div className={ `bsb-gallery-wrap-id-${ uniqueID }` }>
					{ type === 'carousel' && (
						<div
							className={ galleryClassNames }
							data-image-filter={ imageFilter }
							data-lightbox-caption={ ( lightboxCaption ? 'true' : false ) }
						>
							<div className={ `bst-blocks-carousel bst-carousel-container-dotstyle-${ dotStyle }` }>
								<div className={ `bst-blocks-carousel-init bsb-gallery-carousel bst-carousel-arrowstyle-${ arrowStyle } bst-carousel-dotstyle-${ dotStyle }` } data-columns-xxl={ columns[ 0 ] } data-columns-xl={ columns[ 1 ] } data-columns-md={ columns[ 2 ] } data-columns-sm={ columns[ 3 ] } data-columns-xs={ columns[ 4 ] } data-columns-ss={ columns[ 5 ] } data-slider-anim-speed={ transSpeed } data-slider-scroll={ slidesScroll } data-slider-arrows={ ( 'none' === arrowStyle ? false : true ) } data-slider-dots={ ( 'none' === dotStyle ? false : true ) } data-slider-hover-pause="false" data-slider-auto={ autoPlay } data-slider-speed={ autoSpeed }>
									{ images.map( ( image, index ) => (
										<div className="bsb-slide-item bsb-gallery-carousel-item" key={ index }>
											{ renderGalleryImages( image ) }
										</div>
									) ) }
								</div>
							</div>
						</div>
					) }
					{ type === 'fluidcarousel' && (
						<div
							className={ galleryClassNames }
							data-image-filter={ imageFilter }
							data-lightbox-caption={ ( lightboxCaption ? 'true' : false ) }
						>
							<div className={ `bst-blocks-carousel bst-carousel-container-dotstyle-${ dotStyle }` }>
								<div className={ `bst-blocks-carousel-init bsb-blocks-fluid-carousel bst-carousel-arrowstyle-${ arrowStyle } bst-carousel-dotstyle-${ dotStyle }${ ( carouselAlign === false ? ' bsb-carousel-mode-align-left' : '' ) }` } data-slider-anim-speed={ transSpeed } data-slider-type="fluidcarousel" data-slider-scroll="1" data-slider-arrows={ ( 'none' === arrowStyle ? false : true ) } data-slider-dots={ ( 'none' === dotStyle ? false : true ) } data-slider-hover-pause="false" data-slider-auto={ autoPlay } data-slider-speed={ autoSpeed } data-slider-center-mode={ ( carouselAlign === false ? 'false' : undefined ) }>
									{ images.map( ( image, index ) => (
										<div className="bsb-slide-item bsb-gallery-carousel-item" key={ index }>
											{ renderGalleryImages( image ) }
										</div>
									) ) }
								</div>
							</div>
						</div>
					) }
					{ type === 'slider' && (
						<div
							className={ galleryClassNames }
							data-image-filter={ imageFilter }
							data-lightbox-caption={ ( lightboxCaption ? 'true' : false ) }
						>
							<div className={ `bst-blocks-carousel bst-carousel-container-dotstyle-${ dotStyle }` }>
								<div className={ `bst-blocks-carousel-init bsb-blocks-slider bst-carousel-arrowstyle-${ arrowStyle } bst-carousel-dotstyle-${ dotStyle }` } data-slider-anim-speed={ transSpeed } data-slider-type="slider" data-slider-scroll="1" data-slider-arrows={ ( 'none' === arrowStyle ? false : true ) } data-slider-dots={ ( 'none' === dotStyle ? false : true ) } data-slider-hover-pause="false" data-slider-auto={ autoPlay } data-slider-speed={ autoSpeed }>
									{ images.map( ( image, index ) => (
										<div className="bsb-slide-item bsb-gallery-slide-item" key={ index }>
											{ renderGalleryImages( image ) }
										</div>
									) ) }
								</div>
							</div>
						</div>
					) }
					{ type === 'thumbslider' && (
						<div
							className={ galleryClassNames }
							data-image-filter={ imageFilter }
							data-lightbox-caption={ ( lightboxCaption ? 'true' : false ) }
						>
							<div className={ 'bst-blocks-carousel bst-carousel-container-dotstyle-none' }>
								<div id={ `bsb-slider-${ uniqueID }` } className={ `bst-blocks-carousel-init bsb-gallery-carousel bst-carousel-arrowstyle-${ arrowStyle } bst-carousel-dotstyle-none` } data-columns-xxl={ thumbnailColumns[ 0 ] } data-columns-xl={ thumbnailColumns[ 1 ] } data-columns-md={ thumbnailColumns[ 2 ] } data-columns-sm={ thumbnailColumns[ 3 ] } data-columns-xs={ thumbnailColumns[ 4 ] } data-columns-ss={ thumbnailColumns[ 5 ] } data-slider-anim-speed={ transSpeed } data-slider-type="thumbnail" data-slider-nav={ `bsb-thumb-slider-${ uniqueID }` } data-slider-scroll={ slidesScroll } data-slider-arrows={ ( 'none' === arrowStyle ? false : true ) } data-slider-dots={ false } data-slider-hover-pause="false" data-slider-auto={ autoPlay } data-slider-speed={ autoSpeed }>
									{ images.map( ( image, index ) => (
										<div className="bsb-slide-item bsb-gallery-carousel-item" key={ index }>
											{ renderGalleryImages( image ) }
										</div>
									) ) }
								</div>
								<div id={ `bsb-thumb-slider-${ uniqueID }` } className={ `bsb-gallery-carousel bsb-gallery-slider-thumbnails bst-carousel-arrowstyle-${ arrowStyle } bst-carousel-dotstyle-none` } data-slider-anim-speed={ transSpeed } data-slider-type="thumbnail" data-slider-nav={ `bsb-slider-${ uniqueID }` } data-slider-scroll={ slidesScroll } data-slider-arrows={ ( 'none' === arrowStyle ? false : true ) } data-slider-dots={ false } data-slider-hover-pause="false" data-slider-auto={ autoPlay } data-slider-speed={ autoSpeed }>
									{ images.map( ( image, index ) => (
										<div className="bsb-slide-item bsb-gallery-carousel-item" key={ index }>
											{ renderThumbImages( image ) }
										</div>
									) ) }
								</div>
							</div>
						</div>
					) }
					{ ( type === 'tiles' ) && (
						<ul
							className={ galleryClassNames }
							data-image-filter={ imageFilter }
							data-lightbox-caption={ ( lightboxCaption ? 'true' : false ) }
						>
							{ images.map( ( image ) => {
								return renderGalleryImages( image );
							} ) }
						</ul>
					) }
					{ ( type === 'masonry' || type === 'grid' ) && (
						<ul
							className={ galleryClassNames }
							data-item-selector=".base-blocks-gallery-item"
							data-image-filter={ imageFilter }
							data-lightbox-caption={ ( lightboxCaption ? 'true' : false ) }
							data-columns-xxl={ columns[ 0 ] }
							data-columns-xl={ columns[ 1 ] }
							data-columns-lg={ columns[ 2 ] }
							data-columns-md={ columns[ 3 ] }
							data-columns-sm={ columns[ 4 ] }
							data-columns-xs={ columns[ 5 ] }
						>
							{ images.map( ( image ) => {
								return renderGalleryImages( image );
							} ) }
						</ul>
					) }
				</div>
			);
		},
	},
	{
		attributes: {
			uniqueID: {
				type: 'string',
			},
			columns: {
				type: 'array',
				default: [ 3, 3, 3, 2, 1, 1 ],
			},
			columnControl: {
				type: 'string',
				default: 'linked',
			},
			images: {
				type: 'array',
				default: [],
				source: 'query',
				selector: '.base-blocks-gallery-item',
				query: {
					url: {
						source: 'attribute',
						selector: 'img',
						attribute: 'data-full-image',
					},
					thumbUrl: {
						source: 'attribute',
						selector: 'img',
						attribute: 'src',
					},
					lightUrl: {
						source: 'attribute',
						selector: 'img',
						attribute: 'data-light-image',
					},
					link: {
						source: 'attribute',
						selector: 'img',
						attribute: 'data-link',
					},
					customLink: {
						source: 'attribute',
						selector: 'img',
						attribute: 'data-custom-link',
					},
					linkTarget: {
						source: 'attribute',
						selector: 'img',
						attribute: 'data-custom-link-target',
					},
					width: {
						source: 'attribute',
						selector: 'img',
						attribute: 'width',
					},
					height: {
						source: 'attribute',
						selector: 'img',
						attribute: 'height',
					},
					alt: {
						source: 'attribute',
						selector: 'img',
						attribute: 'alt',
						default: '',
					},
					id: {
						source: 'attribute',
						selector: 'img',
						attribute: 'data-id',
					},
					caption: {
						type: 'string',
						source: 'html',
						selector: 'figcaption',
					},
				},
			},
			lightSize: {
				type: 'string',
				default: 'full',
			},
			thumbSize: {
				type: 'string',
				default: 'large',
			},
			ids: {
				type: 'array',
			},
			type: {
				type: 'string',
				default: 'masonry',
			},
			imageRatio: {
				type: 'string',
				default: 'land32',
			},
			linkTo: {
				type: 'string',
				default: 'none',
			},
			showCaption: {
				type: 'boolean',
				default: false,
			},
			hoverStyle: {
				type: 'string',
				default: 'dark',
			},
			captionStyle: {
				type: 'string',
				default: 'bottom-hover',
			},
			captionStyles: {
				type: 'array',
				default: [ {
					size: [ '', '', '' ],
					sizeType: 'px',
					lineHeight: [ '', '', '' ],
					lineType: 'px',
					letterSpacing: '',
					textTransform: '',
					family: '',
					google: false,
					style: '',
					weight: '',
					variant: '',
					subset: '',
					loadGoogle: true,
					color: '',
					background: '#000000',
					backgroundOpacity: 0.5,
				} ],
			},
			captionAlignment: {
				type: 'string',
				default: 'center',
			},
			gutter: {
				type: 'array',
				default: [ 10, '', '' ],
			},
			carouselHeight: {
				type: 'array',
				default: [ 300, '', '' ],
			},
			imageRadius: {
				type: 'array',
				default: [ 0, 0, 0, 0 ],
			},
			autoPlay: {
				type: 'boolean',
				default: false,
			},
			autoSpeed: {
				type: 'number',
				default: 7000,
			},
			transSpeed: {
				type: 'number',
				default: 400,
			},
			slidesScroll: {
				type: 'string',
				default: '1',
			},
			arrowStyle: {
				type: 'string',
				default: 'whiteondark',
			},
			dotStyle: {
				type: 'string',
				default: 'dark',
			},
			displayShadow: {
				type: 'boolean',
				default: false,
			},
			shadow: {
				type: 'array',
				default: [ {
					color: '#000000',
					opacity: 0.2,
					spread: 0,
					blur: 14,
					hOffset: 4,
					vOffset: 2,
				} ],
			},
			shadowHover: {
				type: 'array',
				default: [ {
					color: '#000000',
					opacity: 0.2,
					spread: 0,
					blur: 14,
					hOffset: 4,
					vOffset: 2,
				} ],
			},
			imageFilter: {
				type: 'string',
				default: 'none',
			},
			lightbox: {
				type: 'string',
				default: 'none',
			},
			lightboxCaption: {
				type: 'boolean',
				default: true,
			},
			margin: {
				type: 'array',
				default: [ {
					desk: [ '', '', '', '' ],
					tablet: [ '', '', '', '' ],
					mobile: [ '', '', '', '' ],
				} ],
			},
			marginUnit: {
				type: 'string',
				default: 'px',
			},
			carouselAlign: {
				type: 'boolean',
				default: true,
			},
			thumbnailRatio: {
				type: 'string',
				default: 'land32',
			},
			thumbnailColumns: {
				type: 'array',
				default: [ 4, 4, 4, 4, 4, 4 ],
			},
			thumbnailControl: {
				type: 'string',
				default: 'linked',
			},
		},
		save: ( { attributes } ) => {
			const { uniqueID, images, columns, type, linkTo, showCaption, captionStyle, imageRatio, imageFilter, lightbox, lightboxCaption, dotStyle, transSpeed, slidesScroll, autoPlay, arrowStyle, autoSpeed, carouselAlign, thumbnailColumns, thumbnailRatio } = attributes;
			const galleryClassNames = classnames(
				{
					'bsb-gallery-ul': true,
					[ `bsb-gallery-type-${ type }` ]: type,
					'bsb-masonry-init': ( 'masonry' === type ),
					[ `bsb-gallery-id-${ uniqueID }` ]: uniqueID,
					[ `bsb-gallery-caption-style-${ captionStyle }` ]: captionStyle,
					[ `bsb-gallery-filter-${ imageFilter }` ]: imageFilter,
					'bsb-gallery-magnific-init': linkTo === 'media' && lightbox === 'magnific',
				}
			);
			const renderThumbImages = ( image ) => {
				const imgContainClassName = classnames( {
					'bsb-gallery-image-contain': true,
					'base-blocks-gallery-intrinsic': ( ( ( type === 'grid' || type === 'carousel' || type === 'slider' || type === 'thumbslider' ) && imageRatio ) || ( type !== 'fluidcarousel' && type !== 'tiles' && image.width && image.height ) ),
					[ `bsb-gallery-image-ratio-${ thumbnailRatio }` ]: thumbnailRatio && ( type === 'grid' || type === 'carousel' || type === 'slider' || type === 'thumbslider' ),
				} );
				const img = <div className={ imgContainClassName } style={ { paddingBottom: ( ( ( type !== 'grid' && type !== 'carousel' && type !== 'fluidcarousel' && type !== 'tiles' && type !== 'slider' && type !== 'thumbslider' ) && image.width && image.height ) || ( type === 'grid' && thumbnailRatio === 'inherit' && image.width && image.height ) ? ( ( image.height / image.width ) * 100 ) + '%' : undefined ) } }><img src={ image.thumbUrl || image.url } width={ image.width } height={ image.height } alt={ image.alt } data-full-image={ image.url } data-light-image={ image.lightUrl } data-id={ image.id } data-link={ image.link } data-custom-link={ image.customLink } data-custom-link-target={ image.linkTarget } className={ image.id ? `wp-image-${ image.id }` : null } /></div>;
				const figClassName = classnames( {
					'bsb-gallery-thumb-figure': true,
					[ `bsb-has-image-ratio-${ thumbnailRatio }` ]: thumbnailRatio && ( type === 'grid' || type === 'carousel' || type === 'slider' || type === 'thumbslider' ),
				} );
				const imgPack = (
					<Fragment>
						<div className="bsb-gal-image-radius" style={ {
							maxWidth: ( ( type === 'masonry' && image.width && image.height ) || ( ( type === 'grid' || type === 'carousel' || type === 'slider' || type === 'thumbslider' ) && thumbnailRatio === 'inherit' && image.width && image.height ) ? image.width + 'px' : undefined ),
						} }>
							{ img }
						</div>
					</Fragment>
				);
				return (
					<li key={ image.id || image.url } className="base-blocks-gallery-thumb-item">
						<div className="base-blocks-gallery-thumb-item-inner">
							<figure className={ figClassName }>
								{ imgPack }
							</figure>
						</div>
					</li>
				);
			};
			const renderGalleryImages = ( image ) => {
				let href;
				switch ( linkTo ) {
					case 'media':
						href = image.lightUrl || image.url;
						break;
					case 'custom':
						href = ( image.customLink ? image.customLink : '' );
						break;
					case 'attachment':
						href = image.link;
						break;
				}
				const imgContainClassName = classnames( {
					'bsb-gallery-image-contain': true,
					'base-blocks-gallery-intrinsic': ( ( ( type === 'grid' || type === 'carousel' || type === 'slider' || type === 'thumbslider' ) && imageRatio ) || ( type !== 'fluidcarousel' && type !== 'tiles' && image.width && image.height ) ),
					[ `bsb-gallery-image-ratio-${ imageRatio }` ]: imageRatio && ( type === 'grid' || type === 'carousel' || type === 'slider' || type === 'thumbslider' ),
				} );
				const img = <div className={ imgContainClassName } style={ { paddingBottom: ( ( ( type !== 'grid' && type !== 'carousel' && type !== 'fluidcarousel' && type !== 'tiles' && type !== 'slider' && type !== 'thumbslider' ) && image.width && image.height ) || ( type === 'grid' && imageRatio === 'inherit' && image.width && image.height ) ? ( ( image.height / image.width ) * 100 ) + '%' : undefined ) } }><img src={ image.thumbUrl || image.url } width={ image.width } height={ image.height } alt={ image.alt } data-full-image={ image.url } data-light-image={ image.lightUrl } data-id={ image.id } data-link={ image.link } data-custom-link={ image.customLink } data-custom-link-target={ image.linkTarget } className={ image.id ? `wp-image-${ image.id }` : null } /></div>;
				const figClassName = classnames( {
					'bsb-gallery-figure': true,
					'bsb-gallery-item-has-link': href,
					'base-blocks-gallery-item-has-caption': showCaption && ( image.caption && image.caption.length > 0 ),
					'base-blocks-gallery-item-hide-caption': ! showCaption,
					[ `bsb-has-image-ratio-${ imageRatio }` ]: imageRatio && ( type === 'grid' || type === 'carousel' || type === 'slider' || type === 'thumbslider' ),
				} );
				const figcap = (
					<RichText.Content
						className="base-blocks-gallery-item__caption"
						tagName="figcaption"
						value={ image.caption }
					/>
				);
				const imgPack = (
					<Fragment>
						<div className="bsb-gal-image-radius" style={ {
							maxWidth: ( ( type === 'masonry' && image.width && image.height ) || ( ( type === 'grid' || type === 'carousel' || type === 'slider' || type === 'thumbslider' ) && imageRatio === 'inherit' && image.width && image.height ) ? image.width + 'px' : undefined ),
						} }>
							{ img }
							{ ( image.caption && image.caption.length > 0 ) && 'below' !== captionStyle && (
								figcap
							) }
						</div>
						{ ( image.caption && image.caption.length > 0 ) && 'below' === captionStyle && (
							figcap
						) }
					</Fragment>
				);
				return (
					<li key={ image.id || image.url } className="base-blocks-gallery-item">
						<div className="base-blocks-gallery-item-inner">
							<figure className={ figClassName }>
								{ href ? <a href={ href } className="bsb-gallery-item-link" target={ ( linkTo === 'custom' && image.linkTarget === '_blank' ) || ( linkTo === 'media' && lightbox === 'new_tab' ) ? '_blank' : undefined } rel={ ( linkTo === 'custom' && '_blank' === image.linkTarget ? 'noopener noreferrer' : undefined ) } >{ imgPack }</a> : imgPack }
							</figure>
						</div>
					</li>
				);
			};
			return (
				<div className={ `bsb-gallery-wrap-id-${ uniqueID }` }>
					{ type === 'carousel' && (
						<div
							className={ galleryClassNames }
							data-image-filter={ imageFilter }
							data-lightbox-caption={ ( lightboxCaption ? 'true' : false ) }
						>
							<div className={ `bst-blocks-carousel bst-carousel-container-dotstyle-${ dotStyle }` }>
								<div className={ `bst-blocks-carousel-init bsb-gallery-carousel bst-carousel-arrowstyle-${ arrowStyle } bst-carousel-dotstyle-${ dotStyle }` } data-columns-xxl={ columns[ 0 ] } data-columns-xl={ columns[ 1 ] } data-columns-md={ columns[ 2 ] } data-columns-sm={ columns[ 3 ] } data-columns-xs={ columns[ 4 ] } data-columns-ss={ columns[ 5 ] } data-slider-anim-speed={ transSpeed } data-slider-scroll={ slidesScroll } data-slider-arrows={ ( 'none' === arrowStyle ? false : true ) } data-slider-dots={ ( 'none' === dotStyle ? false : true ) } data-slider-hover-pause="false" data-slider-auto={ autoPlay } data-slider-speed={ autoSpeed }>
									{ images.map( ( image, index ) => (
										<div className="bsb-slide-item bsb-gallery-carousel-item" key={ index }>
											{ renderGalleryImages( image ) }
										</div>
									) ) }
								</div>
							</div>
						</div>
					) }
					{ type === 'fluidcarousel' && (
						<div
							className={ galleryClassNames }
							data-image-filter={ imageFilter }
							data-lightbox-caption={ ( lightboxCaption ? 'true' : false ) }
						>
							<div className={ `bst-blocks-carousel bst-carousel-container-dotstyle-${ dotStyle }` }>
								<div className={ `bst-blocks-carousel-init bsb-blocks-fluid-carousel bst-carousel-arrowstyle-${ arrowStyle } bst-carousel-dotstyle-${ dotStyle }${ ( carouselAlign === false ? ' bsb-carousel-mode-align-left' : '' ) }` } data-slider-anim-speed={ transSpeed } data-slider-type="fluidcarousel" data-slider-scroll="1" data-slider-arrows={ ( 'none' === arrowStyle ? false : true ) } data-slider-dots={ ( 'none' === dotStyle ? false : true ) } data-slider-hover-pause="false" data-slider-auto={ autoPlay } data-slider-speed={ autoSpeed } data-slider-center-mode={ ( carouselAlign === false ? 'false' : undefined ) }>
									{ images.map( ( image, index ) => (
										<div className="bsb-slide-item bsb-gallery-carousel-item" key={ index }>
											{ renderGalleryImages( image ) }
										</div>
									) ) }
								</div>
							</div>
						</div>
					) }
					{ type === 'slider' && (
						<div
							className={ galleryClassNames }
							data-image-filter={ imageFilter }
							data-lightbox-caption={ ( lightboxCaption ? 'true' : false ) }
						>
							<div className={ `bst-blocks-carousel bst-carousel-container-dotstyle-${ dotStyle }` }>
								<div className={ `bst-blocks-carousel-init bsb-blocks-slider bst-carousel-arrowstyle-${ arrowStyle } bst-carousel-dotstyle-${ dotStyle }` } data-slider-anim-speed={ transSpeed } data-slider-type="slider" data-slider-scroll="1" data-slider-arrows={ ( 'none' === arrowStyle ? false : true ) } data-slider-dots={ ( 'none' === dotStyle ? false : true ) } data-slider-hover-pause="false" data-slider-auto={ autoPlay } data-slider-speed={ autoSpeed }>
									{ images.map( ( image, index ) => (
										<div className="bsb-slide-item bsb-gallery-slide-item" key={ index }>
											{ renderGalleryImages( image ) }
										</div>
									) ) }
								</div>
							</div>
						</div>
					) }
					{ type === 'thumbslider' && (
						<div
							className={ galleryClassNames }
							data-image-filter={ imageFilter }
							data-lightbox-caption={ ( lightboxCaption ? 'true' : false ) }
						>
							<div className={ 'bst-blocks-carousel bst-carousel-container-dotstyle-none' }>
								<div id={ `bsb-slider-${ uniqueID }` } className={ `bst-blocks-carousel-init bsb-gallery-carousel bst-carousel-arrowstyle-${ arrowStyle } bst-carousel-dotstyle-none` } data-columns-xxl={ thumbnailColumns[ 0 ] } data-columns-xl={ thumbnailColumns[ 1 ] } data-columns-md={ thumbnailColumns[ 2 ] } data-columns-sm={ thumbnailColumns[ 3 ] } data-columns-xs={ thumbnailColumns[ 4 ] } data-columns-ss={ thumbnailColumns[ 5 ] } data-slider-anim-speed={ transSpeed } data-slider-type="thumbnail" data-slider-nav={ `bsb-thumb-slider-${ uniqueID }` } data-slider-scroll={ slidesScroll } data-slider-arrows={ ( 'none' === arrowStyle ? false : true ) } data-slider-dots={ false } data-slider-hover-pause="false" data-slider-auto={ autoPlay } data-slider-speed={ autoSpeed }>
									{ images.map( ( image, index ) => (
										<div className="bsb-slide-item bsb-gallery-carousel-item" key={ index }>
											{ renderGalleryImages( image ) }
										</div>
									) ) }
								</div>
								<div id={ `bsb-thumb-slider-${ uniqueID }` } className={ `bsb-gallery-carousel bsb-gallery-slider-thumbnails bst-carousel-arrowstyle-${ arrowStyle } bst-carousel-dotstyle-none` } data-slider-anim-speed={ transSpeed } data-slider-type="thumbnail" data-slider-nav={ `bsb-slider-${ uniqueID }` } data-slider-scroll={ slidesScroll } data-slider-arrows={ ( 'none' === arrowStyle ? false : true ) } data-slider-dots={ false } data-slider-hover-pause="false" data-slider-auto={ autoPlay } data-slider-speed={ autoSpeed }>
									{ images.map( ( image, index ) => (
										<div className="bsb-slide-item bsb-gallery-carousel-item" key={ index }>
											{ renderThumbImages( image ) }
										</div>
									) ) }
								</div>
							</div>
						</div>
					) }
					{ ( type === 'tiles' ) && (
						<ul
							className={ galleryClassNames }
							data-image-filter={ imageFilter }
							data-lightbox-caption={ ( lightboxCaption ? 'true' : false ) }
						>
							{ images.map( ( image ) => {
								return renderGalleryImages( image );
							} ) }
						</ul>
					) }
					{ ( type === 'masonry' || type === 'grid' ) && (
						<ul
							className={ galleryClassNames }
							data-item-selector=".base-blocks-gallery-item"
							data-image-filter={ imageFilter }
							data-lightbox-caption={ ( lightboxCaption ? 'true' : false ) }
							data-columns-xxl={ columns[ 0 ] }
							data-columns-xl={ columns[ 1 ] }
							data-columns-lg={ columns[ 2 ] }
							data-columns-md={ columns[ 3 ] }
							data-columns-sm={ columns[ 4 ] }
							data-columns-xs={ columns[ 5 ] }
						>
							{ images.map( ( image ) => {
								return renderGalleryImages( image );
							} ) }
						</ul>
					) }
				</div>
			);
		},
	},
	{
		attributes: {
			uniqueID: {
				type: 'string',
			},
			columns: {
				type: 'array',
				default: [ 3, 3, 3, 2, 1, 1 ],
			},
			columnControl: {
				type: 'string',
				default: 'linked',
			},
			images: {
				type: 'array',
				default: [],
				source: 'query',
				selector: '.base-blocks-gallery-item',
				query: {
					url: {
						source: 'attribute',
						selector: 'img',
						attribute: 'data-full-image',
					},
					thumbUrl: {
						source: 'attribute',
						selector: 'img',
						attribute: 'src',
					},
					lightUrl: {
						source: 'attribute',
						selector: 'img',
						attribute: 'data-light-image',
					},
					link: {
						source: 'attribute',
						selector: 'img',
						attribute: 'data-link',
					},
					customLink: {
						source: 'attribute',
						selector: 'img',
						attribute: 'data-custom-link',
					},
					linkTarget: {
						source: 'attribute',
						selector: 'img',
						attribute: 'data-custom-link-target',
					},
					width: {
						source: 'attribute',
						selector: 'img',
						attribute: 'width',
					},
					height: {
						source: 'attribute',
						selector: 'img',
						attribute: 'height',
					},
					alt: {
						source: 'attribute',
						selector: 'img',
						attribute: 'alt',
						default: '',
					},
					id: {
						source: 'attribute',
						selector: 'img',
						attribute: 'data-id',
					},
					caption: {
						type: 'string',
						source: 'html',
						selector: 'figcaption',
					},
				},
			},
			lightSize: {
				type: 'string',
				default: 'full',
			},
			thumbSize: {
				type: 'string',
				default: 'large',
			},
			ids: {
				type: 'array',
			},
			type: {
				type: 'string',
				default: 'masonry',
			},
			imageRatio: {
				type: 'string',
				default: 'land32',
			},
			linkTo: {
				type: 'string',
				default: 'none',
			},
			showCaption: {
				type: 'boolean',
				default: false,
			},
			hoverStyle: {
				type: 'string',
				default: 'dark',
			},
			captionStyle: {
				type: 'string',
				default: 'bottom-hover',
			},
			captionStyles: {
				type: 'array',
				default: [ {
					size: [ '', '', '' ],
					sizeType: 'px',
					lineHeight: [ '', '', '' ],
					lineType: 'px',
					letterSpacing: '',
					textTransform: '',
					family: '',
					google: false,
					style: '',
					weight: '',
					variant: '',
					subset: '',
					loadGoogle: true,
					color: '',
					background: '#000000',
					backgroundOpacity: 0.5,
				} ],
			},
			captionAlignment: {
				type: 'string',
				default: 'center',
			},
			gutter: {
				type: 'array',
				default: [ 10, '', '' ],
			},
			carouselHeight: {
				type: 'array',
				default: [ 300, '', '' ],
			},
			imageRadius: {
				type: 'array',
				default: [ 0, 0, 0, 0 ],
			},
			autoPlay: {
				type: 'boolean',
				default: false,
			},
			autoSpeed: {
				type: 'number',
				default: 7000,
			},
			transSpeed: {
				type: 'number',
				default: 400,
			},
			slidesScroll: {
				type: 'string',
				default: '1',
			},
			arrowStyle: {
				type: 'string',
				default: 'whiteondark',
			},
			dotStyle: {
				type: 'string',
				default: 'dark',
			},
			displayShadow: {
				type: 'boolean',
				default: false,
			},
			shadow: {
				type: 'array',
				default: [ {
					color: '#000000',
					opacity: 0.2,
					spread: 0,
					blur: 14,
					hOffset: 4,
					vOffset: 2,
				} ],
			},
			shadowHover: {
				type: 'array',
				default: [ {
					color: '#000000',
					opacity: 0.2,
					spread: 0,
					blur: 14,
					hOffset: 4,
					vOffset: 2,
				} ],
			},
			imageFilter: {
				type: 'string',
				default: 'none',
			},
			lightbox: {
				type: 'string',
				default: 'none',
			},
			lightboxCaption: {
				type: 'boolean',
				default: true,
			},
			margin: {
				type: 'array',
				default: [ {
					desk: [ '', '', '', '' ],
					tablet: [ '', '', '', '' ],
					mobile: [ '', '', '', '' ],
				} ],
			},
			marginUnit: {
				type: 'string',
				default: 'px',
			},
			carouselAlign: {
				type: 'boolean',
				default: true,
			},
			thumbnailRatio: {
				type: 'string',
				default: 'land32',
			},
			thumbnailColumns: {
				type: 'array',
				default: [ 4, 4, 4, 4, 4, 4 ],
			},
			thumbnailControl: {
				type: 'string',
				default: 'linked',
			},
		},
		save: ( { attributes } ) => {
			const { uniqueID, images, columns, type, linkTo, showCaption, captionStyle, imageRatio, imageFilter, lightbox, lightboxCaption, dotStyle, transSpeed, slidesScroll, autoPlay, arrowStyle, autoSpeed, carouselAlign, thumbnailColumns, thumbnailRatio } = attributes;
			const galleryClassNames = classnames(
				{
					'bsb-gallery-ul': true,
					[ `bsb-gallery-type-${ type }` ]: type,
					'bsb-masonry-init': ( 'masonry' === type ),
					[ `bsb-gallery-id-${ uniqueID }` ]: uniqueID,
					[ `bsb-gallery-caption-style-${ captionStyle }` ]: captionStyle,
					[ `bsb-gallery-filter-${ imageFilter }` ]: imageFilter,
					'bsb-gallery-magnific-init': linkTo === 'media' && lightbox === 'magnific',
				}
			);
			const renderThumbImages = ( image ) => {
				const imgContainClassName = classnames( {
					'bsb-gallery-image-contain': true,
					'base-blocks-gallery-intrinsic': ( ( ( type === 'grid' || type === 'carousel' || type === 'slider' || type === 'thumbslider' ) && imageRatio ) || ( type !== 'fluidcarousel' && type !== 'tiles' && image.width && image.height ) ),
					[ `bsb-gallery-image-ratio-${ thumbnailRatio }` ]: thumbnailRatio && ( type === 'grid' || type === 'carousel' || type === 'slider' || type === 'thumbslider' ),
				} );
				const img = <div className={ imgContainClassName } style={ { paddingBottom: ( ( ( type !== 'grid' && type !== 'carousel' && type !== 'fluidcarousel' && type !== 'tiles' && type !== 'slider' && type !== 'thumbslider' ) && image.width && image.height ) || ( type === 'grid' && thumbnailRatio === 'inherit' && image.width && image.height ) ? ( ( image.height / image.width ) * 100 ) + '%' : undefined ) } }><img src={ image.thumbUrl || image.url } width={ image.width } height={ image.height } alt={ image.alt } data-full-image={ image.url } data-light-image={ image.url } data-id={ image.id } data-link={ image.link } data-custom-link={ image.customLink } data-custom-link-target={ image.linkTarget } className={ image.id ? `wp-image-${ image.id }` : null } /></div>;
				const figClassName = classnames( {
					'bsb-gallery-thumb-figure': true,
					[ `bsb-has-image-ratio-${ thumbnailRatio }` ]: thumbnailRatio && ( type === 'grid' || type === 'carousel' || type === 'slider' || type === 'thumbslider' ),
				} );
				const imgPack = (
					<Fragment>
						<div className="bsb-gal-image-radius" style={ {
							maxWidth: ( ( type === 'masonry' && image.width && image.height ) || ( ( type === 'grid' || type === 'carousel' || type === 'slider' || type === 'thumbslider' ) && thumbnailRatio === 'inherit' && image.width && image.height ) ? image.width + 'px' : undefined ),
						} }>
							{ img }
						</div>
					</Fragment>
				);
				return (
					<li key={ image.id || image.url } className="base-blocks-gallery-thumb-item">
						<div className="base-blocks-gallery-thumb-item-inner">
							<figure className={ figClassName }>
								{ imgPack }
							</figure>
						</div>
					</li>
				);
			};
			const renderGalleryImages = ( image ) => {
				let href;
				switch ( linkTo ) {
					case 'media':
						href = image.url;
						break;
					case 'custom':
						href = ( image.customLink ? image.customLink : '' );
						break;
					case 'attachment':
						href = image.link;
						break;
				}
				const imgContainClassName = classnames( {
					'bsb-gallery-image-contain': true,
					'base-blocks-gallery-intrinsic': ( ( ( type === 'grid' || type === 'carousel' || type === 'slider' || type === 'thumbslider' ) && imageRatio ) || ( type !== 'fluidcarousel' && type !== 'tiles' && image.width && image.height ) ),
					[ `bsb-gallery-image-ratio-${ imageRatio }` ]: imageRatio && ( type === 'grid' || type === 'carousel' || type === 'slider' || type === 'thumbslider' ),
				} );
				const img = <div className={ imgContainClassName } style={ { paddingBottom: ( ( ( type !== 'grid' && type !== 'carousel' && type !== 'fluidcarousel' && type !== 'tiles' && type !== 'slider' && type !== 'thumbslider' ) && image.width && image.height ) || ( type === 'grid' && imageRatio === 'inherit' && image.width && image.height ) ? ( ( image.height / image.width ) * 100 ) + '%' : undefined ) } }><img src={ image.thumbUrl || image.url } width={ image.width } height={ image.height } alt={ image.alt } data-full-image={ image.url } data-light-image={ image.url } data-id={ image.id } data-link={ image.link } data-custom-link={ image.customLink } data-custom-link-target={ image.linkTarget } className={ image.id ? `wp-image-${ image.id }` : null } /></div>;
				const figClassName = classnames( {
					'bsb-gallery-figure': true,
					'bsb-gallery-item-has-link': href,
					'base-blocks-gallery-item-has-caption': showCaption && ( image.caption && image.caption.length > 0 ),
					'base-blocks-gallery-item-hide-caption': ! showCaption,
					[ `bsb-has-image-ratio-${ imageRatio }` ]: imageRatio && ( type === 'grid' || type === 'carousel' || type === 'slider' || type === 'thumbslider' ),
				} );
				const figcap = (
					<RichText.Content
						className="base-blocks-gallery-item__caption"
						tagName="figcaption"
						value={ image.caption }
					/>
				);
				const imgPack = (
					<Fragment>
						<div className="bsb-gal-image-radius" style={ {
							maxWidth: ( ( type === 'masonry' && image.width && image.height ) || ( ( type === 'grid' || type === 'carousel' || type === 'slider' || type === 'thumbslider' ) && imageRatio === 'inherit' && image.width && image.height ) ? image.width + 'px' : undefined ),
						} }>
							{ img }
							{ ( image.caption && image.caption.length > 0 ) && 'below' !== captionStyle && (
								figcap
							) }
						</div>
						{ ( image.caption && image.caption.length > 0 ) && 'below' === captionStyle && (
							figcap
						) }
					</Fragment>
				);
				return (
					<li key={ image.id || image.url } className="base-blocks-gallery-item">
						<div className="base-blocks-gallery-item-inner">
							<figure className={ figClassName }>
								{ href ? <a href={ href } className="bsb-gallery-item-link" target={ linkTo === 'custom' && image.linkTarget === '_blank' ? '_blank' : undefined } rel={ ( linkTo === 'custom' && '_blank' === image.linkTarget ? 'noopener noreferrer' : undefined ) } >{ imgPack }</a> : imgPack }
							</figure>
						</div>
					</li>
				);
			};
			return (
				<div className={ `bsb-gallery-wrap-id-${ uniqueID }` }>
					{ type === 'carousel' && (
						<div
							className={ galleryClassNames }
							data-image-filter={ imageFilter }
							data-lightbox-caption={ ( lightboxCaption ? 'true' : false ) }
						>
							<div className={ `bst-blocks-carousel bst-carousel-container-dotstyle-${ dotStyle }` }>
								<div className={ `bst-blocks-carousel-init bsb-gallery-carousel bst-carousel-arrowstyle-${ arrowStyle } bst-carousel-dotstyle-${ dotStyle }` } data-columns-xxl={ columns[ 0 ] } data-columns-xl={ columns[ 1 ] } data-columns-md={ columns[ 2 ] } data-columns-sm={ columns[ 3 ] } data-columns-xs={ columns[ 4 ] } data-columns-ss={ columns[ 5 ] } data-slider-anim-speed={ transSpeed } data-slider-scroll={ slidesScroll } data-slider-arrows={ ( 'none' === arrowStyle ? false : true ) } data-slider-dots={ ( 'none' === dotStyle ? false : true ) } data-slider-hover-pause="false" data-slider-auto={ autoPlay } data-slider-speed={ autoSpeed }>
									{ images.map( ( image, index ) => (
										<div className="bsb-slide-item bsb-gallery-carousel-item" key={ index }>
											{ renderGalleryImages( image ) }
										</div>
									) ) }
								</div>
							</div>
						</div>
					) }
					{ type === 'fluidcarousel' && (
						<div
							className={ galleryClassNames }
							data-image-filter={ imageFilter }
							data-lightbox-caption={ ( lightboxCaption ? 'true' : false ) }
						>
							<div className={ `bst-blocks-carousel bst-carousel-container-dotstyle-${ dotStyle }` }>
								<div className={ `bst-blocks-carousel-init bsb-blocks-fluid-carousel bst-carousel-arrowstyle-${ arrowStyle } bst-carousel-dotstyle-${ dotStyle }${ ( carouselAlign === false ? ' bsb-carousel-mode-align-left' : '' ) }` } data-slider-anim-speed={ transSpeed } data-slider-type="fluidcarousel" data-slider-scroll="1" data-slider-arrows={ ( 'none' === arrowStyle ? false : true ) } data-slider-dots={ ( 'none' === dotStyle ? false : true ) } data-slider-hover-pause="false" data-slider-auto={ autoPlay } data-slider-speed={ autoSpeed } data-slider-center-mode={ ( carouselAlign === false ? 'false' : undefined ) }>
									{ images.map( ( image, index ) => (
										<div className="bsb-slide-item bsb-gallery-carousel-item" key={ index }>
											{ renderGalleryImages( image ) }
										</div>
									) ) }
								</div>
							</div>
						</div>
					) }
					{ type === 'slider' && (
						<div
							className={ galleryClassNames }
							data-image-filter={ imageFilter }
							data-lightbox-caption={ ( lightboxCaption ? 'true' : false ) }
						>
							<div className={ `bst-blocks-carousel bst-carousel-container-dotstyle-${ dotStyle }` }>
								<div className={ `bst-blocks-carousel-init bsb-blocks-slider bst-carousel-arrowstyle-${ arrowStyle } bst-carousel-dotstyle-${ dotStyle }` } data-slider-anim-speed={ transSpeed } data-slider-type="slider" data-slider-scroll="1" data-slider-arrows={ ( 'none' === arrowStyle ? false : true ) } data-slider-dots={ ( 'none' === dotStyle ? false : true ) } data-slider-hover-pause="false" data-slider-auto={ autoPlay } data-slider-speed={ autoSpeed }>
									{ images.map( ( image, index ) => (
										<div className="bsb-slide-item bsb-gallery-slide-item" key={ index }>
											{ renderGalleryImages( image ) }
										</div>
									) ) }
								</div>
							</div>
						</div>
					) }
					{ type === 'thumbslider' && (
						<div
							className={ galleryClassNames }
							data-image-filter={ imageFilter }
							data-lightbox-caption={ ( lightboxCaption ? 'true' : false ) }
						>
							<div className={ 'bst-blocks-carousel bst-carousel-container-dotstyle-none' }>
								<div id={ `bsb-slider-${ uniqueID }` } className={ `bst-blocks-carousel-init bsb-gallery-carousel bst-carousel-arrowstyle-${ arrowStyle } bst-carousel-dotstyle-none` } data-columns-xxl={ thumbnailColumns[ 0 ] } data-columns-xl={ thumbnailColumns[ 1 ] } data-columns-md={ thumbnailColumns[ 2 ] } data-columns-sm={ thumbnailColumns[ 3 ] } data-columns-xs={ thumbnailColumns[ 4 ] } data-columns-ss={ thumbnailColumns[ 5 ] } data-slider-anim-speed={ transSpeed } data-slider-type="thumbnail" data-slider-nav={ `bsb-thumb-slider-${ uniqueID }` } data-slider-scroll={ slidesScroll } data-slider-arrows={ ( 'none' === arrowStyle ? false : true ) } data-slider-dots={ false } data-slider-hover-pause="false" data-slider-auto={ autoPlay } data-slider-speed={ autoSpeed }>
									{ images.map( ( image, index ) => (
										<div className="bsb-slide-item bsb-gallery-carousel-item" key={ index }>
											{ renderGalleryImages( image ) }
										</div>
									) ) }
								</div>
								<div id={ `bsb-thumb-slider-${ uniqueID }` } className={ `bsb-gallery-carousel bsb-gallery-slider-thumbnails bst-carousel-arrowstyle-${ arrowStyle } bst-carousel-dotstyle-none` } data-slider-anim-speed={ transSpeed } data-slider-type="thumbnail" data-slider-nav={ `bsb-slider-${ uniqueID }` } data-slider-scroll={ slidesScroll } data-slider-arrows={ ( 'none' === arrowStyle ? false : true ) } data-slider-dots={ false } data-slider-hover-pause="false" data-slider-auto={ autoPlay } data-slider-speed={ autoSpeed }>
									{ images.map( ( image, index ) => (
										<div className="bsb-slide-item bsb-gallery-carousel-item" key={ index }>
											{ renderThumbImages( image ) }
										</div>
									) ) }
								</div>
							</div>
						</div>
					) }
					{ ( type === 'tiles' ) && (
						<ul
							className={ galleryClassNames }
							data-image-filter={ imageFilter }
							data-lightbox-caption={ ( lightboxCaption ? 'true' : false ) }
						>
							{ images.map( ( image ) => {
								return renderGalleryImages( image );
							} ) }
						</ul>
					) }
					{ ( type === 'masonry' || type === 'grid' ) && (
						<ul
							className={ galleryClassNames }
							data-item-selector=".base-blocks-gallery-item"
							data-image-filter={ imageFilter }
							data-lightbox-caption={ ( lightboxCaption ? 'true' : false ) }
							data-columns-xxl={ columns[ 0 ] }
							data-columns-xl={ columns[ 1 ] }
							data-columns-lg={ columns[ 2 ] }
							data-columns-md={ columns[ 3 ] }
							data-columns-sm={ columns[ 4 ] }
							data-columns-xs={ columns[ 5 ] }
						>
							{ images.map( ( image ) => {
								return renderGalleryImages( image );
							} ) }
						</ul>
					) }
				</div>
			);
		},
	},
	{
		attributes: {
			uniqueID: {
				type: 'string',
			},
			columns: {
				type: 'array',
				default: [ 3, 3, 3, 2, 1, 1 ],
			},
			columnControl: {
				type: 'string',
				default: 'linked',
			},
			images: {
				type: 'array',
				default: [],
				source: 'query',
				selector: '.base-blocks-gallery-item',
				query: {
					url: {
						source: 'attribute',
						selector: 'img',
						attribute: 'data-full-image',
					},
					thumbUrl: {
						source: 'attribute',
						selector: 'img',
						attribute: 'src',
					},
					lightUrl: {
						source: 'attribute',
						selector: 'img',
						attribute: 'data-light-image',
					},
					link: {
						source: 'attribute',
						selector: 'img',
						attribute: 'data-link',
					},
					customLink: {
						source: 'attribute',
						selector: 'img',
						attribute: 'data-custom-link',
					},
					linkTarget: {
						source: 'attribute',
						selector: 'img',
						attribute: 'data-custom-link-target',
					},
					width: {
						source: 'attribute',
						selector: 'img',
						attribute: 'width',
					},
					height: {
						source: 'attribute',
						selector: 'img',
						attribute: 'height',
					},
					alt: {
						source: 'attribute',
						selector: 'img',
						attribute: 'alt',
						default: '',
					},
					id: {
						source: 'attribute',
						selector: 'img',
						attribute: 'data-id',
					},
					caption: {
						type: 'string',
						source: 'html',
						selector: 'figcaption',
					},
				},
			},
			lightSize: {
				type: 'string',
				default: 'full',
			},
			thumbSize: {
				type: 'string',
				default: 'large',
			},
			ids: {
				type: 'array',
			},
			type: {
				type: 'string',
				default: 'masonry',
			},
			imageRatio: {
				type: 'string',
				default: 'land32',
			},
			linkTo: {
				type: 'string',
				default: 'none',
			},
			showCaption: {
				type: 'boolean',
				default: false,
			},
			hoverStyle: {
				type: 'string',
				default: 'dark',
			},
			captionStyle: {
				type: 'string',
				default: 'bottom-hover',
			},
			captionStyles: {
				type: 'array',
				default: [ {
					size: [ '', '', '' ],
					sizeType: 'px',
					lineHeight: [ '', '', '' ],
					lineType: 'px',
					letterSpacing: '',
					textTransform: '',
					family: '',
					google: false,
					style: '',
					weight: '',
					variant: '',
					subset: '',
					loadGoogle: true,
					color: '',
					background: '#000000',
					backgroundOpacity: 0.5,
				} ],
			},
			captionAlignment: {
				type: 'string',
				default: 'center',
			},
			gutter: {
				type: 'array',
				default: [ 10, '', '' ],
			},
			carouselHeight: {
				type: 'array',
				default: [ 300, '', '' ],
			},
			imageRadius: {
				type: 'array',
				default: [ 0, 0, 0, 0 ],
			},
			autoPlay: {
				type: 'boolean',
				default: false,
			},
			autoSpeed: {
				type: 'number',
				default: 7000,
			},
			transSpeed: {
				type: 'number',
				default: 400,
			},
			slidesScroll: {
				type: 'string',
				default: '1',
			},
			arrowStyle: {
				type: 'string',
				default: 'whiteondark',
			},
			dotStyle: {
				type: 'string',
				default: 'dark',
			},
			displayShadow: {
				type: 'boolean',
				default: false,
			},
			shadow: {
				type: 'array',
				default: [ {
					color: '#000000',
					opacity: 0.2,
					spread: 0,
					blur: 14,
					hOffset: 4,
					vOffset: 2,
				} ],
			},
			shadowHover: {
				type: 'array',
				default: [ {
					color: '#000000',
					opacity: 0.2,
					spread: 0,
					blur: 14,
					hOffset: 4,
					vOffset: 2,
				} ],
			},
			imageFilter: {
				type: 'string',
				default: 'none',
			},
			lightbox: {
				type: 'string',
				default: 'none',
			},
			lightboxCaption: {
				type: 'boolean',
				default: true,
			},
			margin: {
				type: 'array',
				default: [ {
					desk: [ '', '', '', '' ],
					tablet: [ '', '', '', '' ],
					mobile: [ '', '', '', '' ],
				} ],
			},
			marginUnit: {
				type: 'string',
				default: 'px',
			},
			carouselAlign: {
				type: 'boolean',
				default: true,
			},
		},
		save: ( { attributes } ) => {
			const { uniqueID, images, columns, type, linkTo, showCaption, captionStyle, imageRatio, imageFilter, lightbox, lightboxCaption, dotStyle, transSpeed, slidesScroll, autoPlay, arrowStyle, autoSpeed, carouselAlign } = attributes;
			const galleryClassNames = classnames(
				{
					'bsb-gallery-ul': true,
					[ `bsb-gallery-type-${ type }` ]: type,
					'bsb-masonry-init': ( 'masonry' === type ),
					[ `bsb-gallery-id-${ uniqueID }` ]: uniqueID,
					[ `bsb-gallery-caption-style-${ captionStyle }` ]: captionStyle,
					[ `bsb-gallery-filter-${ imageFilter }` ]: imageFilter,
					'bsb-gallery-magnific-init': linkTo === 'media' && lightbox === 'magnific',
				}
			);
			const renderGalleryImages = ( image ) => {
				let href;
				switch ( linkTo ) {
					case 'media':
						href = image.url;
						break;
					case 'custom':
						href = ( image.customLink ? image.customLink : '' );
						break;
					case 'attachment':
						href = image.link;
						break;
				}
				const imgContainClassName = classnames( {
					'bsb-gallery-image-contain': true,
					'base-blocks-gallery-intrinsic': ( ( ( type === 'grid' || type === 'carousel' || type === 'slider' ) && imageRatio ) || ( type !== 'fluidcarousel' && image.width && image.height ) ),
					[ `bsb-gallery-image-ratio-${ imageRatio }` ]: imageRatio && ( type === 'grid' || type === 'carousel' || type === 'slider' ),
				} );
				const img = <div className={ imgContainClassName } style={ { paddingBottom: ( ( ( type !== 'grid' && type !== 'carousel' && type !== 'fluidcarousel' && type !== 'slider' ) && image.width && image.height ) || ( type === 'grid' && imageRatio === 'inherit' && image.width && image.height ) ? ( ( image.height / image.width ) * 100 ) + '%' : undefined ) } }><img src={ image.thumbUrl || image.url } width={ image.width } height={ image.height } alt={ image.alt } data-full-image={ image.url } data-light-image={ image.url } data-id={ image.id } data-link={ image.link } data-custom-link={ image.customLink } data-custom-link-target={ image.linkTarget } className={ image.id ? `wp-image-${ image.id }` : null } /></div>;
				const figClassName = classnames( {
					'bsb-gallery-figure': true,
					'bsb-gallery-item-has-link': href,
					'base-blocks-gallery-item-has-caption': showCaption && ( image.caption && image.caption.length > 0 ),
					'base-blocks-gallery-item-hide-caption': ! showCaption,
					[ `bsb-has-image-ratio-${ imageRatio }` ]: imageRatio && ( type === 'grid' || type === 'carousel' || type === 'slider' ),
				} );
				const figcap = (
					<RichText.Content
						className="base-blocks-gallery-item__caption"
						tagName="figcaption"
						value={ image.caption }
					/>
				);
				const imgPack = (
					<Fragment>
						<div className="bsb-gal-image-radius" style={ {
							maxWidth: ( ( type === 'masonry' && image.width && image.height ) || ( ( type === 'grid' || type === 'carousel' || type === 'slider' ) && imageRatio === 'inherit' && image.width && image.height ) ? image.width + 'px' : undefined ),
						} }>
							{ img }
							{ ( image.caption && image.caption.length > 0 ) && 'below' !== captionStyle && (
								figcap
							) }
						</div>
						{ ( image.caption && image.caption.length > 0 ) && 'below' === captionStyle && (
							figcap
						) }
					</Fragment>
				);
				return (
					<li key={ image.id || image.url } className="base-blocks-gallery-item">
						<div className="base-blocks-gallery-item-inner">
							<figure className={ figClassName }>
								{ href ? <a href={ href } className="bsb-gallery-item-link" target={ linkTo === 'custom' && image.linkTarget === '_blank' ? '_blank' : undefined } rel={ ( linkTo === 'custom' && '_blank' === image.linkTarget ? 'noopener noreferrer' : undefined ) } >{ imgPack }</a> : imgPack }
							</figure>
						</div>
					</li>
				);
			};
			return (
				<div>
					{ type === 'carousel' && (
						<div
							className={ galleryClassNames }
							data-image-filter={ imageFilter }
							data-lightbox-caption={ ( lightboxCaption ? 'true' : false ) }
						>
							<div className={ `bst-blocks-carousel bst-carousel-container-dotstyle-${ dotStyle }` }>
								<div className={ `bst-blocks-carousel-init bsb-gallery-carousel bst-carousel-arrowstyle-${ arrowStyle } bst-carousel-dotstyle-${ dotStyle }` } data-columns-xxl={ columns[ 0 ] } data-columns-xl={ columns[ 1 ] } data-columns-md={ columns[ 2 ] } data-columns-sm={ columns[ 3 ] } data-columns-xs={ columns[ 4 ] } data-columns-ss={ columns[ 5 ] } data-slider-anim-speed={ transSpeed } data-slider-scroll={ slidesScroll } data-slider-arrows={ ( 'none' === arrowStyle ? false : true ) } data-slider-dots={ ( 'none' === dotStyle ? false : true ) } data-slider-hover-pause="false" data-slider-auto={ autoPlay } data-slider-speed={ autoSpeed }>
									{ images.map( ( image, index ) => (
										<div className="bsb-slide-item bsb-gallery-carousel-item" key={ index }>
											{ renderGalleryImages( image ) }
										</div>
									) ) }
								</div>
							</div>
						</div>
					) }
					{ type === 'fluidcarousel' && (
						<div
							className={ galleryClassNames }
							data-image-filter={ imageFilter }
							data-lightbox-caption={ ( lightboxCaption ? 'true' : false ) }
						>
							<div className={ `bst-blocks-carousel bst-carousel-container-dotstyle-${ dotStyle }` }>
								<div className={ `bst-blocks-carousel-init bsb-blocks-fluid-carousel bst-carousel-arrowstyle-${ arrowStyle } bst-carousel-dotstyle-${ dotStyle }${ ( carouselAlign === false ? ' bsb-carousel-mode-align-left' : '' ) }` } data-slider-anim-speed={ transSpeed } data-slider-type="fluidcarousel" data-slider-scroll="1" data-slider-arrows={ ( 'none' === arrowStyle ? false : true ) } data-slider-dots={ ( 'none' === dotStyle ? false : true ) } data-slider-hover-pause="false" data-slider-auto={ autoPlay } data-slider-speed={ autoSpeed } data-slider-center-mode={ ( carouselAlign === false ? 'false' : undefined ) }>
									{ images.map( ( image, index ) => (
										<div className="bsb-slide-item bsb-gallery-carousel-item" key={ index }>
											{ renderGalleryImages( image ) }
										</div>
									) ) }
								</div>
							</div>
						</div>
					) }
					{ type === 'slider' && (
						<div
							className={ galleryClassNames }
							data-image-filter={ imageFilter }
							data-lightbox-caption={ ( lightboxCaption ? 'true' : false ) }
						>
							<div className={ `bst-blocks-carousel bst-carousel-container-dotstyle-${ dotStyle }` }>
								<div className={ `bst-blocks-carousel-init bsb-blocks-slider bst-carousel-arrowstyle-${ arrowStyle } bst-carousel-dotstyle-${ dotStyle }` } data-slider-anim-speed={ transSpeed } data-slider-type="slider" data-slider-scroll="1" data-slider-arrows={ ( 'none' === arrowStyle ? false : true ) } data-slider-dots={ ( 'none' === dotStyle ? false : true ) } data-slider-hover-pause="false" data-slider-auto={ autoPlay } data-slider-speed={ autoSpeed }>
									{ images.map( ( image, index ) => (
										<div className="bsb-slide-item bsb-gallery-slide-item" key={ index }>
											{ renderGalleryImages( image ) }
										</div>
									) ) }
								</div>
							</div>
						</div>
					) }
					{ ( type === 'masonry' || type === 'grid' ) && (
						<ul
							className={ galleryClassNames }
							data-item-selector=".base-blocks-gallery-item"
							data-image-filter={ imageFilter }
							data-lightbox-caption={ ( lightboxCaption ? 'true' : false ) }
							data-columns-xxl={ columns[ 0 ] }
							data-columns-xl={ columns[ 1 ] }
							data-columns-lg={ columns[ 2 ] }
							data-columns-md={ columns[ 3 ] }
							data-columns-sm={ columns[ 4 ] }
							data-columns-xs={ columns[ 5 ] }
						>
							{ images.map( ( image ) => {
								return renderGalleryImages( image );
							} ) }
						</ul>
					) }
				</div>
			);
		},
	},
];