import { Manifest } from '@unscripted/utils';
import fs from 'fs-extra';
import camelCase from 'lodash.camelcase';
import path from 'path';

// Shared
// ---------------
const BUILD_DIR = 'lib';
const SOURCE_DIR = 'src';
const TS_CONFIG_FILE = 'tsconfig.build.json';

// Package.json
// ---------------
export type PackageJsonConfig = {
  target: string;
  name: string;
  description: string;
  repository: Manifest['repository'];
};

export const createPackageJson = async (config: PackageJsonConfig) => {
  const repository = config.repository
    ? {
        repository: config.repository,
      }
    : {};

  const content = {
    name: config.name,
    description: config.description,
    version: '0.0.1',
    licence: 'MIT',
    ...repository,
    main: `${BUILD_DIR}/index.js`,
    files: [BUILD_DIR],
    dependencies: {},
    devDependencies: {},
    scripts: {
      build: `tsc -p ${TS_CONFIG_FILE}`,
      watch: `tsc -p ${TS_CONFIG_FILE} --watch`,
      clean: `rm -rf ${BUILD_DIR}`,
    },
  };

  return fs.outputJson(path.join(config.target, 'package.json'), content, {
    spaces: 2,
  });
};

// README.md
// ---------------
export type ReadmeConfig = {
  target: string;
  name: string;
  description: string;
};

export const createReadme = async (config: ReadmeConfig) => {
  const camelized = camelCase(config.name.replace('@', ''));
  const content = `# \`${config.name}\`;

> ${config.description}

## Usage

\`\`\`
const ${camelized} = require('${config.name}');
\`\`\`
`;

  return fs.outputFile(path.join(config.target, 'README.md'), content);
};

// Tsconfig.build.json
// ---------------
export type TsConfigConfig = {
  target: string;
};

export const createTsConfig = async (config: TsConfigConfig) => {
  const content = {
    extends: '@unscripted/tsconfig',
    compilerOptions: {
      rootDir: SOURCE_DIR,
      outDir: BUILD_DIR,
      declaration: true,
    },
    include: [`${SOURCE_DIR}/**/*`],
    exclude: [BUILD_DIR, 'node_modules', '*/**.test.ts'],
  };

  return fs.outputJson(path.join(config.target, TS_CONFIG_FILE), content, {
    spaces: 2,
  });
};

// Index.ts
// ---------------
export type IndexFileConfig = {
  target: string;
};

export const createIndexFile = async (config: IndexFileConfig) => {
  return fs.outputFile(path.join(config.target, SOURCE_DIR, 'index.ts'), '');
};
