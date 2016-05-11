---
layout: page
title: Accessibility
description: Coding standards for semantic markup and accessibility
permalink: /accessibility/
mainmenu: true
---

### Semantic Markup
Coding standards for semantic markup and accessibility

## Figure and Figcaption
We don't see any real benefit to figure and figcaption for screen readers.  Some minor semantic SEO benefits.  More of an optional element.  Don't break your back to get this one to work. 
Links:

- [The right way to use figure and figcaption](http://www.sitepoint.com/quick-tip-the-right-way-to-use-figure-and-figcaption-elements/)


## Article 

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


## Header and Footer 

- Similar to `<section>`
- Header - introduction content for it’s nearest sectional content
- Ex `<body>` or `<section>`, but could be used with `<article>`
- https://www.w3.org/TR/html5/sections.html#the-header-element
- Best use case is if it has navigational aids

### Why use it instead of `div`?

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

