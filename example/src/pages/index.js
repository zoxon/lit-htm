import { html } from 'lit-htm'

import Document from '../components/Document.js'
import Head from '../components/Head.js'

export default function Home() {
  const head = html`<${Head}>
    <title>Page title</title>
    <meta name="description" content="Page description" />
    <!-- Any tags -->
  <//>`

  return html`<${Document} head=${head}>
    <h1>Page content</h1>
  <//>`
}
