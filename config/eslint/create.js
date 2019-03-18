const restrictedGlobals = require('confusing-browser-globals');

/**
 * Create eslint config from sensible default.
 * Makes sure, prettier is always applied last.
 *
 * @param {string[]} extra additional eslint configs
 * @param {Object} rules additional or adjusted rules
 */
module.exports = (extra = [], rules = {}) => {
  return {
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
      ...extra,
      'prettier',
      'prettier/@typescript-eslint',
    ],
    rules: {
      'no-restricted-globals': ['error'].concat(restrictedGlobals),
      ...rules,
    },
  };
};
