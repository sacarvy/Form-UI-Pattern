"use client";
import { MultiStepForm } from "@/components";
import {
  Form as FormTypes,
  MultiStepForm as TMultiStepForm,
  TStep,
} from "@/types";
import React from "react";

const step: FormTypes = {
  title: "What is your favourite Color?",
  id: "form-1",
  fields: [
    {
      type: "text",
      id: "username",
      description: "This is a small description",
      placeholder: "Hellow",
      label: "Your Name",
      rules: {
        required: "What you doing bro?",
      },
    },
    {
      type: "select",
      id: "some2",
      label: "Which is your favourite color?",
      rules: {
        required: "This field is required",
      },
      options: [
        {
          id: "option1",
          label: "option1",
        },
        {
          id: "option2",
          label: "option2",
        },
        {
          id: "option3",
          label: "option3",
        },
        {
          id: "option4",
          label: "option4",
        },
      ],
    },
    {
      type: "email",
      value: "abc@gmail.com",
      id: "companyEmail",
      label: "Email",
    },
  ],
};

const step2: FormTypes = {
  title: "Where have you visited?",
  id: "form-2",
  fields: [
    {
      type: "text",
      id: "username",
      value: "Your name",
      label: "Which is your favourite colour?",
      rules: {
        required: "What you doing bro?",
      },
    },
    {
      type: "select",
      id: "some2",
      label: "example@gmail.com",
      rules: {
        required: "This field is required",
      },
      options: [
        {
          id: "option1",
          label: "option1",
        },
        {
          id: "option2",
          label: "option2",
        },
        {
          id: "option3",
          label: "option3",
        },
        {
          id: "option4",
          label: "option4",
        },
      ],
    },
    {
      type: "email",
      value: "abc@gmail.com",
      id: "companyEmail",
      label: "Which is your favourite colour?",
    },
  ],
};

const multiSteps: TMultiStepForm = {
  steps: [step, step2],
};

export default function Home() {
  const handleSubmit = (data: TStep) => {
    localStorage.setItem("formData", JSON.stringify(data));
  };
  return (
    <>
      <div>
        <MultiStepForm info={multiSteps} handleSubmit={handleSubmit} />;
      </div>
    </>
  );
}
