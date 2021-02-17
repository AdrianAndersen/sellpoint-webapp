import { MouseEvent, ReactChildren } from "react";

const Button = ({
  type,
  name,
  onClick,
  children,
}: {
  type?: "button" | "submit" | "reset";
  name?: string;
  value?: string;
  onClick?: (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
  children: string | ReactChildren;
}) => {
  return (
    <button
      className="border border-transparent shadow rounded my-2 px-2 py-0.5 bg-green-200 ring-2 ring-green-300 hover:bg-green-400 active:bg-green-500"
      type={type}
      name={name}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
