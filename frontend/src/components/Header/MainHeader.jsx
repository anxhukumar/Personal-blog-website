import React from 'react'
import { useState } from 'react'
import { Logo, ModeSwitch, SolidBtn, FixedModeSwitch } from ".."
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from "react-redux";
import { techMode, lifeMode } from "../../features/modeSwitch/modeSwitchSlice"
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom'

function MainHeader() {

  const location = useLocation()
  const currentMode = useSelector((state) => state.modeSwitch.mode)
  const dispatch = useDispatch()
  const [emailInputBox, setEmailInputBox] = useState(false)

  return (
    <div className='flex justify-between mx-32 pt-4 pb-4 border-b-2 border-[#D9D9D9]'>
        
        <Link to='/'>
          <Logo className={currentMode == "tech" ? "text-[#1C5CFF] " : "text-[#8C1936]"} />
        </Link>
        
        <div className='flex'>
          
          {location.pathname=="/blog" ? (
            <FixedModeSwitch />
          ) : (
            <ModeSwitch switchTechMode={() => dispatch(techMode())} 
            switchLifeMode={() => dispatch(lifeMode())}
            techClassName={currentMode=="tech" ? "bg-[#1C5CFF] text-white" : "text-black"}
            lifeClassName={currentMode=="life" ? "bg-[#8C1936] text-white" : "text-black"} />
          )}
          


          {emailInputBox==true ? (
            
            <div className='flex gap-0'>
              
              <span className='text-red-400 font-semibold hover:underline mr-4 mt-2 cursor-pointer'
               onClick={() => setEmailInputBox(false)}>Cancel</span>
              <input type='email' placeholder='Email'
               className='transition h-9 rounded-l-sm font-sans focus:outline-none focus:border-gray-400' />
              
              <SolidBtn label={<FontAwesomeIcon icon={faCircleArrowRight} size="lg" style={{color: "#ffffff"}} />}
               className={`${currentMode === "tech" ? "bg-[#1C5CFF] hover:bg-[#164ACC]" :
               "bg-[#8C1936] hover:bg-[#701527]"} 
              transition duration-700 ease-in-out transform hover:scale-95 rounded-l-none`} />
            </div>
              
            
            
            ) : (
              <SolidBtn label="SUBSCRIBE" className={`${currentMode === "tech" ? "bg-[#1C5CFF] hover:bg-[#164ACC]" :
                 "bg-[#8C1936] hover:bg-[#701527]"} 
              transition duration-700 ease-in-out transform hover:scale-95`} onClick={() => setEmailInputBox(true)} />
            )}
        
        </div>
    </div>
  )
}

export default MainHeader