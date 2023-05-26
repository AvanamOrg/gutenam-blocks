/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import apiFetch from '@wordpress/api-fetch';

/**
 * Handles creating an auto-draft for the given post type.
 *
 * @param {string} restBase The base path for the post type.
 * @return {(boolean | (function(): Promise<{id: number}>))[]} Creating status, and a creation trigger function.
 */
export function useEntityAutoDraft( restBase, postType = 'post' ) {
	const [ isCreating, setIsCreating ] = useState( false );
	const { receiveEntityRecords } = useDispatch( coreStore );

	const create = async () => {
		setIsCreating( true );

		try {
			const response = await apiFetch( {
				method: 'POST',
				path: `/wp/v2/${ restBase }/auto-draft`,
				data: {
					post_type: postType,
				}
			} );

			receiveEntityRecords( 'postType', response.type, [ response ] );

			return response;
		} finally {
			setIsCreating( false );
		}
	};

	return [ isCreating, create ];
}
