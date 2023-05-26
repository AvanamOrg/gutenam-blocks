/**
 * Responsive Range Component
 *
 */

/**
 * Internal block libraries
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useRef, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { map, isEqual } from 'lodash';
import BorderControl from '../border-control';
import { capitalizeFirstLetter } from '@base/helpers';
import { undo } from '@wordpress/icons';
/**
* WordPress dependencies
*/
import { useInstanceId } from '@wordpress/compose';
import {
	Dashicon,
	Button,
	ButtonGroup,
} from '@wordpress/components';
import {
	outlineTopIcon,
	outlineRightIcon,
	outlineBottomIcon,
	outlineLeftIcon,
} from '@base/icons';
import { settings, link, linkOff } from '@wordpress/icons';
/**
 * Build the Measure controls
 * @returns {object} Measure settings.
 */
export default function ResponsiveBorderControl( {
	   label,
	   onChange,
	   onChangeTablet,
	   onChangeMobile,
	   onControl,
	   mobileValue = '',
	   tabletValue = '',
	   value = '',
	   control = 'individual',
	   units = [ 'px', 'em', 'rem' ],
	   firstIcon = outlineTopIcon,
	   secondIcon = outlineRightIcon,
	   thirdIcon = outlineBottomIcon,
	   fourthIcon = outlineLeftIcon,
	   linkIcon = link,
	   unlinkIcon = linkOff,
	   styles = ['solid', 'dashed', 'dotted', 'double'],
	   deskDefault = {
		   top: ['','',''],
		   right: ['','',''],
		   bottom: ['','',''],
		   left: ['','',''],
		   unit: 'px',
	   },
	   tabletDefault = {
		   top: ['','',''],
		   right: ['','',''],
		   bottom: ['','',''],
		   left: ['','',''],
		   unit: '',
	   },
	   mobileDefault = {
		   top: ['','',''],
		   right: ['','',''],
		   bottom: ['','',''],
		   left: ['','',''],
		   unit: '',
	   },
	   reset = true,
	   defaultLinked = true,
	} ) {
   const instanceId = useInstanceId( ResponsiveBorderControl );
	const measureIcons = {
	   first: firstIcon,
	   second: secondIcon,
	   third: thirdIcon,
	   fourth:  fourthIcon,
	   link:  linkIcon,
	   unlink: unlinkIcon,
   }
	const [ theControl, setTheControl ] = useState( control );
	const realControl = onControl ? control : theControl;
	const realSetOnControl = onControl ? onControl : setTheControl;
	const [ deviceType, setDeviceType ] = useState( 'Desktop' );
	const theDevice = useSelect( ( select ) => {
		return select( 'baseblocks/data' ).getPreviewDeviceType();
	}, [] );
	if ( theDevice !== deviceType ) {
		setDeviceType( theDevice );
	}
	useEffect( () => {
	   if ( defaultLinked ) {
		   if ( theDevice === 'Mobile' ) {
			   if ( isEqual( mobileValue?.[0]?.top, mobileValue?.[0]?.bottom ) && isEqual( mobileValue?.[0]?.top, mobileValue?.[0]?.bottom ) && isEqual( mobileValue?.[0]?.top, mobileValue?.[0]?.right ) && isEqual( mobileValue?.[0]?.top, mobileValue?.[0]?.left ) ) {
				   realSetOnControl( 'linked' );
			   }
		   } else if ( theDevice === 'Tablet' ) {
			   if ( isEqual( tabletValue?.[0]?.top, tabletValue?.[0]?.bottom ) && isEqual( tabletValue?.[0]?.top, tabletValue?.[0]?.bottom ) && isEqual( tabletValue?.[0]?.top, tabletValue?.[0]?.right ) && isEqual( tabletValue?.[0]?.top, tabletValue?.[0]?.left ) ) {
				   realSetOnControl( 'linked' );
			   }
		   } else {
			   if ( isEqual( value?.[0]?.top, value?.[0]?.bottom ) && isEqual( value?.[0]?.top, value?.[0]?.bottom ) && isEqual( value?.[0]?.top, value?.[0]?.right ) && isEqual( value?.[0]?.top, value?.[0]?.left ) ) {
				   realSetOnControl( 'linked' );
			   }
		   }
		}

	   //if the mobile or tablet units are the same as desktop, unset them so they now inherit / follow desktop.
	   if ( mobileValue && isEqual( value?.[0]?.unit, mobileValue?.[0]?.unit ) ) {
		   mobileValue[0].unit = '';
		   onChangeMobile( mobileValue );
	   }
	   if ( tabletValue && isEqual( value?.[0]?.unit, tabletValue?.[0]?.unit ) ) {
		   tabletValue[0].unit = '';
		   onChangeTablet( tabletValue );
	   }
   }, [] );
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
	let liveValue = ( value?.[0] ? value[0] : deskDefault );
	if ( deviceType === 'Tablet' ) {
		liveValue = ( tabletValue?.[0] ? tabletValue[0] : tabletDefault );
	} else if ( deviceType === 'Mobile' ) {
		liveValue = ( mobileValue?.[0] ? mobileValue[0] : mobileDefault );
	}
	const onReset = () => {
		if ( deviceType === 'Tablet' ) {
			onChangeTablet( [ tabletDefault ] );
		} else if ( deviceType === 'Mobile' ) {
			onChangeMobile( [ mobileDefault ] );
		} else {
			onChange( [ deskDefault ] );
		}
	}
	const output = {};
	const mobileUnit = mobileValue?.[0]?.unit ? mobileValue[0].unit : value?.[0]?.unit ? value[0].unit : 'px';
	const tabletUnit = tabletValue?.[0]?.unit ? tabletValue[0].unit : value?.[0]?.unit ? value[0].unit : 'px';

	output.Mobile = (
		<BorderControl
			key={ 'mobile' + instanceId }
			value={ ( mobileValue ? JSON.parse(JSON.stringify( mobileValue )) : undefined ) }
			onChange={ ( size ) => onChangeMobile( size ) }
			control={ realControl }
			onControl={ ( value ) => realSetOnControl( value ) }
			defaultValue={ mobileDefault }
			styles={ styles }
			units={ [ mobileUnit ] }
			firstIcon={ firstIcon }
			secondIcon={ secondIcon }
			thirdIcon={ thirdIcon }
			fourthIcon={ fourthIcon }
			linkIcon={ linkIcon }
			unlinkIcon={ unlinkIcon }
		/>
	);
	output.Tablet = (
		<BorderControl
			key={ 'tablet' + instanceId }
		   value={ ( tabletValue ? JSON.parse(JSON.stringify(tabletValue)) : undefined ) }
		   onChange={ ( size ) => onChangeTablet( size ) }
		   control={ realControl }
		   onControl={ ( value ) => realSetOnControl( value ) }
		   defaultValue={ tabletDefault }
		   styles={ styles }
		   units={ [ tabletUnit ] }
		   firstIcon={ firstIcon }
		   secondIcon={ secondIcon }
		   thirdIcon={ thirdIcon }
		   fourthIcon={ fourthIcon }
		   linkIcon={ linkIcon }
		   unlinkIcon={ unlinkIcon }
			
		/>
	);
	output.Desktop = (
	   <BorderControl
		   key={ 'desktop' + instanceId }
		   value={ ( value ? JSON.parse(JSON.stringify(value)) : undefined ) }
		   onChange={ ( size ) => onChange( size ) }
		   control={ realControl }
		   onControl={ ( value ) => realSetOnControl( value ) }
		   defaultValue={ deskDefault }
		   styles={ styles }
		   units={ units }
		   firstIcon={ firstIcon }
		   secondIcon={ secondIcon }
		   thirdIcon={ thirdIcon }
		   fourthIcon={ fourthIcon }
		   linkIcon={ linkIcon }
		   unlinkIcon={ unlinkIcon }
	   />
	);
	let currentDefault = deskDefault;
	if ( 'Mobile' === deviceType ) {
		currentDefault = mobileDefault;
	} else if ( 'Mobile' === deviceType ) {
		currentDefault = tabletDefault;
	}
	return [
		onChange && onChangeTablet && onChangeMobile && (
			<div className={ `components-base-control bsb-responsive-border-control base-border-box-control base-border-box-control${ instanceId }` }>
				   <div
					   className={ 'base-border-control__header base-component__header' }
				   >
					{ label && (
						<div className="base-component__header__title base-radio-range__title">
							<label className="components-base-control__label">{ label }</label>
							{ reset && (
								<div className='title-reset-wrap'>
									<Button
										className="is-reset is-single"
										label='reset'
										isSmall
										disabled={ ( ( isEqual( currentDefault, liveValue ) ) ? true : false ) }
										icon={ undo }
										onClick={ () => onReset() }
									/>
								</div>
							) }
						</div>
					) }
					<ButtonGroup className="bsb-responsive-options bsb-measure-responsive-options" aria-label={ __( 'Device', 'gutenam-blocks' ) }>
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
					{ realSetOnControl && (
						<Button
							isSmall={ true }
							className={'base-radio-item border-control-toggle is-single only-icon'}
							label={ realControl !== 'individual' ? __( 'Individual', 'gutenam-blocks' ) : __( 'Linked', 'gutenam-blocks' )  }
							icon={ realControl !== 'individual' ? measureIcons.link : measureIcons.unlink }
							onClick={ () => realSetOnControl( realControl !== 'individual' ? 'individual' : 'linked' ) }
							isPressed={ realControl !== 'individual' ? true : false }
							isTertiary={ realControl !== 'individual' ? false : true }
						/>
					) }
				</div>
				<div className="bsb-responsive-border-control-inner">
					{ ( output[ deviceType ] ? output[ deviceType ] : output.Desktop ) }
				</div>
			</div>
		),
	];
}
