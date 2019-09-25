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

[Jest](https://facebook.github.io/jest/) for unit testing
https://github.com/react-boilerplate/react-boilerplate/blob/master/docs/testing/unit-testing.md

- TODO: Helpful jest plugins (clock, browser API mocking, etc)
- TODO: Standards/best practices

### Integration/Functional Testing
[Cypress](https://www.cypress.io/)

## Linting Tools
Linting is *mandatory*
- TODO: Document this

[eslint](#TODO)
[eslint-airbnb](#TODO)

## Other JS Tools

### ImmutableJS
- TODO: Document why this is useful and when it's useful
- TODO: Writing React with ImmutableJS: prop types, effects on component render diffing, etc

```
Immutable data encourages pure functions (data-in, data-out) and lends itself to much simpler application development and enabling techniques from functional programming such as lazy evaluation.

While designed to bring these powerful functional concepts to JavaScript, it presents an Object-Oriented API familiar to Javascript engineers and closely mirroring that of Array, Map, and Set. It is easy and efficient to convert to and from plain Javascript types.
```

## Code Editor Config
- TODO: Recommend a couple editors for onboarding
- TODO: Essential plugins (editorconfig, eslint)

## Browser developer tools
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) - inspect react component tree (state, props), debug rerenderings
- [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) - track dispatched actions, inspect state at any action, track action payload
- [Immutable.js Object Formatter](https://chrome.google.com/webstore/detail/immutablejs-object-format/hgldghadipiblonfkkicmgcbbijnpeog?hl=en) - inspect immutable objects in console or in react props/state
