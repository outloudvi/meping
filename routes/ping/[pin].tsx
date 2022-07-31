/** @jsx h */
import { h } from 'preact'
import { PageProps } from '$fresh/server.ts'
import PingPage from '../../islands/PingPage.tsx'

export default function Page(props: PageProps) {
  return <PingPage pin={props.params.pin} />
}
