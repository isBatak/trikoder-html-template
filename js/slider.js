;(function ( $, window, document, undefined ) {

    var pluginName = "slider",
        defaults = {
            autoplay: false,
            delay: 3000,
            animation: 1000,
            startAtIndex: 0
        };

    function Plugin( element, options ) {
        this.element = $(element);

        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {

        init: function() {

            this.wrapper = this.element.find('.slider-inner-wrapper');
            this.slides = this.wrapper.find('ul > li');
            this.slideCount = this.slides.length;
            this.images = this.slides.children('img');
            this.imagesPreloadCount = this.images.length;
            this.currentSlide = this.options.startAtIndex;

            this.images.each( $.proxy( this.preload, this ) );


        },

        preload: function(index) {
            var img = this.images[index];

            // captions
            var $img = $(img);
            $img.after('<span class="slide-caption">' + img.alt + '</span>');

            if( img.complete ) {
                this.imageLoaded();
            } else {
                $(img).one('load', $.proxy( this.imageLoaded ) );
            }
        },

        imageLoaded: function() {
            this.imagesPreloadCount--;
            if( this.imagesPreloadCount === 0 ) {

                this.wrapper.css({ backgroundImage : 'none'});

                this.createBullets();
                this.showSlide(this.currentSlide);

                this.autoPlay();
            }
        },

        createBullets: function() {
            var bulletsWrapper = $('<div/>', { class: 'slider-bullets-wrapper' });
            var list = $('<ul/>');
            for (var i = 0; i < this.slideCount; i++){
                if(i == this.options.startAtIndex){
                    list.append('<li class="selected" id="'+ i +'"></li>');
                }
                else{
                    list.append('<li id="'+ i +'"></li>');
                }
            }
            bulletsWrapper.append( list );

            this.bullets = bulletsWrapper.find('li');
            this.bullets.click( this, this.onBulletClick );

            this.element.append( bulletsWrapper );
        },

        onBulletClick: function(e) {
            var context = e.data;
            context._reset();
            context.currentSlide = $(e.currentTarget).attr('id');
            context.updateBullets();
            context.showSlide();
        },

        updateBullets: function() {
            var active = this.bullets.eq(this.currentSlide);
            active.addClass('selected').siblings().removeClass('selected');
        },

        autoPlay: function() {
            if(this.options.autoplay === true) {
                this.timer = setInterval( $.proxy( this.next, this ), this.options.delay);
            }
        },

        _stop: function() {
            if(this.options.autoplay === true) {
                clearInterval(this.timer);
            }
        },

        _reset: function() {
            this._stop();
            this.autoPlay();
        },

        next: function() {
            if(this.currentSlide === (this.slideCount - 1)){
                this.currentSlide = 0;
            }
            else{
                this.currentSlide++;
            }
            this.updateBullets();
            this.showSlide();
        },

        showSlide: function() {
            this.activeSlide = this.slides.eq(this.currentSlide);
            this.activeSlide.siblings().stop().animate({opacity: 0.0}, this.options.animation, function() {
                $(this).css({visibility: "hidden"});
            });
            this.activeSlide.css({opacity: 0.0, visibility: "visible"}).stop().animate({opacity: 1.0}, this.options.animation);
        }
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );
