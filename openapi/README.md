# Backend API contract

Place the FastAPI-exported OpenAPI YAML at `openapi/schema.yml`, then run:

```sh
bun run api:generate
bun run build
```

The real backend contract has not been supplied yet. No placeholder endpoints are
committed, and generation will fail until the schema is added.

Commit the schema and the generated `src/api/generated/` files together. Generation
is explicit: normal builds do not need a running backend or regenerate the client.
Never hand-edit generated files.

## Backend conventions

- Set stable, descriptive `operation_id` values, such as `listDentists`.
- Use route tags to group generated modules by feature.
- Declare request bodies, success responses, and error response models.
- Export the complete OpenAPI document, not just Pydantic component schemas.

## Frontend usage

Orval generates TanStack Query hooks, query-key helpers, API functions, and models.
The exact export names and paths depend on the contract's operation IDs and tags.
Import generated hooks into components or wrap them in handwritten feature hooks.
Use generated query-key helpers to invalidate affected queries after mutations.

All generated requests use `src/api/client.ts`. Hooks return parsed response bodies
rather than `{ data, status, headers }` wrappers. Non-success HTTP responses throw
`ApiError`, whose `status` and `data` preserve FastAPI validation/error details.
Cancellation signals are forwarded to fetch. Empty responses return `undefined`.
The client is intended for JSON/text APIs; add explicit binary/stream handling
before generating endpoints that return files or streams.

Copy `.env.example` to `.env.local` to configure `VITE_API_URL`. It defaults to
`http://localhost:8000`; FastAPI must allow your frontend origin through CORS.
For production, set the public API URL before building. `/api` is only valid if
infrastructure proxies that prefix to FastAPI; this static frontend does not
provide an API proxy. No authentication scheme is assumed yet. Add credentials or
authorization centrally in the shared request layer when the backend defines it.

The root TanStack Query provider uses a 30-second stale time, retries non-4xx query
failures at most twice, and does not retry mutations. Existing mock signup/login
flows are unchanged until real endpoints and their contract are available.

Generated types do not validate responses at runtime. Keep Zod for form validation
and add runtime response validation separately if needed.

## Checks

- `bun test` runs request-layer and query-default tests in `tests/` using Bun's
  built-in runner and Node assertions (no running backend required).
- After a schema update: regenerate, run `bun run build`, and review the generated
  diff. CI can also regenerate and check for differences to detect stale output.
