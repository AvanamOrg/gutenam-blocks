/**
 * Range Control
 *
 */

/**
 * Internal block libraries
 */
import { RangeControl as CoreRangeControl } from '@wordpress/components';

/**
 * Build the Measure controls
 * @returns {object} Measure settings.
 */
export default function RangeControl( {
	label,
	onChange,
	value = '',
	className = '',
	step = 1,
	max = 100,
	min = 0,
	beforeIcon = '',
	help = '',
	unit = '',
	onUnit,
	showUnit = false,
	units = [ 'px', 'em', 'rem' ],
} ) {

	return [
		onChange && (
			<div className={ `components-base-control base-range-control${ className ? ' ' + className : '' }` }>
				{ label && (
					<label className="components-base-control__label">{ label }</label>
				) }
				<div className={ 'base-controls-content' }>
					<div className={ 'base-range-control-inner' }>
						<CoreRangeControl
							className={ 'base-range-control-range' }
							beforeIcon={ beforeIcon }
							value={ value }
							onChange={ ( newVal ) => onChange( newVal ) }
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
				</div>
			</div>
		),
	];
}
