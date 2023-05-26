/**
 * Returns new attributes object with defaults applied.
 */
export default (blockSlug, attributes) => {
    if ( ! attributes.uniqueID ) {
        if ( undefined === attributes.noCustomDefaults || ! attributes.noCustomDefaults ) {
            const oldBlockConfig = base_blocks_params.config && base_blocks_params.config[blockSlug] ? base_blocks_params.config[blockSlug] : undefined;
            const blockConfigObject = (base_blocks_params.configuration ? JSON.parse(base_blocks_params.configuration) : []);
            if (blockConfigObject[blockSlug] !== undefined && typeof blockConfigObject[blockSlug] === 'object') {
                // hack to make icon list block work with old attributes.
                if ( blockSlug === 'base/iconlist' ) {
                    if ( undefined !== blockConfigObject[blockSlug]?.items?.[0]?.icon && blockConfigObject[blockSlug]?.items?.[0]?.icon && ! blockConfigObject[blockSlug]?.icon ) {
                        attributes['icon'] = blockConfigObject[blockSlug]?.items?.[0]?.icon
                    }
                }
                Object.keys(blockConfigObject[blockSlug]).map((attribute) => {
                    attributes[attribute] = blockConfigObject[blockSlug][attribute];
                });
            } else if (oldBlockConfig !== undefined && typeof oldBlockConfig === 'object') {
                Object.keys(oldBlockConfig).map((attribute) => {
                    attributes[attribute] = oldBlockConfig[attribute];
                });
            }
        }
    }

	return attributes;
}
