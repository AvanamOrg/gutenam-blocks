import { map } from 'lodash';

import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/edit-post';
import { __ } from '@wordpress/i18n';
import {
	Fragment,
	useState,
} from '@wordpress/element';
import {
	PanelBody,
	Button
} from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';
/**
 * Import Icons
 */
import * as BlockIcons from '@base/icons';

/**
 * Import Settings
 */
import BaseEditorWidth from './editor-width';
import BaseColors from './block-defaults/color-palette-defaults';

/*
 * Components
 */
import BaseFontFamily from './block-defaults/typography-defaults';
import BaseVisibilitySettings from './block-visibility-settings';
import ExportDefaults from './block-defaults/export-defaults';
import ImportDefaults from './block-defaults/import-defaults';
import ResetDefaults from './block-defaults/reset-defaults';

/**
 * Build the row edit
 */
function BaseConfig() {
	const [ user, setUser ] = useState( ( base_blocks_params.userrole ? base_blocks_params.userrole : 'admin' ) );
	const [ controls, setControls ] = useState( applyFilters( 'base.block_controls_sidebar', [] ) );
	const [ blocks, setBlocks ] = useState( applyFilters( 'base.block_blocks_sidebar', [] ) );
	const [ extraPanels, setExtraPanels ] = useState( applyFilters( 'base.block_panels_sidebar', [] ) );

	return (
		<Fragment>
			<PluginSidebarMoreMenuItem
				target="base-controls"
				icon={ BlockIcons.baseNewIcon }
			>
				{__( 'Base Blocks Controls', 'gutenam-blocks' )}
			</PluginSidebarMoreMenuItem>
			<PluginSidebar
				isPinnable={true}
				name="base-controls"
				title={__( 'Base Blocks Controls', 'gutenam-blocks' )}
			>
				<PanelBody
					title={__( 'Color Palette', 'gutenam-blocks' )}
					initialOpen={true}
				>
					<BaseColors/>
				</PanelBody>

				{'admin' === user && (
					<>
					<PanelBody
						title={__('Block Visibility', 'gutenam-blocks')}
						initialOpen={false}
					>
						<div className="bst-blocks-control-wrap">

							{/*Accordion*/}
							<div className="bst-blocks-control-row">
								<BaseVisibilitySettings blockName={__('Accordion', 'gutenam-blocks')}
														   icon={ BlockIcons.accordionBlockIcon }
														   blockSlug={'accordion'}
														   options={[
									{
										key: 'paneControl',
										label: __('Enable Pane Close/Open Settings', 'gutenam-blocks')
									},
									{
										key: 'titleColors',
										label: __('Enable Title Color Settings', 'gutenam-blocks')
									},
									{
										key: 'titleIcon',
										label: __('Enable Title Trigger Icon Settings', 'gutenam-blocks')
									},
									{
										key: 'titleSpacing',
										label: __('Enable Title Spacing Settings', 'gutenam-blocks')
									},
									{
										key: 'titleBorder',
										label: __('Enable Title Border Settings', 'gutenam-blocks')
									},
									{key: 'titleFont', label: __('Enable Title Font Settings', 'gutenam-blocks')},
									{
										key: 'paneContent',
										label: __('Enable Inner Content Settings', 'gutenam-blocks')
									},
									{key: 'titleTag', label: __('Enable Title Tag Settings', 'gutenam-blocks')},
									{key: 'structure', label: __('Enable Structure Settings', 'gutenam-blocks')},
								]}/>
							</div>

							{/*Advanced Button*/}
							<div className="bst-blocks-control-row">
								<BaseVisibilitySettings blockName={__('Advanced Button', 'gutenam-blocks')}
														   icon={ BlockIcons.advancedBtnIcon }
														   blockSlug={'advancedbtn'} options={[
									{key: 'countSettings', label: __('Enable Count Settings', 'gutenam-blocks')},
									{key: 'sizeSettings', label: __('Enable Size Settings', 'gutenam-blocks')},
									{key: 'colorSettings', label: __('Enable Color Settings', 'gutenam-blocks')},
									{key: 'iconSettings', label: __('Enable Icon Settings', 'gutenam-blocks')},
									{
										key: 'fontSettings',
										label: __('Enable Font Family Settings', 'gutenam-blocks')
									},
								]}/>
							</div>

							{/* Advanced Form */}
							{/*<div className="bst-blocks-control-row">*/}
							{/*		<BaseVisibilitySettings blockName={ __('Advanced Form', 'gutenam-blocks' )}*/}
							{/*								   blockSlug={'advanced-form'}*/}
							{/*								   icon={ BlockIcons.advancedFormIcon }*/}
							{/*								   options={[*/}
							{/*			{ key: 'containerSettings', label: __( 'Enable Container Style Settings', 'gutenam-blocks' ) },*/}
							{/*			// { key: 'itemStyle', label: __( 'Enable Item Style Settings', 'gutenam-blocks' ) },*/}
							{/*			// { key: 'numberStyle', label: __( 'Enable Number Style Settings', 'gutenam-blocks' ) },*/}
							{/*			// { key: 'labelStyle', label: __( 'Enable Label Style Settings', 'gutenam-blocks' ) },*/}
							{/*			// { key: 'visibilitySettings', label: __( 'Enable Visibility Settings', 'gutenam-blocks' ) },*/}
							{/*		]}/>*/}
							{/*</div>*/}

							{/*Advanced Gallery*/}
							<div className="bst-blocks-control-row">
								<BaseVisibilitySettings blockName={__('Advanced Gallery', 'gutenam-blocks')}
														   blockSlug={'advancedgallery'}
														   icon={ BlockIcons.galleryIcon }
														   options={[
									{key: 'gutterSettings', label: __('Enable Gutter Settings', 'gutenam-blocks')},
									{
										key: 'lightboxSettings',
										label: __('Enable Lightbox Settings', 'gutenam-blocks')
									},
									{
										key: 'styleSettings',
										label: __('Enable Image Style Settings', 'gutenam-blocks')
									},
									{
										key: 'captionSettings',
										label: __('Enable Caption Settings', 'gutenam-blocks')
									},
									{
										key: 'shadowSettings',
										label: __('Enable Image Shadow Settings', 'gutenam-blocks')
									},
									{
										key: 'spacingSettings',
										label: __('Enable Gallery Spacing Settings', 'gutenam-blocks')
									},
								]}/>
							</div>

							{/*Advanced Heading*/}
							<div className="bst-blocks-control-row">
									<BaseVisibilitySettings blockName={__('Advanced Text', 'gutenam-blocks')}
															   blockSlug={'advancedheading'}
															   icon={ BlockIcons.advancedHeadingIcon}
															   options={[
																   {
																	   key: 'toolbarTypography',
																	   label: __('Enable Typography Settings in Toolbar', 'gutenam-blocks'),
																	   initial:'none',
																   },
																   {
																	   key: 'toolbarColor',
																	   label: __('Enable Color Settings in Toolbar', 'gutenam-blocks'),
																	   initial:'none',
																   },
																   {
																	   key: 'colorSettings',
																	   label: __('Enable Color Settings', 'gutenam-blocks')
																   },
																   {
																	   key: 'sizeSettings',
																	   label: __('Enable Size Settings', 'gutenam-blocks')
																   },
																   {
																	   key: 'advancedSettings',
																	   label: __('Enable Advanced Typography Settings', 'gutenam-blocks')
																   },
																   {
																	   key: 'iconSettings',
																	   label: __('Enable Icon Settings', 'gutenam-blocks')
																   },
																   {
																	   key: 'highlightSettings',
																	   label: __('Enable Highlight Settings', 'gutenam-blocks')
																   },
																   {
																	   key: 'marginSettings',
																	   label: __('Enable Margin Settings', 'gutenam-blocks')
																   },
															   ]}/>
							</div>

							{/*Countdown*/}
							<div className="bst-blocks-control-row">
									<BaseVisibilitySettings blockName={__('Countdown', 'gutenam-blocks')}
															   blockSlug={'countdown'}
															   icon={ BlockIcons.countdownIcon }
															   options={[
										{
											key: 'containerSettings',
											label: __('Enable Container Style Settings', 'gutenam-blocks')
										},
										{key: 'itemStyle', label: __('Enable Item Style Settings', 'gutenam-blocks')},
										{
											key: 'numberStyle',
											label: __('Enable Number Style Settings', 'gutenam-blocks')
										},
										{key: 'labelStyle', label: __('Enable Label Style Settings', 'gutenam-blocks')},
										{
											key: 'visibilitySettings',
											label: __('Enable Visibility Settings', 'gutenam-blocks')
										},
									]}/>
							</div>

							{/* Count Up */}
							<div className="bst-blocks-control-row">
									<BaseVisibilitySettings blockName={__('Count Up', 'gutenam-blocks')}
															   blockSlug={'countup'}
															   icon={ BlockIcons.countUpIcon }
															   options={[
										{key: 'titleStyle', label: __('Enable Title Style Settings', 'gutenam-blocks')},
										{
											key: 'numberStyle',
											label: __('Enable Number Style Settings', 'gutenam-blocks')
										},
									]}/>
							</div>

							{/* Google Maps */}
							<div className="bst-blocks-control-row">
								<BaseVisibilitySettings blockName={__('Google Maps', 'gutenam-blocks')}
														   blockSlug={'googlemaps'}
														   icon={ BlockIcons.googleMapsIcon }
														   options={[
									{key: 'apiSettings', label: __('Enable API Settings', 'gutenam-blocks')},
									{
										key: 'containerStyle',
										label: __('Enable Container Style Settings', 'gutenam-blocks')
									},
									{
										key: 'mapLocation',
										label: __('Enable Map Location Settings', 'gutenam-blocks')
									},
								]}/>
							</div>

							{/* Icon */}
							<div className="bst-blocks-control-row">
								<BaseVisibilitySettings blockName={__('Icon', 'gutenam-blocks')}
														   blockSlug={'icon'}
														   icon={ BlockIcons.iconIcon }
														   options={[
									{
										key: 'iconSpacing',
										label: __('Enable Icon Spacing Settings', 'gutenam-blocks')
									},
								]}/>
							</div>

							{/*Icon List*/}
							<div className="bst-blocks-control-row">
								<BaseVisibilitySettings blockName={__('Icon List', 'gutenam-blocks')}
														   blockSlug={'iconlist'}
														   icon={ BlockIcons.iconListBlockIcon }
														   options={[
									{key: 'column', label: __('Enable List Column Settings', 'gutenam-blocks')},
									{key: 'spacing', label: __('Enable List Spacing Settings', 'gutenam-blocks')},
									{key: 'textStyle', label: __('Enable Text Style Settings', 'gutenam-blocks')},
									{
										key: 'joinedIcons',
										label: __('Enable All List Icon Control', 'gutenam-blocks')
									},
									{
										key: 'individualIcons',
										label: __('Enable individual List Item Control', 'gutenam-blocks')
									},
								]}/>
							</div>

							{/*Info Box*/}
							<div className="bst-blocks-control-row">
								<BaseVisibilitySettings blockName={__('Info Box', 'gutenam-blocks')}
														   blockSlug={'infobox'}
														   icon={ BlockIcons.infoboxIcon }
														   options={[
									{
										key: 'containerSettings',
										label: __('Enable Container Settings', 'gutenam-blocks')
									},
									{key: 'mediaSettings', label: __('Enable Media Settings', 'gutenam-blocks')},
									{key: 'titleSettings', label: __('Enable Title Settings', 'gutenam-blocks')},
									{key: 'textSettings', label: __('Enable Text Settings', 'gutenam-blocks')},
									{
										key: 'learnMoreSettings',
										label: __('Enable Learn More Settings', 'gutenam-blocks')
									},
									{key: 'shadowSettings', label: __('Enable Shadow Settings', 'gutenam-blocks')},
								]}/>
							</div>

							{/* Lottie */}
							<div className="bst-blocks-control-row">
								<BaseVisibilitySettings blockName={__('Lottie', 'gutenam-blocks')}
														   blockSlug={'lottie'}
														   icon={ BlockIcons.lottieIcon }
														   options={[
									{key: 'sourceFile', label: __('Enable Source File Settings', 'gutenam-blocks')},
									{
										key: 'playbackSettings',
										label: __('Enable Playback Settings', 'gutenam-blocks')
									},
									{
										key: 'sizeControl',
										label: __('Enable Size Control Settings', 'gutenam-blocks')
									},
								]} />
							</div>

							{/* Posts */}
							<div className="bst-blocks-control-row">
									<BaseVisibilitySettings blockName={__('Posts', 'gutenam-blocks')}
															   blockSlug={'posts'}
															   icon={ BlockIcons.postsIcon }
															   options={[
										{key: 'layoutSettings', label: __('Enable Layout Settings', 'gutenam-blocks')},
										{key: 'imageSettings', label: __('Enable Image Settings', 'gutenam-blocks')},
										{
											key: 'categorySettings',
											label: __('Enable Category Settings', 'gutenam-blocks')
										},
										{
											key: 'titleSettings',
											label: __('Enable Title Style Settings', 'gutenam-blocks')
										},
										{key: 'metaSettings', label: __('Enable Meta Settings', 'gutenam-blocks')},
										{
											key: 'contentSettings',
											label: __('Enable Content Settings', 'gutenam-blocks')
										},
									]} />
							</div>

							{/*Row Layout*/}
							<div className="bst-blocks-control-row">
								<BaseVisibilitySettings blockName={__('Row Layout', 'gutenam-blocks')}
														   blockSlug={'rowlayout'}
														   icon={ BlockIcons.blockRowIcon }
														   options={[
									{
										key: 'columnResize',
										label: __('Control Individual Settings Groups', 'gutenam-blocks')
									},
									{
										key: 'basicLayout',
										label: __('Enable Basic Layout Controls', 'gutenam-blocks')
									},
									{
										key: 'paddingMargin',
										label: __('Enable Padding/Margin Settings', 'gutenam-blocks')
									},
									{key: 'background', label: __('Enable Background Settings', 'gutenam-blocks')},
									{
										key: 'backgroundOverlay',
										label: __('Enable Background Overlay Settings', 'gutenam-blocks')
									},
									{key: 'border', label: __('Enable Border Settings', 'gutenam-blocks')},
									{key: 'dividers', label: __('Enable Dividers Settings', 'gutenam-blocks')},
									{key: 'textColor', label: __('Enable Text Color Settings', 'gutenam-blocks')},
									{key: 'structure', label: __('Enable Structure Settings', 'gutenam-blocks')},
								]}/>
							</div>

							{/* Section */}
							<div className="bst-blocks-control-row">
								<BaseVisibilitySettings blockName={__('Section', 'gutenam-blocks')}
														   blockSlug={'container'}
														   icon={ BlockIcons.blockColumnIcon }
														   options={[
									{key: 'container', label: __('Enable Container Settings', 'gutenam-blocks')},
									{key: 'textAlign', label: __('Enable Text Align Control', 'gutenam-blocks')},
									{key: 'textColor', label: __('Enable Text Color Control', 'gutenam-blocks')},
									{
										key: 'paddingMargin',
										label: __('Enable Padding/Margin Control', 'gutenam-blocks')
									},
								]}/>
							</div>

							{/* Show More */}
							<div className="bst-blocks-control-row">
								<BaseVisibilitySettings blockName={__('Show More', 'gutenam-blocks')}
														   blockSlug={'show-more'}
														   icon={ BlockIcons.showMoreIcon }
														   options={[
									{
										key: 'showMoreSettings',
										label: __('Enable Show More Settings', 'gutenam-blocks')
									},
									{
										key: 'spacingSettings',
										label: __('Enable Spacing Settings', 'gutenam-blocks')
									},
									{key: 'expandSettings', label: __('Enable Expand Settings', 'gutenam-blocks')},
								]}/>
							</div>

							{/*Spacer*/}
							<div className="bst-blocks-control-row">
								<BaseVisibilitySettings blockName={__('Spacer/Divider', 'gutenam-blocks')}
														   blockSlug={'spacer'}
														   icon={ BlockIcons.spacerIcon }
														   options={[
									{key: 'spacerHeightUnits', label: __('Enable Height Units', 'gutenam-blocks')},
									{key: 'spacerHeight', label: __('Enable Height Control', 'gutenam-blocks')},
									{
										key: 'dividerToggle',
										label: __('Enable Divider Toggle Control', 'gutenam-blocks')
									},
									{
										key: 'dividerStyles',
										label: __('Enable Divider Styles Control', 'gutenam-blocks')
									},
								]} />
							</div>

							{/* Table of Contents */}
							<div className="bst-blocks-control-row">
									<BaseVisibilitySettings blockName={__('Table of Contents', 'gutenam-blocks')}
															   blockSlug={'table-of-contents'}
															   icon={ BlockIcons.tableOfContentsIcon }
															   options={[
										{
											key: 'allowedHeaders',
											label: __('Enable Allowed Headers Settings', 'gutenam-blocks')
										},
										{key: 'titleSettings', label: __('Enable Title Settings', 'gutenam-blocks')},
										{
											key: 'collapsibleSettings',
											label: __('Enable Collapsible Settings', 'gutenam-blocks')
										},
										{key: 'listSettings', label: __('Enable List Settings', 'gutenam-blocks')},
										{key: 'scrollSettings', label: __('Enable Scroll Settings', 'gutenam-blocks')},
										{
											key: 'containerSettings',
											label: __('Enable Container Settings', 'gutenam-blocks')
										},
										{
											key: 'nonStaticContent',
											label: __('Enable Non static Content', 'gutenam-blocks')
										},
									]}/>
							</div>

							{/*Tabs*/}
							<div className="bst-blocks-control-row">
								<BaseVisibilitySettings blockName={__('Tabs', 'gutenam-blocks')}
														   blockSlug={'tabs'}
														   icon={ BlockIcons.blockTabsIcon }
														   options={[
									{key: 'tabLayout', label: __('Enable Layout Settings', 'gutenam-blocks')},
									{key: 'tabContent', label: __('Enable Content Settings', 'gutenam-blocks')},
									{key: 'titleColor', label: __('Enable Title Color Settings', 'gutenam-blocks')},
									{
										key: 'titleSpacing',
										label: __('Enable Title Spacing/Border Settings', 'gutenam-blocks')
									},
									{key: 'titleFont', label: __('Enable Title Font Settings', 'gutenam-blocks')},
									{key: 'titleIcon', label: __('Enable Title Icon Settings', 'gutenam-blocks')},
									{key: 'structure', label: __('Enable Structure Settings', 'gutenam-blocks')},
								]}/>
							</div>

							{/*Testimonials*/}
							<div className="bst-blocks-control-row">
								<BaseVisibilitySettings blockName={__('Testimonials', 'gutenam-blocks')}
														   blockSlug={'testimonials'}
														   icon={ BlockIcons.testimonialBlockIcon }
														   options={[
									{key: 'layoutSettings', label: __('Enable Layout Settings', 'gutenam-blocks')},
									{key: 'styleSettings', label: __('Enable Style Settings', 'gutenam-blocks')},
									{key: 'columnSettings', label: __('Enable Column Settings', 'gutenam-blocks')},
									{
										key: 'containerSettings',
										label: __('Enable Container Settings', 'gutenam-blocks')
									},
									{
										key: 'carouselSettings',
										label: __('Enable Carousel Settings', 'gutenam-blocks')
									},
									{key: 'iconSettings', label: __('Enable Top Icon Settings', 'gutenam-blocks')},
									{key: 'titleSettings', label: __('Enable Title Settings', 'gutenam-blocks')},
									{key: 'ratingSettings', label: __('Enable Rating Settings', 'gutenam-blocks')},
									{
										key: 'contentSettings',
										label: __('Enable Content Settings', 'gutenam-blocks')
									},
									{key: 'mediaSettings', label: __('Enable Media Settings', 'gutenam-blocks')},
									{key: 'nameSettings', label: __('Enable Name Settings', 'gutenam-blocks')},
									{
										key: 'occupationSettings',
										label: __('Enable Occupation Settings', 'gutenam-blocks')
									},
									{key: 'shadowSettings', label: __('Enable Shadow Settings', 'gutenam-blocks')},
									{
										key: 'individualSettings',
										label: __('Enable Individual Item Settings', 'gutenam-blocks')
									},
								]}/>
							</div>
							{map(blocks, ({Control}) => (
								<Control/>
							))}
							<h3>{__('Components', 'gutenam-blocks')}</h3>
							<BaseFontFamily/>

							{/* <BaseVisibilitySettings blockName={__('Design Library', 'gutenam-blocks')}
													   blockSlug={'designlibrary'}
													   icon={ BlockIcons.baseCatNewIcon }
													   showBlockWideSettings={false}
													   options={[
														   {
															   key: 'show',
															   label: __('Show Design Library Button For', 'gutenam-blocks')
														   },
														   {
															   key: 'section',
															   label: __('Show Base Library For', 'gutenam-blocks'),
															   requiresPro: true
														   },
														   {
															   key: 'templates',
															   label: __('Show Starter Packs Library For', 'gutenam-blocks'),
															   initial:'none',
														   },
													   ]}/>

							{map(controls, ({Control}, index ) => (
								<Control key={ index } />
							))} */}
						</div>
					</PanelBody>

					<PanelBody
						title={__('Import/Export Block Settings', 'gutenam-blocks')}
						initialOpen={ false }
					>
						<ExportDefaults />

						<hr/>

						<ImportDefaults />

					</PanelBody>

					<PanelBody
						title={__('Reset Block Defaults', 'gutenam-blocks')}
						initialOpen={ false }
					>
						<ResetDefaults />
					</PanelBody>


					</>
					// End check for user = admin.
				)}

				{( ( undefined === base_blocks_params ) || ( undefined !== base_blocks_params && undefined === base_blocks_params.editor_width ) || ( undefined !== base_blocks_params && undefined !== base_blocks_params.editor_width && base_blocks_params.editor_width ) ) && (
					<PanelBody
						title={__( 'Editor Width', 'gutenam-blocks' )}
						initialOpen={false}
					>
						<BaseEditorWidth/>
					</PanelBody>
				)}
				{/* <PanelBody
						title={ __( 'Global Styles' ) }
						initialOpen={ false }
					>
						{ 'admin' === user && (
							<BaseGlobalTypography />
						) }
					</PanelBody> */}
				{map( extraPanels, ( { Panel }, index ) => (
					<Panel key={ index }/>
				) )}
			</PluginSidebar>
		</Fragment>
	);
}

export default BaseConfig;
