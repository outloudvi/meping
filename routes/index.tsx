/** @jsx h */
import { h } from 'preact'
import { tw } from '@twind'

export default function Home() {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <h1 className={tw`text-4xl`}>MePing</h1>
      <a href="https://t.me/itsmepingbot">
        <img
          className={tw`mt-4`}
          src="https://img.shields.io/badge/Telegram-%40itsmepingbot-blue.svg"
          height="100px"
          alt="Telegram bot @itsmepingbot"
        />
      </a>
    </div>
  )
}
