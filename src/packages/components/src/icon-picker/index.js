import {
    Button,
    Popover,
    TextControl,
    PanelBody,
    SelectControl,
    Icon,
} from '@wordpress/components'
import {__} from '@wordpress/i18n'
import { debounce } from 'lodash';
import {applyFilters} from '@wordpress/hooks'
import {useState, useMemo} from '@wordpress/element';
import {default as GenIcon} from '../icons/gen-icon';
import './editor.scss';
import {
	chevronDown,
    closeSmall,
} from '@wordpress/icons';
export default function BaseIconPicker({
    value,
    onChange,
    label,
    placeholder = __( 'Select Icon', 'gutenam-blocks' ),
    showSearch = true,
    renderFunc = null,
    className,
    theme = 'default',
    allowClear = false,
    icons = null,
}) {
    const [popoverAnchor, setPopoverAnchor] = useState();
    const [isVisible, setIsVisible] = useState(false);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');
    const toggleVisible = () => {
        setIsVisible( ! isVisible );
    }
    const debounceToggle = debounce( toggleVisible, 100 );
    const iconNames = useMemo(() => {
        if ( icons ) {
            const iconNames = icons.map(( slug ) => {
                return {value: slug, label: slug}
            });
            return iconNames;
        }
        return applyFilters('base.icon_options_names', base_blocks_params.icon_names);
    }, [base_blocks_params.icon_names, icons ] );
    const iconOptions = useMemo(() => {
        return applyFilters('base.icon_options', {...base_blocks_params_ico.icons, ...base_blocks_params_fa.icons})
    }, [base_blocks_params_ico.icons, base_blocks_params_fa.icons])
    const iconFilterOptions = useMemo(() => {
        let options = Object.keys(iconNames).map((label, index) => {
            return {value: index, label: label}
        })

        return [{value: 'all', label: __('Show All', 'gutenam-blocks')}, ...options]
    }, [base_blocks_params.icon_names])
    const iconRender = ( iconSlug ) => {
        return <GenIcon className={`bst-svg-icon-single-${iconSlug}`} name={iconSlug} icon={iconOptions[iconSlug]}/>
    }
    const iconRenderFunction = renderFunc ? renderFunc : iconRender;
    const results = useMemo(() => {
        let results = {}
        if ( ! icons ) {
            const searchLower = search.toLowerCase();
            Object.keys(iconNames).map((label, groupIndex) => {
                if (filter === 'all' || groupIndex === parseInt(filter)) {
                    {
                        iconNames[label].map((icon, iconIndex) => {
                            const iconLower = icon.toLowerCase();

                            if (search === '' || iconLower.includes(searchLower)) {

                                results = {
                                    ...results, [groupIndex]: {
                                        label: label,
                                        icons: {...results[groupIndex]?.icons, [icon]: iconOptions[icon]}
                                    }
                                }

                                return icon
                            }
                        })
                    }
                }
            })
        }
        return results
    }, [search, filter])

    return (
        <div className={'base-icon-picker'}>
            <div className={ `base-icon-picker-selection base-icon-picker-theme-${ theme ? theme : 'default' }${ className ? ' ' + className : '' }`}>
                { label && (
                    <div className="base-icon-picker__title">
                        <label className="components-base-control__label">{ label }</label>
                    </div>
                ) }
                <div className='base-icon-picker-toggle-wrap'>
                    <button
                        onClick={ () => debounceToggle() }
                        ref={ setPopoverAnchor }
                        className={'base-icon-picker-link base-icon-picker-selection-toggle'}
                    >
                        <span className={ `base-icon-picker-selection-value${ ! value ? ' base-icon-picker-placeholder' : '' }` }>{ value ? iconRenderFunction( value ) : placeholder }</span>
                        <span className='base-icon-picker-selection-arrow'><Icon icon={ chevronDown }></Icon></span>
                    </button>
                    { value && allowClear && (
                        <button className='base-icon-picker-clear' onClick={ () => { onChange(''); setIsVisible( false ); } }><Icon icon={ closeSmall }></Icon></button> 
                    ) }
                </div>
            </div>

            {isVisible &&
                <Popover
                    headerTitle={ __('Select Icon', 'gutenam-blocks') }
                    noArrow={false}
                    // expandOnMobile={true}
                    onClose={debounceToggle}
                    placement="bottom-end"
                    anchor={popoverAnchor}
                    className={ `base-icon-picker-pop-selection base-icon-picker-pop-theme-${ theme ? theme : 'default' }`}
                >
                    <div className="base-icon-picker-container">
                        { showSearch && (
                            <div className={'base-icon-picker-search'}>
                                <TextControl
                                    label={__('Search Icons', 'gutenam-blocks')}
                                    hideLabelFromVision={ true }
                                    value={search}
                                    placeholder={__('Search Icons', 'gutenam-blocks')}
                                    onChange={(value) => setSearch(value)}
                                />
                                <SelectControl
                                    label={__('Filter Icons', 'gutenam-blocks')}
                                    hideLabelFromVision={ true }
                                    value={filter}
                                    options={iconFilterOptions}
                                    onChange={value => {
                                        setFilter(value)
                                    }}
                                />
                            </div>
                        ) }
                        <div className={`base-icon-picker-content${ showSearch ? ' has-search' : '' }`}>
                            { icons && (
                               <div className='base-icon-grid-wrap'>
                                { (icons).map((iconKey) => {
                                    return (
                                        <button
                                            className={'base-icon-picker-link'}
                                            onClick={() => {
                                                onChange(iconKey);
                                                debounceToggle();
                                            }}
                                        >
                                            { iconRenderFunction( iconKey ) }
                                        </button>
                                    )
                                })}
                            </div>
                            ) }
                            { ! icons && (
                                <>
                                    {Object.keys(results).length === 0 &&
                                        <div style={ { padding: '15px' } }>
                                            <p>{__('No icons found', 'gutenam-blocks')}</p>
                                        </div>
                                    }
                                    {Object.keys(results).map((groupKey) => {
                                        return (
                                            <PanelBody
                                                title={results[groupKey].label}
                                            >
                                                <div className='base-icon-grid-wrap'>
                                                    {Object.keys(results[groupKey].icons).map((iconKey) => {
                                                        return (
                                                            <button
                                                                className={'base-icon-picker-link'}
                                                                onClick={() => {
                                                                    onChange(iconKey);
                                                                    debounceToggle();
                                                                }}
                                                            >
                                                                { iconRenderFunction( iconKey ) }
                                                            </button>
                                                        )
                                                    })}
                                                </div>

                                            </PanelBody>
                                        )
                                    })}
                                </>
                            )}
                        </div>
                    </div>
                </Popover>
            }
        </div>
    )
}
