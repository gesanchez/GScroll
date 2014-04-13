;(function ( $, window, document, undefined ) {

    var pluginName = "GScroll",
        defaults = {
            width: "300px",
            height: "100"
        };

    function Plugin( element, options ) {
        this.element = element;

        this.options = $.extend( {}, defaults, options) ;
        this.init();
    }

    Plugin.prototype = {

        init: function() {
            var self = this;
            self.node = $(self.element);
            
            self.node.wrap('<div class="GScroll" style="width:'+ self.options.width +';height:'+ self.options.height +'"></div>')
            .wrap('<div class="GScroll-scrollable"></div>')
            .parent().after('<div class="GScroll-bar"></div>');
            
            self.container = self.node.parent().parent();
            self.scrollable = self.node.parent();
            self.bar = self.node.parent().next();
            
            self.adjust.call(self);
            self.events.call(self);
        },
        
        /**
        *
        * Method for adjust bar height
        */
        adjust: function() {
            var self = this;
            self.conHeight = self.container.height();
            self.scrollHeight = self.scrollable.height();
            self.barHeight = self.conHeight - Math.abs(self.conHeight - self.scrollHeight);
            
            self.bar.css('height',self.barHeight + 'px');
        },
        
        events: function(){
            var self = this;
            /* Adding wheel event to container */
            self.container.on('DOMMouseScroll mousewheel',function(e){
                var o = e.originalEvent,
                    delta = (o.detail < 0 || o.wheelDelta > 0) ? 1 : -1;
                
                self.wheel.call(self, delta);
            });
        },
        wheel: function(delta){
            var self = this,
                maxTop = self.conHeight - self.barHeight,
                maxBottom = -maxTop;
            
            if (delta > 0){
                
                self.bar.stop(true,true).animate({
                    'top' : Math.max(0, parseFloat(self.bar.position().top) - 10)
                },100);
                
                self.scrollable.stop(true,true).animate({
                    'top' : Math.min(0, parseFloat(self.scrollable.position().top) + 10)
                },100);
                
            }else if (delta < 0){

                self.bar.stop(true,true).animate({
                    'top' : Math.min(maxTop, parseFloat(self.bar.position().top) + 10)
                },100);
                
                self.scrollable.stop(true,true).animate({
                    'top' : Math.max(maxBottom, parseFloat(self.scrollable.position().top) - 10)
                },100);
            }
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