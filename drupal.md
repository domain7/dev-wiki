---
layout: page
title: Drupal
permalink: /drupal/
mainmenu: true
---


## Modules
* **[Rabbit Hole](https://www.drupal.org/project/rabbit_hole)** - Use for 301 redirects of taxonomy vocabs or other entities that should not actually be public. 
* **[Paragraphs Browser](https://www.drupal.org/project/paragraphs_browser)** - essential for allowing embedding of paragraph components site-wide.

### Do not use!
* **Workbench Moderation** - has been merged to core as `Content Moderation`
* **YAML Form** - This has been merged with `Webform` module


## Media

## Naming conventions
### Fields
Where possible, fields should be re-used. So create the field with that in mind. 

`field_title`

`field_body` (long formatted, with summary), summary can be turned on/off as needed

`field_summary` (plain, long)

`field_link`

`field_image_video` media reference to image/video

#### Scoped 
Should be scoped to content type or entity bundle if necessary, but always create with re-use in mind.

Bad: `field_length` (this field is too specific, it should be scoped to the content type)

Good: `field_course_length`

Good: `field_course_requirements`

#### Entity Reference
Entity reference fields should be named according to the bundle they are _referencing_, not the _type_. 

Bad: `field_node`

Good: `field_profile` (references profile nodes)

Good: `field_news_event` (references news or event)

Good: `field_news_category` (references news_category taxonomy vocabulary)

#### Paragraph / ECK
Paragraph fields for modular content: 

`field_row`


## Project Setup

### BLT

## DrupalVM

Reuben will fill out drupalvm stuff

### Composer

## URL patterns
### Menu/Parent aware

When creating patterns for content, it's always useful to ensure that the full menu path to the content is included.

A common pattern for doing this is to use the `menu-link:parent:url:path` token. This includes the parent path in the content path.

This will also allow for updates on parent path after creation.
 
```
[node:menu-link:parent:url:path]/[node:title]
```
## Breadcrumbs

### [Easy Breadcrumb](https://www.drupal.org/project/easy_breadcrumb)
Easy Breadcrumb uses the current URL (path alias) and the current page's title to automatically extract the breadcrumb's segments and its respective links.
Which means using it in conjunction with the URL pattern above usually generates extremely friendly and usable breadcrumbs out of the box.

Some recommended default settings to create full breadcrumbs:

* Include the front page as a segment in the breadcrumb _(the first segment in the breadcrumb)_
* Include the current page as a segment in the breadcrumb _(the last segment in the breadcrumb)_
* Use the real page's title when available _(instead of always deducing it from the URL)_



