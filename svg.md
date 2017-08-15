---
layout: page
title: SVG
description: How to use SVGs
permalink: /svg/
mainmenu: true
---

## SVGs are awesome

SVGs are totally awesome! You should use them as much as possible on your project. If you don't know, SVG stands for Scalable Vector Graphics and, like the name mentions, can be scaled infinitely which will remove the necessity of having a `1x` and `2x` version of icons. They're also way smaller in size than your average raster image. 

## What you should use them for

The most common uses for SVGs are icons and logos, but they can be used for anything that has been done with vectors such as a background pattern, an illustration, a typography treatment, etc. They can also be used for more advanced things such as clip-masks.

## How to use them

### IMG

The simplest way to use SVG is with an image tag. Just as you would with a `.jpg` or `.png` image, just point the `src` to your image.

    <img src="/img/svg/logo.svg" alt="logo" />

The downside of doing it this way is that you can only apply styles to the tag and not the SVG itself. You will not be able to change the `fill` or anything else. 

### CSS

You can also use it in css as a `background-image` just as you would with any image. However, you will only be able to apply css properties to the background and not to the SVG itself.

    .module {
      background: url('/image/svg/pattern.svg') no-repeat;
    } // .module

You could use aso an SVG sprite for a background image and readjust the position on hover/focus. However, it might be best to use sprites as shown below. 

### SVG Sprites

We use SVG sprites for any icons a site need. Use the following snippet to reference an icon:

    <a href="http://facebook.com" class="icon facebook">
        <svg class="facebook">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/svg/icons.svg#icon-facebook"></use>
        </svg>
    </a>

This will allow you to change the SVG through CSS. Modern browsers have no issue referencing a specific symbol from an external SVG file. We do have a fallback in place for browsers who don't support this feature, however. The `svgxuse.js` file will check if this is supported and if it isn't, will insert your svg sprite at the top of the document (with a style of `display:none;`) and will change the href to only the symbol `xlink:href="#icon-facebook"`.

For creating SVG sprites, refer to the section down below.

#### IE8 Supported Sites

For sites that need to support IE8, instead of using SVG, use icon fonts such as [Font Awesome](https://fortawesome.github.io/Font-Awesome/).

## Creating SVG Sprites

We use a number of different preprocessors on our projects, but they mostly have their own way of creating svg sprites. It is important to note that, if you wish to modify the fill color or stroke color through css, you should removed those properties from the SVG code.

    // Will not be able to modify with CSS
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path fill="#00ff00" d="M12 0C5.4 0 0 5.4 0 12 0 18.6 5.4 24 12 24 18.6 24 24 18.6 24 12 24 5.4 18.6 0 12 0L12 0ZM12 2.5C17.2 2.5 21.5 6.8 21.5 12 21.5 17.2 17.2 21.5 12 21.5 6.8 21.5 2.5 17.2 2.5 12 2.5 6.8 6.8 2.5 12 2.5L12 2.5Z"/>
    </svg>

    // Can be modified with CSS, will render as black when previewing
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M12 0C5.4 0 0 5.4 0 12 0 18.6 5.4 24 12 24 18.6 24 24 18.6 24 12 24 5.4 18.6 0 12 0L12 0ZM12 2.5C17.2 2.5 21.5 6.8 21.5 12 21.5 17.2 17.2 21.5 12 21.5 6.8 21.5 2.5 17.2 2.5 12 2.5 6.8 6.8 2.5 12 2.5L12 2.5Z"/>
    </svg>

### Gruntyplate

[Github Repo](https://github.com/domain7/gruntyplate)

To generate sprites with our Grunt boilerplate, place all your SVG icons in the `images/svg-icons/` folder and run the command `grunt svgstore`. This will compress all your icons in one file (`images/svg-sprite.svg`) and will add a prefix of `icon-` before each symbol. For example, if you add an image called `facebook.svg` you will reference it like so:

    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/svg-sprite.svg#icon-facebook"></use>

The `svgstore` command is also part of `watch`, so you can add icons while it is running and a new sprite will be generated.

### Sevenpack

[Github Repo](https://github.com/domain7/sevenpack)

Sevenpack is our webpack boilerplate and also features SVG sprite creation. Add your icons to `src/svg` and run the command `npm run svg`. Not only will this combibe all your icons into one file, it will optimize them at the same time. The combined file can be found in `dist/svg` and will create a minified and non minified version of your sprites.

## Tools & Resources

### SVG Optimizer

[SVG Optimizer](http://petercollingridge.appspot.com/svg-optimiser) by Peter Collingridge is great for quick SVG optimization and allows to preview your new SVG image. It is always important to view your optimized file because heavy optimization might cause some paths to be merge and alter the look of your illustration.

### Pratical SVG

The great Chris Coyer wrote this book that covers SVG in greater detail than this overview and D7 has a copy! If you're in the Vancouver office, look in the bookcase for the physical copy. For a pdf version, look in the Domain7 Google Drive under `FED Team - Shared > Resources > Books > Practical-SVG-ALL-FILES`.

### SVGO

[SVGO](https://github.com/svg/svgo) is a nodejs based optimization tool. You can quicly optimize your SVG file from your terminal.

### SVGOMG

[SVGOMG](https://jakearchibald.github.io/svgomg/) is a really cool web-based app that gives you a live-preview of your optimized SVG and allows to switch between an image view and a code view. 




