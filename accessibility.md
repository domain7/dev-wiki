---
layout: page
title: Accessibility
description: Coding standards for semantic markup and accessibility
permalink: /accessibility/
mainmenu: true
---

## Semantic Markup
Coding standards for semantic markup and accessibility

### Main

- The content inside the `<main>` element should be unique to the document. It should not contain any content that is repeated across documents such as sidebars, navigation links, copyright information, site logos, and search forms.
There must not be more than one `<main>` element in a document. 
- The `<main>` element must NOT be a descendant of an `<article>`, `<aside>`, `<footer>`, `<header>`, or `<nav>` element.
- The `<main>` element is widely supported, however for Internet Explorer 11 and below, it is suggested that an aria role of "main" be added to the <main> element to ensure it is accessible (screen readers like JAWS, used in combination with older versions of Internet Explorer will be able to understand the semantic meaning of the `<main>` element once this role attribute is included).

Links:

- http://webaim.org/techniques/skipnav/
- http://codepen.io/reubenmoes/full/Wxbrmv/

Example: 

```
  <header>...</header>
  <main role="main">
    <h1>News</h1>
    <article>... </article>
    <article>... </article>
    <article>... </article>
  </main>
  <footer></footer>
```


### Figure and Figcaption
We don't see any real benefit to figure and figcaption for screen readers.  Some minor semantic SEO benefits.  More of an optional element.  Don't break your back to get this one to work. 

But if you decide to use it, know that: 

- You can nest `<figure>` inside `<figure>`
- `<figcaption>` must be the first or last element inside `<figure>`

Links:

- [The right way to use figure and figcaption](http://www.sitepoint.com/quick-tip-the-right-way-to-use-figure-and-figcaption-elements/)


### Article 

- Similar to `<section>`
- Self contained article
- Heading
- Body text
- Useful for magazine/news/blog/comments
- Use with these tags:
  - `<time>` or better `<time datetime="2015-05-15 19:00">May 15</time>`
  - `<address>` for author info
  - `<header>` and `<footer>` optional


```
  <article>
    <header>
      <time datetime="2015-05-15 19:00">May 15</time>
      <address>Igor Barbashin</address>
    </header>
    <p>Welcome to Beantown.  This is the best place on earth.</p>
  </article>
```


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

```
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
```

## Screen Readers

 To see what people are using, check out the [Read the Screen Reader Survey](http://webaim.org/projects/screenreadersurvey6/).

- [Jaws](http://www.freedomscientific.com/Products/Blindness/JAWS) (windows)
- [NVDA](http://www.nvaccess.org/) (windows)
- [Voiceover](http://www.apple.com/ca/accessibility/osx/voiceover/) (mac)
- [chromevox](http://www.chromevox.com/) (chrome extension)

