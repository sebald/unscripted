import React from 'react';
import { render, AppContext } from 'ink';

import { getWorkspacesInfo } from '@unscripted/utils';
import { Create } from './Create';

const info = getWorkspacesInfo(process.cwd()) || { workspaces: {} };

render(
  <AppContext.Consumer>
    {({ exit }) => <Create workspaces={info.workspaces} exit={exit}/>}
  </AppContext.Consumer>
);
