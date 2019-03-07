/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
import { resolve } from 'path';
const { readConfig } = require('jest-config');

import { config } from './config';

test('jest config', () => {
  const { hasDeprecationWarnings, projectConfig } = readConfig(
    { config },
    resolve(__dirname, '..')
  );

  expect(hasDeprecationWarnings).toBeFalsy();
  expect(projectConfig).toEqual(expect.any(Object));
});
