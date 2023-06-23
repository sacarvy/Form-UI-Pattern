"use client";
import Input from "@/components/ui/Input";
import { Form as FormTypes } from "@/types";
import {
  Controller,
  FormProvider,
  UseFormReturn,
  useForm,
  FieldValues,
  FieldPath,
  ControllerProps,
} from "react-hook-form";

const form: FormTypes = {
  fields: [
    {
      type: "text",
      id: "some",
      label: "Which is your favourite colour?",
    },
    {
      type: "select",
      id: "some2",
      label: "example@gmail.com",
      options: [
        {
          id: "Something",
          label: "something",
        },
      ],
    },
    {
      type: "text",
      id: "some1",
      label: "Which is your favourite colour?",
    },
  ],
};

function FormWrapper({ formData }: { formData: FormTypes }) {
  const methods = useForm();
  const onSubmit = (data: unknown) => console.log(data);

  return (
    <>
      <FormProvider {...methods}>
        <Form methods={methods} onSubmit={onSubmit} formData={formData} />
      </FormProvider>
    </>
  );
}

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues>) => {
  return <Controller {...props} />;
};

function Form({
  methods,
  onSubmit,
  formData,
}: {
  methods: UseFormReturn;
  onSubmit: (data: unknown) => void;
  formData: FormTypes;
}) {
  return (
    <>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        {formData.fields.map((fieldData) => {
          switch (fieldData.type) {
            case "text":
              return (
                <FormField
                  key={fieldData.id}
                  control={methods.control}
                  name={fieldData.id}
                  render={({ field }) => {
                    return (
                      <Input
                        type="text"
                        id={fieldData.id}
                        name={field.name}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        value={field.value}
                        ref={field.ref}
                      />
                    );
                  }}
                />
              );
            case "email":
              return (
                <FormField
                  key={fieldData.id}
                  control={methods.control}
                  name={fieldData.id}
                  render={({ field }) => {
                    return <Input type="email" {...field} />;
                  }}
                />
              );
            case "select":
              if (!fieldData.options) {
                throw Error("Provide options for select");
              }
              return (
                <select key={fieldData.id}>
                  {fieldData.options.map((option) => {
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

        <button
          type="submit"
          className="text-lg bg-blue-700 text-white py-1 w-full"
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default function Home() {
  return (
    <div className="h-screen transition flex justify-center items-center flex-col gap-10">
      <h1 className="text-white text-7xl font-bold">Compound Form</h1>
      <FormWrapper formData={form} />
    </div>
  );
}
