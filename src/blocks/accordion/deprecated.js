/**
 * BLOCK: Base Accordion
 */

/**
 * Import Icons
 */
 import classnames from 'classnames';

 import {
	 InnerBlocks,
	 useBlockProps,
 } from '@wordpress/block-editor';

/**
 * Import block.json
 */
import metadata from './block.json';

/**
 * Register: a Gutenberg Block.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
 export default [
	{
		attributes: metadata.attributes,
		migrate( attributes ) {
			const newAlign = ( attributes.blockAlignment ? attributes.blockAlignment : undefined );
			if ( attributes.blockAlignment ) {
				delete attributes.blockAlignment;
			}
			return {
				...attributes,
				align: newAlign ? newAlign : undefined,
			};
		},
		save: ( { attributes } ) => {
			const { uniqueID, paneCount, blockAlignment, maxWidth, titleAlignment, startCollapsed, linkPaneCollapse, showIcon, iconStyle, iconSide, openPane } = attributes;
			const classes = classnames( `align${( blockAlignment ? blockAlignment : 'none' )}` );
			const innerClasses = classnames( `bst-accordion-wrap bst-accordion-wrap bst-accordion-id${uniqueID} bst-accordion-has-${paneCount}-panes bst-active-pane-${openPane} bst-accordion-block bst-pane-header-alignment-${titleAlignment} bst-accodion-icon-style-${( iconStyle && showIcon ? iconStyle : 'none' )} bst-accodion-icon-side-${( iconSide ? iconSide : 'right' )}` );

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
	}
];
