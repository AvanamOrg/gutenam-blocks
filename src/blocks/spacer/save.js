/**
 * BLOCK: Base Spacer
 */

import { useBlockProps } from '@wordpress/block-editor';

/**
 * External dependencies
 */
import classnames from 'classnames';
import { BaseColorOutput } from '@base/helpers';
import SvgPattern from './svg-pattern';

function Save( { attributes } ) {
	const {
		className,
		blockAlignment,
		dividerEnable,
		dividerStyle,
		hAlign,
		dividerColor,
		dividerOpacity,
		uniqueID,
		rotate,
		strokeWidth,
		strokeGap,
		tabletHAlign,
		mobileHAlign,
		vsdesk,
		vstablet,
		vsmobile,
	} = attributes;

	const innerSpacerClasses = classnames( {
		'bst-block-spacer'                            : true,
		[ `bst-block-spacer-halign-${hAlign}` ]       : hAlign,
		[ `bst-block-spacer-thalign-${tabletHAlign}` ]: tabletHAlign,
		[ `bst-block-spacer-malign-${mobileHAlign}` ] : mobileHAlign,
	} );

	const blockProps = useBlockProps.save( {
		className: classnames( {
			[ `align${( blockAlignment ? blockAlignment : 'none' )}` ]: true,
			[ `bst-block-spacer-${uniqueID}` ]                         : uniqueID,
			'kvs-lg-false'                                            : vsdesk !== 'undefined' && vsdesk,
			'kvs-md-false'                                            : vstablet !== 'undefined' && vstablet,
			'kvs-sm-false'                                            : vsmobile !== 'undefined' && vsmobile,
		},
			className
		),
	} );

	return (
		<div {...blockProps}>
			<div className={innerSpacerClasses}>
				{dividerEnable && (
					<>
						{dividerStyle === 'stripe' && (
							<span className="bst-divider-stripe">
									<SvgPattern uniqueID={uniqueID} color={BaseColorOutput( dividerColor )} opacity={dividerOpacity} rotate={rotate} strokeWidth={strokeWidth}
												strokeGap={strokeGap}/>
								</span>
						)}
						{dividerStyle !== 'stripe' && (
							<hr className="bst-divider"/>
						)}
					</>
				)}
			</div>
		</div>
	);
}

export default Save;
