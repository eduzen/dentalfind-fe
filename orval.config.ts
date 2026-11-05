import { defineConfig } from 'orval'

export default defineConfig({
  dentalfind: {
    input: './openapi/schema.yml',
    output: {
      target: './src/api/generated/endpoints.ts',
      schemas: './src/api/generated/models',
      client: 'react-query',
      httpClient: 'fetch',
      mode: 'tags-split',
      formatter: 'oxfmt',
      baseUrl: '',
      override: {
        mutator: {
          path: './src/api/client.ts',
          name: 'apiFetch',
        },
        fetch: {
          includeHttpResponseReturnType: false,
        },
      },
    },
  },
})
