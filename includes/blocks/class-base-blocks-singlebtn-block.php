<?php
/**
 * Class to Build the Single Button Block.
 *
 * @package Base Blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class to Build the Single Button.
 *
 * @category class
 */
class Base_Blocks_Singlebtn_Block extends Base_Blocks_Abstract_Block {
	/**
	 * Instance of this class
	 *
	 * @var null
	 */
	private static $instance = null;

	/**
	 * Block name within this namespace.
	 *
	 * @var string
	 */
	protected $block_name = 'singlebtn';

	/**
	 * Block determines in scripts need to be loaded for block.
	 *
	 * @var string
	 */
	protected $has_style = false;

	/**
	 * Block determines in scripts need to be loaded for block.
	 *
	 * @var string
	 */
	protected $has_script = true;

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
	 * Render for block scripts block.
	 *
	 * @param array   $attributes the blocks attributes.
	 * @param boolean $inline true or false based on when called.
	 */
	public function render_scripts( $attributes, $inline = false ) {
		if ( ! empty( $attributes['target'] ) && 'video' === $attributes['target'] ) {
			$this->enqueue_style( 'base-glightbox' );
			$this->enqueue_script( 'base-blocks-glight-video-init' );
			$gallery_translation_array = array(
				'plyr_js'          => BASE_BLOCKS_URL . 'includes/assets/js/plyr.min.js',
				'plyr_css'         => BASE_BLOCKS_URL . 'includes/assets/css/plyr.min.css',
			);
			wp_localize_script( 'base-blocks-glight-video-init', 'base_video_pop', $gallery_translation_array );
		}
	}

	/**
	 * Builds CSS for block.
	 *
	 * @param array $attributes the blocks attributes.
	 * @param string $css the css class for blocks.
	 * @param string $unique_id the blocks attr ID.
	 * @param string $unique_style_id the blocks alternate ID for queries.
	 */
	public function build_css( $attributes, $css, $unique_id, $unique_style_id ) {

		$css->set_style_id( 'bsb-' . $this->block_name . $unique_style_id );

		$width_type = ! empty( $attributes['widthType'] ) ? $attributes['widthType'] : 'auto';
		if ( 'fixed' === $width_type ) {
			$css->set_selector( '.wp-block-base-advancedbtn .bsb-btn' . $unique_id . '.bsb-button, ul.menu .wp-block-base-advancedbtn .bsb-btn' . $unique_id . '.bsb-button' );
			$css->render_responsive_range( $attributes, 'width', 'width', 'widthUnit' );
		} else {
			$css->set_selector( 'ul.menu .wp-block-base-advancedbtn .bsb-btn' . $unique_id . '.bsb-button' );
			$css->add_property( 'width', 'initial' );
		}
		$css->set_selector( '.wp-block-base-advancedbtn .bsb-btn' . $unique_id . '.bsb-button' );
		$bg_type = ! empty( $attributes['backgroundType'] ) ? $attributes['backgroundType'] : 'normal';
		$bg_hover_type = ! empty( $attributes['backgroundHoverType'] ) ? $attributes['backgroundHoverType'] : 'normal';
		if ( ! empty( $attributes['color'] ) ) {
			$css->add_property( 'color', $css->render_color( $attributes['color'] ) );
		}
		if ( 'normal' === $bg_type && ! empty( $attributes['background'] ) ) {
			$css->add_property( 'background', $css->render_color( $attributes['background'] ) . ( 'gradient' === $bg_hover_type ? ' !important' : '' ) );
		}
		if ( 'gradient' === $bg_type && ! empty( $attributes['gradient'] ) ) {
			$css->add_property( 'background', $attributes['gradient'] . ' !important' );
		}
		$css->render_typography( $attributes, 'typography' );
		$css->render_measure_output( $attributes, 'borderRadius', 'border-radius' );
		$css->render_border_styles( $attributes, 'borderStyle', true );
		$css->render_measure_output( $attributes, 'padding', 'padding', [ 'unit_key' => 'paddingUnit' ] );
		$css->render_measure_output( $attributes, 'margin', 'margin', [ 'unit_key' => 'marginUnit' ] );
		if ( isset( $attributes['displayShadow'] ) && true === $attributes['displayShadow'] ) {
			if ( isset( $attributes['shadow'] ) && is_array( $attributes['shadow'] ) && isset( $attributes['shadow'][0] ) && is_array( $attributes['shadow'][0] ) ) {
				$css->add_property( 'box-shadow', ( isset( $attributes['shadow'][0]['inset'] ) && true === $attributes['shadow'][0]['inset'] ? 'inset ' : '' ) . ( isset( $attributes['shadow'][0]['hOffset'] ) && is_numeric( $attributes['shadow'][0]['hOffset'] ) ? $attributes['shadow'][0]['hOffset'] : '0' ) . 'px ' . ( isset( $attributes['shadow'][0]['vOffset'] ) && is_numeric( $attributes['shadow'][0]['vOffset'] ) ? $attributes['shadow'][0]['vOffset'] : '0' ) . 'px ' . ( isset( $attributes['shadow'][0]['blur'] ) && is_numeric( $attributes['shadow'][0]['blur'] ) ? $attributes['shadow'][0]['blur'] : '14' ) . 'px ' . ( isset( $attributes['shadow'][0]['spread'] ) && is_numeric( $attributes['shadow'][0]['spread'] ) ? $attributes['shadow'][0]['spread'] : '0' ) . 'px ' . $css->render_color( ( isset( $attributes['shadow'][0]['color'] ) && ! empty( $attributes['shadow'][0]['color'] ) ? $attributes['shadow'][0]['color'] : '#000000' ), ( isset( $attributes['shadow'][0]['opacity'] ) && is_numeric( $attributes['shadow'][0]['opacity'] ) ? $attributes['shadow'][0]['opacity'] : 0.2 ) ) );
			} else {
				$css->add_property( 'box-shadow', '1px 1px 2px 0px rgba(0, 0, 0, 0.2)' );
			}
		}
		// Icon.
		$css->set_selector( '.bsb-btn' . $unique_id . '.bsb-button .bsb-svg-icon-wrap' );
		if ( ! empty( $attributes['iconColor'] ) ) {
			$css->add_property( 'color', $css->render_color( $attributes['iconColor'] ) );
		}
		$css->render_measure_output( $attributes, 'iconPadding', 'padding', array( 'unit_key' => 'iconPaddingUnit' ) );
		$css->render_responsive_range( $attributes, 'iconSize', 'font-size', 'iconSizeUnit' );
		// Icon Hover.
		$css->set_selector( '.bsb-btn' . $unique_id . '.bsb-button:hover .bsb-svg-icon-wrap' );
		if ( ! empty( $attributes['iconColorHover'] ) ) {
			$css->add_property( 'color', $css->render_color( $attributes['iconColorHover'] ) );
		}
		// Hover.
		$css->set_selector( '.wp-block-base-advancedbtn .bsb-btn' . $unique_id . '.bsb-button:hover' );
		if ( ! empty( $attributes['colorHover'] ) ) {
			$css->add_property( 'color', $css->render_color( $attributes['colorHover'] ) );
		}
		if ( 'gradient' !== $bg_type && 'normal' === $bg_hover_type && ! empty( $attributes['backgroundHover'] ) ) {
			$css->add_property( 'background', $css->render_color( $attributes['backgroundHover'] ) );
		}
		$css->render_measure_output( $attributes, 'borderHoverRadius', 'border-radius' );
		$css->render_border_styles( $attributes, 'borderHoverStyle', true );
		if ( isset( $attributes['displayHoverShadow'] ) && true === $attributes['displayHoverShadow'] ) {
			if ( ( 'gradient' === $bg_type || 'gradient' === $bg_hover_type ) && isset( $attributes['shadowHover'][0]['inset'] ) && true === $attributes['shadowHover'][0]['inset'] ) {
				$css->add_property( 'box-shadow', '0px 0px 0px 0px rgba(0, 0, 0, 0)' );
				$css->set_selector( '.bsb-btn' . $unique_id . '.bsb-button:hover::before' );
			}
			if ( isset( $attributes['shadowHover'] ) && is_array( $attributes['shadowHover'] ) && isset( $attributes['shadowHover'][0] ) && is_array( $attributes['shadowHover'][0] ) ) {
				$css->add_property( 'box-shadow', ( isset( $attributes['shadowHover'][0]['inset'] ) && true === $attributes['shadowHover'][0]['inset'] ? 'inset ' : '' ) . ( isset( $attributes['shadowHover'][0]['hOffset'] ) && is_numeric( $attributes['shadowHover'][0]['hOffset'] ) ? $attributes['shadowHover'][0]['hOffset'] : '0' ) . 'px ' . ( isset( $attributes['shadowHover'][0]['vOffset'] ) && is_numeric( $attributes['shadowHover'][0]['vOffset'] ) ? $attributes['shadowHover'][0]['vOffset'] : '0' ) . 'px ' . ( isset( $attributes['shadowHover'][0]['blur'] ) && is_numeric( $attributes['shadowHover'][0]['blur'] ) ? $attributes['shadowHover'][0]['blur'] : '14' ) . 'px ' . ( isset( $attributes['shadowHover'][0]['spread'] ) && is_numeric( $attributes['shadowHover'][0]['spread'] ) ? $attributes['shadowHover'][0]['spread'] : '0' ) . 'px ' . $css->render_color( ( isset( $attributes['shadowHover'][0]['color'] ) && ! empty( $attributes['shadowHover'][0]['color'] ) ? $attributes['shadowHover'][0]['color'] : '#000000' ), ( isset( $attributes['shadowHover'][0]['opacity'] ) && is_numeric( $attributes['shadowHover'][0]['opacity'] ) ? $attributes['shadowHover'][0]['opacity'] : 0.2 ) ) );
			} else {
				$css->add_property( 'box-shadow', '2px 2px 3px 0px rgba(0, 0, 0, 0.4)' );
			}
		}
		// Hover before.
		$css->set_selector( '.bsb-btn' . $unique_id . '.bsb-button:hover::before' );
		if ( 'gradient' === $bg_type && 'normal' === $bg_hover_type && ! empty( $attributes['backgroundHover'] ) ) {
			$css->add_property( 'background', $css->render_color( $attributes['backgroundHover'] ) );
		}
		if ( 'gradient' === $bg_hover_type && ! empty( $attributes['gradientHover'] ) ) {
			$css->add_property( 'background', $attributes['gradientHover'] );
		}
		// Only Icon.
		if ( isset( $attributes['onlyIcon'][0] ) && '' !== $attributes['onlyIcon'][0] && true == $attributes['onlyIcon'][0] ) {
			$css->set_selector( '.bsb-btn' . $unique_id . '.bsb-button .bst-btn-inner-text' );
			$css->add_property( 'display', 'none' );
		}
		if ( isset( $attributes['onlyIcon'][1] ) && '' !== $attributes['onlyIcon'][1] ) {
			$css->set_media_state( 'tablet' );
			$css->set_selector( '.bsb-btn' . $unique_id . '.bsb-button .bst-btn-inner-text' );
			if ( true == $attributes['onlyIcon'][1] ) {
				$css->add_property( 'display', 'none' );
			} elseif ( false == $attributes['onlyIcon'][1] ) {
				$css->add_property( 'display', 'block' );
			}
		}
		if ( isset( $attributes['onlyIcon'][2] ) && '' !== $attributes['onlyIcon'][2] ) {
			$css->set_media_state( 'mobile' );
			$css->set_selector( '.bsb-btn' . $unique_id . '.bsb-button .bst-btn-inner-text' );
			if ( true == $attributes['onlyIcon'][2] ) {
				$css->add_property( 'display', 'none' );
			} elseif ( false == $attributes['onlyIcon'][2] ) {
				$css->add_property( 'display', 'block' );
			}
		}
		$css->set_media_state( 'desktop' );
		return $css->css_output();
	}
	/**
	 * Build HTML for dynamic blocks
	 *
	 * @param $attributes
	 * @param $unique_id
	 * @param $content
	 * @param WP_Block $block_instance The instance of the WP_Block class that represents the block being rendered.
	 *
	 * @return mixed
	 */
	public function build_html( $attributes, $unique_id, $content, $block_instance ) {
		$classes = array( 'bsb-button', 'bst-button', 'button', 'bsb-btn' . $unique_id );
		$classes[] = ! empty( $attributes['sizePreset'] ) ? 'bst-btn-size-' . $attributes['sizePreset'] : 'bst-btn-size-standard';
		$classes[] = ! empty( $attributes['widthType'] ) ? 'bst-btn-width-type-' . $attributes['widthType'] : 'bst-btn-width-type-auto';
		$classes[] = ! empty( $attributes['inheritStyles'] ) ? 'bsb-btn-global-' . $attributes['inheritStyles'] : 'bsb-btn-global-fill';
		$classes[] = ! empty( $attributes['text'] ) ? 'bst-btn-has-text-true' : 'bst-btn-has-text-false';
		$classes[] = ! empty( $attributes['icon'] ) ? 'bst-btn-has-svg-true' : 'bst-btn-has-svg-false';
		if ( ! empty( $attributes['target'] ) && 'video' === $attributes['target'] ) {
			$classes[] = 'btblocksvideopop';
		}
		if ( ! empty( $attributes['inheritStyles'] ) && 'inherit' === $attributes['inheritStyles'] ) {
			$classes[] = 'wp-block-button__link';
		}
		$wrapper_args = array(
			'class' => implode( ' ', $classes ),
		);
		if ( ! empty( $attributes['anchor'] ) ) {
			$wrapper_args['id'] = $attributes['anchor'];
		}
		if ( ! empty( $attributes['label'] ) ) {
			$wrapper_args['aria-label'] = $attributes['label'];
		}
		if ( ! empty( $attributes['link'] ) ) {
			$wrapper_args['href'] = do_shortcode( $attributes['link'] );
			$rel_add = '';
			if ( isset( $attributes['download'] ) && $attributes['download'] ) {
				$wrapper_args['download'] = '';
			}
			if ( ! empty( $attributes['target'] ) && '_blank' === $attributes['target'] ) {
				$wrapper_args['target'] = '_blank';
				$rel_add = 'noreferrer noopener';
			}
			if ( isset( $attributes['noFollow'] ) && $attributes['noFollow'] ) {
				$rel_add .= ' nofollow';
			}
			if ( isset( $attributes['sponsored'] ) && $attributes['sponsored'] ) {
				$rel_add .= ' sponsored';
			}
			if ( ! empty( $rel_add ) ) {
				$wrapper_args['rel'] = $rel_add;
			}
		}
		$wrapper_attributes = get_block_wrapper_attributes( $wrapper_args );

		$text       = ! empty( $attributes['text'] ) ? '<span class="bst-btn-inner-text">' . $attributes['text'] . '</span>' : '';
		$svg_icon   = '';
		if ( ! empty( $attributes['icon'] ) ) {
			$type         = substr( $attributes['icon'], 0, 2 );
			$line_icon    = ( ! empty( $type ) && 'fe' == $type ? true : false );
			$fill         = ( $line_icon ? 'none' : 'currentColor' );
			$stroke_width = false;

			if ( $line_icon ) {
				$stroke_width = 2;
			}
			$svg_icon = Base_Blocks_Svg_Render::render( $attributes['icon'], $fill, $stroke_width );
		}
		$icon_left  = ! empty( $svg_icon ) && ! empty( $attributes['iconSide'] ) && 'left' === $attributes['iconSide'] ? '<span class="bsb-svg-icon-wrap bsb-svg-icon-' . esc_attr( $attributes['icon'] ) . ' bst-btn-icon-side-left">' . $svg_icon . '</span>' : '';
		$icon_right = ! empty( $svg_icon ) && ! empty( $attributes['iconSide'] ) && 'right' === $attributes['iconSide'] ? '<span class="bsb-svg-icon-wrap bsb-svg-icon-' . esc_attr( $attributes['icon'] ) . ' bst-btn-icon-side-right">' . $svg_icon . '</span>' : '';
		$html_tag   = ! empty( $attributes['link'] ) ? 'a' : 'span';
		$content    = sprintf( '<%1$s %2$s>%3$s%4$s%5$s</%1$s>', $html_tag, $wrapper_attributes, $icon_left, $text, $icon_right );

		/*  Wrap in div is AOS is enabled. AOS transitions will interfere with hover transitions. */
		$aos_args = array();
		$aos_args = base_apply_aos_wrapper_args( $attributes, $aos_args );
		if ( ! empty( $aos_args ) ) {
			$aos_classes = array( 'bsb-blocks-button-aos' );
			$aos_classes[] = ! empty( $attributes['widthType'] ) ? 'bsb-btn-width-type-' . $attributes['widthType'] : 'bsb-btn-width-type-auto';
			$aos_args['class'] = implode( ' ', $aos_classes );
			$normalized_attributes = array();
			foreach ( $aos_args as $key => $value ) {
				$normalized_attributes[] = $key . '="' . esc_attr( $value ) . '"';
			}
			$content = sprintf( '<div %1$s>%2$s</div>', implode( ' ', $normalized_attributes ), $content );
		}

		return $content;
	}

	/**
	 * Registers scripts and styles.
	 */
	public function register_scripts() {
		parent::register_scripts();
		// If in the backend, bail out.
		if ( is_admin() ) {
			return;
		}
		if ( apply_filters( 'base_blocks_check_if_rest', false ) && base_blocks_is_rest() ) {
			return;
		}
		wp_register_style( 'base-glightbox', BASE_BLOCKS_URL . 'includes/assets/css/bsb-glightbox.min.css', array(), GUTENAM_BLOCKS_VERSION );
		wp_register_script( 'base-glightbox', BASE_BLOCKS_URL . 'includes/assets/js/glightbox.min.js', array(), GUTENAM_BLOCKS_VERSION, true );
		wp_register_script( 'base-blocks-glight-video-init', BASE_BLOCKS_URL . 'includes/assets/js/bsb-glight-video-init.min.js', array( 'base-glightbox' ), GUTENAM_BLOCKS_VERSION, true );
	}
}

Base_Blocks_Singlebtn_Block::get_instance();
