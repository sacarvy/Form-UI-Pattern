import { Form as FormTypes } from "@/types";
import { FormProvider, UseFormReturn, useForm } from "react-hook-form";
import Input from "./ui/Input";
import generateDefaultValues from "@/utils/generateDefaultValues";
import { FormErrors, FormField } from "./ui/FormComponents";
import Select from "./ui/Select";
import { useContext } from "react";
import { MultiStepFormContext } from "@/app/page";

export default function FormWrapper({
  lastStep = true,
  formData,
  onSubmit,
}: {
  lastStep: boolean;
  formData: FormTypes;
  onSubmit: (data: unknown) => void;
}) {
  const methods = useForm({
    defaultValues: generateDefaultValues(formData),
  });

  return (
    <>
      <FormProvider {...methods}>
        <Form
          methods={methods}
          lastStep={lastStep}
          onSubmit={onSubmit}
          formData={formData}
        />
      </FormProvider>
    </>
  );
}

function Form({
  lastStep,
  methods,
  onSubmit,
  formData,
}: {
  lastStep: boolean;
  methods: UseFormReturn;
  onSubmit: (data: unknown) => void;
  formData: FormTypes;
}) {
  const { next, prev, stepCount } = useContext(MultiStepFormContext);

  return (
    <>
      <form
        noValidate
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        {formData.fields.map((fieldData) => {
          switch (fieldData.type) {
            case "text":
              return (
                <FormField
                  key={fieldData.id}
                  rules={fieldData.rules || {}}
                  control={methods.control}
                  name={fieldData.id}
                  render={({ field }) => {
                    return (
                      <>
                        <Input
                          type="text"
                          id={fieldData.id}
                          name={field.name}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          value={field.value}
                          ref={field.ref}
                        />
                        <FormErrors />
                      </>
                    );
                  }}
                />
              );
            case "email":
              return (
                <FormField
                  key={fieldData.id}
                  rules={
                    fieldData.rules || {
                      validate: {
                        matchPattern: (v) =>
                          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                            v
                          ) || "Email address must be a valid address",
                      },
                    }
                  }
                  control={methods.control}
                  name={fieldData.id}
                  render={({ field }) => {
                    return (
                      <>
                        <Input type="email" {...field} />
                        <FormErrors />
                      </>
                    );
                  }}
                />
              );
            case "select":
              if (!fieldData.options) {
                throw Error("Provide options for select");
              }
              return (
                <FormField
                  key={fieldData.id}
                  control={methods.control}
                  name={fieldData.id}
                  render={({ field }) => {
                    return (
                      <>
                        <Select key={fieldData.id} {...field}>
                          {fieldData.options!.map((option) => {
                            return (
                              <option key={option.id} value={option.label}>
                                {option.label}
                              </option>
                            );
                          })}
                        </Select>
                        <FormErrors />
                      </>
                    );
                  }}
                />
              );
            default:
              return null;
          }
        })}

        {!lastStep ? (
          <div className="flex justify-between items-center gap-4">
            <button
              type="submit"
              className="text-lg bg-blue-700 text-white py-1 w-full rounded-md"
              onClick={prev}
            >
              Prev
            </button>
            <button
              type="submit"
              className="text-lg bg-blue-700 text-white py-1 w-full rounded-md"
              onClick={next}
            >
              Next
            </button>
          </div>
        ) : (
          <button
            type="submit"
            className="text-lg bg-blue-700 text-white py-1 w-full rounded-md"
          >
            Submit
          </button>
        )}
      </form>
    </>
  );
}
