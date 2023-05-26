<?php
/**
 * Base Blocks Helper Functions
 *
 * @since   1.8.0
 * @package Base Blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Check if we are in AMP Mode.
 */
function base_blocks_is_not_amp() {
	$not_amp = true;
	if ( function_exists( 'is_amp_endpoint' ) && is_amp_endpoint() ) {
		$not_amp = false;
	}
	return $not_amp;
}

/**
 * Check if we are in a rest api call.
 */
function base_blocks_is_rest() {
	$prefix = rest_get_url_prefix();
	if ( ( defined( 'REST_REQUEST' ) && REST_REQUEST ) || ( isset( $_GET['rest_route'] ) && strpos( $_GET['rest_route'], '/', 0 ) === 0 ) ) {
		return true;
	}
	// (#3).
	global $wp_rewrite;
	if ( $wp_rewrite === null ) {
		$wp_rewrite = new WP_Rewrite();
	}
	// (#4).
	$rest_url = wp_parse_url( trailingslashit( rest_url( ) ) );
	$current_url = wp_parse_url( add_query_arg( array() ) );

	if ( isset( $current_url['path'] ) && isset( $rest_url['path'] ) ) {
		return strpos( $current_url['path'], $rest_url['path'], 0 ) === 0;
	}
	return false;
}

/**
 * Hex to RGBA
 *
 * @param string $hex string hex code.
 * @param number $alpha alpha number.
 */
function base_blocks_hex2rgba( $hex, $alpha ) {
	if ( empty( $hex ) ) {
		return '';
	}
	if ( 'transparent' === $hex ) {
		return $hex;
	}
	$hex = str_replace( '#', '', $hex );
	if ( strlen( $hex ) == 3 ) {
		$r = hexdec( substr( $hex, 0, 1 ) . substr( $hex, 0, 1 ) );
		$g = hexdec( substr( $hex, 1, 1 ) . substr( $hex, 1, 1 ) );
		$b = hexdec( substr( $hex, 2, 1 ) . substr( $hex, 2, 1 ) );
	} else {
		$r = hexdec( substr( $hex, 0, 2 ) );
		$g = hexdec( substr( $hex, 2, 2 ) );
		$b = hexdec( substr( $hex, 4, 2 ) );
	}
	$rgba = 'rgba(' . $r . ', ' . $g . ', ' . $b . ', ' . $alpha . ')';
	return $rgba;
}

/**
 * Check to see if variable contains a number including 0.
 *
 * @access public
 *
 * @param  string $value - the css property.
 * @return boolean
 */
function base_blocks_is_number( &$value ) {
	return isset( $value ) && is_numeric( $value );
}

/**
 * Adds Animate on Scroll attributes to a wrapper args array, if animation attributes are present
 *
 * @param array $attributes The attributes.
 * @param array $wrapper_args The args array to apply aos data to.
 */
function base_apply_aos_wrapper_args( $attributes, &$wrapper_args ) {
	if ( isset( $attributes['baseAnimation'] ) && $attributes['baseAnimation'] ) {
		$wrapper_args['data-aos'] = $attributes['baseAnimation'];
		if ( isset( $attributes['baseAOSOptions'] ) && $attributes['baseAOSOptions'] && isset( $attributes['baseAOSOptions'][0] ) ) {
			$base_aos_options = $attributes['baseAOSOptions'][0];

			if ( isset( $base_aos_options['offset'] ) && $base_aos_options['offset'] ) {
				$wrapper_args['data-aos-offset'] = $base_aos_options['offset'];
			}
			if ( isset( $base_aos_options['duration'] ) && $base_aos_options['duration'] ) {
				$wrapper_args['data-aos-duration'] = $base_aos_options['duration'];
			}
			if ( isset( $base_aos_options['easing'] ) && $base_aos_options['easing'] ) {
				$wrapper_args['data-aos-easing'] = $base_aos_options['easing'];
			}
			if ( isset( $base_aos_options['delay'] ) && $base_aos_options['delay'] ) {
				$wrapper_args['data-aos-delay'] = $base_aos_options['delay'];
			}
			if ( isset( $base_aos_options['once'] ) && '' !== $base_aos_options['once'] ) {
				$wrapper_args['data-aos-once'] = $base_aos_options['once'];
			}
		}
	}

	return $wrapper_args;
}