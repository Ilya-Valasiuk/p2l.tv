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
        $('.mobile-nav').toggleClass('show-flex');
        toggleModalWindowVisibility(this);
    });


    $('.career-trigger').on('click touch', function(event) {
        event.preventDefault();
        $('.full-screen').toggleClass('show-flex');
        toggleModalWindowVisibility(this);
    });

    $('.mobile-nav__link').on('click touch', function(event) {
        event.preventDefault();
        $('.mobile-nav').toggleClass('show-flex');
        toggleModalWindowVisibility(this);

        var blockName = $(this).data('block');
        var scrollPosition = $('.main-section.' + blockName).offset().top;
        $(window).scrollTop(scrollPosition - 65);
    });




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
            }
        }
        prevTime = curTime;
    }

    if ('onwheel' in document) {
        window.addEventListener("wheel", debouncedWheelHandler);
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
        console.log('fn')
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

    var scrolledItems = $('.team__member-item');
    var selectedItem = $('.member--selected');
    var scrolledWrapper = $('.team__member-list ul');
    var currentScrolledValue = 0;
    var selectedIndex = scrolledItems.index(selectedItem);
    var defaultSelectedIndex = selectedIndex;
    var nextElements;
    var classes = ['small', 'middle', 'large', 'member--selected', 'large', 'middle', 'small'];
    var classesToShow = [];
    var largeStep = 93;
    var itemsBufferLen = 3;

    $('.member-nav__next').on('click', function () {
        if (selectedIndex === scrolledItems.length - 1) return 0;
        selectedIndex += 1;
        currentScrolledValue -= largeStep;
        nextElements = scrolledItems.slice(selectedIndex-itemsBufferLen, selectedIndex + itemsBufferLen + 1);
        classesToShow = classes.slice();

        doScroll();
    });

    $('.member-nav__prev').on('click', function () {
        if (!selectedIndex) return 0;
        selectedIndex -= 1;
        currentScrolledValue += largeStep;
        nextElements = scrolledItems.slice(Math.max(selectedIndex-itemsBufferLen, 0), selectedIndex + itemsBufferLen + 1);

        if (classes.length > nextElements.length) {
            classesToShow = classes.slice(classes.length - nextElements.length);
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

    function makeMovement(value) {
        scrolledWrapper.velocity({
            translateX: value
        }, {
            duration: 400,
        });
    }

    google.maps.event.addDomListener(window, 'load', init);



})()

