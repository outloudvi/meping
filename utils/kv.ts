import { DETA_PROJECT_ID, DETA_PROJECT_KEY, DETA_BASE_NAME } from './env.ts'

if (!DETA_PROJECT_KEY || !DETA_PROJECT_ID || !DETA_BASE_NAME) {
  throw Error('Deta info is absent.')
}

const _detaProjectKey = DETA_PROJECT_KEY
const _detaProjectId = DETA_PROJECT_ID
const _detaBaseName = DETA_BASE_NAME

const baseUrl = `https://database.deta.sh/v1/${_detaProjectId}/${_detaBaseName}`

type KeyValue = { key: string; value: string }

export async function get(key: string): Promise<string | null> {
  const ret = await fetch(`${baseUrl}/items/${key}`, {
    method: 'GET',
    headers: {
      'X-API-Key': _detaProjectKey,
      'Content-Type': 'application/json',
    },
  }).then((x) => x.json())
  return ret.value ?? null
}

export async function putMany(vs: KeyValue[]): Promise<void> {
  await fetch(`${baseUrl}/items`, {
    method: 'PUT',
    body: JSON.stringify({
      items: vs.map(({ key, value }) => ({
        key,
        value,
      })),
    }),
    headers: {
      'X-API-Key': _detaProjectKey,
      'Content-Type': 'application/json',
    },
  })
}

export function put(vs: KeyValue): Promise<void> {
  return putMany([vs])
}

export async function del(key: string): Promise<void> {
  await fetch(`${baseUrl}/items/${key}`, {
    method: 'DELETE',
    headers: {
      'X-API-Key': _detaProjectKey,
      'Content-Type': 'application/json',
    },
  })
}
