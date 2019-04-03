import React from 'react';
import path from 'path';

import { YarnWorkspace } from '@unscripted/utils';
import { Wizard, WizardQuestion, WizardResult } from '@unscripted/ui';

export type CreateProps = {
  exit: () => void;
  workspaces: {
    [name: string]: YarnWorkspace;
  };
  locations: string[];
};

export const Create: React.FC<CreateProps> = ({
  workspaces,
  locations,
  exit,
}) => {
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
      message: 'Select workspace:',
      name: 'location',
      type: 'select',
      items: locations.map(value => ({
        label: value.split(path.sep).pop()!,
        value,
      })),
    },
  ];

  return <Wizard questions={questions} onDone={done} />;
};
