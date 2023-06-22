"use client";
import { Form, FormInput } from "@/components";
import { Form as FormTypes } from "@/types";


export default function Home() {
  const form: FormTypes = {
    fields: [
      {
        type: "text",
        id: "some-q",
        label: "Which is your favourite colour?",
      },
      {
        type: "email",
        id: "some-q2",
        label: "example@gmail.com",
      },
      {
        type: "text",
        id: "some-q4",
        label: "Which is your favourite colour?",
      },
    ],
  };
  return (
    <div className="h-screen transition flex justify-center items-center">
      <Form form={form} onSubmit={(value) => {
        console.log(value)
      }} className="flex flex-col gap-4" />
    </div>
  );
}
