---
layout: page
title: Accessibility
description: Coding standards for semantic markup and accessibility
permalink: /accessibility/
mainmenu: true
---

## Semantic Markup
HTML5 introduced a number of new semantic tags. You should use them as much as possible and use them properly. If it looks like a button and acts like a button, chances are it should be a button.

This is a small list of tags to use. There's plenty more out there.

### Title
When configuring `<title>` tags, consider: 
  - Search result listings
  - User sharing on Facebook, etc
  - User may have multiple tabs open

#### Title - Homepage
Good: 
```
<title>Green Bean University</title>
```

Bad: 
```
<title>GBU</title>
<title>Homepage</title>
```


#### Title - Sub Pages
The page title should show before the site name so that the first few words of the page title can be read when the user has multiple browser tabs open.
Consider using the abbreviated version of the project.

Good: 
```
<title>Admission Requirements | GBU</title>
```
Bad: 
```
<title>GBU - Admission Requirements</title>
<title>Green Bean University - Admission Requirements</title>
```



### Address
The `address` tag should have contact information relevant to its nearest article or body ancestor. It's usually found in the footer of a document or section.

Example:

    <address>
      37 Dunlevy Ave<br>
      Vancouver, BC V6A 3A3<br>
      <a href="mailto:hellovancouver@domain7.com">hellovancouver@domain7.com</a><br>
      778.374.0310
    </address>

### Article 

* Similar to `<section>`
* Self contained article
* Heading
* Body text
* Useful for magazine/news/blog/comments
* Use with these tags:
  * `<time>` or better `<time datetime="2015-05-15 19:00">May 15</time>`
  * `<address>` for author info
  * `<header>` and `<footer>` optional

Example:

    <article>
      <header>
        <time datetime="2015-05-15 19:00">May 15</time>
        <address>Igor Barbashin</address>
      </header>
      <p>Welcome to Beantown.  This is the best place on earth.</p>
    </article>

### Aside
Represents a section tangentially connected to a page or piece of content. It's often used for sidebars.

Example:

    <article>
      <p>
        The Disney movie <em>The Little Mermaid</em> was
        first released to theatres in 1989.
      </p>
      <aside>
        <p>
          The movie earned $87 million during its initial release.
        </p>
      </aside>
      <p>
        More info about the movie...
      </p>
    </article>


### Figure and Figcaption
We don't see any real benefit to figure and figcaption for screen readers.  Some minor semantic SEO benefits.  More of an optional element.  Don't break your back to get this one to work. 

But if you decide to use it, know that: 

- You can nest `<figure>` inside `<figure>`
- `<figcaption>` must be the first or last element inside `<figure>`

Links:

- [The right way to use figure and figcaption](http://www.sitepoint.com/quick-tip-the-right-way-to-use-figure-and-figcaption-elements/)

### Header and Footer 

- Similar to `<section>`
- Header - introduction content for it’s nearest sectional content
- Ex `<body>` or `<section>`, but could be used with `<article>`
- https://www.w3.org/TR/html5/sections.html#the-header-element
- Best use case is if it has navigational aids

#### Why use it instead of `div`?

For accessibility.  By default, header has aria-role=”banner”
Footer - 
Should have navigational aids
Default aria role=”contentinfo”

Example:

    <body>
      <header>
        <h1>Beantown</h1>
        <nav>
          ...
        </nav>
      </header>
      <section>
        <header><nav>... some internal content links ...</nav</header>
        <footer>...</footer>
      </section>
    </body>

### Main

- The content inside the `<main>` element should be unique to the document. It should not contain any content that is repeated across documents such as sidebars, navigation links, copyright information, site logos, and search forms.
There must not be more than one `<main>` element in a document. 
- The `<main>` element must NOT be a descendant of an `<article>`, `<aside>`, `<footer>`, `<header>`, or `<nav>` element.
- The `<main>` element is widely supported, however for Internet Explorer 11 and below, it is suggested that an aria role of "main" be added to the <main> element to ensure it is accessible (screen readers like JAWS, used in combination with older versions of Internet Explorer will be able to understand the semantic meaning of the `<main>` element once this role attribute is included).

Links:

* [http://webaim.org/techniques/skipnav/](http://webaim.org/techniques/skipnav/)
* [http://codepen.io/reubenmoes/full/Wxbrmv/](http://codepen.io/reubenmoes/full/Wxbrmv/)

Example: 

    <header>...</header>
    <main role="main">
      <h1>News</h1>
      <article>... </article>
      <article>... </article>
      <article>... </article>
    </main>
    <footer></footer>

### Nav

This tag is used to represent a section that will have a number of navigational links such as the main navigation of a website. It can be used multiple times on a page, but not all links need to go in a `nav` tag. This tag is especially important for screen-readers.

Example:

    <nav class="menu">
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>


### Section

The `<section>` tag, as it name would suggest, is used to represent a section of the page. It is not to be used as a generic container however, that still goes to `div`. It should make sense in the flow of a document what should be wrapped within sections. For example, a list of search results should be within a `<section>` tag. As a rule of thumb, each section should have a header element as a child. 

Example: 

    <section>
      <h1>Heading</h1>
      <p>Bunch of awesome content</p>
    </section>

### Time

Whenever an hour or a date is on a site, use the `time` element. You can use the `datetime` attribute to specify the date or time to user agents.

Example:
    
    <p>The concert took place on <time datetime="2001-05-15T19:00">May 15</time>.</p>

## Screen Readers

Mac OS comes built in with a screen reader called VoiceOver and you should learn how to use it. You should also use it on your site and listen to see if your markup/structure makes sense. It's not necessary to go through the entire site, but at least a few pages to get an understanding of how a disabled user might perceive your website.

[VoiceOver Guide](https://help.apple.com/voiceover/info/guide/10.12/#/)

To see what people are using, check out the [Screen Reader Survey](http://webaim.org/projects/screenreadersurvey6/).

- [Jaws](http://www.freedomscientific.com/Products/Blindness/JAWS) (windows)
- [NVDA](http://www.nvaccess.org/) (windows)
- [Voiceover](http://www.apple.com/ca/accessibility/osx/voiceover/) (mac)
- [chromevox](http://www.chromevox.com/) (chrome extension)


## Skip To Nav, Skip To Main Content

Skip To links allow users to quickly jump around the page and access the content they're looking for and is really useful for users with disabilities. There's no requirements to have this for accessibility, but it is recommended and is easily achieved. On the top of every page, include this code:

    <div id="skip">
        <a class="visually-hidden focusable skip-link" href="#main-menu">
            Skip to main navigation
        </a>
        <a class="visually-hidden focusable skip-link" href="#main-content">
            Skip to main content
        </a>
    </div>

You will need to add the `main-menu` and `main-content` to the proper containers but all those classes are already part of our sassyplate and will work as intended.

## Tools

### Site Improve Chrome Extension
The [Site Improve Chrome Extension](https://chrome.google.com/webstore/detail/siteimprove-accessibility/efcfolpjihicnikpmhnmphjhhpiclljc) allows you to run an audit on the current page you're viewing and will give a report on various accessibility issues.

### Tota11y Plugin 

The [Tota11y Chrome Extension](https://chrome.google.com/webstore/detail/tota11y-plugin-from-khan/oedofneiplgibimfkccchnimiadcmhpe) allows you to inspect a website, including a locally run app, in Chrome & see at a glance accessibility issues to fix. 

### Wave

The [Wave](http://wave.webaim.org/) tool allows you the enter a URL and get an accessibility report on your page. It features a sidebar with various options as you navigate your website and will alert you with any accessibility errors on your site. 

### Accessible Colors

[Accessible Colors](https://accessible-colors.com/) is a site that will suggest alternate minor changes to your colors, to meet either AA or AAA accessibility standards in an easy to use interface. 


