import {useEffect, useState} from '@wordpress/element';
import {useSelect} from '@wordpress/data';
import BasePanelBody from '../panel-body/index.js';
import {__} from "@wordpress/i18n";
import {omit, head, get, isEqual} from 'lodash';
import {useDispatch} from '@wordpress/data';
import {store as noticesStore} from '@wordpress/notices';
import {
    Button,
    Modal,
    __experimentalConfirmDialog as ConfirmDialog
} from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { 
    SafeParseJSON,
    getTransferableAttributes 
} from '@base/helpers'
/**
 * Display Base Block Default settings -- intended for use in Inspector Controls.
 *
 * @param {object} attributes Block attributes.
 * @param {object} defaultAttributes The blocks default attributs for comparison on what is new.
 * @param {string} blockSlug Block slug.
 * @param {object} attributeNamePair Key value pair of attribute name and attribute label.
 * @param {array} excludedAttrs Keys to exclude from saved block defaults. An array of strings.
 * @param {array} preventMultiple Keys that should not have more than one subitem. An array of strings.
 *
 * @public
 */
export default function BaseBlockDefaults( {
    attributes,
    defaultAttributes = {},
    blockSlug,
    excludedAttrs = [],
    preventMultiple = []
} ) {

	const [ user, setUser ] = useState( ( base_blocks_params.userrole ? base_blocks_params.userrole : 'admin' ) );
	if( user !== 'admin' ) {
		return null;
	}

	const alwaysExclude = [ 'uniqueID', 'inQueryBlock', 'anchor' ];

	const {createErrorNotice} = useDispatch(noticesStore);

	const [isOpenResetConfirm, setIsOpenResetConfirm] = useState(false);
	const [isOpenSaveConfirm, setIsOpenSaveConfirm] = useState(false);
	const [isOpenModify, setIsOpenModify] = useState(false);

	const currentDefaults = SafeParseJSON(get(base_blocks_params, ['configuration'], {}), true );
	const currentBlockDefaults = get(currentDefaults, blockSlug, {});

	const [tmpDefaults, setTmpDefaults] = useState(currentBlockDefaults);
	const hasConfig = Object.keys(currentBlockDefaults).length !== 0;

	const calculate = () => {
        //grab all block attributes, minus the exclusions
		return getTransferableAttributes( attributes, defaultAttributes, excludedAttrs, preventMultiple );
	}

    const reset = () => {
        let config = (base_blocks_params.configuration ? SafeParseJSON(base_blocks_params.configuration, true) : {});
		config = omit(config, blockSlug);

		apiFetch( {
			path: '/wp/v2/settings',
			method: 'POST',
			data: { base_blocks_config_blocks: JSON.stringify(config)},
		} ).then( () => {
			createErrorNotice(__('Block default saved', 'gutenam-blocks'), {
                type: 'snackbar',
            })
            setIsOpenResetConfirm(false);
            base_blocks_params.configuration = JSON.stringify(config);
            setTmpDefaults({});
		});

    }

    const saveAll = () => {

        const newConfig = calculate();

        const config = (base_blocks_params.configuration ? SafeParseJSON(base_blocks_params.configuration, true) : {});
        config[blockSlug] = newConfig;
		apiFetch( {
			path: '/wp/v2/settings',
			method: 'POST',
			data: { base_blocks_config_blocks: JSON.stringify(config)},
		} ).then( () => {
			createErrorNotice(__('Block default saved', 'gutenam-blocks'), {
				type: 'snackbar',
			})
			setIsOpenSaveConfirm(false);
			base_blocks_params.configuration = JSON.stringify(config);
			setTmpDefaults(newConfig);
		});
    }

    const saveModified = () => {

        const config = (base_blocks_params.configuration ? SafeParseJSON(base_blocks_params.configuration, true) : {});
        config[blockSlug] = tmpDefaults;
		apiFetch( {
			path: '/wp/v2/settings',
			method: 'POST',
			data: { base_blocks_config_blocks: JSON.stringify(config)},
		} ).then( () => {
			createErrorNotice(__('Block default saved', 'gutenam-blocks'), {
				type: 'snackbar',
			})
			base_blocks_params.configuration = JSON.stringify(config);
		});
    }

    return (
        <>
            <BasePanelBody
                title={__('Block Defaults', 'gutenam-blocks')}
                initialOpen={false}
                panelName={`bsb-${blockSlug}-defaults`}
            >
                {__('This will set the current block attributes as the default styles for this block type.', 'gutenam-blocks')}&nbsp;
                {__('This will not modify any blocks that have already been created.', 'gutenam-blocks')}&nbsp;
                {__('Block content is not included.', 'gutenam-blocks')}&nbsp;

                <br/><br/>

                <Button isPrimary={true}
                        onClick={() => setIsOpenSaveConfirm(true)}>{__(' Save as default', 'gutenam-blocks')}</Button>

                {hasConfig && (
                    <>
                        <br/><br/>

                        <a href={'#'}
                           onClick={() => setIsOpenModify(true)}>{__('Modify attributes', 'gutenam-blocks')}</a>

                        <a href={'#'} style={{color: 'red', float: 'right'}}
                           onClick={() => setIsOpenResetConfirm(true)}>{__('Reset defaults', 'gutenam-blocks')}</a>
                    </>
                )}

            </BasePanelBody>

            <ConfirmDialog
                isOpen={isOpenResetConfirm}
                onConfirm={() => reset()}
                onCancel={() => setIsOpenResetConfirm(false)}
            >
                {__('Are you sure you\'d like to reset this blocks default attributes?', 'gutenam-blocks')}
            </ConfirmDialog>

            <ConfirmDialog
                isOpen={isOpenSaveConfirm}
                onConfirm={() => saveAll()}
                onCancel={() => setIsOpenSaveConfirm(false)}
            >
                {__('Are you sure you\'d like to save this as the blocks default attributes?', 'gutenam-blocks')}
            </ConfirmDialog>

            {isOpenModify ?
                <Modal
                    className="bst-block-defaults-modal"
                    title={__('Modify Block Defaults', 'gutenam-blocks')}
                    onRequestClose={() => {
                        setTmpDefaults(currentBlockDefaults);
                        setIsOpenModify(false);
                    }}>

                    {
                        Object.keys(tmpDefaults).map((key, i) => {

                            return (
                                <>
                                    <div key={i} style={ { marginBottom: '10px' } }>
                                        <Button onClick={() => setTmpDefaults(omit(tmpDefaults, key))}>
                                            <span className="dashicons dashicons-trash"></span>
                                        </Button>
                                        <span style={{verticalAlign: 'super'}}>{key}</span>
                                    </div>
                                </>
                            )
                        })
                    }

                    <div className="bsb-modal-footer">
                        <Button className="bst-defaults-save" isDestructive
                                disabled={false}
                                onClick={() => {
                                    setTmpDefaults(currentBlockDefaults);
                                    setIsOpenModify(false);
                                }}>
                            {__('Cancel', 'gutenam-blocks')}
                        </Button>

                        <Button className="bst-defaults-save" isPrimary onClick={() => {
                            saveModified();
                            setIsOpenModify(false);
                        }}>
                            {__('Save', 'gutenam-blocks')}
                        </Button>
                    </div>
                </Modal>
                : null}
        </>
    );
}