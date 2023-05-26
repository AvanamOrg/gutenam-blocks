import { __ } from '@wordpress/i18n';
import { useAnchor } from '@wordpress/rich-text';
import {
	Popover,
	ToggleControl,
	Button,
	TextControl,
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components';
import {
	useCachedTruthy,
} from '@wordpress/block-editor';
import { BasePanelBody } from '@base/components';

import { baseTypedText as settings } from './typed-text';

export default function TypedTextPopover( {
	name,
	value,
	updateFormat,
	onClose,
	contentRef,
	activeAttributes,
} ) {
	const defaultAttributes = {
		strings       : JSON.stringify( [ '' ] ),
		cursorChar    : '_',
		startDelay    : 0,
		backDelay     : 700,
		typeSpeed     : 40,
		backSpeed     : 30,
		smartBackspace: 'false',
		loop          : 'true',
		loopCount     : 'false',
		shuffle       : 'false',
	};
	const getCurrentSettings = () => {
		let response = { ...defaultAttributes, ...activeAttributes };

		try {
			response.strings = JSON.parse( response.strings );
		} catch ( e ) {
			console.log( 'Error parsing strings', e );
		}

		return response;
	};
	const typedSettings = getCurrentSettings();
	const popoverAnchor = useCachedTruthy(
		useAnchor( {
			editableContentElement: contentRef.current,
			value,
			settings,
		} )
	);
	return (
		<Popover
			className="bsb-typing-popover"
			onClose={ onClose }
			anchor={ popoverAnchor }
		>
			<BasePanelBody
				initialOpen={true}
				panelName={'bsb-typing-basic-settings'}
			>
				<h2 style={{ marginTop: '0px' }}>{__( 'Typed Text', 'gutenam-blocks' )}</h2>

				<div
					style={{
						display       : 'flex',
						flexDirection : 'row',
						justifyContent: 'space-between',
						alignItems    : 'flex-end',
					}}
				>

					<div
						style={{ flexBasis: '40%' }}
					>

						<TextControl
							label={__( 'Cursor', 'gutenam-blocks' )}
							value={typedSettings.cursorChar}
							onChange={( newValue ) => updateFormat( { cursorChar: newValue } )}
						/>
					</div>
					<div>


						<ToggleControl
							label={__( 'Loop Typing', 'gutenam-blocks' )}
							checked={( typedSettings.loop === 'true' ? true : false )}
							onChange={( val ) => {
								updateFormat( { loop: ( val ? 'true' : 'false' ) } );
							}}
						/>
					</div>

				</div>

			</BasePanelBody>

			<BasePanelBody
				title={__( 'Additional Strings', 'gutenam-blocks' )}
				initialOpen={false}
				panelName={'bsb-typing-additional-strings'}
			>
				<ToggleControl
					label={__( 'Shuffle Strings', 'gutenam-blocks' )}
					checked={( typedSettings.shuffle === 'true' ? true : false )}
					onChange={( val ) => {
						updateFormat( { shuffle: ( val ? 'true' : 'false' ) } );
					}}
				/>

				<ToggleControl
					label={__( 'Smart Backspace', 'gutenam-blocks' )}
					help={__( 'Only backspace what doesn\'t match the previous string.', 'gutenam-blocks' )}
					checked={( typedSettings.smartBackspace === 'true' ? true : false )}
					onChange={( val ) => {
						updateFormat( { smartBackspace: ( val ? 'true' : 'false' ) } );
					}}
				/>

				{typedSettings.strings.map( ( part, i ) => (
					<TextControl
						label={`String ${i + 1}`}
						value={part}
						onChange={( val ) => {
							const newValue = [ ...typedSettings.strings ];
							newValue[ i ] = val;
							updateFormat( { strings: newValue } );
						}}
					/>
				) )}

				<Button
					isPrimary={true}
					style={{ marginRight: '20px' }}
					onClick={() => {
						const newVal = [ ...typedSettings.strings ];
						newVal.push( '' );
						updateFormat( { strings: newVal } );
					}}
				>
					{__( 'Add String', 'gutenam-blocks' )}
				</Button>

				<Button
					isDestructive={true}
					onClick={() => {
						if ( typedSettings.strings.length > 1 ) {
							const value = [ ...typedSettings.strings ];
							value.splice( ( typedSettings.strings.length - 1 ), 1 );

							updateFormat( { strings: value } );
						} else {
							updateFormat( { strings: [ '' ] } );
						}
					}}
				>
					{__( 'Remove String', 'gutenam-blocks' )}
				</Button>

			</BasePanelBody>

			<BasePanelBody
				title={__( 'Speed Settings', 'gutenam-blocks' )}
				initialOpen={false}
				panelName={'bsb-typing-delay-settings'}
			>
				<NumberControl
					label={__( 'Start Delay (ms)', 'gutenam-blocks' )}
					value={typedSettings.startDelay}
					onChange={( newValue ) => updateFormat( { startDelay: ( newValue ? newValue.toString() : "0" ) } )}
					required={true}
					min={0}
					shiftStep={25}
				/>

				<NumberControl
					label={__( 'Back Delay (ms)', 'gutenam-blocks' )}
					value={typedSettings.backDelay}
					onChange={( newValue ) => { updateFormat( { backDelay: ( newValue ? newValue.toString() : "0" ) } ) } }
					required={true}
					min={0}
					shiftStep={25}
				/>

				<NumberControl
					label={__( 'Type Speed (ms)', 'gutenam-blocks' )}
					value={typedSettings.typeSpeed}
					onChange={( newValue ) => updateFormat( { typeSpeed: ( newValue ? newValue.toString() : "0" ) } )}
					required={true}
					min={0}
					shiftStep={25}
				/>

				<NumberControl
					label={__( 'Backspace Speed (ms)', 'gutenam-blocks' )}
					value={typedSettings.backSpeed}
					onChange={( newValue ) => updateFormat( { backSpeed: ( newValue ? newValue.toString() : "0" ) } )}
					required={true}
					min={0}
					shiftStep={25}
				/>
			</BasePanelBody>
		</Popover>
	);
}