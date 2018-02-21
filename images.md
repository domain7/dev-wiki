---
layout: page
title: Images
permalink: /images/
mainmenu: true
---

## Srcset
Using srcset is great since it allows the browser to make the choice on the most appropriate size of image to use basing on the screen size and type.

### Srcset in WordPress

In order to add srcset to our WordPress project, we add the image sizes based on image_id and class.

To print image object:
```timber
{% raw  %} {{post.get_field('hero_background_image')|print_r}} {% endraw  %}
```

Include in views file like so:
```timber
{% raw  %}
{% include 'partials/image-srcset.twig' with {image_id: post.get_field('hero_background_image'), class: 'hero__background'} %}
<img class="{{class}} xt-lazy" alt="{{TimberImage(image_id).alt}}"
{% endraw  %}
```
Add to your partials/image-srcset.twig file
```timber
{% raw  %}
<img class="{{class}}" alt="{{TimberImage(image_id).alt}}"
		src="{{ TimberImage(image_id).src('hero-3x1') }}"
    data-src="{{ TimberImage(image_id).src('hero-3x1') }}"
    data-srcset="{{ TimberImage(image_id).src('xlarge-3x1') }} {{ image_id['sizes']['xlarge-3x1-width'] }}w,
            {{ TimberImage(image_id).src('hero-3x1') }} {{ image_id['sizes']['hero-3x1-width'] }}w,
            {{ TimberImage(image_id).src('large-3x1') }} {{ image_id['sizes']['large-3x1-width'] }}w"
/>
{% endraw  %}
```

### Srcset in Drupal

You will need to add all your responsive image styles to Drupal configuration.

1. Add image styles to Configuration >> Media (e.g. 16:9 - 1200w, 16:9 1600w, 16:9 - 1920w)
2. Add a new Responsive image style
3. In Configuration>>Media>>Responsive image styles:
   Assign all the different image styles the that responsive image style. Add the Fallback image style (pick the middle one)
4. In the Image Structure, under Manage Display, assign that responsive image  style to an image field

### IE Fallback

Both WordPress and Drupal are equipped to output the fallback image, however you need to make sure that the biggest image size is uploaded.
