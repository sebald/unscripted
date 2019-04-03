import React from 'react';
import { render, AppContext } from 'ink';

import { getWorkspacesInfo } from '@unscripted/utils';
import { Create } from './Create';

const { workspaces, locations } = getWorkspacesInfo(process.cwd()) || {
  workspaces: {},
  locations: [],
};

render(
  <AppContext.Consumer>
    {({ exit }) => (
      <Create workspaces={workspaces} locations={locations} exit={exit} />
    )}
  </AppContext.Consumer>
);
