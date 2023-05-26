
/**
 * Prebuilt Template Modal.
 */
 const {
	localStorage,
} = window;

/**
 * WordPress dependencies
 */
 const { apiFetch } = wp;
 import {
	withDispatch,
} from '@wordpress/data';
import {
	Component,
	Fragment,
} from '@wordpress/element';
import {
	Button,
	Modal,
	Spinner,
} from '@wordpress/components';
import {
	update,
	close,
	plusCircle,
} from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { SafeParseJSON, showSettings } from '@base/helpers';
/**
 * Import Brand Icons
 */
import { baseCatNewIcon } from '@base/icons';

/**
 * Import Css
 */
 import './editor.scss';
/**
 * Internal dependencies
 */
import PatternLibrary from './pattern-library';
import CloudSections from './cloud-library';
import TemplateLibrary from './template-library';
import CloudConnect from './cloud-connect';
import WireframeLibrary from './wire-library';
import { applyFilters } from '@wordpress/hooks';

const normal_actions =[
	{
		slug: 'templates',
		title: __( 'Starter Packs', 'gutenam-blocks' ),
		key: 'bsb-templates-tab',
	},
	{
		slug: 'section',
		title: __( 'Base', 'gutenam-blocks' ),
		key: 'bsb-sections-tab',
	},
	// {
	// 	slug: 'wire',
	// 	title: 'Wireframe',
	// 	key: 'bsb-wire-tab',
	// },
	{
		slug: 'cloud',
		title: '',
		key: 'bsb-cloud-tab',
	},
];
const no_connect_actions = [
	{
		slug: 'templates',
		title: __( 'Starter Packs', 'gutenam-blocks' ),
		key: 'bsb-templates-tab',
	},
	{
		slug: 'section',
		title: __( 'Base', 'gutenam-blocks' ),
		key: 'bsb-sections-tab',
	},
	// {
	// 	slug: 'wire',
	// 	title: __( 'Wireframe', 'gutenam-blocks' ),
	// 	key: 'bsb-wire-tab',
	// },
];
class PrebuiltModal extends Component {
	constructor() {
		super( ...arguments );
		this.saveSettings = this.saveSettings.bind( this );
		this.reloadAllActions = this.reloadAllActions.bind( this );
		this.state = {
			reload:false,
			reloadActions:false,
			isSaving: false,
			isFetching: false,
			modalOpen: false,
			onlyModal: false,
			section: null,
			cloudSettings: base_blocks_params.cloud_settings ? JSON.parse( base_blocks_params.cloud_settings ) : {},
			actions: base_blocks_params.cloud_enabled ? normal_actions : no_connect_actions,
			user: ( base_blocks_params.userrole ? base_blocks_params.userrole : 'admin' ),
			librarySettings: {},
		};
	}
	componentDidMount() {
		if ( this.props.open && this.props.onlyModal ) {
			this.setState( {
				modalOpen: true,
				onlyModal: true,
			} );
		}
		if ( typeof base_blocks_params.prebuilt_libraries === 'object' && base_blocks_params.prebuilt_libraries !== null ) {
			this.setState( { actions: applyFilters( 'base.prebuilt_library_tabs', base_blocks_params.prebuilt_libraries.concat( this.state.actions ) ) } );
		} else {
			this.setState( { actions: applyFilters( 'base.prebuilt_library_tabs', this.state.actions ) } );
		}
		const blockSettings = ( base_blocks_params.configuration ? SafeParseJSON( base_blocks_params.configuration, true ) : {} );
		if ( blockSettings[ 'base/designlibrary' ] !== undefined && typeof blockSettings[ 'base/designlibrary' ] === 'object' ) {
			this.setState( { librarySettings: blockSettings[ 'base/designlibrary' ] } );
		}
	}
	reloadAllActions() {
		this.setState( { isFetching: true } );
		apiFetch( { path: '/wp/v2/settings' } ).then( ( res ) => {
			this.setState( {
				reloadActions: false,
				isFetching: false,
				cloudSettings: JSON.parse( res.base_blocks_cloud ),
			} );
		} );
	}
	saveSettings( cloudSettings ) {
		base_blocks_params.cloud_settings = JSON.stringify( cloudSettings );
		this.setState( { isSaving: true } );
		apiFetch( {
			path: '/wp/v2/settings',
			method: 'POST',
			data: { base_blocks_cloud: JSON.stringify( cloudSettings ) },
		} ).then( ( response ) => {
			this.setState( {
				isSaving: false,
			} );
		} );
	}
	render() {
		const cloudSettings = this.state.cloudSettings;
		const activePanel = SafeParseJSON( localStorage.getItem( 'baseBlocksPrebuilt' ), true );
		const active_saved_tab = ( activePanel && activePanel['activeTab'] ? activePanel['activeTab'] : 'section' )
		const active_tab = ( this.state.section ? this.state.section : active_saved_tab );
		let actions = this.state.actions;
		if ( cloudSettings && cloudSettings['connections'] ) {
			actions = cloudSettings['connections'].concat( actions );
		}
		if ( this.state.reloadActions && ! this.state.isFetching ) {
			this.reloadAllActions();
		}
		return (
			<>
				<Button className="bst-prebuilt" onClick={ () => this.setState( { modalOpen: true } ) }>{ __( 'Design Library', 'gutenam-blocks' ) }</Button>
				{ this.state.modalOpen ?
					<Modal
						className="bst-prebuilt-modal bsb-prebuilt-library-modal"
						title={ __( 'Design Library', 'gutenam-blocks' ) }
						onRequestClose={ () => {
							this.setState( { modalOpen: false } );
							if ( this.state.onlyModal ) {
                                this.props.removeBlock( this.props.clientId );
                            }
						} }
					>
						<div className="bsb-prebuilt-section">
							<div className="bsb-prebuilt-header bsb-prebuilt-library-header">
								<div className="bsb-prebuilt-header bsb-prebuilt-library-logo">
									<span className="bsb-prebuilt-header-logo">{ baseCatNewIcon }</span>
									<h2>{ __( 'Library', 'Gutenam Blocks' ) }</h2>
								</div>
								{ this.state.reloadActions && (
									<div className="bsb-prebuilt-library-actions">
										<Spinner />
									</div>
								) }
								{ ! this.state.reloadActions && (
									<div className="bsb-prebuilt-library-actions">
										{ actions.map( ( action, index ) =>
											<>
												{ action.slug !== 'templates' && showSettings( action.slug, 'base/designlibrary' ) &&  (
													<Button
														key={ `${ action.slug }-${ index }` }
														className={ 'bsb-action-button' + ( active_tab === action.slug ? ' is-pressed' : '' ) }
														aria-pressed={ active_tab === action.slug }
														icon={ action.slug === 'cloud' ? plusCircle : undefined }
														label={ action.slug === 'cloud' ? __( 'Cloud Connect', 'gutenam-blocks' ) : undefined }
														onClick={ () => {
															const activeTab = SafeParseJSON( localStorage.getItem( 'baseBlocksPrebuilt' ), true );
															activeTab['activeTab'] = action.slug;
															localStorage.setItem( 'baseBlocksPrebuilt', JSON.stringify( activeTab ) );
															this.setState( { section: action.slug } );
														} }
													>
														{ action.slug === 'cloud' ? undefined : <span> { action.title } </span> }
													</Button>
												) }
												{ action.slug === 'templates' && showSettings( action.slug, 'base/designlibrary', false ) &&  (
													<Button
														key={ `${ action.slug }-${ index }` }
														className={ 'bsb-action-button' + ( active_tab === action.slug ? ' is-pressed' : '' ) }
														aria-pressed={ active_tab === action.slug }
														icon={ action.slug === 'cloud' ? plusCircle : undefined }
														label={ action.slug === 'cloud' ? __( 'Cloud Connect', 'gutenam-blocks' ) : undefined }
														onClick={ () => {
															const activeTab = SafeParseJSON( localStorage.getItem( 'baseBlocksPrebuilt' ), true );
															activeTab['activeTab'] = action.slug;
															localStorage.setItem( 'baseBlocksPrebuilt', JSON.stringify( activeTab ) );
															this.setState( { section: action.slug } );
														} }
													>
														{ action.slug === 'cloud' ? undefined : <span> { action.title } </span> }
													</Button>
												) }
												{/* { action.slug === 'wire' && showSettings( 'wire', 'base/designlibrary' ) && base_blocks_params.showWire && ( ( ! base_blocks_params.subscribed && ( 'editor' === this.state.user || 'admin' === this.state.user ) ) || base_blocks_params.subscribed ) && (
													<Button
														key={ `${ action.slug }-${ index }` }
														className={ 'bsb-action-button' + ( active_tab === action.slug ? ' is-pressed' : '' ) }
														aria-pressed={ active_tab === action.slug }
														icon={ action.slug === 'cloud' ? plusCircle : undefined }
														onClick={ () => {
															const activeTab = SafeParseJSON( localStorage.getItem( 'baseBlocksPrebuilt' ), true );
															activeTab['activeTab'] = action.slug;
															localStorage.setItem( 'baseBlocksPrebuilt', JSON.stringify( activeTab ) );
															this.setState( { section: action.slug } );
														} }
													>
														{ action.slug === 'cloud' ? undefined : <span> { action.title } <span className="new-notice">{ __( 'New', 'gutenam-blocks' ) }</span></span> }
													</Button>
												) } */}
											</>
										) }
									</div>
								) }
								{ 'cloud' !== active_tab && (
									<div className="bsb-prebuilt-library-reload">
										<Button
											className="bst-reload-templates"
											icon={ update }
											label={ __( 'Sync with Cloud', 'gutenam-blocks' ) }
											onClick={ () => this.setState( { reload: true } ) }
										/>
									</div>
								) }
								<div className="bsb-prebuilt-header-close-wrap">
									<Button
										className="bsb-prebuilt-header-close"
										icon={ close }
										label={ __( 'Close Dialog', 'gutenam-blocks') }
										onClick={ () => {
											this.setState( { modalOpen: false } );
											if ( this.state.onlyModal ) {
												this.props.removeBlock( this.props.clientId );
											}
										} }
									/>
								</div>
							</div>
							{ 'templates' === active_tab && (
								<TemplateLibrary
									clientId={ this.props.clientId }
									reload={ this.state.reload }
									onReload={ () => this.setState( { reload: false } ) }
								/>
							) }
							{ 'section' === active_tab && (
								<PatternLibrary
									clientId={ this.props.clientId }
									tab={ active_tab }
									reload={ this.state.reload }
									onReload={ () => this.setState( { reload: false } ) }
								/>
							) }
							{ 'wire' === active_tab && (
								<WireframeLibrary
									clientId={ this.props.clientId }
									tab={ active_tab }
									reload={ this.state.reload }
									onReload={ () => this.setState( { reload: false } ) }
								/>
							) }
							{ 'cloud' === active_tab && (
								<CloudConnect
									clientId={ this.props.clientId }
									onReload={ () => this.setState( { reloadActions: true } ) }
								/>
							) }
							{ 'templates' !== active_tab && 'cloud' !== active_tab && 'section' !== active_tab && 'wire' !== active_tab && (
								<CloudSections
									clientId={ this.props.clientId }
									tab={ active_tab }
									libraries={ actions }
									reload={ this.state.reload }
									onReload={ () => this.setState( { reload: false } ) }
								/>
							) }
						</div>
					</Modal>
					: null }
			</>
		);
	}
}
export default compose(
	withDispatch( ( dispatch ) => {
        const {
            removeBlock,
        } = dispatch( 'core/block-editor' );

        return {
            removeBlock,
        };
    } ),
)( PrebuiltModal );
