import { TURNSTILE_SECRET_KEY } from '@utils/env.ts'

export default async function validateTsToken(token: string): Promise<boolean> {
  if (!TURNSTILE_SECRET_KEY) {
    throw Error('No secret key for Turnstile')
  }

  const form = new FormData()
  form.set('secret', TURNSTILE_SECRET_KEY)
  form.set('response', token)

  const outcome = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      body: form,
    }
  ).then((x) => x.json())
  return outcome.success === true
}
