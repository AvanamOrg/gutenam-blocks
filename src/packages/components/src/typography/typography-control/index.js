/**
 * Typography Component
 *
 */

/* global base_blocks_params */

/**
 * Internal block libraries
 */
import { __, sprintf } from '@wordpress/i18n';
import './editor.scss';
/**
 * Import External
 */
import { capitalizeFirstLetter } from '@base/helpers'
import RangeControl from '../../range/range-control';
import ResponsiveFontSizeControl from '../../font-size/responsive';
import BaseRadioButtons from '../../common/radio-buttons';
import MeasurementControls from '../../measurement/measurement-control';
import ResponsiveUnitControl from '../../unit/responsive';
import TwoColumn from '../../panels/two-column';
import TagSelect from '../../tag-select';

import Select from 'react-select';
import { range } from 'lodash';
import HeadingLevelIcon from '../../heading-level-icon';

import { applyFilters } from '@wordpress/hooks';

import { Component } from '@wordpress/element';
import {
	ToolbarGroup,
	ToggleControl,
	SelectControl,
} from '@wordpress/components';

/**
 * Build the typography controls
 * @returns {object} typography settings.
 */
class TypographyControls extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			typographyOptions: [],
			typographySelectOptions: [],
			typographyWeights: [],
			typographyStyles: [],
			typographySubsets: '',
		};
	}
	componentDidMount() {
		const fontsarray = typeof base_blocks_params !== 'undefined' && base_blocks_params.g_font_names ? base_blocks_params.g_font_names.map( ( name ) => {
			return { label: name, value: name, google: true };
		} ) : {};
		let options = [
			{
				type: 'group',
				label: __( 'Standard Fonts', 'gutenam-blocks' ),
				options: [
					{ label: 'System Default', value: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', google: false },
					{ label: 'Arial, Helvetica, sans-serif', value: 'Arial, Helvetica, sans-serif', google: false },
					{ label: '"Arial Black", Gadget, sans-serif', value: '"Arial Black", Gadget, sans-serif', google: false },
					{ label: 'Helvetica, sans-serif', value: 'Helvetica, sans-serif', google: false },
					{ label: '"Comic Sans MS", cursive, sans-serif', value: '"Comic Sans MS", cursive, sans-serif', google: false },
					{ label: 'Impact, Charcoal, sans-serif', value: 'Impact, Charcoal, sans-serif', google: false },
					{ label: '"Lucida Sans Unicode", "Lucida Grande", sans-serif', value: '"Lucida Sans Unicode", "Lucida Grande", sans-serif', google: false },
					{ label: 'Tahoma, Geneva, sans-serif', value: 'Tahoma, Geneva, sans-serif', google: false },
					{ label: '"Trebuchet MS", Helvetica, sans-serif', value: '"Trebuchet MS", Helvetica, sans-serif', google: false },
					{ label: 'Verdana, Geneva, sans-serif', value: 'Verdana, Geneva, sans-serif', google: false },
					{ label: 'Georgia, serif', value: 'Georgia, serif', google: false },
					{ label: '"Palatino Linotype", "Book Antiqua", Palatino, serif', value: '"Palatino Linotype", "Book Antiqua", Palatino, serif', google: false },
					{ label: '"Times New Roman", Times, serif', value: '"Times New Roman", Times, serif', google: false },
					{ label: 'Courier, monospace', value: 'Courier, monospace', google: false },
					{ label: '"Lucida Console", Monaco, monospace', value: '"Lucida Console", Monaco, monospace', google: false },
				],
			},
			{
				type: 'group',
				label: __( 'Google Fonts', 'gutenam-blocks' ),
				options: fontsarray,
			},
		];
		if ( typeof base_blocks_params !== 'undefined' && base_blocks_params.c_fonts ) {
			const newOptions = [];
			Object.keys( base_blocks_params.c_fonts ).forEach(function ( font ) {
				const name = base_blocks_params.c_fonts[font].name;
				const weights = [];
				Object.keys( base_blocks_params.c_fonts[font].weights ).forEach(function ( weight ) {
					weights.push( {
						value: base_blocks_params.c_fonts[font].weights[weight],
						label: base_blocks_params.c_fonts[font].weights[weight],
					} );
				} );
				const styles = [];
				Object.keys( base_blocks_params.c_fonts[font].styles ).forEach(function ( style ) {
					styles.push( {
						value: base_blocks_params.c_fonts[font].weights[style],
						label: base_blocks_params.c_fonts[font].weights[style],
					} );
				} );
				newOptions.push( {
					label: name,
					value: name,
					google: false,
					weights: weights,
					styles: styles,
				} );
			} );
			const custom_fonts = [
				{
					type: 'group',
					label: __( 'Custom Fonts', 'gutenam-blocks' ),
					options: newOptions,
				},
			];
			options = custom_fonts.concat( options );
		}
		let typographyOptions = applyFilters( 'base.typography_options', options );
		let typographySelectOptions = [].concat.apply( [], typographyOptions.map( option => option.options ) );
		const blockConfigObject = ( base_blocks_params.configuration ? JSON.parse( base_blocks_params.configuration ) : [] );
		if ( blockConfigObject[ 'base/typography' ] !== undefined && typeof blockConfigObject[ 'base/typography' ] === 'object' ) {
			if ( blockConfigObject[ 'base/typography' ].showAll !== undefined && ! blockConfigObject[ 'base/typography' ].showAll ) {
				typographyOptions = blockConfigObject[ 'base/typography' ].choiceArray;
				typographySelectOptions = blockConfigObject[ 'base/typography' ].choiceArray;
			}
		}
		this.setState( { typographyOptions: typographyOptions } );
		this.setState( { typographySelectOptions: typographySelectOptions } );
		this.setTypographyOptions( typographySelectOptions );
	}
	componentDidUpdate( prevProps ) {
		if ( this.props.fontFamily !== prevProps.fontFamily ) {
			this.setTypographyOptions( this.state.typographySelectOptions );
		}
	}
	setTypographyOptions( typographySelectOptions ) {
		let standardWeights = [
			{ value: 'inherit', label: __( 'Inherit', 'gutenam-blocks' ) },
			{ value: '400', label: __( 'Normal', 'gutenam-blocks' ) },
			{ value: 'bold', label: __( 'Bold', 'gutenam-blocks' ) },
		];
		const systemWeights = [
			{ value: 'inherit', label: __( 'Inherit', 'gutenam-blocks' ) },
			{ value: '100', label: __( 'Thin 100', 'gutenam-blocks' ) },
			{ value: '200', label: __( 'Extra-Light 200', 'gutenam-blocks' ) },
			{ value: '300', label: __( 'Light 300', 'gutenam-blocks' ) },
			{ value: '400', label: __( 'Regular', 'gutenam-blocks' ) },
			{ value: '500', label: __( 'Medium 500', 'gutenam-blocks' ) },
			{ value: '600', label: __( 'Semi-Bold 600', 'gutenam-blocks' ) },
			{ value: '700', label: __( 'Bold 700', 'gutenam-blocks' ) },
			{ value: '800', label: __( 'Extra-Bold 800', 'gutenam-blocks' ) },
			{ value: '900', label: __( 'Ultra-Bold 900', 'gutenam-blocks' ) },
		];
		const isBaseT = ( typeof base_blocks_params !== 'undefined' && base_blocks_params.isBaseT ? true : false );
		const headingWeights = ( typeof base_blocks_params !== 'undefined' && base_blocks_params.headingWeights ? base_blocks_params.headingWeights : [] );
		const buttonWeights = ( typeof base_blocks_params !== 'undefined' && base_blocks_params.buttonWeights ? base_blocks_params.buttonWeights : [] );
		if ( isBaseT && this.props.fontGroup === 'heading' && headingWeights && Array.isArray( headingWeights ) && headingWeights.length ) {
			standardWeights = headingWeights;
		}
		if ( isBaseT && this.props.fontGroup === 'button' && buttonWeights && Array.isArray( buttonWeights ) && buttonWeights.length ) {
			standardWeights = buttonWeights;
		}
		const standardStyles = [
			{ value: 'normal', label: __( 'Normal', 'gutenam-blocks' ) },
			{ value: 'italic', label: __( 'Italic', 'gutenam-blocks' ) },
		];
		const activeFont = ( typographySelectOptions ? typographySelectOptions.filter( ( { value } ) => value === this.props.fontFamily ) : '' );
		let fontStandardWeights = standardWeights;
		let fontStandardStyles = standardStyles;
		let typographySubsets = '';
		if ( activeFont && activeFont[ 0 ] ) {
			if ( undefined !== activeFont[ 0 ].weights ) {
				fontStandardWeights = activeFont[ 0 ].weights;
			}
			if ( undefined !== activeFont[ 0 ].styles ) {
				fontStandardStyles = activeFont[ 0 ].styles;
			}
		}
		if ( this.props.googleFont && this.props.fontFamily && typeof base_blocks_params !== 'undefined' && base_blocks_params.g_fonts && base_blocks_params.g_fonts[ this.props.fontFamily ] ) {
			fontStandardWeights = base_blocks_params.g_fonts[ this.props.fontFamily ].w.map( opt => ( { label: capitalizeFirstLetter( opt ), value: opt } ) );
			fontStandardStyles = base_blocks_params.g_fonts[ this.props.fontFamily ].i.map( opt => ( { label: capitalizeFirstLetter( opt ), value: opt } ) );
			typographySubsets = base_blocks_params.g_fonts[ this.props.fontFamily ].s.map( opt => ( { label: capitalizeFirstLetter( opt ), value: opt } ) );
		}
		if ( this.props.fontFamily === '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"' ) {
			fontStandardWeights = systemWeights;
		}
		this.setState( { typographyWeights: fontStandardWeights } );
		this.setState( { typographyStyles: fontStandardStyles } );
		this.setState( { typographySubsets: typographySubsets } );
		this.setState( { fontFamilyValue: activeFont } );
	}
	render() {
		const { tagLevel,
			label,
			htmlTag = 'heading',
			tagLowLevel = 1,
			tagHighLevel = 7,
			lineHeight,
			lineHeightType = '',
			fontSize,
			fontSizeType = 'px',
			googleFont,
			loadGoogleFont,
			fontFamily,
			fontVariant,
			fontWeight,
			fontStyle,
			fontSubset,
			letterSpacing,
			margin,
			marginControl,
			padding,
			paddingControl,
			onTagLevel,
			onTagLevelHTML,
			onLineHeight,
			onFontSize,
			onFontFamily,
			onFontVariant,
			onFontWeight,
			onFontStyle,
			onFontSubset,
			onFontChange,
			onFontArrayChange,
			onLoadGoogleFont,
			onGoogleFont,
			onLetterSpacing,
			onFontSizeType,
			onLineHeightType,
			onPadding,
			onPaddingControl,
			onMargin,
			onMarginControl,
			loadItalic,
			onLoadItalic,
			textTransform,
			onTextTransform,
			reLetterSpacing = false,
			letterSpacingType = 'px',
			otherTags = [],
			onLetterSpacingType,
			reset,
			defaultValue = {
				size: [ '', '', '' ],
				sizeType: 'px',
				lineHeight: [ '', '', '' ],
				lineType: 'px',
				letterSpacing: [ '', '', '' ],
				letterType: 'px',
				textTransform: '',
				family: '',
				google: false,
				style: '',
				weight: '',
				variant: '',
				subset: '',
				loadGoogle: true,
			}
		 } = this.props;
		const { controlSize, typographySelectOptions, typographyOptions, typographySubsets, typographyStyles, typographyWeights, fontFamilyValue } = this.state;
		const createhtmlTagControl = ( targetLevel ) => {
			return [ {
				icon: <HeadingLevelIcon level={ targetLevel } isPressed={ ( 1 === tagLevel && htmlTag && htmlTag === 'heading' ? true : false ) } />,
				title: sprintf(
					/* translators: %d: heading level e.g: "1", "2", "3" */
					__( 'Heading %d', 'gutenam-blocks' ),
					targetLevel
				),
				isActive: ( targetLevel === tagLevel && htmlTag && htmlTag === 'heading' ? true : false ),
				onClick: () => onTagLevelHTML( targetLevel, 'heading' ),
			} ];
		};
		const onReset = () => {
			if ( typeof reset === 'function' ){
				reset();
			} else {
				onFontArrayChange( defaultValue );
			}
		}
		const currentValue = {
			size: fontSize,
			sizeType: fontSizeType,
			lineHeight: lineHeight,
			lineType: lineHeightType,
			letterSpacing: letterSpacing,
			letterType: letterSpacingType,
			textTransform: textTransform,
			family: fontFamily,
			google: googleFont,
			style: fontStyle,
			weight: fontWeight,
			variant: fontVariant,
			subset: fontSubset,
			loadGoogle: loadGoogleFont,
		};
		const headingOptions = range( tagLowLevel, tagHighLevel ).map( createhtmlTagControl );
		if ( otherTags.p ) {
			headingOptions.push( [
				{
					icon: <HeadingLevelIcon level={ 'p' } isPressed={ ( htmlTag && htmlTag === 'p' ? true : false ) } />,
					title: __( 'Paragraph', 'gutenam-blocks' ),
					isActive: ( htmlTag && htmlTag === 'p' ? true : false ),
					onClick: () => onTagLevelHTML( 2, 'p' ),
				},
			] );
		}
		if ( otherTags.span ) {
			headingOptions.push( [
				{
					icon: <HeadingLevelIcon level={ 'span' } isPressed={ ( htmlTag && htmlTag === 'span' ? true : false ) } />,
					title: __( 'Span', 'gutenam-blocks' ),
					isActive: ( htmlTag && htmlTag === 'span' ? true : false ),
					onClick: () => onTagLevelHTML( 2, 'span' ),
				},
			] );
		}
		if ( otherTags.div ) {
			headingOptions.push( [
				{
					icon: <HeadingLevelIcon level={ 'div' } isPressed={ ( htmlTag && htmlTag === 'div' ? true : false ) } />,
					title: __( 'Div', 'gutenam-blocks' ),
					isActive: ( htmlTag && htmlTag === 'div' ? true : false ),
					onClick: () => onTagLevelHTML( 2, 'div' ),
				},
			] );
		}

		const onTypoFontChange = ( select ) => {
			if ( select === null ) {
				onTypoFontClear();
			} else {
				let variant;
				let weight;
				let subset;
				if ( select.google ) {
					if ( typeof base_blocks_params !== 'undefined' && base_blocks_params.g_fonts && ! base_blocks_params.g_fonts[ select.value ].v.includes( 'regular' ) ) {
						variant = base_blocks_params.g_fonts[ select.value ].v[ 0 ];
					} else {
						variant = 'regular';
					}
					if ( typeof base_blocks_params !== 'undefined' && base_blocks_params.g_fonts && ! base_blocks_params.g_fonts[ select.value ].w.includes( 'regular' ) ) {
						weight = base_blocks_params.g_fonts[ select.value ].w[ 0 ];
					} else {
						weight = '400';
					}
					if ( typeof base_blocks_params !== 'undefined' && base_blocks_params.g_fonts && base_blocks_params.g_fonts[ select.value ].s.length > 1 ) {
						subset = 'latin';
					} else {
						subset = '';
					}
				} else {
					subset = '';
					variant = '';
					weight = 'inherit';
				}
				if ( onFontArrayChange ) {
					onFontArrayChange( { google: select.google, family: select.value, variant: variant, weight: weight, style: 'normal', subset: subset } );
				} else {
					onFontChange( select );
					onFontVariant( variant );
					onFontWeight( weight );
					onFontStyle( 'normal' );
					onFontSubset( subset );
				}
			}
		};
		const onTypoFontClear = () => {
			if ( onFontArrayChange ) {
				onFontArrayChange( { google: false, family: '', variant: '', weight: 'inherit', style: 'normal', subset: '' } );
			} else {
				onGoogleFont( false );
				onFontFamily( '' );
				onFontVariant( '' );
				onFontWeight( 'inherit' );
				onFontStyle( 'normal' );
				onFontSubset( '' );
			}
		};
		const onTypoFontWeightChange = ( select ) => {
			if ( googleFont ) {
				let variant;
				if ( 'italic' === fontStyle ) {
					if ( 'regular' === select ) {
						variant = 'italic';
					} else {
						variant = select + 'italic';
					}
				} else {
					variant = select;
				}
				if ( onFontArrayChange ) {
					onFontArrayChange( { variant: variant, weight: ( 'regular' === select ? '400' : select ) } );
				} else {
					onFontVariant( variant );
					onFontWeight( ( 'regular' === select ? '400' : select ) );
				}
			} else if ( onFontArrayChange ) {
				onFontArrayChange( { variant: '', weight: ( 'regular' === select ? '400' : select ) } );
			} else {
				onFontVariant( '' );
				onFontWeight( ( 'regular' === select ? '400' : select ) );
			}
		};
		const onTypoFontStyleChange = ( select ) => {
			if ( googleFont ) {
				let variant;
				if ( 'italic' === select ) {
					if ( ! fontWeight || 'regular' === fontWeight ) {
						variant = 'italic';
					} else {
						variant = fontWeight + 'italic';
					}
				} else {
					variant = ( fontWeight ? fontWeight : 'regular' );
				}
				if ( onFontArrayChange ) {
					onFontArrayChange( { variant: variant, style: select } );
				} else {
					onFontVariant( variant );
					onFontStyle( select );
				}
			} else if ( onFontArrayChange ) {
				onFontArrayChange( { variant: '', style: select } );
			} else {
				onFontVariant( '' );
				onFontStyle( select );
			}
		};
		const createLevelControl = ( targetLevel ) => {
			return [ {
				icon: <HeadingLevelIcon level={ targetLevel } isPressed={ targetLevel === tagLevel } />,
				title: sprintf(
					/* translators: %d: heading level e.g: "1", "2", "3" */
					__( 'Heading %d', 'gutenam-blocks' ),
					targetLevel
				),
				isActive: targetLevel === tagLevel,
				onClick: () => onTagLevel( targetLevel ),
			} ];
		};
		const textTransformOptions = [
			{ value: 'none', label: __( '-', 'gutenam-blocks' ), tooltip: __( 'None', 'gutenam-blocks' ) },
			{ value: 'uppercase', label: __( 'AB', 'gutenam-blocks' ), tooltip: __( 'Uppercase', 'gutenam-blocks' ) },
			{ value: 'lowercase', label: __( 'ab', 'gutenam-blocks' ), tooltip: __( 'Lowercase', 'gutenam-blocks' ) },
			{ value: 'capitalize', label: __( 'Ab', 'gutenam-blocks' ), tooltip: __( 'Capitalize', 'gutenam-blocks' ) },
		];
		const fontMin = ( fontSizeType !== 'px' ? 0.2 : 5 );
		const fontMax = ( fontSizeType !== 'px' ? 12 : 300 );
		const fontStep = ( fontSizeType !== 'px' ? 0.01 : 1 );
		const lineMin = ( lineHeightType !== 'px' ? 0.2 : 5 );
		const lineMax = ( lineHeightType !== 'px' ? 12 : 200 );
		const lineStep = ( lineHeightType !== 'px' ? 0.01 : 1 );
		const usingReg = typographyWeights.some(function(el) {
			return el.value === 'regular';
		});

		return (
			<>
				<div className={ 'components-base-control bsb-typography-control' }>
					{ label && (
						<div className='base-title-bar base-component__header'>
							<label
								className="base-heading-fontfamily-title components-typography-control__label base-component__header__title"
							>
								{ label }
							</label>
						</div>
					) }
					<div className="base-title-bar">
						{ label && (
							<h2 className="bst-heading-fontfamily-title">{ label }</h2>
							// <span className="base-control-title">{ label }</span>
						) }
						{ reset && (
							<Button
								className="is-reset is-single"
								isSmall
								disabled={ ( ( isEqual( currentValue, defaultValue ) ) ? true : false ) }
								icon={ undo }
								onClick={ () => onReset() }
							></Button>
						) }
					</div>
					{ onTagLevel && (
						<>
							{ onTagLevelHTML && (
								<TagSelect
									label={__( 'HTML Tag', 'gutenam-blocks' )}
									value={ 'heading' === htmlTag ? tagLevel : htmlTag }
									onChange={ (value) => {
										if ( 'div' === value || 'p' === value || 'span' === value ) {
											onTagLevelHTML( 2, value );
										} else {
											onTagLevelHTML( value, 'heading' );
										}
									} }
								/>
							) }
							{ ! onTagLevelHTML && (
								<TagSelect
									label={__( 'HTML Tag', 'gutenam-blocks' )}
									value={ tagLevel }
									headingOnly={ true }
									tagHighLevel={ tagHighLevel }
									tagLowLevel={ tagLowLevel }
									onChange={ (value) => {
										onTagLevel( value);
									} }
								/>
							) }
						</>
					) }
					{ onFontSize && onFontSizeType && (
						<ResponsiveFontSizeControl
							label={ __( 'Font Size', 'gutenam-blocks' ) }
							value={ ( fontSize && undefined !== fontSize[ 0 ] ? fontSize[ 0 ] : '' ) }
							onChange={ value => onFontSize( [ value, ( fontSize && undefined !== fontSize[ 1 ] ? fontSize[ 1 ] : '' ), ( fontSize && undefined !== fontSize[ 2 ] ? fontSize[ 2 ] : '' ) ] ) }
							tabletValue={ ( fontSize && undefined !== fontSize[ 1 ] ? fontSize[ 1 ] : '' ) }
							onChangeTablet={ ( value ) => onFontSize( [ ( fontSize && undefined !== fontSize[ 0 ] ? fontSize[ 0 ] : '' ), value, ( fontSize && undefined !== fontSize[ 2 ] ? fontSize[ 2 ] : '' ) ] ) }
							mobileValue={ ( fontSize && undefined !== fontSize[ 2 ] ? fontSize[ 2 ] : '' ) }
							onChangeMobile={ ( value ) => onFontSize( [ ( fontSize && undefined !== fontSize[ 0 ] ? fontSize[ 0 ] : '' ), ( fontSize && undefined !== fontSize[ 1 ] ? fontSize[ 1 ] : '' ), value ] ) }
							min={ 0 }
							max={ fontMax }
							step={ fontStep }
							unit={ ( fontSizeType ? fontSizeType : 'px' ) }
							onUnit={ ( value ) => onFontSizeType( value ) }
							units={[ 'px', 'em', 'rem', 'vw' ]}
						/>
					) }
					{ ! onTextTransform && onLineHeight && onLineHeightType && (
						<ResponsiveUnitControl
							label={ __( 'Line Height', 'gutenam-blocks' ) }
							value={ ( lineHeight && undefined !== lineHeight[ 0 ] ? lineHeight[ 0 ] : '' ) }
							onChange={ value => onLineHeight( [ value, ( lineHeight && undefined !== lineHeight[ 1 ] ? lineHeight[ 1 ] : '' ), ( lineHeight && undefined !== lineHeight[ 2 ] ? lineHeight[ 2 ] : '' ) ] ) }
							tabletValue={ ( lineHeight && undefined !== lineHeight[ 1 ] ? lineHeight[ 1 ] : '' ) }
							onChangeTablet={ ( value ) => onLineHeight( [ ( lineHeight && undefined !== lineHeight[ 0 ] ? lineHeight[ 0 ] : '' ), value, ( lineHeight && undefined !== lineHeight[ 2 ] ? lineHeight[ 2 ] : '' ) ] ) }
							mobileValue={ ( lineHeight && undefined !== lineHeight[ 2 ] ? lineHeight[ 2 ] : '' ) }
							onChangeMobile={ ( value ) => onLineHeight( [ ( lineHeight && undefined !== lineHeight[ 0 ] ? lineHeight[ 0 ] : '' ), ( lineHeight && undefined !== lineHeight[ 1 ] ? lineHeight[ 1 ] : '' ), value ] ) }
							min={ lineMin }
							max={ lineMax }
							step={ lineStep }
							unit={ ( lineHeightType ? lineHeightType : '-' ) }
							onUnit={ ( value ) => onLineHeightType( value ) }
							units={ [ '-', 'px', 'em', 'rem' ] }
						/>
					)}
					{ onTextTransform && onLineHeight && onLineHeightType && (
						<TwoColumn className="bsb-font-settings">
							<ResponsiveUnitControl
								label={ __( 'Line Height', 'gutenam-blocks' ) }
								value={ ( lineHeight && undefined !== lineHeight[ 0 ] ? lineHeight[ 0 ] : '' ) }
								onChange={ value => onLineHeight( [ value, ( lineHeight && undefined !== lineHeight[ 1 ] ? lineHeight[ 1 ] : '' ), ( lineHeight && undefined !== lineHeight[ 2 ] ? lineHeight[ 2 ] : '' ) ] ) }
								tabletValue={ ( lineHeight && undefined !== lineHeight[ 1 ] ? lineHeight[ 1 ] : '' ) }
								onChangeTablet={ ( value ) => onLineHeight( [ ( lineHeight && undefined !== lineHeight[ 0 ] ? lineHeight[ 0 ] : '' ), value, ( lineHeight && undefined !== lineHeight[ 2 ] ? lineHeight[ 2 ] : '' ) ] ) }
								mobileValue={ ( lineHeight && undefined !== lineHeight[ 2 ] ? lineHeight[ 2 ] : '' ) }
								onChangeMobile={ ( value ) => onLineHeight( [ ( lineHeight && undefined !== lineHeight[ 0 ] ? lineHeight[ 0 ] : '' ), ( lineHeight && undefined !== lineHeight[ 1 ] ? lineHeight[ 1 ] : '' ), value ] ) }
								min={ lineMin }
								max={ lineMax }
								step={ lineStep }
								unit={ ( lineHeightType ? lineHeightType : '-' ) }
								onUnit={ ( value ) => onLineHeightType( value ) }
								units={ [  '-', 'px', 'em', 'rem' ] }
								compressedDevice={ true }
							/>
							<BaseRadioButtons
								label={__( 'Letter Case', 'gutenam-blocks' )}
								value={textTransform}
								options={ textTransformOptions }
								className={ 'bsb-letter-case' }
								allowClear={ true }
								onChange={ ( value ) => onTextTransform( value ) }
							/>
						</TwoColumn>
					)}
					{ onTextTransform && ( ! onLineHeight || ! onLineHeightType ) && (
						<BaseRadioButtons
							label={__( 'Letter Case', 'gutenam-blocks' )}
							value={textTransform}
							options={ textTransformOptions }
							className={ 'bsb-letter-case' }
							allowClear={ true }
							onChange={ ( value ) => onTextTransform( value ) }
						/>
					)}
					{ onFontFamily && onTypoFontClear && (
						<>
							<div className="components-base-control">
								<div className="base-component__header base-title-bar">
									<label className="base-control-title base-component__header__title">{ __( 'Font Family', 'gutenam-blocks' ) }</label>
								</div>
								<div className="typography-family-select-form-row">
									<Select
										options={ typographyOptions }
										value={ fontFamilyValue }
										classNamePrefix="bsb-react-select"
										isMulti={ false }
										maxMenuHeight={ 300 }
										isClearable={ true }
										placeholder={ __( 'Select a font family', 'gutenam-blocks' ) }
										onChange={ onTypoFontChange }
										styles={{
											control: (baseStyles, state) => ({
											...baseStyles,
											borderColor: 'rgb(30, 30, 30)',
											borderRadius:'2px',
											':hover': {
												borderColor: 'rgb(30, 30, 30)',
											  },
											}),
										}}
									/>
								</div>
							</div>
							{ onFontWeight && (
								<SelectControl
									label={ __( 'Font Weight', 'gutenam-blocks' ) }
									value={ ( '400' === fontWeight && usingReg ? 'regular' : fontWeight ) }
									options={ typographyWeights }
									onChange={ onTypoFontWeightChange }
									className={ 'bsb-select-style' }
								/>
							) }
							{ fontFamily && onFontStyle && (
								<SelectControl
									label={ __( 'Font Style', 'gutenam-blocks' ) }
									value={ fontStyle }
									options={ typographyStyles }
									onChange={ onTypoFontStyleChange }
									className={ 'bsb-select-style' }
								/>
							) }
							{ fontFamily && googleFont && onLoadGoogleFont && (
								<ToggleControl
									label={ __( 'Load Google Font on Frontend', 'gutenam-blocks' ) }
									checked={ loadGoogleFont }
									onChange={ onLoadGoogleFont }
								/>
							) }
							{ fontFamily && googleFont && loadGoogleFont && onFontStyle && 'normal' === fontStyle && onLoadItalic && undefined !== typographyStyles[ 1 ] && undefined !== typographyStyles[ 1 ].value && 'italic' === typographyStyles[ 1 ].value && (
								<ToggleControl
									label={ __( 'Load Italic Styles Also', 'gutenam-blocks' ) }
									checked={ loadItalic }
									onChange={ onLoadItalic }
								/>
							) }
							{ onLetterSpacing && reLetterSpacing && (
								<ResponsiveUnitControl
									label={ __( 'Letter Spacing', 'gutenam-blocks' ) }
									value={ ( undefined !== reLetterSpacing && undefined !== reLetterSpacing[0] ? reLetterSpacing[0] : '' ) }
									onChange={ value => onLetterSpacing( [ value, ( undefined !== reLetterSpacing && undefined !== reLetterSpacing[1] ? reLetterSpacing[1] : '' ), ( undefined !== reLetterSpacing && undefined !== reLetterSpacing[2] ? reLetterSpacing[2] : '' ) ] ) }
									tabletValue={ ( undefined !== reLetterSpacing && undefined !== reLetterSpacing[1] ? reLetterSpacing[1] : '' ) }
									onChangeTablet={ ( value ) => onLetterSpacing( [ ( undefined !== reLetterSpacing && undefined !== reLetterSpacing[0] ? reLetterSpacing[0] : '' ), value, ( undefined !== reLetterSpacing && undefined !== reLetterSpacing[2] ? reLetterSpacing[2] : '' ) ] ) }
									mobileValue={ ( undefined !== reLetterSpacing && undefined !== reLetterSpacing[2] ? reLetterSpacing[2] : '' ) }
									onChangeMobile={ ( value ) => onLetterSpacing( [ ( undefined !== reLetterSpacing && undefined !== reLetterSpacing[0] ? reLetterSpacing[0] : '' ), ( undefined !== reLetterSpacing && undefined !== reLetterSpacing[1] ? reLetterSpacing[1] : '' ), value ] ) }
									min={ -5 }
									max={ 25 }
									step={ ( onLetterSpacingType && onLetterSpacingType === 'px' ? 0.1 : 0.01 ) }
									unit={ ( onLetterSpacingType ? letterSpacingType : 'px' ) }
									onUnit={ ( value ) => onLetterSpacingType( value ) }
									units={ ( onLetterSpacingType ? [ 'px', 'em', 'rem' ] : [ 'px' ] ) }
								/>
							) }
							{ onLetterSpacing && ! reLetterSpacing && (
								<RangeControl
									label={ __( 'Letter Spacing', 'gutenam-blocks' ) }
									value={ ( undefined !== letterSpacing ? letterSpacing : '' ) }
									onChange={ ( value ) => onLetterSpacing( value ) }
									min={ -5 }
									max={ 25 }
									step={ 0.1 }
								/>
							) }
						</>
					) }
					{ onPadding && onPaddingControl && (
						<>
							<MeasurementControls
								label={ __( 'Padding (px)', 'gutenam-blocks' ) }
								measurement={ ( padding ? padding : '' ) }
								control={ paddingControl }
								onChange={ ( value ) => onPadding( value ) }
								onControl={ ( value ) => onPaddingControl( value ) }
								min={ 0 }
								max={ 100 }
								step={ 1 }
								allowEmpty={ false }
							/>
						</>
					) }
					{ onMargin && onMarginControl && (
						<>
							<MeasurementControls
								label={ __( 'Margin (px)', 'gutenam-blocks' ) }
								measurement={ ( margin ? margin : '' ) }
								control={ marginControl }
								onChange={ ( value ) => onMargin( value ) }
								onControl={ ( value ) => onMarginControl( value ) }
								min={ -100 }
								max={ 100 }
								step={ 1 }
								allowEmpty={ false }
							/>
						</>
					) }
				</div>
			</>
		);
	}
}
export default ( TypographyControls );
