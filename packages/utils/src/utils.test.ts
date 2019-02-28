import { getProjetRoot } from './utils';

jest.mock('find-up', () =>
  jest.fn(async (_: string, { cwd }: { cwd: string }) => {
    switch (cwd) {
      case 'custom/path':
        return 'custom/path';
      case 'no/pe':
        return null;
      default:
        return 'path/to/package.json';
    }
  })
);

test('get project root', async () => {
  await expect(getProjetRoot()).resolves.toMatchInlineSnapshot(`"path/to"`);
  await expect(getProjetRoot('no/pe')).resolves.toMatchInlineSnapshot(`null`);
  await expect(getProjetRoot('custom/path')).resolves.toMatchInlineSnapshot(
    `"custom"`
  );
});
