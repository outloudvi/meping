import { HandlerContext } from '$fresh/server.ts'
import { getPinInfo } from '../../../utils/pinInfo.ts'
import { sendMessage } from '../../../utils/telegram.ts'
import validateTsToken from '../../../utils/validateTsToken.ts'

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
  const cfTsToken = new URL(req.url).searchParams.get('token')
  if (!cfTsToken) {
    return new Response('No token given', {
      status: 400,
    })
  }
  const ret = await validateTsToken(cfTsToken)
  if (!ret) {
    return new Response('Invalid token', {
      status: 400,
    })
  }
  const pinInfo = await getPinInfo(pin)
  if (pinInfo === null) {
    return new Response('not found', { status: 404 })
  }
  await sendMessage(pinInfo.chatId, `${pin}: Someone just pinged you!`)
  return new Response('ok', { status: 200 })
}
