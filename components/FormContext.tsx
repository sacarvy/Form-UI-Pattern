"use client";
import { Form } from "@/types";
import { createContext, useContext } from "react";

const FormContext = createContext<{ form: Form } | null>(null);

function useFormContext() {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("Form.* component must be rendered as child of Form");
  }

  return context;
}

export { FormContext, useFormContext };
