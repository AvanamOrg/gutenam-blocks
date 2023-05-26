/* global base_blocks_countdown */
( function() {
	'use strict';
	window.baseCountdown = {
		cache: {},
		timers: JSON.parse( base_blocks_countdown.timers ),
		createCookie: function( name, value, length, unit ) {
			if ( length ) {
				var date = new Date();
				if ( 'minutes' == unit ) {
					date.setTime( date.getTime() + ( length * 60 * 1000 ) );
				} else if ( 'hours' == unit ) {
					date.setTime( date.getTime() + ( length * 60 * 60 * 1000 ) );
				} else {
					date.setTime( date.getTime()+(length*24*60*60*1000));
				}
				var expires = "; expires="+date.toGMTString();
			} else {
				var expires = "";
			}
	
			document.cookie = base_blocks_countdown.site_slug + '-' + name+"="+value+expires+"; path=/";
		},
		getCookie( name ) {
			var value = "; " + document.cookie;
			var parts = value.split("; " + base_blocks_countdown.site_slug + '-' + name + "=");
			if ( parts.length == 2 ) {
				return parts.pop().split(";").shift();
			}
			return '';
		},
		updateTimerInterval( element, id, parent ) {
			var currentTimeStamp = new Date;
			var total = '';
			if ( window.baseCountdown.timers[ id ].type === 'evergreen' ) {
				//Check for cookie.
				if ( '' !== window.baseCountdown.cache[ id ].cookie ) {
					total = Math.floor( window.baseCountdown.cache[ id ].cookie - currentTimeStamp.getTime() );
				}
				// Check for database storage only for strict.
				if ( ! total && window.baseCountdown.timers[ id ].strict && 'query' === window.baseCountdown.timers[ id ].evergreen ) {
					// remove query so we don't run this twice.
					window.baseCountdown.timers[ id ].evergreen = '';
					window.baseCountdown.cache[ id ].request = new XMLHttpRequest();
					window.baseCountdown.cache[ id ].request.open( 'POST', base_blocks_countdown.ajax_url, true );
					window.baseCountdown.cache[ id ].request.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
					window.baseCountdown.cache[ id ].request.onload = function () {
						if ( this.status >= 200 && this.status < 400 ) {
							// If successful
							window.baseCountdown.cache[ id ].evergreen = parseInt( this.response );
							if ( window.baseCountdown.cache[ id ].evergreen ) {
								total = Math.floor( window.baseCountdown.cache[ id ].evergreen - currentTimeStamp.getTime() );
								window.baseCountdown.createCookie( window.baseCountdown.timers[ id ].campaign_id, window.baseCountdown.cache[ id ].evergreen, 30, 'days' );
								window.baseCountdown.cache[ id ].cookie = window.baseCountdown.cache[ id ].evergreen;
							}
						} else {
							// If fail
							//console.log(this.response);
						}
					};
					window.baseCountdown.cache[ id ].request.onerror = function() {
						// Connection error
					};
					window.baseCountdown.cache[ id ].request.send( 'action=base_get_evergreen&nonce=' + base_blocks_countdown.ajax_nonce + '&site_slug=' + base_blocks_countdown.site_slug + '&reset=' + window.baseCountdown.cache[ id ].reset + '&countdown_id=' + window.baseCountdown.timers[ id ].campaign_id );
				}
				// Check for loaded no cache mode.
				if ( ! total && ! window.baseCountdown.timers[ id ].strict && window.baseCountdown.timers[ id ].evergreen && 'query' !== window.baseCountdown.timers[ id ].evergreen ) {
					total = Math.floor( window.baseCountdown.timers[ id ].evergreen - currentTimeStamp.getTime() );
				}
				// We've set the cache and it's counting.
				if ( ! total && window.baseCountdown.cache[ id ].evergreen ) {
					total = Math.floor( window.baseCountdown.cache[ id ].evergreen - currentTimeStamp.getTime() );
				}
				// Total is negative so past date, let check if we should reset it.
				if ( total && total < 0  ) {
					// check if reset is needed.
					var resetDate = new Date;
					resetDate.setTime( window.baseCountdown.cache[ id ].cookie + ( Math.floor( window.baseCountdown.cache[ id ].reset )*24*60*60*1000 ) );
					var shouldRest = Math.floor( resetDate.getTime() - currentTimeStamp.getTime() );
					if ( shouldRest < 0  ) {
						total = '';
					}
				}
				// total is empty so lets set it, however if we are in strict mode we need to wait for the ajax request.
				if ( ! total && ( ( window.baseCountdown.timers[ id ].strict && window.baseCountdown.cache[ id ].request && window.baseCountdown.cache[ id ].request.readyState && window.baseCountdown.cache[ id ].request.readyState === 4 ) || ! window.baseCountdown.timers[ id ].strict ) ) {
					var newDate = new Date;
					newDate.setTime( newDate.getTime() + ( Math.floor( window.baseCountdown.timers[ id ].hours )*60*60*1000 ) );
					newDate.setTime( newDate.getTime() + ( Math.floor( window.baseCountdown.timers[ id ].minutes )*60*1000 ) );
					window.baseCountdown.cache[ id ].evergreen = newDate.getTime() + 100;
					window.baseCountdown.createCookie( window.baseCountdown.timers[ id ].campaign_id, window.baseCountdown.cache[ id ].evergreen, 30, 'days' );
					total = Math.floor( newDate.getTime() - currentTimeStamp.getTime() );
					var request = new XMLHttpRequest();
					request.open( 'POST', base_blocks_countdown.ajax_url, true );
					request.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
					request.onload = function () {
						if ( this.status >= 200 && this.status < 400 ) {
							// If successful
							//console.log(this.response);
						} else {
							// If fail
							//console.log(this.response);
						}
					};
					request.onerror = function() {
						// Connection error
					};
					request.send( 'action=base_evergreen_timestamp&nonce=' + base_blocks_countdown.ajax_nonce + '&site_slug=' + base_blocks_countdown.site_slug + '&timestamp=' + window.baseCountdown.cache[ id ].evergreen + '&countdown_id=' + window.baseCountdown.timers[ id ].campaign_id );
				}
			} else {
				total = Math.floor( window.baseCountdown.timers[ id ].timestamp - currentTimeStamp.getTime() );
			}
			// Check if completed.
			if ( total && total < 0  ) {
				if ( 'redirect' === window.baseCountdown.timers[ id ].action ) {
					if ( window.baseCountdown.timers[ id ].redirect ) {
						window.location.href = window.baseCountdown.timers[ id ].redirect;
					}
				} else if ( 'hide' === window.baseCountdown.timers[ id ].action ) {
					parent.style.display = 'none';
				} else if ( 'message' === window.baseCountdown.timers[ id ].action ) {
					if ( parent.querySelector( '.bsb-countdown-inner-first' ) ) {
						parent.querySelector( '.bsb-countdown-inner-first' ).style.display = 'none';
					}
					if ( parent.querySelector( '.bsb-countdown-timer' ) ) {
						parent.querySelector( '.bsb-countdown-timer' ).style.display = 'none';
					}
					if ( parent.querySelector( '.bsb-countdown-inner-second' ) ) {
						parent.querySelector( '.bsb-countdown-inner-second' ).style.display = 'none';
					}
					if ( parent.querySelector( '.bsb-countdown-inner-complete' ) ) {
						parent.querySelector( '.bsb-countdown-inner-complete' ).style.display = 'block';
					}
					parent.style.opacity = 1;
					if ( window.baseCountdown.timers[ id ].revealOnLoad ) {
						parent.style.height = parent.scrollHeight+"px";
					}
				} else {
					if ( window.baseCountdown.timers[ id ].timer ) {
						var enableDividers = window.baseCountdown.timers[ id ].dividers;
						var timeNumbers = window.baseCountdown.timers[ id ].stopWatch;
						var units = window.baseCountdown.timers[ id ].units;
						var labels = {};
						labels.days = window.baseCountdown.timers[ id ].daysLabel;
						labels.hours = window.baseCountdown.timers[ id ].hoursLabel;
						labels.minutes = window.baseCountdown.timers[ id ].minutesLabel;
						labels.seconds = window.baseCountdown.timers[ id ].secondsLabel;
						var parts = {};
						if ( undefined !== units && undefined !== units[0] && undefined !== units[0].days && ! units[0].days ) {
							//Do nothing.
							if ( undefined !== units && undefined !== units[0]  && undefined !== units[0].hours && ! units[0].hours ) {
								//Do nothing.
								if ( undefined !== units && undefined !== units[0] && undefined !== units[0].minutes && ! units[0].minutes ) {
									parts.seconds = 0;
								} else {
									parts.minutes = 0;
									parts.seconds = 0;
								}
							} else {
								parts.hours = 0;
								parts.minutes = 0;
								parts.seconds = 0;
							}
						} else {
							parts.days = 0;
							parts.hours = 0;
							parts.minutes = 0;
							parts.seconds = 0;
						}
						var preText = ( window.baseCountdown.timers[ id ].preLabel ? `<div class="bsb-countdown-item bsb-pre-timer"><span class="bsb-pre-timer-inner">${ window.baseCountdown.timers[ id ].preLabel }</span></div>` : '' );
						var postText = ( window.baseCountdown.timers[ id ].postLabel ? `<div class="bsb-countdown-item bsb-post-timer"><span class="bsb-post-timer-inner">${ window.baseCountdown.timers[ id ].postLabel }</span></div>` : '' );
						var remaining = Object.keys(parts).map( ( part ) => {
							if ( 'seconds' !== part && enableDividers ) {
								return `<div class="bsb-countdown-item bsb-countdown-date-item bsb-countdown-date-item-${ part }"><span class="bsb-countdown-number">${  window.baseCountdown.calculateNumberDesign( parts[part], timeNumbers ) }</span><span class="bsb-countdown-label">${ labels[part] }</span></div><div class="bsb-countdown-item bsb-countdown-date-item bsb-countdown-divider-item bsb-countdown-divider-item-${ part }"><span class="bsb-countdown-number">:</span><span class="bsb-countdown-label">&nbsp;</span></div>`;
							}
							return `<div class="bsb-countdown-item bsb-countdown-date-item bsb-countdown-date-item-${ part }"><span class="bsb-countdown-number">${ window.baseCountdown.calculateNumberDesign( parts[part], timeNumbers ) }</span><span class="bsb-countdown-label">${ labels[part] }</span></div>`;
						}).join(" ");
						element.innerHTML = preText + remaining + postText;
					}
					parent.style.opacity = 1;
					if ( window.baseCountdown.timers[ id ].revealOnLoad ) {
						parent.style.height = parent.scrollHeight+"px";
					}
				}
				if ( window.baseCountdown.cache[ id ].interval ) {
					clearInterval( window.baseCountdown.cache[ id ].interval );
				}
				return;
			}
			if ( ( total || 0 === total ) && window.baseCountdown.timers[ id ].timer ) {
				var enableDividers = window.baseCountdown.timers[ id ].dividers;
				var timeNumbers = window.baseCountdown.timers[ id ].stopWatch;
				var units = window.baseCountdown.timers[ id ].units;
				var labels = {};
				labels.days = window.baseCountdown.timers[ id ].daysLabel;
				labels.hours = window.baseCountdown.timers[ id ].hoursLabel;
				labels.minutes = window.baseCountdown.timers[ id ].minutesLabel;
				labels.seconds = window.baseCountdown.timers[ id ].secondsLabel;
				var calculateHours = Math.floor( ( total / ( 1000 * 60 * 60 ) ) % 24 );
				var calculateMinutes = Math.floor( ( total / 1000 / 60) % 60 );
				var calculateSeconds = Math.floor( ( total / 1000 ) % 60 );
				var parts = {};
				if ( undefined !== units && undefined !== units[0] && undefined !== units[0].days && ! units[0].days ) {
					//Do nothing.
					calculateHours = Math.floor( ( total / ( 1000 * 60 * 60 ) ) );
					if ( undefined !== units && undefined !== units[0]  && undefined !== units[0].hours && ! units[0].hours ) {
						//Do nothing.
						calculateMinutes = Math.floor( ( total / 1000 / 60) );
						if ( undefined !== units && undefined !== units[0] && undefined !== units[0].minutes && ! units[0].minutes ) {
							//Do nothing.
							calculateSeconds = Math.floor( ( total / 1000 ) );
							parts.seconds = calculateSeconds;
						} else {
							parts.minutes = calculateMinutes;
							parts.seconds = calculateSeconds;
						}
					} else {
						parts.hours = calculateHours;
						parts.minutes = calculateMinutes;
						parts.seconds = calculateSeconds;
					}
				} else {
					parts.days = Math.floor( total / ( 1000 * 60 * 60 * 24 ) );
					parts.hours = calculateHours;
					parts.minutes = calculateMinutes;
					parts.seconds = calculateSeconds;
				}
				var preText = ( window.baseCountdown.timers[ id ].preLabel ? `<div class="bsb-countdown-item bsb-pre-timer"><span class="bsb-pre-timer-inner">${ window.baseCountdown.timers[ id ].preLabel }</span></div>` : '' );
				var postText = ( window.baseCountdown.timers[ id ].postLabel ? `<div class="bsb-countdown-item bsb-post-timer"><span class="bsb-post-timer-inner">${ window.baseCountdown.timers[ id ].postLabel }</span></div>` : '' );
				var remaining = Object.keys(parts).map( ( part ) => {
					if ( 'seconds' !== part && enableDividers ) {
						return `<div class="bsb-countdown-item bsb-countdown-date-item bsb-countdown-date-item-${ part }"><span class="bsb-countdown-number">${  window.baseCountdown.calculateNumberDesign( parts[part], timeNumbers ) }</span><span class="bsb-countdown-label">${ labels[part] }</span></div><div class="bsb-countdown-item bsb-countdown-date-item bsb-countdown-divider-item bsb-countdown-divider-item-${ part }"><span class="bsb-countdown-number">:</span><span class="bsb-countdown-label">&nbsp;</span></div>`;
					}
					return `<div class="bsb-countdown-item bsb-countdown-date-item bsb-countdown-date-item-${ part }"><span class="bsb-countdown-number">${ window.baseCountdown.calculateNumberDesign( parts[part], timeNumbers ) }</span><span class="bsb-countdown-label">${ labels[part] }</span></div>`;
				}).join(" ");
				element.innerHTML = preText + remaining + postText;
			}
			if ( ( total || 0 === total ) && ! window.baseCountdown.cache[ id ].revealed ) {
				window.baseCountdown.cache[ id ].revealed = true;
				parent.style.opacity = 1;
				if ( window.baseCountdown.timers[ id ].revealOnLoad ) {
					var sticky = parent.closest( '.base-pro-fixed-wrap' );
					if ( sticky && ! window.baseCountdown.timers[ id ].timer ) {
						setTimeout( function(){
							parent.style.height = parent.scrollHeight+"px";
							sticky.style.transition = 'height 0.8s ease';
							sticky.style.height = Math.floor( sticky.scrollHeight + parent.scrollHeight ) + "px";
						}, 200 );
						setTimeout( function(){
							var event = new CustomEvent( 'base-update-sticky' );
							window.dispatchEvent( event );
							sticky.style.transition = '';
						}, 1000 );
					} else {
						parent.style.height = parent.scrollHeight+"px";
					}
				}
			}
		},
		calculateNumberDesign( number, timeNumbers = false ) {
			if ( timeNumbers ) {
				return number > 9 ? "" + number: "0" + number;
			}
			return number;
		},
		updateTimer( element, id, parent ) {
			window.baseCountdown.cache[ id ] = {};
			window.baseCountdown.cache[ id ].evergreen = '';
			window.baseCountdown.cache[ id ].request = '';
			window.baseCountdown.cache[ id ].revealed = false;
			window.baseCountdown.cache[ id ].cookie = '';
			if ( window.baseCountdown.timers[ id ].type === 'evergreen' && window.baseCountdown.timers[ id ].campaign_id ) {
				window.baseCountdown.cache[ id ].cookie = window.baseCountdown.getCookie( window.baseCountdown.timers[ id ].campaign_id );
			}
			window.baseCountdown.updateTimerInterval( element, id, parent );
			window.baseCountdown.cache[ id ].interval = setInterval( function () {
				window.baseCountdown.updateTimerInterval( element, id, parent );
			}, 1000);
		},
		initTimer() {
			var countdowns = document.querySelectorAll( '.bsb-countdown-container' );
			if ( ! countdowns.length ) {
				return;
			}
			for ( var n = 0; n < countdowns.length; n++ ) {
				var id = countdowns[n].getAttribute( 'data-id' );
				if ( id && window.baseCountdown.timers[ id ] ) {
					var el = countdowns[n].querySelector( '.bsb-countdown-timer' );
					window.baseCountdown.updateTimer( el, id, countdowns[n] );
				}
			}
		},
	}
	if ( 'loading' === document.readyState ) {
		// The DOM has not yet been loaded.
		document.addEventListener( 'DOMContentLoaded', window.baseCountdown.initTimer );
	} else {
		// The DOM has already been loaded.
		window.baseCountdown.initTimer();
	}
}() );