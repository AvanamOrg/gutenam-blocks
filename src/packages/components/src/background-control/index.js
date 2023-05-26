/**
 * Basic Background Control.
 */

/**
 * Import External
 */
import { get, map } from 'lodash';
import classnames from 'classnames';

/**
 * Import Css
 */
import './editor.scss';
/**
 * Import Base Components
 */
import DynamicBackgroundControl from '../dynamic-background-control';
import BaseMediaPlaceholder from '../common/media-placeholder';
import BaseRadioButtons from '../common/radio-buttons';
import BaseFocalPicker from '../focal-picker';
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, Component } from '@wordpress/element';
import {
	MediaUpload,
} from '@wordpress/block-editor';
import { Button, ToggleControl } from '@wordpress/components';
import {
	image,
	closeSmall,
	plusCircleFilled,
} from '@wordpress/icons';
import BackgroundSizeControl from '../background-size-control';
const ALLOWED_MEDIA_TYPES = [ 'image' ];
/**
 * Basic Background Control.
 */
class BackgroundControl extends Component {
	constructor() {
		super( ...arguments );
	}
	render() {
		const {
			label,
			hasImage,
			onSaveImage,
			onRemoveImage,
			onSaveURL,
			onSavePosition,
			onSaveSize,
			onSaveRepeat,
			onSaveAttachment,
			disableMediaButtons,
			imageURL,
			imageID,
			imagePosition,
			imageSize,
			imageRepeat,
			imageAttachment,
			imageAttachmentParallax = false,
			inlineImage,
			onSaveInlineImage,
			dynamicAttribute = '',
			attributes
		} = this.props;
		let attachmentOptions = [
			{ value: 'scroll', label: __( 'Scroll', 'gutenam-blocks' ) },
			{ value: 'fixed', label: __( 'Fixed', 'gutenam-blocks' ) },
		];
		if ( imageAttachmentParallax ) {
			attachmentOptions = [
				{ value: 'scroll', label: __( 'Scroll', 'gutenam-blocks' ) },
				{ value: 'fixed', label: __( 'Fixed', 'gutenam-blocks' ) },
				{ value: 'parallax', label: __( 'Parallax', 'gutenam-blocks' ) },
			];
		}
		return (
			<div className="components-base-control base-image-background-control">
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
							onSelectURL={ ( newURL ) => onSaveURL( newURL) }
							accept="image/*"
							className={ 'base-image-upload' }
							allowedTypes={ ALLOWED_MEDIA_TYPES }
							disableMediaButtons={ disableMediaButtons }
							dynamicControl={ ( dynamicAttribute && base_blocks_params.dynamic_enabled ? <DynamicBackgroundControl { ...this.props }/> : undefined ) }
						/>
					</Fragment>
				) }
				{ hasImage && (
					<Fragment>
						{ label && (
							<div className="components-base-image-background__label">{ label }</div>
						) }
						{ dynamicAttribute && base_blocks_params.dynamic_enabled && attributes.baseDynamic && attributes.baseDynamic[ dynamicAttribute ] && attributes.baseDynamic[ dynamicAttribute ].enable ? (
							<div className="bsb-dynamic-background-sidebar-top">
								<DynamicBackgroundControl startOpen={ attributes.baseDynamic[ dynamicAttribute ].field ? false : true } { ...this.props }/>
							</div>
						) : (
							<Fragment>
								<MediaUpload
									onSelect={ ( img ) => onSaveImage( img ) }
									type="image"
									value={ ( imageID ? imageID : '' ) }
									render={ ( { open } ) => (
										<Button
											className={ 'components-button components-icon-button bst-cta-upload-btn' }
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
									<DynamicBackgroundControl { ...this.props }/>
								) }
							</Fragment>
						) }
						<BaseFocalPicker
							url={ ( imageURL ? imageURL : '' ) }
							value={ ( imagePosition ? imagePosition : 'center center' ) }
							onChange={ value => onSavePosition( value ) }
						/>
						<BackgroundSizeControl
							label={ __( 'Background Image Size', 'gutenam-blocks' ) }
							value={ ( imageSize ? imageSize : 'cover' ) }
							options={ [
								{ value: 'cover', label: __( 'Cover', 'gutenam-blocks' ) },
								{ value: 'contain', label: __( 'Contain', 'gutenam-blocks' ) },
								{ value: 'auto', label: __( 'Auto', 'gutenam-blocks' ) },
							] }
							onChange={ value => onSaveSize( value ) }
						/>
						{ ( imageSize ? imageSize : 'cover' ) !== 'cover' && (
							<BaseRadioButtons
								label={ __( 'Background Image Repeat', 'gutenam-blocks' ) }
								value={ ( imageRepeat ? imageRepeat : 'no-repeat' ) }
								options={ [
									{ value: 'no-repeat', label: __( 'No Repeat', 'gutenam-blocks' ) },
									{ value: 'repeat', label: __( 'Repeat', 'gutenam-blocks' ) },
									{ value: 'repeat-x', label: __( 'Repeat-x', 'gutenam-blocks' ) },
									{ value: 'repeat-y', label: __( 'Repeat-y', 'gutenam-blocks' ) },
								] }
								onChange={ value => onSaveRepeat( value ) }
							/>
						) }
						<BaseRadioButtons
							label={ __( 'Background Image Attachment', 'gutenam-blocks' ) }
							value={ ( imageAttachment ? imageAttachment : 'scroll' ) }
							options={ attachmentOptions }
							onChange={ value => onSaveAttachment( value ) }
						/>
						{ ( imageAttachment ? imageAttachment : 'scroll' ) === 'fixed' && (
							<p className="bsb-sidebar-help">
								{ __( 'Note: Attachment Fixed works only on desktop.', 'gutenam-blocks' ) }
							</p>
						) }
						{ onSaveInlineImage && (
							<ToggleControl
								label={ __( 'Force Background Image inline?', 'gutenam-blocks' ) }
								checked={ ( undefined !== inlineImage ? inlineImage : false ) }
								onChange={ ( value ) => onSaveInlineImage( value ) }
							/>
						) }
					</Fragment>
				) }
			</div>
		);
	}
}
export default BackgroundControl;
