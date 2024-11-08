import React from 'react'
import { Logo, ModeSwitch, SolidBtn } from ".."
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons'

function MainHeader() {

  const [mode, setMode] = useState("tech")
  const [emailInputBox, setEmailInputBox] = useState(false)

  return (
    <div className='flex justify-between mx-32 pt-4 pb-4 border-b-2 border-[#D9D9D9]'>
        
        <Logo className={mode == "tech" ? "text-[#1C5CFF] " : "text-[#8C1936]"} />
        
        <div className='flex'>
          
          <ModeSwitch switchTechMode={() => setMode("tech")} 
           switchLifeMode={() => setMode("life")}
           techClassName={mode=="tech" ? "bg-[#1C5CFF] text-white" : "text-black"}
           lifeClassName={mode=="life" ? "bg-[#8C1936] text-white" : "text-black"} />


          {emailInputBox==true ? (
            
            <div className='flex gap-0'>
              
              <span className='text-red-400 font-semibold hover:underline mr-4 mt-2 cursor-pointer'
               onClick={() => setEmailInputBox(false)}>Cancel</span>
              <input type='email' placeholder='Email' className='transition duration-100 h-9 rounded-l-sm font-sans' />
              
              {/* TODO: Add a submit icon instead of SUBMIT. */}
              
              <SolidBtn label={<FontAwesomeIcon icon={faCircleArrowRight} size="lg" style={{color: "#ffffff",}} />} className={`${mode === "tech" ? "bg-[#1C5CFF] hover:bg-[#164ACC]" :
               "bg-[#8C1936] hover:bg-[#701527]"} 
              transition duration-75 ease-in-out transform hover:scale-95 rounded-l-none`} />
            </div>
              
            
            
            ) : (
              <SolidBtn label="SUBSCRIBE" className={`${mode === "tech" ? "bg-[#1C5CFF] hover:bg-[#164ACC]" :
                 "bg-[#8C1936] hover:bg-[#701527]"} 
              transition duration-75 ease-in-out transform hover:scale-95`} onClick={() => setEmailInputBox(true)} />
            )}
        
        </div>
    </div>
  )
}

export default MainHeader