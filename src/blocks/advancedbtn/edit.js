/**
 * BLOCK: Base Buttons
 */
/**
 * Import externals
 */
import classnames from 'classnames';
import { times, map, isEqual } from 'lodash';
import {
	PopColorControl,
	StepControls,
	IconRender,
	BasePanelBody,
	URLInputControl,
	VerticalAlignmentIcon,
	ResponsiveRangeControls,
	InspectorControlTabs,
	RangeControl,
	BaseRadioButtons,
	ResponsiveAlignControls,
	ResponsiveGapSizeControl,
	BaseInspectorControls,
	SmallResponsiveControl,
	BaseBlockDefaults,
	BaseIconPicker,
	ResponsiveMeasureRangeControl,
	SpacingVisualizer
} from '@base/components';
import {
	BaseColorOutput,
	getPreviewSize,
	setBlockDefaults,
	showSettings,
	mouseOverVisualizer,
	getSpacingOptionOutput,
	getGapSizeOptionOutput,
	getUniqueId,
	getInQueryBlock,
} from '@base/helpers';
import { useSelect, useDispatch, withDispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
/**
 * Import Css
 */
import './editor.scss';
import metadata from './block.json';
import { migrateToInnerblocks } from './utils';

/**
 * Internal block libraries
 */
import { __ } from '@wordpress/i18n';

import {
	BlockControls,
	AlignmentToolbar,
	BlockAlignmentToolbar,
	BlockVerticalAlignmentControl,
	useBlockProps,
	InnerBlocks,
	JustifyContentControl,
	useInnerBlocksProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import {
	Fragment,
	useEffect,
	useState
} from '@wordpress/element';
import {
	plusCircle
} from '@wordpress/icons';
import {
	TextControl,
	SelectControl,
	Button,
	Dashicon,
	ToolbarButton,
	TabPanel,
	ToolbarGroup,
} from '@wordpress/components';
const DEFAULT_BLOCK = {
	name: 'base/singlebtn',
	attributesToCopy: [
		'sizePreset',
		'inheritStyles',
		'widthType',
	],
};
function BaseButtons( { attributes, className, setAttributes, isSelected, buttonsBlock, insertButton, insertButtons, clientId, context } ) {
	const {
		uniqueID,
		hAlign,
		thAlign,
		mhAlign,
		vAlign,
		tvAlign,
		mvAlign,
		margin,
		marginUnit,
		collapseFullwidth,
		lockBtnCount,
		orientation,
		inQueryBlock,
		gap,
		gapUnit,
		padding,
		tabletPadding,
		mobilePadding,
		paddingUnit,
		btns,
	} = attributes;

	const [ activeTab, setActiveTab ] = useState( 'general' );

	const { addUniqueID } = useDispatch( 'baseblocks/data' );
	const { removeBlock } = useDispatch( 'core/block-editor' );
	const { isUniqueID, isUniqueBlock, previewDevice, childBlocks } = useSelect(
		( select ) => {
			return {
				isUniqueID: ( value ) => select( 'baseblocks/data' ).isUniqueID( value ),
				isUniqueBlock: ( value, clientId ) => select( 'baseblocks/data' ).isUniqueBlock( value, clientId ),
				previewDevice: select( 'baseblocks/data' ).getPreviewDeviceType(),
				childBlocks: select( 'core/block-editor' ).getBlockOrder( clientId ),
			};
		},
		[ clientId ]
	);

	useEffect( () => {
		setBlockDefaults( 'base/advancedbtn', attributes);

		let uniqueId = getUniqueId( uniqueID, clientId, isUniqueID, isUniqueBlock );
		if ( uniqueId !== uniqueID ) {
			attributes.uniqueID = uniqueId;
			setAttributes( { uniqueID: uniqueId } );
			addUniqueID( uniqueId, clientId );
		} else {
			addUniqueID( uniqueId, clientId );
		}

		setAttributes( { inQueryBlock: getInQueryBlock( context, inQueryBlock ) } );
	}, [] );

	useEffect( () => {
		if ( uniqueID && ! childBlocks.length ) {
			// Check if we are attempting recovery.
			if ( btns?.length && btns.length && undefined !== metadata?.attributes?.btns?.default && !isEqual( metadata.attributes.btns.default, btns ) ) {
				const migrateUpdate = migrateToInnerblocks( attributes );
				setAttributes( migrateUpdate[0] );
				insertButtons( migrateUpdate[1] );
			} else {
				// Delete if no inner blocks.
				removeBlock( clientId, true );
			}
		}
	}, [ childBlocks.length ] );

	const saveMargin = ( value ) => {
		const newUpdate = margin.map( ( item, index ) => {
			if ( 0 === index ) {
				item = { ...item, ...value };
			}
			return item;
		} );
		setAttributes( {
			margin: newUpdate,
		} );
	};
	const marginMouseOver = mouseOverVisualizer();
	const paddingMouseOver = mouseOverVisualizer();
	const previewGap = getPreviewSize( previewDevice, ( undefined !== gap?.[0] ? gap[0] : '' ), ( undefined !== gap?.[1] ? gap[1] : '' ), ( undefined !== gap?.[2] ? gap[2] : '' ) );
	const previewAlign = getPreviewSize( previewDevice, ( undefined !== hAlign ? hAlign : '' ), ( undefined !== thAlign ? thAlign : '' ), ( undefined !== mhAlign ? mhAlign : '' ) );
	const previewVertical = getPreviewSize( previewDevice, ( undefined !== vAlign ? vAlign : '' ), ( undefined !== tvAlign ? tvAlign : '' ), ( undefined !== mvAlign ? mvAlign : '' ) );
	const previewOrientation = getPreviewSize( previewDevice, ( undefined !== orientation?.[0] ? orientation[0] : '' ), ( undefined !== orientation?.[1] ? orientation[1] : '' ), ( undefined !== orientation?.[2] ? orientation[2] : '' ) );

	const previewPaddingTop = getPreviewSize( previewDevice, ( undefined !== padding?.[0] ? padding[0] : '' ), ( undefined !== tabletPadding?.[0] ? tabletPadding[0] : '' ), ( undefined !== mobilePadding?.[0] ? mobilePadding[0] : '' ) );
	const previewPaddingRight = getPreviewSize( previewDevice, ( undefined !== padding?.[1] ? padding[1] : '' ), ( undefined !== tabletPadding?.[1] ? tabletPadding[1] : '' ), ( undefined !== mobilePadding?.[1] ? mobilePadding[1] : '' ) );
	const previewPaddingBottom = getPreviewSize( previewDevice, ( undefined !== padding?.[2] ? padding[2] : '' ), ( undefined !== tabletPadding?.[2] ? tabletPadding[2] : '' ), ( undefined !== mobilePadding?.[2] ? mobilePadding[2] : '' ) );
	const previewPaddingLeft = getPreviewSize( previewDevice, ( undefined !== padding?.[3] ? padding[3] : '' ), ( undefined !== tabletPadding?.[3] ? tabletPadding[3] : '' ), ( undefined !== mobilePadding?.[3] ? mobilePadding[3] : '' ) );

	const previewMarginTop = getPreviewSize( previewDevice, ( undefined !== margin && undefined !== margin[ 0 ] && undefined !== margin[ 0 ].desk && '' !== margin[ 0 ].desk[ 0 ] ? margin[ 0 ].desk[ 0 ] : '' ), ( undefined !== margin && undefined !== margin[ 0 ] && undefined !== margin[ 0 ].tablet && '' !== margin[ 0 ].tablet[ 0 ] ? margin[ 0 ].tablet[ 0 ] : '' ), ( undefined !== margin && undefined !== margin[ 0 ] && undefined !== margin[ 0 ].mobile && '' !== margin[ 0 ].mobile[ 0 ] ? margin[ 0 ].mobile[ 0 ] : '' ) );
	const previewMarginRight = getPreviewSize( previewDevice, ( undefined !== margin && undefined !== margin[ 0 ] && undefined !== margin[ 0 ].desk && '' !== margin[ 0 ].desk[ 1 ] ? margin[ 0 ].desk[ 1 ] : '' ), ( undefined !== margin && undefined !== margin[ 0 ] && undefined !== margin[ 0 ].tablet && '' !== margin[ 0 ].tablet[ 1 ] ? margin[ 0 ].tablet[ 1 ] : '' ), ( undefined !== margin && undefined !== margin[ 0 ] && undefined !== margin[ 0 ].mobile && '' !== margin[ 0 ].mobile[ 1 ] ? margin[ 0 ].mobile[ 1 ] : '' ) );
	const previewMarginBottom = getPreviewSize( previewDevice, ( undefined !== margin && undefined !== margin[ 0 ] && undefined !== margin[ 0 ].desk && '' !== margin[ 0 ].desk[ 2 ] ? margin[ 0 ].desk[ 2 ] : '' ), ( undefined !== margin && undefined !== margin[ 0 ] && undefined !== margin[ 0 ].tablet && '' !== margin[ 0 ].tablet[ 2 ] ? margin[ 0 ].tablet[ 2 ] : '' ), ( undefined !== margin && undefined !== margin[ 0 ] && undefined !== margin[ 0 ].mobile && '' !== margin[ 0 ].mobile[ 2 ] ? margin[ 0 ].mobile[ 2 ] : '' ) );
	const previewMarginLeft = getPreviewSize( previewDevice, ( undefined !== margin && undefined !== margin[ 0 ] && undefined !== margin[ 0 ].desk && '' !== margin[ 0 ].desk[ 3 ] ? margin[ 0 ].desk[ 3 ] : '' ), ( undefined !== margin && undefined !== margin[ 0 ] && undefined !== margin[ 0 ].tablet && '' !== margin[ 0 ].tablet[ 3 ] ? margin[ 0 ].tablet[ 3 ] : '' ), ( undefined !== margin && undefined !== margin[ 0 ] && undefined !== margin[ 0 ].mobile && '' !== margin[ 0 ].mobile[ 3 ] ? margin[ 0 ].mobile[ 3 ] : '' ) );

	const outerClasses = classnames( {
		className                   : className,
		[ `bsb-btns-${uniqueID}` ]  : true,
	} );
	const blockProps = useBlockProps( {
		className: outerClasses,
		style:{
			marginTop: ( undefined !== previewMarginTop ? getSpacingOptionOutput( previewMarginTop, marginUnit ) : undefined ),
			marginBottom: ( undefined !== previewMarginBottom ? getSpacingOptionOutput( previewMarginBottom, marginUnit ) : undefined ),
		}
	} );
	const innerClasses = classnames( {
		'bsb-btns-outer-wrap'                   : true,
		[ `bst-btn-align-${previewAlign}` ]  : previewAlign,
		[ `bst-btn-valign-${previewVertical}` ]  : previewVertical,
		[ `bsb-direction-columns` ]         : ( previewOrientation && ( 'column' === previewOrientation || 'column-reverse' === previewOrientation ) ),
	} );
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: innerClasses,
			style:{
				paddingLeft: ( undefined !== previewPaddingLeft ? getSpacingOptionOutput( previewPaddingLeft, paddingUnit ) : undefined ),
				paddingRight: ( undefined !== previewPaddingRight ? getSpacingOptionOutput( previewPaddingRight, paddingUnit ) : undefined ),
				paddingTop: ( undefined !== previewPaddingTop ? getSpacingOptionOutput( previewPaddingTop, paddingUnit ) : undefined ),
				paddingBottom: ( undefined !== previewPaddingBottom ? getSpacingOptionOutput( previewPaddingBottom, paddingUnit ) : undefined ),
				marginLeft: ( undefined !== previewMarginLeft ? getSpacingOptionOutput( previewMarginLeft, marginUnit ) : undefined ),
				marginRight: ( undefined !== previewMarginRight ? getSpacingOptionOutput( previewMarginRight, marginUnit ) : undefined ),
			}
		},
		{
			orientation: 'horizontal',
			templateLock: lockBtnCount ? true : false,
            templateInsertUpdatesSelection: true,
			__experimentalDefaultBlock: DEFAULT_BLOCK,
			__experimentalDirectInsert:true,
            template: [ [ 'base/singlebtn' ] ],
            allowedBlocks: [ 'base/singlebtn' ],
		}
	);
	return (
		<div {...blockProps}>
			<style>
				{ previewGap && (
					`.wp-block-base-advancedbtn.bsb-btns-${uniqueID} .bsb-btns-outer-wrap {
						gap: ${getGapSizeOptionOutput( previewGap, ( gapUnit ? gapUnit : 'px' ) )};
					}`
				) }
				{ previewOrientation && (
					`.wp-block-base-advancedbtn.bsb-btns-${uniqueID} .bsb-btns-outer-wrap {
						flex-direction: ${previewOrientation};
					}`
				) }
			</style>
			<BlockControls>
				<ToolbarGroup>
					<JustifyContentControl
						value={ previewAlign }
						onChange={ value => {
							if ( previewDevice === 'Mobile' ) {
								setAttributes( { mhAlign: ( value ? value : '' ) } );
							} else if ( previewDevice === 'Tablet' ) {
								setAttributes( { thAlign: ( value ? value : '' ) } );
							} else {
								setAttributes( { hAlign: ( value ? value : 'center' ) } );
							}
						} }
					/>
					<BlockVerticalAlignmentControl
						value={previewVertical}
						onChange={ value => {
							if ( previewDevice === 'Mobile' ) {
								setAttributes( { mvAlign: ( value ? value : '' ) } );
							} else if ( previewDevice === 'Tablet' ) {
								setAttributes( { tvAlign: ( value ? value : '' ) } );
							} else {
								setAttributes( { vAlign: ( value ? value : 'center' ) } );
							}
						}}
					/>
				</ToolbarGroup>
				{ ! lockBtnCount && (
					<ToolbarGroup>
						<ToolbarButton
							className="bsb-icons-add-icon"
							icon={ plusCircle }
							onClick={ () => {
								const prevAttributes = buttonsBlock.innerBlocks[buttonsBlock.innerBlocks.length - 1].attributes;
								const latestAttributes = JSON.parse(JSON.stringify(prevAttributes) );
								latestAttributes.uniqueID = '';
								const newBlock = createBlock( 'base/singlebtn', latestAttributes );
								insertButton( newBlock );
							} }
							label={  __( 'Duplicate Previous Button', 'gutenam-blocks' ) }
							showTooltip={ true }
						/>
					</ToolbarGroup>
				)}
			</BlockControls>
			<BaseInspectorControls blockSlug={ 'base/advancedbtn' }>

				<InspectorControlTabs
					panelName={ 'advancedbtn' }
					allowedTabs={ [ 'general', 'advanced' ] }
					setActiveTab={ ( value ) => setActiveTab( value ) }
					activeTab={ activeTab }
				/>

				{( activeTab === 'general' ) &&
					<BasePanelBody panelName={'bsb-icon-alignment-settings'}>
						<ResponsiveAlignControls
							label={__( 'Alignment', 'gutenam-blocks' )}
							value={( hAlign ? hAlign : '' )}
							mobileValue={( mhAlign ? mhAlign : '' )}
							tabletValue={( thAlign ? thAlign : '' )}
							onChange={( nextAlign ) => setAttributes( { hAlign: ( nextAlign ? nextAlign : 'center' ) } )}
							onChangeTablet={( nextAlign ) => setAttributes( { thAlign: ( nextAlign ? nextAlign : '' ) } )}
							onChangeMobile={( nextAlign ) => setAttributes( { mhAlign: ( nextAlign ? nextAlign : '' ) } )}
							type={ 'justify' }
						/>
						<ResponsiveAlignControls
							label={__( 'Vertical Alignment', 'gutenam-blocks' )}
							value={( vAlign ? vAlign : '' )}
							mobileValue={( mvAlign ? mvAlign : '' )}
							tabletValue={( tvAlign ? tvAlign : '' )}
							onChange={( nextAlign ) => setAttributes( { vAlign: ( nextAlign ? nextAlign : 'center' ) } )}
							onChangeTablet={( nextAlign ) => setAttributes( { tvAlign: ( nextAlign ? nextAlign : '' ) } )}
							onChangeMobile={( nextAlign ) => setAttributes( { mvAlign: ( nextAlign ? nextAlign : '' ) } )}
							type={ 'vertical' }
						/>
						<ResponsiveAlignControls
							label={__( 'Orientation', 'gutenam-blocks' )}
							value={( undefined !== orientation?.[0] ? orientation[0] : '' )}
							tabletValue={( undefined !== orientation?.[1] ? orientation[1] : '' )}
							mobileValue={( undefined !== orientation?.[2] ? orientation[2] : '' )}
							onChange={( value ) => setAttributes( { orientation: [ value, ( undefined !== orientation?.[1] ? orientation[1] : '' ), ( undefined !== orientation?.[2] ? orientation[2] : '' ) ] } ) }
							onChangeTablet={( value ) => setAttributes( { orientation: [ ( undefined !== orientation?.[0] ? orientation[0] : '' ), value, ( undefined !== orientation?.[2] ? orientation[2] : '' ) ] } ) }
							onChangeMobile={( value ) => setAttributes( { orientation: [ ( undefined !== orientation?.[0] ? orientation[0] : '' ), ( undefined !== orientation?.[1] ? orientation[1] : '' ), value ] } ) }
							type={ 'orientation' }
						/>
						{ undefined !== buttonsBlock?.innerBlocks?.length && buttonsBlock.innerBlocks.length > 1 && (
							<ResponsiveGapSizeControl
								label={__( 'Button Gap', 'gutenam-blocks' )}
								value={ ( undefined !== gap?.[0] ? gap[0] : '' ) }
								onChange={ value => setAttributes( { gap: [value,( undefined !== gap[1] ? gap[1] : '' ),( undefined !== gap[2] ? gap[2] : '' )] } )}
								tabletValue={( undefined !== gap?.[1] ? gap[1] : '' )}
								onChangeTablet={( value ) => setAttributes( { gap: [( undefined !== gap[0] ? gap[0] : '' ),value,( undefined !== gap[2] ? gap[2] : '' )] } )}
								mobileValue={( undefined !== gap?.[2] ? gap[2] : '' )}
								onChangeMobile={( value ) => setAttributes( { gap: [( undefined !== gap[0] ? gap[0] : '' ),( undefined !== gap[1] ? gap[1] : '' ),value] } )}
								min={0}
								max={( gapUnit === 'px' ? 200 : 12 )}
								step={( gapUnit === 'px' ? 1 : 0.1 )}
								unit={ gapUnit ? gapUnit : 'px' }
								onUnit={( value ) => {
									setAttributes( { gapUnit: value } );
								}}
								units={[ 'px', 'em', 'rem' ]}
							/>
						) }
					</BasePanelBody>
				}
				{( activeTab === 'advanced' ) && (
					<>
						{showSettings('marginSettings', 'base/advancedbtn') && (
							<>
								<BasePanelBody panelName={'bsb-adv-button-margin-settings'}>
									<ResponsiveMeasureRangeControl
										label={__( 'Padding', 'gutenam-blocks' )}
										value={padding}
										onChange={( value ) => setAttributes( { padding: value } )}
										tabletValue={tabletPadding}
										onChangeTablet={( value ) => setAttributes( { tabletPadding: value } )}
										mobileValue={mobilePadding}
										onChangeMobile={( value ) => setAttributes( { mobilePadding: value } )}
										min={( paddingUnit === 'em' || paddingUnit === 'rem' ? -25 : -400 )}
										max={( paddingUnit === 'em' || paddingUnit === 'rem' ? 25 : 400 )}
										step={( paddingUnit === 'em' || paddingUnit === 'rem' ? 0.1 : 1 )}
										unit={paddingUnit}
										units={[ 'px', 'em', 'rem' ]}
										onUnit={( value ) => setAttributes( { paddingUnit: value } )}
										onMouseOver={ paddingMouseOver.onMouseOver }
										onMouseOut={ paddingMouseOver.onMouseOut }
									/>
									<ResponsiveMeasureRangeControl
										label={__( 'Margin', 'gutenam-blocks' )}
										value={undefined !== margin && undefined !== margin[0] && undefined !== margin[0].desk ? margin[0].desk : ['', '', '', '']}
										tabletValue={undefined !== margin && undefined !== margin[0] && undefined !== margin[0].tablet ? margin[0].tablet : ['', '', '', '']}
										mobileValue={undefined !== margin && undefined !== margin[0] && undefined !== margin[0].mobile ? margin[0].mobile : ['', '', '', '']}
										onChange={(value) => {
											saveMargin({desk: value})
										}}
										onChangeTablet={(value) => {
											saveMargin({tablet: value})
										}}
										onChangeMobile={(value) => {
											saveMargin({mobile: value})
										}}
										min={( marginUnit === 'em' || marginUnit === 'rem' ? -25 : -400 )}
										max={( marginUnit === 'em' || marginUnit === 'rem' ? 25 : 400 )}
										step={( marginUnit === 'em' || marginUnit === 'rem' ? 0.1 : 1 )}
										unit={marginUnit}
										units={[ 'px', 'em', 'rem', '%', 'vh' ]}
										onUnit={( value ) => setAttributes( { marginUnit: value } )}
										onMouseOver={ marginMouseOver.onMouseOver }
										onMouseOut={ marginMouseOver.onMouseOut }
									/>
								</BasePanelBody>

								<div className="bst-sidebar-settings-spacer"></div>
							</>
						)}
					</>
				)}
			</BaseInspectorControls>
			<div {...innerBlocksProps}>
			</div>
			<SpacingVisualizer
				type="inside"
				style={ {
					marginLeft: ( undefined !== previewMarginLeft ? getSpacingOptionOutput( previewMarginLeft, marginUnit ) : undefined ),
					marginRight: ( undefined !== previewMarginRight ? getSpacingOptionOutput( previewMarginRight, marginUnit ) : undefined ),
				} }
				forceShow={ paddingMouseOver.isMouseOver }
				spacing={ [ getSpacingOptionOutput( previewPaddingTop, paddingUnit ), getSpacingOptionOutput( previewPaddingRight, paddingUnit ), getSpacingOptionOutput( previewPaddingBottom, paddingUnit ), getSpacingOptionOutput( previewPaddingLeft, paddingUnit ) ] }
			/>
			<SpacingVisualizer
				type="outsideVertical"
				forceShow={ marginMouseOver.isMouseOver }
				spacing={ [ getSpacingOptionOutput( previewMarginTop, marginUnit ), getSpacingOptionOutput( previewMarginRight, marginUnit ), getSpacingOptionOutput( previewMarginBottom, marginUnit ), getSpacingOptionOutput( previewMarginLeft, marginUnit ) ] }
			/>
		</div>
	);
}
const BaseButtonsWrapper = withDispatch(
	( dispatch, ownProps, registry ) => ( {
		insertButton( newBlock ) {
			const { clientId } = ownProps;
			const { insertBlock } = dispatch( blockEditorStore );
			const { getBlock } = registry.select( blockEditorStore );
			const block = getBlock( clientId );
			insertBlock( newBlock, parseInt( block.innerBlocks.length ), clientId );
		},
		insertButtons( newBlocks ) {
			const { clientId } = ownProps;
			const { replaceInnerBlocks } = dispatch( blockEditorStore );

			replaceInnerBlocks( clientId, newBlocks );
		},
	} )
)( BaseButtons );
const BaseButtonsEdit = ( props ) => {
	const { clientId } = props;
	const { buttonsBlock } = useSelect(
		( select ) => {
			const {
				getBlock,
			} = select( 'core/block-editor' );
			const block = getBlock( clientId );
			return {
				buttonsBlock: block,
			};
		},
		[ clientId ]
	);
	return <BaseButtonsWrapper buttonsBlock={ buttonsBlock } { ...props } />;
};
export default BaseButtonsEdit;

