// https://github.com/addyosmani/jquery-plugin-patterns/blob/master/jquery.basic.plugin-boilerplate.js

;(function ( $, window, document, undefined ) {

  // Create the defaults once
  var pluginName = 'formHelp',
    defaults = {
      propertyName: "value"
    };

  // The actual plugin constructor
  function Plugin( element, options ) {
    this.element = element;
    this.options = $.extend( {}, defaults, options) ;

    this._defaults = defaults;
    this._name = pluginName;

		// do something interesting
    this.init();
  }


	//
  Plugin.prototype.init = function () {
    console.log('init');
    var thisObj = this;
    $('.description', thisObj.element).hide();

    $('.form-item').each(function(i){
      $(this).attr('tabindex', i);
    });

    $('.form-item', this.element).bind('focusin', function(e){
      console.log('focusin');
      var formitem = $(this).parents('.form-item');
      $('.description', formitem).show();
    });

    $('.form-item', this.element).bind('focusout', function(e){
      console.log('blurout');
      $('.description', thisObj.element).hide();
    });
  };


  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName,
        new Plugin( this, options ));
      }
    });
  }

})( jQuery, window, document );
