(function () {


    function jobLocationFilter() {

    }


    function jobCategoriesFilter() {

    }


    function jobCommonFilter() {

    }

    $('.selection').on('click touch', function(event) {

        var parentEl = $(event.target);
        while ( !parentEl.hasClass('selection')) {
            parentEl = parentEl.parent();
        }

        $(parentEl.find('.selection__list')[0]).toggleClass('show');
        var currentEl = parentEl.find('.job-selection__current')[0];

        if ($(event.target).hasClass('selection__item')) {
            var text = $(event.target).text();
            $(currentEl).text(text);
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
    
    $(window).on('scroll', function (event) {

        var scrollTop = $(window).width() <= '640' ? 0 : 25;

        if ($(window).width() <= '1020') {
            if ($(window).scrollTop() <= scrollTop) {
                $('.header .site-nav').removeClass('fixed-nav');
            } else {
                $('.header .site-nav').addClass('fixed-nav');
            }
        }
    });

    $('.nav-trigger').on('click touch', function(event) {
        $($('body').find('.mobile-nav')[0]).toggleClass('show-flex');
        $('body').toggleClass('fixed');
        $('.wrapper').toggleClass('blured');
    });


    $('.career-trigger').on('click touch', function(event) {
        event.preventDefault();
        $('.full-screen').toggleClass('show-flex');
        $('body').toggleClass('fixed');
        $('.wrapper').toggleClass('blured');
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


    google.maps.event.addDomListener(window, 'load', init);



})()

