import { HandlerContext } from '$fresh/server.ts'
import { getPinInfo } from '../../../utils/pinInfo.ts'
import { sendMessage } from '../../../utils/telegram.ts'

export const handler = async (
  req: Request,
  ctx: HandlerContext
): Promise<Response> => {
  const pin = ctx.params.pin
  if (req.method !== 'POST') {
    return new Response('Bad method', {
      status: 405,
    })
  }
  const pinInfo = await getPinInfo(pin)
  if (pinInfo === null) {
    return new Response('not found', { status: 404 })
  }
  await sendMessage(pinInfo.chatId, `${pin}: Someone just pinged you!`)
  return new Response('ok', { status: 200 })
}
