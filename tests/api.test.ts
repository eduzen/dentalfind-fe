import assert from 'node:assert/strict'
import { afterEach, test } from 'bun:test'

import { ApiError, apiFetch } from '../src/api/client'
import { queryClient } from '../src/api/queryClient'

const originalFetch = globalThis.fetch

afterEach(() => {
  globalThis.fetch = originalFetch
  queryClient.clear()
})

test('returns JSON data and forwards request options, including cancellation', async () => {
  const controller = new AbortController()
  const options: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Test' }),
    signal: controller.signal,
  }

  globalThis.fetch = async (url, init) => {
    assert.equal(url, 'http://localhost:8000/dentists')
    assert.equal(init, options)
    return Response.json({ id: 1 })
  }

  assert.deepEqual(await apiFetch('/dentists', options), { id: 1 })
})

test('supports empty responses', async () => {
  globalThis.fetch = async () => new Response(null, { status: 204 })
  assert.equal(await apiFetch('/empty'), undefined)
})

test('preserves FastAPI validation details in ApiError', async () => {
  const data = { detail: [{ loc: ['body', 'email'], msg: 'Invalid email' }] }
  globalThis.fetch = async () => Response.json(data, { status: 422 })

  await assert.rejects(apiFetch('/signup'), (error: unknown) => {
    assert.ok(error instanceof ApiError)
    assert.equal(error.status, 422)
    assert.deepEqual(error.data, data)
    return true
  })
})

test('preserves non-JSON server errors', async () => {
  globalThis.fetch = async () => new Response('Unavailable', { status: 503 })

  await assert.rejects(apiFetch('/dentists'), (error: unknown) => {
    assert.ok(error instanceof ApiError)
    assert.equal(error.status, 503)
    assert.equal(error.data, 'Unavailable')
    return true
  })
})

test('preserves HTTP status when an error body contains malformed JSON', async () => {
  globalThis.fetch = async () =>
    new Response('broken', {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    })

  await assert.rejects(apiFetch('/dentists'), (error: unknown) => {
    assert.ok(error instanceof ApiError)
    assert.equal(error.status, 502)
    assert.equal(error.data, 'broken')
    return true
  })
})

test('propagates cancellation without wrapping it', async () => {
  const error = new DOMException('Aborted', 'AbortError')
  globalThis.fetch = async () => {
    throw error
  }

  await assert.rejects(apiFetch('/dentists'), (caught: unknown) => caught === error)
})

test('does not retry client errors but allows bounded retries for server errors', () => {
  const retry = queryClient.getDefaultOptions().queries?.retry
  assert.equal(typeof retry, 'function')
  if (typeof retry !== 'function') throw new Error('Expected retry function')

  assert.equal(retry(0, new ApiError(new Response(null, { status: 401 }), null)), false)
  assert.equal(retry(0, new ApiError(new Response(null, { status: 503 }), null)), true)
  assert.equal(retry(2, new Error('Network failure')), false)
  assert.equal(queryClient.getDefaultOptions().mutations?.retry, false)
})
