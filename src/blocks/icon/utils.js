/**
 * Utilities for the icon list block.
 */
import { createBlock } from '@wordpress/blocks';
import { times } from 'lodash';

export function migrateToInnerblocks( attributes ) {
    const { icons, iconCount, blockAlignment, textAlignment } = attributes;
    let iconInnerBlocks = [];
    if ( icons?.length ) {
        times( iconCount, n => {
            let icon = icons[n];
            if ( undefined === icon?.padding?.[0] ) {
                const tempPadding = parseInt( icon.padding, 10 );
                icon.padding = [ tempPadding, tempPadding, tempPadding, tempPadding ];
            }
            if ( undefined === icon?.margin?.[0] ) {
                icon.margin = [ '', '', '', '' ];
            }
            if ( undefined !== icon?.marginTop && icon.marginTop ) {
                icon.margin[0] = ( icon.marginTop ? parseInt( icon.marginTop, 10 ) : '');
            }
            if ( undefined !== icon?.marginRight && icon.marginRight ) {
                icon.margin[1] = ( icon.marginRight ? parseInt( icon.marginRight, 10 ) : '');
            }
            if ( undefined !== icon?.marginBottom && icon.marginBottom ) {
                icon.margin[2] = ( icon.marginBottom ? parseInt( icon.marginBottom, 10 ) : '');
            }
            if ( undefined !== icon?.marginLeft && icon.marginLeft ) {
                icon.margin[3] = ( icon.marginLeft ? parseInt( icon.marginLeft, 10 ) : '');
            }
            let newAttrs = { ...icon };
            iconInnerBlocks.push( createBlock( 'base/single-icon', newAttrs ) );
        });
    }
    let newAlign = blockAlignment;
    let newTextAlignment = textAlignment;
    if ( blockAlignment === 'center' ) {
        newAlign = 'none';
        newTextAlignment = 'center';
    }

    let iconParentAttributes = { ...attributes, blockAlignment: newAlign, textAlignment: newTextAlignment, icons: [], iconCount: 1 }

    return [ iconParentAttributes, iconInnerBlocks ];
}