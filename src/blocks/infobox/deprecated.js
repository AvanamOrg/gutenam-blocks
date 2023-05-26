/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText, useBlockProps } from '@wordpress/block-editor'
import { IconRender, IconSpanTag } from '@base/components';

const deprecated = [
	{
		attributes: {
			"uniqueID": {
				"type": "string",
				"default": ""
			},
			"link": {
				"type": "string",
				"source": "attribute",
				"attribute": "href",
				"selector": "a.info-box-link"
			},
			"linkProperty": {
				"type": "string",
				"default": "box"
			},
			"target": {
				"type": "string",
				"source": "attribute",
				"attribute": "target",
				"selector": "a.info-box-link",
				"default": "_self"
			},
			"hAlign": {
				"type": "string",
				"default": "center"
			},
			"hAlignTablet": {
				"type": "string",
				"default": ""
			},
			"hAlignMobile": {
				"type": "string",
				"default": ""
			},
			"containerBackground": {
				"type": "string",
				"default": "#f2f2f2"
			},
			"containerBackgroundOpacity": {
				"type": "number",
				"default": 1
			},
			"containerHoverBackground": {
				"type": "string",
				"default": "#f2f2f2"
			},
			"containerHoverBackgroundOpacity": {
				"type": "number",
				"default": 1
			},
			"containerBorder": {
				"type": "string",
				"default": "#eeeeee"
			},
			"containerBorderOpacity": {
				"type": "number",
				"default": 1
			},
			"containerHoverBorder": {
				"type": "string",
				"default": "#eeeeee"
			},
			"containerHoverBorderOpacity": {
				"type": "number",
				"default": 1
			},
			"containerBorderWidth": {
				"type": "array",
				"default": [
					0,
					0,
					0,
					0
				]
			},
			"containerBorderRadius": {
				"type": "number",
				"default": 0
			},
			"containerPadding": {
				"type": "array",
				"default": [
					20,
					20,
					20,
					20
				]
			},
			"containerTabletPadding": {
				"type": "array",
				"default": [
					"",
					"",
					"",
					""
				]
			},
			"containerMobilePadding": {
				"type": "array",
				"default": [
					"",
					"",
					"",
					""
				]
			},
			"containerPaddingType": {
				"type": "string",
				"default": "px"
			},
			"mediaType": {
				"type": "string",
				"default": "icon"
			},
			"mediaAlign": {
				"type": "string",
				"default": "top"
			},
			"mediaImage": {
				"type": "array",
				"default": [
					{
						"url": "",
						"id": "",
						"alt": "",
						"width": "",
						"height": "",
						"maxWidth": "",
						"hoverAnimation": "none",
						"flipUrl": "",
						"flipId": "",
						"flipAlt": "",
						"flipWidth": "",
						"flipHeight": "",
						"subtype": "",
						"flipSubtype": ""
					}
				]
			},
			"mediaIcon": {
				"type": "array",
				"default": [
					{
						"icon": "fe_aperture",
						"size": 50,
						"width": 2,
						"title": "",
						"color": "#444444",
						"hoverColor": "#444444",
						"hoverAnimation": "none",
						"flipIcon": "",
						"tabletSize": "",
						"mobileSize": ""
					}
				]
			},
			"mediaStyle": {
				"type": "array",
				"default": [
					{
						"background": "transparent",
						"hoverBackground": "transparent",
						"border": "#444444",
						"hoverBorder": "#444444",
						"borderRadius": 0,
						"borderWidth": [
							0,
							0,
							0,
							0
						],
						"padding": [
							10,
							10,
							10,
							10
						],
						"margin": [
							0,
							15,
							0,
							15
						]
					}
				]
			},
			"displayTitle": {
				"type": "boolean",
				"default": true
			},
			"title": {
				"type": "array",
				"source": "children",
				"selector": "h1,h2,h3,h4,h5,h6",
				"default": "Title"
			},
			"titleColor": {
				"type": "string",
				"default": ""
			},
			"titleHoverColor": {
				"type": "string",
				"default": ""
			},
			"titleMinHeight": {
				"type": "array",
				"default": [
					"",
					"",
					""
				]
			},
			"titleFont": {
				"type": "array",
				"default": [
					{
						"level": 2,
						"size": [
							"",
							"",
							""
						],
						"sizeType": "px",
						"lineHeight": [
							"",
							"",
							""
						],
						"lineType": "px",
						"letterSpacing": "",
						"textTransform": "",
						"family": "",
						"google": false,
						"style": "",
						"weight": "",
						"variant": "",
						"subset": "",
						"loadGoogle": true,
						"padding": [
							0,
							0,
							0,
							0
						],
						"paddingControl": "linked",
						"margin": [
							5,
							0,
							10,
							0
						],
						"marginControl": "individual"
					}
				]
			},
			"displayText": {
				"type": "boolean",
				"default": true
			},
			"contentText": {
				"type": "array",
				"source": "children",
				"selector": "p",
				"default": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean diam dolor, accumsan sed rutrum vel, dapibus et leo."
			},
			"textColor": {
				"type": "string",
				"default": "#555555"
			},
			"textHoverColor": {
				"type": "string",
				"default": ""
			},
			"textMinHeight": {
				"type": "array",
				"default": [
					"",
					"",
					""
				]
			},
			"textFont": {
				"type": "array",
				"default": [
					{
						"size": [
							"",
							"",
							""
						],
						"sizeType": "px",
						"lineHeight": [
							"",
							"",
							""
						],
						"lineType": "px",
						"letterSpacing": "",
						"family": "",
						"google": "",
						"style": "",
						"weight": "",
						"variant": "",
						"subset": "",
						"loadGoogle": true,
						"textTransform": ""
					}
				]
			},
			"textSpacing": {
				"type": "array",
				"default": [
					{
						"padding": [
							"",
							"",
							"",
							""
						],
						"paddingControl": "linked",
						"margin": [
							"",
							"",
							"",
							""
						],
						"marginControl": "linked"
					}
				]
			},
			"displayLearnMore": {
				"type": "boolean",
				"default": false
			},
			"learnMore": {
				"type": "array",
				"source": "children",
				"selector": ".bst-blocks-info-box-learnmore",
				"default": "Learn More"
			},
			"learnMoreStyles": {
				"type": "array",
				"default": [
					{
						"size": [
							"",
							"",
							""
						],
						"sizeType": "px",
						"lineHeight": [
							"",
							"",
							""
						],
						"lineType": "px",
						"letterSpacing": "",
						"family": "",
						"google": "",
						"style": "",
						"weight": "",
						"variant": "",
						"subset": "",
						"loadGoogle": true,
						"padding": [
							4,
							8,
							4,
							8
						],
						"paddingControl": "individual",
						"margin": [
							10,
							0,
							10,
							0
						],
						"marginControl": "individual",
						"color": "",
						"background": "transparent",
						"border": "#555555",
						"borderRadius": 0,
						"borderWidth": [
							0,
							0,
							0,
							0
						],
						"borderControl": "linked",
						"colorHover": "#ffffff",
						"backgroundHover": "#444444",
						"borderHover": "#444444",
						"hoverEffect": "revealBorder",
						"paddingTablet": [
							"",
							"",
							"",
							""
						],
						"paddingMobile": [
							"",
							"",
							"",
							""
						],
						"paddingType": "px",
						"textTransform": ""
					}
				]
			},
			"displayShadow": {
				"type": "boolean",
				"default": false
			},
			"shadow": {
				"type": "array",
				"default": [
					{
						"color": "#000000",
						"opacity": 0,
						"spread": 0,
						"blur": 0,
						"hOffset": 0,
						"vOffset": 0
					}
				]
			},
			"shadowHover": {
				"type": "array",
				"default": [
					{
						"color": "#000000",
						"opacity": 0.2,
						"spread": 0,
						"blur": 14,
						"hOffset": 0,
						"vOffset": 0
					}
				]
			},
			"showPresets": {
				"type": "boolean",
				"default": true
			},
			"mediaVAlign": {
				"type": "string",
				"default": "middle"
			},
			"mediaAlignMobile": {
				"type": "string",
				"default": ""
			},
			"mediaAlignTablet": {
				"type": "string",
				"default": ""
			},
			"maxWidth": {
				"type": "number",
				"default": ""
			},
			"maxWidthUnit": {
				"type": "string",
				"default": "px"
			},
			"containerMargin": {
				"type": "array",
				"default": [
					"",
					"",
					"",
					""
				]
			},
			"containerMarginUnit": {
				"type": "string",
				"default": "px"
			},
			"linkNoFollow": {
				"type": "boolean",
				"default": false
			},
			"linkSponsored": {
				"type": "boolean",
				"default": false
			},
			"number": {
				"type": "array",
				"source": "children",
				"selector": "div.bst-blocks-info-box-number",
				"default": ""
			},
			"mediaNumber": {
				"type": "array",
				"default": [
					{
						"family": "",
						"google": false,
						"hoverAnimation": "none",
						"style": "",
						"weight": "",
						"variant": "",
						"subset": "",
						"loadGoogle": true
					}
				]
			},
			"imageRatio": {
				"type": "string",
				"default": "inherit"
			},
			"linkTitle": {
				"type": "string",
				"default": ""
			},
			"inQueryBlock": {
				"type": "boolean",
				"default": false
			}
		},
		save: ( { attributes, className } ) => {
			const { uniqueID, link, linkProperty, target, hAlign, mediaType, mediaImage, mediaIcon, mediaAlign, displayTitle, title, titleFont, displayText, contentText, displayLearnMore, learnMore, mediaVAlign, hAlignMobile, hAlignTablet, linkNoFollow, linkSponsored, mediaNumber, number, baseDynamic, imageRatio, linkTitle } = attributes;
			const titleTagName = 'h' + titleFont[ 0 ].level;
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

			const blockProps = useBlockProps.save( {
				className: className
			} );

			return (
				<div id={ `bst-info-box${ uniqueID }` } {...blockProps}>
					{ linkProperty !== 'learnmore' && (
						<a className={ `bst-blocks-info-box-link-wrap info-box-link bst-blocks-info-box-media-align-${ mediaAlign } bst-info-halign-${ hAlign }${ ( mediaVAlign && 'middle' !== mediaVAlign ? ' bsb-info-box-vertical-media-align-' + mediaVAlign : '' ) }${ ( hAlignTablet && '' !== hAlignTablet ? ' bsb-info-tablet-halign-' + hAlignTablet : '' ) }${ ( hAlignMobile && '' !== hAlignMobile ? ' bsb-info-mobile-halign-' + hAlignMobile : '' ) }` } target={ ( '_blank' === target ? target : undefined ) } rel={ relAttr } href={ link } aria-label={ linkTitle ? linkTitle : undefined }>
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
						</a>
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
			)
		}
	},
	{
		attributes: {
			"uniqueID": {
				"type": "string",
				"default": ""
			},
			"link": {
				"type": "string",
				"source": "attribute",
				"attribute": "href",
				"selector": "a.info-box-link"
			},
			"linkProperty": {
				"type": "string",
				"default": "box"
			},
			"target": {
				"type": "string",
				"source": "attribute",
				"attribute": "target",
				"selector": "a.info-box-link",
				"default": "_self"
			},
			"hAlign": {
				"type": "string",
				"default": "center"
			},
			"hAlignTablet": {
				"type": "string",
				"default": ""
			},
			"hAlignMobile": {
				"type": "string",
				"default": ""
			},
			"containerBackground": {
				"type": "string",
				"default": "#f2f2f2"
			},
			"containerBackgroundOpacity": {
				"type": "number",
				"default": 1
			},
			"containerHoverBackground": {
				"type": "string",
				"default": "#f2f2f2"
			},
			"containerHoverBackgroundOpacity": {
				"type": "number",
				"default": 1
			},
			"containerBorder": {
				"type": "string",
				"default": "#eeeeee"
			},
			"containerBorderOpacity": {
				"type": "number",
				"default": 1
			},
			"containerHoverBorder": {
				"type": "string",
				"default": "#eeeeee"
			},
			"containerHoverBorderOpacity": {
				"type": "number",
				"default": 1
			},
			"containerBorderWidth": {
				"type": "array",
				"default": [
					0,
					0,
					0,
					0
				]
			},
			"containerBorderRadius": {
				"type": "number",
				"default": 0
			},
			"containerPadding": {
				"type": "array",
				"default": [
					20,
					20,
					20,
					20
				]
			},
			"containerTabletPadding": {
				"type": "array",
				"default": [
					"",
					"",
					"",
					""
				]
			},
			"containerMobilePadding": {
				"type": "array",
				"default": [
					"",
					"",
					"",
					""
				]
			},
			"containerPaddingType": {
				"type": "string",
				"default": "px"
			},
			"mediaType": {
				"type": "string",
				"default": "icon"
			},
			"mediaAlign": {
				"type": "string",
				"default": "top"
			},
			"mediaImage": {
				"type": "array",
				"default": [
					{
						"url": "",
						"id": "",
						"alt": "",
						"width": "",
						"height": "",
						"maxWidth": "",
						"hoverAnimation": "none",
						"flipUrl": "",
						"flipId": "",
						"flipAlt": "",
						"flipWidth": "",
						"flipHeight": "",
						"subtype": "",
						"flipSubtype": ""
					}
				]
			},
			"mediaIcon": {
				"type": "array",
				"default": [
					{
						"icon": "fe_aperture",
						"size": 50,
						"width": 2,
						"title": "",
						"color": "#444444",
						"hoverColor": "#444444",
						"hoverAnimation": "none",
						"flipIcon": "",
						"tabletSize": "",
						"mobileSize": ""
					}
				]
			},
			"mediaStyle": {
				"type": "array",
				"default": [
					{
						"background": "transparent",
						"hoverBackground": "transparent",
						"border": "#444444",
						"hoverBorder": "#444444",
						"borderRadius": 0,
						"borderWidth": [
							0,
							0,
							0,
							0
						],
						"padding": [
							10,
							10,
							10,
							10
						],
						"margin": [
							0,
							15,
							0,
							15
						]
					}
				]
			},
			"displayTitle": {
				"type": "boolean",
				"default": true
			},
			"title": {
				"type": "array",
				"source": "children",
				"selector": "h1,h2,h3,h4,h5,h6",
				"default": "Title"
			},
			"titleColor": {
				"type": "string",
				"default": ""
			},
			"titleHoverColor": {
				"type": "string",
				"default": ""
			},
			"titleMinHeight": {
				"type": "array",
				"default": [
					"",
					"",
					""
				]
			},
			"titleFont": {
				"type": "array",
				"default": [
					{
						"level": 2,
						"size": [
							"",
							"",
							""
						],
						"sizeType": "px",
						"lineHeight": [
							"",
							"",
							""
						],
						"lineType": "px",
						"letterSpacing": "",
						"textTransform": "",
						"family": "",
						"google": false,
						"style": "",
						"weight": "",
						"variant": "",
						"subset": "",
						"loadGoogle": true,
						"padding": [
							0,
							0,
							0,
							0
						],
						"paddingControl": "linked",
						"margin": [
							5,
							0,
							10,
							0
						],
						"marginControl": "individual"
					}
				]
			},
			"displayText": {
				"type": "boolean",
				"default": true
			},
			"contentText": {
				"type": "array",
				"source": "children",
				"selector": "p",
				"default": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean diam dolor, accumsan sed rutrum vel, dapibus et leo."
			},
			"textColor": {
				"type": "string",
				"default": "#555555"
			},
			"textHoverColor": {
				"type": "string",
				"default": ""
			},
			"textMinHeight": {
				"type": "array",
				"default": [
					"",
					"",
					""
				]
			},
			"textFont": {
				"type": "array",
				"default": [
					{
						"size": [
							"",
							"",
							""
						],
						"sizeType": "px",
						"lineHeight": [
							"",
							"",
							""
						],
						"lineType": "px",
						"letterSpacing": "",
						"family": "",
						"google": "",
						"style": "",
						"weight": "",
						"variant": "",
						"subset": "",
						"loadGoogle": true,
						"textTransform": ""
					}
				]
			},
			"textSpacing": {
				"type": "array",
				"default": [
					{
						"padding": [
							"",
							"",
							"",
							""
						],
						"paddingControl": "linked",
						"margin": [
							"",
							"",
							"",
							""
						],
						"marginControl": "linked"
					}
				]
			},
			"displayLearnMore": {
				"type": "boolean",
				"default": false
			},
			"learnMore": {
				"type": "array",
				"source": "children",
				"selector": ".bst-blocks-info-box-learnmore",
				"default": "Learn More"
			},
			"learnMoreStyles": {
				"type": "array",
				"default": [
					{
						"size": [
							"",
							"",
							""
						],
						"sizeType": "px",
						"lineHeight": [
							"",
							"",
							""
						],
						"lineType": "px",
						"letterSpacing": "",
						"family": "",
						"google": "",
						"style": "",
						"weight": "",
						"variant": "",
						"subset": "",
						"loadGoogle": true,
						"padding": [
							4,
							8,
							4,
							8
						],
						"paddingControl": "individual",
						"margin": [
							10,
							0,
							10,
							0
						],
						"marginControl": "individual",
						"color": "",
						"background": "transparent",
						"border": "#555555",
						"borderRadius": 0,
						"borderWidth": [
							0,
							0,
							0,
							0
						],
						"borderControl": "linked",
						"colorHover": "#ffffff",
						"backgroundHover": "#444444",
						"borderHover": "#444444",
						"hoverEffect": "revealBorder",
						"paddingTablet": [
							"",
							"",
							"",
							""
						],
						"paddingMobile": [
							"",
							"",
							"",
							""
						],
						"paddingType": "px",
						"textTransform": ""
					}
				]
			},
			"displayShadow": {
				"type": "boolean",
				"default": false
			},
			"shadow": {
				"type": "array",
				"default": [
					{
						"color": "#000000",
						"opacity": 0,
						"spread": 0,
						"blur": 0,
						"hOffset": 0,
						"vOffset": 0
					}
				]
			},
			"shadowHover": {
				"type": "array",
				"default": [
					{
						"color": "#000000",
						"opacity": 0.2,
						"spread": 0,
						"blur": 14,
						"hOffset": 0,
						"vOffset": 0
					}
				]
			},
			"showPresets": {
				"type": "boolean",
				"default": true
			},
			"mediaVAlign": {
				"type": "string",
				"default": "middle"
			},
			"mediaAlignMobile": {
				"type": "string",
				"default": ""
			},
			"mediaAlignTablet": {
				"type": "string",
				"default": ""
			},
			"maxWidth": {
				"type": "number",
				"default": ""
			},
			"maxWidthUnit": {
				"type": "string",
				"default": "px"
			},
			"containerMargin": {
				"type": "array",
				"default": [
					"",
					"",
					"",
					""
				]
			},
			"containerMarginUnit": {
				"type": "string",
				"default": "px"
			},
			"linkNoFollow": {
				"type": "boolean",
				"default": false
			},
			"linkSponsored": {
				"type": "boolean",
				"default": false
			},
			"number": {
				"type": "array",
				"source": "children",
				"selector": "div.bst-blocks-info-box-number",
				"default": ""
			},
			"mediaNumber": {
				"type": "array",
				"default": [
					{
						"family": "",
						"google": false,
						"hoverAnimation": "none",
						"style": "",
						"weight": "",
						"variant": "",
						"subset": "",
						"loadGoogle": true
					}
				]
			},
			"imageRatio": {
				"type": "string",
				"default": "inherit"
			},
			"linkTitle": {
				"type": "string",
				"default": ""
			},
			"inQueryBlock": {
				"type": "boolean",
				"default": false
			}
		},
		save: ( { attributes, className } ) => {
			const { uniqueID, link, linkProperty, target, hAlign, mediaType, mediaImage, mediaIcon, mediaAlign, displayTitle, title, titleFont, displayText, contentText, displayLearnMore, learnMore, mediaVAlign, hAlignMobile, hAlignTablet, linkNoFollow, linkSponsored, mediaNumber, number, baseDynamic, imageRatio, linkTitle } = attributes;
			const titleTagName = 'h' + titleFont[ 0 ].level;
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
						<IconRender className={ `bst-info-svg-icon bst-info-svg-icon-${ mediaIcon[ 0 ].icon }` } name={ mediaIcon[ 0 ].icon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } title={ ( mediaIcon[ 0 ].title ? mediaIcon[ 0 ].title : '' ) } ariaHidden={ ( mediaIcon[ 0 ].title ? undefined : 'true' ) } style={ {
							display: 'block',
						} } />
						{ mediaIcon[ 0 ].flipIcon && 'flip' === mediaIcon[ 0 ].hoverAnimation && (
							<IconRender className={ `bst-info-svg-icon-flip bst-info-svg-icon-${ mediaIcon[ 0 ].flipIcon }` } name={ mediaIcon[ 0 ].flipIcon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } ariaHidden={ 'true' } style={ {
								display: 'block',
							} } />
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

			const blockProps = useBlockProps.save( {
				className: className
			} );

			return (
				<div id={ `bst-info-box${ uniqueID }` } {...blockProps}>
					{ linkProperty !== 'learnmore' && (
						<a className={ `bst-blocks-info-box-link-wrap info-box-link bst-blocks-info-box-media-align-${ mediaAlign } bst-info-halign-${ hAlign }${ ( mediaVAlign && 'middle' !== mediaVAlign ? ' bsb-info-box-vertical-media-align-' + mediaVAlign : '' ) }${ ( hAlignTablet && '' !== hAlignTablet ? ' bsb-info-tablet-halign-' + hAlignTablet : '' ) }${ ( hAlignMobile && '' !== hAlignMobile ? ' bsb-info-mobile-halign-' + hAlignMobile : '' ) }` } target={ ( '_blank' === target ? target : undefined ) } rel={ relAttr } href={ link } aria-label={ linkTitle ? linkTitle : undefined }>
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
						</a>
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
	},
	{
		attributes: {
			"uniqueID": {
				"type": "string",
				"default": ""
			},
			"link": {
				"type": "string",
				"source": "attribute",
				"attribute": "href",
				"selector": "a.info-box-link"
			},
			"linkProperty": {
				"type": "string",
				"default": "box"
			},
			"target": {
				"type": "string",
				"source": "attribute",
				"attribute": "target",
				"selector": "a.info-box-link",
				"default": "_self"
			},
			"hAlign": {
				"type": "string",
				"default": "center"
			},
			"hAlignTablet": {
				"type": "string",
				"default": ""
			},
			"hAlignMobile": {
				"type": "string",
				"default": ""
			},
			"containerBackground": {
				"type": "string",
				"default": "#f2f2f2"
			},
			"containerBackgroundOpacity": {
				"type": "number",
				"default": 1
			},
			"containerHoverBackground": {
				"type": "string",
				"default": "#f2f2f2"
			},
			"containerHoverBackgroundOpacity": {
				"type": "number",
				"default": 1
			},
			"containerBorder": {
				"type": "string",
				"default": "#eeeeee"
			},
			"containerBorderOpacity": {
				"type": "number",
				"default": 1
			},
			"containerHoverBorder": {
				"type": "string",
				"default": "#eeeeee"
			},
			"containerHoverBorderOpacity": {
				"type": "number",
				"default": 1
			},
			"containerBorderWidth": {
				"type": "array",
				"default": [
					0,
					0,
					0,
					0
				]
			},
			"containerBorderRadius": {
				"type": "number",
				"default": 0
			},
			"containerPadding": {
				"type": "array",
				"default": [
					20,
					20,
					20,
					20
				]
			},
			"containerTabletPadding": {
				"type": "array",
				"default": [
					"",
					"",
					"",
					""
				]
			},
			"containerMobilePadding": {
				"type": "array",
				"default": [
					"",
					"",
					"",
					""
				]
			},
			"containerPaddingType": {
				"type": "string",
				"default": "px"
			},
			"mediaType": {
				"type": "string",
				"default": "icon"
			},
			"mediaAlign": {
				"type": "string",
				"default": "top"
			},
			"mediaImage": {
				"type": "array",
				"default": [
					{
						"url": "",
						"id": "",
						"alt": "",
						"width": "",
						"height": "",
						"maxWidth": "",
						"hoverAnimation": "none",
						"flipUrl": "",
						"flipId": "",
						"flipAlt": "",
						"flipWidth": "",
						"flipHeight": "",
						"subtype": "",
						"flipSubtype": ""
					}
				]
			},
			"mediaIcon": {
				"type": "array",
				"default": [
					{
						"icon": "fe_aperture",
						"size": 50,
						"width": 2,
						"title": "",
						"color": "#444444",
						"hoverColor": "#444444",
						"hoverAnimation": "none",
						"flipIcon": "",
						"tabletSize": "",
						"mobileSize": ""
					}
				]
			},
			"mediaStyle": {
				"type": "array",
				"default": [
					{
						"background": "transparent",
						"hoverBackground": "transparent",
						"border": "#444444",
						"hoverBorder": "#444444",
						"borderRadius": 0,
						"borderWidth": [
							0,
							0,
							0,
							0
						],
						"padding": [
							10,
							10,
							10,
							10
						],
						"margin": [
							0,
							15,
							0,
							15
						]
					}
				]
			},
			"displayTitle": {
				"type": "boolean",
				"default": true
			},
			"title": {
				"type": "array",
				"source": "children",
				"selector": "h1,h2,h3,h4,h5,h6",
				"default": "Title"
			},
			"titleColor": {
				"type": "string",
				"default": ""
			},
			"titleHoverColor": {
				"type": "string",
				"default": ""
			},
			"titleMinHeight": {
				"type": "array",
				"default": [
					"",
					"",
					""
				]
			},
			"titleFont": {
				"type": "array",
				"default": [
					{
						"level": 2,
						"size": [
							"",
							"",
							""
						],
						"sizeType": "px",
						"lineHeight": [
							"",
							"",
							""
						],
						"lineType": "px",
						"letterSpacing": "",
						"textTransform": "",
						"family": "",
						"google": false,
						"style": "",
						"weight": "",
						"variant": "",
						"subset": "",
						"loadGoogle": true,
						"padding": [
							0,
							0,
							0,
							0
						],
						"paddingControl": "linked",
						"margin": [
							5,
							0,
							10,
							0
						],
						"marginControl": "individual"
					}
				]
			},
			"displayText": {
				"type": "boolean",
				"default": true
			},
			"contentText": {
				"type": "array",
				"source": "children",
				"selector": "p",
				"default": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean diam dolor, accumsan sed rutrum vel, dapibus et leo."
			},
			"textColor": {
				"type": "string",
				"default": "#555555"
			},
			"textHoverColor": {
				"type": "string",
				"default": ""
			},
			"textMinHeight": {
				"type": "array",
				"default": [
					"",
					"",
					""
				]
			},
			"textFont": {
				"type": "array",
				"default": [
					{
						"size": [
							"",
							"",
							""
						],
						"sizeType": "px",
						"lineHeight": [
							"",
							"",
							""
						],
						"lineType": "px",
						"letterSpacing": "",
						"family": "",
						"google": "",
						"style": "",
						"weight": "",
						"variant": "",
						"subset": "",
						"loadGoogle": true,
						"textTransform": ""
					}
				]
			},
			"textSpacing": {
				"type": "array",
				"default": [
					{
						"padding": [
							"",
							"",
							"",
							""
						],
						"paddingControl": "linked",
						"margin": [
							"",
							"",
							"",
							""
						],
						"marginControl": "linked"
					}
				]
			},
			"displayLearnMore": {
				"type": "boolean",
				"default": false
			},
			"learnMore": {
				"type": "array",
				"source": "children",
				"selector": ".bst-blocks-info-box-learnmore",
				"default": "Learn More"
			},
			"learnMoreStyles": {
				"type": "array",
				"default": [
					{
						"size": [
							"",
							"",
							""
						],
						"sizeType": "px",
						"lineHeight": [
							"",
							"",
							""
						],
						"lineType": "px",
						"letterSpacing": "",
						"family": "",
						"google": "",
						"style": "",
						"weight": "",
						"variant": "",
						"subset": "",
						"loadGoogle": true,
						"padding": [
							4,
							8,
							4,
							8
						],
						"paddingControl": "individual",
						"margin": [
							10,
							0,
							10,
							0
						],
						"marginControl": "individual",
						"color": "",
						"background": "transparent",
						"border": "#555555",
						"borderRadius": 0,
						"borderWidth": [
							0,
							0,
							0,
							0
						],
						"borderControl": "linked",
						"colorHover": "#ffffff",
						"backgroundHover": "#444444",
						"borderHover": "#444444",
						"hoverEffect": "revealBorder",
						"paddingTablet": [
							"",
							"",
							"",
							""
						],
						"paddingMobile": [
							"",
							"",
							"",
							""
						],
						"paddingType": "px",
						"textTransform": ""
					}
				]
			},
			"displayShadow": {
				"type": "boolean",
				"default": false
			},
			"shadow": {
				"type": "array",
				"default": [
					{
						"color": "#000000",
						"opacity": 0,
						"spread": 0,
						"blur": 0,
						"hOffset": 0,
						"vOffset": 0
					}
				]
			},
			"shadowHover": {
				"type": "array",
				"default": [
					{
						"color": "#000000",
						"opacity": 0.2,
						"spread": 0,
						"blur": 14,
						"hOffset": 0,
						"vOffset": 0
					}
				]
			},
			"showPresets": {
				"type": "boolean",
				"default": true
			},
			"mediaVAlign": {
				"type": "string",
				"default": "middle"
			},
			"mediaAlignMobile": {
				"type": "string",
				"default": ""
			},
			"mediaAlignTablet": {
				"type": "string",
				"default": ""
			},
			"maxWidth": {
				"type": "number",
				"default": ""
			},
			"maxWidthUnit": {
				"type": "string",
				"default": "px"
			},
			"containerMargin": {
				"type": "array",
				"default": [
					"",
					"",
					"",
					""
				]
			},
			"containerMarginUnit": {
				"type": "string",
				"default": "px"
			},
			"linkNoFollow": {
				"type": "boolean",
				"default": false
			},
			"linkSponsored": {
				"type": "boolean",
				"default": false
			},
			"number": {
				"type": "array",
				"source": "children",
				"selector": "div.bst-blocks-info-box-number",
				"default": ""
			},
			"mediaNumber": {
				"type": "array",
				"default": [
					{
						"family": "",
						"google": false,
						"hoverAnimation": "none",
						"style": "",
						"weight": "",
						"variant": "",
						"subset": "",
						"loadGoogle": true
					}
				]
			},
			"imageRatio": {
				"type": "string",
				"default": "inherit"
			},
			"linkTitle": {
				"type": "string",
				"default": ""
			},
			"inQueryBlock": {
				"type": "boolean",
				"default": false
			}
		},
		save: ( { attributes } ) => {
			const { uniqueID, link, linkProperty, target, hAlign, mediaType, mediaImage, mediaIcon, mediaAlign, displayTitle, title, titleFont, displayText, contentText, displayLearnMore, learnMore, mediaVAlign, hAlignMobile, hAlignTablet, linkNoFollow, linkSponsored, mediaNumber, number, baseDynamic, imageRatio, linkTitle, className } = attributes;
			const titleTagName = 'h' + titleFont[ 0 ].level;
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
						<IconRender className={ `bst-info-svg-icon bst-info-svg-icon-${ mediaIcon[ 0 ].icon }` } name={ mediaIcon[ 0 ].icon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
							display: 'block',
						} } />
						{ mediaIcon[ 0 ].flipIcon && 'flip' === mediaIcon[ 0 ].hoverAnimation && (
							<IconRender className={ `bst-info-svg-icon-flip bst-info-svg-icon-${ mediaIcon[ 0 ].flipIcon }` } name={ mediaIcon[ 0 ].flipIcon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
								display: 'block',
							} } />
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
			return (
				<div id={ `bst-info-box${ uniqueID }` } className={ className }>
					{ linkProperty !== 'learnmore' && (
						<a className={ `bst-blocks-info-box-link-wrap info-box-link bst-blocks-info-box-media-align-${ mediaAlign } bst-info-halign-${ hAlign }${ ( mediaVAlign && 'middle' !== mediaVAlign ? ' bsb-info-box-vertical-media-align-' + mediaVAlign : '' ) }${ ( hAlignTablet && '' !== hAlignTablet ? ' bsb-info-tablet-halign-' + hAlignTablet : '' ) }${ ( hAlignMobile && '' !== hAlignMobile ? ' bsb-info-mobile-halign-' + hAlignMobile : '' ) }` } target={ ( '_blank' === target ? target : undefined ) } rel={ relAttr } href={ link } aria-label={ linkTitle ? linkTitle : undefined }>
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
						</a>
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
	},
	{
		attributes: {
			"uniqueID": {
				"type": "string",
				"default": ""
			},
			"link": {
				"type": "string",
				"source": "attribute",
				"attribute": "href",
				"selector": "a.info-box-link"
			},
			"linkProperty": {
				"type": "string",
				"default": "box"
			},
			"target": {
				"type": "string",
				"source": "attribute",
				"attribute": "target",
				"selector": "a.info-box-link",
				"default": "_self"
			},
			"hAlign": {
				"type": "string",
				"default": "center"
			},
			"hAlignTablet": {
				"type": "string",
				"default": ""
			},
			"hAlignMobile": {
				"type": "string",
				"default": ""
			},
			"containerBackground": {
				"type": "string",
				"default": "#f2f2f2"
			},
			"containerBackgroundOpacity": {
				"type": "number",
				"default": 1
			},
			"containerHoverBackground": {
				"type": "string",
				"default": "#f2f2f2"
			},
			"containerHoverBackgroundOpacity": {
				"type": "number",
				"default": 1
			},
			"containerBorder": {
				"type": "string",
				"default": "#eeeeee"
			},
			"containerBorderOpacity": {
				"type": "number",
				"default": 1
			},
			"containerHoverBorder": {
				"type": "string",
				"default": "#eeeeee"
			},
			"containerHoverBorderOpacity": {
				"type": "number",
				"default": 1
			},
			"containerBorderWidth": {
				"type": "array",
				"default": [
					0,
					0,
					0,
					0
				]
			},
			"containerBorderRadius": {
				"type": "number",
				"default": 0
			},
			"containerPadding": {
				"type": "array",
				"default": [
					20,
					20,
					20,
					20
				]
			},
			"containerTabletPadding": {
				"type": "array",
				"default": [
					"",
					"",
					"",
					""
				]
			},
			"containerMobilePadding": {
				"type": "array",
				"default": [
					"",
					"",
					"",
					""
				]
			},
			"containerPaddingType": {
				"type": "string",
				"default": "px"
			},
			"mediaType": {
				"type": "string",
				"default": "icon"
			},
			"mediaAlign": {
				"type": "string",
				"default": "top"
			},
			"mediaImage": {
				"type": "array",
				"default": [
					{
						"url": "",
						"id": "",
						"alt": "",
						"width": "",
						"height": "",
						"maxWidth": "",
						"hoverAnimation": "none",
						"flipUrl": "",
						"flipId": "",
						"flipAlt": "",
						"flipWidth": "",
						"flipHeight": "",
						"subtype": "",
						"flipSubtype": ""
					}
				]
			},
			"mediaIcon": {
				"type": "array",
				"default": [
					{
						"icon": "fe_aperture",
						"size": 50,
						"width": 2,
						"title": "",
						"color": "#444444",
						"hoverColor": "#444444",
						"hoverAnimation": "none",
						"flipIcon": "",
						"tabletSize": "",
						"mobileSize": ""
					}
				]
			},
			"mediaStyle": {
				"type": "array",
				"default": [
					{
						"background": "transparent",
						"hoverBackground": "transparent",
						"border": "#444444",
						"hoverBorder": "#444444",
						"borderRadius": 0,
						"borderWidth": [
							0,
							0,
							0,
							0
						],
						"padding": [
							10,
							10,
							10,
							10
						],
						"margin": [
							0,
							15,
							0,
							15
						]
					}
				]
			},
			"displayTitle": {
				"type": "boolean",
				"default": true
			},
			"title": {
				"type": "array",
				"source": "children",
				"selector": "h1,h2,h3,h4,h5,h6",
				"default": "Title"
			},
			"titleColor": {
				"type": "string",
				"default": ""
			},
			"titleHoverColor": {
				"type": "string",
				"default": ""
			},
			"titleMinHeight": {
				"type": "array",
				"default": [
					"",
					"",
					""
				]
			},
			"titleFont": {
				"type": "array",
				"default": [
					{
						"level": 2,
						"size": [
							"",
							"",
							""
						],
						"sizeType": "px",
						"lineHeight": [
							"",
							"",
							""
						],
						"lineType": "px",
						"letterSpacing": "",
						"textTransform": "",
						"family": "",
						"google": false,
						"style": "",
						"weight": "",
						"variant": "",
						"subset": "",
						"loadGoogle": true,
						"padding": [
							0,
							0,
							0,
							0
						],
						"paddingControl": "linked",
						"margin": [
							5,
							0,
							10,
							0
						],
						"marginControl": "individual"
					}
				]
			},
			"displayText": {
				"type": "boolean",
				"default": true
			},
			"contentText": {
				"type": "array",
				"source": "children",
				"selector": "p",
				"default": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean diam dolor, accumsan sed rutrum vel, dapibus et leo."
			},
			"textColor": {
				"type": "string",
				"default": "#555555"
			},
			"textHoverColor": {
				"type": "string",
				"default": ""
			},
			"textMinHeight": {
				"type": "array",
				"default": [
					"",
					"",
					""
				]
			},
			"textFont": {
				"type": "array",
				"default": [
					{
						"size": [
							"",
							"",
							""
						],
						"sizeType": "px",
						"lineHeight": [
							"",
							"",
							""
						],
						"lineType": "px",
						"letterSpacing": "",
						"family": "",
						"google": "",
						"style": "",
						"weight": "",
						"variant": "",
						"subset": "",
						"loadGoogle": true,
						"textTransform": ""
					}
				]
			},
			"textSpacing": {
				"type": "array",
				"default": [
					{
						"padding": [
							"",
							"",
							"",
							""
						],
						"paddingControl": "linked",
						"margin": [
							"",
							"",
							"",
							""
						],
						"marginControl": "linked"
					}
				]
			},
			"displayLearnMore": {
				"type": "boolean",
				"default": false
			},
			"learnMore": {
				"type": "array",
				"source": "children",
				"selector": ".bst-blocks-info-box-learnmore",
				"default": "Learn More"
			},
			"learnMoreStyles": {
				"type": "array",
				"default": [
					{
						"size": [
							"",
							"",
							""
						],
						"sizeType": "px",
						"lineHeight": [
							"",
							"",
							""
						],
						"lineType": "px",
						"letterSpacing": "",
						"family": "",
						"google": "",
						"style": "",
						"weight": "",
						"variant": "",
						"subset": "",
						"loadGoogle": true,
						"padding": [
							4,
							8,
							4,
							8
						],
						"paddingControl": "individual",
						"margin": [
							10,
							0,
							10,
							0
						],
						"marginControl": "individual",
						"color": "",
						"background": "transparent",
						"border": "#555555",
						"borderRadius": 0,
						"borderWidth": [
							0,
							0,
							0,
							0
						],
						"borderControl": "linked",
						"colorHover": "#ffffff",
						"backgroundHover": "#444444",
						"borderHover": "#444444",
						"hoverEffect": "revealBorder",
						"paddingTablet": [
							"",
							"",
							"",
							""
						],
						"paddingMobile": [
							"",
							"",
							"",
							""
						],
						"paddingType": "px",
						"textTransform": ""
					}
				]
			},
			"displayShadow": {
				"type": "boolean",
				"default": false
			},
			"shadow": {
				"type": "array",
				"default": [
					{
						"color": "#000000",
						"opacity": 0,
						"spread": 0,
						"blur": 0,
						"hOffset": 0,
						"vOffset": 0
					}
				]
			},
			"shadowHover": {
				"type": "array",
				"default": [
					{
						"color": "#000000",
						"opacity": 0.2,
						"spread": 0,
						"blur": 14,
						"hOffset": 0,
						"vOffset": 0
					}
				]
			},
			"showPresets": {
				"type": "boolean",
				"default": true
			},
			"mediaVAlign": {
				"type": "string",
				"default": "middle"
			},
			"mediaAlignMobile": {
				"type": "string",
				"default": ""
			},
			"mediaAlignTablet": {
				"type": "string",
				"default": ""
			},
			"maxWidth": {
				"type": "number",
				"default": ""
			},
			"maxWidthUnit": {
				"type": "string",
				"default": "px"
			},
			"containerMargin": {
				"type": "array",
				"default": [
					"",
					"",
					"",
					""
				]
			},
			"containerMarginUnit": {
				"type": "string",
				"default": "px"
			},
			"linkNoFollow": {
				"type": "boolean",
				"default": false
			},
			"linkSponsored": {
				"type": "boolean",
				"default": false
			},
			"number": {
				"type": "array",
				"source": "children",
				"selector": "div.bst-blocks-info-box-number",
				"default": ""
			},
			"mediaNumber": {
				"type": "array",
				"default": [
					{
						"family": "",
						"google": false,
						"hoverAnimation": "none",
						"style": "",
						"weight": "",
						"variant": "",
						"subset": "",
						"loadGoogle": true
					}
				]
			},
			"imageRatio": {
				"type": "string",
				"default": "inherit"
			},
			"linkTitle": {
				"type": "string",
				"default": ""
			},
			"inQueryBlock": {
				"type": "boolean",
				"default": false
			}
		},
		save: ( { attributes } ) => {
			const { uniqueID, link, linkProperty, target, hAlign, mediaType, mediaImage, mediaIcon, mediaAlign, displayTitle, title, titleFont, displayText, contentText, displayLearnMore, learnMore, mediaVAlign, hAlignMobile, hAlignTablet, linkNoFollow, linkSponsored, mediaNumber, number, baseDynamic, className } = attributes;
			const titleTagName = 'h' + titleFont[ 0 ].level;
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
			const image = (
				<div className={ `base-info-box-image-inner-intrisic-container${ ( baseDynamic && baseDynamic['mediaImage:0:url'] && baseDynamic['mediaImage:0:url'].enable ? ' base-info-dynamic-image' : '' ) }` } style={ {
					maxWidth: mediaImage[ 0 ].maxWidth + 'px',
				} } >
					<div className={ `base-info-box-image-intrisic bst-info-animate-${ mediaImage[ 0 ].hoverAnimation }${ ( 'svg+xml' === mediaImage[ 0 ].subtype ? ' bsb-info-box-image-type-svg' : '' ) }` } style={ {
						paddingBottom: isNaN( mediaImage[ 0 ].height ) ? undefined : ( ( mediaImage[ 0 ].height / mediaImage[ 0 ].width ) * 100 ) + '%',
						height: isNaN( mediaImage[ 0 ].height ) ? undefined : 0,
						width: isNaN( mediaImage[ 0 ].width ) || 'svg+xml' === mediaImage[ 0 ].subtype ? mediaImage[ 0 ].maxWidth + 'px' : mediaImage[ 0 ].width + 'px',
						maxWidth: '100%',
					} } >
						<div className="base-info-box-image-inner-intrisic">
							<img
								src={ mediaImage[ 0 ].url }
								alt={ mediaImage[ 0 ].alt }
								width={ ( mediaImage[ 0 ].subtype && 'svg+xml' === mediaImage[ 0 ].subtype ? mediaImage[ 0 ].maxWidth : mediaImage[ 0 ].width ) }
								height={ mediaImage[ 0 ].height }
								className={ `${ ( mediaImage[ 0 ].id ? `bst-info-box-image wp-image-${ mediaImage[ 0 ].id }` : 'bst-info-box-image wp-image-offsite' ) } ${ ( mediaImage[ 0 ].subtype && 'svg+xml' === mediaImage[ 0 ].subtype ? ' bst-info-svg-image' : '' ) }` }
							/>
							{ mediaImage[ 0 ].flipUrl && 'flip' === mediaImage[ 0 ].hoverAnimation && (
								<img
									src={ mediaImage[ 0 ].flipUrl }
									alt={ mediaImage[ 0 ].flipAlt }
									width={ ( mediaImage[ 0 ].flipSubtype && 'svg+xml' === mediaImage[ 0 ].flipSubtype ? mediaImage[ 0 ].maxWidth : mediaImage[ 0 ].flipWidth ) }
									height={ mediaImage[ 0 ].flipHeight }
									className={ `${ ( mediaImage[ 0 ].flipId ? `bst-info-box-image-flip wp-image-${ mediaImage[ 0 ].flipId }` : 'bst-info-box-image-flip wp-image-offsite' ) } ${ ( mediaImage[ 0 ].flipSubtype && 'svg+xml' === mediaImage[ 0 ].flipSubtype ? ' bst-info-svg-image' : '' ) }` }
								/>
							) }
						</div>
					</div>
				</div>
			);
			const icon = (
				<div className={ `base-info-box-icon-container bst-info-icon-animate-${ mediaIcon[ 0 ].hoverAnimation }` } >
					<div className={ 'base-info-box-icon-inner-container' } >
						<IconRender className={ `bst-info-svg-icon bst-info-svg-icon-${ mediaIcon[ 0 ].icon }` } name={ mediaIcon[ 0 ].icon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
							display: 'block',
						} } />
						{ mediaIcon[ 0 ].flipIcon && 'flip' === mediaIcon[ 0 ].hoverAnimation && (
							<IconRender className={ `bst-info-svg-icon-flip bst-info-svg-icon-${ mediaIcon[ 0 ].flipIcon }` } name={ mediaIcon[ 0 ].flipIcon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
								display: 'block',
							} } />
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
			return (
				<div id={ `bst-info-box${ uniqueID }` } className={ className }>
					{ linkProperty !== 'learnmore' && (
						<a className={ `bst-blocks-info-box-link-wrap info-box-link bst-blocks-info-box-media-align-${ mediaAlign } bst-info-halign-${ hAlign }${ ( mediaVAlign && 'middle' !== mediaVAlign ? ' bsb-info-box-vertical-media-align-' + mediaVAlign : '' ) }${ ( hAlignTablet && '' !== hAlignTablet ? ' bsb-info-tablet-halign-' + hAlignTablet : '' ) }${ ( hAlignMobile && '' !== hAlignMobile ? ' bsb-info-mobile-halign-' + hAlignMobile : '' ) }` } target={ ( '_blank' === target ? target : undefined ) } rel={ relAttr } href={ link }>
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
						</a>
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
	},
	{
		attributes: {
			"uniqueID": {
				"type": "string",
				"default": ""
			},
			"link": {
				"type": "string",
				"source": "attribute",
				"attribute": "href",
				"selector": "a.info-box-link"
			},
			"linkProperty": {
				"type": "string",
				"default": "box"
			},
			"target": {
				"type": "string",
				"source": "attribute",
				"attribute": "target",
				"selector": "a.info-box-link",
				"default": "_self"
			},
			"hAlign": {
				"type": "string",
				"default": "center"
			},
			"hAlignTablet": {
				"type": "string",
				"default": ""
			},
			"hAlignMobile": {
				"type": "string",
				"default": ""
			},
			"containerBackground": {
				"type": "string",
				"default": "#f2f2f2"
			},
			"containerBackgroundOpacity": {
				"type": "number",
				"default": 1
			},
			"containerHoverBackground": {
				"type": "string",
				"default": "#f2f2f2"
			},
			"containerHoverBackgroundOpacity": {
				"type": "number",
				"default": 1
			},
			"containerBorder": {
				"type": "string",
				"default": "#eeeeee"
			},
			"containerBorderOpacity": {
				"type": "number",
				"default": 1
			},
			"containerHoverBorder": {
				"type": "string",
				"default": "#eeeeee"
			},
			"containerHoverBorderOpacity": {
				"type": "number",
				"default": 1
			},
			"containerBorderWidth": {
				"type": "array",
				"default": [
					0,
					0,
					0,
					0
				]
			},
			"containerBorderRadius": {
				"type": "number",
				"default": 0
			},
			"containerPadding": {
				"type": "array",
				"default": [
					20,
					20,
					20,
					20
				]
			},
			"containerTabletPadding": {
				"type": "array",
				"default": [
					"",
					"",
					"",
					""
				]
			},
			"containerMobilePadding": {
				"type": "array",
				"default": [
					"",
					"",
					"",
					""
				]
			},
			"containerPaddingType": {
				"type": "string",
				"default": "px"
			},
			"mediaType": {
				"type": "string",
				"default": "icon"
			},
			"mediaAlign": {
				"type": "string",
				"default": "top"
			},
			"mediaImage": {
				"type": "array",
				"default": [
					{
						"url": "",
						"id": "",
						"alt": "",
						"width": "",
						"height": "",
						"maxWidth": "",
						"hoverAnimation": "none",
						"flipUrl": "",
						"flipId": "",
						"flipAlt": "",
						"flipWidth": "",
						"flipHeight": "",
						"subtype": "",
						"flipSubtype": ""
					}
				]
			},
			"mediaIcon": {
				"type": "array",
				"default": [
					{
						"icon": "fe_aperture",
						"size": 50,
						"width": 2,
						"title": "",
						"color": "#444444",
						"hoverColor": "#444444",
						"hoverAnimation": "none",
						"flipIcon": "",
						"tabletSize": "",
						"mobileSize": ""
					}
				]
			},
			"mediaStyle": {
				"type": "array",
				"default": [
					{
						"background": "transparent",
						"hoverBackground": "transparent",
						"border": "#444444",
						"hoverBorder": "#444444",
						"borderRadius": 0,
						"borderWidth": [
							0,
							0,
							0,
							0
						],
						"padding": [
							10,
							10,
							10,
							10
						],
						"margin": [
							0,
							15,
							0,
							15
						]
					}
				]
			},
			"displayTitle": {
				"type": "boolean",
				"default": true
			},
			"title": {
				"type": "array",
				"source": "children",
				"selector": "h1,h2,h3,h4,h5,h6",
				"default": "Title"
			},
			"titleColor": {
				"type": "string",
				"default": ""
			},
			"titleHoverColor": {
				"type": "string",
				"default": ""
			},
			"titleMinHeight": {
				"type": "array",
				"default": [
					"",
					"",
					""
				]
			},
			"titleFont": {
				"type": "array",
				"default": [
					{
						"level": 2,
						"size": [
							"",
							"",
							""
						],
						"sizeType": "px",
						"lineHeight": [
							"",
							"",
							""
						],
						"lineType": "px",
						"letterSpacing": "",
						"textTransform": "",
						"family": "",
						"google": false,
						"style": "",
						"weight": "",
						"variant": "",
						"subset": "",
						"loadGoogle": true,
						"padding": [
							0,
							0,
							0,
							0
						],
						"paddingControl": "linked",
						"margin": [
							5,
							0,
							10,
							0
						],
						"marginControl": "individual"
					}
				]
			},
			"displayText": {
				"type": "boolean",
				"default": true
			},
			"contentText": {
				"type": "array",
				"source": "children",
				"selector": "p",
				"default": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean diam dolor, accumsan sed rutrum vel, dapibus et leo."
			},
			"textColor": {
				"type": "string",
				"default": "#555555"
			},
			"textHoverColor": {
				"type": "string",
				"default": ""
			},
			"textMinHeight": {
				"type": "array",
				"default": [
					"",
					"",
					""
				]
			},
			"textFont": {
				"type": "array",
				"default": [
					{
						"size": [
							"",
							"",
							""
						],
						"sizeType": "px",
						"lineHeight": [
							"",
							"",
							""
						],
						"lineType": "px",
						"letterSpacing": "",
						"family": "",
						"google": "",
						"style": "",
						"weight": "",
						"variant": "",
						"subset": "",
						"loadGoogle": true,
						"textTransform": ""
					}
				]
			},
			"textSpacing": {
				"type": "array",
				"default": [
					{
						"padding": [
							"",
							"",
							"",
							""
						],
						"paddingControl": "linked",
						"margin": [
							"",
							"",
							"",
							""
						],
						"marginControl": "linked"
					}
				]
			},
			"displayLearnMore": {
				"type": "boolean",
				"default": false
			},
			"learnMore": {
				"type": "array",
				"source": "children",
				"selector": ".bst-blocks-info-box-learnmore",
				"default": "Learn More"
			},
			"learnMoreStyles": {
				"type": "array",
				"default": [
					{
						"size": [
							"",
							"",
							""
						],
						"sizeType": "px",
						"lineHeight": [
							"",
							"",
							""
						],
						"lineType": "px",
						"letterSpacing": "",
						"family": "",
						"google": "",
						"style": "",
						"weight": "",
						"variant": "",
						"subset": "",
						"loadGoogle": true,
						"padding": [
							4,
							8,
							4,
							8
						],
						"paddingControl": "individual",
						"margin": [
							10,
							0,
							10,
							0
						],
						"marginControl": "individual",
						"color": "",
						"background": "transparent",
						"border": "#555555",
						"borderRadius": 0,
						"borderWidth": [
							0,
							0,
							0,
							0
						],
						"borderControl": "linked",
						"colorHover": "#ffffff",
						"backgroundHover": "#444444",
						"borderHover": "#444444",
						"hoverEffect": "revealBorder",
						"paddingTablet": [
							"",
							"",
							"",
							""
						],
						"paddingMobile": [
							"",
							"",
							"",
							""
						],
						"paddingType": "px",
						"textTransform": ""
					}
				]
			},
			"displayShadow": {
				"type": "boolean",
				"default": false
			},
			"shadow": {
				"type": "array",
				"default": [
					{
						"color": "#000000",
						"opacity": 0,
						"spread": 0,
						"blur": 0,
						"hOffset": 0,
						"vOffset": 0
					}
				]
			},
			"shadowHover": {
				"type": "array",
				"default": [
					{
						"color": "#000000",
						"opacity": 0.2,
						"spread": 0,
						"blur": 14,
						"hOffset": 0,
						"vOffset": 0
					}
				]
			},
			"showPresets": {
				"type": "boolean",
				"default": true
			},
			"mediaVAlign": {
				"type": "string",
				"default": "middle"
			},
			"mediaAlignMobile": {
				"type": "string",
				"default": ""
			},
			"mediaAlignTablet": {
				"type": "string",
				"default": ""
			},
			"maxWidth": {
				"type": "number",
				"default": ""
			},
			"maxWidthUnit": {
				"type": "string",
				"default": "px"
			},
			"containerMargin": {
				"type": "array",
				"default": [
					"",
					"",
					"",
					""
				]
			},
			"containerMarginUnit": {
				"type": "string",
				"default": "px"
			},
			"linkNoFollow": {
				"type": "boolean",
				"default": false
			},
			"linkSponsored": {
				"type": "boolean",
				"default": false
			},
			"number": {
				"type": "array",
				"source": "children",
				"selector": "div.bst-blocks-info-box-number",
				"default": ""
			},
			"mediaNumber": {
				"type": "array",
				"default": [
					{
						"family": "",
						"google": false,
						"hoverAnimation": "none",
						"style": "",
						"weight": "",
						"variant": "",
						"subset": "",
						"loadGoogle": true
					}
				]
			},
			"imageRatio": {
				"type": "string",
				"default": "inherit"
			},
			"linkTitle": {
				"type": "string",
				"default": ""
			},
			"inQueryBlock": {
				"type": "boolean",
				"default": false
			}
		},
		save: ( { attributes } ) => {
			const { uniqueID, link, linkProperty, target, hAlign, mediaType, mediaImage, mediaIcon, mediaAlign, displayTitle, title, titleFont, displayText, contentText, displayLearnMore, learnMore, mediaVAlign, hAlignMobile, hAlignTablet, linkNoFollow, linkSponsored, mediaNumber, number, className } = attributes;
			const titleTagName = 'h' + titleFont[ 0 ].level;
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
			const image = (
				<div className="base-info-box-image-inner-intrisic-container" style={ {
					maxWidth: mediaImage[ 0 ].maxWidth + 'px',
				} } >
					<div className={ `base-info-box-image-intrisic bst-info-animate-${ mediaImage[ 0 ].hoverAnimation }${ ( 'svg+xml' === mediaImage[ 0 ].subtype ? ' bsb-info-box-image-type-svg' : '' ) }` } style={ {
						paddingBottom: isNaN( mediaImage[ 0 ].height ) ? undefined : ( ( mediaImage[ 0 ].height / mediaImage[ 0 ].width ) * 100 ) + '%',
						height: isNaN( mediaImage[ 0 ].height ) ? undefined : 0,
						width: isNaN( mediaImage[ 0 ].width ) || 'svg+xml' === mediaImage[ 0 ].subtype ? mediaImage[ 0 ].maxWidth + 'px' : mediaImage[ 0 ].width + 'px',
						maxWidth: '100%',
					} } >
						<div className="base-info-box-image-inner-intrisic">
							<img
								src={ mediaImage[ 0 ].url }
								alt={ mediaImage[ 0 ].alt }
								width={ ( mediaImage[ 0 ].subtype && 'svg+xml' === mediaImage[ 0 ].subtype ? mediaImage[ 0 ].maxWidth : mediaImage[ 0 ].width ) }
								height={ mediaImage[ 0 ].height }
								className={ `${ ( mediaImage[ 0 ].id ? `bst-info-box-image wp-image-${ mediaImage[ 0 ].id }` : 'bst-info-box-image wp-image-offsite' ) } ${ ( mediaImage[ 0 ].subtype && 'svg+xml' === mediaImage[ 0 ].subtype ? ' bst-info-svg-image' : '' ) }` }
							/>
							{ mediaImage[ 0 ].flipUrl && 'flip' === mediaImage[ 0 ].hoverAnimation && (
								<img
									src={ mediaImage[ 0 ].flipUrl }
									alt={ mediaImage[ 0 ].flipAlt }
									width={ ( mediaImage[ 0 ].flipSubtype && 'svg+xml' === mediaImage[ 0 ].flipSubtype ? mediaImage[ 0 ].maxWidth : mediaImage[ 0 ].flipWidth ) }
									height={ mediaImage[ 0 ].flipHeight }
									className={ `${ ( mediaImage[ 0 ].flipId ? `bst-info-box-image-flip wp-image-${ mediaImage[ 0 ].flipId }` : 'bst-info-box-image-flip wp-image-offsite' ) } ${ ( mediaImage[ 0 ].flipSubtype && 'svg+xml' === mediaImage[ 0 ].flipSubtype ? ' bst-info-svg-image' : '' ) }` }
								/>
							) }
						</div>
					</div>
				</div>
			);
			const icon = (
				<div className={ `base-info-box-icon-container bst-info-icon-animate-${ mediaIcon[ 0 ].hoverAnimation }` } >
					<div className={ 'base-info-box-icon-inner-container' } >
						<IconRender className={ `bst-info-svg-icon bst-info-svg-icon-${ mediaIcon[ 0 ].icon }` } name={ mediaIcon[ 0 ].icon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
							display: 'block',
						} } />
						{ mediaIcon[ 0 ].flipIcon && 'flip' === mediaIcon[ 0 ].hoverAnimation && (
							<IconRender className={ `bst-info-svg-icon-flip bst-info-svg-icon-${ mediaIcon[ 0 ].flipIcon }` } name={ mediaIcon[ 0 ].flipIcon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
								display: 'block',
							} } />
						) }
					</div>
				</div>
			);
			const numberOut = (
				<div className={ `base-info-box-number-container bst-info-number-animate-${ mediaNumber[ 0 ].hoverAnimation ? mediaNumber[ 0 ].hoverAnimation : 'none' }` } >
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
						className="bst-blocks-info-box-learnmore"
						tagName={ 'a' }
						target={ ( '_blank' === target ? target : undefined ) }
						rel={ relAttr }
						value={ learnMore }
						href={ link }
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
			return (
				<div id={ `bst-info-box${ uniqueID }` } className={ className }>
					{ linkProperty !== 'learnmore' && (
						<a className={ `bst-blocks-info-box-link-wrap bst-blocks-info-box-media-align-${ mediaAlign } bst-info-halign-${ hAlign }${ ( mediaVAlign && 'middle' !== mediaVAlign ? ' bsb-info-box-vertical-media-align-' + mediaVAlign : '' ) }${ ( hAlignTablet && '' !== hAlignTablet ? ' bsb-info-tablet-halign-' + hAlignTablet : '' ) }${ ( hAlignMobile && '' !== hAlignMobile ? ' bsb-info-mobile-halign-' + hAlignMobile : '' ) }` } target={ ( '_blank' === target ? target : undefined ) } rel={ relAttr } href={ link }>
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
						</a>
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
	},
	{
		attributes: {
			uniqueID: {
				type: 'string',
				default: '',
			},
			link: {
				type: 'string',
				source: 'attribute',
				attribute: 'href',
				selector: 'a',
			},
			linkProperty: {
				type: 'string',
				default: 'box',
			},
			target: {
				type: 'string',
				source: 'attribute',
				attribute: 'target',
				selector: 'a',
				default: '_self',
			},
			hAlign: {
				type: 'string',
				default: 'center',
			},
			hAlignTablet: {
				type: 'string',
				default: '',
			},
			hAlignMobile: {
				type: 'string',
				default: '',
			},
			containerBackground: {
				type: 'string',
				default: '#f2f2f2',
			},
			containerBackgroundOpacity: {
				type: 'number',
				default: 1,
			},
			containerHoverBackground: {
				type: 'string',
				default: '#f2f2f2',
			},
			containerHoverBackgroundOpacity: {
				type: 'number',
				default: 1,
			},
			containerBorder: {
				type: 'string',
				default: '#eeeeee',
			},
			containerBorderOpacity: {
				type: 'number',
				default: 1,
			},
			containerHoverBorder: {
				type: 'string',
				default: '#eeeeee',
			},
			containerHoverBorderOpacity: {
				type: 'number',
				default: 1,
			},
			containerBorderWidth: {
				type: 'array',
				default: [ 0, 0, 0, 0 ],
			},
			containerBorderRadius: {
				type: 'number',
				default: 0,
			},
			containerPadding: {
				type: 'array',
				default: [ 20, 20, 20, 20 ],
			},
			mediaType: {
				type: 'string',
				default: 'icon',
			},
			mediaAlign: {
				type: 'string',
				default: 'top',
			},
			mediaImage: {
				type: 'array',
				default: [ {
					url: '',
					id: '',
					alt: '',
					width: '',
					height: '',
					maxWidth: '',
					hoverAnimation: 'none',
					flipUrl: '',
					flipId: '',
					flipAlt: '',
					flipWidth: '',
					flipHeight: '',
					subtype: '',
					flipSubtype: '',
				} ],
			},
			mediaIcon: {
				type: 'array',
				default: [ {
					icon: 'fe_aperture',
					size: 50,
					width: 2,
					title: '',
					color: '#444444',
					hoverColor: '#444444',
					hoverAnimation: 'none',
					flipIcon: '',
					tabletSize: '',
					mobileSize: '',
				} ],
			},
			mediaStyle: {
				type: 'array',
				default: [ {
					background: 'transparent',
					hoverBackground: 'transparent',
					border: '#444444',
					hoverBorder: '#444444',
					borderRadius: 0,
					borderWidth: [ 0, 0, 0, 0 ],
					padding: [ 10, 10, 10, 10 ],
					margin: [ 0, 15, 0, 15 ],
				} ],
			},
			displayTitle: {
				type: 'boolean',
				default: true,
			},
			title: {
				type: 'array',
				source: 'children',
				selector: 'h1,h2,h3,h4,h5,h6',
				default: __( 'Title' ),
			},
			titleColor: {
				type: 'string',
				default: '',
			},
			titleHoverColor: {
				type: 'string',
				default: '',
			},
			titleMinHeight: {
				type: 'array',
				default: [ '', '', '' ],
			},
			titleFont: {
				type: 'array',
				default: [ {
					level: 2,
					size: [ '', '', '' ],
					sizeType: 'px',
					lineHeight: [ '', '', '' ],
					lineType: 'px',
					letterSpacing: '',
					textTransform: '',
					family: '',
					google: false,
					style: '',
					weight: '',
					variant: '',
					subset: '',
					loadGoogle: true,
					padding: [ 0, 0, 0, 0 ],
					paddingControl: 'linked',
					margin: [ 5, 0, 10, 0 ],
					marginControl: 'individual',
				} ],
			},
			displayText: {
				type: 'boolean',
				default: true,
			},
			contentText: {
				type: 'array',
				source: 'children',
				selector: 'p',
				default: __( 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean diam dolor, accumsan sed rutrum vel, dapibus et leo.' ),
			},
			textColor: {
				type: 'string',
				default: '#555555',
			},
			textHoverColor: {
				type: 'string',
				default: '',
			},
			textMinHeight: {
				type: 'array',
				default: [ '', '', '' ],
			},
			textFont: {
				type: 'array',
				default: [ {
					size: [ '', '', '' ],
					sizeType: 'px',
					lineHeight: [ '', '', '' ],
					lineType: 'px',
					letterSpacing: '',
					family: '',
					google: '',
					style: '',
					weight: '',
					variant: '',
					subset: '',
					loadGoogle: true,
				} ],
			},
			textSpacing: {
				type: 'array',
				default: [ {
					padding: [ '', '', '', '' ],
					paddingControl: 'linked',
					margin: [ '', '', '', '' ],
					marginControl: 'linked',
				} ],
			},
			displayLearnMore: {
				type: 'boolean',
				default: false,
			},
			learnMore: {
				type: 'array',
				source: 'children',
				selector: '.bst-blocks-info-box-learnmore',
				default: __( 'Learn More' ),
			},
			learnMoreStyles: {
				type: 'array',
				default: [ {
					size: [ '', '', '' ],
					sizeType: 'px',
					lineHeight: [ '', '', '' ],
					lineType: 'px',
					letterSpacing: '',
					family: '',
					google: '',
					style: '',
					weight: '',
					variant: '',
					subset: '',
					loadGoogle: true,
					padding: [ 4, 8, 4, 8 ],
					paddingControl: 'individual',
					margin: [ 10, 0, 10, 0 ],
					marginControl: 'individual',
					color: '',
					background: 'transparent',
					border: '#555555',
					borderRadius: 0,
					borderWidth: [ 0, 0, 0, 0 ],
					borderControl: 'linked',
					colorHover: '#ffffff',
					backgroundHover: '#444444',
					borderHover: '#444444',
					hoverEffect: 'revealBorder',
				} ],
			},
			displayShadow: {
				type: 'boolean',
				default: false,
			},
			shadow: {
				type: 'array',
				default: [ {
					color: '#000000',
					opacity: 0,
					spread: 0,
					blur: 0,
					hOffset: 0,
					vOffset: 0,
				} ],
			},
			shadowHover: {
				type: 'array',
				default: [ {
					color: '#000000',
					opacity: 0.2,
					spread: 0,
					blur: 14,
					hOffset: 0,
					vOffset: 0,
				} ],
			},
			showPresets: {
				type: 'boolean',
				default: true,
			},
			mediaVAlign: {
				type: 'string',
				default: 'middle',
			},
			mediaAlignMobile: {
				type: 'string',
				default: '',
			},
			mediaAlignTablet: {
				type: 'string',
				default: '',
			},
			maxWidth: {
				type: 'number',
				default: '',
			},
			maxWidthUnit: {
				type: 'string',
				default: 'px',
			},
			containerMargin: {
				type: 'array',
				default: [ '', '', '', '' ],
			},
			containerMarginUnit: {
				type: 'string',
				default: 'px',
			},
			linkNoFollow: {
				type: 'boolean',
				default: false,
			},
			linkSponsored: {
				type: 'boolean',
				default: false,
			},
			number: {
				type: 'array',
				source: 'children',
				selector: 'div.bst-blocks-info-box-number',
				default: '',
			},
			mediaNumber: {
				type: 'array',
				default: [ {
					family: '',
					google: false,
					hoverAnimation: 'none',
					style: '',
					weight: '',
					variant: '',
					subset: '',
					loadGoogle: true,
				} ],
			},
		},
		save: ( { attributes } ) => {
			const { uniqueID, link, linkProperty, target, hAlign, mediaType, mediaImage, mediaIcon, mediaAlign, displayTitle, title, titleFont, displayText, contentText, displayLearnMore, learnMore, mediaVAlign, hAlignMobile, hAlignTablet, className } = attributes;
			const titleTagName = 'h' + titleFont[ 0 ].level;
			const image = (
				<div className="base-info-box-image-inner-intrisic-container" style={ {
					maxWidth: mediaImage[ 0 ].maxWidth + 'px',
				} } >
					<div className={ `base-info-box-image-intrisic bst-info-animate-${ mediaImage[ 0 ].hoverAnimation }${ ( 'svg+xml' === mediaImage[ 0 ].subtype ? ' bsb-info-box-image-type-svg' : '' ) }` } style={ {
						paddingBottom: isNaN( mediaImage[ 0 ].height ) ? undefined : ( ( mediaImage[ 0 ].height / mediaImage[ 0 ].width ) * 100 ) + '%',
						height: isNaN( mediaImage[ 0 ].height ) ? undefined : 0,
						width: isNaN( mediaImage[ 0 ].width ) || 'svg+xml' === mediaImage[ 0 ].subtype ? mediaImage[ 0 ].maxWidth + 'px' : mediaImage[ 0 ].width + 'px',
						maxWidth: '100%',
					} } >
						<div className="base-info-box-image-inner-intrisic">
							<img
								src={ mediaImage[ 0 ].url }
								alt={ mediaImage[ 0 ].alt }
								width={ ( mediaImage[ 0 ].subtype && 'svg+xml' === mediaImage[ 0 ].subtype ? mediaImage[ 0 ].maxWidth : mediaImage[ 0 ].width ) }
								height={ mediaImage[ 0 ].height }
								className={ `${ ( mediaImage[ 0 ].id ? `bst-info-box-image wp-image-${ mediaImage[ 0 ].id }` : 'bst-info-box-image wp-image-offsite' ) } ${ ( mediaImage[ 0 ].subtype && 'svg+xml' === mediaImage[ 0 ].subtype ? ' bst-info-svg-image' : '' ) }` }
							/>
							{ mediaImage[ 0 ].flipUrl && 'flip' === mediaImage[ 0 ].hoverAnimation && (
								<img
									src={ mediaImage[ 0 ].flipUrl }
									alt={ mediaImage[ 0 ].flipAlt }
									width={ ( mediaImage[ 0 ].flipSubtype && 'svg+xml' === mediaImage[ 0 ].flipSubtype ? mediaImage[ 0 ].maxWidth : mediaImage[ 0 ].flipWidth ) }
									height={ mediaImage[ 0 ].flipHeight }
									className={ `${ ( mediaImage[ 0 ].flipId ? `bst-info-box-image-flip wp-image-${ mediaImage[ 0 ].flipId }` : 'bst-info-box-image-flip wp-image-offsite' ) } ${ ( mediaImage[ 0 ].flipSubtype && 'svg+xml' === mediaImage[ 0 ].flipSubtype ? ' bst-info-svg-image' : '' ) }` }
								/>
							) }
						</div>
					</div>
				</div>
			);
			const icon = (
				<div className={ `base-info-box-icon-container bst-info-icon-animate-${ mediaIcon[ 0 ].hoverAnimation }` } >
					<div className={ 'base-info-box-icon-inner-container' } >
						<IconRender className={ `bst-info-svg-icon bst-info-svg-icon-${ mediaIcon[ 0 ].icon }` } name={ mediaIcon[ 0 ].icon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
							display: 'block',
						} } />
						{ mediaIcon[ 0 ].flipIcon && 'flip' === mediaIcon[ 0 ].hoverAnimation && (
							<IconRender className={ `bst-info-svg-icon-flip bst-info-svg-icon-${ mediaIcon[ 0 ].flipIcon }` } name={ mediaIcon[ 0 ].flipIcon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
								display: 'block',
							} } />
						) }
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
						className="bst-blocks-info-box-learnmore"
						tagName={ 'a' }
						target={ ( '_blank' === target ? target : undefined ) }
						rel={ ( '_blank' === target ? 'noopener noreferrer' : undefined ) }
						value={ learnMore }
						href={ link }
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
			return (
				<div id={ `bst-info-box${ uniqueID }` } className={ className }>
					{ linkProperty !== 'learnmore' && (
						<a className={ `bst-blocks-info-box-link-wrap bst-blocks-info-box-media-align-${ mediaAlign } bst-info-halign-${ hAlign }${ ( mediaVAlign && 'middle' !== mediaVAlign ? ' bsb-info-box-vertical-media-align-' + mediaVAlign : '' ) }${ ( hAlignTablet && '' !== hAlignTablet ? ' bsb-info-tablet-halign-' + hAlignTablet : '' ) }${ ( hAlignMobile && '' !== hAlignMobile ? ' bsb-info-mobile-halign-' + hAlignMobile : '' ) }` } target={ ( '_blank' === target ? target : undefined ) } rel={ ( '_blank' === target ? 'noopener noreferrer' : undefined ) } href={ link }>
							{ 'none' !== mediaType && (
								<div className={ 'bst-blocks-info-box-media-container' }>
									<div className={ `bst-blocks-info-box-media bst-info-media-animate-${ 'image' === mediaType ? mediaImage[ 0 ].hoverAnimation : mediaIcon[ 0 ].hoverAnimation }` }>
										{ mediaImage[ 0 ].url && 'image' === mediaType && (
											image
										) }
										{ 'icon' === mediaType && (
											icon
										) }
									</div>
								</div>
							) }
							{ textOutput }
						</a>
					) }
					{ linkProperty === 'learnmore' && (
						<div className={ `bst-blocks-info-box-link-wrap bst-blocks-info-box-media-align-${ mediaAlign } bst-info-halign-${ hAlign }${ ( mediaVAlign && 'middle' !== mediaVAlign ? ' bsb-info-box-vertical-media-align-' + mediaVAlign : '' ) }` }>
							<div className={ 'bst-blocks-info-box-media-container' }>
								<div className={ `bst-blocks-info-box-media bst-info-media-animate-${ 'image' === mediaType ? mediaImage[ 0 ].hoverAnimation : mediaIcon[ 0 ].hoverAnimation }` }>
									{ mediaImage[ 0 ].url && 'image' === mediaType && (
										image
									) }
									{ 'icon' === mediaType && (
										icon
									) }
								</div>
							</div>
							{ textOutput }
						</div>
					) }
				</div>
			);
		},
	},
	{
		attributes: {
			uniqueID: {
				type: 'string',
				default: '',
			},
			link: {
				type: 'string',
				source: 'attribute',
				attribute: 'href',
				selector: 'a',
			},
			linkProperty: {
				type: 'string',
				default: 'box',
			},
			target: {
				type: 'string',
				source: 'attribute',
				attribute: 'target',
				selector: 'a',
				default: '_self',
			},
			hAlign: {
				type: 'string',
				default: 'center',
			},
			hAlignTablet: {
				type: 'string',
				default: '',
			},
			hAlignMobile: {
				type: 'string',
				default: '',
			},
			containerBackground: {
				type: 'string',
				default: '#f2f2f2',
			},
			containerBackgroundOpacity: {
				type: 'number',
				default: 1,
			},
			containerHoverBackground: {
				type: 'string',
				default: '#f2f2f2',
			},
			containerHoverBackgroundOpacity: {
				type: 'number',
				default: 1,
			},
			containerBorder: {
				type: 'string',
				default: '#eeeeee',
			},
			containerBorderOpacity: {
				type: 'number',
				default: 1,
			},
			containerHoverBorder: {
				type: 'string',
				default: '#eeeeee',
			},
			containerHoverBorderOpacity: {
				type: 'number',
				default: 1,
			},
			containerBorderWidth: {
				type: 'array',
				default: [ 0, 0, 0, 0 ],
			},
			containerBorderRadius: {
				type: 'number',
				default: 0,
			},
			containerPadding: {
				type: 'array',
				default: [ 20, 20, 20, 20 ],
			},
			mediaType: {
				type: 'string',
				default: 'icon',
			},
			mediaAlign: {
				type: 'string',
				default: 'top',
			},
			mediaImage: {
				type: 'array',
				default: [ {
					url: '',
					id: '',
					alt: '',
					width: '',
					height: '',
					maxWidth: '',
					hoverAnimation: 'none',
					flipUrl: '',
					flipId: '',
					flipAlt: '',
					flipWidth: '',
					flipHeight: '',
					subtype: '',
					flipSubtype: '',
				} ],
			},
			mediaIcon: {
				type: 'array',
				default: [ {
					icon: 'fe_aperture',
					size: 50,
					width: 2,
					title: '',
					color: '#444444',
					hoverColor: '#444444',
					hoverAnimation: 'none',
					flipIcon: '',
					tabletSize: '',
					mobileSize: '',
				} ],
			},
			mediaStyle: {
				type: 'array',
				default: [ {
					background: 'transparent',
					hoverBackground: 'transparent',
					border: '#444444',
					hoverBorder: '#444444',
					borderRadius: 0,
					borderWidth: [ 0, 0, 0, 0 ],
					padding: [ 10, 10, 10, 10 ],
					margin: [ 0, 15, 0, 15 ],
				} ],
			},
			displayTitle: {
				type: 'boolean',
				default: true,
			},
			title: {
				type: 'array',
				source: 'children',
				selector: 'h1,h2,h3,h4,h5,h6',
				default: __( 'Title' ),
			},
			titleColor: {
				type: 'string',
				default: '',
			},
			titleHoverColor: {
				type: 'string',
				default: '',
			},
			titleMinHeight: {
				type: 'array',
				default: [ '', '', '' ],
			},
			titleFont: {
				type: 'array',
				default: [ {
					level: 2,
					size: [ '', '', '' ],
					sizeType: 'px',
					lineHeight: [ '', '', '' ],
					lineType: 'px',
					letterSpacing: '',
					textTransform: '',
					family: '',
					google: false,
					style: '',
					weight: '',
					variant: '',
					subset: '',
					loadGoogle: true,
					padding: [ 0, 0, 0, 0 ],
					paddingControl: 'linked',
					margin: [ 5, 0, 10, 0 ],
					marginControl: 'individual',
				} ],
			},
			displayText: {
				type: 'boolean',
				default: true,
			},
			contentText: {
				type: 'array',
				source: 'children',
				selector: 'p',
				default: __( 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean diam dolor, accumsan sed rutrum vel, dapibus et leo.' ),
			},
			textColor: {
				type: 'string',
				default: '#555555',
			},
			textHoverColor: {
				type: 'string',
				default: '',
			},
			textMinHeight: {
				type: 'array',
				default: [ '', '', '' ],
			},
			textFont: {
				type: 'array',
				default: [ {
					size: [ '', '', '' ],
					sizeType: 'px',
					lineHeight: [ '', '', '' ],
					lineType: 'px',
					letterSpacing: '',
					family: '',
					google: '',
					style: '',
					weight: '',
					variant: '',
					subset: '',
					loadGoogle: true,
				} ],
			},
			textSpacing: {
				type: 'array',
				default: [ {
					padding: [ '', '', '', '' ],
					paddingControl: 'linked',
					margin: [ '', '', '', '' ],
					marginControl: 'linked',
				} ],
			},
			displayLearnMore: {
				type: 'boolean',
				default: false,
			},
			learnMore: {
				type: 'array',
				source: 'children',
				selector: '.bst-blocks-info-box-learnmore',
				default: __( 'Learn More' ),
			},
			learnMoreStyles: {
				type: 'array',
				default: [ {
					size: [ '', '', '' ],
					sizeType: 'px',
					lineHeight: [ '', '', '' ],
					lineType: 'px',
					letterSpacing: '',
					family: '',
					google: '',
					style: '',
					weight: '',
					variant: '',
					subset: '',
					loadGoogle: true,
					padding: [ 4, 8, 4, 8 ],
					paddingControl: 'individual',
					margin: [ 10, 0, 10, 0 ],
					marginControl: 'individual',
					color: '',
					background: 'transparent',
					border: '#555555',
					borderRadius: 0,
					borderWidth: [ 0, 0, 0, 0 ],
					borderControl: 'linked',
					colorHover: '#ffffff',
					backgroundHover: '#444444',
					borderHover: '#444444',
					hoverEffect: 'revealBorder',
				} ],
			},
			displayShadow: {
				type: 'boolean',
				default: false,
			},
			shadow: {
				type: 'array',
				default: [ {
					color: '#000000',
					opacity: 0,
					spread: 0,
					blur: 0,
					hOffset: 0,
					vOffset: 0,
				} ],
			},
			shadowHover: {
				type: 'array',
				default: [ {
					color: '#000000',
					opacity: 0.2,
					spread: 0,
					blur: 14,
					hOffset: 0,
					vOffset: 0,
				} ],
			},
			showPresets: {
				type: 'boolean',
				default: true,
			},
			mediaVAlign: {
				type: 'string',
				default: 'middle',
			},
			mediaAlignMobile: {
				type: 'string',
				default: '',
			},
			mediaAlignTablet: {
				type: 'string',
				default: '',
			},
			maxWidth: {
				type: 'number',
				default: '',
			},
			maxWidthUnit: {
				type: 'string',
				default: 'px',
			},
			containerMargin: {
				type: 'array',
				default: [ '', '', '', '' ],
			},
			containerMarginUnit: {
				type: 'string',
				default: 'px',
			},
			linkNoFollow: {
				type: 'boolean',
				default: false,
			},
			linkSponsored: {
				type: 'boolean',
				default: false,
			},
			number: {
				type: 'array',
				source: 'children',
				selector: 'div.bst-blocks-info-box-number',
				default: '',
			},
			mediaNumber: {
				type: 'array',
				default: [ {
					family: '',
					google: false,
					hoverAnimation: 'none',
					style: '',
					weight: '',
					variant: '',
					subset: '',
					loadGoogle: true,
				} ],
			},
		},
		save: ( { attributes } ) => {
			const { uniqueID, link, linkProperty, target, hAlign, mediaType, mediaImage, mediaIcon, mediaAlign, displayTitle, title, titleFont, displayText, contentText, displayLearnMore, learnMore, mediaVAlign, className } = attributes;
			const titleTagName = 'h' + titleFont[ 0 ].level;
			return (
				<div id={ `bst-info-box${ uniqueID }` } className={ className }>
					{ linkProperty !== 'learnmore' && (
						<a className={ `bst-blocks-info-box-link-wrap bst-blocks-info-box-media-align-${ mediaAlign } bst-info-halign-${ hAlign }${ ( mediaVAlign && 'middle' !== mediaVAlign ? ' bsb-info-box-vertical-media-align-' + mediaVAlign : '' ) }` } target={ ( '_blank' === target ? target : undefined ) } rel={ ( '_blank' === target ? 'noopener noreferrer' : undefined ) } href={ link }>
							<div className={ 'bst-blocks-info-box-media-container' }>
								<div className={ `bst-blocks-info-box-media bst-info-media-animate-${ 'image' === mediaType ? mediaImage[ 0 ].hoverAnimation : mediaIcon[ 0 ].hoverAnimation }` }>
									{ mediaImage[ 0 ].url && 'image' === mediaType && (
										<div className="base-info-box-image-inner-intrisic-container" style={ {
											maxWidth: mediaImage[ 0 ].maxWidth + 'px',
										} } >
											<div className={ `base-info-box-image-intrisic bst-info-animate-${ mediaImage[ 0 ].hoverAnimation }${ ( 'svg+xml' === mediaImage[ 0 ].subtype ? ' bsb-info-box-image-type-svg' : '' ) }` } style={ {
												paddingBottom: isNaN( mediaImage[ 0 ].height ) ? undefined : ( ( mediaImage[ 0 ].height / mediaImage[ 0 ].width ) * 100 ) + '%',
												width: isNaN( mediaImage[ 0 ].height ) ? undefined : mediaImage[ 0 ].width + 'px',
												maxWidth: isNaN( mediaImage[ 0 ].height ) ? undefined : '100%',
											} } >
												<div className="base-info-box-image-inner-intrisic">
													<img
														src={ mediaImage[ 0 ].url }
														alt={ mediaImage[ 0 ].alt }
														width={ ( mediaImage[ 0 ].subtype && 'svg+xml' === mediaImage[ 0 ].subtype ? mediaImage[ 0 ].maxWidth : mediaImage[ 0 ].width ) }
														height={ mediaImage[ 0 ].height }
														className={ `${ ( mediaImage[ 0 ].id ? `bst-info-box-image wp-image-${ mediaImage[ 0 ].id }` : 'bst-info-box-image wp-image-offsite' ) } ${ ( mediaImage[ 0 ].subtype && 'svg+xml' === mediaImage[ 0 ].subtype ? ' bst-info-svg-image' : '' ) }` }
													/>
													{ mediaImage[ 0 ].flipUrl && 'flip' === mediaImage[ 0 ].hoverAnimation && (
														<img
															src={ mediaImage[ 0 ].flipUrl }
															alt={ mediaImage[ 0 ].flipAlt }
															width={ ( mediaImage[ 0 ].flipSubtype && 'svg+xml' === mediaImage[ 0 ].flipSubtype ? mediaImage[ 0 ].maxWidth : mediaImage[ 0 ].flipWidth ) }
															height={ mediaImage[ 0 ].flipHeight }
															className={ `${ ( mediaImage[ 0 ].flipId ? `bst-info-box-image-flip wp-image-${ mediaImage[ 0 ].flipId }` : 'bst-info-box-image-flip wp-image-offsite' ) } ${ ( mediaImage[ 0 ].flipSubtype && 'svg+xml' === mediaImage[ 0 ].flipSubtype ? ' bst-info-svg-image' : '' ) }` }
														/>
													) }
												</div>
											</div>
										</div>
									) }
									{ 'icon' === mediaType && (
										<div className={ `base-info-box-icon-container bst-info-icon-animate-${ mediaIcon[ 0 ].hoverAnimation }` } >
											<div className={ 'base-info-box-icon-inner-container' } >
												<IconRender className={ `bst-info-svg-icon bst-info-svg-icon-${ mediaIcon[ 0 ].icon }` } name={ mediaIcon[ 0 ].icon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
													display: 'block',
												} } />
												{ mediaIcon[ 0 ].flipIcon && 'flip' === mediaIcon[ 0 ].hoverAnimation && (
													<IconRender className={ `bst-info-svg-icon-flip bst-info-svg-icon-${ mediaIcon[ 0 ].flipIcon }` } name={ mediaIcon[ 0 ].flipIcon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
														display: 'block',
													} } />
												) }
											</div>
										</div>
									) }
								</div>
							</div>
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
								{ displayLearnMore && (
									<div className="bst-blocks-info-box-learnmore-wrap">
										<RichText.Content
											className="bst-blocks-info-box-learnmore"
											tagName={ 'span' }
											value={ learnMore }
										/>
									</div>
								) }
							</div>
						</a>
					) }
					{ linkProperty === 'learnmore' && (
						<div className={ `bst-blocks-info-box-link-wrap bst-blocks-info-box-media-align-${ mediaAlign } bst-info-halign-${ hAlign }${ ( mediaVAlign && 'middle' !== mediaVAlign ? ' bsb-info-box-vertical-media-align-' + mediaVAlign : '' ) }` }>
							<div className={ 'bst-blocks-info-box-media-container' }>
								<div className={ `bst-blocks-info-box-media bst-info-media-animate-${ 'image' === mediaType ? mediaImage[ 0 ].hoverAnimation : mediaIcon[ 0 ].hoverAnimation }` }>
									{ mediaImage[ 0 ].url && 'image' === mediaType && (
										<div className="base-info-box-image-inner-intrisic-container" style={ {
											maxWidth: mediaImage[ 0 ].maxWidth + 'px',
										} } >
											<div className={ `base-info-box-image-intrisic bst-info-animate-${ mediaImage[ 0 ].hoverAnimation }` } style={ {
												paddingBottom: ( ( mediaImage[ 0 ].height / mediaImage[ 0 ].width ) * 100 ) + '%',
											} } >
												<div className="base-info-box-image-inner-intrisic">
													<img
														src={ mediaImage[ 0 ].url }
														alt={ mediaImage[ 0 ].alt }
														width={ mediaImage[ 0 ].width }
														height={ mediaImage[ 0 ].height }
														className={ mediaImage[ 0 ].id ? `bst-info-box-image wp-image-${ mediaImage[ 0 ].id }` : 'bst-info-box-image wp-image-offsite' }
													/>
													{ mediaImage[ 0 ].flipUrl && 'flip' === mediaImage[ 0 ].hoverAnimation && (
														<img
															src={ mediaImage[ 0 ].flipUrl }
															alt={ mediaImage[ 0 ].flipAlt }
															width={ mediaImage[ 0 ].flipWidth }
															height={ mediaImage[ 0 ].flipHeight }
															className={ mediaImage[ 0 ].flipId ? `bst-info-box-image-flip wp-image-${ mediaImage[ 0 ].flipId }` : 'bst-info-box-image-flip wp-image-offsite' }
														/>
													) }
												</div>
											</div>
										</div>
									) }
									{ 'icon' === mediaType && (
										<div className={ `base-info-box-icon-container bst-info-icon-animate-${ mediaIcon[ 0 ].hoverAnimation }` } >
											<div className={ 'base-info-box-icon-inner-container' } >
												<IconRender className={ `bst-info-svg-icon bst-info-svg-icon-${ mediaIcon[ 0 ].icon }` } name={ mediaIcon[ 0 ].icon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
													display: 'block',
												} } />
												{ mediaIcon[ 0 ].flipIcon && 'flip' === mediaIcon[ 0 ].hoverAnimation && (
													<IconRender className={ `bst-info-svg-icon-flip bst-info-svg-icon-${ mediaIcon[ 0 ].flipIcon }` } name={ mediaIcon[ 0 ].flipIcon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
														display: 'block',
													} } />
												) }
											</div>
										</div>
									) }
								</div>
							</div>
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
								{ displayLearnMore && (
									<div className="bst-blocks-info-box-learnmore-wrap">
										<RichText.Content
											className="bst-blocks-info-box-learnmore"
											tagName={ 'a' }
											target={ ( '_blank' === target ? target : undefined ) }
											rel={ ( '_blank' === target ? 'noopener noreferrer' : undefined ) }
											value={ learnMore }
											href={ link }
										/>
									</div>
								) }
							</div>
						</div>
					) }
				</div>
			);
		},
	},
	{
		attributes: {
			uniqueID: {
				type: 'string',
				default: '',
			},
			link: {
				type: 'string',
				source: 'attribute',
				attribute: 'href',
				selector: 'a',
			},
			linkProperty: {
				type: 'string',
				default: 'box',
			},
			target: {
				type: 'string',
				source: 'attribute',
				attribute: 'target',
				selector: 'a',
				default: '_self',
			},
			hAlign: {
				type: 'string',
				default: 'center',
			},
			hAlignTablet: {
				type: 'string',
				default: '',
			},
			hAlignMobile: {
				type: 'string',
				default: '',
			},
			containerBackground: {
				type: 'string',
				default: '#f2f2f2',
			},
			containerBackgroundOpacity: {
				type: 'number',
				default: 1,
			},
			containerHoverBackground: {
				type: 'string',
				default: '#f2f2f2',
			},
			containerHoverBackgroundOpacity: {
				type: 'number',
				default: 1,
			},
			containerBorder: {
				type: 'string',
				default: '#eeeeee',
			},
			containerBorderOpacity: {
				type: 'number',
				default: 1,
			},
			containerHoverBorder: {
				type: 'string',
				default: '#eeeeee',
			},
			containerHoverBorderOpacity: {
				type: 'number',
				default: 1,
			},
			containerBorderWidth: {
				type: 'array',
				default: [ 0, 0, 0, 0 ],
			},
			containerBorderRadius: {
				type: 'number',
				default: 0,
			},
			containerPadding: {
				type: 'array',
				default: [ 20, 20, 20, 20 ],
			},
			mediaType: {
				type: 'string',
				default: 'icon',
			},
			mediaAlign: {
				type: 'string',
				default: 'top',
			},
			mediaImage: {
				type: 'array',
				default: [ {
					url: '',
					id: '',
					alt: '',
					width: '',
					height: '',
					maxWidth: '',
					hoverAnimation: 'none',
					flipUrl: '',
					flipId: '',
					flipAlt: '',
					flipWidth: '',
					flipHeight: '',
					subtype: '',
					flipSubtype: '',
				} ],
			},
			mediaIcon: {
				type: 'array',
				default: [ {
					icon: 'fe_aperture',
					size: 50,
					width: 2,
					title: '',
					color: '#444444',
					hoverColor: '#444444',
					hoverAnimation: 'none',
					flipIcon: '',
					tabletSize: '',
					mobileSize: '',
				} ],
			},
			mediaStyle: {
				type: 'array',
				default: [ {
					background: 'transparent',
					hoverBackground: 'transparent',
					border: '#444444',
					hoverBorder: '#444444',
					borderRadius: 0,
					borderWidth: [ 0, 0, 0, 0 ],
					padding: [ 10, 10, 10, 10 ],
					margin: [ 0, 15, 0, 15 ],
				} ],
			},
			displayTitle: {
				type: 'boolean',
				default: true,
			},
			title: {
				type: 'array',
				source: 'children',
				selector: 'h1,h2,h3,h4,h5,h6',
				default: __( 'Title' ),
			},
			titleColor: {
				type: 'string',
				default: '',
			},
			titleHoverColor: {
				type: 'string',
				default: '',
			},
			titleMinHeight: {
				type: 'array',
				default: [ '', '', '' ],
			},
			titleFont: {
				type: 'array',
				default: [ {
					level: 2,
					size: [ '', '', '' ],
					sizeType: 'px',
					lineHeight: [ '', '', '' ],
					lineType: 'px',
					letterSpacing: '',
					textTransform: '',
					family: '',
					google: false,
					style: '',
					weight: '',
					variant: '',
					subset: '',
					loadGoogle: true,
					padding: [ 0, 0, 0, 0 ],
					paddingControl: 'linked',
					margin: [ 5, 0, 10, 0 ],
					marginControl: 'individual',
				} ],
			},
			displayText: {
				type: 'boolean',
				default: true,
			},
			contentText: {
				type: 'array',
				source: 'children',
				selector: 'p',
				default: __( 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean diam dolor, accumsan sed rutrum vel, dapibus et leo.' ),
			},
			textColor: {
				type: 'string',
				default: '#555555',
			},
			textHoverColor: {
				type: 'string',
				default: '',
			},
			textMinHeight: {
				type: 'array',
				default: [ '', '', '' ],
			},
			textFont: {
				type: 'array',
				default: [ {
					size: [ '', '', '' ],
					sizeType: 'px',
					lineHeight: [ '', '', '' ],
					lineType: 'px',
					letterSpacing: '',
					family: '',
					google: '',
					style: '',
					weight: '',
					variant: '',
					subset: '',
					loadGoogle: true,
				} ],
			},
			textSpacing: {
				type: 'array',
				default: [ {
					padding: [ '', '', '', '' ],
					paddingControl: 'linked',
					margin: [ '', '', '', '' ],
					marginControl: 'linked',
				} ],
			},
			displayLearnMore: {
				type: 'boolean',
				default: false,
			},
			learnMore: {
				type: 'array',
				source: 'children',
				selector: '.bst-blocks-info-box-learnmore',
				default: __( 'Learn More' ),
			},
			learnMoreStyles: {
				type: 'array',
				default: [ {
					size: [ '', '', '' ],
					sizeType: 'px',
					lineHeight: [ '', '', '' ],
					lineType: 'px',
					letterSpacing: '',
					family: '',
					google: '',
					style: '',
					weight: '',
					variant: '',
					subset: '',
					loadGoogle: true,
					padding: [ 4, 8, 4, 8 ],
					paddingControl: 'individual',
					margin: [ 10, 0, 10, 0 ],
					marginControl: 'individual',
					color: '',
					background: 'transparent',
					border: '#555555',
					borderRadius: 0,
					borderWidth: [ 0, 0, 0, 0 ],
					borderControl: 'linked',
					colorHover: '#ffffff',
					backgroundHover: '#444444',
					borderHover: '#444444',
					hoverEffect: 'revealBorder',
				} ],
			},
			displayShadow: {
				type: 'boolean',
				default: false,
			},
			shadow: {
				type: 'array',
				default: [ {
					color: '#000000',
					opacity: 0,
					spread: 0,
					blur: 0,
					hOffset: 0,
					vOffset: 0,
				} ],
			},
			shadowHover: {
				type: 'array',
				default: [ {
					color: '#000000',
					opacity: 0.2,
					spread: 0,
					blur: 14,
					hOffset: 0,
					vOffset: 0,
				} ],
			},
			showPresets: {
				type: 'boolean',
				default: true,
			},
			mediaVAlign: {
				type: 'string',
				default: 'middle',
			},
			mediaAlignMobile: {
				type: 'string',
				default: '',
			},
			mediaAlignTablet: {
				type: 'string',
				default: '',
			},
			maxWidth: {
				type: 'number',
				default: '',
			},
			maxWidthUnit: {
				type: 'string',
				default: 'px',
			},
			containerMargin: {
				type: 'array',
				default: [ '', '', '', '' ],
			},
			containerMarginUnit: {
				type: 'string',
				default: 'px',
			},
			linkNoFollow: {
				type: 'boolean',
				default: false,
			},
			linkSponsored: {
				type: 'boolean',
				default: false,
			},
			number: {
				type: 'array',
				source: 'children',
				selector: 'div.bst-blocks-info-box-number',
				default: '',
			},
			mediaNumber: {
				type: 'array',
				default: [ {
					family: '',
					google: false,
					hoverAnimation: 'none',
					style: '',
					weight: '',
					variant: '',
					subset: '',
					loadGoogle: true,
				} ],
			},
		},
		save: ( { attributes } ) => {
			const { uniqueID, link, linkProperty, target, hAlign, mediaType, mediaImage, mediaIcon, mediaAlign, displayTitle, title, titleFont, displayText, contentText, displayLearnMore, learnMore, className } = attributes;
			const titleTagName = 'h' + titleFont[ 0 ].level;
			return (
				<div id={ `bst-info-box${ uniqueID }` } className={ className }>
					{ linkProperty !== 'learnmore' && (
						<a className={ `bst-blocks-info-box-link-wrap bst-blocks-info-box-media-align-${ mediaAlign } bst-info-halign-${ hAlign }` } target={ ( '_blank' === target ? target : undefined ) } rel={ ( '_blank' === target ? 'noopener noreferrer' : undefined ) } href={ link }>
							<div className={ `bst-blocks-info-box-media bst-info-media-animate-${ 'image' === mediaType ? mediaImage[ 0 ].hoverAnimation : mediaIcon[ 0 ].hoverAnimation }` }>
								{ mediaImage[ 0 ].url && 'image' === mediaType && (
									<div className="base-info-box-image-inner-intrisic-container" style={ {
										maxWidth: mediaImage[ 0 ].maxWidth + 'px',
									} } >
										<div className={ `base-info-box-image-intrisic bst-info-animate-${ mediaImage[ 0 ].hoverAnimation }${ ( 'svg+xml' === mediaImage[ 0 ].subtype ? ' bsb-info-box-image-type-svg' : '' ) }` } style={ {
											paddingBottom: isNaN( mediaImage[ 0 ].height ) ? undefined : ( ( mediaImage[ 0 ].height / mediaImage[ 0 ].width ) * 100 ) + '%',
											width: isNaN( mediaImage[ 0 ].height ) ? undefined : mediaImage[ 0 ].width + 'px',
											maxWidth: isNaN( mediaImage[ 0 ].height ) ? undefined : '100%',
										} } >
											<div className="base-info-box-image-inner-intrisic">
												<img
													src={ mediaImage[ 0 ].url }
													alt={ mediaImage[ 0 ].alt }
													width={ ( mediaImage[ 0 ].subtype && 'svg+xml' === mediaImage[ 0 ].subtype ? mediaImage[ 0 ].maxWidth : mediaImage[ 0 ].width ) }
													height={ mediaImage[ 0 ].height }
													className={ `${ ( mediaImage[ 0 ].id ? `bst-info-box-image wp-image-${ mediaImage[ 0 ].id }` : 'bst-info-box-image wp-image-offsite' ) } ${ ( mediaImage[ 0 ].subtype && 'svg+xml' === mediaImage[ 0 ].subtype ? ' bst-info-svg-image' : '' ) }` }
												/>
												{ mediaImage[ 0 ].flipUrl && 'flip' === mediaImage[ 0 ].hoverAnimation && (
													<img
														src={ mediaImage[ 0 ].flipUrl }
														alt={ mediaImage[ 0 ].flipAlt }
														width={ ( mediaImage[ 0 ].flipSubtype && 'svg+xml' === mediaImage[ 0 ].flipSubtype ? mediaImage[ 0 ].maxWidth : mediaImage[ 0 ].flipWidth ) }
														height={ mediaImage[ 0 ].flipHeight }
														className={ `${ ( mediaImage[ 0 ].flipId ? `bst-info-box-image-flip wp-image-${ mediaImage[ 0 ].flipId }` : 'bst-info-box-image-flip wp-image-offsite' ) } ${ ( mediaImage[ 0 ].flipSubtype && 'svg+xml' === mediaImage[ 0 ].flipSubtype ? ' bst-info-svg-image' : '' ) }` }
													/>
												) }
											</div>
										</div>
									</div>
								) }
								{ 'icon' === mediaType && (
									<div className={ `base-info-box-icon-container bst-info-icon-animate-${ mediaIcon[ 0 ].hoverAnimation }` } >
										<div className={ 'base-info-box-icon-inner-container' } >
											<IconRender className={ `bst-info-svg-icon bst-info-svg-icon-${ mediaIcon[ 0 ].icon }` } name={ mediaIcon[ 0 ].icon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
												display: 'block',
											} } />
											{ mediaIcon[ 0 ].flipIcon && 'flip' === mediaIcon[ 0 ].hoverAnimation && (
												<IconRender className={ `bst-info-svg-icon-flip bst-info-svg-icon-${ mediaIcon[ 0 ].flipIcon }` } name={ mediaIcon[ 0 ].flipIcon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
													display: 'block',
												} } />
											) }
										</div>
									</div>
								) }
							</div>
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
								{ displayLearnMore && (
									<div className="bst-blocks-info-box-learnmore-wrap">
										<RichText.Content
											className="bst-blocks-info-box-learnmore"
											tagName={ 'span' }
											value={ learnMore }
										/>
									</div>
								) }
							</div>
						</a>
					) }
					{ linkProperty === 'learnmore' && (
						<div className={ `bst-blocks-info-box-link-wrap bst-blocks-info-box-media-align-${ mediaAlign } bst-info-halign-${ hAlign }` }>
							<div className={ `bst-blocks-info-box-media bst-info-media-animate-${ 'image' === mediaType ? mediaImage[ 0 ].hoverAnimation : mediaIcon[ 0 ].hoverAnimation }` }>
								{ mediaImage[ 0 ].url && 'image' === mediaType && (
									<div className="base-info-box-image-inner-intrisic-container" style={ {
										maxWidth: mediaImage[ 0 ].maxWidth + 'px',
									} } >
										<div className={ `base-info-box-image-intrisic bst-info-animate-${ mediaImage[ 0 ].hoverAnimation }` } style={ {
											paddingBottom: ( ( mediaImage[ 0 ].height / mediaImage[ 0 ].width ) * 100 ) + '%',
										} } >
											<div className="base-info-box-image-inner-intrisic">
												<img
													src={ mediaImage[ 0 ].url }
													alt={ mediaImage[ 0 ].alt }
													width={ mediaImage[ 0 ].width }
													height={ mediaImage[ 0 ].height }
													className={ mediaImage[ 0 ].id ? `bst-info-box-image wp-image-${ mediaImage[ 0 ].id }` : 'bst-info-box-image wp-image-offsite' }
												/>
												{ mediaImage[ 0 ].flipUrl && 'flip' === mediaImage[ 0 ].hoverAnimation && (
													<img
														src={ mediaImage[ 0 ].flipUrl }
														alt={ mediaImage[ 0 ].flipAlt }
														width={ mediaImage[ 0 ].flipWidth }
														height={ mediaImage[ 0 ].flipHeight }
														className={ mediaImage[ 0 ].flipId ? `bst-info-box-image-flip wp-image-${ mediaImage[ 0 ].flipId }` : 'bst-info-box-image-flip wp-image-offsite' }
													/>
												) }
											</div>
										</div>
									</div>
								) }
								{ 'icon' === mediaType && (
									<div className={ `base-info-box-icon-container bst-info-icon-animate-${ mediaIcon[ 0 ].hoverAnimation }` } >
										<div className={ 'base-info-box-icon-inner-container' } >
											<IconRender className={ `bst-info-svg-icon bst-info-svg-icon-${ mediaIcon[ 0 ].icon }` } name={ mediaIcon[ 0 ].icon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
												display: 'block',
											} } />
											{ mediaIcon[ 0 ].flipIcon && 'flip' === mediaIcon[ 0 ].hoverAnimation && (
												<IconRender className={ `bst-info-svg-icon-flip bst-info-svg-icon-${ mediaIcon[ 0 ].flipIcon }` } name={ mediaIcon[ 0 ].flipIcon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
													display: 'block',
												} } />
											) }
										</div>
									</div>
								) }
							</div>
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
								{ displayLearnMore && (
									<div className="bst-blocks-info-box-learnmore-wrap">
										<RichText.Content
											className="bst-blocks-info-box-learnmore"
											tagName={ 'a' }
											target={ ( '_blank' === target ? target : undefined ) }
											rel={ ( '_blank' === target ? 'noopener noreferrer' : undefined ) }
											value={ learnMore }
											href={ link }
										/>
									</div>
								) }
							</div>
						</div>
					) }
				</div>
			);
		}
	},
	{
		attributes: {
			uniqueID: {
				type: 'string',
				default: '',
			},
			link: {
				type: 'string',
				source: 'attribute',
				attribute: 'href',
				selector: 'a',
			},
			linkProperty: {
				type: 'string',
				default: 'box',
			},
			target: {
				type: 'string',
				source: 'attribute',
				attribute: 'target',
				selector: 'a',
				default: '_self',
			},
			hAlign: {
				type: 'string',
				default: 'center',
			},
			hAlignTablet: {
				type: 'string',
				default: '',
			},
			hAlignMobile: {
				type: 'string',
				default: '',
			},
			containerBackground: {
				type: 'string',
				default: '#f2f2f2',
			},
			containerBackgroundOpacity: {
				type: 'number',
				default: 1,
			},
			containerHoverBackground: {
				type: 'string',
				default: '#f2f2f2',
			},
			containerHoverBackgroundOpacity: {
				type: 'number',
				default: 1,
			},
			containerBorder: {
				type: 'string',
				default: '#eeeeee',
			},
			containerBorderOpacity: {
				type: 'number',
				default: 1,
			},
			containerHoverBorder: {
				type: 'string',
				default: '#eeeeee',
			},
			containerHoverBorderOpacity: {
				type: 'number',
				default: 1,
			},
			containerBorderWidth: {
				type: 'array',
				default: [ 0, 0, 0, 0 ],
			},
			containerBorderRadius: {
				type: 'number',
				default: 0,
			},
			containerPadding: {
				type: 'array',
				default: [ 20, 20, 20, 20 ],
			},
			mediaType: {
				type: 'string',
				default: 'icon',
			},
			mediaAlign: {
				type: 'string',
				default: 'top',
			},
			mediaImage: {
				type: 'array',
				default: [ {
					url: '',
					id: '',
					alt: '',
					width: '',
					height: '',
					maxWidth: '',
					hoverAnimation: 'none',
					flipUrl: '',
					flipId: '',
					flipAlt: '',
					flipWidth: '',
					flipHeight: '',
					subtype: '',
					flipSubtype: '',
				} ],
			},
			mediaIcon: {
				type: 'array',
				default: [ {
					icon: 'fe_aperture',
					size: 50,
					width: 2,
					title: '',
					color: '#444444',
					hoverColor: '#444444',
					hoverAnimation: 'none',
					flipIcon: '',
					tabletSize: '',
					mobileSize: '',
				} ],
			},
			mediaStyle: {
				type: 'array',
				default: [ {
					background: 'transparent',
					hoverBackground: 'transparent',
					border: '#444444',
					hoverBorder: '#444444',
					borderRadius: 0,
					borderWidth: [ 0, 0, 0, 0 ],
					padding: [ 10, 10, 10, 10 ],
					margin: [ 0, 15, 0, 15 ],
				} ],
			},
			displayTitle: {
				type: 'boolean',
				default: true,
			},
			title: {
				type: 'array',
				source: 'children',
				selector: 'h1,h2,h3,h4,h5,h6',
				default: __( 'Title' ),
			},
			titleColor: {
				type: 'string',
				default: '',
			},
			titleHoverColor: {
				type: 'string',
				default: '',
			},
			titleMinHeight: {
				type: 'array',
				default: [ '', '', '' ],
			},
			titleFont: {
				type: 'array',
				default: [ {
					level: 2,
					size: [ '', '', '' ],
					sizeType: 'px',
					lineHeight: [ '', '', '' ],
					lineType: 'px',
					letterSpacing: '',
					textTransform: '',
					family: '',
					google: false,
					style: '',
					weight: '',
					variant: '',
					subset: '',
					loadGoogle: true,
					padding: [ 0, 0, 0, 0 ],
					paddingControl: 'linked',
					margin: [ 5, 0, 10, 0 ],
					marginControl: 'individual',
				} ],
			},
			displayText: {
				type: 'boolean',
				default: true,
			},
			contentText: {
				type: 'array',
				source: 'children',
				selector: 'p',
				default: __( 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean diam dolor, accumsan sed rutrum vel, dapibus et leo.' ),
			},
			textColor: {
				type: 'string',
				default: '#555555',
			},
			textHoverColor: {
				type: 'string',
				default: '',
			},
			textMinHeight: {
				type: 'array',
				default: [ '', '', '' ],
			},
			textFont: {
				type: 'array',
				default: [ {
					size: [ '', '', '' ],
					sizeType: 'px',
					lineHeight: [ '', '', '' ],
					lineType: 'px',
					letterSpacing: '',
					family: '',
					google: '',
					style: '',
					weight: '',
					variant: '',
					subset: '',
					loadGoogle: true,
				} ],
			},
			textSpacing: {
				type: 'array',
				default: [ {
					padding: [ '', '', '', '' ],
					paddingControl: 'linked',
					margin: [ '', '', '', '' ],
					marginControl: 'linked',
				} ],
			},
			displayLearnMore: {
				type: 'boolean',
				default: false,
			},
			learnMore: {
				type: 'array',
				source: 'children',
				selector: '.bst-blocks-info-box-learnmore',
				default: __( 'Learn More' ),
			},
			learnMoreStyles: {
				type: 'array',
				default: [ {
					size: [ '', '', '' ],
					sizeType: 'px',
					lineHeight: [ '', '', '' ],
					lineType: 'px',
					letterSpacing: '',
					family: '',
					google: '',
					style: '',
					weight: '',
					variant: '',
					subset: '',
					loadGoogle: true,
					padding: [ 4, 8, 4, 8 ],
					paddingControl: 'individual',
					margin: [ 10, 0, 10, 0 ],
					marginControl: 'individual',
					color: '',
					background: 'transparent',
					border: '#555555',
					borderRadius: 0,
					borderWidth: [ 0, 0, 0, 0 ],
					borderControl: 'linked',
					colorHover: '#ffffff',
					backgroundHover: '#444444',
					borderHover: '#444444',
					hoverEffect: 'revealBorder',
				} ],
			},
			displayShadow: {
				type: 'boolean',
				default: false,
			},
			shadow: {
				type: 'array',
				default: [ {
					color: '#000000',
					opacity: 0,
					spread: 0,
					blur: 0,
					hOffset: 0,
					vOffset: 0,
				} ],
			},
			shadowHover: {
				type: 'array',
				default: [ {
					color: '#000000',
					opacity: 0.2,
					spread: 0,
					blur: 14,
					hOffset: 0,
					vOffset: 0,
				} ],
			},
			showPresets: {
				type: 'boolean',
				default: true,
			},
			mediaVAlign: {
				type: 'string',
				default: 'middle',
			},
			mediaAlignMobile: {
				type: 'string',
				default: '',
			},
			mediaAlignTablet: {
				type: 'string',
				default: '',
			},
			maxWidth: {
				type: 'number',
				default: '',
			},
			maxWidthUnit: {
				type: 'string',
				default: 'px',
			},
			containerMargin: {
				type: 'array',
				default: [ '', '', '', '' ],
			},
			containerMarginUnit: {
				type: 'string',
				default: 'px',
			},
			linkNoFollow: {
				type: 'boolean',
				default: false,
			},
			linkSponsored: {
				type: 'boolean',
				default: false,
			},
			number: {
				type: 'array',
				source: 'children',
				selector: 'div.bst-blocks-info-box-number',
				default: '',
			},
			mediaNumber: {
				type: 'array',
				default: [ {
					family: '',
					google: false,
					hoverAnimation: 'none',
					style: '',
					weight: '',
					variant: '',
					subset: '',
					loadGoogle: true,
				} ],
			},
		},
		save: ( { attributes } ) => {
			const { uniqueID, link, linkProperty, target, hAlign, mediaType, mediaImage, mediaIcon, mediaAlign, displayTitle, title, titleFont, displayText, contentText, displayLearnMore, learnMore, className } = attributes;
			const titleTagName = 'h' + titleFont[ 0 ].level;
			return (
				<div id={ `bst-info-box${ uniqueID }` } className={ className }>
					{ linkProperty !== 'learnmore' && (
						<a className={ `bst-blocks-info-box-link-wrap bst-blocks-info-box-media-align-${ mediaAlign } bst-info-halign-${ hAlign }` } target={ ( '_blank' === target ? target : undefined ) } rel={ ( '_blank' === target ? 'noopener noreferrer' : undefined ) } href={ link }>
							<div className={ `bst-blocks-info-box-media bst-info-media-animate-${ 'image' === mediaType ? mediaImage[ 0 ].hoverAnimation : mediaIcon[ 0 ].hoverAnimation }` }>
								{ mediaImage[ 0 ].url && 'image' === mediaType && (
									<div className="base-info-box-image-inner-intrisic-container" style={ {
										maxWidth: mediaImage[ 0 ].maxWidth + 'px',
									} } >
										<div className={ `base-info-box-image-intrisic bst-info-animate-${ mediaImage[ 0 ].hoverAnimation }${ ( 'svg+xml' === mediaImage[ 0 ].subtype ? ' bsb-info-box-image-type-svg' : '' ) }` } style={ {
											paddingBottom: isNaN( mediaImage[ 0 ].height ) ? undefined : ( ( mediaImage[ 0 ].height / mediaImage[ 0 ].width ) * 100 ) + '%',
										} } >
											<div className="base-info-box-image-inner-intrisic">
												<img
													src={ mediaImage[ 0 ].url }
													alt={ mediaImage[ 0 ].alt }
													width={ ( mediaImage[ 0 ].subtype && 'svg+xml' === mediaImage[ 0 ].subtype ? mediaImage[ 0 ].maxWidth : mediaImage[ 0 ].width ) }
													height={ mediaImage[ 0 ].height }
													className={ `${ ( mediaImage[ 0 ].id ? `bst-info-box-image wp-image-${ mediaImage[ 0 ].id }` : 'bst-info-box-image wp-image-offsite' ) } ${ ( mediaImage[ 0 ].subtype && 'svg+xml' === mediaImage[ 0 ].subtype ? ' bst-info-svg-image' : '' ) }` }
												/>
												{ mediaImage[ 0 ].flipUrl && 'flip' === mediaImage[ 0 ].hoverAnimation && (
													<img
														src={ mediaImage[ 0 ].flipUrl }
														alt={ mediaImage[ 0 ].flipAlt }
														width={ ( mediaImage[ 0 ].flipSubtype && 'svg+xml' === mediaImage[ 0 ].flipSubtype ? mediaImage[ 0 ].maxWidth : mediaImage[ 0 ].flipWidth ) }
														height={ mediaImage[ 0 ].flipHeight }
														className={ `${ ( mediaImage[ 0 ].flipId ? `bst-info-box-image-flip wp-image-${ mediaImage[ 0 ].flipId }` : 'bst-info-box-image-flip wp-image-offsite' ) } ${ ( mediaImage[ 0 ].flipSubtype && 'svg+xml' === mediaImage[ 0 ].flipSubtype ? ' bst-info-svg-image' : '' ) }` }
													/>
												) }
											</div>
										</div>
									</div>
								) }
								{ 'icon' === mediaType && (
									<div className={ `base-info-box-icon-container bst-info-icon-animate-${ mediaIcon[ 0 ].hoverAnimation }` } >
										<div className={ 'base-info-box-icon-inner-container' } >
											<IconRender className={ `bst-info-svg-icon bst-info-svg-icon-${ mediaIcon[ 0 ].icon }` } name={ mediaIcon[ 0 ].icon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
												display: 'block',
											} } />
											{ mediaIcon[ 0 ].flipIcon && 'flip' === mediaIcon[ 0 ].hoverAnimation && (
												<IconRender className={ `bst-info-svg-icon-flip bst-info-svg-icon-${ mediaIcon[ 0 ].flipIcon }` } name={ mediaIcon[ 0 ].flipIcon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
													display: 'block',
												} } />
											) }
										</div>
									</div>
								) }
							</div>
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
								{ displayLearnMore && (
									<div className="bst-blocks-info-box-learnmore-wrap">
										<RichText.Content
											className="bst-blocks-info-box-learnmore"
											tagName={ 'span' }
											value={ learnMore }
										/>
									</div>
								) }
							</div>
						</a>
					) }
					{ linkProperty === 'learnmore' && (
						<div className={ `bst-blocks-info-box-link-wrap bst-blocks-info-box-media-align-${ mediaAlign } bst-info-halign-${ hAlign }` }>
							<div className={ `bst-blocks-info-box-media bst-info-media-animate-${ 'image' === mediaType ? mediaImage[ 0 ].hoverAnimation : mediaIcon[ 0 ].hoverAnimation }` }>
								{ mediaImage[ 0 ].url && 'image' === mediaType && (
									<div className="base-info-box-image-inner-intrisic-container" style={ {
										maxWidth: mediaImage[ 0 ].maxWidth + 'px',
									} } >
										<div className={ `base-info-box-image-intrisic bst-info-animate-${ mediaImage[ 0 ].hoverAnimation }` } style={ {
											paddingBottom: ( ( mediaImage[ 0 ].height / mediaImage[ 0 ].width ) * 100 ) + '%',
										} } >
											<div className="base-info-box-image-inner-intrisic">
												<img
													src={ mediaImage[ 0 ].url }
													alt={ mediaImage[ 0 ].alt }
													width={ mediaImage[ 0 ].width }
													height={ mediaImage[ 0 ].height }
													className={ mediaImage[ 0 ].id ? `bst-info-box-image wp-image-${ mediaImage[ 0 ].id }` : 'bst-info-box-image wp-image-offsite' }
												/>
												{ mediaImage[ 0 ].flipUrl && 'flip' === mediaImage[ 0 ].hoverAnimation && (
													<img
														src={ mediaImage[ 0 ].flipUrl }
														alt={ mediaImage[ 0 ].flipAlt }
														width={ mediaImage[ 0 ].flipWidth }
														height={ mediaImage[ 0 ].flipHeight }
														className={ mediaImage[ 0 ].flipId ? `bst-info-box-image-flip wp-image-${ mediaImage[ 0 ].flipId }` : 'bst-info-box-image-flip wp-image-offsite' }
													/>
												) }
											</div>
										</div>
									</div>
								) }
								{ 'icon' === mediaType && (
									<div className={ `base-info-box-icon-container bst-info-icon-animate-${ mediaIcon[ 0 ].hoverAnimation }` } >
										<div className={ 'base-info-box-icon-inner-container' } >
											<IconRender className={ `bst-info-svg-icon bst-info-svg-icon-${ mediaIcon[ 0 ].icon }` } name={ mediaIcon[ 0 ].icon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
												display: 'block',
											} } />
											{ mediaIcon[ 0 ].flipIcon && 'flip' === mediaIcon[ 0 ].hoverAnimation && (
												<IconRender className={ `bst-info-svg-icon-flip bst-info-svg-icon-${ mediaIcon[ 0 ].flipIcon }` } name={ mediaIcon[ 0 ].flipIcon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
													display: 'block',
												} } />
											) }
										</div>
									</div>
								) }
							</div>
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
								{ displayLearnMore && (
									<div className="bst-blocks-info-box-learnmore-wrap">
										<RichText.Content
											className="bst-blocks-info-box-learnmore"
											tagName={ 'a' }
											target={ ( '_blank' === target ? target : undefined ) }
											rel={ ( '_blank' === target ? 'noopener noreferrer' : undefined ) }
											value={ learnMore }
											href={ link }
										/>
									</div>
								) }
							</div>
						</div>
					) }
				</div>
			);
		},
	},
	{
		attributes: {
			uniqueID: {
				type: 'string',
				default: '',
			},
			link: {
				type: 'string',
				source: 'attribute',
				attribute: 'href',
				selector: 'a',
			},
			linkProperty: {
				type: 'string',
				default: 'box',
			},
			target: {
				type: 'string',
				source: 'attribute',
				attribute: 'target',
				selector: 'a',
				default: '_self',
			},
			hAlign: {
				type: 'string',
				default: 'center',
			},
			containerBackground: {
				type: 'string',
				default: '#f2f2f2',
			},
			containerHoverBackground: {
				type: 'string',
				default: '#f2f2f2',
			},
			containerBorder: {
				type: 'string',
				default: '#eeeeee',
			},
			containerHoverBorder: {
				type: 'string',
				default: '#eeeeee',
			},
			containerBorderWidth: {
				type: 'array',
				default: [ 0, 0, 0, 0 ],
			},
			containerBorderRadius: {
				type: 'number',
				default: 0,
			},
			containerPadding: {
				type: 'array',
				default: [ 20, 20, 20, 20 ],
			},
			mediaType: {
				type: 'string',
				default: 'icon',
			},
			mediaAlign: {
				type: 'string',
				default: 'top',
			},
			mediaImage: {
				type: 'array',
				default: [ {
					url: '',
					id: '',
					alt: '',
					width: '',
					height: '',
					maxWidth: '',
					hoverAnimation: 'none',
					flipUrl: '',
					flipId: '',
					flipAlt: '',
					flipWidth: '',
					flipHeight: '',
				} ],
			},
			mediaIcon: {
				type: 'array',
				default: [ {
					icon: 'fe_aperture',
					size: 50,
					width: 2,
					title: '',
					color: '#444444',
					hoverColor: '#444444',
					hoverAnimation: 'none',
					flipIcon: '',
				} ],
			},
			mediaStyle: {
				type: 'array',
				default: [ {
					background: 'transparent',
					hoverBackground: 'transparent',
					border: '#444444',
					hoverBorder: '#444444',
					borderRadius: 0,
					borderWidth: [ 0, 0, 0, 0 ],
					padding: [ 10, 10, 10, 10 ],
					margin: [ 0, 15, 0, 15 ],
				} ],
			},
			displayTitle: {
				type: 'boolean',
				default: true,
			},
			title: {
				type: 'array',
				source: 'children',
				selector: 'h1,h2,h3,h4,h5,h6',
				default: __( 'Title' ),
			},
			titleColor: {
				type: 'string',
				default: '',
			},
			titleHoverColor: {
				type: 'string',
				default: '',
			},
			titleFont: {
				type: 'array',
				default: [ {
					level: 2,
					size: [ '', '', '' ],
					sizeType: 'px',
					lineHeight: [ '', '', '' ],
					lineType: 'px',
					letterSpacing: '',
					textTransform: '',
					family: '',
					google: false,
					style: '',
					weight: '',
					variant: '',
					subset: '',
					loadGoogle: true,
					padding: [ 0, 0, 0, 0 ],
					paddingControl: 'linked',
					margin: [ 5, 0, 10, 0 ],
					marginControl: 'individual',
				} ],
			},
			displayText: {
				type: 'boolean',
				default: true,
			},
			contentText: {
				type: 'array',
				source: 'children',
				selector: 'p',
				default: __( 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean diam dolor, accumsan sed rutrum vel, dapibus et leo.' ),
			},
			textColor: {
				type: 'string',
				default: '#555555',
			},
			textHoverColor: {
				type: 'string',
				default: '',
			},
			textFont: {
				type: 'array',
				default: [ {
					size: [ '', '', '' ],
					sizeType: 'px',
					lineHeight: [ '', '', '' ],
					lineType: 'px',
					letterSpacing: '',
					family: '',
					google: '',
					style: '',
					weight: '',
					variant: '',
					subset: '',
					loadGoogle: true,
				} ],
			},
			displayLearnMore: {
				type: 'boolean',
				default: false,
			},
			learnMore: {
				type: 'array',
				source: 'children',
				selector: '.bst-blocks-info-box-learnmore',
				default: __( 'Learn More' ),
			},
			learnMoreStyles: {
				type: 'array',
				default: [ {
					size: [ '', '', '' ],
					sizeType: 'px',
					lineHeight: [ '', '', '' ],
					lineType: 'px',
					letterSpacing: '',
					family: '',
					google: '',
					style: '',
					weight: '',
					variant: '',
					subset: '',
					loadGoogle: true,
					padding: [ 4, 8, 4, 8 ],
					paddingControl: 'individual',
					margin: [ 10, 0, 10, 0 ],
					marginControl: 'individual',
					color: '',
					background: 'transparent',
					border: '#555555',
					borderRadius: 0,
					borderWidth: [ 0, 0, 0, 0 ],
					borderControl: 'linked',
					colorHover: '#ffffff',
					backgroundHover: '#444444',
					borderHover: '#444444',
					hoverEffect: 'revealBorder',
				} ],
			},
			displayShadow: {
				type: 'boolean',
				default: false,
			},
			shadow: {
				type: 'array',
				default: [ {
					color: '#000000',
					opacity: 0,
					spread: 0,
					blur: 0,
					hOffset: 0,
					vOffset: 0,
				} ],
			},
			shadowHover: {
				type: 'array',
				default: [ {
					color: '#000000',
					opacity: 0.2,
					spread: 0,
					blur: 14,
					hOffset: 0,
					vOffset: 0,
				} ],
			},
		},
		save: ( { attributes } ) => {
			const { uniqueID, link, linkProperty, target, hAlign, mediaType, mediaImage, mediaIcon, mediaAlign, displayTitle, title, titleFont, displayText, contentText, displayLearnMore, learnMore, className } = attributes;
			const titleTagName = 'h' + titleFont[ 0 ].level;
			return (
				<div id={ `bst-info-box${ uniqueID }` } className={ className }>
					{ linkProperty !== 'learnmore' && (
						<a className={ `bst-blocks-info-box-link-wrap bst-blocks-info-box-media-align-${ mediaAlign } bst-info-halign-${ hAlign }` } target={ ( '_blank' === target ? target : undefined ) } rel={ ( '_blank' === target ? 'noopener noreferrer' : undefined ) } href={ link }>
							<div className={ `bst-blocks-info-box-media bst-info-media-animate-${ 'image' === mediaType ? mediaImage[ 0 ].hoverAnimation : mediaIcon[ 0 ].hoverAnimation }` }>
								{ mediaImage[ 0 ].url && 'image' === mediaType && (
									<div className="base-info-box-image-inner-intrisic-container" style={ {
										maxWidth: mediaImage[ 0 ].maxWidth + 'px',
									} } >
										<div className={ `base-info-box-image-intrisic bst-info-animate-${ mediaImage[ 0 ].hoverAnimation }` } style={ {
											paddingBottom: ( ( mediaImage[ 0 ].height / mediaImage[ 0 ].width ) * 100 ) + '%',
										} } >
											<div className="base-info-box-image-inner-intrisic">
												<img
													src={ mediaImage[ 0 ].url }
													alt={ mediaImage[ 0 ].alt }
													width={ ( mediaImage[ 0 ].subtype && 'svg+xml' === mediaImage[ 0 ].subtype ? mediaImage[ 0 ].maxWidth : mediaImage[ 0 ].width ) }
													height={ mediaImage[ 0 ].height }
													className={ `${ ( mediaImage[ 0 ].id ? `bst-info-box-image wp-image-${ mediaImage[ 0 ].id }` : 'bst-info-box-image wp-image-offsite' ) } ${ ( mediaImage[ 0 ].subtype && 'svg+xml' === mediaImage[ 0 ].subtype ? ' bst-info-svg-image' : '' ) }` }
												/>
												{ mediaImage[ 0 ].flipUrl && 'flip' === mediaImage[ 0 ].hoverAnimation && (
													<img
														src={ mediaImage[ 0 ].flipUrl }
														alt={ mediaImage[ 0 ].flipAlt }
														width={ ( mediaImage[ 0 ].flipSubtype && 'svg+xml' === mediaImage[ 0 ].flipSubtype ? mediaImage[ 0 ].maxWidth : mediaImage[ 0 ].flipWidth ) }
														height={ mediaImage[ 0 ].flipHeight }
														className={ `${ ( mediaImage[ 0 ].flipId ? `bst-info-box-image-flip wp-image-${ mediaImage[ 0 ].flipId }` : 'bst-info-box-image-flip wp-image-offsite' ) } ${ ( mediaImage[ 0 ].flipSubtype && 'svg+xml' === mediaImage[ 0 ].flipSubtype ? ' bst-info-svg-image' : '' ) }` }
													/>
												) }
											</div>
										</div>
									</div>
								) }
								{ 'icon' === mediaType && (
									<div className={ `base-info-box-icon-container bst-info-icon-animate-${ mediaIcon[ 0 ].hoverAnimation }` } >
										<div className={ 'base-info-box-icon-inner-container' } >
											<IconRender className={ `bst-info-svg-icon bst-info-svg-icon-${ mediaIcon[ 0 ].icon }` } name={ mediaIcon[ 0 ].icon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
												display: 'block',
											} } />
											{ mediaIcon[ 0 ].flipIcon && 'flip' === mediaIcon[ 0 ].hoverAnimation && (
												<IconRender className={ `bst-info-svg-icon-flip bst-info-svg-icon-${ mediaIcon[ 0 ].flipIcon }` } name={ mediaIcon[ 0 ].flipIcon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
													display: 'block',
												} } />
											) }
										</div>
									</div>
								) }
							</div>
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
								{ displayLearnMore && (
									<div className="bst-blocks-info-box-learnmore-wrap">
										<RichText.Content
											className="bst-blocks-info-box-learnmore"
											tagName={ 'span' }
											value={ learnMore }
										/>
									</div>
								) }
							</div>
						</a>
					) }
					{ linkProperty === 'learnmore' && (
						<div className={ `bst-blocks-info-box-link-wrap bst-blocks-info-box-media-align-${ mediaAlign } bst-info-halign-${ hAlign }` }>
							<div className={ `bst-blocks-info-box-media bst-info-media-animate-${ 'image' === mediaType ? mediaImage[ 0 ].hoverAnimation : mediaIcon[ 0 ].hoverAnimation }` }>
								{ mediaImage[ 0 ].url && 'image' === mediaType && (
									<div className="base-info-box-image-inner-intrisic-container" style={ {
										maxWidth: mediaImage[ 0 ].maxWidth + 'px',
									} } >
										<div className={ `base-info-box-image-intrisic bst-info-animate-${ mediaImage[ 0 ].hoverAnimation }` } style={ {
											paddingBottom: ( ( mediaImage[ 0 ].height / mediaImage[ 0 ].width ) * 100 ) + '%',
										} } >
											<div className="base-info-box-image-inner-intrisic">
												<img
													src={ mediaImage[ 0 ].url }
													alt={ mediaImage[ 0 ].alt }
													width={ mediaImage[ 0 ].width }
													height={ mediaImage[ 0 ].height }
													className={ mediaImage[ 0 ].id ? `bst-info-box-image wp-image-${ mediaImage[ 0 ].id }` : 'bst-info-box-image wp-image-offsite' }
												/>
												{ mediaImage[ 0 ].flipUrl && 'flip' === mediaImage[ 0 ].hoverAnimation && (
													<img
														src={ mediaImage[ 0 ].flipUrl }
														alt={ mediaImage[ 0 ].flipAlt }
														width={ mediaImage[ 0 ].flipWidth }
														height={ mediaImage[ 0 ].flipHeight }
														className={ mediaImage[ 0 ].flipId ? `bst-info-box-image-flip wp-image-${ mediaImage[ 0 ].flipId }` : 'bst-info-box-image-flip wp-image-offsite' }
													/>
												) }
											</div>
										</div>
									</div>
								) }
								{ 'icon' === mediaType && (
									<div className={ `base-info-box-icon-container bst-info-icon-animate-${ mediaIcon[ 0 ].hoverAnimation }` } >
										<div className={ 'base-info-box-icon-inner-container' } >
											<IconRender className={ `bst-info-svg-icon bst-info-svg-icon-${ mediaIcon[ 0 ].icon }` } name={ mediaIcon[ 0 ].icon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
												display: 'block',
											} } />
											{ mediaIcon[ 0 ].flipIcon && 'flip' === mediaIcon[ 0 ].hoverAnimation && (
												<IconRender className={ `bst-info-svg-icon-flip bst-info-svg-icon-${ mediaIcon[ 0 ].flipIcon }` } name={ mediaIcon[ 0 ].flipIcon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
													display: 'block',
												} } />
											) }
										</div>
									</div>
								) }
							</div>
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
								{ displayLearnMore && (
									<div className="bst-blocks-info-box-learnmore-wrap">
										<RichText.Content
											className="bst-blocks-info-box-learnmore"
											tagName={ 'a' }
											target={ ( '_blank' === target ? target : undefined ) }
											rel={ ( '_blank' === target ? 'noopener noreferrer' : undefined ) }
											value={ learnMore }
											href={ link }
										/>
									</div>
								) }
							</div>
						</div>
					) }
				</div>
			);
		}
	},
	{
		attributes: {
			uniqueID: {
				type: 'string',
				default: '',
			},
			link: {
				type: 'string',
				source: 'attribute',
				attribute: 'href',
				selector: 'a',
			},
			linkProperty: {
				type: 'string',
				default: 'box',
			},
			target: {
				type: 'string',
				source: 'attribute',
				attribute: 'target',
				selector: 'a',
				default: '_self',
			},
			hAlign: {
				type: 'string',
				default: 'center',
			},
			containerBackground: {
				type: 'string',
				default: '#f2f2f2',
			},
			containerHoverBackground: {
				type: 'string',
				default: '#f2f2f2',
			},
			containerBorder: {
				type: 'string',
				default: '#eeeeee',
			},
			containerHoverBorder: {
				type: 'string',
				default: '#eeeeee',
			},
			containerBorderWidth: {
				type: 'array',
				default: [ 0, 0, 0, 0 ],
			},
			containerBorderRadius: {
				type: 'number',
				default: 0,
			},
			containerPadding: {
				type: 'array',
				default: [ 20, 20, 20, 20 ],
			},
			mediaType: {
				type: 'string',
				default: 'icon',
			},
			mediaAlign: {
				type: 'string',
				default: 'top',
			},
			mediaImage: {
				type: 'array',
				default: [ {
					url: '',
					id: '',
					alt: '',
					width: '',
					height: '',
					maxWidth: '',
					hoverAnimation: 'none',
					flipUrl: '',
					flipId: '',
					flipAlt: '',
					flipWidth: '',
					flipHeight: '',
				} ],
			},
			mediaIcon: {
				type: 'array',
				default: [ {
					icon: 'fe_aperture',
					size: 50,
					width: 2,
					title: '',
					color: '#444444',
					hoverColor: '#444444',
					hoverAnimation: 'none',
					flipIcon: '',
				} ],
			},
			mediaStyle: {
				type: 'array',
				default: [ {
					background: 'transparent',
					hoverBackground: 'transparent',
					border: '#444444',
					hoverBorder: '#444444',
					borderRadius: 0,
					borderWidth: [ 0, 0, 0, 0 ],
					padding: [ 10, 10, 10, 10 ],
					margin: [ 0, 15, 0, 15 ],
				} ],
			},
			displayTitle: {
				type: 'boolean',
				default: true,
			},
			title: {
				type: 'array',
				source: 'children',
				selector: 'h1,h2,h3,h4,h5,h6',
				default: __( 'Title' ),
			},
			titleColor: {
				type: 'string',
				default: '',
			},
			titleHoverColor: {
				type: 'string',
				default: '',
			},
			titleFont: {
				type: 'array',
				default: [ {
					level: 2,
					size: [ '', '', '' ],
					sizeType: 'px',
					lineHeight: [ '', '', '' ],
					lineType: 'px',
					letterSpacing: '',
					textTransform: '',
					family: '',
					google: false,
					style: '',
					weight: '',
					variant: '',
					subset: '',
					loadGoogle: true,
					padding: [ 0, 0, 0, 0 ],
					paddingControl: 'linked',
					margin: [ 5, 0, 10, 0 ],
					marginControl: 'individual',
				} ],
			},
			displayText: {
				type: 'boolean',
				default: true,
			},
			contentText: {
				type: 'array',
				source: 'children',
				selector: 'p',
				default: __( 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean diam dolor, accumsan sed rutrum vel, dapibus et leo.' ),
			},
			textColor: {
				type: 'string',
				default: '#555555',
			},
			textHoverColor: {
				type: 'string',
				default: '',
			},
			textFont: {
				type: 'array',
				default: [ {
					size: [ '', '', '' ],
					sizeType: 'px',
					lineHeight: [ '', '', '' ],
					lineType: 'px',
					letterSpacing: '',
					family: '',
					google: '',
					style: '',
					weight: '',
					variant: '',
					subset: '',
					loadGoogle: true,
				} ],
			},
			displayLearnMore: {
				type: 'boolean',
				default: false,
			},
			learnMore: {
				type: 'array',
				source: 'children',
				selector: '.bst-blocks-info-box-learnmore',
				default: __( 'Learn More' ),
			},
			learnMoreStyles: {
				type: 'array',
				default: [ {
					size: [ '', '', '' ],
					sizeType: 'px',
					lineHeight: [ '', '', '' ],
					lineType: 'px',
					letterSpacing: '',
					family: '',
					google: '',
					style: '',
					weight: '',
					variant: '',
					subset: '',
					loadGoogle: true,
					padding: [ 4, 8, 4, 8 ],
					paddingControl: 'individual',
					margin: [ 10, 0, 10, 0 ],
					marginControl: 'individual',
					color: '',
					background: 'transparent',
					border: '#555555',
					borderRadius: 0,
					borderWidth: [ 0, 0, 0, 0 ],
					borderControl: 'linked',
					colorHover: '#ffffff',
					backgroundHover: '#444444',
					borderHover: '#444444',
					hoverEffect: 'revealBorder',
				} ],
			},
			displayShadow: {
				type: 'boolean',
				default: false,
			},
			shadow: {
				type: 'array',
				default: [ {
					color: '#000000',
					opacity: 0,
					spread: 0,
					blur: 0,
					hOffset: 0,
					vOffset: 0,
				} ],
			},
			shadowHover: {
				type: 'array',
				default: [ {
					color: '#000000',
					opacity: 0.2,
					spread: 0,
					blur: 14,
					hOffset: 0,
					vOffset: 0,
				} ],
			},
		},
		save: ( { attributes } ) => {
			const { uniqueID, link, linkProperty, target, hAlign, mediaType, mediaImage, mediaIcon, mediaAlign, displayTitle, title, titleFont, displayText, contentText, displayLearnMore, learnMore, className } = attributes;
			const titleTagName = 'h' + titleFont[ 0 ].level;
			return (
				<div id={ `bst-info-box${ uniqueID }` } className={ className }>
					{ linkProperty !== 'learnmore' && (
						<a className={ `bst-blocks-info-box-link-wrap bst-blocks-info-box-media-align-${ mediaAlign } bst-info-halign-${ hAlign }` } target={ target } rel={ 'noopener noreferrer' } href={ link }>
							<div className={ `bst-blocks-info-box-media bst-info-media-animate-${ 'image' === mediaType ? mediaImage[ 0 ].hoverAnimation : mediaIcon[ 0 ].hoverAnimation }` }>
								{ mediaImage[ 0 ].url && 'image' === mediaType && (
									<div className="base-info-box-image-inner-intrisic-container" style={ {
										maxWidth: mediaImage[ 0 ].maxWidth + 'px',
									} } >
										<div className={ `base-info-box-image-intrisic bst-info-animate-${ mediaImage[ 0 ].hoverAnimation }` } style={ {
											paddingBottom: ( ( mediaImage[ 0 ].height / mediaImage[ 0 ].width ) * 100 ) + '%',
										} } >
											<div className="base-info-box-image-inner-intrisic">
												<img
													src={ mediaImage[ 0 ].url }
													alt={ mediaImage[ 0 ].alt }
													width={ mediaImage[ 0 ].width }
													height={ mediaImage[ 0 ].height }
													className={ mediaImage[ 0 ].id ? `bst-info-box-image wp-image-${ mediaImage[ 0 ].id }` : 'bst-info-box-image wp-image-offsite' }
												/>
												{ mediaImage[ 0 ].flipUrl && 'flip' === mediaImage[ 0 ].hoverAnimation && (
													<img
														src={ mediaImage[ 0 ].flipUrl }
														alt={ mediaImage[ 0 ].flipAlt }
														width={ mediaImage[ 0 ].flipWidth }
														height={ mediaImage[ 0 ].flipHeight }
														className={ mediaImage[ 0 ].flipId ? `bst-info-box-image-flip wp-image-${ mediaImage[ 0 ].flipId }` : 'bst-info-box-image-flip wp-image-offsite' }
													/>
												) }
											</div>
										</div>
									</div>
								) }
								{ 'icon' === mediaType && (
									<div className={ `base-info-box-icon-container bst-info-icon-animate-${ mediaIcon[ 0 ].hoverAnimation }` } >
										<div className={ 'base-info-box-icon-inner-container' } >
											<IconRender className={ `bst-info-svg-icon bst-info-svg-icon-${ mediaIcon[ 0 ].icon }` } name={ mediaIcon[ 0 ].icon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
												display: 'block',
											} } />
											{ mediaIcon[ 0 ].flipIcon && 'flip' === mediaIcon[ 0 ].hoverAnimation && (
												<IconRender className={ `bst-info-svg-icon-flip bst-info-svg-icon-${ mediaIcon[ 0 ].flipIcon }` } name={ mediaIcon[ 0 ].flipIcon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
													display: 'block',
												} } />
											) }
										</div>
									</div>
								) }
							</div>
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
								{ displayLearnMore && (
									<div className="bst-blocks-info-box-learnmore-wrap">
										<RichText.Content
											className="bst-blocks-info-box-learnmore"
											tagName={ 'span' }
											value={ learnMore }
										/>
									</div>
								) }
							</div>
						</a>
					) }
					{ linkProperty === 'learnmore' && (
						<div className={ `bst-blocks-info-box-link-wrap bst-blocks-info-box-media-align-${ mediaAlign } bst-info-halign-${ hAlign }` }>
							<div className={ `bst-blocks-info-box-media bst-info-media-animate-${ 'image' === mediaType ? mediaImage[ 0 ].hoverAnimation : mediaIcon[ 0 ].hoverAnimation }` }>
								{ mediaImage[ 0 ].url && 'image' === mediaType && (
									<div className="base-info-box-image-inner-intrisic-container" style={ {
										maxWidth: mediaImage[ 0 ].maxWidth + 'px',
									} } >
										<div className={ `base-info-box-image-intrisic bst-info-animate-${ mediaImage[ 0 ].hoverAnimation }` } style={ {
											paddingBottom: ( ( mediaImage[ 0 ].height / mediaImage[ 0 ].width ) * 100 ) + '%',
										} } >
											<div className="base-info-box-image-inner-intrisic">
												<img
													src={ mediaImage[ 0 ].url }
													alt={ mediaImage[ 0 ].alt }
													width={ mediaImage[ 0 ].width }
													height={ mediaImage[ 0 ].height }
													className={ mediaImage[ 0 ].id ? `bst-info-box-image wp-image-${ mediaImage[ 0 ].id }` : 'bst-info-box-image wp-image-offsite' }
												/>
												{ mediaImage[ 0 ].flipUrl && 'flip' === mediaImage[ 0 ].hoverAnimation && (
													<img
														src={ mediaImage[ 0 ].flipUrl }
														alt={ mediaImage[ 0 ].flipAlt }
														width={ mediaImage[ 0 ].flipWidth }
														height={ mediaImage[ 0 ].flipHeight }
														className={ mediaImage[ 0 ].flipId ? `bst-info-box-image-flip wp-image-${ mediaImage[ 0 ].flipId }` : 'bst-info-box-image-flip wp-image-offsite' }
													/>
												) }
											</div>
										</div>
									</div>
								) }
								{ 'icon' === mediaType && (
									<div className={ `base-info-box-icon-container bst-info-icon-animate-${ mediaIcon[ 0 ].hoverAnimation }` } >
										<div className={ 'base-info-box-icon-inner-container' } >
											<IconRender className={ `bst-info-svg-icon bst-info-svg-icon-${ mediaIcon[ 0 ].icon }` } name={ mediaIcon[ 0 ].icon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
												display: 'block',
											} } />
											{ mediaIcon[ 0 ].flipIcon && 'flip' === mediaIcon[ 0 ].hoverAnimation && (
												<IconRender className={ `bst-info-svg-icon-flip bst-info-svg-icon-${ mediaIcon[ 0 ].flipIcon }` } name={ mediaIcon[ 0 ].flipIcon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
													display: 'block',
												} } />
											) }
										</div>
									</div>
								) }
							</div>
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
								{ displayLearnMore && (
									<div className="bst-blocks-info-box-learnmore-wrap">
										<RichText.Content
											className="bst-blocks-info-box-learnmore"
											tagName={ 'a' }
											target={ target }
											rel={ 'noopener noreferrer' }
											value={ learnMore }
											href={ link }
										/>
									</div>
								) }
							</div>
						</div>
					) }
				</div>
			)
		}
	},
	{
		attributes: {
			uniqueID: {
				type: 'string',
				default: '',
			},
			link: {
				type: 'string',
				source: 'attribute',
				attribute: 'href',
				selector: 'a',
			},
			linkProperty: {
				type: 'string',
				default: 'box',
			},
			target: {
				type: 'string',
				source: 'attribute',
				attribute: 'target',
				selector: 'a',
				default: '_self',
			},
			hAlign: {
				type: 'string',
				default: 'center',
			},
			containerBackground: {
				type: 'string',
				default: '#f2f2f2',
			},
			containerHoverBackground: {
				type: 'string',
				default: '#f2f2f2',
			},
			containerBorder: {
				type: 'string',
				default: '#eeeeee',
			},
			containerHoverBorder: {
				type: 'string',
				default: '#eeeeee',
			},
			containerBorderWidth: {
				type: 'array',
				default: [ 0, 0, 0, 0 ],
			},
			containerBorderRadius: {
				type: 'number',
				default: 0,
			},
			containerPadding: {
				type: 'array',
				default: [ 20, 20, 20, 20 ],
			},
			mediaType: {
				type: 'string',
				default: 'icon',
			},
			mediaAlign: {
				type: 'string',
				default: 'top',
			},
			mediaImage: {
				type: 'array',
				default: [ {
					url: '',
					id: '',
					alt: '',
					width: '',
					height: '',
					maxWidth: '',
					hoverAnimation: 'none',
					flipUrl: '',
					flipId: '',
					flipAlt: '',
					flipWidth: '',
					flipHeight: '',
				} ],
			},
			mediaIcon: {
				type: 'array',
				default: [ {
					icon: 'fe_aperture',
					size: 50,
					width: 2,
					title: '',
					color: '#444444',
					hoverColor: '#444444',
					hoverAnimation: 'none',
					flipIcon: '',
				} ],
			},
			mediaStyle: {
				type: 'array',
				default: [ {
					background: 'transparent',
					hoverBackground: 'transparent',
					border: '#444444',
					hoverBorder: '#444444',
					borderRadius: 0,
					borderWidth: [ 0, 0, 0, 0 ],
					padding: [ 10, 10, 10, 10 ],
					margin: [ 0, 15, 0, 15 ],
				} ],
			},
			displayTitle: {
				type: 'boolean',
				default: true,
			},
			title: {
				type: 'array',
				source: 'children',
				selector: 'h1,h2,h3,h4,h5,h6',
				default: __( 'Title' ),
			},
			titleColor: {
				type: 'string',
				default: '',
			},
			titleHoverColor: {
				type: 'string',
				default: '',
			},
			titleFont: {
				type: 'array',
				default: [ {
					level: 2,
					size: [ '', '', '' ],
					sizeType: 'px',
					lineHeight: [ '', '', '' ],
					lineType: 'px',
					letterSpacing: '',
					textTransform: '',
					family: '',
					google: false,
					style: '',
					weight: '',
					variant: '',
					subset: '',
					loadGoogle: true,
					padding: [ 0, 0, 0, 0 ],
					paddingControl: 'linked',
					margin: [ 5, 0, 10, 0 ],
					marginControl: 'individual',
				} ],
			},
			displayText: {
				type: 'boolean',
				default: true,
			},
			contentText: {
				type: 'array',
				source: 'children',
				selector: 'p',
				default: __( 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean diam dolor, accumsan sed rutrum vel, dapibus et leo.' ),
			},
			textColor: {
				type: 'string',
				default: '#555555',
			},
			textHoverColor: {
				type: 'string',
				default: '',
			},
			textFont: {
				type: 'array',
				default: [ {
					size: [ '', '', '' ],
					sizeType: 'px',
					lineHeight: [ '', '', '' ],
					lineType: 'px',
					letterSpacing: '',
					family: '',
					google: '',
					style: '',
					weight: '',
					variant: '',
					subset: '',
					loadGoogle: true,
				} ],
			},
			displayLearnMore: {
				type: 'boolean',
				default: false,
			},
			learnMore: {
				type: 'array',
				source: 'children',
				selector: '.bst-blocks-info-box-learnmore',
				default: __( 'Learn More' ),
			},
			learnMoreStyles: {
				type: 'array',
				default: [ {
					size: [ '', '', '' ],
					sizeType: 'px',
					lineHeight: [ '', '', '' ],
					lineType: 'px',
					letterSpacing: '',
					family: '',
					google: '',
					style: '',
					weight: '',
					variant: '',
					subset: '',
					loadGoogle: true,
					padding: [ 4, 8, 4, 8 ],
					paddingControl: 'individual',
					margin: [ 10, 0, 10, 0 ],
					marginControl: 'individual',
					color: '',
					background: 'transparent',
					border: '#555555',
					borderRadius: 0,
					borderWidth: [ 0, 0, 0, 0 ],
					borderControl: 'linked',
					colorHover: '#ffffff',
					backgroundHover: '#444444',
					borderHover: '#444444',
					hoverEffect: 'revealBorder',
				} ],
			},
			displayShadow: {
				type: 'boolean',
				default: false,
			},
			shadow: {
				type: 'array',
				default: [ {
					color: '#000000',
					opacity: 0,
					spread: 0,
					blur: 0,
					hOffset: 0,
					vOffset: 0,
				} ],
			},
			shadowHover: {
				type: 'array',
				default: [ {
					color: '#000000',
					opacity: 0.2,
					spread: 0,
					blur: 14,
					hOffset: 0,
					vOffset: 0,
				} ],
			},
		},
		save: ( { attributes } ) => {
			const { uniqueID, link, linkProperty, target, hAlign, mediaType, mediaImage, mediaIcon, mediaAlign, displayTitle, title, titleFont, displayText, contentText, displayLearnMore, learnMore, className } = attributes;
			const titleTagName = 'h' + titleFont[ 0 ].level;
			return (
				<div id={ `bst-info-box${ uniqueID }` } className={ className }>
					{ linkProperty !== 'learnmore' && (
						<a className={ `bst-blocks-info-box-link-wrap bst-blocks-info-box-media-align-${ mediaAlign } bst-info-halign-${ hAlign }` } target={ target } href={ link }>
							<div className={ `bst-blocks-info-box-media bst-info-media-animate-${ 'image' === mediaType ? mediaImage[ 0 ].hoverAnimation : mediaIcon[ 0 ].hoverAnimation }` }>
								{ mediaImage[ 0 ].url && 'image' === mediaType && (
									<div className="base-info-box-image-inner-intrisic-container" style={ {
										maxWidth: mediaImage[ 0 ].maxWidth + 'px',
									} } >
										<div className={ `base-info-box-image-intrisic bst-info-animate-${ mediaImage[ 0 ].hoverAnimation }` } style={ {
											paddingBottom: ( ( mediaImage[ 0 ].height / mediaImage[ 0 ].width ) * 100 ) + '%',
										} } >
											<div className="base-info-box-image-inner-intrisic">
												<img
													src={ mediaImage[ 0 ].url }
													alt={ mediaImage[ 0 ].alt }
													width={ mediaImage[ 0 ].width }
													height={ mediaImage[ 0 ].height }
													className={ mediaImage[ 0 ].id ? `bst-info-box-image wp-image-${ mediaImage[ 0 ].id }` : 'bst-info-box-image wp-image-offsite' }
												/>
												{ mediaImage[ 0 ].flipUrl && 'flip' === mediaImage[ 0 ].hoverAnimation && (
													<img
														src={ mediaImage[ 0 ].flipUrl }
														alt={ mediaImage[ 0 ].flipAlt }
														width={ mediaImage[ 0 ].flipWidth }
														height={ mediaImage[ 0 ].flipHeight }
														className={ mediaImage[ 0 ].flipId ? `bst-info-box-image-flip wp-image-${ mediaImage[ 0 ].flipId }` : 'bst-info-box-image-flip wp-image-offsite' }
													/>
												) }
											</div>
										</div>
									</div>
								) }
								{ 'icon' === mediaType && (
									<div className={ `base-info-box-icon-container bst-info-icon-animate-${ mediaIcon[ 0 ].hoverAnimation }` } >
										<div className={ 'base-info-box-icon-inner-container' } >
											<IconRender className={ `bst-info-svg-icon bst-info-svg-icon-${ mediaIcon[ 0 ].icon }` } name={ mediaIcon[ 0 ].icon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
												display: 'block',
											} } />
											{ mediaIcon[ 0 ].flipIcon && 'flip' === mediaIcon[ 0 ].hoverAnimation && (
												<IconRender className={ `bst-info-svg-icon-flip bst-info-svg-icon-${ mediaIcon[ 0 ].flipIcon }` } name={ mediaIcon[ 0 ].flipIcon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
													display: 'block',
												} } />
											) }
										</div>
									</div>
								) }
							</div>
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
								{ displayLearnMore && (
									<div className="bst-blocks-info-box-learnmore-wrap">
										<RichText.Content
											className="bst-blocks-info-box-learnmore"
											tagName={ 'span' }
											value={ learnMore }
										/>
									</div>
								) }
							</div>
						</a>
					) }
					{ linkProperty === 'learnmore' && (
						<div className={ `bst-blocks-info-box-link-wrap bst-blocks-info-box-media-align-${ mediaAlign } bst-info-halign-${ hAlign }` }>
							<div className={ `bst-blocks-info-box-media bst-info-media-animate-${ 'image' === mediaType ? mediaImage[ 0 ].hoverAnimation : mediaIcon[ 0 ].hoverAnimation }` }>
								{ mediaImage[ 0 ].url && 'image' === mediaType && (
									<div className="base-info-box-image-inner-intrisic-container" style={ {
										maxWidth: mediaImage[ 0 ].maxWidth + 'px',
									} } >
										<div className={ `base-info-box-image-intrisic bst-info-animate-${ mediaImage[ 0 ].hoverAnimation }` } style={ {
											paddingBottom: ( ( mediaImage[ 0 ].height / mediaImage[ 0 ].width ) * 100 ) + '%',
										} } >
											<div className="base-info-box-image-inner-intrisic">
												<img
													src={ mediaImage[ 0 ].url }
													alt={ mediaImage[ 0 ].alt }
													width={ mediaImage[ 0 ].width }
													height={ mediaImage[ 0 ].height }
													className={ mediaImage[ 0 ].id ? `bst-info-box-image wp-image-${ mediaImage[ 0 ].id }` : 'bst-info-box-image wp-image-offsite' }
												/>
												{ mediaImage[ 0 ].flipUrl && 'flip' === mediaImage[ 0 ].hoverAnimation && (
													<img
														src={ mediaImage[ 0 ].flipUrl }
														alt={ mediaImage[ 0 ].flipAlt }
														width={ mediaImage[ 0 ].flipWidth }
														height={ mediaImage[ 0 ].flipHeight }
														className={ mediaImage[ 0 ].flipId ? `bst-info-box-image-flip wp-image-${ mediaImage[ 0 ].flipId }` : 'bst-info-box-image-flip wp-image-offsite' }
													/>
												) }
											</div>
										</div>
									</div>
								) }
								{ 'icon' === mediaType && (
									<div className={ `base-info-box-icon-container bst-info-icon-animate-${ mediaIcon[ 0 ].hoverAnimation }` } >
										<div className={ 'base-info-box-icon-inner-container' } >
											<IconRender className={ `bst-info-svg-icon bst-info-svg-icon-${ mediaIcon[ 0 ].icon }` } name={ mediaIcon[ 0 ].icon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
												display: 'block',
											} } />
											{ mediaIcon[ 0 ].flipIcon && 'flip' === mediaIcon[ 0 ].hoverAnimation && (
												<IconRender className={ `bst-info-svg-icon-flip bst-info-svg-icon-${ mediaIcon[ 0 ].flipIcon }` } name={ mediaIcon[ 0 ].flipIcon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
													display: 'block',
												} } />
											) }
										</div>
									</div>
								) }
							</div>
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
								{ displayLearnMore && (
									<div className="bst-blocks-info-box-learnmore-wrap">
										<RichText.Content
											className="bst-blocks-info-box-learnmore"
											tagName={ 'a' }
											target={ target }
											value={ learnMore }
											href={ link }
										/>
									</div>
								) }
							</div>
						</div>
					) }
				</div>
			)
		}
	}
];

export default deprecated;
