/**
 * Handle Section Library.
 */

/**
 * Globals.
 */
const {
	localStorage,
} = window;

/**
 * External dependencies
 */
import Masonry from 'react-masonry-css'
import { debounce } from 'lodash';
import LazyLoad from 'react-lazy-load';
/**
 * WordPress dependencies
 */
const {
	applyFilters,
} = wp.hooks;
const { apiFetch } = wp;
import {
	withSelect,
	withDispatch,
} from '@wordpress/data';
import { rawHandler } from '@wordpress/blocks';
import {
	Component,
	Fragment,
} from '@wordpress/element';
import { compose } from '@wordpress/compose';
import {
	Button,
	TextControl,
	SelectControl,
	VisuallyHidden,
	ExternalLink,
	CheckboxControl,
	Spinner,
} from '@wordpress/components';
import {
	arrowLeft,
	download,
	previous,
	update,
	next,
	chevronLeft,
	chevronDown,
} from '@wordpress/icons';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { SafeParseJSON } from '@base/helpers'

/**
 * Wire Sections.
 */
class WireSections extends Component {
	constructor() {
		super( ...arguments );
		this.loadTemplateData = this.loadTemplateData.bind( this );
		this.onInsertContent = this.onInsertContent.bind( this );
		this.importProcess = this.importProcess.bind( this );
		this.reloadTemplateData = this.reloadTemplateData.bind( this );
		this.state = {
			category: 'all',
			starting: true,
			search: null,
			tab: 'wire',
			items: false,
			errorItems: false,
			isImporting: false,
			isLoading: false,
			sidebar: false,
			gridSize: 'normal',
			email: base_blocks_params.user_email,
			emailError: false,
			subscribedError: false,
			privacy: false,
			privacyError: false,
			isSubscribing: false,
			isSubscribed: base_blocks_params.subscribed ? true : false,
			categories: { 'category': 'Category' },
		};
		this.debouncedReloadTemplateData = debounce( this.reloadTemplateData.bind( this ), 200 );
	}
	onInsertContent( blockcode ) {
		this.importProcess( blockcode );
	}
	saveSubscribe() {
		apiFetch( {
			path: '/wp/v2/settings',
			method: 'POST',
			data: { base_blocks_wire_subscribe: true },
		} ).then( ( response ) => {
			console.log( response );
		} );
	}
	subscribeProcess( email ) {
		this.setState( { isSubscribing: true } );
		var data = new FormData();
		data.append( 'action', 'base_subscribe_process_data' );
		data.append( 'security', base_blocks_params.ajax_nonce );
		data.append( 'email', email );
		var control = this;
		jQuery.ajax( {
			method:      'POST',
			url:         base_blocks_params.ajax_url,
			data:        data,
			contentType: false,
			processData: false,
		} )
		.done( function( response, status, stately ) {
			if ( response ) {
				console.log( response );
				if ( response === 'success' || response === '"success"' ) {
					base_blocks_params.subscribed = true;
					control.setState( { isSubscribing: false, isSubscribed: true, emailError: false, privacyError: false, subscribedError: false } );
					control.saveSubscribe();
				} else if ( response === 'emailDomainPostError' ) {
					control.setState( { isSubscribing: false, isSubscribed: false, emailError: true, privacyError: false, subscribedError: false } );
				} else if ( response === 'emailDomainPreError' ) {
					control.setState( { isSubscribing: false, isSubscribed: false, emailError: true, privacyError: false, subscribedError: false } );
				} else if ( response === 'invalidRequest' || response === '"invalidRequest"' ) {
					control.setState( { isSubscribing: false, isSubscribed: false, emailError: true, privacyError: false, subscribedError: false } );
				} else {
					control.setState( { isSubscribing: false, isSubscribed: false, emailError: false, privacyError: false, subscribedError: true } );
				}
			} else {
				control.setState( { isSubscribing: false, isSubscribed: false, emailError: false, privacyError: false, subscribedError: true } );
			}
		})
		.fail( function( error ) {
			console.log( error );
			control.setState( { isSubscribing: false, isSubscribed: false, emailError: false, privacyError: false, subscribedError: true } );
		});
	}
	importProcess( blockcode ) {
		this.setState( { isImporting: true } );
		var data = new FormData();
		data.append( 'action', 'base_import_process_data' );
		data.append( 'security', base_blocks_params.ajax_nonce );
		data.append( 'import_content', blockcode );
		var control = this;
		jQuery.ajax( {
			method:      'POST',
			url:         base_blocks_params.ajax_url,
			data:        data,
			contentType: false,
			processData: false,
		} )
		.done( function( response, status, stately ) {
			if ( response ) {
				control.props.import( response );
				control.setState( { isImporting: false } );
			}
		})
		.fail( function( error ) {
			console.log( error );
			control.setState( { isImporting: false } );
		});
	}
	reloadTemplateData() {
		this.setState( { errorItems: false, isLoading: true, items: 'loading' } );
		var data = new FormData();
		data.append( 'action', 'base_import_reload_prebuilt_data' );
		data.append( 'security', base_blocks_params.ajax_nonce );
		data.append( 'package', 'wire' );
		data.append( 'url', 'https://wire.baseblocks.com/' );
		data.append( 'key', 'cBLUbJZZmjed' );
		var control = this;
		jQuery.ajax( {
			method:      'POST',
			url:         base_blocks_params.ajax_url,
			data:        data,
			contentType: false,
			processData: false,
		} )
		.done( function( response, status, stately ) {
			if ( response ) {
				const o = SafeParseJSON( response, false );
				if ( o ) {
					const cats = { 'category': 'Category' };
					{ Object.keys( o ).map( function( key, index ) {
						//console.log( o[ key ].categories );
						if ( o[ key ].categories && typeof o[ key ].categories === "object") {
							{ Object.keys( o[ key ].categories ).map( function( ckey, i ) {
								if ( ! cats.hasOwnProperty( ckey ) ) {
									cats[ ckey ] = o[ key ].categories[ ckey ];
								}
							} ) }
						}
					} ) }
					control.setState( { items: o, errorItems: false, isLoading: false, categories: cats } );
				} else {
					control.setState( { items: 'error', errorItems: true, isLoading: false } );
				}
			}
		})
		.fail( function( error ) {
			console.log(error);
			control.setState( { items: 'error', errorItems: true, isLoading: false } );
		});
	}
	loadTemplateData() {
		this.setState( { errorItems: false, isLoading: true, items: 'loading' } );
		var data = new FormData();
		data.append( 'action', 'base_import_get_prebuilt_data' );
		data.append( 'security', base_blocks_params.ajax_nonce );
		data.append( 'package', 'wire' );
		data.append( 'url', 'https://wire.baseblocks.com/' );
		data.append( 'key', 'cBLUbJZZmjed' );
		var control = this;
		jQuery.ajax( {
			method:      'POST',
			url:         base_blocks_params.ajax_url,
			data:        data,
			contentType: false,
			processData: false,
		} )
		.done( function( response, status, stately ) {
			if ( response ) {
				const o = SafeParseJSON( response, false );
				if ( o ) {
					const cats = { 'category': 'Category' };
					{ Object.keys( o ).map( function( key, index ) {
						//console.log( o[ key ].categories );
						if ( o[ key ].categories && typeof o[ key ].categories === "object") {
							{ Object.keys( o[ key ].categories ).map( function( ckey, i ) {
								if ( ! cats.hasOwnProperty( ckey ) ) {
									cats[ ckey ] = o[ key ].categories[ ckey ];
								}
							} ) }
						}
					} ) }
					control.setState( { items: o, errorItems: false, isLoading: false, categories: cats } );
				} else {
					control.setState( { items: 'error', errorItems: true, isLoading: false } );
				}
			}
		})
		.fail( function( error ) {
			console.log(error);
			control.setState( { items: 'error', errorItems: true, isLoading: false } );
		});
	}
	render() {
		if ( this.props.reload ) {
			this.props.onReload();
			this.debouncedReloadTemplateData();
		}
		const activePanel = SafeParseJSON( localStorage.getItem( 'baseBlocksPrebuilt' ), true );
		const sidebar_saved_enabled = ( activePanel && activePanel['sidebar'] ? activePanel['sidebar'] : 'show' );
		const sidebarEnabled = ( this.state.sidebar ? this.state.sidebar : sidebar_saved_enabled );
		const roundAccurately = (number, decimalPlaces) => Number(Math.round(Number(number + "e" + decimalPlaces)) + "e" + decimalPlaces * -1);
		const libraryItems = this.props.tab !== this.state.tab ? false : this.state.items;
		const categoryItems = this.state.categories;
		const catOptions = Object.keys( categoryItems ).map( function( key, index ) {
			return { value: ( 'category' === key ? 'all' : key ), label: categoryItems[key] }
		} );
		const sideCatOptions = Object.keys( categoryItems ).map( function( key, index ) {
			return { value: ( 'category' === key ? 'all' : key ), label: ( 'category' === key ? __( 'All', 'gutenam-blocks' ) : categoryItems[key] ) }
		} );
		const savedGridSize = ( activePanel && activePanel['grid'] ? activePanel['grid'] : 'normal' );
		const gridSize = ( this.state.gridSize ? this.state.gridSize : savedGridSize );
		const control = this;
		let breakpointColumnsObj = {
			default: 5,
			1600: 4,
			1200: 3,
			500: 2,
		};
		if ( gridSize === 'large' ) {
			breakpointColumnsObj = {
				default: 4,
				1600: 3,
				1200: 2,
				500: 1,
			};
		}
		if ( sidebarEnabled === 'show' ) {
			breakpointColumnsObj = {
				default: 4,
				1600: 3,
				1200: 2,
				500: 1,
			};
			if ( gridSize === 'large' ) {
				breakpointColumnsObj = {
					default: 3,
					1600: 2,
					1200: 2,
					500: 1,
				};
			}
		}
		return (
			<div className={ `bst-prebuilt-content${ ( sidebarEnabled === 'show' ? ' bsb-prebuilt-has-sidebar' : '' ) }` }>
				{ sidebarEnabled === 'show' && (
					<div className="bst-prebuilt-sidebar">
						<div className="bsb-library-sidebar-top">
							<TextControl
								type="text"
								value={ this.state.search }
								placeholder={ __( 'Search', 'gutenam-blocks' ) }
								onChange={ value => this.setState( { search: value } ) }
							/>
							<Button
								className={ 'bsb-trigger-sidebar' }
								icon={ previous }
								onClick={ () => {
									const activeSidebar = SafeParseJSON( localStorage.getItem( 'baseBlocksPrebuilt' ), true );
									activeSidebar['sidebar'] = 'hide';
									localStorage.setItem( 'baseBlocksPrebuilt', JSON.stringify( activeSidebar ) );
									this.setState( { sidebar: 'hide' } );
								}}
							/>
						</div>
						<div className="bsb-library-sidebar-bottom">
							{ sideCatOptions.map( ( category, index ) =>
								<Button
									key={ `${ category.value }-${ index }` }
									className={ 'bsb-category-button' + ( this.state.category === category.value ? ' is-pressed' : '' ) }
									aria-pressed={ this.state.category === category.value }
									onClick={ () => this.setState( { category: category.value } ) }
								>
									{ category.label }
								</Button>
							) }
						</div>
					</div>
				) }
				<div className="wrap-around-wire-library">
					{ ! this.state.isSubscribed && (
						<div className="base-wire-subscribe-wrap" style={ {
							backgroundImage: 'url(' + base_blocks_params.wireImage + ')',
						} }>
							<div className="base-wire-subscribe">
								<h2>{ __( 'Join the Gutenam Mailing List for Free Access to Wireframe Sections.', 'gutenam-blocks' ) } </h2>
								<p>{ __( "Wireframe sections give you the ability to build out clean layout-focused designs within the WordPress editor. Enter your email to join our product updates email list and get instant access to our exclusive wireframe library.", 'gutenam-blocks' ) }</p>
								<TextControl
									type="text"
									label={ __( 'Email:', 'gutenam-blocks' )  }
									value={ this.state.email }
									placeholder={ __( 'example@example.com', 'gutenam-blocks' ) }
									onChange={ value => this.setState( { email: value } ) }
								/>
								{ this.state.emailError && (
									<span className="bsb-subscribe-form-error">{ __( 'Invalid Email, Please enter a valid email.', 'gutenam-blocks' ) }</span>
								) }
								<CheckboxControl
									label={ __( 'Accept Privacy Policy', 'gutenam-blocks' ) }
									help={ <Fragment>{ __( 'We do not spam, unsubscribe anytime.', 'gutenam-blocks' ) } <ExternalLink href={ 'https://avanam.org/privacy-policy/?utm_source=in-app&utm_medium=base-blocks&utm_campaign=design-library' }>{ __( 'View Privacy Policy', 'gutenam-blocks' ) }</ExternalLink></Fragment> }
									checked={ this.state.privacy }
									onChange={ value => this.setState( { privacy: value } ) }
								/>
								{ this.state.privacyError && (
									<span className="bsb-subscribe-form-error">{ __( 'Please Accept Privacy Policy', 'gutenam-blocks' ) }</span>
								) }
								<Button
									className={ 'bsb-subscribe-button' }
									isPrimary
									// disabled={ ! this.state.privacy }
									onClick={ () => {
										if ( this.state.privacy ) {
											this.subscribeProcess( this.state.email );
										} else {
											this.setState( { privacyError: true } )
										}
									} }
								>
									{ __( 'Subscribe for Access', 'gutenam-blocks' ) }
								</Button>
								{ this.state.isSubscribing && (
									<Spinner />
								) }
								{ this.state.subscribedError && (
									<div className="bsb-subscribe-form-error">{ __( 'Error attempting to subscribe, please reload our page and try again.', 'gutenam-blocks' ) }</div>
								) }
							</div>
						</div>
					) }
					{ sidebarEnabled !== 'show' && (
						<div className="bst-prebuilt-header bsb-library-header">
							<div className="bsb-library-header-left">
								<Button
									className={ 'bsb-trigger-sidebar' }
									icon={ next }
									onClick={ () => {
										const activeSidebar = SafeParseJSON( localStorage.getItem( 'baseBlocksPrebuilt' ), true );
										activeSidebar['sidebar'] = 'show';
										localStorage.setItem( 'baseBlocksPrebuilt', JSON.stringify( activeSidebar ) );
										this.setState( { sidebar: 'show' } );
									} }
								/>
								<SelectControl
									className={ "bsb-library-header-cat-select" }
									value={ this.state.category }
									options={ catOptions }
									onChange={ value => this.setState( { category: value } ) }
								/>
							</div>
							<div className="bsb-library-header-right">
								<Button
									icon={  <svg
										xmlns="http://www.w3.org/2000/svg"
										width="32"
										height="32"
										viewBox="0 0 32 32"
									>
										<path d="M8 15h7V8H8v7zm9-7v7h7V8h-7zm0 16h7v-7h-7v7zm-9 0h7v-7H8v7z"></path>
									</svg> }
									className={ 'bsb-grid-btns bsb-trigger-large-grid-size' + ( gridSize === 'large' ? ' is-pressed' : '' ) }
									aria-pressed={ gridSize === 'large' }
									onClick={ () => {
										const activeSidebar = SafeParseJSON( localStorage.getItem( 'baseBlocksPrebuilt' ), true );
										activeSidebar['grid'] = 'large';
										localStorage.setItem( 'baseBlocksPrebuilt', JSON.stringify( activeSidebar ) );
										this.setState( { gridSize: 'large' } );
									} }
								/>
								<Button
									icon={ <svg
										xmlns="http://www.w3.org/2000/svg"
										width="32"
										height="32"
										viewBox="0 0 32 32"
									>
										<path d="M8 12h4V8H8v4zm6 0h4V8h-4v4zm6-4v4h4V8h-4zM8 18h4v-4H8v4zm6 0h4v-4h-4v4zm6 0h4v-4h-4v4zM8 24h4v-4H8v4zm6 0h4v-4h-4v4zm6 0h4v-4h-4v4z"></path>
									</svg> }
									className={ 'bsb-grid-btns bsb-trigger-normal-grid-size' + ( gridSize === 'normal' ? ' is-pressed' : '' ) }
									aria-pressed={ gridSize === 'normal' }
									onClick={ () => {
										const activeSidebar = SafeParseJSON( localStorage.getItem( 'baseBlocksPrebuilt' ), true );
										activeSidebar['grid'] = 'normal';
										localStorage.setItem( 'baseBlocksPrebuilt', JSON.stringify( activeSidebar ) );
										this.setState( { gridSize: 'normal' } );
									} }
								/>
								<TextControl
									type="text"
									value={ this.state.search }
									placeholder={ __( 'Search', 'gutenam-blocks' ) }
									onChange={ value => this.setState( { search: value } ) }
								/>
							</div>
						</div>
					) }
					{ ( this.state.isImporting || this.state.isLoading || false === libraryItems || this.state.errorItems ) ? (
						<Fragment>
							{ ! this.state.errorItems && this.state.isLoading && (
								<Spinner />
							) }
							{ ! this.state.errorItems && this.state.isImporting &&  (
								<div className="preparing-importing-images">
									<Spinner />
									<h2>{ __( 'Preparing Content...', 'gutenam-blocks' ) }</h2>
								</div>
							) }
							{ this.state.errorItems && (
								<div>
									<h2 style={ { textAlign:'center' } }>
										{ __( 'Error, Unable to access library database, please try re-syncing', 'gutenam-blocks' ) }
									</h2>
									<div style={ { textAlign:'center' } }>
										<Button
											className="bst-reload-templates"
											icon={ update }
											onClick={ () => this.reloadTemplateData() }
										>
											{ __( ' Sync with Cloud', 'gutenam-blocks' ) }
										</Button>
									</div>
								</div>
							) }
							{ false === libraryItems && (
								<Fragment>{ this.loadTemplateData() }</Fragment>
							) }
						</Fragment>
					) : (
						<Masonry
							breakpointCols={breakpointColumnsObj}
							className={ `bsb-css-masonry bsb-core-section-library` }
							columnClassName="bsb-css-masonry_column"
						>
							{ Object.keys( this.state.items ).map( function( key, index ) {
								const name = libraryItems[key].name;
								const slug = libraryItems[key].slug;
								const content = libraryItems[key].content;
								const image = libraryItems[key].image;
								const imageWidth = libraryItems[key].imageW;
								const imageHeight = libraryItems[key].imageH;
								const categories = libraryItems[key].categories;
								const keywords = libraryItems[key].keywords;
								const description = control.state.items[key].description;
								const subscribed = control.state.isSubscribed;
								const descriptionId = `${ slug }_bsb_cloud__item-description`;
								if ( ( 'all' === control.state.category || Object.keys( categories ).includes( control.state.category ) ) && ( ! control.state.search || ( keywords && keywords.some( x => x.toLowerCase().includes( control.state.search.toLowerCase() ) ) ) ) ) {
									return (
										<div className="bsb-css-masonry-inner">
											<Button
												key={ key }
												className="bsb-css-masonry-btn"
												isSmall
												aria-label={
													sprintf(
														/* translators: %s is Prebuilt Name */
														__( 'Add %s', 'gutenam-blocks' ),
														name
													)
												}
												aria-describedby={ description ? descriptionId : undefined }
												isDisabled={ ! subscribed }
												onClick={ () => subscribed ? control.onInsertContent( content ) : '' }
											>
												<div
													className="bsb-css-masonry-btn-inner"
													style={ {
														paddingBottom: ( imageWidth && imageHeight ? roundAccurately( ( imageHeight/imageWidth * 100), 2 ) + '%' : undefined ),
													} }
												>
													<img src={ image } loading={ "lazy" } alt={ name } />
													<span className="bsb-import-btn-title" dangerouslySetInnerHTML={ { __html: name }} />
												</div>
											</Button>
											{ !! description && (
												<VisuallyHidden id={ descriptionId }>
													{ description }
												</VisuallyHidden>
											) }
											{ undefined !== subscribed && ! subscribed && (
												<Fragment>
													<div className="bsb-popover-pro-notice bsb-subscribe-access">
														<h2>{ __( 'Subscribe to Gutenam Product Updates for Instant Access', 'gutenam-blocks' ) } </h2>
													</div>
												</Fragment>
											) }
										</div>
									);
								}
							} ) }
						</Masonry>
					) }
				</div>
			</div>
		);
	}
}

export default compose(
	withSelect( ( select, { clientId } ) => {
		const { getBlock } = select( 'core/block-editor' );
		const block = getBlock( clientId );
		return {
			block,
			canUserUseUnfilteredHTML: select( 'core/editor' ) ? select( 'core/editor' ).canUserUseUnfilteredHTML() : false,
		};
	} ),
	withDispatch( ( dispatch, { block, canUserUseUnfilteredHTML } ) => ( {
		import: ( blockcode ) => dispatch( 'core/block-editor' ).replaceBlocks(
			block.clientId,
			rawHandler( {
				HTML: blockcode,
				mode: 'BLOCKS',
				canUserUseUnfilteredHTML,
			} ),
		),
	} ) ),
)( WireSections );
