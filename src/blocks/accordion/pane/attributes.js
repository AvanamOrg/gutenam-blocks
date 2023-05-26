/**
 * BLOCK: Base Accordion Attributes
 */
const attributes = {
	id: {
		type: 'number',
		default: 1,
	},
	title: {
		type: 'array',
		source: 'children',
		selector: '.bst-blocks-accordion-title',
		default: '',
	},
	titleTag: {
		type: 'string',
		default: 'div',
	},
	hideLabel: {
		type: 'boolean',
		default: false,
	},
	icon: {
		type: 'string',
		default: '',
	},
	iconSide: {
		type: 'string',
		default: 'right',
	},
	uniqueID: {
		type: 'string',
		default: '',
	},
};
export default attributes;
