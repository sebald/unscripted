import { dirname } from 'path';
import pkgUp from 'pkg-up';

export const getProjetRoot = async (cwd = process.cwd()): Promise<string> => {
  const filePath = await pkgUp(cwd);
  return dirname(filePath);
};
