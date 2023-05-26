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
import { BaseColorOutput } from '@base/helpers';
import { times } from 'lodash';

function Save( { attributes } ) {
	const { items, listCount, columns, blockAlignment, iconAlign, uniqueID, tabletColumns, mobileColumns } = attributes;

	const blockProps = useBlockProps.save( {
		className: `wp-block-base-iconlist bst-svg-icon-list-items bst-svg-icon-list-items${ uniqueID } bst-svg-icon-list-columns-${ columns } align${ ( blockAlignment ? blockAlignment : 'none' ) }${ ( undefined !== iconAlign && 'middle' !== iconAlign ? ' bst-list-icon-align' + iconAlign : '' ) }${ ( undefined !== tabletColumns && '' !== tabletColumns ? ' bst-tablet-svg-icon-list-columns-' + tabletColumns : '' ) }${ ( undefined !== mobileColumns && '' !== mobileColumns ? ' bst-mobile-svg-icon-list-columns-' + mobileColumns : '' ) }`
	} );

	return (
		<div {...blockProps}>
			<ul className="bst-svg-icon-list">
				<InnerBlocks.Content/>
			</ul>
		</div>
	);
}

export default Save;
