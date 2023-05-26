/**
 * BLOCK: Base Tab
 *
 * Registering a basic block with Gutenberg.
 */

import {
	InnerBlocks,
	useBlockProps
} from '@wordpress/block-editor';

import {
	useEffect,
} from '@wordpress/element';

import { 
	useSelect, 
	useDispatch 
} from '@wordpress/data';

import {
	getUniqueId,
} from '@base/helpers';

/**
 * Build the spacer edit
 */

function BaseCountdownInner ( { attributes, clientId, setAttributes } ) {

	const {
		location,
		uniqueID,
	} = attributes;

	const { addUniqueID } = useDispatch( 'baseblocks/data' );
	const { isUniqueID, isUniqueBlock } = useSelect(
		( select ) => {
			return {
				isUniqueID: ( value ) => select( 'baseblocks/data' ).isUniqueID( value ),
				isUniqueBlock: ( value, clientId ) => select( 'baseblocks/data' ).isUniqueBlock( value, clientId ),
			};
		},
		[ clientId ]
	);

	useEffect( () => {
		let uniqueId = getUniqueId( uniqueID, clientId, isUniqueID, isUniqueBlock );
		if ( uniqueId !== uniqueID ) {
			attributes.uniqueID = uniqueId;
			setAttributes( { uniqueID: uniqueId } );
			addUniqueID( uniqueId, clientId );
		} else {
			addUniqueID( uniqueID, clientId );
		}
	}, [] );

	const hasChildBlocks = wp.data.select( 'core/block-editor' ).getBlockOrder( clientId ).length > 0;

	const blockProps = useBlockProps( {
		className: `bsb-countdown-inner bsb-countdown-inner-${ location } bsb-countdown-inner-${ uniqueID }`,
	} );

	return (
		<div {...blockProps}>
			<InnerBlocks
				templateLock={ false }
				renderAppender={ (
					hasChildBlocks ?
						undefined :
						() => <InnerBlocks.ButtonBlockAppender />
				) }
				/>
		</div>
	);
}
export default ( BaseCountdownInner );
