/**
 * BLOCK: Base Icon
 */
/**
 * Import Controls
 */
import classnames from 'classnames';
/**
 * Import externals
 */
import {
	BasePanelBody,
	InspectorControlTabs,
	ResponsiveAlignControls,
	BaseInspectorControls,
	ResponsiveGapSizeControl,
} from '@base/components';
import {
	getPreviewSize,
	setBlockDefaults,
	getUniqueId,
	getInQueryBlock,
	getGapSizeOptionOutput,
} from '@base/helpers';
import { useSelect, useDispatch, withDispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
/**
 * Import Css
 */
import './editor.scss';
import metadata from './block.json';
import { isEqual } from 'lodash';
import { migrateToInnerblocks } from './utils';
/**
 * Internal block libraries
 */
import { __ } from '@wordpress/i18n';

import {
	BlockControls,
	BlockAlignmentToolbar,
	BlockVerticalAlignmentControl,
	JustifyContentControl,
	useInnerBlocksProps,
	useBlockProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import {
	useEffect,
	useState
} from '@wordpress/element';
import {
	plusCircle
} from '@wordpress/icons';
import {
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';

function BaseIcons( { attributes, className, setAttributes, isSelected, iconsBlock, insertIcon, insertIcons, clientId, context } ) {
	const { inQueryBlock, icons, blockAlignment, textAlignment, tabletTextAlignment, mobileTextAlignment, uniqueID, verticalAlignment, gap, gapUnit } = attributes;

	const [ activeTab, setActiveTab ] = useState( 'general' );

	const { removeBlock } = useDispatch( 'core/block-editor' );
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
		setBlockDefaults( 'base/icon', attributes);

		let uniqueId = getUniqueId( uniqueID, clientId, isUniqueID, isUniqueBlock );
		if ( uniqueId !== uniqueID ) {
			attributes.uniqueID = uniqueId;
			setAttributes( { uniqueID: uniqueId } );
			addUniqueID( uniqueId, clientId );
		} else {
			addUniqueID( uniqueID, clientId );
		}

		setAttributes( { inQueryBlock: getInQueryBlock( context, inQueryBlock ) } );
	}, [] );

	useEffect( () => {
		if ( uniqueID && ! iconsBlock.innerBlocks.length ) {
			if ( icons?.length && undefined !== metadata?.attributes?.icons?.default && !isEqual( metadata.attributes.icons.default, icons ) ) {
				const migrateUpdate = migrateToInnerblocks( attributes );
				setAttributes( migrateUpdate[0] );
				insertIcons( migrateUpdate[1] );
			} else {
				// Delete if no inner blocks.
				removeBlock( clientId, true );
			}
		}
	}, [ iconsBlock.innerBlocks.length ] );

	const blockProps = useBlockProps( {
		className: className,
		['data-align']: ( 'left' === blockAlignment || 'right' === blockAlignment || 'center' === blockAlignment ) ? blockAlignment : undefined
	} );
	const previewGap = getPreviewSize( previewDevice, ( undefined !== gap?.[0] ? gap[0] : '' ), ( undefined !== gap?.[1] ? gap[1] : '' ), ( undefined !== gap?.[2] ? gap[2] : '' ) );
	const previewVerticalAlignment = verticalAlignment && 'middle' === verticalAlignment ? 'center' : verticalAlignment;
	const previewTextAlign = getPreviewSize( previewDevice, ( textAlignment ? textAlignment : undefined ), ( undefined !== tabletTextAlignment && tabletTextAlignment ? tabletTextAlignment : undefined ), ( undefined !== mobileTextAlignment && mobileTextAlignment ? mobileTextAlignment : undefined ) );
	const innerClasses = classnames( {
		'bst-svg-icons': true,
		[ `bst-svg-icons-${ uniqueID }` ]: uniqueID,
		[ `bsb-icon-halign-${ previewTextAlign }` ]: previewTextAlign,
		[ `bsb-icon-valign-${ previewVerticalAlignment }` ]: previewVerticalAlignment,
	} );
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: innerClasses,
			style:{
				gap: ( '' !== previewGap ? getGapSizeOptionOutput( previewGap, ( gapUnit ? gapUnit : 'px' ) ) : undefined ),
			}
		},
		{
			allowedBlocks:  [ 'base/single-icon' ],
			orientation: 'horizontal',
			templateLock: false,
			template: [ [ 'base/single-icon' ] ],
			renderAppender: false,
			templateInsertUpdatesSelection: true
		}
	);
	return (
		<div {...blockProps}>
			<BlockControls>
				<BlockAlignmentToolbar
					value={blockAlignment}
					controls={[ 'left', 'right' ]}
					onChange={value => setAttributes( { blockAlignment: value } )}
				/>
				<ToolbarGroup>
					<JustifyContentControl
						value={ previewTextAlign }
						onChange={ value => {
							if ( previewDevice === 'Mobile' ) {
								setAttributes( { mobileTextAlignment: ( value ? value : '' ) } );
							} else if ( previewDevice === 'Tablet' ) {
								setAttributes( { tabletTextAlignment: ( value ? value : '' ) } );
							} else {
								setAttributes( {textAlignment: ( value ? value : 'center' ) } );
							}
						} }
					/>
					<BlockVerticalAlignmentControl
						value={previewVerticalAlignment || 'center' }
						onChange={value => setAttributes( { verticalAlignment: value } )}
					/>
				</ToolbarGroup>
				<ToolbarGroup>
					<ToolbarButton
						className="bsb-icons-add-icon"
						icon={ plusCircle }
						onClick={ () => {
							const prevAttributes = iconsBlock.innerBlocks[iconsBlock.innerBlocks.length - 1].attributes;
							const latestAttributes = JSON.parse(JSON.stringify(prevAttributes) );
							latestAttributes.uniqueID = '';
							const newBlock = createBlock( 'base/single-icon', latestAttributes );
							insertIcon( newBlock );
						} }
						label={  __( 'Add Another Icon', 'gutenam-blocks' ) }
						showTooltip={ true }
					/>
				</ToolbarGroup>
			</BlockControls>
			<BaseInspectorControls blockSlug={ 'base/icon' }>

				<InspectorControlTabs
					panelName={ 'icon' }
					allowedTabs={ [ 'general', 'advanced' ] }
					setActiveTab={ ( value ) => setActiveTab( value ) }
					activeTab={ activeTab }
				/>

				{( activeTab === 'general' ) &&
					<BasePanelBody panelName={'bsb-icon-alignment-settings'}>
						<ResponsiveAlignControls
							label={__( 'Icon Alignment', 'gutenam-blocks' )}
							value={( textAlignment ? textAlignment : 'center' )}
							mobileValue={( mobileTextAlignment ? mobileTextAlignment : '' )}
							tabletValue={( tabletTextAlignment ? tabletTextAlignment : '' )}
							onChange={( nextAlign ) => setAttributes( { textAlignment: ( nextAlign ? nextAlign : 'center' ) } )}
							onChangeTablet={( nextAlign ) => setAttributes( { tabletTextAlignment: ( nextAlign ? nextAlign : '' ) } )}
							onChangeMobile={( nextAlign ) => setAttributes( { mobileTextAlignment: ( nextAlign ? nextAlign : '' ) } )}
							type={ 'justify' }
						/>
						{ undefined !==iconsBlock?.innerBlocks?.length &&iconsBlock.innerBlocks.length > 1 && (
							<ResponsiveGapSizeControl
								label={__( 'Icons Gap', 'gutenam-blocks' )}
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

			</BaseInspectorControls>
			<div {...innerBlocksProps} />
		</div>
	);
}
const BaseIconsWrapper = withDispatch(
	( dispatch, ownProps, registry ) => ( {
		insertIcon( newBlock ) {
			const { clientId } = ownProps;
			const { insertBlock } = dispatch( blockEditorStore );
			const { getBlock } = registry.select( blockEditorStore );
			const block = getBlock( clientId );
			console.log( clientId );
			console.log( parseInt( block.innerBlocks.length ) );
			insertBlock( newBlock, ( undefined !== block?.innerBlocks?.length ? parseInt( block.innerBlocks.length ) : 0 ), clientId );
		},
		insertIcons( newBlocks ) {
			const { clientId } = ownProps;
			const { replaceInnerBlocks } = dispatch( blockEditorStore );

			replaceInnerBlocks( clientId, newBlocks );
		},
	} )
)( BaseIcons );
const BaseIconsEdit = ( props ) => {
	const { clientId } = props;
	const { iconsBlock } = useSelect(
		( select ) => {
			const {
				getBlock,
			} = select( 'core/block-editor' );
			const block = getBlock( clientId );
			return {
				iconsBlock: block,
			};
		},
		[ clientId ]
	);
	return <BaseIconsWrapper iconsBlock={ iconsBlock } { ...props } />;
};
export default BaseIconsEdit;

