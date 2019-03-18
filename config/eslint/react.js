const createConfig = require('./create');

module.exports = createConfig(['xo-react/space'], {
  /**
   * Enforcing return types is annoying with React and TS,
   * since usually you're using `React.FC` anyway.
   */
  '@typescript-eslint/explicit-function-return-type': 'off',
});
