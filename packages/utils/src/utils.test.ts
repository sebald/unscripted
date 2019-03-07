import { sync } from 'execa';

import * as log from './__fixture__/yarn-info';
import { getProjetRoot, getWorkspaces } from './utils';

jest.mock('find-up', () =>
  jest.fn(async (_: string, { cwd }: { cwd: string }) =>
    cwd === 'no/pe' ? null : cwd
  )
);

jest.mock('execa');
const execaSync = (sync as any) as jest.Mock;

beforeEach(() => {
  execaSync.mockClear();
});

test('get project root', async () => {
  await expect(getProjetRoot('no/pe')).resolves.toMatchInlineSnapshot(`null`);
  await expect(getProjetRoot('custom/path')).resolves.toMatchInlineSnapshot(
    `"custom"`
  );
});

test('get workspaces (within monorepo)', () => {
  execaSync.mockReturnValue({ stdout: log.info });

  const ws = getWorkspaces(__dirname);
  if (ws === null) {
    throw new Error('No workspaces.');
  }

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

test('get workspaces (no in monorepo)', () => {
  execaSync.mockReturnValue({ stdout: log.error });
  expect(getWorkspaces(__dirname)).toEqual(null);
});
