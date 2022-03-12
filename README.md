# RiVE - Effortless React Library Development Experience

## Features

- zero-config needed
- lightning fast speed
- support TypeScript and bundle a single .d.ts
- support Sass, Less, styled-components
- enforced coding style with ESLint, Stylelint and Prettier
- output ESM and CJS formats (sorry UMD, you are too old)

## Getting Started

### Create New Projects

```
npx rive new my-react-lib
```

### Migrate Old Projects

```
npx rive init
```

## Configurations

### Browser Compatibility

Default:

```jsonc
{
  "browserslist": ["defaults", "not IE 11", "maintained node versions"]
}
```

See <https://github.com/browserslist/browserslist>

## Inspired by

The creation of RiVE is inspired by the following open source projects:

- tsdx: zero-config build tool for React library development
- f2elint: all-in-one front-end code linter from Alibaba
