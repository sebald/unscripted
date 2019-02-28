import { dirname } from 'path';
import find from 'find-up';

export const getProjetRoot = async (
  cwd = process.cwd()
): Promise<string | null> => {
  console.log(cwd);
  const pkg = await find('package.json', { cwd });
  return pkg ? dirname(pkg) : null;
};
