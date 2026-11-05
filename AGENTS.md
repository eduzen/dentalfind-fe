# Repository Guidelines

## Project Structure

This repository is a React 19 and TypeScript single-page app built with Vite. Application entry points are `src/main.tsx` and `src/App.tsx`; global styles live in `src/index.css` and `src/App.css`. Signup screens and their styles are grouped in `src/components/signup/`. Browser-path logic is in `src/hooks/`, mock signup behavior in `src/services/`, and static files in `public/` or `src/assets/`. There is currently no test directory or test runner configured.

## Build, Test, and Development

Use Bun, matching the checked-in `bun.lock`:

- `bun install` installs dependencies.
- `bun run dev` starts the Vite development server with hot reload.
- `bun run build` runs TypeScript project checks and creates a production build in `dist/`.
- `bun run preview` serves the production build locally.
- `bun run lint` checks code with Oxlint; `bun run lint:fix` applies supported fixes.
- `bun run format:check` checks formatting with Oxfmt; `bun run format` formats files.

No automated test command is defined yet. If tests are added, document the chosen runner and keep tests beside the feature or in a clearly named `tests/` directory.

## Coding Style and Naming

Use TypeScript for application code and React function components. Follow the repository formatter and linter rather than hand-aligning code; preserve the existing two-space indentation and single-quoted TypeScript style. Name React components and component files in PascalCase (for example, `SignupPage.tsx`), hooks with a `use` prefix (for example, `useBrowserPath.ts`), and utility/service modules in camelCase. Keep feature-specific styles and copy near the signup components.

## Commit and Pull Request Guidelines

Recent commits use short, imperative conventional-style subjects such as `feat: ...`. Use a type prefix (`feat:`, `fix:`, or `chore:`) and describe one focused change. Pull requests should explain user-visible behavior and implementation scope, link a related issue when available, and include screenshots for visual changes. Note relevant lint or build results in the PR description.

## Configuration and Changes

Keep secrets and machine-specific settings out of committed files. Before changing a signup flow, check its related component, copy, styles, and `src/services/mockSignupApi.ts` so UI and mock behavior stay aligned.
