/**
 * BLOCK: Base Row / Layout
 */

/**
 * Import Icons
 */
import {
	rowIcon,
	collapseRowIcon,
	collapseRowThreeIcon,
	collapseRowFourIcon,
	collapseRowFiveIcon,
	collapseRowSixIcon,
	twoColIcon,
	gridIcon,
	threeColIcon,
	threeGridIcon,
	lastRowIcon,
	firstRowIcon,
	twoLeftGoldenIcon,
	twoRightGoldenIcon,
	leftHalfIcon,
	rightHalfIcon,
	centerHalfIcon,
	wideCenterIcon,
	exWideCenterIcon,
	fourColIcon,
	lFourFortyIcon,
	rFourFortyIcon,
	fiveColIcon,
	sixColIcon,
	radiusLinkedIcon,
	radiusIndividualIcon,
	topLeftIcon,
	topRightIcon,
	bottomLeftIcon,
	bottomRightIcon
} from '@base/icons';

/**
 * Import External
 */
import Select from 'react-select';
import { times, dropRight, debounce, map } from 'lodash';
import classnames from 'classnames';
import memoize from 'memize';
import ContainerDimensions from 'react-container-dimensions';
/**
 * Import Base Components
 */
import {
	PopColorControl,
	SmallResponsiveControl,
	ResponsiveControl,
	RangeControl,
	MeasurementControls,
	BaseIconPicker,
	ResponsiveRangeControls,
	BasePanelBody,
	StepControls,
	BaseRadioButtons,
	VerticalAlignmentIcon,
	ResponsiveRadioRangeControls,
	BackgroundControl as BaseBackgroundControl,
	InspectorControlTabs
} from '@base/components';
import { BaseColorOutput, getPreviewSize, showSettings } from '@base/helpers';

/**
 * Import Block Specific Components
 */
import PrebuiltModal from '../../plugins/prebuilt-library/prebuilt-library';
import Overlay from './row-overlay';
import RowBackground from './row-background';
import ContentWidthIcon from './content-width-icons';
import renderSVGDivider from './render-svg-divider';
/**
 * Import WordPress Internals
 */
import { useEffect, useState, Fragment } from '@wordpress/element';
import {
	MediaUpload,
	InspectorControls,
	BlockControls,
	BlockAlignmentToolbar,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import {
	Button,
	ButtonGroup,
	Tooltip,
	TabPanel,
	Popover,
	ToolbarGroup,
	TextControl,
	Dashicon,
	Toolbar,
	ToggleControl,
	SelectControl,
	ResizableBox,
} from '@wordpress/components';
import { withDispatch, useSelect, useDispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import {
	image,
} from '@wordpress/icons';
import { applyFilters } from '@wordpress/hooks';
/**
 * Internal block libraries
 */
import { __ } from '@wordpress/i18n';

/**
 * Build the row edit
 */
 function LayoutControls( {
	clientId,
	attributes,
	setAttributes,
	updateColumns,
	innerItemCount,
	widthString,
	previewDevice,
} ) {
	const { uniqueID, columns, mobileLayout, currentTab, colLayout, tabletLayout, columnGutter, customGutter, customRowGutter, collapseGutter, tabletGutter, mobileGutter, tabletRowGutter, mobileRowGutter, gutterType, rowGutterType, collapseOrder, topPadding, bottomPadding, leftPadding, rightPadding, topPaddingM, bottomPaddingM, leftPaddingM, rightPaddingM, topMargin, bottomMargin, topMarginM, bottomMarginM, bgColor, bgImg, bgImgAttachment, bgImgSize, bgImgPosition, bgImgRepeat, bgImgID, verticalAlignment, overlayOpacity, overlayBgImg, overlayBgImgAttachment, overlayBgImgID, overlayBgImgPosition, overlayBgImgRepeat, overlayBgImgSize, currentOverlayTab, overlayBlendMode, overlayGradAngle, overlayGradLoc, overlayGradLocSecond, overlayGradType, overlay, overlaySecond, htmlTag, minHeight, maxWidth, bottomSep, bottomSepColor, bottomSepHeight, bottomSepHeightMobile, bottomSepHeightTab, bottomSepWidth, bottomSepWidthMobile, bottomSepWidthTab, topSep, topSepColor, topSepHeight, topSepHeightMobile, topSepHeightTab, topSepWidth, topSepWidthMobile, topSepWidthTab, firstColumnWidth, secondColumnWidth, textColor, linkColor, linkHoverColor, tabletPadding, topMarginT, bottomMarginT, minHeightUnit, maxWidthUnit, marginUnit, columnsUnlocked, tabletBackground, tabletOverlay, mobileBackground, mobileOverlay, columnsInnerHeight, zIndex, backgroundInline, backgroundSettingTab, backgroundSliderCount, backgroundSlider, inheritMaxWidth, backgroundSliderSettings, backgroundVideo, backgroundVideoType, overlaySecondOpacity, overlayFirstOpacity, paddingUnit, align, minHeightTablet, minHeightMobile, bgColorClass, vsdesk, vstablet, vsmobile, loggedInUser, loggedIn, loggedOut, loggedInShow, rcpAccess, rcpMembership, rcpMembershipLevel, borderWidth, tabletBorderWidth, mobileBorderWidth, borderRadius, tabletBorderRadius, mobileBorderRadius, border, tabletBorder, mobileBorder, isPrebuiltModal, responsiveMaxWidth, baseBlockCSS, breakoutLeft, breakoutRight, topSepHeightUnit, bottomSepHeightUnit  } = attributes;

	const editorDocument = document.querySelector( 'iframe[name="editor-canvas"]' )?.contentWindow.document || document;
	let layoutOptions;
	let mobileLayoutOptions;
	if ( 2 === columns ) {
		layoutOptions = [
			{ value: 'equal', label: __( 'Equal', 'gutenam-blocks' ), icon: twoColIcon },
			{ value: 'left-golden', label: __( 'Left Heavy 66/33', 'gutenam-blocks' ), icon: twoLeftGoldenIcon },
			{ value: 'right-golden', label: __( 'Right Heavy 33/66', 'gutenam-blocks' ), icon: twoRightGoldenIcon },
			{ value: 'row', label: __( 'Collapse to Rows', 'gutenam-blocks' ), icon: collapseRowIcon },
		];
	} else if ( 3 === columns ) {
		layoutOptions = [
			{ value: 'equal', label: __( 'Equal', 'gutenam-blocks' ), icon: threeColIcon },
			{ value: 'left-half', label: __( 'Left Heavy 50/25/25', 'gutenam-blocks' ), icon: leftHalfIcon },
			{ value: 'right-half', label: __( 'Right Heavy 25/25/50', 'gutenam-blocks' ), icon: rightHalfIcon },
			{ value: 'center-half', label: __( 'Center Heavy 25/50/25', 'gutenam-blocks' ), icon: centerHalfIcon },
			{ value: 'center-wide', label: __( 'Wide Center 20/60/20', 'gutenam-blocks' ), icon: wideCenterIcon },
			{ value: 'center-exwide', label: __( 'Wider Center 15/70/15', 'gutenam-blocks' ), icon: exWideCenterIcon },
			{ value: 'first-row', label: __( 'First Row, Next Columns 100 - 50/50', 'gutenam-blocks' ), icon: firstRowIcon },
			{ value: 'last-row', label: __( 'Last Row, Previous Columns 50/50 - 100', 'gutenam-blocks' ), icon: lastRowIcon },
			{ value: 'row', label: __( 'Collapse to Rows', 'gutenam-blocks' ), icon: collapseRowThreeIcon },
		];
	} else if ( 4 === columns ) {
		layoutOptions = [
			{ value: 'equal', label: __( 'Equal', 'gutenam-blocks' ), icon: fourColIcon },
			{ value: 'left-forty', label: __( 'Left Heavy 40/20/20/20', 'gutenam-blocks' ), icon: lFourFortyIcon },
			{ value: 'right-forty', label: __( 'Right Heavy 20/20/20/40', 'gutenam-blocks' ), icon: rFourFortyIcon },
			{ value: 'two-grid', label: __( 'Two Column Grid', 'gutenam-blocks' ), icon: gridIcon },
			{ value: 'row', label: __( 'Collapse to Rows', 'gutenam-blocks' ), icon: collapseRowFourIcon },
		];
	} else if ( 5 === columns ) {
		layoutOptions = [
			{ value: 'equal', label: __( 'Equal', 'gutenam-blocks' ), icon: fiveColIcon },
			{ value: 'row', label: __( 'Collapse to Rows', 'gutenam-blocks' ), icon: collapseRowFiveIcon },
		];
	} else if ( 6 === columns ) {
		layoutOptions = [
			{ value: 'equal', label: __( 'Equal', 'gutenam-blocks' ), icon: sixColIcon },
			{ value: 'two-grid', label: __( 'Two Column Grid', 'gutenam-blocks' ), icon: gridIcon },
			{ value: 'three-grid', label: __( 'Three Column Grid', 'gutenam-blocks' ), icon: threeGridIcon },
			{ value: 'row', label: __( 'Collapse to Rows', 'gutenam-blocks' ), icon: collapseRowSixIcon },
		];
	} else {
		layoutOptions = [
			{ value: 'equal', label: __( 'Single Row', 'gutenam-blocks' ), icon: rowIcon },
		];
	}
	if ( 2 === columns ) {
		mobileLayoutOptions = [
			{ value: 'equal', label: __( 'Equal', 'gutenam-blocks' ), icon: twoColIcon },
			{ value: 'left-golden', label: __( 'Left Heavy 66/33', 'gutenam-blocks' ), icon: twoLeftGoldenIcon },
			{ value: 'right-golden', label: __( 'Right Heavy 33/66', 'gutenam-blocks' ), icon: twoRightGoldenIcon },
			{ value: 'row', label: __( 'Collapse to Rows', 'gutenam-blocks' ), icon: collapseRowIcon },
		];
	} else if ( 3 === columns ) {
		mobileLayoutOptions = [
			{ value: 'equal', label: __( 'Equal', 'gutenam-blocks' ), icon: threeColIcon },
			{ value: 'left-half', label: __( 'Left Heavy 50/25/25', 'gutenam-blocks' ), icon: leftHalfIcon },
			{ value: 'right-half', label: __( 'Right Heavy 25/25/50', 'gutenam-blocks' ), icon: rightHalfIcon },
			{ value: 'center-half', label: __( 'Center Heavy 25/50/25', 'gutenam-blocks' ), icon: centerHalfIcon },
			{ value: 'center-wide', label: __( 'Wide Center 20/60/20', 'gutenam-blocks' ), icon: wideCenterIcon },
			{ value: 'center-exwide', label: __( 'Wider Center 15/70/15', 'gutenam-blocks' ), icon: exWideCenterIcon },
			{ value: 'first-row', label: __( 'First Row, Next Columns 100 - 50/50', 'gutenam-blocks' ), icon: firstRowIcon },
			{ value: 'last-row', label: __( 'Last Row, Previous Columns 50/50 - 100', 'gutenam-blocks' ), icon: lastRowIcon },
			{ value: 'two-grid', label: __( 'Two Column Grid', 'gutenam-blocks' ), icon: gridIcon },
			{ value: 'row', label: __( 'Collapse to Rows', 'gutenam-blocks' ), icon: collapseRowThreeIcon },
		];
	} else if ( 4 === columns ) {
		mobileLayoutOptions = [
			{ value: 'equal', label: __( 'Equal', 'gutenam-blocks' ), icon: fourColIcon },
			{ value: 'left-forty', label: __( 'Left Heavy 40/20/20/20', 'gutenam-blocks' ), icon: lFourFortyIcon },
			{ value: 'right-forty', label: __( 'Right Heavy 20/20/20/40', 'gutenam-blocks' ), icon: rFourFortyIcon },
			{ value: 'two-grid', label: __( 'Two Column Grid', 'gutenam-blocks' ), icon: gridIcon },
			{ value: 'row', label: __( 'Collapse to Rows', 'gutenam-blocks' ), icon: collapseRowFourIcon },
		];
	} else if ( 5 === columns ) {
		mobileLayoutOptions = [
			{ value: 'equal', label: __( 'Equal', 'gutenam-blocks' ), icon: fiveColIcon },
			{ value: 'two-grid', label: __( 'Two Column Grid', 'gutenam-blocks' ), icon: gridIcon },
			{ value: 'three-grid', label: __( 'Three Column Grid', 'gutenam-blocks' ), icon: threeGridIcon },
			{ value: 'row', label: __( 'Collapse to Rows', 'gutenam-blocks' ), icon: collapseRowFiveIcon },
		];
	} else if ( 6 === columns ) {
		mobileLayoutOptions = [
			{ value: 'equal', label: __( 'Equal', 'gutenam-blocks' ), icon: sixColIcon },
			{ value: 'two-grid', label: __( 'Two Column Grid', 'gutenam-blocks' ), icon: gridIcon },
			{ value: 'three-grid', label: __( 'Three Column Grid', 'gutenam-blocks' ), icon: threeGridIcon },
			{ value: 'row', label: __( 'Collapse to Rows', 'gutenam-blocks' ), icon: collapseRowSixIcon },
		];
	} else {
		mobileLayoutOptions = [
			{ value: 'row', label: __( 'Single Row', 'gutenam-blocks' ), icon: rowIcon },
		];
	}
	const selectColLayout = ( columns && ( 2 === columns || 3 === columns ) ? widthString : colLayout );
	return (
		<Fragment>
			<>
				{ showSettings( 'basicLayout', 'base/rowlayout' ) && (
					<>
						<BasePanelBody panelName={ 'bsb-row-basic-layout' }>
							<StepControls
								label={__( 'Columns', 'gutenam-blocks' )}
								value={ columns }
								onChange={ ( nextColumns ) => {
									updateColumns( innerItemCount, nextColumns );
									setAttributes( {
										columns: nextColumns,
										colLayout: 'equal',
										firstColumnWidth: undefined,
										secondColumnWidth: undefined,
										tabletLayout: 'inherit',
										mobileLayout: 'row',
									} );
								} }
								min={1}
								max={6}
							/>
							{ columns > 1 && (
								<SmallResponsiveControl
									label={__( 'Layout', 'gutenam-blocks' )}
									desktopChildren={
										<BaseRadioButtons
											value={ selectColLayout  }
											options={ layoutOptions }
											wrap={true}
											hideLabel={true}
											className={ 'base-row-layout-radio-btns' }
											onChange={ value => {
												setAttributes( {
													colLayout: value,
												} );
												setAttributes( {
													firstColumnWidth: undefined,
													secondColumnWidth: undefined,
												} );
											}}
										/>
									}
									tabletChildren={<BaseRadioButtons
										value={ tabletLayout }
										options={mobileLayoutOptions}
										wrap={true}
										className={ 'base-row-layout-radio-btns' }
											hideLabel={true}
										onChange={ value => {
											if ( value === tabletLayout ) {
												setAttributes( {
													tabletLayout: 'inherit',
												} );
											} else {
												setAttributes( {
													tabletLayout: value,
												} );
											}
										}}
									/>}
									mobileChildren={<BaseRadioButtons
										value={mobileLayout}
										options={mobileLayoutOptions}
										wrap={true}
										className={ 'base-row-layout-radio-btns' }
											hideLabel={true}
										onChange={ value => {
											setAttributes( {
												mobileLayout: value,
											} );
										}}
									/>}
								/>
							) }
							{ ( colLayout === 'grid-layout' || columns > 1 ) && (
								<>
									<ResponsiveRadioRangeControls
										label={__( 'Column Gutter', 'gutenam-blocks' )}
										options={ [
											{ value: 'none', size:0, label: __('None', 'gutenam-blocks' ) },
											{ value: 'skinny', size:16, label: __('SM', 'gutenam-blocks' ) },
											{ value: 'default', size:32, label: __('MD', 'gutenam-blocks' ) },
											{ value: 'wider', size:64, label: __('LG', 'gutenam-blocks' ) },
										] }
										value={ {
											value: ( undefined !== columnGutter ? columnGutter : 'default' ),
											size: ( undefined !== customGutter && undefined !== customGutter[0] ? customGutter[0] : 30 ),
										} }
										onChange={ ( value, size ) => {
											setAttributes( { columnGutter: value, customGutter: [ size, ( customGutter[1] ? customGutter[1] : '' ), ( customGutter[2] ? customGutter[2] : '' ) ] } );
										}}
										tabletValue={ {
											value: ( undefined !== tabletGutter ? tabletGutter : '' ),
											size: ( undefined !== customGutter && undefined !== customGutter[1] ? customGutter[1] : '' ),
										} }
										onChangeTablet={ ( value, size ) => {
											setAttributes( { tabletGutter: value, customGutter: [ ( customGutter[0] ? customGutter[0] : '' ), size, ( customGutter[2] ? customGutter[2] : '' ) ] } );
										}}
										mobileValue={ {
											value: ( undefined !== mobileGutter ? mobileGutter : '' ),
											size: ( undefined !== customGutter && undefined !== customGutter[2] ? customGutter[2] : '' ),
										} }
										onChangeMobile={ ( value, size ) => {
											setAttributes( { mobileGutter: value, customGutter: [ ( customGutter[0] ? customGutter[0] : '' ), ( customGutter[1] ? customGutter[1] : '' ), size ] } );
										}}
										min={0}
										max={( gutterType === 'px' ? 200 : 12 )}
										step={( gutterType === 'px' ? 1 : 0.1 )}
										unit={ gutterType ? gutterType : 'px' }
										onUnit={( value ) => {
											setAttributes( { gutterType: value } );
										}}
										units={[ 'px', 'em', 'rem' ]}
									/>
								</>
							)}
								<ResponsiveRadioRangeControls
									label={__( 'Row Gutter', 'gutenam-blocks' )}
									options={ [
										{ value: 'none', size:0, label: __('None', 'gutenam-blocks' ) },
										{ value: 'skinny', size:10, label: __('Sm', 'gutenam-blocks' ) },
										{ value: 'default', size:30, label: __('Md', 'gutenam-blocks' ) },
										{ value: 'wider', size:60, label: __('Lg', 'gutenam-blocks' ) },
									] }
									value={ {
										value: ( undefined !== collapseGutter ? collapseGutter : 'default' ),
										size: ( undefined !== customRowGutter && undefined !== customRowGutter[0] ? customRowGutter[0] : '' ),
									} }
									onChange={ ( value, size ) => {
										setAttributes( { collapseGutter: value, customRowGutter: [ size, ( customRowGutter[1] ? customRowGutter[1] : '' ), ( customRowGutter[2] ? customRowGutter[2] : '' ) ] } );
									}}
									tabletValue={ {
										value: ( undefined !== tabletRowGutter ? tabletRowGutter : '' ),
										size: ( undefined !== customRowGutter && undefined !== customRowGutter[1] ? customRowGutter[1] : '' ),
									} }
									onChangeTablet={ ( value, size ) => {
										setAttributes( { tabletRowGutter: value, customRowGutter: [ ( customRowGutter[0] ? customRowGutter[0] : '' ), size, ( customRowGutter[2] ? customRowGutter[2] : '' ) ] } );
									}}
									mobileValue={ {
										value: ( undefined !== mobileRowGutter ? mobileRowGutter : '' ),
										size: ( undefined !== customRowGutter && undefined !== customRowGutter[2] ? customRowGutter[2] : '' ),
									} }
									onChangeMobile={ ( value, size ) => {
										setAttributes( { mobileRowGutter: value, customRowGutter: [ ( customRowGutter[0] ? customRowGutter[0] : '' ), ( customRowGutter[1] ? customRowGutter[1] : '' ), size ] } );
									}}
									min={0}
									max={( rowGutterType === 'px' ? 200 : 12 )}
									step={( rowGutterType === 'px' ? 1 : 0.1 )}
									unit={ rowGutterType ? rowGutterType : 'px' }
									onUnit={( value ) => {
										setAttributes( { rowGutterType: value } );
									}}
									units={[ 'px', 'em', 'rem' ]}
								/>
							{ ( colLayout === 'grid-layout' || innerItemCount > columns || previewDevice != 'Desktop' ) && (
								<>
									<SelectControl
										label={ __( 'Collapse Order', 'gutenam-blocks' ) }
										value={ collapseOrder }
										options={ [
											{ value: 'left-to-right', label: __( 'Normal ->', 'gutenam-blocks' ) },
											{ value: 'right-to-left', label: __( 'Reverse <-', 'gutenam-blocks' ) },
										] }
										onChange={ value => setAttributes( { collapseOrder: value } ) }
									/>
								</>
							) }
						</BasePanelBody>
						<BasePanelBody
							title={ __( 'Content Max Width', 'gutenam-blocks' ) }
							initialOpen={ true }
							panelName={ 'bsb-row-max-width' }
						>
							<ToggleControl
								label={ __( 'Inherit Max Width from Theme?', 'gutenam-blocks' ) }
								checked={ ( undefined !== inheritMaxWidth ? inheritMaxWidth : false ) }
								onChange={ ( value ) => setAttributes( { inheritMaxWidth: value } ) }
							/>
							{ inheritMaxWidth !== true && (
								<ResponsiveRangeControls
									label={ __( 'Custom Content Max Width', 'gutenam-blocks' ) }
									value={ maxWidth ? maxWidth : '' }
									onChange={ value => {
										setAttributes( { maxWidth: value } );
									} }
									tabletValue={ ( undefined !== responsiveMaxWidth && undefined !== responsiveMaxWidth[ 0 ] ? responsiveMaxWidth[ 0 ] : '' ) }
									onChangeTablet={ ( value ) => {
										setAttributes( { responsiveMaxWidth: [ value, ( undefined !== responsiveMaxWidth && undefined !== responsiveMaxWidth[ 1 ] ? responsiveMaxWidth[ 1 ] : '' ) ] } );
									} }
									mobileValue={ ( undefined !== responsiveMaxWidth && undefined !== responsiveMaxWidth[ 1 ] ? responsiveMaxWidth[ 1 ] : '' ) }
									onChangeMobile={ ( value ) => {
										setAttributes( { responsiveMaxWidth: [ ( undefined !== responsiveMaxWidth && undefined !== responsiveMaxWidth[ 0 ] ? responsiveMaxWidth[ 0 ] : '' ), value ] } );
									} }
									min={ 0 }
									max={ ( maxWidthUnit === 'px' ? 2000 : 100 ) }
									step={ 1 }
									unit={ maxWidthUnit ? maxWidthUnit : 'px' }
									onUnit={ ( value ) => {
										setAttributes( { maxWidthUnit: value } );
									} }
									units={ [ 'px', '%', 'vw' ] }
								/>
							) }
							{ align === 'full' && 2 === columns && inheritMaxWidth === true && (
								<>
									<ToggleControl
										label={ __( 'Break Left Section Full Width?', 'gutenam-blocks' ) }
										checked={ ( undefined !== breakoutLeft ? breakoutLeft : false ) }
										onChange={ ( value ) => setAttributes( { breakoutLeft: value } ) }
									/>
									<ToggleControl
										label={ __( 'Break Right Section Full Width?', 'gutenam-blocks' ) }
										checked={ ( undefined !== breakoutRight ? breakoutRight : false ) }
										onChange={ ( value ) => setAttributes( { breakoutRight: value } ) }
									/>
								</>
							) }
						</BasePanelBody>
					</>
				) }
			</>
			<div className="bst-sidebar-settings-spacer"></div>
			{ showSettings( 'dividers', 'base/rowlayout' ) && (
				<>
				<BasePanelBody
						title={ __( 'Top Divider', 'gutenam-blocks' ) }
						initialOpen={ false }
						panelName={ 'bsb-row-dividers-top' }
					>
						<BaseIconPicker
							icons={ [
								'ct',
								'cti',
								'ctd',
								'ctdi',
								'sltl',
								'sltr',
								'crv',
								'crvi',
								'crvl',
								'crvli',
								'crvr',
								'crvri',
								'wave',
								'wavei',
								'waves',
								'wavesi',
								'mtns',
								'littri',
								'littrii',
								'threelevels',
								'threelevelsi',
							] }
							value={ ( topSep === 'none' ? '' : topSep ) }
							onChange={ value => setAttributes( { topSep: value } ) }
							showSearch={ false }
							renderFunc={ svg => renderSVGDivider( svg, 'top', '100%' ) }
							theme="dividers"
							allowClear={ true }
							placeholder={ __( 'Select Divider', 'gutenam-blocks' ) }
						/>
						<PopColorControl
							label={ __( 'Divider Color' ) }
							value={ ( topSepColor ? topSepColor : '' ) }
							default={ '#ffffff' }
							onChange={ value => setAttributes( { topSepColor: value } ) }
						/>
						<ResponsiveRangeControls
							label={ __( 'Divider Height', 'gutenam-blocks' ) }
							value={ topSepHeight }
							onChange={ value => {
								setAttributes( { topSepHeight: value } );
							} }
							tabletValue={ topSepHeightTab }
							onChangeTablet={ ( value ) => {
								setAttributes( { topSepHeightTab: value } );
							} }
							mobileValue={ topSepHeightMobile }
							onChangeMobile={ ( value ) => {
								setAttributes( { topSepHeightMobile: value } );
							} }
							min={ 0 }
							max={'em' === topSepHeightUnit ? 100 : 500 }
							step={ 'em' === topSepHeightUnit ? 0.01 : 1 }
							unit={ topSepHeightUnit }
							onUnit={ ( value ) => {
								setAttributes( { topSepHeightUnit: value } );
							} }
							units={ [ 'px', 'em', 'vh' ] }
							showUnit={ true }
						/>
						<ResponsiveRangeControls
							label={ __( 'Divider Width', 'gutenam-blocks' ) }
							value={ topSepWidth }
							onChange={ value => {
								setAttributes( { topSepWidth: value } );
							} }
							tabletValue={ topSepWidthTab }
							onChangeTablet={ ( value ) => {
								setAttributes( { topSepWidthTab: value } );
							} }
							mobileValue={ topSepWidthMobile }
							onChangeMobile={ ( value ) => {
								setAttributes( { topSepWidthMobile: value } );
							} }
							min={ 100 }
							max={ 400 }
							step={ 1 }
							showUnit={ true }
							unit={ '%' }
							units={ ['%'] }
						/>
					</BasePanelBody>
					<BasePanelBody
						title={ __( 'Bottom Divider', 'gutenam-blocks' ) }
						initialOpen={ false }
						panelName={ 'bsb-row-dividers' }
					>
						<BaseIconPicker
							icons={ [
								'ct',
								'cti',
								'ctd',
								'ctdi',
								'sltl',
								'sltr',
								'crv',
								'crvi',
								'crvl',
								'crvli',
								'crvr',
								'crvri',
								'wave',
								'wavei',
								'waves',
								'wavesi',
								'mtns',
								'littri',
								'littrii',
								'threelevels',
								'threelevelsi',
							] }
							value={ ( bottomSep === 'none' ? '' : bottomSep ) }
							onChange={ value => setAttributes( { bottomSep: value } ) }
							showSearch={ false }
							renderFunc={ svg => renderSVGDivider( svg, 'bottom', '100%' ) }
							theme="dividers"
							allowClear={ true }
							placeholder={ __( 'Select Divider', 'gutenam-blocks' ) }
						/>
						<PopColorControl
							label={ __( 'Divider Color', 'gutenam-blocks' ) }
							value={ ( bottomSepColor ? bottomSepColor : '' ) }
							default={ '#ffffff' }
							onChange={ value => setAttributes( { bottomSepColor: value } ) }
						/>
						<ResponsiveRangeControls
							label={ __( 'Divider Height', 'gutenam-blocks' ) }
							value={ bottomSepHeight }
							onChange={ value => {
								setAttributes( { bottomSepHeight: value } );
							} }
							tabletValue={ bottomSepHeightTab }
							onChangeTablet={ ( value ) => {
								setAttributes( { bottomSepHeightTab: value } );
							} }
							mobileValue={ bottomSepHeightMobile }
							onChangeMobile={ ( value ) => {
								setAttributes( { bottomSepHeightMobile: value } );
							} }
							min={ 0 }
							max={'em' === bottomSepHeightUnit ? 100 : 500 }
							step={ 'em' === bottomSepHeightUnit ? 0.01 : 1 }
							unit={ bottomSepHeightUnit }
							onUnit={ ( value ) => {
								setAttributes( { bottomSepHeightUnit: value } );
							} }
							units={ [ 'px', 'em', 'vh' ]}
							showUnit={ true }
						/>
						<ResponsiveRangeControls
							label={ __( 'Divider Width', 'gutenam-blocks' ) }
							value={ bottomSepWidth }
							onChange={ value => {
								setAttributes( { bottomSepWidth: value } );
							} }
							tabletValue={ bottomSepWidthTab }
							onChangeTablet={ ( value ) => {
								setAttributes( { bottomSepWidthTab: value } );
							} }
							mobileValue={ bottomSepWidthMobile }
							onChangeMobile={ ( value ) => {
								setAttributes( { bottomSepWidthMobile: value } );
							} }
							min={ 100 }
							max={ 400 }
							step={ 1 }
							showUnit={ true }
							unit={ '%' }
							units={ ['%'] }
						/>
					</BasePanelBody>
				</>
			) }
		</Fragment>
	);
};
export default LayoutControls;

