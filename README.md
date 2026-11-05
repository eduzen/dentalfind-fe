# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

## Deploy to Cloudflare Workers

The app is deployed as static assets on Cloudflare Workers using the project-local
Wrangler CLI. `wrangler.jsonc` serves `dist/` and falls back to `index.html` for
client-side routes, including signup URLs. No server-side Worker script is needed.
The signup API remains mocked; deploying does not add a backend.

```sh
bun install
bun run wrangler login
bun run wrangler whoami
bun run deploy:check
bun run deploy
```

The configured Worker name is `dentalfind-fe`, targeting the default environment
on your authenticated account. If your login has access to multiple accounts, set
`CLOUDFLARE_ACCOUNT_ID` to the intended account ID before deploying. Check whether
that Worker already exists before deploying to avoid overwriting another app.
Wrangler prints the public `workers.dev` URL after deployment. No custom domain is
configured.

- `bun run preview:worker` builds and serves the app in the local Workers runtime.
- `bun run deploy:check` builds and validates packaging without publishing.
- `bun run deploy` builds and publishes the app.

For CI, supply `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` through your CI
secret store with permissions appropriate to the target account and Worker. Never
commit credentials. Local `.env*`, `.dev.vars*`, and `.wrangler/` files are ignored.

See the [Workers static assets documentation](https://developers.cloudflare.com/workers/static-assets/)
and [SPA routing guide](https://developers.cloudflare.com/workers/static-assets/routing/single-page-application/).

## Typed API and server state

The frontend uses **Orval + TanStack Query** to generate typed API functions and
hooks from the FastAPI OpenAPI contract. See [openapi/README.md](openapi/README.md)
for schema setup, backend conventions, configuration, and usage.

```sh
cp .env.example .env.local
# Add the backend's real schema at openapi/schema.yml first:
bun run api:generate
bun run build
bun test
```

Generated code lives in `src/api/generated/`; handwritten request behavior and
query defaults live in `src/api/client.ts` and `src/api/queryClient.ts`. The app
already mounts a shared `QueryClientProvider`. Existing mock flows remain intact
until the backend contract is available.

## Code quality

This project uses [Oxlint](https://oxc.rs/docs/guide/usage/linter) for fast linting and [Oxfmt](https://oxc.rs/docs/guide/usage/formatter) for formatting.

- `bun run lint` checks for lint issues.
- `bun run lint:fix` applies available lint fixes.
- `bun run format` formats the project.
- `bun run format:check` verifies formatting without changing files.

### Git hooks with prek

Install [prek](https://prek.j178.dev/) once, then activate the hooks in each clone:

```sh
bun install
prek install
prek run --all-files
```

The pre-commit hooks check formatting with Oxfmt and lint staged JavaScript and
TypeScript files with Oxlint. They do not modify files automatically. If a check
fails, run `bun run format` or `bun run lint:fix`, review and stage the changes,
then commit again.

Run `prek run --all-files` to check the whole repository manually. Dependencies
must be installed locally; the hooks use the project's existing tools without
downloading packages. GitHub Actions also runs lint, formatting checks, tests,
and the production build, since local hooks can be skipped.
