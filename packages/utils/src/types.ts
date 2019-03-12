/**
 * `package.json` definition.
 */
export type PackageJson = {
  name: string;
  version?: string;
  workspaces?: string[];
  scripts?: { [name: string]: string };
  [key: string]: unknown;
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
export type YarnWorkspaceInfo = {
  path: string;
  workspaces: { [name: string]: YarnWorkspace };
};

/**
 * Yarn workspaces stdout.
 */
export type YarnWorkspacesStdout = {
  type: 'error' | 'info' | 'log';
  data: string;
};
