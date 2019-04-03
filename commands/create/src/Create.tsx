import React from 'react';

import { YarnWorkspace } from '@unscripted/utils';
import { Wizard, WizardQuestion, WizardResult } from '@unscripted/ui';

export type CreateProps = {
  exit: () => void;
  workspaces: {
    [name: string]: YarnWorkspace;
  };
};

export const Create: React.FC<CreateProps> = ({ workspaces, exit }) => {
  const done = (result: WizardResult) => {
    process.stdin.write(JSON.stringify(result));
    exit();
  };

  const validate = (val: string) => {
    if (val in workspaces) {
      return 'An module with that name already exists.';
    }

    return true;
  };

  const questions: WizardQuestion[] = [
    {
      message: 'Enter module name:',
      name: 'name',
      type: 'text',
      validate,
    },
    {
      message: 'Select location:',
      name: 'location',
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

  return <Wizard questions={questions} onDone={done} />;
};
