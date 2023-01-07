import React, { PropsWithChildren } from 'react'

interface Props {
  title: string;
  handleClose: () => void;
  dismissable?: boolean;
}

export default function ModalWrapper({ children, title, handleClose }: PropsWithChildren<Props>) {
  return (
    <div className="w-full h-screen z-40 bg-slate-300/25 block top-0 fixed">
      <div className="h-full w-full flex items-center justify-center">
        <div className="w-full h-screen sm:w-96 sm:h-96 md:h-[480px] md:w-[480px] bg-white flex flex-col rounded shadow">
            <div className="w-full shadow rounded-t h-10 bg-white text-gray-700 font-bold flex items-center text-center justify-center">
              <h3 className="text-xl w-full ml-6">{title}</h3>
              <button className="w-6" onClick={handleClose}>X</button>
            </div>
            {children}
        </div>
      </div>
    </div>
  )
}