const apiBaseUrl = (import.meta.env?.VITE_API_URL ?? 'http://localhost:8000').replace(/\/+$/, '')

export class ApiError<T = unknown> extends Error {
  readonly status: number
  readonly data: T

  constructor(response: Response, data: T) {
    super(`API request failed: ${response.status} ${response.statusText}`)
    this.name = 'ApiError'
    this.status = response.status
    this.data = data
  }
}

// Orval supplies serialized bodies, headers, and TanStack Query's abort signal.
export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBaseUrl}/${path.replace(/^\/+/, '')}`, options)
  const text = await response.text()
  let data: unknown = undefined

  if (text) {
    if (response.headers.get('content-type')?.includes('json')) {
      try {
        data = JSON.parse(text)
      } catch (error) {
        if (response.ok) throw error
        data = text
      }
    } else {
      data = text
    }
  }

  if (!response.ok) {
    throw new ApiError(response, data)
  }

  // The OpenAPI contract provides static types, not runtime response validation.
  return data as T
}
