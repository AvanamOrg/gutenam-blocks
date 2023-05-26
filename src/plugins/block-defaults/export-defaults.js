import { get } from 'lodash';
import {__} from '@wordpress/i18n';
import {
    Fragment,
    useState,
} from '@wordpress/element';

import {
    Button,
    CheckboxControl
} from '@wordpress/components';
import { SafeParseJSON } from '@base/helpers';

function ExportDefaults() {

    const blockDefaults = SafeParseJSON(get(base_blocks_params, ['configuration'], {}), true );
    const blockVisibility = SafeParseJSON(get(base_blocks_params, ['settings'], {}), true );

    const [includeDefaults, setIncludeDefaults] = useState(Object.keys(blockDefaults).length === 0 ? false : true);
    const [includeVisbility, setIncludeVisibility] = useState(Object.keys(blockVisibility).length === 0 ? false : true);

    let exportData = {};

    if( includeVisbility ) {
        exportData.block_visibility = blockVisibility;
    }

    if( includeDefaults ) {
        exportData.block_defaults = blockDefaults;
    }

    const downloadName = 'base_blocks_defaults' + '.json';
    const downloadData = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData));

    return (
        <Fragment>

            <p>{__('Create an export of block default settings that can be imported into another site.', 'gutenam-blocks')}</p>

            <CheckboxControl
                label={__('Include Block Defaults', 'gutenam-blocks')}
                checked={includeDefaults}
                onChange={(value) => setIncludeDefaults(value)}
                disabled={ Object.keys(blockDefaults).length === 0 }
                help={ Object.keys(blockDefaults).length === 0 ? __('No custom defaults to export.', 'gutenam-blocks') : '' }
            />

            <CheckboxControl
                label={__('Include Block Visibility', 'gutenam-blocks')}
                checked={includeVisbility}
                onChange={(value) => setIncludeVisibility(value)}
                disabled={ Object.keys(blockVisibility).length === 0 }
                help={ Object.keys(blockVisibility).length === 0 ? __('No custom visibility settings to export.', 'gutenam-blocks') : '' }
            />

            <Button
                href={'data:' + downloadData}
                download={ downloadName}
                isPrimary={true}
                disabled={ !includeDefaults && !includeVisbility }
            >
                { __('Download Export', 'gutenam-blocks' ) }
            </Button>
        </Fragment>
    );
}

export default ExportDefaults;
