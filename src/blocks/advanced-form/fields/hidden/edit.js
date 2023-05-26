/**
 * WordPress dependencies
 */
import { TextControl, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { InspectorControls } from '@wordpress/block-editor';


function FieldHidden( { attributes, setAttributes } ) {
	const { label, value } = attributes;

	return (
		<div className={ 'base-blocks-form-field bsb-input-size-standard' }>
			<InspectorControls>

				<PanelBody
					title={ __( 'Field Controls', 'gutenam-blocks' ) }
					initialOpen={ true }
				>
					<TextControl
						label={__( 'Field Name', 'gutenam-blocks' )}
						value={label}
						onChange={( value ) => setAttributes( { label: value } )}
					/>

					<TextControl
						label={ __( 'Field Value', 'gutenam-blocks' ) }
						value={ value }
						onChange={ ( value ) => setAttributes( { value: value } ) }
					/>

				</PanelBody>
			</InspectorControls>
			<>
				{ label === '' ?
					<em>Hidden Field</em>
					:
					<em>Hidden Field: {label}</em>

				}
			</>
		</div>
	);
}

export default FieldHidden;
