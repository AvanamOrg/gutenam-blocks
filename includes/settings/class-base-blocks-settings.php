<?php
/**
 * Build Welcome Page With settings.
 *
 * @package Base Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


/**
 * Build Welcome Page class
 *
 * @category class
 */
class Base_Blocks_Settings {

	/**
	 * Settings of this class
	 *
	 * @var array
	 */
	public static $settings = array();

	/**
	 * Instance of this class
	 *
	 * @var null
	 */
	private static $instance = null;

	/**
	 * Instance of this class
	 *
	 * @var null
	 */
	private static $editor_width = null;

	/**
	 * Instance Control
	 */
	public static function get_instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}
	/**
	 * Class Constructor.
	 */
	public function __construct() {
		// only load if admin.
		if ( is_admin() ) {
			add_action( 'admin_menu', array( $this, 'add_menu' ) );
			add_filter( 'plugin_action_links_gutenam-blocks/gutenam-blocks.php', array( $this, 'add_settings_link' ) );
			add_action( 'in_plugin_update_message-gutenam-blocks/gutenam-blocks.php', array( $this, 'plugin_update_message' ), 10, 2 );
			// Plugin updater and activator
			add_action( 'after_setup_theme', array(  $this, 'gutenam_updater_activator' ), 5 );
		}
		add_action( 'wp_ajax_base_blocks_activate_deactivate', array( $this, 'ajax_blocks_activate_deactivate' ), 10, 0 );
		add_action( 'wp_ajax_base_blocks_save_config', array( $this, 'ajax_blocks_save_config' ), 10, 0 );
		add_action( 'wp_ajax_base_post_default_width', array( $this, 'ajax_default_editor_width' ), 10, 0 );
		add_action( 'enqueue_block_editor_assets', array( $this, 'deregister_blocks' ) );
		add_action( 'admin_init', array( $this, 'activation_redirect' ) );
		add_action( 'admin_init', array( $this, 'load_settings' ) );
		add_action( 'init', array( $this, 'load_api_settings' ) );
		add_action( 'after_setup_theme', array( $this, 'load_color_palette' ), 999 );
		add_action( 'init', array( $this, 'init_post_meta' ) );
		add_action( 'admin_head-post.php', array( $this, 'admin_editor_width' ), 100 );
		add_action( 'admin_head-post-new.php', array( $this, 'admin_editor_width' ), 100 );
	}
	/**
	 * Add an update message if in the readme.txt
	 *
	 * @param array $data An array of plugin metadata.
	 * @param object $response An object of metadata about the available plugin update.
	 */
	public function plugin_update_message( $data, $response ) {
		$upgrade_notice  = $this->get_upgrade_notice( '3.0.9' );
		echo apply_filters( 'base_blocks_in_plugin_update_message', $upgrade_notice ? wp_kses_post( $upgrade_notice ) . '<p style="display:none" class="dummy">' : '' ); // phpcs:ignore WordPress.XSS.EscapeOutput.OutputNotEscaped
	}
	/**
	 * Get the upgrade notice from WordPress.org.
	 *
	 * @param  string $version WooCommerce new version.
	 * @return string
	 */
	protected function get_upgrade_notice( $version ) {
		$transient_name = 'bsb_upgrade_notice_' . $version;
		$upgrade_notice = get_transient( $transient_name );

		if ( false === $upgrade_notice ) {
			$response = wp_safe_remote_get( 'https://plugins.svn.wordpress.org/base-blocks/trunk/readme.txt' );
			if ( ! is_wp_error( $response ) && ! empty( $response['body'] ) ) {
				$upgrade_notice = $this->parse_update_notice( $response['body'], $version );
				set_transient( $transient_name, $upgrade_notice, DAY_IN_SECONDS );
			}
		}
		return $upgrade_notice;
	}
	/**
	 * Parse update notice from readme file.
	 *
	 * @param  string $content WooCommerce readme file content.
	 * @param  string $new_version WooCommerce new version.
	 * @return string
	 */
	private function parse_update_notice( $content, $new_version ) {
		$version_parts = explode( '.', $new_version );
		$check_for_notices = array(
			$version_parts[0] . '.' . $version_parts[1] . '.0', // Major.
			$version_parts[0] . '.' . $version_parts[1] . '.' . $version_parts[2], // Patch.
		);
		$upgrade_notice = '';
		$notice_regexp  = '~==\s*Upgrade Notice\s*==\s*=\s*(.*)\s*=(.*)(=\s*' . preg_quote( $new_version ) . '\s*=|$)~Uis';
		foreach ( $check_for_notices as $check_version ) {
			if ( version_compare( GUTENAM_BLOCKS_VERSION, $check_version, '>' ) ) {
				continue;
			}
			$matches = null;
			if ( preg_match( $notice_regexp, $content, $matches ) ) {
				$notices = (array) preg_split( '~[\r\n]+~', trim( $matches[2] ) );
				if ( ! empty( $notices[0] ) ) {
					$upgrade_notice .= '<div class="update-message"><strong>';
					$upgrade_notice .= preg_replace( '~\[([^\]]*)\]\(([^\)]*)\)~', '<a href="${2}">${1}</a>', $notices[0] );
					$upgrade_notice .= '</strong></div>';
					break;
				}
			}
		}
		return wp_kses_post( $upgrade_notice );
	}
	/**
	 * Plugin updater and activator.
	 * 
	 * @since 1.0.0
	 * @access public
	 */
	public function gutenam_updater_activator() {
		// Load the Theme Plugins update checker.
		require_once BASE_BLOCKS_PATH . 'base-update-checker/base-update-checker.php';
	}

	/**
	 * Filter the exit_interview notice args.
	 *
	 * @param array $default_args the exit_interview args.
	 */
	public function exit_interview_args( $default_args ) {
		$args = array(
			'plugin_logo'           => BASE_BLOCKS_URL . 'includes/settings/img/gutenam-logo.png',
			'plugin_logo_width'     => 50,
			'plugin_logo_height'    => 50,
			'plugin_logo_alt'       => 'Gutenam Logo',
			'uninstall_reasons'=> array(
				array(
					'uninstall_reason_id' => 'confusing',
					'uninstall_reason'    => __( 'I couldn\'t understand how to make it work.', 'gutenam-blocks' ),
					'show_comment'        => false,
				),
				array(
					'uninstall_reason_id' => 'better-plugin',
					'uninstall_reason'   => __( 'I found a better plugin.', 'gutenam-blocks' ),
					'show_comment' => false,
				),
				array(
					'uninstall_reason_id' => 'no-feature',
					'uninstall_reason'   => __( 'I need a specific feature base blocks doesn\'t provide.', 'gutenam-blocks' ),
					'show_comment' => true,
				),
				array(
					'uninstall_reason_id' => 'broken',
					'uninstall_reason'   => __( 'Something is broken.', 'gutenam-blocks' ),
					'show_comment' => false,
				),
				array(
					'uninstall_reason_id' => 'other',
					'uninstall_reason'   => __( 'Other', 'gutenam-blocks' ),
					'show_comment' => true,
				),
			),
		);
		$args = wp_parse_args( $args, $default_args );
		return $args;
	}
	/**
	 * Filter the optin notice args.
	 *
	 * @param array $default_args the optin args.
	 */
	public function optin_notice_args( $default_args ) {
		$args = array(
			'plugin_logo'           => BASE_BLOCKS_URL . 'includes/settings/img/gutenam-logo.png',
			'plugin_logo_width'     => 50,
			'plugin_logo_height'    => 50,
			'plugin_logo_alt'       => 'Gutenam Logo',
			'plugin_name'           => 'Gutenam Blocks',
			'plugin_slug'           => 'gutenam-blocks',
			'permissions_url'       => 'https://avanam.org/blocks/',
			'tos_url'               => 'https://avanam.org/terms-and-conditions/',
			'privacy_url'           => 'https://avanam.org/privacy-policy/',
			'heading'               => __( 'Help us make Base Blocks even better.', 'gutenam-blocks' ),
			'intro'                 => sprintf(
				// translators: placeholder: username.
				esc_html__(
					'Hi, %1$s! At Gutenam, we\'re always looking for more ways to make our products better for you. If you opt into sharing some data on your usage of Base Blocks, it helps us identify key areas where we can improve. In return, we\'ll also email helpful articles and guides to get more out of Base, WordPress, and more. If you skip this, that\'s okay. Base Blocks will work just fine. We hope you love building with Base.', 'gutenam-blocks'
				),
				$default_args['user_name']
			),
		);
		$args = wp_parse_args( $args, $default_args );
		return $args;
	}
	/**
	 * Add inline css editor width
	 */
	public function admin_editor_width() {
		if ( apply_filters( 'base_blocks_editor_width', $this->show_editor_width() ) ) {
			$editor_widths = get_option( 'bst_blocks_editor_width', array() );
			if ( ( ! isset( $editor_widths['enable_editor_width'] ) || 'true' === $editor_widths['enable_editor_width'] ) && apply_filters( 'base_blocks_editor_width', true ) ) {
				if ( isset( $editor_widths['limited_margins'] ) && 'true' === $editor_widths['limited_margins'] ) {
					$add_size = 10;
				} else {
					$add_size = 30;
				}
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
				echo '<style id="bst-block-editor-width">';
				echo 'body.gutenberg-editor-page.bst-editor-width-default .editor-post-title__block,
				body.gutenberg-editor-page.bst-editor-width-default .editor-default-block-appender,
				body.gutenberg-editor-page.bst-editor-width-default .block-editor-block-list__block,
				body.block-editor-page.bst-editor-width-default .wp-block {
					max-width: ' . esc_attr( $default_size ) . ( is_numeric( $default_size ) ? 'px' : '' ) . ';
				}';
				echo 'body.gutenberg-editor-page.bst-editor-width-sidebar .editor-post-title__block,
				body.gutenberg-editor-page.bst-editor-width-sidebar .editor-default-block-appender,
				body.gutenberg-editor-page.bst-editor-width-sidebar .block-editor-block-list__block,
				body.block-editor-page.bst-editor-width-sidebar .wp-block {
					max-width: ' . esc_attr( $sidebar_size ) . 'px;
				}';
				echo 'body.gutenberg-editor-page.bst-editor-width-nosidebar .editor-post-title__block,
				body.gutenberg-editor-page.bst-editor-width-nosidebar .editor-default-block-appender,
				body.gutenberg-editor-page.bst-editor-width-nosidebar .block-editor-block-list__block,
				body.block-editor-page.bst-editor-width-nosidebar .wp-block {
					max-width: ' . esc_attr( $nosidebar_size ) . 'px;
				}';
				echo 'body.gutenberg-editor-page.bst-editor-width-fullwidth .editor-post-title__block,
				body.gutenberg-editor-page.bst-editor-width-fullwidth .editor-default-block-appender,
				body.gutenberg-editor-page.bst-editor-width-fullwidth .block-editor-block-list__block,
				body.block-editor-page.bst-editor-width-fullwidth .wp-block {
					max-width: none;
				}';
				echo 'body.gutenberg-editor-page .block-editor-block-list__layout .block-editor-block-list__block[data-align=wide],
				body.block-editor-page .block-editor-block-list__layout .wp-block[data-align=wide] {
					width: auto;
					max-width: ' . esc_attr( $nosidebar_size + 200 ) . 'px;
				}';

				echo 'body.gutenberg-editor-page .block-editor-block-list__layout .block-editor-block-list__block[data-align=full],
				body.block-editor-page .block-editor-block-list__layout .wp-block[data-align=full] {
					max-width: none;
				}';
				echo '</style>';
				echo '<script> var bst_blocks_sidebar_size = ' . esc_attr( $sidebar_size ) . '; var bst_blocks_nosidebar_size = ' . esc_attr( $nosidebar_size ) . '; var bst_blocks_default_size = ' . esc_attr( $jssize ) . ';</script>';
			}
		}
	}
	/**
	 * Register Meta for blocks width
	 */
	public function init_post_meta() {
		if ( apply_filters( 'base_blocks_editor_width', $this->show_editor_width() ) ) {
			register_post_meta(
				'',
				'bst_blocks_editor_width',
				array(
					'show_in_rest' => true,
					'single'       => true,
					'type'         => 'string',
				)
			);
		}
	}
	/**
	 * Load Gutenberg Palette
	 */
	public function load_color_palette() {
		$palette = json_decode( get_option( 'base_blocks_colors' ) );
		if ( $palette && is_object( $palette ) && isset( $palette->palette ) && is_array( $palette->palette ) ) {
			$san_palette = array();
			foreach ( $palette->palette as $item ) {
				$san_palette[] = array(
					'color' => $item->color,
					'name'  => $item->name,
					'slug'  => $item->slug,
				);
			}
			if ( isset( $san_palette[0] ) ) {
				if ( ( isset( $palette->override ) && true !== $palette->override ) || ! isset( $palette->override ) ) {
					$theme_palette = get_theme_support( 'editor-color-palette' );
					if ( is_array( $theme_palette ) ) {
						$newpalette = array_merge( reset( $theme_palette ), $san_palette );
					} else {
						$default_palette = array(
							array(
								'name' => __( 'Pale pink', 'gutenam-blocks' ),
								'slug' => 'pale-pink',
								'color' => '#f78da7',
							),
							array(
								'name' => __( 'Vivid red', 'gutenam-blocks' ),
								'slug' => 'vivid-red',
								'color' => '#cf2e2e',
							),
							array(
								'name' => __( 'Luminous vivid orange', 'gutenam-blocks' ),
								'slug' => 'luminous-vivid-orange',
								'color' => '#ff6900',
							),
							array(
								'name' => __( 'Luminous vivid amber', 'gutenam-blocks' ),
								'slug' => 'luminous-vivid-amber',
								'color' => '#fcb900',
							),
							array(
								'name' => __( 'Light green cyan', 'gutenam-blocks' ),
								'slug' => 'light-green-cyan',
								'color' => '#7bdcb5',
							),
							array(
								'name' => __( 'Vivid green cyan', 'gutenam-blocks' ),
								'slug' => 'vivid-green-cyan',
								'color' => '#00d084',
							),
							array(
								'name' => __( 'Pale cyan blue', 'gutenam-blocks' ),
								'slug' => 'pale-cyan-blue',
								'color' => '#8ed1fc',
							),
							array(
								'name' => __( 'Vivid cyan blue', 'gutenam-blocks' ),
								'slug' => 'vivid-cyan-blue',
								'color' => '#0693e3',
							),
							array(
								'name' => __( 'Very light gray', 'gutenam-blocks' ),
								'slug' => 'very-light-gray',
								'color' => '#eeeeee',
							),
							array(
								'name' => __( 'Cyan bluish gray', 'gutenam-blocks' ),
								'slug' => 'cyan-bluish-gray',
								'color' => '#abb8c3',
							),
							array(
								'name' => __( 'Very dark gray', 'gutenam-blocks' ),
								'slug' => 'very-dark-gray',
								'color' => '#313131',
							),
						);
						$newpalette = array_merge( $default_palette, $san_palette );
					}
				} else {
					$newpalette = $san_palette;
				}
				add_theme_support( 'editor-color-palette', $newpalette );
				add_action( 'wp_head', array( $this, 'print_gutenberg_style' ), 8 );
				add_action( 'admin_print_styles', array( $this, 'print_gutenberg_style' ), 21 );
			}
		}
	}
	/**
	 * Print Gutenberg Palette Styles
	 */
	public function print_gutenberg_style() {
		if ( is_admin() ) {
			$screen = get_current_screen();
			if ( ! $screen || ! $screen->is_block_editor() ) {
				return;
			}
		}
		$palette = json_decode( get_option( 'base_blocks_colors' ) );
		if ( $palette && is_object( $palette ) && isset( $palette->palette ) && is_array( $palette->palette ) ) {
			$san_palette = array();
			foreach ( $palette->palette as $item ) {
				$san_palette[] = array(
					'color' => $item->color,
					'name' => $item->name,
					'slug' => $item->slug,
				);
			}
			if ( isset( $san_palette[0] ) ) {
				echo '<style id="base_blocks_palette_css">';
				foreach ( $san_palette as $set ) {
					$slug = $set['slug'];
					$color = $set['color'];
					echo ':root .has-' . esc_attr( $slug ) . '-color{color:' . esc_attr( $color ) . '}:root .has-' . esc_attr( $slug ) . '-background-color{background-color:' . esc_attr( $color ) . '}';
				}
				echo '</style>';
			}
		}
	}
	/**
	 * Redirect to the settings page on activation
	 */

	public function activation_redirect() {
		if ( get_option( 'base_blocks_redirect_on_activation', false ) ) {
			delete_option( 'base_blocks_redirect_on_activation' );
			// @todo add admin notice for optional data share.
		}
	}
	/**
	 * Redirect to the settings page on activation.
	 *
	 * @param string $key setting key.
	 */
	public static function get_data_options( $key ) {
		if ( ! isset( self::$settings[ $key ] ) ) {
			self::$settings[ $key ] = get_option( $key, array() );
		}
		return self::$settings[ $key ];
	}
	/**
	 * Deregister Blocks.
	 */
	public function deregister_blocks() {
		// Scripts.
		$options = get_option( 'bst_blocks_unregistered_blocks' );
		if ( isset( $options['base/advnacedgallery'] ) ) {
			unset( $options['base/advnacedgallery'] );
			update_option( 'bst_blocks_unregistered_blocks', $options );
		}
		// Don't need to unregister a block that is not loaded.
		if ( ! class_exists( 'woocommerce' ) && is_array( $options ) ) {
			if ( in_array( 'base/productcarousel', $options, true ) ) {
				foreach ( $options as $key => $block ) {
					if ( $block === 'base/productcarousel' ) {
						unset( $options[ $key ] );
					}
				}
			}
		}
		if ( $options ) {
			wp_enqueue_script( 'base-blocks-deregister-js', BASE_BLOCKS_URL . 'includes/assets/js/admin-blocks-deregister.min.js', array( 'wp-blocks' ), GUTENAM_BLOCKS_VERSION, true );
			wp_localize_script(
				'base-blocks-deregister-js',
				'bst_deregister_params',
				array(
					'deregister'       => $options,
				)
			);
		}
	}
	/**
	 * Returns a base64 URL for the SVG for use in the menu.
	 *
	 * @param  bool $base64 Whether or not to return base64-encoded SVG.
	 * @return string
	 */
	private function get_icon_svg( $base64 = true ) {
		$svg = '<svg width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" fill="#a7aaad" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" clipRule="evenodd" viewBox="0 0 600 600" > <g transform="translate(0.000000,600.000000) scale(0.100000,-0.100000)" stroke="none"><path d="M4143 5580 c-74 -11 -170 -60 -225 -114 -49 -49 -108 -153 -108 -192 0 -13 -4 -26 -10 -29 -12 -7 -13 -167 -2 -181 5 -5 14 -34 21 -65 6 -31 27 -78 47 -107 l35 -52 -1561 0 -1560 0 0 -330 0 -330 707 -2 708 -3 3 -391 2 -391 -227 -6 c-252 -6 -362 -23 -502 -77 -322 -125 -539 -405 -597 -771 -25 -154 -15 -419 19 -551 123 -471 509 -758 1019 -758 394 0 704 162 900 470 61 95 98 193 140 368 8 33 13 363 17 1077 l6 1030 425 0 425 0 5 -1855 c3 -1020 6 -1856 8 -1857 1 -2 171 -3 377 -3 l375 0 2 1858 3 1857 313 3 312 2 0 330 0 330 -366 0 -366 0 16 23 c40 56 69 111 83 159 20 65 28 201 15 237 -6 14 -18 51 -27 81 -50 169 -230 269 -432 240z m-1943 -3105 c0 -333 -22 -423 -121 -508 -96 -82 -270 -73 -363 19 -60 61 -96 177 -96 315 0 221 83 363 235 400 17 4 101 7 188 8 l157 1 0 -235z"/></g></svg>';

		if ( $base64 ) {
			return 'data:image/svg+xml;base64,' . base64_encode( $svg );
		}

		return $svg;
	}
	/**
	 * Allow settings visibility to be changed.
	 */
	public function settings_user_capabilities() {
		$cap = apply_filters( 'base_blocks_admin_settings_capability', 'edit_pages' );
		return $cap;
	}
	/**
	 * Add option page menu
	 */
	public function add_menu() {
		add_menu_page( __( 'Gutenam Blocks -  Gutenberg Page Builder Blocks', 'gutenam-blocks' ), __( 'Gutenam Blocks', 'gutenam-blocks' ), $this->settings_user_capabilities(), 'gutenam-blocks', null, $this->get_icon_svg(), 30 );
		$page = add_submenu_page( 'gutenam-blocks', __( 'Gutenam Blocks -  Gutenberg Page Builder Blocks', 'gutenam-blocks' ), __( 'Settings' ), $this->settings_user_capabilities(), 'gutenam-blocks', array( $this, 'config_page' ) );
		add_action( 'admin_print_styles-' . $page, array( $this, 'scripts' ) );
	}
	/**
	 * Loads admin style sheets and scripts
	 */
	public function scripts() {
		$texts = array(
			'close'    => __( 'Close', 'gutenam-blocks' ),
			'save'     => __( 'Save', 'gutenam-blocks' ),
			'updating' => __( 'Updating', 'gutenam-blocks' ),
			'updated'  => __( 'Updated', 'gutenam-blocks' ),
			'config'   => __( 'Config', 'gutenam-blocks' ),
			'settings' => __( 'Default Settings', 'gutenam-blocks' ),
		);
		$settings = array(
			'base/spacer' => array(
				'moved' => array(
					'type' => 'info',
					'name' => __( 'Setting defaults has moved into Gutenberg, click on the top right corner settings and go to Base Blocks Controls', 'gutenam-blocks' ),
				),
			),
			'base/rowlayout' => array(
				'moved' => array(
					'type' => 'info',
					'name' => __( 'Setting defaults has moved into Gutenberg, click on the top right corner settings and go to Base Blocks Controls', 'gutenam-blocks' ),
				),
			),
			'base/advancedbtn' => array(
				'moved' => array(
					'type' => 'info',
					'name' => __( 'Setting defaults has moved into Gutenberg, click on the top right corner settings and go to Base Blocks Controls', 'gutenam-blocks' ),
				),
			),
			'base/infobox' => array(
				'moved' => array(
					'type' => 'info',
					'name' => __( 'Setting defaults has moved into Gutenberg, click on the top right corner settings and go to Base Blocks Controls', 'gutenam-blocks' ),
				),
			),
			'base/accordion' => array(
				'moved' => array(
					'type' => 'info',
					'name' => __( 'Setting defaults has moved into Gutenberg, click on the top right corner settings and go to Base Blocks Controls', 'gutenam-blocks' ),
				),
			),
			'base/tabs' => array(
				'moved' => array(
					'type' => 'info',
					'name' => __( 'Setting defaults has moved into Gutenberg, click on the top right corner settings and go to Base Blocks Controls', 'gutenam-blocks' ),
				),
			),
			'base/iconlist' => array(
				'moved' => array(
					'type' => 'info',
					'name' => __( 'Setting defaults has moved into Gutenberg, click on the top right corner settings and go to Base Blocks Controls', 'gutenam-blocks' ),
				),
			),
			'base/testimonials' => array(
				'moved' => array(
					'type' => 'info',
					'name' => __( 'Setting defaults has moved into Gutenberg, click on the top right corner settings and go to Base Blocks Controls', 'gutenam-blocks' ),
				),
			),
			'base/advancedheading' => array(
				'moved' => array(
					'type' => 'info',
					'name' => __( 'Setting defaults has moved into Gutenberg, click on the top right corner settings and go to Base Blocks Controls', 'gutenam-blocks' ),
				),
			),
			'base/icon' => array(
				'moved' => array(
					'type' => 'info',
					'name' => __( 'Setting defaults has moved into Gutenberg, click on the top right corner settings and go to Base Blocks Controls', 'gutenam-blocks' ),
				),
			),
		);
		wp_enqueue_style( 'base-blocks-admin-css', BASE_BLOCKS_URL . 'includes/assets/css/admin-dashboard.min.css', array( 'wp-jquery-ui-dialog', 'wp-color-picker' ), GUTENAM_BLOCKS_VERSION, 'all' );
		wp_enqueue_script( 'base-blocks-admin-js', BASE_BLOCKS_URL . 'includes/assets/js/admin-scripts.min.js', array( 'jquery', 'jquery-ui-dialog', 'wp-color-picker' ), GUTENAM_BLOCKS_VERSION, true );
		wp_localize_script(
			'base-blocks-admin-js',
			'bst_blocks_params',
			array(
				'ajaxurl'             => admin_url( 'admin-ajax.php' ),
				'wpnonce'             => wp_create_nonce( 'base-blocks-manage' ),
				'blockConfig'         => get_option( 'bst_blocks_config_blocks' ),
				'blockConfigSettings' => $settings,
				'texts'               => $texts,
			)
		);
	}
	/**
	 * Register settings
	 */
	public function load_api_settings() {

		register_setting(
			'base_blocks_config_blocks',
			'base_blocks_config_blocks',
			array(
				'type'              => 'string',
				'description'       => __( 'Config Base Block Defaults', 'gutenam-blocks' ),
				'sanitize_callback' => 'sanitize_text_field',
				'show_in_rest'      => true,
				'default'           => '',
			)
		);
		register_setting(
			'base_blocks_settings_blocks',
			'base_blocks_settings_blocks',
			array(
				'type'              => 'string',
				'description'       => __( 'Config Base Block Settings View', 'gutenam-blocks' ),
				'sanitize_callback' => 'sanitize_text_field',
				'show_in_rest'      => true,
				'default'           => '',
			)
		);
		register_setting(
			'base_blocks_colors',
			'base_blocks_colors',
			array(
				'type'              => 'string',
				'description'       => __( 'Config Base Blocks Color Palette', 'gutenam-blocks' ),
				'sanitize_callback' => 'sanitize_text_field',
				'show_in_rest'      => true,
				'default'           => '',
			)
		);
		register_setting(
			'base_blocks_global',
			'base_blocks_global',
			array(
				'type'              => 'string',
				'description'       => __( 'Config Base Blocks Global Settings', 'gutenam-blocks' ),
				'sanitize_callback' => 'sanitize_text_field',
				'show_in_rest'      => true,
				'default'           => '',
			)
		);
		register_setting(
			'base_blocks_recaptcha_site_key',
			'base_blocks_recaptcha_site_key',
			array(
				'type'              => 'string',
				'description'       => __( 'Google reCaptcha Site Key', 'gutenam-blocks' ),
				'sanitize_callback' => 'sanitize_text_field',
				'show_in_rest'      => true,
				'default'           => '',
			)
		);
		register_setting(
			'base_blocks_recaptcha_secret_key',
			'base_blocks_recaptcha_secret_key',
			array(
				'type'              => 'string',
				'description'       => __( 'Google reCaptcha Secret Key', 'gutenam-blocks' ),
				'sanitize_callback' => 'sanitize_text_field',
				'show_in_rest'      => true,
				'default'           => '',
			)
		);
		register_setting(
			'base_blocks_recaptcha_language',
			'base_blocks_recaptcha_language',
			array(
				'type'              => 'string',
				'description'       => __( 'Google reCaptcha Language', 'gutenam-blocks' ),
				'sanitize_callback' => 'sanitize_text_field',
				'show_in_rest'      => true,
				'default'           => '',
			)
		);
		register_setting(
			'base_blocks_mailerlite_api',
			'base_blocks_mailerlite_api',
			array(
				'type'              => 'string',
				'description'       => __( 'MailerLite API Key', 'gutenam-blocks-pro' ),
				'sanitize_callback' => 'sanitize_text_field',
				'show_in_rest'      => true,
				'default'           => '',
			)
		);
		register_setting(
			'base_blocks_google_maps_api',
			'base_blocks_google_maps_api',
			array(
				'type'              => 'string',
				'description'       => __( 'Google Maps API Key', 'gutenam-blocks-pro' ),
				'sanitize_callback' => 'sanitize_text_field',
				'show_in_rest'      => true,
				'default'           => '',
			)
		);
		register_setting(
			'base_blocks_cloud',
			'base_blocks_cloud',
			array(
				'type'              => 'string',
				'description'       => __( 'Config Base Blocks Cloud', 'gutenam-blocks' ),
				'sanitize_callback' => 'sanitize_text_field',
				'show_in_rest'      => true,
				'default'           => '',
			)
		);
		register_setting(
			'base_blocks_wire_subscribe',
			'base_blocks_wire_subscribe',
			array(
				'type'              => 'boolean',
				'description'       => __( 'Subscribe to Wireframe library', 'gutenam-blocks' ),
				'sanitize_callback' => 'rest_sanitize_boolean',
				'show_in_rest'      => true,
				'default'           => false,
			)
		);
		register_setting(
				'base_blocks_convertkit_api',
				'base_blocks_convertkit_api',
				array(
						'type'              => 'string',
						'description'       => __( 'ConvertKit API Key', 'gutenam-blocks-pro' ),
						'sanitize_callback' => 'sanitize_text_field',
						'show_in_rest'      => true,
						'default'           => '',
				)
		);
		register_setting(
				'base_blocks_activecampaign_api_key',
				'base_blocks_activecampaign_api_key',
				array(
						'type'              => 'string',
						'description'       => __( 'ConvertKit API Key', 'gutenam-blocks-pro' ),
						'sanitize_callback' => 'sanitize_text_field',
						'show_in_rest'      => true,
						'default'           => '',
				)
		);
		register_setting(
				'base_blocks_activecampaign_api_base',
				'base_blocks_activecampaign_api_base',
				array(
						'type'              => 'string',
						'description'       => __( 'ConvertKit API Key', 'gutenam-blocks-pro' ),
						'sanitize_callback' => 'sanitize_text_field',
						'show_in_rest'      => true,
						'default'           => '',
				)
		);
	}
	/**
	 * Register settings
	 */
	public function load_settings() {

		register_setting( 'bst_blocks_editor_width', 'bst_blocks_editor_width', array( $this, 'validate_options' ) );

		// Sidebar and No sidebar Max widths.
		add_settings_section( 'bst_blocks_editor_width_sec', '', array( $this, 'maxwidths_callback' ), 'bst_blocks_editor_width_section' );
		add_settings_field( 'sidebar', __( 'Small Template', 'gutenam-blocks' ), array( $this, 'sidebar_callback' ), 'bst_blocks_editor_width_section', 'bst_blocks_editor_width_sec' );
		add_settings_field( 'nosidebar', __( 'Large Template', 'gutenam-blocks' ), array( $this, 'nosidebar_callback' ), 'bst_blocks_editor_width_section', 'bst_blocks_editor_width_sec' );
		// Defaults for Pages and posts.
		add_settings_field( 'post_default', __( 'Post default', 'gutenam-blocks' ), array( $this, 'post_default_callback' ), 'bst_blocks_editor_width_section', 'bst_blocks_editor_width_sec' );
		add_settings_field( 'page_default', __( 'Page Default', 'gutenam-blocks' ), array( $this, 'page_default_callback' ), 'bst_blocks_editor_width_section', 'bst_blocks_editor_width_sec' );
		//add_settings_field( 'limited_margins', __( 'Enable Less Margin CSS', 'gutenam-blocks' ), array( $this, 'limited_margins_callback' ), 'bst_blocks_editor_width_section', 'bst_blocks_editor_width_sec' );
		add_settings_field( 'enable_editor_width', __( 'Enable Editor Width', 'gutenam-blocks' ), array( $this, 'enabled_editor_width_callback' ), 'bst_blocks_editor_width_section', 'bst_blocks_editor_width_sec' );

	}
	/**
	 * Outputs Sidebar number field
	 */
	public function enabled_editor_width_callback() {
		$data = self::get_data_options( 'bst_blocks_editor_width' );
		$default_enabled = ( isset( $data['enable_editor_width'] ) ? $data['enable_editor_width'] : 'true' );
		echo '<p>' . esc_html__( 'Allows for changes to the editor width on per page/post basis with preset defaults.', 'gutenam-blocks' ) . '<p>';
		echo '<select class="bst-blocks-enable-editor-width bst-editor-width-defaults-select" name="bst_blocks_editor_width[enable_editor_width]">';
			echo '<option value="false" ' . ( 'false' === $default_enabled ? 'selected' : '' ) . '>' . esc_html__( 'False', 'gutenam-blocks' ) . '</option>';
			echo '<option value="true" ' . ( 'true' === $default_enabled ? 'selected' : '' ) . '>' . esc_html__( 'True', 'gutenam-blocks' ) . '</option>';
		echo '</select>';
	}

	/**
	 * Outputs Limited Margins Field
	 */
	public function limited_margins_callback() {
		$data = self::get_data_options( 'bst_blocks_editor_width' );
		$default_limited = ( isset( $data['limited_margins'] ) ? $data['limited_margins'] : 'false' );
		echo '<p>' . esc_html__( 'Experimental editor CSS for less excess margins in Gutenberg in an attempt to get a closer WYSIWYG editing experience.', 'gutenam-blocks' ) . '<p>';
		echo '<select class="bst-blocks-limited-margins bst-editor-width-defaults-select" name="bst_blocks_editor_width[limited_margins]">';
			echo '<option value="false" ' . ( 'false' === $default_limited ? 'selected' : '' ) . '>' . esc_html__( 'False', 'gutenam-blocks' ) . '</option>';
			echo '<option value="true" ' . ( 'true' === $default_limited ? 'selected' : '' ) . '>' . esc_html__( 'True', 'gutenam-blocks' ) . '</option>';
		echo '</select>';
	}
	/**
	 * Outputs Sidebar number field
	 */
	public function sidebar_callback() {
		$data    = self::get_data_options( 'bst_blocks_editor_width' );
		$default = apply_filters( 'base_blocks_default_small_editor_width', '750' );
		echo "<input id='bst-sidebar-max' name='bst_blocks_editor_width[sidebar]' size='25' type='number' value='" . ( isset( $data['sidebar'] ) ? esc_attr( $data['sidebar'] ) : esc_attr( $default ) ) . "' />";
		echo '<span class="bst-sub-input-description">' . esc_html__( 'px', 'gutenam-blocks' ) . '</span>';
	}
	/**
	 * Outputs no sidebar number field
	 */
	public function nosidebar_callback() {
		$data    = self::get_data_options( 'bst_blocks_editor_width' );
		$default = apply_filters( 'base_blocks_default_large_editor_width', '1140' );
		echo "<input id='bst-sidebar-max' name='bst_blocks_editor_width[nosidebar]' size='25' type='number' value='" . ( isset( $data['nosidebar'] ) ? esc_attr( $data['nosidebar'] ) : esc_attr( $default ) ) . "' />";
		echo '<span class="bst-sub-input-description">' . esc_html__( 'px', 'gutenam-blocks' ) . '</span>';
	}

	/**
	 * Outputs post default select feild
	 */
	public function post_default_callback() {
		$data = self::get_data_options( 'bst_blocks_editor_width' );
		$default_post_type = ( isset( $data['post_default'] ) ? $data['post_default'] : 'sidebar' );
		echo '<select class="bst-blocks-posts-defaults bst-editor-width-defaults-select" name="bst_blocks_editor_width[post_default]">';
			echo '<option value="sidebar" ' . ( 'sidebar' === $default_post_type ? 'selected' : '' ) . '>' . esc_html__( 'Small', 'gutenam-blocks' ) . '</option>';
			echo '<option value="nosidebar" ' . ( 'nosidebar' === $default_post_type ? 'selected' : '' ) . '>' . esc_html__( 'Large', 'gutenam-blocks' ) . '</option>';
			echo '<option value="fullwidth" ' . ( 'fullwidth' === $default_post_type ? 'selected' : '' ) . '>' . esc_html__( 'Fullwidth', 'gutenam-blocks' ) . '</option>';
		echo '</select>';
	}
	/**
	 * Outputs post default select feild
	 */
	public function page_default_callback() {
		$data = self::get_data_options( 'bst_blocks_editor_width' );
		$default_page_type = ( isset( $data['page_default'] ) ? $data['page_default'] : 'sidebar' );
		echo '<select class="bst-blocks-posts-defaults bst-editor-width-defaults-select" name="bst_blocks_editor_width[page_default]">';
			echo '<option value="sidebar" ' . ( 'sidebar' === $default_page_type ? 'selected' : '' ) . '>' . esc_html__( 'Small', 'gutenam-blocks' ) . '</option>';
			echo '<option value="nosidebar" ' . ( 'nosidebar' === $default_page_type ? 'selected' : '' ) . '>' . esc_html__( 'Large', 'gutenam-blocks' ) . '</option>';
			echo '<option value="fullwidth" ' . ( 'fullwidth' === $default_page_type ? 'selected' : '' ) . '>' . esc_html__( 'Fullwidth', 'gutenam-blocks' ) . '</option>';
		echo '</select>';
	}
	/**
	 * Outputs title for content width.
	 */
	public function maxwidths_callback() {
		// global $content_width;
		// echo '<h5 class="bst-main-subtitle">' . esc_html__( 'Assign Editor Template Max Widths', 'gutenam-blocks' ) . '</h5>';
		// echo '<div class="bst-main-description-notice">' . esc_html__( 'Note: The current active themes "$content_width" is set to:', 'gutenam-blocks' ) . ' ' . esc_html( $content_width ) . 'px</div>';
	}
	/**
	 * Sanitizes and validates all input and output for Dashboard.
	 *
	 * @param array $input settings input.
	 */
	public function validate_options( $input ) {
		return $input;
	}
	/**
	 * Checks for base classic themes when returning defualt.
	 */
	public function show_editor_width() {
		if ( is_null( self::$editor_width ) ) {
			$show = false;
			$current_theme = wp_get_theme();
			$current_theme_name = $current_theme->get( 'Name' );
			$current_theme_template = $current_theme->get( 'Template' );
			// Check for a base classic theme support.
			if ( 'Avanam' == $current_theme_name || 'avanam' == $current_theme_template ) {
				$show = true;
			}
			self::$editor_width = $show;
		}
		return self::$editor_width;
	}
	/**
	 * Loads config page
	 */
	public function config_page() {
		?>
		<div class="base_blocks_dash_head">
			<div class="base_blocks_dash_head_container">
				<div class="base_blocks_dash_logo">
					<img src="<?php echo esc_url( BASE_BLOCKS_URL . 'includes/settings/img/gutenam-logo.png' ); ?>" alt="Gutenam">
				</div>
				<div class="base_blocks_dash_version">
					<span>
						<?php echo esc_html( apply_filters( 'base_blocks_brand_name', 'Gutenam Blocks' ) ) . ' ' . esc_html( GUTENAM_BLOCKS_VERSION ); ?>
					</span>
				</div>
			</div>
		</div>
		<div class="wrap base_blocks_dash">
			<div class="base_blocks_dashboard">
				<h2 class="notices" style="display:none;"></h2>
				<?php settings_errors(); ?>
				<div class="page-grid">
					<div class="base_blocks_dashboard_main">
						<h2 class="section-header"><?php echo esc_html( apply_filters( 'base_blocks_brand_name', 'Gutenam Blocks' ) ); ?></h2>
						<div class="three-col-grid">
							<?php
							$blocks = $this->blocks_array();
							$unregistered_blocks = get_option( 'bst_blocks_unregistered_blocks', array() );
							if ( ! is_array( $unregistered_blocks ) ) {
								$unregistered_blocks = array();
							}
							foreach ( $blocks as $block_key => $block ) {
								if ( in_array( $block['slug'], $unregistered_blocks ) ) {
									$btn_enabled_class = 'button-primary bst-block-inactive';
									$enabled_class = 'bst-block-inactive';
								} else {
									$btn_enabled_class = 'bst-block-active';
									$enabled_class = 'bst-block-active';
								}
								echo '<div class="base_blocks_item ' . esc_attr( $enabled_class ) . '">';
								echo '<h3>' . esc_html( $block['name'] ) . '</h3>';
								echo '<p>' . wp_kses_post( $block['desc'] ) . '</p>';
								echo '<div class="base_blocks_item_footer">';
								if ( in_array( $block['slug'], $unregistered_blocks ) ) {
									$btntitle = __( 'Activate', 'gutenam-blocks' );
									echo '<a class="bst_block_button button ' . esc_attr( $btn_enabled_class ) . '" data-inactive-label="' . esc_attr__( 'Activate', 'gutenam-blocks' ) . '" data-active-label="' . esc_attr__( 'Deactivate', 'gutenam-blocks' ) . '" data-activating-label="' . esc_attr__( 'Activating...', 'gutenam-blocks' ) . '" data-activated-label="' . esc_attr__( 'Activated', 'gutenam-blocks' ) . '"  data-deactivating-label="' . esc_attr__( 'Deactivating...', 'gutenam-blocks' ) . '"  data-deactivated-label="' . esc_attr__( 'Deactivated', 'gutenam-blocks' ) . '" data-block-slug="' . esc_attr( $block['slug'] ) . '" href="#">' . esc_html( $btntitle ) . '</a>';
								} else {
									$btntitle = __( 'Deactivate', 'gutenam-blocks' );
									// echo '<a class="bst_block_button button ' . esc_attr( $btn_enabled_class ) . '" data-inactive-label="' . esc_attr__( 'Activate', 'gutenam-blocks' ) . '" data-active-label="' . esc_attr__( 'Deactivate', 'gutenam-blocks' ) . '" data-activating-label="' . esc_attr__( 'Activating...', 'gutenam-blocks' ) . '" data-activated-label="' . esc_attr__( 'Activated', 'gutenam-blocks' ) . '"  data-deactivating-label="' . esc_attr__( 'Deactivating...', 'gutenam-blocks' ) . '"  data-deactivated-label="' . esc_attr__( 'Deactivated', 'gutenam-blocks' ) . '" data-block-slug="' . esc_attr( $block['slug'] ) . '" href="#">' . esc_html( $btntitle ) . '</a>';
								}
								if ( 'base/lottie' === $block['slug'] ) {
									echo '<a class="button" href="' . admin_url( 'edit.php?post_type=base_lottie' ) . '">' . esc_html__( 'Manage Lottie Animations', 'gutenam-blocks' ) . '</a>';
								}
								echo '</div>';
								echo '</div>';
							}
							?>
						</div>
						<div class="bst-dashboard-spacer"></div>
						<?php if ( apply_filters( 'base_blocks_editor_width', $this->show_editor_width() ) ) { ?>
							<h2><?php echo esc_html__( 'Editor Max Widths', 'gutenam-blocks' ); ?></br><small class="bst-main-subtitle"><?php echo esc_html__( 'Match the editor width to your sites width.', 'gutenam-blocks' ); ?></small></h2>
							<?php global $content_width; ?>
								<div class="bst-main-description-notice"><?php echo esc_html__( 'Note: The current active themes "content_width" is set to:', 'gutenam-blocks' ) . ' ' . esc_html( $content_width ); ?>px</div>
								<div class="bst-promo-row-area">
								<?php
								echo '<form action="options.php" method="post">';
									settings_fields( 'bst_blocks_editor_width' );
									do_settings_sections( 'bst_blocks_editor_width_section' );
									do_settings_sections( 'bst_blocks_editor_defaults_section' );
									submit_button( __( 'Save Changes', 'gutenam-blocks' ) );
								echo '</form>';
								?>
							</div>
							<div class="bst-dashboard-spacer"></div>
						<?php } ?>
					</div>
					<div class="side-panel">
						<?php do_action( 'base_blocks_dash_side_panel' ); ?>
						<?php if ( apply_filters( 'base_blocks_dash_brand_sidebar', true ) ) { ?>
							<?php do_action( 'base_blocks_dash_side_panel_pro' ); ?>
							<div class="support-section sidebar-section components-panel">
								<div class="components-panel__body is-opened">
									<h2><?php esc_html_e( 'Documentation', 'gutenam-blocks' ); ?></h2>
									<p><?php esc_html_e( 'Need help? We have a knowledge base full of articles to get you started.', 'gutenam-blocks' ); ?></p>
									<a href="https://avanam.org/base-blocks/documentation/?utm_source=in-app&utm_medium=base-blocks&utm_campaign=dashboard" target="_blank" class="sidebar-link"><?php esc_html_e( 'Browse Docs', 'gutenam-blocks' ); ?></a>
								</div>
							</div>
							<div class="support-section sidebar-section components-panel">
								<div class="components-panel__body is-opened">
									<h2><?php esc_html_e( 'Support', 'gutenam-blocks' ); ?></h2>
									<p><?php esc_html_e( 'Have a question, we are happy to help! Get in touch with our support team.', 'gutenam-blocks' ); ?></p>
									<a href="https://avanam.org/free-support/?utm_source=in-app&utm_medium=base-blocks&utm_campaign=dashboard" target="_blank" class="sidebar-link"><?php esc_html_e( 'Submit a Ticket', 'gutenam-blocks' ); ?></a>
								</div>
							</div>
						<?php } ?>
						<?php do_action( 'base_blocks_dash_below_side_panel' ); ?>
					</div>
				</div>
			</div>
		</div>
		<?php
	}
	/**
	 * Admin Pro Base Notice.
	 */
	public function admin_pro_base_notice() {
		if ( ! class_exists( 'Base_Blocks_Pro' ) ) {
			?>
			<div class="pro-section sidebar-section components-panel">
				<div class="components-panel__body is-opened">
					<h2><?php esc_html_e( 'Gutenam Blocks Pro', 'gutenam-blocks' ); ?></h2>
					<ul>
						<li><?php esc_html_e( '10 Pro Blocks', 'gutenam-blocks' ); ?></li>
						<li><?php esc_html_e( 'Pro Block Addons', 'gutenam-blocks' ); ?></li>
						<li><?php esc_html_e( 'Dynamic Content', 'gutenam-blocks' ); ?></li>
						<li><?php esc_html_e( 'Custom Icons', 'gutenam-blocks' ); ?></li>
						<li><?php esc_html_e( 'Custom Fonts', 'gutenam-blocks' ); ?></li>
						<li><?php esc_html_e( 'Premium Design Library', 'gutenam-blocks' ); ?></li>
					</ul>
					<a href="https://avanam.org/base-blocks/pro/?utm_source=in-app&utm_medium=base-blocks&utm_campaign=dashboard" target="_blank" class="sidebar-btn-link"><?php esc_html_e( 'Upgrade Gutenam Blocks', 'gutenam-blocks' ); ?></a>
				</div>
			</div>
			<?php
		}
	}
	/**
	 * Get array of Base Blocks.
	 */
	public function blocks_array() {
		$blocks = array(
			'base/rowlayout'   => array(
				'slug'  => 'base/rowlayout',
				'name'  => __( 'Row Layout', 'gutenam-blocks' ),
				'desc'  => __( 'Create rows with nested blocks either in columns or as a container. Give style to your rows with background, overlay, padding, etc.', 'gutenam-blocks' ),
				'image' => BASE_BLOCKS_URL . 'includes/settings/img/rowlayout.jpg',
			),
			'base/form'        => array(
				'slug'  => 'base/form',
				'name'  => __( 'Form', 'gutenam-blocks' ),
				'desc'  => __( 'Create a contact form or marketing form and style it within the block editor.', 'gutenam-blocks' ),
				'image' => BASE_BLOCKS_URL . 'includes/settings/img/form-block.jpg',
			),
			'base/advancedgallery' => array(
				'slug'  => 'base/advancedgallery',
				'name'  => __( 'Advanced Gallery', 'gutenam-blocks' ),
				'desc'  => __( 'Photo galleries, carousels, and sliders! Enable custom links, captions, and more. Plus, you can select image sizes.', 'gutenam-blocks' ),
				'image' => BASE_BLOCKS_URL . 'includes/settings/img/gallery-block.jpg',
			),
			'base/advancedbtn' => array(
				'slug'  => 'base/advancedbtn',
				'name'  => __( 'Advanced Button', 'gutenam-blocks' ),
				'desc'  => __( 'Create an advanced button or a row of buttons. Style each one including hover controls plus you can use an icon and display them side by side', 'gutenam-blocks' ),
				'image' => BASE_BLOCKS_URL . 'includes/settings/img/btn.jpg',
			),
			'base/lottie'        => array(
				'slug'  => 'base/lottie',
				'name'  => __( 'Lottie Animations', 'gutenam-blocks' ),
				'desc'  => __( 'Add an extra "wow" factor to your site with engaging Lottie animations.', 'gutenam-blocks' ),
			),
			'base/icon'        => array(
				'slug'  => 'base/icon',
				'name'  => __( 'Icon', 'gutenam-blocks' ),
				'desc'  => __( 'Choose from over 1500+ SVG Icons to add into your page and style the size, colors, background, border, etc.', 'gutenam-blocks' ),
				'image' => BASE_BLOCKS_URL . 'includes/settings/img/icon.jpg',
			),
			'base/spacer'      => array(
				'slug'  => 'base/spacer',
				'name'  => __( 'Spacer/Divider', 'gutenam-blocks' ),
				'desc'  => __( 'Easily create a divider and determine the space around it or just create some space in your content.', 'gutenam-blocks' ),
				'image' => BASE_BLOCKS_URL . 'includes/settings/img/spacer.jpg',
			),
			'base/advancedheading'      => array(
				'slug'  => 'base/advancedheading',
				'name'  => __( 'Advanced Text', 'gutenam-blocks' ),
				'desc'  => __( 'Create a heading or paragraph and define sizes for desktop, tablet and mobile along with font family, colors, etc.', 'gutenam-blocks' ),
				'image' => BASE_BLOCKS_URL . 'includes/settings/img/heading.jpg',
			),
			'base/tabs'      => array(
				'slug'  => 'base/tabs',
				'name'  => __( 'Tabs', 'gutenam-blocks' ),
				'desc'  => __( 'Create custom vertical or horizontal tabs with advanced styling controls. Each tab content is an empty canvas able to contain any other blocks.', 'gutenam-blocks' ),
				'image' => BASE_BLOCKS_URL . 'includes/settings/img/tabs.jpg',
			),
			'base/infobox'      => array(
				'slug'  => 'base/infobox',
				'name'  => __( 'Info Box', 'gutenam-blocks' ),
				'desc'  => __( 'Create a box containing an icon or image and, optionally, a title, description, and learn more text. Style static and hover separately.', 'gutenam-blocks' ),
				'image' => BASE_BLOCKS_URL . 'includes/settings/img/infobox.jpg',
			),
			'base/accordion'      => array(
				'slug'  => 'base/accordion',
				'name'  => __( 'Accordion', 'gutenam-blocks' ),
				'desc'  => __( 'Create beautiful accordions! Each pane can contain any other block, customize title styles, content background, and borders.', 'gutenam-blocks' ),
				'image' => BASE_BLOCKS_URL . 'includes/settings/img/accordion.jpg',
			),
			'base/iconlist'      => array(
				'slug'  => 'base/iconlist',
				'name'  => __( 'Icon List', 'gutenam-blocks' ),
				'desc'  => __( 'Add beautiful icons to your lists and make them more engaging. Over 1500 icons to choose from and unlimited styles.', 'gutenam-blocks' ),
				'image' => BASE_BLOCKS_URL . 'includes/settings/img/iconlist.jpg',
			),
			'base/tableofcontents'      => array(
				'slug'  => 'base/tableofcontents',
				'name'  => __( 'Table of Contents', 'gutenam-blocks' ),
				'desc'  => __( 'Allow your readers to navigate your content easily with a table of contents block. Includes smooth scroll to anchor.', 'gutenam-blocks' ),
			),
			'base/posts'      => array(
				'slug'  => 'base/posts',
				'name'  => __( 'Posts', 'gutenam-blocks' ),
				'desc'  => __( 'Display a clean grid of posts anywhere on your site, great for your home page where you want to tease your blog.', 'gutenam-blocks' ),
			),
			'base/countdown'      => array(
				'slug'  => 'base/countdown',
				'name'  => __( 'Countdown', 'gutenam-blocks' ),
				'desc'  => __( 'Increase your conversions by adding a sense of urgency to your offering. Pro includes evergreen campaigns as well.', 'gutenam-blocks' ),
			),
			'base/testimonials'      => array(
				'slug'  => 'base/testimonials',
				'name'  => __( 'Testimonials', 'gutenam-blocks' ),
				'desc'  => __( 'Create confidence in your brand or product by showing off beautiful unique testimonials, add as a carousel or a grid.', 'gutenam-blocks' ),
				'image' => BASE_BLOCKS_URL . 'includes/settings/img/testimonials.jpg',
			),
		);
		return apply_filters( 'base_blocks_enable_disable_array', $blocks );
	}
	/**
	 * Ajax Save blocks Config
	 */
	public function ajax_blocks_save_config() {
		if ( ! check_ajax_referer( 'base-blocks-manage', 'wpnonce' ) ) {
			wp_send_json_error( __( 'Invalid nonce', 'gutenam-blocks' ) );
		}
		if ( ! isset( $_POST['bst_block'] ) && ! isset( $_POST['config'] ) ) {
			return wp_send_json_error( __( 'Missing Content', 'gutenam-blocks' ) );
		}
		// Get settings.
		$current_settings = get_option( 'bst_blocks_config_blocks' );
		$new_settings     = wp_unslash( $_POST['config'] );
		if ( ! is_array( $new_settings ) ) {
			return wp_send_json_error( __( 'Nothing to Save', 'gutenam-blocks' ) );
		}
		foreach ( $new_settings as $block_key => $settings ) {
			foreach ( $settings as $attribute_key => $value ) {
				if ( is_array( $value ) ) {
					foreach ( $value as $array_attribute_index => $array_value ) {
						if ( is_array( $array_value ) ) {
							foreach ( $array_value as $array_attribute_key => $array_attribute_value ) {
								$array_attribute_value = sanitize_text_field( $array_attribute_value );
								if ( is_numeric( $array_attribute_value ) ) {
									$array_attribute_value = floatval( $array_attribute_value );
								}
								if ( 'true' === $array_attribute_value ) {
									$array_attribute_value = true;
								}
								if ( 'false' === $array_attribute_value ) {
									$array_attribute_value = false;
								}
								$new_settings[ $block_key ][ $attribute_key ][ $array_attribute_index ][ $array_attribute_key ] = $array_attribute_value;
							}
						} else {
							$array_value = sanitize_text_field( $array_value );
							if ( is_numeric( $array_value ) ) {
								$array_value = floatval( $array_value );
							}
							$new_settings[ $block_key ][ $attribute_key ][ $array_attribute_index ] = $array_value;
						}
					}
				} else {
					$value = sanitize_text_field( $value );
					if ( is_numeric( $value ) ) {
						$value = floatval( $value );
					}
					if ( 'true' === $value ) {
						$value = true;
					}
					if ( 'false' === $value ) {
						$value = false;
					}
					$new_settings[ $block_key ][ $attribute_key ] = $value;
				}
			}
		}
		$block = sanitize_text_field( wp_unslash( $_POST['bst_block'] ) );

		if ( ! is_array( $current_settings ) ) {
			$current_settings = array();
		}
		$current_settings[ $block ] = $new_settings[ $block ];
		update_option( 'bst_blocks_config_blocks', $current_settings );
		return wp_send_json_success();
	}
	/**
	 * Ajax activate/deactivate blocks
	 */
	public function ajax_blocks_activate_deactivate() {
		if ( ! check_ajax_referer( 'base-blocks-manage', 'wpnonce' ) ) {
			wp_send_json_error();
		}
		if ( ! isset( $_POST['bst_block'] ) ) {
			return wp_send_json_error();
		}
		// Get variables.
		$unregistered_blocks = get_option( 'bst_blocks_unregistered_blocks' );
		$block               = sanitize_text_field( wp_unslash( $_POST['bst_block'] ) );

		if ( ! is_array( $unregistered_blocks ) ) {
			$unregistered_blocks = array();
		}

		// If current block is in the array - remove it.
		if ( in_array( $block, $unregistered_blocks ) ) {
			$index = array_search( $block, $unregistered_blocks );
			if ( false !== $index ) {
				unset( $unregistered_blocks[ $index ] );
			}
			// if current block is not in the array - add it.
		} else {
			array_push( $unregistered_blocks, $block );
		}

		update_option( 'bst_blocks_unregistered_blocks', $unregistered_blocks );
		return wp_send_json_success();
	}
	/**
	 * Ajax default posts width
	 */
	public function ajax_default_editor_width() {
		if ( ! check_ajax_referer( 'base-blocks-manage', 'wpnonce' ) ) {
			wp_send_json_error();
		}
		if ( ! isset( $_POST['post_default'] ) ) {
			return wp_send_json_error();
		}
		// Get variables.
		$editor_widths = get_option( 'bst_blocks_editor_width' );
		$default       = sanitize_text_field( wp_unslash( $_POST['post_default'] ) );

		if ( ! is_array( $editor_widths ) ) {
			$editor_widths = array();
		}
		$editor_widths['post_default'] = $default;

		update_option( 'bst_blocks_editor_width', $editor_widths );
		return wp_send_json_success();
	}
	/**
	 * Add settings link
	 */
	public function settings_link() {
		return apply_filters( 'base-blocks-settings-url', admin_url( 'admin.php?page=base-blocks' ) );
	}
	/**
	 * Add settings link
	 *
	 * @param array $links plugin activate/deactivate links array.
	 */
	public function add_settings_link( $links ) {
		$settings_link = '<a href="' . esc_url( $this->settings_link() ) . '">' . __( 'Settings', 'gutenam-blocks' ) . '</a>';
		array_push( $links, $settings_link );
		return $links;
	}

}
Base_Blocks_Settings::get_instance();
