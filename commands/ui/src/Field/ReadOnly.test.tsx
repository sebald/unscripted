import React from 'react';
import strip from 'strip-ansi';
import { render, cleanup } from 'ink-testing-library';

import { ReadOnly } from './ReadOnly';

afterEach(cleanup);

test('render readonly', () => {
  const { lastFrame } = render(<ReadOnly label="Label" />);
  expect(strip(lastFrame())).toMatchInlineSnapshot(`"Label"`);
});

test('render readonly with value', () => {
  const { lastFrame } = render(<ReadOnly label="Label" value="Value!" />);
  expect(strip(lastFrame())).toMatchInlineSnapshot(`"Label Value!"`);
});
