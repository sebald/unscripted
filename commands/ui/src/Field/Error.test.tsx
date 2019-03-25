import React from 'react';
import strip from 'strip-ansi';
import { render, cleanup } from 'ink-testing-library';

import { ErrorBox } from './Error';

afterEach(cleanup);

test('render error', () => {
  const { lastFrame } = render(<ErrorBox error />);
  expect(strip(lastFrame())).toMatchInlineSnapshot(`"✖ Invalid input."`);
});

test('render error with custom message', () => {
  const { lastFrame } = render(<ErrorBox error="Whoops!" />);
  expect(strip(lastFrame())).toMatchInlineSnapshot(`"✖ Whoops!"`);
});

test('render no error', () => {
  const { lastFrame } = render(<ErrorBox error={false} />);
  expect(strip(lastFrame())).toMatchInlineSnapshot(`""`);
});
