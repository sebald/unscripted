import React from 'react';
import path from 'path';

import { YarnWorkspace } from '@unscripted/utils';
import { Wizard, WizardQuestion } from '@unscripted/ui';
import { createModule, ModuleConfig } from './create-module';

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
  const done = async (result: ModuleConfig) => {
    process.stdin.write(JSON.stringify(result));
    await createModule(result);
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
      message: 'Enter module description:',
      name: 'description',
      type: 'text',
    },
    {
      message: 'Select location:',
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
