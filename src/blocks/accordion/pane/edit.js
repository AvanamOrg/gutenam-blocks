/**
 * BLOCK: Base Tab
 *
 * Registering a basic block with Gutenberg.
 */
import classnames from 'classnames';

import { BasePanelBody, BaseIconPicker, IconRender, SelectParentBlock } from '@base/components';
import { getUniqueId } from '@base/helpers';

import { __ } from '@wordpress/i18n';
import {
	ToggleControl,
	SelectControl,
	TextControl,
} from '@wordpress/components';
import {
	RichText,
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import {
	useEffect,
	useState,
} from '@wordpress/element';

/**
 * Build the Pane edit.
 */
function PaneEdit( {
	attributes,
	setAttributes,
	isSelected,
	clientId,
	className,
} ) {

	const { id, uniqueID, title, icon, iconSide, hideLabel, titleTag, ariaLabel } = attributes;
	const HtmlTagOut = ( ! titleTag ? 'div' : titleTag );
	const [ activePane, setActivePane ] = useState( false );
	const { addUniqueID, addUniquePane } = useDispatch( 'baseblocks/data' );
	const { isUniqueID, isUniqueBlock, isUniquePane, isUniquePaneBlock } = useSelect(
		( select ) => {
			return {
				isUniqueID: ( value ) => select( 'baseblocks/data' ).isUniqueID( value ),
				isUniqueBlock: ( value, clientId ) => select( 'baseblocks/data' ).isUniqueBlock( value, clientId ),
				isUniquePane: ( value, rootID ) => select( 'baseblocks/data' ).isUniquePane( value, rootID ),
				isUniquePaneBlock: ( value, clientId, rootID ) => select( 'baseblocks/data' ).isUniquePaneBlock( value, clientId, rootID ),
			};
		},
		[ clientId ]
	);
	const { accordionBlock, rootID } = useSelect(
		( select ) => {
			const { getBlockRootClientId, getBlocksByClientId } = select( blockEditorStore );
			const rootID = getBlockRootClientId( clientId );
			const accordionBlock = getBlocksByClientId( rootID );
			return {
				accordionBlock: ( undefined !== accordionBlock ? accordionBlock : '' ),
				rootID: ( undefined !== rootID ? rootID : '' ),
			};
		},
		[ clientId ]
	);
	const { hasInnerBlocks } = useSelect(
		( select ) => {
			const { getBlock } = select( blockEditorStore );
			const block = getBlock( clientId );
			return {
				hasInnerBlocks: !! ( block && block.innerBlocks.length ),
			};
		},
		[ clientId ]
	);
	const { updateBlockAttributes } = useDispatch( blockEditorStore );
	const updatePaneCount = ( value ) => {
		updateBlockAttributes( rootID, { paneCount: value } );
	}
	useEffect( () => {
		let uniqueId = getUniqueId( uniqueID, clientId, isUniqueID, isUniqueBlock );
		if ( uniqueId !== uniqueID ) {
			attributes.uniqueID = uniqueId;
			setAttributes( { uniqueID: uniqueId } );
			addUniqueID( uniqueId, clientId );
		} else {
			addUniqueID( uniqueId, clientId );
		}
		if ( ! id ) {
			const newPaneCount = accordionBlock[0].attributes.paneCount + 1;
			setAttributes( {
				id: newPaneCount,
			} );
			if ( ! isUniquePane( newPaneCount, rootID ) ) {
				addUniquePane( newPaneCount, clientId, rootID );
			}
			updatePaneCount( newPaneCount );
		} else if ( ! isUniquePane( id, rootID ) ) {
			// This checks if we are just switching views, client ID the same means we don't need to update.
			if ( ! isUniquePaneBlock( id, clientId, rootID ) ) {
				const newPaneCount = accordionBlock[0].attributes.paneCount + 1;
				setAttributes( {
					id: newPaneCount,
				} );
				addUniquePane( newPaneCount, clientId, rootID );
				updatePaneCount( newPaneCount );
			}
		} else {
			addUniquePane( id, clientId, rootID );
		}
		const isStartCollapsed = undefined !== accordionBlock?.[0]?.attributes?.startCollapsed && accordionBlock[0].attributes.startCollapsed;
		const isOpenPane = !isStartCollapsed && undefined !== accordionBlock?.[0]?.attributes?.openPane && ( accordionBlock[0].attributes.openPane + 1 === id )
		const isNewPane = !uniqueID;
		setActivePane( activePane ?? isNewPane ? true : isOpenPane );
	}, [] );
	const blockClasses = classnames( {
		'bst-accordion-pane'             : true,
		[ `bst-accordion-pane-${id}` ]   : id,
		[ `bst-pane${uniqueID}` ]        : uniqueID,
		[ `bst-accordion-panel-active` ] : activePane,
	} );
	const blockProps = useBlockProps( {
		className: blockClasses
	} );
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'bst-accordion-panel-inner',
		},
		{
			templateLock: false,
			renderAppender: hasInnerBlocks
				? undefined
				: InnerBlocks.ButtonBlockAppender,
		}
	);
	return (
		<div {...blockProps}>
			<InspectorControls>
				<SelectParentBlock
					clientId={ clientId }
				/>
				<BasePanelBody
					title={ __( 'Title Icon Settings', 'gutenam-blocks' ) }
					initialOpen={ false }
					panelName={ 'bsb-pane-title-icon' }
				>
					<BaseIconPicker
						value={ icon }
						onChange={ value => setAttributes( { icon: value } ) }
						allowClear={ true }
					/>
					<SelectControl
						label={ __( 'Icon Side', 'gutenam-blocks' ) }
						value={ iconSide }
						options={ [
							{ value: 'right', label: __( 'Right', 'gutenam-blocks' ) },
							{ value: 'left', label: __( 'Left', 'gutenam-blocks' ) },
						] }
						onChange={ value => setAttributes( { iconSide: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show only Icon', 'gutenam-blocks' ) }
						checked={ hideLabel }
						onChange={ value => setAttributes( { hideLabel: value } ) }
					/>
					<TextControl
						label={ __( 'Button Label Attribute for Accessibility', 'gutenam-blocks' ) }
						value={ ariaLabel }
						onChange={ value => setAttributes( { ariaLabel: value } ) }
					/>
				</BasePanelBody>
			</InspectorControls>
			<HtmlTagOut className={ `bst-accordion-header-wrap` } >
				<div 
					className={ `bst-blocks-accordion-header bst-acccordion-button-label-${ ( hideLabel ? 'hide' : 'show' ) }` }
					onClick={() => {
						setActivePane( !activePane );
					}} 
				>
					<div className="bst-blocks-accordion-title-wrap">
						{ icon && 'left' === iconSide && (
							<IconRender className={ `bst-btn-svg-icon bst-btn-svg-icon-${ icon } bst-btn-side-${ iconSide }` } name={ icon } />
						) }
						<RichText
							className="bst-blocks-accordion-title"
							tagName={ 'div' }
							placeholder={ __( 'Add Title', 'gutenam-blocks' ) }
							onChange={ value => setAttributes( { title: value } ) }
							value={ title }
							keepPlaceholderOnFocus
							onClick={(e) => {
								e.stopPropagation();
							}}
						/>
						{ icon && 'right' === iconSide && (
							<IconRender className={ `bst-btn-svg-icon bst-btn-svg-icon-${ icon } bst-btn-side-${ iconSide }` } name={ icon } />
						) }
					</div>
					<div className="bst-blocks-accordion-icon-trigger"></div>
				</div>
			</HtmlTagOut>
			<div className={ 'bst-accordion-panel' } >
				<div {...innerBlocksProps} >
				</div>
			</div>
		</div>
	);
}
export default ( PaneEdit );
