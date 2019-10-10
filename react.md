---
layout: page
title: React
description: D7 React Developer's Guide
permalink: /react/
mainmenu: true
---

## Overview

We implement a standard set of React libraries and tools in order to:

- Reduce onboarding time for new developers.
- Reduce complexity & time required for context switching between projects.
- Ensure everyone is contributing to a common knowledge base.

### Other Choices?

This guide is more of a strong recommendation than a strict mandate. We recognize that every project is different and some offer particularly unique requirements and technical challenges. That said, deviating from our best practices needs to be justified by a solution below not meeting our needs, so please discuss your idea with your project lead developer or a senior JS developer before implementation. There may be existing solutions that most of our team will already know how to implement and be able to build, debug and help with.

## Setting up your workstation

### Node + NVM (Node Version Manager)
You should install node with [nvm](https://github.com/nvm-sh/nvm), not with Homebrew or the nodejs.org installer. If you've already installed node, please uninstall it before installing nvm. nvm makes it easy to run multiple versions of node side by side on the same machine, allowing you to switch from project to project without running into version issues.

#### .nvmrc
Each React project should include an [`.nvmrc`](https://github.com/nvm-sh/nvm#nvmrc) with the version of node the project expects.

### Package management
All third-party dependencies should be installed with `npm`. Avoid copying & pasting third-party code directly into the project and avoid using other front-ends to the npm registry like yarn.

All projects should include a `package-lock.json` file to ensure builds are reliable from machine to machine. Please check this file into version control, and avoid deleting & regenerating it. If you run into an issue that you can only solve by regenerating `package-lock.json`, please consult a senior JS developer before doing so to make sure it's absolutely necessary.

## Project Setup
Use [`create-react-app`](https://facebook.github.io/create-react-app/), React's official setup tool, to bootstrap your new application. CRA provides a bare-bones project structure and automatically configures Webpack, Babel, and the various Webpack loaders necessary to import CSS, SVG, and other assets into your components.

Get started by running the following command, making sure that the name you give your React app matches the name of its git repository.
```
npm init react-app $GIT_REPO_NAME --use-npm
```

### Ejecting
Depending on project requirements (i.e. supporting more than development, test & production environment configs) you might need to [eject](https://facebook.github.io/create-react-app/docs/available-scripts#npm-run-eject) from CRA and manually configure your project. Consult a senior JS developer if you think you need to do this so we can make sure that ejecting is necessary and your ejected configuration is well documented.

## Project structure
We use CRA as a starting point for our structure, but we get a bit more specific about component organization. All of your app code will live inside `src/` as CRA will only compile code in that directory with webpack.

```
my-app/
  README.md
  node_modules/
  package.json
  .env
  public/
    index.html
    favicon.ico
  src/
    assets/
      icon.svg
    containers/
      App/
        __tests__/
          index.test.js
          SubComponent.test.js
        index.js
        SubComponent.js
        style.module.css
    components/
      form/
      form-partials/
      layout/
      ui/
      view-partials/
    index.css
    index.js
    setupTests.js
```

### Assets
Your assets folder should contain any images or SVGs imported by Webpack into your components (CRA's Webpack config only watches `src/`, so you can't import files from `public/`.) Try to put all assets here instead of co-locating them with specific components to reduce possible duplication of assets across multiple components.

#### Importing SVGs
Webpack allows importing of SVGs as images and as React components. If you need to style an SVG, make use of this feature instead of manually inlining SVG markup into a new component:

```js
import { ReactComponent as Icon } from 'assets/icon.svg';
```

### Containers
Container components differ in that they're directly connected to a data store (whether that's Redux or some other tool) and serve to map data and actions down to child components. An example of a container component would be a `<UserListPage>` component that connects to your store and receives state and dispatch actions as props. For a simple application, a single container may be all you need, while a more complex app may want a container per route. An even more complex application could have multiple containers per page. For example, you might have a complex modal form that's available on multiple pages. It's simpler to make this modal a container and connect it directly to the store than it is to have repetitive prop passing across multiple pages.

For more details on the difference between container & presentational components, refer to [this article by Dan Abramov](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0).

TODO: More here

### Components
While it's tempting to use React as an HTML template engine, it offers more powerful ways for us to develop a set of re-usable & composable components that aren't tied to a specific view or use case. Remember, DRY (**D**on't **R**epeat **Y**ourself) applies to markup and styling as well. This is your opportunity to define a domain-specific markup language for your project, so be descriptive in naming. If you're thorough about building components for all the basic building blocks of your application, you'll find yourself rarely writing raw HTML in your page components. This can feel counter-intuitive at first, but the end result is code that's easier to understand at a glance as you're looking at components that describe what they do instead of large blocks of HTML.

If you're using an open source UI library, this pattern is still very useful. Instead of importing their components throughout your application, you'll import them to your components and export your customized version(s). Even if you're not customizing them much now, having a single source of truth for your app's implementation of (for example) a modal means that applying future customizations won't require combing through all your components to make sure you didn't miss anything.

Your components folder should include a few sub-folders to help with organization. We split our generic components up by their use case:

#### form
Form components include dropdowns, input fields, date pickers, and other basic building blocks for forms.

Instead of writing repetitive form code
```js
<input
  type="test"
  className={styles.inputText}
  value={user.name}
/>
```

Refactor your form building blocks (with their default styles) to form components, each with their own CSS module:
```js
import Input from 'components/form/Input';

<Input
  value={user.name}
/>
```

#### form-partials
Form partials are re-usable collections of form elements. For example, if you're building an app that captures addresses for both individual people and businesses, you could create an `<Address />` partial that's used in both your person edit and business edit forms.

If you're copying and pasting something like this into more than 1 form:
```js
import Input from 'components/form/Input';
import PostalCode from 'components/form/PostalCode';
import Dropdown from 'components/form/Dropdown';

import styles from 'globalStylesYouImportInEveryPage.module.css';

<div className={styles.line1}>
  <Input
    value={user.address.streetNumber}
  />
  <Input
    value={user.address.streetName}
  />
</div>
<div className={styles.line2}>
  <Input
    value={user.address.unit}
  />
</div>
<div className={styles.cityProvincePostal}>
  <Input
    value={user.address.city}
  />
  <Dropdown
    value={user.address.province}
  />
  <PostalCode
    value={user.address.postalCode}
  />
</div>
```

Refactor it into a form partial with it's own CSS module:
```js
import Address from 'components/form-partials/Address';

<Address
  values={user.address}
/>
```

#### layout
Layout components provide visual structure and organization for your application. These components include basic page structure, re-usable grids, page sections, headings, basic lists, and sidebars. These components should mostly serve as wrappers for CSS styles, provide little to no interactivity, and offer style configuration through props.

If you're copying and pasting something like this into more than 1 view:
```js
import styles from 'globalStylesYouImportInEveryPage.module.css';

<div className={styles.container}>
  <article className={styles.main}>
    Your main content
  </article>
  <aside className={styles.sidebar}>
    Some sidebar content
  </aside>
</div>
```

Refactor it into a set of layout components, each with their own CSS module:
```js
import Layout from 'components/layout/Layout';

<Layout>
  <Layout.Main>
    Your main content
  </Layout.Main>
  <Layout.Sidebar>
    Some sidebar content
  </Layout.Sidebar>
</Layout>
```

#### ui
UI components are non-form interactive elements like buttons, menus, modals, sliders, cards, icons, tooltips, and progress bars. If it doesn't fit in form or layout, it probably belongs here.

If you're copying and pasting something like this into more than 1 view:
```js
import { Modal, Button } from 'some-react-ui-framework';
import styles from 'globalStylesYouImportInEveryPage.module.css';

<Modal
  isOpen={this.isOpen}
>
  <h2 className={styles.modalTitle}>
    Modal title
  </h2>
  <div className={styles.modalBody}>
    Modal content
  </div>
  <footer className={styles.modalFooter}>
    <Button
      onClick={this.doSomething}
      className={styles.modalButton}
    >
      Do A Thing
    </Button>
  </footer>
</Modal>
```

Refactor it to a UI component with its own CSS module:
```js
import Modal from 'components/ui/Modal';

<Modal
  isOpen={this.isOpen}
  title="Modal title"
  actions={(
    <Button onClick={this.doSomething}>Do A Thing</Button>
  )}
>
  Modal content
</Modal>
```

Note how our Modal's `actions` prop makes it easy for implementers to customize footer actions without adding boilerplate markup. Even if you're using a UI framework, you should still look for ways to reduce repetition and make it easier for other developers to implement your components.

#### view-partials
View partials are the non-interactive equivalent of form partials. This is where you put small re-usable templates for formatting & displaying data.

If you're copying & pasting something like this into multiple pages:
```js
import styles from 'globalStylesYouImportInEveryPage.module.css';

<address>
  <div className={styles.line1}>
    {user.address.streetNumber} {user.address.streetName}
  </div>
  {user.address.unit && (
    <div className={styles.line2}>
      Unit {user.address.unit}
    </div>
  )}
  <div className={styles.cityProvincePostal}>
    {user.address.city}, {user.address.province} {user.address.postalCode}
  </div>
</address>
```

Refactor it to a view partial with its own CSS module:
```js
import Address from 'components/view-partials/Address';

<Address
  address={user.address}
/>
```

### Other files

#### index.js
This serves as the entry point for your application. You might also mount your router and page containers here (for more details, see [Routing](#routing)). CRA provides this file for you, and you'll find that it will grow as your application does.

#### index.css
This is a CSS file that's not imported as a module. This is a great place to include basic tag selector styles, CSS resets, web font imports, and other CSS that isn't tied to a specific class or component. Don't go overboard here. Global styles are brittle and hard to change without visual regression testing of large parts of your application.

#### setupTests.js
Contains Jest configuration. If you're adding Jest plugins or configuring Enzyme, this is where that code goes. CRA doesn't include this file by default but will load it if it exists. **You don't need to eject from CRA just to customize Jest.**

### Design Patterns
- TODO: PropTypes best practices?
- TODO: What component styles to use, when to use local state vs global state

## State Management

### Simple
- TODO: Describe what simple state needs are
- TODO: React Hooks / useReducer / etc

### Complex
- TODO: Describe what complex state needs are (am I over-engineering?)

#### Redux
- TODO: Links to Redux documentation (get up to speed, not super detailed)
- TODO: Standard Redux practices, ie. action names, organization, format of action bodies
- TODO: How do we handle redux & async? redux-saga, redux-thunk, plain ol' async/await

## Forms & Validation
Nearly every React application has to deal with forms & form state management at some point. Building forms with React's built-in component state works great for many simple use cases, but we've found that delivering robust forms with client side validation can quickly outgrow the state management tools.

### Formik
[Formik](https://jaredpalmer.com/formik/) provides a set of components for form state management, rendering, and validation, and will work with any application state management library. If you're building anything more complex than a basic one field search form, add Formik to your project with a quick `npm install formik`. Their documentation is pretty robust so we won't duplicate it here, but we do have some general recommendations on how to work with Formik.

Prefer creating separate form components & passing them into the `Formik` component instead of inlining them. This makes it easier to use the same form in multiple contexts (i.e. building a single form for both your create and edit pages.)
```js
import { Formik } from 'formik';
import YourFormComponent from './YourFormComponent';

<Formik
  component={YourFormComponent}
/>
```

Pass your `components/form` and `components/form-partials` components into Formik's `<Field />` component instead of inlining them or using `'input', 'select', etc`. All of our custom form element components should be compatible with `<Field />` without additional implementation work.
```js
import { Field } from 'formik';

import Input from 'components/form/Input';

<Field
  name="firstName"
  component={Input}
/>
```

#### Formik: Documentation
- [(Quick Overview) React Form Validation with Formik and Yup](https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10)
- [Official Formik Docs](https://jaredpalmer.com/formik/docs/overview)

### Yup
Yup.js is an object schema validator that integrates seamlessly with Formik. With Yup, you build a schema describing the expected shape of your form's data and Formik will take care of running validation on change and propagating errors to your fields. Yup provides a plethora of built-in validators and allows the addition of custom validations using `yup.addMethod`.

Here's a quick example of a custom validator and a signup form schema.

#### utils.yup.js
```js
// in a utils/yup.js file
import * as yup from 'yup';

// Set a custom default required message
yup.setLocale({
  mixed: {
    required: ({ path: label }) => `Please enter a valid ${label}`,
  }
})

yup.addMethod(yup.string, 'password', function validatePassword(length, message) {
  return this.test('password', message, function testPassword(value) {
    const { path, createError } = this;
    const valid = value.match(yourPasswordRegexHere);

    return new Promise((resolve, reject) => {
      if (valid) {
        resolve(true);
      } else {
        reject(createError({
          path,
          message: message || `${path} must have ${length} at least one number, one letter, and one symbol`,
        }));
      }
    });
  });
});

export default yup;
```

#### FormComponent.js
```js
import { PHONE_NUMBER } from 'utils/regex';
import yup from 'utils/yup';

const SignupSchema = yup.object({
  first_name: yup.string()
    .label('first name')
    .min(2)
    .required(),
  email: yup.string()
    .email()
    .required(),
  password: yup.string()
    .min(8)
    .max(128)
    .password(),
  password_confirm: yup.string()
    .label('password')
    .required(({ path: label }) => `Those two ${label}s do not match. Please try again.`)
    .oneOf(
      [yup.ref('password'), null],
      ({ path: label }) => `Those two ${label}s do not match. Please try again.`
    ),
  phone_number: yup.string()
    .label('phone number')
    .matches(
      PHONE_NUMBER,
    )
    .required(),
});
```

#### Yup: Best Practices
- Make liberal use of `yup.addMethod` & descriptive validator names to avoid repeating validation code. ie. `birthDate.string().isAdult()` is always easier to understand at a glance than a series of min/max validations full of date parsing code. Additionally, custom validators are easily unit testable, while one-off custom validation rules in a schema are not.
- Any regexes used with `matches` should be named constants, even if you think it's obvious what the regex does.
- Make use of `label()` to give your fields human-friendly names in error messages, if necessary.
- Use `yup.setLocale` to customize default messages instead of passing the same message to multiple validators.

#### Yup: Documenation
- [Official Yup Docs](https://github.com/jquense/yup)

## Routing

### React Router
- TODO: Docs/standards

## Styling
We recognize that a one-size-fits-all approach to CSS isn't really possible and that overcomplicating styling for smaller apps can lead to unnecessary complexity. Knowing that, we make use of two approaches for styling: vanilla CSS, and CSS Modules.

### Vanilla CSS
CRA compiles `.css` files into a single style bundle using Webpack, and automatically runs your code through Autoprefixer. Please refer to our general CSS style guide for information on structuring and naming your selectors.

If you find yourself writing a lot of CSS or getting heavily into complex BEM selectors, you might want to move along to CSS Modules.

### CSS Modules
While a traditional CSS approach can work well with simple React apps, we prefer making use of CSS Modules for styling more complex applications. CSS Modules support is built into CRA, all you have to do is use the `.module.css` extension instead of `.css`, and co-locate it with your React component. This tells Webpack a couple things:

1. Affix some additional text to your selectors post-compilation to make sure they're unique across your entire project. i.e. `.container` in `styles.modules.css` is transformed to something like `.styles__container_v23fn2`.
2. Allow importing of this stylesheet as a JS object. This is how you associate the randomly generated unique class name to your component without knowing it in advance. In practice, this looks like this:

#### `components/ui/YourComponent/styles.module.css`
```css
.yourComponent {
  color: #fff;
}
```

#### `components/ui/YourComponent/index.js`
```js
import styles from './styles.module.css';

const ComponentName = ({ children }) => (
  <div className={styles.yourComponent}>
    {children}
  </div>
);
```

### CSS Modules Guidelines

#### Use camelCase instead of kebab-case for class & variable names
You'll be importing your styles to JS, so use JS-friendly naming conventions. Writing & reading `styles.myClass` is easier than `styles['my-class']`.

#### Class names should be simple
BEM and other naming conventions designed to avoid specificity bugs aren't necessary with CSS Modules. Your class names are guaranteed to be unique so you can name classes based on what they mean in the context of your module. You can have 50 components, each with their own `.container` class, and they'll never conflict even if some of those components are nested in others.

Writing classes this way also makes Sass nesting a lot less necssary as you don't have to repeat the same prefixes over and over again.

##### Avoid this:
```css
.socialLinks {

}
.socialLinks__item {

}
.socialLinks__item--facebook {

}
```

##### Do this instead:
```css
.socialLinks {

}

.item {

}

.facebook {

}
```

#### Overriding Child Components
If you need to override styles in a child component from a parent component, expose props for passing CSS class names to the element you need to override instead of relying on child element selectors. These selectors lead to hard to debug CSS, as it's not always obvious which parent component is overriding child styles and those parent styles may wind up applying to more components than you intended.

##### Avoid this:
```css
.list {
  background: black;
}
.list li {
  color: white;
}
```

```js
import styles from './styles.module.css';
import ListItem from 'ListItem';

const MyComponent = ({ items }) => (
  <ul className={styles.list}>
    {items.map(item => (
      <ListItem>
        {item}
      </ListItem>
    ))}
  </ul>
);
```

##### Do this instead:
```css
/* MyComponent/styles.module.css */
.list {
  background: black;
}
.item {
  color: white;
}
```

```js
/* MyComponent/index.js */
import styles from './styles.module.css';
import ListItem from 'components/layout/ListItem';

const MyComponent = ({
  items,
}) => (
  <ul className={styles.list}>
    {items.map(item => (
      <ListItem
        className={styles.item}
      >
        {item}
      </ListItem>
    ))}
  </ul>
);
```
```js
/* ListItem/index.js */
import styles from './styles.module.css';

const ListItem = ({
  children,
  className = null,
}) => (
  <li
    className={[
      styles.item,
      className,
    ]}
  >
    {children}
  </li>
);
```

#### Variables
If you need compile-time variables, don't jump straight to including Sass. CSS Modules allows declaration of variables that you can import into CSS & and JS modules using its `@value` keyword. This is especially handy for sharing things like common media query breakpoints between your styles and conditional rendering tools like `react-media` (which the below example illustrates) or the DOM API's `window.mediaQueryListener`.

```css
/* variables.module.css */
@value colorWhite: #fff;
@value screenSmall: screen and (min-width: 768px);
```

```css
/* MyComponent/styles.module.css */
@value (
  colorWhite,
  screenSmall
) from 'variables.css';

.container {
  width: 100%;
  color: colorWhite;
}

@media screenSmall {
  .container {
    width: 80%;
  }
}
```

```js
/* MyComponent/index.js */
import { screenSmall } from 'variables.module.css';
import SmallScreenComponent from 'MobileFriendlyComponent';
import LargeScreenComponent from 'MobileFriendlyComponent';

import styles from './styles.module.css';

const MyComponent = ({
  children,
}) => (
  <div className={styles.container}>
    <Media query={screenSmall}>
      {matches => (
        <LargeScreenComponent>
      ) : (
        <SmallScreenComponent>
      )}
    </Media>
  </div>
);
```

#### Conditional classes
Install the [`classnames` package](https://www.npmjs.com/package/classnames) if you need to apply classes based on JS data as conditional string concatenation can get unwieldy with two or more optional classes. `classnames`'s array syntax makes this a lot easier to write & read.

```js
import classNames from 'classnames';

import styles from './styles.module.css';

const MyComponent = ({
  children,
  conditionA,
  conditionB,
  conditionC,
}) => (
  <div
    className={classNames([
      styles.myComponent,
      conditionA && styles.conditionalClassA,
      conditionB && styles.conditionalClassB,
      conditionC && styles.conditionalClassC,
    ])}
  >
    {children}
  </div>
);
```

#### Global selectors
Only use `:global` selectors to override another library's CSS if there are no other ways of doing so. We should try to make use of third-party UI libraries that allow passing classNames to components for style customization. That said, some otherwise very good tools may not support this or we may need to integrate with non-React JS libraries. Avoid using `:global` otherwise as it opts you out of all the local scoping benefits provided by CSS Modules.

A good example is **Semantic UI**. While Semantic provides `className` properties for its components, its heavily specific style of CSS means that built-in styles will often win over yours, particularly if you're trying to style sub-elements like a dropdown menu item. Furthermore, you can't directly target their classes (i.e. `ui.dropdown .menu > .item`) as CSS Modules will modulify those class names.

To overcome this, you can write a selector like below which will tell CSS Modules to modulify `yourDropdown` (and allow you to access it in JS like normal) but print `.ui.dropdown .menu > .item` as is.

> ⚠️ You should try to always prefix your `:global` rules with a local class, otherwise they'll escape the scope of your module and potentially override styles in other components.

```css
/* MyDropdown/styles.module.css */
.myDropdown:global(.ui.dropdown .menu > .item) {
  background-color: black;
}
```

```js
/* MyDropdown/index.js */
import Dropdown from 'semantic-ui-react';
import styles from './styles.module.css';

const MyDropdown = ({
  items
}) => (
  <Dropdown
    className={styles.myDropdown}
  >
  {/* etc... */}
  </Dropdown>
);
```

#### Prefer composable components to the `composes` keyword
CSS Modules provides the `composes` keyword as a means of adding style rules from one class into another, similar to mixins in Sass. While this is powerful functionality that can make it easier to share styles across semantically different components, we should avoid using it when creating composable components is possible.

For example, you should avoid creating a `.list` class and composing it with various components that implement a `<ul>`. Instead:

* Create `<List />` and `<ListItem />` components that have their own style modules and accept a `className` for further customization
* Replace `<ul>`s & `<li>`s elsewhere in your app with your new base components.
* If you find you're passing similar customizations to various `<List>` instances, move that customization to `<List>`'s CSS module and apply it conditionally using a conditional className like the above example.

You now have a single, explicit defintion of what your app considers a list, and you can update its markup or styles across the entire site in one place.

#### Utilize computed keys to apply modifier classes using props
If you have a component that has multiple variants, use dynamic property access to make applying these classes easier. You can even organize these variants in a separate CSS file to avoid the need to prefix each variant class.

```css
/* MyComponent/variants.module.css */
@value colorBrand, colorDanger from 'variables.module.css';

.primary {
  background-color: colorBrand;
}

.danger {
  background-color: colorDanger;
}
```

```js
/* MyComponent/index.js */
import classNames from 'classnames';

import styles from './styles.module.css';
import variants from './variants.module.css';

const MyComponent = ({
  children,
  variant = 'primary',
}) => (
  <div
    className={classNames([
      styles.myComponent,
      variants[variant]
    ])}
  >
    {children}
  </div>
);

MyComponent.propTypes = {
  variant: PropTypes.oneOf([
    'primary',
    'danger',
  ]),
};
```

### Sass + CSS Modules
If you find yourself missing Sass features, make double super sure you can't address the same needs using CSS Modules' built-in fuctionality. If you still need Sass, refer to [CRA's documentation on adding Sass support](https://create-react-app.dev/docs/adding-a-sass-stylesheet). Remember that you'll lose the ability to import variables into JS files if you convert them to Sass variables, so you'll need to re-engineer components accordingly.

## UI Kits / Frameworks
- TODO: When they're appropriate?
  - ie. when building a back-end system that won't require heavy custom design
-TODO: When to just build your own
  - ie. consumer-facing apps with custom design

### Aside on Semantic UI React
We use this on a lot of older projects but have had a lot of issues with customizing. It's good to be familiar, but do not use this on new work.
- TODO: Documentation

## Testing

### Unit Testing
CRA comes with [Jest](https://facebook.github.io/jest/) pre-configured and ready for you to write your first test. Please reference [the CRA documentation](https://create-react-app.dev/docs/running-tests) for the latest info on how to run tests and some basic information on setting them up. Beyond this, we have a few best practices for test writing and organization.

#### Place .test.js files next to the component they test
Jest automatically detects files with a `.test.js` extension and incorporates them into the test suite. The best place for these files is right next to the file they're testing. If your component has any sub components, their test files should be named similarly.

```
MyComponent/
  index.js
  index.test.js
  MySubComponent.js
  MySubComponent.test.js
```

#### Organize for better readability
Jest lets you use `describe` blocks to group tests by functionality or another measure that makes sense for your project. This makes your test suites easier to read and gives Jest metadata to use when displaying test failure feedback in your terminal.

Assuming you're testing a module that contains a single function:
```js
/* myModule.test.js */
import {
  functionA,
} from './myModule';

describe('myModule', () => { // the name of the module being tested
  describe('functionA', () => { // the name of the function being tested
    it('should return A', () => { // a specific test case
      expect(functionA()).toBe('A');
    });

    it('should not return G', () => { // a different, equally contrived test case
      expect(functionA()).not.toBe('G');
    });
  });
});
```

#### Use Enzyme to simulate component rendering
We need to bring in another package to allow us to simulate the mounting and rendering of React components without a browser. Follow the instructions on the CRA site to add [Enzyme](https://create-react-app.dev/docs/running-tests#option-1-shallow-rendering) to your project and make use of `shallow` and `render` whenever you need to see whether or not a React component behaves the way you expect.

#### Use snapshot tests to detect potential UI regressions
[Snapshot testing](https://jestjs.io/docs/en/snapshot-testing) makes preventing UI regressions much easier. On first run, Jest takes a "snapshot" (a plain text rendering of your component's output, not an image) and stores it in a snapshots folder alongside your test which is then added to your next git commit.

On subsequent runs, Jest renders the component and compares the to your stored snapshot. If they don't match, the tests fail. This doesn't necessarily mean your app is broken, it just means that some of your components are now rendering differently. Jest will show you a diff for each failing component. If you see differences you expect, you can update the snapshot using the Jest CLI, otherwise it's time to manually review those components for a regression.

#### Use mocking to test functionality that relies on code or factors you can't control
Mocking is the process of faking a third-party dependency or a built-in API to create the conditions necessary for your test to run. It can be anything from testing that your app handles API issues by simulating a 500 error from a network request, simulating screen size by overriding `mediaQueryListener`'s behaviour, to mocking `Date` so you don't have to update tests that calculate an age difference every time the current year rolls over. Let's use that last one as an example.

Assuming this test was written in 2019, it will start failing next year even though the tested logic is working correctly:
```js
describe('getAge', () => {
  it("should calculate a user's age", () => {
    const birthDate = '1990-01-01';
    expect(getAge(birthDate)).toBe(29);
  });
});
```

This will always work as we're mocking the current date, ensuring `new Date()` always returns January 1, 2019 regardless of what time it currently is:
```js
describe('getAge', () => {
  beforeEach(() => {
    clock.set('2019-01-01T00:00:00.000Z'); // provided by jest-plugin-clock
  });

  it("should calculate a user's age", () => {
    const birthDate = '1990-01-01';
    expect(getAge(birthDate)).toBe(29);
  });
});
```

#### Turn your bugs into test cases
Practicing test driven development (TDD) with UI can be challenging as it's hard to write tests for a potentially complex UI, especially when much of your business logic is happening in an API somewhere. That said, bug stories offer a great opportunity to practice TDD in a React project.

Once you get a handle on the problematic behaviour in question and verify that it's real & replicable, write a test case that simulates it. Then, update your code until the tests pass.

#### Separate complex logic into smaller, easily testable modules whenever possible
Testing complex logic that relies on React state can be confusing and time consuming. Instead, we can take a more modular approach by refactoring code that isn't directly responsible for presentation and testing that directly.

An example would be a UI element that takes the start and end dates of a user's vacation and displays how long they'll be away, in days. You could embed this date calculation into a React component, possibly as a function that accesses state:

```js
const MyComponent = () => {
  const [{ startDate, endDate }, updateDates] = useState({ startDate: null, endDate: null });

  const calculateDays = () => {
    return endDate - startDate; // for brevity, let's assume date diff calculation in JS is sensible & easy
  };

  return (
    <div>
      {calculateDays()}
    </div>
  );
};
```

To test this you'd need to fully mount the component, simulate state changes to set `startDate` and `endDate`, then check the rendered output for the number of days you expect. To make this simpler, we can refactor our date logic into a separate function.

```js
/* MyComponent/index.js */
import { calculateDays } from 'utils/date';

const MyComponent = () => {
  const [{ startDate, endDate }, updateDates] = useState({ startDate: null, endDate: null });
  return (
    <div>
      {calculateDays(startDate, endDate)}
    </div>
  );
};
```

```js
/* utils/date.js */
export calculateDays(startDate, endDate) {
  return endDate - startDate; // for brevity, let's assume date diff calculation in JS is sensible & easy
}
```

```js
/* utils/date.test.js */
describe('date', () => {
  describe('calculateDays', () => {
    it('should calculate the number of days between two dates', () => {
      expect(calculateDays(new Date('2019-01-01'), new Date('2019-01-07'))).toBe(6);
    });
  });
});
```

Now your test is a lot simpler and as a happy side effect you can easily re-use this logic in other components if necessary.

#### Helpful Plugins
- [jest-plugin-clock](https://www.npmjs.com/package/jest-plugin-clock): Makes mocking JS `Date`s super easy. Essential if you're testing anything time-sensitive.
- [jest-fetch-mock](https://www.npmjs.com/package/jest-fetch-mock): Mock `fetch` responses and rejections. Enables the testing of API dependent code without hitting a real API or even needing an internet connection.
- [jest-localstorage-mock](https://www.npmjs.com/package/jest-localstorage-mock): Essential for testing code that touches localStorage or sessionStorage.

### Integration/Functional Testing
[Cypress](https://www.cypress.io/)

## Linting & Coding Style
We've adopted a standard coding style in order to make our projects easier to onboard and cut down on worries about tabs vs. spaces, casing styles, etc. This coding standard will be documented in brief here, but is fully captured in our [`eslint-config-domain7` NPM package](https://github.com/domain7/eslint-config-domain7). It's *highly recommended* to configure your text editor to automatically lint your React code as you work, as our React projects often have pre-commit & pre-push checks that will fail if your code doesn't pass. It's much easier to learn and adapt a standard when you get feedback in small chunks instead of all at once.

Our standard extends [eslint-config-airbnb](https://github.com/airbnb/javascript). Please review their documentation (and the React sub-page.)

### Our customizations
* We automatically include `jest` as a global and bundle the `react`, `jsx-a11y`, and `filenames` plugins.
* We allow non-destructuring props assignment in case destructuring would cause name conflicts.
* We allow dangling underscores (i.e. `const variable__`)
* We enforce dangling commas in multi-line array, object, and function arguments lists. This makes it easier to re-order lines without causing syntax errors. This is not enforced on single-line lists.
  ```js
  // Good:
  const foo = {
    a: 1,
    b: 2,
  };

  // Bad:
  const foo = {
    a: 1,
    b: 2
  }
  ```
* We enforce a two space indent.
* We validate `aria-*` attributes.
* We require `for` attributes on `<label>` components.
* We require corresponding key events if mouse events are present
* We disable Airbnb's max line length.
* We allow multiple `inline.chained().method().calls()`.
* `console` and `debugger` statements are warnings, not errors, as we need these to not crash CRA's dev server. Your project will often treat these as errors when running pre-commit/pre-push checks, however, so you do have to clean them up eventually.
* ``${Template} literals`` are preferred to `'string' +  'concatentation'`.
* We allow `PropTypes.object` even though it's best to define a `PropTypes.shape` when you know the full list of properties your component expects.
* We ban the `.jsx` extension. Please use `.js` for React components.
* We warn on deprected functions but don't throw an error because sometimes refactoring isn't feasible at the moment. Try to fix this stuff when you find it though!
* We allow `this.setState` in `componentDidUpdate`. While this isn't optimal code, it's sometimes necessary.
* We disable `import/no-extraneous-dependencies` in Jest tests when importing `devDependencies`.
* We disable `react/prefer-stateless-function` because refactoring functional components to class components when you need to add state can be unnecessarily time consuming. If your project is primarily using class components, feel free to use one when a stateless function would work. While React is moving away from classes, we still support them in older projects.

### Ignore comments & per-project customization

Lint rules are a guideline to provide some consistency, but are **always up for discussion** if they're not meeting our needs or aren't providing value.

 You may need to occasionally override eslint on a case-by-case basis, and this is OK! That said, please check with your lead dev and/or expect PR feedback on whether or not they're necessary.

We sometimes will use a project as an opportunity to try something new, (i.e.,avoid using class components and `this.state` to embrace Hooks and the direction React is going in the future) so individual projects may minimally override or customize our standard. Be sure to check their eslint configuration if something doesn't totally line up with your expectations or the documentation here.

Remember, our linting guidelines are a living document and are **always up for discussion** with your team lead and other team members. Our standard should be an ongoing coversation on what we feel is best practice, not an excuse to stick to what we know.

## Other JS Tools

### ImmutableJS
- TODO: Document why this is useful and when it's useful
- TODO: Writing React with ImmutableJS: prop types, effects on component render diffing, etc

```
Immutable data encourages pure functions (data-in, data-out) and lends itself to much simpler application development and enabling techniques from functional programming such as lazy evaluation.

While designed to bring these powerful functional concepts to JavaScript, it presents an Object-Oriented API familiar to Javascript engineers and closely mirroring that of Array, Map, and Set. It is easy and efficient to convert to and from plain Javascript types.
```

## Code Editor Config
We believe in letting developers choose the best tools for themselves. When working on React projects, we recommend a modern text editor with good ES6+ syntax support. A few suggestions are:

* [VSCode](https://code.visualstudio.com/)
* [Atom](https://atom.io)
* [WebStorm](https://www.jetbrains.com/webstorm/)

While we're not prescriptive about text editors, there are a few essential editor plugins that you'll need to install to best work on our codebases. (Since we support many editors, we're not linking specific plugins here. You'll need to search for the plugin for your editor yourself.)

* [editorconfig](https://editorconfig.org/) provides a standard way to share text editor configuration settings like which line endings to use and how many spaces are in an indent. Our projects all have an `.editorconfig` and installing this plugin will make your editor automatically adapt those settings.
* [eslint](https://eslint.org/) will automatically run your changes against our ESLint standard and provide helpful inline feedback. Many ESLint plugins support automatically fixing lint errors on save, which we recommend enabling.
* [stylelint](https://github.com/stylelint/stylelint) provides syntax checking and linting for CSS. You may additionally need [sass-lint](https://github.com/sasstools/sass-lint) if your project is using SCSS.

## Browser developer tools
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) - inspect react component tree (state, props), debug rerenderings
- [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) - track dispatched actions, inspect state at any action, track action payload
- [Immutable.js Object Formatter](https://chrome.google.com/webstore/detail/immutablejs-object-format/hgldghadipiblonfkkicmgcbbijnpeog?hl=en) - inspect immutable objects in console or in react props/state
