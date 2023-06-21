import { useFormContext } from "./FormContext";
import FormInput from "./FormInput";

export default function FormFields() {
  const { form } = useFormContext();

  return (
    <>
      {form.fields.map((field) =>
        field.type !== "select" ? (
          <FormInput
            type={field.type}
            id={field.id}
            key={field.id}
            label={field.label}
          />
        ) : null
      )}
    </>
  );
}
