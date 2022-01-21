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

See [example folder](./example)

## getStaticPaths

If a page has Dynamic Routes and uses getStaticProps, it needs to define a list of paths to be statically generated.

When you export a function called `getStaticPaths` from a page that uses dynamic routes, page will render all the paths specified by `getStaticPaths`

```js
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  // using `node-fetch` package
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/`);
  const posts = await response.json();

  // You should always return array, each element in this array will be passed to the `getStaticProps` and `props`
  const paths = posts.map((post) => ({ id: post.id }));

  return {
    paths,
  };
}
```

## getStaticProps

If you export a function called `getStaticProps` from a page, it will rendered this page using props returned by getStaticProps

```js
export async function getStaticProps({ id }) {
  // Call an external API endpoint to get post by ID
  // using `node-fetch` package
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const post = await response.json();

  // `post` will be merged with props and will be available at component in `props.post`
  return {
    props: {
      post,
    },
  };
}
```
