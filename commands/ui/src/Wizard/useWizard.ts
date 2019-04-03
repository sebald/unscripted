import { useState } from 'react';
import { FieldValidation } from '../Field';

// Types
// ---------------
export type WizardQuestion =
  | {
      message: string;
      type: 'text';
      name: string;
      initialValue?: string;
      validate?: (value: string) => FieldValidation;
    }
  | {
      message: string;
      type: 'select';
      name: string;
      initialValue?: string;
      items: { label: string; value: string }[];
    };

export type WizardAnswer = { [name: string]: string };

export type WizardState = {
  idx: number;
  done: boolean;
  answers: WizardAnswer;
};

// Hook
// ---------------
export const useWizard = (questions: WizardQuestion[]) => {
  const [state, setState] = useState<WizardState>({
    idx: 0,
    done: false,
    answers: {},
  });

  const submit = (value: string) => {
    const idx = state.idx + 1;
    const name = questions[state.idx].name;
    setState({
      idx,
      done: idx === questions.length,
      answers: { ...state.answers, [name]: value },
    });
  };

  return [state, submit] as [WizardState, typeof submit];
};
