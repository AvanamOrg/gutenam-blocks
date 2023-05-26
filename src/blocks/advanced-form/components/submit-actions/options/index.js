import { __ } from '@wordpress/i18n';
import { times } from 'lodash';
import { CheckboxControl } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';

export default function SubmitActionOptions( { setAttributes, selectedActions } ) {

	const actionOptionsList = [
		{ value: 'email', label: __( 'Email', 'gutenam-blocks' ), help: '', isDisabled: false },
		{ value: 'redirect', label: __( 'Redirect', 'gutenam-blocks' ), help: '', isDisabled: false },
		{ value: 'mailerlite', label: __( 'Mailerlite', 'gutenam-blocks' ), help: __( 'Add User to MailerLite list', 'gutenam-blocks' ), isDisabled: false },
		{ value: 'fluentCRM', label: __( 'FluentCRM', 'gutenam-blocks' ), help: __( 'Add User to FluentCRM list', 'gutenam-blocks' ), isDisabled: false },
		{ value: 'convertkit', label: __( 'ConvertKit (Pro addon)', 'gutenam-blocks' ), help: __( 'Add user to ConvertKit', 'gutenam-blocks' ), isDisabled: true },
		{ value: 'activecampaign', label: __( 'ActiveCampaign (Pro addon)', 'gutenam-blocks' ), help: __( 'Add user to ActiveCampaign', 'gutenam-blocks' ), isDisabled: true },
		{ value: 'autoEmail', label: __( 'Auto Respond Email (Pro addon)', 'gutenam-blocks' ), help: __( 'Send instant response to form entrant', 'gutenam-blocks' ), isDisabled: true },
		{ value: 'entry', label: __( 'Database Entry (Pro addon)', 'gutenam-blocks' ), help: __( 'Log each form submission', 'gutenam-blocks' ), isDisabled: false  }, // isDisabled: true },
		{ value: 'sendinblue', label: __( 'SendInBlue (Pro addon)', 'gutenam-blocks' ), help: __( 'Add user to SendInBlue list', 'gutenam-blocks' ), isDisabled: true },
		{ value: 'mailchimp', label: __( 'MailChimp (Pro addon)', 'gutenam-blocks' ), help: __( 'Add user to MailChimp list', 'gutenam-blocks' ), isDisabled: true },
		{ value: 'webhook', label: __( 'WebHook (Pro addon)', 'gutenam-blocks' ), help: __( 'Send form information to any third party webhook', 'gutenam-blocks' ), isDisabled: false }, // isDisabled: true },
	];

	const actionOptions = applyFilters( 'base.actionOptions', actionOptionsList );

	const actionControls = ( index ) => {

		return (
			<CheckboxControl
				key={'action-controls-' + index.toString()}
				label={actionOptions[ index ].label}
				help={( '' !== actionOptions[ index ].help ? actionOptions[ index ].help : undefined )}
				checked={selectedActions.includes( actionOptions[ index ].value )}
				disabled={actionOptions[ index ].isDisabled}
				onChange={( isChecked ) => {
					if ( isChecked && !actionOptions[ index ].isDisabled ) {
						addAction( actionOptions[ index ].value );
					} else {
						removeAction( actionOptions[ index ].value );
					}
				}}
			/>
		);
	};

	const addAction = ( value ) => {
		const newItems = selectedActions.map( ( item, thisIndex ) => {
			return item;
		} );

		newItems.push( value );

		setAttributes( newItems, 'actions' );
	};

	const removeAction = ( value ) => {
		setAttributes( selectedActions.filter( item => item !== value ), 'actions' );
	};

	return (
		<>
			{actionOptions &&
				times( actionOptions.length, n => actionControls( n ) )
			}
		</>
	);

}
