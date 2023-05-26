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

const HELP_URL = 'https://app.convertkit.com/account_settings/advanced_settings';

/**
 * Build the Measure controls
 * @returns {object} Measure settings.
 */
function ConvertKitControls( { settings, save, parentClientId } ) {

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
			setApi( response.base_blocks_convertkit_api );

			if ( '' !== response.base_blocks_convertkit_api ) {
				setIsSavedApi( true );
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

	const getConvertKitForms = () => {
		if ( !api ) {
			setList( [] );
			setListsLoaded( true );
			return;
		}

		setIsFetching( true );

		apiFetch( {
			path: addQueryArgs(
				'/bsb-convertkit/v1/get',
				{ endpoint: 'forms' },
			),
		} )
			.then( ( list ) => {

				const theForms = [];
				list.forms.map( ( item ) => {
					theForms.push( { value: item.id, label: item.name } );
				} );

				setList( theForms );
				setListsLoaded( true );
				setIsFetching( false );
			} )
			.catch( ( err ) => {
				setList( [] );
				setListsLoaded( true );
				setIsFetching( false );
			} );
	};

	const getConvertKitSequences = () => {
		setIsFetchingGroups( true );

		apiFetch( {
			path: addQueryArgs(
				'/bsb-convertkit/v1/get',
				{ endpoint: 'sequences' },
			),
		} )
			.then( ( list ) => {
				const theSequences = [];
				list.courses.map( ( item ) => {
					theSequences.push( { value: item.id, label: item.name } );
				} );

				setListGroups( theSequences );
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
				'/bsb-convertkit/v1/get',
				{ endpoint: 'tags' },
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

	const getConvertKitAttributes = () => {

		setListAttr( [
			{ value: null, label: 'None' },
			{ value: 'email', label: 'Email *' }
		] );
		setListAttrLoaded( true );
		setIsFetchingAttributes( false );

	};

	const removeAPI = () => {
		setApi( '' );

		if ( isSavedApi ) {
			setIsSaving( true );

			const settingModel = new wp.api.models.Settings( {
				base_blocks_convertkit_api: '',
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
			base_blocks_convertkit_api: api,
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
			title={__( 'ConvertKit Settings', 'gutenam-blocks-pro' )}
			initialOpen={false}
			panelName={ 'bsb-convertkit' }
		>
			<p>
				<ExternalLink href={HELP_URL}>{__( 'Get help', 'gutenam-blocks-pro' )}</ExternalLink>
			</p>
			<TextControl
				label={__( 'API Key', 'gutenam-blocks' )}
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
			{isSavedApi && (
				<Fragment>
					{isFetching && (
						<Spinner/>
					)}
					{!isFetching && !hasList && (
						<Fragment>
							<h2 className="bst-heading-size-title">{__( 'Select Form', 'gutenam-blocks-pro' )}</h2>
							{( !listsLoaded ? getConvertKitForms() : '' )}
							{!Array.isArray( list ) ?
								<Spinner/> :
								__( 'No forms found.', 'gutenam-blocks-pro' )}
						</Fragment>

					)}
					{!isFetching && hasList && (
						<Fragment>
							<h2 className="bst-heading-size-title">{__( 'Select Form', 'gutenam-blocks-pro' )}</h2>
							<Select
								value={( undefined !== settings && undefined !== settings && undefined !== settings.form ? settings.form : '' )}
								onChange={( value ) => {
									save( { form: ( value ? value : [] ) } );
								}}
								id={'mc-list-selection'}
								isClearable={true}
								options={list}
								isMulti={false}
								maxMenuHeight={200}
								placeholder={__( 'Select Form' )}
							/>

							<Fragment>
								{isFetchingGroups && (
									<Spinner/>
								)}
								{!isFetchingGroups && !hasGroups && (
									<Fragment>
										<h2 className="bst-heading-size-title">{__( 'Select Sequence', 'gutenam-blocks' )}</h2>
										{( !listGroupLoaded ? getConvertKitSequences() : '' )}
										{!Array.isArray( listGroups ) ?
											<Spinner/> :
											__( 'No Sequences found.', 'gutenam-blocks-pro' )}
									</Fragment>

								)}
								{!isFetchingGroups && hasGroups && (
									<Fragment>
										<h2 className="bst-heading-size-title">{__( 'Select Sequence', 'gutenam-blocks' )}</h2>
										<Select
											value={( undefined !== settings && undefined !== settings && undefined !== settings.sequence ? settings.sequence : '' )}
											onChange={( value ) => {
												save( { sequence: ( value ? value : [] ) } );
											}}
											id={'mc-sequence-selection'}
											isClearable={true}
											options={listGroups}
											maxMenuHeight={200}
											placeholder={__( 'Select Sequence' )}
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
										{( !listAttrLoaded ? getConvertKitAttributes() : '' )}
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
							</Fragment>
						</Fragment>
					)}
				</Fragment>
			)}
		</BasePanelBody>
	);
}

export default ( ConvertKitControls );
