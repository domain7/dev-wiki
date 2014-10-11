(function ($) {
  'use strict'; //You will be happier

  // Add anchor link to all .content > h2 elements
  function h2Anchors() {
    $('.content > h2').each(function(i, el) {
      var $el, icon, id;
      $el = $(el);
      id = $el.text().replace(/\&/g, 'n').replace(/\ /g, '-').toLowerCase();
      icon = '<i class="fa fa-link"></i>';

      if (id) {
        $(this).attr('id',id);
        $el.prepend($("<a />").addClass("header-link").attr("href", "#" + id).html(icon));
      }

      // Create id's for child h3 elements prefixing the parent id
      $el.nextUntil('h2', 'h3').each( function() {
        var subid = $(this).text().replace(/\&/g, 'n').replace(/\ /g, '-').toLowerCase();
        var subhref = id + '-' + subid;
        console.log(subhref);
        $(this).attr('id',subhref);
      });

    });
  }



  // Add 'back to top' before all .content > h2:NOT:first-of-type
  function backToTop() {
    $('.content > h2').not(':first-of-type').each(function(){
      var backLink = '<a href="#top"><i class="fa fa-arrow-circle-up fa-before"></i>back to top</a>';
      $(this).before(backLink);
    });
  }



  // Dynamically build sidebar menu
  function buildSubmenu() {

    // Affix submenu
    $('.submenu').affix({
      offset: { top: $('.subnav').offset().top }
    });


    // Create parent submenu items
    $('.content > h2').each(function(){
      var href = $(this).attr('id'),
          title = $(this).text(),
          link = '<a href="#'+href+'">'+title+'</a>',
          items = '',
          submenu = [];

      //
      function subMenu(id, title) {
        return {
          id:id,
          title:title
        }
      }

      // Add to submenu Array
      $(this).nextUntil('h2', 'h3').each( function() {
        var subhref = href + '-' + $(this).text().replace(/\&/g, 'n').replace(/\ /g, '-').toLowerCase(),
            subtitle = $(this).text();
        submenu.push(subMenu(subhref, subtitle));
      });

      items += '<li class="level1">';
      items += link;
      // Create child submenu items (2nd level)
      if (submenu.length) {
        items += '<ul class="nav">';
        submenu.forEach(function(item){
          var itemHref = item['id'];
          var itemTitle = item['title'];
          var submenuItem = '<li><a href="#'+itemHref+'">'+itemTitle+'</a></li>';
          items += submenuItem;
        });
        items += '</ul>';
      }
      items += '</li>';

      $('.submenu').append(items);
    });

  }



  // ScrollSpy Activation
  function scrollSpy() {
    $('.submenu > li:first-child').addClass('active');
    $('body').scrollspy({ target: '.subnav' })
  }





  $(document).ready(function(){
    h2Anchors();
    backToTop();
    buildSubmenu();
    scrollSpy();
  });

}(jQuery));
