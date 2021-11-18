import { html } from './html.js'

export function render(
  Component: { default: typeof html },
  doctype: string = '<!DOCTYPE html>'
) {
  const document = html`<${Component.default} />`
  return doctype + document
}
