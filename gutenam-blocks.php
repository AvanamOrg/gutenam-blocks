<?php
/**
 * Plugin Name: Gutenam Blocks – Page Builder Blocks for Gutenberg
 * Plugin URI: https://avanam.org/gutenam/
 * Description: Gutenam is a collection of page builder blocks for Gutenberg, a true page builder experience with premium blocks.
 * Author: Gutenam
 * Author URI: https://avanam.org
 * Version: 1.0.0
 * Requires PHP: 7.2
 * Text Domain: gutenam-blocks
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package Base Blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'BASE_BLOCKS_PATH', realpath( plugin_dir_path( __FILE__ ) ) . DIRECTORY_SEPARATOR );
define( 'BASE_BLOCKS_URL', plugin_dir_url( __FILE__ ) );
define( 'GUTENAM_BLOCKS_VERSION', '1.0.0' );

/**
 * Add a check before redirecting
 */
function base_blocks_activate() {
	add_option( 'base_blocks_redirect_on_activation', true );
}
register_activation_hook( __FILE__, 'base_blocks_activate' );

/**
 * Load Plugin
 */
function base_blocks_init() {
	require_once BASE_BLOCKS_PATH . 'includes/init.php';
	require_once BASE_BLOCKS_PATH . 'includes/form-ajax.php';
	require_once BASE_BLOCKS_PATH . 'includes/helper-functions.php';
	require_once BASE_BLOCKS_PATH . 'includes/class-base-blocks-google-fonts.php';
	require_once BASE_BLOCKS_PATH . 'includes/class-base-blocks-css.php';
	require_once BASE_BLOCKS_PATH . 'includes/class-base-blocks-frontend.php';
	require_once BASE_BLOCKS_PATH . 'includes/class-base-blocks-table-of-contents.php';
	require_once BASE_BLOCKS_PATH . 'includes/blocks/class-base-blocks-abstract-block.php';

	require_once BASE_BLOCKS_PATH . 'includes/blocks/class-base-blocks-row-layout-block.php';
	require_once BASE_BLOCKS_PATH . 'includes/blocks/class-base-blocks-column-block.php';
	require_once BASE_BLOCKS_PATH . 'includes/blocks/class-base-blocks-accordion-block.php';
	require_once BASE_BLOCKS_PATH . 'includes/blocks/class-base-blocks-advancedgallery-block.php';
	require_once BASE_BLOCKS_PATH . 'includes/blocks/class-base-blocks-advancedbtn-block.php';
	require_once BASE_BLOCKS_PATH . 'includes/blocks/class-base-blocks-singlebtn-block.php';
	require_once BASE_BLOCKS_PATH . 'includes/blocks/class-base-blocks-advanced-heading-block.php';
	require_once BASE_BLOCKS_PATH . 'includes/blocks/class-base-blocks-countdown-block.php';
	require_once BASE_BLOCKS_PATH . 'includes/blocks/class-base-blocks-countup-block.php';
	require_once BASE_BLOCKS_PATH . 'includes/blocks/class-base-blocks-form-block.php';
	require_once BASE_BLOCKS_PATH . 'includes/blocks/class-base-blocks-googlemaps-block.php';
	require_once BASE_BLOCKS_PATH . 'includes/blocks/class-base-blocks-icon-block.php';
	require_once BASE_BLOCKS_PATH . 'includes/blocks/class-base-blocks-single-icon-block.php';
	require_once BASE_BLOCKS_PATH . 'includes/blocks/class-base-blocks-icon-list-block.php';
	require_once BASE_BLOCKS_PATH . 'includes/blocks/class-base-blocks-single-icon-list-block.php';
	require_once BASE_BLOCKS_PATH . 'includes/blocks/class-base-blocks-infobox-block.php';
	require_once BASE_BLOCKS_PATH . 'includes/blocks/class-base-blocks-image-block.php';
	require_once BASE_BLOCKS_PATH . 'includes/blocks/class-base-blocks-lottie-block.php';
	require_once BASE_BLOCKS_PATH . 'includes/blocks/class-base-blocks-posts-block.php';
	require_once BASE_BLOCKS_PATH . 'includes/blocks/class-base-blocks-show-more-block.php';
	require_once BASE_BLOCKS_PATH . 'includes/blocks/class-base-blocks-spacer-block.php';
	require_once BASE_BLOCKS_PATH . 'includes/blocks/class-base-blocks-table-of-contents-block.php';
	require_once BASE_BLOCKS_PATH . 'includes/blocks/class-base-blocks-tabs-block.php';
	require_once BASE_BLOCKS_PATH . 'includes/blocks/class-base-blocks-testimonials-block.php';
	require_once BASE_BLOCKS_PATH . 'includes/blocks/class-base-blocks-testimonial-block.php';

	require_once BASE_BLOCKS_PATH . 'includes/settings/class-base-blocks-settings.php';
	require_once BASE_BLOCKS_PATH . 'includes/class-base-blocks-posts-rest-api.php';
	require_once BASE_BLOCKS_PATH . 'includes/class-mailerlite-form-rest-api.php';
	require_once BASE_BLOCKS_PATH . 'includes/class-fluentcrm-form-rest-api.php';
	require_once BASE_BLOCKS_PATH . 'includes/class-lottieanimation-get-rest-api.php';
	require_once BASE_BLOCKS_PATH . 'includes/class-lottieanimation-post-rest-api.php';
	require_once BASE_BLOCKS_PATH . 'includes/advanced-form/convertkit-rest-api.php';
	require_once BASE_BLOCKS_PATH . 'includes/advanced-form/activecampaign-rest-api.php';
	require_once BASE_BLOCKS_PATH . 'includes/class-base-blocks-svg.php';
}
add_action( 'plugins_loaded', 'base_blocks_init' );

/**
 * Load the plugin textdomain
 */
function base_blocks_lang() {
	load_plugin_textdomain( 'gutenam-blocks', false, basename( dirname( __FILE__ ) ) . '/languages' );
}
add_action( 'init', 'base_blocks_lang' );
