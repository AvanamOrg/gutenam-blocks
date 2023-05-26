/**
 * Internal block libraries
 */
 import { __ } from '@wordpress/i18n';
export const OPTIONS_MAP = [
	{
		value: 'sm',
		output: 'var(--global-bsb-font-size-sm, 0.9rem)',
		size: 14,
		label:  __( 'SM', 'gutenam-blocks' ),
		name:  __( 'Small', 'gutenam-blocks' ),
	},
	{
		value: 'md',
		output: 'var(--global-bsb-font-size-md, 1.2rem)',
		size: 32,
		label:  __( 'MD', 'gutenam-blocks' ),
		name:  __( 'Medium', 'gutenam-blocks' ),
	},
	{
		value: 'lg',
		output: 'var(--global-bsb-font-size-lg, 3rem)',
		size: 48,
		label:  __( 'LG', 'gutenam-blocks' ),
		name:  __( 'Large', 'gutenam-blocks' ),
	},
	{
		value: 'xl',
		output: 'var(--global-bsb-font-size-xl, 4rem)',
		size: 64,
		label:  __( 'XL', 'gutenam-blocks' ),
		name:  __( 'X Large', 'gutenam-blocks' ),
	},
	{
		value: 'xxl',
		output: 'var(--global-bsb-font-size-xxl, 5rem)',
		size: 80,
		label:  __( 'XXL', 'gutenam-blocks' ),
		name:  __( '2X Large', 'gutenam-blocks' ),
	},
];