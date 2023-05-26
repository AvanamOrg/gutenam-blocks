/**
 * BLOCK: Base Count Up
 */

/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
import {
	PopColorControl,
	TypographyControls,
	RangeControl,
	BasePanelBody,
	ResponsiveAlignControls,
	InspectorControlTabs,
	BaseInspectorControls,
	BaseBlockDefaults,
	ResponsiveMeasureRangeControl
} from '@base/components';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, Component, Fragment } from '@wordpress/element';
import metadata from './block.json';

import {
	TextControl,
	ToggleControl,
	TabPanel,
	Dashicon,
	SelectControl,
	__experimentalNumberControl as NumberControl
} from '@wordpress/components';

/**
 * Count Up Settings
 */
function Inspector( {
						attributes,
						setAttributes,
						numberPaddingMouseOver,
						numberMarginMouseOver,
						titlePaddingMouseOver,
						titleMarginMouseOver
					} ) {

	const [ activeTab, setActiveTab ] = useState( 'general' );

	const {
		end,
		start,
		prefix,
		suffix,
		duration,
		separator,
		displayTitle,
		titleFont,
		titleAlign,
		titleColor,
		titleMinHeight,
		titlePadding,
		titleMobilePadding,
		titleMobileMargin,
		titleTabletMargin,
		titleTabletPadding,
		titleMargin,
		titlePaddingType,
		titleMarginType,
		numberColor,
		numberMinHeight,
		numberFont,
		numberAlign,
		numberPadding,
		numberMobilePadding,
		numberMobileMargin,
		numberTabletMargin,
		numberTabletPadding,
		numberMargin,
		numberPaddingType,
		numberMarginType,
		decimalSpaces,
		decimal,
	} = attributes;

	const saveTitleFont = ( value ) => {
		const newUpdate = titleFont.map( ( item, index ) => {
			if ( 0 === index ) {
				item = { ...item, ...value };
			}
			return item;
		} );
		setAttributes( {
			titleFont: newUpdate,
		} );
	};

	const saveNumberFont = ( value ) => {
		const newUpdate = numberFont.map( ( item, index ) => {
			if ( 0 === index ) {
				item = { ...item, ...value };
			}
			return item;
		} );
		setAttributes( {
			numberFont: newUpdate,
		} );
	};
	let theSeparator = ( separator === true ? ',' : separator );
	theSeparator = ( theSeparator === false ? '' : theSeparator );
	let step = 1; 
	if ( decimal && decimalSpaces ) {
		switch (decimalSpaces) {
			case 1:
				step = 0.1
				break;
			case 2:
				step = 0.01
				break;
			case 3:
				step = 0.001
				break;
			case 4:
				step = 0.0001
				break;
			case 5:
			step = 0.00001
				break;
			case 6:
			step = 0.000001
				break;
			case 7:
			step = 0.0000001
				break;
			case 8:
			step = 0.00000001
				break;
			default:
				step = 1
				break;
		}
	}
	return (
		<BaseInspectorControls blockSlug={ 'base/countup' }>

			<InspectorControlTabs
				panelName={ 'countup' }
				setActiveTab={ ( value ) => setActiveTab( value ) }
				activeTab={ activeTab }
			/>

			{( activeTab === 'general' ) &&
				<>
					<BasePanelBody
						title={__( 'Count Up Settings' )}
						initialOpen={true}
						panelName={'bsb-inspector-countup-settings'}
					>

						<div className="bst-columns-control">

							<div style={{ marginBottom: '15px' }}>
								<NumberControl
									label={__( 'Starting Number', 'gutenam-blocks' )}
									value={start}
									onChange={( value ) => setAttributes( { start: parseFloat( value ) } )}
									min={0}
									step={step}
									isShiftStepEnabled={true}
									shiftStep={10}
								/>
							</div>

							<div style={{ marginBottom: '15px' }}>
								<NumberControl
									label={__( 'Ending Number', 'gutenam-blocks' )}
									value={end}
									onChange={( value ) => {
										setAttributes( { end: parseFloat( value ) } )
									}}
									min={0}
									step={step}
									isShiftStepEnabled={true}
									shiftStep={10}
								/>
							</div>

							<TextControl
								label={__( 'Number Prefix', 'gutenam-blocks' )}
								value={prefix}
								onChange={value => setAttributes( { prefix: value } )}
							/>

							<TextControl
								label={__( 'Number Suffix', 'gutenam-blocks' )}
								value={suffix}
								onChange={value => setAttributes( { suffix: value } )}
							/>

							<RangeControl
								label={__( 'Animation Duration', 'gutenam-blocks' )}
								value={duration}
								onChange={( value ) => setAttributes( { duration: value } )}
								min={0.1}
								max={25}
								step={0.1}
							/>

							<SelectControl
								label={__( 'Thousand Separator', 'gutenam-blocks' )}
								value={theSeparator}
								options={[
									{ value: '', label: __( 'None', 'gutenam-blocks' ) },
									{ value: ',', label: ',' },
									{ value: '.', label: '.' },
								]}
								onChange={value => setAttributes( { separator: value } )}
							/>
							<SelectControl
								label={__( 'Decimal', 'gutenam-blocks' )}
								value={decimal}
								options={[
									{ value: '', label: __( 'None', 'gutenam-blocks' ) },
									{ value: '.', label: '.' },
									{ value: ',', label: ',' },
								]}
								onChange={value => setAttributes( { decimal: value } )}
							/>
							{decimal && (
								<RangeControl
									label={__( 'Decimal Spaces', 'gutenam-blocks' )}
									value={decimalSpaces}
									onChange={( value ) => setAttributes( { decimalSpaces: value } )}
									min={1}
									max={8}
									step={1}
								/>
							)}
						</div>
					</BasePanelBody>
				</>
			}

			{( activeTab === 'style' ) &&
				<>
					<BasePanelBody
						title={__( 'Title Settings', 'gutenam-blocks' )}
						panelName={'titleStyle'}
						blockSlug={ 'base/countup' }
					>
						<ToggleControl
							label={__( 'Show Title', 'gutenam-blocks' )}
							checked={displayTitle}
							onChange={( value ) => setAttributes( { displayTitle: value } )}
						/>
						{
							displayTitle &&
							<>
								<PopColorControl
									label={__( 'Title Color', 'gutenam-blocks' )}
									value={( titleColor ? titleColor : '' )}
									default={''}
									onChange={value => setAttributes( { titleColor: value } )}
								/>
								<ResponsiveAlignControls
									label={__( 'Text Alignment', 'gutenam-blocks' )}
									value={( titleAlign && titleAlign[ 0 ] ? titleAlign[ 0 ] : '' )}
									mobileValue={( titleAlign && titleAlign[ 2 ] ? titleAlign[ 2 ] : '' )}
									tabletValue={( titleAlign && titleAlign[ 1 ] ? titleAlign[ 1 ] : '' )}
									onChange={( nextAlign ) => setAttributes( { titleAlign: [ nextAlign, ( titleAlign && titleAlign[ 1 ] ? titleAlign[ 1 ] : '' ), ( titleAlign && titleAlign[ 2 ] ? titleAlign[ 2 ] : '' ) ] } )}
									onChangeTablet={( nextAlign ) => setAttributes( { titleAlign: [ ( titleAlign && titleAlign[ 0 ] ? titleAlign[ 0 ] : '' ), nextAlign, ( titleAlign && titleAlign[ 2 ] ? titleAlign[ 2 ] : '' ) ] } )}
									onChangeMobile={( nextAlign ) => setAttributes( { titleAlign: [ ( titleAlign && titleAlign[ 0 ] ? titleAlign[ 0 ] : '' ), ( titleAlign && titleAlign[ 1 ] ? titleAlign[ 1 ] : '' ), nextAlign ] } )}
								/>
								<h2 className="bst-heading-size-title">{__( 'Min Height' )}</h2>
								<TabPanel className="bst-size-tabs"
										  activeClass="active-tab"
										  tabs={[
											  {
												  name     : 'desk',
												  title    : <Dashicon icon="desktop"/>,
												  className: 'bst-desk-tab',
											  },
											  {
												  name     : 'tablet',
												  title    : <Dashicon icon="tablet"/>,
												  className: 'bst-tablet-tab',
											  },
											  {
												  name     : 'mobile',
												  title    : <Dashicon icon="smartphone"/>,
												  className: 'bst-mobile-tab',
											  },
										  ]}>
									{
										( tab ) => {
											let tabout;
											if ( tab.name ) {
												if ( 'mobile' === tab.name ) {
													tabout = (
														<RangeControl
															value={( ( undefined !== titleMinHeight && undefined !== titleMinHeight[ 2 ] ) ? titleMinHeight[ 2 ] : '' )}
															onChange={value => setAttributes( { titleMinHeight: [ ( ( undefined !== titleMinHeight && undefined !== titleMinHeight[ 0 ] ) ? titleMinHeight[ 0 ] : '' ), ( ( undefined !== titleMinHeight && undefined !== titleMinHeight[ 1 ] ) ? titleMinHeight[ 1 ] : '' ), value ] } )}
															step={1}
															min={0}
															max={600}
														/>
													);
												} else if ( 'tablet' === tab.name ) {
													tabout = (
														<RangeControl
															value={( ( undefined !== titleMinHeight && undefined !== titleMinHeight[ 1 ] ) ? titleMinHeight[ 1 ] : '' )}
															onChange={value => setAttributes( { titleMinHeight: [ ( ( undefined !== titleMinHeight && undefined !== titleMinHeight[ 0 ] ) ? titleMinHeight[ 0 ] : '' ), value, ( ( undefined !== titleMinHeight && undefined !== titleMinHeight[ 2 ] ) ? titleMinHeight[ 2 ] : '' ) ] } )}
															step={1}
															min={0}
															max={600}
														/>
													);
												} else {
													tabout = (
														<RangeControl
															value={( ( undefined !== titleMinHeight && undefined !== titleMinHeight[ 0 ] ) ? titleMinHeight[ 0 ] : '' )}
															onChange={value => setAttributes( { titleMinHeight: [ value, ( ( undefined !== titleMinHeight && undefined !== titleMinHeight[ 1 ] ) ? titleMinHeight[ 1 ] : '' ), ( ( undefined !== titleMinHeight && undefined !== titleMinHeight[ 2 ] ) ? titleMinHeight[ 2 ] : '' ) ] } )}
															step={1}
															min={0}
															max={600}
														/>
													);
												}
											}
											return <div className={tab.className} key={tab.className}>{tabout}</div>;
										}
									}
								</TabPanel>
								<TypographyControls
									fontGroup={'countup-heading'}
									tagLowLevel={2}
									tagHighLevel={7}
									otherTags={{ 'p': true, 'span': true, 'div': true }}
									tagLevel={titleFont[ 0 ].level}
									htmlTag={titleFont[ 0 ].htmlTag}
									onTagLevel={( value ) => saveTitleFont( { level: value } )}
									onTagLevelHTML={( level, tag ) => {
										saveTitleFont( { level: level, htmlTag: tag } );
									}}
									fontSize={titleFont[ 0 ].size}
									onFontSize={( value ) => saveTitleFont( { size: value } )}
									fontSizeType={titleFont[ 0 ].sizeType}
									onFontSizeType={( value ) => saveTitleFont( { sizeType: value } )}
									lineHeight={titleFont[ 0 ].lineHeight}
									onLineHeight={( value ) => saveTitleFont( { lineHeight: value } )}
									lineHeightType={titleFont[ 0 ].lineType}
									onLineHeightType={( value ) => {
										saveTitleFont( { lineType: value } )
									}}
									letterSpacing={titleFont[ 0 ].letterSpacing}
									onLetterSpacing={( value ) => saveTitleFont( { letterSpacing: value } )}
									fontFamily={titleFont[ 0 ].family}
									textTransform={ titleFont[ 0 ].textTransform }
									onTextTransform={ ( value ) => saveTitleFont( { textTransform: value } ) }
									onFontFamily={( value ) => saveTitleFont( { family: value } )}
									onFontChange={( select ) => {
										saveTitleFont( {
											family: select.value,
											google: select.google,
										} );
									}}
									onFontArrayChange={( values ) => saveTitleFont( values )}
									googleFont={titleFont[ 0 ].google}
									onGoogleFont={( value ) => saveTitleFont( { google: value } )}
									loadGoogleFont={titleFont[ 0 ].loadGoogle}
									onLoadGoogleFont={( value ) => saveTitleFont( { loadGoogle: value } )}
									fontVariant={titleFont[ 0 ].variant}
									onFontVariant={( value ) => saveTitleFont( { variant: value } )}
									fontWeight={titleFont[ 0 ].weight}
									onFontWeight={( value ) => saveTitleFont( { weight: value } )}
									fontStyle={titleFont[ 0 ].style}
									onFontStyle={( value ) => saveTitleFont( { style: value } )}
									fontSubset={titleFont[ 0 ].subset}
									onFontSubset={( value ) => saveTitleFont( { subset: value } )}
								/>
								<ResponsiveMeasureRangeControl
									label={__( 'Title Padding', 'gutenam-blocks' )}
									value={titlePadding}
									tabletValue={titleTabletPadding}
									mobileValue={titleMobilePadding}
									onChange={( value ) => setAttributes( { titlePadding: value } )}
									onChangeTablet={( value ) => setAttributes( { titleTabletPadding: value } )}
									onChangeMobile={( value ) => setAttributes( { titleMobilePadding: value } )}
									min={0}
									max={( titlePaddingType === 'em' || titlePaddingType === 'rem' ? 12 : 200 )}
									step={( titlePaddingType === 'em' || titlePaddingType === 'rem' ? 0.1 : 1 )}
									unit={titlePaddingType}
									units={[ 'px', 'em', 'rem', '%' ]}
									onUnit={( value ) => setAttributes( { titlePaddingType: value } )}
									onMouseOver={ titlePaddingMouseOver.onMouseOver }
									onMouseOut={ titlePaddingMouseOver.onMouseOut }
								/>
								<ResponsiveMeasureRangeControl
									label={__( 'Title Margin', 'gutenam-blocks' )}
									value={titleMargin}
									tabletValue={titleTabletMargin}
									mobileValue={titleMobileMargin}
									onChange={( value ) => setAttributes( { titleMargin: value } )}
									onChangeTablet={( value ) => setAttributes( { titleTabletMargin: value } )}
									onChangeMobile={( value ) => setAttributes( { titleMobileMargin: value } )}
									min={( titleMarginType === 'em' || titleMarginType === 'rem' ? -12 : -200 )}
									max={( titleMarginType === 'em' || titleMarginType === 'rem' ? 12 : 200 )}
									step={( titleMarginType === 'em' || titleMarginType === 'rem' ? 0.1 : 1 )}
									unit={titleMarginType}
									units={[ 'px', 'em', 'rem', '%', 'vh' ]}
									onUnit={( value ) => setAttributes( { titleMarginType: value } )}
									onMouseOver={ titleMarginMouseOver.onMouseOver }
									onMouseOut={ titleMarginMouseOver.onMouseOut }
								/>
							</>
						}
					</BasePanelBody>

					<BasePanelBody
						title={__( 'Number Settings', 'gutenam-blocks' )}
						initialOpen={false}
						panelName={'numberStyle'}
						blockSlug={ 'base/countup' }
					>
						<PopColorControl
							label={__( 'Number Color', 'gutenam-blocks' )}
							value={( numberColor ? numberColor : '' )}
							default={''}
							onChange={value => setAttributes( { numberColor: value } )}
						/>
						<ResponsiveAlignControls
							label={__( 'Text Alignment', 'gutenam-blocks' )}
							value={( numberAlign && numberAlign[ 0 ] ? numberAlign[ 0 ] : '' )}
							mobileValue={( numberAlign && numberAlign[ 2 ] ? numberAlign[ 2 ] : '' )}
							tabletValue={( numberAlign && numberAlign[ 1 ] ? numberAlign[ 1 ] : '' )}
							onChange={( nextAlign ) => setAttributes( { numberAlign: [ nextAlign, ( numberAlign && numberAlign[ 1 ] ? numberAlign[ 1 ] : '' ), ( numberAlign && numberAlign[ 2 ] ? numberAlign[ 2 ] : '' ) ] } )}
							onChangeTablet={( nextAlign ) => setAttributes( { numberAlign: [ ( numberAlign && numberAlign[ 0 ] ? numberAlign[ 0 ] : '' ), nextAlign, ( numberAlign && numberAlign[ 2 ] ? numberAlign[ 2 ] : '' ) ] } )}
							onChangeMobile={( nextAlign ) => setAttributes( { numberAlign: [ ( numberAlign && numberAlign[ 0 ] ? numberAlign[ 0 ] : '' ), ( numberAlign && numberAlign[ 1 ] ? numberAlign[ 1 ] : '' ), nextAlign ] } )}
						/>
						<h2 className="bst-heading-size-title">{__( 'Min Height' )}</h2>
						<TabPanel className="bst-size-tabs"
								  activeClass="active-tab"
								  tabs={[
									  {
										  name     : 'desk',
										  title    : <Dashicon icon="desktop"/>,
										  className: 'bst-desk-tab',
									  },
									  {
										  name     : 'tablet',
										  title    : <Dashicon icon="tablet"/>,
										  className: 'bst-tablet-tab',
									  },
									  {
										  name     : 'mobile',
										  title    : <Dashicon icon="smartphone"/>,
										  className: 'bst-mobile-tab',
									  },
								  ]}>
							{
								( tab ) => {
									let tabout;
									if ( tab.name ) {
										if ( 'mobile' === tab.name ) {
											tabout = (
												<RangeControl
													value={( ( undefined !== numberMinHeight && undefined !== numberMinHeight[ 2 ] ) ? numberMinHeight[ 2 ] : '' )}
													onChange={value => setAttributes( { numberMinHeight: [ ( ( undefined !== numberMinHeight && undefined !== numberMinHeight[ 0 ] ) ? numberMinHeight[ 0 ] : '' ), ( ( undefined !== numberMinHeight && undefined !== numberMinHeight[ 1 ] ) ? numberMinHeight[ 1 ] : '' ), value ] } )}
													step={1}
													min={0}
													max={600}
												/>
											);
										} else if ( 'tablet' === tab.name ) {
											tabout = (
												<RangeControl
													value={( ( undefined !== numberMinHeight && undefined !== numberMinHeight[ 1 ] ) ? numberMinHeight[ 1 ] : '' )}
													onChange={value => setAttributes( { numberMinHeight: [ ( ( undefined !== numberMinHeight && undefined !== numberMinHeight[ 0 ] ) ? numberMinHeight[ 0 ] : '' ), value, ( ( undefined !== numberMinHeight && undefined !== numberMinHeight[ 2 ] ) ? numberMinHeight[ 2 ] : '' ) ] } )}
													step={1}
													min={0}
													max={600}
												/>
											);
										} else {
											tabout = (
												<RangeControl
													value={( ( undefined !== numberMinHeight && undefined !== numberMinHeight[ 0 ] ) ? numberMinHeight[ 0 ] : '' )}
													onChange={value => setAttributes( { numberMinHeight: [ value, ( ( undefined !== numberMinHeight && undefined !== numberMinHeight[ 1 ] ) ? numberMinHeight[ 1 ] : '' ), ( ( undefined !== numberMinHeight && undefined !== numberMinHeight[ 2 ] ) ? numberMinHeight[ 2 ] : '' ) ] } )}
													step={1}
													min={0}
													max={600}
												/>
											);
										}
									}
									return <div className={tab.className} key={tab.className}>{tabout}</div>;
								}
							}
						</TabPanel>
						<TypographyControls
							fontGroup={'number'}
							fontSize={numberFont[ 0 ].size}
							onFontSize={( value ) => saveNumberFont( { size: value } )}
							fontSizeType={numberFont[ 0 ].sizeType}
							onFontSizeType={( value ) => saveNumberFont( { sizeType: value } )}
							lineHeight={numberFont[ 0 ].lineHeight}
							onLineHeight={( value ) => saveNumberFont( { lineHeight: value } )}
							lineHeightType={numberFont[ 0 ].lineType}
							onLineHeightType={( value ) => saveNumberFont( { lineType: value } )}
							letterSpacing={numberFont[ 0 ].letterSpacing}
							onLetterSpacing={( value ) => saveNumberFont( { letterSpacing: value } )}
							fontFamily={numberFont[ 0 ].family}
							onFontFamily={( value ) => saveNumberFont( { family: value } )}
							onFontChange={( select ) => {
								saveNumberFont( {
									family: select.value,
									google: select.google,
								} );
							}}
							onFontArrayChange={( values ) => saveNumberFont( values )}
							googleFont={numberFont[ 0 ].google}
							onGoogleFont={( value ) => saveNumberFont( { google: value } )}
							loadGoogleFont={numberFont[ 0 ].loadGoogle}
							onLoadGoogleFont={( value ) => saveNumberFont( { loadGoogle: value } )}
							fontVariant={numberFont[ 0 ].variant}
							onFontVariant={( value ) => saveNumberFont( { variant: value } )}
							fontWeight={numberFont[ 0 ].weight}
							onFontWeight={( value ) => saveNumberFont( { weight: value } )}
							fontStyle={numberFont[ 0 ].style}
							onFontStyle={( value ) => saveNumberFont( { style: value } )}
							fontSubset={numberFont[ 0 ].subset}
							onFontSubset={( value ) => saveNumberFont( { subset: value } )}
						/>
						<ResponsiveMeasureRangeControl
							label={__( 'Padding', 'gutenam-blocks' )}
							value={numberPadding}
							tabletValue={numberTabletPadding}
							mobileValue={numberMobilePadding}
							onChange={( value ) => setAttributes( { numberPadding: value } )}
							onChangeTablet={( value ) => setAttributes( { numberTabletPadding: value } )}
							onChangeMobile={( value ) => setAttributes( { numberMobilePadding: value } )}
							min={0}
							max={( numberPaddingType === 'em' || numberPaddingType === 'rem' ? 12 : 200 )}
							step={( numberPaddingType === 'em' || numberPaddingType === 'rem' ? 0.1 : 1 )}
							unit={numberPaddingType}
							units={[ 'px', 'em', 'rem', '%' ]}
							onUnit={( value ) => setAttributes( { numberPaddingType: value } )}
							onMouseOver={ numberPaddingMouseOver.onMouseOver }
							onMouseOut={ numberPaddingMouseOver.onMouseOut }
						/>
						<ResponsiveMeasureRangeControl
							label={__( 'Margin', 'gutenam-blocks' )}
							value={numberMargin}
							tabletValue={numberTabletMargin}
							mobileValue={numberMobileMargin}
							onChange={( value ) => setAttributes( { numberMargin: value } )}
							onChangeTablet={( value ) => setAttributes( { numberTabletMargin: value } )}
							onChangeMobile={( value ) => setAttributes( { numberMobileMargin: value } )}
							min={( numberMarginType === 'em' || numberMarginType === 'rem' ? -12 : -200 )}
							max={( numberMarginType === 'em' || numberMarginType === 'rem' ? 12 : 200 )}
							step={( numberMarginType === 'em' || numberMarginType === 'rem' ? 0.1 : 1 )}
							unit={numberMarginType}
							units={[ 'px', 'em', 'rem', '%', 'vh' ]}
							onUnit={( value ) => setAttributes( { numberMarginType: value } )}
							onMouseOver={ numberMarginMouseOver.onMouseOver }
							onMouseOut={ numberMarginMouseOver.onMouseOut }
						/>
					</BasePanelBody>
				</>
			}

			{( activeTab === 'advanced' ) && ( 
				<>
					<BaseBlockDefaults attributes={attributes} defaultAttributes={metadata['attributes']} blockSlug={ metadata['name'] } excludedAttrs={ ['start', 'end', 'endDecimal', 'title'] } />
				</>
			)}

		</BaseInspectorControls>
	);
}

export default Inspector;
