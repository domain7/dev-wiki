---
layout: page
title: React
description: D7 React Developer's Guide
permalink: /react/
mainmenu: true
---

## Overview

FTC was based on [React Boilerplate](https://github.com/react-boilerplate/react-boilerplate), which has changed a bit since we started using it. [Introduction into the boilerplate](https://github.com/react-boilerplate/react-boilerplate/blob/master/docs/general/introduction.md) is a great place to start.

## Project structure

  Example of the project structure:

  ```javascript
  // Root of your app
  app
    app.js       // Entry point
    routes.js    // Router configuration
    reducers.js  // Reducers that initialize immediatelly (not injected at any particular route)

    // Reusable components              
    components       
      layout         
        Footer
          index.js
      ui
        Button
          index.js
          styles.scss     // Styles for Button component
          tests
            index.test.js // Tests for Button component
        Book
          index.js

    /*
    * Redux bundles (reducers, action creators, selectors, sagas with api calls)
    * split by entity.
    */
    ducks            
      authors.js
      books.js

      // Tests for ducks
      tests
        authors.test.js
        books.test.js

   // All pages will be grouped in this folder by route
    pages             
      authors
        AuthorListPage
          duck.js            // If the page holds some state it needs a duck
          sagas.js           // If the page makes API calls it needs sagas
          index.js
          styles.scss        // Styles used on this particular page. Avoid it
        AuthorEditPage
          index.js

        // Non-reusable components should be placed alongside with the page it is used on
        BooksDropdown
          index.js
      books
        BookListPage
        BookEditPage

    // Generic containers and global pages
    global
      App
      LoginPage

    utils
      validators.js
      calculators.js
      tests
        validators.test.js
        calculators.test.js

  // E2E tests
  cypress
    integration
      books_spec.js // Testing books feature

  // Webpack config, generators etc.
  internals
  ```

## Style Guide

The following guide is based on [Airbnb’s styleguide](https://github.com/airbnb/javascript/tree/master/react) and adapted for Domain7.

### Basic Rules
- Only include one React component per file.
- Always use JSX syntax.
- Do not use `React.createElement` unless you're initializing the app from a file that is not JSX.

### Component vs PureComponent vs React.createClass vs stateless function
- On the projects with `Immutable.js` prefer to use `[React.PureComponent](https://facebook.github.io/react/docs/react-api.html#react.purecomponent)` for both stateless and stateful components. Otherwise use `React.Component` for stateful components and functions for stateless ones.
> Why? `PureComponent` implements `shouldComponentUpdate` with shallow comparison of the props. Immutable props are very fast to compare which results in performance improvement by reducing rerendering of your components.
> Other benefits:
> - it’s easy to introduce state into class-based components, no refactoring needed
> - functional components are [not faster](http://moduscreate.com/react_component_rendering_performance/) than class-based components. Internally they are the same

- Don’t use `React.createClass`
  ```javascript
  // bad
  const Listing = React.createClass({
    // ...
    render() {
      return <div>{this.state.hello}</div>;
    }
  });

  // good
  class Listing extends React.Component {
    // ...
    render() {
      return <div>{this.state.hello}</div>;
    }
  }

  // good for components with immutable props
  class Listing extends React.PureComponent {
    // ...
    render() {
      return <div>{this.state.hello}</div>;
    }
  }
  ```


- If you don't have state or refs, you can use normal functions (not arrow functions) over classes:
  ```javascript
  // bad (relying on function name inference is discouraged)
  const Listing = ({ hello }) => (
    <div>{hello}</div>
  );

  // good
  function Listing({ hello }) {
    return <div>{hello}</div>;
  }
  ```

## Mixins
- [Do not use mixins](https://facebook.github.io/react/blog/2016/07/13/mixins-considered-harmful.html).
> Why? Mixins introduce implicit dependencies, cause name clashes, and cause snowballing complexity. Most use cases for mixins can be accomplished in better ways via components, higher-order components, or utility modules.

## Naming
- **Extensions**: Use `.js` extension for React components.
- **Filename**: Use PascalCase for folder names. E.g., `ReservationCard/index.js`.
- **Reference Naming**: Use PascalCase for React components and camelCase for their instances. eslint: `[react/jsx-pascal-case](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md)`
  ```javascript
  // bad
  import reservationCard from './ReservationCard';

  // good
  import ReservationCard from './ReservationCard';

  // bad
  const ReservationItem = <ReservationCard />;

  // good
  const reservationItem = <ReservationCard />;
  ```

- **Component Naming**: Use the filename as the component name. For example, `ReservationCard.js` should have a reference name of `ReservationCard`. However, for root components of a directory, use `index.js` as the filename and use the directory name as the component name:
  ```javascript
  // bad
  import Footer from './Footer/Footer';

  // bad
  import Footer from './Footer/index';

  // good
  import Footer from './Footer';
  ```

- **Higher-order Component Naming**: Use a composite of the higher-order component's name and the passed-in component's name as the `displayName` on the generated component. For example, the higher-order component `withFoo()`, when passed a component `Bar` should produce a component with a `displayName` of `withFoo(Bar)`.
  > Why? A component's `displayName` may be used by developer tools or in error messages, and having a value that clearly expresses this relationship helps people understand what is happening.
    // bad
    export default function withFoo(WrappedComponent) {
      return function WithFoo(props) {
        return <WrappedComponent {...props} foo />;
      }
    }

  ```javascript
  // good
  export default function withFoo(WrappedComponent) {
    function WithFoo(props) {
      return <WrappedComponent {...props} foo />;
    }

    const wrappedComponentName = WrappedComponent.displayName
      || WrappedComponent.name
      || 'Component';

    WithFoo.displayName = `withFoo(${wrappedComponentName})`;
    return WithFoo;
  }
  ```


- **Props Naming**: Avoid using DOM component prop names for different purposes.
  > Why? People expect props like `style` and `className` to mean one specific thing. Varying this API for a subset of your app makes the code less readable and less maintainable, and may cause bugs.

  ```javascript
  // bad
  <MyComponent style="fancy" />

  // good
  <MyComponent variant="fancy" />
  ```

### Declaration
- Do not use `displayName` for naming components. Instead, name the component by reference.

  ```javascript
  // bad
  export default React.createClass({
    displayName: 'ReservationCard',
    // stuff goes here
  });

  // good
  export default class ReservationCard extends React.Component {
  }
  ```

### Alignment
- Follow these alignment styles for JSX syntax. eslint: `[react/jsx-closing-bracket-location](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md)`
  ```javascript
  // bad
  <Foo superLongParam="bar"
       anotherSuperLongParam="baz" />

  // good
  <Foo
    superLongParam="bar"
    anotherSuperLongParam="baz"
  />

  // if props fit in one line then keep it on the same line
  <Foo bar="bar" />

  // children get indented normally
  <Foo
    superLongParam="bar"
    anotherSuperLongParam="baz"
  >
    <Quux />
  </Foo>
  ```

- Use `[prettier-atom](https://atom.io/packages/prettier-atom)` to handle the formatting
### Quotes
- Always use double quotes (`"`) for JSX attributes, but single quotes (`'`) for all other JS. eslint: `[jsx-quotes](http://eslint.org/docs/rules/jsx-quotes)`
  > Why? Regular HTML attributes also typically use double quotes instead of single, so JSX attributes mirror this convention.

  ```javascript
  // bad
  <Foo bar='bar' />

  // good
  <Foo bar="bar" />

  // bad
  {% raw  %}<Foo style={{ left: "20px" }} />{% endraw  %}

  // good
  {% raw  %}<Foo style={{ left: '20px' }} />{% endraw  %}
  ```

### Spacing
- Always include a single space in your self-closing tag. eslint: `[no-multi-spaces](http://eslint.org/docs/rules/no-multi-spaces)`, `[react/jsx-space-before-closing](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-space-before-closing.md)`

  ```javascript
  // bad
  <Foo/>

  // very bad
  <Foo                 />

  // bad
  <Foo
   />

  // good
  <Foo />
  ```
- Do not pad JSX curly braces with spaces. eslint: `[react/jsx-curly-spacing](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md)`

  ```javascript
  // bad
  <Foo bar={ baz } />

  // good
  <Foo bar={baz} />
  ```

### Props
- Always use camelCase for prop names.

  ```javascript
  // bad
  <Foo
    UserName="hello"
    phone_number={12345678}
  />

  // good
  <Foo
    userName="hello"
    phoneNumber={12345678}
  />
  ```

- Omit the value of the prop when it is explicitly `true`. eslint: `[react/jsx-boolean-value](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md)`

  ```javascript
  // bad
  <Foo
    hidden={true}
  />

  // good
  <Foo
    hidden
  />
  ```

- Always include an `alt` prop on `<img>` tags. If the image is presentational, `alt` can be an empty string or the `<img>`must have `role="presentation"`. eslint: `[jsx-a11y/img-has-alt](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/img-has-alt.md)`

  ```javascript
  // bad
  <img src="hello.jpg" />

  // good
  <img src="hello.jpg" alt="Me waving hello" />

  // good
  <img src="hello.jpg" alt="" />

  // good
  <img src="hello.jpg" role="presentation" />
  ```
- Do not use words like "image", "photo", or "picture" in `<img>` `alt` props. eslint: `[jsx-a11y/img-redundant-alt](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/img-redundant-alt.md)`
  > Why? Screenreaders already announce `img` elements as images, so there is no need to include this information in the alt text.

  ```javascript
  // bad
  <img src="hello.jpg" alt="Picture of me waving hello" />

  // good
  <img src="hello.jpg" alt="Me waving hello" />
  ```

- Use only valid, non-abstract [ARIA roles](https://www.w3.org/TR/wai-aria/roles#role_definitions). eslint: `[jsx-a11y/aria-role](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-role.md)`

  ```javascript
  // bad - not an ARIA role
  <div role="datepicker" />

  // bad - abstract ARIA role
  <div role="range" />

  // good
  <div role="button" />
  // But prefer to use <button> for clickable non-hyperlink elements
  ```

- Do not use `accessKey` on elements. eslint: `[jsx-a11y/no-access-key](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-access-key.md)`
> Why? Inconsistencies between keyboard shortcuts and keyboard commands used by people using screenreaders and keyboards complicate accessibility.

  ```javascript
  // bad
  <div accessKey="h" />

  // good
  <div />
  ```

- Avoid using an array index as `key` prop, prefer a unique ID. ([why?](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318))

  ```javascript
  // bad
  {todos.map((todo, index) =>
    <Todo
      {...todo}
      key={index}
    />
  )}

  // good
  {todos.map(todo => (
    <Todo
      {...todo}
      key={todo.id}
    />
  ))}
  ```

- Always define explicit defaultProps for all non-required props.
> Why? propTypes are a form of documentation, and providing defaultProps means the reader of your code doesn’t have to assume as much. In addition, it can mean that your code can omit certain type checks.

  ```javascript
  // bad
  const propTypes = {
    foo: PropTypes.number.isRequired,
    bar: PropTypes.string,
    children: PropTypes.node,
  };
  function SFC({ foo, bar, children }) {
    return <div>{foo}{bar}{children}</div>;
  }
  SFC.propTypes = propTypes;

  // good
  const propTypes = {
    foo: PropTypes.number.isRequired,
    bar: PropTypes.string,
    children: PropTypes.node,
  };
  const defaultProps = {
    bar: '',
    children: null,
  };

  function SFC({ foo, bar, children }) {
    return <div>{foo}{bar}{children}</div>;
  }
  SFC.propTypes = propTypes;
  SFC.defaultProps = defaultProps;
  ```

- Prefer to place `propTypes` and `defaultProps` at the top of your component
> Why? propTypes and defaultProps are a form of documentation. It’s easier for the reader to locate it at the top of the file. This order naturally exists for class components but not for stateless function components.

  ```javascript
  // bad
  function SFC({ foo, bar, children }) {
    return <div>{foo}{bar}{children}</div>;
  }
  SFC.propTypes = {
    foo: PropTypes.number.isRequired,
    bar: PropTypes.string,
    children: PropTypes.node,
  };

  SFC.defaultProps = {
    bar: '',
    children: null,
  };

  export default SFC;

  // good
  const propTypes = {
    foo: PropTypes.number.isRequired,
    bar: PropTypes.string,
    children: PropTypes.node,
  };
  const defaultProps = {
    bar: '',
    children: null,
  };
  function SFC({ foo, bar, children }) {
    return <div>{foo}{bar}{children}</div>;
  }

  SFC.propTypes = propTypes;
  SFC.defaultProps = defaultProps;

  export default SFC;
  ```

### Refs
- Always use ref callbacks. eslint: `[react/no-string-refs](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md)`

  ```javascript
  // bad
  <Foo
    ref="myRef"
  />

  // good
  <Foo
    ref={(ref) => { this.myRef = ref; }}
  />
  ```

### Parentheses
- Wrap JSX tags in parentheses when they span more than one line. eslint: `[react/jsx-wrap-multilines](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-wrap-multilines.md)`

  ```javascript
  // bad
  render() {
    return <MyComponent className="long body" foo="bar">
             <MyChild />
           </MyComponent>;
  }

  // good
  render() {
    return (
      <MyComponent className="long body" foo="bar">
        <MyChild />
      </MyComponent>
    );
  }

  // good, when single line
  render() {
    const body = <div>hello</div>;
    return <MyComponent>{body}</MyComponent>;
  }
  ```

### Tags
- Always self-close tags that have no children. eslint: `[react/self-closing-comp](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md)`

  ```javascript
  // bad
  <Foo className="stuff"></Foo>

  // good
  <Foo className="stuff" />
  ```

- If your component has multi-line properties, close its tag on a new line. eslint: `[react/jsx-closing-bracket-location](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md)`

  ```javascript
  // bad
  <Foo
    bar="bar"
    baz="baz" />

  // good
  <Foo
    bar="bar"
    baz="baz"
  />
  ```

### Methods
- Use arrow functions to close over local variables.

  ```javascript
    function ItemList(props) {
      return (
        <ul>
          {props.items.map((item, index) => (
            <Item
              key={item.key}
              onClick={() => doSomethingWith(item.name, index)}
            />
          ))}
        </ul>
      );
    }
  ```

- Bind event handlers for the render method in the constructor. eslint: `[react/jsx-no-bind](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)`
  > Why? A bind call in the render path creates a brand new function on every single render.

  ```javascript
  // bad
  class extends React.Component {
    onClickDiv() {
      // do stuff
    }

    render() {
      return <div onClick={this.onClickDiv.bind(this)} />;
    }
  }

  // good
  class extends React.Component {
    constructor(props) {
      super(props);

      this.onClickDiv = this.onClickDiv.bind(this);
    }

    onClickDiv() {
      // do stuff
    }

    render() {
      return <div onClick={this.onClickDiv} />;
    }
  }
  ```

- Do not use underscore prefix for internal methods of a React component.
  > Why? Underscore prefixes are sometimes used as a convention in other languages to denote privacy. But, unlike those languages, there is no native support for privacy in JavaScript, everything is public. Regardless of your intentions, adding underscore prefixes to your properties does not actually make them private, and any property (underscore-prefixed or not) should be treated as being public. See issues [#1024](https://github.com/airbnb/javascript/issues/1024), and [#490](https://github.com/airbnb/javascript/issues/490) for a more in-depth discussion.

  ```javascript
  // bad
  React.createClass({
    _onClickSubmit() {
      // do stuff
    },

    // other stuff
  });

  // good
  class extends React.Component {
    onClickSubmit() {
      // do stuff
    }

    // other stuff
  }
  ```
- Be sure to return a value in your `render` methods. eslint: `[react/require-render-return](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-render-return.md)`

  ```javascript
  // bad
  render() {
    (<div />);
  }

  // good
  render() {
    return (<div />);
  }
  ```

### Ordering
- Ordering for `class extends React.Component`:
1. optional `static` methods
2. `constructor`
3. `getChildContext`
4. `componentWillMount`
5. `componentDidMount`
6. `componentWillReceiveProps`
7. `shouldComponentUpdate`
8. `componentWillUpdate`
9. `componentDidUpdate`
10. `componentWillUnmount`
11. *clickHandlers or eventHandlers* like `onClickSubmit()` or `onChangeDescription()`
12. *getter methods for* `*render*` like `getSelectReason()` or `getFooterContent()`
13. *optional render methods* like `renderNavigation()` or `renderProfilePicture()`
14. `render`
- How to define `propTypes`, `defaultProps`, `contextTypes`, etc...

  ```javascript
  import React, { PropTypes } from 'react';

  class Link extends React.Component {
    static propTypes = {
      id: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
      text: PropTypes.string,
    }

    static defaultProps = {
      text: 'Hello World',
    };

    static methodsAreOk() {
      return true;
    }

    render() {
      return <a href={this.props.url} data-id={this.props.id}>{this.props.text}</a>;
    }
  }

  export default Link;
  ```


## Redux

Refer to official Redux guide
http://redux.js.org/

Great article about Redux principles:
http://blog.isquaredsoftware.com/2017/05/idiomatic-redux-tao-of-redux-part-2/

The only thing we do differently is we don’t split redux-related stuff in multiple files and adopted [**ducks**](https://github.com/erikras/ducks-modular-redux)**.**

Example of our duck file:

  ```javascript
  // 1. Import statements
  import { createSelector } from 'reselect';
  import { normalize } from 'normalizr';
  import { denormalize } from 'denormalizr';
  import { LOGOUT } from 'global/App/duck';

  // 2. Action constants (helps action type strings not to clash)
  export const USERS_LOAD_REQUEST = 'app/users/USERS_LOAD_REQUEST';
  export const USERS_LOAD_SUCCESS = 'app/users/USERS_LOAD_SUCCESS';
  export const USERS_LOAD_ERROR = 'app/users/USERS_LOAD_ERROR';

  // 3. Reducer (the default export)
  export default function usersReducer(state = fromJS([]), action) {
    switch (action.type) {
      case USERS_LOAD_SUCCESS:
        return fromJS(action.response.result);
      case LOGOUT:
        return fromJS([]);
      default:
        return state;
    }
  }

  // 4. Action creators
  export function usersLoadSuccess(response) {
    return {
      type: USERS_LOAD_SUCCESS,
      response: normalize(response.users, arrayOfUsers),
    };
  }

  export function userLoadSuccess(response) {
    return {
      type: USER_LOAD_SUCCESS,
      response: normalize(response.user, userSchema),
    };
  }

  export function userLoadRequest(id) {
    return {
      type: USER_LOAD_REQUEST,
      id,
    };
  }

  // 5. Selectors
  export const selectUsersState = () => (state) => state.get('users');

  export const selectAllUsers = () => createSelector(
    selectUsersState(),
    selectEntities(),
    // Denormalizing (transform array of ids into array of objects)
    (userIds, entities) => denormalize(userIds, entities, arrayOfUsers)
      .sortBy(user => `${user.get('first_name')} ${user.get('last_name')}`)
  );

  // 6. Sagas (API calls)
  // The format is being defined
  ```

## ImmutableJS

To add:

- How to use Records
- How to map through objects
- Using `get` and `getIn`
- Using `set` and `setIn`
- What if you need to mutate something (using `update` and `updateIn`). Create additional variables
- http://redux.js.org/docs/recipes/UsingImmutableJS.html

https://github.com/react-boilerplate/react-boilerplate/blob/3fdad6a888b68e2c538dfcd52f4594fea7b9e4d4/docs/js/immutablejs.md


## Normalizr/Denormalizr/Schemas

http://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html

## Reselect

https://github.com/react-boilerplate/react-boilerplate/blob/3fdad6a888b68e2c538dfcd52f4594fea7b9e4d4/docs/js/reselect.md

## Redux Saga

https://github.com/react-boilerplate/react-boilerplate/blob/3fdad6a888b68e2c538dfcd52f4594fea7b9e4d4/docs/js/redux-saga.md

## Routing

https://github.com/react-boilerplate/react-boilerplate/blob/3fdad6a888b68e2c538dfcd52f4594fea7b9e4d4/docs/js/routing.md

## Generating HTML head content

Use [React Helmet](https://github.com/nfl/react-helmet) to add content to page `<head>` (site meta, og tags, titles, etc.)

```js
  <Helmet>
    <title>Page Title!</title>
  </Helmet>
```

Format titles according to [our guide.](/dev-wiki/accessibility/#semantic-markup_title)

## Styling

We’re using SCSS syntax with CSS being loaded by webpack as CSS modules.

## Unit Testing

We’re using [Jest](https://facebook.github.io/jest/) for unit testing
https://github.com/react-boilerplate/react-boilerplate/blob/master/docs/testing/unit-testing.md


## E2E Testing

We’re using [Cypress](https://www.cypress.io/). Ask Igor about how to get an invite to create projects.


## Linting

We’re using [Airbnb ESLint config](https://www.npmjs.com/package/eslint-config-airbnb) with a few modifications.

We encourage to use `[lint-staged](https://github.com/okonet/lint-staged)` on all projects.


> Note: `lint-staged` might not work on projects with git submodules. In this case use `[husky](https://github.com/typicode/husky)` to set up pre-commit hooks.


## Code editor

Most of the devs in our team use Atom for React development.

Required plugins:

- `language-babel` - transpiles ES6 and JSX into ES5 and provides syntax highlighting
- `linter` and `linter-eslint` - provides linting on the fly

Optional plugins:

- `docblockr` - helps writing multiline documentation comments (`/**` + `Tab`)
- `emmet` - awesome CSS autocomplete (e.g. `mr40` → `margin-right: 40px` )
- `js-hyperclick` - `⌘ + click` to open the component file
- `prettier-atom` - smart autoformatting that follows ESLint rules
- `smart-tab-name` - shows meaningful part of the filename in the tab (if opened more than one `index.js` files)
- `nuclide` - additional functionality package from Facebook (https://nuclide.io/docs/platforms/web/#client-side-development) Not much useful now, but will be a big win if we start using Flow

  ```
  # Quick install using apm
  apm install language-babel linter linter-eslint docblockr emmet hyperclick js-hyperclick prettier-atom smart-tab-name
  ```

Prettier-atom configuration:

- Silence Errors: NO
- ESlint integration: YES
- Format on Save: NO (but it’s up to you)
- Ignore Files in .eslintignore: YES
- Single quotes: YES
- Bracket Spacing: YES
- Semicolons: YES
- Use tabs: NO
- JSX Bracket Same Line: NO
- Print Width: 100


## Browser setup

Extensions to install:

- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) - inspect react component tree (state, props), debug rerenderings
- [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) - track dispatched actions, inspect state at any action, track action payload
- [Immutable.js Object Formatter](https://chrome.google.com/webstore/detail/immutablejs-object-format/hgldghadipiblonfkkicmgcbbijnpeog?hl=en) - inspect immutable objects in console or in react props/state


## More things to cover and other ideas:
- Add info about `yarn`
- Add info about `redux-form`?
- Add info about webpack
- Guide to `react-styleguidist` for building on UI Libraries
- Flow instead of PropTypes?
- Fork react-boilerplate with our customizations?
- Improve `npm run generate` with conventions we describe here
- Merge api functions and sagas? Currently it’s a bit redundant, erroneous responses are not handled properly. We can come up with some nice abstraction
- Preconfigure `react-styleguidist`? Add some guides about how to do UI Library development
- Make a list of D7-approved npm packages?
