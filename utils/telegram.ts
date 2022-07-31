import { TELEGRAM_BOT_TOKEN } from './env.ts'

function _(action: string, body: Record<string, any>) {
  return fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/${action}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export function sendMessage(
  chat_id: number,
  text: string,
  reply_to_message_id?: number
) {
  return _('sendMessage', {
    chat_id,
    text,
    parse_mode: 'HTML',
    reply_to_message_id,
  })
}
