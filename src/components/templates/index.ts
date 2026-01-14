import { lazy } from "react";
export const templates = {
  single: {
    id: "single",
    name: "Single Side",
    Component: lazy(() => import("./OnePageTemplate")),
  },
  double: {
    id: "double",
    name: "Double Side",
    Component: lazy(() => import("./TwoPageTemplate")),
  },
} as const;

export const templateList: Template[] = Object.values(templates);
export type TemplateTypes = keyof typeof templates;
export type Template = (typeof templates)[TemplateTypes];
