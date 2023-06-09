<?php
/**
 * Entry Template for Posts Block.
 *
 * This template can be overridden by copying it to yourtheme/base-blocks/entry-loop-thumbnail.php.
 *
 * @package Base Blocks
 */

defined( 'ABSPATH' ) || exit;

if ( post_password_required() || ! post_type_supports( get_post_type(), 'thumbnail' ) || ! has_post_thumbnail() ) {
	return;
}

$enabled  = ( isset( $attributes ) && is_array( $attributes ) && isset( $attributes['image'] ) && ! $attributes['image'] ? false : true );
$img_link = ( isset( $attributes ) && is_array( $attributes ) && isset( $attributes['imageLink'] ) && ! $attributes['imageLink'] ? false : true );
$ratio    = apply_filters( 'base_blocks_posts_image_ratio', ( isset( $attributes ) && is_array( $attributes ) && isset( $attributes['imageRatio'] ) && $attributes['imageRatio'] ? $attributes['imageRatio'] : '2-3' ), $attributes );
$size     = apply_filters( 'base_blocks_posts_image_size', ( isset( $attributes ) && is_array( $attributes ) && isset( $attributes['imageSize'] ) && $attributes['imageSize'] ? $attributes['imageSize'] : 'medium_large' ), $attributes );

if ( $enabled ) {
	$alt = get_post_meta( get_post_thumbnail_id(), '_wp_attachment_image_alt', true );
	if ( $img_link ) {
		?>
		<a class="post-thumbnail base-thumbnail-ratio-<?php echo esc_attr( $ratio ); ?>" href="<?php the_permalink(); ?>">
			<div class="post-thumbnail-inner">
				<?php
				the_post_thumbnail(
					$size,
					array(
						'alt' => $alt ? $alt : the_title_attribute(
							array(
								'echo' => false,
							)
						),
					)
				);
				?>
			</div>
		</a><!-- .post-thumbnail -->
		<?php
	} else {
		?>
		<div class="post-thumbnail base-thumbnail-ratio-<?php echo esc_attr( $ratio ); ?>">
			<div class="post-thumbnail-inner">
				<?php
				the_post_thumbnail(
					$size,
					array(
						'alt' => $alt ? $alt : the_title_attribute(
							array(
								'echo' => false,
							)
						),
					)
				);
				?>
			</div>
		</div><!-- .post-thumbnail -->
		<?php
	}
}
