import { __ } from '@wordpress/i18n';
import { map } from 'lodash';
import {
	RangeControl,
	ButtonGroup,
	Button,
	Dashicon,
	TabPanel,
	SelectControl
} from '@wordpress/components';

import {
	MeasurementControls,
	ResponsiveRangeControls,
	PopColorControl,
	TypographyControls,
	BoxShadowControl,
} from '@base/components';
import { useState } from '@wordpress/element';

export default function FieldStyles( { setAttributes, style } ) {

	const saveStyle = ( value ) => {
		setAttributes( { ...style, ...value }, 'style');
	}

	const btnSizes = [
		{ key: 'small', name: __( 'S', 'gutenam-blocks' ) },
		{ key: 'standard', name: __( 'M', 'gutenam-blocks' ) },
		{ key: 'large', name: __( 'L', 'gutenam-blocks' ) },
		{ key: 'custom', name: <Dashicon icon="admin-generic"/> },
	];

	const bgType = [
		{ key: 'solid', name: __( 'Solid', 'gutenam-blocks' ) },
		{ key: 'gradient', name: __( 'Gradient', 'gutenam-blocks' ) },
	];

	const gradTypes = [
		{ key: 'linear', name: __( 'Linear' ) },
		{ key: 'radial', name: __( 'Radial' ) },
	];

	const saveStyleBoxShadow = ( value, index ) => {

		const newItems = style.boxShadow.map( ( item, thisIndex ) => {
			if ( index === thisIndex ) {
				item = value;
			}

			return item;
		} );

		saveStyle( { boxShadow: newItems } );
	};
	const saveStyleBoxShadowActive = ( value, index ) => {

		const newItems = style.boxShadowActive.map( ( item, thisIndex ) => {
			if ( index === thisIndex ) {
				item = value;
			}

			return item;
		} );

		saveStyle( { boxShadowActive: newItems } );
	};

	const saveStyleGradient = ( value, index ) => {
		const newItems = style.gradient.map( ( item, thisIndex ) => {
			if ( index === thisIndex ) {
				item = value;
			}

			return item;
		} );

		saveStyle( { gradient: newItems } );
	};
	const saveStyleGradientActive = ( value, index ) => {

		const newItems = style.gradientActive.map( ( item, thisIndex ) => {
			if ( index === thisIndex ) {
				item = value;
			}

			return item;
		} );

		saveStyle( { gradientActive: newItems } );
	};

	const [ borderControl, setBorderControl ] = useState( 'linked' );
	const [ mobilePaddingControl, setMobilePaddingControl ] = useState( 'linked' );
	const [ tabletPaddingControl, setTabletPaddingControl ] = useState( 'linked' );
	const [ deskPaddingControl, setDeskPaddingControl ] = useState( 'linked' );

	return (
		<>
			<TypographyControls
				fontSize={style.fontSize}
				onFontSize={( value ) => saveStyle( { fontSize: value } )}
				fontSizeType={style.fontSizeType}
				onFontSizeType={( value ) => saveStyle( { fontSizeType: value } )}
				lineHeight={style.lineHeight}
				onLineHeight={( value ) => saveStyle( { lineHeight: value } )}
				lineHeightType={style.lineType}
				onLineHeightType={( value ) => saveStyle( { lineType: value } )}
			/>

			<div className="bst-btn-size-settings-container">
				<h2 className="bst-beside-btn-group">{__( 'Input Size' )}</h2>
				<ButtonGroup className="bst-button-size-type-options" aria-label={__( 'Input Size', 'gutenam-blocks' )}>
					{map( btnSizes, ( { name, key } ) => (
						<Button
							key={key}
							className="bst-btn-size-btn"
							isSmall
							isPrimary={style.size === key}
							aria-pressed={style.size === key}
							onClick={() => saveStyle( { size: key } )}
						>
							{name}
						</Button>
					) )}
				</ButtonGroup>
			</div>
			{'custom' === style.size && (
				<div className="bst-inner-sub-section">
					<h2 className="bst-heading-size-title bst-secondary-color-size">{__( 'Input Padding', 'gutenam-blocks' )}</h2>
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
											<>
												<MeasurementControls
													label={__( 'Mobile Padding', 'gutenam-blocks' )}
													measurement={style.mobilePadding}
													control={mobilePaddingControl}
													onChange={( value ) => saveStyle( { mobilePadding: value } )}
													onControl={( value ) => setMobilePaddingControl( value )}
													min={0}
													max={100}
													step={1}
												/>
											</>
										);
									} else if ( 'tablet' === tab.name ) {
										tabout = (
											<MeasurementControls
												label={__( 'Tablet Padding', 'gutenam-blocks' )}
												measurement={style.tabletPadding}
												control={tabletPaddingControl}
												onChange={( value ) => saveStyle( { tabletPadding: value } )}
												onControl={( value ) => setTabletPaddingControl( value )}
												min={0}
												max={100}
												step={1}
											/>
										);
									} else {
										tabout = (
											<MeasurementControls
												label={__( 'Desktop Padding', 'gutenam-blocks' )}
												measurement={style.deskPadding}
												control={deskPaddingControl}
												onChange={( value ) => saveStyle( { deskPadding: value } )}
												onControl={( value ) => setDeskPaddingControl( value )}
												min={0}
												max={100}
												step={1}
											/>
										);
									}
								}
								return <div className={tab.className} key={tab.className}>{tabout}</div>;
							}
						}
					</TabPanel>
				</div>
			)}
			<h2 className="bst-heading-size-title bst-secondary-color-size">{__( 'Input Colors', 'gutenam-blocks' )}</h2>
			<TabPanel className="bst-inspect-tabs bst-hover-tabs"
					  activeClass="active-tab"
					  tabs={[
						  {
							  name     : 'normal',
							  title    : __( 'Normal', 'gutenam-blocks' ),
							  className: 'bst-normal-tab',
						  },
						  {
							  name     : 'focus',
							  title    : __( 'Focus', 'gutenam-blocks' ),
							  className: 'bst-focus-tab',
						  },
					  ]}>
				{
					( tab ) => {
						let tabout;
						if ( tab.name ) {
							if ( 'focus' === tab.name ) {
								tabout = (
									<>
										<PopColorControl
											label={__( 'Input Focus Color', 'gutenam-blocks' )}
											value={( style.colorActive ? style.colorActive : '' )}
											default={''}
											onChange={value => {
												saveStyle( { colorActive: value } );
											}}
										/>
										<div className="bst-btn-size-settings-container">
											<h2 className="bst-beside-btn-group">{__( 'Background Type', 'gutenam-blocks' )}</h2>
											<ButtonGroup className="bst-button-size-type-options" aria-label={__( 'Background Type', 'gutenam-blocks' )}>
												{map( bgType, ( { name, key } ) => (
													<Button
														key={key}
														className="bst-btn-size-btn"
														isSmall
														isPrimary={( undefined !== style.backgroundActiveType ? style.backgroundActiveType : 'solid' ) === key}
														aria-pressed={( undefined !== style.backgroundActiveType ? style.backgroundActiveType : 'solid' ) === key}
														onClick={() => saveStyle( { backgroundActiveType: key } )}
													>
														{name}
													</Button>
												) )}
											</ButtonGroup>
										</div>
										{'gradient' !== style.backgroundActiveType && (
											<div className="bst-inner-sub-section">
												<PopColorControl
													label={__( 'Input Focus Background', 'gutenam-blocks' )}
													value={( style.backgroundActive ? style.backgroundActive : '' )}
													default={''}
													onChange={value => {
														saveStyle( { backgroundActive: value } );
													}}
													opacityValue={style.backgroundActiveOpacity}
													onOpacityChange={value => saveStyle( { backgroundActiveOpacity: value } )}
													onArrayChange={( color, opacity ) => saveStyle( { backgroundActive: color, backgroundActiveOpacity: opacity } )}
												/>
											</div>
										)}
										{'gradient' === style.backgroundActiveType && (
											<div className="bst-inner-sub-section">
												<PopColorControl
													label={__( 'Gradient Color 1', 'gutenam-blocks' )}
													value={( style.backgroundActive ? style.backgroundActive : '' )}
													default={''}
													onChange={value => {
														saveStyle( { backgroundActive: value } );
													}}
													opacityValue={style.backgroundActiveOpacity}
													onOpacityChange={value => saveStyle( { backgroundActiveOpacity: value } )}
													onArrayChange={( color, opacity ) => saveStyle( { backgroundActive: color, backgroundActiveOpacity: opacity } )}
												/>
												<RangeControl
													label={__( 'Location', 'gutenam-blocks' )}
													value={( style.gradientActive && undefined !== style.gradientActive[ 2 ] ? style.gradientActive[ 2 ] : 0 )}
													onChange={( value ) => {
														saveStyleGradientActive( value, 2 );
													}}
													min={0}
													max={100}
												/>
												<PopColorControl
													label={__( 'Gradient Color 2', 'gutenam-blocks' )}
													value={( style.gradientActive && undefined !== style.gradientActive[ 0 ] ? style.gradientActive[ 0 ] : '#999999' )}
													default={'#999999'}
													opacityValue={( style.gradientActive && undefined !== style.gradientActive[ 1 ] ? style.gradientActive[ 1 ] : 1 )}
													onChange={value => {
														saveStyleGradientActive( value, 0 );
													}}
													onOpacityChange={value => {
														saveStyleGradientActive( value, 1 );
													}}
												/>
												<RangeControl
													label={__( 'Location' )}
													value={( style.gradientActive && undefined !== style.gradientActive[ 3 ] ? style.gradientActive[ 3 ] : 100 )}
													onChange={( value ) => {
														saveStyleGradientActive( value, 3 );
													}}
													min={0}
													max={100}
												/>
												<div className="bst-btn-size-settings-container">
													<h2 className="bst-beside-btn-group">{__( 'Gradient Type', 'gutenam-blocks' )}</h2>
													<ButtonGroup className="bst-button-size-type-options" aria-label={__( 'Gradient Type', 'gutenam-blocks' )}>
														{map( gradTypes, ( { name, key } ) => (
															<Button
																key={key}
																className="bst-btn-size-btn"
																isSmall
																isPrimary={( style.gradientActive && undefined !== style.gradientActive[ 4 ] ? style.gradientActive[ 4 ] : 'linear' ) === key}
																aria-pressed={( style.gradientActive && undefined !== style.gradientActive[ 4 ] ? style.gradientActive[ 4 ] : 'linear' ) === key}
																onClick={() => {
																	saveStyleGradientActive( key, 4 );
																}}
															>
																{name}
															</Button>
														) )}
													</ButtonGroup>
												</div>
												{'radial' !== ( style.gradientActive && undefined !== style.gradientActive[ 4 ] ? style.gradientActive[ 4 ] : 'linear' ) && (
													<RangeControl
														label={__( 'Gradient Angle', 'gutenam-blocks' )}
														value={( style.gradientActive && undefined !== style.gradientActive[ 5 ] ? style.gradientActive[ 5 ] : 180 )}
														onChange={( value ) => {
															saveStyleGradientActive( value, 5 );
														}}
														min={0}
														max={360}
													/>
												)}
												{'radial' === ( style.gradientActive && undefined !== style.gradientActive[ 4 ] ? style.gradientActive[ 4 ] : 'linear' ) && (
													<SelectControl
														label={__( 'Gradient Position', 'gutenam-blocks' )}
														value={( style.gradientActive && undefined !== style.gradientActive[ 6 ] ? style.gradientActive[ 6 ] : 'center center' )}
														options={[
															{ value: 'center top', label: __( 'Center Top', 'gutenam-blocks' ) },
															{ value: 'center center', label: __( 'Center Center', 'gutenam-blocks' ) },
															{ value: 'center bottom', label: __( 'Center Bottom', 'gutenam-blocks' ) },
															{ value: 'left top', label: __( 'Left Top', 'gutenam-blocks' ) },
															{ value: 'left center', label: __( 'Left Center', 'gutenam-blocks' ) },
															{ value: 'left bottom', label: __( 'Left Bottom', 'gutenam-blocks' ) },
															{ value: 'right top', label: __( 'Right Top', 'gutenam-blocks' ) },
															{ value: 'right center', label: __( 'Right Center', 'gutenam-blocks' ) },
															{ value: 'right bottom', label: __( 'Right Bottom', 'gutenam-blocks' ) },
														]}
														onChange={value => {
															saveStyleGradientActive( value, 6 );
														}}
													/>
												)}
											</div>
										)}
										<PopColorControl
											label={__( 'Input Focus Border', 'gutenam-blocks' )}
											value={( style.borderActive ? style.borderActive : '' )}
											default={''}
											onChange={value => {
												saveStyle( { borderActive: value } );
											}}
											opacityValue={style.borderActiveOpacity}
											onOpacityChange={value => saveStyle( { borderActiveOpacity: value } )}
											onArrayChange={( color, opacity ) => saveStyle( { borderActive: color, borderActiveOpacity: opacity } )}
										/>
										<BoxShadowControl
											label={__( 'Input Focus Box Shadow', 'gutenam-blocks' )}
											enable={( undefined !== style.boxShadowActive && undefined !== style.boxShadowActive[ 0 ] ? style.boxShadowActive[ 0 ] : false )}
											color={( undefined !== style.boxShadowActive && undefined !== style.boxShadowActive[ 1 ] ? style.boxShadowActive[ 1 ] : '#000000' )}
											default={'#000000'}
											opacity={( undefined !== style.boxShadowActive && undefined !== style.boxShadowActive[ 2 ] ? style.boxShadowActive[ 2 ] : 0.4 )}
											hOffset={( undefined !== style.boxShadowActive && undefined !== style.boxShadowActive[ 3 ] ? style.boxShadowActive[ 3 ] : 2 )}
											vOffset={( undefined !== style.boxShadowActive && undefined !== style.boxShadowActive[ 4 ] ? style.boxShadowActive[ 4 ] : 2 )}
											blur={( undefined !== style.boxShadowActive && undefined !== style.boxShadowActive[ 5 ] ? style.boxShadowActive[ 5 ] : 3 )}
											spread={( undefined !== style.boxShadowActive && undefined !== style.boxShadowActive[ 6 ] ? style.boxShadowActive[ 6 ] : 0 )}
											inset={( undefined !== style.boxShadowActive && undefined !== style.boxShadowActive[ 7 ] ? style.boxShadowActive[ 7 ] : false )}
											onEnableChange={value => {
												saveStyleBoxShadowActive( value, 0 );
											}}
											onColorChange={value => {
												saveStyleBoxShadowActive( value, 1 );
											}}
											onOpacityChange={value => {
												saveStyleBoxShadowActive( value, 2 );
											}}
											onHOffsetChange={value => {
												saveStyleBoxShadowActive( value, 3 );
											}}
											onVOffsetChange={value => {
												saveStyleBoxShadowActive( value, 4 );
											}}
											onBlurChange={value => {
												saveStyleBoxShadowActive( value, 5 );
											}}
											onSpreadChange={value => {
												saveStyleBoxShadowActive( value, 6 );
											}}
											onInsetChange={value => {
												saveStyleBoxShadowActive( value, 7 );
											}}
										/>
									</>
								);
							} else {
								tabout = (
									<>
										<PopColorControl
											label={__( 'Input Color', 'gutenam-blocks' )}
											value={( style.color ? style.color : '' )}
											default={''}
											onChange={value => {
												saveStyle( { color: value } );
											}}
										/>
										<div className="bst-btn-size-settings-container">
											<h2 className="bst-beside-btn-group">{__( 'Background Type', 'gutenam-blocks' )}</h2>
											<ButtonGroup className="bst-button-size-type-options" aria-label={__( 'Background Type', 'gutenam-blocks' )}>
												{map( bgType, ( { name, key } ) => (
													<Button
														key={key}
														className="bst-btn-size-btn"
														isSmall
														isPrimary={( undefined !== style.backgroundType ? style.backgroundType : 'solid' ) === key}
														aria-pressed={( undefined !== style.backgroundType ? style.backgroundType : 'solid' ) === key}
														onClick={() => saveStyle( { backgroundType: key } )}
													>
														{name}
													</Button>
												) )}
											</ButtonGroup>
										</div>
										{'gradient' !== style.backgroundType && (
											<div className="bst-inner-sub-section">
												<PopColorControl
													label={__( 'Input Background', 'gutenam-blocks' )}
													value={( style.background ? style.background : '' )}
													default={''}
													onChange={value => {
														saveStyle( { background: value } );
													}}
													opacityValue={style.backgroundOpacity}
													onOpacityChange={value => saveStyle( { backgroundOpacity: value } )}
													onArrayChange={( color, opacity ) => saveStyle( { background: color, backgroundOpacity: opacity } )}
												/>
											</div>
										)}
										{'gradient' === style.backgroundType && (
											<div className="bst-inner-sub-section">
												<PopColorControl
													label={__( 'Gradient Color 1', 'gutenam-blocks' )}
													value={( style.background ? style.background : '' )}
													default={''}
													onChange={value => {
														saveStyle( { background: value } );
													}}
													opacityValue={style.backgroundOpacity}
													onOpacityChange={value => saveStyle( { backgroundOpacity: value } )}
													onArrayChange={( color, opacity ) => saveStyle( { background: color, backgroundOpacity: opacity } )}
												/>
												<RangeControl
													label={__( 'Location', 'gutenam-blocks' )}
													value={( style.gradient && undefined !== style.gradient[ 2 ] ? style.gradient[ 2 ] : 0 )}
													onChange={( value ) => {
														saveStyleGradient( value, 2 );
													}}
													min={0}
													max={100}
												/>
												<PopColorControl
													label={__( 'Gradient Color 2', 'gutenam-blocks' )}
													value={( style.gradient && undefined !== style.gradient[ 0 ] ? style.gradient[ 0 ] : '#999999' )}
													default={'#999999'}
													opacityValue={( style.gradient && undefined !== style.gradient[ 1 ] ? style.gradient[ 1 ] : 1 )}
													onChange={value => {
														saveStyleGradient( value, 0 );
													}}
													onOpacityChange={value => {
														saveStyleGradient( value, 1 );
													}}
												/>
												<RangeControl
													label={__( 'Location', 'gutenam-blocks' )}
													value={( style.gradient && undefined !== style.gradient[ 3 ] ? style.gradient[ 3 ] : 100 )}
													onChange={( value ) => {
														saveStyleGradient( value, 3 );
													}}
													min={0}
													max={100}
												/>
												<div className="bst-btn-size-settings-container">
													<h2 className="bst-beside-btn-group">{__( 'Gradient Type', 'gutenam-blocks' )}</h2>
													<ButtonGroup className="bst-button-size-type-options" aria-label={__( 'Gradient Type', 'gutenam-blocks' )}>
														{map( gradTypes, ( { name, key } ) => (
															<Button
																key={key}
																className="bst-btn-size-btn"
																isSmall
																isPrimary={( style.gradient && undefined !== style.gradient[ 4 ] ? style.gradient[ 4 ] : 'linear' ) === key}
																aria-pressed={( style.gradient && undefined !== style.gradient[ 4 ] ? style.gradient[ 4 ] : 'linear' ) === key}
																onClick={() => {
																	saveStyleGradient( key, 4 );
																}}
															>
																{name}
															</Button>
														) )}
													</ButtonGroup>
												</div>
												{'radial' !== ( style.gradient && undefined !== style.gradient[ 4 ] ? style.gradient[ 4 ] : 'linear' ) && (
													<RangeControl
														label={__( 'Gradient Angle', 'gutenam-blocks' )}
														value={( style.gradient && undefined !== style.gradient[ 5 ] ? style.gradient[ 5 ] : 180 )}
														onChange={( value ) => {
															saveStyleGradient( value, 5 );
														}}
														min={0}
														max={360}
													/>
												)}
												{'radial' === ( style.gradient && undefined !== style.gradient[ 4 ] ? style.gradient[ 4 ] : 'linear' ) && (
													<SelectControl
														label={__( 'Gradient Position', 'gutenam-blocks' )}
														value={( style.gradient && undefined !== style.gradient[ 6 ] ? style.gradient[ 6 ] : 'center center' )}
														options={[
															{ value: 'center top', label: __( 'Center Top', 'gutenam-blocks' ) },
															{ value: 'center center', label: __( 'Center Center', 'gutenam-blocks' ) },
															{ value: 'center bottom', label: __( 'Center Bottom', 'gutenam-blocks' ) },
															{ value: 'left top', label: __( 'Left Top', 'gutenam-blocks' ) },
															{ value: 'left center', label: __( 'Left Center', 'gutenam-blocks' ) },
															{ value: 'left bottom', label: __( 'Left Bottom', 'gutenam-blocks' ) },
															{ value: 'right top', label: __( 'Right Top', 'gutenam-blocks' ) },
															{ value: 'right center', label: __( 'Right Center', 'gutenam-blocks' ) },
															{ value: 'right bottom', label: __( 'Right Bottom', 'gutenam-blocks' ) },
														]}
														onChange={value => {
															saveStyleGradient( value, 6 );
														}}
													/>
												)}
											</div>
										)}
										<PopColorControl
											label={__( 'Input Border', 'gutenam-blocks' )}
											value={( style.border ? style.border : '' )}
											default={''}
											onChange={value => {
												saveStyle( { border: value } );
											}}
											opacityValue={style.borderOpacity}
											onOpacityChange={value => saveStyle( { borderOpacity: value } )}
											onArrayChange={( color, opacity ) => saveStyle( { border: color, borderOpacity: opacity } )}
										/>
										<BoxShadowControl
											label={__( 'Input Box Shadow', 'gutenam-blocks' )}
											enable={( undefined !== style.boxShadow && undefined !== style.boxShadow[ 0 ] ? style.boxShadow[ 0 ] : false )}
											color={( undefined !== style.boxShadow && undefined !== style.boxShadow[ 1 ] ? style.boxShadow[ 1 ] : '#000000' )}
											default={'#000000'}
											opacity={( undefined !== style.boxShadow && undefined !== style.boxShadow[ 2 ] ? style.boxShadow[ 2 ] : 0.4 )}
											hOffset={( undefined !== style.boxShadow && undefined !== style.boxShadow[ 3 ] ? style.boxShadow[ 3 ] : 2 )}
											vOffset={( undefined !== style.boxShadow && undefined !== style.boxShadow[ 4 ] ? style.boxShadow[ 4 ] : 2 )}
											blur={( undefined !== style.boxShadow && undefined !== style.boxShadow[ 5 ] ? style.boxShadow[ 5 ] : 3 )}
											spread={( undefined !== style.boxShadow && undefined !== style.boxShadow[ 6 ] ? style.boxShadow[ 6 ] : 0 )}
											inset={( undefined !== style.boxShadow && undefined !== style.boxShadow[ 7 ] ? style.boxShadow[ 7 ] : false )}
											onEnableChange={value => {
												saveStyleBoxShadow( value, 0 );
											}}
											onColorChange={value => {
												saveStyleBoxShadow( value, 1 );
											}}
											onOpacityChange={value => {
												saveStyleBoxShadow( value, 2 );
											}}
											onHOffsetChange={value => {
												saveStyleBoxShadow( value, 3 );
											}}
											onVOffsetChange={value => {
												saveStyleBoxShadow( value, 4 );
											}}
											onBlurChange={value => {
												saveStyleBoxShadow( value, 5 );
											}}
											onSpreadChange={value => {
												saveStyleBoxShadow( value, 6 );
											}}
											onInsetChange={value => {
												saveStyleBoxShadow( value, 7 );
											}}
										/>
									</>
								);
							}
						}
						return <div className={tab.className} key={tab.className}>{tabout}</div>;
					}
				}
			</TabPanel>
			<h2>{__( 'Border Settings', 'gutenam-blocks' )}</h2>
			<MeasurementControls
				label={__( 'Border Width', 'gutenam-blocks' )}
				measurement={style.borderWidth}
				control={borderControl}
				onChange={( value ) => saveStyle( { borderWidth: value } )}
				onControl={( value ) => setBorderControl( value )}
				min={0}
				max={20}
				step={1}
			/>
			<RangeControl
				label={__( 'Border Radius', 'gutenam-blocks' )}
				value={style.borderRadius}
				onChange={value => {
					saveStyle( { borderRadius: value } );
				}}
				min={0}
				max={50}
			/>
			<ResponsiveRangeControls
				label={__( 'Field Row Gap', 'gutenam-blocks' )}
				value={( undefined !== style.rowGap ? style.rowGap : '' )}
				onChange={value => {
					saveStyle( { rowGap: value.toString() } );
				}}
				tabletValue={( undefined !== style.tabletRowGap ? style.tabletRowGap : '' )}
				onChangeTablet={value => {
					saveStyle( { tabletRowGap: value.toString() } );
				}}
				mobileValue={( undefined !== style.mobileRowGap ? style.mobileRowGap : '' )}
				onChangeMobile={value => {
					saveStyle( { mobileRowGap: value.toString() } );
				}}
				min={0}
				max={100}
				step={1}
				showUnit={true}
				unit={'px'}
				units={[ 'px' ]}
			/>

			<h2>{__( 'Placeholder Settings', 'gutenam-blocks' )}</h2>
			<PopColorControl
				label={__( 'Placeholder Color', 'gutenam-blocks' )}
				value={( style.placeholderColor ? style.placeholderColor : '' )}
				default={''}
				onChange={value => {
					saveStyle( { placeholderColor: value } );
				}}
			/>
		</>
	);

}
