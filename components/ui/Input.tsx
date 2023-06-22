import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<FieldValues>;
  icons?: string;
}

export default React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { register, id, className, ...props },
  ref
) {
  return (
    <>
      <input
        id={id}
        className={`w-96 py-2 px-2 rounded-md ${className}`}
        {...register(id as string)}
        {...props}
        ref={ref}
      />
    </>
  );
});
