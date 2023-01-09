import React, { ButtonHTMLAttributes, PropsWithChildren } from "react";

export enum ButtonType {
  button = "button",
  submit = "submit",
  reset = "reset",
}

interface Props {
  className: string;
  label: string;
  type?: ButtonType;
  handleClick?: () => void;
  disabled?: boolean;
};

export default function Button({ type = ButtonType.button, className, label, handleClick, disabled, children }: PropsWithChildren<Props>) {
  return (
    <>
      <button
        disabled={disabled}
        type={type}
        className={`p-2 text-md font-bold border-2 hover:ring rounded-lg ease-in-out transition-all flex items-center justify-center ${className} ${disabled ? '!bg-slate-100 !hover:bg-slate-200 hover:text-slate-400 hover:cursor-not-allowed' : ''}`}
        onClick={handleClick}
      >
        {label}
      </button>
      {children}
    </>
  );
}
