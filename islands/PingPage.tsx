/** @jsx h */
import { h } from 'preact'
import { tw } from '@twind'

interface CounterProps {
  pin: string
}

export default function PingPage({ pin }: CounterProps) {
  const requestPing = (pin: string) => {
    fetch(`/api/ping/${pin}`, {
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

  return (
    <div className={tw`text-center mt-3`}>
      <div>Do you want to ping #{pin}?</div>
      <button
        className={tw`mt-2 p-2 border-solid border-2 rounded`}
        onClick={() => requestPing(pin)}
      >
        Ping
      </button>
    </div>
  )
}
