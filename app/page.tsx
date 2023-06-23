"use client";
import Input from "@/components/ui/Input";
import { Form as FormTypes } from "@/types";
import { FormProvider, UseFormReturn, useForm } from "react-hook-form";

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
        {formData.fields.map((field) => {
          switch (field.type) {
            case "text":
              return (
                <Input
                  key={field.id}
                  placeholder={field.label}
                  id={field.id}
                  {...methods.register(field.id, {
                    required: field.required || false,
                  })}
                  value={field.value as string}
                />
              );
            case "email":
              return (
                <Input
                  type="email"
                  key={field.id}
                  id={field.id}
                  placeholder={field.label}
                  value={field.value as string}
                  {...methods.register(field.id, {
                    required: field.required || false,
                  })}
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
