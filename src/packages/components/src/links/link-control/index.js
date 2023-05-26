/**
 * External dependencies
 */
 import classnames from 'classnames';
 /**
  * WordPress dependencies
  */
import { __ } from '@wordpress/i18n';
import { Fragment, Component } from '@wordpress/element';
import { ToggleControl, TextControl, SelectControl } from '@wordpress/components';
import { LEFT, RIGHT, UP, DOWN, BACKSPACE, ENTER } from '@wordpress/keycodes';
 /**
 * Import Css
 */
  import './editor.scss';
 /**
  * Internal dependencies
  */
import InputSearch from '../input-search';

 /**
 * Build the typography controls
 * @returns {object} typography settings.
 */
class URLInputControl extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			isEditingLink: false,
			isSettingsExpanded: false,
			urlInput: null,
		};
	}
	render() {
		const { label,
			onChangeUrl,
			url,
			additionalControls = true,
			opensInNewTab,
			onChangeTarget,
			linkNoFollow,
			onChangeFollow,
			linkSponsored,
			onChangeSponsored,
			linkDownload,
			onChangeDownload,
			linkTitle,
			onChangeTitle,
			onChangeLinkClass,
			linkClass,
			changeTargetType = false,
			allowClear = false,
			dynamicAttribute = '' } = this.props;
		const { urlInput, isEditingLink, isSettingsExpanded } = this.state;
		const stopPropagation = ( event ) => {
			event.stopPropagation();
		};

		const stopPropagationRelevantKeys = ( event ) => {
			if ( [ LEFT, DOWN, RIGHT, UP, BACKSPACE, ENTER ].indexOf( event.keyCode ) > -1 ) {
				// Stop the key event from propagating up to ObserveTyping.startTypingInTextField.
				event.stopPropagation();
			}
		};

		const stopEditLink = () => {
			this.setState( { isEditingLink: false } );
		};
		const setUrlInput = ( value ) => {
			this.setState( { urlInput: value } );
		};
		const toggleSettingsVisibility = () => {
			this.setState( { isSettingsExpanded: ! isSettingsExpanded } );
		};

		const onSubmitLinkChange = ( url ) => {
			onChangeUrl( url );
		};
		const onSetNewTab = ( value ) => {
			onChangeTarget( value );
		};

		const onSetLinkNoFollow = ( value ) => {
			onChangeFollow( value );
		};

		const onSetLinkSponsored = ( value ) => {
			onChangeSponsored( value );
		};

		const onSetLinkDownload = ( value ) => {
			onChangeDownload( value );
		};
		const onSetLinkTitle = ( value ) => {
			onChangeTitle( value );
		};
		const onSetLinkClass = ( value ) => {
			onChangeLinkClass( value );
		};

		const advancedOptions = (
			<Fragment>
				{ onChangeTarget && (
					<Fragment>
						{ changeTargetType && (
							<Fragment>
								<SelectControl
									label={ __( 'Link Target', 'gutenam-blocks' ) }
									value={ opensInNewTab }
									options={ [
										{ value: '_self', label: __( 'Same Tab/Window', 'gutenam-blocks' ) },
										{ value: '_blank', label: __( 'Open in New Tab', 'gutenam-blocks' ) },
										{ value: 'video', label: __( 'Video Popup', 'gutenam-blocks' ) },
									] }
									onChange={ onSetNewTab }
								/>
								{ opensInNewTab === 'video' && (
									<p>{ __( 'NOTE: Video popup only works with youtube and vimeo links.', 'gutenam-blocks' ) }</p>
								) }
							</Fragment>
						) }
						{ ! changeTargetType && (
							<ToggleControl
								label={ __( 'Open in New Tab', 'gutenam-blocks' ) }
								onChange={ onSetNewTab }
								checked={ opensInNewTab }
							/>
						) }
					</Fragment>
				) }
				{ onChangeFollow && (
					<ToggleControl
						label={ __( 'No Follow', 'gutenam-blocks' ) }
						onChange={ onSetLinkNoFollow }
						checked={ linkNoFollow }
					/>
				) }
				{ onChangeSponsored && (
					<ToggleControl
						label={ __( 'Sponsored', 'gutenam-blocks' ) }
						onChange={ onSetLinkSponsored }
						checked={ linkSponsored }
					/>
				) }
				{ onChangeDownload && (
					<ToggleControl
						label={ __( 'Download', 'gutenam-blocks' ) }
						onChange={ onSetLinkDownload }
						checked={ linkDownload }
					/>
				) }
				{ onChangeTitle && (
					<TextControl
						label={ __( 'Title', 'gutenam-blocks' ) }
						onChange={ onSetLinkTitle }
						value={ linkTitle }
					/>
				) }
				{ onChangeLinkClass && (
					<TextControl
						label={ __( 'Link CSS Class', 'gutenam-blocks' ) }
						onChange={ onSetLinkClass }
						value={ linkClass }
					/>
				) }
			</Fragment>
		);
		const linkEditorValue = urlInput !== null ? urlInput : url;
		return (
			<div className={ `components-base-control bsb-side-link-control${ dynamicAttribute && base_blocks_params.dynamic_enabled ? ' has-dynamic-support' : '' }` }>
				{ label && (
					<label className="components-base-control__label">{ label }</label>
				) }
				<InputSearch
					url={ url }
					onChange={ ( url ) => onSubmitLinkChange( url ) }
					attributes={ this.props.attributes }
					dynamicAttribute={ dynamicAttribute }
					additionalControls={ additionalControls }
					advancedOptions={ advancedOptions }
					isSettingsExpanded={ isSettingsExpanded }
					onExpandSettings={ toggleSettingsVisibility }
					allowClear={ allowClear }
					{ ...this.props }
				/>
			</div>
		);
	}
 };
 export default URLInputControl;
