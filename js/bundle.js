;(function ( $, window, document, undefined ) {

    var pluginName = "modal",
        defaults = {
            modalClass: '.box',
            content: '.content',
            closeButton: '.modal-close'
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

            this.type = this.element.data('type');
            this.URL = this.element.attr('href');
            this.target = $(this.element.data('target'));
            this.modalBox = this.target.find(this.options.modalClass);
            this.closeBtn = this.target.find(this.options.closeButton);
            this.content = this.target.find(this.options.content);

            this.element.click( $.proxy( this.openModal, this ) );
            this.closeBtn.click( $.proxy( this.closeModal, this ) );
        },

        openModal: function(e) {
            e.preventDefault();
            if(this._name === this.type){
                this.loadModal();
            }
            else{
                console.log('Target is not type modal!');
            }
        },

        closeModal: function(e) {
            e.preventDefault();
            this.content.empty();
            this.target.toggleClass('open');
        },

        loadModal: function() {

            this.target.toggleClass('open');

            if(this.URL !== '' || this.URL !== '#') {
                this.content.load( this.URL, $.proxy( this.appendForm, this) );
            }
        },

        appendForm: function(e) {

            this.contactForm = this.content.find('form');
            this.submitBtn  = this.content.find('input[type=submit]');
            this.usernameIn = this.content.find('input[name=userUsername]');
            this.passwordIn = this.content.find('input[name=userPassword]');

            // Here Comes The Dragon

            var textToPlaceholder = this.contactForm
                                    .contents()
                                    .filter(function() {
                                        return this.nodeType === 3 && this.nodeValue.trim() !== '';
                                    });

            this.usernameIn.attr('placeholder', textToPlaceholder.eq(0).text().trim().replace(':',''));
            this.passwordIn.attr('placeholder', textToPlaceholder.eq(1).text().trim().replace(':','')).attr('type','password');
            textToPlaceholder.remove();

            this.contactForm.contents().filter('br').remove();

            this.submitBtn.addClass('button').val('Sign in');
            this.submitBtn.click( $.proxy( this.submitForm, this) );
        },

        submitForm: function(e) {
            e.preventDefault();

            this.submitBtn.attr('disabled','disabled');

            var data = this.contactForm.serialize();

            $.post( this.URL, data, $.proxy( this.onSuccess, this) , 'json')
            .fail( $.proxy( this.onError, this) );
        },

        onSuccess: function( data ) {
            this.clearLabels();
            this.submitBtn.removeAttr('disabled');
            this.addLabel(this.submitBtn, 'success', this.content.data('success') );
        },

        onError: function( jqxhr, textStatus, error ) {
            this.clearLabels();
            this.submitBtn.removeAttr('disabled');
            var response = $.parseJSON( jqxhr.responseText );

            for(var item in response){
                switch(item) {
                    case 'general':
                        this.addLabel(this.submitBtn, 'error', response[item]);
                        break;
                    case 'userUsername':
                        this.addLabel(this.usernameIn, 'error', response[item]);
                        break;
                    case 'userPassword':
                        this.addLabel(this.passwordIn, 'error', response[item]);
                        break;
                    default:

                }
            }
        },

        addLabel: function( element, type, message ) {
            element.after( '<span class="'+type+'">'+message+'</span>' );
        },

        clearLabels: function() {
            this.contactForm.find('.error').remove();
            this.contactForm.find('.success').remove();
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
            var bulletsWrapper = $('<div/>', { 'class': 'slider-bullets-wrapper' });
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
