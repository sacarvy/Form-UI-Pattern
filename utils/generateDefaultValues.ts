import { Form } from "@/types";

type TDefaultValue = {
  [key: string]: string;
};

export default function generateDefaultValues(form: Form) {
  let defaultValues: TDefaultValue = {} as TDefaultValue;

  for (let i = 0; i < form.fields.length; i++) {
    if (form.fields[i].type == "select") {
      defaultValues[form.fields[i].id] = form.fields[i].options![0].label;
    } else {

      defaultValues[form.fields[i].id] = form.fields[i].value || "";
    }
  }

  return defaultValues;
}
