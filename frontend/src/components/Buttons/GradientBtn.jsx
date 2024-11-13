import React from 'react'
import { useSelector } from 'react-redux'

function GradientBtn({onClick, label}) {
  
  const currentMode = useSelector((state) => state.modeSwitch.mode );

  return (
    <button onClick={onClick} className={`transition duration-700 rounded-md w-32 h-9 text-center shadow-lg opacity-85 hover:opacity-100 hover:underline ${currentMode=="tech" ? "bg-[#1E1D42] text-[#1C5CFF]" : "bg-[#20090F] text-[#8C1936]"}`}>
        {label}
    </button>
  )
}

export default GradientBtn