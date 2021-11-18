import fs from 'fs-extra'

export async function writeFile(filename: string, content: string) {
  try {
    await fs.outputFile(filename, content)
  } catch (error) {
    console.error(error)
  }
}

export async function getDirFilenames(dir: string) {
  let items

  try {
    items = await fs.readdir(dir)
  } catch (error) {
    console.error(error)
  }

  return items
}
