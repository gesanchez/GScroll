;(function ( $, window, document, undefined ) {

    var pluginName = "GScroll",
        defaults = {
            width: "300px",
            height: "50px"
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
            self.scrollHeight = 0;
            if (self.node.is(':not(:visible)')){
                var clone = self.node.clone();
                clone.css({
                    width: self.options.width,
                    'visibility' : 'hidden'
                }).removeAttr('id').show();
                $('body').append(clone);
                self.scrollHeight = clone.outerHeight();
                clone.remove();
            }else{
                self.scrollHeight = self.scrollable.height();
            }
            self.barHeight = Math.max(10,(self.conHeight - Math.abs(self.conHeight - self.scrollHeight)));
            
            self.bar.css('height',self.barHeight + 'px');
        },
        
        events: function(){
            var self = this;
            self.dragActive = false;
            self.y = 0;
            /**
            * Added event to container
            */
            self.container.on({
                'DOMMouseScroll mousewheel' : function(e){
                    var o = e.originalEvent,
                        delta = (o.detail < 0 || o.wheelDelta > 0) ? 1 : -1;
                
                    self.wheel.call(self, delta);
                },
                'mouseenter' : function(){
                    self.bar.stop(true,true).fadeIn();
                },
                'mouseleave' : function(){
                    self.bar.stop(true,true).fadeOut();
                    self.dragActive = false;
                },
                'mousemove' : function(e){
                    e.preventDefault();
                    self.drag.call(self, e);
                }
            });
            
            /**
            * Added event for scroll bar
            */
            self.bar.on({
                'mousedown' : function(e){
                    e.preventDefault();
                    self.dragActive = true;
                    self.y = e.pageY;
                },
                'mouseup' : function(e){
                    self.dragActive = false;
                    console.log('asd');
                },
                'mousemove' : function(e){
                    e.preventDefault();
                    self.drag.call(self, e);
                }
            });
            
            /**
            * Added event to element
            */
            self.node.on('resize.' + pluginName, function(){
                self.adjust.call(self);    
                
            }).on('destroy.' + pluginName, function(){
                self.node.unwrap().next().remove().end().unwrap();
                $.removeData(self.element);
                self.node.off(pluginName);
            });
            
            
            $(window).on('resize.' + pluginName, function(){
                self.adjust.call(self);  
            });
        },
        /* Method for move bar and scrollable on mousewheel event */
        wheel: function(delta){
            var self = this,
                maxTop = self.conHeight - self.barHeight,
                maxScrollBottom = self.conHeight - self.scrollHeight,
                top = maxTop / (Math.abs(maxScrollBottom)) * 10;
            
            if (delta > 0){
                
                self.bar.stop(true,true).animate({
                    'top' : Math.max(0, parseFloat(self.bar.position().top) - top)
                },100);
                
                self.scrollable.stop(true,true).animate({
                    'top' : Math.min(0, parseFloat(self.scrollable.position().top) + 10)
                },100);
                
            }else if (delta < 0){

                self.bar.stop(true,true).animate({
                    'top' : Math.min(maxTop, parseFloat(self.bar.position().top) + top)
                },100);
                
                self.scrollable.stop(true,true).animate({
                    'top' : Math.max(maxScrollBottom, parseFloat(self.scrollable.position().top) - 10)
                },100);
            }
        },
        /**
        * Method for move bar and scrollable when bar is dragged
        */
        drag : function(e){
            var self = this,
                maxTop = self.conHeight - self.barHeight,
                maxScrollBottom = self.conHeight - self.scrollHeight;
            
            if (self.dragActive === true){
                
                var top = parseFloat(self.bar.position().top) + e.pageY - self.y;
                top = Math.min(top, maxTop); 
                
                self.bar.css({
                    top: Math.max(0 ,top) + 'px'            
                });
                
                self.scrollable.css({
                    'top' : Math.min(0 ,Math.max(maxScrollBottom, (maxScrollBottom / maxTop) * top))
                });
                
                self.y = e.pageY;
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