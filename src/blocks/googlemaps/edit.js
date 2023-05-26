/**
 * BLOCK: Base Google Maps
 */

/**
 * Import Css
 */
import './editor.scss';
import metadata from './block.json';

/**
 * Internal block libraries
 */
import { __ } from '@wordpress/i18n';
import { store as noticesStore } from '@wordpress/notices';
import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { useBlockProps, BlockControls } from '@wordpress/block-editor';
import apiFetch from '@wordpress/api-fetch';
import {
	TextControl,
	TextareaControl,
	SelectControl,
	ToggleControl,
	Modal,
	Button
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import classnames from 'classnames';
import { isEmpty, has } from 'lodash';
import EditJsMap from './editJsMap';
import {
	ResponsiveAlignControls,
	ResponsiveRangeControls,
	RangeControl,
	InspectorControlTabs,
	BasePanelBody,
	BaseInspectorControls,
	BaseBlockDefaults,
	ResponsiveMeasureRangeControl,
	SpacingVisualizer,
	CopyPasteAttributes,
} from '@base/components';
import {
	getPreviewSize,
	showSettings,
	getSpacingOptionOutput,
	mouseOverVisualizer,
	setBlockDefaults,
	getUniqueId,
} from '@base/helpers';

export function Edit( props ) {
	const { attributes, setAttributes, className, clientId } = props;

	const {
		uniqueID,
		heightDesktop,
		heightTablet,
		heightMobile,
		widthDesktop,
		widthTablet,
		widthMobile,
		marginDesktop,
		marginTablet,
		marginMobile,
		marginUnit,
		paddingDesktop,
		paddingTablet,
		paddingMobile,
		paddingUnit,
		location,
		showMarker,
		mapStyle,
		customSnazzy,
		lat,
		lng,
		zoom,
		apiType,
		mapType,
		mapFilter,
		mapFilterAmount,
		sizeSlug,
		textAlign,
		bbVersion
	} = attributes;

	const previewDevice = useSelect( ( select ) => {
		return select( 'baseblocks/data' ).getPreviewDeviceType();
	}, [] );
	let includedGoogleApiKey = 'AIzaSyBAM2o7PiQqwk15LC1XRH2e_KJ-jUa7KYk';

	const [ customGoogleApiKey, setCustomGoogleApiKey ] = useState('');

	const paddingMouseOver = mouseOverVisualizer();
	const marginMouseOver = mouseOverVisualizer();

	let googleApiKey = isEmpty(customGoogleApiKey) ? includedGoogleApiKey : customGoogleApiKey;

	/*
	 * Geocode friendly address into Lat/Lng
	 * Wait 0.5 seconds after last change to prevent unnecessary requests
	 * Also skip if using Embed API as we don't need Lat/Lng for that
	 */
	useEffect(() => {
		if ( apiType === 'javascript' ) {
			const timeOutId = setTimeout(() => locationChange( location ), 600);
			return () => clearTimeout(timeOutId);
		}

	}, [ location, apiType ]);

	const locationChange = async (address) => {

		try {
			const geocoder = new window.google.maps.Geocoder()
			const response = await geocoder.geocode({ address: address })
			if ( has( response.results, [0] ) ) {
				setAttributes( {
					lat: response.results[0].geometry.location.lat().toString(),
					lng: response.results[0].geometry.location.lng().toString()
				} );
			} else {
				createErrorNotice( __('Could not find location', 'gutenam-blocks') + ': ' + address, { type: 'snackbar' } );
			}
		} catch ( error ) {
			createErrorNotice( __('Could not find location', 'gutenam-blocks') + ': ' + address, { type: 'snackbar' } );
		}
	}

	const previewHeight = getPreviewSize( previewDevice, ( undefined !== heightDesktop ? heightDesktop : '450' ), ( undefined !== heightTablet ? heightTablet : '' ), ( undefined !== heightMobile ? heightMobile : '' ) );
	const previewWidth = getPreviewSize( previewDevice, ( undefined !== widthDesktop ? widthDesktop : '' ), ( undefined !== widthTablet ? widthTablet : '' ), ( undefined !== widthMobile ? widthMobile : '' ) );

	const previewMarginTop = getPreviewSize( previewDevice, ( undefined !== marginDesktop ? marginDesktop[0] : '' ), ( undefined !== marginTablet ? marginTablet[ 0 ] : '' ), ( undefined !== marginMobile ? marginMobile[ 0 ] : '' ) );
	const previewMarginRight = getPreviewSize( previewDevice, ( undefined !== marginDesktop ? marginDesktop[1] : '' ), ( undefined !== marginTablet ? marginTablet[ 1 ] : '' ), ( undefined !== marginMobile ? marginMobile[ 1 ] : '' ) );
	const previewMarginBottom = getPreviewSize( previewDevice, ( undefined !== marginDesktop ? marginDesktop[2] : '' ), ( undefined !== marginTablet ? marginTablet[ 2 ] : '' ), ( undefined !== marginMobile ? marginMobile[ 2 ] : '' ) );
	const previewMarginLeft = getPreviewSize( previewDevice, ( undefined !== marginDesktop ? marginDesktop[3] : '' ), ( undefined !== marginTablet ? marginTablet[ 3 ] : '' ), ( undefined !== marginMobile ? marginMobile[ 3 ] : '' ) );

	const previewPaddingTop = getPreviewSize( previewDevice, ( undefined !== paddingDesktop ? paddingDesktop[0] : '' ), ( undefined !== paddingTablet ? paddingTablet[ 0 ] : '' ), ( undefined !== paddingMobile ? paddingMobile[ 0 ] : '' ) );
	const previewPaddingRight = getPreviewSize( previewDevice, ( undefined !== paddingDesktop ? paddingDesktop[1] : '' ), ( undefined !== paddingTablet ? paddingTablet[ 1 ] : '' ), ( undefined !== paddingMobile ? paddingMobile[ 1 ] : '' ) );
	const previewPaddingBottom = getPreviewSize( previewDevice, ( undefined !== paddingDesktop ? paddingDesktop[2] : '' ), ( undefined !== paddingTablet ? paddingTablet[ 2 ] : '' ), ( undefined !== paddingMobile ? paddingMobile[ 2 ] : '' ) );
	const previewPaddingLeft = getPreviewSize( previewDevice, ( undefined !== paddingDesktop ? paddingDesktop[3] : '' ), ( undefined !== paddingTablet ? paddingTablet[ 3 ] : '' ), ( undefined !== paddingMobile ? paddingMobile[ 3 ] : '' ) );

	const previewTextAlign = getPreviewSize( previewDevice, ( undefined !== textAlign && undefined !== textAlign[0] ? textAlign[0] : '' ), ( undefined !== textAlign && undefined !== textAlign[1] ? textAlign[1] : '' ), ( undefined !== textAlign && undefined !== textAlign[2] ? textAlign[2] : '' ) );

	const [ activeTab, setActiveTab ] = useState( 'general' );
	const [ isOpen, setOpen ] = useState( false );

	const openModal = () => setOpen( true );
	const closeModal = () => setOpen( false );

	const { createErrorNotice } = useDispatch(
		noticesStore
	);

	const { addUniqueID } = useDispatch( 'baseblocks/data' );
	const { isUniqueID, isUniqueBlock } = useSelect(
		( select ) => {
			return {
				isUniqueID: ( value ) => select( 'baseblocks/data' ).isUniqueID( value ),
				isUniqueBlock: ( value, clientId ) => select( 'baseblocks/data' ).isUniqueBlock( value, clientId ),
			};
		},
		[ clientId ]
	);

	useEffect(() => {
		/**
		 * Get settings
		 */
		apiFetch( {
			path: '/wp/v2/settings',
			method: 'GET',
		} ).then( ( response ) => {
			setCustomGoogleApiKey(response.base_blocks_google_maps_api);
		});

		setBlockDefaults( 'base/googlemaps', attributes);

		let uniqueId = getUniqueId( uniqueID, clientId, isUniqueID, isUniqueBlock );
		if ( uniqueId !== uniqueID ) {
			attributes.uniqueID = uniqueId;
			setAttributes( { uniqueID: uniqueId } );
			addUniqueID( uniqueId, clientId );
		} else {
			addUniqueID( uniqueID, clientId );
		}

		if ( ! bbVersion || bbVersion < 2 ) {
			setAttributes( { bbVersion: 2 } );
		}

	}, []);

	function setGoogleApiKey() {
		const settingModel = new wp.api.models.Settings( {
			base_blocks_google_maps_api: customGoogleApiKey,
		} );
		settingModel.save().then( response => {
		} );
	}

	function removeGoogleApiKey() {
		setCustomGoogleApiKey('');
		const settingModel = new wp.api.models.Settings( {
			base_blocks_google_maps_api: '',
		} );
		settingModel.save().then( response => {
		} );
	}

	const getSaneDefaultForFilter = ( filter ) => {
		switch (filter) {
			case "standard":
				return 0;
			case "grayscale":
				return 100;
			case "invert":
				return 100;
			case "saturate":
				return 150;
			case "sepia":
				return 30;
			default:
				return 50;
		}
	}

	const classes = classnames( {
		[ className ]: className,
		[ `size-${ sizeSlug }` ]: sizeSlug,
		[ `base-googlemaps-${ uniqueID }` ]: uniqueID,
	} );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	let mapQueryParams = {
		key: googleApiKey,
		zoom: zoom,
		maptype: mapType,
		q: location
	};

	const qs = Object.keys(mapQueryParams)
		.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(mapQueryParams[key])}`)
		.join('&');

	return (
		<figure { ...blockProps }>
			<>
				<BlockControls>
					<CopyPasteAttributes
						attributes={ attributes }
						defaultAttributes={ metadata['attributes'] }
						blockSlug={ metadata['name'] }
						onPaste={ attributesToPaste => setAttributes( attributesToPaste ) }
					/>
				</BlockControls>
				<BaseInspectorControls blockSlug={ 'base/googlemaps' }>
					<InspectorControlTabs
						panelName={ 'googlemaps' }
						setActiveTab={ setActiveTab }
						activeTab={ activeTab }
					/>

					{( activeTab === 'general' ) &&
						<>
							<BasePanelBody
								title={__('Map Location', 'gutenam-blocks')}
								blockSlug={ 'base/googlemaps' }
								panelName={'mapLocation'}
							>

								<TextControl
									label={__('Location', 'gutenam-blocks')}
									value={location}
									onChange={(value) => {
										setAttributes({location: value});
									}}
								/>

								{apiType === 'javascript' && (
									<>
										<ToggleControl
											label={__('Show Marker', 'gutenam-blocks')}
											checked={(showMarker)}
											onChange={(value) => {
												setAttributes({showMarker: (value)})
											}}
										/>
										{/*<ToggleControl*/}
										{/*	label={ __('Show Controls', 'gutenam-blocks') }*/}
										{/*	checked={ (showControls) }*/}
										{/*	onChange={ (value) => { setAttributes({ showControls: (value) }) } }*/}
										{/*/>*/}
									</>
								) }

								<RangeControl
									label={__('Zoom', 'gutenam-blocks')}
									value={parseInt(zoom)}
									onChange={(value) => setAttributes({zoom: value})}
									min={1}
									max={20}
								/>

								<SelectControl
									label={__('Map Type', 'gutenam-blocks')}
									value={mapType}
									onChange={(value) => setAttributes({mapType: value})}
									options={[
										{
											label: __('Road Map', 'gutenam-blocks'),
											value: 'roadmap'
										},
										{
											label: __('Satellite', 'gutenam-blocks'),
											value: 'satellite'
										}
									]}
								/>

								<SelectControl
									label={__('Map Filter', 'gutenam-blocks')}
									value={mapFilter}
									onChange={(value) => setAttributes({
										mapFilter: value,
										mapFilterAmount: getSaneDefaultForFilter(value)
									})}
									options={[
										{
											label: __('None', 'gutenam-blocks'),
											value: 'standard'
										},
										{
											label: __('Grayscale', 'gutenam-blocks'),
											value: 'grayscale'
										},
										{
											label: __('Invert', 'gutenam-blocks'),
											value: 'invert'
										},
										{
											label: __('Saturate', 'gutenam-blocks'),
											value: 'saturate'
										},
										{
											label: __('Sepia', 'gutenam-blocks'),
											value: 'sepia'
										}
									]}
								/>

								{mapFilter !== 'standard' && (
									<RangeControl
										label={__('Map Filter Strength ', 'gutenam-blocks')}
										value={ parseInt(mapFilterAmount) }
										onChange={(value) => setAttributes({mapFilterAmount: value})}
										min={0}
										max={(mapFilter === 'saturate') ? 250 : 100}
									/>
								) }

								{apiType === 'javascript' && mapType === 'roadmap' && (
									<>
										<SelectControl
											label={__('Map Style', 'gutenam-blocks')}
											value={mapStyle}
											onChange={(value) => setAttributes({
												mapStyle: value
											})}
											options={[
												{
													label: __('None', 'gutenam-blocks'),
													value: 'standard'
												},
												{
													label: __('Apple Maps Esque', 'gutenam-blocks'),
													value: 'apple_maps_esque'
												},
												{
													label: __('Avocado', 'gutenam-blocks'),
													value: 'avocado'
												},
												{
													label: __('Clean Interface', 'gutenam-blocks'),
													value: 'clean_interface'
												},
												{
													label: __('Cobalt', 'gutenam-blocks'),
													value: 'cobalt'
												},
												{
													label: __('Midnight Commander', 'gutenam-blocks'),
													value: 'midnight_commander'
												},
												{
													label: __('Night Mode', 'gutenam-blocks'),
													value: 'night_mode'
												},
												{
													label: __('No labels, Bright Colors', 'gutenam-blocks'),
													value: 'no_label_bright_colors'
												},
												{
													label: __('Shades of Grey', 'gutenam-blocks'),
													value: 'shades_of_grey'
												},
												{
													label: __('Custom Snazzy Map', 'gutenam-blocks'),
													value: 'custom'
												}
											]}/>
									</>
								)}

								{ apiType === 'javascript' && mapType === 'roadmap' && mapStyle === 'custom' && (
									<>
										<TextareaControl
											label={__('Custom Map Style', 'gutenam-blocks')}
											help={__('Copy the "Javascript Style Array" from a Snazzy Maps style', 'gutenam-blocks')}
											value={customSnazzy}
											onChange={(value) => setAttributes({customSnazzy: value})}
										/>

										<a href={'https://snazzymaps.com'}
										target={'_blank'}> {__('Visit Snazzy Maps', 'gutenam-blocks')} </a>
									</>
								) }

							</BasePanelBody>

							<BasePanelBody
								title={__('API Settings', 'gutenam-blocks')}
								initialOpen={false}
								blockSlug={ 'base/googlemaps' }
								panelName={'apiSettings'}
							>

								{__('This block includes an API key, but a custom key can be used. A custom key is required to use the Javascript API.', 'gutenam-blocks')}

								<br/>

								<a href={'https://developers.google.com/maps/documentation/embed/get-api-key'}
								target={'_blank'}>{__('How to create an API Key', 'gutenam-blocks')}</a>


								<br/>

								<h2 style={{marginBottom: '0px'}}>Required Permissions</h2>
								<ul style={{marginTop: '5px'}}>
									{apiType === 'javascript' ?
										<>
											<li>- Maps Javascript API</li>
											<li>- Geocoding API</li>
										</>
										:
										<li>- Maps Embed API</li>}
								</ul>

								<br/>

								<TextControl
									label={__('API Key', 'gutenam-blocks')}
									value={customGoogleApiKey}
									onChange={value => setCustomGoogleApiKey(value)}
								/>
								<Button
									isPrimary
									onClick={setGoogleApiKey}
									disabled={'' === customGoogleApiKey}
								>
									Save
								</Button>

								{'' !== customGoogleApiKey &&
									<>
										&nbsp;
										<Button
											isSecondary
											onClick={removeGoogleApiKey}
											disabled={'' === customGoogleApiKey}
										>
											Remove
										</Button>

										<br/><br/>

										<ToggleControl
											label={__('Use Javascript API', 'gutenam-blocks')}
											checked={(apiType === 'javascript')}
											onChange={(value) => {
												setAttributes({
													apiType: (value ? 'javascript' : 'embed'),
													mapFilter: 'standard'
												});
												if (value) {
													openModal();
												}
											}}
										/>
									</>
								}

							</BasePanelBody>
						</>
					}

					{ activeTab === 'style' && (
						<>
							<BasePanelBody
								title={__( 'Container Size', 'gutenam-blocks' )}
								panelName={ 'containerStyle' }
								blockSlug={ 'base/googlemaps' }
							>
								<ResponsiveRangeControls
									label={__( 'Height', 'gutenam-blocks' )}
									value={heightDesktop}
									onChange={value => setAttributes( { heightDesktop: value } )}
									tabletValue={( heightTablet ? heightTablet : '' )}
									onChangeTablet={( value ) => setAttributes( { heightTablet: value } )}
									mobileValue={( heightMobile ? heightMobile : '' )}
									onChangeMobile={( value ) => setAttributes( { heightMobile: value } )}
									min={100}
									max={1250}
									step={1}
									unit={'px'}
									units={[ 'px' ]}
									showUnit={true}
								/>

								<ResponsiveRangeControls
									label={__( 'Max Width', 'gutenam-blocks' )}
									value={widthDesktop}
									onChange={value => setAttributes( { widthDesktop: value } )}
									tabletValue={( widthTablet ? widthTablet : '' )}
									onChangeTablet={( value ) => setAttributes( { widthTablet: value } )}
									mobileValue={( widthMobile ? widthMobile : '' )}
									onChangeMobile={( value ) => setAttributes( { widthMobile: value } )}
									min={100}
									max={1250}
									step={1}
									unit={'px'}
									units={[ 'px' ]}
									showUnit={true}
									reset={() => setAttributes( { widthDesktop: '', widthTablet: '', widthMobile: '' } )}
								/>
								{( widthDesktop || widthTablet || widthMobile ) && (
									<ResponsiveAlignControls
										label={__( 'Alignment', 'gutenam-blocks' )}
										value={( textAlign && textAlign[ 0 ] ? textAlign[ 0 ] : '' )}
										mobileValue={( textAlign && textAlign[ 1 ] ? textAlign[ 1 ] : '' )}
										tabletValue={( textAlign && textAlign[ 2 ] ? textAlign[ 2 ] : '' )}
										onChange={( nextAlign ) => setAttributes( { textAlign: [ nextAlign, ( textAlign && textAlign[ 1 ] ? textAlign[ 1 ] : '' ), ( textAlign && textAlign[ 2 ] ? textAlign[ 2 ] : '' ) ] } )}
										onChangeTablet={( nextAlign ) => setAttributes( { textAlign: [ ( textAlign && textAlign[ 0 ] ? textAlign[ 0 ] : '' ), nextAlign, ( textAlign && textAlign[ 2 ] ? textAlign[ 2 ] : '' ) ] } )}
										onChangeMobile={( nextAlign ) => setAttributes( { textAlign: [ ( textAlign && textAlign[ 0 ] ? textAlign[ 0 ] : '' ), ( textAlign && textAlign[ 1 ] ? textAlign[ 1 ] : '' ), nextAlign ] } )}
									/>
								)}

							</BasePanelBody>
						</>
					)}

					{ activeTab === 'advanced' && (
						<>
							<BasePanelBody panelName={'bsb-google-spacing-settings'}>
								<ResponsiveMeasureRangeControl
									label={__( 'Padding', 'gutenam-blocks' )}
									value={paddingDesktop}
									tabletValue={paddingTablet}
									mobileValue={paddingMobile}
									onChange={( value ) => setAttributes( { paddingDesktop: value } )}
									onChangeTablet={( value ) => setAttributes( { paddingTablet: value } )}
									onChangeMobile={( value ) => setAttributes( { paddingMobile: value } )}
									min={0}
									max={( paddingUnit === 'em' || paddingUnit === 'rem' ? 25 : 400 )}
									step={( paddingUnit === 'em' || paddingUnit === 'rem' ? 0.1 : 1 )}
									unit={paddingUnit}
									units={[ 'px', 'em', 'rem', '%' ]}
									onUnit={( value ) => setAttributes( { paddingUnit: value } )}
									onMouseOver={ paddingMouseOver.onMouseOver }
									onMouseOut={ paddingMouseOver.onMouseOut }
								/>
								<ResponsiveMeasureRangeControl
									label={__( 'Margin', 'gutenam-blocks' )}
									value={marginDesktop}
									tabletValue={marginTablet}
									mobileValue={marginMobile}
									onChange={( value ) => setAttributes( { marginDesktop: value } )}
									onChangeTablet={( value ) => setAttributes( { marginTablet: value } )}
									onChangeMobile={( value ) => setAttributes( { marginMobile: value } )}
									min={( marginUnit === 'em' || marginUnit === 'rem' ? -25 : -400 )}
									max={( marginUnit === 'em' || marginUnit === 'rem' ? 25 : 400 )}
									step={( marginUnit === 'em' || marginUnit === 'rem' ? 0.1 : 1 )}
									unit={marginUnit}
									units={[ 'px', 'em', 'rem', '%', 'vh' ]}
									onUnit={( value ) => setAttributes( { marginUnit: value } )}
									onMouseOver={ marginMouseOver.onMouseOver }
									onMouseOut={ marginMouseOver.onMouseOut }
								/>
							</BasePanelBody>

							<div className="bst-sidebar-settings-spacer"></div>

							<BaseBlockDefaults attributes={attributes} defaultAttributes={metadata['attributes']} blockSlug={ metadata['name'] } />
						</>
					)}
				</BaseInspectorControls>
			</>

			<div style={ {
				marginTop: ('' !== previewMarginTop ? getSpacingOptionOutput( previewMarginTop, marginUnit ) : undefined),
				marginRight: ('' !== previewMarginRight ? getSpacingOptionOutput( previewMarginRight, marginUnit ) : undefined),
				marginBottom: ('' !== previewMarginBottom ? getSpacingOptionOutput( previewMarginBottom, marginUnit ) : undefined),
				marginLeft: ('' !== previewMarginLeft ? getSpacingOptionOutput( previewMarginLeft, marginUnit ) : undefined),

				paddingTop: ('' !== previewPaddingTop ? getSpacingOptionOutput( previewPaddingTop, paddingUnit ) : undefined),
				paddingRight: ('' !== previewPaddingRight ? getSpacingOptionOutput( previewPaddingRight, paddingUnit ) : undefined),
				paddingBottom: ('' !== previewPaddingBottom ? getSpacingOptionOutput( previewPaddingBottom, paddingUnit ) : undefined),
				paddingLeft: ('' !== previewPaddingLeft ? getSpacingOptionOutput( previewPaddingLeft, paddingUnit ) : undefined)
			} }>
				<div className={`bsb-map-container bsb-map-align-${previewTextAlign}`} style={{}}>
					<div className={'bsb-map-container-infobar'}></div>
					{apiType === 'embed' ? <div style={{
							webkitFilter: (mapFilter !== 'standard' ? mapFilter + '(' + mapFilterAmount + '%)' : 'none'),
							height: previewHeight + 'px',
							maxWidth: (previewWidth === '' ? '100%' : previewWidth + 'px'),
						}}>

							<iframe width={'100%'} height={'100%'}
									src={'https://www.google.com/maps/embed/v1/place?' + qs}>
							</iframe>
						</div> :
						<div style={{
							webkitFilter: (mapFilter !== 'standard' ? mapFilter + '(' + mapFilterAmount + '%)' : 'none'),
							height: previewHeight + 'px',
							maxWidth: (previewWidth === '' ? '100%' : previewWidth + 'px'),
						}}>
							<EditJsMap zoom={zoom} customSnazzy={customSnazzy} lat={lat} lng={lng}
									   showMarker={showMarker} mapType={mapType} mapStyle={mapStyle}
									   googleApiKey={ customGoogleApiKey }/>
						</div>
					}
				</div>

				<SpacingVisualizer
					style={ {
						marginLeft: ( undefined !== previewMarginLeft ? getSpacingOptionOutput( previewMarginLeft, marginUnit ) : undefined ),
						marginRight: ( undefined !== previewMarginRight ? getSpacingOptionOutput( previewMarginRight, marginUnit ) : undefined ),
						marginTop: ( undefined !== previewMarginTop ? getSpacingOptionOutput( previewMarginTop, marginUnit ) : undefined ),
						marginBottom: ( undefined !== previewMarginBottom ? getSpacingOptionOutput( previewMarginBottom, marginUnit ) : undefined ),
					} }
					type="inside"
					forceShow={ paddingMouseOver.isMouseOver }
					spacing={ [ getSpacingOptionOutput( previewPaddingTop, paddingUnit ), getSpacingOptionOutput( previewPaddingRight, paddingUnit ), getSpacingOptionOutput( previewPaddingBottom, paddingUnit ), getSpacingOptionOutput( previewPaddingLeft, paddingUnit ) ] }
				/>
				<SpacingVisualizer
					type="outside"
					forceShow={ marginMouseOver.isMouseOver }
					spacing={ [ getSpacingOptionOutput( previewMarginTop, marginUnit ), getSpacingOptionOutput( previewMarginRight, marginUnit ), getSpacingOptionOutput( previewMarginBottom, marginUnit ), getSpacingOptionOutput( previewMarginLeft, marginUnit ) ] }
				/>
			</div>
			{ isOpen && (
				<Modal title={ __( 'Google Maps Javascript API', 'gutenam-blocks' ) } onRequestClose={ closeModal }>
					<div style={ { maxWidth: '600px' } }>
						{ __( 'The Google Maps Javascript API is paid service and costs per request.', 'gutenam-blocks' ) }
						<br />
						<a href={ 'https://mapsplatform.google.com/pricing/' } target={ '_blank' }>{ __( 'Click here to view the latest pricing', 'gutenam-blocks' ) } </a>.
						<br /><br />

						{ __( 'This API key you enter is here visible by users, so make sure to restrict the key to specific endpoints and web addresses.', 'gutenam-blocks' ) }
						<br />
						<a href={ 'https://developers.google.com/maps/api-security-best-practices#restricting-api-keys' } target={ '_blank' }>{ __( 'More informaiton on that can be found here', 'gutenam-blocks' ) }</a>

						<br /><br />

						<Button className={ 'is-secondary' } onClick={ () => {
							setAttributes({ apiType: 'embed' })
							closeModal()
						} } text={ __( 'Cancel', 'gutenam-blocks' ) } />
						&nbsp;&nbsp;&nbsp;&nbsp;
						<Button className={ 'is-primary' } onClick={ closeModal } text={ __( 'Continue', 'gutenam-blocks' ) } />

					</div>
				</Modal>
			) }
		</figure>
	);
}

export default ( Edit );
