import 'https://deno.land/x/dotenv@v3.2.0/load.ts'

export const DETA_PROJECT_ID = Deno.env.get('DETA_PROJECT_ID')
export const DETA_PROJECT_KEY = Deno.env.get('DETA_PROJECT_KEY')
export const DETA_BASE_NAME = Deno.env.get('DETA_BASE_NAME')
export const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN')
export const TELEGRAM_CALLBACK_SECRET = Deno.env.get('TELEGRAM_CALLBACK_SECRET')

const env = {
  DETA_PROJECT_ID,
  DETA_PROJECT_KEY,
  DETA_BASE_NAME,
  TELEGRAM_BOT_TOKEN,
  TELEGRAM_CALLBACK_SECRET,
}

export default env