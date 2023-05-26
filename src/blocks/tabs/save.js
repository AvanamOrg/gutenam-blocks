/**
 * BLOCK: Base Tabs
 */
import classnames from 'classnames';
import { times } from 'lodash';
import { IconSpanTag } from '@base/components';

import {
	InnerBlocks,
	RichText,
	useBlockProps
} from '@wordpress/block-editor';

/**
 * Internal block libraries
 */
import { __, sprintf } from '@wordpress/i18n';

function BaseTabsSave( { attributes } ) {

	const stripStringRender = ( string ) => {
		return string.toLowerCase().replace( /[^0-9a-z-]/g, '' );
	};

	const { tabCount, blockAlignment, currentTab, mobileLayout, layout, tabletLayout, uniqueID, titles, iSize, maxWidth, tabAlignment, startTab, enableSubtitle, widthType, tabWidth } = attributes;
	const layoutClass = ( !layout ? 'tabs' : layout );
	const tabLayoutClass = ( !tabletLayout ? 'inherit' : tabletLayout );
	const mobileLayoutClass = ( !mobileLayout ? 'inherit' : mobileLayout );
	const accordionClass = ( ( mobileLayout && 'accordion' === mobileLayout ) || ( tabletLayout && 'accordion' === tabletLayout ) ? 'bst-create-accordion' : '' );
	const classId = ( !uniqueID ? 'notset' : uniqueID );
	const theTabAlignment = ( tabAlignment ? tabAlignment : 'left' );
	const classes = classnames( `align${ ( blockAlignment ? blockAlignment : 'none' ) }` );
	const activeTab = ( startTab ? startTab : currentTab );
	const innerClasses = classnames( `bst-tabs-wrap bst-tabs-id${classId} bst-tabs-has-${tabCount}-tabs bst-active-tab-${activeTab} bst-tabs-layout-${layoutClass} bst-tabs-tablet-layout-${tabLayoutClass} bst-tabs-mobile-layout-${mobileLayoutClass} bst-tab-alignment-${theTabAlignment} ${accordionClass}` );

	const renderTitles = ( index ) => {
		const backupAnchor = `tab-${( titles[ index ] && titles[ index ].text ? stripStringRender( titles[ index ].text.toString() ) : stripStringRender( __( 'Tab' ) + ( 1 + index ) ) )}`;
		return (
			<li id={( titles[ index ] && titles[ index ].anchor ? titles[ index ].anchor : backupAnchor )}
				className={`bst-title-item bst-title-item-${1 + index} bst-tabs-svg-show-${( titles[ index ] && titles[ index ].onlyIcon ? 'only' : 'always' )} bst-tabs-icon-side-${( titles[ index ] && titles[ index ].iconSide ? titles[ index ].iconSide : 'right' )} bst-tab-title-${( 1 + index === activeTab ? 'active' : 'inactive' )}${( enableSubtitle ? ' bsb-tabs-have-subtitle' : '' )}`}>
				<a href={`#${( titles[ index ] && titles[ index ].anchor ? titles[ index ].anchor : backupAnchor )}`} data-tab={1 + index} className={`bst-tab-title bst-tab-title-${1 + index} `}>
					{titles[ index ] && titles[ index ].icon && 'right' !== titles[ index ].iconSide && (
						<IconSpanTag className={`bst-tab-svg-icon bst-tab-svg-icon-${titles[ index ].icon} bst-title-svg-side-${titles[ index ].iconSide}`} name={titles[ index ].icon}
									 size={( !iSize ? '14' : iSize )}/>
					)}
					{( !enableSubtitle || ( undefined !== titles[ index ] && undefined === titles[ index ].subText ) || ( undefined !== titles[ index ] && undefined !== titles[ index ].subText && '' === titles[ index ].subText ) ) && (
						<RichText.Content
							tagName="span"
							value={( titles[ index ] && titles[ index ].text ? titles[ index ].text : sprintf( __( 'Tab %d' ), ( 1 + index ) ) )}
							className={'bst-title-text'}
						/>
					)}
					{enableSubtitle && titles[ index ] && undefined !== titles[ index ].subText && '' !== titles[ index ].subText && (
						<div className="bsb-tab-titles-wrap">
							<RichText.Content
								tagName="span"
								value={( titles[ index ] && titles[ index ].text ? titles[ index ].text : sprintf( __( 'Tab %d' ), ( 1 + index ) ) )}
								className={'bst-title-text'}
							/>
							<RichText.Content
								tagName="span"
								value={titles[ index ].subText}
								className={'bst-title-sub-text'}
							/>
						</div>
					)}
					{titles[ index ] && titles[ index ].icon && 'right' === titles[ index ].iconSide && (
						<IconSpanTag className={`bst-tab-svg-icon bst-tab-svg-icon-${titles[ index ].icon} bst-title-svg-side-${titles[ index ].iconSide}`} name={titles[ index ].icon}
									 size={( !iSize ? '14' : iSize )}/>
					)}
				</a>
			</li>
		);
	};

	const blockProps = useBlockProps.save( {
		className: classes
	} );

	return (
		<div {...blockProps}>
			<div className={innerClasses}>
				<ul className={`bst-tabs-title-list${( 'tabs' === layout && widthType === 'percent' ? ' bsb-tabs-list-columns bsb-tab-title-columns-' + tabWidth[ 0 ] : '' )}`}>
					{times( tabCount, n => renderTitles( n ) )}
				</ul>
				<div className="bst-tabs-content-wrap">
					<InnerBlocks.Content/>
				</div>
			</div>
		</div>
	);

}

export default BaseTabsSave;
