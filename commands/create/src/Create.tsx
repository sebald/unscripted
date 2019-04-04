import React from 'react';
import path from 'path';

import { YarnWorkspaceInfo } from '@unscripted/utils';
import { Wizard, WizardQuestion } from '@unscripted/ui';
import { createModule } from './create-module';

export type CreateProps = {
  exit: () => void;
  info: YarnWorkspaceInfo;
};

export const Create: React.FC<CreateProps> = ({ info, exit }) => {
  const { workspaces, locations } = info;

  const done = async (
    result: Record<'name' | 'description' | 'location', string>
  ) => {
    await createModule({
      module: result,
      info,
    });
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
      items: locations
        .map(value => ({
          label: value.split(path.sep).pop()!,
          value,
        }))
        // Sort alphabetically
        .sort((a, b) => a.label.localeCompare(b.label)),
    },
  ];

  return <Wizard questions={questions} onDone={done} />;
};
