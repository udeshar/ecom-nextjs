import React from 'react'
import { MouseEvent } from 'react'

type props = {
    children: React.ReactNode,
    onClick: (e:React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void,
    disabled?: boolean,
    className?: string,
    width? : string
}

const BtnUnderline = ({children, disabled, onClick, className, width} : props) => {
  return (
    <div className={`${className} relative`} >
        <button className={`text-xs  text-blue-400 font-medium sm:text-sm `}  disabled={disabled} onClick={(e)=>onClick(e)} >{children}</button>
        <div className={"absolute bottom-0 left-0 w-5 h-0.5 bg-blue-400 " + width}></div>
    </div>
  )
}

export default BtnUnderline