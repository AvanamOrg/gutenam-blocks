/**
 * BLOCK: Base Advanced Form
 */

/**
 * Import Css
 */
import './editor.scss';

/**
 * Internal block libraries
 */
import { __ } from '@wordpress/i18n';
import { isEmpty } from 'lodash';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import { advancedFormIcon } from '@base/icons';

import { useBlockProps } from '@wordpress/block-editor';
import {
	Placeholder,
	Spinner,
} from '@wordpress/components';
import {
	store as coreStore,
	EntityProvider,
} from '@wordpress/core-data';

import { useEntityAutoDraft } from './hooks';
import { SelectOrCreatePlaceholder } from './components';
import { getUniqueId } from '@base/helpers';


/**
 * Internal dependencies
 */
import EditInner from './edit-inner';
import { useEffect } from '@wordpress/element';

export function Edit( props ) {

	const {
		attributes,
		setAttributes,
		clientId,
	} = props;

	const { id, uniqueID } = attributes;

	const blockProps = useBlockProps();

	const { post, currentPostType } = useSelect(
		( select ) => ( {
			post:
				id &&
				select( coreStore ).getEditedEntityRecord(
					'postType',
					'base_form',
					id,
				),
			currentPostType: select( editorStore ).getCurrentPostType(),
		} ),
		[ id ],
	);

	const { addUniqueID } = useDispatch( 'baseblocks/data' );
	const { isUniqueID, isUniqueBlock } = useSelect(
		( select ) => {
			return {
				isUniqueID: ( value ) => select( 'baseblocks/data' ).isUniqueID( value ),
				isUniqueBlock: ( value, clientId ) => select( 'baseblocks/data' ).isUniqueBlock( value, clientId ),
			};
		},
		[ clientId ]
	);

	useEffect( () => {
		let uniqueId = getUniqueId( uniqueID, clientId, isUniqueID, isUniqueBlock );
		if ( uniqueId !== uniqueID ) {
			attributes.uniqueID = uniqueId;
			setAttributes( { uniqueID: uniqueId } );
			addUniqueID( uniqueId, clientId );
		} else {
			addUniqueID( uniqueId, clientId );
		}
	}, [] );

	{/* Directly editing from via base_form post type */}
	if ( currentPostType === 'base_form' ) {
		return (
			<div {...blockProps}>
				<EditInner {...props} direct={true} id={ id }/>
			</div>
		);
	}

	return (
		<div {...blockProps}>
			{/* No form selected, display chooser */}
			{id === 0 && (
				<Chooser
					id={id}
					post={post}
					commit={( nextId ) => setAttributes( { id: nextId } )}
				/>
			)}

			{/* Form selected but not loaded yet, show spinner */}
			{id > 0 && isEmpty( post ) && (
				<Placeholder
					className="bsb-select-or-create-placeholder"
					label={__( 'Base Form', 'gutenam-blocks' )}
					icon={ advancedFormIcon }
				>
					<Spinner/>
				</Placeholder>
			)}

			{id > 0 && !isEmpty( post ) && post.status === "trash" && (
				<>
					<Placeholder
						className="bsb-select-or-create-placeholder"
						label={__( 'Base Form', 'gutenam-blocks' )}
						icon={ advancedFormIcon }
					>
						{ __( 'The selected from is in the trash.', 'gutenam-blocks' ) }
					</Placeholder>
				</>
			)}

			{/* Form selected and loaded, display form */}
			{id > 0 && !isEmpty( post ) && post.status !== 'trash' && (
				<EntityProvider kind="postType" type="base_form" id={id}>
					<EditInner {...props} direct={false} id={id}/>
				</EntityProvider>
			)}
		</div>
	);
}

export default ( Edit );

function Chooser( { id, post, commit } ) {
	const [ isAdding, addNew ] = useEntityAutoDraft( 'base_form', 'base_form' );
	const onAdd = async () => {
		try {
			const response = await addNew();
			commit( response.id );
		} catch ( error ) {
			console.error( error );
		}
	};

	return (
		<SelectOrCreatePlaceholder
			postType="base_form"
			label={__( 'Base Form', 'gutenam-blocks' )}
			instructions={__(
				'Select an existing form or create a new one.',
				'gutenam-blocks',
			)}
			placeholder={__( 'Select Form', 'gutenam-blocks' )}
			onSelect={commit}
			isSelecting={id && isEmpty( post )}
			onAdd={onAdd}
			isAdding={isAdding}
		/>
	);
}
