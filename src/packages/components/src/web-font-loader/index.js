if ( btgooglefonts === undefined ) {
	var btgooglefonts = [];
}
import { Component } from '@wordpress/element';
import PropTypes from "prop-types";
import WebFont from "webfontloader";
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
const statuses = {
	inactive: 'inactive',
	active: 'active',
	loading: 'loading',
};

const noop = () => {};

class WebfontLoader extends Component {
	constructor() {
		super( ...arguments );
		this.handleLoading = this.handleLoading.bind( this );
		this.handleActive = this.handleActive.bind( this );
		this.handleInactive = this.handleInactive.bind( this );
		this.loadFonts = this.loadFonts.bind( this );
		this.state = {
			status: undefined,
			mounted: false,
		};
	}
	addFont( font ) {
		if ( ! btgooglefonts.includes( font ) ) {
			btgooglefonts.push( font );
		}
	}
	handleLoading() {
		this.setState( { status: statuses.loading } );
	}

	handleActive() {
		this.setState( { status: statuses.active } );
	}

	handleInactive() {
		this.setState( { status: statuses.inactive } );
	}

	loadFonts() {
		if ( this.state.mounted ) {
			if ( ! btgooglefonts.includes( this.props.config.google.families[ 0 ] ) ) {
				WebFont.load( {
					...this.props.config,
					loading: this.handleLoading,
					active: this.handleActive,
					inactive: this.handleInactive,
					context: frames['editor-canvas'],
				} );
				this.addFont( this.props.config.google.families[ 0 ] );
			}
		}
	}

	componentDidMount() {
		btgooglefonts = [];
		this.setState( { mounted: true, device: this.props.getPreviewDevice } );
		this.loadFonts();
	}

	componentDidUpdate( prevProps, prevState ) {
		const { onStatus, config, getPreviewDevice } = this.props;

		if ( prevState.status !== this.state.status ) {
			onStatus( this.state.status );
		}
		if ( this.state.device !== getPreviewDevice ) {
			btgooglefonts = [];
			this.setState( { device: getPreviewDevice } );
			this.loadFonts();
		} else if ( prevProps.config !== config ) {
			this.loadFonts();
		}
	}
	componentWillUnmount() {
		this.setState( { mounted: false } );
	}
	render() {
		const { children } = this.props;
		return children || null;
	}
}

WebfontLoader.propTypes = {
	config: PropTypes.object.isRequired,
	children: PropTypes.element,
	onStatus: PropTypes.func.isRequired,
};

WebfontLoader.defaultProps = {
	onStatus: noop,
};

export default compose( [
	withSelect( ( select ) => {
		return {
			getPreviewDevice: select( 'baseblocks/data' ).getPreviewDeviceType(),
		};
	} ),
] )( WebfontLoader );
