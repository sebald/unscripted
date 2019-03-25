import React, { useEffect } from 'react';
import { Field } from '../Field/Field';
import { useWizard, WizardQuestion } from './useWizard';

// Types
// ---------------
export type WizardResult<Keys extends string = string> = {
  // eslint-disable-next-line @typescript-eslint/generic-type-naming
  [name in Keys]: string
};

export type WizardProps = {
  questions: WizardQuestion[];
  onDone: <Keys extends string = string>(result: WizardResult<Keys>) => any;
};

// Component
// ---------------
export const Wizard: React.FC<WizardProps> = ({ questions, onDone }) => {
  const [{ answers, done, idx }, submit] = useWizard(questions);
  useEffect(() => {
    if (done) {
      onDone(answers);
    }
  }, [answers, done, onDone]);

  const question = questions[idx];

  return (
    <>
      {questions.slice(0, idx).map(q => (
        <Field
          key={q.name}
          label={q.message}
          initialValue={answers[q.name]}
          focus={false}
        />
      ))}
      {question && (
        <Field
          key={question.name}
          label={question.message}
          initialValue={question.initialValue}
          onSubmit={submit}
        />
      )}
    </>
  );
};
