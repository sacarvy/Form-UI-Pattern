import React from "react";
import { useFormField } from "./FormComponents";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icons?: string;
}

export default React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...props },
  ref
) {
  const {id, name} = useFormField();
  return (
    <>
      <input
        {...props}
        autoComplete="off"
        id={id}
        name={name}
        className={`w-96 py-2 px-2 rounded-md ${className || ''}`}
        ref={ref}
      />
    </>
  );
});
