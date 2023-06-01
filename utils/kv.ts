import { DETA_PROJECT_KEY } from './env.ts'
import { Deta } from 'deta'

const deta = Deta(DETA_PROJECT_KEY)
const db = deta.Base('pings')

type KeyValue = { key: string; value: string }

export function get(key: string): Promise<string | null> {
  return db.get(key).then((x) => (x as KeyValue | null)?.value ?? null)
}

export async function put(vs: KeyValue): Promise<void> {
  await db.put(vs, vs.key)
}

export async function del(key: string): Promise<void> {
  await db.delete(key)
}
