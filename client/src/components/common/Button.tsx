import React, { ButtonHTMLAttributes } from "react";

export enum ButtonType {
  button = "button",
  submit = "submit",
  reset = "reset",
}

type Props = {
  type?: ButtonType;
  className: string;
  label: string;
  handleClick?: () => void;
};

export default function Button({ type, className, label, handleClick }: Props) {
  return (
    <button
      type={type}
      className={`p-2 text-md font-bold border-2 hover:ring rounded-lg ease-in-out transition-all ${className}`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
}
