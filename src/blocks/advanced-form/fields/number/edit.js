/**
 * Internal dependencies
 */
import FormFieldLabel from '../../label';

/**
 * WordPress dependencies
 */
import { TextControl, ToggleControl, PanelBody, __experimentalNumberControl as NumberControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { InspectorControls } from '@wordpress/block-editor';

import { ColumnWidth } from '../../components';
import classNames from 'classnames';

function FieldNumber( { attributes, setAttributes, isSelected, name } ) {
	const {
		required,
		label,
		showLabel,
		value,
		maxValue,
		minValue,
		helpText,
		ariaDescription,
		placeholder,
		width
	} = attributes;

	const classes = classNames( {
		'bsb-advanced-form-field': true,
		[ `bsb-field-desk-width-${width[0]}` ]: true,
		[ `bsb-field-tablet-width-${width[1]}` ]: width[1] !== '',
		[ `bsb-field-mobile-width-${width[2]}` ]: width[2] !== '',
	});

	return (
		<div className={ classes }>
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
						label={__( 'Field Placeholder', 'gutenam-blocks' )}
						value={placeholder}
						onChange={( value ) => setAttributes( { placeholder: value } )}
					/>

					<NumberControl
						label={__( 'Default Value', 'gutenam-blocks' )}
						value={value}
						onChange={( value ) => setAttributes( { value: value } )}
					/>

					<NumberControl
						label={__( 'Maximum Value', 'gutenam-blocks' )}
						value={maxValue}
						onChange={( value ) => setAttributes( { maxValue: value } )}
					/>

					<NumberControl
						label={__( 'Minimum Value', 'gutenam-blocks' )}
						value={minValue}
						onChange={( value ) => setAttributes( { minValue: value } )}
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

					<ColumnWidth saveSubmit={ setAttributes } width={ width } />

				</PanelBody>
			</InspectorControls>
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
					type={ 'number' }
					className={'bsb-field'}
					value={value}
					placeholder={placeholder}
					onChange={( value ) => false}
				/>

				{helpText && <span className="bsb-form-field-help">{helpText}</span>}
			</>
		</div>
	);
}

export default FieldNumber;
