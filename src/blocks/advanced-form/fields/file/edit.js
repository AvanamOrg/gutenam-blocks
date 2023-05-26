/**
 * Internal dependencies
 */
import FormFieldLabel from '../../label';

/**
 * WordPress dependencies
 */
import { TextControl, SelectControl, CheckboxControl, ToggleControl, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { without } from 'lodash';

import { InspectorControls } from '@wordpress/block-editor';

function FieldFile( props ) {
	const { attributes, setAttributes, isSelected, name  } = props;
	const { required, label, showLabel, helpText, ariaDescription, maxSizeMb, allowedTypes } = attributes;


	const wpMaxUploadSizeBytes = base_blocks_params.wp_max_upload_size;
	const wpMaxUploadSizeMb = formatBytesToMb( wpMaxUploadSizeBytes );
	const wpMaxUploadSizePretty = formatBytes( wpMaxUploadSizeBytes );

	const getSizeOptions = () => {
		const sizeOptions = [];

		for ( let i = 1; ( i * 5) <= Math.min( 25, wpMaxUploadSizeMb); i++ ) {
			sizeOptions.push( {
				value: ( i * 5),
				label: ( i * 5) + ' MB',
			} );
		}
		return sizeOptions;
	}

	const toggleAllowedTypes = ( type ) => {
		let newTypes = [];

		if( allowedTypes.includes( type ) ) {
			newTypes = without( allowedTypes, type);
		} else {
			newTypes = [ ...allowedTypes, type ];
		}

		setAttributes( { allowedTypes: newTypes } );
	}

	{/* Lower the max file size if the max upload size is ever lowered */}
	if( maxSizeMb > wpMaxUploadSizeMb ){
		setAttributes( { maxSizeMb: wpMaxUploadSizeMb } );
	}

	return (
		<div className={'base-blocks-form-field bsb-input-size-standard'}>
			<InspectorControls>

				<PanelBody
					title={__( 'Field Controls', 'gutenam-blocks' )}
					initialOpen={true}
				>
					<ToggleControl
						label={__( 'Required', 'gutenam-blocks' )}
						checked={required}
						onChange={( value ) => setAttributes( { required: value } )}
					/>

					<ToggleControl
						label={__( 'Show Label', 'gutenam-blocks' )}
						checked={showLabel}
						onChange={( value ) => setAttributes( { showLabel: value } )}
					/>

					<TextControl
						label={__( 'Help Text', 'gutenam-blocks' )}
						value={helpText}
						onChange={( value ) => setAttributes( { helpText: value } )}
					/>

					<TextControl
						label={__( 'Input aria description', 'gutenam-blocks' )}
						value={ariaDescription}
						onChange={( value ) => setAttributes( { ariaDescription: value } )}
					/>

				</PanelBody>

				<PanelBody
					title={ __('File Options', 'gutenam-blocks') }
				>

					<SelectControl
						label={ __( 'File Size Limit', 'gutenam-blocks') }
						value={ maxSizeMb }
						onChange={ value => {
							setAttributes( { maxSizeMb: value } );
						} }
						options={ getSizeOptions() }
						max={ wpMaxUploadSizeMb }
						help={ __( 'WordPress max upload size: ', 'gutenam-blocks') + ' ' + wpMaxUploadSizePretty }
					/>

					<h2>{ __( 'Allowed File Types', 'gutenam-blocks') }</h2>
					<CheckboxControl
						label={ __('Images', 'gutenam-blocks') }
						help="jpeg, jpg, gif, and png"
						checked={ allowedTypes.includes( 'image' ) }
						onChange={ ( value ) => toggleAllowedTypes( 'image' ) }
					/>

					<CheckboxControl
						label={ __('PDF', 'gutenam-blocks') }
						checked={ allowedTypes.includes( 'pdf' ) }
						onChange={ ( value ) => toggleAllowedTypes( 'pdf' ) }
					/>

					<CheckboxControl
						label={ __('Audio', 'gutenam-blocks') }
						help="mp3, wav, ogg, wma, m4a, mid, mka"
						checked={ allowedTypes.includes( 'audio' ) }
						onChange={ ( value ) => toggleAllowedTypes( 'audio' ) }
					/>

					<CheckboxControl
						label={ __('Video', 'gutenam-blocks') }
						help="mp4, mpg, mpeg, mpe, m4v, avi, mov"
						checked={ allowedTypes.includes( 'video' ) }
						onChange={ ( value ) => toggleAllowedTypes( 'video' ) }
					/>

					<CheckboxControl
						label={ __('Documents', 'gutenam-blocks') }
						help="csv, doc, ppt, docx, ody, odp, ods, txt, rtf, xls, xlsx, odt, ott"
						checked={ allowedTypes.includes( 'document' ) }
						onChange={ ( value ) => toggleAllowedTypes( 'document' ) }
					/>

					<CheckboxControl
						label={ __('Zip Archive', 'gutenam-blocks') }
						checked={ allowedTypes.includes( 'archive' ) }
						onChange={ ( value ) => toggleAllowedTypes( 'archive' ) }
					/>

				</PanelBody>
			</InspectorControls>
			<div className={'bsb-form-field-container'}>
				<div className={'bsb-form-field'}>
					<FormFieldLabel
						required={required}
						label={label}
						showLabel={showLabel}
						setAttributes={setAttributes}
						isSelected={isSelected}
						name={name}
					/>
					<input type={'file'} disabled={ true } />

					{/*{helpText && <span style={helpStyles} className="bsb-form-field-help">{helpText}</span>}*/}
				</div>
			</div>
		</div>
	);
}

export default FieldFile;

function formatBytes(bytes) {
	if (bytes === 0) return '0 Bytes';

	const k = 1024;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(0)) + ' ' + sizes[i];
}

function formatBytesToMb(bytes) {
	if (bytes === 0) return 0;

	const k = 1024;

	return parseFloat((bytes / Math.pow(k, 2)).toFixed(0));
}
