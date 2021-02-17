import { ButtonHTMLAttributes, ReactChildren } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | ReactChildren;
}

const Button = ({ children, ...attributes }: ButtonProps) => {
  return (
    <button
      className="border border-transparent shadow rounded my-2 px-2 py-0.5 bg-green-200 ring-2 ring-green-300 hover:bg-green-400 active:bg-green-500"
      {...attributes}
    >
      {children}
    </button>
  );
};

export default Button;
