/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Placeholder, Button, TextControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { advancedFormIcon } from '@base/icons';

export default function FormTitle( {
									   setTitle,
								   } ) {

	const [ tmpTitle, setTmpTitle ] = useState( '' );

	return (
		<Placeholder
			className="bsb-select-or-create-placeholder"
			icon={advancedFormIcon}
			label={__( 'Base Form', 'gutenam-blocks' )}
		>
			<form className="bsb-select-or-create-placeholder__actions">
				<TextControl
					label={__( 'Give your form a title', 'gutenam-blocks' )}
					placeholder={__( 'Contact Us', 'gutenam-blocks' )}
					value={tmpTitle}
					onChange={setTmpTitle}
				/>

				<Button
					isPrimary
					type="submit"
					disabled={tmpTitle === ''}
					onClick={() => setTitle( tmpTitle )}
				>
					{__( 'Create', 'gutenam-blocks' )}
				</Button>
			</form>
		</Placeholder>
	);
}
