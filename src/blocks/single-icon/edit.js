/**
 * BLOCK: Base Icon
 */
/**
 * Import externals
 */
import {
    PopColorControl,
    BasePanelBody,
    URLInputControl,
    ResponsiveRangeControls,
    InspectorControlTabs,
    RangeControl,
    BaseRadioButtons,
    BaseInspectorControls,
    BaseBlockDefaults,
    BaseIconPicker,
    CopyPasteAttributes,
} from '@base/components';
import {
    BaseColorOutput,
	setBlockDefaults,
	getUniqueId,
	getInQueryBlock,
} from '@base/helpers';
import { useSelect, useDispatch } from '@wordpress/data';
import { PreviewIcon } from './preview-icon';
import { AdvancedSettings } from './advanced-settings';


import metadata from './block.json';

/**
 * Internal block libraries
 */
import { __ } from '@wordpress/i18n';

import {
    useBlockProps,
    BlockControls,
} from '@wordpress/block-editor';
import {
    useEffect,
    useState
} from '@wordpress/element';
import {
    TextControl,
} from '@wordpress/components';

function BaseSingleIcon( { attributes, className, setAttributes, clientId, isSelected, name, context } ) {

    const {
        inQueryBlock,
        icon,
        link,
        target,
        size,
        width,
        title,
        text,
        hColor,
        hBackground,
        tabletSize,
        hBorder,
        color,
        background,
        border,
        borderRadius,
        padding,
        borderWidth,
        style,
        linkTitle,
        level,
        tabletPadding,
        mobilePadding,
        paddingUnit,
        tabletMargin,
        mobileMargin,
        margin,
        marginUnit,
        mobileSize,
        uniqueID
    } = attributes;

    const icons = {
        icon,
        link,
        target,
        title,
        size,
        width,
        text,
        color,
        background,
        hColor,
        hBackground,
        hBorder,
        border,
        borderRadius,
        linkTitle,
        padding,
        tabletSize,
        borderWidth,
        tabletMargin,
        mobileSize,
        style,
        level
    };

    const nonTransAttrs = ['icon', 'link', 'target' ];

    const [ activeTab, setActiveTab ] = useState( 'general' );

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

    useEffect( () => {
		setBlockDefaults( 'base/single-icon', attributes );

		let uniqueId = getUniqueId( uniqueID, clientId, isUniqueID, isUniqueBlock );
		if ( uniqueId !== uniqueID ) {
			attributes.uniqueID = uniqueId;
			setAttributes( { uniqueID: uniqueId } );
			addUniqueID( uniqueId, clientId );
		} else {
			addUniqueID( uniqueID, clientId );
		}

		setAttributes( { inQueryBlock: getInQueryBlock( context, inQueryBlock ) } );
    }, [] );

    const blockProps = useBlockProps( {
        className: className,
    } );

    const renderCSS = (
        <style>
            {`.wp-block-base-single-icon .bst-svg-item-${uniqueID}:hover .bst-svg-icon {
					${( undefined !== hColor && hColor ? 'color:' + BaseColorOutput( hColor ) + '!important;' : '' )}
            }
            .wp-block-base-single-icon .bst-svg-style-stacked.bst-svg-item-${uniqueID}:hover .bst-svg-icon {
					${( undefined !== hBackground && hBackground ? 'background:' + BaseColorOutput( hBackground ) + '!important;' : '' )}
					${( undefined !== hBorder && hBorder ? 'border-color:' + BaseColorOutput( hBorder ) + '!important;' : '' )}
            }`}
        </style>
    );

    return (
        <div {...blockProps}>
            {renderCSS}
            <BlockControls>
                <CopyPasteAttributes
                    attributes={ attributes }
                    excludedAttrs={ nonTransAttrs }
                    defaultAttributes={ metadata['attributes'] }
                    blockSlug={ metadata['name'] }
                    onPaste={ attributesToPaste => setAttributes( attributesToPaste ) }
                />
            </BlockControls>
            <BaseInspectorControls blockSlug={ 'base/icon' }>

                <InspectorControlTabs
                    panelName={ 'single-icon' }
                    allowedTabs={ [ 'general', 'advanced' ] }
                    setActiveTab={ ( value ) => setActiveTab( value ) }
                    activeTab={ activeTab }
                />

                {( activeTab === 'general' ) &&
                    <>
                        <BasePanelBody
                            title={__( 'Icon Settings', 'gutenam-blocks' )}
                            initialOpen={ true }
                            panelName={'bsb-icon-settings'}
                        >

                            <BaseIconPicker
                                value={icon}
                                onChange={value => {
                                    setAttributes( { icon: value } );
                                }}
                            />

                            <ResponsiveRangeControls
                                label={__( 'Icon Size', 'gutenam-blocks' )}
                                value={size ? size : ''}
                                onChange={value => {
                                    setAttributes( { size: value } );
                                }}
                                tabletValue={ ( undefined !== tabletSize ? tabletSize : '' ) }
                                onChangeTablet={( value ) => {
                                    setAttributes( { tabletSize: value } );
                                }}
                                mobileValue={( undefined !== mobileSize ? mobileSize : '' )}
                                onChangeMobile={( value ) => {
                                    setAttributes( { mobileSize: value } );
                                }}
                                min={ 0 }
                                max={ 300 }
                                step={1}
                                unit={'px'}
                            />
                            { icon && 'fe' === icon.substring( 0, 2 ) && (
                                <RangeControl
                                    label={__( 'Line Width' )}
                                    value={width}
                                    onChange={value => {
                                        setAttributes( { width: value } );
                                    }}
                                    step={0.5}
                                    min={0.5}
                                    max={4}
                                />
                            ) }

                            <BaseRadioButtons
                                label={__( 'Icon Style', 'gutenam-blocks' )}
                                value={style}
                                options={[
                                    { value: 'default', label: __( 'Default', 'gutenam-blocks' ) },
                                    { value: 'stacked', label: __( 'Stacked', 'gutenam-blocks' ) },
                                ]}
                                onChange={value => setAttributes( { style: value } )}
                            />
                            <PopColorControl
                                label={ __( 'Icon Color', 'gutenam-blocks' ) }
                                value={ ( color ? color : '' ) }
                                default={''}
                                onChange={ value => {
                                    setAttributes( { color: value } );
                                } }
                                swatchLabel2={ __( 'Hover Color', 'gutenam-blocks' ) }
                                value2={( hColor ? hColor : '' )}
                                default2={''}
                                onChange2={value => {
                                    setAttributes( { hColor: value } );
                                }}
                            />
                            {style !== 'default' && (
                                <>
                                    <PopColorControl
                                        label={ __( 'Background Color', 'gutenam-blocks' ) }
                                        value={ ( background ? background : '' ) }
                                        default={''}
                                        onChange={ value => {
                                            setAttributes( { background: value } );
                                        } }
                                        swatchLabel2={ __( 'Hover Background', 'gutenam-blocks' ) }
                                        value2={( hBackground ? hBackground : '' )}
                                        default2={''}
                                        onChange2={value => {
                                            setAttributes( { hBackground: value } );
                                        }}
                                    />
                                    <PopColorControl
                                        label={ __( 'Border Color', 'gutenam-blocks' ) }
                                        value={ ( border ? border : '' ) }
                                        default={''}
                                        onChange={ value => {
                                            setAttributes( { border: value } );
                                        } }
                                        swatchLabel2={ __( 'Hover Border', 'gutenam-blocks' ) }
                                        value2={( hBorder ? hBorder : '' )}
                                        default2={''}
                                        onChange2={value => {
                                            setAttributes( { hBorder: value } );
                                        }}
                                    />
                                    <RangeControl
                                        label={__( 'Border Size (px)', 'gutenam-blocks' )}
                                        value={borderWidth}
                                        onChange={value => {
                                            setAttributes( { borderWidth: value } );
                                        }}
                                        min={0}
                                        max={20}
                                    />
                                    <RangeControl
                                        label={__( 'Border Radius (%)', 'gutenam-blocks' )}
                                        value={borderRadius}
                                        onChange={value => {
                                            setAttributes( { borderRadius: value } );
                                        }}
                                        min={0}
                                        max={50}
                                    />
                                </>
                            ) }
                            <URLInputControl
                                label={__( 'Link', 'gutenam-blocks' )}
                                url={link}
                                onChangeUrl={value => {
                                    setAttributes( { link: value } );
                                }}
                                additionalControls={true}
                                opensInNewTab={( target && '_blank' == target ? true : false )}
                                onChangeTarget={value => {
                                    if ( value ) {
                                        setAttributes( { target: '_blank' } );
                                    } else {
                                        setAttributes( { target: '_self' } );
                                    }
                                }}
                                linkTitle={linkTitle}
                                onChangeTitle={value => {
                                    setAttributes( { linkTitle: value } );
                                }}
                                dynamicAttribute={'link'}
                                allowClear={true}
                                isSelected={ isSelected }
                                attributes={ attributes }
                                setAttributes={ setAttributes }
                                name={ name }
                                clientId={ clientId }
                                context={ context }
                            />
                            <TextControl
                                label={__( 'Title for Accessibility', 'gutenam-blocks' )}
                                value={title}
                                onChange={value => {
                                    setAttributes( { title: value } );
                                }}
                            />
                        </BasePanelBody>

                    </>
                }
                { ( activeTab === 'advanced' ) &&
                    <>
                        <AdvancedSettings attributes={ attributes } setAttributes={ setAttributes } />

                        <BaseBlockDefaults attributes={ attributes } defaultAttributes={ metadata['attributes'] } blockSlug={ metadata['name'] } excludedAttrs={ nonTransAttrs } />
                    </>
                }
            </BaseInspectorControls>

            <PreviewIcon attributes={ attributes } previewDevice={ previewDevice } />
        </div>
    );
}

export default ( BaseSingleIcon );
