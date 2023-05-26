/**
 * Responsive Range Component
 *
 */

/**
 * Internal block libraries
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { map } from 'lodash';
import { capitalizeFirstLetter } from '@base/helpers'
import {
	Dashicon,
	Button,
	ButtonGroup,
} from '@wordpress/components';
/**
 * Import Css
 */
 import './editor.scss';
/**
 * Build the Measure controls
 * @returns {object} Measure settings.
 */
export default function ResponsiveControl( {
		desktopChildren,
		tabletChildren,
		mobileChildren,
	} ) {
	const [ deviceType, setDeviceType ] = useState( 'Desktop' );
	const theDevice = useSelect( ( select ) => {
		return select( 'baseblocks/data' ).getPreviewDeviceType();
	}, [] );
	if ( theDevice !== deviceType ) {
		setDeviceType( theDevice );
	}
	const {
		setPreviewDeviceType,
	} = useDispatch( 'baseblocks/data' );
	const customSetPreviewDeviceType = ( device ) => {
		setPreviewDeviceType( capitalizeFirstLetter( device ) );
		setDeviceType( capitalizeFirstLetter( device ) );
	};
	const devices = [
		{
			name: 'Desktop',
			key: 'desktop',
			label: __( 'Desktop', 'gutenam-blocks' ),
			title: <Dashicon icon="desktop" />,
			itemClass: 'bsb-desk-tab',
		},
		{
			name: 'Tablet',
			key: 'tablet',
			label: __( 'Tablet', 'gutenam-blocks' ),
			title: <Dashicon icon="tablet" />,
			itemClass: 'bsb-tablet-tab',
		},
		{
			name: 'Mobile',
			key: 'mobile',
			label: __( 'Mobile', 'gutenam-blocks' ),
			title: <Dashicon icon="smartphone" />,
			itemClass: 'bsb-mobile-tab',
		},
	];
	const output = {};
	output.Mobile = (
		mobileChildren
	);
	output.Tablet = (
		tabletChildren
	);
	output.Desktop = (
		desktopChildren
	);
	return (
		<div className={ 'components-base-control bst-inspect-tabs bsb-responsive-control' }>
			<div className="base-title-bar">
				<ButtonGroup className="components-tab-panel__tabs" aria-label={ __( 'Device', 'gutenam-blocks' ) }>
					{ map( devices, ( { name, key, title, itemClass, label } ) => (
						<Button
							key={ key }
							className={ `components-tab-panel__tabs-item ${ itemClass }${ name === deviceType ? ' active-tab' : '' }` }
							aria-pressed={ deviceType === name }
							aria-label={ label }
							onClick={ () => customSetPreviewDeviceType( name ) }
						>
							{ title }
						</Button>
					) ) }
				</ButtonGroup>
			</div>
			<div className="bsb-responsive-control-inner">
				{ ( output[ deviceType ] ? output[ deviceType ] : output.Desktop ) }
			</div>
		</div>
	);
}
