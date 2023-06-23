"use client";
import Form from "@/components/Form";
import { Form as FormTypes, MultiStepForm as TMultiStepForm } from "@/types";
import React, { useState } from "react";

const step: FormTypes = {
  title: "What is your favourite Color?",
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

const step2: FormTypes = {
  title: "Where have you visited?",
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

type TStep = {
  [key: string]: string;
};

type TMultiStepFormContext = {
  next: () => void;
  prev: () => void;
  stepCount: number;
};

export const MultiStepFormContext = React.createContext<TMultiStepFormContext>(
  {} as TMultiStepFormContext
);

function MultiStepForm({
  info,
  handleSubmit,
}: {
  info: TMultiStepForm;
  handleSubmit: (data: TStep) => void;
}) {
  const [Data, setData] = useState<TStep>({});
  const [stepCount, setStepCount] = useState<number>(0);
  return (
    <>
      <MultiStepFormContext.Provider
        value={{
          next: () => {
            setStepCount((prev) => prev + 1);
          },
          prev: () => {
            setStepCount((prev) => prev - 1);
          },
          stepCount: stepCount,
        }}
      >
        {info.steps.map((step, idx) => {
          return (
            <div
              className={`${
                stepCount !== idx ? "hidden" : ""
              } h-screen transition flex justify-center items-center flex-col gap-10`}
              key={step.title}
            >
              <h1 className="text-white text-6xl font-bold">
                {step.title || ""}
              </h1>
              <Form
                lastStep={idx + 1 === info.steps.length}
                formData={step}
                onSubmit={(data) => {
                  setData((prev) => {
                    let newState = prev;
                    newState[step.title as string] = JSON.stringify(data);
                    return newState;
                  });
                  if (idx + 1 === info.steps.length) {
                    handleSubmit(Data);
                  }
                }}
              />
            </div>
          );
        })}
      </MultiStepFormContext.Provider>
    </>
  );
}

export default function Home() {
  const handleSubmit = (data: TStep) => {
    alert(JSON.stringify(data));
    localStorage.setItem("formData", JSON.stringify(data));
  };
  return (
    <>
      <div className="transition">
        <MultiStepForm info={multiSteps} handleSubmit={handleSubmit} />;
      </div>
    </>
  );
}
