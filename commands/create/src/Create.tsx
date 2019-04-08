import React, { useState, useEffect } from 'react';
import path from 'path';
import { Box } from 'ink';

import { YarnWorkspaceInfo } from '@unscripted/utils';
import { Spinner, Wizard, WizardQuestion } from '@unscripted/ui';
import { createModule } from './create-module';

export type CreateCommandState =
  | {
      type: 'init';
      data: null;
    }
  | {
      type: 'answered';
      data: Record<'name' | 'description' | 'location', string>;
    }
  | {
      type: 'creating';
      data: null;
    }
  | {
      type: 'success';
      data: null;
    };

export type CreateProps = {
  exit: () => void;
  info: YarnWorkspaceInfo;
};

export const Create: React.FC<CreateProps> = ({ info, exit }) => {
  const { workspaces, locations } = info;
  const [state, setState] = useState<CreateCommandState>({
    type: 'init',
    data: null,
  });

  useEffect(() => {
    if (state.type === 'answered') {
      const create = async () => {
        setState({ type: 'creating', data: null });
        await createModule({
          module: state.data,
          info,
        });
        setState({ type: 'success', data: null });
      };

      create();
    }
  }, [info, state]);

  useEffect(() => {
    if (state.type === 'success') {
      exit();
    }
  }, [exit, state.type]);

  const questions: WizardQuestion[] = [
    {
      message: 'Enter module name:',
      name: 'name',
      type: 'text',
      validate(val: string) {
        if (val in workspaces) {
          return 'An module with that name already exists.';
        }

        return true;
      },
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

  return (
    <>
      <Wizard
        questions={questions}
        onDone={result =>
          setState({
            type: 'answered',
            data: result as any,
          })
        }
      />
      {state.type === 'creating' && <Spinner>Creating module ...</Spinner>}
      {state.type === 'success' && <Box>DONE!</Box>}
    </>
  );
};
