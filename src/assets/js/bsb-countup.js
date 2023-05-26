/* global CountUp */
/**
 * File bsb-countup.js.
 * Gets the countup running in viewport.
 */
 ( function() {
	'use strict';
	window.baseCountUp = {
		cache: {},
		countUpItems: {},
		listenerCache: {},
		isInViewport: function(el) {
			const rect = el.getBoundingClientRect();
			return (
				rect.top >= 0 &&
				rect.left >= 0 &&
				rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
				rect.right <= (window.innerWidth || document.documentElement.clientWidth)
		
			);
		},
		initScrollSpy: function() {
			window.baseCountUp.countUpItems = document.querySelectorAll( '.bsb-count-up' );
			if ( ! window.baseCountUp.countUpItems.length ) {
				return;
			}
			for ( let n = 0; n < window.baseCountUp.countUpItems.length; n++ ) {
				let self = window.baseCountUp.countUpItems[n],
					start     = self.dataset.start,
					end       = self.dataset.end,
					prefix     = self.dataset.prefix,
					suffix    = self.dataset.suffix,
					duration  = self.dataset.duration,
					separator = self.dataset.separator,
					decimal   = ( self.dataset.decimal ? self.dataset.decimal : false ),
					decimalSpaces   = ( self.dataset.decimalSpaces ? self.dataset.decimalSpaces : false ),
					el = self.querySelector('.bsb-count-up-process');
				let theSeparator = ( separator === 'true' ? ',' : separator );
				theSeparator = ( theSeparator === 'false' ? '' : theSeparator );
				let bbCounterOptions = {
					startVal: start ? start : 0,
					duration: duration ? duration : 2,
					prefix: prefix ? prefix : '',
					suffix: suffix ? suffix : '',
					separator: theSeparator,
					decimal: decimal,
					decimalPlaces: decimalSpaces,
				};
				window.baseCountUp.cache[n] = new countUp.CountUp( el, end, bbCounterOptions);
				window.baseCountUp.accessabilityModifications( el, end );
				// Initialize listener
				window.baseCountUp.listenerCache[n] = window.baseCountUp.listener( n );
				document.addEventListener( 'scroll', window.baseCountUp.listenerCache[n], { passive: true } );
				window.baseCountUp.startCountUp( n );
			}
		},
		accessabilityModifications( el, end ) {
			var div = document.createElement("div");
			div.classList.add('screen-reader-text');
			div.innerHTML = end;
			el.before(div);
			el.setAttribute("aria-hidden", "true");
		},
		/**
		 * Start Listener.
		 */
		listener: function( index ) {
			return function curried_func( e ) {
				window.baseCountUp.startCountUp( index );
			}
		},
		/**
		 * Start function.
		 */
		startCountUp: function( index ) {
			if ( window.baseCountUp.isInViewport( window.baseCountUp.countUpItems[index] ) ) {
				if ( ! window.baseCountUp.cache[index].error ) {
					window.baseCountUp.cache[index].start();
				}
				document.removeEventListener( 'scroll', window.baseCountUp.listenerCache[index], false );
			}
		},
		// Initiate sticky when the DOM loads.
		init: function() {
			window.baseCountUp.initScrollSpy();
		}
	}
	if ( 'loading' === document.readyState ) {
		// The DOM has not yet been loaded.
		document.addEventListener( 'DOMContentLoaded', window.baseCountUp.init );
	} else {
		// The DOM has already been loaded.
		window.baseCountUp.init();
	}
}() );
