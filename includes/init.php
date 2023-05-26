<?php
/**
 * Enqueue admin CSS/JS and edit width functions
 *
 * @since   1.0.0
 * @package Base Blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue block assets for backend editor.
 *
 * @since 1.0.0
 */
function base_gutenberg_editor_assets() {
	// If in the frontend, bail out.
	if ( ! is_admin() ) {
		return;
	}
	// Icons Scripts & Styles.
	$base_icons_meta = base_blocks_get_asset_file( 'dist/icons' );
	wp_register_script( 'base-icons', BASE_BLOCKS_URL . 'dist/icons.js', array_merge( $base_icons_meta['dependencies'], array( 'wp-api' ) ), $base_icons_meta['version'], true );
	wp_set_script_translations( 'base-icons', 'gutenam-blocks' );

	$base_base = base_blocks_get_asset_file( 'dist/extension-base-base' );
	wp_register_script( 'base-blocks-js', BASE_BLOCKS_URL . 'dist/extension-base-base.js', array_merge( $base_base['dependencies'], array( 'wp-api' ) ), $base_base['version'], true );
	// Block CSS Scripts & Styles.
	$base_stores_meta = base_blocks_get_asset_file( 'dist/extension-stores' );
	wp_register_script( 'base-extension-stores', BASE_BLOCKS_URL . 'dist/extension-stores.js', array_merge( $base_stores_meta['dependencies'], array( 'wp-api', 'base-blocks-js' ) ), $base_stores_meta['version'], true );
	// wp_register_style( 'base-extension-stores', BASE_BLOCKS_URL . 'dist/extension/stores.css', array( 'wp-edit-blocks' ), $base_stores_meta['version'] );
	wp_set_script_translations( 'base-extension-stores', 'gutenam-blocks' );

	// Helpers Scripts & Styles.
	$base_helpers_meta = base_blocks_get_asset_file( 'dist/helpers' );
	wp_register_script( 'base-helpers', BASE_BLOCKS_URL . 'dist/helpers.js', array_merge( $base_helpers_meta['dependencies'], array( 'wp-api' ) ), $base_helpers_meta['version'], true );
	wp_set_script_translations( 'base-helpers', 'gutenam-blocks' );

	// Components Scripts & Styles.
	$base_components_meta = base_blocks_get_asset_file( 'dist/components' );
	wp_register_script( 'base-components', BASE_BLOCKS_URL . 'dist/components.js', array_merge( $base_components_meta['dependencies'], array( 'wp-api', 'base-extension-stores', 'base-blocks-js' ) ), $base_components_meta['version'], true );
	wp_register_style( 'base-components', BASE_BLOCKS_URL . 'dist/components.css', array( 'wp-edit-blocks' ), $base_components_meta['version'] );
	wp_set_script_translations( 'base-components', 'gutenam-blocks' );

	// Block CSS Scripts & Styles.
	$base_block_css_meta = base_blocks_get_asset_file( 'dist/extension-block-css' );
	wp_register_script( 'base-extension-block-css', BASE_BLOCKS_URL . 'dist/extension-block-css.js', array_merge( $base_block_css_meta['dependencies'], array( 'wp-api', 'base-blocks-js' ) ), $base_block_css_meta['version'], true );
	// wp_register_style( 'base-extension-block-css', BASE_BLOCKS_URL . 'dist/extension/block-css.css', array( 'wp-edit-blocks' ), $base_block_css_meta['version'] );
	wp_set_script_translations( 'base-extension-block-css', 'gutenam-blocks' );

	// Plugin Scripts & Styles.
	$base_control_meta = base_blocks_get_asset_file( 'dist/plugin-base-control' );
	wp_register_script( 'base-blocks-plugin-js', BASE_BLOCKS_URL . 'dist/plugin-base-control.js', array_merge( $base_control_meta['dependencies'], array( 'wp-api', 'base-blocks-js' ) ), $base_control_meta['version'], true );
	wp_register_style( 'base-blocks-plugin-css', BASE_BLOCKS_URL . 'dist/plugin-base-control.css', array( 'wp-edit-blocks', 'base-components' ), $base_control_meta['version'] );
	wp_set_script_translations( 'base-blocks-plugin-js', 'gutenam-blocks' );

	wp_set_script_translations( 'base-blocks-vendor', 'gutenam-blocks' );

	$blocks = array(
		'accordion',
		'advancedbtn',
		'advancedgallery',
		'advancedheading',
		'column',
		'countup',
		'countdown',
		'form',
		'googlemaps',
		'icon',
		'iconlist',
		'image',
		'infobox',
		'lottie',
		'posts',
		'rowlayout',
		'show-more',
		'spacer',
		'tableofcontents',
		'tabs',
		'testimonials',
	);
	foreach ( $blocks as $block ) {
		$meta   = base_blocks_get_asset_file( sprintf( 'dist/blocks-%s', $block ) );
		$handle = sprintf( 'base-blocks-%s', $block );

		$item = wp_register_script( $handle, sprintf( '%sdist/blocks-%s.js', BASE_BLOCKS_URL, $block ), array_merge( $meta['dependencies'], array( 'wp-api', 'base-blocks-js', 'base-extension-stores', 'base-extension-block-css' ) ), $meta['version'], true );
		wp_register_style( $handle, sprintf( '%sdist/blocks-%s.css', BASE_BLOCKS_URL, $block ), array( 'wp-edit-blocks', 'base-components' ), $meta['version'] );
		wp_set_script_translations( $handle, 'gutenam-blocks' );
	}
}
add_action( 'init', 'base_gutenberg_editor_assets', 10 );
/**
 * Checks for base classic themes when returning default.
 */
function base_blocks_show_editor_width() {
	$show = false;
	$current_theme = wp_get_theme();
	$current_theme_name = $current_theme->get( 'Name' );
	$current_theme_template = $current_theme->get( 'Template' );
	// Check for a base classic theme support.
	if ( 'Avanam' == $current_theme_name || 'avanam' == $current_theme_template ) {
		$show = true;
	}
	return $show;
}
/**
 * Enqueue block settings for backend editor.
 */
function base_blocks_gutenberg_editor_assets_variables() {
	$sidebar_size   = 750;
	$nosidebar_size = 1140;
	$jssize         = 2000;
	if ( apply_filters( 'base_blocks_editor_width', base_blocks_show_editor_width() ) ) {
		$editor_widths  = get_option( 'bst_blocks_editor_width', array() );
		if ( ! isset( $editor_widths['enable_editor_width'] ) || 'true' === $editor_widths['enable_editor_width'] ) {
			$add_size = 30;
			$post_type = get_post_type();
			if ( isset( $editor_widths['page_default'] ) && ! empty( $editor_widths['page_default'] ) && isset( $editor_widths['post_default'] ) && ! empty( $editor_widths['post_default'] ) ) {
				if ( isset( $post_type ) && 'page' === $post_type ) {
					$defualt_size_type = $editor_widths['page_default'];
				} else {
					$defualt_size_type = $editor_widths['post_default'];
				}
			} else {
				$defualt_size_type = 'sidebar';
			}
			if ( isset( $editor_widths['sidebar'] ) && ! empty( $editor_widths['sidebar'] ) ) {
				$sidebar_size = $editor_widths['sidebar'] + $add_size;
			} else {
				$sidebar_size = 750;
			}
			if ( isset( $editor_widths['nosidebar'] ) && ! empty( $editor_widths['nosidebar'] ) ) {
				$nosidebar_size = $editor_widths['nosidebar'] + $add_size;
			} else {
				$nosidebar_size = 1140 + $add_size;
			}
			if ( 'sidebar' == $defualt_size_type ) {
				$default_size = $sidebar_size;
			} elseif ( 'fullwidth' == $defualt_size_type ) {
				$default_size = 'none';
			} else {
				$default_size = $nosidebar_size;
			}
			if ( 'none' === $default_size ) {
				$jssize = 2000;
			} else {
				$jssize = $default_size;
			}
		}
		if ( isset( $editor_widths['enable_editor_width'] ) && 'false' === $editor_widths['enable_editor_width'] ) {
			$enable_editor_width = false;
		} else {
			$enable_editor_width = true;
		}
	} else {
		$enable_editor_width = false;
	}
	$userrole = 'none';
	if ( current_user_can( apply_filters( 'base_blocks_admin_role', 'manage_options' ) ) ) {
		$userrole = 'admin';
	} elseif ( current_user_can( apply_filters( 'base_blocks_editor_role', 'delete_others_pages' ) ) ) {
		$userrole = 'editor';
	} elseif ( current_user_can( apply_filters( 'base_blocks_author_role', 'publish_posts' ) ) ) {
		$userrole = 'author';
	} elseif ( current_user_can( apply_filters( 'base_blocks_contributor_role', 'edit_posts' ) ) ) {
		$userrole = 'contributor';
	}
	$pro_data = false;
	if ( class_exists( 'Base_Blocks_Pro' ) ) {
		$pro_data = base_blocks_get_pro_license_data();
	}
	$access_levels = false;
	$level_ids = false;
	if ( function_exists( 'rcp_get_access_levels' ) ) {
		foreach ( rcp_get_access_levels() as $key => $access_level_label ) {
			$access_levels[] = array(
				'value' => $key,
				'label' => sprintf( __( '%s and higher', 'gutenam-blocks' ), $key ),
			);
		}
		foreach ( rcp_get_membership_levels( array( 'number' => 999 ) ) as $level ) {
			$level_ids[] = array(
				'value' => $level->get_id(),
				'label' => esc_attr( $level->get_name() ),
			);
		}
	}
	if ( ! class_exists( 'Base\Theme' ) ) {
		$global_colors = array(
			'--global-palette1' => '#3182CE',
			'--global-palette2' => '#2B6CB0',
			'--global-palette3' => '#1A202C',
			'--global-palette4' => '#2D3748',
			'--global-palette5' => '#4A5568',
			'--global-palette6' => '#718096',
			'--global-palette7' => '#EDF2F7',
			'--global-palette8' => '#F7FAFC',
			'--global-palette9' => '#ffffff',
		);
	} else {
		$global_colors = array(
			'--global-palette1' => \Base\webapp()->palette_option( 'palette1' ),
			'--global-palette2' => \Base\webapp()->palette_option( 'palette2' ),
			'--global-palette3' => \Base\webapp()->palette_option( 'palette3' ),
			'--global-palette4' => \Base\webapp()->palette_option( 'palette4' ),
			'--global-palette5' => \Base\webapp()->palette_option( 'palette5' ),
			'--global-palette6' => \Base\webapp()->palette_option( 'palette6' ),
			'--global-palette7' => \Base\webapp()->palette_option( 'palette7' ),
			'--global-palette8' => \Base\webapp()->palette_option( 'palette8' ),
			'--global-palette9' => \Base\webapp()->palette_option( 'palette9' ),
		);
	}
	$global_colors = apply_filters( 'base_blocks_pattern_global_colors', $global_colors );
	$font_sizes = array(
		'sm' => 'clamp(0.8rem, 0.73rem + 0.217vw, 0.9rem)',
		'md' => 'clamp(1.1rem, 0.995rem + 0.326vw, 1.25rem)',
		'lg' => 'clamp(1.75rem, 1.576rem + 0.543vw, 2rem)',
		'xl' => 'clamp(2.25rem, 1.728rem + 1.63vw, 3rem)',
		'xxl' => 'clamp(2.5rem, 1.456rem + 3.26vw, 4rem)',
		'xxxl' => 'clamp(2.75rem, 0.489rem + 7.065vw, 6rem)',
	);
	$font_sizes = apply_filters( 'base_blocks_variable_font_sizes', $font_sizes );
	$subscribed = class_exists( 'Base_Blocks_Pro' ) ? true : get_option( 'base_blocks_wire_subscribe' );
	$gfonts_path      = BASE_BLOCKS_PATH . 'includes/gfonts-array.php';
	$gfont_names_path = BASE_BLOCKS_PATH . 'includes/gfonts-names-array.php';
	$icon_names_path  = BASE_BLOCKS_PATH . 'includes/icon-names-array.php';
	$icon_ico_path    = BASE_BLOCKS_PATH . 'includes/icons-ico-array.php';
	$icons_path       = BASE_BLOCKS_PATH . 'includes/icons-array.php';
	$current_user     = wp_get_current_user();
	$user_email       = $current_user->user_email;
	$recent_posts     = wp_get_recent_posts( array( 'numberposts' => '1' ) );
	$product          = get_posts( array( 'numberposts' => 1, 'post_type' => 'product' ) );
	wp_localize_script(
		'base-blocks-js',
		'base_blocks_params',
		array(
			'ajax_url'       => admin_url( 'admin-ajax.php' ),
			'ajax_nonce'     => wp_create_nonce( 'base-blocks-ajax-verification' ),
			'ajax_loader'    => BASE_BLOCKS_URL . 'includes/assets/images/ajax-loader.gif',
			'sidebar_size'   => $sidebar_size,
			'nosidebar_size' => $nosidebar_size,
			'default_size'   => $jssize,
			'config'         => get_option( 'bst_blocks_config_blocks' ),
			'configuration'  => get_option( 'base_blocks_config_blocks' ),
			'settings'       => get_option( 'base_blocks_settings_blocks' ),
			'userrole'       => $userrole,
			'proData'        => $pro_data,
			'pro'            => ( class_exists( 'Base_Blocks_Pro' ) ? 'true' : 'false' ),
			'colors'         => get_option( 'base_blocks_colors' ),
			'global'         => get_option( 'base_blocks_global' ),
			'gutenberg'      => ( function_exists( 'gutenberg_menu' ) ? 'true' : 'false' ),
			'privacy_link'   => get_privacy_policy_url(),
			'privacy_title'  => ( get_option( 'wp_page_for_privacy_policy' ) ? get_the_title( get_option( 'wp_page_for_privacy_policy' ) ) : '' ),
			'editor_width'   => $enable_editor_width,
			'isBaseT'     => class_exists( 'Base\Theme' ),
			'headingWeights' => apply_filters( 'base_blocks_default_heading_font_weights', ( class_exists( 'Base\Theme' ) ? base_blocks_get_headings_weights() : null ) ),
			'buttonWeights'  => class_exists( 'Base\Theme' ) ? base_blocks_get_button_weights() : null,
			'postTypes'      => base_blocks_get_post_types(),
			'taxonomies'     => base_blocks_get_taxonomies(),
			'g_fonts'        => file_exists( $gfonts_path ) ? include $gfonts_path : array(),
			'g_font_names'   => file_exists( $gfont_names_path ) ? include $gfont_names_path : array(),
			'c_fonts'        => apply_filters( 'base_blocks_custom_fonts', array() ),
			'fluentCRM'      => defined( 'FLUENTCRM' ),
			'cloud_enabled'  => apply_filters( 'base_blocks_cloud_enabled', true ),
			'dynamic_enabled'  => apply_filters( 'base_blocks_dynamic_enabled', true ),
			'cloud_settings' => get_option( 'base_blocks_cloud' ),
			'subscribed' => $subscribed,
			'showWire' => apply_filters( 'base_blocks_wireframe_library_enabled', true ),
			'wireImage' => BASE_BLOCKS_URL . 'includes/assets/images/graphy.png',
			'user_email' => $user_email,
			'prebuilt_libraries' => apply_filters( 'base_blocks_custom_prebuilt_libraries', array() ),
			'showDesignLibrary' => apply_filters( 'base_blocks_design_library_enabled', true ),
			'postQueryEndpoint'  => '/bbp/v1/post-query',
			'icon_names' => file_exists( $icon_names_path ) ? include $icon_names_path : array(),
			'rest_url' => get_rest_url(),
			'wp_version' => get_bloginfo( 'version' ),
			'rcp_levels' => $level_ids,
			'rcp_access' => $access_levels,
			'svgMaskPath' => BASE_BLOCKS_URL . 'includes/assets/images/masks/',
			'wp_max_upload_size' => wp_max_upload_size(),
			'get_allowed_mime_types' => get_allowed_mime_types(),
			'global_colors' => $global_colors,
			'font_sizes' => $font_sizes,
			'livePreviewStyles' => apply_filters( 'base_blocks_design_library_iframe_styles', BASE_BLOCKS_URL . 'includes/assets/css/live-preview-base.min.css?ver=' . GUTENAM_BLOCKS_VERSION ),
			'hasPosts' => ( ! empty( $recent_posts[0]['ID'] ) ? true : false ),
			'addPostsLink' => admin_url( 'post-new.php' ),
			'hasWoocommerce' => ( class_exists( 'woocommerce' ) ? true : false ),
			'hasProducts' => ( class_exists( 'woocommerce' ) && ! empty( $product ) ? true : false ),
			'addProductsLink' => ( class_exists( 'woocommerce' ) ? admin_url( 'product-new.php' ) : 'https://wordpress.org/plugins/woocommerce/' ),
		)
	);
	wp_localize_script(
		'base-blocks-js',
		'base_blocks_params_ico',
		array(
			'icons' => file_exists( $icon_ico_path ) ? include $icon_ico_path : array(),
		)
	);
	wp_localize_script(
		'base-blocks-js',
		'base_blocks_params_fa',
		array(
			'icons' => file_exists( $icons_path ) ? include $icons_path : array(),
		)
	);
}
add_action( 'enqueue_block_editor_assets', 'base_blocks_gutenberg_editor_assets_variables' );

/**
 * Enqueue block plugin for backend editor.
 */
function base_blocks_gutenberg_editor_plugin_enqueue() {
	global $pagenow;
	if ( $pagenow !== 'widgets.php' ) {
		wp_enqueue_script( 'base-blocks-plugin-js' );
		wp_enqueue_style( 'base-blocks-plugin-css' );
	}
}
add_action( 'enqueue_block_editor_assets', 'base_blocks_gutenberg_editor_plugin_enqueue' );
/**
 * Get the asset file produced by wp scripts.
 *
 * @param string $filepath the file path.
 * @return array
 */
function base_blocks_get_asset_file( $filepath ) {
	$asset_path = BASE_BLOCKS_PATH . $filepath . '.asset.php';
	return file_exists( $asset_path )
		? include $asset_path
		: array(
			'dependencies' => array( 'lodash', 'react', 'react-dom', 'wp-block-editor', 'wp-blocks', 'wp-data', 'wp-element', 'wp-i18n', 'wp-polyfill', 'wp-primitives', 'wp-api' ),
			'version'      => GUTENAM_BLOCKS_VERSION,
		);
}

/**
 * Setup the post type taxonomies for post blocks.
 *
 * @return array
 */
function base_blocks_get_taxonomies() {
	$post_types = base_blocks_get_post_types();
	$output = array();
	foreach ( $post_types as $key => $post_type ) {
		$taxonomies = get_object_taxonomies( $post_type['value'], 'objects' );
		$taxs = array();
		foreach ( $taxonomies as $term_slug => $term ) {
			if ( ! $term->public || ! $term->show_ui ) {
				continue;
			}
			$taxs[ $term_slug ] = $term;
			$terms = get_terms( $term_slug );
			$term_items = array();
			if ( ! empty( $terms ) ) {
				foreach ( $terms as $term_key => $term_item ) {
					$term_items[] = array(
						'value' => $term_item->term_id,
						'label' => $term_item->name,
					);
				}
				$output[ $post_type['value'] ]['terms'][ $term_slug ] = $term_items;
			}
		}
		$output[ $post_type['value'] ]['taxonomy'] = $taxs;
	}
	return apply_filters( 'base_blocks_taxonomies', $output );
}

/**
 * Setup the post type options for post blocks.
 *
 * @return array
 */
function base_blocks_get_post_types() {
	$args = array(
		'public'       => true,
		'show_in_rest' => true,
	);
	$post_types = get_post_types( $args, 'objects' );
	$output = array();
	foreach ( $post_types as $post_type ) {
		// if ( 'product' == $post_type->name || 'attachment' == $post_type->name ) {
		// 	continue;
		// }
		if ( 'attachment' == $post_type->name ) {
			continue;
		}
		$output[] = array(
			'value' => $post_type->name,
			'label' => $post_type->label,
		);
	}
	return apply_filters( 'base_blocks_post_types', $output );
}
/**
 * Get an array font weight options.
 */
function base_blocks_get_headings_weights() {
	$weights = array();
	if ( function_exists( 'Base\webapp' ) ) {
		$heading_font = \Base\webapp()->option( 'heading_font' );
		if ( is_array( $heading_font ) ) {
			if ( isset( $heading_font['family'] ) && ! empty( $heading_font['family'] ) && 'inherit' === $heading_font['family'] ) {
				// Inherit from Body.
				$heading_font = \Base\webapp()->option( 'base_font' );
			}
			if ( isset( $heading_font['google'] ) && $heading_font['google'] ) {
				// Google font.
				if ( isset( $heading_font['variant'] ) && is_array( $heading_font['variant'] ) ) {
					$new_weight_variant = array();
					foreach ( array( 'h1_font', 'h2_font', 'h3_font', 'h4_font', 'h5_font', 'h6_font' ) as $option ) {
						$variant = \Base\webapp()->sub_option( $option, 'weight' );
						if ( ! in_array( $variant, $new_weight_variant, true ) ) {
							array_push( $new_weight_variant, $variant );
						}
					}
					$weights[] = array( 'value' => '', 'label' => __( 'Inherit', 'gutenam-blocks' ) );
					foreach ( $heading_font['variant'] as $key => $value ) {
						if ( $value === '100' && in_array( $value, $new_weight_variant ) ) {
							$weights[] = array( 'value' => '100', 'label' => __( 'Thin 100', 'gutenam-blocks' ) );
						} elseif ( $value === '200' && in_array( $value, $new_weight_variant ) ) {
							$weights[] = array( 'value' => '200', 'label' => __( 'Extra-Light 200', 'gutenam-blocks' ) );
						} elseif ( $value === '300' && in_array( $value, $new_weight_variant ) ) {
							$weights[] = array( 'value' => '300', 'label' => __( 'Light 300', 'gutenam-blocks' ) );
						} elseif ( $value === '400' && in_array( $value, $new_weight_variant ) ) {
							$weights[] = array( 'value' => '400', 'label' => __( 'Regular', 'gutenam-blocks' ) );
						} elseif ( $value === 'regular' && in_array( $value, $new_weight_variant ) ) {
							$weights[] = array( 'value' => '400', 'label' => __( 'Regular', 'gutenam-blocks' ) );
						} elseif ( $value === '500' && in_array( $value, $new_weight_variant ) ) {
							$weights[] = array( 'value' => '500', 'label' => __( 'Medium 500', 'gutenam-blocks' ) );
						} elseif ( $value === '600' && in_array( $value, $new_weight_variant ) ) {
							$weights[] = array( 'value' => '600', 'label' => __( 'Semi-Bold 600', 'gutenam-blocks' ) );
						} elseif ( $value === '700' && in_array( $value, $new_weight_variant ) ) {
							$weights[] = array( 'value' => '700', 'label' => __( 'Bold 700', 'gutenam-blocks' ) );
						} elseif ( $value === '800' && in_array( $value, $new_weight_variant ) ) {
							$weights[] = array( 'value' => '800', 'label' => __( 'Extra-Bold 800', 'gutenam-blocks' ) );
						} elseif ( $value === '900' && in_array( $value, $new_weight_variant ) ) {
							$weights[] = array( 'value' => '900', 'label' => __( 'Ultra-Bold 900', 'gutenam-blocks' ) );
						}
					}
				}
			} elseif ( isset( $heading_font['family'] ) && ! empty( $heading_font['family'] ) && substr( $heading_font['family'], 0, strlen( '-apple-system' ) ) === '-apple-system' ) {
				// System Font.
				$weights = array(
					array( 'value' => '', 'label' => __( 'Inherit', 'gutenam-blocks' ) ),
					array( 'value' => '100', 'label' => __( 'Thin 100', 'gutenam-blocks' ) ),
					array( 'value' => '200', 'label' => __( 'Extra-Light 200', 'gutenam-blocks' ) ),
					array( 'value' => '300', 'label' => __( 'Light 300', 'gutenam-blocks' ) ),
					array( 'value' => '400', 'label' => __( 'Regular', 'gutenam-blocks' ) ),
					array( 'value' => '500', 'label' => __( 'Medium 500', 'gutenam-blocks' ) ),
					array( 'value' => '600', 'label' => __( 'Semi-Bold 600', 'gutenam-blocks' ) ),
					array( 'value' => '700', 'label' => __( 'Bold 700', 'gutenam-blocks' ) ),
					array( 'value' => '800', 'label' => __( 'Extra-Bold 800', 'gutenam-blocks' ) ),
					array( 'value' => '900', 'label' => __( 'Ultra-Bold 900', 'gutenam-blocks' ) ),
				);
			}
		}
	}
	return apply_filters( 'base_blocks_heading_weight_options', $weights );
}
/**
 * Get an array font weight options.
 */
function base_blocks_get_button_weights() {
	$weights = array();
	if ( function_exists( 'Base\webapp' ) ) {
		$button_font = \Base\webapp()->option( 'buttons_typography' );
		if ( is_array( $button_font ) ) {
			if ( isset( $button_font['family'] ) && ! empty( $button_font['family'] ) && 'inherit' === $button_font['family'] ) {
				// Inherit from Body.
				$button_font = \Base\webapp()->option( 'base_font' );
			}
			if ( isset( $button_font['google'] ) && $button_font['google'] ) {
				$heading_font = \Base\webapp()->option( 'heading_font' );
				if ( isset( $heading_font['family'] ) && ! empty( $heading_font['family'] ) && $button_font['family'] === $heading_font['family'] ) {
					// Google font.
					if ( isset( $heading_font['variant'] ) && is_array( $heading_font['variant'] ) ) {
						if ( isset( $button_font['weight'] ) && ! empty( $button_font['weight'] ) ) {
							$new_weight_variant = array( $button_font['weight'] );
						} else {
							$new_weight_variant = array();
						}
						foreach ( array( 'h1_font', 'h2_font', 'h3_font', 'h4_font', 'h5_font', 'h6_font' ) as $option ) {
							$variant = \Base\webapp()->sub_option( $option, 'weight' );
							if ( ! in_array( $variant, $new_weight_variant, true ) ) {
								array_push( $new_weight_variant, $variant );
							}
						}
						$weights[] = array( 'value' => '', 'label' => __( 'Inherit', 'gutenam-blocks' ) );
						foreach ( $heading_font['variant'] as $key => $value ) {
							if ( $value === '100' && in_array( $value, $new_weight_variant ) ) {
								$weights[] = array( 'value' => '100', 'label' => __( 'Thin 100', 'gutenam-blocks' ) );
							} elseif ( $value === '200' && in_array( $value, $new_weight_variant ) ) {
								$weights[] = array( 'value' => '200', 'label' => __( 'Extra-Light 200', 'gutenam-blocks' ) );
							} elseif ( $value === '300' && in_array( $value, $new_weight_variant ) ) {
								$weights[] = array( 'value' => '300', 'label' => __( 'Light 300', 'gutenam-blocks' ) );
							} elseif ( $value === '400' && in_array( $value, $new_weight_variant ) ) {
								$weights[] = array( 'value' => '400', 'label' => __( 'Regular', 'gutenam-blocks' ) );
							} elseif ( $value === 'regular' && in_array( $value, $new_weight_variant ) ) {
								$weights[] = array( 'value' => '400', 'label' => __( 'Regular', 'gutenam-blocks' ) );
							} elseif ( $value === '500' && in_array( $value, $new_weight_variant ) ) {
								$weights[] = array( 'value' => '500', 'label' => __( 'Medium 500', 'gutenam-blocks' ) );
							} elseif ( $value === '600' && in_array( $value, $new_weight_variant ) ) {
								$weights[] = array( 'value' => '600', 'label' => __( 'Semi-Bold 600', 'gutenam-blocks' ) );
							} elseif ( $value === '700' && in_array( $value, $new_weight_variant ) ) {
								$weights[] = array( 'value' => '700', 'label' => __( 'Bold 700', 'gutenam-blocks' ) );
							} elseif ( $value === '800' && in_array( $value, $new_weight_variant ) ) {
								$weights[] = array( 'value' => '800', 'label' => __( 'Extra-Bold 800', 'gutenam-blocks' ) );
							} elseif ( $value === '900' && in_array( $value, $new_weight_variant ) ) {
								$weights[] = array( 'value' => '900', 'label' => __( 'Ultra-Bold 900', 'gutenam-blocks' ) );
							}
						}
					}
				}
			} elseif ( isset( $button_font['family'] ) && ! empty( $button_font['family'] ) && substr( $button_font['family'], 0, strlen( '-apple-system' ) ) === '-apple-system' ) {
				// System Font.
				$weights = array(
					array( 'value' => '', 'label' => __( 'Inherit', 'gutenam-blocks' ) ),
					array( 'value' => '100', 'label' => __( 'Thin 100', 'gutenam-blocks' ) ),
					array( 'value' => '200', 'label' => __( 'Extra-Light 200', 'gutenam-blocks' ) ),
					array( 'value' => '300', 'label' => __( 'Light 300', 'gutenam-blocks' ) ),
					array( 'value' => '400', 'label' => __( 'Regular', 'gutenam-blocks' ) ),
					array( 'value' => '500', 'label' => __( 'Medium 500', 'gutenam-blocks' ) ),
					array( 'value' => '600', 'label' => __( 'Semi-Bold 600', 'gutenam-blocks' ) ),
					array( 'value' => '700', 'label' => __( 'Bold 700', 'gutenam-blocks' ) ),
					array( 'value' => '800', 'label' => __( 'Extra-Bold 800', 'gutenam-blocks' ) ),
					array( 'value' => '900', 'label' => __( 'Ultra-Bold 900', 'gutenam-blocks' ) ),
				);
			}
		}
		//print_r( $button_font );
	}
	return apply_filters( 'base_blocks_button_weight_options', $weights );
}
/**
 * Add a filter that matches for custom font filter.
 */
function base_blocks_convert_custom_fonts() {
	if ( ! is_admin() ) {
		return;
	}
	$convert_fonts = apply_filters( 'base_blocks_add_custom_fonts', array() );
	if ( ! empty( $convert_fonts ) && is_array( $convert_fonts ) ) {
		add_filter(
			'base_blocks_custom_fonts',
			function( $custom_fonts ) use( $convert_fonts ) {
				foreach ( $convert_fonts as $font_name => $args ) {
					$weights_arg = array();
					if ( is_array( $args ) && isset( $args['weights'] ) && is_array( $args['weights'] ) ) {
						$weights_arg = $args['weights'];
					}
					$font_slug = ( is_array( $args ) && isset( $args['fallback'] ) && ! empty( $args['fallback'] ) ? '"' . $font_name . '", ' . $args['fallback'] : $font_name );
					$custom_fonts[ $font_slug  ] = array(
						'name'    => $font_slug,
						'weights' => $weights_arg,
						'styles'  => array(),
					);
				}
				return $custom_fonts;
			},
			10
		);
	}
}
add_filter( 'init', 'base_blocks_convert_custom_fonts', 11 );
/**
 * Get an array of visibility options.
 */
function base_blocks_get_user_visibility_options() {
	$specific_roles = array();
	if ( function_exists( 'get_editable_roles' ) ) {
		foreach ( get_editable_roles() as $role_slug => $role_info ) {
			$specific_roles[] = array(
				'value' => $role_slug,
				'label' => $role_info['name'],
			);
		}
	}
	return apply_filters( 'base_blocks_user_visibility_options', $specific_roles );
}
/**
 * Enqueue Gutenberg block assets for backend editor.
 */
function base_blocks_early_editor_assets() {
	if ( ! is_admin() ) {
		return;
	}
	global $pagenow;
	if ( 'post.php' === $pagenow || 'post-new.php' === $pagenow || 'widgets.php' === $pagenow ) {
		wp_localize_script(
			'base-blocks-js',
			'base_blocks_user_params',
			array(
				'userVisibility'  => base_blocks_get_user_visibility_options(),
			)
		);
	}
}
add_action( 'current_screen', 'base_blocks_early_editor_assets' );

/**
 * Callback for the excerpt_length filter used by
 * the Latest Posts block at render time.
 *
 * @return int Returns the global $base_blocks_post_block_get_excerpt_length variable
 *             to allow the excerpt_length filter respect the Latest Block setting.
 */
function base_blocks_post_block_get_excerpt_length() {
	global $base_blocks_post_block_get_excerpt_length;
	return $base_blocks_post_block_get_excerpt_length;
}
/**
 * Add global styles into the backend editor.
 */
function base_blocks_add_global_gutenberg_inline_styles() {
	global $content_width;
	$font_sizes = array(
		'sm' => 'clamp(0.8rem, 0.73rem + 0.217vw, 0.9rem)',
		'md' => 'clamp(1.1rem, 0.995rem + 0.326vw, 1.25rem)',
		'lg' => 'clamp(1.75rem, 1.576rem + 0.543vw, 2rem)',
		'xl' => 'clamp(2.25rem, 1.728rem + 1.63vw, 3rem)',
		'xxl' => 'clamp(2.5rem, 1.456rem + 3.26vw, 4rem)',
		'xxxl' => 'clamp(2.75rem, 0.489rem + 7.065vw, 6rem)',
	);
	$font_sizes = apply_filters( 'base_blocks_variable_font_sizes', $font_sizes );
	$css = ':root {';
	foreach ( $font_sizes as $key => $value ) {
		$css .= '--global-bsb-font-size-' . $key . ':' . $value . ';';
	}
	$css .= '}';
	if ( isset( $content_width ) ) {
		$css .= '.editor-styles-wrapper{ --bsb-global-content-width:' . absint( $content_width ) . 'px;}';
		$css .= '.wp-block-base-rowlayout > .bsb-theme-content-width {
			max-width:' . esc_attr( $content_width ) . 'px;
		}';
	} else {
		$css .= '.editor-styles-wrapper{ --bsb-global-content-width:var(--wp--style--global--content-size);}';
		$css .= '.wp-block-base-rowlayout > .bsb-theme-content-width {
			max-width:var(--wp--style--global--content-size);
		}';
	}
	$css .= ':root {
		--global-bsb-spacing-xxs: 0.5rem;
		--global-bsb-spacing-xs: 1rem;
		--global-bsb-spacing-sm: 1.5rem;
		--global-bsb-spacing-md: 2rem;
		--global-bsb-spacing-lg: 3rem;
		--global-bsb-spacing-xl: 4rem;
		--global-bsb-spacing-xxl: 5rem;
		--global-bsb-spacing-3xl: 6.5rem;
		--global-bsb-spacing-4xl: 8rem;
		--global-bsb-spacing-5xl: 10rem;
		--global-row-edge-sm: 15px;
		--global-row-edge-theme: var(--global-content-edge-padding);
		--global-bsb-gutter-sm: 1rem;
		--global-bsb-gutter-md: 2rem;
		--global-bsb-gutter-lg: 3rem;
		--global-bsb-gutter-xl: 5rem;
		--global-bsb-editor-sidebar: 0px;
		--global-bsb-editor-sidebar-secondary: 0px;
		--global-bsb-editor-full-width: calc( 100vw - ( var(--global-bsb-editor-sidebar) +  var(--global-bsb-editor-sidebar-secondary) ) );
	}';
	$css .= '.is-sidebar-opened.interface-interface-skeleton .interface-interface-skeleton__content {
		--global-bsb-editor-sidebar: 281px;
		--global-bsb-editor-sidebar-secondary: 0px;
		--global-bsb-editor-full-width: calc( 100vw - ( var(--global-bsb-editor-sidebar) +  var(--global-bsb-editor-sidebar-secondary) ) );
	}';
	$css .= '.interface-interface-skeleton:not(.is-sidebar-opened) .interface-interface-skeleton__secondary-sidebar ~ .interface-interface-skeleton__content {
		--global-bsb-editor-sidebar: 0px;
		--global-bsb-editor-sidebar-secondary: 351px;
		--global-bsb-editor-full-width: calc( 100vw - ( var(--global-bsb-editor-sidebar) +  var(--global-bsb-editor-sidebar-secondary) ) );
	}';
	$css .= '.interface-interface-skeleton.is-sidebar-opened .interface-interface-skeleton__secondary-sidebar ~ .interface-interface-skeleton__content {
		--global-bsb-editor-sidebar: 281px;
		--global-bsb-editor-sidebar-secondary: 351px;
		--global-bsb-editor-full-width: calc( 100vw - ( var(--global-bsb-editor-sidebar) +  var(--global-bsb-editor-sidebar-secondary) ) );
	}';
	$css .= ':root .post-content-style-boxed {
		--global-row-edge-theme: calc( var(--global-content-edge-padding) + 2rem);
	}';
	if ( ! class_exists( 'Base\Theme' ) ) {
		$global_colors = array(
			'--global-palette1' => '#3182CE',
			'--global-palette2' => '#2B6CB0',
			'--global-palette3' => '#1A202C',
			'--global-palette4' => '#2D3748',
			'--global-palette5' => '#4A5568',
			'--global-palette6' => '#718096',
			'--global-palette7' => '#EDF2F7',
			'--global-palette8' => '#F7FAFC',
			'--global-palette9' => '#ffffff',
		);
		$global_colors = apply_filters( 'base_blocks_pattern_global_colors', $global_colors );
		$css .= ':root {';
		foreach ( $global_colors as $key => $value ) {
			$css .= esc_attr( $key ) . ': ' . esc_attr( $value ) . ';';
		}
		$css .= '}';
	}
	wp_register_style( 'base-blocks-global-editor-styles', false );
	wp_add_inline_style( 'base-blocks-global-editor-styles', $css );
}
add_action( 'admin_init', 'base_blocks_add_global_gutenberg_inline_styles', 1 );
/**
 * Connects Block styles to core block style so it loads in full size editing context.
 * This is a workaround so dynamic css can be loaded in Iframe and FSE mode.
 */
function base_blocks_update_global_gutenberg_inline_styles_dependencies() {
	$wp_styles = wp_styles();
	$style     = $wp_styles->query( 'wp-block-library', 'registered' );
	if ( ! $style ) {
		return;
	}
	if (
		wp_style_is( 'base-blocks-global-editor-styles', 'registered' ) &&
		! in_array( 'base-blocks-global-editor-styles', $style->deps, true )
	) {
		$style->deps[] = 'base-blocks-global-editor-styles';
	}
}
add_action( 'admin_init', 'base_blocks_update_global_gutenberg_inline_styles_dependencies', 2 );
/**
 * Add global styles into the frontend.
 */
function base_blocks_add_global_gutenberg_styles_frontend() {
	$font_sizes = array(
		'sm' => 'clamp(0.8rem, 0.73rem + 0.217vw, 0.9rem)',
		'md' => 'clamp(1.1rem, 0.995rem + 0.326vw, 1.25rem)',
		'lg' => 'clamp(1.75rem, 1.576rem + 0.543vw, 2rem)',
		'xl' => 'clamp(2.25rem, 1.728rem + 1.63vw, 3rem)',
		'xxl' => 'clamp(2.5rem, 1.456rem + 3.26vw, 4rem)',
		'xxxl' => 'clamp(2.75rem, 0.489rem + 7.065vw, 6rem)',
	);
	$font_sizes = apply_filters( 'base_blocks_variable_font_sizes', $font_sizes );
	$css = ':root {';
	foreach ( $font_sizes as $key => $value ) {
		$css .= '--global-bsb-font-size-' . $key . ':' . $value . ';';
	}
	$css .= '}';
	if ( ! class_exists( 'Base\Theme' ) ) {
		$global_colors = array(
			'--global-palette1' => '#3182CE',
			'--global-palette2' => '#2B6CB0',
			'--global-palette3' => '#1A202C',
			'--global-palette4' => '#2D3748',
			'--global-palette5' => '#4A5568',
			'--global-palette6' => '#718096',
			'--global-palette7' => '#EDF2F7',
			'--global-palette8' => '#F7FAFC',
			'--global-palette9' => '#ffffff',
		);
		$global_colors = apply_filters( 'base_blocks_pattern_global_colors', $global_colors );
		$css .= ':root {';
		foreach ( $global_colors as $key => $value ) {
			$css .= esc_attr( $key ) . ': ' . esc_attr( $value ) . ';';
		}
		$css .= '}';
	}

	// This is a temp fix for restored316 upgrade issue.
	if ( get_option( 'stylesheet' ) === 'restored316-journey' ) {
		$css .= '.bst-blocks-carousel-init[data-slider-dots=true].is-overflow {';
		$css .= 'margin-bottom:0px';
		$css .= '}';
	}
	wp_register_style( 'base-blocks-global-variables', false );
	wp_enqueue_style( 'base-blocks-global-variables' );
	wp_add_inline_style( 'base-blocks-global-variables', $css );
}
add_action( 'wp_enqueue_scripts', 'base_blocks_add_global_gutenberg_styles_frontend', 90 );


/**
 * Add class to match editor width.
 *
 * @param string $classes string of body classes.
 */
function base_blocks_admin_body_class( $classes ) {
	$screen = get_current_screen();
	if ( 'post' == $screen->base ) {
		global $post;
		$editorwidth = get_post_meta( $post->ID, 'bst_blocks_editor_width', true );
		if ( isset( $editorwidth ) && ! empty( $editorwidth ) && 'default' !== $editorwidth ) {
			$classes .= ' bst-editor-width-' . esc_attr( $editorwidth );
		} else {
			$classes .= ' bst-editor-width-default';
		}
	}
	return $classes;
}
add_filter( 'admin_body_class', 'base_blocks_admin_body_class' );

/**
 * Add block category for Base Blocks.
 *
 * @param array  $categories the array of block categories.
 * @param object $post the post object.
 */
function base_blocks_block_category( $categories, $post ) {
	return array_merge(
		array(
			array(
				'slug'  => 'gutenam-blocks',
				'title' => __( 'Gutenam Blocks', 'gutenam-blocks' ),
			),
		),
		$categories
	);
}

/**
 * Add old categories filter if needed.
 */
function base_blocks_check_for_old_wp_block_category_filter() {
	if ( version_compare( get_bloginfo( 'version' ), '5.8', '<' ) ) {
		add_filter( 'block_categories', 'base_blocks_block_category', 10, 2 );
	}
}
add_action( 'init', 'base_blocks_check_for_old_wp_block_category_filter' );
/**
 * Add block category for Base Blocks.
 *
 * @param array  $categories the array of block categories.
 * @param WP_Block_Editor_Context $block_editor_context The current block editor context.
 */
function base_blocks_block_category_all( $categories, $block_editor_context ) {
	return array_merge(
		array(
			array(
				'slug'  => 'gutenam-blocks',
				'title' => __( 'Gutenam Blocks', 'gutenam-blocks' ),
			),
		),
		$categories
	);
}
add_filter( 'block_categories_all', 'base_blocks_block_category_all', 10, 2 );

/**
 * Get other templates (e.g. product attributes) passing attributes and including the file.
 *
 * @param string $template_name Template name.
 * @param array  $args          Arguments. (default: array).
 * @param string $template_path Template path. (default: '').
 * @param string $default_path  Default path. (default: '').
 */
function base_blocks_get_template( $template_name, $args = array(), $template_path = '', $default_path = '' ) {
	$cache_key = sanitize_key( implode( '-', array( 'template', $template_name, $template_path, $default_path, GUTENAM_BLOCKS_VERSION ) ) );
	$template  = (string) wp_cache_get( $cache_key, 'gutenam-blocks' );

	if ( ! $template ) {
		$template = base_blocks_locate_template( $template_name, $template_path, $default_path );
		wp_cache_set( $cache_key, $template, 'gutenam-blocks' );
	}

	// Allow 3rd party plugin filter template file from their plugin.
	$filter_template = apply_filters( 'base_blocks_get_template', $template, $template_name, $args, $template_path, $default_path );

	if ( $filter_template !== $template ) {
		if ( ! file_exists( $filter_template ) ) {
			return;
		}
		$template = $filter_template;
	}

	$action_args = array(
		'template_name' => $template_name,
		'template_path' => $template_path,
		'located'       => $template,
		'args'          => $args,
	);

	if ( ! empty( $args ) && is_array( $args ) ) {
		if ( isset( $args['action_args'] ) ) {
			unset( $args['action_args'] );
		}
		extract( $args ); // @codingStandardsIgnoreLine
	}

	do_action( 'base_blocks_before_template_part', $action_args['template_name'], $action_args['template_path'], $action_args['located'], $action_args['args'] );

	include $action_args['located'];

	do_action( 'base_blocks_after_template_part', $action_args['template_name'], $action_args['template_path'], $action_args['located'], $action_args['args'] );
}
/**
 * Like base_blocks_get_template, but returns the HTML instead of outputting.
 *
 * @see base_blocks_get_template
 * @param string $template_name Template name.
 * @param array  $args          Arguments. (default: array).
 * @param string $template_path Template path. (default: '').
 * @param string $default_path  Default path. (default: '').
 *
 * @return string
 */
function base_blocks_get_template_html( $template_name, $args = array(), $template_path = '', $default_path = '' ) {
	ob_start();
	base_blocks_get_template( $template_name, $args, $template_path, $default_path );
	return ob_get_clean();
}
/**
 * Locate a template and return the path for inclusion.
 *
 * This is the load order:
 *
 * yourtheme/$template_path/$template_name
 * yourtheme/$template_name
 * $default_path/$template_name
 *
 * @param string $template_name Template name.
 * @param string $template_path Template path. (default: '').
 * @param string $default_path  Default path. (default: '').
 * @return string
 */
function base_blocks_locate_template( $template_name, $template_path = '', $default_path = '' ) {
	if ( ! $template_path ) {
		$template_path = apply_filters( 'base_blocks_template_path', 'base-blocks/' );
	}

	if ( ! $default_path ) {
		$default_path = BASE_BLOCKS_PATH . 'includes/templates/';
	}

	// Look within passed path within the theme - this is priority.
	$template = locate_template(
		array(
			trailingslashit( $template_path ) . $template_name,
			$template_name,
		)
	);
	// Check depreciated path template.
	if ( ! $template ) {
		$template_path = 'baseblocks/';
		$template = locate_template(
			array(
				trailingslashit( $template_path ) . $template_name,
				$template_name,
			)
		);
	}
	// Get default template/.
	if ( ! $template ) {
		$template = $default_path . $template_name;
	}

	// Return what we found.
	return apply_filters( 'base_blocks_locate_template', $template, $template_name, $template_path );
}
/**
 * Print an SVG Icon
 *
 * @param string $icon the icon name.
 * @param string $icon_title the icon title for screen readers.
 * @param bool   $base if the baseline class should be added.
 */
function base_blocks_print_icon( $icon = 'arrow-right-alt', $icon_title = '', $base = true ) {
	echo base_blocks_get_icon( $icon, $icon_title, $base ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
}
/**
 * Get an SVG Icon
 *
 * @param string $icon the icon name.
 * @param string $icon_title the icon title for screen readers.
 * @param bool   $base if the baseline class should be added.
 */
function base_blocks_get_icon( $icon = 'arrow-right-alt', $icon_title = '', $base = true, $aria = false ) {
	$display_title = apply_filters( 'base_svg_icons_have_title', true );
	$output = '<span class="base-svg-iconset' . ( $base ? ' svg-baseline' : '' ) . '">';
	switch ( $icon ) {
		case 'arrow-right-alt':
			$output .= '<svg' . ( ! $aria ? ' aria-hidden="true"' : '' ) . ' class="base-svg-icon base-arrow-right-alt-svg" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" width="27" height="28" viewBox="0 0 27 28">';
			if ( $display_title ) {
				$output .= '<title>' . ( ! empty( $icon_title ) ? $icon_title : esc_html__( 'Continue', 'avanam' ) ) . '</title>';
			}
			$output .= '<path d="M27 13.953c0 0.141-0.063 0.281-0.156 0.375l-6 5.531c-0.156 0.141-0.359 0.172-0.547 0.094-0.172-0.078-0.297-0.25-0.297-0.453v-3.5h-19.5c-0.281 0-0.5-0.219-0.5-0.5v-3c0-0.281 0.219-0.5 0.5-0.5h19.5v-3.5c0-0.203 0.109-0.375 0.297-0.453s0.391-0.047 0.547 0.078l6 5.469c0.094 0.094 0.156 0.219 0.156 0.359v0z"></path>
			</svg>';
			break;
		default:
			$output .= '';
			break;
	}
	$output .= '</span>';

	$output = apply_filters( 'base_svg_icon', $output, $icon, $icon_title, $base );

	return $output;
}
/**
 * Convert the post ID in Base Form's block.
 *
 * @see https://onthegosystems.myjetbrains.com/youtrack/issue/wpmlcore-7207
 *
 * @param array $block the filtered block.
 */
function wpmlcore_7207_fix_base_form_block( array $block ) {
	if ( 'base/form' === $block['blockName'] && class_exists( 'WPML\PB\Gutenberg\ConvertIdsInBlock\Composite' ) && class_exists( 'WPML\PB\Gutenberg\ConvertIdsInBlock\TagAttributes' ) && class_exists( 'WPML\PB\Gutenberg\ConvertIdsInBlock\BlockAttributes' ) ) {
		$slug      = get_post_type();
		$converter = new WPML\PB\Gutenberg\ConvertIdsInBlock\Composite(
			array(
				new WPML\PB\Gutenberg\ConvertIdsInBlock\TagAttributes(
					array(
						array(
							'xpath' => '//*[@name="_bsb_form_post_id"]/@value',
							'slug' => $slug,
							'type' => 'post',
						),
					)
				),
				new WPML\PB\Gutenberg\ConvertIdsInBlock\BlockAttributes(
					array(
						array(
							'name' => 'postID',
							'slug' => $slug,
							'type' => 'post',
						),
					)
				),
			)
		);
		return $converter->convert( $block );
	}
	return $block;
}
add_filter( 'render_block_data', 'wpmlcore_7207_fix_base_form_block' );

/**
 * Setup the post select API endpoint.
 *
 * @return void
 */
function base_blocks_register_api_endpoints() {
	$posts_controller = new Base_Blocks_Post_Rest_Controller();
	$posts_controller->register_routes();
	$mailerlite_controller = new Base_MailerLite_REST_Controller();
	$mailerlite_controller->register_routes();
	$fluentcrm_controller = new Base_FluentCRM_REST_Controller();
	$fluentcrm_controller->register_routes();
	$lottieanimation_conteoller_get = new Base_LottieAnimation_get_REST_Controller();
	$lottieanimation_conteoller_get->register_routes();
	$lottieanimation_conteoller_upload = new Base_LottieAnimation_post_REST_Controller();
	$lottieanimation_conteoller_upload->register_routes();
}
add_action( 'rest_api_init', 'base_blocks_register_api_endpoints' );

/**
 * Get the license information.
 *
 * @return array
 */
function base_blocks_get_pro_license_data() {
	$data = false;
	$current_theme = wp_get_theme();
	$current_theme_name = $current_theme->get( 'Name' );
	$current_theme_template = $current_theme->get( 'Template' );
	// Check for a classic theme license.
	if ( 'Avanam' == $current_theme_name || 'avanam' == $current_theme_template ) {
		$pro_data = get_option( 'bst_api_manager' );
		if ( $pro_data ) {
			$data['avanamorg']  = '';
			$data['username'] = '';
			if ( 'Avanam' == $current_theme_name || 'avanam' == $current_theme_template ) {
				$data['product_id'] = 'avanam';
			}
			$data['api_key'] = $pro_data['bst_api_key'];
			$data['api_email'] = $pro_data['activation_email'];
		}
	} else {
		if ( is_multisite() && ! apply_filters( 'base_activation_individual_multisites', true ) ) {
			$data = get_site_option( 'bst_api_manager_base_gutenberg_pro_data' );
		} else {
			$data = get_option( 'bst_api_manager_base_gutenberg_pro_data' );
		}
	}
	return $data;
}

/**
 * Register the lotte post type.
 */
function base_blocks_register_lottie_custom_post_type() {
	register_post_type(
		'base_lottie',
		array(
			'label'        => _x( 'Lottie Animations', 'Lottie animation' ),
			'description'  => __( 'Lottie Animations imported in Base' ),
			'public'       => false,
			'show_ui'      => true,
			'show_in_menu' => false,
			'show_in_rest' => true,
			'rewrite'      => false,
			'capabilities' => array(
				'read'                   => 'edit_theme_options',
				'create_posts'           => 'edit_theme_options',
				'edit_posts'             => 'edit_theme_options',
				'edit_published_posts'   => 'edit_theme_options',
				'delete_published_posts' => 'edit_theme_options',
				'edit_others_posts'      => 'edit_theme_options',
				'delete_others_posts'    => 'edit_theme_options',
			),
			'map_meta_cap' => true,
			'supports'     => array(
				'title',
				'editor',
				'revisions',
			),
		)
	);
}

add_action( 'init', 'base_blocks_register_lottie_custom_post_type' );

/**
 * Filter core to remove loading = lazy if class is present.
 */
function base_blocks_skip_lazy_load( $value, $image, $context ) {
	if ( 'the_content' === $context ) {
		if ( false !== strpos( $image, 'bsb-skip-lazy' ) ) {
			return false; // Set to false so lazy loading attribute is omitted.
		}
	}
	return $value;
}
add_filter( 'wp_img_tag_add_loading_attr', 'base_blocks_skip_lazy_load', 10, 3 );
