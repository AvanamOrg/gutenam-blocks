(function() {
	'use strict';
	window.BBTabs = {
		setupTabs: function() {
			console.log(1)
			var btTabWraps = document.querySelectorAll('.bst-tabs-wrap');
			btTabWraps.forEach((thisElem) => {

				thisElem.querySelectorAll(':scope > .bst-tabs-title-list').forEach((subElem) => {
					subElem.setAttribute('role', 'tablist');
				});
				thisElem.querySelectorAll(':scope > .bst-tabs-content-wrap > .bst-tab-inner-content').forEach((subElem) => {
					subElem.setAttribute('role', 'tabpanel');
					subElem.setAttribute('aria-hidden', 'true');
				});

				thisElem.querySelectorAll(':scope > .bst-tabs-title-list li a').forEach((subElem) => {
					var parentListItem = subElem.parentElement;
					var parentId = parentListItem.getAttribute("id");
					var isActive = parentListItem.classList.contains('bst-tab-title-active');

					parentListItem.setAttribute('role', 'tab');
					// parentListItem.setAttribute('aria-controls', parentId);
					parentListItem.setAttribute('aria-selected', isActive ? 'true' : 'false');
					parentListItem.setAttribute('tabindex', isActive ? '0' : '-1');

					subElem.setAttribute('role', 'presentation');

					// Set attr on the related content tab
					var tabId = subElem.getAttribute('data-tab');
					var contentTab = thisElem.querySelector(':scope > .bst-tabs-content-wrap > .bst-inner-tab-' + tabId);
					contentTab.setAttribute('aria-labelledby', parentId);
					contentTab.setAttribute('aria-hidden', isActive ? 'false' : 'true');

					if( isActive ){
						contentTab.style.display = 'block';
					}
				});

				thisElem.querySelectorAll(':scope > .bst-tabs-title-list a').forEach((anchor) => {
					anchor.addEventListener('keydown', function(evt) {
						const listItem = this.parentElement;
						switch ( evt.which ) {
							case 37:
							case 38:
								if (listItem.previousElementSibling) {
									listItem.previousElementSibling.querySelector('a').click();
								} else {
									listItem.parentElement.querySelector('li:last-of-type > a' ).click();
								}
								break;
							case 39:
							case 40:
								if (listItem.nextElementSibling) {
									listItem.nextElementSibling.querySelector('a').click();
								} else {
									listItem.parentElement.querySelector('li:first-of-type > a' ).click();
								}
								break;
						}
					});
				});
				var resizeEvent = new Event('resize');
				window.dispatchEvent(resizeEvent);
			});

			var btTabButtons = document.querySelectorAll('.bst-tabs-title-list li a');
			btTabButtons.forEach((thisElem) => {
				thisElem.addEventListener('click', function(evt) {
					evt.preventDefault();
					const newActiveTabId = thisElem.getAttribute('data-tab');
					const tabWrap = thisElem.closest('.bst-tabs-wrap');
					window.BBTabs.setActiveTab(tabWrap, newActiveTabId);
				});
			});

			var btAccordions = document.querySelectorAll('.bst-create-accordion');
			btAccordions.forEach((thisElem) => {
				thisElem.querySelectorAll(':scope > .bst-tabs-title-list .bst-title-item').forEach((listItem) => {
					var tabId = listItem.querySelector('a').getAttribute('data-tab');

					var titleClasses = listItem.classList;
					var accordionTitleClasses = [
						'bst-tabs-accordion-title',
						'bst-tabs-accordion-title-' + tabId
					]

					const closestTabWrap = listItem.closest('.bst-tabs-wrap');
					const btContentWrap = closestTabWrap.querySelector(':scope > .bst-tabs-content-wrap');

					const newElem = window.document.createElement('div');
					newElem.className = [...titleClasses].concat(accordionTitleClasses).join(' ');
					newElem.innerHTML = listItem.innerHTML;

					btContentWrap.insertBefore(newElem, btContentWrap.querySelector(':scope > .bst-inner-tab-' + tabId));

					btContentWrap.querySelector(':scope > .bst-tabs-accordion-title-' + tabId + '  a').removeAttribute('role')
				});
			});

			var btAccordionAnchor = document.querySelectorAll('.bst-tabs-accordion-title a');
			btAccordionAnchor.forEach((thisElem) => {
				thisElem.addEventListener('click', function(evt) {

					evt.preventDefault();

					var tabId = thisElem.getAttribute('data-tab');
					var accTitle = thisElem.parentElement;
					var tabWrap = thisElem.closest('.bst-tabs-wrap');
					var tabContent = tabWrap.querySelector(':scope > .bst-tabs-content-wrap > .bst-inner-tab-' + tabId);

					if ( accTitle.classList.contains( 'bst-tab-title-active' ) ) {
						tabWrap.classList.remove('bst-active-tab-' + tabId);
						accTitle.classList.replace('bst-tab-title-active', 'bst-tab-title-inactive');
						tabContent.style.display = 'none';
					} else {
						tabWrap.classList.add('bst-active-tab-' + tabId);
						accTitle.classList.replace('bst-tab-title-inactive', 'bst-tab-title-active');
						tabContent.style.display = 'block';
					}

					var resizeEvent = new Event('resize');
					window.dispatchEvent(resizeEvent);
					var tabEvent = new Event('base-tabs-open');
					window.dispatchEvent(tabEvent);
				});
			});
			window.BBTabs.setActiveWithHash();
		},
		setActiveWithHash: function() {
			if ( window.location.hash == '' ) {
				return;
			}

			var tabTitleItems = window.document.querySelector(window.location.hash + '.bst-title-item');
			if (!tabTitleItems) {
				return;
			}

			var currentTab = window.document.querySelector('#' + window.location.hash.substring(1));

			// Trigger tab change.
			var tabNumber = currentTab.querySelector('a').getAttribute('data-tab');
			var tabWrap = currentTab.closest('.bst-tabs-wrap');
			window.BBTabs.setActiveTab(tabWrap, tabNumber);

			if((window.BBTabs.isMobileSize() && tabWrap.classList.contains('bst-tabs-mobile-layout-accordion')) || (window.BBTabs.isTabletSize() && tabWrap.classList.contains('bst-tabs-tablet-layout-accordion'))) {
				tabWrap.querySelector('.bst-tabs-content-wrap > .bst-tabs-accordion-title.bst-tabs-accordion-title-' + tabNumber)
					.scrollIntoView({behavior: "smooth"});
			}
		},
		isMobileSize: function() {
			return window.innerWidth <= 767;
		},
		isTabletSize: function() {
			return window.innerWidth > 767 && window.innerWidth <= 1024;
		},
		setActiveTab: function( wrapper, tabNumber, moveFocus = true ) {

			const prevActiveAnchor = wrapper.querySelector(':scope > .bst-tabs-title-list > li.bst-tab-title-active a');
			const prevActiveListItem= wrapper.querySelector(':scope > .bst-tabs-title-list > li.bst-tab-title-active');
			prevActiveListItem.classList.replace('bst-tab-title-active', 'bst-tab-title-inactive')
			prevActiveListItem.setAttribute('tabindex', '-1');
			prevActiveListItem.setAttribute('aria-selected', 'false');

			wrapper.className = wrapper.className.replace(/\bbst-active-tab-\S+/g, 'bst-active-tab-' + tabNumber);
			const newActiveAnchor = wrapper.querySelector(':scope > .bst-tabs-title-list > li.bst-title-item-' + tabNumber + ' a');
			const newActiveListItem = wrapper.querySelector(':scope > .bst-tabs-title-list > li.bst-title-item-' + tabNumber);
			newActiveListItem.classList.replace('bst-tab-title-inactive', 'bst-tab-title-active');
			newActiveListItem.setAttribute('tabindex', '0');
			newActiveListItem.setAttribute('aria-selected', 'true');

			// Hide all tab panels.
			wrapper.querySelectorAll(':scope > .bst-tabs-content-wrap > .bst-tab-inner-content').forEach((subElem) => {
				subElem.style.display = 'none';
			});

			// Show selected tab panel.
			const newTabContent = wrapper.querySelector(':scope > .bst-tabs-content-wrap > .bst-inner-tab-' + tabNumber);
			newTabContent.style.display = 'block';

			if ( moveFocus ) {
				newActiveAnchor.focus();
			}

			window.BBTabs.setAriaAttributesForTabs(wrapper, tabNumber);

			var resizeEvent = new Event('resize');
			window.dispatchEvent(resizeEvent);
			var tabEvent = new Event('base-tabs-open');
			window.dispatchEvent(tabEvent);
		},
		setAriaAttributesForTabs: function( wrapper, tabNumber ) {
			wrapper.querySelectorAll(':scope > .bst-tabs-content-wrap > .bst-tab-inner-content:not(.bst-inner-tab-' + tabNumber + ')')
				.forEach((subElem) => subElem.setAttribute('aria-hidden', 'true'));
			wrapper.querySelector(':scope > .bst-tabs-content-wrap > .bst-inner-tab-' + tabNumber )
				.setAttribute( 'aria-hidden', 'false');
			// Accordion tabs
			wrapper.querySelectorAll(':scope > .bst-tabs-content-wrap > .bst-tabs-accordion-title:not(.bst-tabs-accordion-title-' + tabNumber + ')')
				.forEach((tab) => {
					tab.classList.replace('bst-tab-title-active', 'bst-tab-title-inactive');
					tab.setAttribute('tabindex', '-1');
					tab.setAttribute('aria-selected', 'false');
				});
			const activeAccordionTab = wrapper.querySelector(':scope >.bst-tabs-content-wrap > .bst-tabs-accordion-title.bst-tabs-accordion-title-' + tabNumber);
			if( activeAccordionTab ) {
				activeAccordionTab.classList.replace('bst-tab-title-inactive', 'bst-tab-title-active');
				activeAccordionTab.setAttribute('tabindex', '0');
				activeAccordionTab.setAttribute('aria-selected', 'true');
			}
		},

		init: function() {
			window.BBTabs.setupTabs()
			window.addEventListener( 'hashchange', window.BBTabs.setActiveWithHash, false );
		}
	}
	if ( 'loading' === document.readyState ) {
		// The DOM has not yet been loaded.
		document.addEventListener( 'DOMContentLoaded', window.BBTabs.init );
	} else {
		// The DOM has already been loaded.
		window.BBTabs.init();
	}
})();