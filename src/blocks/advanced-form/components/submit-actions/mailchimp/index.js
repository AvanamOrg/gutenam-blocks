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
import { getFormFields } from '../../';

/**
 * Internal block libraries
 */
import { __ } from '@wordpress/i18n';
import {
	Fragment,
	useEffect,
	useMemo,
	useState
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

const RETRIEVE_API_URL = 'https://mailchimp.com/help/about-api-keys/';
const HELP_URL = 'https://mailchimp.com/help/about-api-keys/';

/**
 * Build the Measure controls
 * @returns {object} Measure settings.
 */
function MailChimpControls( { settings, save, parentClientId } ) {

	const [ api, setApi ] = useState( '' );
	const [ isSavedApi, setIsSavedApi ] = useState( false );
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
			setApi( response.base_blocks_mail_chimp_api );

			if ( '' !== response.base_blocks_mail_chimp_api ) {
				setIsSavedApi( true );
			}
		});
	}, [] );

	const fields = useMemo(() => getFormFields( parentClientId ), [ parentClientId ]);

	const saveMap = ( value, index  ) => {
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
	}

	const getMailChimpAudience = () => {

		if ( !api ) {
			setList( [] );
			setListsLoaded( true );
			return;
		}

		const sub = api.split( '-' )[ 1 ];
		if ( !sub ) {
			setList( [] );
			setListsLoaded( true );
			return;
		}
		setIsFetching( true );

		apiFetch( {
			path: addQueryArgs(
				'/bsb-mailchimp/v1/get',
				{ apikey: api, endpoint: 'lists/', queryargs: [ 'count=300', 'offset=0' ] },
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

	const getMailChimpGroups = () => {
		if ( !api || !settings.list.value ) {
			setListGroups( [] );
			setListGroupLoaded( true );

			return;
		}

		setIsFetchingGroups( true );

		apiFetch( {
			path: addQueryArgs(
				'/bsb-mailchimp/v1/get',
				{ apikey: api, endpoint: 'lists/' + settings.list.value + '/interest-categories/', queryargs: [ 'count=300', 'offset=0' ] },
			),
		} )
			.then( ( list ) => {
				const theGroups = [];
				list.map( ( item ) => {
					theGroups.push( { value: item.id, label: item.title } );
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

	const getMailChimpTags = () => {
		if ( !api || !settings.list.value ) {
			setListTags( [] );
			setListTagsLoaded( true );
			return;
		}

		setIsFetchingTags( true );

		apiFetch( {
			path: addQueryArgs(
				'/bsb-mailchimp/v1/get',
				{ apikey: api, endpoint: 'lists/' + settings.list.value + '/tag-search/', queryargs: [ 'count=500', 'offset=0' ] },
			),
		} )
			.then( ( list ) => {
				const theTags = [];
				if ( list.tags ) {
					list.tags.map( ( item ) => {
						theTags.push( { value: item.id, label: item.name } );
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

	const getMailChimpAttributes = () => {
		if ( !api || !settings.list.value ) {
			const theAttributes = [];
			theAttributes.push( { value: null, label: 'None' } );
			theAttributes.push( { value: 'email', label: 'Email *' } );

			setListAttr( theAttributes );
			setListAttrLoaded( true );
			return;
		}

		setIsFetchingAttributes( true );

		apiFetch( {
			path: addQueryArgs(
				'/bsb-mailchimp/v1/get',
				{ apikey: api, endpoint: 'lists/' + settings.list.value + '/merge-fields/', queryargs: [ 'count=300', 'offset=0' ] },
			),
		} )
			.then( ( list ) => {
				const theAttributes = [];
				theAttributes.push( { value: null, label: 'None' } );
				theAttributes.push( { value: 'email', label: 'Email *' } );
				list.merge_fields.map( ( item, index ) => {
					theAttributes.push( { value: item.tag, label: item.name } );
				} );

				setListAttr( theAttributes );
				setListAttrLoaded( true );
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

		if ( isSavedApi ) {
			setIsSaving( true );

			const settingModel = new wp.api.models.Settings( {
				base_blocks_mail_chimp_api: '',
			} );
			settingModel.save().then( () => {
				setIsSavedApi( false );
				setIsSaving( false );
			} );
		}
	};

	const saveAPI = () => {
		setIsSaving( true );

		const settingModel = new wp.api.models.Settings( {
			base_blocks_mail_chimp_api: api,
		} );
		settingModel.save().then( response => {
			setIsSaving( false );
			setIsSavedApi( true );
		} );
	};

	const hasList = Array.isArray( list ) && list.length;
	const hasAttr = Array.isArray( listAttr ) && listAttr.length;
	const hasGroups = Array.isArray( listGroups ) && listGroups.length;
	const hasTags = Array.isArray( listTags ) && listTags.length;
	return (
		<BasePanelBody
			title={__( 'MailChimp Settings', 'gutenam-blocks-pro' )}
			initialOpen={false}
			panelName={ 'bsb-mailchimp-settings' }
		>
			<p>
				<Fragment>
					<ExternalLink href={HELP_URL}>{__( 'Get help', 'gutenam-blocks-pro' )}</ExternalLink>
				</Fragment>
			</p>
			<TextControl
				label={__( 'API Key', 'gutenam-blocks' )}
				value={api}
				onChange={value => setApi( value )}
			/>
			<div className="components-base-control">
				<Button
					isPrimary
					onClick={ () => saveAPI() }
					disabled={'' === api}
				>
					{isSaving ? __( 'Saving', 'gutenam-blocks-pro' ) : __( 'Save', 'gutenam-blocks-pro' )}
				</Button>
				{api !== '' && (
					<Fragment>
						&nbsp;
						<Button
							isSecondary
							onClick={ () => removeAPI() }
						>
							{__( 'Remove', 'gutenam-blocks-pro' )}
						</Button>
					</Fragment>
				)}
			</div>
			{isSavedApi && (
				<Fragment>
					{isFetching && (
						<Spinner/>
					)}
					{!isFetching && !hasList && (
						<Fragment>
							<h2 className="bst-heading-size-title">{__( 'Select Audience', 'gutenam-blocks-pro' )}</h2>
							{( !listsLoaded ? getMailChimpAudience() : '' )}
							{!Array.isArray( list ) ?
								<Spinner/> :
								__( 'No Audience found.', 'gutenam-blocks-pro' )}
						</Fragment>

					)}
					{!isFetching && hasList && (
						<Fragment>
							<h2 className="bst-heading-size-title">{__( 'Select Audience', 'gutenam-blocks-pro' )}</h2>
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
								placeholder={__( 'Select Audience' )}
							/>
							{( undefined === settings || undefined === settings || !settings.list || !settings.list.value ) && (
								<div style={{ height: '100px' }}></div>
							)}
							{undefined !== settings && undefined !== settings && settings.list && settings.list.value && (
								<Fragment>
									{isFetchingGroups && (
										<Spinner/>
									)}
									{!isFetchingGroups && !hasGroups && (
										<Fragment>
											<h2 className="bst-heading-size-title">{__( 'Select Groups', 'gutenam-blocks' )}</h2>
											{( !listGroupLoaded ? getMailChimpGroups() : '' )}
											{!Array.isArray( listGroups ) ?
												<Spinner/> :
												__( 'No Groups found.', 'gutenam-blocks-pro' )}
										</Fragment>

									)}
									{!isFetchingGroups && hasGroups && (
										<Fragment>
											<h2 className="bst-heading-size-title">{__( 'Select Groups', 'gutenam-blocks' )}</h2>
											<Select
												value={( undefined !== settings && undefined !== settings && undefined !== settings.groups ? settings.groups : '' )}
												onChange={( value ) => {
													save( { groups: ( value ? value : [] ) } );
												}}
												id={'mc-group-selection'}
												isClearable={true}
												options={listGroups}
												isMulti={true}
												maxMenuHeight={200}
												placeholder={__( 'Select Groups' )}
											/>
										</Fragment>
									)}
									{isFetchingTags && (
										<Spinner/>
									)}
									{!isFetchingTags && !hasTags && (
										<Fragment>
											<h2 className="bst-heading-size-title">{__( 'Select Tags', 'gutenam-blocks' )}</h2>
											{( !listTagsLoaded ? getMailChimpTags() : '' )}
											{!Array.isArray( listTags ) ?
												<Spinner/> :
												__( 'No Tags found.', 'gutenam-blocks-pro' )}
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
											{( !listAttrLoaded ? getMailChimpAttributes() : '' )}
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
										</Fragment>
									)}
									<ToggleControl
										label={__( 'Require Double Opt In?', 'gutenam-blocks-pro' )}
										checked={( undefined !== settings && undefined !== settings && undefined !== settings.doubleOptin ? settings.doubleOptin : false )}
										onChange={( value ) => save( { doubleOptin: value } )}
									/>
								</Fragment>
							)}
						</Fragment>
					)}
				</Fragment>
			)}
		</BasePanelBody>
	);
}

export default ( MailChimpControls );
