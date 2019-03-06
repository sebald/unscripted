import execa from 'execa';
import find from 'find-up';
import getStream from 'get-stream';
import { dirname } from 'path';

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
export const getWorkspaces = async (
  cwd: string
): Promise<{ [name: string]: YarnWorkspace }> => {
  const stream = execa('yarn', ['workspaces', 'info', '--json'], { cwd })
    .stdout;
  if (!stream) {
    throw new Error('Could not get workspaces info.');
  }

  const lines = await getStream.array<string>(stream, { encoding: 'utf8' });
  const json = lines.map(line => JSON.parse(line) as YarnWorkspacesStdout);

  // Are we using workspaces?
  const err = json.find(item => item.type === 'error');
  if (err) {
    throw new Error(err.data);
  }

  // The first `log.data` will contain the workspaces information.
  const info = json.find(item => item.type === 'log');
  if (!info) {
    throw new Error('Could not find any workspaces info.');
  }

  return JSON.parse(info.data);
};
