## Overview

This is a home assignment for Qliro technical position

Total time to implement: ...

### Architecture

App is based on create-react-app, written in Typescript, with Redux (via redux-toolkit) and SCSS styles

## Design choices

### create-react-app

Optimal for small projects, no need to spend time for setup

### redux-toolkit
 Most ergonomic way to use Redux today - immer for data, way less boilerplate than older conventions
 
## Tradeoffs and limitations
 - Not really mobile ready - to save time
 - No unit tests - no complex business logic

## Alternatives

What could've been used

- recoil for state - less boilerplate and better performance than redux, but less mature right now
- Any CSS-in-js solution for styles - no separation between styles and code, similar to JSX vs separate templates
