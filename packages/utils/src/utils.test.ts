import { getProjetRoot } from './utils';

jest.mock('find-up', () =>
  jest.fn(async (_: string, { cwd }: { cwd: string }) =>
    cwd === 'no/pe' ? null : cwd
  )
);

test('get project root', async () => {
  await expect(getProjetRoot('no/pe')).resolves.toMatchInlineSnapshot(`null`);
  await expect(getProjetRoot('custom/path')).resolves.toMatchInlineSnapshot(
    `"custom"`
  );
});
