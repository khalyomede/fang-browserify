# Fang Browserify

[Fang](https://www.npmjs.com/package/@khalyomede/fang) plugin to use browserify.

## Summary

- [Installation](#installation)
- [Usage](#usage)

## Installation

1. Install [fang](https://www.npmjs.com/package/@khalyomede/fang)

```bash
npm install --save-dev @khalyomede/fang@0.*
```

2. Install this package

```bash
npm install --save-dev @khalyomede/fang-browserify@0.*
```

3. Create a script alias

```javascript
// package.json
{
  "scripts": {
    "fang": "fang"
  }
}
```

4. Create a task file (at the root of your folder)

```javascript
// fang.js
const fang = require('@khalyomede/fang');
const browserify = require('@khalyomede/fang-browserify');

const js = () => fang.from('src/js/**/*.js')
  .do(browserify())
  .save('dist/js');

const build = [js];

module.exports = { build };
```

## Usage

- [Example 1: simple usage](#example-1-simple-usage)
- [Example 2: with options](#example-2-with-options)

### Example 1: simple usage

In this example, we will convert our modules imports into a browser-compatible javascript code.

```javascript
// fang.js
const fang = require('@khalyomede/fang');
const browserify = require('@khalyomede/fang-browserify');

const js = () => fang.from('src/js/**/*.js')
  .do(browserify())
  .save('dist/js');

const build = [js];

module.exports = { build };
```

### Example 2: with options

In this example, we are using some of the options provided by browserify to customize the behavior of this module.

```javascript
const fang = require('@khalyomede/fang');
const browserify = require('@khalyomede/fang-browserify');

const js = () => fang.from('src/js/**/*.js')
  .do(browserify({
    debug: true // add a soure map inlined at the end of the file
  }))
  .save('dist/js');
```
