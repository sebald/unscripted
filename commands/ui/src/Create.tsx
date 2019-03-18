import { Box, Color } from 'ink';
import TextInput from 'ink-text-input';
import React, { useState } from 'react';

import { YarnWorkspace } from '@unscripted/utils';

export type CreateProps = {
  workspaces: {
    [name: string]: YarnWorkspace;
  };
};

export const Create: React.FC<CreateProps> = ({ workspaces }) => {
  const [moduleName, setModuleName] = useState('');
  const error = Boolean(workspaces[moduleName]);

  return (
    <Box>
      <Box marginRight={1}>
        <Color green>Enter name of new module:</Color>
      </Box>
      <Box flexGrow={1}>
        <TextInput value={moduleName} onChange={setModuleName} />
      </Box>
      {error && (
        <Box>
          <Color redBright bold>
            🚨 An module with that name already exists.
          </Color>
        </Box>
      )}
    </Box>
  );
};
