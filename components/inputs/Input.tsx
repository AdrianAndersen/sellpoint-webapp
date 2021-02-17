import { ChangeEvent } from "react";

const Input = ({
  type,
  placeholder,
  name,
  value,
  onChange,
}: {
  type?: string;
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      className="border border-transparent shadow rounded my-2 p-1 focus:outline-none focus:ring-2 focus:ring-green-300"
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
