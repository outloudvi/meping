/** @jsx h */
import { h } from 'preact'
import { tw } from 'twind'
import { useState, useEffect } from 'preact/hooks'
import { PingPageProps } from '../types.ts'

const TurnstileCallbackFunctionName = 'setTsToken'

export default function Ping(props: PingPageProps) {
  const { pin, tsSitekey } = props

  const [tsToken, setTsToken] = useState('')

  const requestPing = (pin: number) => {
    fetch(`/api/ping/${pin}?token=${tsToken}`, {
      method: 'POST',
    }).then((x) => {
      if (x.status === 200) {
        alert('Pinged!')
      } else if (x.status === 404) {
        alert('PIN not found!')
      } else {
        alert('Unknown error :(')
      }
    })
  }

  useEffect(() => {
    // @ts-ignore
    window[TurnstileCallbackFunctionName] = setTsToken
  }, [])

  return (
    <div className={tw`flex flex-col items-center mt-3`}>
      <div>Do you want to ping #{pin}?</div>
      <div
        class={`cf-turnstile ${tw`my-2`}`}
        data-sitekey={tsSitekey}
        data-callback={TurnstileCallbackFunctionName}
      ></div>
      <script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
      ></script>
      <button
        className={tw`mt-2 p-2 border-solid border-2 rounded`}
        disabled={tsToken === ''}
        onClick={() => requestPing(pin)}
      >
        {tsToken === '' ? 'Waiting for CAPTCHA' : 'Ping'}
      </button>
    </div>
  )
}
