import {
	Fragment,
	useState,
} from '@wordpress/element';
import {
	Dashicon,
	Tooltip,
	SelectControl,
	Button,
	Modal,
} from '@wordpress/components';
import { map } from 'lodash';
import { useDispatch } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';

import {
	bottomLeftIcon,
	bottomRightIcon,
	radiusIndividualIcon,
	radiusLinkedIcon,
	topLeftIcon,
	topRightIcon,
} from '@base/icons';
/**
 * Internal block libraries
 */
import { __ } from '@wordpress/i18n';

function BaseVisibilitySettings( { blockSlug, blockName, options, icon, showBlockWideSettings = true } ) {

	const [ isOpen, setIsOpen ] = useState( false );
	const [ hasChanges, setHasChanges ] = useState( false );
	const [ isSaving, setIsSaving ] = useState( false );
	const [ settings, setSettings ] = useState( ( base_blocks_params.settings ? JSON.parse( base_blocks_params.settings ) : {} ) );
	const { createErrorNotice } = useDispatch( noticesStore );

	const saveConfig = ( blockID, settingArray ) => {

		setIsSaving( true );

		const config = ( base_blocks_params.settings ? JSON.parse( base_blocks_params.settings ) : {} );
		if ( !config[ blockID ] ) {
			config[ blockID ] = {};
		}
		config[ blockID ] = settingArray;
		const settingModel = new wp.api.models.Settings( { base_blocks_settings_blocks: JSON.stringify( config ) } );

		settingModel.save().then( response => {
			createErrorNotice( __( 'Block visibility saved!', 'gutenam-blocks' ), {
				type: 'snackbar',
			} );

			setIsSaving( false );
			setSettings( config );
			setIsOpen( false );
			setHasChanges( false );

			base_blocks_params.settings = JSON.stringify( config );

		} );
	};

	const saveConfigState = ( key, value ) => {
		const config = settings;

		if ( !config[ 'base/' + blockSlug ] ) {
			config[ 'base/' + blockSlug ] = {};
		}
		config[ 'base/' + blockSlug ][ key ] = value;

		setHasChanges( true );
		setSettings( config );
	};

	const resetSettings = () => {
		const config = ( base_blocks_params.settings ? JSON.parse( base_blocks_params.settings ) : {} );
		setSettings( config );

		setHasChanges( false );
		setIsOpen( false );
	};

	const blockSettings = ( settings && settings[ 'base/' + blockSlug ] ? settings[ 'base/' + blockSlug ] : {} );

	return (
		<Fragment>
			<Tooltip text="Block Settings Visibility">
				<Button className="bsb-block-settings-visibility" onClick={() => setIsOpen( true )}>
					<div className="bst-block-defaults">
						<span className="bst-block-icon">{icon}</span>
						{blockName}
					</div>
					<div className="bst-block-settings">
						<Dashicon icon="visibility"/>
					</div>
				</Button>
			</Tooltip>

			{isOpen &&
				<Modal
					className="bst-block-settings-modal"
					title={__( blockName + ' Settings', 'gutenam-blocks' )}
					onRequestClose={() => {
						resetSettings();
					}}>

					{showBlockWideSettings &&
						<>
							<h2>{__( 'Control All Block Settings', 'gutenam-blocks' )}</h2>

							<SelectControl
								label={__( 'Enabled All Settings For', 'gutenam-blocks' )}
								value={( blockSettings.allSettings ? blockSettings.allSettings : 'all' )}
								options={[
									{ value: 'all', label: __( 'All Users', 'gutenam-blocks' ) },
									{ value: 'contributor', label: __( 'Minimum User Role Contributor', 'gutenam-blocks' ) },
									{ value: 'author', label: __( 'Minimum User Role Author', 'gutenam-blocks' ) },
									{ value: 'editor', label: __( 'Minimum User Role Editor', 'gutenam-blocks' ) },
									{ value: 'admin', label: __( 'Minimum User Role Admin', 'gutenam-blocks' ) },
									{ value: 'none', label: __( 'No Users', 'gutenam-blocks' ) },
								]}
								onChange={( value ) => saveConfigState( 'allSettings', value )}
							/>
						</>
					}

					<h2>{__( 'Control Individual Settings Groups', 'gutenam-blocks' )}</h2>

					{map( options, ( { key, label, requiresPro = false, initial = 'all' } ) => (
							( !requiresPro || ( requiresPro && base_blocks_params.pro === 'true')  ) &&
							<SelectControl
								label={label}
								value={( blockSettings[ key ] ? blockSettings[ key ] : ( initial ? initial : 'all' ) )}
								options={[
									{ value: 'all', label: __( 'All Users', 'gutenam-blocks' ) },
									{ value: 'contributor', label: __( 'Minimum User Role Contributor', 'gutenam-blocks' ) },
									{ value: 'author', label: __( 'Minimum User Role Author', 'gutenam-blocks' ) },
									{ value: 'editor', label: __( 'Minimum User Role Editor', 'gutenam-blocks' ) },
									{ value: 'admin', label: __( 'Minimum User Role Admin', 'gutenam-blocks' ) },
									{ value: 'none', label: __( 'No Users', 'gutenam-blocks' ) },
								]}
								onChange={( value ) => saveConfigState( key, value )}
							/>
						),
					)}

					<Button className="bst-settings-save" isPrimary isBusy={isSaving} disabled={!hasChanges}
							onClick={() => {
								saveConfig( 'base/' + blockSlug, blockSettings );
							}}>

						{__( 'Save', 'gutenam-blocks' )}

					</Button>

					<Button className="bst-settings-save" isDestructive style={{ float: 'right' }}
							onClick={() => {
								resetSettings();
							}}>
						{__( 'Close', 'gutenam-blocks' )}
					</Button>
				</Modal>
			}
		</Fragment>
	);

}

export default BaseVisibilitySettings;
