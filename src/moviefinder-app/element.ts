import type { Attributes } from "typed-html";

export type CustomElement<TAttributes extends Record<string, unknown> = Record<string, unknown>> = (attributes: Attributes | TAttributes, content: string) => string