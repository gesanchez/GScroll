GScroll
=======

JQuery plugin for create a custom scroll

## Options
------
1. width -> Width of container (300px default)
2. height -> Height of container (300px default)

## Usage
------
```javascript
$('#div').GScroll({
    width: '250px',
    height: '250px'
});
```

## Events
------
```javascript
$('#div').trigger('adjust.GScroll');  // When the div changes height, this event sets the scrollbar

// or

$(window).trigger('adjust.GScroll');

// For destory instance
$('#div').trigger('destroy.GScroll');
```

## Features
-------
+ Vertical scroll.
+ Lightweight 4kb uglified.
+ Focusin event, when a element received the focus, the content it scrolled  to the element.
+ Drag event, without JQuery UI dependence.
+ Wheel event, without another plugin.
+ Trigger for update the content height when changed the inside content and trigger for destroy instance.


## Upcoming version
-------
+ Horizontal scroll.
+ Scrollto, for scroll to a specific element.
+ Something new events.

## Plugin
------
This plugin was written with template of [Jquery Boilerplate](http://jqueryboilerplate.com/)
Minified with [Grunt](http://gruntjs.com/)
