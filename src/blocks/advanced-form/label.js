/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

const FormFieldLabel = ( { setAttributes, label, showLabel, required } ) => {

	let showRequired = true;

	if( !showLabel ){
		return (
			<></>
		);
	}

	return (
		<div className={'bsb-advanced-form-label'}>
				<RichText
					onChange={( value ) => {
						setAttributes( { label: value } );
					}}
					placeholder={__( 'Field label', 'gutenam-blocks' )}
					allowedFormats={ [ 'core/bold', 'core/italic', 'core/link', 'core/underline' ] }
					tagName="label"
					value={label}
					multiline={ false }
				/>
				{ showRequired && required && <span className={ 'required' }>*</span>}
		</div>
	);
};

export default FormFieldLabel;
