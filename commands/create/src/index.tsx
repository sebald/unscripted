import React from 'react';
import { render, AppContext } from 'ink';

import { getWorkspacesInfo } from '@unscripted/utils';
import { Create } from './Create';

const { workspaces } = getWorkspacesInfo(process.cwd()) || { workspaces: {} };

render(
  <AppContext.Consumer>
    {({ exit }) => <Create workspaces={workspaces} exit={exit} />}
  </AppContext.Consumer>
);
