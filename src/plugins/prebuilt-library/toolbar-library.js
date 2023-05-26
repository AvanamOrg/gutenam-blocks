/**
 * WordPress dependencies
 */
 import { registerPlugin } from '@wordpress/plugins';
import {
	render,
} from '@wordpress/element';
import { useDispatch, useSelect, subscribe } from '@wordpress/data';
import { createBlock, isUnmodifiedDefaultBlock } from '@wordpress/blocks';
import {
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import {
	Button,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { SafeParseJSON, showSettings } from '@base/helpers';
import { baseBlocksIcon } from '@base/icons';
/**
 * Add Prebuilt Library button to Gutenberg toolbar
 */
function ToolbarLibrary() {
	const { getSelectedBlock, getBlockIndex, getBlockHierarchyRootClientId } = useSelect( blockEditorStore );
	const {
		replaceBlocks,
		insertBlocks,
	} = useDispatch( blockEditorStore );
	const LibraryButton = () => (
		<Button
			className="bsb-toolbar-prebuilt-button"
			icon={ baseBlocksIcon }
			isPrimary
			onClick={ () => {
				const selectedBlock = getSelectedBlock();
				if ( selectedBlock && isUnmodifiedDefaultBlock( selectedBlock ) ) {
					replaceBlocks(
						selectedBlock.clientId,
						createBlock( 'base/rowlayout', {
							isPrebuiltModal: true,
							noCustomDefaults: true,
						} ),
						null,
						0,
					);
				} else if ( selectedBlock ) {
					const destinationRootClientId = getBlockHierarchyRootClientId(selectedBlock.clientId);
					let destinationIndex = 0;
					if ( destinationRootClientId ) {
						destinationIndex = getBlockIndex( destinationRootClientId ) + 1;
					} else {
						destinationIndex = getBlockIndex( selectedBlock.clientId ) + 1;
					}
					insertBlocks(
						createBlock( 'base/rowlayout', {
							isPrebuiltModal: true,
							noCustomDefaults: true,
						} ),
						destinationIndex,
					);
				} else {
					insertBlocks(
						createBlock( 'base/rowlayout', {
							isPrebuiltModal: true,
							noCustomDefaults: true,
						} ),
					);
				}
			} }
		>
			{ __( 'Design Library', 'gutenam-blocks' ) }
		</Button>
	);
	const renderButton = ( selector ) => {
		const patternButton = document.createElement( 'div' );
		patternButton.classList.add( 'base-toolbar-design-library' );
		selector.appendChild( patternButton );
		render( <LibraryButton />, patternButton );
	}
	if ( showSettings( 'show', 'base/designlibrary' ) && base_blocks_params.showDesignLibrary ) {
		// Watch for the toolbar to be visible and the design library button to be missing.
		let unsubscribe = subscribe( () => {
			const editToolbar = document.querySelector( '.edit-post-header-toolbar' )
			if ( ! editToolbar ) {
				return
			}
			if ( ! editToolbar.querySelector( '.base-toolbar-design-library' ) ) {
				renderButton( editToolbar );
			}
		} );
		
	}

	return null;
}
registerPlugin( 'bsb-toolbar-library', {
    render: ToolbarLibrary,
} );
