(function () {

    var globalProp = {
        windowHeight: $(window).height(),
        currentSectionId: 1,
        isAnimation: false,
        sections: $('.main-section'),
        siteNav: $('.site-nav'),
        currentPosition: 0
    };

    function toggleModalWindowVisibility(el) {

        if ( !$(el).hasClass('close-button') ) {
            globalProp.currentPosition = $(window).scrollTop();
        }

        $('.site-nav').toggleClass('hidden')
        $('body').toggleClass('fixed');
        $('.main-wrapper').toggleClass('blured');

        if ( $(el).hasClass('close-button') ) {
            event.preventDefault();
            $(window).scrollTop(globalProp.currentPosition);
        }
    }


    $( window ).resize(function() {
        globalProp.windowHeight = $(window).height();
        $('.site-nav').removeClass('fixed-nav');

    //    others
    });


    $('.nav-trigger').on('click touch', function(event) {
        var isVisible = $('.mobile-nav').hasClass('show-flex');
        $('.mobile-nav').toggleClass('show-flex');
        toggleModalWindowVisibility(this);

        if (!isVisible) {
            $('.mobile-nav').addClass('animated fadeIn');
        }
    });


    $('.career-trigger').on('click touch', careerToggle);

    function careerToggle(event) {
        var isVisible = $('.full-screen').hasClass('show-flex');
        event.preventDefault();
        
        $('.full-screen').toggleClass('show-flex');
        toggleModalWindowVisibility(this); 

        if (!isVisible) {
            window.removeEventListener("wheel", debouncedWheelHandler);
            $('.career').addClass('animated slideInRight');
            setTimeout(function () {
                $('body').on('click', closeHandler)
            }, 100);
        } else {
            window.addEventListener("wheel", debouncedWheelHandler);
            $('body').off('click', closeHandler);
        }
    }

    $('.mobile-nav__link').on('click touch', function(event) {
        event.preventDefault();
        $('.mobile-nav').toggleClass('show-flex');
        toggleModalWindowVisibility(this);

        var blockName = $(this).data('block');
        var scrollPosition = $('.main-section.' + blockName).offset().top;
        $(window).scrollTop(scrollPosition - 65);
    });

    function closeHandler(e) {
        if ($(e.target).closest('.career').length && !$(e.target).closest('.career-trigger').length) {
            return;
        } else {
            careerToggle(e);
        }
    }



    //add fixed nav

    $(window).on('scroll', function (event) {
        if ($(window).width() <= '1024') {
            if ($(window).scrollTop() <= 0) {
                $('.site-nav').removeClass('fixed-nav');
            } else {
                $('.site-nav').addClass('fixed-nav');
            }
        }
    });


    var selectionResult = $('.selection-result');
    var selectionItemsValues = selectionResult.find('.selection-result__copy');
    var filter = {
        categories: '',
        location: ''
    };

    function closeListHandler(event) {
        var currentTarge = $(event.target);
        if (currentTarge.closest('.selection').length) {
            return;
        } else {
            $('.join-team .selection__list').removeClass('show');
            $('body').off('click touch', closeListHandler)
        }
    }


    $('.selection').on('click touch', function(event) {
    
        var el = $(event.target);
        var parentEl = $(this);
        var selectionList = parentEl.find('.selection__list');

        $('.selection__list').each(function(i, item) {
            var $item = $(item);
            
            if ( !parentEl.find($item).length && $item.hasClass('show')) {
                $item.removeClass('show');
            }
        });
    
        if (selectionList.hasClass('show')) {
            selectionList.removeClass('show');
            $('body').off('click touch', closeListHandler);
        } else {
            selectionList.addClass('show');
            $('body').on('click touch', closeListHandler);
        } 

        var currentEl = parentEl.find('.job-selection__current')[0];
    
        if ($(event.target).hasClass('selection__item')) {
            var text = $(event.target).text();
            $(currentEl).text(text);

            var isCategories = el.hasClass('job-categories__item');
            var isSelectAll = el.hasClass('selection__item-all');
            filter[isCategories ? 'categories' : 'location'] = isSelectAll ? '' : text; 

            selectionItemsValues
                .each(function (i, item) {
                    var parent = $(item).closest('.selection-result__item');
                    var isCategoryExist = item.innerHTML.indexOf(filter.categories) > -1;
                    var isLocationExist = item.innerHTML.indexOf(filter.location) > -1;
                    isCategoryExist && isLocationExist ? parent.removeClass('hidden') : parent.addClass('hidden');
                });
        }
    });
    

    $('.language').on('click touch', function(event) {
        $('.site-nav .language__list').toggleClass('show');
    });


    $(".file-input").on('change', function() {
        var value = $(this).val();
        if (value) {
            $(".input-placeholder").text(value);
        } else {
            $(".input-placeholder").text("Choose CV to upload");
        }
    });

    $(".input").on('input', function() {
        var value = $(this).val();
        if (value) {
            $(this).parent().addClass('input-container--filled');
        } else {
            $(this).parent().removeClass('input-container--filled');
        }
    });


    
    var debouncedWheelHandler = $.debounce(50, true, onWheel);

    var prevTime = new Date().getTime();
    var f = function(){
        var curTime = new Date().getTime();
        if(typeof prevTime !== 'undefined'){
            var timeDiff = curTime-prevTime;
            if(timeDiff>200) {
                console.log('kinetick scroll')
                callCount = 0;
            } else {
                callCount += 1;
                if (callCount > 100) {
                    console.log('do next()');
                    callCount = 0;
                }
            }
        }
        prevTime = curTime;
    }

    var lastCallDate = new Date().getTime();
    var callCount = 0;
    if ('onwheel' in document) {
        // $(body).on('wheel', debouncedWheelHandler);
        window.addEventListener("wheel", debouncedWheelHandler);
        // window.addEventListener('wheel', function(e) {
        //     var callDate = new Date().getTime();
        //     if (!e.deltaY || globalProp.isAnimation) {
        //         lastCallDate = callDate;
        //         callCount = 0;
        //         return;
        //     }

        //     console.log()

        //     if (Math.abs(e.wheelDeltaY) === 120 ) {
        //         console.log('by delta')
        //         onWheel(e);
        //         lastCallDate = callDate;
        //         callCount = 0;
        //         return
        //     }

        //     if (callDate - lastCallDate > 500) {
        //         callCount = 0;
        //         lastCallDate = callDate;
        //         console.log('do by time')
        //         onWheel(e);
        //     } else {
        //         callCount +=1;
        //         if (callCount > 80) {
        //             callCount = 0;
        //             lastCallDate = callDate;
        //             console.log('do by count')
        //             onWheel(e);
        //         }
        //     }
            
            
            
        //     // f()
            
                            
        // })
        // window.addEventListener('wheel', onWheel);
    }

    function addHandlerForNavigation() {
        var navItems = globalProp.siteNav.find("a[data-scroll-to]");
        navItems.on('click', function (e) {
            e.preventDefault();
            globalProp.currentSectionId = $(this).data('scrollTo');
            if (+globalProp.siteNav.attr('data-for-id') === globalProp.currentSectionId) {
                return false;
            }

            showNewSection(globalProp.currentSectionId);
        });
    }

    addHandlerForNavigation();

    function onWheel(e) {
        if (globalProp.isAnimation) return;
        // console.log('hrer');
        if ($(window).width() >= 1024) {
            e = e || window.event;

            var delta = e.deltaY;

            if (delta > 0) {
                if (globalProp.currentSectionId  < globalProp.sections.length ) {
                    showNewSection(  ++globalProp.currentSectionId);
                }
            } else {
                if (globalProp.currentSectionId  > 1 ) {
                    showNewSection( --globalProp.currentSectionId );
                }
            }
        }

    }

    function showNewSection(newSectionId) {
        globalProp.isAnimation = true;
        [].map.call(globalProp.sections, function (section) {
            section.setAttribute('data-scroll', $(section).data('section-id') < newSectionId ?  'top' : 'down');
        });

        globalProp.sections[newSectionId-1].setAttribute('data-scroll', 'current');

        globalProp.siteNav.attr('data-for-id', newSectionId);

        if (newSectionId === globalProp.sections.length ) {
            var translateY = globalProp.windowHeight * (newSectionId-2) +  $(globalProp.sections[globalProp.sections.length - 1]).height();
        } else {
            var translateY = globalProp.windowHeight * (newSectionId - 1);
        }

        $('.main-wrapper').velocity({
                translateY: -translateY,
            }, {
                duration: 400,
                complete: function() {
                    // setTimeout(function() {
                        globalProp.isAnimation = false;
                    // }, 250);
                }
        });

    }

    var prevScrollState = '';
    var isSmall = window.document.body.offsetWidth < 1024;
    $(window).resize(function() {
        if (window.document.body.offsetWidth < 1024 && !isSmall) {
            prevScrollState = $('.main-wrapper').attr('style');
            $('.main-wrapper').attr('style', '');
            isSmall = true;
        } else if (window.document.body.offsetWidth >= 1024 && isSmall) {
            if (prevScrollState) {
                $('.main-wrapper').attr('style', prevScrollState);
            }
            isSmall = false;
        }
    });

    function updateSectionData(newSectionId) {
        [].map.call(globalProp.sections, function (section) {
            section.setAttribute('data-scroll', $(section).data('section-id') < newSectionId ?  'top' : 'down');
        });

        globalProp.sections[newSectionId-1].setAttribute('data-scroll', 'current');

        globalProp.siteNav.attr('data-for-id', newSectionId);
    }

    var scrolledItems = $('.team__member-item');
    var selectedItem = $('.member--selected');
    var scrolledWrapper = $('.team__member-list ul');
    var selectedIndex = scrolledItems.index(selectedItem);
    var defaultSelectedIndex = selectedIndex;
    var largeStep = 93;
    var currentScrolledValue = -((selectedIndex - 3) * largeStep);
    var defValue = currentScrolledValue;
    var nextElements;
    var classes = ['small', 'middle', 'large', 'member--selected', 'large', 'middle', 'small'];
    var classesToShow = [];
    var itemsBufferLen = 3;

    $('.member-nav__next').on('click', function () {
        if (selectedIndex === scrolledItems.length - 1) {
            // selectedIndex = defaultSelectedIndex;
            // removeClasses(scrolledItems);
            // nextElements = scrolledItems.slice(selectedIndex - itemsBufferLen, selectedIndex + itemsBufferLen + 1);
            // applyClasses(nextElements, true);
            // currentScrolledValue = defValue;
            // makeMovement(defValue, true);
            // nextElements.removeClass('no-animation');
            return 0;
        };
        selectedIndex += 1;
        currentScrolledValue -= scrolledWrapper.find('.small').first().outerWidth(true);
        nextElements = scrolledItems.slice(selectedIndex-itemsBufferLen, selectedIndex + itemsBufferLen + 1);
        classesToShow = classes.slice();

        doScroll();
    });

    $('.member-nav__prev').on('click', function () {
        if (!selectedIndex) return 0;
        selectedIndex -= 1;
        currentScrolledValue += scrolledWrapper.find('.small').last().outerWidth(true);
        nextElements = scrolledItems.slice(Math.max(selectedIndex-itemsBufferLen, 0), selectedIndex + itemsBufferLen + 1);

        if (classes.length > nextElements.length) {
            classesToShow = classes.slice(classes.length - nextElements.length);
        } else {
            classesToShow = classes.slice();
        }

        doScroll();
    });

    function doScroll() {
        removeClasses(scrolledItems);
        applyClasses(nextElements);
        makeMovement(currentScrolledValue);
    }


    function removeClasses(elements) {
        elements.removeClass(classes.join(' '));
    }

    function applyClasses(elements) {
        classesToShow.map(function(className, index) {
            $(elements.get(index)).addClass(className);
        });
    }

    function makeMovement(value, fast) {
        scrolledWrapper.velocity({
            translateX: value
        }, {
            duration: fast ? 0 : 400,
        });
    }



    // makeMovement(currentScrolledValue);

    // var s = scrolledWrapper.slick({
    //     dots: false,
    //     infinite: true,
    //     speed: 300,
    //     slidesToShow: 7,
    //     centerMode: true,
    //     variableWidth: false,
    //     responsive: [{
    //         breakpoint: 768,
    //         settings: {
    //             slidesToShow: 3,
    //             touchMove: true,
    //         }
    //     }],
    //     centerPadding: '0px',
    //     prevArrow: '.member-nav__prev',
    //     nextArrow: '.member-nav__next',
    // });

})()

