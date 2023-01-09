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
  disabled?: boolean;
};

export default function Button({ type, className, label, handleClick, disabled }: Props) {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`p-2 text-md font-bold border-2 hover:ring rounded-lg ease-in-out transition-all ${className} ${disabled ? '!bg-slate-100 !hover:bg-slate-200 hover:text-slate-400 hover:cursor-not-allowed' : ''}`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
}
