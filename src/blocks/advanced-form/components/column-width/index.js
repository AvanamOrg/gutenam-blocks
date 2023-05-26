import { __ } from '@wordpress/i18n';
import { map } from 'lodash';
import {
	TabPanel,
	Dashicon,
	SelectControl,
	ExternalLink,
	TextControl,
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

export default function ColumnWidth( { saveSubmit, width } ) {

	return (
		<TabPanel className="bst-size-tabs"
				  activeClass="active-tab"
				  tabs={[
					  {
						  name     : 'desk',
						  title    : <Dashicon icon="desktop"/>,
						  className: 'bst-desk-tab',
					  },
					  {
						  name     : 'tablet',
						  title    : <Dashicon icon="tablet"/>,
						  className: 'bst-tablet-tab',
					  },
					  {
						  name     : 'mobile',
						  title    : <Dashicon icon="smartphone"/>,
						  className: 'bst-mobile-tab',
					  },
				  ]}>
			{
				( tab ) => {
					let tabout;
					if ( tab.name ) {
						if ( 'mobile' === tab.name ) {
							tabout = (
								<SelectControl
									value={width[ 2 ]}
									options={[
										{ value: '20', label: __( '20%', 'gutenam-blocks' ) },
										{ value: '25', label: __( '25%', 'gutenam-blocks' ) },
										{ value: '33', label: __( '33%', 'gutenam-blocks' ) },
										{ value: '40', label: __( '40%', 'gutenam-blocks' ) },
										{ value: '50', label: __( '50%', 'gutenam-blocks' ) },
										{ value: '60', label: __( '60%', 'gutenam-blocks' ) },
										{ value: '66', label: __( '66%', 'gutenam-blocks' ) },
										{ value: '75', label: __( '75%', 'gutenam-blocks' ) },
										{ value: '80', label: __( '80%', 'gutenam-blocks' ) },
										{ value: '100', label: __( '100%', 'gutenam-blocks' ) },
										{ value: 'unset', label: __( 'Unset', 'gutenam-blocks' ) },
									]}
									onChange={value => {
										saveSubmit( { width: [ ( width[ 0 ] ? width[ 0 ] : '100' ), ( width[ 1 ] ? width[ 1 ] : '' ), value ] } );
									}}
								/>
							);
						} else if ( 'tablet' === tab.name ) {
							tabout = (
								<SelectControl
									value={width[ 1 ]}
									options={[
										{ value: '20', label: __( '20%', 'gutenam-blocks' ) },
										{ value: '25', label: __( '25%', 'gutenam-blocks' ) },
										{ value: '33', label: __( '33%', 'gutenam-blocks' ) },
										{ value: '40', label: __( '40%', 'gutenam-blocks' ) },
										{ value: '50', label: __( '50%', 'gutenam-blocks' ) },
										{ value: '60', label: __( '60%', 'gutenam-blocks' ) },
										{ value: '66', label: __( '66%', 'gutenam-blocks' ) },
										{ value: '75', label: __( '75%', 'gutenam-blocks' ) },
										{ value: '80', label: __( '80%', 'gutenam-blocks' ) },
										{ value: '100', label: __( '100%', 'gutenam-blocks' ) },
										{ value: 'unset', label: __( 'Unset', 'gutenam-blocks' ) },
									]}
									onChange={value => {
										saveSubmit( { width: [ ( width[ 0 ] ? width[ 0 ] : '100' ), value, ( width[ 2 ] ? width[ 2 ] : '' ) ] } );
									}}
								/>
							);
						} else {
							tabout = (
								<SelectControl
									value={width[ 0 ]}
									options={[
										{ value: '20', label: __( '20%', 'gutenam-blocks' ) },
										{ value: '25', label: __( '25%', 'gutenam-blocks' ) },
										{ value: '33', label: __( '33%', 'gutenam-blocks' ) },
										{ value: '40', label: __( '40%', 'gutenam-blocks' ) },
										{ value: '50', label: __( '50%', 'gutenam-blocks' ) },
										{ value: '60', label: __( '60%', 'gutenam-blocks' ) },
										{ value: '66', label: __( '66%', 'gutenam-blocks' ) },
										{ value: '75', label: __( '75%', 'gutenam-blocks' ) },
										{ value: '80', label: __( '80%', 'gutenam-blocks' ) },
										{ value: '100', label: __( '100%', 'gutenam-blocks' ) },
										{ value: 'unset', label: __( 'Unset', 'gutenam-blocks' ) },
									]}
									onChange={value => {
										saveSubmit( { width: [ value, ( width[ 1 ] ? width[ 1 ] : '' ), ( width[ 2 ] ? width[ 2 ] : '' ) ] } );
									}}
								/>
							);
						}
					}
					return <div className={tab.className} key={tab.className}>{tabout}</div>;
				}
			}
		</TabPanel>
	);

}
