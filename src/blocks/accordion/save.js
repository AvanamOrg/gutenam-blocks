/**
 * BLOCK: Base Accordion
 */
import classnames from 'classnames';

import {
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';

function BaseAccordionSave( { attributes } ) {

	const { uniqueID, paneCount, align, maxWidth, titleAlignment, startCollapsed, linkPaneCollapse, showIcon, iconStyle, iconSide, openPane } = attributes;
	const classes = classnames( `align${( align ? align : 'none' )}` );
	const innerClasses = classnames( `bst-accordion-wrap bst-accordion-id${uniqueID} bst-accordion-has-${paneCount}-panes bst-active-pane-${openPane} bst-accordion-block bst-pane-header-alignment-${ titleAlignment ? titleAlignment : 'left' } bst-accodion-icon-style-${( iconStyle && showIcon ? iconStyle : 'none' )} bst-accodion-icon-side-${( iconSide ? iconSide : 'right' )}` );

	const blockProps = useBlockProps.save( {
		className: classes,
	} );

	return (
		<div {...blockProps}>
			<div className={innerClasses} style={{
				maxWidth: ( maxWidth ? maxWidth + 'px' : 'none' ),
			}}>
				<div className="bst-accordion-inner-wrap" data-allow-multiple-open={( !linkPaneCollapse ? 'true' : 'false' )} data-start-open={( !startCollapsed ? openPane : 'none' )}>
					<InnerBlocks.Content/>
				</div>
			</div>
		</div>
	);

}

export default BaseAccordionSave;
