import {map, get, uniqueId, findIndex} from 'lodash';
import {AdvancedColorControlPalette} from '@base/components';
import {
    Component,
    Fragment,
    useEffect,
    useState
} from '@wordpress/element';
import {
    ToggleControl,
    Dashicon,
    Button,
    Tooltip,
} from '@wordpress/components';
import {withSelect, withDispatch} from '@wordpress/data';
import {compose} from '@wordpress/compose';
import {useDispatch} from '@wordpress/data';
import {store as noticesStore} from '@wordpress/notices';

const bbColorUniqueIDs = [];
/**
 * Internal block libraries
 */
import {__, sprintf} from '@wordpress/i18n';

function BaseColorDefault(props) {

    const [isSaving, setIsSaving] = useState(false);
    const [baseColors, setBaseColors] = useState((base_blocks_params.colors ? JSON.parse(base_blocks_params.colors) : {
        palette: [],
        override: false
    }));
    const [colors, setColors] = useState('');
    const [themeColors, setThemeColors] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [classSat, setClassSat] = useState('first');
    const {createErrorNotice} = useDispatch(noticesStore);

    useEffect(() => {
        if (!colors) {
            setColors(props.baseColors);
        }

        if (undefined !== baseColors.palette && undefined !== baseColors.palette[0]) {
            map(baseColors.palette, ({slug}) => {
                const theID = slug.substring(11);
                bbColorUniqueIDs.push(theID);
            });
            if (undefined !== baseColors.override && true === baseColors.override) {
                setShowMessage(true);
            }
        }
    }, []);

    const saveConfig = () => {
        if (false === isSaving) {
            setIsSaving(true);
            const config = baseColors;
            const settingModel = new wp.api.models.Settings({base_blocks_colors: JSON.stringify(config)});
            settingModel.save().then(response => {
                createErrorNotice(__('Block defaults saved!', 'gutenam-blocks'), {
                    type: 'snackbar',
                });

                setIsSaving(false);
                setBaseColors(config);

                base_blocks_params.colors = JSON.stringify(config);

                props.updateSettings({colors: colors});
            });
        }
    }
    const saveBaseColors = (value, index) => {

        const newItems = baseColors.palette.map((item, thisIndex) => {
            if (parseInt(index) === parseInt(thisIndex)) {
                item = {...item, ...value};
            }

            return item;
        });
        const newPal = baseColors;
        newPal.palette = newItems;

		setBaseColors(newPal);
    }

    const saveColors = (value, index) => {
        const newItems = colors.map((item, thisIndex) => {
            if (parseInt(index) === parseInt(thisIndex)) {
                item = {...item, ...value};
            }

            return item;
        });

		setColors(newItems);
    }


    const colorRemove = (undefined !== baseColors.override && true === baseColors.override ? 1 : 0);
    return (
        <div className="bst-block-default-palette">
            {colors && (
                <div className={`components-color-palette palette-comp-${classSat}`}>
                    {classSat === 'first' && (
                        Object.keys(colors).map((index) => {
                            let editable = false;
                            let theIndex;
                            const color = colors[index].color;
                            const name = colors[index].name;
                            const slug = colors[index].slug;
                            if (undefined !== slug && slug.substr(0, 10) === 'bsb-palette') {
                                theIndex = findIndex(baseColors.palette, (c) => c.slug === slug);
                                editable = true;
                            }
                            const style = {color};
                            return (
                                <div key={index} className="components-color-palette__item-wrapper">
                                    {editable && undefined !== theIndex && baseColors.palette[theIndex].color && (
                                        <AdvancedColorControlPalette
                                            nameValue={(baseColors.palette[theIndex].name ? baseColors.palette[theIndex].name : __('Color') + ' ' + theIndex + 1)}
                                            colorValue={(baseColors.palette[theIndex].color ? baseColors.palette[theIndex].color : '#ffffff')}
                                            onSave={(value, title) => {
                                                saveBaseColors({
                                                    color: value,
                                                    name: title,
                                                    slug: slug
                                                }, theIndex);

                                                saveColors({color: value, name: title, slug: slug}, index);

                                                saveConfig();
                                            }}
                                        />
                                    )}
                                    {!editable && (
                                        <Tooltip
                                            text={name ||
                                                // translators: %s: color hex code e.g: "#f00".
                                                sprintf(__('Color code: %s'), color)
                                            }>
                                            <div className="components-color-palette__item" style={style}>
                                                <Dashicon icon="lock"/>
                                            </div>
                                        </Tooltip>
                                    )}
                                </div>
                            );
                        })
                    )}
                    {classSat === 'second' && (
                        Object.keys(colors).map((index) => {
                            let editable = false;
                            let theIndex;
                            const color = colors[index].color;
                            const name = colors[index].name;
                            const slug = colors[index].slug;
                            if (undefined !== slug && slug.substr(0, 10) === 'bsb-palette') {
                                theIndex = findIndex(baseColors.palette, (c) => c.slug === slug);
                                editable = true;
                            }
                            const style = {color};
                            return (
                                <div key={index} className="components-color-palette__item-wrapper">
                                    {editable && undefined !== theIndex && baseColors.palette[theIndex].color && (
                                        <AdvancedColorControlPalette
                                            nameValue={(baseColors.palette[theIndex].name ? baseColors.palette[theIndex].name : __('Color') + ' ' + theIndex + 1)}
                                            colorValue={(baseColors.palette[theIndex].color ? baseColors.palette[theIndex].color : '#ffffff')}
                                            onSave={(value, title) => {
                                                saveBaseColors({
                                                    color: value,
                                                    name: title,
                                                    slug: slug
                                                }, theIndex);
                                                saveColors({color: value, name: title, slug: slug}, index);
                                                saveConfig();
                                            }}
                                        />
                                    )}
                                    {!editable && (
                                        <Tooltip
                                            text={name ||
                                                // translators: %s: color hex code e.g: "#f00".
                                                sprintf(__('Color code: %s'), color)
                                            }>
                                            <div className="components-color-palette__item" style={style}>
                                                <Dashicon icon="lock"/>
                                            </div>
                                        </Tooltip>
                                    )}
                                </div>
                            );
                        })
                    )}
                    {undefined !== baseColors.palette && undefined !== baseColors.palette[colorRemove] && !props.disableCustomColors && (
                        <div className="bst-colors-remove-last">
                            <Tooltip text={__('Remove Last Color')}>
                                <Button
                                    type="button"
                                    isDestructive
                                    onClick={() => {
                                        const removeKey = baseColors.palette.length - 1;
                                        const removeItem = (undefined !== baseColors.palette[removeKey] ? baseColors.palette[removeKey] : baseColors.palette[removeKey]);
                                        baseColors.palette.pop();
                                        const theColorIndex = findIndex(colors, (c) => c.slug === removeItem.slug);
                                        colors.splice(theColorIndex, 1);
										setBaseColors(baseColors);
										setColors(colors);
                                        saveConfig();
                                    }}
                                    aria-label={__('Remove Last Color')}
                                >
                                    <Dashicon icon="editor-removeformatting"/>
                                </Button>
                            </Tooltip>
                        </div>
                    )}
                </div>
            )}
            {!props.disableCustomColors && (
                <div className="bst-colors-add-new">
                    <Button
                        type="button"
                        className={isSaving ? 'bsb-add-btn-is-saving' : 'bsb-add-btn-is-active'}
                        isPrimary
                        disabled={isSaving}
                        onClick={() => {
                            if (isSaving) {
                                return;
                            }
                            if (undefined === baseColors.palette) {
                                baseColors.palette = [];
                            }
                            let id = uniqueId();
                            if (bbColorUniqueIDs.includes(id)) {
                                id = baseColors.palette.length.toString();
                                if (bbColorUniqueIDs.includes(id)) {
                                    id = uniqueId(id);
                                    if (bbColorUniqueIDs.includes(id)) {
                                        id = uniqueId(id);
                                        if (bbColorUniqueIDs.includes(id)) {
                                            id = uniqueId(id);
                                            if (bbColorUniqueIDs.includes(id)) {
                                                id = uniqueId(id);
                                                if (bbColorUniqueIDs.includes(id)) {
                                                    id = uniqueId(id);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            bbColorUniqueIDs.push(id);
                            baseColors.palette.push({
                                color: '#888888',
                                name: __('Color') + ' ' + (id),
                                slug: 'bsb-palette-' + id,
                            });
                            colors.push({
                                color: '#888888',
                                name: __('Color') + ' ' + (id),
                                slug: 'bsb-palette-' + id,
                            });

							setBaseColors(baseColors);
							setColors( colors );
                            saveConfig();
                        }}
                        aria-label={__('Add Color')}
                    >
                        {__('Add Color')}
                    </Button>
                </div>
            )}
            {undefined !== baseColors.palette && undefined !== baseColors.palette[0] && !props.disableCustomColors && (
                <Fragment>
                    <ToggleControl
                        label={__('Use only Base Blocks Colors?')}
                        checked={(undefined !== baseColors.override ? baseColors.override : false)}
                        onChange={(value) => {
                            let newColors;
                            const newBaseColors = baseColors;
                            if (true === value) {
                                newColors = newBaseColors.palette;
                                newBaseColors.override = true;
                            } else {
                                newBaseColors.override = false;
                                newColors = newBaseColors.palette;

								setShowMessage( true );
                            }
							setBaseColors( newBaseColors );
							setColors( newColors );
                            saveConfig();
                        }}
                    />
                    {undefined !== baseColors.override && false === baseColors.override && true === showMessage && (
                        <p className="bsb-colors-show-notice">{__('Refresh page to reload theme defined colors')}</p>
                    )}
                </Fragment>
            )}
        </div>
    );
}

export default compose([
    withSelect((select, ownProps) => {
        const {getSettings} = select('core/block-editor');
        const settings = getSettings();
        return {
            baseColors: get(settings, ['colors'], []),
            disableCustomColors: settings.disableCustomColors !== undefined ? settings.disableCustomColors : false,
        };
    }),
    withDispatch((dispatch) => {
        const {
            updateSettings,
        } = dispatch('core/block-editor');
        return {
            updateSettings,
        };
    }),
])(BaseColorDefault);
