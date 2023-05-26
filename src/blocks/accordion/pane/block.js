
/**
 * BLOCK: Base Pane
 *
 * Registering a basic block with Gutenberg.
 */

import {
	RichText,
	InnerBlocks,
	useBlockProps
} from '@wordpress/block-editor';

/**
 * Import Icons
 */
import { accordionBlockIcon } from '@base/icons';
import { IconSpanTag } from '@base/components';

/**
 * Import edit
 */
import edit from './edit';
import metadata from './block.json';

/**
 * Import deprecated.
 */
import deprecated from './deprecated';


/**
 * Internal block libraries
 */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Register: a Gutenberg Block.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'base/pane', {
	...metadata,
	title: __( 'Pane', 'gutenam-blocks' ),
	icon: accordionBlockIcon,
	getEditWrapperProps( attributes ) {
		return { 'data-pane': attributes.id };
	},
	edit,
	save( { attributes } ) {
		const { id, uniqueID, title, icon, iconSide, hideLabel, titleTag, ariaLabel } = attributes;
		const HtmlTagOut = ( ! titleTag ? 'div' : titleTag );

		const blockProps = useBlockProps.save( {
			className: `bst-accordion-pane bst-accordion-pane-${ id } bst-pane${ uniqueID }`
		} );

		return (
			<div {...blockProps}>
				<HtmlTagOut className={ 'bst-accordion-header-wrap' } >
					<button className={ `bst-blocks-accordion-header bst-acccordion-button-label-${ ( hideLabel ? 'hide' : 'show' ) }` } aria-label={ ariaLabel ? ariaLabel : undefined }>
						<span className="bst-blocks-accordion-title-wrap">
							{ icon && 'left' === iconSide && (
								<IconSpanTag
									extraClass={ `bst-btn-side-${ iconSide }` }
									name={ icon }
								/>
							) }
							<RichText.Content
								className={ 'bst-blocks-accordion-title' }
								tagName={ 'span' }
								value={ title }
							/>
							{ icon && 'right' === iconSide && (
								<IconSpanTag
									extraClass={ `bst-btn-side-${ iconSide }` }
									name={ icon }
								/>
							) }
						</span>
						<span className="bst-blocks-accordion-icon-trigger"></span>
					</button>
				</HtmlTagOut>
				<div className={ 'bst-accordion-panel' } >
					<div className={ 'bst-accordion-panel-inner' } >
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
	},
	deprecated,
	example: {}
} );
