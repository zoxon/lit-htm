import type html from "./html.js";

export interface Component {
  default: typeof html;
  getStaticProps?: (...args: any[]) => Record<string, any>;
  getStaticPaths?: () => any[];
}
