import React from "react";
interface TextFieldProps extends React.HTMLAttributes<HTMLInputElement> {
  value: string;
  placeholder: string;
  type: "date" | "text" | "file";
  pattern?: string;
}

export default function TextField({
  value,
  placeholder,
  onChange,
  type = "text",
  pattern,
  ...props
}: TextFieldProps) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      pattern={pattern}
      {...props}
    />
  );
}
