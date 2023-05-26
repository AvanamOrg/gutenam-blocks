/**
 * BoxShadow Component
 *
 */

/**
 * Import Externals
 */
import PopColorControl from '../pop-color-control';
/**
 * Internal block libraries
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { ToggleControl } from '@wordpress/components';
/**
 * Import Css
 */
import './editor.scss';
/**
 * Build the BoxShadow controls
 * @returns {object} BoxShadow settings.
 */
class BoxShadowControl extends Component {
	constructor( label, enable = true, color, colorDefault, opacity, spread, blur, hOffset, vOffset, inset, onColorChange, onOpacityChange, onSpreadChange, onBlurChange, onHOffsetChange, onVOffsetChange, onInsetChange, onEnableChange ) {
		super( ...arguments );
	}
	render() {
		return (
			<div className="bst-box-shadow-container">
				{ this.props.label && (
					<div className="bst-box-shadow-label">
						<h2 className="bst-beside-color-label">{ this.props.label }</h2>
						{ this.props.onEnableChange && (
							<ToggleControl
								checked={ this.props.enable }
								onChange={ value => this.props.onEnableChange( value ) }
							/>
						) }
					</div>
				) }
				{ this.props.enable && (
					<div className="bst-inner-sub-section">
						<div className="bst-inner-sub-section-row">
							<div className="bst-box-color-settings bst-box-shadow-subset">
								<p className="bst-box-shadow-title">{ __( 'Color' ) }</p>
								<PopColorControl
									value={ ( this.props.color ? this.props.color : this.props.colorDefault ) }
									default={ this.props.colorDefault }
									onChange={ value => this.props.onColorChange( value ) }
									opacityValue={ this.props.opacity }
									onOpacityChange={ value => this.props.onOpacityChange( value ) }
									onArrayChange={ this.props.onArrayChange ? ( color, opacity ) => this.props.onArrayChange( color, opacity ) : undefined }
								/>
							</div>
							<div className="bst-box-x-settings bst-box-shadow-subset">
								<p className="bst-box-shadow-title">{ __( 'X' ) }</p>
								<div className="components-base-control bst-boxshadow-number-input">
									<div className="components-base-control__field">
										<input
											value={ ( undefined !== this.props.hOffset ? this.props.hOffset : '' ) }
											onChange={ event => this.props.onHOffsetChange( Number( event.target.value ) ) }
											min={ -200 }
											max={ 200 }
											step={ 1 }
											type="number"
											className="components-text-control__input"
										/>
									</div>
								</div>
							</div>
							<div className="bst-box-y-settings bst-box-shadow-subset">
								<p className="bst-box-shadow-title">{ __( 'Y' ) }</p>
								<div className="components-base-control bst-boxshadow-number-input">
									<div className="components-base-control__field">
										<input
											value={ ( undefined !== this.props.vOffset ? this.props.vOffset : '' ) }
											onChange={ event => this.props.onVOffsetChange( Number( event.target.value ) ) }
											min={ -200 }
											max={ 200 }
											step={ 1 }
											type="number"
											className="components-text-control__input"
										/>
									</div>
								</div>
							</div>
							<div className="bst-box-blur-settings bst-box-shadow-subset">
								<p className="bst-box-shadow-title">{ __( 'Blur' ) }</p>
								<div className="components-base-control bst-boxshadow-number-input">
									<div className="components-base-control__field">
										<input
											value={ ( undefined !== this.props.blur ? this.props.blur : '' ) }
											onChange={ event => this.props.onBlurChange( Number( event.target.value ) ) }
											min={ 0 }
											max={ 200 }
											step={ 1 }
											type="number"
											className="components-text-control__input"
										/>
									</div>
								</div>
							</div>
							<div className="bst-box-spread-settings bst-box-shadow-subset">
								<p className="bst-box-shadow-title">{ __( 'Spread' ) }</p>
								<div className="components-base-control bst-boxshadow-number-input">
									<div className="components-base-control__field">
										<input
											value={ ( undefined !== this.props.spread ? this.props.spread : '' ) }
											onChange={ event => this.props.onSpreadChange( Number( event.target.value ) ) }
											min={ -200 }
											max={ 200 }
											step={ 1 }
											type="number"
											className="components-text-control__input"
										/>
									</div>
								</div>
							</div>
						</div>
						{ this.props.onInsetChange && (
							<div className="bst-box-inset-settings">
								<ToggleControl
									label={ __( 'Inset' ) }
									checked={ this.props.inset }
									onChange={ value => this.props.onInsetChange( value ) }
								/>
							</div>
						) }
					</div>
				) }
			</div>
		);
	}
}
export default ( BoxShadowControl );
