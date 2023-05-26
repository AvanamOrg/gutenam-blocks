/**
 * Internal dependencies
 */
import FormFieldLabel from '../../label';

/**
 * WordPress dependencies
 */
import { TextControl, ToggleControl, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { InspectorControls } from '@wordpress/block-editor';

import { ColumnWidth } from '../../components';
import classNames from 'classnames';

function FieldDate( props ) {
	const { attributes, setAttributes, isSelected, name } = props;
	const { required, label, showLabel, value, helpText, width, ariaDescription } = attributes;

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
						label={__( 'Default Value', 'gutenam-blocks' )}
						value={value}
						type={'date'}
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
					type={ 'date' }
					className={'bsb-field'}
					value={value}
					onChange={( value ) => false}
				/>

				{helpText && <span className="bsb-form-field-help">{helpText}</span>}
			</>
		</div>
	);
}

export default FieldDate;
