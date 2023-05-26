/**
 * Internal dependencies
 */
import FormFieldLabel from '../../label';

/**
 * WordPress dependencies
 */
import {
	TextControl,
	ToggleControl,
	PanelBody,
	Dashicon,
	Button,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	useState
} from '@wordpress/element';

import { times, filter } from 'lodash';
import { ColumnWidth } from '../../components';
import classNames from 'classnames';

function FieldRadio( {
						 attributes,
						 setAttributes,
						 isSelected,
						 name,
					 } ) {

	const { required, label, showLabel, helpText, options, width, ariaDescription } = attributes;

	const [ rerender, setRerender ] = useState( 0 );

	const onOptionMoveUp = ( oldIndex ) => {
		if ( oldIndex === 0 ) {
			return;
		}
		onOptionMove( oldIndex, oldIndex - 1 );
	}

	const onOptionMoveDown = ( oldIndex ) => {
		if ( oldIndex === options.length - 1 ) {
			return;
		}
		onOptionMove( oldIndex, oldIndex + 1 );
	}

	const onOptionMove = ( oldIndex, newIndex ) => {
		if ( !options ) {
			return;
		}

		let tmpValue = options[ newIndex ];

		options.splice( newIndex, 1, options[ oldIndex ] );
		options.splice( oldIndex, 1, tmpValue );

		setAttributes( { options: options} );
	}

	const removeOptionItem = ( previousIndex ) => {
		const amount = Math.abs( options.length );
		if ( amount === 1 ) {
			return;
		}
		const newOptions = filter( options, ( item, i ) => previousIndex !== i );
		setAttributes( { options: newOptions } );
	};

	const removeSelection = () => {
		let newOptions = options;

		newOptions.forEach( function( item, index ) {
			item.selected = false;
		});

		setAttributes( { options: newOptions} );
	}

	const toggleSelected = ( index, value ) => {
		const previousValue = options[ index ].selected;

		removeSelection();

		updateOption( index, { selected: !previousValue } );
	}

	const updateOption = ( index, value ) => {
		const newOptions = options.map( ( item, iteration ) => {
			if ( index === iteration ) {
				item = { ...item, ...value };
			}
			return item;
		} );

		setAttributes( {
			options: newOptions,
		} );
	};

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

					<div className='bsb-field-options-wrap'>
					{times( options.length, n => (
						<div className="field-options-wrap">

							<hr/>
							<h2>{__( 'Option', 'gutenam-blocks' ) + ' ' + ( n + 1 )}</h2>
							<TextControl
								label={__( 'Label', 'gutenam-blocks' )}
								placeholder={__( 'Option', 'gutenam-blocks' )}
								value={( undefined !== options[ n ].label ? options[ n ].label : '' )}
								onChange={( text ) => updateOption( n, { label: text } )}
							/>
							<TextControl
								label={__( 'Value', 'gutenam-blocks' )}
								placeholder={options[ n ].label}
								value={( undefined !== options[ n ].value ? options[ n ].value : '' )}
								onChange={( text ) => updateOption( n, { value: text } )}
							/>
							<div className="base-blocks-list-item__control-menu">
								<Button
									icon="arrow-up"
									onClick={ () => ( n === 0  ? undefined : onOptionMoveUp( n ) ) }
									className="base-blocks-list-item__move-up"
									label={__( 'Move Item Up' )}
									aria-disabled={n === 0}
									disabled={n === 0}
								/>
								<Button
									icon="arrow-down"
									onClick={ () => ( ( n + 1 ) === options.length ? undefined : onOptionMoveDown( n ) ) }
									className="base-blocks-list-item__move-down"
									label={__( 'Move Item Down' )}
									aria-disabled={( n + 1 ) === options.length}
									disabled={( n + 1 ) === options.length}
								/>
								<Button
									icon="no-alt"
									onClick={() => removeOptionItem( n )}
									className="base-blocks-list-item__remove"
									label={__( 'Remove Item' )}
									disabled={1 === options.length}
								/>
							</div>
						</div>
					) )}
					</div>
					<Button
						className="bsb-add-option"
						isPrimary={true}
						onClick={() => {
							let newOptions = options;
							newOptions.push( {
								value: '',
								label: '',
							} );
							setAttributes( { options: newOptions } );
							setRerender( Math.random() );
						}}
					>
						<Dashicon icon="plus"/>
						{__( 'Add Option', 'gutenam-blocks' )}
					</Button>

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

				{isSelected ?
					<div className={'bsb-form-multi'}>
						{times( options.length, n => (
							<div className={'bsb-checkbox-item'} key={n}>
								<input
									type={'radio'}
									className={'bsb-sub-field bsb-checkbox-style'}
									onClick={( value ) => { toggleSelected( n, value.target.value ); } }
									checked={ options[ n ].selected }
								/>
								<input key={ 'text' + n } type={'text'} value={options[ n ].label} className={ 'ignore-field-styles' } onChange={( value ) => updateOption( n, { label: value.target.value } )}/>
								<Button onClick={() => removeOptionItem( n )}>
									<span className="dashicon dashicons dashicons-trash"></span>
								</Button>
							</div>
						) )}

						<Button
							variant={'primary'}
							className={'bsb-form-multi__add-option'}
							onClick={() => {
								let newOptions = options;
								newOptions.push( {
									value: '',
									label: '',
								} );
								setAttributes( { options: newOptions } );
								setRerender( Math.random() );
							}}
						>
							<Dashicon icon="plus"/>
							{__( 'Add Option', 'gutenam-blocks' )}
						</Button>
					</div>
					:
					<>
						{times( options.length, n => (
							<div key={n}>
								<input
									type={'radio'}
									className={'bsb-sub-field bsb-checkbox-style'}
									value={options}
									onChange={( value ) => false }
								/>

								<label htmlFor={'bsb_field'}>{options[ n ].label}</label>
							</div>
						) )}
					</>
				}
				{helpText && <span className="bsb-form-field-help">{helpText}</span>}

			</>
		</div>
	);
}

export default FieldRadio;
