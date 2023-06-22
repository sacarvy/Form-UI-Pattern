"use client";
import { Form } from "@/types";
import React from "react";
import { FormContext } from "./context/FormContext";
import FormFields from "./FormFields";
import { useForm } from "react-hook-form";

type Props = {
  form: Form;
  className?: string;
  onSubmit: (values: unknown) => void;
};

export default function Form({ form, className, onSubmit }: Props) {
  const { handleSubmit, register } = useForm({
    // resolver: ''
  });
  return (
    <>
      <FormContext.Provider value={{ form, register }}>
        <form className={className} onSubmit={handleSubmit(onSubmit)}>
          <FormFields />
          <button
            type="submit"
            className="bg-blue-700 text-white text-xl font-medium py-2 rounded-md"
          >
            Submit
          </button>
        </form>
      </FormContext.Provider>
    </>
  );
}
