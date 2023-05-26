/**
 * BLOCK: Base Show More Block
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * External dependencies
 */
import classnames from 'classnames';

function Save( { attributes, innerBlocks } ) {
	const { uniqueID } = attributes;
	const classes = classnames( {
		'bsb-block-show-more-container': true,
		[ `bsb-block-show-more-container${ uniqueID }` ] : true
	} );

	return (
		<div { ...useBlockProps.save( { className: classes }) }>
			<InnerBlocks.Content />
		</div>
	);
}
export default Save;
