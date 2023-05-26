<?php
/**
 * Base Update Checker
 * https://avanam.org
 *
 * Derived from:
 * Plugin Update Checker Library 4.10 and Kernl Update Checker v2.1.0
 *
 * Released under the MIT license.
 *
 * @package Gutenam Products
 */

require dirname(__FILE__) . '/inc/InstalledPackage.php';
require dirname(__FILE__) . '/inc/Metadata.php';
require dirname(__FILE__) . '/inc/OAuthSignature.php';
require dirname(__FILE__) . '/inc/Scheduler.php';
require dirname(__FILE__) . '/inc/StateStore.php';
require dirname(__FILE__) . '/inc/Update.php';
require dirname(__FILE__) . '/inc/UpdateChecker.php';
require dirname(__FILE__) . '/inc/UpgraderStatus.php';
require dirname(__FILE__) . '/inc/Utils.php';
// Theme.
require dirname(__FILE__) . '/inc/Theme/UpdateChecker.php';
require dirname(__FILE__) . '/inc/Theme/Update.php';
require dirname(__FILE__) . '/inc/Theme/Package.php';
// Plugin.
require dirname(__FILE__) . '/inc/Plugin/UpdateChecker.php';
require dirname(__FILE__) . '/inc/Plugin/Update.php';
require dirname(__FILE__) . '/inc/Plugin/Ui.php';
require dirname(__FILE__) . '/inc/Plugin/Package.php';
require dirname(__FILE__) . '/inc/Plugin/Info.php';
// Vendor.
require dirname(__FILE__) . '/inc/vendor/BasePucReadmeParser.php';
require dirname(__FILE__) . '/inc/vendor/Parsedown.php';
// Main File.
require dirname(__FILE__) . '/inc/Factory.php';

if ( is_multisite() ) {
	$show_local_activation = apply_filters( 'gutenam_activation_individual_multisites', true );
	if ( $show_local_activation ) {
			$gutenam_blocks_updater = Base_Update_Checker::buildUpdateChecker(
				'https://avanam.org/updates/gutenam-blocks/update.json',
				BASE_BLOCKS_PATH . 'gutenam-blocks.php',
				'gutenam-blocks'
			);
	} else {
			$gutenam_blocks_updater = Base_Update_Checker::buildUpdateChecker(
				'https://avanam.org/updates/gutenam-blocks/update.json',
				BASE_BLOCKS_PATH . 'gutenam-blocks.php',
				'gutenam-blocks'
			);
	}
} else {
	$gutenam_blocks_updater = Base_Update_Checker::buildUpdateChecker(
		'https://avanam.org/updates/gutenam-blocks/update.json',
		BASE_BLOCKS_PATH . 'gutenam-blocks.php',
		'gutenam-blocks'
	);
}