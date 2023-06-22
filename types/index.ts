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
  required?: boolean;
};

export type Form = {
  title?: string;
  fields: Array<Field>;
};

export type StepperForm = {
  steps: Array<Form>;
}
