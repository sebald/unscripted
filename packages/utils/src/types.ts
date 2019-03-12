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
  /**
   * Relative location from the workspace root.
   */
  location: string;

  /**
   * List of package names that are local.
   */
  workspaceDependencies: string[];
  mismatchedWorkspaceDependencies: string[];
};

/**
 * Map of yarn workspaces.
 */
export type YarnWorkspaceInfo = {
  /**
   * Absolute path to the workspace root
   */
  path: string;

  /**
   * Map of local packages and their worspace information.
   */
  workspaces: { [name: string]: YarnWorkspace };
};

/**
 * Yarn workspaces stdout.
 */
export type YarnWorkspacesStdout = {
  type: 'error' | 'info' | 'log';
  data: string;
};
