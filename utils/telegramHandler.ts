import { Update, Message } from 'https://esm.sh/@grammyjs/types@2.8.1'
import generatePin from './generatePin.ts'
import { delPin, getPinInfo, setPinInfo } from './pinInfo.ts'
import { sendMessage } from './telegram.ts'
import parseArgs from './parseArgs.ts'

export default async function processCallback(body: Update) {
  if (body.message) {
    await parseMessage(body.message)
    return
  }
}

async function parseMessage(msg: Message) {
  if (msg.text) {
    // Text message
    await parseTextMessage(msg.text.trim(), msg)
  }
}

async function parseTextMessage(text: string, msg: Message) {
  const args = parseArgs(text)
  if (args.length === 0) return
  switch (args[0]) {
    case '/start': {
      await sendMessage(
        msg.chat.id,
        'Welcome to MePing! Use /create to setup a ping!',
        msg.message_id
      )
      break
    }
    case '/create':
    case '/new': {
      // TODO: Add authentication
      const pin = await generatePin()
      await setPinInfo(pin, {
        chatId: msg.chat.id,
        requiredAuth: [],
      })
      await sendMessage(
        msg.chat.id,
        `Your ping PIN is <b>${pin}</b>. Share <a href="https://uau.li/ping/${pin}">uau.li/ping/${pin}</a> to whoever need it.`,
        msg.message_id
      )
      break
    }
    case '/delete':
    case '/revoke':
    case '/remove': {
      if (args.length < 2) {
        await sendMessage(msg.chat.id, 'PIN not present.', msg.message_id)
        return
      }
      const pin = args[1]
      const pinInfo = await getPinInfo(pin)
      if (pinInfo === null) {
        await sendMessage(msg.chat.id, `PIN ${pin} not found.`, msg.message_id)
        return
      }
      await delPin(pin)
      await sendMessage(msg.chat.id, `PIN ${pin} deleted.`, msg.message_id)
      break
    }
  }
}
