import { __ } from '@wordpress/i18n';
import { map } from 'lodash';
import { applyFilters } from '@wordpress/hooks';
import {
	MeasurementControls,
	TypographyControls,
	BasePanelBody,
	PopColorControl,
	BoxShadowControl,
} from '@base/components';

import {
	Dashicon,
	TabPanel,
	SelectControl,
	ButtonGroup,
	Button,
	RangeControl,
	TextControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { ColumnWidth } from '../../../components';

export default function SubmitButtonStyles( { setAttributes, submit, submitMargin, submitFont, submitLabel } ) {

	const btnSizes = [
		{ key: 'small', name: __( 'S', 'gutenam-blocks' ) },
		{ key: 'standard', name: __( 'M', 'gutenam-blocks' ) },
		{ key: 'large', name: __( 'L', 'gutenam-blocks' ) },
		{ key: 'custom', name: <Dashicon icon="admin-generic"/> },
	];

	const btnWidths = [
		{ key: 'auto', name: __( 'Auto' ) },
		{ key: 'fixed', name: __( 'Fixed' ) },
		{ key: 'full', name: __( 'Full' ) },
	];

	const marginTypes = [
		{ key: 'px', name: 'px' },
		{ key: 'em', name: 'em' },
		{ key: '%', name: '%' },
		{ key: 'vh', name: 'vh' },
		{ key: 'rem', name: 'rem' },
	];

	const bgType = [
		{ key: 'solid', name: __( 'Solid', 'gutenam-blocks' ) },
		{ key: 'gradient', name: __( 'Gradient', 'gutenam-blocks' ) },
	];

	const gradTypes = [
		{ key: 'linear', name: __( 'Linear' ) },
		{ key: 'radial', name: __( 'Radial' ) },
	];

	const [ submitBorderControl, setSubmitBorderControl ] = useState( 'linked' );
	const [ submitMobilePaddingControl, setSubmitMobilePaddingControl ] = useState( 'linked' );
	const [ submitTabletPaddingControl, setSubmitTabletPaddingControl ] = useState( 'linked' );
	const [ submitDeskPaddingControl, setSubmitDeskPaddingControl ] = useState( 'linked' );

	const marginUnit = ( undefined !== submitMargin && undefined !== submitMargin && submitMargin.unit ? submitMargin.unit : 'px' );
	const marginMin = ( marginUnit === 'em' || marginUnit === 'rem' ? -12 : -100 );
	const marginMax = ( marginUnit === 'em' || marginUnit === 'rem' ? 12 : 100 );
	const marginStep = ( marginUnit === 'em' || marginUnit === 'rem' ? 0.1 : 1 );

	const saveSubmit = ( value ) => {
		setAttributes( { ...submit, ...value }, 'submit');
	};

	const saveSubmitMargin = ( value ) => {
		setAttributes( { ...submitMargin, ...value }, 'submitMargin' );
	};

	const saveSubmitGradient = ( value, index ) => {

		const newItems = submit.gradient.map( ( item, thisIndex ) => {
			if ( index === thisIndex ) {
				item = value;
			}

			return item;
		} );

		setAttributes( { gradient: newItems }, 'submit' );
	};

	const saveSubmitGradientHover = ( value, index ) => {

		const newItems = submit.gradientHover.map( ( item, thisIndex ) => {
			if ( index === thisIndex ) {
				item = value;
			}

			return item;
		} );

		setAttributes( { gradientHover: newItems }, 'submit' );
	};

	const saveSubmitFont = ( value ) => {
		setAttributes( { ...submitFont, ...value }, 'submitFont' );
	};

	const saveSubmitBoxShadowHover = ( value, index ) => {

		const newItems = submit.boxShadowHover.map( ( item, thisIndex ) => {
			if ( index === thisIndex ) {
				item = value;
			}

			return item;
		} );
		setAttributes( { boxShadowHover: newItems }, 'submit' );
	};

	const saveSubmitBoxShadow = ( value, index ) => {
		const newItems = submit.boxShadow.map( ( item, thisIndex ) => {
			if ( index === thisIndex ) {
				item = value;
			}

			return item;
		} );

		saveSubmit( { boxShadow: newItems } );
	};

	return (
		<>
			<h2 className="bst-heading-size-title bst-secondary-color-size">{__( 'Column Width', 'gutenam-blocks' )}</h2>

			<ColumnWidth saveSubmit={saveSubmit} width={submit.width}/>

			<div className="bst-btn-size-settings-container">
				<h2 className="bst-beside-btn-group">{__( 'Button Size' )}</h2>
				<ButtonGroup className="bst-button-size-type-options" aria-label={__( 'Button Size', 'gutenam-blocks' )}>
					{map( btnSizes, ( { name, key } ) => (
						<Button
							key={key}
							className="bst-btn-size-btn"
							isSmall
							isPrimary={submit.size === key}
							aria-pressed={submit.size === key}
							onClick={() => saveSubmit( { size: key } )}
						>
							{name}
						</Button>
					) )}
				</ButtonGroup>
			</div>
			{'custom' === submit.size && (
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
											<Fragment>
												<MeasurementControls
													label={__( 'Mobile Padding', 'gutenam-blocks' )}
													measurement={submit.mobilePadding}
													control={submitMobilePaddingControl}
													onChange={( value ) => saveSubmit( { mobilePadding: value } )}
													onControl={( value ) => setSubmitMobilePaddingControl( value )}
													min={0}
													max={100}
													step={1}
												/>
											</Fragment>
										);
									} else if ( 'tablet' === tab.name ) {
										tabout = (
											<MeasurementControls
												label={__( 'Tablet Padding', 'gutenam-blocks' )}
												measurement={submit.tabletPadding}
												control={submitTabletPaddingControl}
												onChange={( value ) => saveSubmit( { tabletPadding: value } )}
												onControl={( value ) => setSubmitTabletPaddingControl( value )}
												min={0}
												max={100}
												step={1}
											/>
										);
									} else {
										tabout = (
											<MeasurementControls
												label={__( 'Desktop Padding', 'gutenam-blocks' )}
												measurement={submit.deskPadding}
												control={submitDeskPaddingControl}
												onChange={( value ) => saveSubmit( { deskPadding: value } )}
												onControl={( value ) => setSubmitDeskPaddingControl( value )}
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
			<div className="bst-btn-size-settings-container">
				<h2 className="bst-beside-btn-group">{__( 'Button Width' )}</h2>
				<ButtonGroup className="bst-button-size-type-options" aria-label={__( 'Button Width' )}>
					{map( btnWidths, ( { name, key } ) => (
						<Button
							key={key}
							className="bst-btn-size-btn"
							isSmall
							isPrimary={submit.widthType === key}
							aria-pressed={submit.widthType === key}
							onClick={() => saveSubmit( { widthType: key } )}
						>
							{name}
						</Button>
					) )}
				</ButtonGroup>
			</div>
			{'fixed' === submit.widthType && (
				<div className="bst-inner-sub-section">
					<h2 className="bst-heading-size-title bst-secondary-color-size">{__( 'Fixed Width' )}</h2>
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
											<Fragment>
												<RangeControl
													value={( submit.fixedWidth && undefined !== submit.fixedWidth[ 2 ] ? submit.fixedWidth[ 2 ] : undefined )}
													onChange={value => {
														saveSubmit( { fixedWidth: [ ( undefined !== submit.fixedWidth && undefined !== submit.fixedWidth[ 0 ] ? submit.fixedWidth[ 0 ] : '' ), ( undefined !== submit.fixedWidth && undefined !== submit.fixedWidth[ 1 ] ? submit.fixedWidth[ 1 ] : '' ), value ] } );
													}}
													min={10}
													max={500}
												/>
											</Fragment>
										);
									} else if ( 'tablet' === tab.name ) {
										tabout = (
											<Fragment>
												<RangeControl
													value={( submit.fixedWidth && undefined !== submit.fixedWidth[ 1 ] ? submit.fixedWidth[ 1 ] : undefined )}
													onChange={value => {
														saveSubmit( { fixedWidth: [ ( undefined !== submit.fixedWidth && undefined !== submit.fixedWidth[ 0 ] ? submit.fixedWidth[ 0 ] : '' ), value, ( undefined !== submit.fixedWidth && undefined !== submit.fixedWidth[ 2 ] ? submit.fixedWidth[ 2 ] : '' ) ] } );
													}}
													min={10}
													max={500}
												/>
											</Fragment>
										);
									} else {
										tabout = (
											<Fragment>
												<RangeControl
													value={( submit.fixedWidth && undefined !== submit.fixedWidth[ 0 ] ? submit.fixedWidth[ 0 ] : undefined )}
													onChange={value => {
														saveSubmit( { fixedWidth: [ value, ( undefined !== submit.fixedWidth && undefined !== submit.fixedWidth[ 1 ] ? submit.fixedWidth[ 1 ] : '' ), ( undefined !== submit.fixedWidth && undefined !== submit.fixedWidth[ 2 ] ? submit.fixedWidth[ 2 ] : '' ) ] } );
													}}
													min={10}
													max={500}
												/>
											</Fragment>
										);
									}
								}
								return <div className={tab.className} key={tab.className}>{tabout}</div>;
							}
						}
					</TabPanel>
				</div>
			)}

			<h2 className="bst-heading-size-title bst-secondary-color-size">{__( 'Button Colors', 'gutenam-blocks' )}</h2>

			<br/>

			<TabPanel className="bst-inspect-tabs bst-hover-tabs"
					  activeClass="active-tab"
					  tabs={[
						  {
							  name     : 'normal',
							  title    : __( 'Normal', 'gutenam-blocks' ),
							  className: 'bst-normal-tab',
						  },
						  {
							  name     : 'hover',
							  title    : __( 'Hover', 'gutenam-blocks' ),
							  className: 'bst-hover-tab',
						  },
					  ]}>
				{
					( tab ) => {
						let tabout;
						if ( tab.name ) {
							if ( 'hover' === tab.name ) {
								tabout = (
									<Fragment>
										<PopColorControl
											label={__( 'Text Hover Color', 'gutenam-blocks' )}
											value={( submit.colorHover ? submit.colorHover : '' )}
											default={''}
											onChange={value => {
												saveSubmit( { colorHover: value } );
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
														isPrimary={( undefined !== submit.backgroundHoverType ? submit.backgroundHoverType : 'solid' ) === key}
														aria-pressed={( undefined !== submit.backgroundHoverType ? submit.backgroundHoverType : 'solid' ) === key}
														onClick={() => saveSubmit( { backgroundHoverType: key } )}
													>
														{name}
													</Button>
												) )}
											</ButtonGroup>
										</div>
										{'gradient' !== submit.backgroundHoverType && (
											<div className="bst-inner-sub-section">
												<PopColorControl
													label={__( 'Button Hover Background', 'gutenam-blocks' )}
													value={( submit.backgroundHover ? submit.backgroundHover : '' )}
													default={''}
													onChange={value => {
														saveSubmit( { backgroundHover: value } );
													}}
													opacityValue={submit.backgroundHoverOpacity}
													onOpacityChange={value => saveSubmit( { backgroundHoverOpacity: value } )}
													onArrayChange={( color, opacity ) => saveSubmit( { backgroundHover: color, backgroundHoverOpacity: opacity } )}
												/>
											</div>
										)}
										{'gradient' === submit.backgroundHoverType && (
											<div className="bst-inner-sub-section">
												<PopColorControl
													label={__( 'Gradient Color 1', 'gutenam-blocks' )}
													value={( submit.backgroundHover ? submit.backgroundHover : '' )}
													default={''}
													onChange={value => {
														saveSubmit( { backgroundHover: value } );
													}}
													opacityValue={submit.backgroundHoverOpacity}
													onOpacityChange={value => saveSubmit( { backgroundHoverOpacity: value } )}
													onArrayChange={( color, opacity ) => saveSubmit( { backgroundHover: color, backgroundHoverOpacity: opacity } )}
												/>
												<RangeControl
													label={__( 'Location', 'gutenam-blocks' )}
													value={( submit.gradientHover && undefined !== submit.gradientHover[ 2 ] ? submit.gradientHover[ 2 ] : 0 )}
													onChange={( value ) => {
														saveSubmitGradientHover( value, 2 );
													}}
													min={0}
													max={100}
												/>
												<PopColorControl
													label={__( 'Gradient Color 2', 'gutenam-blocks' )}
													value={( submit.gradientHover && undefined !== submit.gradientHover[ 0 ] ? submit.gradientHover[ 0 ] : '#999999' )}
													default={'#999999'}
													opacityValue={( submit.gradientHover && undefined !== submit.gradientHover[ 1 ] ? submit.gradientHover[ 1 ] : 1 )}
													onChange={value => {
														saveSubmitGradientHover( value, 0 );
													}}
													onOpacityChange={value => {
														saveSubmitGradientHover( value, 1 );
													}}
												/>
												<RangeControl
													label={__( 'Location' )}
													value={( submit.gradientHover && undefined !== submit.gradientHover[ 3 ] ? submit.gradientHover[ 3 ] : 100 )}
													onChange={( value ) => {
														saveSubmitGradientHover( value, 3 );
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
																isPrimary={( submit.gradientHover && undefined !== submit.gradientHover[ 4 ] ? submit.gradientHover[ 4 ] : 'linear' ) === key}
																aria-pressed={( submit.gradientHover && undefined !== submit.gradientHover[ 4 ] ? submit.gradientHover[ 4 ] : 'linear' ) === key}
																onClick={() => {
																	saveSubmitGradientHover( key, 4 );
																}}
															>
																{name}
															</Button>
														) )}
													</ButtonGroup>
												</div>
												{'radial' !== ( submit.gradientHover && undefined !== submit.gradientHover[ 4 ] ? submit.gradientHover[ 4 ] : 'linear' ) && (
													<RangeControl
														label={__( 'Gradient Angle', 'gutenam-blocks' )}
														value={( submit.gradientHover && undefined !== submit.gradientHover[ 5 ] ? submit.gradientHover[ 5 ] : 180 )}
														onChange={( value ) => {
															saveSubmitGradientHover( value, 5 );
														}}
														min={0}
														max={360}
													/>
												)}
												{'radial' === ( submit.gradientHover && undefined !== submit.gradientHover[ 4 ] ? submit.gradientHover[ 4 ] : 'linear' ) && (
													<SelectControl
														label={__( 'Gradient Position', 'gutenam-blocks' )}
														value={( submit.gradientHover && undefined !== submit.gradientHover[ 6 ] ? submit.gradientHover[ 6 ] : 'center center' )}
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
															saveSubmitGradientHover( value, 6 );
														}}
													/>
												)}
											</div>
										)}
										<PopColorControl
											label={__( 'Button Hover Border', 'gutenam-blocks' )}
											value={( submit.borderHover ? submit.borderHover : '' )}
											default={''}
											onChange={value => {
												saveSubmit( { borderHover: value } );
											}}
											opacityValue={submit.borderHoverOpacity}
											onOpacityChange={value => saveSubmit( { borderHoverOpacity: value } )}
											onArrayChange={( color, opacity ) => saveSubmit( { borderHover: color, borderHoverOpacity: opacity } )}
										/>
										<BoxShadowControl
											label={__( 'Button Hover Box Shadow', 'gutenam-blocks' )}
											enable={( undefined !== submit.boxShadowHover && undefined !== submit.boxShadowHover[ 0 ] ? submit.boxShadowHover[ 0 ] : false )}
											color={( undefined !== submit.boxShadowHover && undefined !== submit.boxShadowHover[ 1 ] ? submit.boxShadowHover[ 1 ] : '#000000' )}
											default={'#000000'}
											opacity={( undefined !== submit.boxShadowHover && undefined !== submit.boxShadowHover[ 2 ] ? submit.boxShadowHover[ 2 ] : 0.4 )}
											hOffset={( undefined !== submit.boxShadowHover && undefined !== submit.boxShadowHover[ 3 ] ? submit.boxShadowHover[ 3 ] : 2 )}
											vOffset={( undefined !== submit.boxShadowHover && undefined !== submit.boxShadowHover[ 4 ] ? submit.boxShadowHover[ 4 ] : 2 )}
											blur={( undefined !== submit.boxShadowHover && undefined !== submit.boxShadowHover[ 5 ] ? submit.boxShadowHover[ 5 ] : 3 )}
											spread={( undefined !== submit.boxShadowHover && undefined !== submit.boxShadowHover[ 6 ] ? submit.boxShadowHover[ 6 ] : 0 )}
											inset={( undefined !== submit.boxShadowHover && undefined !== submit.boxShadowHover[ 7 ] ? submit.boxShadowHover[ 7 ] : false )}
											onEnableChange={value => {
												saveSubmitBoxShadowHover( value, 0 );
											}}
											onColorChange={value => {
												saveSubmitBoxShadowHover( value, 1 );
											}}
											onOpacityChange={value => {
												saveSubmitBoxShadowHover( value, 2 );
											}}
											onHOffsetChange={value => {
												saveSubmitBoxShadowHover( value, 3 );
											}}
											onVOffsetChange={value => {
												saveSubmitBoxShadowHover( value, 4 );
											}}
											onBlurChange={value => {
												saveSubmitBoxShadowHover( value, 5 );
											}}
											onSpreadChange={value => {
												saveSubmitBoxShadowHover( value, 6 );
											}}
											onInsetChange={value => {
												saveSubmitBoxShadowHover( value, 7 );
											}}
										/>
									</Fragment>
								);
							} else {
								tabout = (
									<Fragment>
										<PopColorControl
											label={__( 'Text Color', 'gutenam-blocks' )}
											value={( submit.color ? submit.color : '' )}
											default={''}
											onChange={value => {
												saveSubmit( { color: value } );
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
														isPrimary={( undefined !== submit.backgroundType ? submit.backgroundType : 'solid' ) === key}
														aria-pressed={( undefined !== submit.backgroundType ? submit.backgroundType : 'solid' ) === key}
														onClick={() => saveSubmit( { backgroundType: key } )}
													>
														{name}
													</Button>
												) )}
											</ButtonGroup>
										</div>
										{'gradient' !== submit.backgroundType && (
											<div className="bst-inner-sub-section">
												<PopColorControl
													label={__( 'Button Background', 'gutenam-blocks' )}
													value={( submit.background ? submit.background : '' )}
													default={''}
													onChange={value => {
														saveSubmit( { background: value } );
													}}
													opacityValue={submit.backgroundOpacity}
													onOpacityChange={value => saveSubmit( { backgroundOpacity: value } )}
													onArrayChange={( color, opacity ) => saveSubmit( { background: color, backgroundOpacity: opacity } )}
												/>
											</div>
										)}
										{'gradient' === submit.backgroundType && (
											<div className="bst-inner-sub-section">
												<PopColorControl
													label={__( 'Gradient Color 1', 'gutenam-blocks' )}
													value={( submit.background ? submit.background : '' )}
													default={''}
													onChange={value => {
														saveSubmit( { background: value } );
													}}
													opacityValue={submit.backgroundOpacity}
													onOpacityChange={value => saveSubmit( { backgroundOpacity: value } )}
													onArrayChange={( color, opacity ) => saveSubmit( { background: color, backgroundOpacity: opacity } )}
												/>
												<RangeControl
													label={__( 'Location', 'gutenam-blocks' )}
													value={( submit.gradient && undefined !== submit.gradient[ 2 ] ? submit.gradient[ 2 ] : 0 )}
													onChange={( value ) => {
														saveSubmitGradient( value, 2 );
													}}
													min={0}
													max={100}
												/>
												<PopColorControl
													label={__( 'Gradient Color 2', 'gutenam-blocks' )}
													value={( submit.gradient && undefined !== submit.gradient[ 0 ] ? submit.gradient[ 0 ] : '#999999' )}
													default={'#999999'}
													opacityValue={( submit.gradient && undefined !== submit.gradient[ 1 ] ? submit.gradient[ 1 ] : 1 )}
													onChange={value => {
														saveSubmitGradient( value, 0 );
													}}
													onOpacityChange={value => {
														saveSubmitGradient( value, 1 );
													}}
												/>
												<RangeControl
													label={__( 'Location', 'gutenam-blocks' )}
													value={( submit.gradient && undefined !== submit.gradient[ 3 ] ? submit.gradient[ 3 ] : 100 )}
													onChange={( value ) => {
														saveSubmitGradient( value, 3 );
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
																isPrimary={( submit.gradient && undefined !== submit.gradient[ 4 ] ? submit.gradient[ 4 ] : 'linear' ) === key}
																aria-pressed={( submit.gradient && undefined !== submit.gradient[ 4 ] ? submit.gradient[ 4 ] : 'linear' ) === key}
																onClick={() => {
																	saveSubmitGradient( key, 4 );
																}}
															>
																{name}
															</Button>
														) )}
													</ButtonGroup>
												</div>
												{'radial' !== ( submit.gradient && undefined !== submit.gradient[ 4 ] ? submit.gradient[ 4 ] : 'linear' ) && (
													<RangeControl
														label={__( 'Gradient Angle', 'gutenam-blocks' )}
														value={( submit.gradient && undefined !== submit.gradient[ 5 ] ? submit.gradient[ 5 ] : 180 )}
														onChange={( value ) => {
															saveSubmitGradient( value, 5 );
														}}
														min={0}
														max={360}
													/>
												)}
												{'radial' === ( submit.gradient && undefined !== submit.gradient[ 4 ] ? submit.gradient[ 4 ] : 'linear' ) && (
													<SelectControl
														label={__( 'Gradient Position', 'gutenam-blocks' )}
														value={( submit.gradient && undefined !== submit.gradient[ 6 ] ? submit.gradient[ 6 ] : 'center center' )}
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
															saveSubmitGradient( value, 6 );
														}}
													/>
												)}
											</div>
										)}
										<PopColorControl
											label={__( 'Button Border', 'gutenam-blocks' )}
											value={( submit.border ? submit.border : '' )}
											default={''}
											onChange={value => {
												saveSubmit( { border: value } );
											}}
											opacityValue={submit.borderOpacity}
											onOpacityChange={value => saveSubmit( { borderOpacity: value } )}
											onArrayChange={( color, opacity ) => saveSubmit( { border: color, borderOpacity: opacity } )}
										/>
										<BoxShadowControl
											label={__( 'Button Box Shadow', 'gutenam-blocks' )}
											enable={( undefined !== submit.boxShadow && undefined !== submit.boxShadow[ 0 ] ? submit.boxShadow[ 0 ] : false )}
											color={( undefined !== submit.boxShadow && undefined !== submit.boxShadow[ 1 ] ? submit.boxShadow[ 1 ] : '#000000' )}
											default={'#000000'}
											opacity={( undefined !== submit.boxShadow && undefined !== submit.boxShadow[ 2 ] ? submit.boxShadow[ 2 ] : 0.4 )}
											hOffset={( undefined !== submit.boxShadow && undefined !== submit.boxShadow[ 3 ] ? submit.boxShadow[ 3 ] : 2 )}
											vOffset={( undefined !== submit.boxShadow && undefined !== submit.boxShadow[ 4 ] ? submit.boxShadow[ 4 ] : 2 )}
											blur={( undefined !== submit.boxShadow && undefined !== submit.boxShadow[ 5 ] ? submit.boxShadow[ 5 ] : 3 )}
											spread={( undefined !== submit.boxShadow && undefined !== submit.boxShadow[ 6 ] ? submit.boxShadow[ 6 ] : 0 )}
											inset={( undefined !== submit.boxShadow && undefined !== submit.boxShadow[ 7 ] ? submit.boxShadow[ 7 ] : false )}
											onEnableChange={value => {
												saveSubmitBoxShadow( value, 0 );
											}}
											onColorChange={value => {
												saveSubmitBoxShadow( value, 1 );
											}}
											onOpacityChange={value => {
												saveSubmitBoxShadow( value, 2 );
											}}
											onHOffsetChange={value => {
												saveSubmitBoxShadow( value, 3 );
											}}
											onVOffsetChange={value => {
												saveSubmitBoxShadow( value, 4 );
											}}
											onBlurChange={value => {
												saveSubmitBoxShadow( value, 5 );
											}}
											onSpreadChange={value => {
												saveSubmitBoxShadow( value, 6 );
											}}
											onInsetChange={value => {
												saveSubmitBoxShadow( value, 7 );
											}}
										/>
									</Fragment>
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
				measurement={submit.borderWidth}
				control={submitBorderControl}
				onChange={( value ) => saveSubmit( { borderWidth: value } )}
				onControl={( value ) => setSubmitBorderControl( value )}
				min={0}
				max={20}
				step={1}
			/>
			<RangeControl
				label={__( 'Border Radius', 'gutenam-blocks' )}
				value={submit.borderRadius}
				onChange={value => {
					saveSubmit( { borderRadius: value } );
				}}
				min={0}
				max={50}
			/>
			<TypographyControls
				fontSize={submitFont.size}
				onFontSize={( value ) => saveSubmitFont( { size: value } )}
				fontSizeType={submitFont.sizeType}
				onFontSizeType={( value ) => saveSubmitFont( { sizeType: value } )}
				lineHeight={submitFont.lineHeight}
				onLineHeight={( value ) => saveSubmitFont( { lineHeight: value } )}
				lineHeightType={submitFont.lineType}
				onLineHeightType={( value ) => saveSubmitFont( { lineType: value } )}
			/>
			<BasePanelBody
				title={__( 'Advanced Button Settings', 'gutenam-blocks' )}
				initialOpen={false}
				panelName={'bsb-form-advanced-button-settings'}
			>
				<TypographyControls
					letterSpacing={submitFont.letterSpacing}
					onLetterSpacing={( value ) => saveSubmitFont( { letterSpacing: value.toString() } )}
					textTransform={submitFont.textTransform}
					onTextTransform={( value ) => saveSubmitFont( { textTransform: value } )}
					fontFamily={submitFont.family}
					onFontFamily={( value ) => saveSubmitFont( { family: value } )}
					onFontChange={( select ) => {
						saveSubmitFont( {
							family: select.value,
							google: select.google,
						} );
					}}
					onFontArrayChange={( values ) => saveSubmitFont( values )}
					googleFont={submitFont.google}
					onGoogleFont={( value ) => saveSubmitFont( { google: value } )}
					loadGoogleFont={submitFont.loadGoogle}
					onLoadGoogleFont={( value ) => saveSubmitFont( { loadGoogle: value } )}
					fontVariant={submitFont.variant}
					onFontVariant={( value ) => saveSubmitFont( { variant: value } )}
					fontWeight={submitFont.weight}
					onFontWeight={( value ) => saveSubmitFont( { weight: value } )}
					fontStyle={submitFont.style}
					onFontStyle={( value ) => saveSubmitFont( { style: value } )}
					fontSubset={submitFont.subset}
					onFontSubset={( value ) => saveSubmitFont( { subset: value } )}
				/>
				<ButtonGroup className="bst-size-type-options bst-row-size-type-options" aria-label={__( 'Margin Type', 'gutenam-blocks' )}>
					{map( marginTypes, ( { name, key } ) => (
						<Button
							key={key}
							className="bst-size-btn"
							isSmall
							isPrimary={marginUnit === key}
							aria-pressed={marginUnit === key}
							onClick={() => saveSubmitMargin( { unit: key } )}
						>
							{name}
						</Button>
					) )}
				</ButtonGroup>
				<h2 className="bst-heading-size-title bst-secondary-color-size">{__( 'Margin Unit', 'gutenam-blocks' )}</h2>
				<h2 className="bst-heading-size-title">{__( 'Margin', 'gutenam-blocks' )}</h2>
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
										<Fragment>
											<MeasurementControls
												label={__( 'Mobile Margin', 'gutenam-blocks' )}
												measurement={( undefined !== submitMargin && undefined !== submitMargin && submitMargin.mobile ? submitMargin.mobile : [ '', '', '', '' ] )}
												control={( undefined !== submitMargin && undefined !== submitMargin && submitMargin.control ? submitMargin.control : 'linked' )}
												onChange={( value ) => saveSubmitMargin( { mobile: value } )}
												onControl={( value ) => saveSubmitMargin( { control: value } )}
												min={marginMin}
												max={marginMax}
												step={marginStep}
												allowEmpty={true}
											/>
										</Fragment>
									);
								} else if ( 'tablet' === tab.name ) {
									tabout = (
										<Fragment>
											<MeasurementControls
												label={__( 'Tablet Margin', 'gutenam-blocks' )}
												measurement={( undefined !== submitMargin && undefined !== submitMargin && submitMargin.tablet ? submitMargin.tablet : [ '', '', '', '' ] )}
												control={( undefined !== submitMargin && undefined !== submitMargin && submitMargin.control ? submitMargin.control : 'linked' )}
												onChange={( value ) => saveSubmitMargin( { tablet: value } )}
												onControl={( value ) => saveSubmitMargin( { control: value } )}
												min={marginMin}
												max={marginMax}
												step={marginStep}
												allowEmpty={true}
											/>
										</Fragment>
									);
								} else {
									tabout = (
										<Fragment>
											<MeasurementControls
												label={__( 'Desktop Margin', 'gutenam-blocks' )}
												measurement={( undefined !== submitMargin && undefined !== submitMargin && submitMargin.desk ? submitMargin.desk : [ '', '', '', '' ] )}
												control={( undefined !== submitMargin && undefined !== submitMargin && submitMargin.control ? submitMargin.control : 'linked' )}
												onChange={( value ) => saveSubmitMargin( { desk: value } )}
												onControl={( value ) => saveSubmitMargin( { control: value } )}
												min={marginMin}
												max={marginMax}
												step={marginStep}
												allowEmpty={true}
											/>
										</Fragment>
									);
								}
							}
							return <div className={tab.className} key={tab.className}>{tabout}</div>;
						}
					}
				</TabPanel>
			</BasePanelBody>

			<TextControl
				label={__( 'Submit aria description', 'gutenam-blocks' )}
				help={__( 'Provide more context for screen readers', 'gutenam-blocks' )}
				value={( undefined !== submitLabel ? submitLabel : '' )}
				onChange={( value ) => setAttributes( value, 'submitLabel' )}
			/>
		</>
	);

}
