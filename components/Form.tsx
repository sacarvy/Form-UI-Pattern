import { useContext } from "react";
import {
  FormProvider,
  UseFormReturn,
  useForm,
  useFormContext,
} from "react-hook-form";

import generateDefaultValues from "@/utils/generateDefaultValues";
import { MultiStepFormContext } from "@/components/MultistepForm";
import { Form as FormTypes } from "@/types";

import FormDescription, {
  FormErrors,
  FormField,
  FormItem,
  Label,
} from "./ui/FormComponents";
import Input from "./ui/Input";
import Select from "./ui/Select";

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
  const { prev, stepCount } = useContext(MultiStepFormContext);
  const {
    formState: { errors },
  } = useFormContext();
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
                        <FormItem>
                          <Label>{fieldData.label}</Label>
                          <Input
                            placeholder={fieldData.placeholder || ""}
                            type="text"
                            {...field}
                          />
                          {fieldData.description && (
                            <FormDescription>
                              {fieldData.description}
                            </FormDescription>
                          )}
                          <FormErrors />
                        </FormItem>
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
                        <FormItem>
                          <Label>{fieldData.label}</Label>
                          <Input type="email" {...field} />
                          {fieldData.description && (
                            <FormDescription>
                              {fieldData.description}
                            </FormDescription>
                          )}
                          <FormErrors />
                        </FormItem>
                      </>
                    );
                  }}
                />
              );
            case "tel":
              return (
                <FormField
                  key={fieldData.id}
                  rules={
                    fieldData.rules || {
                      validate: {
                        matchPattern: (v) =>
                          /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(v) ||
                          "Enter a valid number",
                      },
                    }
                  }
                  control={methods.control}
                  name={fieldData.id}
                  render={({ field }) => {
                    return (
                      <>
                        <FormItem>
                          <Label>{fieldData.label}</Label>
                          <Input type="tel" {...field} />
                          {fieldData.description && (
                            <FormDescription>
                              {fieldData.description}
                            </FormDescription>
                          )}
                          <FormErrors />
                        </FormItem>
                      </>
                    );
                  }}
                />
              );
            case "number":
              return (
                <FormField
                  key={fieldData.id}
                  rules={
                    fieldData.rules || {
                      validate: {
                        matchPattern: (v) =>
                          /^[0-9]+$/.test(v) || "Enter a valid number",
                      },
                    }
                  }
                  control={methods.control}
                  name={fieldData.id}
                  render={({ field }) => {
                    return (
                      <>
                        <FormItem>
                          <Label>{fieldData.label}</Label>
                          <Input type="number" {...field} />
                          {fieldData.description && (
                            <FormDescription>
                              {fieldData.description}
                            </FormDescription>
                          )}
                          <FormErrors />
                        </FormItem>
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
                        <FormItem>
                          <Label>{fieldData.label}</Label>
                          <Select key={fieldData.id} {...field}>
                            {fieldData.options!.map((option) => {
                              return (
                                <option key={option.id} value={option.label}>
                                  {option.label}
                                </option>
                              );
                            })}
                          </Select>
                          {fieldData.description && (
                            <FormDescription>
                              {fieldData.description}
                            </FormDescription>
                          )}
                          <FormErrors />
                        </FormItem>
                      </>
                    );
                  }}
                />
              );
            default:
              return null;
          }
        })}

        <div className="flex justify-between items-center gap-4">
          {!lastStep ? (
            <>
              {stepCount !== 0 && (
                <button
                  type="button"
                  className="text-lg bg-blue-700 text-white py-1 w-full rounded-md disabled:opacity-70"
                  onClick={prev}
                  disabled={Object.keys(errors).length !== 0}
                >
                  Prev
                </button>
              )}
              <button
                type="submit"
                className="text-lg bg-blue-700 text-white py-1 w-full rounded-md disabled:opacity-70"
                disabled={Object.keys(errors).length !== 0}
              >
                Next
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="text-lg bg-blue-700 text-white py-1 w-full rounded-md"
                onClick={prev}
              >
                Prev
              </button>
              <button
                type="submit"
                className="text-lg bg-blue-700 text-white py-1 w-full rounded-md"
                disabled={Object.keys(errors).length !== 0}
              >
                Submit
              </button>
            </>
          )}
        </div>
      </form>
    </>
  );
}
