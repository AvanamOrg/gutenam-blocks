/**
 * File kbshowmore.js.
 * Gets the showmore buttons working.
 */
(function () {
    'use strict';
    window.baseShowMore = {
        cache: {},
        initShowMore: function () {
            window.baseShowMore.cache = document.querySelectorAll('.wp-block-base-show-more');
            if (!window.baseShowMore.cache.length) {
                return;
            }
            for (let n = 0; n < window.baseShowMore.cache.length; n++) {
                // Initialize listener (backward support)
                if ( window.baseShowMore.cache[n].querySelector( '.wp-block-base-advancedbtn.bsb-show-more-buttons > .bst-btn-wrap:first-child a' ) ) {
                    window.baseShowMore.cache[n].querySelector( '.wp-block-base-advancedbtn.bsb-show-more-buttons > .bst-btn-wrap:first-child a' ).addEventListener( 'click', function( e ) {
                        e.preventDefault();
                        window.baseShowMore.cache[n].classList.add('bsb-smc-open');
                        return false;
                    });
                    window.baseShowMore.cache[n].querySelector( '.wp-block-base-advancedbtn.bsb-show-more-buttons > .bst-btn-wrap:last-child a' ).addEventListener( 'click', function( e ) {
                        e.preventDefault();
                        window.baseShowMore.cache[n].classList.remove('bsb-smc-open');
                        return false;
                    });
                }
                 // Initialize listener
                 if ( window.baseShowMore.cache[n].querySelector( '.wp-block-base-advancedbtn.bsb-show-more-buttons > .wp-block-base-singlebtn:first-child' ) ) {
                    window.baseShowMore.cache[n].querySelector( '.wp-block-base-advancedbtn.bsb-show-more-buttons > .wp-block-base-singlebtn:first-child' ).addEventListener( 'click', function( e ) {
                        e.preventDefault();
                        window.baseShowMore.cache[n].classList.add('bsb-smc-open');
                        return false;
                    });
                    window.baseShowMore.cache[n].querySelector( '.wp-block-base-advancedbtn.bsb-show-more-buttons > .wp-block-base-singlebtn:last-child' ).addEventListener( 'click', function( e ) {
                        e.preventDefault();
                        window.baseShowMore.cache[n].classList.remove('bsb-smc-open');
                        return false;
                    });
                }
            }
        },
        // Initiate sticky when the DOM loads.
        init: function () {
            window.baseShowMore.initShowMore();
        }
    }
    if ('loading' === document.readyState) {
        // The DOM has not yet been loaded.
        document.addEventListener('DOMContentLoaded', window.baseShowMore.init);
    } else {
        // The DOM has already been loaded.
        window.baseShowMore.init();
    }
    document.addEventListener("baseJSInitReload", function(){
		window.baseShowMore.init();
	});
}());