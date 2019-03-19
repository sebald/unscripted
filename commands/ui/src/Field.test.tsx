import React from 'react';
import strip from 'strip-ansi';
import { render, cleanup } from 'ink-testing-library';

import { Field } from './Field';

afterEach(() => {
  cleanup();
});

test('render field', () => {
  const { lastFrame } = render(
    <Field label="Label" initialValue="foo" onSubmit={jest.fn()} />
  );
  expect(strip(lastFrame())).toMatchInlineSnapshot(`"Label: foo"`);
});

test('render field', () => {
  const { lastFrame } = render(
    <Field label="Label" initialValue="bar" onSubmit={jest.fn()} />
  );
  expect(strip(lastFrame())).toMatchInlineSnapshot(`"Label: bar"`);
});
