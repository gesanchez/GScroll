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

$(window).trigger('adjust.GScroll')
```

## Plugin
------
This plugin was written with template of [Jquery Boilerplate](http://jqueryboilerplate.com/)
Minified with [Grunt](http://gruntjs.com/)