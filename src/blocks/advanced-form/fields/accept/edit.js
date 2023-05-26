/**
 * Internal dependencies
 */
import FormFieldLabel from '../../label';

/**
 * WordPress dependencies
 */
import { TextControl, ToggleControl, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { InspectorControls, RichText } from '@wordpress/block-editor';
import classNames from 'classnames';

function FieldAccept( props ) {
	const { attributes, setAttributes, isSelected, name } = props;
	const { required, label, showLabel, value, width, terms, helpText, ariaDescription } = attributes;

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

					<ToggleControl
						label={__( 'Default Checked', 'gutenam-blocks' )}
						checked={value}
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

				</PanelBody>
			</InspectorControls>
			<div className={'bsb-form-multi'}>

				<FormFieldLabel
					required={required}
					label={label}
					showLabel={showLabel}
					setAttributes={setAttributes}
					isSelected={isSelected}
					name={name}
				/>

				<input
					type={'checkbox'}
					checked={value}
					name={ 'bsb_accept' }
					className={ 'bsb-sub-field bsb-checkbox-style' }
					onChange={( value ) => false }
				/>
				<RichText
					className={'base-field-label__input'}
					onChange={( value ) => {
						setAttributes( { terms: value } );
					}}
					placeholder={__( 'Opt me in!', 'gutenam-blocks' )}
					allowedFormats={ [ 'core/bold', 'core/italic', 'core/link', 'core/underline' ] }
					tagName="label"
					value={terms}
					multiline={ false }
				/>

				{helpText && <div className="bsb-form-field-help">{helpText}</div>}
			</div>
		</div>
	);
}

export default FieldAccept;
