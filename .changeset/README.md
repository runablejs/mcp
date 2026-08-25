# Changesets

Run `pnpm changeset` for every user-visible change. Select the affected package,
choose the semantic version impact, and commit the generated markdown file with
the change.

The repository is currently in the `alpha` prerelease channel. Changesets turns
the initial `0.0.0` package plus the pending minor changeset into
`0.1.0-alpha.0` in the release pull request.
