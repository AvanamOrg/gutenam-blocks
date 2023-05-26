/* global GLightbox */
/**
 * File bsb-glight-video-init.js.
 * Gets video lighbox working for buttons.
 */

(function() {
	'use strict';
	var baseBlocksVideoLightbox = {
		/**
		 * Initiate the script to process all
		 */
		initAll: function( element ) {
			GLightbox({
				selector: '.btblocksvideopop',
				touchNavigation: true,
				skin: 'base-dark',
				loop: false,
				openEffect: 'fade',
				closeEffect: 'fade',
				autoplayVideos: true,
				plyr: {
					css: base_video_pop.plyr_css,
					js: base_video_pop.plyr_js,
					config: {
						hideControls: true,
					}
				}
			});
		},
		// Initiate the menus when the DOM loads.
		init: function() {
			if ( typeof GLightbox == 'function' ) {
				baseBlocksVideoLightbox.initAll();
			} else {
				var initLoadDelay = setInterval( function(){ if ( typeof GLightbox == 'function' ) { baseBlocksVideoLightbox.initAll(); clearInterval(initLoadDelay); } }, 200 );
			}
		}
	}
	if ( 'loading' === document.readyState ) {
		// The DOM has not yet been loaded.
		document.addEventListener( 'DOMContentLoaded', baseBlocksVideoLightbox.init );
	} else {
		// The DOM has already been loaded.
		baseBlocksVideoLightbox.init();
	}
})();
