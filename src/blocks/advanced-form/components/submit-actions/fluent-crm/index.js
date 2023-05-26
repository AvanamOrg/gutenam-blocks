/**
 * FluentCRM Controls
 *
 */

/* global base_blocks_params */

/**
 * Imports
 */
import Select from 'react-select';
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';
import { BasePanelBody } from '@base/components';
import { getFormFields } from '../../';

/**
 * Internal block libraries
 */
import { __ } from '@wordpress/i18n';

import {
	ToggleControl,
	Spinner,
	SelectControl,
} from '@wordpress/components';
import {
	useEffect, useMemo,
	useState,
} from '@wordpress/element';

/**
 * Build the Measure controls
 * @returns {object} Measure settings.
 */
export default function FluentCrmOptions( { settings, save, parentClientId } ) {

	const [ isActive, setIsActive ] = useState( false );
	const [ isSaving, setIsSaving ] = useState( false );
	const [ list, setList ] = useState( false );
	const [ listTags, setListTags ] = useState( false );
	const [ tagsLoaded, setTagsLoaded ] = useState( false );
	const [ isFetching, setIsFetching ] = useState( false );
	const [ isFetchingTags, setIsFetchingTags ] = useState( false );
	const [ listsLoaded, setListsLoaded ] = useState( false );
	const [ isFetchingFields, setIsFetchingFields ] = useState( false );
	const [ listFields, setListFields ] = useState( false );
	const [ listFieldsLoaded, setListFieldsLoaded ] = useState( false );

	useEffect( () => {
		/**
		 * Confirm active.
		 */
		if ( undefined !== base_blocks_params.fluentCRM && base_blocks_params.fluentCRM ) {
			setIsActive( true );
		}
	}, [] );

	const fields = useMemo(() => getFormFields( parentClientId ), [ parentClientId ]);

	const saveFluentCRMMap = ( value, index ) => {
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
		setIsFetching( true );

		apiFetch( {
			path: addQueryArgs(
				'/bsb-fluentcrm/v1/get',
				{ endpoint: 'lists' },
			),
		} )
			.then( ( lists ) => {
				const theLists = [];
				lists.map( ( item ) => {
					theLists.push( { value: item.id, label: item.title } );
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

	const getTags = () => {
		setIsFetchingTags( true );

		apiFetch( {
			path: addQueryArgs(
				'/bsb-fluentcrm/v1/get',
				{ endpoint: 'tags' },
			),
		} )
			.then( ( tags ) => {
				const theLists = [];
				tags.map( ( item ) => {
					theLists.push( { value: item.id, label: item.title } );
				} );
				setListTags( theLists );
				setTagsLoaded( true );
				setIsFetchingTags( false );
			} )
			.catch( () => {
				setListTags( [] );
				setTagsLoaded( true );
				setIsFetchingTags( false );
			} );
	};

	const getFields = () => {
		setIsFetchingFields( true );

		apiFetch( {
			path: addQueryArgs(
				'/bsb-fluentcrm/v1/get',
				{ endpoint: 'fields' },
			),
		} )
			.then( ( fields ) => {
				const theFields = [];
				theFields.push( { value: null, label: 'None' } );
				theFields.push( { value: 'email', label: 'Email *' } );
				fields.map( ( item, index ) => {
					if ( item.key !== 'email' ) {
						theFields.push( { value: item.key, label: item.title } );
					}
				} );

				setListFields( theFields );
				setListFieldsLoaded( true );
				setIsFetchingFields( false );
			} )
			.catch( () => {
				const theFields = [];
				theFields.push( { value: null, label: 'None' } );
				theFields.push( { value: 'email', label: 'Email *' } );

				setListFields( theFields );
				setListFieldsLoaded( true );
				setIsFetchingFields( false );
			} );
	};

	const hasList = Array.isArray( list ) && list.length;
	const hasFields = Array.isArray( listFields ) && listFields.length;
	const hasTags = Array.isArray( listTags ) && listTags.length;

	return (
		<BasePanelBody
			title={__( 'FluentCRM Settings', 'gutenam-blocks-pro' )}
			initialOpen={false}
			panelName={'bsb-fluent-crm-settings'}
		>
			{ !isActive ?
				<>{__( 'FluentCRM is not setup/active.', 'gutenam-blocks-pro' )}</>
			:
				<>
					{isFetching && (
						<Spinner/>
					)}
					{!isFetching && !hasList && (
						<>
							<h2 className="bst-heading-size-title">{__( 'Select List', 'gutenam-blocks' )}</h2>
							{( !listsLoaded ? getLists() : '' )}
							{!Array.isArray( list ) ?
								<Spinner/> :
								__( 'No lists found.', 'gutenam-blocks-pro' )}
						</>

					)}
					{!isFetching && hasList && (
						<>
							<h2 className="bsb-heading-fln-list-title">{__( 'Select List', 'gutenam-blocks' )}</h2>
							<Select
								value={( undefined !== settings.lists ? settings.lists : '' )}
								onChange={( value ) => {
									save( { lists: ( value ? value : [] ) } );
								}}
								id={'fln-list-selection'}
								options={list}
								isMulti={true}
								maxMenuHeight={200}
								placeholder={__( 'Select List' )}
							/>
							{!settings.lists && (
								<div style={{ height: '100px' }}></div>
							)}
							{undefined !== settings && undefined !== settings && settings.lists && settings.lists[ 0 ] && (
								<>
									{isFetchingTags && (
										<Spinner/>
									)}
									{!isFetchingTags && !hasTags && (
										<>
											<h2 className="bst-heading-size-title">{__( 'Select Tags', 'gutenam-blocks' )}</h2>
											{( !tagsLoaded ? getTags() : '' )}
											{!Array.isArray( listTags ) ?
												<Spinner/> :
												__( 'No Tags found.', 'gutenam-blocks-pro' )}
										</>

									)}
									{!isFetchingTags && hasTags && (
										<>
											<h2 className="bst-heading-size-title">{__( 'Select Tags', 'gutenam-blocks' )}</h2>
											<Select
												value={( undefined !== settings && undefined !== settings && undefined !== settings.tags ? settings.tags : '' )}
												onChange={( value ) => {
													save( { tags: ( value ? value : [] ) } );
												}}
												id={'fln-tag-selection'}
												isClearable={true}
												options={listTags}
												isMulti={true}
												maxMenuHeight={200}
												placeholder={__( 'Select Tags' )}
											/>
										</>
									)}
									{isFetchingFields && (
										<Spinner/>
									)}
									{!isFetchingFields && !hasFields && (
										<>
											<h2 className="bst-heading-size-title">{__( 'Map Fields', 'gutenam-blocks' )}</h2>
											{( !listFieldsLoaded ? getFields() : '' )}
											{!Array.isArray( listFields ) ?
												<Spinner/> :
												__( 'No Fields found.', 'gutenam-blocks-pro' )}
										</>

									)}
									{!isFetchingFields && hasFields && (
										<>
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
																options={listFields}
																value={( undefined !== settings.map && undefined !== settings.map[ index ] && settings.map[ index ] ? settings.map[ index ] : '' )}
																onChange={( value ) => {
																	saveFluentCRMMap( value, index );
																}}
															/>
														</div>
													);
												} )
											)}
										</>
									)}
									<div style={{ height: '10px' }}></div>
									<ToggleControl
										label={__( 'Require Double Opt In?', 'gutenam-blocks' )}
										checked={( undefined !== settings && undefined !== settings && undefined !== settings.doubleOptin ? settings.doubleOptin : false )}
										onChange={( value ) => save( { doubleOptin: value } )}
									/>
								</>
							)}
						</>
					)}
				</>
			}
		</BasePanelBody>
	);

}
