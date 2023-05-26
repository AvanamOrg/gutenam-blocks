var bbVidForEach = function ( array, callback, scope ) {
	for ( var i = 0; i < array.length; i++ ) {
		callback.call( scope, i, array[i] ); // passes back stuff we need.
	}
};
var pauseBtns = document.getElementsByClassName( 'bsb-background-video-pause' );
bbVidForEach( pauseBtns, function( index, value ) {
	value.addEventListener( 'click', function() {
		var player = this.parentNode.parentNode.getElementsByTagName( 'video' )[ 0 ];
		player.pause();
		this.parentNode.getElementsByClassName( 'bsb-background-video-play' )[ 0 ].style.display = 'inline-block';
		this.parentNode.getElementsByClassName( 'bsb-background-video-play' )[ 0 ].setAttribute( 'aria-hidden', 'false' );
		this.setAttribute( 'aria-hidden', 'true' );
		this.style.display = 'none';
	} );
} );
var playBtns = document.getElementsByClassName( 'bsb-background-video-play' );
bbVidForEach( playBtns, function( index, value ) {
	value.addEventListener( 'click', function() {
		var player = this.parentNode.parentNode.getElementsByTagName( 'video' )[ 0 ];
		player.play();
		this.parentNode.getElementsByClassName( 'bsb-background-video-pause' )[ 0 ].style.display = 'inline-block';
		this.parentNode.getElementsByClassName( 'bsb-background-video-pause' )[ 0 ].setAttribute( 'aria-hidden', 'false' );
		this.setAttribute( 'aria-hidden', 'true' );
		this.style.display = 'none';
	} );
} );
var muteBtns = document.getElementsByClassName( 'bsb-background-video-mute' );
bbVidForEach( muteBtns, function( index, value ) {
	value.addEventListener( 'click', function() {
		var player = this.parentNode.parentNode.getElementsByTagName( 'video' )[ 0 ];
		player.muted = true;
		this.parentNode.getElementsByClassName( 'bsb-background-video-unmute' )[ 0 ].style.display = 'inline-block';
		this.parentNode.getElementsByClassName( 'bsb-background-video-unmute' )[ 0 ].setAttribute( 'aria-hidden', 'false' );
		this.setAttribute( 'aria-hidden', 'true' );
		this.style.display = 'none';
	} );
} );
var unmuteBtns = document.getElementsByClassName( 'bsb-background-video-unmute' );
bbVidForEach( unmuteBtns, function( index, value ) {
	value.addEventListener( 'click', function() {
		var player = this.parentNode.parentNode.getElementsByTagName( 'video' )[ 0 ];
		player.muted = false;
		this.parentNode.getElementsByClassName( 'bsb-background-video-mute' )[ 0 ].style.display = 'inline-block';
		this.parentNode.getElementsByClassName( 'bsb-background-video-mute' )[ 0 ].setAttribute( 'aria-hidden', 'false' );
		this.setAttribute( 'aria-hidden', 'true' );
		this.style.display = 'none';
	} );
} );
