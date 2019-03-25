import { act, cleanup, renderHook } from 'react-hooks-testing-library';
import { useWizard, WizardQuestion } from './useWizard';

const QUESTIONS: WizardQuestion[] = [
  {
    name: 'animal',
    message: 'What is your favorite animal?',
    type: 'text',
  },
  {
    name: 'food',
    message: 'What is your favorite ice food?',
    type: 'text',
  },
];

afterEach(cleanup);

test('initialize state', () => {
  const { result } = renderHook(() => useWizard(QUESTIONS));
  const [state] = result.current;

  expect(state.idx).toEqual(0);
  expect(state.done).toBeFalsy();
  expect(state.answers).toEqual({});
});

test('submit an answer', () => {
  const { result } = renderHook(() => useWizard(QUESTIONS));
  act(() => result.current[1]('🦄'));

  const [state] = result.current;
  expect(state.idx).toEqual(1);
  expect(state.done).toBeFalsy();
  expect(state.answers).toEqual({ animal: '🦄' });
});

test('all questions answered', () => {
  const { result } = renderHook(() => useWizard(QUESTIONS));
  act(() => result.current[1]('🦄'));
  act(() => result.current[1]('🍨'));

  const [state] = result.current;
  expect(state.idx).toEqual(2);
  expect(state.done).toBeTruthy();
  expect(state.answers).toEqual({ animal: '🦄', food: '🍨' });
});
