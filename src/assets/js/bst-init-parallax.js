/**
 * Parallax Background.
 */
var bbjarforEach = function ( array, callback, scope ) {
	for ( var i = 0; i < array.length; i++ ) {
		callback.call( scope, i, array[i] ); // passes back stuff we need.
	}
};
var bbNodeList = document.querySelectorAll( '.bst-jarallax' );
// Setup a timer
var bbjartimeout;
// Listen for resize events
window.addEventListener('resize', function ( event ) {
	// If timer is null, reset it to 66ms and run your functions.
	// Otherwise, wait until timer is cleared
	if ( ! bbjartimeout ) {
		bbjartimeout = setTimeout(function() {
			// Reset timeout
			bbjartimeout = null;
			document.body.style.setProperty( '--bsb-screen-height-fix', ( document.documentElement.clientHeight + 200 ) + 'px' );
		}, 66 );
	}
}, false);
document.body.style.setProperty( '--bsb-screen-height-fix', ( document.documentElement.clientHeight + 200 ) + 'px' );
bbjarforEach( bbNodeList, function( index, value ) {
	jarallax( value, {
		speed: base_blocks_parallax.speed,
		elementInViewport: value,
	} );
} );