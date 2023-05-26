/**
 * Responsive Range Component
 *
 */

/**
 * Internal block libraries
 */
 import { useSelect, useDispatch } from '@wordpress/data';
 import { useState, useRef } from '@wordpress/element';
 import { __ } from '@wordpress/i18n';
 import { map, isEqual } from 'lodash';
 import UnitControl from './index';
 import { capitalizeFirstLetter } from '@base/helpers';
 import { undo } from '@wordpress/icons';
 import {
	 Dashicon,
	 Button,
	 ButtonGroup,
	 DropdownMenu,
 } from '@wordpress/components';
 /**
  * Build the Measure controls
  * @returns {object} Measure settings.
  */
 export default function ResponsiveUnitControl( {
		label,
		onChange,
		onChangeTablet,
		onChangeMobile,
		mobileValue,
		tabletValue,
		value,
		units = [ 'px', 'em', 'rem' ],
		onUnit,
		step = 1,
		max = 200,
		min = 0,
		unit = '',
		defaultValue = [ '', '', '' ],
		compressedDevice = false,
		reset = true,
	 } ) {
	 const ref = useRef();
	 const [ deviceType, setDeviceType ] = useState( 'Desktop' );
	 const theDevice = useSelect( ( select ) => {
		 return select( 'baseblocks/data' ).getPreviewDeviceType();
	 }, [] );
	 if ( theDevice !== deviceType ) {
		 setDeviceType( theDevice );
	 }
	 const {
		 setPreviewDeviceType,
	 } = useDispatch( 'baseblocks/data' );
	 const customSetPreviewDeviceType = ( device ) => {
		 setPreviewDeviceType( capitalizeFirstLetter( device ) );
		 setDeviceType( capitalizeFirstLetter( device ) );
	 };
	 const devices = [
		 {
			 name: 'Desktop',
			 title: <Dashicon icon="desktop" />,
			 itemClass: 'bsb-desk-tab',
		 },
		 {
			 name: 'Tablet',
			 title: <Dashicon icon="tablet" />,
			 itemClass: 'bsb-tablet-tab',
		 },
		 {
			 name: 'Mobile',
			 key: 'mobile',
			 title: <Dashicon icon="smartphone" />,
			 itemClass: 'bsb-mobile-tab',
		 },
	 ];
	 const icons = {
		Desktop: <Dashicon icon="desktop" />,
		Tablet: <Dashicon icon="tablet" />,
		Mobile: <Dashicon icon="smartphone" />,
	 }
	const createLevelControlToolbar = ( mappedDevice ) => {
		return [ {
			title: mappedDevice.name,
			icon: mappedDevice.title,
			isActive: deviceType === mappedDevice.name,
			onClick: () => {
				customSetPreviewDeviceType( mappedDevice.name );
			},
		} ];
	};
	 const currentValue = [ value, tabletValue, mobileValue ];
	 const onReset = () => {
		if ( typeof reset === 'function' ){
			reset();
		} else {
			if ( deviceType === 'Mobile' ) {
				onChangeMobile( defaultValue[2] );
			} else if ( deviceType === 'Tablet' ) {
				onChangeTablet( defaultValue[1] );
			} else {
				onChange( defaultValue[0] );
			}
		}
	}
	 const output = {};
	 output.Mobile = (
		 <UnitControl
			 value={ ( mobileValue ? mobileValue : undefined ) }
			 onChange={ ( size ) => onChangeMobile( size ) }
			 onUnit={ onUnit }
			 defaultValue={ defaultValue[2] }
			 units={ units }
			 step={ step }
			 max={ max }
			 min={ min }
			 unit={ unit }
		 />
	 );
	 output.Tablet = (
		 <UnitControl
			value={ ( tabletValue ? tabletValue : undefined ) }
			onChange={ ( size ) => onChangeTablet( size ) }
			onUnit={ onUnit }
			defaultValue={ defaultValue[1] }
			units={ units }
			step={ step }
			max={ max }
			min={ min }
			unit={ unit }
		 />
	 );
	 output.Desktop = (
		<UnitControl
			value={ ( value ? value : undefined ) }
			onChange={ ( size ) => onChange( size ) }
			onUnit={ onUnit }
			defaultValue={ defaultValue[0] }
			units={ units }
			step={ step }
			max={ max }
			min={ min }
			unit={ unit }
		/>
	 );
	 return [
		 onChange && onChangeTablet && onChangeMobile && (
			 <div ref={ ref } className={ 'components-base-control bsb-responsive-unit-control base-unit-control' }>
					<div
						className={ 'base-unit-control__header base-component__header' }
					>
					 { label && (
						 <div className="base-component__header__title base-unit__title">
							 <label className="components-base-control__label">{ label }</label>
							 { reset && (
								 <div className='title-reset-wrap'>
									 <Button
										 className="is-reset is-single"
										 label='reset'
										 isSmall
										 disabled={ ( ( isEqual( defaultValue, currentValue ) ) ? true : false ) }
										 icon={ undo }
										 onClick={ () => onReset() }
									 />
								 </div>
							 ) }
						 </div>
					 ) }
					 { ! compressedDevice && (
						<ButtonGroup className="bsb-responsive-options bsb-measure-responsive-options" aria-label={ __( 'Device', 'gutenam-blocks' ) }>
							{ map( devices, ( { name, key, title, itemClass } ) => (
								<Button
									key={ key }
									className={ `bsb-responsive-btn ${ itemClass }${ name === deviceType ? ' is-active' : '' }` }
									isSmall
									aria-pressed={ deviceType === name }
									onClick={ () => customSetPreviewDeviceType( name ) }
								>
									{ title }
								</Button>
							) ) }
						</ButtonGroup>
					 )}
					 { compressedDevice && (
						<DropdownMenu
							className="bsb-responsive-options-dropdown"
							icon={ ( icons[ deviceType ] ? icons[ deviceType ] : icons.Desktop ) }
							label={__( 'Target Device', 'gutenam-blocks' )}
							controls={ devices.map( ( singleDevice ) => createLevelControlToolbar( singleDevice ) ) }
						/>
					 ) }
				 </div>
				 <div className="bsb-responsive-border-control-inner">
					{ ( output[ deviceType ] ? output[ deviceType ] : output.Desktop ) }
				 </div>
			 </div>
		 ),
	 ];
 }
 