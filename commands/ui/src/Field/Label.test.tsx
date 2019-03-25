import React from 'react';
import strip from 'strip-ansi';
import { render, cleanup } from 'ink-testing-library';

import { Label } from './Label';

afterEach(cleanup);

test('render label', () => {
  const { lastFrame } = render(<Label>This is a label</Label>);
  expect(strip(lastFrame())).toMatchInlineSnapshot(`"This is a label"`);
});

test('render label with color', () => {
  const { lastFrame } = render(<Label>This is a label</Label>);
  expect(lastFrame()).toMatchInlineSnapshot(`"[36mThis is a label[39m"`);
});
