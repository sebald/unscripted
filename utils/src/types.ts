/**
 * `package.json` definition.
 */
export type Manifest = {
  name: string;
  version?: string;
  repository?:
    | string
    | {
        type: string;
        url: string;
        directory?: string;
      };
  workspaces?: string[];
  scripts?: { [name: string]: string };
  [key: string]: unknown;
};

/**
 * `package.json` definition with workspaces.
 */
export type WorkspaceManifest = Manifest & { workspaces: string[] };

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
   * Absolute path to the workspace root.
   */
  path: string;

  /**
   * Locations where workspaces live.
   */
  locations: string[];

  /**
   * Map of local packages and their worspace information.
   */
  workspaces: { [name: string]: YarnWorkspace };

  /**
   * The manifest (aka `package.json` with workspaces).
   */
  manifest: WorkspaceManifest;
};

/**
 * Yarn workspaces stdout.
 */
export type YarnWorkspacesStdout = {
  type: 'error' | 'info' | 'log';
  data: string;
};
