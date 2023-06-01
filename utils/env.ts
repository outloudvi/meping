import 'https://deno.land/x/dotenv@v3.2.0/load.ts'

export const DETA_PROJECT_KEY = Deno.env.get('DETA_PROJECT_KEY')
export const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN')
export const TELEGRAM_CALLBACK_SECRET = Deno.env.get('TELEGRAM_CALLBACK_SECRET')
export const TURNSTILE_SITE_KEY = Deno.env.get('TURNSTILE_SITE_KEY')
export const TURNSTILE_SECRET_KEY = Deno.env.get('TURNSTILE_SECRET_KEY')

const env = {
  DETA_PROJECT_KEY,
  TELEGRAM_BOT_TOKEN,
  TELEGRAM_CALLBACK_SECRET,
  TURNSTILE_SITE_KEY,
  TURNSTILE_SECRET_KEY,
}

export default env
