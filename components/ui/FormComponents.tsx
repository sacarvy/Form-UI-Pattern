import React from "react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  useFormContext,
} from "react-hook-form";

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);

  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  const { id } = itemContext;

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  return {
    name: fieldContext.name,
    id: id,
    ...fieldState,
  };
};

const FormField = <TFieldValues extends FieldValues = FieldValues>({
  ...props
}: ControllerProps<TFieldValues>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const FormErrors = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ ...props }, ref) => {
  const { error } = useFormField();
  const msg = error ? String(error?.message) : null;

  if (!msg) {
    return null;
  }

  return (
    <p className="text-red-500" ref={ref} {...props}>
      {msg}
    </p>
  );
});

FormErrors.displayName = "FromErrors";

interface FormDescriptionProp
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  FormDescriptionProp
>(({ ...props }, ref) => {
  return (
    <>
      <p
        ref={ref}
        {...props}
        className={`text-white text-sm ${props.className}`}
      />
    </>
  );
});

FormDescription.displayName = "FormDescription";

export default FormDescription;

type TFormItemContext = {
  id: string;
};

const FormItemContext = React.createContext<TFormItemContext>(
  {} as TFormItemContext
);

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => {
  const id = React.useId();
  return (
    <>
      <FormItemContext.Provider value={{ id }}>
        <div
          ref={ref}
          className={`flex flex-col gap-2 ${props.className || ""}`}
          {...props}
        />
      </FormItemContext.Provider>
    </>
  );
});

FormItem.displayName = "FormItem";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    const { id } = useFormField();
    return (
      <>
        <label
          htmlFor={id}
          ref={ref}
          className={`${className || ""} text-white`}
          {...props}
        />
      </>
    );
  }
);

Label.displayName = "Label";

export {
  FormField,
  FormErrors,
  useFormField,
  FormDescription,
  FormItem,
  Label,
};
