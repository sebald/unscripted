import React from 'react';
import { render, cleanup } from 'ink-testing-library';

import * as Field from '../Field';
import { Question } from './Question';

jest.mock('../Field');
(Field.ReadOnly as jest.Mock).mockImplementation(() => null);
(Field.Text as jest.Mock).mockImplementation(() => null);
(Field.Select as jest.Mock).mockImplementation(() => null);

beforeEach(() => {
  (Field.ReadOnly as jest.Mock).mockClear();
  (Field.Text as jest.Mock).mockClear();
  (Field.Select as jest.Mock).mockClear();
});

afterEach(cleanup);

test('render question (type=static)', () => {
  render(<Question type="static" message="Message" value="Value" />);
  expect(Field.ReadOnly).toHaveBeenCalledWith(
    {
      label: 'Message',
      value: 'Value',
    },
    expect.any(Object) // React context
  );
});

test('render question (type=text)', () => {
  const submit = jest.fn();
  render(
    <Question
      type="text"
      message="Message"
      initialValue="Value"
      onSubmit={submit}
    />
  );
  expect(Field.Text).toHaveBeenCalledWith(
    { initialValue: 'Value', label: 'Message', onSubmit: submit },
    expect.any(Object) // React context
  );
});

test('render question (type=select)', () => {
  const submit = jest.fn();
  render(
    <Question
      type="select"
      message="Message"
      items={[{ label: 'One', value: 'one' }]}
      initialValue="one"
      onSubmit={submit}
    />
  );
  expect(Field.Select).toHaveBeenCalledWith(
    {
      initialValue: 'one',
      items: [
        {
          label: 'One',
          value: 'one',
        },
      ],
      label: 'Message',
      onSubmit: expect.any(Function),
    },
    expect.any(Object) // React context
  );
});

test('selecting an item calls `onSubmit`', () => {
  const submit = jest.fn();
  render(
    <Question
      type="select"
      message="Message"
      items={[{ label: 'One', value: 'one' }]}
      initialValue="one"
      onSubmit={submit}
    />
  );

  const { onSubmit } = (Field.Select as jest.Mock).mock.calls.pop()[0];
  onSubmit({ label: 'One', value: 'one' });

  expect(submit).toHaveBeenCalledWith('one');
});
