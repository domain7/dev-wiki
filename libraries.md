---
layout: page
title: Libraries
description: A collection of js/css libraries we often use
permalink: /libraries/
mainmenu: true
---

## Animations

### Greensock

[Greensock](https://greensock.com/) is a powerful js library for HTML5 animations. The possibilities are basically endless and offers the best performance when it comes to animations on the web.

    var tl = new TimelineMax({repeat:6, repeatDelay:1, yoyo:true});
    tl.staggerTo("h2", 0.2, {className:"+=superShadow", top:"-=10px", ease:Power1.easeIn}, "0.3", "start")

### Scrollmagic

[Scrollmagic](http://scrollmagic.io/) allows you to do a number of interactions based on the scroll position of a webpage. You can animate, pin, toggle classes, add a parallax effect, do an infinite scroll and do callbacks. It can also be combined with Greensock for even more awesomeness.

    var scene = new ScrollMagic.Scene({triggerElement: "#trigger1", duration: 300})
                .setPin("#pin1")
                .addIndicators({name: "1 (duration: 300)"}) // add indicators (requires plugin)
                .addTo(controller);

  

## Carousel - Sliders

### Swiper

[Swiper](http://idangero.us/swiper) is a fuly fledged slider that has a ton of options, is mobile friendly and has accessibility options. You can see the api [here](http://idangero.us/swiper/api). This is our preferred slider.

    var mySwiper = new Swiper('.swiper-container', {
      //options go here
    });

### Owl Carousel 2

If you need something a bit more simpler and lighter, [Owl Carousel](https://owlcarousel2.github.io/OwlCarousel2/) is a jQuery based replacement for Swiper.


    $(document).ready(function(){
      $('.owl-carousel').owlCarousel();
    });

## Lightboxes

### Recommended: Lity

[Lity](https://sorgalla.com/lity/) is a responsive lightbox plugin which supports images, iframes and inline content. 
- Pro: It's great for accessibility and use with a keyboard
- Con: It doesn't offer galleries, only single image/video

### Other Option: Fresco

[Fresco.js](http://www.frescojs.com/) is an image and video responsive lightbox. It supports single image popups, image gallery popups, overflow image popups and a video popup. You need a pro license to use every feature so be sure to check Keypunch for login information. Its strength is how easy it is to implement a video lightbox for youtube and vimeo. 

    <a href="http://www.youtube.com/watch?v=c0KYU2j0TM4" class="fresco">Youtube</a>
- Pro: It does offer gallery options
- Con: Not as great for accessibility

### Other Option: Magnific Popup

[Magnific Popup](http://dimsemenov.com/plugins/magnific-popup/) is a responsive jQuery lightbox that can do single image, image gallery, zomm gallery, video popup with youtube/vimeo and a map popup. It can also do a modal poup with basic content or a form.

    $('.test-popup-link').magnificPopup({
      type: 'image'
      // other options
    });


## Media Query

### Harvey

[Harvey](http://harvesthq.github.io/harvey/) allows you to call functions based on media queries similar to the ones in CSS. Don't mind the last update timestamp on their github page, it is still working properly. If it ain't broke, don't fix it!

    Harvey.attach('screen and (min-width:600px) and (max-width:900px)', {
      setup: setup_function, // called when the query becomes valid for the first time
      on: on_function, // called each time the query is activated
      off: off_function // called each time the query is deactivated
    });


## iFrames

### Recommended: Responsive iFRAMEs

For some institutional projects, we still need to implement iFrames with responsive layouts. [Responsive iFRAMEs](https://benmarshall.me/responsive-iframes/) can be a solution for this problem.


## Tables

### Recommended: ListJS

[ListJS](https://listjs.com) is a library for adding responsive tables to HTML, often for a CMS. 
- Pro: You can put responsive tables into a CMS RichText Editor, or plain HTML lists, tables, or anything.
- Pro: Comes with search, filter, and sort features
- Con: Not as many styling options