/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
const { Fragment } = wp.element;
import { map } from 'lodash';
import { withFilters, TabPanel, Panel, PanelBody, PanelRow, Button } from '@wordpress/components';

export const BlocksList = () => {
	const BaseBlocks = [
		{
			title: __( 'Global Colors', 'avanam' ),
			description: __( 'Setup the base color scheme for your site.', 'avanam' ),
			focus: 'base_customizer_general_colors',
			type: 'section',
			setting: false
		},
		{
			title: __( 'Branding', 'avanam' ),
			description: __( 'Upload your logo and favicon.', 'avanam' ),
			focus: 'title_tagline',
			type: 'section',
			setting: false
		},
		{
			title: __( 'Typography', 'avanam' ),
			description: __( 'Choose the perfect font family, style and sizes.', 'avanam' ),
			focus: 'base_customizer_general_typography',
			type: 'section',
			setting: false
		},
		{
			title: __( 'Header Layout', 'avanam' ),
			description: __( 'Add elements and arrage them how you want.', 'avanam' ),
			focus: 'base_customizer_header',
			type: 'panel',
			setting: false
		},
		{
			title: __( 'Page Layout', 'avanam' ),
			description: __( 'Define your sites general page look and feel for page title, and content style.', 'avanam' ),
			focus: 'base_customizer_page_layout',
			type: 'section',
			setting: false
		},
		{
			title: __( 'Footer Layout', 'avanam' ),
			description: __( 'Customize the columns and place widget areas in unlimited configurations', 'avanam' ),
			focus: 'base_customizer_footer_layout',
			type: 'section',
			setting: false
		},
	];
	return (
		<Fragment>
			<h2 className="section-header">{ __( 'Customize Your Site', 'avanam' ) }</h2>
			{/* <h3 className="section-sub-head">{ __( 'Header Builder', 'avanam' ) }</h3> */}
			<div className="two-col-grid">
				{ map( BaseBlocks, ( link ) => {
					return (
						<div className="link-item">
							<h4>{ link.title }</h4>
							<p>{ link.description }</p>
							<div className="link-item-foot">
								<a href={ `${baseDashboardParams.adminURL}customize.php?autofocus%5B${ link.type }%5D=${ link.focus }` }>
									{ __( 'Customize', 'avanam') }
								</a>
							</div>
						</div>
					);
				} ) }
			</div>
		</Fragment>
	);
};

export default withFilters( 'base_blocks_enabled_list' )( BlocksList );