/**
 * BLOCK: Base Posts
 *
 * Registering a basic block with Gutenberg.
 */

/**
 * Import External
 */
import classnames from 'classnames';
import Select from 'react-select';
import getQuery from './get-query';

/**
 * Import Css
 */
import './editor.scss';
import metadata from './block.json';

/**
 * Import helpers
 */
import {
	getUniqueId,
	getFontSizeOptionOutput
} from '@base/helpers';

/**
 * Internal block libraries
 */
import { __ } from '@wordpress/i18n';
import { withSelect, useSelect, useDispatch } from '@wordpress/data';
import {
	getPreviewSize,
	setBlockDefaults
} from '@base/helpers';
import {
	BasePanelBody,
	RangeControl,
	BaseSelectTerms,
	TypographyControls,
	InspectorControlTabs,
	BaseInspectorControls,
	BaseBlockDefaults,
	CopyPasteAttributes
} from '@base/components';
import { dateI18n, format, __experimentalGetSettings } from '@wordpress/date';
import {
	Fragment,
	useEffect,
	useState,
} from '@wordpress/element';
import {
	useBlockProps,
	BlockControls,
} from '@wordpress/block-editor';
import {
	TextControl,
	Placeholder,
	ToggleControl,
	SelectControl,
	RadioControl,
	Spinner,
} from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';

const { postTypes, taxonomies, postQueryEndpoint } = base_blocks_params;
import { addQueryArgs } from '@wordpress/url';
import { decodeEntities } from '@wordpress/html-entities';

/**
 * Build Base Posts Block.
 */
function BasePosts( { attributes, className, setAttributes, taxList, taxOptions, taxFilterOptions, getPreviewDevice, clientId } ) {

	const {
		uniqueID,
		order,
		columns,
		tabletColumns,
		mobileColumns,
		orderBy,
		categories,
		tags,
		postsToShow,
		alignImage,
		postType,
		taxType,
		offsetQuery,
		postTax,
		excludeTax,
		showUnique,
		allowSticky,
		image,
		imageRatio,
		imageSize,
		author,
		authorLink,
		authorEnabledLabel,
		authorLabel,
		authorImage,
		authorImageSize,
		comments,
		metaCategories,
		metaCategoriesEnabledLabel,
		metaCategoriesLabel,
		date,
		dateUpdated,
		dateEnabledLabel,
		dateLabel,
		dateUpdatedEnabledLabel,
		dateUpdatedLabel,
		meta,
		metaDivider,
		categoriesDivider,
		aboveCategories,
		categoriesStyle,
		excerpt,
		readmore,
		readmoreLabel,
		loopStyle,
		titleFont,
		excerptCustomLength,
		excerptLength,
	} = attributes;

	const [ latestPosts, setLatestPosts ] = useState( {} );
	const [ loaded, setLoaded ] = useState( false );
	const [ activeTab, setActiveTab ] = useState( 'content' );

	const { addUniqueID } = useDispatch( 'baseblocks/data' );
	const { isUniqueID, isUniqueBlock, previewDevice } = useSelect(
		( select ) => {
			return {
				isUniqueID: ( value ) => select( 'baseblocks/data' ).isUniqueID( value ),
				isUniqueBlock: ( value, clientId ) => select( 'baseblocks/data' ).isUniqueBlock( value, clientId ),
				previewDevice: select( 'baseblocks/data' ).getPreviewDeviceType(),
			};
		},
		[ clientId ]
	);

	const getPosts = () => {
		setLoaded( false );
		apiFetch( {
			path: addQueryArgs(
				postQueryEndpoint,
				getQuery( attributes, 'query' ),
			),
		} )
			.then( ( posts ) => {
				setLatestPosts( posts );
				setLoaded( true );
			} )
			.catch( () => {
				setLatestPosts( [] );
				setLoaded( true );
			} );
	};

	useEffect( () => {
		let uniqueId = getUniqueId( uniqueID, clientId, isUniqueID, isUniqueBlock );
		if ( uniqueId !== uniqueID ) {
			attributes.uniqueID = uniqueId;
			setAttributes( { uniqueID: uniqueId } );
			addUniqueID( uniqueId, clientId );
		} else {
			addUniqueID( uniqueID, clientId );
		}

		getPosts();
	}, [] );

	useEffect( () => {
		setLoaded( false );
		getPosts();
	}, [ postType, taxType, offsetQuery, postTax, excludeTax, allowSticky, orderBy, order, categories, tags, postsToShow ] );

	const blockProps = useBlockProps();

	const taxonomyList = [];
	const taxonomyOptions = [];
	const taxonomyFilterOptions = [];
	if ( undefined !== taxList && 0 !== Object.keys( taxList ).length ) {
		Object.keys( taxList ).map( ( item, theindex ) => {
			return taxonomyList.push( { value: taxList[ item ].name, label: taxList[ item ].label } );
		} );
	}
	if ( undefined !== taxOptions && 0 !== Object.keys( taxOptions ).length ) {
		Object.keys( taxOptions ).map( ( item, theindex ) => {
			return taxonomyOptions.push( { value: taxOptions[ item ].value, label: taxOptions[ item ].label } );
		} );
	}
	if ( undefined !== taxFilterOptions && 0 !== Object.keys( taxFilterOptions ).length ) {
		Object.keys( taxFilterOptions ).map( ( item, theindex ) => {
			return taxonomyFilterOptions.push( { value: taxFilterOptions[ item ].value, label: taxFilterOptions[ item ].label } );
		} );
	}

	let aboveSymbol;
	if ( 'dash' === categoriesDivider ) {
		aboveSymbol = <>&#8208;</>;
	} else if ( 'slash' === categoriesDivider ) {
		aboveSymbol = <>&#47;</>;
	} else if ( 'dot' === categoriesDivider ) {
		aboveSymbol = <>&#183;</>;
	} else {
		aboveSymbol = <>&#124;</>;
	}

	let columnsClass;
	if ( 1 === columns ) {
		columnsClass = 'grid-xs-col-1 grid-sm-col-1 grid-lg-col-1';
	} else if ( 2 === columns ) {
		if ( undefined !== tabletColumns && 1 === tabletColumns ) {
			columnsClass = 'grid-xs-col-1 grid-sm-col-1 grid-lg-col-2';
		} else {
			columnsClass = 'grid-xs-col-1 grid-sm-col-2 grid-lg-col-2';
		}
	} else {
		if ( undefined !== tabletColumns && 1 === tabletColumns ) {
			columnsClass = 'grid-xs-col-1 grid-sm-col-1 grid-lg-col-3';
		} else if ( undefined !== tabletColumns && 3 === tabletColumns ) {
			columnsClass = 'grid-xs-col-1 grid-sm-col-3 grid-lg-col-3';
		} else {
			columnsClass = 'grid-xs-col-1 grid-sm-col-2 grid-lg-col-3';
		}
	}

	const titleSize = getPreviewSize( getPreviewDevice, ( undefined !== titleFont && undefined !== titleFont[ 0 ] && undefined !== titleFont[ 0 ].size && undefined !== titleFont[ 0 ].size[ 0 ] ? titleFont[ 0 ].size[ 0 ] : '' ), ( undefined !== titleFont && undefined !== titleFont[ 0 ] && undefined !== titleFont[ 0 ].size && undefined !== titleFont[ 0 ].size[ 1 ] ? titleFont[ 0 ].size[ 1 ] : '' ), ( undefined !== titleFont && undefined !== titleFont[ 0 ] && undefined !== titleFont[ 0 ].size && undefined !== titleFont[ 0 ].size[ 2 ] ? titleFont[ 0 ].size[ 2 ] : '' ) );
	const titleLineHeight = getPreviewSize( getPreviewDevice, ( undefined !== titleFont && undefined !== titleFont[ 0 ] && undefined !== titleFont[ 0 ].lineHeight && undefined !== titleFont[ 0 ].lineHeight[ 0 ] ? titleFont[ 0 ].lineHeight[ 0 ] : '' ), ( undefined !== titleFont && undefined !== titleFont[ 0 ] && undefined !== titleFont[ 0 ].lineHeight && undefined !== titleFont[ 0 ].lineHeight[ 1 ] ? titleFont[ 0 ].lineHeight[ 1 ] : '' ), ( undefined !== titleFont && undefined !== titleFont[ 0 ] && undefined !== titleFont[ 0 ].lineHeight && undefined !== titleFont[ 0 ].lineHeight[ 2 ] ? titleFont[ 0 ].lineHeight[ 2 ] : '' ) );
	const titleLetterSpacing = getPreviewSize( getPreviewDevice, ( undefined !== titleFont && undefined !== titleFont[ 0 ] && undefined !== titleFont[ 0 ].letterSpacing && undefined !== titleFont[ 0 ].letterSpacing[ 0 ] ? titleFont[ 0 ].letterSpacing[ 0 ] : '' ), ( undefined !== titleFont && undefined !== titleFont[ 0 ] && undefined !== titleFont[ 0 ].letterSpacing && undefined !== titleFont[ 0 ].letterSpacing[ 1 ] ? titleFont[ 0 ].letterSpacing[ 1 ] : '' ), ( undefined !== titleFont && undefined !== titleFont[ 0 ] && undefined !== titleFont[ 0 ].letterSpacing && undefined !== titleFont[ 0 ].letterSpacing[ 2 ] ? titleFont[ 0 ].letterSpacing[ 2 ] : '' ) );
	const hasPosts = Array.isArray( latestPosts ) && latestPosts.length;
	const saveTitleFont = ( value ) => {
		const newUpdate = titleFont.map( ( item, index ) => {
			if ( 0 === index ) {
				item = { ...item, ...value };
			}
			return item;
		} );
		setAttributes( {
			titleFont: newUpdate,
		} );
	};
	const HtmlTagOut = 'h' + ( undefined !== titleFont && undefined !== titleFont[ 0 ] && undefined !== titleFont[ 0 ].level ? titleFont[ 0 ].level : '2' );
	const dateFormat = __experimentalGetSettings().formats.date;

	const settingspanel = (
		<>
			<BlockControls>
				<CopyPasteAttributes
					attributes={ attributes }
					defaultAttributes={ metadata['attributes'] }
					blockSlug={ metadata['name'] }
					onPaste={ attributesToPaste => setAttributes( attributesToPaste ) }
				/>
			</BlockControls>
			<BaseInspectorControls blockSlug={ 'base/posts' }>

				<InspectorControlTabs
					panelName={'posts'}
					setActiveTab={( value ) => setActiveTab( value )}
					activeTab={activeTab}
				/>

				{( activeTab === 'general' ) &&

					<>
						<BasePanelBody panelName={'bsb-posts-settings'}>
							<SelectControl
								label={__( 'Select Posts Type:', 'gutenam-blocks' )}
								options={postTypes}
								value={postType}
								onChange={( value ) => {
									setAttributes( { postType: value } );
									setAttributes( { taxType: '' } );
									setAttributes( { categories: [] } );
								}}
							/>
							<SelectControl
								label={__( 'Order by', 'gutenam-blocks' )}
								options={[
									{
										label: __( 'Newest to Oldest', 'gutenam-blocks' ),
										value: 'date/desc',
									},
									{
										label: __( 'Oldest to Newest', 'gutenam-blocks' ),
										value: 'date/asc',
									},
									{
										label: __( 'Modified Ascending', 'gutenam-blocks' ),
										value: 'modified/asc',
									},
									{
										label: __( 'Modified Decending', 'gutenam-blocks' ),
										value: 'modified/desc',
									},
									{
										/* translators: label for ordering posts by title in ascending order */
										label: __( 'A → Z', 'gutenam-blocks' ),
										value: 'title/asc',
									},
									{
										/* translators: label for ordering posts by title in descending order */
										label: __( 'Z → A', 'gutenam-blocks' ),
										value: 'title/desc',
									},
									{
										/* translators: label for ordering posts by title in descending order */
										label: __( 'Menu Order', 'gutenam-blocks' ),
										value: 'menu_order/asc',
									},
									{
										/* translators: label for ordering posts by title in descending order */
										label: __( 'Random', 'gutenam-blocks' ),
										value: 'rand/desc',
									},
								]}
								value={`${orderBy}/${order}`}
								onChange={( value ) => {
									const [ newOrderBy, newOrder ] = value.split( '/' );
									if ( newOrder !== order ) {
										setAttributes( { order: newOrder } );
									}
									if ( newOrderBy !== orderBy ) {
										setAttributes( { orderBy: newOrderBy } );
									}
								}}
							/>
							<RangeControl
								key="query-controls-range-control"
								label={__( 'Number of items', 'gutenam-blocks' )}
								value={postsToShow}
								onChange={( value ) => setAttributes( { postsToShow: value } )}
								min={1}
								max={300}
							/>
							<RangeControl
								key="query-controls-range-control"
								label={__( 'Offset Starting Post', 'gutenam-blocks' )}
								value={offsetQuery}
								onChange={( value ) => setAttributes( { offsetQuery: value } )}
								min={0}
								max={100}
							/>
							{( ( postType && postType !== 'post' ) || postTax ) && (
								<>
									{( undefined !== taxonomyList && 0 !== taxonomyList.length ) && (
										<div className="term-select-form-row">
											<label htmlFor={'tax-selection'} className="screen-reader-text">
												{__( 'Select Taxonomy', 'gutenam-blocks' )}
											</label>
											<Select
												value={taxonomyList.filter( ( { value } ) => value === taxType )}
												onChange={( select ) => {
													setAttributes( { taxType: ( select && select.value ? select.value : '' ), categories: [] } );
												}}
												id={'tax-selection'}
												options={taxonomyList}
												isMulti={false}
												isClearable={true}
												maxMenuHeight={300}
												placeholder={__( 'Select Taxonomy', 'gutenam-blocks' )}
											/>
										</div>
									)}
									{( undefined !== taxonomyOptions && 0 !== taxonomyOptions.length ) && (
										<>
											<div className="term-select-form-row">
												<label htmlFor={'terms-selection'} className="screen-reader-text">
													{__( 'Select Terms', 'gutenam-blocks' )}
												</label>
												<Select
													value={categories}
													onChange={( value ) => {
														setAttributes( { categories: ( value ? value : [] ) } );
													}}
													id={'terms-selection'}
													options={taxonomyOptions}
													isMulti={true}
													isClearable={true}
													maxMenuHeight={300}
													placeholder={__( 'Select', 'gutenam-blocks' )}
												/>
											</div>
											<RadioControl
												help={__( 'Whether to include or exclude items from selected terms.', 'gutenam-blocks' )}
												selected={( undefined !== excludeTax ? excludeTax : 'include' )}
												options={[
													{ label: __( 'Include', 'gutenam-blocks' ), value: 'include' },
													{ label: __( 'Exclude', 'gutenam-blocks' ), value: 'exclude' },
												]}
												onChange={( value ) => setAttributes( { excludeTax: value } )}
											/>
										</>
									)}
									{( !postType || postType === 'post' ) && (
										<ToggleControl
											label={__( 'Select the post Taxonomy', 'gutenam-blocks' )}
											checked={postTax}
											onChange={( value ) => setAttributes( { postTax: value } )}
										/>
									)}
								</>
							)}
							{( !postType || ( postType === 'post' && !postTax ) ) && (
								<>
									<BaseSelectTerms
										placeholder={__( 'Filter by Category', 'gutenam-blocks' )}
										restBase={'wp/v2/categories'}
										fieldId={'tax-select-category'}
										value={categories}
										onChange={( value ) => {
											setAttributes( { categories: ( value ? value : [] ) } );
										}}
									/>
									<BaseSelectTerms
										placeholder={__( 'Filter by Tag', 'gutenam-blocks' )}
										restBase={'wp/v2/tags'}
										fieldId={'tax-select-tags'}
										value={tags}
										onChange={( value ) => {
											setAttributes( { tags: ( value ? value : [] ) } );
										}}
									/>
									<RadioControl
										help={__( 'Whether to include or exclude items from selected terms.', 'gutenam-blocks' )}
										selected={( undefined !== excludeTax ? excludeTax : 'include' )}
										options={[
											{ label: __( 'Include', 'gutenam-blocks' ), value: 'include' },
											{ label: __( 'Exclude', 'gutenam-blocks' ), value: 'exclude' },
										]}
										onChange={( value ) => setAttributes( { excludeTax: value } )}
									/>
									<ToggleControl
										label={__( 'Select the post Taxonomy', 'gutenam-blocks' )}
										checked={postTax}
										onChange={( value ) => setAttributes( { postTax: value } )}
									/>
								</>
							)}
							<ToggleControl
								label={__( 'Show Unique', 'gutenam-blocks' )}
								help={__( 'Exclude posts in this block from showing in others on the same page.', 'gutenam-blocks' )}
								checked={showUnique}
								onChange={( value ) => setAttributes( { showUnique: value } )}
							/>
							<ToggleControl
								label={__( 'Allow Sticky Posts?', 'gutenam-blocks' )}
								checked={allowSticky}
								onChange={( value ) => setAttributes( { allowSticky: value } )}
							/>
						</BasePanelBody>
						<BasePanelBody
							title={__( 'Layout Settings', 'gutenam-blocks' )}
							initialOpen={false}
							panelName={'layoutSettings'}
							blockSlug={ 'base/posts' }
						>
							<RangeControl
								label={__( 'Columns', 'gutenam-blocks' )}
								value={columns}
								onChange={( value ) => setAttributes( { columns: value } )}
								min={1}
								max={3}
							/>
							{1 !== columns && (
								<RangeControl
									label={__( 'Tablet Columns', 'gutenam-blocks' )}
									value={tabletColumns}
									onChange={( value ) => setAttributes( { tabletColumns: value } )}
									min={1}
									max={columns}
								/>
							)}
							{1 === columns && image && (
								<SelectControl
									label={__( 'Align Image', 'gutenam-blocks' )}
									options={[
										{
											label: __( 'Top', 'gutenam-blocks' ),
											value: 'above',
										},
										{
											label: __( 'Left', 'gutenam-blocks' ),
											value: 'beside',
										},
									]}
									value={alignImage}
									onChange={( value ) => setAttributes( { alignImage: value } )}
								/>
							)}
							<SelectControl
								label={__( 'Style', 'gutenam-blocks' )}
								options={[
									{
										label: __( 'Boxed', 'gutenam-blocks' ),
										value: 'boxed',
									},
									{
										label: __( 'Unboxed', 'gutenam-blocks' ),
										value: 'unboxed',
									},
								]}
								value={loopStyle}
								onChange={( value ) => setAttributes( { loopStyle: value } )}
							/>
						</BasePanelBody>

					</>
				}

				{( activeTab === 'style' ) &&
					<>
						<BasePanelBody
							title={__( 'Title Size', 'gutenam-blocks' )}
							panelName={'titleSettings'}
							blockSlug={ 'base/posts' }
						>
							<TypographyControls
								fontGroup={'post-title'}
								tagLevel={titleFont[ 0 ].level}
								tagLowLevel={2}
								tagHighLevel={7}
								onTagLevel={( value ) => saveTitleFont( { level: value } )}
								fontSize={titleFont[ 0 ].size}
								onFontSize={( value ) => saveTitleFont( { size: value } )}
								fontSizeType={titleFont[ 0 ].sizeType}
								onFontSizeType={( value ) => saveTitleFont( { sizeType: value } )}
								lineHeight={titleFont[ 0 ].lineHeight}
								onLineHeight={( value ) => saveTitleFont( { lineHeight: value } )}
								lineHeightType={titleFont[ 0 ].lineType}
								onLineHeightType={( value ) => saveTitleFont( { lineType: value } )}
								reLetterSpacing={titleFont[ 0 ].letterSpacing}
								onLetterSpacing={( value ) => saveTitleFont( { letterSpacing: value } )}
								letterSpacingType={titleFont[ 0 ].letterType}
								onLetterSpacingType={( value ) => saveTitleFont( { letterType: value } )}
								textTransform={titleFont[ 0 ].textTransform}
								onTextTransform={( value ) => saveTitleFont( { textTransform: value } )}
							/>
						</BasePanelBody>

						<BasePanelBody
							title={__( 'Image Settings', 'gutenam-blocks' )}
							initialOpen={false}
							panelName={'imageSettings'}
							blockSlug={ 'base/posts' }
						>
							<ToggleControl
								label={__( 'Enable Image', 'gutenam-blocks' )}
								checked={image}
								onChange={( value ) => setAttributes( { image: value } )}
							/>
							{image && (
								<>
									<SelectControl
										label={__( 'Image Ratio', 'gutenam-blocks' )}
										options={[
											{
												label: __( 'Inherit', 'gutenam-blocks' ),
												value: 'inherit',
											},
											{
												label: __( '1:1', 'gutenam-blocks' ),
												value: '1-1',
											},
											{
												label: __( '4:3', 'gutenam-blocks' ),
												value: '3-4',
											},
											{
												label: __( '3:2', 'gutenam-blocks' ),
												value: '2-3',
											},
											{
												label: __( '16:9', 'gutenam-blocks' ),
												value: '9-16',
											},
											{
												label: __( '2:1', 'gutenam-blocks' ),
												value: '1-2',
											},
											{
												label: __( '4:5', 'gutenam-blocks' ),
												value: '5-4',
											},
											{
												label: __( '3:4', 'gutenam-blocks' ),
												value: '4-3',
											},
											{
												label: __( '2:3', 'gutenam-blocks' ),
												value: '3-2',
											},
										]}
										value={imageRatio}
										onChange={( value ) => setAttributes( { imageRatio: value } )}
									/>
									<SelectControl
										label={__( 'Image Size', 'gutenam-blocks' )}
										options={[
											{
												label: __( 'Thumbnail', 'gutenam-blocks' ),
												value: 'thumbnail',
											},
											{
												label: __( 'Medium', 'gutenam-blocks' ),
												value: 'medium',
											},
											{
												label: __( 'Medium Large', 'gutenam-blocks' ),
												value: 'medium_large',
											},
											{
												label: __( 'Large', 'gutenam-blocks' ),
												value: 'large',
											},
											{
												label: __( 'Full', 'gutenam-blocks' ),
												value: 'full',
											},
										]}
										value={imageSize}
										onChange={( value ) => setAttributes( { imageSize: value } )}
									/>
								</>
							)}
						</BasePanelBody>
						{( !postType || postType === 'post' ) && (
							<BasePanelBody
								title={__( 'Category Settings', 'gutenam-blocks' )}
								initialOpen={false}
								panelName={'categorySettings'}
								blockSlug={ 'base/posts' }
							>
								<ToggleControl
									label={__( 'Enable Above Title Category', 'gutenam-blocks' )}
									checked={aboveCategories}
									onChange={( value ) => setAttributes( { aboveCategories: value } )}
								/>
								{aboveCategories && (
									<>
										<SelectControl
											label={__( 'Category Style', 'gutenam-blocks' )}
											options={[
												{
													label: __( 'Normal', 'gutenam-blocks' ),
													value: 'normal',
												},
												{
													label: __( 'Pill', 'gutenam-blocks' ),
													value: 'pill',
												},
											]}
											value={categoriesStyle}
											onChange={( value ) => setAttributes( { categoriesStyle: value } )}
										/>
										{'normal' === categoriesStyle && (
											<SelectControl
												label={__( 'Category Divider', 'gutenam-blocks' )}
												options={[
													{
														label: '|',
														value: 'vline',
													},
													{
														label: '-',
														value: 'dash',
													},
													{
														label: '\\',
														value: 'slash',
													},
													{
														label: '·',
														value: 'dot',
													},
												]}
												value={categoriesDivider}
												onChange={( value ) => setAttributes( { categoriesDivider: value } )}
											/>
										)}
									</>
								)}
							</BasePanelBody>
						)}
					</>
				}

				{( activeTab === 'advanced' ) &&
					<>
						<BasePanelBody
							title={__( 'Meta Settings', 'gutenam-blocks' )}
							panelName={'metaSettings'}
							blockSlug={ 'base/posts' }
						>
							<ToggleControl
								label={__( 'Enable Meta Info', 'gutenam-blocks' )}
								checked={meta}
								onChange={( value ) => setAttributes( { meta: value } )}
							/>
							{meta && (
								<>
									<ToggleControl
										label={__( 'Enable Author', 'gutenam-blocks' )}
										checked={author}
										onChange={( value ) => setAttributes( { author: value } )}
									/>
									{author && (
										<>
											<ToggleControl
												label={__( 'Enable Author Image', 'gutenam-blocks' )}
												checked={authorImage}
												onChange={( value ) => setAttributes( { authorImage: value } )}
											/>
											{authorImage && (
												<RangeControl
													label={__( 'Author Image Size' )}
													value={authorImageSize}
													onChange={( value ) => setAttributes( { authorImageSize: value } )}
													min={5}
													max={100}
												/>
											)}
											<ToggleControl
												label={__( 'Enable Author Link', 'gutenam-blocks' )}
												checked={authorLink}
												onChange={( value ) => setAttributes( { authorLink: value } )}
											/>
											<ToggleControl
												label={__( 'Enable Author Label', 'gutenam-blocks' )}
												checked={authorEnabledLabel}
												onChange={( value ) => setAttributes( { authorEnabledLabel: value } )}
											/>
											{authorEnabledLabel && (
												<TextControl
													label={__( 'Author Label' )}
													value={( authorLabel ? authorLabel : __( 'By', 'gutenam-blocks' ) )}
													onChange={( value ) => setAttributes( { authorLabel: value } )}
												/>
											)}
										</>
									)}
									<ToggleControl
										label={__( 'Enable Date', 'gutenam-blocks' )}
										checked={date}
										onChange={( value ) => setAttributes( { date: value } )}
									/>
									{date && (
										<>
											<ToggleControl
												label={__( 'Enable Date Label', 'gutenam-blocks' )}
												checked={dateEnabledLabel}
												onChange={( value ) => setAttributes( { dateEnabledLabel: value } )}
											/>
											{dateEnabledLabel && (
												<TextControl
													label={__( 'Date Label' )}
													value={( dateLabel ? dateLabel : __( 'Posted On', 'gutenam-blocks' ) )}
													onChange={( value ) => setAttributes( { dateLabel: value } )}
												/>
											)}
										</>
									)}
									<ToggleControl
										label={__( 'Enable Modified Date', 'gutenam-blocks' )}
										checked={dateUpdated}
										onChange={( value ) => setAttributes( { dateUpdated: value } )}
									/>
									{dateUpdated && (
										<>
											<ToggleControl
												label={__( 'Enable Modified Date Label', 'gutenam-blocks' )}
												checked={dateUpdatedEnabledLabel}
												onChange={( value ) => setAttributes( { dateUpdatedEnabledLabel: value } )}
											/>
											{dateUpdatedEnabledLabel && (
												<TextControl
													label={__( 'Modified Date Label' )}
													value={( dateUpdatedLabel ? dateUpdatedLabel : __( 'Updated On', 'gutenam-blocks' ) )}
													onChange={( value ) => setAttributes( { dateUpdatedLabel: value } )}
												/>
											)}
										</>
									)}
									{( !postType || postType === 'post' ) && (
										<>
											<ToggleControl
												label={__( 'Enable Categories', 'gutenam-blocks' )}
												checked={metaCategories}
												onChange={( value ) => setAttributes( { metaCategories: value } )}
											/>
											{metaCategories && (
												<>
													<ToggleControl
														label={__( 'Enable Categories Label', 'gutenam-blocks' )}
														checked={metaCategoriesEnabledLabel}
														onChange={( value ) => setAttributes( { metaCategoriesEnabledLabel: value } )}
													/>
													{metaCategoriesEnabledLabel && (
														<TextControl
															label={__( 'Categories Label' )}
															value={( metaCategoriesLabel ? metaCategoriesLabel : __( 'Posted In', 'gutenam-blocks' ) )}
															onChange={( value ) => setAttributes( { metaCategoriesLabel: value } )}
														/>
													)}
												</>
											)}
											<ToggleControl
												label={__( 'Enable Comments', 'gutenam-blocks' )}
												checked={comments}
												onChange={( value ) => setAttributes( { comments: value } )}
											/>
										</>
									)}
								</>
							)}
						</BasePanelBody>
						<BasePanelBody
							title={__( 'Content Settings', 'gutenam-blocks' )}
							initialOpen={false}
							panelName={'contentSettings'}
							blockSlug={ 'base/posts' }
						>
							<ToggleControl
								label={__( 'Enable Excerpt', 'gutenam-blocks' )}
								checked={excerpt}
								onChange={( value ) => setAttributes( { excerpt: value } )}
							/>
							<ToggleControl
								label={__( 'Enable Custom Excerpt Length', 'gutenam-blocks' )}
								checked={excerptCustomLength}
								onChange={( value ) => setAttributes( { excerptCustomLength: value } )}
							/>
							{excerptCustomLength && (
								<RangeControl
									label={__( 'Max number of words in excerpt', 'gutenam-blocks' )}
									value={excerptLength}
									onChange={( value ) => setAttributes( { excerptLength: value } )}
									min={10}
									max={100}
								/>
							)}
							<ToggleControl
								label={__( 'Enable Read More', 'gutenam-blocks' )}
								checked={readmore}
								onChange={( value ) => setAttributes( { readmore: value } )}
							/>
							{readmore && (
								<TextControl
									label={__( 'Read More', 'gutenam-blocks' )}
									value={readmoreLabel}
									onChange={( value ) => setAttributes( { readmoreLabel: value } )}
								/>
							)}
						</BasePanelBody>

						<BaseBlockDefaults attributes={attributes} defaultAttributes={metadata['attributes']} blockSlug={ metadata['name'] } />
					</>
				}
			</BaseInspectorControls>
		</>
	);
	if ( !loaded ) {
		return (
			<div { ...blockProps }>
				{settingspanel}
				<Placeholder
					icon="admin-post"
					label={__( 'Posts', 'gutenam-blocks' )}
				>

					<Spinner/>
				</Placeholder>
			</div>
		);
	}
	if ( !hasPosts ) {
		return (
			<div { ...blockProps }>
				{settingspanel}
				<Placeholder
					icon="admin-post"
					label={__( 'Posts', 'gutenam-blocks' )}
				>

					{!Array.isArray( latestPosts ) ?
						<Spinner/> :
						__( 'No posts found.', 'gutenam-blocks' )}
				</Placeholder>
			</div>
		);
	}
	// Removing posts from display should be instant.
	const displayPosts = latestPosts.length > postsToShow ? latestPosts.slice( 0, postsToShow ) : latestPosts;
	const renderPosts = ( post, i ) => {
		let theExcerpt = ( undefined !== post.excerpt && post.excerpt && undefined !== post.excerpt.rendered ? post.excerpt.rendered : '' );
		const excerptElement = document.createElement( 'div' );
		excerptElement.innerHTML = theExcerpt;
		theExcerpt = excerptElement.textContent || excerptElement.innerText || '';
		let postExcerpt = '';
		if ( excerptCustomLength && theExcerpt ) {
			const needsTrim = excerptLength < theExcerpt.trim().split( ' ' ).length && post.excerpt.raw === '';
			postExcerpt = needsTrim ? (
				<>
					{theExcerpt
						.trim()
						.split( ' ', excerptLength )
						.join( ' ' )}
				</>
			) : (
				theExcerpt
			);
		} else {
			postExcerpt = theExcerpt;
		}

		return (
			<article
				key={i}
				className={classnames( post.featured_image_src_large && post.featured_image_src_large[ 0 ] && image ? 'has-post-thumbnail' : 'bsb-no-thumb' ) + ' entry content-bg entry content-bg loop-entry components-disabled'}
			>
				{image && post.featured_image_src_large && post.featured_image_src_large[ 0 ] !== undefined && (
					<a href={'#'} className={`post-thumbnail base-thumbnail-ratio-${imageRatio}`}>
						<div className="post-thumbnail-inner">
							<img
								src={post.featured_image_src_large[ 0 ]}
								alt={decodeEntities( post.title.rendered.trim() ) || __( '(Untitled)', 'gutenam-blocks' )}
							/>
						</div>
					</a>
				)}
				<div className="entry-content-wrap">
					<header className="entry-header">
						{( postType === 'post' && aboveCategories && post.category_info ) && (
							<div className="entry-taxonomies">
									<span className={`category-links term-links category-style-${categoriesStyle}`}>
										{post.category_info.map( ( category, index, arr ) => {
											if ( arr.length - 1 === index || categoriesStyle === 'pill' ) {
												return (
													<a key={category.id} className="bsb-posts-block-category-link" href={'#category'}>
														{category.name}
													</a>
												);
											}
											return (
												<Fragment key={category.id}>
													<a key={category.id} className="bsb-posts-block-category-link" href={'#category'}>
														{category.name}
													</a><span> {aboveSymbol} </span>
												</Fragment>
											);
										} )}
									</span>
							</div>
						)}
						<HtmlTagOut
							className="entry-title"
							style={{
								fontSize     : ( titleSize ? getFontSizeOptionOutput( titleSize, titleFont[ 0 ].sizeType ) : undefined ),
								lineHeight   : ( titleLineHeight ? titleLineHeight + titleFont[ 0 ].lineType : undefined ),
								letterSpacing: ( titleLetterSpacing ? titleLetterSpacing + titleFont[ 0 ].letterType : undefined ),
								textTransform: ( titleFont[ 0 ].textTransform ? titleFont[ 0 ].textTransform : undefined ),
							}}
						>
							<a
								href={'#'}
								dangerouslySetInnerHTML={{ __html: post.title.rendered.trim() || __( '(Untitled)' ) }}
							/>
						</HtmlTagOut>
						{meta && (
							<div className={`entry-meta entry-meta-divider-${metaDivider}`}>
								{author && post.author_info && post.author_info.display_name && (
									<span className="posted-by">
											{authorImage && post.author_info.author_image && (
												<span className="author-avatar" style={{
													width : authorImageSize ? authorImageSize + 'px' : undefined,
													height: authorImageSize ? authorImageSize + 'px' : undefined,
												}}>
													<span className="author-image">
														{<img src={post.author_info.author_image} style={{
															width : authorImageSize ? authorImageSize + 'px' : undefined,
															height: authorImageSize ? authorImageSize + 'px' : undefined,
														}}/>}
													</span>
												</span>
											)}
										{authorEnabledLabel && (
											<span className="meta-label">
													{( authorLabel ? authorLabel : __( 'By', 'gutenam-blocks' ) )}
												</span>
										)}
										<span className="author vcard">
												{authorLink ? (
													<a className="url fn n" href={'#'}>
														{post.author_info.display_name}
													</a>
												) : (
													<span className="fn n">
														{post.author_info.display_name}
													</span>
												)}
											</span>
										</span>
								)}
								{date && post.date_gmt && (
									<span className="posted-on">
											{dateEnabledLabel && (
												<span className="meta-label">
													{( dateLabel ? dateLabel : __( 'Posted On', 'gutenam-blocks' ) )}
												</span>
											)}
										<time dateTime={format( 'c', post.date_gmt )} className={'entry-date published'}>
												{dateI18n( dateFormat, post.date_gmt )}
											</time>
										</span>
								)}
								{dateUpdated && post.modified_gmt && (
									<span className="updated-on">
											{dateUpdatedEnabledLabel && (
												<span className="meta-label">
													{( dateUpdatedLabel ? dateUpdatedLabel : __( 'Updated On', 'gutenam-blocks' ) )}
												</span>
											)}
										<time dateTime={format( 'c', post.modified_gmt )} className={'updated entry-date published'}>
												{dateI18n( dateFormat, post.modified_gmt )}
											</time>
										</span>
								)}
								{metaCategories && post.category_info && (
									<span className="category-links">
											{metaCategoriesEnabledLabel && (
												<span className="meta-label">
													{( metaCategoriesLabel ? metaCategoriesLabel : __( 'Posted In', 'gutenam-blocks' ) )}
												</span>
											)}
										<span className="category-link-items">
												{post.category_info.map( ( category, index, arr ) => {
													if ( arr.length - 1 === index ) {
														return (
															<a key={category.id} className="bsb-posts-block-category-link" href={'#category'}>
																{category.name}
															</a>
														);
													}
													return (
														<Fragment key={category.id}>
															<a key={category.id} className="bsb-posts-block-category-link" href={'#category'}>
																{category.name}
															</a><span>&#44; </span>
														</Fragment>
													);
												} )}
											</span>
										</span>
								)}
								{comments && 0 !== post.comment_info && (
									<span className="meta-comments">
											<a className="meta-comments-link anchor-scroll" href={'#comments'}>
												{1 === post.comment_info && (
													post.comment_info + ' ' + __( 'Comment', 'gutenam-blocks' )
												)}
												{1 !== post.comment_info && (
													post.comment_info + ' ' + __( 'Comments', 'gutenam-blocks' )
												)}
											</a>
										</span>
								)}
							</div>
						)}
					</header>
					{excerpt && post.excerpt && post.excerpt.rendered && (
						<div className="entry-summary">
							{postExcerpt}
						</div>
					)}
					<footer className="entry-footer">
						{readmore && (
							<div className="entry-actions">
								<p className="more-link-wrap">
									<a href={'#'} className="post-more-link">{( readmoreLabel ? readmoreLabel : __( 'Read More', 'gutenam-blocks' ) )}</a>
								</p>
							</div>
						)}
					</footer>
				</div>
			</article>
		);
	};
	return (
		<div { ...blockProps }>
			{settingspanel}
			<div
				className={`${className} bsb-posts bsb-posts-id-${uniqueID} ${columnsClass} grid-cols content-wrap bsb-posts-style-${loopStyle ? loopStyle : 'boxed'} item-image-style-${columns === 1 ? alignImage : 'above'}`}>
				{displayPosts.map( ( post, i ) =>
					renderPosts( post, i ),
				)}
			</div>
		</div>
	);
}

export default withSelect( ( select, props ) => {
	const { postTax, postType, taxType } = props.attributes;
	const theType = ( postType ? postType : 'post' );
	const taxonomyList = ( taxonomies[ theType ] && taxonomies[ theType ].taxonomy ? taxonomies[ theType ].taxonomy : [] );
	let taxonomyOptions = [];
	if ( theType !== 'post' || postTax ) {
		if ( 'undefined' !== typeof taxonomies[ theType ] ) {
			if ( taxType ) {
				if ( taxonomies[ theType ].terms && taxonomies[ theType ].terms[ taxType ] ) {
					taxonomyOptions = taxonomies[ theType ].terms[ taxType ];
				}
			}
		}
	}

	return {
		taxList         : taxonomyList,
		taxOptions      : taxonomyOptions,
		getPreviewDevice: select( 'baseblocks/data' ).getPreviewDeviceType(),
	};
} )( BasePosts );
