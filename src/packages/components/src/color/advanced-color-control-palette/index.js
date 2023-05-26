/**
 * Measure Component
 *
 */

/**
 * Internal block libraries
 */
import { __ } from '@wordpress/i18n';
import {	Component } from '@wordpress/element';
import {
	Button,
	Popover,
	ColorIndicator,
	ColorPicker,
	TextControl,
	Tooltip,
} from '@wordpress/components';

/**
 * Build the Measure controls
 * @returns {object} Measure settings.
 */
class AdvancedColorControlPalette extends Component {
	constructor( label, colorValue, onSave ) {
		super( ...arguments );
		this.state = {
			isVisible: false,
			color: '',
			name: '',
		};
	}
	componentDidMount() {
		this.setState( { color: this.props.colorValue } );
		this.setState( { name: this.props.nameValue } );
	}
	render() {
		const toggleVisible = () => {
			this.setState( { isVisible: true } );
		};
		const toggleClose = () => {
			if ( this.state.isVisible === true ) {
				this.setState( { isVisible: false } );
				this.props.onSave( this.state.color, this.state.name );
			}
		};
		const changeColor = ( value ) => {
			this.setState( { color: value } );
		};
		return (
			<div className="bst-advanced-color-settings-container">
				{ this.state.isVisible && (
					<Popover position="top left" className="bst-popover-color" onClose={ toggleClose }>
						<ColorPicker
							color={ ( undefined === this.state.color || '' === this.state.color ? this.props.colorValue : this.state.color ) }
							onChangeComplete={ ( color ) => changeColor( color.hex ) }
							disableAlpha
						/>
						<TextControl
							label={ __( 'Name:' ) }
							value={ ( undefined === this.state.name || '' === this.state.name ? this.props.nameValue : this.state.name ) }
							onChange={ ( value ) => this.setState( { name: value } ) }
						/>
					</Popover>
				) }
				{ this.state.isVisible && (
					<Tooltip text={ __( 'Edit Color' ) }>
						<Button className={ 'bst-color-icon-indicate' } onClick={ toggleClose }>
							<ColorIndicator className="bst-advanced-color-indicate" colorValue={ ( 'transparent' === this.state.color || undefined === this.state.color || '' === this.state.color ? this.props.colorDefault : this.state.color ) } />
						</Button>
					</Tooltip>
				) }
				{ ! this.state.isVisible && (
					<Tooltip text={ __( 'Edit Color' ) }>
						<Button className={ 'bst-color-icon-indicate' } onClick={ toggleVisible }>
							<ColorIndicator className="bst-advanced-color-indicate" colorValue={ ( 'transparent' === this.state.color || undefined === this.state.color || '' === this.state.color ? this.props.colorDefault : this.state.color ) } />
						</Button>
					</Tooltip>
				) }
			</div>
		);
	}
}
export default ( AdvancedColorControlPalette );
