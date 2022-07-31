import { PIN_LENGTH, MAX_TRY_GENERATE_TIME } from './const.ts'
import { getPinInfo } from './pinInfo.ts'

export default async function generatePin(): Promise<string> {
  for (let i = 0; i < MAX_TRY_GENERATE_TIME; i++) {
    const num = String((Math.random() * 10 ** PIN_LENGTH).toFixed(0)).padStart(
      PIN_LENGTH,
      '0'
    )
    if ((await getPinInfo(num)) === null) {
      return num
    }
  }
  throw Error('Max try times exceeded. Giving up.')
}
