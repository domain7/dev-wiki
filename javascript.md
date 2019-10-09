---
layout: page
title: JavaScript
permalink: /javascript/
mainmenu: true
---

## Coding Standards

We follow [our JavaScript Styleguide](https://github.com/domain7/eslint-config-domain7) for our JavaScript coding standards. It's a modification of the [AirBnB JavaScript Styleguide](https://github.com/airbnb/javascript).

## Modules

  Much like our CSS approach, we split every piece of JavaScript functionality into separate modules.

  - The file should be named with camelCase.
  - Add a method called `noConflict()` that sets the exported module to the previous version and returns this one.
  - Always declare `'use strict';` at the top of the module.
  - Pass in global vars like `jQuery` in as parameters.
  - Return a public API that gives access to necessary vars and functions

    ```javascript
    // modules/myModule.js

    (function($) {
      'use strict';

      //Some Private variables
      var myThing = false,
          toggled = true;

      //Bind some jquery
      $(document).on('ready', onReady);

      //Some private function
      function onReady(){
        //Do the stuff

      }

      function toggleIt(){
        toggled = !toggled;
      }

      //Use a function to return the value of a private variable
      function isToggled() {
        return toggled;
      }

      //Return a public API that
      return {
        toggleIt: toggleIt,
        isToggled: isToggled
      };

    }(jQuery));
    ```

## Tools, Libraries, and Plugins
  To avoid having 3rd party JS accidentally modified, Vendor JS should be in an isolated directory from the app source directory. Great examples of directory names for this:

  - /vendor
  - /includes
  - or /bower_components

  3rd party JS that needs to be modified should idealy be forked on github/bitbucket.

## Angular

For Angular, we use [John Papa's Angular Style Guide](https://github.com/johnpapa/angular-styleguide) as our coding reference.
