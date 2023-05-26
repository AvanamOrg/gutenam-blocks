import { __ } from '@wordpress/i18n';
import {
	TextControl,
	PanelRow,
	RangeControl
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import {
	BasePanelBody,
	PopColorControl,
	TypographyControls,
	MeasurementControls
} from '@base/components';

export default function MessageOptions( { setAttributes, messageFont, messages, recaptcha } ) {

	const [ messageFontBorderControl, setMessageFontBorderControl ] = useState( 'linked' );
	const [ messagePaddingControl, setMessagePaddingControl ] = useState( 'individual' );
	const [ messageMarginControl, setMessageMarginControl ] = useState( 'individual' );

	const saveMessages = ( value ) => {

		setAttributes( {  ...messages, ...value }, 'messages' );
	};

	const saveMessageFont = ( value ) => {
		setAttributes( { ...messageFont, ...value }, 'messageFont' );
	}

	return (
		<>
			<TextControl
				label={__( 'Success Message', 'gutenam-blocks' )}
				placeholder={__( 'Submission Success, Thanks for getting in touch!', 'gutenam-blocks' )}
				value={( undefined !== messages.success ? messages.success : '' )}
				onChange={( value ) => saveMessages( { success: value } )}
			/>
			<BasePanelBody
				title={__( 'Success Message Colors', 'gutenam-blocks' )}
				initialOpen={false}
				panelName={'bsb-form-success-message-colors'}
			>
				<PopColorControl
					label={__( 'Success Message Color', 'gutenam-blocks' )}
					value={( messageFont.colorSuccess ? messageFont.colorSuccess : '' )}
					default={''}
					onChange={value => {
						saveMessageFont( { colorSuccess: value } );
					}}
				/>
				<PopColorControl
					label={__( 'Success Message Background', 'gutenam-blocks' )}
					value={( messageFont.backgroundSuccess ? messageFont.backgroundSuccess : '' )}
					default={''}
					onChange={value => {
						saveMessageFont( { backgroundSuccess: value } );
					}}
					opacityValue={messageFont.backgroundSuccessOpacity}
					onOpacityChange={value => saveMessageFont( { backgroundSuccessOpacity: value } )}
				/>
				<PopColorControl
					label={__( 'Success Message Border', 'gutenam-blocks' )}
					value={( messageFont.borderSuccess ? messageFont.borderSuccess : '' )}
					default={''}
					onChange={value => {
						saveMessageFont( { borderSuccess: value } );
					}}
				/>
			</BasePanelBody>
			<PanelRow>
				<TextControl
					label={__( 'Pre Submit Form Validation Error Message', 'gutenam-blocks' )}
					placeholder={__( 'Please fix the errors to proceed', 'gutenam-blocks' )}
					value={( undefined !== messages.preError ? messages.preError : '' )}
					onChange={( value ) => saveMessages( { preError: value } )}
				/>
			</PanelRow>
			<PanelRow>
				<TextControl
					label={__( 'Error Message', 'gutenam-blocks' )}
					placeholder={__( 'Submission Failed', 'gutenam-blocks' )}
					value={( undefined !== messages.error ? messages.error : '' )}
					onChange={( value ) => saveMessages( { error: value } )}
				/>
			</PanelRow>
			{recaptcha && (
				<PanelRow>
					<TextControl
						label={__( 'Recapcha Error Message', 'gutenam-blocks' )}
						placeholder={__( 'Submission Failed, reCaptcha spam prevention.', 'gutenam-blocks' )}
						value={( undefined !== messages.recaptchaerror ? messages.recaptchaerror : '' )}
						onChange={( value ) => saveMessages( { recaptchaerror: value } )}
					/>
				</PanelRow>
			)}
			<BasePanelBody
				title={__( 'Error Message Colors', 'gutenam-blocks' )}
				initialOpen={false}
				panelName={'bsb-form-error-message-colors'}
			>
				<PopColorControl
					label={__( 'Error Message Color', 'gutenam-blocks' )}
					value={( messageFont.colorError ? messageFont.colorError : '' )}
					default={''}
					onChange={value => {
						saveMessageFont( { colorError: value } );
					}}
				/>
				<PopColorControl
					label={__( 'Error Message Background', 'gutenam-blocks' )}
					value={( messageFont.backgroundError ? messageFont.backgroundError : '' )}
					default={''}
					onChange={value => {
						saveMessageFont( { backgroundError: value } );
					}}
					opacityValue={messageFont.backgroundErrorOpacity}
					onOpacityChange={value => saveMessageFont( { backgroundErrorOpacity: value } )}
				/>
				<PopColorControl
					label={__( 'Error Message Border', 'gutenam-blocks' )}
					value={( messageFont.borderError ? messageFont.borderError : '' )}
					default={''}
					onChange={value => {
						saveMessageFont( { borderError: value } );
					}}
				/>
			</BasePanelBody>
			<TypographyControls
				fontSize={messageFont.size}
				onFontSize={( value ) => saveMessageFont( { size: value } )}
				fontSizeType={messageFont.sizeType}
				onFontSizeType={( value ) => saveMessageFont( { sizeType: value } )}
				lineHeight={messageFont.lineHeight}
				onLineHeight={( value ) => saveMessageFont( { lineHeight: value } )}
				lineHeightType={messageFont.lineType}
				onLineHeightType={( value ) => saveMessageFont( { lineType: value } )}
			/>
			<h2>{__( 'Border Settings', 'gutenam-blocks' )}</h2>
			<MeasurementControls
				label={__( 'Border Width', 'gutenam-blocks' )}
				measurement={messageFont.borderWidth}
				control={messageFontBorderControl}
				onChange={( value ) => saveMessageFont( { borderWidth: value } )}
				onControl={( value ) => setMessageFontBorderControl( value )}
				min={0}
				max={20}
				step={1}
			/>
			<RangeControl
				label={__( 'Border Radius', 'gutenam-blocks' )}
				value={messageFont.borderRadius}
				onChange={value => {
					saveMessageFont( { borderRadius: value } );
				}}
				min={0}
				max={50}
			/>
			<BasePanelBody
				title={__( 'Advanced Message Font Settings', 'gutenam-blocks' )}
				initialOpen={false}
				panelName={'bsb-form-advanced-message-font-settings'}
			>
				<TypographyControls
					letterSpacing={messageFont.letterSpacing}
					onLetterSpacing={( value ) => saveMessageFont( { letterSpacing: value.toString() } )}
					fontFamily={messageFont.family}
					onFontFamily={( value ) => saveMessageFont( { family: value } )}
					onFontChange={( select ) => {
						saveMessageFont( {
							family: select.value,
							google: select.google,
						} );
					}}
					onFontArrayChange={( values ) => saveMessageFont( values )}
					googleFont={messageFont.google}
					onGoogleFont={( value ) => saveMessageFont( { google: value } )}
					loadGoogleFont={messageFont.loadGoogle}
					onLoadGoogleFont={( value ) => saveMessageFont( { loadGoogle: value } )}
					fontVariant={messageFont.variant}
					onFontVariant={( value ) => saveMessageFont( { variant: value } )}
					fontWeight={messageFont.weight}
					onFontWeight={( value ) => saveMessageFont( { weight: value } )}
					fontStyle={messageFont.style}
					onFontStyle={( value ) => saveMessageFont( { style: value } )}
					fontSubset={messageFont.subset}
					onFontSubset={( value ) => saveMessageFont( { subset: value } )}
					padding={messageFont.padding}
					onPadding={( value ) => saveMessageFont( { padding: value } )}
					paddingControl={messagePaddingControl}
					onPaddingControl={( value ) => setMessagePaddingControl( value )}
					margin={messageFont.margin}
					onMargin={( value ) => saveMessageFont( { margin: value } )}
					marginControl={messageMarginControl}
					onMarginControl={( value ) => setMessageMarginControl( value )}
				/>
			</BasePanelBody>
		</>
	);

}
