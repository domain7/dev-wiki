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

## Forms

### Formik
- Most often, when building forms in React we only need to store values in local component state. Then, we typically submit those values from that component to an API or other endpoint.
- We recommend Formik as a simple, readable and extendable solution. Formik does not force state re-rendering, as Redux Forms does, and is a reliable solution for both very few form fields and/or many form fields in one component.
- Formik is recommended by the React team as a complete solution and can handle validation, input bindings, as well as errors and state changes.
- Common form challenges solved by Formik include:
  - Getting values in and out of form state
  - Validation and error messages
  - Handling form submission

#### Formik: Standards
- TODO: How do we build Formik here?

#### Formik: Documentation
- [(Quick Overview) React Form Validation with Formik and Yup](https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10)
- [Official Formik Docs](https://jaredpalmer.com/formik/docs/overview)

### Yup
- Validating form fields is often a multiple choice scenario. We often need to be able to chain requirements for 1 form field.
- Validating data is also often required, like an object, before we send it to an API endpoint, so that we know it will pass that APIs requirements.
- Yup, along with Formik, works like this:
  ```
  With Yup, we create a Yup formatted object that resembles our intended schema for an object, and then use Yup utility functions to check if our data objects match this schema — hence validating them.
  ```
- We build a schema / object, for each form field we wish to validate, and then chain requirements to meet our needs. Here's an example:
    ```
     const SignupSchema = Yup.object().shape({
      first_name: Yup.string()
        .min(2, 'Please enter a valid first name')
        .required('Please enter a valid first name'),
      email: Yup.string()
        .email('Please enter a valid email')
        .required('Please enter a valid email'),
      password: Yup.string()
        .min(8, 'Please enter a valid password')
        .max(128, 'Please enter a valid password')
        .matches(/[a-z]/, 'Please enter a valid password')
        .matches(/[A-Z]/, 'Please enter a valid password')
        .matches(/[0-9]/, 'Please enter a valid password')
        .matches(/[!@#\$%\^&\*]/, 'Please enter a valid password')
        .required('Please enter a valid password'),
      password_confirm: Yup.string()
        .required('Those two passwords do not match. Please try again.')
        .oneOf(
          [Yup.ref('password'), null],
          'Those two passwords do not match. Please try again.'
        ),
      phone_number: Yup.string()
        .matches(
          /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
          'Please enter a valid phone number'
        )
        .required('Please enter a valid phone number'),
    ```

#### Yup: Standards
- TODO: How do we build Yup here?

#### Yup: Documenation
- [Official Yup Docs](https://github.com/jquense/yup)

## Routing

### React Router
- TODO: Docs/standards

## Styling
### CSS Modules
- TODO: Docs/standards

### Simple
- TODO: What is a simple CSS use case? ie. I just need to style some stuff
- TODO: postcss-icss-values for basic variable support without Sass, but use css vars if IE support isn't necessary

### Complex
- TODO: What is a complex CSS use case?
- TODO: Docs on node-sass, how to add Sass to CSS Modules (I think this is supported by create-react-app)
- TODO: Standards

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
