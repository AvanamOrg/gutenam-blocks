/* global GLightbox */
/**
 * File lightbox-init.js.
 * Gets Lightbox working for Base Blocks Gallery
 */

(function() {
	'use strict';
	var baseBlocksGLight = {
		carouselCache: {},
		carouselItem: {},
		lightboxes: {},
		foundClasses: {},
		simulateClick: function (elem) {
			// Create our event (with options)
			var evt = new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
				view: window
			});
			// If cancelled, don't dispatch our event
			!elem.dispatchEvent(evt);
		},
		// checkImage: function( element ) {
		// 	return /(png|jpg|jpeg|gif|tiff|bmp|webp)$/.test(
		// 		element.getAttribute( 'href' ).toLowerCase().split( '?' )[0].split( '#' )[0]
		// 	);
		// },
		handleClones: function( element ) {
			var foundClones = element.querySelectorAll( '.bsb-slide-item.splide__slide--clone a.bsb-gallery-item-link' );
			var foundRegular = element.querySelectorAll( '.bsb-slide-item:not(.splide__slide--clone) a.bsb-gallery-item-link' );
			for ( let c = 0; c < foundClones.length; c++ ) {
				foundClones[c].addEventListener('click', function (event) {
					event.preventDefault();
					var the_href = foundClones[c].getAttribute( 'href' );
					for ( let b = 0; b < foundRegular.length; b++ ) {
						if ( the_href === foundRegular[b].getAttribute( 'href' ) ) {
							baseBlocksGLight.simulateClick( foundRegular[b] );
							break;
						}
					}
				} );
			}
		},
		findGalleries: function() {
			let foundGalleries = document.querySelectorAll( '.bsb-gallery-magnific-init' );
			if ( ! foundGalleries.length ) {
				return;
			}
			if ( foundGalleries ) {
				for ( let i = 0; i < foundGalleries.length; i++ ) {
					let galleryClass = foundGalleries[i].classList;
					let filter = foundGalleries[i].getAttribute( 'data-image-filter' );
					const skin = filter ? 'base-dark bsb-gal-light-filter-' + filter : 'base-dark';
					var showCaption = foundGalleries[ i ].getAttribute( 'data-lightbox-caption' );
					baseBlocksGLight.foundClasses[i] = false;
					for ( let n = 0; n < galleryClass.length; n++ ) {
						if ( galleryClass[ n ].indexOf( 'bsb-gallery-id' ) !== -1 ) {
							baseBlocksGLight.foundClasses[i] = galleryClass[ n ];
							break;
						}
					}
					if ( 'true' == showCaption && ! foundGalleries[i].classList.contains('bsb-gallery-non-static') ) {
						var foundImages = foundGalleries[ i ].querySelectorAll( 'a.bsb-gallery-item-link' );
						for ( let x = 0; x < foundImages.length; x++ ) {
							var caption = foundImages[x].querySelector( '.base-blocks-gallery-item__caption' );
							if ( caption ) {
								foundImages[x].setAttribute( 'data-description', caption.innerText );
							}
						}
					}
					baseBlocksGLight.carouselItem[i] = foundGalleries[i].querySelector( '.bst-blocks-carousel-init' );
					if ( baseBlocksGLight.carouselItem[i] ) {
						if (baseBlocksGLight.carouselItem[i].classList.contains('is-initialized')) {
							baseBlocksGLight.handleClones( baseBlocksGLight.carouselItem[i] );
							if ( baseBlocksGLight.foundClasses[i] ) {
								baseBlocksGLight.lightboxes[i] = new GLightbox({
									selector: '.' + baseBlocksGLight.foundClasses[i] + ' .bsb-slide-item:not(.splide__slide--clone) a.bsb-gallery-item-link:not([target="_blank"])',
									touchNavigation: true,
									skin: skin,
									loop: true,
									openEffect: 'fade',
									closeEffect: 'fade',
									moreText: bsb_glightbox.moreText,
								});
							}
						} else {
							baseBlocksGLight.carouselCache[i] = setInterval(function () {
								if (baseBlocksGLight.carouselItem[i].classList.contains('is-initialized')) {
									baseBlocksGLight.handleClones( baseBlocksGLight.carouselItem[i] );
									baseBlocksGLight.lightboxes[i] = new GLightbox({
										selector: '.' + baseBlocksGLight.foundClasses[i] + ' .bsb-slide-item:not(.splide__slide--clone) a.bsb-gallery-item-link:not([target="_blank"])',
										touchNavigation: true,
										skin: skin,
										loop: true,
										openEffect: 'fade',
										closeEffect: 'fade',
										moreText: bsb_glightbox.moreText,
									});
									clearInterval(baseBlocksGLight.carouselCache[i]);
								} else {
									console.log("waiting to initialize galllery lightbox");
								}
							}, 200);
						}
					} else if ( baseBlocksGLight.foundClasses[i] ) {
						baseBlocksGLight.lightboxes[i] = new GLightbox({
							selector: '.' + baseBlocksGLight.foundClasses[i] + ' a.bsb-gallery-item-link:not([target="_blank"])',
							touchNavigation: true,
							skin: skin,
							loop: true,
							openEffect: 'fade',
							closeEffect: 'fade',
							moreText: bsb_glightbox.moreText,
						});
					}
				}
			}
		},
		/**
		 * Initiate the script to process all
		 */
		initAll: function() {
			baseBlocksGLight.findGalleries();
		},
		// Initiate the menus when the DOM loads.
		init: function() {
			if ( typeof GLightbox == 'function' ) {
				baseBlocksGLight.initAll();
			} else {
				var initLoadDelay = setInterval( function(){ if ( typeof GLightbox == 'function' ) { baseBlocksGLight.initAll(); clearInterval(initLoadDelay); } }, 200 );
			}
		}
	}
	if ( 'loading' === document.readyState ) {
		// The DOM has not yet been loaded.
		document.addEventListener( 'DOMContentLoaded', baseBlocksGLight.init );
	} else {
		// The DOM has already been loaded.
		baseBlocksGLight.init();
	}
})();