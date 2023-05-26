/**
 * Internal block libraries
 */
 import { __ } from '@wordpress/i18n';
 
export const BLEND_OPTIONS = [
	{ value: 'normal', label: __( 'Normal', 'gutenam-blocks' ) },
	{ value: 'multiply', label: __( 'Multiply', 'gutenam-blocks' ) },
	{ value: 'screen', label: __( 'Screen', 'gutenam-blocks' ) },
	{ value: 'overlay', label: __( 'Overlay', 'gutenam-blocks' ) },
	{ value: 'darken', label: __( 'Darken', 'gutenam-blocks' ) },
	{ value: 'lighten', label: __( 'Lighten', 'gutenam-blocks' ) },
	{ value: 'color-dodge', label: __( 'Color Dodge', 'gutenam-blocks' ) },
	{ value: 'color-burn', label: __( 'Color Burn', 'gutenam-blocks' ) },
	{ value: 'difference', label: __( 'Difference', 'gutenam-blocks' ) },
	{ value: 'exclusion', label: __( 'Exclusion', 'gutenam-blocks' ) },
	{ value: 'hue', label: __( 'Hue', 'gutenam-blocks' ) },
	{ value: 'saturation', label: __( 'Saturation', 'gutenam-blocks' ) },
	{ value: 'color', label: __( 'Color', 'gutenam-blocks' ) },
	{ value: 'luminosity', label: __( 'Luminosity', 'gutenam-blocks' ) },
];
export const SPACING_SIZES_MAP = [
	{
		value: '0',
		label: __( 'None', 'gutenam-blocks' ),
		size: 0,
		name: __( 'None', 'gutenam-blocks' ),
	},
	{
		value: 'xxs',
		output: 'var(--global-bsb-spacing-xxs, 0.5rem)',
		size: 8,
		label: __( 'XXS', 'gutenam-blocks' ),
		name: __( '2X Small', 'gutenam-blocks' ),
	},
	{
		value: 'xs',
		output: 'var(--global-bsb-spacing-xs, 1rem)',
		size: 16,
		label: __( 'XS', 'gutenam-blocks' ),
		name: __( 'X Small', 'gutenam-blocks' ),
	},
	{
		value: 'sm',
		output: 'var(--global-bsb-spacing-sm, 1.5rem)',
		size: 24,
		label:  __( 'SM', 'gutenam-blocks' ),
		name:  __( 'Small', 'gutenam-blocks' ),
	},
	{
		value: 'md',
		output: 'var(--global-bsb-spacing-md, 2rem)',
		size: 32,
		label:  __( 'MD', 'gutenam-blocks' ),
		name:  __( 'Medium', 'gutenam-blocks' ),
	},
	{
		value: 'lg',
		output: 'var(--global-bsb-spacing-lg, 3rem)',
		size: 48,
		label:  __( 'LG', 'gutenam-blocks' ),
		name:  __( 'Large', 'gutenam-blocks' ),
	},
	{
		value: 'xl',
		output: 'var(--global-bsb-spacing-xl, 4rem)',
		size: 64,
		label:  __( 'XL', 'gutenam-blocks' ),
		name:  __( 'X Large', 'gutenam-blocks' ),
	},
	{
		value: 'xxl',
		output: 'var(--global-bsb-spacing-xxl, 5rem)',
		size: 80,
		label:  __( 'XXL', 'gutenam-blocks' ),
		name:  __( '2X Large', 'gutenam-blocks' ),
	},
	{
		value: '3xl',
		output: 'var(--global-bsb-spacing-3xl, 6.5rem)',
		size: 104,
		label:  __( '3XL', 'gutenam-blocks' ),
		name:  __( '3X Large', 'gutenam-blocks' ),
	},
	{
		value: '4xl',
		output: 'var(--global-bsb-spacing-4xl, 8rem)',
		size: 128,
		label:  __( '4XL', 'gutenam-blocks' ),
		name:  __( '4X Large', 'gutenam-blocks' ),
	},
	{
		value: '5xl',
		output: 'var(--global-bsb-spacing-5xl, 10rem)',
		size: 160,
		label:  __( '5XL', 'gutenam-blocks' ),
		name:  __( '5X Large', 'gutenam-blocks' ),
	},
];

export const PADDING_RESIZE_MAP = [0, 8, 16, 24, 32, 48, 64, 80, 104, 128, 160];