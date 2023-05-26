jQuery( document ).ready( function( $ ) {
	// Init Magnific
	$( '.bsb-gallery-magnific-init' ).each( function() {
		var showCaption = $( this ).attr( 'data-lightbox-caption' );
		var filter = $( this ).attr( 'data-image-filter' );
		$( this ).find( 'li.base-blocks-gallery-item a.bsb-gallery-item-link' ).magnificPopup( {
			type: 'image',
			mainClass: 'mfp-bst-blocks bsb-gal-light-filter-' + filter,
			gallery: {
				enabled: true,
			},
			image: {
				titleSrc: function( item ) {
					if ( 'true' == showCaption && item.el.find( '.base-blocks-gallery-item__caption' ).length ) {
						return item.el.find( '.base-blocks-gallery-item__caption' ).html();
					}
					return '';
				},
			},
		} );
		$( this ).find( '.bst-blocks-carousel .bsb-slide-item:not(.slick-cloned) a.bsb-gallery-item-link' ).magnificPopup( {
			type: 'image',
			mainClass: 'mfp-bst-blocks bsb-gal-light-filter-' + filter,
			gallery: {
				enabled: true,
			},
			image: {
				titleSrc: function( item ) {
					if ( 'true' == showCaption && item.el.find( '.base-blocks-gallery-item__caption' ).length ) {
						return item.el.find( '.base-blocks-gallery-item__caption' ).html();
					}
					return '';
				},
			},
		} );
	} );
} );
