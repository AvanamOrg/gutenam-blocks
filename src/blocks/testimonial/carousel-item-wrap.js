/**
 * BLOCK Testimonial Item Wrap
 */
import { getPreviewSize, getGapSizeOptionOutput } from '@base/helpers';

import { SplideSlide } from '@splidejs/react-splide';
/**
 * Build the row edit
 */
export default function TestimonialItemWrap( props ) {
	const { attributes, setAttributes, clientId, parentBlock, parentBlockClientId, context, previewDevice } = props;
	const layout = context['base/testimonials-layout'];
	const columns = context['base/testimonials-columns'];
	const gap = context['base/testimonials-gap'];
	const gapUnit = context['base/testimonials-gap-unit'];
	const previewColumns = getPreviewSize( previewDevice, ( undefined !== columns?.[0] ? columns[0] : 3 ), ( undefined !== columns?.[3] ? columns[3] : '' ), ( undefined !== columns?.[5] ? columns[5] : '' ) );
	const previewGap = getPreviewSize( previewDevice, ( undefined !== gap?.[0] ? gap[0] : '' ), ( undefined !== gap?.[1] ? gap[1] : '' ), ( undefined !== gap?.[2] ? gap[2] : '' ) );
	const gapSize = getGapSizeOptionOutput( previewGap, ( gapUnit ? gapUnit : 'px' ) );
	if ( layout && layout !== 'carousel' ) {
		return props.children;
	}
	return (
		<SplideSlide
			style={ {
				marginRight: gapSize,
				width: 'calc(((100% + ' + gapSize + ') / ' + previewColumns + ') - ' + gapSize + ')',
			}}
		>
			{ props.children }
		</SplideSlide>
	);
}
