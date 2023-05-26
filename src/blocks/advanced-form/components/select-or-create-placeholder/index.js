/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { Placeholder, Button, SelectControl } from '@wordpress/components';
import { advancedFormIcon } from '@base/icons';

export default function SelectOrCreatePlaceholder( {
													   onSelect,
													   isSelecting,
													   onAdd,
													   isAdding,
													   postType = 'post',
													   label = __( 'Post' ),
													   instructions = __(
														   'Select an existing post or create a new one.',
														   'gutenam-blocks'
													   ),
													   placeholder = __( 'Select Post', 'gutenam-blocks' ),
												   } ) {
	const [ selected, setSelected ] = useState( 0 );
	const { posts } = useSelect(
		( selectData ) => ( {
			posts: selectData( 'core' ).getEntityRecords(
				'postType',
				postType,
				{
					per_page: -1,
					orderby: 'title',
					order: 'asc',
				}
			),
		} ),
		[ postType ]
	);
	const options = [
		{ label: placeholder, value: 0 },
		...( posts || [] ).map( ( post ) => ( {
			label: stripTags( post.title.rendered ),
			value: post.id,
		} ) ),
	];

	return (
		<Placeholder
			className="bsb-select-or-create-placeholder"
			icon={ advancedFormIcon }
			label={ label }
			instructions={ instructions }
		>
			<form className="bsb-select-or-create-placeholder__actions">
				<SelectControl
					label={ label }
					hideLabelFromVision
					options={ options }
					onChange={ setSelected }
					value={ selected }
				/>
				<Button
					isPrimary
					type="submit"
					disabled={ ! selected || isAdding }
					isBusy={ isSelecting }
					onClick={ () => onSelect( Number.parseInt( selected ) ) }
				>
					{ __( 'Select' ) }
				</Button>
				<Button
					isSecondary
					onClick={ onAdd }
					disabled={ isSelecting }
					isBusy={ isAdding }
				>
					{ __( 'Create New' ) }
				</Button>
			</form>
		</Placeholder>
	);
}

// From wp-sanitize.js
function stripTags( text ) {
	text = text || '';

	// Do the replacement.
	const _text = text
		.replace( /<!--[\s\S]*?(-->|$)/g, '' )
		.replace( /<(script|style)[^>]*>[\s\S]*?(<\/\1>|$)/gi, '' )
		.replace( /<\/?[a-z][\s\S]*?(>|$)/gi, '' );

	// If the initial text is not equal to the modified text,
	// do the search-replace again, until there is nothing to be replaced.
	if ( _text !== text ) {
		return stripTags( _text );
	}

	// Return the text with stripped tags.
	return _text;
}
