import React, { PropsWithChildren } from 'react'

interface Props {
    display: boolean;
}

export default function DropDownWrapper({ children, display }: PropsWithChildren<Props>) {
  return display ? (
    <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-slate-50 shadow-lg p-4">
        {children}
    </div>
  ) : null;
}