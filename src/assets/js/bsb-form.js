jQuery( function( $ ) {
	// wc_single_product_params is required to continue.
	if ( typeof base_blocks_form_params === 'undefined' ) {
		return false;
	}
	var base_blocks_form = {
		init: function() {
			$( 'form.bsb-form' ).on( 'submit', this.submit );
		},
		submit: function( e ) {
			e.preventDefault();
			$( 'body' ).trigger( 'bsb-form-start-submit', $(this) );
			var form = $(this),
			submitButton = form.find('input[type=submit]')
			form_data = base_blocks_form.validateForm( form );
			if ( form_data ) {
				// send the request.
				form.parent( '.wp-block-base-form' ).find( '.base-blocks-form-message' ).slideUp( 'fast', function() {
					$(this).remove();
				} );
				form.append('<div class="bsb-form-loading"><div class="bsb-form-loading-spin"><div></div><div></div><div></div><div></div></div></div>' );
				submitButton.attr( 'disabled', 'disabled' ).addClass( 'button-primary-disabled' );

				$.post( base_blocks_form_params.ajaxurl, form_data, function( res ) {
					if ( res.success) {
						$( 'body' ).trigger( 'bsb-form-success', res );
						if ( res.redirect ) {
							window.location = res.redirect;
						} else {
							form.after( res.html );
							//focus
							// $( 'html, body' ).animate( {
							// 	scrollTop: $('.base-blocks-form-message').offset().top - 100
							// }, 'fast' );
							if ( form.find('.g-recaptcha').length > 0 ) {
								grecaptcha.reset();
							}
							base_blocks_form.clearForm( form );
						}
					} else {

						if ( form.find('.g-recaptcha').length > 0 ) {
							grecaptcha.reset();
						}
						form.after( res.data.html );
						if ( res.data.required ) {
							if ( form.find( '#' + res.data.required ).length > 0 ) {
								base_blocks_form.markError( form.find( '#' + res.data.required ), 'required' );
							}
						}
						console.log( res.data.console );
						//console.log( res.data );

						submitButton.removeAttr( 'disabled' );
					}
					submitButton.removeClass( 'button-primary-disabled' );
					form.find( '.bsb-form-loading' ).remove();
				});
			}
		},
		removeErrors: function( item ) {
			$( item ).parents('.bsb-form').removeClass('bsb-form-has-error');
			$( item ).find( '.has-error' ).removeClass( 'has-error' );
			$( '.bsb-form-error-msg' ).remove();
		},
		isValidEmail: function( email ) {
			var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
			return pattern.test( email );
		},
		removeErrorNotice: function(form) {
			$(form).find('.bsb-form-errors').remove();
		},
		markError: function( item, error_type ) {
			var error_string = '';
			$( item ).parents('.bsb-form').addClass( 'bsb-form-has-error' );
			$( item ).addClass( 'has-error' );

			if ( error_type ) {
				error_string = $(item).data('label');

				if ( '' === error_string || undefined === error_string ) {
					error_string = base_blocks_form_params[ 'item' ];
				}
				switch ( error_type ) {
					case 'required' :
						error_string = error_string + ' ' + base_blocks_form_params[error_type];
						break;
					case 'mismatch' :
						error_string = error_string + ' ' + base_blocks_form_params[error_type];
						break;
					case 'validation' :
						error_string = error_string + ' ' + base_blocks_form_params[error_type];
						break
				}
				$(item).siblings('.bsb-form-error-msg').remove();
				if ( $(item).hasClass( 'bsb-checkbox-style' ) ) {
					$(item).parent('.base-blocks-form-field').append('<div class="bsb-form-error-msg base-blocks-form-warning" role="alert">'+ error_string +'</div>');
				} else {
					$(item).after('<div class="bsb-form-error-msg base-blocks-form-warning">'+ error_string +'</div>');
				}
			}

			$(item).focus();
		},
		/**
		 *
		 * @param form
		 * @param position (value = bottom or end) end if form is onepare, bottom, if form is multistep
		 */
		clearForm: function( form ) {
			$(form)[0].reset();
		},
		/**
		 *
		 * @param form
		 * @param position (value = bottom or end) end if form is onepare, bottom, if form is multistep
		 */
		addErrorNotice: function( form ) {
			$(form).after( '<div class="base-blocks-form-message base-blocks-form-warning">' + base_blocks_form_params.error_message + '</div>');
		},

		isValidURL: function( url ) {
			var urlregex = new RegExp("^(http:\/\/www.|https:\/\/www.|ftp:\/\/www.|www.|http:\/\/|https:\/\/){1}([0-9A-Za-z]+\.)");
			return urlregex.test( url );
		},
		isValidTel: function( tel ) {
			var telregex = new RegExp("/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im");
			return telregex.test( tel );
		},
		validateForm: function( self ) {

			var temp,
				temp_val    = '',
				error       = false,
				error_items = [];
				error_type  = '';

			// remove all initial errors if any
			base_blocks_form.removeErrors( self );
			base_blocks_form.removeErrorNotice( self );

			// ===== Validate: Text and Textarea ========
			var required = self.find('[data-required="yes"]:visible');

			required.each( function( i, item ) {
				// temp_val = $.trim($(item).val());

				// console.log( $(item).data('type') );
				var data_type = $(item).data('type')
					val = '';

				switch( data_type ) {
					case 'textarea':
					case 'text':

						val = $.trim( $(item).val() );

						if ( val === '') {
							error = true;
							error_type = 'required';

							// make it warn collor
							base_blocks_form.markError( item, error_type );
						}
						break;
					case 'tel':

						val = $.trim( $(item).val() );
						if ( val === '') {
							error = true;
							error_type = 'required';

							// make it warn collor
							base_blocks_form.markError( item, error_type );
						}
						break;
					case 'accept':
						if ( $(item).prop("checked") == false ){
							error = true;
							error_type = 'required';

							// make it warn collor
							base_blocks_form.markError( item,  error_type );
						}
						break;

					case 'select':
						val = $(item).val();
						//console.log(val );
						if ( $(item).prop('multiple') ) {
							if ( val === null || val.length === 0 ) {
								error = true;
								error_type = 'required';

								// make it warn collor
								base_blocks_form.markError( item,  error_type );
							}
						} else {

							// console.log(val);
							if ( !val || val === '-1' ) {
								error = true;
								error_type = 'required';

								// make it warn collor
								base_blocks_form.markError( item, error_type );
							}
						}
						break;

					case 'radio':
						var length = $(item).find('input:checked').length;

						if ( !length ) {
							error = true;
							error_type = 'required';

							// make it warn collor
							base_blocks_form.markError( item,  error_type );
						}
						break;

					case 'checkbox':
						var length = $(item).find('input:checked').length;

						if ( !length ) {
							error = true;
							error_type = 'required';

							// make it warn collor
							base_blocks_form.markError( item,  error_type );
						}
						break;
	
					case 'email':
						var val = $(item).val();

						if ( val !== '' ) {
							//run the validation
							if( !base_blocks_form.isValidEmail( val ) ) {
								error = true;
								error_type = 'validation';

								base_blocks_form.markError( item,  error_type );
							}
						} else if( val === '' ) {
							error = true;
							error_type = 'required';

							base_blocks_form.markError( item,  error_type );
						}
						break;
					case 'url':
						var val = $(item).val();

						if ( val !== '' ) {
							//run the validation
							if( !base_blocks_form.isValidURL( val ) ) {
								error = true;
								error_type = 'validation';

								base_blocks_form.markError( item,  error_type );
							}
						}
						break;

				};

			} );

			// if already some error found, bail out
			if ( error ) {
				// add error notice
				base_blocks_form.addErrorNotice( self );

				return false;
			}
			var form_data = self.serialize();
			form_data = form_data + '&_bsb_form_verify=' + base_blocks_form_params.nonce;
			return form_data;
		},
	};
	base_blocks_form.init()
} );
