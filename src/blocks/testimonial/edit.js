/**
 * BLOCK: Base Single Testimonial
 *
 */

import metadata from './block.json';
import TestimonialItemWrap from './carousel-item-wrap';
/**
 * Import Icons
 */
import {
    testimonialBubbleIcon,
    alignTopIcon,
    alignMiddleIcon,
    alignBottomIcon,
    testimonialBasicIcon,
    testimonialCardIcon,
    testimonialInLineIcon,
} from '@base/icons';

/**
 * Import External
 */
import {has} from 'lodash';

/**
 * Import Components
 */

import {
    PopColorControl,
    TypographyControls,
    ResponsiveMeasurementControls,
    ResponsiveRangeControls,
    BasePanelBody,
    WebfontLoader,
    BaseIconPicker,
    IconRender,
    BaseMediaPlaceholder,
    MeasurementControls,
    InspectorControlTabs,
    BaseBlockDefaults,
    ResponsiveMeasureRangeControl,
    CopyPasteAttributes,
    SelectParentBlock,
} from '@base/components';

import {
    getPreviewSize,
    BaseColorOutput,
    showSettings,
    setBlockDefaults,
} from '@base/helpers';

/**
 * Internal block libraries
 */
import {__} from '@wordpress/i18n';

import {useEffect, Fragment, useState, useRef} from '@wordpress/element';

import {
    MediaUpload,
    RichText,
    InspectorControls,
    useBlockProps,
    BlockControls,
} from '@wordpress/block-editor';

import {useSelect, useDispatch} from '@wordpress/data';

import {
    Button,
    ButtonGroup,
    Dashicon,
    RangeControl,
    ToggleControl,
    SelectControl,
    Tooltip,
} from '@wordpress/components';

import {
    closeSmall,
    image,
} from '@wordpress/icons';
import classnames from 'classnames';

/**
 * Build the overlay edit
 */
function BaseTestimonials({
        attributes,
        setAttributes,
        className,
        clientId,
        isSelected,
        context,
    }) {

    const {
        uniqueID,
        url,
        id,
        media,
        icon,
        isize,
        istroke,
        ititle,
        color,
        title,
        content,
        name,
        occupation,
        rating,
        sizes,
        tabletIsize,
        mobileIsize,
        inQueryBlock,
    } = attributes;

    const displayContent = context['base/testimonials-displayContent'];
    const displayTitle = context['base/testimonials-displayTitle'];
    const displayRating = context['base/testimonials-displayRating'];
    const displayName = context['base/testimonials-displayName'];
    const displayIcon = context['base/testimonials-displayIcon'];
    const iconStyles = context['base/testimonials-iconStyles'];
    const style = context['base/testimonials-style'];

    const titleFont = context['base/testimonials-titleFont'];

    const displayOccupation = context['base/testimonials-displayOccupation'];
    const displayMedia = context['base/testimonials-displayMedia'];
    const containerMaxWidth = context["base/testimonials-containerMaxWidth"];
    const mediaStyles = context['base/testimonials-mediaStyles'];
    const ratingStyles = context['base/testimonials-ratingStyles'];

    const [activeTab, setActiveTab] = useState('general');

    const {addUniqueID} = useDispatch('baseblocks/data');
    const {isUniqueID, isUniqueBlock, previewDevice} = useSelect(
        (select) => {
            return {
                isUniqueID: (value) => select('baseblocks/data').isUniqueID(value),
                isUniqueBlock: (value, clientId) => select('baseblocks/data').isUniqueBlock(value, clientId),
                previewDevice: select('baseblocks/data').getPreviewDeviceType(),
            };
        },
        [clientId],
    );

    useEffect(() => {

        let smallID = '_' + clientId.substr(2, 9);
        if (!uniqueID) {
            attributes = setBlockDefaults( 'base/testimonial', attributes);

            setAttributes({
                uniqueID: smallID,
            });
            addUniqueID(smallID, clientId);
        } else if (!isUniqueID(uniqueID)) {
            // This checks if we are just switching views, client ID the same means we don't need to update.
            if (!isUniqueBlock(uniqueID, clientId)) {
                attributes.uniqueID = smallID;
                setAttributes({
                    uniqueID: smallID,
                });
                addUniqueID(smallID, clientId);
            }
        } else {
            addUniqueID(uniqueID, clientId);
        }

        if (context && context.queryId && context.postId) {
            if (context.queryId !== inQueryBlock) {
                setAttributes({
                    inQueryBlock: context.queryId,
                });
            }
        } else if (inQueryBlock) {
            setAttributes({
                inQueryBlock: false,
            });
        }
    }, []);

    const previewIconSize = getPreviewSize( previewDevice, ( undefined !== isize ? isize : ''), ( undefined !== tabletIsize ? tabletIsize : ''), ( undefined !== mobileIsize ? mobileIsize : '') );

    const nonTransAttrs = [ 'url', 'media', 'title', 'content' ];

    const blockProps = useBlockProps({});

    const ALLOWED_MEDIA_TYPES = ['image'];

    const renderTestimonialSettings = () => {
        return (
            <>
                <SelectControl
                    label={__('Media Type', 'gutenam-blocks')}
                    value={media}
                    options={[
                        {value: 'image', label: __('Image', 'gutenam-blocks')},
                        {value: 'icon', label: __('Icon', 'gutenam-blocks')},
                    ]}
                    onChange={value => setAttributes({media: value})}
                />
                {'icon' === media && (
                    <Fragment>
                        <BaseIconPicker
                            value={icon}
                            onChange={value => {
                                setAttributes({icon: value});
                            }}
                        />
                        <ResponsiveRangeControls
                            label={__( 'Icon Size', 'gutenam-blocks' )}
                            value={( undefined !== isize ? isize : '' )}
                            onChange={ value => setAttributes( { isize: value } ) }
                            tabletValue={( undefined !== tabletIsize ? tabletIsize : '' )}
                            onChangeTablet={ value => setAttributes( { tabletIsize: value } )}
                            mobileValue={( undefined !== mobileIsize ? mobileIsize : '' )}
                            onChangeMobile={value => setAttributes( { mobileIsize: value } )}
                            min={0}
                            max={300}
                            step={1}
                            unit={'px'}
                            showUnit={true}
                            units={[ 'px' ]}
                        />
                        {icon && 'fe' === icon.substring(0, 2) && (
                            <RangeControl
                                label={__('Line Width', 'gutenam-blocks')}
                                value={istroke}
                                onChange={value => {
                                    setAttributes({istroke: value});
                                }}
                                step={0.5}
                                min={0.5}
                                max={4}
                            />
                        )}
                        <PopColorControl
                            label={__('Icon Color', 'gutenam-blocks')}
                            value={(color ? color : '#555555')}
                            default={'#555555'}
                            onChange={(value) => setAttributes({color: value})}
                        />
                    </Fragment>
                )}
                <RangeControl
                    label={__('Rating', 'gutenam-blocks')}
                    value={rating}
                    onChange={value => {
                        setAttributes({rating: value});
                    }}
                    step={1}
                    min={1}
                    max={5}
                />
            </>
        );
    };

    const renderTestimonialIcon = () => {
        return (
            <div className="bst-svg-testimonial-global-icon-wrap">
                <IconRender
                    className={`bst-svg-testimonial-global-icon bst-svg-testimonial-global-icon-${iconStyles[0].icon}`}
                    name={iconStyles[0].icon} size={iconStyles[0].size}
                    title={(iconStyles[0].title ? iconStyles[0].title : '')}
                    strokeWidth={('fe' === iconStyles[0].icon.substring(0, 2) ? iconStyles[0].stroke : undefined)}
                    style={{
                        color: (iconStyles[0].color ? BaseColorOutput(iconStyles[0].color) : undefined),
                        background: (iconStyles[0].background ? BaseColorOutput(iconStyles[0].background, (undefined !== iconStyles[0].backgroundOpacity ? iconStyles[0].backgroundOpacity : 1)) : undefined),
                    }}/>
            </div>
        );
    };
    const renderTestimonialMedia = () => {

        let urlOutput = url;
        if ( has( sizes, 'thumbnail') ) {
            if (('card' === style && containerMaxWidth > 500) || mediaStyles[0].width > 600) {
                urlOutput = url;
            } else if ('card' === style && containerMaxWidth <= 500 && containerMaxWidth > 100) {
                if (sizes.large && sizes.large.width > 1000) {
                    urlOutput = sizes.large.url;
                }
            } else if ('card' === style && containerMaxWidth <= 100) {
                if (sizes.medium && sizes.medium.width > 200) {
                    urlOutput = sizes.medium.url;
                } else if (sizes.large && sizes.large.width > 200) {
                    urlOutput = sizes.large.url;
                }
            } else if (mediaStyles[0].width <= 600 && mediaStyles[0].width > 100) {
                if (sizes.large && sizes.large.width > 1000) {
                    urlOutput = sizes.large.url;
                }
            } else if (mediaStyles[0].width <= 100 && mediaStyles[0].width > 75) {
                if (sizes.medium && sizes.medium.width > 200) {
                    urlOutput = sizes.medium.url;
                } else if (sizes.large && sizes.large.width > 200) {
                    urlOutput = sizes.large.url;
                }
            } else if (mediaStyles[0].width <= 75) {
                if (sizes.thumbnail && sizes.thumbnail.width > 140) {
                    urlOutput = sizes.thumbnail.url;
                } else if (sizes.medium && sizes.medium.width > 140) {
                    urlOutput = sizes.medium.url;
                } else if (sizes.large && sizes.large.width > 200) {
                    urlOutput = sizes.large.url;
                }
            }
        }

        return (
            <div className="bst-testimonial-media-wrap">
                <div className="bst-testimonial-media-inner-wrap">
                    <div className={'base-testimonial-image-intrisic'}>
                        {'icon' === media && icon && (
                            <IconRender
                                className={`bst-svg-testimonial-icon bst-svg-testimonial-icon-${icon}`}
                                name={icon} size={previewIconSize}
                                title={(ititle ? ititle : '')}
                                strokeWidth={('fe' === icon.substring(0, 2) ? istroke : undefined)}
                                style={{
                                    display: 'flex',
                                    color: (color ? BaseColorOutput(color) : undefined),
                                }}/>
                        )}
                        {'icon' !== media && url && (
                            <>
                                <MediaUpload
                                    onSelect={(media) => {
                                        setAttributes({
                                            id: media.id,
                                            url: media.url,
                                            alt: media.alt,
                                            subtype: media.subtype,
                                            sizes: media.sizes,
                                        });
                                    }}
                                    type="image"
                                    value={(id ? id : '')}
                                    allowedTypes={ALLOWED_MEDIA_TYPES}
                                    render={({open}) => (
                                        <Tooltip text={__('Edit Image', 'gutenam-blocks')}>
                                            <Button
                                                style={{
                                                    backgroundImage: 'url("' + urlOutput + '")',
                                                    backgroundSize: ('card' === style ? mediaStyles[0].backgroundSize : undefined),
                                                    borderRadius: mediaStyles[0].borderRadius + 'px',
                                                }}
                                                className={'bst-testimonial-image'}
                                                onClick={open}
                                            />
                                        </Tooltip>
                                    )}
                                />
                                <Button
                                    label={__('Remove Image', 'gutenam-blocks')}
                                    className={'bst-remove-img bst-testimonial-remove-image'}
                                    onClick={() => {
                                        setAttributes({
                                            id: null,
                                            url: null,
                                            alt: null,
                                            subtype: null,
                                            sizes: null,
                                        });
                                    }}
                                    icon={closeSmall}
                                    showTooltip={true}
                                />
                            </>
                        )}
                        {'icon' !== media && !url && (
                            <Fragment>
                                {'card' === style && (
                                    <BaseMediaPlaceholder
                                        onSelect={media => {
                                            setAttributes({
                                                id: media.id,
                                                url: media.url,
                                                alt: media.alt,
                                                sizes: media.sizes,
                                                subtype: media.subtype,
                                            });
                                        }}
                                        value={''}
                                        allowedTypes={ALLOWED_MEDIA_TYPES}
                                        onSelectURL={(media) => {
                                            if (media !== url) {
                                                setAttributes({
                                                    id: null,
                                                    url: media,
                                                    alt: null,
                                                    sizes: null,
                                                    subtype: null,
                                                });
                                            }
                                        }}
                                        accept="image/*"
                                        className={'base-image-upload'}
                                    />
                                )}
                                {'card' !== style && (
                                    <MediaUpload
                                        onSelect={(media) => {
                                            setAttributes({
                                                id: media.id,
                                                url: media.url,
                                                alt: media.alt,
                                                sizes: media.sizes,
                                                subtype: media.subtype,
                                            });
                                        }}
                                        type="image"
                                        value={''}
                                        allowedTypes={ALLOWED_MEDIA_TYPES}
                                        render={({open}) => (
                                            <Button
                                                className="bst-testimonial-image-placeholder"
                                                aria-label={__('Add Image', 'gutenam-blocks')}
                                                icon={image}
                                                style={{
                                                    borderRadius: mediaStyles[0].borderRadius + 'px',
                                                }}
                                                onClick={open}
                                            />
                                        )}
                                    />
                                )}
                            </Fragment>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const renderTestimonialPreview = (isCarousel = false) => {

        return (
            <div
                className={`bst-testimonial-item-wrap bst-testimonial-item-${uniqueID}`}>
                <div className="bst-testimonial-text-wrap">
                    {displayIcon && iconStyles[0].icon && 'card' !== style && (
                        renderTestimonialIcon()
                    )}
                    {displayMedia && ('card' === style || 'inlineimage' === style) && (
                        renderTestimonialMedia()
                    )}
                    {displayIcon && iconStyles[0].icon && 'card' === style && (
                        renderTestimonialIcon()
                    )}
                    {displayTitle && (
                        <div className="bst-testimonial-title-wrap">
                            <RichText
                                tagName={'h' + titleFont[0].level}
                                value={title}
                                onChange={value => {
                                    setAttributes({title: value});
                                }}
                                placeholder={__('Best product I have ever used!', 'gutenam-blocks')}
                                className={'bst-testimonial-title'}
                            />
                        </div>
                    )}
                    {displayRating && (
                        <div
                            className={`bst-testimonial-rating-wrap bst-testimonial-rating-${rating}`}>
                            <IconRender className={'bst-svg-testimonial-rating-icon bst-svg-testimonial-rating-icon-1'}
                                name={'fas_star'} size={ ( undefined !== ratingStyles?.[0]?.size ? ratingStyles[0].size : '1em' ) }
                                style={{
                                    color: ( undefined !== ratingStyles?.[0]?.color ? BaseColorOutput(ratingStyles[0].color) : undefined ),
                                }}
                            />
                            {rating > 1 && (
                                <IconRender
                                    className={'bst-svg-testimonial-rating-icon bst-svg-testimonial-rating-icon-2'}
                                    name={'fas_star'} size={ ( undefined !== ratingStyles?.[0]?.size ? ratingStyles[0].size : '1em' ) }
                                    style={{
                                        color: ( undefined !== ratingStyles?.[0]?.color ? BaseColorOutput(ratingStyles[0].color) : undefined ),
                                    }}
                                />
                            )}
                            {rating > 2 && (
                                <IconRender
                                    className={'bst-svg-testimonial-rating-icon bst-svg-testimonial-rating-icon-3'}
                                    name={'fas_star'} size={ ( undefined !== ratingStyles?.[0]?.size ? ratingStyles[0].size : '1em' ) }
                                    style={{
                                        color: ( undefined !== ratingStyles?.[0]?.color ? BaseColorOutput(ratingStyles[0].color) : undefined ),
                                    }}
                                />
                            )}
                            {rating > 3 && (
                                <IconRender
                                    className={'bst-svg-testimonial-rating-icon bst-svg-testimonial-rating-icon-4'}
                                    name={'fas_star'} size={ ( undefined !== ratingStyles?.[0]?.size ? ratingStyles[0].size : '1em' ) }
                                    style={{
                                        color: ( undefined !== ratingStyles?.[0]?.color ? BaseColorOutput(ratingStyles[0].color) : undefined ),
                                    }}
                                />
                            )}
                            {rating > 4 && (
                                <IconRender
                                    className={'bst-svg-testimonial-rating-icon bst-svg-testimonial-rating-icon-5'}
                                    name={'fas_star'} size={ ( undefined !== ratingStyles?.[0]?.size ? ratingStyles[0].size : '1em' ) }
                                    style={{
                                        color: ( undefined !== ratingStyles?.[0]?.color ? BaseColorOutput(ratingStyles[0].color) : undefined ),
                                    }}
                                />
                            )}
                        </div>
                    )}
                    {displayContent && (
                        <div className="bst-testimonial-content-wrap">
                            <RichText
                                tagName={'div'}
                                placeholder={__('I have been looking for a product like this for years. I have tried everything and nothing did what I wanted until using this product. I am so glad I found it!', 'gutenam-blocks')}
                                value={content}
                                onChange={value => {
                                    setAttributes({content: value});
                                }}
                                className={'bst-testimonial-content'}
                            />
                        </div>
                    )}
                </div>
                {((displayMedia && ('card' !== style && 'inlineimage' !== style)) || displayOccupation || displayName) && (
                    <div className="bst-testimonial-meta-wrap">
                        {displayMedia && ('card' !== style && 'inlineimage' !== style) && (
                            renderTestimonialMedia()
                        )}
                        <div className="bst-testimonial-meta-name-wrap">
                            {displayName && (
                                <div className="bst-testimonial-name-wrap">
                                    <RichText
                                        tagName={'div'}
                                        placeholder={__('Sophia Reily', 'gutenam-blocks')}
                                        value={name}
                                        onChange={value => {
                                            setAttributes({name: value});
                                        }}
                                        className={'bst-testimonial-name'}
                                    />
                                </div>
                            )}
                            {displayOccupation && (
                                <div className="bst-testimonial-occupation-wrap">
                                    <RichText
                                        tagName={'div'}
                                        placeholder={__('CEO of Company', 'gutenam-blocks')}
                                        value={occupation}
                                        onChange={value => {
                                            setAttributes({occupation: value});
                                        }}
                                        className={'bst-testimonial-occupation'}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    };
    return (
        <TestimonialItemWrap { ...{ attributes, setAttributes, isSelected, clientId, context, previewDevice }}>
            <div {...blockProps}>
                {showSettings('allSettings') && (
                    <>
                        <BlockControls>
                            <CopyPasteAttributes
                                attributes={ attributes }
                                excludedAttrs={ nonTransAttrs }
                                defaultAttributes={ metadata['attributes'] }
                                blockSlug={ metadata['name'] }
                                onPaste={ attributesToPaste => setAttributes( attributesToPaste ) }
                            />
                        </BlockControls>
                        <InspectorControls>
                            <SelectParentBlock
                                clientId={ clientId }
                            />
                            <InspectorControlTabs
                                panelName={'icon'}
                                allowedTabs={[ 'general', 'advanced' ]}
                                setActiveTab={(value) => setActiveTab(value)}
                                activeTab={activeTab}
                            />

                            {(activeTab === 'general') &&

                                <>

                                    {showSettings('individualSettings', 'base/testimonials') && (
                                        <BasePanelBody
                                            title={__('Individual Settings', 'gutenam-blocks')}
                                            initialOpen={true}
                                            panelName={'bsb-testimonials-individual-settings'}
                                        >
                                            {renderTestimonialSettings()}
                                        </BasePanelBody>
                                    )}

                                </>
                            }

                            {( activeTab === 'advanced') && (
                                <>
                                    <BaseBlockDefaults attributes={attributes} defaultAttributes={metadata['attributes']} blockSlug={ metadata['name'] } excludedAttrs={ nonTransAttrs } />
                                </>
                            )}

                        </InspectorControls>
                    </>
                )}

                <>
                    { renderTestimonialPreview( true ) }
                </>
            </div>
        </TestimonialItemWrap>
    );
}

export default BaseTestimonials;
