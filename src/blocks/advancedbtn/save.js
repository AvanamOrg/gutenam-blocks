/**
 * BLOCK: Base Spacer
 */

import {
	useBlockProps,
	InnerBlocks
} from '@wordpress/block-editor';
/**
 * External dependencies
 */
import classnames from 'classnames';

function Save( { attributes } ) {
	const { uniqueID } = attributes;

	const classes = classnames( {
		[ `bsb-buttons-wrap` ]: true,
		[ `bsb-btns${ uniqueID }` ]: uniqueID,
	} );
	const blockProps = useBlockProps.save( {
		className: classes,
	} );
	return (
		<div {...blockProps}>
			<InnerBlocks.Content/>
		</div>
	);
}

export default Save;
