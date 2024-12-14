/* eslint-disable @typescript-eslint/no-explicit-any */
import  { type ReactNode } from 'react'

interface BtnProps{
    type: any;
    children: ReactNode;
    className?: string;
    onClick?: ()=> void;
    btnClassName?: string;
}

const Btn = ({type, children, className, onClick, btnClassName}: BtnProps) => {
  return (
<div className={`flex flex-row justify-center self-start ${className}`}>
          <button
            type={type}
            className={`downloadbtn px-3 py-2 text-white rounded-md ${btnClassName}`} onClick={onClick}>
            {children}
          </button>
    </div>
  )
}

export default Btn