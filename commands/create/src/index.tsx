import React from 'react';
import { render } from 'ink';

import { getWorkspacesInfo } from '@unscripted/utils';
import { Create } from './Create';

const info = getWorkspacesInfo(process.cwd()) || { workspaces: {} };

render(<Create workspaces={info.workspaces}/>);
