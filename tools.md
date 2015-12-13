---
layout: page
title: Tools
permalink: /tools/
mainmenu: true
---

## .editorconfig

An [`.editorconfig`](http://editorconfig.org/) file can be used to ensure code is formatted the same way when working with multiple contributors.  Things such as `tab` or `space` indentation, and trimming whitespace are the major reason for using this.  To get started, you need to: 

  1. Add an `.editorconfig` file to your project
  2. Configure your editor

###Add an `.editorconfig` file to your project
Generally this file should be added to the root of your project, alongside `.gitignore`.

This example is from the [Yeoman AngularJS Generator](https://github.com/yeoman/generator-angular).  

```
root = true

[*]
# Change these settings to your own preference
indent_style = space
indent_size = 2

# We recommend you to keep these unchanged
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
```

For projects that require you to use `tab` characters for indentation (Wordpress), can add the following link to your `.editorconfig` file:

```
indent_style = tab
```

###Configuration with your editor
There are plugins for [Vim](https://github.com/editorconfig/editorconfig-vim#readme), [Sublime Text](https://github.com/sindresorhus/editorconfig-sublime#readme), [Textmate](https://github.com/Mr0grog/editorconfig-textmate#readme) and [a few others](http://editorconfig.org/#download).  Once you have the plugin installed, things should just take over.  To test if it is working, add the example `.editorconfig` file above to your project, open up a file within the project and add a few spaces at the end of a line.  After saving the file, the trailing spaces should go away.

## Compass

Use it. 

## Grunt

Things we use grunt for: 

  - Concatenate and minify javascript
  - Lint javascript
  - Create custom modernizr builds
  - compile compass

To keep grunt workflow consistent accross projects, use [gruntyplate](https://github.com/domain7/gruntyplate) as a starting point. 
