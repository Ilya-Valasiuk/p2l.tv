(function () {

    var globalProp = {
        windowHeight: $(window).height(),
        currentSectionId: 1
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
    // $('.selection').on('click touch', function(event) {
    //
    //     var parentEl = $(event.target);
    //     while ( !parentEl.hasClass('selection')) {
    //         parentEl = parentEl.parent();
    //     }
    //
    //     $(parentEl.find('.selection__list')[0]).toggleClass('show');
    //     var currentEl = parentEl.find('.job-selection__current')[0];
    //
    //     if ($(event.target).hasClass('selection__item')) {
    //         var text = $(event.target).text();
    //         $(currentEl).text(text);
    //     }
    // });
    //
    //
    // $('.language').on('click touch', function(event) {
    //
    //     var parentEl = $(event.target);
    //     while ( !parentEl.hasClass('language')) {
    //         parentEl = parentEl.parent();
    //     }
    //
    //     $(parentEl.find('.language__list')[0]).toggleClass('show');
    //     var currentEl = parentEl.find('.language__current')[0];
    //
    //     if ($(event.target).hasClass('language__item')) {
    //         var text = $(event.target).text();
    //         $(currentEl).text(text);
    //     }
    // });
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

    // var isAnimation = false;
    var sections = $('.main-section');

    if ('onwheel' in document) {
        window.addEventListener("wheel", $.debounce(150, true, onWheel));
        // window.addEventListener("wheel", onWheel);
    }


    function onWheel(e) {
        // console.log('fn')
        // if (isAnimation) return;
        // console.log('hrer');
        if ($(window).width() > 1024) {
            e = e || window.event;

            var delta = e.deltaY;

            if (delta > 0) {
                if (globalProp.currentSectionId  < 6 ) {
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
        // isAnimation = true;
        [].map.call(sections, function (section) {
            section.setAttribute('data-scroll', $(section).data('section-id') < newSectionId ?  'top' : 'down');
        })

        sections[newSectionId-1].setAttribute('data-scroll', 'current');

        var siteNavEl = $('.site-nav')[0];
        siteNavEl.setAttribute('data-for-id', newSectionId);

        if (newSectionId === 6 ) {
            var translateY = globalProp.windowHeight * (newSectionId-2) +  $(sections[5]).height();
            // $('.main-wrapper').css({'transform': 'translateY('+ -translateY +'px)'});
        } else {
            var translateY = globalProp.windowHeight * (newSectionId - 1);
            // $('.main-wrapper').css({'transform': 'translateY(' + -translateY + 'px)'});
        }

        $('.main-wrapper').css({'transform': 'translateY('+ -translateY +'px)'});

        // $('.main-wrapper').velocity({
        //         translateY: -translateY,
                
        //     }, {
        //         duration: 800,
        //         complete: function() {
        //             console.log('completed')
        //             isAnimation = false;
        //         }
        // });

    }

    google.maps.event.addDomListener(window, 'load', init);



})()

