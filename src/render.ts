import html from "./html.js";

import { isFunction } from "./helpers.js";
import type { Component } from "./types";

export default async function render(
  component: Component,
  props: any = {},
  doctype: string = "<!DOCTYPE html>"
) {
  if (!isFunction(component.default)) {
    throw new TypeError("Default export must be a function");
  }
  const document = html`<${component.default} ...${props} />`;
  return doctype + document;
}
