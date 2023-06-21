type Options = {
  id: string;
  label: string;
  // reveals: {}
  // TODO: Add reveals options
};

type Fields = {
  type: "select" | "text" | "number" ;
  id: string;
  label?: string;
  as?: "dropdown" | "combobox";
  selectMultiple?: boolean;
  options?: Array<Options>;
};

export type Form = {
  title?: string;
  fields: Array<Fields>;
};

export type StepperForm = {
  steps: Array<Form>;
}
