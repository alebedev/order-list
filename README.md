## Overview

This is a home assignment for Qliro technical position

Overall philosophy: simplest thing that would work

## Usage

```bash
# Installation
yarn install

# Open in browser
yarn start

# Tests
yarn test

# Build and verify
yarn build
```

### Architecture

App is based on create-react-app, written in Typescript, with Redux (via redux-toolkit) and SCSS styles

## Design choices

### create-react-app

Optimal for small projects, no need to spend time for setup

### redux-toolkit

Most ergonomic way to use Redux today - immer for data, way less boilerplate than older conventions

### redux-thunk

Came with template. Not enough async parts to justify redux-saga

### No UI toolkit

Assuming that building basic UI elements is one of the goals of this assignment. In real life we'd be using some ui
toolkit for basic elements

## Tradeoffs and limitations

Time-saving compromises

- Not really mobile ready
- Only tested in Chrome
- Default eslint config
- No i18n
- No accessibility
- No money formatting
- Orders page size is hardcoded
- Hardcoded sizes / margins
- No e2e tests (does not make sense with mock backend, we already have integration tests)

Other

- Assuming we have user data at start - ensured by auth and routing in real app

## Alternatives

What could've been used

- recoil for state - less boilerplate and better performance than redux, but less mature right now
- CSS modules - prevents name clashes in CSS
- Any CSS-in-js solution for styles - no separation between styles and code, similar to JSX vs separate templates

## Notes on UI

- Header - called "Header+search" in Figma, but there's no search
- Link style - did it according to figma but hover / pressed effects look funny. Probably there should be another set of
  colors for forest green links
