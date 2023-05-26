/**
 * WordPress dependencies
 */
const getStringBetween = (str, start, end, verify ) => {
	// Check if form is there?
	if ( ! str.includes( verify ) ) {
		return '';
	}
	// get the start of the submit button.
	const startpos = str.indexOf(start);
	if ( ! startpos ) {
		return '';
	}
	const pos = startpos + start.length;
    return str.substring(pos, str.indexOf(end, pos));
}
/**
 * WordPress dependencies
 */
const getStringBetweenWhen = (str, start, end, verify, from ) => {
	// Check if form is there?
	if ( ! str.includes( verify ) ) {
		return '';
	}	
	// get the start of the submit button.
	const startpos = str.indexOf( start, from );
	if ( ! startpos ) {
		return '';
	}
	const pos = startpos + start.length;
	const endPost = str.indexOf(end, pos);
	const sub = str.substring(pos, endPost );
	if ( ! sub ) {
		return '';
	}
	if ( ! sub.includes( verify ) ) {
		return getStringBetweenWhen( str, start, end, verify, endPost + end.length )
	}
    return sub;
}
export default function replaceColors( content, style ) {
	if ( ! content ) {
		return content;
	}
	if ( ! style ) {
		return content;
	}
	if ( 'dark' !== style && 'highlight' !== style ) {
		return content;
	}
	// Swap Logos
	content = content.replace(/Logo-ploaceholder.png/g, "Logo-ploaceholder-white.png");
	content = content.replace(/Logo-ploaceholder-1.png/g, "Logo-ploaceholder-1-white.png");
	content = content.replace(/Logo-ploaceholder-2.png/g, "Logo-ploaceholder-2-white.png");
	content = content.replace(/Logo-ploaceholder-3.png/g, "Logo-ploaceholder-3-white.png");
	content = content.replace(/Logo-ploaceholder-4.png/g, "Logo-ploaceholder-4-white.png");
	content = content.replace(/Logo-ploaceholder-5.png/g, "Logo-ploaceholder-5-white.png");
	content = content.replace(/Logo-ploaceholder-6.png/g, "Logo-ploaceholder-6-white.png");
	content = content.replace(/Logo-ploaceholder-7.png/g, "Logo-ploaceholder-7-white.png");
	content = content.replace(/Logo-ploaceholder-8.png/g, "Logo-ploaceholder-8-white.png");

	if ( 'dark' === style ) {
		// Handle tabs.
		let tab_content = getStringBetween( content, 'wp:base/tabs', 'wp:base/tab', 'bsb-pattern-active-tab-highlight' );
		if ( tab_content ) {
			let tab_content_org = tab_content;
			tab_content =  tab_content.replace( /"titleColorActive":"palette9"/g, '"titleColorActive":"ph-bsb-pal9"' );
			tab_content =  tab_content.replace( /"titleColorHover":"palette9"/g, '"titleColorHover":"ph-bsb-pal9"' );
			content = content.replace( tab_content_org, tab_content );
		}
		
		// Special testimonial issue.
		let white_text_content = getStringBetweenWhen( content, '<!-- wp:base/column', 'bst-inside-inner-col', 'bsb-pattern-light-color', 0 );
		if ( white_text_content ) {
			let white_text_content_org = white_text_content;
			white_text_content =  white_text_content.replace( /"textColor":"palette9"/g, '"textColor":"ph-bsb-pal9"' );
			white_text_content =  white_text_content.replace( /"linkColor":"palette9"/g, '"linkColor":"ph-bsb-pal9"' );
			white_text_content =  white_text_content.replace( /"linkHoverColor":"palette9"/g, '"linkHoverColor":"ph-bsb-pal9"' );
			content = content.replace( white_text_content_org, white_text_content );
		}
		// Color Map Switch
		// 3 => 9
		// 4 => 8
		// 5 => 7
		// 6 => 7
		// 7 => 3
		// 8 => 3
		// 9 => 4
		content = content.replace( /has-theme-palette-3/g, "ph-bsb-class9");
		content = content.replace( /has-theme-palette-4/g, "ph-bsb-class8");
		content = content.replace( /has-theme-palette-5/g, "ph-bsb-class7");
		content = content.replace( /has-theme-palette-6/g, "ph-bsb-class7");
		content = content.replace( /has-theme-palette-7/g, "ph-bsb-class3");
		content = content.replace( /has-theme-palette-8/g, "ph-bsb-class3");
		content = content.replace( /has-theme-palette-9/g, "ph-bsb-class4");
		content = content.replace( /theme-palette3/g, "ph-class-bsb-pal9");
		content = content.replace( /theme-palette4/g, "ph-class-bsb-pal8");
		content = content.replace( /theme-palette5/g, "ph-class-bsb-pal7");
		content = content.replace( /theme-palette6/g, "ph-class-bsb-pal7");
		content = content.replace( /theme-palette7/g, "ph-class-bsb-pal3");
		content = content.replace( /theme-palette8/g, "ph-class-bsb-pal3");
		content = content.replace( /theme-palette9/g, "ph-class-bsb-pal4");
		content = content.replace( /palette3/g, "ph-bsb-pal9");
		content = content.replace( /palette4/g, "ph-bsb-pal8");
		content = content.replace( /palette5/g, "ph-bsb-pal7");
		content = content.replace( /palette6/g, "ph-bsb-pal7");
		content = content.replace( /palette7/g, "ph-bsb-pal3");
		content = content.replace( /palette8/g, "ph-bsb-pal3");
		content = content.replace( /palette9/g, "ph-bsb-pal4");
	} else if ( 'highlight' === style ) {
		// Handle Forms.
		let form_content = getStringBetween( content, '"submit":[{', ']}', 'wp:base/form' );
		if ( form_content ) {
			let form_content_org = form_content;
			form_content =  form_content.replace( /"color":""/g, '"color":"ph-bsb-pal9"' );
			form_content =  form_content.replace( /"background":""/g, '"background":"ph-bsb-pal3"' );
			form_content =  form_content.replace( /"colorHover":""/g, '"colorHover":"ph-bsb-pal9"' );
			form_content =  form_content.replace( /"backgroundHover":""/g, '"backgroundHover":"ph-bsb-pal4"' );
			content = content.replace( form_content_org, form_content );
		}
		// Handle Buttons differently.
		content = content.replace( /"inheritStyles":"inherit"/g, '"color":"ph-bsb-pal9","background":"ph-bsb-pal3","colorHover":"ph-bsb-pal9","backgroundHover":"ph-bsb-pal4","inheritStyles":"inherit"' );
		// Outline Buttons.
		content = content.replace( /"inheritStyles":"outline"/g, '"color":"ph-bsb-pal3","colorHover":"ph-bsb-pal4","borderStyle":[{"top":["ph-bsb-pal3","",""],"right":["ph-bsb-pal3","",""],"bottom":["ph-bsb-pal3","",""],"left":["ph-bsb-pal3","",""],"unit":"px"}],"borderHoverStyle":[{"top":["ph-bsb-pal4","",""],"right":["ph-bsb-pal4","",""],"bottom":["ph-bsb-pal4","",""],"left":["ph-bsb-pal4","",""],"unit":"px"}],"inheritStyles":"outline"' );

		// Color Map Switch
		// 1 => 9
		// 2 => 8
		// 3 => 9
		// 4 => 9
		// 5 => 8
		// 6 => 7
		// 7 => 2
		// 8 => 2
		// 9 => 1
		content = content.replace( /has-theme-palette-1/g, "ph-bsb-class9");
		content = content.replace( /has-theme-palette-2/g, "ph-bsb-class8");
		content = content.replace( /has-theme-palette-3/g, "ph-bsb-class9");
		content = content.replace( /has-theme-palette-4/g, "ph-bsb-class9");
		content = content.replace( /has-theme-palette-5/g, "ph-bsb-class8");
		content = content.replace( /has-theme-palette-6/g, "ph-bsb-class7");
		content = content.replace( /has-theme-palette-7/g, "ph-bsb-class2");
		content = content.replace( /has-theme-palette-8/g, "ph-bsb-class2");
		content = content.replace( /has-theme-palette-9/g, "ph-bsb-class1");
		content = content.replace( /theme-palette1/g, "ph-class-bsb-pal9");
		content = content.replace( /theme-palette2/g, "ph-class-bsb-pal8");
		content = content.replace( /theme-palette3/g, "ph-class-bsb-pal9");
		content = content.replace( /theme-palette4/g, "ph-class-bsb-pal9");
		content = content.replace( /theme-palette5/g, "ph-class-bsb-pal8");
		content = content.replace( /theme-palette6/g, "ph-class-bsb-pal8");
		content = content.replace( /theme-palette7/g, "ph-class-bsb-pal2");
		content = content.replace( /theme-palette8/g, "ph-class-bsb-pal2");
		content = content.replace( /theme-palette9/g, "ph-class-bsb-pal1");
		content = content.replace( /palette1/g, "ph-bsb-pal9");
		content = content.replace( /palette2/g, "ph-bsb-pal8");
		content = content.replace( /palette3/g, "ph-bsb-pal9");
		content = content.replace( /palette4/g, "ph-bsb-pal9");
		content = content.replace( /palette5/g, "ph-bsb-pal8");
		content = content.replace( /palette6/g, "ph-bsb-pal7");
		content = content.replace( /palette7/g, "ph-bsb-pal2");
		content = content.replace( /palette8/g, "ph-bsb-pal2");
		content = content.replace( /palette9/g, "ph-bsb-pal1");
	}
	// Convert Placeholders
	content = content.replace( /ph-bsb-class1/g, "has-theme-palette-1");
	content = content.replace( /ph-bsb-class2/g, "has-theme-palette-2");
	content = content.replace( /ph-bsb-class3/g, "has-theme-palette-3");
	content = content.replace( /ph-bsb-class4/g, "has-theme-palette-4");
	content = content.replace( /ph-bsb-class5/g, "has-theme-palette-5");
	content = content.replace( /ph-bsb-class6/g, "has-theme-palette-6");
	content = content.replace( /ph-bsb-class7/g, "has-theme-palette-7");
	content = content.replace( /ph-bsb-class8/g, "has-theme-palette-8");
	content = content.replace( /ph-bsb-class9/g, "has-theme-palette-9");
	content = content.replace( /ph-class-bsb-pal1/g, "theme-palette1");
	content = content.replace( /ph-class-bsb-pal2/g, "theme-palette2");
	content = content.replace( /ph-class-bsb-pal3/g, "theme-palette3");
	content = content.replace( /ph-class-bsb-pal4/g, "theme-palette4");
	content = content.replace( /ph-class-bsb-pal5/g, "theme-palette5");
	content = content.replace( /ph-class-bsb-pal6/g, "theme-palette6");
	content = content.replace( /ph-class-bsb-pal7/g, "theme-palette7");
	content = content.replace( /ph-class-bsb-pal8/g, "theme-palette8");
	content = content.replace( /ph-class-bsb-pal9/g, "theme-palette9");
	content = content.replace( /ph-bsb-pal1/g, "palette1");
	content = content.replace( /ph-bsb-pal2/g, "palette2");
	content = content.replace( /ph-bsb-pal3/g, "palette3");
	content = content.replace( /ph-bsb-pal4/g, "palette4");
	content = content.replace( /ph-bsb-pal5/g, "palette5");
	content = content.replace( /ph-bsb-pal6/g, "palette6");
	content = content.replace( /ph-bsb-pal7/g, "palette7");
	content = content.replace( /ph-bsb-pal8/g, "palette8");
	content = content.replace( /ph-bsb-pal9/g, "palette9");

	return content;
}
