import React from 'react';
import { render, AppContext, Color } from 'ink';

import { getWorkspacesInfo } from '@unscripted/utils';
import { Create } from './Create';

const info = getWorkspacesInfo(process.cwd());

render(
  info ? (
    <AppContext.Consumer>
      {({ exit }) => <Create info={info} exit={exit} />}
    </AppContext.Consumer>
  ) : (
    <Color redBright>
      Only repositories with workspaces are currently supported!
    </Color>
  )
);
