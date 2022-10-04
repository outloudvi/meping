/** @jsx h */
import { h } from 'preact'
import { Handlers, PageProps } from '$fresh/server.ts'
import { TURNSTILE_SITE_KEY } from '@utils/env.ts'
import { PingPageProps } from '../../types.ts'
import Ping from '../../islands/Ping.tsx'

interface RouteProps {
  pin: string
}

export const handler: Handlers<PingPageProps, RouteProps> = {
  async GET(_req, ctx) {
    const pin = Number.parseInt(ctx.params.pin)
    if (Number.isNaN(pin)) {
      return new Response('Invalid PIN', {
        status: 400,
      })
    }

    return ctx.render({
      pin,
      tsSitekey: TURNSTILE_SITE_KEY ?? '',
    })
  },
}

export default function PingPage(props: PageProps<PingPageProps>) {
  const { pin, tsSitekey } = props.data
  return <Ping pin={pin} tsSitekey={tsSitekey} />
}
