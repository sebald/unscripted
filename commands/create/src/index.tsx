import React from 'react';
import { render } from 'ink';

import { getWorkspacesInfo } from '@unscripted/utils';
import { Create } from './Create';

const workspaces = getWorkspacesInfo(process.cwd());

render(<Create cwd={process.cwd()} />);
