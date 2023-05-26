/**
 * Radio Buttons control.
 *
 */
/**
 * Import Css
 */
 import './editor.scss';
/**
 * Build the Measure controls
 * @returns {object} Measure settings.
 */
export default function SubsectionWrap( {
		label,
		className,
		children,
	} ) {
	return (
		<div className={ `components-base-control base-subsection-wrap${ className ? ' ' + className : '' }` }>
			{ label && (
				<h2 className='subsection-wrap-title'>{ label }</h2>
			) }
			<div className={ 'bst-inner-subsection' }>
				{ children }
			</div>
		</div>
	);
}
