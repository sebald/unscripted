const createConfig = require('./create');

module.exports = createConfig(['xo-react/space'], {
  /**
   * Propt type validation is done via TypeScript.
   */
  'react/prop-types': 'off',

  /**
   * Taken care of by `prettier`.
   */
  'react/jsx-tag-spacing': 'off',

  /**
   * Don't bother with stylistic rules.
   */
  'react/jsx-sort-props': 'off',

  /**
   * Enforcing return types is annoying with React and TS,
   * since usually you're using `React.FC` anyway.
   */
  '@typescript-eslint/explicit-function-return-type': 'off',
});
