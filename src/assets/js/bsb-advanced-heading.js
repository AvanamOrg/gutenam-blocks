let bbAdvHeadingTypedListener = setInterval(function () {

	if (typeof Typed !== 'undefined') {
		clearInterval( bbAdvHeadingTypedListener );

		let bbTypedDefaults = {
			strings: JSON.stringify( [ '' ] ),
			cursorChar : '_',
			startDelay  : 0,
			backDelay: 700,
			typeSpeed: 40,
			backSpeed: 30,
			smartBackspace: false,
			loop: true,
			loopCount: false,
			showCursor: true,
			shuffle: false
		};

		let typedHeadings = document.querySelectorAll('.bst-typed-text');

		typedHeadings.forEach(function(element) {

			let strings = element.getAttribute('data-strings');
			let stringsArray = [];
			let bbTypedSettings = { ...bbTypedDefaults };

			try {
				if (strings) {
					strings = JSON.parse(strings);
				}
			} catch (e) {
				console.log( 'Could decode typed text strings');
			}

			if( !strings ) {
				stringsArray = [];
			} else {
				stringsArray = [ ...strings ];
			}

			stringsArray.unshift( element.textContent );


			bbTypedSettings.strings = stringsArray;

			element.getAttribute('data-cursor-char') ? bbTypedSettings.cursorChar = element.getAttribute('data-cursor-char') : null;
			element.getAttribute('data-cursor-char') === '' ? bbTypedSettings.showCursor = false : null;

			element.getAttribute('data-start-delay') ? bbTypedSettings.startDelay = parseInt( element.getAttribute('data-start-delay') ) : null;
			element.getAttribute('data-back-delay') ? bbTypedSettings.backDelay = parseInt( element.getAttribute('data-back-delay') ) : null;
			element.getAttribute('data-loop') ? bbTypedSettings.loop = ( element.getAttribute('data-loop') === 'true' ) : null;
			element.getAttribute('data-loop-count') ? bbTypedSettings.loopCount = element.getAttribute('data-loop-count') : null;
			element.getAttribute('data-shuffle') ? bbTypedSettings.shuffle = ( element.getAttribute('data-shuffle') === 'true' ) ? true: false : null;

			element.getAttribute('data-type-speed') ? bbTypedSettings.typeSpeed = parseInt( element.getAttribute('data-type-speed') ) : null;
			element.getAttribute('data-back-speed') ? bbTypedSettings.backSpeed = parseInt( element.getAttribute('data-back-speed') ) : null;

			element.getAttribute('data-smart-backspace') ? bbTypedSettings.smartBackspace =  ( element.getAttribute('data-smart-backspace') === 'true' ) : null;
			element.innerHTML = '';

			new Typed(element, bbTypedSettings);
		});

	}
}, 125);
