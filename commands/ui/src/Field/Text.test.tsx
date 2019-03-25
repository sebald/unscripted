import React from 'react';
import strip from 'strip-ansi';
import { render, cleanup } from 'ink-testing-library';

import { TextField } from './Text';

afterEach(cleanup);

test('render text field', () => {
  const { lastFrame } = render(
    <TextField label="Label:" initialValue="foo" onSubmit={jest.fn()} />
  );
  expect(strip(lastFrame())).toMatchInlineSnapshot(`"Label: foo "`);
});

test('handle input', () => {
  const { lastFrame, stdin } = render(
    <TextField label="Label:" onSubmit={jest.fn()} />
  );

  expect(strip(lastFrame())).toMatchInlineSnapshot(`"Label:  "`);

  stdin.write('hello');
  expect(strip(lastFrame())).toMatchInlineSnapshot(`"Label: hello "`);
});

test('calls "onSubmit" handler when input is valid', () => {
  const submit = jest.fn();
  const { stdin } = render(<TextField label="Label:" onSubmit={submit} />);

  stdin.write('some input');
  stdin.write('\r');
  expect(submit).toHaveBeenCalledWith('some input');
});

test('validate input', () => {
  const { lastFrame, stdin } = render(
    <TextField
      label="Label:"
      onSubmit={jest.fn()}
      validate={val => val.length > 3}
    />
  );

  stdin.write('fo');
  stdin.write('\r');
  expect(strip(lastFrame())).toMatch('Invalid input');

  stdin.write('foooo');
  stdin.write('\r');
  expect(strip(lastFrame())).not.toMatch('Invalid input');
});
