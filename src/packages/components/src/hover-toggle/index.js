/**
 * Range Control
 *
 */
/**
 * WordPress dependencies
 */
 import { useState } from '@wordpress/element';
 
/**
 * Import Css
 */
import './editor.scss';
/**
 * Internal block libraries
 */
 import { __ } from '@wordpress/i18n';
import {
	Button,
	TabPanel,
} from '@wordpress/components';
import {isRTL} from '@base/helpers';
/**
 * Import Icons
 */
import {
	hoverToggle,
	click
} from '@base/icons';
/**
 * Build the Measure controls
 * @returns {object} Measure settings.
 */
export default function HoverToggleControl( {
	label = __( 'Hover Styles', 'gutenam-blocks' ),
	activeLabel = __( 'Active Styles', 'gutenam-blocks' ),
	initial = 'normal',
	active,
	hover,
	normal,
	className = '',
	icon = hoverToggle,
	activeIcon = click,
	tabUI = true,
} ) {
	const [ isHover, setIsHover ] = useState( initial === 'hover' ? true : false );
	const [ isActive, setIsActive ] = useState( initial === 'active' ? true : false );

	if ( tabUI ) {
		return [
			<div className={ `components-base-control bsb-hover-toggle-control-tab-ui bsb-hover-toggle-control${ className ? ' ' + className : '' }` }>
				<TabPanel
					className="bst-inspect-tabs bst-hover-tabs"
					activeClass="active-tab"
					tabs={[
						{
							name     : 'normal',
							title    : __( 'Normal', 'gutenam-blocks' ),
							className: 'bst-normal-tab',
						},
						{
							name     : 'hover',
							title    : __( 'Hover', 'gutenam-blocks' ),
							className: 'bst-hover-tab',
						},
					]}>
					{ ( tab ) => {

						if ( tab.name ) {
							if ( 'hover' === tab.name ) {
								return(
									<>{ hover }</>
								);
							} else {
								return(
									<>{ normal }</>
								);
							}
						}
					} }
				</TabPanel>
			</div>
		];
	}
	return [
		<div className={ `components-base-control bsb-hover-toggle-control${ className ? ' ' + className : '' }` }>
			<div className={ 'bsb-hover-toggle-control-toggle' }>
				{ hover && (
					<Button
						className={'bsb-hover-toggle-btn ' + (isRTL ? 'is-rtl' : '')}
						isPrimary={isHover}
						icon={ icon }
						aria-pressed={isHover}
						label={ label }
						onClick={ () => {
							setIsActive( false );
							setIsHover( !isHover );
						} }
					>
					</Button>
				)}
				{ active && (
					<Button
						className={'bsb-active-toggle-btn ' + (isRTL ? 'is-rtl' : '')}
						isPrimary={isActive}
						icon={ activeIcon }
						aria-pressed={isActive}
						label={ activeLabel }
						onClick={ () => {
							setIsHover( false );
							setIsActive( !isActive );
						} }
					>
					</Button>
				)}
			</div>
			<div className={ 'bsb-hover-toggle-area' }>
				{ isHover && (
					<div className='bsb-hover-control-wrap'>{ hover }</div>
				)}
				{ isActive && (
					<div className='bsb-active-control-wrap'>{ active }</div>
				)}
				{ !isHover && !isActive && (
					<>{ normal }</>
				)}
			</div>
		</div>
	];
}
