"use client";
import React, { useState } from "react";

import {
  MultiStepForm as TMultiStepForm,
  TMultiStepFormContext,
  TStep,
} from "@/types";
import Form from "@/components/Form";

export const MultiStepFormContext = React.createContext<TMultiStepFormContext>(
  {} as TMultiStepFormContext
);

export default function MultiStepForm({
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
          prev() {
            setStepCount((prev) => prev - 1);
          },
          stepCount: stepCount,
        }}
      >
        <div className="h-screen flex justify-center items-center flex-col gap-10">
          {info.steps.map((step, idx) => (
            <React.Fragment key={idx}>
              {idx === stepCount ? (
                <>
                  <h1 className="text-white text-6xl font-bold">
                    {step.title || ""}
                  </h1>
                  <Form
                    lastStep={idx + 1 === info.steps.length}
                    formData={step}
                    onSubmit={(data) => {
                      setData((prev) => {
                        if (idx + 1 !== info.steps.length) {
                          setStepCount((prev) => prev + 1);
                        }

                        let newState = prev;
                        newState[step.id as string] = JSON.stringify(data);
                        return newState;
                      });
                      handleSubmit(Data);
                    }}
                  />
                </>
              ) : null}
            </React.Fragment>
          ))}
        </div>
      </MultiStepFormContext.Provider>
    </>
  );
}