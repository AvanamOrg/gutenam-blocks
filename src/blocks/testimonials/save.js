/**
 * BLOCK: Base Testimonials
 */

import { BaseColorOutput } from '@base/helpers';
import {
	RichText,
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
import { times } from 'lodash';
import classnames from 'classnames';

function Save( { attributes } ) {
	// const {
	// 	uniqueID,
	// 	style,
	// 	hAlign,
	// 	layout,
	// 	itemsCount,
	// 	containerBackground,
	// 	containerBorder,
	// 	containerBorderWidth,
	// 	containerBorderRadius,
	// 	containerPadding,
	// 	mediaStyles,
	// 	displayTitle,
	// 	titleFont,
	// 	displayContent,
	// 	displayName,
	// 	displayMedia,
	// 	displayShadow,
	// 	shadow,
	// 	displayRating,
	// 	ratingStyles,
	// 	displayOccupation,
	// 	containerBackgroundOpacity,
	// 	containerBorderOpacity,
	// 	containerMaxWidth,
	// 	columnGap,
	// 	autoPlay,
	// 	autoSpeed,
	// 	transSpeed,
	// 	slidesScroll,
	// 	arrowStyle,
	// 	dotStyle,
	// 	columns,
	// 	displayIcon,
	// 	iconStyles,
	// 	containerVAlign,
	// 	containerPaddingType,
	// } = attributes;


	// const blockProps = useBlockProps.save( {
	// 	className: classnames( {
	// 		[ `wp-block-base-testimonials` ]                                                                       : true,
	// 		[ `bst-testimonial-halign-${hAlign}` ]                                                                     : true,
	// 		[ `bst-testimonial-style-${style}` ]                                                                       : true,
	// 		[ `bst-testimonials-media-${( displayMedia ? 'on' : 'off' )}` ]                                            : true,
	// 		[ `bst-testimonials-icon-${( displayIcon ? 'on' : 'off' )}` ]                                              : true,
	// 		[ `bst-testimonial-columns-${columns[ 0 ]}` ]                                                              : true,
	// 		[ `bst-t-xxl-col-${columns[ 0 ]}` ]                                                                        : true,
	// 		[ `bst-t-xl-col-${columns[ 1 ]}` ]                                                                         : true,
	// 		[ `bst-t-lg-col-${columns[ 2 ]}` ]                                                                         : true,
	// 		[ `bst-t-md-col-${columns[ 3 ]}` ]                                                                         : true,
	// 		[ `bst-t-sm-col-${columns[ 4 ]}` ]                                                                         : true,
	// 		[ `bst-t-xs-col-${columns[ 5 ]}` ]                                                                         : true,
	// 		[ `bst-blocks-testimonials-wrap${uniqueID}` ]: true,
	// 	} )
	// } );

	// return (
	// 	<div {...blockProps}>
	// 		{layout && layout === 'carousel' && (
	// 			<div className={`bst-blocks-carousel bst-carousel-container-dotstyle-${dotStyle} bst-carousel-container-arrowstyle-${arrowStyle}`}>
	// 				<div className={`bst-blocks-carousel-init bst-carousel-arrowstyle-${arrowStyle} bst-carousel-dotstyle-${dotStyle}`} data-columns-xxl={columns[ 0 ]} data-columns-xl={columns[ 1 ]}
	// 					 data-columns-md={columns[ 2 ]} data-columns-sm={columns[ 3 ]} data-columns-xs={columns[ 4 ]} data-columns-ss={columns[ 5 ]} data-slider-anim-speed={transSpeed}
	// 					 data-slider-scroll={slidesScroll} data-slider-arrows={( 'none' === arrowStyle ? false : true )} data-slider-dots={( 'none' === dotStyle ? false : true )}
	// 					 data-slider-hover-pause="false" data-slider-auto={autoPlay} data-slider-speed={autoSpeed}>
	// 					<InnerBlocks.Content/>
	// 				</div>
	// 			</div>
	// 		)}
	// 		{layout && layout !== 'carousel' && (
	// 			<div className={'bst-testimonial-grid-wrap'} style={{
	// 				'grid-row-gap'   : columnGap + 'px',
	// 				'grid-column-gap': columnGap + 'px',
	// 			}}>
	// 				<InnerBlocks.Content/>
	// 			</div>
	// 		)}
	// 	</div>
	// );
	return <InnerBlocks.Content />;

}

export default Save;
