import execa from 'execa';
import path from 'path';
import { sync as readJson } from 'load-json-file';
import { EOL } from 'os';

import { YarnWorkspaceInfo, YarnWorkspacesStdout, PackageJson } from './types';

/**
 * Re-export types for easy access.
 */
export { YarnWorkspaceInfo, YarnWorkspacesStdout, PackageJson };

/**
 * Try to read `package.json` in the current directory (`cwd`).
 *
 * @param cwd current working directory
 */
export const readPackage = (cwd: string): PackageJson | null => {
  try {
    return readJson(path.join(cwd, 'package.json'));
  } catch {
    return null;
  }
};

/**
 * Search updwards from `cwd` and find the closest workspace root.
 * Adapted from: https://github.com/yarnpkg/yarn/blob/master/src/config.js#L768-L792
 *
 * @param cwd current working directory
 */
export const findWorkspaceRoot = (cwd: string): string | null => {
  let previous = null;
  let current = path.normalize(cwd);

  while (current !== previous) {
    const pkg = readPackage(current);
    const ws = pkg && pkg.workspaces;
    if (ws) {
      const relativePath = path.relative(current, cwd);
      if (relativePath === '' || ws.length > 0) {
        return current;
      }

      return null;
    }

    previous = current;
    current = path.dirname(current);
  }

  return null;
};

/**
 * Get yarn workspace information.
 * Will throw if used in a project that does not have workspaces enabled.
 *
 * @param cwd current working directory
 */
export const getWorkspacesInfo = (cwd: string): YarnWorkspaceInfo | null => {
  const root = findWorkspaceRoot(cwd);

  // Bail early, if no workspace can be found.
  if (root === null) {
    return null;
  }

  /**
   * The first `log.data` ing `output` will contain the workspaces information.
   * If there is no "log" message, there are no workspaces.
   */
  const output = execa
    .sync('yarn', ['workspaces', 'info', '--json'], { cwd: root })
    .stdout.split(EOL)
    .map(line => JSON.parse(line) as YarnWorkspacesStdout);
  const info = output.find(item => item.type === 'log');

  return info
    ? {
        path: root,
        workspaces: JSON.parse(info.data),
      }
    : null;
};
