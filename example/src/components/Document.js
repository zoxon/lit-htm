import { html } from 'lit-htm'

export default function Document({ children, head }) {
  return html`<html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <link rel="stylesheet" href="assets/stylesheets/app.css" />
      <link rel="shortcut icon" href="favicon.ico" />

      ${head}
    </head>

    <body>
      ${children}

      <script src="assets/javascript/app.js"></script>
    </body>
  </html>`
}
