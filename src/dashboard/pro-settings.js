/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
const { Fragment, Component } = wp.element;
import { map } from 'lodash';
import {
	Spinner,
	ToggleControl,
} from '@wordpress/components';

class ProBlocksList extends Component {
	constructor() {
		super( ...arguments );
		this.saveConfig = this.saveConfig.bind( this );
		this.state = {
			settings: ( bst_blocks_params.blockConfigSettings ? bst_blocks_params.blockConfigSettings : {} ),
			proBlocks: ( bst_blocks_params.proBlocks ? bst_blocks_params.proBlocks : {} ),
			isSaving: false,
		};
	}
	saveConfig( blockID, settingToggle ) {
		this.setState( { isSaving: blockID } );
		const config = ( bst_blocks_params.blockConfigSettings ? bst_blocks_params.blockConfigSettings : {} );
		if ( ! config[ blockID ] ) {
			config.push( blockID );
		} else {
			for ( let i = 0; i < config.length; i++ ) { 
				if ( config[ i ] === blockID ) {
					config.splice( i, 1 ); 
				}
			}
		}
		config[ blockID ] = settingToggle;
		const settingModel = new wp.api.models.Settings( { bst_blocks_unregistered_blocks: config } );
		settingModel.save().then( response => {
			this.setState( { isSaving: false, settings: config, isOpen: false } );
			bst_blocks_params.blockConfigSettings = config;
		} );
	}
	render() {
		return (
			<Fragment>
				{ this.state.ProBlocks && (
					<Fragment>
						<h2 className="section-header">{ __( 'Pro Blocks', 'base-Blocks' ) }</h2>
						<div className="two-col-grid">
							{ map( this.state.ProBlocks, ( block ) => {
								const enabled = ( this.state.settings && undefined !== this.state.settings[ block.setting ] ? true : false );
								return (
									<div className="link-item">
										<h4>{ block.title }</h4>
										<p>{ block.description }</p>
										<div className="link-item-foot">
											{ block.setting && (
												<Fragment>
													<div className="spacer"></div>
													{ this.state.isSaving && this.state.isSaving === block.setting && (
														<Spinner />
													) }
													<ToggleControl
														checked={ enabled }
														onChange={ ( value ) => this.saveConfig( block.setting, value ) }
													/>
												</Fragment>
											) }
										</div>
									</div>
								);
							} ) }
						</div>
					</Fragment>
				) }
			</Fragment>
		);
	}
}
export default ( ProBlocksList );
