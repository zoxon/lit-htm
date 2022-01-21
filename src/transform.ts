import path from "path";

import fg from "fast-glob";
import pico from "picocolors";

import render from "./render.js";
import { writeFile, globParent, isFunction, message } from "./helpers.js";
import type { Component } from "./types.js";

export interface TransformOptions {
  from: string;
  to: string;
  options: {
    ext?: string;
  };
}

async function renderComponent(
  component: Component,
  path: string,
  props: any = {}
) {
  const html = await render(component, props);
  await writeFile(path, html);
}

export default async function transform({
  from,
  to,
  options = { ext: "html" },
}: TransformOptions) {
  const entries = (await fg(from)) ?? [];

  for (const entry of entries) {
    console.log(message(`Rendering file: ${pico.cyan(entry)}`));

    const module = path.resolve(entry);
    const component = await import(module);

    const { dir, name } = path.parse(entry);
    const parent = globParent(from);
    const getPath = (name: string) =>
      path.join(dir.replace(parent, to), `${name}.${options.ext}`);

    if (isFunction(component.getStaticPaths)) {
      const staticPaths: string[] = (await component.getStaticPaths()) || [];

      for (let staticPath of staticPaths) {
        const documentPath = getPath(staticPath);

        if (component.getStaticProps && isFunction(component.getStaticProps)) {
          const staticProps = await component.getStaticProps(staticPath);
          await renderComponent(component, documentPath, staticProps);
        }
      }
    } else {
      const props = isFunction(component.getStaticProps)
        ? await component.getStaticProps()
        : {};
      const documentPath = getPath(name);
      await renderComponent(component, documentPath, props);
    }
  }
}
