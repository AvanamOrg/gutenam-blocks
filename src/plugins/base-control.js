import { registerPlugin } from '@wordpress/plugins';
import './editor.scss';
/**
 * Import Icons
 */
import { baseNewIcon } from '@base/icons';
/*
 * Components
 */
import BaseConfig from './base-control-plugin';

registerPlugin( 'base-control', {
	icon: baseNewIcon,
	render: BaseConfig,
} );
