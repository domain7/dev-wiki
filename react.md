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

If considering implementing another state management solution, we'd recommend clearing it by one of the team leads. There may be existing solutions that most of our team will already know how to implement, and be able to build, debug and help with.

## Contents
TODO: When this is ready (can we make this dynamic?)

## Node

### NVM
TODO: Documentation, I think this is our best solution?
TODO: How to setup .nvmrc

### Package management
Use `npm`, this is a solved problem

## React: Project Setup
Use `create-react-app`

## React: Project structure
TODO: How to set up folder structure

### Components
TODO: How to organize files within a component, when it's a good time to refactor
TODO: How to set up reusable form, layout, and ui components
TODO: PropTypes best practices

### Design Patterns
TODO: What component styles to use, when to use local state vs global state

## React: State Management

### Simple
TODO: Describe what simple state needs are
TODO: React Hooks / useReducer / etc

### Complex
TODO: Describe what complex state needs are (am I over-engineering?)

#### Redux
TODO: Links to Redux documentation (get up to speed, not super detailed)
TODO: Standard Redux practices, ie. action names, organization, format of action bodies
TODO: How do we handle redux & async? redux-saga, redux-thunk, plain ol' async/await

<!-- - Recommended as state management by React
- Supports most middleware
- Works well with most REST APIs & GraphQL
- Easy to read official documentation
- Robust debugging tools available -->


## React: Forms

### Formik
TODO: Documentation
TODO: Any standards?

#### Yup
TODO: Documentation
TODO: Standards

<!-- - Recommended by React
- Built in validation, error handling
- Supports most commonly built form field types, and custom build form fields
- Seamless integration with YUP Validation
- Large community support online, both in official documentation and stack overflow -->

## React: Routing

### React Router
TODO: Docs/standards

<!-- - Very few bugs, we've found
- Easy to read official documentation
- Large community support online, both in official documentation and stack overflow -->
 
## React: Styling
### CSS Modules
TODO: Docs/standards

### Simple
TODO: What is simple? ie. I just need to style some stuff
TODO: postcss-icss-values for basic variable support without Sass, but use css vars if IE support isn't necessary

### Complex
TODO: What is a complex CSS use case?
TODO: Docs on node-sass, how to add Sass to CSS Modules (I think this is supported by create-react-app)
TODO: Standards
 
## React: UI Kits / Frameworks
TODO: When they're appropriate?
    ie. when building a back-end system that won't require heavy custom design
TODO: When to just build your own
    ie. consumer-facing apps with custom design
    
### Aside on Semantic UI React
We use this on a lot of older projects but have had a lot of issues with customizing. It's good to be familiar, but do not use this on new work.
TODO: Documentation

## React: Testing

### Unit Testing

[Jest](https://facebook.github.io/jest/) for unit testing
https://github.com/react-boilerplate/react-boilerplate/blob/master/docs/testing/unit-testing.md

TODO: Helpful jest plugins (clock, browser API mocking, etc)
TODO: Standards/best practices

### Integration/Functional Testing
[Cypress](https://www.cypress.io/)

## React: Linting Tools
Linting is *mandatory*
TODO: Document this

[eslint](#TODO)
[eslint-airbnb](#TODO)

## Other JS Tools

### ImmutableJS
TODO: Document why this is useful and when it's useful
Writing React in ImmutableJS. 

```
Immutable data encourages pure functions (data-in, data-out) and lends itself to much simpler application development and enabling techniques from functional programming such as lazy evaluation.

While designed to bring these powerful functional concepts to JavaScript, it presents an Object-Oriented API familiar to Javascript engineers and closely mirroring that of Array, Map, and Set. It is easy and efficient to convert to and from plain Javascript types.
```

## React: Code Editor Config
TODO: Recommend a couple editors for onboarding
TODO: Essential plugins (editorconfig, eslint)

## React: Browser dev tools
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) - inspect react component tree (state, props), debug rerenderings
- [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) - track dispatched actions, inspect state at any action, track action payload
- [Immutable.js Object Formatter](https://chrome.google.com/webstore/detail/immutablejs-object-format/hgldghadipiblonfkkicmgcbbijnpeog?hl=en) - inspect immutable objects in console or in react props/state
