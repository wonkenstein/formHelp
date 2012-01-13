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
  Plugin.prototype.init = function() {
    var thisObj = this;
    // hide all the descriptions
    $('.description', thisObj.element).hide();

    $(this.element).click(function(e){
      thisObj.setActive(e.target);
    });

    $('input, select, textarea', this.element).focus(function(e){
      thisObj.setActive(e.target);
    });
  };


  // set active form element
  Plugin.prototype.setActive = function(target) {
    var target = $(target).closest('.form-item');

	  if (!target.hasClass('active')) {
      this.resetForm();
      $('.description', target).show();
      target.addClass('active');
    }
  };


  //
  Plugin.prototype.resetForm = function() {
    $('.description', this.element).hide();
    $('.form-item', this.element).removeClass('active');
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
