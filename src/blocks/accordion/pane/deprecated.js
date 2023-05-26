/**
 * BLOCK: Base Testimonial
 */

/**
 * Import Icons
 */
import { IconRender } from '@base/components';

import attributes from './attributes';

/**
 * Internal block libraries
 */
import {
	RichText,
	InnerBlocks,
} from '@wordpress/block-editor';

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
		attributes,
		save: ( { attributes } ) => {
			const { id, uniqueID, title, icon, iconSide, hideLabel, titleTag, ariaLabel } = attributes;
			const HtmlTagOut = ( ! titleTag ? 'div' : titleTag );

			return (
				<div className={ `bst-accordion-pane bst-accordion-pane-${ id } bst-pane${ uniqueID }` }>
					<HtmlTagOut className={ 'bst-accordion-header-wrap' } >
						<button className={ `bst-blocks-accordion-header bst-acccordion-button-label-${ ( hideLabel ? 'hide' : 'show' ) }` } aria-label={ ariaLabel ? ariaLabel : undefined }>
						<span className="bst-blocks-accordion-title-wrap">
							{ icon && 'left' === iconSide && (
								<IconRender className={ `bst-btn-svg-icon bst-btn-svg-icon-${ icon } bst-btn-side-${ iconSide }` } name={ icon } />
							) }
							<RichText.Content
								className={ 'bst-blocks-accordion-title' }
								tagName={ 'span' }
								value={ title }
							/>
							{ icon && 'right' === iconSide && (
								<IconRender className={ `bst-btn-svg-icon bst-btn-svg-icon-${ icon } bst-btn-side-${ iconSide }` } name={ icon } />
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
	},
	{
		attributes,
		save: ( { attributes } ) => {
			const { id, uniqueID, title, icon, iconSide, hideLabel, titleTag } = attributes;
			const HtmlTagOut = ( ! titleTag ? 'div' : titleTag );
			return (
				<div className={ `bst-accordion-pane bst-accordion-pane-${ id } bst-pane${ uniqueID }` }>
					<HtmlTagOut className={ 'bst-accordion-header-wrap' } >
						<button className={ `bst-blocks-accordion-header bst-acccordion-button-label-${ ( hideLabel ? 'hide' : 'show' ) }` }>
							<div className="bst-blocks-accordion-title-wrap">
								{ icon && 'left' === iconSide && (
									<IconRender className={ `bst-btn-svg-icon bst-btn-svg-icon-${ icon } bst-btn-side-${ iconSide }` } name={ icon } />
								) }
								<RichText.Content
									className={ 'bst-blocks-accordion-title' }
									tagName={ 'span' }
									value={ title }
								/>
								{ icon && 'right' === iconSide && (
									<IconRender className={ `bst-btn-svg-icon bst-btn-svg-icon-${ icon } bst-btn-side-${ iconSide }` } name={ icon } />
								) }
							</div>
							<div className="bst-blocks-accordion-icon-trigger"></div>
						</button>
					</HtmlTagOut>
					<div className={ 'bst-accordion-panel' } >
						<div className={ 'bst-accordion-panel-inner' } >
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			);
		}
	}
];
