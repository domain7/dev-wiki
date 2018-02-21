---
layout: page
title: WordPress
permalink: /wordpress/
mainmenu: true
---

## Setup

If not already installed, install [WP Cli](http://wp-cli.org/)

#### WP Core
Install WordPress core:

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

## Includes

A number of handy functions exist in the /includes directory of the theme. They include:

* image_sizes.php - customize WP image sizes
* menus.php - Register WP menu positions
* sidebars.php - Register WP sidebar positions
* login_page.php - Customize or brand the default WP login screen

## Timber

We've recently added timber and twig into our recent themes. It allows to separate your pages into two files: a `.php` file with all your back-end logic and a `.twig` file where all your front-end code. It makes looping through posts a lot easier.

* [Timber website](https://www.upstatement.com/timber/)
* [Timber documentation](http://timber.github.io/timber/)
* [Twig documentation](https://twig.sensiolabs.org/doc/2.x/)
 
## Tools

#### ACF Local JSON and wp-cli acf

We use the [ACF Local JSON](https://www.advancedcustomfields.com/resources/local-json/) feature to keep ACF fields in the repo instead of the database. The D7 plugin boilerplate sets the local json directory to a directory in the plugin boilerplate.

If you're created some new ACF fields through WP admin, use the wp-cli acf tool to export fields that you create in wp-admin, to the json files, before creating a pull request for your branch:

`wp acf export`

Select your new field group (or all field groups)

Select option 2, to save the json in /wp-content/plugins/PLUGIN-BOILERPLATE/includes/acf_fields

If another developer created a field group, and you'd like to edit or add to those fields through WP admin, import the fields from JSON to your database like so:

`wp acf clean` (will wipe all fields from your wp-admin)

`wp acf import` (will import clean copies of all fields from json)

Then, when you're done adding or editing the field group, do the wp acf export step again. 

#### Script Localization

By default, the timberplate theme offers a number of localized vars. These can be seen in includes/assets.php. All localized vars are prefixed with `D7WP`. For example, the equivalent of `get_bloginfo('template_url')` would be `D7WP.templateUrl`.

## Git Flow

We commit the entire wordpress site to the git repo. We exclude the wp-content/uploads directory, and the wp-config.php file, from the repo. 

## Syncing DBs

We do not share a DB between the staging site and local dev environment. We consider the staging site to be the source of truth for content while the project is in development. 

To export a copy of the DB on the staging site, SSH in and run `wp db export`, and then either download the db through the browser, or from the command line using scp: `scp username@remotehost.net:current/db_name.sql .`

## Licensed Plugins

D7 has developer licenses for a number of plugins. Access credentials are stored in keypunch. The plugins include:

[Facet WP](facetwp.com/demo/)
[ACF Pro](https://www.advancedcustomfields.com/my-account)
[WPML](https://wpml.org/account)
