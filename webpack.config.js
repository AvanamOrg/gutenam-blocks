const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );
const StyleOnlyEntryPlugin = require( './src/config/style-only-entry-plugin' );
const EXTERNAL_NAME = 'base';
const HANDLE_NAME = 'base';
const PROJECT_NAMESPACE = '@base/';

function camelCaseDash(string) {
	return string.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

module.exports = {
	...defaultConfig,
	entry: {
		'icons': './src/packages/icons/src/index.js',
		'components': './src/packages/components/src/index.js',
		'helpers': './src/packages/helpers/src/index.js',
		'blocks-googlemaps': './src/blocks/googlemaps/block.js',
		'blocks-lottie': './src/blocks/lottie/index.js',
		'blocks-image': './src/blocks/image/index.js',
		'blocks-spacer': './src/blocks/spacer/index.js',
		'blocks-advancedbtn': './src/blocks/advancedbtn/block.js',
		'blocks-singlebtn': './src/blocks/singlebtn/block.js',
		'blocks-countup': './src/blocks/countup/block.js',
		'blocks-rowlayout': './src/blocks/rowlayout/index.js',
		'blocks-column': './src/blocks/column/index.js',
		'blocks-advancedheading': './src/blocks/advancedheading/block.js',
		'blocks-icon': './src/blocks/icon/block.js',
		'blocks-single-icon': './src/blocks/single-icon/block.js',
		'blocks-tabs': './src/blocks/tabs/block.js',
		'blocks-infobox': './src/blocks/infobox/block.js',
		'blocks-accordion': './src/blocks/accordion/block.js',
		'blocks-iconlist': './src/blocks/iconlist/block.js',
		'blocks-advancedgallery': './src/blocks/advancedgallery/block.js',
		'blocks-form': './src/blocks/form/block.js',
		'blocks-tableofcontents': './src/blocks/tableofcontents/index.js',
		'blocks-posts': './src/blocks/posts/block.js',
		'blocks-show-more': './src/blocks/show-more/index.js',
		'blocks-countdown': './src/blocks/countdown/block.js',
		'blocks-testimonial': './src/blocks/testimonial/block.js',
		'blocks-testimonials': './src/blocks/testimonials/block.js',
		'blocks-advanced-form': './src/blocks/advanced-form/index.js',
		'plugin-base-control': './src/plugin.js',
		'extension-base-base': './src/extension/base-base/index.js',
		'extension-stores': './src/extension/stores/index.js',
		'extension-block-css': './src/extension/block-css/index.js',
	},
	output: {
		...defaultConfig.output,
		path: __dirname + '/dist/',
		library: ['base', '[name]'],
		libraryTarget: 'this',
	},
	plugins: [
		new StyleOnlyEntryPlugin(),
		...defaultConfig.plugins.filter(
			( plugin ) =>
				plugin.constructor.name !== 'DependencyExtractionWebpackPlugin'
		),
		new DependencyExtractionWebpackPlugin({
			requestToExternal(request) {
				if (request.endsWith('.css')) {
					return false;
				}

				if (request.startsWith(PROJECT_NAMESPACE)) {
					return [
						EXTERNAL_NAME,
						camelCaseDash(
							request.substring(PROJECT_NAMESPACE.length)
						),
					];
				}
			},
			requestToHandle(request) {
				if (request.startsWith(PROJECT_NAMESPACE)) {
					return `${HANDLE_NAME}-${request.substring(
						PROJECT_NAMESPACE.length
					)}`;
				}
			},
		}),
	],
};
