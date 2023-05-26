/**
 * Responsive Range Component
 *
 */
/**
 * Internal block libraries
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { map, isEqual } from 'lodash';
import { undo } from '@wordpress/icons';
import { capitalizeFirstLetter } from '@base/helpers'
import RangeControl from '../range-control';

import {
	Dashicon,
	Button,
	ButtonGroup,
} from '@wordpress/components';

/**
 * Build the Measure controls
 * @returns {object} Measure settings.
 */
export default function ResponsiveRangeControls( {
	label,
	onChange,
	onChangeTablet,
	onChangeMobile,
	mobileValue,
	tabletValue,
	value,
	step = 1,
	max = 100,
	min = 0,
	unit = '',
	onUnit,
	showUnit = false,
	units = [ 'px', 'em', 'rem' ],
	allowEmpty = true,
	className = '',
	reset,
} ) {
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
			key: 'desktop',
			title: <Dashicon icon="desktop" />,
			itemClass: 'bsb-desk-tab',
		},
		{
			name: 'Tablet',
			key: 'tablet',
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
	const output = {};
	output.Mobile = (
		<RangeControl
			value={ ( undefined !== mobileValue ? mobileValue : '' ) }
			onChange={ ( size ) => onChangeMobile( size ) }
			min={ min }
			max={ max }
			step={ step }
			unit={ unit }
			onUnit={ onUnit }
			showUnit={ showUnit }
			units={ units }
		/>
	);
	output.Tablet = (
		<RangeControl
			value={ ( undefined !== tabletValue ? tabletValue : '' ) }
			onChange={ ( size ) => onChangeTablet( size ) }
			min={ min }
			max={ max }
			step={ step }
			unit={ unit }
			onUnit={ onUnit }
			showUnit={ showUnit }
			units={ units }
		/>
	);
	output.Desktop = (
		<RangeControl
			value={ ( undefined !== value ? value : '' ) }
			onChange={ ( size ) => onChange( size ) }
			min={ min }
			max={ max }
			step={ step }
			unit={ unit }
			onUnit={ onUnit }
			showUnit={ showUnit }
			units={ units }
		/>
	);
	return [
		onChange && onChangeTablet && onChangeMobile && (
			<div className={ `components-base-control bsb-responsive-range-control${ '' !== className ? ' ' + className : '' }` }>
				<div className="base-title-bar">
					{ reset && (
						<Button
							className="is-reset is-single"
							isSmall
							disabled={ ( ( isEqual( '', value ) ) ? true : false ) }
							icon={ undo }
							onClick={ () => reset() }
						></Button>
					) }
					{ label && (
						<span className="base-control-title">{ label }</span>
					) }
					<ButtonGroup className="bsb-measure-responsive-options" aria-label={ __( 'Device', 'gutenam-blocks' ) }>
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
				</div>
				{ ( output[ deviceType ] ? output[ deviceType ] : output.Desktop ) }
			</div>
		),
	];
}
