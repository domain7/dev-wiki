---
layout: page
title: Wordpress
permalink: /wordpress/
mainmenu: true
---

## Setup

If not already installed, install [WP Cli](http://wp-cli.org/)

#### WP Core
Install wordpress core:

`wp core install`

#### D7 Plugin Boilerplate
Clone the D7 Plugin boilerplate to the plugins directory (don't forget to remove .git directory after cloning):

`git clone git@github.com:domain7/wp-plugin_boilerplate.git`

#### D7 Timberplate Theme
Clone the Timberplate theme to the themes directory (don't forget to remove .git directory after cloning):

`git clone git@github.com:domain7/wp_timberplate.git`

#### Install Gruntyplate
Clone Gruntyplate into the new timberplate theme (don't forget to remove .git directory after cloning):

`git clone git@github.com:domain7/gruntyplate.git`

Set up gruntyplate by running

`npm install`

#### Install Sassyplate
Clone Sassyplate to the theme, by running

`grunt sassyplate`

#### Install Plugins

##### ACF
Get pro version from ACF website (account credentials are in Keypunch):

[ACF Pro](https://www.advancedcustomfields.com/my-account)

##### ACF WP-Cli

[ACF WP-Cli](https://github.com/hoppinger/advanced-custom-fields-wpcli)

##### Timber

`wp plugin install timber-library --active`


## Tools

#### ACF Local JSON

We use the [ACF Local JSON](https://www.advancedcustomfields.com/resources/local-json/) feature to keep ACF fields in the repo instead of the database. The D7 plugin boilerplate sets the local json directory to a directory in the plugin boilerplate.

If another dev has added fields to the repo, and you would like to edit those fields on your local instance, you'll need to import the fields. To import them, run `wp acf import`

#### Script Localization

By default, the timberplate theme offers a number of localized vars. These can be seen in includes/assets.php. To access them, 
`D7WP.templateUrl` is equivalent to get_bloginfo('template_url')

## Git Flow

We commit the entire wordpress site to the git repo. We exclude the wp-content/uploads directory, and the wp-config.php file, from the repo. 

## Syncing DBs

We do not share a DB between the staging site and local dev environment. We consider the staging site to be the source of truth for content while the project is in development. 

