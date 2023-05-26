/**
 * Range Control
 *
 */

/**
 * Internal block libraries
 */
 import { __ } from '@wordpress/i18n';
import {
	Flex,
	FlexBlock,
	FlexItem,
	RangeControl as CoreRangeControl
} from '@wordpress/components';
import { useState, useMemo, forwardRef } from '@wordpress/element';
import {
	Button,
	DropdownMenu,
	ButtonGroup,
} from '@wordpress/components';
import {
	pxIcon,
	emIcon,
	remIcon,
	vhIcon,
	vwIcon,
	percentIcon,
} from '@base/icons';
import { settings } from '@wordpress/icons';

let icons = {
	px: pxIcon,
	em: emIcon,
	rem: remIcon,
	vh: vhIcon,
	vw: vwIcon,
	percent: percentIcon,
};

/**
 * Build the Measure controls
 * @returns {object} Measure settings.
 */
export default function RadioRangeControl( {
	label,
	onChange,
	value = '',
	className = '',
	options = [],
	step = 1,
	max = 100,
	min = 0,
	beforeIcon = '',
	help = '',
	defaultValue = '',
	unit = '',
	onUnit,
	showUnit = false,
	units = [ 'px', 'em', 'rem' ],
	disableCustomSizes = false,
} ) {
	const stringValue = ( value.value ? value.value : '' );
	const sizeValue = ( value.size ? value.size : '' );
	return [
		onChange && (
			<div className={ `components-base-control base-radio-range-control base-range-control${ className ? ' ' + className : '' }` }>
				{ label && (
					<Flex
						justify="space-between"
						className={ 'base-radio-range__header' }
					>
						<FlexItem>
							<label className="components-base-control__label">{ label }</label>
						</FlexItem>
					</Flex>
				) }
				{ stringValue !== 'custom' && (
					<div className={ 'base-controls-content' }>
						<ButtonGroup className="base-radio-container-control">
							{ options.map( ( option, index ) =>
								<Button
									key={`${option.label}-${option.value}-${index}`}
									isTertiary={stringValue !== option.value}
									className={'base-radio-item radio-' + option.value}
									isPrimary={stringValue === option.value}
									icon={ undefined !== option.icon ? option.icon : undefined }
									aria-pressed={stringValue === option.value}
									onClick={ () => {
										if ( stringValue == option.value && defaultValue == '' ) {
											onChange( '', '' );
										} else {
											onChange( option.value, option.size )}
										}
									}
								>
									{option.label}
								</Button>
							)}
							{ ! disableCustomSizes && (
								<Button
									className={'base-radio-item radio-custom only-icon'}
									label={ __( 'Set custom size', 'gutenam-blocks' ) }
									icon={ settings }
									onClick={ () => onChange( 'custom', sizeValue ) }
									isPressed={ false }
									isTertiary={ true }
								/>
							) }
						</ButtonGroup>
					</div>
				) }
				{ stringValue === 'custom' && (
					<div className={ 'base-controls-content' }>
						<div className={ 'base-range-control-inner' }>
							<CoreRangeControl
								className={ 'base-range-control-range' }
								beforeIcon={ beforeIcon }
								value={ sizeValue }
								onChange={ ( newVal ) => onChange( 'custom', newVal ) }
								min={ min }
								max={ max }
								step={ step }
								help={ help }
								allowReset={ true }
							/>
						</div>
						{ ( onUnit || showUnit ) && (
							<div className={ 'base-units base-measure-control-select-wrapper' }>
								<select
									className={ 'base-measure-control-select components-unit-control__select' }
									onChange={ ( event ) => {
										if ( onUnit ) {
											onUnit( event.target.value );
										}
									} }
									value={ unit }
									disabled={ units.length === 1 }
								>
									{ units.map( ( option, index ) => (
										<option value={ option } key={ index }>
											{ option }
										</option>
									) ) }
								</select>
							</div>
						) }
						{ ! disableCustomSizes && (
							<ButtonGroup className="base-radio-container-control">
								<Button
									className={'base-radio-item radio-custom only-icon'}
									label={ __( 'Use size preset', 'gutenam-blocks' ) }
									icon={ settings }
									isPrimary={true}
									onClick={ () => onChange( defaultValue, sizeValue ) }
									isPressed={ true }
								/>
							</ButtonGroup>
						) }
					</div>
				) }
			</div>
		),
	];
}
