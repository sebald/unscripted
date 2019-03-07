export default {
  '@unscripted/jest-config': {
    location: 'packages/jest-config',
    workspaceDependencies: [],
    mismatchedWorkspaceDependencies: ['@unscripted/utils'],
  },
  '@unscripted/utils': {
    location: 'packages/utils',
    workspaceDependencies: [],
    mismatchedWorkspaceDependencies: [],
  },
};
