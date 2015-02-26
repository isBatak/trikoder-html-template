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
})(jQuery);
