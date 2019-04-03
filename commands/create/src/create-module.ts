import fs from 'fs-extra';
import path from 'path';
import * as template from './templates';

export type ModuleConfig = {
  name: string;
  description: string;
  location: string;
};

export const createModule = async ({
  name,
  location,
  description,
}: ModuleConfig) => {
  const moduleDir = path.join(location, name);

  if (fs.existsSync(moduleDir)) {
    throw Error(`Path "${moduleDir}" already exists. Aborting...`);
  }

  await template.createPackageJson({ name, description, target: moduleDir });
  await template.createReadme({ name, description, target: moduleDir });
  await template.createTsConfig({ target: moduleDir });
  await template.createIndexFile({ target: moduleDir });
};
