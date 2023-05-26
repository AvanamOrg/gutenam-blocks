/**
 * Import Css
 */
 import './editor.scss';
 
export default function ColorGroup({
		children,
	}) {
	return (
		<div className={ 'components-base-control base-color-group' }>
			{ children }
		</div>
	)
}


