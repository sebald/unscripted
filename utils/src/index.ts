import execa from 'execa';
import globParent from 'glob-parent';
import { fromUrl } from 'hosted-git-info';
import path from 'path';
import { sync as readJson } from 'load-json-file';
import { EOL } from 'os';

import {
  Manifest,
  WorkspaceManifest,
  YarnWorkspaceInfo,
  YarnWorkspacesStdout,
} from './types';

/**
 * Re-export types for easy access.
 */
export * from './types';

/**
 * Try to read `package.json` in the current directory (`cwd`).
 *
 * @param cwd current working directory
 */
export const readPackage = (cwd: string): Manifest | null => {
  try {
    return readJson(path.join(cwd, 'package.json'));
  } catch {
    return null;
  }
};

/**
 * Search updwards from `cwd` and find the closest workspace root (= manifest),
 * returning the path and the content of the `package.json`.
 * Adapted from: https://github.com/yarnpkg/yarn/blob/master/src/config.js#L768-L792
 *
 * @param cwd current working directory
 */
export const findManifestInfo = (
  cwd: string
): { path: string; manifest: WorkspaceManifest } | null => {
  let previous = null;
  let current = path.normalize(cwd);

  while (current !== previous) {
    const pkg = readPackage(current);
    const ws = pkg && pkg.workspaces;
    if (ws) {
      const relativePath = path.relative(current, cwd);
      if (relativePath === '' || ws.length > 0) {
        const manifest = pkg as WorkspaceManifest;
        return { path: current, manifest };
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
  const root = findManifestInfo(cwd);

  // Bail early, if no workspace can be found.
  if (root === null) {
    return null;
  }

  /**
   * The first `log.data` ing `output` will contain the workspaces information.
   * If there is no "log" message, there are no workspaces.
   */
  const output = execa
    .sync('yarn', ['workspaces', 'info', '--json'], { cwd: root.path })
    .stdout.split(EOL)
    .map(line => JSON.parse(line) as YarnWorkspacesStdout);
  const info = output.find(item => item.type === 'log');

  return info
    ? {
        path: root.path,
        locations: root.manifest.workspaces
          .map(globParent)
          // Remove "absolute" workspaces
          .filter(dir => dir !== '.')
          .map(dir => path.resolve(root.path, dir)),
        workspaces: JSON.parse(info.data),
        manifest: root.manifest,
      }
    : null;
};

export const parseRepositoryField = (
  field: Manifest['repository']
): { type: string; url: string } | null => {
  if (!field) {
    return null;
  }

  if (typeof field === 'object') {
    return {
      type: field.type,
      url: field.url,
    };
  }

  const info = fromUrl(field);

  if (!info) {
    return null;
  }

  return {
    type: 'git',
    url: info.https(),
  };
};
