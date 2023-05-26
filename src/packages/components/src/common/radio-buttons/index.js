/**
 * Radio Buttons control.
 *
 */
/**
 * Import Css
 */
 import './editor.scss';

import {
	Button,
	ButtonGroup,
} from '@wordpress/components';
/**
 * WordPress dependencies
 */
 import { useInstanceId } from '@wordpress/compose';
/**
 * Build the Measure controls
 * @returns {object} Measure settings.
 */
export default function BaseRadioButtons( {
		label,
		value,
		onChange,
		options = [],
		className,
		hideLabel=false,
		wrap=false,
		allowClear = false,
		...props
	} ) {
		const instanceId = useInstanceId( BaseRadioButtons );
		const id = `inspector-radio-control-${ instanceId }`;
	return (
		<div className={ `components-base-control base-radio-buttons-wrap${ className ? ' ' + className : '' }` }>
			{ label && (
				<div className='base-component__header'>
					<label
						htmlFor={ id }
						className="base-radio-control-label components-radio-control__label base-component__header__title"
					>
						{ label }
					</label>
				</div>
			) }
			<ButtonGroup id={ id } className={ `base-radio-container-control${ wrap ? ' base-radio-control-flexwrap' : '' }` }>
				{ options.map( ( option, index ) =>
					<Button
						key={`${option.label}-${option.value}-${index}`}
						isTertiary={value !== option.value}
						className={`base-radio-item radio-${ option.value}${ ( hideLabel ? ' radio-no-label' : '' ) }${ (  undefined !== option?.isDisabled && option.isDisabled ? ' bsb-disabled-btn' : '' ) }` }
						isPrimary={value === option.value}
						icon={ undefined !== option.icon ? option.icon : undefined }
						aria-pressed={value === option.value}
						onClick={() => {
							if ( undefined !== option?.isDisabled && option.isDisabled ) {
								
							} else {
								if ( allowClear && option.value === value ) {
									onChange( '')
								} else {
									onChange( option.value );
								}
							}
						} }
						label={ ( hideLabel ? option.label : option?.tooltip )}
					>
					{ ! hideLabel &&  (
						option.label
					) }
					</Button>
				)}
			</ButtonGroup>
		</div>
	);
}
