---
layout: page
title: CSS/SASS
description: Coding standards for CSS using SASS and Compass
permalink: /css/
mainmenu: true
---

This document outlines the standards and best practices for CSS and SASS for Domain7.

## SASS

We use SASS with the SCSS syntax as a standard at Domain7\. All new stylesheets are written with with SCSS. Stylesheets written in vanilla CSS inherited from legacy projects can be maintained with vanilla CSS, but if possible you should change the file extensions to .scss so you can incorporate SASS into the project. Assess if time permits refactoring the existing CSS to fit into Domain7's SASS boilerplate structure (to be discussed later) and continued as such.

For more info and full documentation on SASS, visit [sass-lang.com](http://sass-lang.com/).

## CSS basics

Since SASS is a superset of CSS, all best practices for CSS apply to SASS. This document will focus on SASS, but are a few CSS standards at Domain7 to keep in mind.

## Class naming

### Case

Class names should only use lowercase letters.

## BEM + SMACSS prefixes

BEM (Block Element Modifier) with a few SMACSS prefixes is standard. New projects are written with this style.

### BEM

The following naming pattern is used for BEM:

    .block-name__element--modifier

BEM is a fantastic naming strategy for creating more self documenting class names. By using BEM you can allow every class name to tel you where it belongs and how it functions. Refactoring is far simpler knowing which classes are needed, and at a glance you know where classes are defined and what their purposes is. With nested modules BEM can really shed a lot of light on an otherwise complex class name soup.

This differs from the common `.block__element--modifier` to be more consistent with our already standard `.module_name-child` naming pattern. This allows for BEM and non-BEM code to coexist more easily, and to smooth the transition to BEM should developers chose to.

An example of BEM could be this:

    <ul class="social-links">
        <li><a href="#" class="social-links__item
        social-links__item--facebook">Facebook</a></li>
    </ul>

    .social-links {

        &__item {
            ...

            &--facebook { ... }

        }

    }

which compiles to

    .social-links { }
    .social-links__item { }
    .social-links__item--facebook { }

Note that the modifier is on the item. Another example could be

    <a href="button button--secondary">Do the thing!</a>

### Prefixes

In addition to BEM naming, Domain7 uses the following CSS namespace prefixes:

*   `.is-` and `.has-` State classes
*   `.l-` Layout specific classes
*   `.u-` Utility classes, like `.u-clearfix`
*   `.js-` For JavaScript binding, to keep styling and JavaScript separate
*   `.t-` For theme specific classes

#### Other state prefixes

Other useful state prefixes can be added, like, `.can-` and `.did-`.

##### Some reading:

*   [http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)
*   [http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/](http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/)
*   [https://smacss.com/](https://smacss.com/)
*   [http://webdesign.tutsplus.com/articles/an-introduction-to-the-bem-methodology--cms-19403](http://webdesign.tutsplus.com/articles/an-introduction-to-the-bem-methodology--cms-19403)
*   [https://css-tricks.com/bem-101/](https://css-tricks.com/bem-101/)

## Hyphens and underscores

Hyphens should be used in place of spaces, and BEM syntax should be used to communicate relationship

The following are bad class names: `link-list`, `linkList`, `LiNkLiSt`, `LINKLIST`, and so forth.

The following is a good class name:

    `.link-list__item`

## Abbreviations

All SASS should be written with an emphasis on readability over shorter names. For example, use `button` instead of `btn`.

## Reuse and context specifics

We try to build and design with a modular approach. Pages are broken into smaller component pieces, which should be self contained. This should be reflected in class names. For example, rather than having a class called `sidebar-linklist`, you should just use `link-list`, or whatever your module is called, and let the context determine the specifics. For example, `.sidebar .link-list` could be your selector.

    .link-list {

        .sidebar & {
            ...
        }

    }

In general, plan for reuse as much as possible, across pages and in various contexts on the same page.

## Declaration block style

### Indentation

For any Domain7 specific project, we use 2 spaces as our indentation. If ever you were to contribute code to the community, follow the standard of that community e.g. WordPress uses tabs for indentation.

### Braces

There should be a space after the selector and the opening brace `{` and a closing brace `}` should be on a new line.

    // Do this
    .sidebar {
      padding-bottom: 1em;
      margin-bottom: 1em;
    }

    // Don't do this
    .sidebar{
      padding-bottom: 1em;
      margin-bottom: 1em;}

### One selector per line - one rule per line

You should use one selector per line, and one rule per line.

For example:

    // Do this
    .sidebar .widget,
    .site_footer .widget {
        border-bottom: 1px solid #333;
        padding-bottom: 1em;
        margin-bottom: 1em;
    }

    // Don't do this
    .sidebar .widget, .site_footer .widget {
        border-bottom: 1px solid #333;padding-bottom: 1em;margin-bottom: 1em;
    }

    // And definitely don't do this
    .sidebar .widget, .site_footer .widget { border-bottom: 1px solid #333;padding-bottom: 1em;margin-bottom: 1em;}

### Rule order

Style rules should be placed in the following order. Note that anything bringing in rules not declared presently are placed first so you know what you're bringing in.

1.  includes
2.  regular styles grouped by type:
    1.  Positioning
    2.  Display & Box Model
    3.  Color
    4.  Text
    5.  Other

Example:

    .selector {
      /* includes */
      @include clearfix;

      /* Positioning */
      transition: 1s opacity ease-out;
      transform: rotateY(10deg);
      position: absolute;
      z-index: 10;
      top: 0;
      right: 0;

      /* Display & Box Model */
      display: inline-block;
      overflow: hidden;
      box-sizing: border-box;
      width: 100px;
      height: 100px;
      padding: 10px;
      border: 10px solid #333;
      margin: 10px;
      border-radius: 5px;

      /* Color */
      background: #000;
      color: #fff;
      opacity: 0.5;

      /* Text */
      font-family: sans-serif;
      font-size: 16px;
      line-height: 1.4;
      text-align: right;

      /* Other */
      cursor: pointer;
    }

### Spacing of declaration blocks

There should be a single line space between declaration blocks. This also goes for nested declaration blocks.

## SASS style guide

### Boilerplate

We [have a boilerplate for SASS/Compass projects](https://bitbucket.org/domain7/sassyplate). All projects should be created with it, and follow the file structure used in the boilerplate. Documentation on the boilerplate is found [in the project's readme](https://bitbucket.org/domain7/sassyplate), with more information available in screen.scss.

### Syntax

We only use the .scss syntax, and never the .sass syntax.

### A modular approach

We take a modular approach as much as possible. This is usually implemented in design and always implemented in development. As such you should avoid using a traditional top down stylesheet (usually called _style.scss) unless absolutely necessary. Rather all SASS should be in an appropriate place, which will be further discussed.

### Consider compiled CSS

It's not really important for your compiled CSS to be easy to read since only .scss files will be edited, but it is important for compiled CSS to make sense. When writing SASS, consider how your files will be compiled. Be sure nothing ends up in your compiled CSS that doesn't need to be there. Avoid bloating your CSS with ill thought through use of mixins.

### Maintainable SASS

As a reoccurring topic, readable, maintainable SASS is of the utmost importance. This should be reflected in readable variable and mixin names, logical file organization, compartmentalized code, and so forth. Files should be broken into small, maintainable pieces, as will be discussed.

### Node Sass and Mixin Libraries

We have moved away from using mixin libraries such as Compass or Bourbon and away from Ruby Sass as our compiler. We now use a combination of Node Sass, a few selected mixins and PostCSS (see below for more information) to compile our Sass files. This removes bloat from the compiled stylesheet and improves compile time drastically (over 10 seconds with Ruby vs 1 second with Node).

If legacy projects still use either Compass or Ruby Sass, just use what is in place. There is no need to refactor the workflow.

## PostCSS

PostCSS is a tool for transforming styles with JS plugins. Here are the lists of plugins that we use:

### Autoprefixer

Since we don't use libraries anymore, we use autoprefixer to add vendor prefixes to CSS3 properties (i.e border-radius, box-shadow, etc.). It uses data from Can I Use to determine which are necessary and can be customized to use only the ones we want. In your scss file, you only need to write the property as you would any other.

### Source Maps

Source maps will allow to see which sass file your styles are coming from when inspecting an element in the developer tools, instead of your compiled css file. This is great for development but can removed when pushing to production.

### Sorting

Sorting is a Sublime Text plugin that will automatically sort CSS properties based on your configuration when you save your file or run the command.

* [Plugin Repo](https://github.com/hudochenkov/sublime-postcss-sorting)
* [Base Configuration](https://gist.github.com/igorbarbashin/40d38320635bcc3620a9b519fea8abcc)

## Variables

Using variables creates easily maintainable code. Any value that’s used more than once or is difficult to remember should have a variable created for it. The following, amongst other items, should use variables:

*   Font names
*   Font stacks
*   Font weights
*   Font sizes
*   Colour schemes

### Variable naming

In general variables are named with the some guidelines as class names.

*   Variable names should follow the [category]-[modifier] pattern. For example, all font variables should be prefixed with `$font-`, resulting in `$font-base`, `$font-body`, `$font-feature`, and so forth.
*   Variable names should observe the same underscore and hyphen pattern as with class names: underscores in place of spaces, hyphens to indicate a modifier.
*   Variable names should be all lowercase.
*   Variable names should focus on readability and specificity over saving space. For example, use `background` instead of `bkg`.
*   Variables should be named after what they are, not what they look like. For example, don’t have a variable called `$green`, but use something like `$color-brand` instead.
*   The word colour should be spelled the American way (color) for consistency with CSS, even if you're a Canadian that absolutely can't stand spelling it that way.

The following are bad variable names:

    $base-font // doesn't follow the [category]-[modifier] pattern. Should be $font-base;
    $base-color // same problem as $base-font
    $headerFont // doesn't follow the above pattern, uses camel case instead of all lower case with the hyphen/underscore use described.
    $bkgColor // doesn't follow the above patter, uses camel case, shortens word background. Should be $color-background
    $red // what is this even?! Should probably be $color-brand, $color-accent, or something of the like.

The following variables are in the boilerplate and should be used:

    $color-brand: #00A4E4; // the main brand colour, probably the main logo colour
    $color-brand--accent: #999; // the brand accent colour might also be used in the logo, or generally as an accent
    $color-canvas: #eee; // this is probably the background colour of the body element
    $color-canvas--alt: #333; // an alternate canvas colour
    $color-base: #333; // the colour of most body text
    $color-base--alt: #eee; // alternate body text colour, probably used over
    $color-canvas--alt
    $color-keyline: #666; // line dividers

### Maps

[Sass maps are awesome!](http://viget.com/extend/sass-maps-are-awesome) and we use them for our breakpoints. If you use them for anything else, the only naming principle to change is that you no longer need [category]-[modifier] as the map itself is the category with your items being modifiers.

## Nesting

Nesting is one of the best things in SASS. It saves a lot of time, but can also create some nightmares in your compiled CSS. These guidelines help alleviate those concerns:

*   Only nest as much as you need to and as little as you can get away with. Nest enough to save typing long selectors, but not so much that your compiled CSS is so complicated overriding is difficult. Over nesting precludes your ability to create variations on modules easily based on context, creates bloated compiled CSS, and a host of other issues. If you need to compile to `.sidebar .widget`, _don't_ nest your `.sidebar` declaration block inside of any others.
*   Never nest inside of the `body` or `html` elements unless you have a really good reason to do so.
*   Just because you have modules inside the sidebar in your DOM _doesn't_ mean you need to reflect that in your nesting. You probably shouldn't do this. The only styles in the `.sidebar` declaration block should be related directly to the sidebar itself, not the content.
*   There should be a line break before and after nest declaration blocks.

### Use the ampersand

The ampersand in SASS is just great, and you should use it for neat nesting. Some examples:

    .button {

        &.secondary { ... }

    }

compiles to

    .button.secondary { ... }

<!-- separator -->

    .button {

        .no-opacity & { ... }

    }

compiles to

    .no-opacity .button { ... }

<!-- separator -->

    .button {

        &:hover { ... }

    }

compiles to

    .button:hover { ... }

### Order of nested declaration blocks

Declaration blocks should be nested in this order:

1.  First come all style rules that apply to the parent declaration block itself. This is your present nesting context.
2.  All fallbacks for old browsers using Modernizr or IE classes, like such `.no-opacity & { ... }`.
3.  Any variations for the current declaration block. For example, if you're in a `.button` block, your variation might be `&.secondary { ... }` for a button with both the `button` and `secondary` classes.
4.  Media queries. Instead of separate media query blocks or files, they should be [nested inside declaration blocks](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#media).
5.  Nested declaration blocks.

Note that your nested declaration blocks always go last.

### Commenting closing braces

When nesting declaration blocks you should match the selector in a SASS style comment after the closing brace. This makes it easier to see what each closing brace is closing should end up with a long block of deeply nested code SCSS.

Instead of

    .button {

        &.secondary {

            .sidebar & {

            }

        }

    }

You should have

    .button {

        &.secondary {

            .sidebar & {

            } // .sidebar &

        } // &.secondary

    } // .button

With long, deeply nested blocks, this makes a huge difference for readability.

Try looking at this in a long file and try to find the right block you need for nesting:

                            }
                        }
                    }
                }
            }
        }
    }

To make it easier to type these, setup a snipped in your editor. The following snipped works in Sublime Text and TextMate:

    $1 {
        $2
    } // $1 $0

I have mine setup with `d` as the tab trigger.

## Extends

**Don't use them.**

They usually end up making the code brittle and confusing. Mixins actually end up making the file smaller and create less css selector rules (potential IE issue).

For more reasons, checkout this article titled: [Why You Should Avoid Sass @extend](http://www.sitepoint.com/avoid-sass-extend/).

## Commenting

You should comment as much as is useful. Be liberal with your comments. If you had to think something through or see any room for confusion, describe it in a comment. When in doubt, write it out!

Know that CSS comments are included in compiled CSS whereas [SASS style comments](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#comments) are not, and consider this when writing them. If the comment is needed in the compiled CSS use a CSS style comment, otherwise use a SASS one.

## Important

As a general rule, you should never use `!important` in your stylesheet. However, in practice, sometimes you just have to! Whether it be inline styles or due to a vendor specific stylesheet, please be sure to use it as a last resort. And if you do use it, leave a short comment after your declaration explaining why you are using it.

    // Bad
    .module {
      width: 100% !imporant;
    }

    // Good
    .module {
      width: 100% !important; // Important is used to override inline-styles cause by library.js
    }

## Media queries

Separate stylesheets containing media queries should not be used. Doing so severs context, removing variations from the element that is being altered. Rather they should be [nested in your declaration blocks](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#media) for the element you wish to alter.

Breakpoints should be defined in _variables.scss under the $breakpoints map and can be called in scss files with the `breakpoint` function in _functions.scss. Breakpoints shouldn't be named after specific devices or classes of device. $breakpoints(iphone) is a really bad breakpoint name, as evident by there being 3 sizes of iPhone being sold at the time writing. More abstract names are encouraged.


### Build Mobile First
Use min-width media queries over max-width.  In general you are probably adding more style rules as the screen gets bigger.  You might get desktop designs first, but you should still develop mobile first. _However, if IE8 support is needed, you may need to build desktop first_

Good:

```
 .some-module {
   padding: 10px;

   @media (min-width: breakpoint(large)) {
     padding: 30px;
     float: right;
     width: 70%;
   }
 }//.some-module
```

Bad

```
 .some-module {
   padding: 30px;
   float: right;
   width: 70%;

   @media (max-width: breakpoint(large)) {
     padding: 10px;
     float: none;
     width: 100%;
   }
 }//.some-module
```

## Modules, Includes &amp; Vendors

### Modules

All styling code should be contained in modules. These are stored in the /modules directory, and named with an underscore prefix, like `_buttons.scss`.

Modules are self contained pieces of styling that can be reused. Modules should have the following characteristics:

*   Contain reusable styling constructs
*   Be context independent so they can be used anywhere (ie, not necessarily needing to be in a sidebar or main column, although sometimes that can’t be avoided).
*   Defined within a mixin or a group of mixins so that they can be used easily, anywhere.
*   Be applied to a class that describes what the element is, not what it looks like.
*   Depend on simple selectors, like a single class.
*   Contain their own variations, fallbacks, and possibly media queries

Each module should be contained in its own file. You shouldn't have a file called `modules.scss` or anything of the like. Rather each module should be individually named, prefixed with an underscore, in the modules directory. For example `/modules/_hero.scss`.

Buttons are a good example of a potential module, as are forms.

### Incudes

All base files necessary for your stylesheets should in Includes. This includes but not limited to:

* _base.scss which are your default tag definitions
* _fonts.scss to declare your custom fonts
* _functions.scss for sass functions
* _layouts.scss for any layout styling. Tags are usually prefixed with `.l-`
* _mixins.scss for sass mixins
* _normalize.scss (we use Eric Meyer's CSS reset)
* _print.scss for all print styles
* _typography.scss for all common font styles that can be reused throughout the site
* _utility.scss for any utility classes (such as a screen reader only class). Tags are prefixed with `.u-`
* _variables.scss for all variables used on the site.

### Vendors

Any third party library, plugin or utility stylesheets should go in the Vendors folder, for example: carousel, lightbox, video player, etc.

For any change to the base styling of the vendor: if it's possible to create a subtheme, create a stylesheet with the same name in the Includes folder with your custom styles. If it's a small change, you can do it directly in the vendors file, but leave a comment at the top of the file so the change won't get erased if there's a update.

## Modernizr, Internet Explorer, and backwards compatibility

For all CSS3 and HTML5 fallbacks, Modernizr should be used to perform tests. Modernizr should be used on all projects. Fallbacks for CSS3 properties shouldn’t be served to IE exclusively. Rather, Modernizr tests should be used. For example, don’t serve a fallback for CSS3 gradients to IE, but rather use Modernizr to serve a fallback to all browsers that don’t support the feature. User-agent string sniffing shouldn’t be used if avoidable.

### IE classes

As much as possible use `lt-ie{VERSION NUMBER}` classes instead of version specific ones. Problems in IE8 will likely also exist in IE7.

Don't use separate IE stylesheets unless the amount of IE specific code is substantial. Rather, nest these declaration blocks, using IE specific classes.

Instead of this:

    .button {
        border-radius: 3px;

        .lt-ie9 & {
            background-image: image-url('gross_gross_gross_rounded_corner_image.png');
        }

    }

do this

    .button {
        border-radius: 3px;

        .no-borderradius & {
            background-image: image-url('gross_gross_gross_rounded_corner_image.pns');
        }

    }

### Adding to the Modernizr build

We use a custom build of Modernizr based on the classes in our sass and javascript. After you've added a Modernizr class (eg. `borderradius`) to your stylesheet, make sure to run the `modernizr` task in the project's task runner.

    grunt modernizr

This will parse through all the code and look for those classes and add them to the Modernizr build. 

## Font sizing

Fonts can be defined using pixels, ems or rems (with a fallback). Since no modern browsers depend on ems for scaling, sizing with pixels has no practical consequence to the end user. Font sizing with rems is acceptable, but only if a fallback is provided in every instance. A utility mixin for this is provided in the SASS boilerplate.

## Folder Structure

We use the following file structure for our sites. When working on a feature branch, do no commit the compressed (`/dist`) CSS file. This will avoid unnecessary conflicts when merging or during a rebase. If the commit goes directly to production, you can then commit the stylesheet in the develop branch. 


    /dist

      /js
        application-head.js
        application.js

      /styles
        style.css

    /src

      /js

        /modules


        /vendor

        app.js

      /styles

        /includes

        /modules

        /vendor

        styles.scss


