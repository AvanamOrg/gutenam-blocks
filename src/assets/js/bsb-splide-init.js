(function () {
	"use strict";
	var baseBlocksSplide = {
		initAll: function () {
			let advancedSliders = document.querySelectorAll(
				".wp-block-base-advancedgallery .bst-blocks-carousel-init"
			);
			this.bootstrapSliders(advancedSliders);

			let testimonialSliders = document.querySelectorAll(
				".wp-block-base-testimonials .bst-blocks-carousel-init"
			);
			this.bootstrapSliders(testimonialSliders);

			let bgSliders = document.querySelectorAll(
				".bsb-blocks-bg-slider > .bst-blocks-carousel-init"
			);
			this.bootstrapSliders(bgSliders);
		},
		bootstrapSliders: function (elementList) {
			if (!elementList || elementList.length === 0) {
				return;
			}

			for (let i = 0; i < elementList.length; i++) {
				var thisSlider = elementList[i];
				if (!thisSlider || !thisSlider.children || thisSlider.classList.contains('is-initialized')) {
					continue;
				}

				const slideCount = this.createSplideElements( thisSlider );
				let parsedData = this.parseDataset(thisSlider.dataset);
				const inHiddenMenu = Boolean(thisSlider.closest('.base-menu-mega-enabled'));

				if (document.querySelector('html[dir="rtl"]')) {
					parsedData.sliderDirection = "rtl";
				} else {
					parsedData.sliderDirection = "ltr";
				}

				thisSlider.addEventListener("load", function (elem) {
					elem.classList.remove("bst-post-carousel-loading");
				});

				let splideOptions = this.getSplideOptions(parsedData);
				// Add this to remove slick based css from hiding elements
				thisSlider.classList.add("splide-initialized");
				thisSlider.classList.add("splide-slider");

				let { sliderType } = parsedData;

				if (sliderType && sliderType === "fluidcarousel") {
					elementList[i]
						.querySelectorAll(".bsb-slide-item")
						.forEach(function (elem) {
							if( !elementList[i].clientWidth ) {
								elem.style.maxWidth = "100%";
							} else {
								elem.style.maxWidth = Math.floor((80 / 100) * elementList[i].clientWidth) + "px";
							}
						});
						const childCount = elementList[i].querySelectorAll(".bsb-slide-item").length;
					const splideSlider = new Splide(thisSlider, {
						...splideOptions,
						focus: parsedData.sliderCenterMode !== false ? "center" : 0,
						autoWidth: true,
						arrows    : childCount > 1 ? splideOptions.arrows : false,
						pagination: childCount > 1 ? splideOptions.pagination : false,
						drag      : childCount > 1 ? splideOptions.drag : false,
						clones    : childCount > 1 ? undefined : 0, // Toggle clones
					});
					// splideSlider.on( 'overflow', function ( isOverflow ) {
					// 	// Reset the carousel position
					// 	splideSlider.go( 0 );

					// 	splideSlider.options = {
					// 	  arrows    : splideOptions.arrows ? isOverflow : false,
					// 	  pagination: splideOptions.pagination ? isOverflow : false,
					// 	  drag      : splideOptions.drag ? isOverflow : false,
					// 	  clones    : isOverflow ? undefined : 0, // Toggle clones
					// 	};
					// } );
					splideSlider.mount();
					var resizeTimer;
					window.addEventListener("resize", function (e) {
						clearTimeout(resizeTimer);
						resizeTimer = setTimeout(function () {
							elementList[i]
								.querySelectorAll(".bsb-slide-item")
								.forEach(function (elem) {
									elem.style.maxWidth =
										Math.floor((80 / 100) * elementList[i].clientWidth) + "px";
								});
						}, 10);
					});
				} else if (sliderType && sliderType === "slider") {
					if( undefined === parsedData.sliderFade ) {
						splideOptions.type = "fade";
					} else {
						splideOptions.type = parsedData.sliderFade ? "fade" : "slide";
					}
					splideOptions.rewind = true;
					let splideSlider = new Splide(thisSlider, splideOptions);
					splideSlider.on( 'overflow', function ( isOverflow ) {
						splideSlider.options = {
						  arrows    : slideCount === 1 ? false : splideOptions.arrows,
						  pagination: slideCount === 1 ? false : splideOptions.pagination,
						  drag      : slideCount === 1 ? false : splideOptions.drag,
						};
					} );
					splideSlider.mount();
				} else if (sliderType && sliderType === "thumbnail") {
					let navSliderId = parsedData.sliderNav;
					let navSlider = document.querySelector("#" + navSliderId);

					this.createSplideElements(navSlider);

					// Switch the datasets for the nav and main slider elements
					let mainSliderParsedData = this.parseDataset(navSlider.dataset)
					let mainSliderOptions = this.getSplideOptions(mainSliderParsedData);
					let navSliderOptions = splideOptions;
					navSliderOptions.isNavigation = true;
					navSliderOptions.pagination = false;
					navSliderOptions.type = 'loop';
					navSliderOptions.arrows = true;
					// navSliderOptions.rewind = true;

					mainSliderOptions.type = ( mainSliderParsedData.sliderFade ||  undefined == mainSliderParsedData.sliderFade ) ? "fade" : "slide";
					mainSliderOptions.rewind = true;
					mainSliderOptions.pagination = false;

					navSlider.classList.add("slick-initialized");
					navSlider.classList.add("slick-slider");

					let carouselSlider = new Splide(thisSlider, mainSliderOptions);
					let thumbnailSlider = new Splide(navSlider, navSliderOptions);
					thumbnailSlider.on( 'overflow', function ( isOverflow ) {
						// Reset the carousel position
						thumbnailSlider.go( 0 );

						thumbnailSlider.options = {
						  arrows    : navSliderOptions.arrows ? isOverflow : false,
						  pagination: navSliderOptions.pagination ? isOverflow : false,
						  drag      : navSliderOptions.drag ? isOverflow : false,
						  rewind    : ! isOverflow ? true : false,
						  type      : ! isOverflow ? 'slide' : navSliderOptions.type,
						  clones    : isOverflow ? undefined : 0, // Toggle clones
						};
					} );
					carouselSlider.sync(thumbnailSlider);
					carouselSlider.mount();
					thumbnailSlider.mount();
				} else {
					let splideSlider = new Splide(thisSlider, splideOptions);
					if ( ! inHiddenMenu ) {
						splideSlider.on( 'overflow', function ( isOverflow ) {
							// Reset the carousel position
							splideSlider.go( 0 );

							splideSlider.options = {
							arrows    : splideOptions.arrows ? isOverflow : false,
							pagination: splideOptions.pagination ? isOverflow : false,
							drag      : splideOptions.drag ? isOverflow : false,
							clones    : isOverflow ? undefined : 0, // Toggle clones
							};
						} );
					}
					splideSlider.mount();
				}
			}
		},

		parseDataset: function (elementDataset) {
			// Auto-parse all values in the elements dataset
			return Object.keys(elementDataset).reduce((acc, key) => {
				let parsedInt = parseInt(elementDataset[key]);
				if (!Number.isNaN(parsedInt)) {
					return { ...acc, [key]: parsedInt };
				}
				if (elementDataset[key] === "true" || elementDataset[key] === "false") {
					return { ...acc, [key]: JSON.parse(elementDataset[key]) };
				}

				return { ...acc, [key]: elementDataset[key] };
			}, {});
		},

		createSplideElements: function (wrapperElem) {
			const slideCount = wrapperElem.children.length;
			for (let slide of wrapperElem.children) {
				slide.classList.add("splide__slide");
				//slide.classList.add("slick-slide");
				if (slide.classList.contains("last")) {
					slide.classList.remove("last");
				}
			}

			let splideTrack = document.createElement("div");
			splideTrack.classList.add("splide__track");

			let splideList = document.createElement("div");
			splideList.classList.add("splide__list");
			// The slides go inside the list element
			splideList.innerHTML = wrapperElem.innerHTML;
			// The list element goes inside the track
			splideTrack.innerHTML = splideList.outerHTML;
			// The track goes inside them argument elem
			wrapperElem.innerHTML = splideTrack.outerHTML;
			wrapperElem.classList.add("splide");
			return slideCount;
		},

		getSplideOptions: function (dataSet) {
			const scrollIsOne = dataSet.sliderScroll === 1 ? 1 : false;
			return {
				//start: 0,
				focus: 0,
				trimSpace: true,
				drag: true,
				perPage: dataSet.columnsXxl || 1,
				perMove: scrollIsOne || dataSet.columnsXxl || 1,
				type: dataSet.sliderFade ? 'fade' : 'loop',
				easing:
					dataSet.sliderAnimSpeed && dataSet.sliderAnimSpeed > 1000
						? "linear"
						: "cubic-bezier(0.25, 1, 0.5, 1)",
				lazyLoad: 'nearby',
				pauseOnHover: dataSet.sliderPause || false,
				autoplay: dataSet.sliderAuto || false,
				interval: dataSet.sliderSpeed || 7000,
				speed: dataSet.sliderAnimSpeed || 400,
				arrows: dataSet.sliderArrows || false,
				pagination: dataSet.sliderDots || false,
				direction: dataSet.sliderDirection,
				pauseOnHover: dataSet.sliderPauseHover || false,
				gap: dataSet.sliderGap || 0,
				breakpoints: {
					543: {
						perPage: dataSet.columnsSs || 1,
						perMove: scrollIsOne || dataSet.scrollSs,
						gap: dataSet.sliderGapMobile || 0,
					},
					767: {
						perPage: dataSet.columnsXs || 1,
						perMove: scrollIsOne || dataSet.columnsXs,
						gap: dataSet.sliderGapMobile || 0,
					},
					991: {
						perPage: dataSet.columnsXs || 1,
						perMove: scrollIsOne || dataSet.columnsSm,
						gap: dataSet.sliderGapTablet || 0,
					},
					1199: {
						perPage: dataSet.columnsMd || 1,
						perMove: scrollIsOne || dataSet.columnsMd,
						gap: dataSet.sliderGapTablet || 0,
					},
					1499: {
						perPage: dataSet.columnsXl || 1,
						perMove: scrollIsOne || dataSet.columnsXl,
						gap: dataSet.sliderGap || 0,
					},
				},
				classes: {
					prev: "splide__arrow--prev slick-prev",
					next: "splide__arrow--next slick-next",
				},
			};
		},

		// Initiate the menus when the DOM loads.
		init: function () {
			if (typeof Splide === "function") {
				baseBlocksSplide.initAll();
			} else {
				var initLoadDelay = setInterval(function () {
					if (typeof Splide === "function") {
						baseBlocksSplide.initAll();
						clearInterval(initLoadDelay);
					} else {
						console.log("No Splide found");
					}
				}, 200);
			}
		},
	};
	if (document.readyState === "loading") {
		// The DOM has not yet been loaded.
		document.addEventListener("DOMContentLoaded", baseBlocksSplide.init);
	} else {
		// The DOM has already been loaded.
		baseBlocksSplide.init();
	}
	document.addEventListener("baseJSInitReload", function(){
		baseBlocksSplide.init();
	});
})();
