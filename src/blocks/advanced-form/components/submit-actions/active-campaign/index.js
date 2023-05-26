/**
 * Active Campaign Controls
 *
 */

/**
 * Imports
 */
import Select from 'react-select';
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';
import { getFormFields } from '../../';

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
	ToggleControl,
	SelectControl,
	ExternalLink,
} from '@wordpress/components';
import { BasePanelBody } from '@base/components';

const HELP_URL = 'https://avanamorg92330.activehosted.com/app/settings/developer';

/**
 * Build the Measure controls
 * @returns {object} Measure settings.
 */
function ActiveCampaignOptions( { settings, save, parentClientId } ) {

	const [ api, setApi ] = useState( '' );
	const [ isSavedApi, setIsSavedApi ] = useState( false );
	const [ apiBase, setApiBase ] = useState( '' );
	const [ isSavedApiBase, setIsSavedApiBase ] = useState( false );
	const [ isSaving, setIsSaving ] = useState( false );
	const [ list, setList ] = useState( false );
	const [ isFetching, setIsFetching ] = useState( false );
	const [ listsLoaded, setListsLoaded ] = useState( false );
	const [ isFetchingAttributes, setIsFetchingAttributes ] = useState( false );
	const [ listAttr, setListAttr ] = useState( false );
	const [ listAttrLoaded, setListAttrLoaded ] = useState( false );
	const [ isFetchingGroups, setIsFetchingGroups ] = useState( false );
	const [ listGroups, setListGroups ] = useState( false );
	const [ listGroupLoaded, setListGroupLoaded ] = useState( false );
	const [ isFetchingTags, setIsFetchingTags ] = useState( false );
	const [ listTags, setListTags ] = useState( false );
	const [ listTagsLoaded, setListTagsLoaded ] = useState( false );

	useEffect( () => {
		apiFetch( {
			path: '/wp/v2/settings',
			method: 'GET',
		} ).then( ( response ) => {
			setApi( response.base_blocks_activecampaign_api_key );
			setApiBase( response.base_blocks_activecampaign_api_base );

			if ( '' !== response.base_blocks_activecampaign_api_key && '' !== response.base_blocks_activecampaign_api_base ) {
				setIsSavedApi( true );
				setIsSavedApiBase( true );
			}
		});

	}, [] );

	const fields = useMemo( () => getFormFields( parentClientId ), [ parentClientId ] );

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

	const getLists = () => {

		if ( !api ) {
			setList( [] );
			setListsLoaded( true );
			return;
		}

		setIsFetching( true );

		apiFetch( {
			path: addQueryArgs(
				'/bsb-activecampaign/v1/get',
				{ endpoint: 'lists' },
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
			.catch( ( err ) => {
				setList( [] );
				setListsLoaded( true );
				setIsFetching( false );
			} );
	};

	const getAutomations = () => {
		setIsFetchingGroups( true );

		apiFetch( {
			path: addQueryArgs(
				'/bsb-activecampaign/v1/get',
				{ endpoint: 'automations' },
			),
		} )
			.then( ( list ) => {
				const theGroups = [];
				list.automations.map( ( item ) => {
					theGroups.push( { value: item.id, label: item.name } );
				} );

				setListGroups( theGroups );
				setListGroupLoaded( true );
				setIsFetchingGroups( false );
			} )
			.catch( () => {
				setListGroups( [] );
				setListGroupLoaded( true );
				setIsFetchingGroups( false );
			} );
	};

	const getTags = () => {
		setIsFetchingTags( true );

		apiFetch( {
			path: addQueryArgs(
				'/bsb-activecampaign/v1/get',
				{ endpoint: 'tags' },
			),
		} )
			.then( ( list ) => {
				const theTags = [];
				if ( list.tags ) {
					list.tags.map( ( item ) => {
						theTags.push( { value: item.id, label: item.tag } );
					} );
				}

				setListTags( theTags );
				setListTagsLoaded( true );
				setIsFetchingTags( false );
			} )
			.catch( () => {
				setListTags( [] );
				setListTagsLoaded( true );
				setIsFetchingTags( false );
			} );
	};

	const getAttributes = () => {
		setIsFetchingAttributes( true );

		apiFetch( {
			path: addQueryArgs(
				'/bsb-activecampaign/v1/get',
				{ endpoint: 'fields' },
			),
		} )
			.then( ( list ) => {
				const theAttributes = [];
				theAttributes.push( { value: null, label: 'None' } );
				theAttributes.push( { value: 'email', label: __('Email', 'gutenam-blocks' ) + ' *' } );
				theAttributes.push( { value: 'firstName', label: __('First Name', 'gutenam-blocks' ) } );
				theAttributes.push( { value: 'lastName', label: __( 'Last Name', 'gutenam-blocks' ) } );
				theAttributes.push( { value: 'phone', label: __('Phone', 'gutenam-blocks' ) } );

				list.fields.map( ( item, index ) => {
					theAttributes.push( { value: item.id, label: item.title } );
				} );

				setListAttr( theAttributes );
				setListAttrLoaded( true );
				setIsFetchingAttributes( false );
			} )
			.catch( () => {
				const theAttributes = [];
				theAttributes.push( { value: null, label: 'None' } );
				theAttributes.push( { value: 'email', label: __('Email', 'gutenam-blocks' ) + ' *' } );
				theAttributes.push( { value: 'firstName', label: __('First Name', 'gutenam-blocks' ) } );
				theAttributes.push( { value: 'lastName', label: __( 'Last Name', 'gutenam-blocks' ) } );
				theAttributes.push( { value: 'phone', label: __('Phone', 'gutenam-blocks' ) } );

				setListAttr( theAttributes );
				setListAttrLoaded( true );
				setIsFetchingAttributes( false );
			} );
	};

	const removeAPI = () => {
		setApi( '' );
		setApiBase( '' );
		setIsSaving( true );

		const settingModel = new wp.api.models.Settings( {
			base_blocks_activecampaign_api_key : '',
			base_blocks_activecampaign_api_base: '',
		} );
		settingModel.save().then( () => {
			setIsSavedApi( false );
			setIsSavedApiBase( false );
			setIsSaving( false );
		} );

	};

	const saveAPI = () => {
		setIsSaving( true );

		const settingModel = new wp.api.models.Settings( {
			base_blocks_activecampaign_api_key : api,
			base_blocks_activecampaign_api_base: apiBase,
		} );
		settingModel.save().then( response => {
			setIsSaving( false );
			setIsSavedApi( true );
			setIsSavedApiBase( true );
		} );
	};

	const hasList = Array.isArray( list ) && list.length;
	const hasAttr = Array.isArray( listAttr ) && listAttr.length;
	const hasGroups = Array.isArray( listGroups ) && listGroups.length;
	const hasTags = Array.isArray( listTags ) && listTags.length;

	return (
		<BasePanelBody
			title={__( 'ActiveCampaign Settings', 'gutenam-blocks' )}
			initialOpen={false}
			panelName={'bsb-activecampaign-settings'}
		>
			<p>
				<ExternalLink href={HELP_URL}>{__( 'Get help', 'gutenam-blocks' )}</ExternalLink>
			</p>
			<TextControl
				label={__( 'API Key', 'gutenam-blocks' )}
				value={api}
				onChange={value => setApi( value )}
			/>
			<TextControl
				label={__( 'API URL', 'gutenam-blocks' )}
				placeholder={'https://youaccount.api-us1.com'}
				value={apiBase}
				onChange={value => setApiBase( value )}
			/>
			<div className="components-base-control">
				<Button
					isPrimary
					onClick={() => saveAPI()}
					disabled={'' === api}
				>
					{isSaving ? __( 'Saving', 'gutenam-blocks' ) : __( 'Save', 'gutenam-blocks' )}
				</Button>
				{api !== '' && (
					<Fragment>
						&nbsp;
						<Button
							isSecondary
							onClick={() => removeAPI()}
						>
							{__( 'Remove', 'gutenam-blocks' )}
						</Button>
					</Fragment>
				)}
			</div>
			{isSavedApi && isSavedApiBase && (
				<Fragment>
					{isFetching && (
						<Spinner/>
					)}
					{!isFetching && !hasList && (
						<Fragment>
							<h2 className="bst-heading-size-title">{__( 'Select List', 'gutenam-blocks' )}</h2>
							{( !listsLoaded ? getLists() : '' )}
							{!Array.isArray( list ) ?
								<Spinner/> :
								__( 'No Lists found.', 'gutenam-blocks' )}
						</Fragment>

					)}
					{!isFetching && hasList && (
						<Fragment>
							<h2 className="bst-heading-size-title">{__( 'Select List', 'gutenam-blocks' )}</h2>
							<Select
								value={( undefined !== settings && undefined !== settings && undefined !== settings.list ? settings.list : '' )}
								onChange={( value ) => {
									save( { list: ( value ? value : [] ) } );
								}}
								id={'mc-list-selection'}
								isClearable={true}
								options={list}
								isMulti={false}
								maxMenuHeight={200}
								placeholder={__( 'Select List' )}
							/>

							<Fragment>
								{isFetchingGroups && (
									<Spinner/>
								)}
								{!isFetchingGroups && !hasGroups && (
									<Fragment>
										<h2 className="bst-heading-size-title">{__( 'Select Automation', 'gutenam-blocks' )}</h2>
										{( !listGroupLoaded ? getAutomations() : '' )}
										{!Array.isArray( listGroups ) ?
											<Spinner/> :
											__( 'No Groups found.', 'gutenam-blocks' )}
									</Fragment>

								)}
								{!isFetchingGroups && hasGroups && (
									<Fragment>
										<h2 className="bst-heading-size-title">{__( 'Select Automation', 'gutenam-blocks' )}</h2>
										<Select
											value={( undefined !== settings && undefined !== settings && undefined !== settings.groups ? settings.groups : '' )}
											onChange={( value ) => {
												save( { groups: ( value ? value : [] ) } );
											}}
											id={'mc-automation-selection'}
											isClearable={true}
											options={listGroups}
											maxMenuHeight={200}
											placeholder={__( 'Select Automation' )}
										/>
									</Fragment>
								)}
								{isFetchingTags && (
									<Spinner/>
								)}
								{!isFetchingTags && !hasTags && (
									<Fragment>
										<h2 className="bst-heading-size-title">{__( 'Select Tags', 'gutenam-blocks' )}</h2>
										{( !listTagsLoaded ? getTags() : '' )}
										{!Array.isArray( listTags ) ?
											<Spinner/> :
											__( 'No Tags found.', 'gutenam-blocks' )}
									</Fragment>

								)}
								{!isFetchingTags && hasTags && (
									<Fragment>
										<h2 className="bst-heading-size-title">{__( 'Select Tags', 'gutenam-blocks' )}</h2>
										<Select
											value={( undefined !== settings && undefined !== settings && undefined !== settings.tags ? settings.tags : '' )}
											onChange={( value ) => {
												save( { tags: ( value ? value : [] ) } );
											}}
											id={'mc-tag-selection'}
											isClearable={true}
											options={listTags}
											isMulti={true}
											maxMenuHeight={200}
											placeholder={__( 'Select Tags' )}
										/>
									</Fragment>
								)}
								{isFetchingAttributes && (
									<Spinner/>
								)}
								{!isFetchingAttributes && !hasAttr && (
									<Fragment>
										<h2 className="bst-heading-size-title">{__( 'Map Fields', 'gutenam-blocks' )}</h2>
										{( !listAttrLoaded ? getAttributes() : '' )}
										{!Array.isArray( listAttr ) ?
											<Spinner/> :
											__( 'No Fields found.', 'gutenam-blocks' )}
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
									</Fragment>
								)}
							</Fragment>
						</Fragment>
					)}
				</Fragment>
			)}
		</BasePanelBody>
	);
}

export default ( ActiveCampaignOptions );
