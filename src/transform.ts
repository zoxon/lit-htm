import path from 'path'
import chalk from 'chalk'

import { render } from './render.js'
import { getDirFilenames, writeFile } from './helpers.js'

interface TransformOptions {
  from: string
  to: string
  options?: {
    ext?: string
  }
}

export async function transform({
  from,
  to,
  options = { ext: 'html' },
}: TransformOptions) {
  const entries = (await getDirFilenames(from)) ?? []

  for (const entry of entries) {
    const module = path.resolve(path.join(from, entry))
    const Component = await import(module)
    const newFilename = entry.replace(path.extname(entry), `.${options.ext}`)
    const filename = path.resolve(to, newFilename)
    let html = render(Component)

    await writeFile(filename, html)
    console.info(
      `${chalk.green.bold('[Success]')}: File write ${chalk.cyan(
        path.join('/', to, newFilename)
      )}`
    )
  }
}
