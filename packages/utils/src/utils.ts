import { dirname } from 'path';
import find from 'find-up';

export const getProjetRoot = async (
  cwd = process.cwd()
): Promise<string | null> => {
  const pkg = await find('package.json', { cwd });
  return pkg ? dirname(pkg) : null;
};
