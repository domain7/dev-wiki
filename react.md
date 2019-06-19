---
layout: page
title: React
description: D7 React Developer's Guide
permalink: /react/
mainmenu: true
---

## Overview

We implement a standard set of React libraries and tools in order to:

- reduce onboarding time for developers
- reduce complexity & time required for context switching between projects
- increase number of developers who can assist on more projects, if developers know the same libraries and tools

### Other Choices?
If considering implementing another solution than our standard approach below, in a section, we recommend clearing it by one of the team leads. There may be an existing solution that most of our team will already know how to implement, build, debug and help with.

## Node

### NVM
- TODO: Documentation, I think this is our best solution?
- TODO: How to setup .nvmrc

### Package management
Use `npm`, this is a solved problem

## Project Setup
Use `create-react-app`

## Project structure
- TODO: How to set up folder structure

### Components
- TODO: How to organize files within a component, when it's a good time to refactor
- TODO: How to set up reusable form, layout, and ui components
- TODO: PropTypes best practices

### Design Patterns
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

## Browser dev tools
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) - inspect react component tree (state, props), debug rerenderings
- [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) - track dispatched actions, inspect state at any action, track action payload
- [Immutable.js Object Formatter](https://chrome.google.com/webstore/detail/immutablejs-object-format/hgldghadipiblonfkkicmgcbbijnpeog?hl=en) - inspect immutable objects in console or in react props/state
