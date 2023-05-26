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
import { IconSpanTag } from '@base/components';
/**
 * External dependencies
 */
import classnames from 'classnames';
import { times } from 'lodash';

function Save( { attributes, className } ) {
	const {  blockAlignment, uniqueID, verticalAlignment } = attributes;

	const classes = classnames( {
		'bst-svg-icons': true,
		[ `bst-svg-icons${ uniqueID }` ]: uniqueID,
		[ `align${ ( blockAlignment ? blockAlignment : 'none' ) }` ]: true,
		[ `bsb-icon-valign-${ verticalAlignment }` ]: verticalAlignment,
	} );

	const blockProps = useBlockProps.save( {
		className: classes,
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content/>
		</div>
	);
}

export default Save;
