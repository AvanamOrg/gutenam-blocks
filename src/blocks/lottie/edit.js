/**
 * BLOCK: Base Icon
 */

/**
 * Import Css
 */
import './editor.scss';
import metadata from './block.json';

import '@dotlottie/player-component';

/**
 * Internal block libraries
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { useBlockProps, BlockAlignmentControl } from '@wordpress/block-editor';
const { rest_url } = base_blocks_params;
import { has, get } from 'lodash';

import { BlockControls } from '@wordpress/block-editor';

const { apiFetch } = wp;
import {
	RangeControl,
	ToggleControl,
	TextControl,
	Modal,
	SelectControl,
	FormFileUpload,
	Button,
	Notice,
} from '@wordpress/components';

import { __experimentalNumberControl as NumberControl } from '@wordpress/components';
/**
 * Internal dependencies
 */
import classnames from 'classnames';
import {
	BaseSelectPosts,
	BasePanelBody,
	InspectorControlTabs,
	BaseInspectorControls,
	BaseBlockDefaults,
	ResponsiveMeasureRangeControl,
	SpacingVisualizer,
	CopyPasteAttributes,
} from '@base/components'
import {
	setBlockDefaults,
	mouseOverVisualizer,
	getSpacingOptionOutput,
	getUniqueId,
} from '@base/helpers';

export function Edit( {
	attributes,
	setAttributes,
	className,
	clientId,
} ) {

	const {
		fileUrl,
		localFile,
		fileSrc,
		showControls,
		autoplay,
		loop,
		onlyPlayOnHover,
		onlyPlayOnScroll,
		waitUntilInView,
		bouncePlayback,
		playbackSpeed,
		loopLimit,
		useRatio,
		ratio,
		uniqueID,
		delay,
		align,
		width,
		startFrame,
		endFrame,
		paddingTablet,
		paddingDesktop,
		paddingMobile,
		paddingUnit,
		marginTablet,
		marginDesktop,
		marginMobile,
		marginUnit,
		label,
	} = attributes;

	const [ rerenderKey, setRerenderKey ] = useState( 'static' );
	const [ lottieAnimationsCacheKey, setLottieAnimationsCacheKey ] = useState( { key: Math.random() } );

	const paddingMouseOver = mouseOverVisualizer();
	const marginMouseOver = mouseOverVisualizer();

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

	const getPreviewSize = ( device, desktopSize, tabletSize, mobileSize ) => {
		if ( device === 'Mobile' ) {
			if ( undefined !== mobileSize && '' !== mobileSize && null !== mobileSize ) {
				return mobileSize;
			} else if ( undefined !== tabletSize && '' !== tabletSize && null !== tabletSize ) {
				return tabletSize;
			}
		} else if ( device === 'Tablet' ) {
			if ( undefined !== tabletSize && '' !== tabletSize && null !== tabletSize ) {
				return tabletSize;
			}
		}
		return desktopSize;
	};

	const previewMarginTop = getPreviewSize( previewDevice, ( undefined !== marginDesktop ? marginDesktop[0] : '' ), ( undefined !== marginTablet ? marginTablet[ 0 ] : '' ), ( undefined !== marginMobile ? marginMobile[ 0 ] : '' ) );
	const previewMarginRight = getPreviewSize( previewDevice, ( undefined !== marginDesktop ? marginDesktop[1] : '' ), ( undefined !== marginTablet ? marginTablet[ 1 ] : '' ), ( undefined !== marginMobile ? marginMobile[ 1 ] : '' ) );
	const previewMarginBottom = getPreviewSize( previewDevice, ( undefined !== marginDesktop ? marginDesktop[2] : '' ), ( undefined !== marginTablet ? marginTablet[ 2 ] : '' ), ( undefined !== marginMobile ? marginMobile[ 2 ] : '' ) );
	const previewMarginLeft = getPreviewSize( previewDevice, ( undefined !== marginDesktop ? marginDesktop[3] : '' ), ( undefined !== marginTablet ? marginTablet[ 3 ] : '' ), ( undefined !== marginMobile ? marginMobile[ 3 ] : '' ) );

	const previewPaddingTop = getPreviewSize( previewDevice, ( undefined !== paddingDesktop ? paddingDesktop[0] : '' ), ( undefined !== paddingTablet ? paddingTablet[ 0 ] : '' ), ( undefined !== paddingMobile ? paddingMobile[ 0 ] : '' ) );
	const previewPaddingRight = getPreviewSize( previewDevice, ( undefined !== paddingDesktop ? paddingDesktop[1] : '' ), ( undefined !== paddingTablet ? paddingTablet[ 1 ] : '' ), ( undefined !== paddingMobile ? paddingMobile[ 1 ] : '' ) );
	const previewPaddingBottom = getPreviewSize( previewDevice, ( undefined !== paddingDesktop ? paddingDesktop[2] : '' ), ( undefined !== paddingTablet ? paddingTablet[ 2 ] : '' ), ( undefined !== paddingMobile ? paddingMobile[ 2 ] : '' ) );
	const previewPaddingLeft = getPreviewSize( previewDevice, ( undefined !== paddingDesktop ? paddingDesktop[3] : '' ), ( undefined !== paddingTablet ? paddingTablet[ 3 ] : '' ), ( undefined !== paddingMobile ? paddingMobile[ 3 ] : '' ) );

	const [ activeTab, setActiveTab ] = useState( 'general' );

	const nonTransAttrs = ['fileSrc', 'fileUrl', 'label'];

	const classes = classnames( className );
	const blockProps = useBlockProps( {
		className: classes,
	} );

	useEffect( () => {
		setBlockDefaults( 'base/lottie', attributes);

		let uniqueId = getUniqueId( uniqueID, clientId, isUniqueID, isUniqueBlock );
		if ( uniqueId !== uniqueID ) {
			attributes.uniqueID = uniqueId;
			setAttributes( { uniqueID: uniqueId } );
			addUniqueID( uniqueId, clientId );
		} else {
			addUniqueID( uniqueID, clientId );
		}
	}, [] );
	const containerClasses = classnames( {
		'bsb-lottie-container': true,
		[ `bsb-lottie-container${ uniqueID }` ] : true,
	} );
	function parseAndUpload(file, title, setLottieJsonError) {

		let fileread = new FileReader()
		let lottieJson;

		fileread.onload = function (e) {

			try {
				lottieJson = JSON.parse(e.target.result)
			} catch (e) {
				setLottieJsonError( __( 'Invalid JSON file', 'gutenam-blocks' ) );
				return;
			}

			if (typeof lottieJson === 'object') {
				apiFetch( {
					path: '/bsb-lottieanimation/v1/animations',
					data: { lottieFile: lottieJson, title: title },
					method: 'POST',
				} ).then( (response) => {
					if( has(response, 'value') && has(response, 'label') ){
						setAttributes( { localFile: [ response ], fileSrc: 'local' } );
						setRerenderKey( Math.random() );
						setLottieAnimationsCacheKey( Math.random() );
					} else if ( has(response, 'error') && has(response, 'message')  ) {
						setLottieJsonError( response.message );
					} else {
						setLottieJsonError( __( 'An error occurred when uploading your file', 'gutenam-blocks' ) );
					}
				});
			}

		}

		fileread.readAsText(file)

	}

	const getAnimationUrl= () => {
		let url = '';

		if( fileSrc === 'url') {
			url = fileUrl;
		} else {
			url = rest_url + 'bsb-lottieanimation/v1/animations/' + get(localFile, [0, 'value'], '') + '.json';
		}

		if( url === '' || url === rest_url + 'bsb-lottieanimation/v1/animations/.json') {
			url = 'https://assets10.lottiefiles.com/packages/lf20_rqcjx8hr.json';
		}

		return url;
	}

	const UploadModal = () => {
		const [ isOpen, setOpen ] = useState( false );
		const [ lottieJsonError, setLottieJsonError ] = useState( false );
		const [ newAnimationTitle, setNewAnimationTitle ] = useState( '' );
		const [ lottieJsonFile, setLottieJsonFile ] = useState();

		const openModal = () => setOpen( true );
		const closeModal = () => setOpen( false );

		return (
			<>
				<Button variant="primary" className={ 'is-primary' } onClick={ openModal }>
					{ __( 'Upload a Lottie file', 'gutenam-blocks' ) }
				</Button>
				{ isOpen && (
					<Modal title={ __( 'Upload Lottie JSON file', 'gutenam-blocks' ) } onRequestClose={ closeModal }>

						{lottieJsonError !== false ?
							<Notice status="error" onRemove={ () => setLottieJsonError( false ) }>
								<p>{ lottieJsonError }</p>
							</Notice>
							: null }

						<TextControl
							label={ __( 'Animation title', 'gutenam-blocks' ) }
							value={ newAnimationTitle }
							onChange={ ( value ) => setNewAnimationTitle( value ) }
						/>

						<br/>

						<FormFileUpload
							accept="application/json"
							className={ 'is-primary'}
							align={ 'center' }
							onChange={ ( event ) => { setLottieJsonFile( event.target.files[0] ); } }
						>
							{ __( 'Browse', 'gutenam-blocks' ) }
						</FormFileUpload>
						{ lottieJsonFile ? null : __( 'Select a file', 'gutenam-blocks' )}

						<br/><br/>

						<Button className={ 'is-secondary' } onClick={ closeModal } text={ __( 'Cancel', 'gutenam-blocks' ) } />
						&nbsp;&nbsp;&nbsp;
						<Button className={ 'is-primary' } disabled={ !lottieJsonFile } onClick={ () => parseAndUpload( lottieJsonFile, newAnimationTitle, setLottieJsonError ) } text={ __( 'Upload', 'gutenam-blocks' ) }/>

					</Modal>
				) }
			</>
		);
	};

	let playerProps = {};

	if(loop){
		playerProps.loop = '';
	}

	if(playbackSpeed){
		playerProps.speed = playbackSpeed;
	}

	if(showControls){
		playerProps.controls = '';
	}

	if(autoplay){
		playerProps.autoplay = '';
	}

	if(onlyPlayOnHover){
		playerProps.hover = '';
	}

	if(bouncePlayback) {
		playerProps.mode = 'bounce';
	} else {
		playerProps.mode = 'normal';
	}

	if( delay !== 0){
		playerProps.intermission = 1000 * delay;
	}

	const previewMaxWidth = (width === '0' ? 'auto' : width + 'px');

	const animationContent = <>
		<dotlottie-player
			{...playerProps}
			src={getAnimationUrl()}
			key={rerenderKey}
			id={'bsb-lottie-player' + uniqueID}
			style={{
				maxWidth: ! useRatio ? previewMaxWidth : null,
			}}
		/>

		<SpacingVisualizer
			style={ {
				marginLeft: ( undefined !== previewMarginLeft ? getSpacingOptionOutput( previewMarginLeft, marginUnit ) : undefined ),
				marginRight: ( undefined !== previewMarginRight ? getSpacingOptionOutput( previewMarginRight, marginUnit ) : undefined ),
				marginTop: ( undefined !== previewMarginTop ? getSpacingOptionOutput( previewMarginTop, marginUnit ) : undefined ),
				marginBottom: ( undefined !== previewMarginBottom ? getSpacingOptionOutput( previewMarginBottom, marginUnit ) : undefined ),
			} }
			type="inside"
			forceShow={ paddingMouseOver.isMouseOver }
			spacing={ [ getSpacingOptionOutput( previewPaddingTop, paddingUnit ), getSpacingOptionOutput( previewPaddingRight, paddingUnit ), getSpacingOptionOutput( previewPaddingBottom, paddingUnit ), getSpacingOptionOutput( previewPaddingLeft, paddingUnit ) ] }
		/>
		<SpacingVisualizer
			type="outside"
			forceShow={ marginMouseOver.isMouseOver }
			spacing={ [ getSpacingOptionOutput( previewMarginTop, marginUnit ), getSpacingOptionOutput( previewMarginRight, marginUnit ), getSpacingOptionOutput( previewMarginBottom, marginUnit ), getSpacingOptionOutput( previewMarginLeft, marginUnit ) ] }
		/>
	</>

	return (
		<div { ...blockProps }>
			<BlockControls>
				<BlockAlignmentControl
					value={ align }
					onChange={ ( value ) => setAttributes( { align: value } ) }
				/>
				<CopyPasteAttributes
					attributes={ attributes }
					excludedAttrs={ nonTransAttrs }
					defaultAttributes={ metadata['attributes'] }
					blockSlug={ metadata['name'] }
					onPaste={ attributesToPaste => setAttributes( attributesToPaste ) }
				/>
			</BlockControls>
			<BaseInspectorControls blockSlug={ 'base/lottie' }>

				<InspectorControlTabs
					panelName={ 'lottie' }
					setActiveTab={ setActiveTab }
					allowedTabs={ [ 'general', 'advanced' ] }
					activeTab={ activeTab }
				/>

				{ ( activeTab === 'general' ) &&
					<>
						<BasePanelBody
							title={ __('Source File', 'gutenam-blocks') }
							initialOpen={ true }
							panelName={ 'sourceFile' }
							blockSlug={ 'base/lottie' }
						>

							<SelectControl
								label={ __( 'File Source', 'gutenam-blocks' ) }
								value={ fileSrc }
								options={ [
									{ value: 'url', label: __( 'Remote URL', 'gutenam-blocks' ) },
									{ value: 'file', label: __( 'Local File', 'gutenam-blocks' ) },
								] }
								onChange={ value => {
									setAttributes( { fileSrc: value } );
									setRerenderKey( Math.random() );
								} }
							/>

							{ fileSrc === 'url' ?
								<TextControl
									label={ __( 'Lottie Animation URL', 'gutenam-blocks') }
									value={ fileUrl }
									onChange={ (value) => {
										setAttributes({ fileUrl: value });
										setRerenderKey( Math.random() );
									} }
								/>
								:
								<>
									<BaseSelectPosts
										placeholder={ __( 'Select Lottie File', 'gutenam-blocks' ) }
										restBase={ 'wp/v2/base_lottie' }
										key={ lottieAnimationsCacheKey }
										fieldId={ 'lottie-select-src' }
										value={ localFile }
										onChange={ (value) => {
											setAttributes({ localFile: (value ? [value] : []) });
											setRerenderKey( Math.random() );
										} }
									/>

									<UploadModal />

									<br/><br/>
								</>
							}
							<TextControl
								label={ __( 'Aria Label', 'gutenam-blocks' ) }
								value={ label || '' }
								onChange={ ( value ) => {
									setAttributes( { label: value });
								} }
								help={ __( 'Describe the purpose of this animation on the page.', 'gutenam-blocks' ) }
							/>



						</BasePanelBody>
						<BasePanelBody
							title={ __( 'Playback Settings', 'gutenam-blocks' ) }
							initialOpen={ true }
							panelName={ 'playbackSettings' }
							blockSlug={ 'base/lottie' }
						>
							<ToggleControl
								label={ __( 'Show Controls', 'gutenam-blocks' ) }
								checked={ showControls }
								onChange={ ( value ) => {
									setAttributes( { showControls: value } );
									setRerenderKey( Math.random() );
								}}
							/>
							<ToggleControl
								label={ __( 'Autoplay', 'gutenam-blocks' ) }
								checked={ autoplay }
								onChange={ ( value ) => {
									setAttributes( { autoplay: value, waitUntilInView: ( value ? waitUntilInView : false ), onlyPlayOnHover: (value ? false : onlyPlayOnHover), onlyPlayOnScroll: (value ? false : onlyPlayOnScroll) } );
									setRerenderKey( Math.random() );
								}}
							/>
							<ToggleControl
								label={ __( 'Only play on hover', 'gutenam-blocks' ) }
								checked={ onlyPlayOnHover }
								onChange={ ( value ) => {
									setAttributes( { onlyPlayOnHover: value, autoplay: (value ? false : autoplay), onlyPlayOnScroll: (value ? false : onlyPlayOnScroll) } );
									setRerenderKey( Math.random() );
								} }
							/>
							<ToggleControl
								label={ __( 'Only play on page scroll', 'gutenam-blocks' ) }
								help={ __( 'This will override most settings such as autoplay, playback speed, bounce, loop, and play on hover. This will not work when previewing in the block editor', 'gutenam-blocks' ) }
								checked={ onlyPlayOnScroll }
								onChange={ ( value ) => {
									setAttributes( { onlyPlayOnScroll: value, onlyPlayOnHover: (value ? false : onlyPlayOnHover), autoplay: (value ? false : autoplay), loop: (value ? false : loop), bouncePlayback: (value ? false : bouncePlayback) } );
									setRerenderKey( Math.random() );
								} }
							/>

							{ onlyPlayOnScroll ?
								<>
									<div style={ { marginBottom: '15px'} }>
										<NumberControl
											label={ __( 'Starting Frame' ) }
											value={ startFrame }
											onChange={ (value) => setAttributes({ startFrame: parseInt(value) }) }
											min={ 0 }
											isShiftStepEnabled={ true }
											shiftStep={ 10 }
											help={ __( 'Does not show in preview', 'gutenam-blocks' ) }
										/>
									</div>

									<div style={ { marginBottom: '15px'} }>
										<NumberControl
											label={ __( 'Ending Frame' ) }
											value={ endFrame }
											onChange={ (value) => setAttributes({ endFrame: parseInt(value) }) }
											min={ 0 }
											isShiftStepEnabled={ true }
											shiftStep={ 10 }
											help={ __( 'Does not show in preview', 'gutenam-blocks' ) }
										/>
									</div>
								</>
								:
								<div style={ { marginBottom: '15px'} }>
									<ToggleControl
										label={ __( 'Don\'t play until in view', 'gutenam-blocks' ) }
										help={ __('Prevent playback from starting until animation is in view', 'gutenam-blocks') }
										checked={ waitUntilInView }
										onChange={ (value) => { setAttributes( { waitUntilInView: value, autoplay: ( value ? true : autoplay ) } ) } }
									/>
								</div>
							}

							<RangeControl
								label={ __( 'Playback Speed', 'gutenam-blocks' ) }
								value={ playbackSpeed }
								onChange={ ( value ) => { setAttributes( { playbackSpeed: value } ); setRerenderKey( Math.random() ) } }
								step={ 0.1 }
								min={ 0 }
								max={ 10 }
							/>

							<h3>{ __( 'Loop Settings', 'gutenam-blocks' ) }</h3>
							<ToggleControl
								label={ __( 'Loop playback', 'gutenam-blocks' ) }
								checked={ loop }
								onChange={ ( value ) => {
									setAttributes( { loop: value, onlyPlayOnScroll: (value ? false : onlyPlayOnScroll) } );
									setRerenderKey( Math.random() );
								} }
							/>
							<ToggleControl
								label={ __( 'Bounce playback', 'gutenam-blocks' ) }
								checked={ bouncePlayback }
								onChange={ ( value ) => {
									setAttributes( { bouncePlayback: value, loop: (value ? true : loop), onlyPlayOnScroll: (value ? false : onlyPlayOnScroll) } );
								} }
								help={ __( 'Does not show in preview', 'gutenam-blocks' ) }
							/>
							<RangeControl
								label={ __( 'Delay between loops (seconds)', 'gutenam-blocks' ) }
								value={ delay }
								onChange={ ( value ) => {
									setAttributes( { delay: value } );
								} }
								step={ 0.1 }
								min={ 0 }
								max={ 60 }
							/>
							<RangeControl
								label={ __( 'Limit Loops', 'gutenam-blocks' ) }
								value={ loopLimit }
								onChange={ ( value ) => {
									setAttributes( { loopLimit: value } );
								} }
								step={ 1 }
								min={ 0 }
								max={ 100 }
								help={ __( 'Does not show in preview', 'gutenam-blocks' ) }
							/>
						</BasePanelBody>
					</>
				}

				{ ( activeTab === 'advanced' ) &&
					<>
						<BasePanelBody
							title={ __( 'Size Controls', 'gutenam-blocks' ) }
							panelName={ 'sizeControl' }
							blockSlug={ 'base/lottie' }
						>
							<ResponsiveMeasureRangeControl
								label={ __( 'Padding', 'gutenam-blocks' ) }
								value={ [ previewPaddingTop, previewPaddingRight, previewPaddingBottom, previewPaddingLeft ] }
								tabletValue={ paddingTablet }
								mobileValue={ paddingMobile }
								onChange={ ( value ) => setAttributes( { paddingDesktop: value } ) }
								onChangeTablet={ ( value ) => setAttributes( { paddingTablet: value } ) }
								onChangeMobile={ ( value ) => setAttributes( { paddingMobile: value } ) }
								min={ 0 }
								max={ ( paddingUnit === 'em' || paddingUnit === 'rem' ? 25 : 400 ) }
								step={ ( paddingUnit === 'em' || paddingUnit === 'rem' ? 0.1 : 1 ) }
								unit={ paddingUnit }
								units={ [ 'px', 'em', 'rem', '%' ] }
								onUnit={ ( value ) => setAttributes( { paddingUnit: value } ) }
								onMouseOver={ paddingMouseOver.onMouseOver }
								onMouseOut={ paddingMouseOver.onMouseOut }
							/>
							<ResponsiveMeasureRangeControl
								label={ __( 'Margin', 'gutenam-blocks' ) }
								value={ [ previewMarginTop, previewMarginRight, previewMarginBottom, previewMarginLeft ] }
								tabletValue={ marginTablet }
								mobileValue={ marginMobile }
								onChange={ ( value ) => {
									setAttributes( { marginDesktop: [ value[ 0 ], value[ 1 ], value[ 2 ], value[ 3 ] ] } );
								} }
								onChangeTablet={ ( value ) => setAttributes( { marginTablet: value } ) }
								onChangeMobile={ ( value ) => setAttributes( { marginMobile: value } ) }
								min={ ( marginUnit === 'em' || marginUnit === 'rem' ? -25 : -400 ) }
								max={ ( marginUnit === 'em' || marginUnit === 'rem' ? 25 : 400 ) }
								step={ ( marginUnit === 'em' || marginUnit === 'rem' ? 0.1 : 1 ) }
								unit={ marginUnit }
								units={ [ 'px', 'em', 'rem', '%', 'vh' ] }
								onUnit={ ( value ) => setAttributes( { marginUnit: value } ) }
								onMouseOver={ marginMouseOver.onMouseOver }
								onMouseOut={ marginMouseOver.onMouseOut }
							/>
							<RangeControl
								label={ __( 'Max Width', 'gutenam-blocks' ) }
								value={ width }
								onChange={ ( value ) => setAttributes( { width: value } ) }
								allowReset={ true }
								step={ 1 }
								min={ 25 }
								max={ 1000 }
							/>
							<ToggleControl
								label={ __( 'Use fixed ratio (prevents layout shift)', 'gutenam-blocks' ) }
								checked={ useRatio }
								onChange={ ( value ) => setAttributes( { useRatio: value } ) }
							/>
							{ useRatio && (
								<RangeControl
									label={ __( 'Set Size Ratio (%)', 'gutenam-blocks' ) }
									value={ ratio ? ratio : 100 }
									onChange={ ( value ) => setAttributes( { ratio: value } ) }
									allowReset={ true }
									step={ 1 }
									min={ 0 }
									max={ 100 }
								/>
							) }
						</BasePanelBody>

						<BaseBlockDefaults attributes={attributes} defaultAttributes={metadata['attributes']} blockSlug={ metadata['name'] } excludedAttrs={ nonTransAttrs } />
					</>
				}

			</BaseInspectorControls>
			<div className={ containerClasses } style={ {
				marginTop: ( '' !== previewMarginTop ? getSpacingOptionOutput( previewMarginTop, marginUnit ) : undefined ),
				marginRight: ( '' !== previewMarginRight ? getSpacingOptionOutput( previewMarginRight, marginUnit ) : undefined ),
				marginBottom: ( '' !== previewMarginBottom ? getSpacingOptionOutput( previewMarginBottom, marginUnit ) : undefined ),
				marginLeft: ( '' !== previewMarginLeft ? getSpacingOptionOutput( previewMarginLeft, marginUnit ) : undefined ),

				paddingTop: ( '' !== previewPaddingTop ? getSpacingOptionOutput( previewPaddingTop, paddingUnit ) : undefined ),
				paddingRight: ( '' !== previewPaddingRight ? getSpacingOptionOutput( previewPaddingRight, paddingUnit ) : undefined ),
				paddingBottom: ( '' !== previewPaddingBottom ? getSpacingOptionOutput( previewPaddingBottom, paddingUnit ) : undefined ),
				paddingLeft: ( '' !== previewPaddingLeft ? getSpacingOptionOutput( previewPaddingLeft, paddingUnit ) : undefined ),

				maxWidth: useRatio ? previewMaxWidth : null,
				margin: useRatio ? '0 auto' : null,
			} }>
				{ ( useRatio ) && 
					<div class="bsb-is-ratio-animation" style={ {
						paddingBottom: ratio ? ratio + '%' : '100%',
					} }>
						{ animationContent }
					</div>
				}
				{ ( ! useRatio ) && 
					<>
						{ animationContent }
					</>
				}
			</div>
		</div>
	);
}

export default ( Edit );
