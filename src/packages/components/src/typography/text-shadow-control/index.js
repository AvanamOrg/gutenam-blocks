/**
 * BoxShadow Component
 *
 */

/**
 * Import Externals
 */
import PopColorControl from '../../pop-color-control';

/**
 * Internal block libraries
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { ToggleControl } from '@wordpress/components';
/**
 * Build the BoxShadow controls
 * @returns {object} BoxShadow settings.
 */
const TextShadowControl = ( { label, enable = true, color, colorDefault, blur, hOffset, vOffset, onColorChange, onBlurChange, onHOffsetChange, onVOffsetChange, onEnableChange } ) => (
	<div className="bsb-text-shadow-container components-base-control">
		{ label && (
			<div className="bst-box-shadow-label">
				<h2 className="bst-beside-color-label">{ label }</h2>
				{ onEnableChange && (
					<ToggleControl
						checked={ enable }
						onChange={ value => onEnableChange( value ) }
					/>
				) }
			</div>
		) }
		{ enable && (
			<div className="bst-inner-sub-section">
				<div className="bst-inner-sub-section-row">
					<div className="bst-box-color-settings bst-box-shadow-subset">
						<p className="bst-box-shadow-title">{ __( 'Color', 'gutenam-blocks' ) }</p>
						<PopColorControl
							value={ ( color ? color : colorDefault ) }
							default={ colorDefault }
							onChange={ value => onColorChange( value ) }
						/>
					</div>
					<div className="bst-box-x-settings bst-box-shadow-subset">
						<p className="bst-box-shadow-title">{ 'X' }</p>
						<div className="components-base-control bst-boxshadow-number-input">
							<div className="components-base-control__field">
								<input
									value={ ( undefined !== hOffset ? hOffset : '' ) }
									onChange={ event => onHOffsetChange( Number( event.target.value ) ) }
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
						<p className="bst-box-shadow-title">{ 'Y' }</p>
						<div className="components-base-control bst-boxshadow-number-input">
							<div className="components-base-control__field">
								<input
									value={ ( undefined !== vOffset ? vOffset : '' ) }
									onChange={ event => onVOffsetChange( Number( event.target.value ) ) }
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
						<p className="bst-box-shadow-title">{ 'Blur' }</p>
						<div className="components-base-control bst-boxshadow-number-input">
							<div className="components-base-control__field">
								<input
									value={ ( undefined !== blur ? blur : '' ) }
									onChange={ event => onBlurChange( Number( event.target.value ) ) }
									min={ 0 }
									max={ 200 }
									step={ 1 }
									type="number"
									className="components-text-control__input"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		) }
	</div>
);
export default TextShadowControl;
