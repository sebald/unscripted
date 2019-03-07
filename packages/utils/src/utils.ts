import execa from 'execa';
import find from 'find-up';
import { dirname } from 'path';
import { EOL } from 'os';

/**
 * Get the root directory of a project (where a `package.json` can be found).
 *
 * @param cwd current working directory
 */
export const getProjetRoot = async (cwd: string): Promise<string | null> => {
  const pkg = await find('package.json', { cwd });
  return pkg ? dirname(pkg) : null;
};

/**
 * Yarn workspace information.
 */
export type YarnWorkspace = {
  location: string;
  workspaceDependencies: string[];
  mismatchedWorkspaceDependencies: string[];
};

/**
 * Map of yarn workspaces.
 */
export type YarnWorkspaces = { [name: string]: YarnWorkspace };

/**
 * Yarn workspaces stdout.
 */
export type YarnWorkspacesStdout = {
  type: 'error' | 'info' | 'log';
  data: string;
};

/**
 * Get yarn workspaces. Will throw if used in a project that does not
 * have workspaces enabled.
 *
 * @param cwd current working directory
 */
export const getWorkspaces = (cwd: string): YarnWorkspaces | null => {
  const output = execa
    .sync('yarn', ['workspaces', 'info', '--json'], { cwd })
    .stdout.split(EOL)
    .map(line => JSON.parse(line) as YarnWorkspacesStdout);

  /**
   * The first `log.data` will contain the workspaces information.
   * If there is no "log" message, there are no workspaces.
   */
  const info = output.find(item => item.type === 'log');
  return info ? JSON.parse(info.data) : null;
};
