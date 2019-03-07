import find from 'find-up';
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
