import { __ } from '@wordpress/i18n';

import {
	PopColorControl,
	TypographyControls,
	BasePanelBody,
} from '@base/components';

import {
	ToggleControl
} from '@wordpress/components';

import { useState } from '@wordpress/element';

export default function LabelOptions( { setAttributes, styleAttribute, labelFont } ) {

	const [ labelPaddingControl, setLabelPaddingControl ] = useState( 'individual' );
	const [ labelMarginControl, setLabelMarginControl ] = useState( 'individual' );

	const saveLabelFont = ( value ) => {
		setAttributes( { ...labelFont, ...value }, 'labelFont' );
	};

	const saveStyle = ( value ) => {
		setAttributes( { ...styleAttribute, ...value }, 'style' );
	}

	return (
		<>
			<PopColorControl
				label={__( 'Label Color', 'gutenam-blocks' )}
				value={( labelFont.color ? labelFont.color : '' )}
				default={''}
				onChange={value => {
					saveLabelFont( { color: value } );
				}}
			/>
			<ToggleControl
				label={__( 'Show Required?', 'gutenam-blocks' )}
				help={__( 'If off required asterisk is removed.', 'gutenam-blocks' )}
				checked={( undefined !== styleAttribute.showRequired ? styleAttribute.showRequired : true )}
				onChange={( value ) => saveStyle( { showRequired: value } )}
			/>
			{styleAttribute.showRequired && (
				<PopColorControl
					label={__( 'Required Color', 'gutenam-blocks' )}
					value={( styleAttribute.requiredColor ? styleAttribute.requiredColor : '' )}
					default={''}
					onChange={( value ) => saveStyle( { requiredColor: value } )}

				/>
			)}
			<TypographyControls
				fontSize={labelFont.size}
				onFontSize={( value ) => saveLabelFont( { size: value } )}
				fontSizeType={labelFont.sizeType}
				onFontSizeType={( value ) => saveLabelFont( { sizeType: value } )}
				lineHeight={labelFont.lineHeight}
				onLineHeight={( value ) => saveLabelFont( { lineHeight: value } )}
				lineHeightType={labelFont.lineType}
				onLineHeightType={( value ) => saveLabelFont( { lineType: value } )}
			/>
			<BasePanelBody
				title={__( 'Advanced Label Settings', 'gutenam-blocks' )}
				initialOpen={false}
				panelName={'bsb-form-advanced-label-settings'}
			>
				<TypographyControls
					letterSpacing={labelFont.letterSpacing}
					onLetterSpacing={( value ) => saveLabelFont( { letterSpacing: value.toString() } )}
					textTransform={labelFont.textTransform}
					onTextTransform={( value ) => saveLabelFont( { textTransform: value } )}
					fontFamily={labelFont.family}
					onFontFamily={( value ) => saveLabelFont( { family: value } )}
					onFontChange={( select ) => {
						saveLabelFont( {
							family: select.value,
							google: select.google,
						} );
					}}
					onFontArrayChange={( values ) => saveLabelFont( values )}
					googleFont={labelFont.google}
					onGoogleFont={( value ) => saveLabelFont( { google: value } )}
					loadGoogleFont={labelFont.loadGoogle}
					onLoadGoogleFont={( value ) => saveLabelFont( { loadGoogle: value } )}
					fontVariant={labelFont.variant}
					onFontVariant={( value ) => saveLabelFont( { variant: value } )}
					fontWeight={labelFont.weight}
					onFontWeight={( value ) => saveLabelFont( { weight: value } )}
					fontStyle={labelFont.style}
					onFontStyle={( value ) => saveLabelFont( { style: value } )}
					fontSubset={labelFont.subset}
					onFontSubset={( value ) => saveLabelFont( { subset: value } )}
					padding={labelFont.padding}
					onPadding={( value ) => saveLabelFont( { padding: value } )}
					paddingControl={labelPaddingControl}
					onPaddingControl={( value ) => setLabelPaddingControl( value )}
					margin={labelFont.margin}
					onMargin={( value ) => saveLabelFont( { margin: value } )}
					marginControl={labelMarginControl}
					onMarginControl={( value ) => setLabelMarginControl( value )}
				/>
			</BasePanelBody>
		</>
	);

}
