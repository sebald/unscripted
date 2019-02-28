const restrictedGlobals = require('confusing-browser-globals');

module.exports = {
  root: true,

  env: {
    browser: true,
    jest: true,
    node: true,
  },
  plugins: ['jest'],
  extends: [
    'plugin:jest/recommended',
    'xo',
    'xo-typescript',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  rules: {
    'no-restricted-globals': ['error'].concat(restrictedGlobals),
  },
};
