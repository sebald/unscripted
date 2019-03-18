// import { getWorkspacesInfo } from '@unscripted/utils';
import { Box, Color } from 'ink';
import TextInput from 'ink-text-input';
import React, { useState } from 'react';
import { YarnWorkspaceInfo } from '@unscripted/utils/types';

export type CreateProps = {
  workspaces?: YarnWorkspaceInfo;
};

export const Create: React.FC<CreateProps> = ({ cwd }) => {
  const workspaces = getWorkspacesInfo(cwd);
  const [moduleName, setModuleName] = useState('');

  return (
    <Box>
      <Box marginRight={1}>
        <Color green>Enter name of new module:</Color>
      </Box>
      <TextInput value={moduleName} onChange={setModuleName} />
    </Box>
  );
};
