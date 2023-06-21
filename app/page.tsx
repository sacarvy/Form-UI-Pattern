"use client";
import { Form, FormInput } from "@/components";
import { Form as FormTypes } from "@/types";
import Image from "next/image";

export default function Home() {
  const form: FormTypes = {
    fields: [
      {
        type: "text",
        id: "some-q",
        label: "Which is your favourite colour?",
      },
      {
        type: "text",
        id: "some-q2",
        label: "Which is your favourite colour?",
      },
      {
        type: "text",
        id: "some-q3",
        label: "Which is your favourite colour?",
      },
      {
        type: "text",
        id: "some-q4",
        label: "Which is your favourite colour?",
      },
    ],
  }
  return (
    <div className="h-screen transition flex justify-center items-center">
      <Form form={form} onSubmit={() => {}} className="flex flex-col gap-4" />
    </div>
  );
}
