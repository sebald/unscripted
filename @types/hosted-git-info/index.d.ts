export type Options = {
  noCommittish?: boolean;
  noGitPlus?: boolean;
};

export type HostedGitInfo = {
  type: string;
  domain: string;
  user: string;
  project: string;

  /**
   * For example hostedGitInfo.fromUrl("git@github.com:npm/hosted-git-info.git#v1.0.0").file("package.json")
   * would return https://raw.githubusercontent.com/npm/hosted-git-info/v1.0.0/package.json
   */
  file(path: string, opts?: Options): string;

  /**
   * Eg, github:npm/hosted-git-info
   */
  shortcut(opts?: Options);

  /**
   * Eg, https://github.com/npm/hosted-git-info/tree/v1.2.0, https://github.com/npm/hosted-git-info/tree/v1.2.0/package.json, https://github.com/npm/hosted-git-info/tree/v1.2.0/REAMDE.md#supported-hosts
   */
  browse(path: string, fragment: string, opts?: Options);

  /**
   * Eg, https://github.com/npm/hosted-git-info/issues
   */
  bugs(opts?: Options);

  /**
   * Eg, https://github.com/npm/hosted-git-info/tree/v1.2.0#readme
   */
  docs(opts?: Options);

  /**
   * Eg, git+https://github.com/npm/hosted-git-info.git
   */
  https(opts?: Options);

  /**
   * Eg, git+ssh://git@github.com/npm/hosted-git-info.git
   */
  sshurl(opts?: Options);

  /**
   * Eg, git@github.com:npm/hosted-git-info.git
   */
  ssh(opts?: Options);

  /**
   * Eg, npm/hosted-git-info
   */
  path(opts?: Options);

  /**
   * Eg, https://github.com/npm/hosted-git-info/archive/v1.2.0.tar.gz
   */
  tarball(opts?: Options);

  /**
   * Returns the default output type. The default output type is based on the string you passed in to be parsed
   */
  getDefaultRepresentation();

  toString(opts?: Options);
};

export function fromUrl(url: string, options?: Options): HostedGitInfo | null;
