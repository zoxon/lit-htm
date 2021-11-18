import { transform } from 'lit-htm'

await transform({
  from: './src/pages',
  to: './dist',
})
