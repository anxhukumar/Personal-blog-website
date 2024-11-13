import React from 'react'
import { useSelector } from 'react-redux'

function FixedModeSwitch() {

    const currentMode = useSelector((state) => state.modeSwitch.mode) 
    
  return (
    <div className='bg-[#D9D9D9] w-22 h-9 flex justify-between rounded-full mr-7 cursor-text'>
        
        <button className={`transition duration-700 font-bold text-center rounded-full mx-1 my-1 w-20 cursor-text ${currentMode=="tech" ? "bg-[#1C5CFF] text-white":"bg-[#8C1936] text-white"}`}>
            {currentMode=="tech" ? "TECH" : "LIFE"}
        </button>
        
    </div>
  )
}

export default FixedModeSwitch