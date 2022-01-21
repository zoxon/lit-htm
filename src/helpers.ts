import fs from "fs-extra";
import isGlob from "is-glob";
import os from "os";
import path from "path";
import pico from "picocolors";

export function message(message: string) {
  return `[${pico.blue("lit-htm")}]: ${pico.gray(message)}`;
}

export async function writeFile(filename: string, content: string) {
  try {
    await fs.outputFile(filename, content);
    console.log(message(`File created ${pico.cyan(path.join("/", filename))}`));
  } catch (error) {
    console.error(error);
  }
}

const slash = "/";
const backslash = /\\/g;
const enclosure = /[\{\[].*[\/]*.*[\}\]]$/;
const globby = /(^|[^\\])([\{\[]|\([^\)]+$)/;
const escaped = /\\([\*\?\|\[\]\(\)\{\}])/g;

export function globParent(str: string) {
  // flip windows path separators
  const isWin32 = os.platform() === "win32";
  if (isWin32 && str.indexOf(slash) < 0) {
    str = str.replace(backslash, slash);
  }

  // special case for strings ending in enclosure containing path separator
  if (enclosure.test(str)) {
    str += slash;
  }

  // preserves full path in case of trailing path separator
  str += "a";

  // remove path parts that are globby
  do {
    str = path.posix.dirname(str);
  } while (isGlob(str) || globby.test(str));

  // remove escape chars and return result
  return str.replace(escaped, "$1");
}

export const isFunction = (value: any) =>
  String(value) === "[object Function]" || typeof value === "function";
