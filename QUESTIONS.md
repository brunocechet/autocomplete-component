# Questions

## 1. What is the difference between Component and PureComponent? give an example where it might break my app

- the main difference is PureComponent does a shallow comparison on state change, so when it's comparing objects it compares only references;
- we should only use PureComponents without complex data structures in the state, otherwise it will produce false negatives.
- every component under a PureComponent should also be a PureComponent;
- PureComponents skips props updates;

## 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

- every component that listen a context should re-render when any value from that context changes;
- ShouldComponentUpdate is a method of class components that controls if a component needs to re-rendered, if ShouldComponentUpdate returns false without considering Context changes that component will break the chain of re-rendering leading to outdates values in the UI.

### 3. Describe 3 ways to pass information from a component to its PARENT

- by useImperativeHandle
- by providing params to handle functions
- by implementing Context API

### 4. Give 2 ways to prevent components from re-rendering

- setup correctly callbacks/handlers with React.useCallback
- with React.memo
- with React.useMemo

### 5. What is a fragment and why do we need it? Give an example where it might break my app

- every component should return one single node on render, Fragment is useful for wrapping child components in order to return one single node;
- with React.Fragment we can provide a key, differently from the shorthand version;
- working with Fragment instead of div (for example) prevents creation of unnecessary DOM nodes, which affects the performance (specially on old devices);
  
### 6. Give 3 examples of the HOC pattern

- High Order Components are used to enhance a component;
- examples:
  - - wrapping with a visibility manager like an Accordion;
  - - injecting a logger callback as a prop;
  - - connect HOC from redux;
  - - withRouter HOC from react-router-dom;

### 7. what's the difference in handling exceptions in promises, callbacks and async...await

- in general/callbacks:
  - - `try...catch` to capture exceptions (capture in `try`, handle in `catch`);
  - - `catch` provides an argument of the type `Error` with more details about the exception;
  - - we can suppress the error in the `catch` block (not recommended) or even mask it properly;

- promises: we can handle exceptions with `throw new Error()` or by calling the reject callback; we can provide a `.catch` when calling a promise;

- async...await: there is no `.catch` block like promises, we should wrap the calling with a `try...catch` block;

### 8. How many arguments does setState take and why is it async

- setState has only one argument, might be a new value or a function which returns that new value and receives as only parameter the previous value
- it's async because updates are batched to improve performance

### 9. List the steps needed to migrate a Class to Function Component

- convert the class syntax to a function syntax (remove constructor, extends, class keyword);
- use the content of the render method as return value of your new function;
- check/remove `this.`;
- convert class methods to handlers (probably with React.useCallback hook);
- convert `state` using `useState` hook, probably it will be necessary to decompose/split if we have a complex object;
- destruct `props`;

### 10. List a few ways styles can be used with components

- JSS with className;
- CSS with className;
- inline with style object formatted in camelCase;

### 11. How to render an HTML string coming from the server

- with ReactDOMServer;
- dangerouslySetInnerHTML (need to sanitize properly);
- by removing html tags (probably with regular expression or string.split), iterating and mapping to return a list of React Nodes;
