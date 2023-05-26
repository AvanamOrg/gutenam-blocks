/**
 * BLOCK: Base Count-Up
 */

/**
 * Import External
 */
import classnames from 'classnames';

/**
 * Internal block libraries
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';

/**
 * Build the count up save
 */
function BaseCounterUpSave( { attributes } ) {
	const {
		uniqueID,
		title,
		start,
		end,
		startDecimal,
		endDecimal,
		prefix,
		suffix,
		duration,
		separator,
		titleFont,
		displayTitle,
		decimal,
		decimalSpaces,
	} = attributes;
	const classes = classnames( {
		[ `bsb-count-up-${uniqueID}` ]: uniqueID,
		'bsb-count-up'                : true,
	} );
	const tagName = titleFont[ 0 ].htmlTag && titleFont[ 0 ].htmlTag !== 'heading' ? titleFont[ 0 ].htmlTag : 'h' + titleFont[ 0 ].level;
	// Temp beta reversal fix.
	let endingNumber = end;
	if ( end === 0 && endDecimal ) {
		endingNumber = endDecimal;
	}
	const blockProps = useBlockProps.save( {
		className: classes
	} );
	return (
		<div
			{...blockProps}
			data-start={start}
			data-end={endingNumber}
			data-prefix={prefix}
			data-suffix={suffix}
			data-duration={duration}
			data-separator={separator}
			data-decimal={decimal ? decimal : undefined}
			data-decimal-spaces={decimal ? decimalSpaces : undefined}
		>
			<div className={'bsb-count-up-process bsb-count-up-number'}/>
			{title && displayTitle && (
				<RichText.Content
					tagName={tagName}
					className={'bsb-count-up-title'}
					value={title}
				/>
			)}
		</div>
	);

}

export default BaseCounterUpSave;
