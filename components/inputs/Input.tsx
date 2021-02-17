import { InputHTMLAttributes } from "react";

const Input = (attributes: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className="border border-transparent shadow rounded my-2 p-1 focus:outline-none focus:ring-2 focus:ring-green-300"
      {...attributes}
    />
  );
};

export default Input;
