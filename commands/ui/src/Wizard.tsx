import React, { useState, useEffect } from 'react';
import { Field } from './Field';

// Types
// ---------------
export type WizardQuestion = {
  name: string;
  type: 'text';
  label: string;
  initialValue?: string;
};

export type WizardResult = {
  [name: string]: string;
};

export type WizardAnswer = { name: string; label: string; value: string };

export type WizardState = {
  idx: number;
  done: boolean;
  answers: WizardAnswer[];
  question?: WizardQuestion;
};

// Hook
// ---------------
export const useWizard = (questions: WizardQuestion[]) => {
  const [state, setState] = useState<WizardState>({
    idx: 0,
    done: false,
    answers: [],
    question: questions[0],
  });

  const submit = (name: string, value: string) => {
    const idx = state.idx + 1;
    setState({
      idx,
      done: idx === questions.length,
      answers: [
        ...state.answers,
        { name, value, label: questions[state.idx].label },
      ],
      question: questions[idx],
    });
  };

  return [state, submit] as [WizardState, typeof submit];
};

// Component
// ---------------
export type WizardProps = {
  questions: WizardQuestion[];
  onDone: (result: WizardResult) => any;
};

export const Wizard: React.FC<WizardProps> = ({ questions, onDone }) => {
  const [{ answers, question, done }, submit] = useWizard(questions);
  useEffect(() => {
    if (done) {
      const result = answers.reduce(
        (o, { name, value }) => {
          o[name] = value;
          return o;
        },
        {} as WizardResult
      );
      onDone(result);
    }
  }, [answers, done, onDone]);

  return (
    <>
      {answers.map(answer => (
        <Field
          key={answer.name}
          label={answer.label}
          initialValue={answer.value}
          focus={false}
        />
      ))}
      {question && (
        <Field
          key={question.name}
          label={question.label}
          initialValue={question.initialValue}
          onSubmit={val => submit(question.name, val)}
        />
      )}
    </>
  );
};
