import { __ } from '@wordpress/i18n';
import { GAP_SIZES_MAP } from '../constants';
export function getGapSizeOptionOutput( value, unit, sizesMap = GAP_SIZES_MAP ) {
	if ( undefined === value ) {
		return '';
	}
	if ( ! sizesMap ) {
		return value;
	}
	if ( value === '0') {
		return '0' + unit;
	}
	if ( value === 0 ) {
		return '0' + unit;
	}
	const found = sizesMap.find( ( option ) => option.value === value );
	if ( ! found ) {
		return value + unit;
	}
	return found.output;
}
