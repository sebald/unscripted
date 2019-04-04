import { parseRepositoryField, YarnWorkspaceInfo } from '@unscripted/utils';
import fs from 'fs-extra';
import path from 'path';

import * as template from './templates';

export type ModuleConfig = {
  module: {
    name: string;
    description: string;
    location: string;
  };
  info: YarnWorkspaceInfo;
};

export const createModule = async (config: ModuleConfig) => {
  const { name, location, description } = config.module;
  const { manifest, path: projectRoot } = config.info;
  const moduleDir = path.join(location, name);

  if (fs.existsSync(moduleDir)) {
    throw Error(`Path "${moduleDir}" already exists. Aborting...`);
  }

  const repository = parseRepositoryField(manifest.repository);

  await template.createPackageJson({
    name,
    description,
    repository: repository
      ? {
          ...repository,
          directory: path.relative(projectRoot, moduleDir),
        }
      : undefined,
    target: moduleDir,
  });
  await template.createReadme({ name, description, target: moduleDir });
  await template.createTsConfig({ target: moduleDir });
  await template.createIndexFile({ target: moduleDir });
};
