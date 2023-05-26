/**
 * WordPress dependencies
 */
const getStringBetween = (str, start, end, from ) => {
	// Check if form is there?
	if ( ! str.includes( 'bsb-pattern-delete-block' ) ) {
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
	if ( ! sub.includes( 'bsb-pattern-delete-block' ) ) {
		return getStringBetween( str, start, end, endPost + end.length )
	}
    return sub;
}
export default function removeContent( content ) {
	
	if ( ! content ) {
		return content;
	}
	let remove_content = getStringBetween( content, '<!-- wp:base/column', '<!-- /wp:base/column -->', 0 );
	if ( remove_content ) {
		content = content.replace( '<!-- wp:base/column' + remove_content + '<!-- /wp:base/column -->', '' );
	}
		
	return content;
}
