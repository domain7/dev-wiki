---
layout: page
title: Tools
description: Tools and workflows we use for every project
permalink: /tools/
mainmenu: true
---

## .README files

.README files are extremely important to have. They should provide all the information necessary for a new developer to jump into the project and start coding and deploying to staging/production. Here's a high-level boilerplate:

```
# Name of project
Short description

# Team
Name, Role, Email

# Setup
How to setup local
How to sync up local database from staging/production
How to sync up files from staging/production

# Run
How to run it locally
How to run it in docker

# Deploy
Deploy to Staging
Staging Link
Deploy to Production
Production Link

# Routine tasks
How to add translations
How to create new routes

# ACF workflow (WordPress)
Link to wiki

# API Keys
Google Maps api key - Project Owner: sam@jones-company.com

```

## .editorconfig

An [`.editorconfig`](http://editorconfig.org/) file can be used to ensure code is formatted the same way when working with multiple contributors.  Things such as `tab` or `space` indentation, and trimming whitespace are the major reason for using this.  To get started, you need to:

  1. Add an `.editorconfig` file to your project
  2. Configure your editor

### Add an `.editorconfig` file to your project
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

For projects that require you to use `tab` characters for indentation (WordPress), can add the following link to your `.editorconfig` file:

```
indent_style = tab
```

### Configuration with your editor

There are plugins / extensions we recommend for different editors.
Once you have the plugin installed, things should just take over.  To test if it is working, add the example `.editorconfig` file from the sections below to your project, open up a file within the project and add a few spaces at the end of a line.  After saving the file, the trailing spaces should go away.

#### VS Code: Plugins/Extensions
[VS Code Extensions](https://marketplace.visualstudio.com/vscode)
* Npm Intellisense
* SVG Preview
* Git Lens
* ESLint
* EditorConfig
* Bracket Pair Colorier
* Atom One Dark Theme - for former Atom users
* Atom Keymap - for former Atom users
* Sublime Text Keyboard Shortcuts - for former Sublime users

#### Sublime: Plugins/Extensions
Example `.editorconfig`: [Sublime Text](https://github.com/sindresorhus/editorconfig-sublime#readme)

#### Vim: Plugins/Extensions
Example `.editorconfig`: [Vim](https://github.com/editorconfig/editorconfig-vim#readme)

#### Textmate: Plugins/Extensions
Example `.editorconfig`: [Textmate](https://github.com/Mr0grog/editorconfig-textmate#readme)


## Preprocessors

Things we use preprocessors for:

  - Concatenate and minify javascript
  - Lint javascript
  - Create custom modernizr builds
  - Compile sass
  - Create SVG sprites

We have two different preprocessors boilerplate:

* [Gruntyplate](https://github.com/domain7/gruntyplate) for Grunt which is the one we currently use on most projects
* [Sevenpack](https://github.com/domain7/sevenpack) for Webpack which will eventually move to


## Prettier

[Prettier](https://github.com/prettier/prettier) is an opinionated code formatter with support for:
* JavaScript, including [ES2017](https://github.com/tc39/proposals/blob/master/finished-proposals.md)
* [JSX](https://facebook.github.io/jsx/)
* [Flow](https://flow.org/)
* [TypeScript](https://www.typescriptlang.org/)
* CSS, [LESS](http://lesscss.org/), and [SCSS](http://sass-lang.com)
* [JSON](http://json.org/)
* [GraphQL](http://graphql.org/)

The reasoning behind Prettier is well described in the project's readme [Why Prettier](https://github.com/prettier/prettier/blob/master/README.md#why-prettier).

There's a number of ways you can use Prettier:
- [Editor plugin](https://github.com/prettier/prettier#editor-integration) (recommended)
- [Command line](https://github.com/prettier/prettier#cli)
- [Pre-commit hook](https://github.com/prettier/prettier#pre-commit-hook)
- [Node module](https://github.com/prettier/prettier#api)

Prettier has built-in [options](https://github.com/prettier/prettier#options) or it can integrated with the existing [ESLint config](https://github.com/prettier/prettier#eslint).


## lint-staged

Linting makes more sense when running before committing your code. By doing that you can ensure no errors are going into repository and enforce code style. But running a lint process on a whole project could be slow on a large project and linting results can be irrelevant. Ultimately you only want to lint files that will be committed.

### Installation and setup

1. `npm install --save-dev lint-staged husky`
1. Install and setup your linters just like you would do normally. Add appropriate `.eslintrc`, `.stylelintrc`, etc.
1. Update your `package.json` like this:
  ```json
  {
    "scripts": {
      "precommit": "lint-staged"
    },
    "lint-staged": {
      "*.js": ["eslint --fix", "git add"]
    }
  }
  ```

Now change a few files, `git add` some of them to your commit and try to `git commit` them.

Read more at the [project's repo](https://github.com/okonet/lint-staged)

## Google API Keys

Clients should own their api keys.  This is key for managing of quotas and billing, should their map every get a lot of usage. When you go to `Admin > IAM` or https://console.cloud.google.com/iam-admin?project=YOUR_PROJECT_ID it should look like this: 

```
| Member                   | Name      | Role   |
|--------------------------|-----------|--------|
| client@clientdomain7.com | Sam Jones | Owner  |
| fed@domain7.com          |           | Editor |
| ops@domain7.com          |           | Editor |
| yourname@domain7.com     |           | Editor |
```

### Client Steps: 
- Create api key https://developers.google.com/maps/documentation/embed/get-api-key
- Give domain7 access: https://www.youtube.com/watch?v=WKm_8ss-9HI 
  - Give 'Project editor' to ops@domain7.com and fed@domain7.com and any other developer that may need access
  - `Project Owner` should be the client 

### Developer Steps: 
- Include in readme the email the user who is the `Product Owner` for the google cloud project.
- Menu > Apis & Services
  - Add any keys needed (google maps, autocomplete, etc)

## Webfont Keys
For smaller projects, set up webfonts using our main account You'll find credentials for typekit, fonts.com (and maybe others) in keypunch.  For any larger project, the client should set up webfont config and send us the code snippet

