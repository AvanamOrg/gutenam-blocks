import { __ } from '@wordpress/i18n';
import { map } from 'lodash';
import {
	ToggleControl,
	ButtonGroup,
	Button,
	ExternalLink,
	TextControl
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

export default function SpamOptions( { setAttributes, honeyPot, recaptcha, recaptchaVersion} ) {

	const RETRIEVE_KEY_URL = 'https://www.google.com/recaptcha/admin';
	const HELP_URL = 'https://developers.google.com/recaptcha/docs/v3';

	const [ isSaving, setIsSaving ] = useState( false ) ;
	const [ isSavedKey, setIsSavedKey ] = useState( false ) ;

	const [ siteKey, setSiteKey ] = useState( '' ) ;
	const [ siteSecret, setSiteSecret ] = useState( '' ) ;


	const saveKeys = () => {
		setIsSaving( true );

		const settingModel = new wp.api.models.Settings( {
			base_blocks_recaptcha_site_key: siteKey,
			base_blocks_recaptcha_secret_key: siteSecret,
		} );

		settingModel.save().then( response => {
			setIsSaving( false );
			setIsSavedKey(  true );
		} );
	}

	const removeKeys = () => {
		setSiteKey( '' );
		setSiteSecret( '' );

		if ( isSavedKey ) {
			setIsSaving( true );

			const settingModel = new wp.api.models.Settings( {
				base_blocks_recaptcha_site_key: '',
				base_blocks_recaptcha_secret_key: '',
			} );
			settingModel.save().then( () => {
				setIsSaving( false );
				setIsSavedKey(  false );
			} );
		}
	}

	useEffect( () => {
		apiFetch( {
			path: '/wp/v2/settings',
			method: 'GET',
		} ).then( ( response ) => {
			setSiteKey( response.base_blocks_recaptcha_site_key );
			setSiteSecret( response.base_blocks_recaptcha_secret_key );

			if ( '' !== response.base_blocks_recaptcha_site_key && '' !== response.base_blocks_recaptcha_secret_key ) {
				setIsSavedKey( true );
			}
		} );
	}, [ recaptcha ] );


	return (
		<>
			<ToggleControl
				label={ __( 'Enable Basic Honey Pot Spam Check', 'gutenam-blocks' ) }
				help={ __( 'This adds a hidden field that if filled out prevents the form from submitting.', 'gutenam-blocks' ) }
				checked={ honeyPot }
				onChange={ ( value ) => setAttributes( value, 'honeyPot' ) }
			/>

			<hr/>

			<ToggleControl
				label={ __( 'Enable Google reCAPTCHA', 'gutenam-blocks' ) }
				checked={ recaptcha }
				onChange={ ( value ) => setAttributes( value, 'recaptcha' ) }
			/>

			{ recaptcha && (
				<>
					<div className="bst-btn-recaptch-settings-container components-base-control">
						<p className="bsb-component-label">{ __( 'Recaptcha Version', 'gutenam-blocks' ) }</p>
						<ButtonGroup className="bsb-radio-button-flex-fill" aria-label={ __( 'Recaptcha Version', 'gutenam-blocks' ) }>
							<Button
								key={ 'v2' }
								className="bst-btn-size-btn"
								isSmall
								isPrimary={ recaptchaVersion === 'v2' }
								aria-pressed={ recaptchaVersion === 'v2' }
								onClick={ () => setAttributes( 'v2', 'recaptchaVersion' ) }
							>
								{ __( 'V2', 'gutenam-blocks' ) }
							</Button>
							<Button
								key={ 'v3' }
								className="bst-btn-size-btn"
								isSmall
								isPrimary={ recaptchaVersion === 'v3' }
								aria-pressed={ recaptchaVersion === 'v3' }
								onClick={ () => setAttributes( 'v3', 'recaptchaVersion' ) }
							>
								{ __( 'V3', 'gutenam-blocks' ) }
							</Button>
						</ButtonGroup>
					</div>
					<p>
						<ExternalLink href={ RETRIEVE_KEY_URL }>{ __( 'Get keys', 'gutenam-blocks' ) }</ExternalLink>
						|&nbsp;
						<ExternalLink href={ HELP_URL }>{ __( 'Get help', 'gutenam-blocks' ) }</ExternalLink>
					</p>

					<TextControl
						label={ __( 'Site Key', 'gutenam-blocks' ) }
						value={ siteKey }
						onChange={ value => setSiteKey( value ) }
					/>
					<TextControl
						label={ __( 'Secret Key', 'gutenam-blocks' ) }
						value={ siteSecret }
						onChange={ value => setSiteSecret( value ) }
					/>

					<div className="components-base-control">
						<Button
							isPrimary
							onClick={ saveKeys }
							disabled={ '' === siteKey || '' === siteSecret }
						>
							{ isSaving ? __( 'Saving', 'gutenam-blocks' ) : __( 'Save', 'gutenam-blocks' ) }
						</Button>
						{ isSavedKey && (
							<>
								&nbsp;
								<Button
									variant={ 'secondary' }
									onClick={ removeKeys }
								>
									{ __( 'Remove', 'gutenam-blocks' ) }
								</Button>
							</>
						) }
					</div>
				</>
			) }
		</>
	);

}
