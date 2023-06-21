type InputProps = {
  id?: string;
  label?: string;
  type: "text" | "number" | "radio";
};

export default function FormInput({ label, id, type }: InputProps) {
  return (
    <>
      <input
        type={type}
        placeholder={label}
        key={id}
        className={`w-96 py-2 px-2 rounded-md`}
        id={id || ""}
      />
    </>
  );
}
