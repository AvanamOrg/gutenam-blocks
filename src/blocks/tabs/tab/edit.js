/**
 * BLOCK: Base Tab
 *
 * Registering a basic block with Gutenberg.
 */
import { useEffect } from '@wordpress/element';

import {
	InnerBlocks,
	useBlockProps
} from '@wordpress/block-editor';

/**
 * This allows for checking to see if the block needs to generate a new ID.
 */
const bttabUniqueIDs = [];

/**
 * Build the spacer edit
 */
function BaseTab( { attributes, setAttributes, clientId } ) {

	const { id, uniqueID } = attributes;

	useEffect( () => {
		if ( !uniqueID ) {
			setAttributes( {
				uniqueID: '_' + clientId.substr( 2, 9 ),
			} );
			bttabUniqueIDs.push( '_' + clientId.substr( 2, 9 ) );
		} else if ( bttabUniqueIDs.includes( uniqueID ) ) {
			if( uniqueID !== '_' + clientId.substr( 2, 9 ) ) {
				setAttributes({uniqueID: '_' + clientId.substr(2, 9)});
				bttabUniqueIDs.push('_' + clientId.substr(2, 9));
			}
		} else {
			bttabUniqueIDs.push( uniqueID );
		}
	}, [] );

	const hasChildBlocks = wp.data.select( 'core/block-editor' ).getBlockOrder( clientId ).length > 0;

	const blockProps = useBlockProps( {
		className: `bst-tab-inner-content bst-inner-tab-${id} bst-inner-tab${uniqueID}`
	} );

	return (
		<div {...blockProps} data-tab={id}>
			<InnerBlocks
				templateLock={false}
				renderAppender={(
					hasChildBlocks ?
						undefined :
						() => <InnerBlocks.ButtonBlockAppender/>
				)}/>
		</div>
	);
}

export default ( BaseTab );
