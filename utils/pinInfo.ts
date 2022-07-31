import { PinInfo } from './types.d.ts'
import { del, get, put } from './kv.ts'

export async function getPinInfo(pin: string): Promise<PinInfo | null> {
  const ret = await get(`PIN_${pin}`)
  if (ret === null) {
    return null
  }
  return JSON.parse(ret)
}

export function setPinInfo(pin: string, info: PinInfo): Promise<void> {
  return put({
    key: `PIN_${pin}`,
    value: JSON.stringify(info),
  })
}

export function delPin(pin: string): Promise<void> {
  return del(`PIN_${pin}`)
}
