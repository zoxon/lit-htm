# lit-htm

Transforms [tagged template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates) to string

Please do not confuse this project with [lit-html](https://www.npmjs.com/package/lit-html).
Name choosed because it used template literals and based on [htm](https://github.com/developit/htm) and [vhtml](https://github.com/developit/vhtml)

## How to use

```js
// src/pages/index.js
import { html } from "lit-htm";

export default function Page(props) {
  return html`<div class="page">
    <h1>Page title</h1>
  </div>`;
}
```

```js
// src/index.js
import { transform } from "lit-htm";

await transform({
  from: "./src/pages",
  to: "./dist",
});
```

## Example

See [example folder](./example)
