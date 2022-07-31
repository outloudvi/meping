import { HandlerContext } from '$fresh/server.ts'
import { TELEGRAM_CALLBACK_SECRET } from '@utils/env.ts'
import processCallback from '@utils/telegramHandler.ts'

export const handler = async (
  req: Request,
  ctx: HandlerContext
): Promise<Response> => {
  const secret = ctx.params.secret
  if (secret !== TELEGRAM_CALLBACK_SECRET) {
    return new Response('Bad path', {
      status: 403,
    })
  }
  if (req.method !== 'POST') {
    return new Response('Bad method', {
      status: 405,
    })
  }
  await processCallback(await req.json())
  return new Response('ok', { status: 200 })
}
