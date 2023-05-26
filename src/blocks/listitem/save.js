/**
 * BLOCK: Base Spacer
 */

import {
    useBlockProps,
} from '@wordpress/block-editor';
import { dispatch, select } from "@wordpress/data";
import { RichText } from '@wordpress/block-editor';

/**
 * Base dependencies
 */
import { IconSpanTag } from '@base/components';
/**
 * External dependencies
 */
import classnames from 'classnames';

function Save( props ) {

    const { attributes, clientId } = props;
    const {
        uniqueID,
        icon,
        link,
        target,
        width,
        text,
        style,
        level,
		showIcon,
		size
    } = attributes;

    const classes = classnames( {
		'bst-svg-icon-list-item-wrap': true,
		[ `bst-svg-icon-list-item-${ uniqueID }` ]: uniqueID,
		[ `bst-svg-icon-list-style-${ style }` ]: style,
		[ `bst-svg-icon-list-level-${ level }` ]: level,
	} );

	const blockProps = useBlockProps.save( {
		className: classes,
	} );

    const iconName = icon ? icon : 'USE_PARENT_DEFAULT_ICON';

	const iconSpan = (
		<IconSpanTag extraClass={ 'bst-svg-icon-list-single' } name={ iconName } strokeWidth={ ( 'fe' === icon.substring( 0, 2 ) ? width : undefined ) } ariaHidden={ 'true' } />
	);

	const emptyIcon = ( size === 0 ?
			<></>
			:
			<div className="bst-svg-icon-list-single" style="display: inline-flex; justify-content: center; align-items: center;">
				<svg viewBox="0 0 24 24" height="1em" width="1em" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" style="display: inline-block; vertical-align: middle;">
				</svg>
			</div>
	);

    return (
        <li {...blockProps}>
            { link && (
                <a href={ link } className={ 'bst-svg-icon-link' } target={ ( '_blank' === target ? target : undefined ) } rel={ '_blank' === target ? 'noopener noreferrer' : undefined }>
					{ showIcon ? iconSpan : emptyIcon }
                    <RichText.Content
                        tagName="span"
                        value={ text }
                        className={ 'bst-svg-icon-list-text' }
                    />
                </a>
            ) }
            { ! link && (
                <>
					{ showIcon ? iconSpan : emptyIcon }
					<RichText.Content
                        tagName="span"
                        value={ text }
                        className={ 'bst-svg-icon-list-text' }
                    />
                </>
            ) }
        </li>
    );
}

export default Save;
