/**
 * Inspector Controls
 *
 */

/**
 * Internal block libraries
 */
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import { Icon } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { createRef, useEffect } from '@wordpress/element';
import {
	blockDefault,
	brush,
	settings,
} from '@wordpress/icons';
import './editor.scss';

function InspectorControlTabs( { allowedTabs = null, activeTab, setActiveTab, openedTab, toggleOpened, tabs = null } ) {

	const defaultTabs = [
		{
			key  : 'general',
			title: __( 'General', 'gutenam-blocks' ),
			icon : blockDefault,
		},
		{
			key  : 'style',
			title: __( 'Style', 'gutenam-blocks' ),
			icon : brush,
		},
		{
			key  : 'advanced',
			title: __( 'Advanced', 'gutenam-blocks' ),
			icon : settings,
		},
	];

	const tabKeys = [ 'general', 'style', 'advanced' ];
	const allowedTabKeys = allowedTabs ? allowedTabs : tabKeys;
	const tabsMap = tabs ? tabs : defaultTabs;
	const tabsContainer = createRef();

	let componentsPanel;

	useEffect( () => {
		componentsPanel = tabsContainer.current.closest( '.components-panel' );
	} );

	if ( activeTab !== openedTab ) {
		setActiveTab( openedTab );
	}

	const setDataAttr = ( key ) => {
		if ( componentsPanel ) {
			componentsPanel.setAttribute( 'data-base-hide-advanced', ( key !== 'advanced' ) );
			componentsPanel.setAttribute( 'data-base-active-tab', key );
		}
	};

	const switchTab = ( key ) => {
		toggleOpened( key );
		setActiveTab( key );
	};

	useEffect( () => {
		setDataAttr( activeTab );
		return () => {

			if( componentsPanel ) {
				const baseInspectorTabs = componentsPanel.querySelector(
					'.base-blocks-inspector-tabs'
				);

				if( ! baseInspectorTabs || null === baseInspectorTabs ) {
					componentsPanel.removeAttribute( 'data-base-hide-advanced' );
					componentsPanel.removeAttribute( 'data-base-active-tab' );
				}
			}
		};


	}, [ activeTab ] );

	return (
		<div className="base-blocks-inspector-tabs" ref={ tabsContainer }>
			{tabsMap.map( ( {
				key, title, icon,
			}, i ) => {
				if ( allowedTabKeys.includes( key ) ) {
					return (
						<button
							key={key}
							aria-label={title + ' ' + __( 'tab', 'gutenam-blocks' ) }
							onClick={() => switchTab( key )}
							className={classnames( {
								[ 'is-active' ]: key === activeTab,
							} )}
						>
							<Icon icon={icon}/> {title}
						</button>
					);
				}
			} )}
		</div>
	);
}

export default compose( [
	withSelect( ( select, ownProps ) => {
		const initialOpen = ( undefined !== ownProps.initialOpen ? ownProps.initialOpen : 'general' );
		return {
			openedTab: select( 'baseblocks/data' ).getOpenSidebarTabKey( ownProps.panelName + select( 'core/block-editor' ).getSelectedBlockClientId(), initialOpen ),
		};
	} ),
	withDispatch( ( dispatch, ownProps, { select } ) => {
		const { getSelectedBlockClientId } = select( 'core/block-editor' );

		return {
			toggleOpened: ( key ) => {
				dispatch( 'baseblocks/data' ).switchEditorTabOpened( ownProps.panelName + getSelectedBlockClientId(), key );
			},
		};
	} ),
] )( InspectorControlTabs );
