/**
 * Range Control
 *
 */

/**
 * Internal block libraries
 */
 import { __ } from '@wordpress/i18n';
import { useInstanceId } from '@wordpress/compose';
import { range } from 'lodash';
import {
	Button,
	ToolbarGroup,
} from '@wordpress/components';
/**
 * Import Css
 */
 import './editor.scss';
import HeadingLevelIcon from './../heading-level-icon'
import {
	pxIcon,
	emIcon,
	remIcon,
	vhIcon,
	vwIcon,
	percentIcon,
} from '@base/icons';

let icons = {
	px: pxIcon,
	em: emIcon,
	rem: remIcon,
	vh: vhIcon,
	vw: vwIcon,
	percent: percentIcon,
};
/**
 * Build the Measure controls
 * @returns {object} Measure settings.
 */
export default function tagSelect( {
	label,
	onChange,
	value = '',
	className = '',
	isCollapsed = false,
	ariaLabel = __( 'Change HTML Tag', 'gutenam-blocks' ),
	reset = false,
	headingOnly = false,
	tagLowLevel = 1,
	tagHighLevel = 7,
} ) {
	const level = ( value !== 'span' && value !== 'div' && value !== 'p' ? value : 2 );
	const htmlTag = ( value === 'span' || value === 'div' || value === 'p' ? value : 'heading' );
	const headingOptions = [
		[
			{
				icon    : <HeadingLevelIcon level={1} isPressed={( 1 === level && htmlTag && htmlTag === 'heading' ? true : false )}/>,
				title   : __( 'Heading 1', 'gutenam-blocks' ),
				isActive: ( 1 === level && htmlTag && htmlTag === 'heading' ? true : false ),
				onClick : () => onChange( 1 ),
			},
		],
		[
			{
				icon    : <HeadingLevelIcon level={2} isPressed={( 2 === level && htmlTag && htmlTag === 'heading' ? true : false )}/>,
				title   : __( 'Heading 2', 'gutenam-blocks' ),
				isActive: ( 2 === level && htmlTag && htmlTag === 'heading' ? true : false ),
				onClick : () => onChange( 2 ),
			},
		],
		[
			{
				icon    : <HeadingLevelIcon level={3} isPressed={( 3 === level && htmlTag && htmlTag === 'heading' ? true : false )}/>,
				title   : __( 'Heading 3', 'gutenam-blocks' ),
				isActive: ( 3 === level && htmlTag && htmlTag === 'heading' ? true : false ),
				onClick : () => onChange( 3 ),
			},
		],
		[
			{
				icon    : <HeadingLevelIcon level={4} isPressed={( 4 === level && htmlTag && htmlTag === 'heading' ? true : false )}/>,
				title   : __( 'Heading 4', 'gutenam-blocks' ),
				isActive: ( 4 === level && htmlTag && htmlTag === 'heading' ? true : false ),
				onClick : () => onChange( 4 ),
			},
		],
		[
			{
				icon    : <HeadingLevelIcon level={5} isPressed={( 5 === level && htmlTag && htmlTag === 'heading' ? true : false )}/>,
				title   : __( 'Heading 5', 'gutenam-blocks' ),
				isActive: ( 5 === level && htmlTag && htmlTag === 'heading' ? true : false ),
				onClick : () => onChange( 5 ),
			},
		],
		[
			{
				icon    : <HeadingLevelIcon level={6} isPressed={( 6 === level && htmlTag && htmlTag === 'heading' ? true : false )}/>,
				title   : __( 'Heading 6', 'gutenam-blocks' ),
				isActive: ( 6 === level && htmlTag && htmlTag === 'heading' ? true : false ),
				onClick : () => onChange( 6 ),
			},
		],
		[
			{
				icon    : <HeadingLevelIcon level={'p'} isPressed={( htmlTag && htmlTag === 'p' ? true : false )}/>,
				title   : __( 'Paragraph', 'gutenam-blocks' ),
				isActive: ( htmlTag && htmlTag === 'p' ? true : false ),
				onClick : () => onChange( 'p' ),
			},
		],
		[
			{
				icon    : <HeadingLevelIcon level={'span'} isPressed={( htmlTag && htmlTag === 'span' ? true : false )}/>,
				title   : __( 'Span', 'gutenam-blocks' ),
				isActive: ( htmlTag && htmlTag === 'span' ? true : false ),
				onClick : () => onChange( 'span' ),
			},
		],
		[
			{
				icon    : <HeadingLevelIcon level={'div'} isPressed={( htmlTag && htmlTag === 'div' ? true : false )}/>,
				title   : __( 'div', 'gutenam-blocks' ),
				isActive: ( htmlTag && htmlTag === 'div' ? true : false ),
				onClick : () => onChange( 'div' ),
			},
		],
	];
	const createhtmlTagControl = ( targetLevel ) => {
		return [ {
			icon: <HeadingLevelIcon level={ targetLevel } isPressed={ ( targetLevel === level && htmlTag && htmlTag === 'heading' ? true : false ) } />,
			title: sprintf(
				/* translators: %d: heading level e.g: "1", "2", "3" */
				__( 'Heading %d', 'gutenam-blocks' ),
				targetLevel
			),
			isActive: ( targetLevel === level && htmlTag && htmlTag === 'heading' ? true : false ),
			onClick: () => onChange( targetLevel ),
		} ];
	};
	const headingOnlyOptions = range( tagLowLevel, tagHighLevel ).map( createhtmlTagControl );
	const UIComponent = isCollapsed ? ToolbarDropdownMenu : ToolbarGroup;
	return [
		onChange && (
			<div className={ `bsb-tag-level-control components-base-control${ className ? ' ' + className : '' }`}>
				{ label && (
					<div className={ 'base-component__header base-tag-select__header' }
					>
						{ label && (
							<div className="base-component__header__title base-tag-select__title">
								<label className="components-base-control__label">{ label }</label>
								{ reset && (
									<div className='title-reset-wrap'>
										<Button
											className="is-reset is-single"
											label='reset'
											isSmall
											disabled={ ( ( isEqual( defaultValue, value ) ) ? true : false ) }
											icon={ undo }
											onClick={ () => onReset() }
										/>
									</div>
								) }
							</div>
						) }
					</div>
				) }
				<div className={ 'base-controls-content bsb-tag-select-control-inner' }>
					<UIComponent
						isCollapsed={ isCollapsed}
						label={ ariaLabel }
						controls={ headingOnly ? headingOnlyOptions : headingOptions }
					/>
				</div>
			</div>
		),
	];
}
