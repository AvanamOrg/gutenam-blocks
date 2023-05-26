/**
 * BLOCK: Base Theme Header
 */

/**
 * Import Icons
 */
import { blockTabsIcon } from '@base/icons';

/**
 * Import Css
 */
// import './style.scss';
// import './editor.scss';

/**
 * Internal block libraries
 */
const { __, sprintf } = wp.i18n;
import { registerBlockType } from '@wordpress/blocks';
import ServerSideRender from '@wordpress/server-side-render';
import { useBlockProps } from '@wordpress/block-editor';
/**
 * Register: a Gutenberg Block.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'base/theme-header', {
	title: __( 'Theme Header', 'gutenam-blocks' ),
	icon: {
		src: blockTabsIcon,
	},
	category: 'gutenam-blocks',
	keywords: [
		__( 'header', 'gutenam-blocks' ),
		__( 'theme', 'gutenam-blocks' ),
		'BB',
	],
	supports: {
		anchor: true,
		align: [ 'wide', 'full' ],
	},
	edit: function ( props ) {
        const blockProps = useBlockProps();
        return (
            <div { ...blockProps }>
                <ServerSideRender
                    block="base/theme-header"
                    attributes={ props.attributes }
                />
            </div>
        );
    },
	save() {
		return null;
	},
} );
