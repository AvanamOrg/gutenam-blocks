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
import './editor.scss';

/**
 * Build the Measure controls
 * @returns {object} Measure settings.
 */
export default function SmallResponsiveControl( {
		label,
		desktopChildren,
		tabletChildren,
		mobileChildren,
		hasPadding = false,
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
			title: <Dashicon icon="desktop" />,
			itemClass: 'bsb-desk-tab',
		},
		{
			name: 'Tablet',
			title: <Dashicon icon="tablet" />,
			itemClass: 'bsb-tablet-tab',
		},
		{
			name: 'Mobile',
			key: 'mobile',
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
		<div className={ `components-base-control bsb-small-responsive-control${ hasPadding ? ' responsive-title-area-spacing' : '' }` }>
			<div className="base-title-bar">
				{ label && (
					<span className="base-control-title">{ label }</span>
				) }
				<ButtonGroup className="bsb-small-responsive-options" aria-label={ __( 'Device', 'gutenam-blocks' ) }>
					{ map( devices, ( { name, key, title, itemClass } ) => (
						<Button
							key={ key }
							className={ `bsb-responsive-btn ${ itemClass }${ name === deviceType ? ' is-active' : '' }` }
							isSmall
							aria-pressed={ deviceType === name }
							onClick={ () => customSetPreviewDeviceType( name ) }
						>
							{ title }
						</Button>
					) ) }
				</ButtonGroup>
			</div>
			<div className="bsb-small-measure-control-inner">
				{ ( output[ deviceType ] ? output[ deviceType ] : output.Desktop ) }
			</div>
		</div>
	);
}
