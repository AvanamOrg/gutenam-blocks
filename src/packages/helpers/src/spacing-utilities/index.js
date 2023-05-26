import { __ } from '@wordpress/i18n';
import { SPACING_SIZES_MAP } from '../constants';
export function getSpacingOptionName( value, unit, spacingMap = SPACING_SIZES_MAP ) {
	if ( ! value ) {
		return __( 'None', 'gutenam-blocks' );
	}
	if ( ! spacingMap ) {
		return __( 'Unset', 'gutenam-blocks' );
	}
	if ( value === '0') {
		return __( 'None', 'gutenam-blocks' );
	}
	const found = spacingMap.find( ( option ) => option.value === value );
	if ( ! found ) {
		return value + unit;
	}
	return found.name;
}
export function getSpacingOptionOutput( value, unit, spacingMap = SPACING_SIZES_MAP ) {
	if ( undefined === value ) {
		return '';
	}
	if ( ! spacingMap ) {
		return value;
	}
	if ( value === '0') {
		return '0' + unit;
	}
	if ( value === 0 ) {
		return '0' + unit;
	}
	const found = spacingMap.find( ( option ) => option.value === value );
	if ( ! found ) {
		return value + unit;
	}
	return found.output;
}
export function getSpacingOptionSize( value, spacingMap = SPACING_SIZES_MAP ) {
	if ( ! value ) {
		return 0;
	}
	if ( ! spacingMap ) {
		return value;
	}
	if ( value === '0') {
		return 0;
	}
	const found = spacingMap.find( ( option ) => option.value === value );
	if ( ! found ) {
		return value;
	}
	return found.size;
}
export function getSpacingNameFromSize( value, spacingMap = SPACING_SIZES_MAP ) {
	if ( ! value ) {
		return __( 'Unset', 'gutenam-blocks' );
	}
	if ( ! spacingMap ) {
		return __( 'Unset', 'gutenam-blocks' );
	}
	if ( value === '0') {
		return __( 'None', 'gutenam-blocks' );
	}
	const found = spacingMap.find( ( option ) => option.size === value );
	if ( ! found ) {
		return value + 'px';
	}
	return found.name;
}
export function getSpacingValueFromSize( value, spacingMap = SPACING_SIZES_MAP ) {
	if ( ! value ) {
		return '';
	}
	if ( ! spacingMap ) {
		return '';
	}
	if ( value === '0') {
		return '0';
	}
	const found = spacingMap.find( ( option ) => option.size === value );
	if ( ! found ) {
		return value;
	}
	return found.value;
}

/**
 * Checks if two arrays have values that exist at the same indices and are of the same length
 * @param {*} array1 
 * @param {*} array2 
 * @returns boolean
 */
export function objectSameFill( array1, array2 ) {
	if ( typeof( array1 ) != 'object' || typeof( array2 ) != 'object' ) {
		return false;
	}

	if ( array1.length != array2.length ) {
		return false;
	}

	for ( let i = 0; i < array1.length; i++ ) {
		const ele1 = array1[i];
		const ele2 = array2[i];
		
		if ( ( ele1 && ! ele2 ) || ( ! ele1 && ele2 ) ) {
			return false;
		}
	}

	return true;
}

/**
 * Return incomingValue with any non matching (by data type) indices reset to ''
 * Matching data type is determined by the last changed index from the reference
 * @param {*} reference 
 * @param {*} incomingValue 
 * @returns {*}
 */
export function clearNonMatchingValues( reference, incomingValue ) {
	if ( typeof( reference ) != 'object' || typeof( incomingValue ) != 'object' ) {
		return incomingValue;
	}

	if ( reference.length != incomingValue.length ) {
		return incomingValue;
	}

	let changedVal = null;

	for ( let i = 0; i < reference.length; i++ ) {
		const valPart = reference[i];
		const incValPart = incomingValue[i];
		
		if ( valPart !== incValPart ) {
			changedVal = incValPart;
		}
	}

	if ( changedVal ) {
		return incomingValue.map( val => typeof( val ) == typeof( changedVal ) ? val : '' );
	}

	return incomingValue;
}