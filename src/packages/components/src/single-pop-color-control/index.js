/**
 * Advanced Color Control.
 *
 */

/**
 * Import Icons
*/
import ColorPicker from '../color-picker';
import ColorIcons from '../color-icons';
import { hexToRGBA } from '@base/helpers';

import { get, map } from 'lodash';
import { useSetting } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
/**
 * Internal block libraries
 */
import { __, sprintf } from '@wordpress/i18n';
import { withSelect } from '@wordpress/data';
import {
	Button,
	Popover,
	ColorIndicator,
	Tooltip,
	Dashicon,
} from '@wordpress/components';

function unConvertOpacity( value ) {
	let val = 100;
	if ( value ) {
		val = value * 100;
	}
	return val;
}

export default function SinglePopColorControl( {
	label,
	alpha = true,
	opacityValue = '',
	opacityUnit = '',
	onOpacityChange = null,
	value,
	onChange,
	reload,
	reloaded,
	defaultValue,
	onClassChange,
	onArrayChange = null,
	disableCustomColors = false,
} ) {
	const [ isVisible, setIsVisible ] = useState( false );
	const [ classSat, setClassSat ] = useState( 'first' );
	const [ currentColor, setCurrentColor ] = useState( '' );
	const [ currentOpacity, setCurrentOpacity ] = useState( opacityValue !== '' ? opacityValue : 1 );
	const [ isPalette, setIsPalette ] = useState( value && value.startsWith( 'palette' ) ? true : false );
	const isDisableCustomColors = ( ! disableCustomColors ? ! useSetting( 'color.custom' ) : true );
	const colors = useSetting( 'color.palette' );
	const toggleVisible = () => {
		setIsVisible( true );
	};
	const toggleClose = () => {
		if ( isVisible === true ) {
			setIsVisible( false );
		}
	};
	if ( reload ) {
		reloaded( true );
		setTimeout(() => {
			setCurrentColor( '' );
			setCurrentOpacity( '' );
			setIsPalette( false );
		}, 100);
	}
	const convertOpacity = ( value ) => {
		let val = 1;
		if ( value ) {
			val = value / 100;
		}
		return val;
	};
	const convertedOpacityValue = ( 100 === opacityUnit ? convertOpacity( currentOpacity ) : currentOpacity );
	const colorVal = ( currentColor ? currentColor : value );
	let currentColorString = ( isPalette && colors && colors[ parseInt( colorVal.slice( -1 ), 10 ) - 1 ] ? colors[ parseInt( colorVal.slice( -1 ), 10 ) - 1 ].color : colorVal );
	if ( ! isPalette && currentColorString && currentColorString.startsWith( 'var(' ) ) {
		currentColorString = window.getComputedStyle( document.documentElement ).getPropertyValue( value.replace( 'var(', '' ).split(',')[0].replace( ')', '' ) );
	}
	if ( '' === currentColorString ) {
		currentColorString = defaultValue;
	}
	// if ( '' !== currentColorString && this.props.onOpacityChange && ! this.state.isPalette ) {
	// 	currentColorString = hexToRGBA( ( undefined === currentColorString ? '' : currentColorString ), ( convertedOpacityValue !== undefined && convertedOpacityValue !== '' ? convertedOpacityValue : 1 ) );
	// }
	if ( onOpacityChange && ! isPalette ) {
		if ( Number( convertedOpacityValue !== undefined && convertedOpacityValue !== '' ? convertedOpacityValue : 1 ) !== 1 ) {
			currentColorString = hexToRGBA( ( undefined === currentColorString ? '' : currentColorString ), ( convertedOpacityValue !== undefined && convertedOpacityValue !== '' ? convertedOpacityValue : 1 ) );
		}
	}
	 let previewColorString = currentColorString;
	 if (isPalette && colorVal) {
		 switch (colorVal) {
			 case 'palette1':
				 previewColorString = 'var(--global-palette1,#2B6CB0)';
				 break;
			 case 'palette2':
				 previewColorString = 'var(--global-palette2,#215387)';
				 break;
			 case 'palette3':
				 previewColorString = 'var(--global-palette3,#1A202C)';
				 break;
			 case 'palette4':
				 previewColorString = 'var(--global-palette4,#2D3748)';
				 break;
			 case 'palette5':
				 previewColorString = 'var(--global-palette5,#4A5568)';
				 break;
			 case 'palette6':
				 previewColorString = 'var(--global-palette6,#718096)';
				 break;
			 case 'palette7':
				 previewColorString = 'var(--global-palette7,#EDF2F7)';
				 break;
			 case 'palette8':
				 previewColorString = 'var(--global-palette8,#F7FAFC)';
				 break;
			 case 'palette9':
				 previewColorString = 'var(--global-palette9,#ffffff)';
				 break;
		 }
	}
	const onChangeState = ( tempColor, tempPalette ) => {
		let newColor;
		let opacity = ( 100 === opacityUnit ? 100 : 1 );
		if ( tempPalette ) {
			newColor = tempPalette;
		} else if ( undefined !== tempColor.rgb && undefined !== tempColor.rgb.a && 1 !== tempColor.rgb.a ) {
			if ( onOpacityChange ) {
				if ( tempColor.hex === 'transparent' ) {
					newColor = '#000000';
				} else {
					newColor = tempColor.hex;
				}
				opacity = ( 100 === opacityUnit ? unConvertOpacity( tempColor.rgb.a ) : tempColor.rgb.a );
			} else {
				newColor = 'rgba(' + tempColor.rgb.r + ',' + tempColor.rgb.g + ',' + tempColor.rgb.b + ',' + tempColor.rgb.a + ')';
			}
		} else if ( undefined !== tempColor.hex ) {
			newColor = tempColor.hex;
		} else {
			newColor = tempColor;
		}
		setCurrentColor( newColor );
		setCurrentOpacity( opacity );
		setIsPalette( tempPalette ? true : false );
	}
	const onChangeComplete = ( tempColorCom, tempPalettCom ) => {
		let newColor;
		let opacity = ( 100 === opacityUnit ? 100 : 1 );
		if ( tempPalettCom ) {
			newColor = tempPalettCom;
		} else if ( undefined !== tempColorCom.rgb && undefined !== tempColorCom.rgb.a && 1 !== tempColorCom.rgb.a ) {
			if ( onOpacityChange ) {
				if ( tempColorCom.hex === 'transparent' ) {
					newColor = '#000000';
				} else {
					newColor = tempColorCom.hex;
				}
				opacity = ( 100 === opacityUnit ? unConvertOpacity( tempColorCom.rgb.a ) : tempColorCom.rgb.a );
			} else {
				newColor = 'rgba(' + tempColorCom.rgb.r + ',' + tempColorCom.rgb.g + ',' + tempColorCom.rgb.b + ',' + tempColorCom.rgb.a + ')';
			}
		} else if ( undefined !== tempColorCom.hex ) {
			newColor = tempColorCom.hex;
		} else {
			newColor = tempColorCom;
		}
		setCurrentColor( newColor );
		setCurrentOpacity( opacity );
		setIsPalette( tempPalettCom ? true : false );
		if ( null !== onArrayChange ) {
			onArrayChange( newColor, opacity );
		} else {
			onChange( newColor );
			if ( null !== onOpacityChange ) {
				setTimeout( () => {
					onOpacityChange( opacity );
				}, 50 );
			}
		}
	}
	return (
		<div className="single-pop-color">
			{ isVisible && (
				<Popover position="top left" className="base-pop-color-popover" onClose={ toggleClose }>
					<ColorPicker
						color={ currentColorString }
						onChange={ ( color ) => onChangeState( color, '' ) }
						onChangeComplete={ ( color ) => {
							onChangeComplete( color, '' );
							if ( onClassChange ) {
								onClassChange( '' );
							}
						} }
					/>
					{ colors && (
						<div className="base-pop-color-palette-swatches">
							{ map( colors, ( { color, slug, name } ) => {
								const style = { color };
								const palette = slug.replace( 'theme-', '' );
								const isActive = ( ( palette === value ) || ( ! slug.startsWith( 'theme-palette' ) && value === color ) );
								return (
									<div key={ color } className="base-color-palette__item-wrapper">
										<Tooltip
											text={ name ||
												// translators: %s: color hex code e.g: "#f00".
												sprintf( __( 'Color code: %s' ), color )
											}>
											<Button
												type="button"
												className={ `base-color-palette__item ${ ( isActive ? 'is-active' : '' ) }` }
												style={ style }
												onClick={ () => {
													if ( slug.startsWith( 'theme-palette' ) ) {
														onChangeComplete( color, palette );
													} else {
														onChangeComplete( color, false );
													}
													if ( onClassChange ) {
														onClassChange( slug );
													}
												} }
												aria-label={ name ?
													// translators: %s: The name of the color e.g: "vivid red".
													sprintf( __( 'Color: %s', 'gutenam-blocks' ), name ) :
													// translators: %s: color hex code e.g: "#f00".
													sprintf( __( 'Color code: %s', 'gutenam-blocks' ), color ) }
												aria-pressed={ isActive }
											/>
										</Tooltip>
										{ palette === value && <Dashicon icon="admin-site" /> }
										{ ! slug.startsWith( 'theme-palette' ) && value === color && <Dashicon icon="saved" /> }
									</div>
								);
							} ) }
						</div>
					) }
				</Popover>
			) }
			{ isVisible && (
				<Button
					className={ `base-pop-color-icon-indicate ${ ( alpha ? 'base-has-alpha' : 'base-no-alpha' ) }` }
					onClick={ toggleVisible }
					showTooltip={ true }
					label={ label }
					>
					<ColorIndicator className="base-pop-color-indicate" colorValue={ previewColorString } />
					{ ( value && value.startsWith( 'palette' )  ) && (
						<span className="color-indicator-icon">{ <Dashicon icon="admin-site" /> }</span>
					) }
				</Button>
			) }
			{ ! isVisible && (
				<Button
					className={ `base-pop-color-icon-indicate ${ ( alpha ? 'base-has-alpha' : 'base-no-alpha' ) }` }
					onClick={ toggleVisible }
					showTooltip={ true }
					label={ label }
					>
					<ColorIndicator className="base-pop-color-indicate" colorValue={ previewColorString } />
					{ ( value && value.startsWith( 'palette' )  ) && (
						<span className="color-indicator-icon">{ <Dashicon icon="admin-site" /> }</span>
					) }
				</Button>
			) }
		</div>
	 );
}
