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
                if( response.hasOwnProperty( item ) ) {
                    console.log("o." + item + " = " + response[item]);
                }
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
