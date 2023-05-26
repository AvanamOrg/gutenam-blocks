/**
 * BLOCK: Base Icon
 */

/**
 * Import Base Components
 */
import {
    BaseColorOutput,
	setBlockDefaults,
	getUniqueId,
} from '@base/helpers';

import {
    PopColorControl,
    BaseIconPicker,
    IconRender,
    BasePanelBody,
    URLInputControl,
    InspectorControlTabs,
    SelectParentBlock,
} from '@base/components';

import metadata from './block.json';

/**
 * Internal block libraries
 */
import {__} from '@wordpress/i18n';
import {useBlockProps} from '@wordpress/block-editor';
import {createBlock} from '@wordpress/blocks';

import {
    InspectorControls,
    RichText,
    BlockControls,
    store as blockEditorStore,
} from '@wordpress/block-editor';

import {
    useEffect,
    useState,
    useRef
} from '@wordpress/element';

import {
    RangeControl,
    ToggleControl,
    SelectControl,
    ToolbarGroup,
    ToolbarButton
} from '@wordpress/components';

import { useSelect, useDispatch } from '@wordpress/data';
import {formatIndent, formatOutdent} from "@wordpress/icons";

function BaseListItem({attributes, className, setAttributes, clientId, isSelected, name, onReplace, onRemove, mergeBlocks, context}) {

    const {
        uniqueID,
        icon,
        link,
        target,
        size,
        width,
        text,
        color,
        background,
        border,
        borderRadius,
        padding,
        borderWidth,
        style,
        level,
		showIcon
    } = attributes;
    const displayIcon = icon ? icon : context['base/listIcon'];
    const displayWidth = width ? width : context['base/listIconWidth'];
    const [ activeTab, setActiveTab ] = useState( 'general' );
    const { addUniqueID } = useDispatch( 'baseblocks/data' );

    const textRef = useRef( clientId );
	const { isUniqueID, isUniqueBlock } = useSelect(
		( select ) => {
			return {
				isUniqueID: ( value ) => select( 'baseblocks/data' ).isUniqueID( value ),
				isUniqueBlock: ( value, clientId ) => select( 'baseblocks/data' ).isUniqueBlock( value, clientId ),
			};
		},
		[ clientId ]
	);
	useEffect( () => {
		setBlockDefaults( 'base/listitem', attributes );

		let uniqueId = getUniqueId( uniqueID, clientId, isUniqueID, isUniqueBlock );
		if ( uniqueId !== uniqueID ) {
			attributes.uniqueID = uniqueId;
			setAttributes( { uniqueID: uniqueId } );
			addUniqueID( uniqueId, clientId );
		} else {
			addUniqueID( uniqueID, clientId );
		}
	}, [] );

    const blockProps = useBlockProps({
        className: className
    });


    const onMoveLeft = () => {
        let newLevel = level - 1;

        setAttributes({level: Math.max(newLevel, 0)});
    }
    const onMoveRight = () => {
        setAttributes({level: (level + 1)});
    }
    return (
        <div {...blockProps}>
            <BlockControls>
                <ToolbarGroup group="add-indent">

                    <ToolbarButton
                        icon={formatOutdent}
                        title={__('Outdent', 'gutenam-blocks')}
                        describedBy={__('Outdent list item', 'gutenam-blocks')}
                        disabled={level === 0}
                        onClick={() => onMoveLeft()}
                    />
                    <ToolbarButton
                        icon={formatIndent}
                        title={__('Indent', 'gutenam-blocks')}
                        describedBy={__('Indent list item', 'gutenam-blocks')}
                        isDisabled={level === 5}
                        onClick={() => onMoveRight()}
                    />

                </ToolbarGroup>
            </BlockControls>
            <InspectorControls>
                <SelectParentBlock
                    clientId={ clientId }
                />
                <InspectorControlTabs
                    panelName={ 'listitem' }
                    setActiveTab={ ( value ) => setActiveTab( value ) }
                    activeTab={ activeTab }
                />
                { activeTab === 'general' && (
                    <BasePanelBody
                        initialOpen={true}
                        panelName={'bsb-icon-item-settings'}
                    >
                        <URLInputControl
                            label={__('Link', 'gutenam-blocks')}
                            url={link}
                            onChangeUrl={value => {
                                setAttributes({link: value});
                            }}
                            additionalControls={true}
                            opensInNewTab={(target && '_blank' == target ? true : false)}
                            onChangeTarget={value => {
                                if (value) {
                                    setAttributes({target: '_blank'});
                                } else {
                                    setAttributes({target: '_self'});
                                }
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

						<ToggleControl
							label={ __( 'Hide icon', 'gutenam-blocks' ) }
							checked={ !showIcon }
							onChange={ ( value ) => { setAttributes( { showIcon: !value } ); } }
						/>

						{ showIcon && (
							<BaseIconPicker
								value={icon}
								onChange={value => {
									setAttributes({icon: value});
								}}
								allowClear={ true }
								placeholder={ __( 'Select Icon', 'gutenam-blocks' ) }
							/>
						) }
                    </BasePanelBody>
                ) }
                { activeTab === 'style' && (
                    <BasePanelBody
                        initialOpen={true}
                        panelName={'bsb-icon-item'}
                    >
                        <RangeControl
                            label={__('Icon Size', 'gutenam-blocks')}
                            value={size}
                            onChange={value => {
                                setAttributes({size: value});
                            }}
                            min={0}
                            max={250}
                        />
                        {displayIcon && 'fe' === displayIcon.substring(0, 2) && (
                            <RangeControl
                                label={__('Line Width', 'gutenam-blocks')}
                                value={width}
                                onChange={value => {
                                    setAttributes({width: value});
                                }}
                                step={0.5}
                                min={0.5}
                                max={4}
                            />
                        )}
                        <PopColorControl
                            label={__('Icon Color', 'gutenam-blocks')}
                            value={(color ? color : '')}
                            default={''}
                            onChange={value => {
                                setAttributes({color: value});
                            }}
                        />
                        <SelectControl
                            label={__('Icon Style', 'gutenam-blocks')}
                            value={style}
                            options={[
                                { value: '', label: __( 'Inherit', 'gutenam-blocks' ) },
                                { value: 'default', label: __( 'Default', 'gutenam-blocks' ) },
                                { value: 'stacked', label: __( 'Stacked', 'gutenam-blocks' ) },
                            ]}
                            onChange={value => {
                                setAttributes({style: value});
                            }}
                        />
                        {style === 'stacked' && (
                            <PopColorControl
                                label={ __( 'Icon Background', 'gutenam-blocks' ) }
                                value={ ( background ? background : '' ) }
                                default={ '' }
                                onChange={ value => {
                                    setAttributes( { background: value } );
                                } }
                            />
                        )}
                        {style === 'stacked' && (
                            <PopColorControl
                                label={ __( 'Border Color', 'gutenam-blocks' ) }
                                value={ ( border ? border : '' ) }
                                default={''}
                                onChange={ value => {
                                    setAttributes( { border: value } );
                                } }
                            />
                        )}
                        {style === 'stacked' && (
                            <RangeControl
                                label={ __( 'Border Size (px)', 'gutenam-blocks' ) }
                                value={borderWidth}
                                onChange={value => {
                                    setAttributes({ borderWidth: value });
                                }}
                                min={0}
                                max={20}
                            />
                        )}
                        {style === 'stacked' && (
                            <RangeControl
                                label={ __( 'Border Radius (%)', 'gutenam-blocks' ) }
                                value={borderRadius}
                                onChange={value => {
                                    setAttributes({ borderRadius: value });
                                }}
                                min={0}
                                max={50}
                            />
                        )}
                        {style === 'stacked' && (
                            <RangeControl
                                label={ __( 'Padding (px)', 'gutenam-blocks' ) }
                                value={ padding }
                                onChange={ value => {
                                    setAttributes( { padding: value } );
                                } }
                                min={0}
                                max={180}
                            />
                        )}
                    </BasePanelBody>
                )}
            </InspectorControls>

            <div
                className={`bst-svg-icon-list-item-wrap bst-svg-icon-list-item-0 bst-svg-icon-list-level-${level}${ style ? ' bst-svg-icon-list-style-' + style : '' }`}>
                {displayIcon && showIcon && (
                    <IconRender
                        className={`bst-svg-icon-list-single bst-svg-icon-list-single-${displayIcon}`}
                        name={displayIcon}
                        size={ size ? size : '1em' }
                        strokeWidth={('fe' === displayIcon.substring(0, 2) ? displayWidth : undefined)}
                        style={ {
                            color: (color ? BaseColorOutput(color) : undefined),
                            backgroundColor: (background && style === 'stacked' ? BaseColorOutput(background) : undefined),
                            padding: (padding && style === 'stacked' ? padding + 'px' : undefined),
                            borderColor: (border && style === 'stacked' ? BaseColorOutput(border) : undefined),
                            borderWidth: (borderWidth && style === 'stacked' ? borderWidth + 'px' : undefined),
                            borderRadius: (borderRadius && style === 'stacked' ? borderRadius + '%' : undefined),
                        } }
                    />
                )}

				{!showIcon && size !== 0 && (
					<div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }} className={'bst-svg-icon-list-single'}>
						<svg style={{ display: 'inline-block', verticalAlign: 'middle' }} viewBox={'0 0 24 24'} height={ size ? size : '1em' } width={ size ? size : '1em' } fill={ 'none' }
							 stroke={ displayWidth }
							 preserveAspectRatio={( true ? 'xMinYMin meet' : undefined )}
							 stroke-width={ displayWidth }>
						</svg>
					</div>
				)}

                <RichText
                    tagName="div"
                    ref={ textRef }
					identifier="text"
                    value={text}
                    onChange={value => {
                        setAttributes({text: value});
                    }}
                    onSplit={(value, isOriginal) => {
                        let newAttributes;
                        newAttributes = {...attributes};
                        newAttributes.text = value;
                        if (! isOriginal ) {
                            newAttributes.uniqueID = '';
                            newAttributes.link = '';
                        }

                        const block = createBlock('base/listitem', newAttributes);

                        if (isOriginal) {
                            block.clientId = clientId;
                        }

                        return block;
                    }}
                    onMerge={mergeBlocks}
                    onRemove={onRemove}
                    onReplace={onReplace}
                    className={'bst-svg-icon-list-text'}
                    data-empty={ !text }
                />
            </div>
        </div>
    );
}

export default BaseListItem;
