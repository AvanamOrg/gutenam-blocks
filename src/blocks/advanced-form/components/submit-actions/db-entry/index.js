/**
 * Db Entry Controls
 *
 */

/**
 * Internal block libraries
 */
import { __ } from '@wordpress/i18n';
import {
	Fragment,
	useEffect,
	useMemo,
	useState,
} from '@wordpress/element';
import {
	TextControl,
	Button,
	Spinner,
	ToggleControl,
	SelectControl,
	ExternalLink,
} from '@wordpress/components';
import { BasePanelBody } from '@base/components';

/**
 * Build the Measure controls
 * @returns {object} Measure settings.
 */
function DbEntryOptions( { settings, save } ) {

	return (
		<BasePanelBody
			title={__( 'Database Entry Settings', 'gutenam-blocks' )}
			initialOpen={false}
			panelName={'bsb-db-entry-settings'}
		>
			<TextControl
				label={__( 'Form Name', 'gutenam-blocks' )}
				value={( undefined !== settings.name ? settings.name : '' )}
				onChange={( value ) => save( { name: value } )}
			/>
			<ToggleControl
				label={__( 'Save User IP Address', 'gutenam-blocks' )}
				help={__( 'Saves the entrants IP address with the form data', 'gutenam-blocks' )}
				checked={( undefined !== settings.userIP ? settings.userIP : true )}
				onChange={( value ) => save( { userIP: value } )}
			/>
			<ToggleControl
				label={__( 'Save User Device', 'gutenam-blocks' )}
				help={__( 'Saves the entrants device with form data', 'gutenam-blocks' )}
				checked={( undefined !== settings.userDevice ? settings.userDevice : true )}
				onChange={( value ) => save( { userDevice: value } )}
			/>
		</BasePanelBody>
	);
}

export default ( DbEntryOptions );
