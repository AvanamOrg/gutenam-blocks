/**
 * BLOCK: Base Info box
 */
import classnames from 'classnames';
import { IconSpanTag } from '@base/components';
import { RichText, useBlockProps } from '@wordpress/block-editor';


function Save( { attributes, className } ) {
	const { uniqueID, link, linkProperty, target, hAlign, mediaType, mediaImage, mediaIcon, mediaAlign, displayTitle, title, titleFont, displayText, contentText, displayLearnMore, learnMore, mediaVAlign, hAlignMobile, hAlignTablet, linkNoFollow, linkSponsored, mediaNumber, number, baseDynamic, imageRatio, linkTitle, titleTagType } = attributes;
	const titleTagName = ( titleTagType && titleTagType !== 'heading' ) ? titleTagType : 'h' + titleFont[ 0 ].level;
	let relAttr;
	if ( '_blank' === target ) {
		relAttr = 'noopener noreferrer';
	}
	if ( undefined !== linkNoFollow && true === linkNoFollow ) {
		relAttr = ( relAttr ? relAttr.concat( ' nofollow' ) : 'nofollow' );
	}
	if ( undefined !== linkSponsored && true === linkSponsored ) {
		relAttr = ( relAttr ? relAttr.concat( ' sponsored' ) : 'sponsored' );
	}
	const WrapperTag = link ? 'a' : 'span';
	const image = (
		<div className={ `base-info-box-image-inner-intrisic-container${ ( baseDynamic && baseDynamic['mediaImage:0:url'] && baseDynamic['mediaImage:0:url'].enable ? ' base-info-dynamic-image' : '' ) }` }>
			<div className={ `base-info-box-image-intrisic bst-info-animate-${ mediaImage[ 0 ].hoverAnimation }${ ( 'svg+xml' === mediaImage[ 0 ].subtype ? ' bsb-info-box-image-type-svg' : '' ) }${ imageRatio && 'inherit' !== imageRatio ? ' bsb-info-box-image-ratio bsb-info-box-image-ratio-' + imageRatio : '' }` }>
				<div className="base-info-box-image-inner-intrisic">
					<img
						src={ mediaImage[ 0 ].url }
						alt={ mediaImage[ 0 ].alt }
						width={ ( mediaImage[ 0 ].subtype && 'svg+xml' === mediaImage[ 0 ].subtype ? mediaImage[ 0 ].maxWidth : mediaImage[ 0 ].width ) }
						height={ mediaImage[ 0 ].height }
						className={ `${ ( mediaImage[ 0 ].id ? `bst-info-box-image wp-image-${ mediaImage[ 0 ].id }` : 'bst-info-box-image wp-image-offsite' ) }${ ( mediaImage[ 0 ].subtype && 'svg+xml' === mediaImage[ 0 ].subtype ? ' bst-info-svg-image' : '' ) }` }
					/>
					{ mediaImage[ 0 ].flipUrl && 'flip' === mediaImage[ 0 ].hoverAnimation && (
						<img
							src={ mediaImage[ 0 ].flipUrl }
							alt={ mediaImage[ 0 ].flipAlt }
							width={ ( mediaImage[ 0 ].flipSubtype && 'svg+xml' === mediaImage[ 0 ].flipSubtype ? mediaImage[ 0 ].maxWidth : mediaImage[ 0 ].flipWidth ) }
							height={ mediaImage[ 0 ].flipHeight }
							className={ `${ ( mediaImage[ 0 ].flipId ? `bst-info-box-image-flip wp-image-${ mediaImage[ 0 ].flipId }` : 'bst-info-box-image-flip wp-image-offsite' ) }${ ( mediaImage[ 0 ].flipSubtype && 'svg+xml' === mediaImage[ 0 ].flipSubtype ? ' bst-info-svg-image' : '' ) }` }
						/>
					) }
				</div>
			</div>
		</div>
	);
	const icon = (
		<div className={ `base-info-box-icon-container bst-info-icon-animate-${ mediaIcon[ 0 ].hoverAnimation }` } >
			<div className={ 'base-info-box-icon-inner-container' } >
				<IconSpanTag extraClass={ 'bst-info-svg-icon' } name={ mediaIcon[ 0 ].icon } strokeWidth={ ( 'fe' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } title={ ( mediaIcon[ 0 ].title ? mediaIcon[ 0 ].title : '' ) } ariaHidden={ ( mediaIcon[ 0 ].title ? undefined : 'true' ) }/>
				{ mediaIcon[ 0 ].flipIcon && 'flip' === mediaIcon[ 0 ].hoverAnimation && (
					<IconSpanTag extraClass={ 'bst-info-svg-icon-flip' } name={ mediaIcon[ 0 ].flipIcon } strokeWidth={ ( 'fe' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } ariaHidden={ 'true' }/>
				) }
			</div>
		</div>
	);
	const numberOut = (
		<div className={ `base-info-box-number-container bst-info-number-animate-${ mediaNumber && mediaNumber[ 0 ] && mediaNumber[ 0 ].hoverAnimation ? mediaNumber[ 0 ].hoverAnimation : 'none' }` } >
			<div className={ 'base-info-box-number-inner-container' } >
				<RichText.Content
					className="bst-blocks-info-box-number"
					tagName={ 'div' }
					value={ number ? number : '' }
				/>
			</div>
		</div>
	);
	const learMoreOutput = (
		<div className="bst-blocks-info-box-learnmore-wrap">
			<RichText.Content
				className="bst-blocks-info-box-learnmore"
				tagName={ 'span' }
				value={ learnMore }
			/>
		</div>
	);
	const learMoreLinkOutput = (
		<div className="bst-blocks-info-box-learnmore-wrap">
			<RichText.Content
				className="bst-blocks-info-box-learnmore info-box-link"
				tagName={ 'a' }
				target={ ( '_blank' === target ? target : undefined ) }
				rel={ relAttr }
				value={ learnMore }
				href={ link }
				aria-label={ linkTitle ? linkTitle : undefined }
			/>
		</div>
	);
	const textOutput = (
		<div className={ 'bst-infobox-textcontent' } >
			{ displayTitle && (
				<RichText.Content
					className="bst-blocks-info-box-title"
					tagName={ titleTagName }
					value={ title }
				/>
			) }
			{ displayText && (
				<RichText.Content
					className="bst-blocks-info-box-text"
					tagName={ 'p' }
					value={ contentText }
				/>
			) }
			{ displayLearnMore && linkProperty === 'learnmore' && (
				learMoreLinkOutput
			) }
			{ displayLearnMore && linkProperty !== 'learnmore' && (
				learMoreOutput
			) }
		</div>
	);
	const allClasses = classnames( {
		[ `bst-info-box${ uniqueID }` ]: uniqueID,
		[ className ]: className,
	} );
	const blockProps = useBlockProps.save( {
		className: allClasses
	} );

	return (
		<div {...blockProps}>
			{ linkProperty !== 'learnmore' && (
				<WrapperTag className={ `bst-blocks-info-box-link-wrap info-box-link bst-blocks-info-box-media-align-${ mediaAlign } bst-info-halign-${ hAlign }${ ( mediaVAlign && 'middle' !== mediaVAlign ? ' bsb-info-box-vertical-media-align-' + mediaVAlign : '' ) }${ ( hAlignTablet && '' !== hAlignTablet ? ' bsb-info-tablet-halign-' + hAlignTablet : '' ) }${ ( hAlignMobile && '' !== hAlignMobile ? ' bsb-info-mobile-halign-' + hAlignMobile : '' ) }` } target={ ( '_blank' === target && link ? target : undefined ) } rel={ link ? relAttr : undefined } href={ link ? link : undefined } aria-label={ linkTitle ? linkTitle : undefined }>
					{ 'none' !== mediaType && (
						<div className={ 'bst-blocks-info-box-media-container' }>
							<div className={ `bst-blocks-info-box-media ${ 'number' === mediaType ? 'bst-info-media-animate-' + mediaNumber[ 0 ].hoverAnimation : '' }${ 'image' === mediaType ? 'bst-info-media-animate-' + mediaImage[ 0 ].hoverAnimation : '' }${ 'image' !== mediaType && 'number' !== mediaType ? 'bst-info-media-animate-' + mediaIcon[ 0 ].hoverAnimation : '' }` }>
								{ mediaImage[ 0 ].url && 'image' === mediaType && (
									image
								) }
								{ 'icon' === mediaType && (
									icon
								) }
								{ 'number' === mediaType && (
									numberOut
								) }
							</div>
						</div>
					) }
					{ textOutput }
				</WrapperTag>
			) }
			{ linkProperty === 'learnmore' && (
				<div className={ `bst-blocks-info-box-link-wrap bst-blocks-info-box-media-align-${ mediaAlign } bst-info-halign-${ hAlign }${ ( mediaVAlign && 'middle' !== mediaVAlign ? ' bsb-info-box-vertical-media-align-' + mediaVAlign : '' ) }` }>
					{ 'none' !== mediaType && (
						<div className={ 'bst-blocks-info-box-media-container' }>
							<div className={ `bst-blocks-info-box-media ${ 'number' === mediaType ? 'bst-info-media-animate-' + mediaNumber[ 0 ].hoverAnimation : '' }${ 'image' === mediaType ? 'bst-info-media-animate-' + mediaImage[ 0 ].hoverAnimation : '' }${ 'image' !== mediaType && 'number' !== mediaType ? 'bst-info-media-animate-' + mediaIcon[ 0 ].hoverAnimation : '' }` }>
								{ mediaImage[ 0 ].url && 'image' === mediaType && (
									image
								) }
								{ 'icon' === mediaType && (
									icon
								) }
								{ 'number' === mediaType && (
									numberOut
								) }
							</div>
						</div>
					) }
					{ textOutput }
				</div>
			) }
		</div>
	);
}
export default Save;
