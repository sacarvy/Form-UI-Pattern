import { FieldValues, UseFormRegister } from "react-hook-form";
import { useFormContext } from "./context/FormContext";
import Input from "./ui/Input";

export default function FormFields() {
  const { form, register } = useFormContext();

  return (
    <>
      {form.fields.map((field) => {
        switch (field.type) {
          case "text":
            return (
              <Input
                required={field.required || false}
                key={field.id}
                placeholder={field.label}
                id={field.id}
                value={field.value as string}
                register={register}
              />
            );
          case "email":
            return (
              <Input
                required={field.required || false}
                type="email"
                key={field.id}
                id={field.id}
                placeholder={field.label}
                value={field.value as string}
                register={register}
              />
            );
          case "select":
            if (!field.options) {
              throw Error("Provide options for select");
            }
            return (
              <select key={field.id}>
                {field.options.map((option) => {
                  return (
                    <option key={option.id} value={option.label}>
                      {option.label}
                    </option>
                  );
                })}
              </select>
            );
          default:
            return null;
        }
      })}
    </>
  );
}
