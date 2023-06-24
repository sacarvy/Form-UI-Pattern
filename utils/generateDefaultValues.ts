import { Form } from "@/types";

type TDefaultValue = {
  [key: string]: string;
};

export default function generateDefaultValues(form: Form): TDefaultValue {
  let defaultValues: TDefaultValue = {} as TDefaultValue;

  try {
    const formData: string | null =
      localStorage !== undefined
        ? JSON.parse(localStorage.getItem("formData") || "{}")[form.id]
        : null;

    if (formData) {
      return JSON.parse(formData);
    }
  } catch (err) {}

  for (let i = 0; i < form.fields.length; i++) {
    if (form.fields[i].type == "select") {
      defaultValues[form.fields[i].id] = form.fields[i].options![0].label;
    } else {
      defaultValues[form.fields[i].id] = form.fields[i].value || "";
    }
  }

  return defaultValues;
}
