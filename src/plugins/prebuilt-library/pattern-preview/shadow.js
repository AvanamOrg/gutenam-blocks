/**
 * WordPress dependencies
 */
import { useResizeObserver } from '@wordpress/compose';
import {
	useState,
	useMemo,
} from '@wordpress/element';
import { Disabled, Spinner } from '@wordpress/components';
import root from 'react-shadow';

import LazyLoad from 'react-lazy-load';


const MAX_HEIGHT = 1600;

function ScaledPatternShadowPreview( {
	html,
	viewportWidth,
	containerWidth,
	minHeight = '200px',
	additionalStyles = [],
	title,
	ratio,
	neededCompatStyles = [],
	baseCompatStyles,
	shadowStyles,
	patternType = 'pattern',
} ) {
	if ( ! viewportWidth ) {
		viewportWidth = containerWidth;
	}
	const [ refreshHeight, setRefreshHeight ] = useState( false );
	const [ contentResizeListener, { height: contentHeight } ] = useResizeObserver();
	
	const styleAssets = (
		<>
			<link rel="stylesheet" id="base-blocks-iframe-base" href={ base_blocks_params.livePreviewStyles } media="all"></link>
			{ [ ...neededCompatStyles, ...baseCompatStyles ].map(
				( { tagName, href, id, rel, media, textContent } ) => {
					const TagName = tagName.toLowerCase();
					let finalTextContent = textContent.replace( / .block-editor-block-list__layout/g, '' );
					finalTextContent = finalTextContent.replace( /:root/g, '.pattern-shadow-wrap' );
					if ( TagName === 'style' ) {
						return (
							<TagName { ...{ id } } key={ id }>
								{ finalTextContent }
							</TagName>
						);
					}

					return (
						<TagName { ...{ href, id, rel, media } } key={ id } />
					);
				}
			) }
		</>
	);

	const shaddowAssets = (
		<>
			{ shadowStyles.map(
				( style, index ) => {
					if ( style?.css ) {
						let finalCSS = style.css.replace( / .block-editor-block-list__layout/g, '' );
						finalCSS = finalCSS.replace( /:root/g, '.pattern-shadow-wrap' );
						finalCSS = finalCSS.replace( /body/g, '.single-iframe-content' );
						return (
							<style key={ index }>{ finalCSS }</style>
						);
					}
				}
			) }
		</>
	);

	const scale = containerWidth / viewportWidth;
	const finalContentHeight = refreshHeight ? 'auto' : contentHeight;
	const resizeClear = () => {
		setTimeout( () => {
			setRefreshHeight( true );
		}, 100 );
		setTimeout( () => {
			setRefreshHeight( false );
		}, 500 );
	}
	return (
		<>
			<LazyLoad onContentVisible={() => {resizeClear()}}>
				<Disabled
					className="block-editor-block-preview__content"
					style={ {
						transform: `scale(${ scale })`,
						height: finalContentHeight * scale,
						maxHeight:
							finalContentHeight > MAX_HEIGHT ? MAX_HEIGHT * scale : undefined,
						// minHeight: contentHeight ? undefined : minHeight,
					} }
				>
					<root.div
					 	className={ `bsb-pattern-shadow-container${ contentHeight >= MAX_HEIGHT ? ' bsb-pattern-overflow' : '' }` }
						aria-hidden
						tabIndex={ -1 }
						style={ {
							position: 'absolute',
							width: viewportWidth,
							height: finalContentHeight,
							pointerEvents: 'none',
							// This is a catch-all max-height for patterns.
							// See: https://github.com/WordPress/gutenberg/pull/38175.
							maxHeight: MAX_HEIGHT,
							minHeight:
								scale !== 0 && scale < 1 && minHeight
									? minHeight / scale
									: minHeight,
						} }
					>
						{styleAssets}
						{shaddowAssets}
						<div part={'container'} className={ "editor-styles-wrapper pattern-shadow-wrap" }>{ contentResizeListener }<div className={ `single-iframe-content${ base_blocks_params.isBaseT ? ' single-content' : '' }`} dangerouslySetInnerHTML={ {__html: html } } /></div>
					</root.div>
				</Disabled>
			</LazyLoad>
			{ ! contentHeight && (
				<div className='bsb-preview-iframe-loader-ratio' style={ {paddingBottom: ratio ? ratio : undefined, minHeight: ratio ? undefined : minHeight,}}><div className='bsb-preview-iframe-loader'><Spinner /></div></div>
			) }
		</>
	);
}

export default function AutoHeightPatternPreview( props ) {
	const [ containerResizeListener, { width: containerWidth } ] = useResizeObserver();
	return (
		<>
			<div style={ { position: 'relative', width: '100%', height: 0 } }>
				{ containerResizeListener }
			</div>
			<div className="block-editor-block-preview__container">
				<ScaledPatternShadowPreview
					{ ...props }
					containerWidth={ containerWidth }
				/>
			</div>
		</>
	);
}
