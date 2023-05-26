/**
 * Internal dependencies
 */
import FormFieldLabel from '../../label';

/**
 * WordPress dependencies
 */
import { TextControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { InspectorControls, InspectorAdvancedControls } from '@wordpress/block-editor';
import { withSelect, withDispatch } from '@wordpress/data';
import { BasePanelBody } from '@base/components';

import { ColumnWidth } from '../../components';
import classNames from 'classnames';

function FieldText( { attributes, setAttributes, isSelected } ) {
	const { required, label, showLabel, value, helpText, ariaDescription, width, placeholder, name } = attributes;

	const classes = classNames( {
		'bsb-advanced-form-field': true,
		[ `bsb-field-desk-width-${width[0]}` ]: true,
		[ `bsb-field-tablet-width-${width[1]}` ]: width[1] !== '',
		[ `bsb-field-mobile-width-${width[2]}` ]: width[2] !== '',
	});

	return (
		<div className={ classes }>
			<InspectorControls>

				<BasePanelBody
					title={__( 'Field Controls', 'gutenam-blocks' )}
					initialOpen={true}
					panelName={ 'bsb-adv-form-text-controls' }
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
						label={__( 'Field Placeholder', 'gutenam-blocks' )}
						value={placeholder}
						onChange={( value ) => setAttributes( { placeholder: value } )}
					/>

					<TextControl
						label={__( 'Default Value', 'gutenam-blocks' )}
						value={value}
						onChange={( value ) => setAttributes( { value: value } )}
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

					<ColumnWidth saveSubmit={setAttributes} width={width}/>

				</BasePanelBody>

			</InspectorControls>
			<InspectorAdvancedControls>
				<TextControl
					label={__( 'Field Name', 'gutenam-blocks' )}
					help={ __( 'This is the name attribute that is applied to the html input tag.', 'gutenam-blocks' ) }
					value={name}
					onChange={( value ) => setAttributes( { name: value.replace(/[^a-z0-9-_]/gi, '') } ) }
				/>
			</InspectorAdvancedControls>
			<>
				<FormFieldLabel
					required={required}
					label={label}
					showLabel={showLabel}
					setAttributes={setAttributes}
					isSelected={isSelected}
					name={name}
				/>
				<input
					type={'text'}
					className={'bsb-field'}
					value={value}
					placeholder={placeholder}
					onChange={( value ) => false}
				/>
				{helpText && <span className="bsb-advanced-form-help">{helpText}</span>}
			</>
		</div>
	);
}

export default FieldText;
