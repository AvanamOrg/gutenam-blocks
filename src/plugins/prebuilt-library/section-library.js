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
 import { debounce } from 'lodash';
/**
 * WordPress dependencies
 */
const {
	applyFilters,
} = wp.hooks;

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
	TextareaControl,
	SelectControl,
	VisuallyHidden,
	ExternalLink,
	Spinner,
} from '@wordpress/components';
import {
	arrowLeft,
	download,
	previous,
	update,
	next,
	edit,
	chevronLeft,
	chevronDown,
} from '@wordpress/icons';
import { __, sprintf } from '@wordpress/i18n';
import PatternList from './pattern-list';
import {
    BlockEditorProvider,
	__experimentalBlockPatternsList as BlockPatternsList,
	store as blockEditorStore,
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { SafeParseJSON } from '@base/helpers'

/**
 * Prebuilt Sections.
 */
class PrebuiltSections extends Component {
	constructor() {
		super( ...arguments );
		this.loadTemplateData = this.loadTemplateData.bind( this );
		this.onInsertContent = this.onInsertContent.bind( this );
		this.importProcess = this.importProcess.bind( this );
		this.reloadTemplateData = this.reloadTemplateData.bind( this );
		this.state = {
			category: '',
			starting: true,
			search: null,
			tab: 'section',
			//items: base_blocks_params.library_sections ? SafeParseJSON( base_blocks_params.library_sections, false ) : false,
			items: false,
			errorItems: false,
			isImporting: false,
			isLoading: false,
			sidebar: false,
			showSettings: false,
			gridSize: '',
			// categories: {
			// 	'category': __( 'Category', 'gutenam-blocks' ),
			// 	'accordion': __( 'Accordion', 'gutenam-blocks' ),
			// 	'cards': __( 'Cards', 'gutenam-blocks' ),
			// 	'columns': __( 'Columns', 'gutenam-blocks' ),
			// 	'counter-or-stats': __( 'Counter or Stats', 'gutenam-blocks' ),
			// 	'form': __( 'Form', 'gutenam-blocks' ),
			// 	'gallery': __( 'Gallery', 'gutenam-blocks' ),
			// 	'hero': __( 'Hero', 'gutenam-blocks' ),
			// 	'image': __( 'Image', 'gutenam-blocks' ),
			// 	'list': __( 'List', 'gutenam-blocks' ),
			// 	'location': __( 'Location', 'gutenam-blocks' ),
			// 	'logo-farm': __( 'Logo Farm', 'gutenam-blocks' ),
			// 	'media-text': __( 'Media and Text', 'gutenam-blocks' ),
			// 	'people': __( 'People', 'gutenam-blocks' ),
			// 	'post-loop': __( 'Post Loop', 'gutenam-blocks' ),
			// 	'pricing-table': __( 'Pricing Table', 'gutenam-blocks' ),
			// 	'slider': __( 'Slider', 'gutenam-blocks' ),
			// 	'tabs': __( 'Tabs', 'gutenam-blocks' ),
			// 	'testimonials': __( 'Testimonials', 'gutenam-blocks' ),
			// 	'title-or-header': __( 'Title or Header', 'gutenam-blocks' ),
			// 	'video': __( 'Video', 'gutenam-blocks' ),
			// },
			categories: { 'category': __( 'Category', 'gutenam-blocks' ) },
			style: '',
			business: 'Yoga Studio',
			industry: 'health',
			subIndustry: 'yoga',
			businessInfo: "Our yoga studio in the heart of Seattle. At our studio, we believe that yoga is more than just a physical exercise, it's a way of life that promotes inner peace, strength, and connection to the world around us. Our classes are designed to meet the needs of students of all levels, from beginners to advanced practitioners. Whether you're looking to reduce stress, increase flexibility, or build muscle, our experienced teachers will guide you through a mindful practice that will leave you feeling energized and refreshed."
		};
		this.debouncedReloadTemplateData = debounce( this.reloadTemplateData.bind( this ), 200 );
	}
	onInsertContent( blockcode ) {
		this.importProcess( blockcode );
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
				control.props.import( response, control.props.clientId );
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
		var data_key = ( base_blocks_params.proData &&  base_blocks_params.proData.api_key ?  base_blocks_params.proData.api_key : '' );
		var data_email = ( base_blocks_params.proData &&  base_blocks_params.proData.api_email ?  base_blocks_params.proData.api_email : '' );
		var product_id = ( base_blocks_params.proData &&  base_blocks_params.proData.product_id ?  base_blocks_params.proData.product_id : '' );
		if ( ! data_key ) {
			data_key = (  base_blocks_params.proData &&  base_blocks_params.proData.avanamorg_key ?  base_blocks_params.proData.avanamorg_key : '' );
			if ( data_key ) {
				data_email = 'AvanamOrg';
			}
		}
		var data = new FormData();
		data.append( 'action', 'base_import_reload_prebuilt_data' );
		data.append( 'security', base_blocks_params.ajax_nonce );
		data.append( 'api_key', data_key );
		data.append( 'api_email', data_email );
		data.append( 'product_id', product_id );
		data.append( 'package', 'section' );
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
					const filteredLibraryItems = applyFilters( 'base.prebuilt_object', o );
					base_blocks_params.library_sections = filteredLibraryItems;
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
					control.setState( { items: filteredLibraryItems, errorItems: false, isLoading: false, categories: cats } );
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
		var data_key = ( base_blocks_params.proData &&  base_blocks_params.proData.api_key ?  base_blocks_params.proData.api_key : '' );
		var data_email = ( base_blocks_params.proData &&  base_blocks_params.proData.api_email ?  base_blocks_params.proData.api_email : '' );
		var product_id = ( base_blocks_params.proData &&  base_blocks_params.proData.product_id ?  base_blocks_params.proData.product_id : '' );
		if ( ! data_key ) {
			data_key = (  base_blocks_params.proData &&  base_blocks_params.proData.avanamorg_key ?  base_blocks_params.proData.avanamorg_key : '' );
			if ( data_key ) {
				data_email = 'AvanamOrg';
			}
		}
		var data = new FormData();
		data.append( 'action', 'base_import_get_prebuilt_data' );
		data.append( 'security', base_blocks_params.ajax_nonce );
		data.append( 'api_key', data_key );
		data.append( 'api_email', data_email );
		data.append( 'product_id', product_id );
		data.append( 'package', 'section' );
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
					const filteredLibraryItems = applyFilters( 'base.prebuilt_object', o );
					base_blocks_params.library_sections = filteredLibraryItems;
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
					control.setState( { items: filteredLibraryItems, errorItems: false, isLoading: false, categories: cats  } );
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
	loadPagesData() {
		this.setState( { errorItems: false, isLoading: true, pages: 'loading' } );
		var data_key = ( base_blocks_params.proData &&  base_blocks_params.proData.api_key ?  base_blocks_params.proData.api_key : '' );
		var data_email = ( base_blocks_params.proData &&  base_blocks_params.proData.api_email ?  base_blocks_params.proData.api_email : '' );
		var product_id = ( base_blocks_params.proData &&  base_blocks_params.proData.product_id ?  base_blocks_params.proData.product_id : '' );
		if ( ! data_key ) {
			data_key = (  base_blocks_params.proData &&  base_blocks_params.proData.avanamorg_key ?  base_blocks_params.proData.avanamorg_key : '' );
			if ( data_key ) {
				data_email = 'AvanamOrg';
			}
		}
		var data = new FormData();
		data.append( 'action', 'base_import_get_prebuilt_pages_data' );
		data.append( 'security', base_blocks_params.ajax_nonce );
		data.append( 'api_key', data_key );
		data.append( 'api_email', data_email );
		data.append( 'product_id', product_id );
		data.append( 'package', 'pages' );
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
					base_blocks_params.library_pages = o;
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
					control.setState( { pages: o, errorItems: false, isLoading: false, page_categories: cats  } );
				} else {
					control.setState( { pages: 'error', errorItems: true, isLoading: false } );
				}
			}
		})
		.fail( function( error ) {
			console.log(error);
			control.setState( { pages: 'error', errorItems: true, isLoading: false } );
		});
	}
	render() {
		if ( this.props.reload ) {
			this.props.onReload();
			this.debouncedReloadTemplateData();
		}
		const activePanel = SafeParseJSON( localStorage.getItem( 'baseBlocksPrebuilt' ), true );
		const sidebar_saved_enabled = ( activePanel && activePanel['sidebar'] ? activePanel['sidebar'] : 'show' );
		const savedGridSize = ( activePanel && activePanel['grid'] ? activePanel['grid'] : 'normal' );
		const savedStyle = ( undefined !== activePanel?.style && '' !== activePanel?.style ? activePanel.style : 'light' );
		const savedAI = ( undefined !== activePanel?.aic && '' !== activePanel?.aic ? activePanel.aic : false );
		const savedSelectedCategory = ( undefined !== activePanel?.kbCat && '' !== activePanel?.kbCat ? activePanel.kbCat : 'all' );
		const sidebarEnabled = ( this.state.sidebar ? this.state.sidebar : sidebar_saved_enabled );
		const gridSize = ( this.state.gridSize ? this.state.gridSize : savedGridSize );
		const selectedCategory = ( this.state.category ? this.state.category : savedSelectedCategory );
		const selectedStyle = ( this.state.style ? this.state.style : savedStyle );
		const control = this;
		const libraryItems = this.state.items;
		const categoryItems = this.state.categories;
		const catOptions = Object.keys( categoryItems ).map( function( key, index ) {
			return { value: ( 'category' === key ? 'all' : key ), label: categoryItems[key] }
		} );
		const sideCatOptions = Object.keys( categoryItems ).map( function( key, index ) {
			return { value: ( 'category' === key ? 'all' : key ), label: ( 'category' === key ? __( 'All', 'gutenam-blocks' ) : categoryItems[key] ) }
		} );
		const styleOptions = [
			{ value: 'light', label: __( 'Light', 'gutenam-blocks' ) },
			{ value: 'dark', label: __( 'Dark', 'gutenam-blocks' ) },
			{ value: 'highlight', label: __( 'Highlight', 'gutenam-blocks' ) }
		];
		// let breakpointColumnsObj = {
		// 	default: 4,
		// 	1900: 3,
		// 	1600: 3,
		// 	1200: 2,
		// 	500: 2,
		// };
		// if ( gridSize === 'large' ) {
		// 	breakpointColumnsObj = {
		// 		default: 3,
		// 		1900: 3,
		// 		1600: 2,
		// 		1200: 2,
		// 		500: 1,
		// 	};
		// }
		const breakpointColumnsObj = {
			default: 3,
			1900: 3,
			1600: 3,
			1200: 2,
			500: 1,
		};
		return (
			<div className={ `bst-prebuilt-content${ ( sidebarEnabled === 'show' ? ' bsb-prebuilt-has-sidebar' : '' ) }` }>
				{ sidebarEnabled === 'show' && (
					<div className="bst-prebuilt-sidebar bsb-section-sidebar">
						<div className="bsb-library-sidebar-top">
							{/* <Button
								className={ 'bsb-trigger-ai' }
								icon={ edit }
								onClick={ () => {
									this.setState( { showSettings: this.state.showSettings ? false : true } );
								}}
							/> */}
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
									const activeStorage = SafeParseJSON( localStorage.getItem( 'baseBlocksPrebuilt' ), true );
									activeStorage['sidebar'] = 'hide';
									localStorage.setItem( 'baseBlocksPrebuilt', JSON.stringify( activeStorage ) );
									this.setState( { sidebar: 'hide' } );
								}}
							/>
						</div>
						{ ! this.state.search && (
							<div className="bsb-library-sidebar-bottom-wrap">
								<div className="bsb-library-sidebar-bottom">
									{ sideCatOptions.map( ( category, index ) =>
										<Button
											key={ `${ category.value }-${ index }` }
											className={ 'bsb-category-button' + ( selectedCategory === category.value ? ' is-pressed' : '' ) }
											aria-pressed={ selectedCategory === category.value }
											onClick={ () => {
												const activeStorage = SafeParseJSON( localStorage.getItem( 'baseBlocksPrebuilt' ), true );
												activeStorage['kbCat'] = category.value;
												localStorage.setItem( 'baseBlocksPrebuilt', JSON.stringify( activeStorage ) );
												this.setState( { category: category.value } );
											}}
										>
											{ category.label }
										</Button>
									) }
								</div>
							</div>
						) }
						<div className="bsb-library-sidebar-fixed-bottom bsb-library-color-select-wrap">
							<h2>{ __( 'Change Colors', 'gutenam-blocks' ) }</h2>
							<div className="bsb-library-style-options">
								{ styleOptions.map( ( style, index ) =>
									<Button
										key={ `${ style.value }-${ index }` }
										label={ style.label }
										className={ 'bsb-style-button bsb-style-' + style.value + ( selectedStyle === style.value ? ' is-pressed' : '' ) }
										aria-pressed={ selectedStyle === style.value }
										onClick={ () => {
											const activeStorage = SafeParseJSON( localStorage.getItem( 'baseBlocksPrebuilt' ), true );
											activeStorage['style'] = style.value;
											localStorage.setItem( 'baseBlocksPrebuilt', JSON.stringify( activeStorage ) );
											this.setState( { style: style.value } );
										}}
									>
										<span></span>
									</Button>
								) }
							</div>
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
									const activeStorage = SafeParseJSON( localStorage.getItem( 'baseBlocksPrebuilt' ), true );
									activeStorage['sidebar'] = 'show';
									localStorage.setItem( 'baseBlocksPrebuilt', JSON.stringify( activeStorage ) );
									this.setState( { sidebar: 'show' } );
								} }
							/>
							<SelectControl
								className={ "bsb-library-header-cat-select" }
								value={ selectedCategory }
								options={ catOptions }
								onChange={ value => {
									const activeStorage = SafeParseJSON( localStorage.getItem( 'baseBlocksPrebuilt' ), true );
									activeStorage['kbCat'] = value;
									localStorage.setItem( 'baseBlocksPrebuilt', JSON.stringify( activeStorage ) );
									this.setState( { category: value } );
								}}
							/>
						</div>
						<div className="bsb-library-header-right">
							<div className="bsb-library-header-colors bsb-library-color-select-wrap">
								<h2>{ __( 'Change Colors', 'gutenam-blocks' ) }</h2>
								<div className="bsb-library-style-options">
									{ styleOptions.map( ( style, index ) =>
										<Button
											key={ `${ style.value }-${ index }` }
											label={ style.label }
											className={ 'bsb-style-button bsb-style-' + style.value + ( selectedStyle === style.value ? ' is-pressed' : '' ) }
											aria-pressed={ selectedStyle === style.value }
											onClick={ () => {
												const activeStorage = SafeParseJSON( localStorage.getItem( 'baseBlocksPrebuilt' ), true );
												activeStorage['style'] = style.value;
												localStorage.setItem( 'baseBlocksPrebuilt', JSON.stringify( activeStorage ) );
												this.setState( { style: style.value } );
											}}
										>
											<span></span>
										</Button>
									) }
								</div>
							</div>
							{/* <Button
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
									const activeStorage = SafeParseJSON( localStorage.getItem( 'baseBlocksPrebuilt' ), true );
									activeStorage['grid'] = 'large';
									localStorage.setItem( 'baseBlocksPrebuilt', JSON.stringify( activeStorage ) );
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
									const activeStorage = SafeParseJSON( localStorage.getItem( 'baseBlocksPrebuilt' ), true );
									activeStorage['grid'] = 'normal';
									localStorage.setItem( 'baseBlocksPrebuilt', JSON.stringify( activeStorage ) );
									this.setState( { gridSize: 'normal' } );
								} }
							/> */}
							<TextControl
								type="text"
								value={ this.state.search }
								placeholder={ __( 'Search', 'gutenam-blocks' ) }
								onChange={ value => this.setState( { search: value } ) }
							/>
						</div>
					</div>
				) }
				{ this.state.showSettings ? (
					<div className='bsb-library-ai-settings'>
						<TextControl
							label={ __( 'Business/Site Name', 'gutenam-blocks' ) }
							type="text"
							value={ this.state.business }
							onChange={ value => this.setState( { business: value } ) }
						/>
						<SelectControl
							label={ __( 'What industry are you in?', 'gutenam-blocks' ) }
							value={ this.state.industry }
							options={  [
								{ label: 'Non-Profit', value: '100%' },
								{ label: 'Local Business', value: 'local' },
								{ label: 'Real Estate', value: '253' },
								{ label: 'Technology', value: '252' },
								{ label: 'Health & Wellness', value: 'health' },
								{ label: 'Tavel', value: '258' },
								{ label: 'Ecommerce', value: '254%' },
								{ label: 'Events', value: '2500%' },
								{ label: 'Education', value: '2556%' },
							] }
							onChange={ value => {
								this.setState( { industry: value } );
							}}
						/>
						<SelectControl
							label={ __( 'Can you be more specific?', 'gutenam-blocks' ) }
							value={ this.state.subIndustry }
							options={  [
								{ label: 'Non-Profit', value: '100%' },
								{ label: 'Local Business', value: 'local' },
								{ label: 'Real Estate', value: '25%' },
								{ label: 'Yoga Studio', value: 'yoga' },
								{ label: 'Technology', value: '252' },
								{ label: 'Health', value: '256' },
								{ label: 'Tavel', value: '258' },
								{ label: 'Ecommerce', value: '254%' },
								{ label: 'Events', value: '2500%' },
								{ label: 'Education', value: '2556%' },
							] }
							onChange={ value => {
								this.setState( { subIndustry: value } );
							}}
						/>
						<TextareaControl
							label={__( 'Tell us a bit more about your business/site', 'gutenam-blocks' ) }
							value={ this.state.businessInfo }
							onChange={ value => this.setState( { businessInfo: value } ) }
						/>
						<Button
							className={ 'bsb-trigger-save-ai' }
							isPrimary={ true }
							onClick={ () => {
								const activeStorage = SafeParseJSON( localStorage.getItem( 'baseBlocksPrebuilt' ), true );
								if ( undefined !== activeStorage?.aic && '' !== activeStorage?.aic && activeStorage.aic ) {
									activeStorage['aic'] = false;
								} else {
									activeStorage['aic'] = true;
								}
								localStorage.setItem( 'baseBlocksPrebuilt', JSON.stringify( activeStorage ) );
								this.setState( { showSettings: false } );
							}}
						>{__( 'Save', 'gutenam-blocks' )}</Button>
					</div>
				) : (
					<>
						{ ( this.state.isImporting || this.state.isLoading || false === libraryItems || this.state.errorItems ) ? (
							<Fragment>
								{ ! this.state.errorItems && this.state.isLoading && (
									<div className="bsb-loading-library"><Spinner /></div>
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
							<PatternList
								savedAI={ savedAI }
								patterns={ this.state.items }
								filterValue={ this.state.search }
								selectedCategory={ selectedCategory }
								patternCategories={ catOptions }
								selectedStyle={ selectedStyle }
								breakpointCols={ breakpointColumnsObj }
								onSelect={ ( blockcode ) => control.onInsertContent( blockcode ) }
							/>
						) }
					</>
				) }
			</div>
		);
	}
}

export default compose(
	withSelect( ( select ) => {
		return {
			canUserUseUnfilteredHTML: select( 'core/editor' ) ? select( 'core/editor' ).canUserUseUnfilteredHTML() : false,
		};
	} ),
	withDispatch( ( dispatch, { canUserUseUnfilteredHTML } ) => ( {
		import: ( blockcode, clientId ) => dispatch( 'core/block-editor' ).replaceBlocks(
			clientId,
			rawHandler( {
				HTML: blockcode,
				mode: 'BLOCKS',
				canUserUseUnfilteredHTML,
			} ),
		),
	} ) ),
)( PrebuiltSections );
