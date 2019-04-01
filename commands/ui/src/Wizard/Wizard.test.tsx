import React from 'react';
import strip from 'strip-ansi';
import { render, cleanup } from 'ink-testing-library';

import { Wizard } from './Wizard';
import { WizardQuestion } from './useWizard';

const questions: WizardQuestion[] = [
  {
    message: 'Enter a string:',
    name: 'first',
    type: 'text',
  },
  {
    message: 'Choose an option:',
    name: 'second',
    type: 'select',
    items: [
      {
        label: 'Foo',
        value: 'foo',
      },
      {
        label: 'Bar',
        value: 'bar',
      },
    ],
  },
];
const done = jest.fn();

beforeEach(() => {
  done.mockClear();
});

afterEach(cleanup);

test('render first question', () => {
  const { lastFrame } = render(<Wizard questions={questions} onDone={done} />);
  expect(strip(lastFrame())).toMatchInlineSnapshot(`"Enter a string:  "`);
});

test('render answers and current question', () => {
  const { lastFrame, stdin } = render(
    <Wizard questions={questions} onDone={done} />
  );

  stdin.write('hello world');
  stdin.write('\r');

  expect(strip(lastFrame())).toMatchInlineSnapshot(`
"Enter a string: hello world
Choose an option:
❯ Foo
  Bar"
`);
});

test('render answers when no question is left to answer', () => {
  const { lastFrame, stdin } = render(
    <Wizard questions={questions} onDone={done} />
  );

  stdin.write('hello world');
  stdin.write('\r');
  stdin.write('\r');

  expect(strip(lastFrame())).toMatchInlineSnapshot(`
"Enter a string: hello world
Choose an option: foo"
`);
});

// Currently not testable, since `ink-testing-library` has no `act` helper?
test.skip('call "onDone" with answers after all questions have been answered', () => {
  const { stdin } = render(<Wizard questions={questions} onDone={done} />);

  stdin.write('hello world');
  stdin.write('\r');
  stdin.write('\r');

  expect(done).toHaveBeenCalledWith({ first: 'hello world' });
});
