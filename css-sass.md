---
layout: page
title: CSS/SASS
description: Coding standards for CSS using SASS and Compass
permalink: /css/
mainmenu: true
---

This document outlines the standards and best practices for CSS and SASS for Domain7.

## SASS & Compass

We use SASS with the SCSS syntax as a standard at Domain7. All new stylesheets should be written with with SCSS. Stylesheets written in vanilla CSS inherited from legacy projects can be maintained with vanilla CSS, but if possible you should change the file extensions to .scss so you can incorporate SASS into the project. Assess if time permits refactoring the existing CSS to fit into Domain7's SASS boilerplate structure (to be discussed later) and continued as such.

For more info and full documentation on SASS, visit [sass-lang.com](http://sass-lang.com/).

### Compass

Compass offers helpers for many things including CSS3 and saves a lot of time. Compass has been accepted as a standard at Domain7 and all projects should be built with Compass.

For more info and full documentation on Compass, visit [compass-style.org](http://compass-style.org/).

## CSS basics

Since SASS is a superset of CSS, all best practices for CSS apply to SASS. This document will focus on SASS, but are a few CSS standards at Domain7 to keep in mind.

### Class naming

#### Case

Class names should only use lowercase letters.

#### Hyphens and underscores

Underscores should be used in place of spaces, and hyphens should be used to indicate a subordinate relationship. For example, `link_list-item` could be a descendant of `.link-list`.

The following are bad class names: `link-list`, `linkList`, `LiNkLiSt`, `LINKLIST`, and so forth.

#### Abbreviations

All SASS should be written with an emphasis on readability over shorter names. For example, use `button` instead of `btn`.

#### Reuse and context specifics

We try to build and design with a modular approach. Pages are broken into smaller component pieces, which should be self contained. This should be reflected in class names. For example, rather than having a class called `sidebar_linklist`, you should just use `link_list`, or whatever your module is called, and let the context determine the specifics. For example, `.sidebar .link_list` could be your selector.

	.link_list {
		.sidebar & {
			...
		}
	}

In general, plan for reuse as much as possible, across pages and in various contexts on the same page.

### Declaration block style

#### Indentation

Indentation in your stylesheets should follow the standard of the framework in use. If the project isn't using a larger framework (e.g. Rails, Drupal, WordPress), this can be left to developer preference. However, when you inherit a project you must conform to whatever indentation style is currently in place.

Be consistent in your indentation.

#### One selector per line, one rule per line.

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

#### Group like rules

Group your CSS rules in similar chunks. For example, put everything to do with fonts together, as with box model, positioning, and so forth.

#### Spacing of declaration blocks

With vanilla CSS, declaration blocks should have a single line space between them. The style is a little different with SASS. Nested declaration blocks shouldn't have a space under them. You should put a space between the outermost declaration blocks only.

## SASS style guide

### Basics

#### Boilerplate

We [have a boilerplate for SASS/Compass projects](https://bitbucket.org/domain7/sassyplate). All projects should be created with it, and follow the file structure used in the boilerplate. Documentation on the boilerplate is found [in the project's readme](https://bitbucket.org/domain7/sassyplate), with more information available in screen.scss.

#### Syntax

We only use the .scss syntax, and never the .sass syntax.

#### Boilerplate

New SASS/Compass projects should be built from – or conform to the conventions used in – [Domain7’s SASS/Compass boilerplate](https://bitbucket.org/domain7/sassyplate). Specific files in the boilerplate will be discussed in the boilerplate's own section.

#### A modular approach

We take a modular approach as much as possible. This is usually implemented in design and always implemented in development. As such you should avoid using a traditional top down stylesheet (usually called _style.scss) unless absolutely necessary. Rather all SASS should be in an appropriate place, which will be further discussed.

#### Consider compiled CSS

It's not really important for your compiled CSS to be easy to read since only .scss files will be edited, but it is important for compiled CSS to make sense. When writing SASS, consider how your files will be compiled. Be sure nothing ends up in your compiled CSS that doesn't need to be there. Avoid bloating your CSS with ill thought through use of mixins.

#### Maintainable SASS

As a reoccurring topic, readable, maintainable SASS is of the utmost importance. This should be reflected in readable variable and mixin names, logical file organization, compartmentalized code, and so forth. Files should be broken into small, maintainable pieces, as will be discussed.

#### Compass

Use it. On every project. It's great.

### CSS3

All CSS3 and vendor prefixed new features should be used with Compass. This gives you mixins for the vendor prefixes and allows for more configuration and flexibility.

Don't reproduce the features of Compass with other libraries like Bourbon unless there are features in these libraries which you need and Compass doesn't provide.

### Variables

Using variables creates easily maintainable code. Any value that’s used more than once or is difficult to remember should have a variable created for it. The following, amongst other items, should use variables:

* Font names
* Font stacks
* Font weights
* Font sizes
* Colour schemes
* Breakpoints

#### Variable naming

In general variables are named with the some guidelines as class names.

* Variable names should follow the [category]-[modifier] pattern. For example, all font variables should be prefixed with `$font-`, resulting in `$font-base`, `$font-body`, `$font-feature`, and so forth.
* Variable names should observe the same underscore and hyphen pattern as with class names: underscores in place of spaces, hyphens to indicate a modifier.
* Variable names should be all lowercase.
* Variable names should focus on readability and specificity over saving space. For example, use `background` instead of `bkg`.
* Variables should be named after what they are, not what they look like. For example, don’t have a variable called `$green`, but use something like `$color-brand` instead.
* The word colour should be spelled the American way (color) for consistency with CSS, even if you're a Canadian that absolutely can't stand spelling it that way.

The following are bad variable names:

    $base-font // doesn't follow the [category]-[modifier] pattern. Should be $font-base;
    $base-color // same problem as $base-font
    $headerFont // doesn't follow the above pattern, uses camel case instead of all lower case with the hyphen/underscore use described.
    $bkgColor // doesn't follow the above patter, uses camel case, shortens word background. Should be $color-background
    $red // what is this even?! Should probably be $color-brand, $color-accent, or something of the like.

The following variables are in the boilerplate and should be used:

    $color-brand: #00A4E4; // the main brand colour, probably the main logo colour
    $color-brand-accent: #999; // the brand accent colour might also be used in the logo, or generally as an accent
    $color-canvas: #eee; // this is probably the background colour of the body element
    $color-canvas-alt: #333; // an alternate canvas colour
    $color-base: #333; // the colour of most body text
    $color-base-alt: #eee; // alternate body text colour, probably used over $color-canvas-alt
    $color-keyline: #666; // line dividers

#### Maps

[Sass maps are awesome!](http://viget.com/extend/sass-maps-are-awesome). If you use them, the only naming principle to change is that you no longer need [category]-[modifier] as the map itself is the category with your items being modifiers.

### Rule order

Style rules should be placed in the following order. Note that anything bringing in rules not declared presently are placed first so you know what you're bringing in. 

1. extends
2. includes
3. regular styles grouped by type

Sometimes you'll need to change this order if you need to overwrite a rule in an extend or include. 

### Nesting

Nesting is one of the best things in SASS. It saves a lot of time, but can also create some nightmares in your compiled CSS. These guidelines help alleviate those concerns:

* Only nest as much as you need to and as little as you can get away with. Nest enough to save typing long selectors, but not so much that your compiled CSS is so complicated overriding is difficult. Over nesting precludes your ability to create variations on modules easily based on context, creates bloated compiled CSS, and a host of other issues. If you need to compile to `.sidebar .widget`, _don't_ nest your `.sidebar` declaration block inside of any others.
* Never nest inside of the `body` or `html` elements unless you have a really good reason to do so.
* Just because you have modules inside the sidebar in your DOM _doesn't_ mean you need to reflect that in your nesting. You probably shouldn't do this. The only styles in the `.sidebar` declaration block should be related directly to the sidebar itself, not the content.
* There should be no spaces between nested declaration blocks.

#### Use the ampersand

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


#### Order of nested declaration blocks

Declaration blocks should be nested in this order:

1. First come all style rules that apply to the parent declaration block itself. This is your present nesting context.
2. All fallbacks for old browsers using Modernizr or IE classes, like such `.no-opacity & { ... }`.
3. Any variations for the current declaration block. For example, if you're in a `.button` block, your variation might be `&.secondary { ... }` for a button with both the `button` and `secondary` classes.
4. Media queries. Instead of separate media query blocks or files, they should be [nested inside declaration blocks](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#media).
5. Nested declaration blocks.

Note that your nested declaration blocks always go last.

#### Commenting closing braces

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

### @extends vs @mixins

Use @extend when you want to store multiple static properties and pass them to selectors.
If you can use an @extend instead of a @mixin, do so. This often results in a smaller compiled CSS file.

```scss
.module { 
  background: $color_main-background;
  color: $color_brand; 
}

.main_module { 
  @extend .module;
  min-height: 3em;
}

.sidebar_module { 
  @extend .module;
  min-height: 2em;
}
```

This compiles to

```scss
.module, .main_module, .sidebar_module {
  background: #fff;
  color: #444; 
}

.main_module { 
  min-height: 3em;
}

.sidebar_module { 
  min-height: 2em;
} 
```

If you want to use a set of rules and @extend them, but don't want the base class to show up anywhere, use the "%" operator.

```scss
%module { 
  background: $color_main-background;
  color: $color_brand; 
}

.main_module { 
  @extend .module;
  min-height: 3em;
}

.sidebar_module { 
  @extend .module;
  min-height: 2em;
}
```

This compiles to

```scss
.main_module, .sidebar_module {
  background: #fff;
  color: #444; 
}

.main_module { 
  min-height: 3em;
}

.sidebar_module { 
  min-height: 2em;
} 
```

One limitation with @extend that applies to placeholder selectors as well is that it doesn't work between rules in different @media blocks.

### Commenting

You should comment as much as is useful. Be liberal with your comments. If you had to think something through or see any room for confusion, describe it in a comment. When in doubt, write it out!

Know that CSS comments are included in compiled CSS whereas [SASS style comments](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#comments) are not, and consider this when writing them. If the comment is needed in the compiled CSS use a CSS style comment, otherwise use a SASS one.

### Media queries

Separate stylesheets containing media queries should not be used. Doing so severs context, removing variations from the element that is being altered. Rather they should be [nested in your declaration blocks](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#media) for the element you wish to alter.

Breakpoints should be defined in _variables.scss using the $breakpoint-[name] pattern. Breakpoints shouldn't be named after specific devices or classes of device. $breakpoint-iphone is a really bad breakpoint name, as evident by there being 3 sizes of iPhone being sold at the time writing. More abstract names are encouraged.

#### Don't build mobile first (sorry)

Contrary to the cool kids, don't build your mobile layout first using media queries for desktop layouts. This creates a situation where you need to polyfill media query support for older browsers and end up with strange conflicts in things like harvey.js and enquire.js. This also creates unnecessary overhead. There's no need at all for IE8 to support media queries. You should build so your average sized desktop layout works without media queries, then use media queries to adapt smaller and larger, as the case may be. The only exception is in situations where you're only building for mobile, or only supporting browsers with media query support. Otherwise, take this approach.


### Modules and partials

All styling code should be contained in modules and partials. These are stored in the /modules and /partials directories, and named with an underscore prefix, like `_buttons.scss`.

#### Modules

Modules are self contained pieces of styling that can be reused. Modules should have the following characteristics: 

* Contain reusable styling constructs
* Be context independent so they can be used anywhere (ie, not necessarily needing to be in a sidebar or main column, although sometimes that can’t be avoided).
* Defined within a mixin or a group of mixins so that they can be used easily, anywhere.
* Be applied to a class that describes what the element is, not what it looks like.
* Depend on simple selectors, like a single class.
* Contain their own variations, fallbacks, and possibly media queries

Each module should be contained in its own file. You shouldn't have a file called `modules.scss` or anything of the like. Rather each module should be individually named, prefixed with an underscore, in the modules directory. For example `/modules/_hero.scss`.

Buttons are a good example of a potential module, as are forms.

#### Partials

Partials are pieces of code that aren't modular in nature, but are broken off for easier maintainability. Good examples of potential partials are headers, footers, and specifically designed un-reusable items.

Each partial should be contained in its own file. You shouldn't have a file called `parials.scss`, rather each module should be individually named, prefixed with an underscore, in the partials directory. For example `/partials/_header.scss`.

### Including third party libraries and utilities

Most third party code you're likely to use will either installed via a gem and included in the config.rb file or an .scss file included and used via mixins.

For libraries included with a gem, make sure to include a url to the webpage with info on downloading the gem as a comment in config.rb near where the library is included.

For .scss files, store them in the includes directory.

Don't include third party code that replicates the functionality of Compass unless the new library provides something specifically needed that Compass doesn't provide.

### Modernizr, Internet Explorer, and backwards compatibility

For all CSS3 and HTML5 fallbacks, Modernizr should be used to perform tests. Modernizr should be used on all projects. Fallbacks for CSS3 properties shouldn’t be served to IE exclusively. Rather, Modernizr tests should be used. For example, don’t serve a fallback for CSS3 gradients to IE, but rather use Modernizr to serve a fallback to all browsers that don’t support the feature. User-agent string sniffing shouldn’t be used if avoidable.


#### IE classes

As much as possible use `lt-ie{VERSION NUMBER}` classes instead of version specific ones. Problems in IE8 will likely also exist in IE7.

Don't use separate IE stylesheets unless the amount of IE specific code is substantial. Rather, nest these declaration blocks, using IE specific classes.

Instead of this:

    .button {
        @include border-radius(3px);
        .lt-ie9 & {
            background-image: image-url('gross_gross_gross_rounded_corner_image.png');
        }
    }


do this

    .button {
        @include border-radius(3px);
        .no-borderradius & {
            background-image: image-url('gross_gross_gross_rounded_corner_image.pns');
        }
    }

### Sprites

Compass’s spriting ability should be used over creating them manually. Creating sprites in this manner makes them easier to maintain, and eliminates the need for maintaining a sprite .psd. When creating sprites, 2x versions should be created simultaneously for high pixel density displays. The background-sprite mixin from the SASS boilerplate should be used for this purpose. Sprites should be created in includes/_sprites.scss

### Font sizing

Fonts can be defined using pixels, ems or rems (with a fallback). Since no modern browsers depend on ems for scaling, sizing with pixels has no practical consequence to the end user. Font sizing with rems is acceptable, but only if a fallback is provided in every instance. A utility mixin for this is provided in the SASS boilerplate.

### Compass URL Helpers
In order to keep sass code portable, use always use [Compass URL Helpers](http://compass-style.org/reference/compass/helpers/urls/).  Just make sure you have the following enabled in your compass config:

    images_dir = "images"
    fonts_dir = "fonts"
    relative_assets = true

Bad:

    .hero {
      background-image: url(../../images/hero/mountains.png);
    }
    @font-face {
      ...
      src:url('../../fonts/prpa-icons/fonts/prpa-icons.woff');
      ...
    }

Good:

    .hero {
      background-image: image-url('hero/mountains.png');
    }
    @font-face {
      ...
      src:font-url('prpa-icons/fonts/prpa-icons.woff');
      ...
    }
