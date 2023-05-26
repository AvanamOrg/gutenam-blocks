/**
 * Auto Respond Email Controls
 *
 */

/**
 * Internal block libraries
 */
import { __ } from '@wordpress/i18n';

import {
	TextControl,
	TextareaControl,
	ToggleControl,
} from '@wordpress/components';
import { BasePanelBody } from '@base/components';

/**
 * Build the Measure controls
 * @returns {object} Measure settings.
 */
function AutoEmailOptions( { settings, save } ) {

	return (
		<BasePanelBody
			title={__( 'Auto Respond Email Settings', 'gutenam-blocks' )}
			initialOpen={false}
			panelName={'bsb-auto-email-settings'}
		>
				<TextControl
					label={ __( 'Email Subject', 'gutenam-blocks' ) }
					placeholder={ __( 'Thanks for contacting us!', 'gutenam-blocks' ) }
					value={ ( undefined !== settings && undefined !== settings.subject ? settings.subject : '' ) }
					onChange={ ( value ) => save( { subject: value } ) }
				/>
				<TextareaControl
					label={ __( 'Email Message', 'gutenam-blocks' ) }
					placeholder={ __( 'Thanks for getting in touch, we will respond within the next 24 hours.', 'gutenam-blocks' ) }
					value={ ( undefined !== settings && undefined !== settings.message ? settings.message : '' ) }
					onChange={ ( value ) => save( { message: value } ) }
				/>
				<TextControl
					label={ __( 'From Email', 'gutenam-blocks' ) }
					value={ ( undefined !== settings && undefined !== settings.fromEmail ? settings.fromEmail : '' ) }
					onChange={ ( value ) => save( { fromEmail: value } ) }
				/>
				<TextControl
					label={ __( 'From Name', 'gutenam-blocks' ) }
					value={ ( undefined !== settings && undefined !== settings.fromName ? settings.fromName : '' ) }
					onChange={ ( value ) => save( { fromName: value } ) }
				/>
				<TextControl
					label={ __( 'Reply To', 'gutenam-blocks' ) }
					value={ ( undefined !== settings && undefined !== settings && undefined !== settings.replyTo ? settings.replyTo : '' ) }
					onChange={ ( value ) => save( { replyTo: value } ) }
				/>
				<TextControl
					label={ __( 'Cc', 'gutenam-blocks' ) }
					value={ ( undefined !== settings && undefined !== settings && undefined !== settings.cc ? settings.cc : '' ) }
					onChange={ ( value ) => save( { cc: value } ) }
				/>
				<TextControl
					label={ __( 'Bcc', 'gutenam-blocks' ) }
					value={ ( undefined !== settings && undefined !== settings.bcc ? settings.bcc : '' ) }
					onChange={ ( value ) => save( { bcc: value } ) }
				/>
				<ToggleControl
					label={ __( 'Send as HTML email?', 'gutenam-blocks' ) }
					help={ __( 'If off plain text is used.', 'gutenam-blocks' ) }
					checked={ ( undefined !== settings && undefined !== settings.html ? settings.html : true ) }
					onChange={ ( value ) => save( { html: value } ) }
				/>
				<TextControl
					label={ __( 'Override Email to Address', 'gutenam-blocks' ) }
					help={ __( 'By default email is sent to the email field, you can use this to override.', 'gutenam-blocks' ) }
					value={ ( undefined !== settings && undefined !== settings.emailTo ? settings.emailTo : '' ) }
					onChange={ ( value ) => save( { emailTo: value } ) }
				/>
		</BasePanelBody>
	);
}

export default ( AutoEmailOptions );
