<?php
/**
 * Entry Template for Posts Block.
 *
 * This template can be overridden by copying it to yourtheme/base-blocks/entry.php.
 *
 * @package Base Blocks
 */

defined( 'ABSPATH' ) || exit;
$enabled_image = ( isset( $attributes ) && is_array( $attributes ) && isset( $attributes['image'] ) && ! $attributes['image'] ? false : true );
?>
<article <?php post_class( 'entry content-bg loop-entry' . ( ! $enabled_image ? ' bsb-post-no-image' : '' ) ); ?>>
	<?php
		base_blocks_get_template( 'entry-loop-thumbnail.php', array( 'attributes' => $attributes ) );
	?>
	<div class="entry-content-wrap">
		<?php
		base_blocks_get_template( 'entry-loop-header.php', array( 'attributes' => $attributes ) );

		base_blocks_get_template( 'entry-summary.php', array( 'attributes' => $attributes ) );

		base_blocks_get_template( 'entry-loop-footer.php', array( 'attributes' => $attributes ) );
		?>
	</div>
</article>
