(function () {

    var globalProp = {
        windowHeight: $(window).height(),
        currentSectionId: 1,
        isAnimation: false,
        sections: $('.main-section'),
        siteNav: $('.site-nav'),
    };



    $( window ).resize(function() {
        globalProp.windowHeight = $(window).height();

    //    others
    });


    function jobLocationFilter() {

    }


    function jobCategoriesFilter() {

    }


    function jobCommonFilter() {

    }
    //
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
    
        var parentEl = $(event.target);
        while ( !parentEl.hasClass('language')) {
            parentEl = parentEl.parent();
        }
    
        $(parentEl.find('.language__list')[0]).toggleClass('show');
        var currentEl = parentEl.find('.language__current')[0];
    
        if ($(event.target).hasClass('language__item')) {
            var text = $(event.target).text();
            $(currentEl).text(text);
        }
    });
    //
    // $(window).on('scroll', function (event) {
    //
    //     var scrollTop = $(window).width() <= '640' ? 0 : 25;
    //
    //     if ($(window).width() <= '1020') {
    //         if ($(window).scrollTop() <= scrollTop) {
    //             $('.header .site-nav').removeClass('fixed-nav');
    //         } else {
    //             $('.header .site-nav').addClass('fixed-nav');
    //         }
    //     }
    // });
    //
    // $('.nav-trigger').on('click touch', function(event) {
    //     $($('body').find('.mobile-nav')[0]).toggleClass('show-flex');
    //     $('body').toggleClass('fixed');
    //     $('.wrapper').toggleClass('blured');
    // });
    //
    //
    // $('.career-trigger').on('click touch', function(event) {
    //     event.preventDefault();
    //     $('.full-screen').toggleClass('show-flex');
    //     $('body').toggleClass('fixed');
    //     $('.wrapper').toggleClass('blured');
    // });
    //
    // $(".file-input").on('change', function() {
    //     var value = $(this).val();
    //     if (value) {
    //         $(".input-placeholder").text(value);
    //     } else {
    //         $(".input-placeholder").text("Choose CV to upload");
    //     }
    // });
    //
    // $(".input").on('input', function() {
    //     var value = $(this).val();
    //     if (value) {
    //         $(this).parent().addClass('input-container--filled');
    //     } else {
    //         $(this).parent().removeClass('input-container--filled');
    //     }
    // });
    //
    //




    // $('body').on("scroll",
    // function (e) {
    //     debugger;

    // });

    
    var debouncedWheelHandler = $.debounce(120, true, onWheel);

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
        // window.addEventListener('wheel', f);
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
                duration: 800,
                complete: function() {
                    globalProp.isAnimation = false;
                }
        });

    }

    google.maps.event.addDomListener(window, 'load', init);



})()

