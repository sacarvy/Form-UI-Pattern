"use client";
import Form from "@/components/Form";
import { Form as FormTypes } from "@/types";
import { useState } from "react";

const form: FormTypes = {
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

export default function Home() {
  const [Data, setData] = useState("");
  return (
    <div className="h-screen transition flex justify-center items-center flex-col gap-10">
      <h1 className="text-white text-7xl font-bold">Cool Form 😎</h1>
      <Form
        formData={form}
        onSubmit={(data) => {
          setData(JSON.stringify(data as Object));
        }}
      />
      {Data && <p className="text-lg text-white">{Data}</p>}
    </div>
  );
}
