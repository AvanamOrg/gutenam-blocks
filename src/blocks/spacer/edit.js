/**
 * BLOCK: Base Spacer
 *
 * Registering a basic block with Gutenberg.
 */

import SvgPattern from './svg-pattern';
import {
	BaseColorOutput,
	showSettings,
	getPreviewSize,
	setBlockDefaults,
	getUniqueId
} from '@base/helpers';
import {
	PopColorControl,
	ResponsiveRangeControls,
	BasePanelBody,
	InspectorControlTabs,
	ResponsiveAlignControls,
	BaseBlockDefaults,
	CopyPasteAttributes,
} from '@base/components';

/**
 * Import Css
 */
import './editor.scss';
import metadata from './block.json';

/**
 * Internal block libraries
 */
import { __ } from '@wordpress/i18n';

import {
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
	BlockAlignmentToolbar,
	useBlockProps
} from '@wordpress/block-editor';
import {
	ToggleControl,
	RangeControl,
	SelectControl,
	ResizableBox,
} from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';

import {
	useEffect,
	useState,
	Fragment
} from '@wordpress/element';

/**
 * Build the spacer edit
 */
function BaseSpacerDivider( { attributes, clientId, setAttributes, toggleSelection } ) {

	const {
		className,
		blockAlignment,
		spacerHeight,
		tabletSpacerHeight,
		mobileSpacerHeight,
		dividerEnable,
		dividerStyle,
		dividerColor,
		dividerOpacity,
		dividerHeight,
		dividerWidth,
		hAlign,
		uniqueID,
		spacerHeightUnits,
		rotate,
		strokeWidth,
		strokeGap,
		mobileHAlign,
		tabletHAlign,
		dividerWidthUnits,
		tabletDividerWidth,
		mobileDividerWidth,
		tabletDividerHeight,
		mobileDividerHeight,
		vsdesk,
		vstablet,
		vsmobile,
	} = attributes;

	const { addUniqueID } = useDispatch( 'baseblocks/data' );
	const { isUniqueID, isUniqueBlock, previewDevice } = useSelect(
		( select ) => {
			return {
				isUniqueID: ( value ) => select( 'baseblocks/data' ).isUniqueID( value ),
				isUniqueBlock: ( value, clientId ) => select( 'baseblocks/data' ).isUniqueBlock( value, clientId ),
				previewDevice: select( 'baseblocks/data' ).getPreviewDeviceType(),
			};
		},
		[ clientId ]
	);

	useEffect( () => {
		setBlockDefaults( 'base/spacer', attributes);

		let uniqueId = getUniqueId( uniqueID, clientId, isUniqueID, isUniqueBlock );
		if ( uniqueId !== uniqueID ) {
			attributes.uniqueID = uniqueId;
			setAttributes( { uniqueID: uniqueId } );
			addUniqueID( uniqueId, clientId );
		} else {
			addUniqueID( uniqueID, clientId );
		}

	}, [] );

	const [ activeTab, setActiveTab ] = useState( 'general' );

	const blockProps = useBlockProps( {
		className: className,
	} );

	let alp;
	if ( dividerOpacity < 10 ) {
		alp = '0.0' + dividerOpacity;
	} else if ( dividerOpacity >= 100 ) {
		alp = '1';
	} else {
		alp = '0.' + dividerOpacity;
	}

	const editorDocument = document.querySelector( 'iframe[name="editor-canvas"]' )?.contentWindow.document || document;
	const dividerBorderColor = ( !dividerColor ? BaseColorOutput( '#eeeeee', alp ) : BaseColorOutput( dividerColor, alp ) );

	const previewHeight = getPreviewSize( previewDevice, ( '' !== spacerHeight ? spacerHeight : 60 ), ( '' !== tabletSpacerHeight ? tabletSpacerHeight : '' ), ( '' !== mobileSpacerHeight ? mobileSpacerHeight : '' ) );
	const previewHAlign = getPreviewSize( previewDevice, ( '' !== hAlign ? hAlign : '' ), ( '' !== tabletHAlign ? tabletHAlign : '' ), ( '' !== mobileHAlign ? mobileHAlign : '' ) );
	const minD = ( dividerStyle !== 'stripe' ? 1 : 10 );
	const maxD = ( dividerStyle !== 'stripe' ? 400 : 60 );
	const previewDividerHeight = getPreviewSize( previewDevice, ( '' !== dividerHeight ? dividerHeight : 1 ), ( '' !== tabletDividerHeight ? tabletDividerHeight : '' ), ( '' !== mobileDividerHeight ? mobileDividerHeight : '' ) );
	const previewDividerWidth = getPreviewSize( previewDevice, ( '' !== dividerWidth ? dividerWidth : 1 ), ( '' !== tabletDividerWidth ? tabletDividerWidth : '' ), ( '' !== mobileDividerWidth ? mobileDividerWidth : '' ) );
	return (
		<div {...blockProps}>
			{showSettings( 'spacerDivider', 'base/spacer' ) && (
				<Fragment>
					<BlockControls key="controls">
						<BlockAlignmentToolbar
							value={blockAlignment}
							controls={[ 'center', 'wide', 'full' ]}
							onChange={value => setAttributes( { blockAlignment: value } )}
						/>
						<AlignmentToolbar
							value={hAlign}
							onChange={value => setAttributes( { hAlign: value } )}
						/>
						<CopyPasteAttributes
							attributes={ attributes }
							defaultAttributes={ metadata['attributes'] }
							blockSlug={ metadata['name'] }
							onPaste={ attributesToPaste => setAttributes( attributesToPaste ) }
						/>
					</BlockControls>
					<InspectorControls>

						<InspectorControlTabs
							panelName={ 'spacer' }
							allowedTabs={ [ 'general', 'advanced' ] }
							setActiveTab={ ( value ) => setActiveTab( value ) }
							activeTab={ activeTab }
						/>

						{( activeTab === 'general' ) &&
							<>
								<BasePanelBody
									title={__( 'Spacer Settings', 'gutenam-blocks' )}
									initialOpen={true}
									panelName={'bsb-spacer-settings'}
								>
									{ showSettings( 'spacerHeight', 'base/spacer' ) && (
										<ResponsiveRangeControls
											label={__( 'Height', 'gutenam-blocks' )}
											value={spacerHeight}
											onChange={value => setAttributes( { spacerHeight: value } )}
											tabletValue={( tabletSpacerHeight ? tabletSpacerHeight : '' )}
											onChangeTablet={( value ) => setAttributes( { tabletSpacerHeight: value } )}
											mobileValue={( mobileSpacerHeight ? mobileSpacerHeight : '' )}
											onChangeMobile={( value ) => setAttributes( { mobileSpacerHeight: value } )}
											min={6}
											max={600}
											step={1}
											unit={spacerHeightUnits}
											onUnit={ showSettings( 'spacerHeightUnits', 'base/spacer' ) ? ( value ) => setAttributes( { spacerHeightUnits: value } ) : false}
											units={[ 'px', 'vh' ]}
										/>
									)}
								</BasePanelBody>
								<BasePanelBody
									title={__( 'Divider Settings', 'gutenam-blocks' )}
									initialOpen={true}
									panelName={'bsb-divider-settings'}
								>
									{ showSettings( 'dividerToggle', 'base/spacer' ) && (
										<ToggleControl
											label={__( 'Enable Divider', 'gutenam-blocks' )}
											checked={dividerEnable}
											onChange={value => setAttributes( { dividerEnable: value } )}
										/>
									)}
									{dividerEnable && showSettings( 'dividerStyles', 'base/spacer' ) && (
										<Fragment>
											<ResponsiveAlignControls
												label={__( 'Alignment', 'gutenam-blocks' )}
												value={( hAlign ? hAlign : '' )}
												mobileValue={( mobileHAlign ? mobileHAlign : '' )}
												tabletValue={( tabletHAlign ? tabletHAlign : '' )}
												onChange={( nextAlign ) => setAttributes( { hAlign: nextAlign } )}
												onChangeTablet={( nextAlign ) => setAttributes( { tabletHAlign: nextAlign } )}
												onChangeMobile={( nextAlign ) => setAttributes( { mobileHAlign: nextAlign } )}
											/>
											<SelectControl
												label={__( 'Divider Style', 'gutenam-blocks' )}
												value={dividerStyle}
												options={[
													{ value: 'solid', label: __( 'Solid', 'gutenam-blocks' ) },
													{ value: 'dashed', label: __( 'Dashed', 'gutenam-blocks' ) },
													{ value: 'dotted', label: __( 'Dotted', 'gutenam-blocks' ) },
													{ value: 'stripe', label: __( 'Stripe', 'gutenam-blocks' ) },
												]}
												onChange={value => setAttributes( { dividerStyle: value } )}
											/>
											<PopColorControl
												label={__( 'Divider Color', 'gutenam-blocks' )}
												value={( dividerColor ? dividerColor : '' )}
												default={''}
												opacityValue={dividerOpacity}
												onChange={value => setAttributes( { dividerColor: value } )}
												onOpacityChange={value => setAttributes( { dividerOpacity: value } )}
												opacityUnit={100}
											/>
											{'stripe' === dividerStyle && (
												<Fragment>
													<RangeControl
														label={__( 'Stripe Angle', 'gutenam-blocks' )}
														value={rotate}
														onChange={value => setAttributes( { rotate: value } )}
														min={0}
														max={135}
													/>
													<RangeControl
														label={__( 'Stripe Width', 'gutenam-blocks' )}
														value={strokeWidth}
														onChange={value => setAttributes( { strokeWidth: value } )}
														min={1}
														max={30}
													/>
													<RangeControl
														label={__( 'Stripe Gap', 'gutenam-blocks' )}
														value={strokeGap}
														onChange={value => setAttributes( { strokeGap: value } )}
														min={1}
														max={30}
													/>
												</Fragment>
											)}
											<ResponsiveRangeControls
												label={__( 'Divider Height', 'gutenam-blocks' )}
												value={dividerHeight}
												onChange={value => setAttributes( { dividerHeight: value } )}
												tabletValue={( tabletDividerHeight ? tabletDividerHeight : '' )}
												onChangeTablet={( value ) => setAttributes( { tabletDividerHeight: value } )}
												mobileValue={( mobileDividerHeight ? mobileDividerHeight : '' )}
												onChangeMobile={( value ) => setAttributes( { mobileDividerHeight: value } )}
												min={minD}
												max={maxD}
												step={1}
												unit={'px'}
											/>
											<ResponsiveRangeControls
												label={__( 'Divider Width', 'gutenam-blocks' )}
												value={dividerWidth}
												onChange={value => setAttributes( { dividerWidth: value } )}
												tabletValue={( tabletDividerWidth ? tabletDividerWidth : '' )}
												onChangeTablet={( value ) => setAttributes( { tabletDividerWidth: value } )}
												mobileValue={( mobileDividerWidth ? mobileDividerWidth : '' )}
												onChangeMobile={( value ) => setAttributes( { mobileDividerWidth: value } )}
												min={0}
												max={( dividerWidthUnits == 'px' ? 3000 : 100 )}
												step={1}
												unit={dividerWidthUnits}
												onUnit={( value ) => setAttributes( { dividerWidthUnits: value } )}
												units={[ 'px', '%' ]}
											/>
										</Fragment>
									)}
								</BasePanelBody>

							</>
						}

						{( activeTab === 'advanced' ) &&
							<>
								<BasePanelBody
									title={__('Visibility Settings', 'gutenam-blocks')}
									panelName={'bsb-visibility-settings'}
								>
									<ToggleControl
										label={__('Hide on Desktop', 'gutenam-blocks')}
										checked={(undefined !== vsdesk ? vsdesk : false)}
										onChange={(value) => setAttributes({vsdesk: value})}
									/>
									<ToggleControl
										label={__('Hide on Tablet', 'gutenam-blocks')}
										checked={(undefined !== vstablet ? vstablet : false)}
										onChange={(value) => setAttributes({vstablet: value})}
									/>
									<ToggleControl
										label={__('Hide on Mobile', 'gutenam-blocks')}
										checked={(undefined !== vsmobile ? vsmobile : false)}
										onChange={(value) => setAttributes({vsmobile: value})}
									/>
								</BasePanelBody>

								<BaseBlockDefaults attributes={attributes} defaultAttributes={metadata['attributes']}
													  blockSlug={metadata['name']}/>
							</>
						}
					</InspectorControls>
				</Fragment>
			)}
			<div className={`bst-block-spacer bst-block-spacer-halign-${previewHAlign}`}>
				{dividerEnable && (
					<Fragment>
						{dividerStyle === 'stripe' && (
							<span className="bst-divider-stripe" style={{
								height: ( previewDividerHeight < 10 ? 10 : previewDividerHeight ) + 'px',
								width : previewDividerWidth + ( dividerWidthUnits ? dividerWidthUnits : '%' ),
							}}>
									<SvgPattern uniqueID={uniqueID} color={BaseColorOutput( dividerColor )} opacity={dividerOpacity} rotate={rotate} strokeWidth={strokeWidth}
												strokeGap={strokeGap}/>
								</span>
						)}
						{dividerStyle !== 'stripe' && (
							<hr className="bst-divider" style={{
								borderTopColor: dividerBorderColor,
								borderTopWidth: previewDividerHeight + 'px',
								width         : previewDividerWidth + ( dividerWidthUnits ? dividerWidthUnits : '%' ),
								borderTopStyle: dividerStyle,
							}}/>
						)}
					</Fragment>
				)}
				{spacerHeightUnits && 'vh' === spacerHeightUnits && (
					<div className="bst-spacer-height-preview" style={{
						height: spacerHeight + ( spacerHeightUnits ? spacerHeightUnits : 'px' ),
					}}>
							<span id={`spacing-height-${uniqueID}`}>
								{spacerHeight + ( spacerHeightUnits ? spacerHeightUnits : 'px' )}
							</span>
					</div>
				)}
				{'vh' !== spacerHeightUnits && showSettings( 'spacerDivider', 'base/spacer' ) && showSettings( 'spacerHeight', 'base/spacer' ) && (
					<ResizableBox
						size={{
							height: previewHeight,
						}}
						minHeight="20"
						handleClasses={{
							top   : 'base-spacer__resize-handler-top',
							bottom: 'base-spacer__resize-handler-bottom',
						}}
						enable={{
							top        : false,
							right      : false,
							bottom     : true,
							left       : false,
							topRight   : false,
							bottomRight: false,
							bottomLeft : false,
							topLeft    : false,
						}}
						onResize={( event, direction, elt, delta ) => {
							editorDocument.getElementById( 'spacing-height-' + ( uniqueID ? uniqueID : 'no-unique' ) ).innerHTML = parseInt( previewHeight + delta.height, 10 ) + ( spacerHeightUnits ? spacerHeightUnits : 'px' );
						}}
						onResizeStop={( event, direction, elt, delta ) => {
							toggleSelection( true );
							if ( 'Mobile' === previewDevice ) {
								setAttributes( {
									mobileSpacerHeight: parseInt( previewHeight + delta.height, 10 ),
								} );
							} else if ( 'Tablet' === previewDevice ) {
								setAttributes( {
									tabletSpacerHeight: parseInt( previewHeight + delta.height, 10 ),
								} );
							} else {
								setAttributes( {
									spacerHeight: parseInt( previewHeight + delta.height, 10 ),
								} );
							}
						}}
						onResizeStart={() => {
							toggleSelection( false );
						}}
					>
						{uniqueID && (
							<div className="bst-spacer-height-preview">
									<span id={`spacing-height-${uniqueID}`}>
										{previewHeight + ( spacerHeightUnits ? spacerHeightUnits : 'px' )}
									</span>
							</div>
						)}
					</ResizableBox>
				)}
				{'vh' !== spacerHeightUnits && ( !showSettings( 'spacerDivider', 'base/spacer' ) || !showSettings( 'spacerHeight', 'base/spacer' ) ) && (
					<div className="bst-spacer-height-preview" style={{
						height: previewHeight + ( spacerHeightUnits ? spacerHeightUnits : 'px' ),
					}}>
							<span id={`spacing-height-${uniqueID}`}>
								{previewHeight + ( spacerHeightUnits ? spacerHeightUnits : 'px' )}
							</span>
					</div>
				)}
			</div>
		</div>
	);
}

export default BaseSpacerDivider;
