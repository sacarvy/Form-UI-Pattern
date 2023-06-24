import { HTMLInputTypeAttribute } from "react";
import { FieldValues, RegisterOptions } from "react-hook-form";

type Options = {
  id: string;
  label: string;
  // reveals: {}
  // TODO: Add reveals options
};

type Field = {
  type: HTMLInputTypeAttribute;
  id: string;
  description?: string
  placeholder?:string;
  label: string;
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
  id: string;
  fields: Array<Field>;
};

export type MultiStepForm = {
  steps: Array<Form>;
};

export type TStep = {
  [key: string]: string;
};

export type TMultiStepFormContext = {
  prev: () => void;
  stepCount: number;
};