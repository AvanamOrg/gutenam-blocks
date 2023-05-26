/**
 * Range Control
 *
 */
/**
 * WordPress dependencies
 */
 import { useInstanceId } from '@wordpress/compose';
 import { useState, useEffect } from '@wordpress/element';
 import SingleMeasureRangeControl from './single-control';
 import { map, isEqual } from 'lodash';
/**
 * Import Css
 */
import './editor.scss';
/**
 * Internal block libraries
 */
 import { __ } from '@wordpress/i18n';
import {
	Flex,
	FlexBlock,
	FlexItem,
	Button,
	DropdownMenu,
	ButtonGroup,
	RangeControl as CoreRangeControl,
	__experimentalUnitControl as UnitControl
} from '@wordpress/components';
import {
	pxIcon,
	emIcon,
	remIcon,
	vhIcon,
	vwIcon,
	percentIcon,
	outlineTopIcon,
	outlineRightIcon,
	outlineBottomIcon,
	outlineLeftIcon,
	individualIcon,
	linkedIcon,
	topLeftIcon,
	topRightIcon,
	bottomRightIcon,
	bottomLeftIcon,
	radiusLinkedIcon,
	radiusIndividualIcon
} from '@base/icons';
import { settings, link, linkOff } from '@wordpress/icons';
import { OPTIONS_MAP } from './constants';
import { isCustomOption, getOptionIndex, getOptionFromSize, getOptionSize } from './utils';

/**
 * Build the Measure controls
 * @returns {object} Measure settings.
 */
export default function MeasureRangeControl( {
	label,
	onChange,
	onControl,
	value = '',
	className = '',
	options = OPTIONS_MAP,
	step = 1,
	max = 200,
	min = 0,
	beforeIcon = '',
	help = '',
	defaultValue = [ '', '', '', '' ],
	control = 'individual',
	unit = '',
	onUnit,
	units = [ 'px', 'em', 'rem' ],
	disableCustomSizes = false,
	isBorderRadius= false,
	firstIcon = outlineTopIcon,
	secondIcon = outlineRightIcon,
	thirdIcon = outlineBottomIcon,
	fourthIcon = outlineLeftIcon,
	linkIcon = link,
	unlinkIcon = linkOff,
	customControl = false,
	setCustomControl = null,
	parentLabel = null,
	reset,
	onMouseOver,
	onMouseOut,
} ) {
	const measureIcons = {
		first: isBorderRadius ? topLeftIcon : firstIcon,
		second: isBorderRadius ? topRightIcon : secondIcon,
		third: isBorderRadius ? bottomRightIcon : thirdIcon,
		fourth: isBorderRadius ? bottomLeftIcon : fourthIcon,
		link: isBorderRadius ? radiusLinkedIcon : linkIcon,
		unlink: isBorderRadius ? radiusIndividualIcon : unlinkIcon,
	}
	const [ isCustom, setIsCustom ] = useState( false );
	const [ theControl, setTheControl ] = useState( control );
	useEffect( () => {
		setIsCustom( isCustomOption( options, value ) );
	}, [] );
	const realIsCustomControl = setCustomControl ? customControl : isCustom;
	const realSetIsCustom = setCustomControl ? setCustomControl : setIsCustom;
	const onReset = () => {
		if ( typeof reset === 'function' ){
			reset();
		} else {
			onChange( defaultValue );
		}
	}
	const onSetIsCustom = () => {
		if ( ! realIsCustomControl ) {
			const newValue = [
				getOptionSize( options, ( value ? value[ 0 ] : '' ), unit ),
				getOptionSize( options, ( value ? value[ 1 ] : '' ), unit ),
				getOptionSize( options, ( value ? value[ 2 ] : '' ), unit ),
				getOptionSize( options, ( value ? value[ 3 ] : '' ), unit ),
			];
			onChange( newValue );
		} else {
			const newValue = [
				getOptionFromSize( options, ( value ? value[ 0 ] : '' ), unit ),
				getOptionFromSize( options, ( value ? value[ 1 ] : '' ), unit ),
				getOptionFromSize( options, ( value ? value[ 2 ] : '' ), unit ),
				getOptionFromSize( options, ( value ? value[ 3 ] : '' ), unit ),
			];
			onChange( newValue );
		}
		realSetIsCustom( ! realIsCustomControl );
	}
	const realControl = onControl ? control : theControl;
	const realSetOnControl = onControl ? onControl : setTheControl;
	return [
		onChange && (
			<div className={ `components-base-control component-spacing-sizes-control base-measure-range-control ${ className ? ' ' + className : '' }` }>
				{ label && (
					<Flex
						justify="space-between"
						className={ 'base-component__header base-radio-range__header' }
					>
						{ label && (
							<div className="base-component__header__title base-radio-range__title">
								<label className="components-base-control__label">{ label }</label>
								{ reset && (
									<div className='title-reset-wrap'>
										<Button
											className="is-reset is-single"
											label='reset'
											isSmall
											disabled={ ( ( isEqual( defaultValue, value ) ) ? true : false ) }
											icon={ undo }
											onClick={ () => onReset() }
										/>
									</div>
								) }
							</div>
						) }
						{ ! disableCustomSizes && (
							<Button
								className={'base-radio-item radio-custom only-icon'}
								label={ ! realIsCustomControl ? __( 'Set custom size', 'gutenam-blocks' ) : __( 'Use size preset', 'gutenam-blocks' )  }
								icon={ settings }
								isSmall={ true }
								onClick={ onSetIsCustom }
								isPressed={ realIsCustomControl ? true : false }
								isTertiary={ realIsCustomControl ? false : true }
							/>
						) }
						{ realSetOnControl && (
							<Button
								isSmall={ true }
								className={'base-radio-item radio-custom is-single only-icon'}
								label={ realControl !== 'individual' ? __( 'Individual', 'gutenam-blocks' ) : __( 'Linked', 'gutenam-blocks' )  }
								icon={ realControl !== 'individual' ? measureIcons.link : measureIcons.unlink }
								onClick={ () => realSetOnControl( realControl !== 'individual' ? 'individual' : 'linked' ) }
								isPressed={ realControl !== 'individual' ? true : false }
								isTertiary={ realControl !== 'individual' ? false : true }
							/>
						) }
					</Flex>
				) }
				<div className={ 'base-controls-content' }>
					{ realControl !== 'individual' && (
						<>
							<SingleMeasureRangeControl
								value={ ( value ? value[ 0 ] : '' ) }
								onChange={ ( newVal ) => onChange( [ newVal, newVal, newVal, newVal ] ) }
								className={ 'bsb-measure-input-all-inputs' }
								min={ min }
								max={ max }
								options={ options }
								step={ step }
								help={ help }
								unit={ unit }
								units={ units }
								onUnit={ onUnit }
								defaultValue={ defaultValue[0] }
								allowReset={ false }
								disableCustomSizes={ true }
								setCustomControl={ realSetIsCustom }
								customControl={ realIsCustomControl }
								isPopover={ false }
								isSingle={ true }
								onMouseOver={ onMouseOver }
								onMouseOut={ onMouseOut }
							/>
						</>
					) }
					{ realControl === 'individual' && (
						<>
							<SingleMeasureRangeControl
								parentLabel={ parentLabel ? parentLabel : label }
								label={ __( 'Top', 'gutenam-blocks' ) }
								className={ 'bsb-measure-box-top' }
								value={ ( value ? value[ 0 ] : '' ) }
								onChange={ ( newVal ) => {
									onChange( [ newVal, ( value && undefined !== value[ 1 ] ? value[ 1 ] : '' ), ( value && undefined !== value[ 2 ] ? value[ 2 ] : '' ), ( value && undefined !== value[ 3 ] ? value[ 3 ] : '' ) ] );
								} }
								min={ min }
								max={ max }
								options={ options }
								step={ step }
								help={ help }
								unit={ unit }
								units={ units }
								onUnit={ onUnit }
								defaultValue={ defaultValue[0] }
								allowReset={ false }
								disableCustomSizes={ true }
								setCustomControl={ realSetIsCustom }
								customControl={ realIsCustomControl }
								isPopover={ true }
								onMouseOver={ onMouseOver }
								onMouseOut={ onMouseOut }
							/>
							<SingleMeasureRangeControl
								parentLabel={ parentLabel ? parentLabel : label }
								label={ __( 'Right', 'gutenam-blocks' ) }
								className={ 'bsb-measure-box-right' }
								value={ ( value ? value[ 1 ] : '' ) }
								onChange={ ( newVal ) => onChange( [ ( value && undefined !== value[ 0 ] ? value[ 0 ] : '' ), newVal, ( value && undefined !== value[ 2 ] ? value[ 2 ] : '' ), ( value && undefined !== value[ 3 ] ? value[ 3 ] : '' ) ] ) }
								min={ min }
								max={ max }
								options={ options }
								step={ step }
								help={ help }
								unit={ unit }
								units={ units }
								onUnit={ onUnit }
								defaultValue={ defaultValue[1] }
								allowReset={ false }
								disableCustomSizes={ true }
								setCustomControl={ realSetIsCustom }
								customControl={ realIsCustomControl }
								isPopover={ true }
								onMouseOver={ onMouseOver }
								onMouseOut={ onMouseOut }
							/>
							<SingleMeasureRangeControl
								parentLabel={ parentLabel ? parentLabel : label }
								label={ __( 'Bottom', 'gutenam-blocks' ) }
								className={ 'bsb-measure-box-bottom' }
								value={ ( value ? value[ 2 ] : '' ) }
								onChange={ ( newVal ) => onChange( [ ( value && undefined !== value[ 0 ] ? value[ 0 ] : '' ), ( value && undefined !== value[ 1 ] ? value[ 1 ] : '' ), newVal, ( value && undefined !== value[ 3 ] ? value[ 3 ] : '' ) ] ) }
								min={ min }
								max={ max }
								options={ options }
								step={ step }
								help={ help }
								unit={ unit }
								units={ units }
								onUnit={ onUnit }
								defaultValue={ defaultValue[2] }
								allowReset={ false }
								disableCustomSizes={ true }
								setCustomControl={ realSetIsCustom }
								customControl={ realIsCustomControl }
								isPopover={ true }
								onMouseOver={ onMouseOver }
								onMouseOut={ onMouseOut }
							/>
							<SingleMeasureRangeControl
								parentLabel={ parentLabel ? parentLabel : label }
								label={ __( 'Left', 'gutenam-blocks' ) }
								className={ 'bsb-measure-box-left' }
								value={ ( value ? value[ 3 ] : '' ) }
								onChange={ ( newVal ) => onChange( [ ( value && undefined !== value[ 0 ] ? value[ 0 ] : '' ), ( value && undefined !== value[ 1 ] ? value[ 1 ] : '' ), ( value && undefined !== value[ 2 ] ? value[ 2 ] : '' ), newVal ] ) }
								min={ min }
								max={ max }
								options={ options }
								step={ step }
								help={ help }
								unit={ unit }
								units={ units }
								onUnit={ onUnit }
								defaultValue={ defaultValue[3] }
								allowReset={ false }
								disableCustomSizes={ true }
								setCustomControl={ realSetIsCustom }
								customControl={ realIsCustomControl }
								isPopover={ true }
								onMouseOver={ onMouseOver }
								onMouseOut={ onMouseOut }
							/>
							{ realIsCustomControl && (
								<div className={ 'base-units base-measure-control-select-wrapper' }>
									<select
										className={ 'base-measure-control-select components-unit-control__select' }
										onChange={ ( event ) => {
											onUnit( event.target.value );
										} }
										value={ unit }
										disabled={ units.length === 1 }
									>
										{ units.map( ( option ) => (
											<option value={ option } selected={ unit === option ? true : undefined } key={ option }>
												{ option }
											</option>
										) ) }
									</select>
								</div>
							) }
						</>
					) }
				</div>
			</div>
		),
	];
}
