import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icons?: string;
}

export default React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { id, className, ...props },
  ref
) {
  return (
    <>
      <input
        id={id}
        className={`w-96 py-2 px-2 rounded-md ${className}`}
        ref={ref}
        {...props}
      />
    </>
  );
});
