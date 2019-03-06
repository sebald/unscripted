import _execa from 'execa';
import { createReadStream } from 'fs';
import { join } from 'path';

import { getProjetRoot, getWorkspaces } from './utils';

jest.mock('find-up', () =>
  jest.fn(async (_: string, { cwd }: { cwd: string }) =>
    cwd === 'no/pe' ? null : cwd
  )
);

jest.mock('execa');
const execa = (_execa as any) as jest.Mock;

beforeEach(() => {
  execa.mockClear();
});

test('get project root', async () => {
  await expect(getProjetRoot('no/pe')).resolves.toMatchInlineSnapshot(`null`);
  await expect(getProjetRoot('custom/path')).resolves.toMatchInlineSnapshot(
    `"custom"`
  );
});

test('get workspaces (within monorepo)', async () => {
  const stream = createReadStream(
    join(__dirname, '__fixture__/yarn-info-json.txt')
  );
  execa.mockReturnValue({ stdout: stream });

  const ws = await getWorkspaces(__dirname);
  expect(Object.values(ws)).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        location: expect.any(String),
        workspaceDependencies: expect.any(Array),
        mismatchedWorkspaceDependencies: expect.any(Array),
      }),
    ])
  );
});

test('get workspaces (no in monorepo)', async () => {
  const stream = createReadStream(
    join(__dirname, '__fixture__/yarn-info-error.txt')
  );
  execa.mockReturnValue({ stdout: stream });

  await expect(
    getWorkspaces(__dirname)
  ).rejects.toThrowErrorMatchingInlineSnapshot(
    `"Cannot find the root of your workspace - are you sure you're currently in a workspace?"`
  );
});
