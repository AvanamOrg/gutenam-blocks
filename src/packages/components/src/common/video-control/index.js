/**
 * Basic Image Control.
 */

/**
 * Import Base Components
 */
import BaseMediaPlaceholder from '../media-placeholder';
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
/**
 * Import Icons
 */
 import {
	video
} from '@base/icons';
import {
	image,
	closeSmall,
	plusCircleFilled,
} from '@wordpress/icons';
const ALLOWED_MEDIA_TYPES = [ 'video' ];
/**
 * Basic Video Control.
 */
class BaseVideoControl extends Component {
	constructor() {
		super( ...arguments );
	}
	render() {
		const {
			label,
			hasVideo,
			onSaveVideo,
			onRemoveVideo,
			disableMediaButtons,
			videoURL,
			videoID } = this.props;
		return (
			<div className="components-base-control base-image-media-control base-image-background-control base-video-background-control">
				{ ! hasVideo && (
					<Fragment>
						{ label && (
							<div className="components-base-video-background__label">{ label }</div>
						) }
						<BaseMediaPlaceholder
							labels={ '' }
							selectIcon={ plusCircleFilled }
							selectLabel={ __( 'Select Video', 'gutenam-blocks' ) }
							onSelect={ ( img ) => onSaveVideo( img ) }
							accept="video/*"
							className={ 'base-image-upload' }
							allowedTypes={ ALLOWED_MEDIA_TYPES }
							disableMediaButtons={ disableMediaButtons }
						/>
					</Fragment>
				) }
				{ hasVideo && (
					<Fragment>
						{ label && (
							<div className="components-base-video-background__label">{ label }</div>
						) }
						<div className='components-base-video-btns'>
							<MediaUpload
								onSelect={ ( video ) => onSaveVideo( video ) }
								type="video"
								value={ ( videoID ? videoID : '' ) }
								render={ ( { open } ) => (
									<Button
										className={ 'components-button components-icon-button bsb-cta-upload-btn bsb-video-edit' }
										onClick={ open }
										icon={ video }
									>
										{ __( 'Edit Video', 'gutenam-blocks' ) }
									</Button>
								) }
							/>
							<Button
								icon={ closeSmall }
								label={ __( 'Remove Image', 'gutenam-blocks' ) }
								className={ 'components-button components-icon-button bsb-remove-video bsb-cta-upload-btn' }
								onClick={ () => onRemoveVideo() }
							/>
						</div>
					</Fragment>
				) }
			</div>
		);
	}
}
export default BaseVideoControl;
