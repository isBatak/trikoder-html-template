(function ($) {
    /**
    * Menu button click event
    */
    $('#menu-button').click(function() {
        $('.inner-wrapper').toggleClass('open');
    });

    /**
    * Search button click event
    */
    $('#search-button').click(function() {
        $('.search').toggleClass('open');
    });

    /**
    * Slider init
    */
    $('#slider').slider({
        autoplay: true,
        delay: 5000
    });

    /**
    * Modal init
    */
    $('#sign-in').modal();
    
})(jQuery);
