/**
 * SendInBlue Controls
 *
 */

/**
 * Imports
 */
import Select from 'react-select';
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';
/**
 * Internal block libraries
 */
import { __ } from '@wordpress/i18n';
import {
	Fragment,
	useEffect,
	useMemo,
	useState,
} from '@wordpress/element';
import {
	TextControl,
	Button,
	Spinner,
	SelectControl,
	ExternalLink,
} from '@wordpress/components';
import { BasePanelBody } from '@base/components';
import { getFormFields } from '../../';

const RETRIEVE_API_URL = 'https://account.sendinblue.com/advanced/api/';
const HELP_URL = 'https://help.sendinblue.com/hc/en-us/articles/209467485-What-s-an-API-key-and-how-can-I-get-mine-';

/**
 * Build the Measure controls
 * @returns {object} Measure settings.
 */
function SendInBlueControls( { parentClientId, settings, save } ) {

	const [ api, setApi ] = useState( '' );
	const [ isSavedAPI, setIsSavedAPI ] = useState( false );
	const [ isSaving, setIsSaving ] = useState( false );
	const [ list, setList ] = useState( false );
	const [ isFetching, setIsFetching ] = useState( false );
	const [ listsLoaded, setListsLoaded ] = useState( false );
	const [ isFetchingAttributes, setIsFetchingAttributes ] = useState( false );
	const [ listAttr, setListAttr ] = useState( false );
	const [ listAttrLoaded, setListAttrLoaded ] = useState( false );

	const fields = useMemo( () => getFormFields( parentClientId ), [ parentClientId ] );

	useEffect( () => {
		apiFetch( {
			path: '/wp/v2/settings',
			method: 'GET',
		} ).then( ( response ) => {
			setApi( response.base_blocks_send_in_blue_api );
			if ( '' !== response.base_blocks_send_in_blue_api ) {
				setIsSavedAPI( true );
			}
		});
	}, [] );

	const getSendInBlueList = () => {
		if ( !api ) {
			setList( [] );
			setListsLoaded( true );
			return;
		}

		setIsFetching( true );
		apiFetch( {
			path: addQueryArgs(
				'/bsb-sendinblue/v1/get',
				{ apikey: api, endpoint: 'contacts/lists', queryargs: [ 'limit=50', 'offset=0' ] },
			),
		} )
			.then( ( list ) => {
				const theLists = [];
				list.lists.map( ( item ) => {
					theLists.push( { value: item.id, label: item.name } );
				} );

				setList( theLists );
				setListsLoaded( true );
				setIsFetching( false );
			} )
			.catch( () => {
				setList( [] );
				setListsLoaded( true );
				setIsFetching( false );
			} );
	};

	const getSendInBlueAttributes = () => {
		if ( !api ) {
			const theAttributes = [];
			theAttributes.push( { value: null, label: 'None' } );
			theAttributes.push( { value: 'email', label: 'Email *' } );

			setListAttr( theAttributes );
			setListsLoaded( true );
			return;
		}
		setIsFetchingAttributes( true );

		apiFetch( {
			path: addQueryArgs(
				'/bsb-sendinblue/v1/get',
				{ apikey: api, endpoint: 'contacts/attributes' },
			),
		} )
			.then( ( list ) => {
				const theAttributes = [];
				theAttributes.push( { value: null, label: 'None' } );
				theAttributes.push( { value: 'email', label: 'Email *' } );

				list.attributes.map( ( item, index ) => {
					if ( item.category === 'normal' ) {
						theAttributes.push( { value: item.name, label: item.name } );
					}
				} );

				setListAttr( theAttributes );
				setListsLoaded( true );
				setIsFetchingAttributes( false );
			} )
			.catch( () => {
				const theAttributes = [];
				theAttributes.push( { value: null, label: 'None' } );
				theAttributes.push( { value: 'email', label: 'Email *' } );

				setListAttr( theAttributes );
				setListAttrLoaded( true );
				setIsFetchingAttributes( false );
			} );
	};

	const removeAPI = () => {
		setApi( '' );

		if ( isSavedAPI ) {
			setIsSaving( true );
			const settingModel = new wp.api.models.Settings( {
				base_blocks_send_in_blue_api: '',
			} );
			settingModel.save().then( () => {
				setIsSavedAPI( false );
				setIsSaving( false );
			} );
		}
	};

	const saveAPI = () => {
		setIsSaving( true );
		const settingModel = new wp.api.models.Settings( {
			base_blocks_send_in_blue_api: api,
		} );
		settingModel.save().then( response => {
			setIsSaving( false );
			setIsSavedAPI( true );
		} );
	};

	const saveMap = ( value, index ) => {
		const newItems = fields.map( ( item, thisIndex ) => {
			let newString = '';
			if ( index === thisIndex ) {
				newString = value;
			} else if ( undefined !== settings.map && undefined !== settings.map[ thisIndex ] ) {
				newString = settings.map[ thisIndex ];
			} else {
				newString = '';
			}

			return newString;
		} );
		save( { map: newItems } );
	};

	const hasList = Array.isArray( list ) && list.length;
	const hasAttr = Array.isArray( listAttr ) && listAttr.length;

	return (
		<BasePanelBody
			title={__( 'SendInBlue Settings', 'gutenam-blocks-pro' )}
			initialOpen={false}
		>
			<p>
				<Fragment>
					<ExternalLink href={RETRIEVE_API_URL}>{__( 'Get API Key', 'gutenam-blocks-pro' )}</ExternalLink>
					|&nbsp;
					<ExternalLink href={HELP_URL}>{__( 'Get help', 'gutenam-blocks-pro' )}</ExternalLink>
				</Fragment>
			</p>
			<TextControl
				label={__( 'API Key (v3)', 'gutenam-blocks' )}
				value={api}
				onChange={value => setApi( value )}
			/>
			<div className="components-base-control">
				<Button
					isPrimary
					onClick={() => saveAPI()}
					disabled={'' === api}
				>
					{isSaving ? __( 'Saving', 'gutenam-blocks-pro' ) : __( 'Save', 'gutenam-blocks-pro' )}
				</Button>
				{api !== '' && (
					<Fragment>
						&nbsp;
						<Button
							isSecondary
							onClick={() => removeAPI()}
						>
							{__( 'Remove', 'gutenam-blocks-pro' )}
						</Button>
					</Fragment>
				)}
			</div>
			{isSavedAPI && (
				<Fragment>
					{isFetching && (
						<Spinner/>
					)}
					{!isFetching && !hasList && (
						<Fragment>
							<h2 className="bst-heading-size-title">{__( 'Select List', 'gutenam-blocks' )}</h2>
							{( !listsLoaded ? getSendInBlueList() : '' )}
							{!Array.isArray( list ) ?
								<Spinner/> :
								__( 'No list found.', 'gutenam-blocks-pro' )}
						</Fragment>

					)}
					{!isFetching && hasList && (
						<Fragment>
							<h2 className="bst-heading-size-title">{__( 'Select List', 'gutenam-blocks' )}</h2>
							<Select
								value={( undefined !== settings.list ? settings.list : '' )}
								onChange={( value ) => {
									save( { list: ( value ? value : [] ) } );
								}}
								id={'snb-list-selection'}
								options={list}
								isMulti={true}
								maxMenuHeight={200}
								placeholder={__( 'Select List' )}
							/>
							{!settings.list && (
								<div style={{ height: '100px' }}></div>
							)}
							{settings.list && (
								<Fragment>
									{isFetchingAttributes && (
										<Spinner/>
									)}
									{!isFetchingAttributes && !hasAttr && (
										<Fragment>
											<h2 className="bst-heading-size-title">{__( 'Map Fields', 'gutenam-blocks' )}</h2>
											{( !listAttrLoaded ? getSendInBlueAttributes() : '' )}
											{!Array.isArray( listAttr ) ?
												<Spinner/> :
												__( 'No Fields found.', 'gutenam-blocks-pro' )}
										</Fragment>

									)}
									{!isFetchingAttributes && hasAttr && (
										<Fragment>
											<h2 className="bst-heading-size-title">{__( 'Map Fields', 'gutenam-blocks' )}</h2>
											{fields && (
												fields.map( ( item, index ) => {
													return (
														<div key={index} className="bsb-field-map-item">
															<div className="bsb-field-map-item-form">
																<p className="bsb-field-map-item-label">{__( 'Form Field', 'gutenam-blocks' )}</p>
																<p className="bsb-field-map-item-name">{item.label}</p>
															</div>
															<SelectControl
																label={__( 'Select Field:' )}
																options={listAttr}
																value={( undefined !== settings.map && undefined !== settings.map[ index ] && settings.map[ index ] ? settings.map[ index ] : '' )}
																onChange={( value ) => {
																	saveMap( value, index );
																}}
															/>
														</div>
													);
												} )
											)}
											{/* <div style={ { height: '10px' } } />
												<ToggleControl
													label={ __( 'Require Double Opt In?', 'gutenam-blocks-pro' ) }
													checked={ ( undefined !== settings && undefined !== setting && undefined !== setting.doubleOptin ? setting.doubleOptin : false ) }
													onChange={ ( value ) => save( { doubleOptin: value } ) }
												/>
												{ ( undefined !== settings && undefined !== setting && undefined !== setting.doubleOptin ? setting.doubleOptin : false ) && (
													<Fragment>
														<TextControl
															label={ __( 'Double Opt In Template ID', 'gutenam-blocks' ) }
															help={ __( '*Required Template must have optin tag', 'gutenam-blocks' ) }
															value={ ( undefined !== settings && undefined !== setting && undefined !== setting.templateId ? setting.templateId : '' ) }
															onChange={ value => save( { templateId: value } ) }
														/>
														<TextControl
															label={ __( 'Double Opt In Redirect', 'gutenam-blocks' ) }
															help={ __( '*Required', 'gutenam-blocks' ) }
															value={ ( undefined !== settings && undefined !== setting && undefined !== setting.redirectionUrl ? setting.redirectionUrl : '' ) }
															onChange={ value => save( { redirectionUrl: value } ) }
														/>
													</Fragment>
												) } */}
										</Fragment>
									)}
								</Fragment>
							)}
						</Fragment>
					)}
				</Fragment>
			)}
		</BasePanelBody>
	);
}

export default ( SendInBlueControls );
