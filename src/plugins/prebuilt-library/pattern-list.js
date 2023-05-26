/**
 * WordPress dependencies
 */

import {
	withSelect,
	withDispatch,
} from '@wordpress/data';
import { parse } from '@wordpress/blocks';
import {
	Button,
	TextControl,
	SelectControl,
	VisuallyHidden,
	ExternalLink,
	Spinner,
	Tooltip,
	__experimentalHeading as Heading,
} from '@wordpress/components';
import {
	arrowLeft,
	download,
	previous,
	update,
	next,
	chevronLeft,
	chevronDown,
} from '@wordpress/icons';
import { useMemo, useEffect, useState } from '@wordpress/element';
import { __, _n, sprintf } from '@wordpress/i18n';
import { useDebounce } from '@wordpress/compose';
import { speak } from '@wordpress/a11y';
import { searchItems } from './search-items';
import replaceColors from './block-preview/replace-colors';
import replaceImages from './block-preview/replace-images';
import replaceContent from './block-preview/replace-content';
import deleteContent from './block-preview/remove-content';
import BaseBlockPatternList from './block-pattern-list';

function PatternsListHeader( { filterValue, filteredBlockPatternsLength } ) {
	if ( ! filterValue ) {
		return null;
	}
	return (
		<Heading
			level={ 2 }
			lineHeight={ '48px' }
			className="block-editor-block-patterns-explorer__search-results-count"
		>
			{ sprintf(
				/* translators: %d: number of patterns. %s: block pattern search query */
				_n(
					'%1$d pattern found for "%2$s"',
					'%1$d patterns found for "%2$s"',
					filteredBlockPatternsLength
				),
				filteredBlockPatternsLength,
				filterValue
			) }
		</Heading>
	);
}
function BannerHeader( { selectedCategory } ) {
	if ( ! selectedCategory ) {
		return null;
	}
	const productLabel = ! base_blocks_params.hasWoocommerce ? __( 'Add WooCommerce and create some products.', 'base Blocks' ) :  __( 'Add some products here.', 'base Blocks' )
	return (
		<Heading
			level={ 2 }
			lineHeight={ '48px' }
			className="bsb-patterns-banner-notice"
		>
			{ ( selectedCategory == 'featured-products' || selectedCategory == 'product-loop' ) && (
				<>
					{ __( 'These patterns require you to have some products.', 'base Blocks' ) } <ExternalLink href={ ( base_blocks_params.addProductsLink ? base_blocks_params.addProductsLink : '#' ) }>{productLabel}</ExternalLink>
				</>
			) }
			{ selectedCategory == 'post-loop' && (
				<>
					{ __( 'These patterns require you to have some posts.', 'base Blocks' ) } <ExternalLink href={ ( base_blocks_params.addPostsLink ? base_blocks_params.addPostsLink : '#' ) }>{__( 'Add some posts here.', 'base Blocks' )}</ExternalLink>
				</>
			) }

		</Heading>
	);
}


function PatternList( { patterns, filterValue, selectedCategory, patternCategories, selectedStyle = 'light', breakpointCols, onSelect, previewMode = 'iframe', selectedFontSize, savedAI = false } ) {
	const debouncedSpeak = useDebounce( speak, 500 );
	const onSelectBlockPattern = ( info ) => {
		const patternSend = {
			id: info.id,
			slug:info.slug,
			type: 'pattern',
			style: selectedStyle ? selectedStyle : 'light',
		}
		let newInfo = info.content;
		newInfo = deleteContent( newInfo );
		if ( ! selectedStyle || 'light' === selectedStyle ) {
			// Perhaps do something later.
		} else if ( 'dark' === selectedStyle ) {
			newInfo = replaceColors( newInfo, 'dark' );
		} else if ( 'highlight' === selectedStyle ) {
			newInfo = replaceColors( newInfo, 'highlight' );
		}
		patternSend.content = newInfo;
		onSelect( patternSend );
	}
	const filteredBlockPatterns = useMemo( () => {
		let allPatterns = [];
		let variation = 1;
		Object.keys( patterns ).map( function( key, index ) {
			const temp = [];
			if ( variation === 4 ) {
				variation = 1;
			}
			temp['title'] = patterns[key].name;
			temp['name'] = patterns[key].name;
			temp['image'] = patterns[key].image;
			temp['imageWidth'] = patterns[key].imageW;
			temp['imageHeight'] = patterns[key].imageH;
			temp['id'] = patterns[key].id;
			temp['slug'] = patterns[key].slug;
			let tempContent = patterns[key].content;
			temp['categories'] = patterns[key].categories ? Object.keys( patterns[key].categories ) : [];
			temp['keywords'] = patterns[key].keywords ? patterns[key].keywords : [];
			// if ( savedAI ) {
			// 	tempContent = replaceImages( tempContent, images, temp['categories'], 'general', variation );
			// 	tempContent = replaceContent( tempContent, aiContent, temp['categories'], 'general', variation );
			// }
			temp['content'] = tempContent;
			if ( patterns[key]?.html) {
				temp['html'] = patterns[key].html;
			}
			temp['pro'] = patterns[key].pro;
			temp['locked'] = ( patterns[key].pro && 'true' !== base_blocks_params.pro ? true : false );
			// temp['proRender'] = ( temp['keywords'].includes('Requires Pro') && 'true' !== base_blocks_params.pro ? true : false );
			temp['proRender'] = false;
			temp['viewportWidth'] = 1200;
			variation ++;
			allPatterns.push( temp );
		});
		if ( ! filterValue && selectedCategory && 'all' !== selectedCategory ) {
			allPatterns = allPatterns.filter( ( pattern ) =>
				pattern.categories?.includes( selectedCategory )
			);
		}
		return searchItems( allPatterns, filterValue );
	}, [ filterValue, selectedCategory, patterns ] );
	const hasHTml = useMemo( () => {
		return ( patterns[Object.keys( patterns )[0]]?.html ? true : false );
	}, [ patterns ] );

	// Announce search results on change.
	useEffect( () => {
		if ( ! filterValue ) {
			return;
		}
		const count = filteredBlockPatterns.length;
		const resultsFoundMessage = sprintf(
			/* translators: %d: number of results. */
			_n( '%d result found.', '%d results found.', count ),
			count
		);
		debouncedSpeak( resultsFoundMessage );
	}, [ filterValue, debouncedSpeak ] );

	// Define selected style.
	const customStyles = useMemo( () => {
		let tempStyles = '';
		if ( ! selectedStyle || 'light' === selectedStyle ) {
			tempStyles = tempStyles.concat( `body {--global-content-edge-padding: 3rem;padding:0px !important;}.block-editor-block-list__layout.is-root-container>.wp-block[data-align=full] {margin-left: 0 !important;margin-right: 0 !important;}` );
		}
		if ( 'dark' === selectedStyle ) {
			tempStyles = tempStyles.concat( `body {--global-palette1:${base_blocks_params.global_colors['--global-palette1']};
			--global-palette2:${base_blocks_params.global_colors['--global-palette2']};
			--global-palette3:${base_blocks_params.global_colors['--global-palette9']};
			--global-palette4:${base_blocks_params.global_colors['--global-palette8']};
			--global-palette5:${base_blocks_params.global_colors['--global-palette7']};
			--global-palette6:${base_blocks_params.global_colors['--global-palette7']};
			--global-palette7:${base_blocks_params.global_colors['--global-palette3']};
			--global-palette8:${base_blocks_params.global_colors['--global-palette3']};
			--global-palette9:${base_blocks_params.global_colors['--global-palette4']};
			--global-content-edge-padding: 3rem;
			padding:0px !important;}.bsb-btns-outer-wrap {--global-palette9:${base_blocks_params.global_colors['--global-palette9']}} .bsb-btn-custom-colors .bsb-btns-outer-wrap {--global-palette9:${base_blocks_params.global_colors['--global-palette3']}} img[src^="https://patterns.baseblocks.com/wp-content/uploads/2023/02/Logo-ploaceholder"] {filter: invert(1);}.wp-block-base-tabs.bsb-pattern-active-tab-highlight .bst-tabs-title-list li.bst-tab-title-active .bst-tab-title{ color:${base_blocks_params.global_colors['--global-palette9']} !important} .bsb-pattern-light-color{--global-palette9:${base_blocks_params.global_colors['--global-palette9']}}.block-editor-block-list__layout.is-root-container>.wp-block[data-align=full] {margin-left: 0 !important;margin-right: 0 !important;}` );
		} else if ( 'highlight' === selectedStyle ) {
			tempStyles = tempStyles.concat( `body {--global-palette1:${base_blocks_params.global_colors['--global-palette9']};
			--global-palette2:${base_blocks_params.global_colors['--global-palette8']};
			--global-palette3:${base_blocks_params.global_colors['--global-palette9']};
			--global-palette4:${base_blocks_params.global_colors['--global-palette9']};
			--global-palette5:${base_blocks_params.global_colors['--global-palette8']};
			--global-palette6:${base_blocks_params.global_colors['--global-palette7']};
			--global-palette7:${base_blocks_params.global_colors['--global-palette2']};
			--global-palette8:${base_blocks_params.global_colors['--global-palette2']};
			--global-palette9:${base_blocks_params.global_colors['--global-palette1']};
			--global-content-edge-padding: 3rem;
			padding:0px !important; }.bsb-submit-field .bsb-forms-submit, .bsb-btns-outer-wrap .wp-block-button__link {color:${base_blocks_params.global_colors['--global-palette9']};background:${base_blocks_params.global_colors['--global-palette3']};} .bsb-btns-outer-wrap .bsb-button.bsb-btn-global-outline {color:${base_blocks_params.global_colors['--global-palette9']};border-color:${base_blocks_params.global_colors['--global-palette3']};} .bsb-btn-custom-colors .bsb-btns-outer-wrap {--global-palette9:${base_blocks_params.global_colors['--global-palette1']}} img[src^="https://patterns.baseblocks.com/wp-content/uploads/2023/02/Logo-ploaceholder"] {filter: invert(1);}.block-editor-block-list__layout.is-root-container>.wp-block[data-align=full] {margin-left: 0 !important;margin-right: 0 !important;}` );
		}
		if ( 'sm' === selectedFontSize ) {
			tempStyles = tempStyles.concat( `.block-editor-block-list__layout.is-root-container {--global-bsb-font-size-xxxl:${base_blocks_params.font_sizes['xxl']};
			--global-bsb-font-size-xxl:${base_blocks_params.font_sizes['xl']};
			--global-bsb-font-size-xl:${base_blocks_params.font_sizes['lg']};
			--global-bsb-font-size-lg:${base_blocks_params.font_sizes['md']}; }` );
		}
		const newStyles = [
			{ css: tempStyles }
		];
		return newStyles;
	}, [ selectedStyle, selectedFontSize ] );
	const customShadowStyles = useMemo( () => {
		let tempStyles = '.pattern-shadow-wrap .single-iframe-content {--global-content-width:1200px }';
		if ( ! selectedStyle || 'light' === selectedStyle ) {
			tempStyles = tempStyles.concat( `.single-iframe-content {--global-content-edge-padding: 3rem;padding:0px !important;}` );
		}
		if ( ! base_blocks_params.isBaseT ) {
			const colorClasses = `.single-iframe-content .has-theme-palette-1-color { color: var(--global-palette1); }
			.single-iframe-content .has-theme-palette-2-color { color: var(--global-palette2); }
			.single-iframe-content .has-theme-palette-3-color { color: var(--global-palette3); }
			.single-iframe-content .has-theme-palette-4-color { color: var(--global-palette4); }
			.single-iframe-content .has-theme-palette-5-color { color: var(--global-palette5); }
			.single-iframe-content .has-theme-palette-6-color { color: var(--global-palette6); }
			.single-iframe-content .has-theme-palette-7-color { color: var(--global-palette7); }
			.single-iframe-content .has-theme-palette-8-color { color: var(--global-palette8); }
			.single-iframe-content .has-theme-palette-9-color { color: var(--global-palette9); }
			.single-iframe-content .has-theme-palette1-color { color: var(--global-palette1); }
			.single-iframe-content .has-theme-palette2-color { color: var(--global-palette2); }
			.single-iframe-content .has-theme-palette3-color { color: var(--global-palette3); }
			.single-iframe-content .has-theme-palette4-color { color: var(--global-palette4); }
			.single-iframe-content .has-theme-palette5-color { color: var(--global-palette5); }
			.single-iframe-content .has-theme-palette6-color { color: var(--global-palette6); }
			.single-iframe-content .has-theme-palette7-color { color: var(--global-palette7); }
			.single-iframe-content .has-theme-palette8-color { color: var(--global-palette8); }
			.single-iframe-content .has-theme-palette9-color { color: var(--global-palette9); }
			.single-iframe-content .has-theme-palette1-background-color { background-color: var(--global-palette1); }
			.single-iframe-content .has-theme-palette2-background-color { background-color: var(--global-palette2); }
			.single-iframe-content .has-theme-palette3-background-color { background-color: var(--global-palette3); }
			.single-iframe-content .has-theme-palette4-background-color { background-color: var(--global-palette4); }
			.single-iframe-content .has-theme-palette5-background-color { background-color: var(--global-palette5); }
			.single-iframe-content .has-theme-palette6-background-color { background-color: var(--global-palette6); }
			.single-iframe-content .has-theme-palette7-background-color { background-color: var(--global-palette7); }
			.single-iframe-content .has-theme-palette8-background-color { background-color: var(--global-palette8); }
			.single-iframe-content .has-theme-palette9-background-color { background-color: var(--global-palette9); }`
			tempStyles = tempStyles.concat( colorClasses );
		}
		if ( 'dark' === selectedStyle ) {
			tempStyles = tempStyles.concat( `.single-iframe-content {--global-palette1:${base_blocks_params.global_colors['--global-palette1']};
			--global-palette2:${base_blocks_params.global_colors['--global-palette2']};
			--global-palette3:${base_blocks_params.global_colors['--global-palette9']};
			--global-palette4:${base_blocks_params.global_colors['--global-palette8']};
			--global-palette5:${base_blocks_params.global_colors['--global-palette7']};
			--global-palette6:${base_blocks_params.global_colors['--global-palette7']};
			--global-palette7:${base_blocks_params.global_colors['--global-palette3']};
			--global-palette8:${base_blocks_params.global_colors['--global-palette3']};
			--global-palette9:${base_blocks_params.global_colors['--global-palette4']};
			--global-content-edge-padding: 3rem;
			padding:0px !important;}.bsb-btns-outer-wrap {--global-palette9:${base_blocks_params.global_colors['--global-palette9']}} .bsb-btn-custom-colors .bsb-btns-outer-wrap {--global-palette9:${base_blocks_params.global_colors['--global-palette3']}} img[src^="https://patterns.baseblocks.com/wp-content/uploads/2023/02/Logo-ploaceholder"] {filter: invert(1);}.wp-block-base-tabs.bsb-pattern-active-tab-highlight .bst-tabs-title-list li.bst-tab-title-active .bst-tab-title{ color:${base_blocks_params.global_colors['--global-palette9']} !important} .bsb-pattern-light-color{--global-palette9:${base_blocks_params.global_colors['--global-palette9']}}` );
		} else if ( 'highlight' === selectedStyle ) {
			tempStyles = tempStyles.concat( `.single-iframe-content {--global-palette1:${base_blocks_params.global_colors['--global-palette9']};
			--global-palette2:${base_blocks_params.global_colors['--global-palette8']};
			--global-palette3:${base_blocks_params.global_colors['--global-palette9']};
			--global-palette4:${base_blocks_params.global_colors['--global-palette9']};
			--global-palette5:${base_blocks_params.global_colors['--global-palette8']};
			--global-palette6:${base_blocks_params.global_colors['--global-palette7']};
			--global-palette7:${base_blocks_params.global_colors['--global-palette2']};
			--global-palette8:${base_blocks_params.global_colors['--global-palette2']};
			--global-palette9:${base_blocks_params.global_colors['--global-palette1']};
			--global-content-edge-padding: 3rem;
			padding:0px !important; }.single-iframe-content .bsb-form .base-blocks-form-field .bsb-forms-submit, .bsb-buttons-wrap .wp-block-button__link {color:${base_blocks_params.global_colors['--global-palette9']};background:${base_blocks_params.global_colors['--global-palette3']};} .bsb-buttons-wrap .bsb-button.bsb-btn-global-outline {color:${base_blocks_params.global_colors['--global-palette3']};border-color:${base_blocks_params.global_colors['--global-palette3']};} .bsb-btn-custom-colors .bsb-buttons-wrap {--global-palette9:${base_blocks_params.global_colors['--global-palette1']}} img[src^="https://patterns.baseblocks.com/wp-content/uploads/2023/02/Logo-ploaceholder"] {filter: invert(1);}` );
		}
		if ( 'sm' === selectedFontSize ) {
			tempStyles = tempStyles.concat( `.single-iframe-content {--global-bsb-font-size-xxxl:${base_blocks_params.font_sizes['xxl']};
			--global-bsb-font-size-xxl:${base_blocks_params.font_sizes['xl']};
			--global-bsb-font-size-xl:${base_blocks_params.font_sizes['lg']};
			--global-bsb-font-size-lg:${base_blocks_params.font_sizes['md']}; }` );
		}
		const newStyles = [
			{ css: tempStyles }
		];
		return newStyles;
	}, [ selectedStyle, selectedFontSize ] );
	const hasItems = !! filteredBlockPatterns?.length;
	return (
		<div className="block-editor-block-patterns-explorer__wrap">
			<div className="block-editor-block-patterns-explorer__list">
				{ hasItems && (
					<PatternsListHeader
						filterValue={ filterValue }
						filteredBlockPatternsLength={ filteredBlockPatterns.length }
					/>
				) }
				{ ! hasItems && ( selectedCategory && ( selectedCategory === 'posts-loop' || selectedCategory === 'featured-products' || selectedCategory === 'product-loop' ) ) && (
					<BannerHeader
						selectedCategory={ selectedCategory }
					/>
				) }
				{ hasItems && (
					<BaseBlockPatternList
						selectedCategory={ selectedCategory }
						blockPatterns={ filteredBlockPatterns }
						onClickPattern={ onSelectBlockPattern }
						showTitlesAsTooltip={ false }
						customStyles={ customStyles }
						customShadowStyles={ customShadowStyles }
						breakpointCols={ breakpointCols }
						previewMode={ previewMode }
						selectedStyle={ selectedStyle }
						renderType={ hasHTml ? 'shadow' : 'iframe' }
					/>
				) }
			</div>
		</div>
	);
}

export default PatternList;
