/* global SimpleLightbox */
/**
 * File bsb-init-video-popup.js.
 * Gets video lighbox working for buttons.
 */

(function() {
	'use strict';
	var baseBlocksVideoLightbox = {
		/**
		 * Initiate the script to process all
		 */
		initAll: function( element ) {
			new SimpleLightbox({
				elements: document.querySelectorAll('.btblocksvideopop'),
				videoRegex: new RegExp(/youtube.com|youtu.be|youtube-nocookie.com|vimeo.com/)
			});
		},
		// Initiate the menus when the DOM loads.
		init: function() {
			if ( typeof SimpleLightbox == 'function' ) {
				baseBlocksVideoLightbox.initAll();
			} else {
				var initLoadDelay = setInterval( function(){ if ( typeof SimpleLightbox == 'function' ) { baseBlocksVideoLightbox.initAll(); clearInterval(initLoadDelay); } }, 200 );
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
