/**
 * Base Blocks
 *
 */
// Utils
import './plugins/base-control.js';
import './plugins/editor-width.js';
//import './plugins/prebuilt-library/toolbar-library';
if ( typeof bst_blocks_default_size !== 'undefined' ) {
	wp.data.dispatch( 'core/editor' ).updateEditorSettings( { maxWidth: bst_blocks_default_size } );
}
