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

# [Project Name]

## Table of Contents

1. [Introduction](#introduction)
2. [Team](#team)
3. [System Requirements](#system-requirements)
4. [Local Setup](#local-setup)
5. [Environments](#environments)
6. [Related Repositories](#related-repositories)
7. [Related Documentation](#related-documentation)
8. [KeyPunch Information](#keyPunch-information)
9. [Application Stack](#application-stack)
10. [Running Tests](#running-tests)
11. [Linting Information](#linting-information)
12. [Common Commands](#common-commands)
13. [Git WorkFlow](#git-workFlow)
14. [Architecture](#architecture)
15. [FAQ](#faq)
16. [Help](#help)


## Introduction

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been 
the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley 
of type and scrambled it to make a type specimen book. It has survived not only five centuries, 
but also the leap into electronic typesetting, remaining essentially unchanged. It was 
popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
and more recently with desktop publishing software like Aldus PageMaker including versions of 
Lorem Ipsum.

## Team

1. Internal Team Members

| Name            | Role          | Email         |
| ----------------|:-------------:| -------------:|
| Internal 1      | Developer     | test@mail.com |
| Internal 2      | Manager       | test@mail.com |
| Internal 3      | Front-End     | test@mail.com |

2. External Team Members

| Name            | Role          | Email         |
| ----------------|:-------------:| -------------:|
| External 1      | Developer     | test@mail.com |
| External 2      | Manager       | test@mail.com |
| External 3      | Front-End     | test@mail.com |

## System Requirements

* Lando (minimum: v3.0.0-rc17+)
* Git
* Composer
* PHP 7.3+

And any minimum requirements needed for the items listed above...

## Local Setup

1. Copy SAML configs:

    ```
    $ lando blt source:build:simplesamlphp-config
    ```
    
2. Copy staging database to local and import local config

    ```
    $ lando sync
    ```

3. Install Drupal:

    ```
    $ lando blt drupal:install --no-interaction -vvv --site=default --environment=local
    ```

4. Build frontend assets:

    ```
    $ lando frontend
    ```

5. Login as Drupal UID 1 or access the site at: `http://local-edit.umanitoba.ca/`

    ```bash
    $ lando drush @umanitoba.local uli
  
## Environments

| Name            | Url          | Access         |
| ----------------|:-------------:| -------------:|
| Local      | www.local.com     | username/password |
| Stage      | www.stage.com     | username/password |
| Prod       | www.prod.com      | username/password |

## Related Repositories

1. [Drupal](https://github.com/drupal/drupal) - Drupal is a free and open-source 
    content management framework written in PHP and distributed under the GNU General 
    Public License. Drupal provides a back-end framework for at least 2.3% of all 
    websites worldwide – ranging from personal blogs to corporate, political, and 
    government sites.

2. [React](https://github.com/drupal/drupal) - Drupal is a free and open-source 
    content management framework written in PHP and distributed under the GNU 
    General Public License.

3. [Wordpress](https://github.com/drupal/drupal) - Drupal is a free and open-source 
    content management framework written in PHP and distributed under the GNU 
    General Public License.

4. [NodeJS](https://github.com/drupal/drupal) - Drupal is a free and open-source 
    content management framework written in PHP and distributed under the GNU 
    General Public License.

## Related Documentation

1. JIRA - [Link](https://github.com/drupal/drupal)

2. BugHerd - [Link](https://github.com/drupal/drupal)

3. Basecamp - [Link](https://github.com/drupal/drupal)

4. Confluence - [Link](https://github.com/drupal/drupal)

## KeyPunch Information

1. [Amazon S3 Key](https://github.com/drupal/drupal)

2. [Drupal Login Password](https://github.com/drupal/drupal)

3. [News and Events API Key](https://github.com/drupal/drupal)

## Application Stack

#### Stack 1

- [CSS Modules](https://github.com/css-modules/css-modules)
  - Namespaces CSS to specific components & provides basic variable support.
- [Freactal](https://github.com/FormidableLabs/freactal/)
  - State management similar to Redux or MobX, but simpler.
- [React Router v4](https://reacttraining.com/react-router/web)
  - Maps URLs to page components
- [yup.js](https://github.com/jquense/yup/)
  - Provides validation schemas for form inputs as well as POST request bodies.
​
#### Stack 2

- [Webpack 4](https://webpack.js.org/)
- [PostCSS](https://github.com/postcss/postcss)
  - [Autoprefixer](https://github.com/postcss/autoprefixer)
  
## Running Tests

1. Before commiting the code, please run 

    ```
    vendor/bin/blt validate:phpcs
    ```

## Linting Information

Enter any linting information you wish to add for the project audience.

## Common Commands

* `npm run build`: This will rebuild all the Pattern Lab assets.

* `npm run serve`: This will run Pattern Lab on your Localhost. It should open a new tab 
   in your browser. This site can also take advantage of Live Reload.

## Git WorkFlow

1. Clean your environment:

    ```
    git checkout develop
    lando composer update --lock
    lando blt drupal:install --no-interaction -vvv --site=default
    git checkout -b feature/feature-name-NGWE-1234
    ```

2. Commit code

    ```
    lando drush @umanitoba.local cex sync --yes
    git add config/default/default
    git commit
    ```

## Architecture

Enter information about the application architecture here.

## FAQ

#### How do I switch from packagist.drupal-composer.org to packages.drupal.org?

1. Follow the instructions in the [documentation on drupal.org]
   (https://www.drupal.org/docs/develop/using-composer/using-packagesdrupalorg).

#### How do I specify a PHP version ?

2. Currently Drupal 8 supports PHP 5.5.9 as minimum version (see [Drupal 8 PHP requirements]
   (https://www.drupal.org/docs/8/system-requirements/drupal-8-php-requirements)), however 
   it's possible that a `composer update` will upgrade some package that will then require PHP 7+.

    To prevent this you can add this code to specify the PHP version you want to use in 
    the `config` section of `composer.json`:
    ```json
    "config": {
        "sort-packages": true,
        "platform": {"php": "5.5.9"}
    },
    ```

## Help

1. Do you think the reader can get help any from any other sources ? Like external links, point 
   of contact, etc.





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

