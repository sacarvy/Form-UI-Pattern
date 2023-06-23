import { FieldValues, RegisterOptions } from "react-hook-form";

type Options = {
  id: string;
  label: string;
  // reveals: {}
  // TODO: Add reveals options
};

type Field = {
  type: "select" | "text" | "number" | "email" | "date" | "radio" | "checkbox";
  id: string;
  label?: string;
  as?: "dropdown" | "combobox";
  selectMultiple?: boolean;
  options?: Array<Options>;
  value?: string;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  required?: boolean;
};

export type Form = {
  title?: string;
  fields: Array<Field>;
};

export type MultiStepForm = {
  steps: Array<Form>;
};
