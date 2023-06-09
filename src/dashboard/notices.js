/**
 * WordPress dependencies
 */
import { withSelect, withDispatch } from '@wordpress/data';
import { SnackbarList } from '@wordpress/components';

export default function Notices() {
	const notices = useSelect(
		( select ) =>
			select( 'core/notices' )
				.getNotices()
				.filter( ( notice ) => notice.type === 'snackbar' ),
		[]
	);
	const { removeNotice } = useDispatch( 'core/notices' );
	return (
		<SnackbarList
			className="components-editor-notices__snackbar"
			notices={ notices }
			onRemove={ removeNotice }
		/>
	);
}
