"use client";
import { Form } from "@/types";
import React from "react";
import { FormContext } from "./FormContext";
import FormInput from "./FormInput";
import FormFields from "./FormFields";

type Props = {
  form: Form;
  className?:string;
  onSubmit: (e: React.SyntheticEvent) => void;
};

export default function Form({ form, className, onSubmit }: Props) {
  return (
    <>
      <FormContext.Provider value={{ form }}>
        <form className={className}>
            <FormFields />
        </form>
      </FormContext.Provider>
    </>
  );
}
