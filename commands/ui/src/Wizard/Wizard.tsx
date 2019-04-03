import React, { useEffect } from 'react';

import { Question } from './Question';
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
  const question = questions[idx];

  useEffect(() => {
    if (done) {
      onDone(answers);
    }
  }, [answers, done, onDone]);

  return (
    <>
      {questions.slice(0, idx).map(q => (
        <Question
          key={q.name}
          type="static"
          message={q.message}
          value={answers[q.name]}
        />
      ))}
      {question && (
        <Question key={question.name} onSubmit={submit} {...question} />
      )}
    </>
  );
};
