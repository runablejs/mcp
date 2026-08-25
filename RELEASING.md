# Releasing

Releases are managed by Changesets and the GitHub Actions release workflow.
Publishing directly from a developer machine is reserved for recovery only.

## Alpha flow

1. Add a changeset with `pnpm changeset` to each user-visible pull request.
2. Merge changes to `main`.
3. The release workflow opens or updates `chore(release): version packages`.
4. Review the generated version, changelog, and lockfile in that pull request.
5. Merge the release pull request. The workflow builds and packs the exact
   publish artifact, publishes it to npm, tags it, and creates a GitHub Release.

The repository is in Changesets prerelease mode with the `alpha` tag. The first
release is therefore `@runablejs/mcp@0.1.0-alpha.0`, published under npm's
`alpha` dist-tag rather than `latest`.

## Trusted Publishing

npm Trusted Publishing is configured for the `runablejs/mcp` GitHub repository
and the `release.yml` workflow. The publish job receives only the
`id-token: write` permission and uses npm's short-lived OIDC credentials. Do not
add an `NPM_TOKEN` or `NODE_AUTH_TOKEN` to this workflow.

The npm package page remains unavailable until the first version is actually
published. Merge the first release pull request to publish
`@runablejs/mcp@0.1.0-alpha.0` with the `alpha` dist-tag.

## Repository safeguards

- Protect `main` and require CI before merging the release pull request.
- Keep the Trusted Publisher repository and workflow filename synchronized with
  `.github/workflows/release.yml`.
