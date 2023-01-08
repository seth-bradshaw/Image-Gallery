import React from 'react'

export type HandleChangeEvent = { target: HTMLInputElement }

type Props = {
  placeholder: string;
  name: string;
  value: string | number;
  handleChange: ({ target }: HandleChangeEvent) => void;
  className?: string;
  label?: string;
  type?: string;
}


export default function Input({ placeholder, name, value, handleChange, type, label, className = '' }: Props) {
  return (
    <div className={`flex flex-col gap-1 hover:cursor-pointer rounded w-full ${className}`}>
      <span className="text-sm text-left font-bold text-slate-600 bg-transparent">
        <label htmlFor={name}>
          {label ?? name.slice(0,1).toUpperCase() + name.slice(1)}
        </label>
      </span>
      <input 
        id={name} 
        value={value} 
        onChange={handleChange}
        className="text-lg text-slate-500 h-full w-full p-2 rounded border-2 border-slate-400 focus:outline-none focus:ring focus:ring-purple-200 focus:border-purple-400 placeholder:text-slate-300 placeholder:text-sm ease-in-out transition-all"
        placeholder={placeholder}
        type={type}
      />
    </div>
  )
}