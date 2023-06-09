<?php
/**
 * Entry Template for Posts Block.
 *
 * This template can be overridden by copying it to yourtheme/base-blocks/entry-loop-header.php.
 *
 * @package Base Blocks
 */

defined( 'ABSPATH' ) || exit;
?>
<header class="entry-header">
	<?php
	if ( 'post' === get_post_type() ) {
		base_blocks_get_template( 'entry-loop-taxonomies.php', array( 'attributes' => $attributes ) );
	}
	base_blocks_get_template( 'entry-loop-title.php', array( 'attributes' => $attributes ) );

	base_blocks_get_template( 'entry-loop-meta.php', array( 'attributes' => $attributes ) );
	?>
</header><!-- .entry-header -->
