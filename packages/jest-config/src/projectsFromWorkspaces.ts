import { join } from 'path';
import { YarnWorkspaces } from '@unscripted/utils';

/**
 * Jest project definition.
 */
export type JestProjectDefinition = {
  displayName: string;
  runner?: string;
  testMatch?: string[];
};

/**
 * Transform yarn's workspace to jest's project definitions.
 */
export const getProjectsFromWorkspaces = (
  workspaces: YarnWorkspaces,
  extension = '.test.ts?(x)'
): JestProjectDefinition[] => {
  const ext = /^\./.test(extension) ? extension : `.${extension}`;

  return Object.entries(workspaces).map(([name, { location }]) => ({
    displayName: name,
    testMatch: [join('<rootDir>', location, `**/*${ext}`)],
  }));
};
