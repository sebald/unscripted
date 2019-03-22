import React from 'react';

import { YarnWorkspace } from '@unscripted/utils';
import { Wizard, WizardQuestion, WizardResult } from '@unscripted/ui';

export type CreateProps = {
  exit: () => void;
  workspaces: {
    [name: string]: YarnWorkspace;
  };
};

export const Create: React.FC<CreateProps> = ({ exit }) => {
  // Const validate = (val: string) => {
  //   const ws = workspaces[val];
  //   return ws ? 'An module with that name already exists.' : true;
  // };

  const done = (result: WizardResult) => {
    process.stdin.write(JSON.stringify(result));
    exit();
  };

  const questions: WizardQuestion[] = [
    {
      label: 'Enter module name:',
      name: 'name',
      type: 'text',
    },
    {
      label: 'Enter location:',
      name: 'location',
      type: 'text',
    },
  ];

  return <Wizard questions={questions} onDone={done}/>;
};
