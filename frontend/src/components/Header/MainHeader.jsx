import React from 'react'
import { useState } from 'react'
import { Logo, ModeSwitch, SolidBtn, FixedModeSwitch } from ".."
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowRight, faSquareCheck, faSquareXmark } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from "react-redux";
import { techMode, lifeMode } from "../../features/modeSwitch/modeSwitchSlice"
import { Link, useMatch } from 'react-router-dom'
import conf from '../../conf/conf'
import axios from "axios"

function MainHeader() {
  
  const isBlogPage = useMatch("/blog/:category/:id");
  const currentMode = useSelector((state) => state.modeSwitch.mode)
  const dispatch = useDispatch()
  const [emailInputBox, setEmailInputBox] = useState(false)

  const [emailData, setEmailData] = useState({
    email: ""
  })
 
  const [emailErrorMessage, setEmailErrorMessage] = useState("none")

  const [charWarning, setCharWarning] = useState(false)

  const handleChange = (e) => {
    const {value} = e.target;

    const maxChar = 60;

    if(value.length <= maxChar) {
      setEmailData({
        email: value
      });
      setCharWarning(false)
    }else{
      setCharWarning(true);
      setEmailData({
        email: value.slice(0, maxChar)
      })
    }
    
  }
  
  const handleEmailSubmit = async(e) => {
    e.preventDefault();
    
    try {
      setEmailErrorMessage("none")
      const response = await axios.post(conf.FRONTEND_MAIL_SUBMIT_URL, emailData, {
        headers: {
          "datasourcekey": `${conf.DATA_SOURCE_KEY}` 
        }
      })
      
      if (response.data.msg === "email posted successfully!") {
        setEmailData({
          email: ""
        })
        setEmailErrorMessage("Success");
        setTimeout(() => setEmailErrorMessage("none"), 3000)
      }

      else if(response.data.msg === "Email already exists") {
        setEmailErrorMessage("Exists");
        setTimeout(() => setEmailErrorMessage("none"), 3000)
      }
    
    } catch (error) {
      
      if (error.response?.status === 400) {
        setEmailErrorMessage("Invalid input")
      }
     
      else if (error.response?.status === 429) {
        setEmailErrorMessage("Too many requests")
      }
      
      else {
        setEmailErrorMessage("Server error")
      }
      setTimeout(() => setEmailErrorMessage("none"), 3000)
    }
  }

  return (
    <div className='flex justify-between mx-32 pt-4 pb-4 border-b-2 border-[#D9D9D9]'>
        
        <Link to='/'>
          <Logo className={currentMode == "tech" ? "text-[#1C5CFF] " : "text-[#8C1936]"} />
        </Link>
        
        <div className='flex'>
          
          {isBlogPage ? (
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
              
              <form onSubmit={handleEmailSubmit}>
                <input value={emailData.email} onChange={handleChange} type='email' placeholder='Email'
                className='transition h-9 rounded-l-sm font-sans focus:outline-none focus:border-gray-400' />
               
               <SolidBtn
                type="submit"
                label={
                  <FontAwesomeIcon
                    icon={emailErrorMessage === "Success" ? faSquareCheck : faCircleArrowRight}
                    size="lg"
                    style={{
                      color: emailErrorMessage === "Success" ? "#11fa00" : "#ffffff"
                    }}
                    />
                }
                className={`${currentMode === "tech" ? "bg-[#1C5CFF] hover:bg-[#164ACC]" : "bg-[#8C1936] hover:bg-[#701527]"} 
                  transition duration-700 ease-in-out transform hover:scale-95 rounded-l-none`}
              />
              {emailErrorMessage==="Server error" && (
                  <div className='flex justify-center items-center gap-2 w-fit ml-24'>
                    <FontAwesomeIcon icon={faSquareXmark} className='size-5' style={{color: "#ec3232",}}/>
                    <h1 className='text-red-700'>Server Error</h1>
                  </div>
              )}
              {emailErrorMessage==="Too many requests" && (
                  <div className='flex justify-center items-center gap-2 w-fit ml-10'>
                    <h1 className='text-red-700'>Too many requests. Try again later</h1>
                  </div>
              )}
              {emailErrorMessage==="Invalid input" && (
                  <div className='flex justify-center items-center gap-2 w-fit ml-10'>
                    <h1 className='text-red-700'>Invalid input</h1>
                  </div>
              )}
              {emailErrorMessage==="Exists" && (
                  <div className='flex justify-center items-center gap-2 w-fit ml-10'>
                    <h1 className='text-red-700'>Email already exists</h1>
                  </div>
              )}
              {charWarning && (
                 <div className='flex justify-center items-center gap-2 w-fit ml-10'>
                  <h1 className='text-red-700'>Too many characters</h1>
               </div>
              )}
              </form>

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