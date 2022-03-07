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
