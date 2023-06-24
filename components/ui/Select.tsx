import React from "react";
import { useFormField } from "./FormComponents";

interface SelectProp extends React.HTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

export default React.forwardRef<HTMLSelectElement, SelectProp>(function Select(
  { children, ...props },
  ref
) {
  const { id, name } = useFormField();

  return (
    <>
      <select
        name={name}
        id={id}
        {...props}
        ref={ref}
        className="p-2 py-3 rounded-md"
      >
        {children}
      </select>
    </>
  );
});
