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
	arrowUp,
	arrowLeft,
	arrowRight,
	arrowDown,
} from '@wordpress/icons';

import {
	Dashicon,
	Button,
	ButtonGroup,
} from '@wordpress/components';
import { AlignmentToolbar, JustifyToolbar, BlockVerticalAlignmentToolbar } from '@wordpress/blockEditor';
import './editor.scss';
/**
 * Build the Measure controls
 * @returns {object} Measure settings.
 */
export default function ResponsiveAlignControls( {
	label,
	onChange,
	onChangeTablet,
	onChangeMobile,
	mobileValue,
	tabletValue,
	value,
	isCollapsed = false,
	type = 'textAlign',
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
	let alignmentControls = '';
	let UIComponent = AlignmentToolbar;
	if ( type === 'justify' ) {
		UIComponent = JustifyToolbar;
	} else if ( type === 'vertical' ) {
		UIComponent = BlockVerticalAlignmentToolbar;
	} else if ( type === 'orientation' ) {
		alignmentControls = [
			{
				icon: arrowRight,
				title: __( 'Horizontal Direction' ),
				align: 'row',
			},
			{
				icon: arrowDown,
				title: __( 'Vertical Direction' ),
				align: 'column',
			},
			{
				icon: arrowLeft,
				title: __( 'Horizontal Reverse' ),
				align: 'row-reverse',
			},
			{
				icon: arrowUp,
				title: __( 'Vertical Reverse' ),
				align: 'column-reverse',
			},
		]
	}
	const devices = [
		{
			name: 'Desktop',
			key: 'desktop',
			title: <Dashicon icon="desktop" />,
			itemClass: 'bsb-desk-tab',
		},
		{
			name: 'Tablet',
			key: 'tablet',
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
		<UIComponent
			value={ ( mobileValue ? mobileValue : '' ) }
			isCollapsed={ isCollapsed }
			onChange={ ( align ) => onChangeMobile( align ) }
			alignmentControls={ alignmentControls ? alignmentControls : undefined }
		/>
	);
	output.Tablet = (
		<UIComponent
			value={ ( tabletValue ? tabletValue : '' ) }
			isCollapsed={ isCollapsed }
			onChange={ ( align ) => onChangeTablet( align ) }
			alignmentControls={ alignmentControls ? alignmentControls : undefined }
		/>
	);
	output.Desktop = (
		<UIComponent
			value={ ( value ? value : '' ) }
			isCollapsed={ isCollapsed }
			onChange={ ( align ) => onChange( align ) }
			alignmentControls={ alignmentControls ? alignmentControls : undefined }
		/>
	);
	return [
		onChange && onChangeTablet && onChangeMobile && (
			<div className={ 'components-base-control bsb-sidebar-alignment bsb-responsive-align-control' }>
				<div className="base-title-bar">
					{ label && (
						<span className="base-control-title">{ label }</span>
					) }
					<ButtonGroup className="bsb-measure-responsive-options" aria-label={ __( 'Device', 'gutenam-blocks' ) }>
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
				<div className="bsb-responsive-align-control-inner">
					{ ( output[ deviceType ] ? output[ deviceType ] : output.Desktop ) }
				</div>
			</div>
		),
	];
}
