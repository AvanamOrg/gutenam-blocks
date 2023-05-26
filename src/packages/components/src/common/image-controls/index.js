/**
 * Basic Image Control.
 */

/**
 * Import Base Components
 */
import BaseMediaPlaceholder from '../media-placeholder';
import DynamicImageControl from '../../dynamic-image-control';
/**
 * Import Css
 */
 import './editor.scss';
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, Component } from '@wordpress/element';
import {
	MediaUpload,
} from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import {
	image,
	closeSmall,
	plusCircleFilled,
} from '@wordpress/icons';
const ALLOWED_MEDIA_TYPES = [ 'image' ];
/**
 * Basic Image Control.
 */
class BaseImageControl extends Component {
	constructor() {
		super( ...arguments );
	}
	render() {
		const {
			label,
			hasImage,
			onSaveImage,
			onRemoveImage,
			disableMediaButtons,
			imageURL,
			imageID,
			baseDynamic,
			dynamicAttribute = '' } = this.props;
		return (
			<div className="base-image-media-control base-image-background-control">
				{ ! hasImage && (
					<Fragment>
						{ label && (
							<div className="components-base-image-background__label">{ label }</div>
						) }
						<BaseMediaPlaceholder
							labels={ '' }
							selectIcon={ plusCircleFilled }
							selectLabel={ __( 'Select Image', 'gutenam-blocks' ) }
							onSelect={ ( img ) => onSaveImage( img ) }
							accept="image/*"
							className={ 'base-image-upload' }
							allowedTypes={ ALLOWED_MEDIA_TYPES }
							disableMediaButtons={ disableMediaButtons }
							dynamicControl={ ( dynamicAttribute && base_blocks_params.dynamic_enabled ? <DynamicImageControl { ...this.props }/> : undefined ) }
						/>
					</Fragment>
				) }
				{ hasImage && (
					<Fragment>
						{ label && (
							<div className="components-base-image-background__label">{ label }</div>
						) }
						{ dynamicAttribute && base_blocks_params.dynamic_enabled && baseDynamic && baseDynamic[ dynamicAttribute ] && baseDynamic[ dynamicAttribute ].enable ? (
							<div className="bsb-dynamic-background-sidebar-top">
								<DynamicImageControl startOpen={ baseDynamic[ dynamicAttribute ].field ? false : true } { ...this.props }/>
							</div>
						) : (
							<Fragment>
								<MediaUpload
									onSelect={ ( img ) => onSaveImage( img ) }
									type="image"
									value={ ( imageID ? imageID : '' ) }
									render={ ( { open } ) => (
										<Button
											className={ 'components-button components-icon-button bst-cta-upload-btn bsb-sidebar-image' }
											style={ {
												backgroundImage: 'url("' + imageURL + '")',
												backgroundSize: 'cover',
											} }
											onClick={ open }
											icon={ image }
										>
											{ __( 'Edit Image', 'gutenam-blocks' ) }
										</Button>
									) }
								/>
								<Button
									icon={ closeSmall }
									label={ __( 'Remove Image', 'gutenam-blocks' ) }
									className={ 'components-button components-icon-button bst-remove-img bst-cta-upload-btn' }
									onClick={ () => onRemoveImage() }
								/>
								{ dynamicAttribute && base_blocks_params.dynamic_enabled && (
									<DynamicImageControl { ...this.props }/>
								) }
							</Fragment>
						) }
					</Fragment>
				) }
			</div>
		);
	}
}
export default BaseImageControl;
