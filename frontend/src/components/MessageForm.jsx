import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft, faSquareCheck, faSquareXmark } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import conf from "../conf/conf"
import axios from "axios"

function MessageForm({closeMessageBox}) {

  const currentMode = useSelector((state) => state.modeSwitch.mode );
  const [formData, setFormData] = useState({
    email: "",
    message: ""
  })
  const [finalMsgToUser, setFinalMsgToUser] = useState("none")

  const handleChange = (e) => {
    const {id, value} = e.target;

    const charLimit = {
      email: 60,
      message: 250
    }

    const limitedValue = value.slice(0, charLimit[id])

    setFormData(prevState => ({
      ...prevState,
      [id]:limitedValue
    }));
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post("/api/v1/message/submit", formData, {
        headers: {
          "datasourcekey": `${conf.DATA_SOURCE_KEY}` 
        }
      })
      
      const backendMsg = response.data.msg;
     
      if (backendMsg==="successful") {setFinalMsgToUser("successful"); setTimeout(() => setFinalMsgToUser("none"), 3000)}
       
          
    }catch(error){

      const backendMsg = error.response.data.msg;
        
      if(backendMsg==="Invalid input") {
        setFinalMsgToUser("Invalid input"); setTimeout(() => setFinalMsgToUser("none"), 3000)
      }else if(error.response?.status === 429) {
        setFinalMsgToUser("Too many requests"); 
        setTimeout(() => setFinalMsgToUser("none"), 3000)
      }else{
        setFinalMsgToUser("Server Error"); setTimeout(() => setFinalMsgToUser("none"), 3000)
      }
     
    }
  }

  return (
    <div className={`w-80`}>
        <div onClick={closeMessageBox} className={`w-16 mb-2 cursor-pointer hover:opacity-80 transition-opacity ${currentMode === "tech" ? "text-[#1C5CFF]" : "text-[#890929]"}`}>
          <FontAwesomeIcon 
            icon={faCircleArrowLeft} 
            size="lg"
            className='transition duration-700' 
          />
          <span className="ml-2 text-sm transition duration-700">Back</span>
        </div>
        
        {finalMsgToUser==="successful" ? (
          <div className='border-2 border-green-900 h-9 bg-[#36373A]'>
          <span className='flex items-center justify-center'>
            <FontAwesomeIcon icon={faSquareCheck} className='size-5 m-1' style={{color: "#11fa00",}} fade/>
            <span className='font-bold text-white'>Sent</span>
          </span>
        </div>
        ): finalMsgToUser==="Invalid input" ? ( 
        <div className='border-2 border-red-900 h-9 bg-[#36373A]'>
          <span className='flex items-center justify-center'>
            <FontAwesomeIcon icon={faSquareXmark} className='size-5 m-1' style={{color: "#ec3232",}} fade/>
            <span className='font-bold text-white mt-1'>Invalid input</span>
          </span>
        </div>
        ): finalMsgToUser==="Server error" ? (
        <div className='border-2 border-red-900 h-9 bg-[#36373A]'>
          <span className='flex items-center justify-center'>
            <FontAwesomeIcon icon={faSquareXmark} className='size-5 m-1' style={{color: "#ec3232",}} fade/>
            <span className='font-bold text-white mt-1'>Server error</span>
          </span>
        </div>
        ): finalMsgToUser==="Too many requests" ? (
          <div className='border-2 border-red-900 h-9 bg-[#36373A]'>
            <span className='flex items-center justify-center'>
              <FontAwesomeIcon icon={faSquareXmark} className='size-5 m-1' style={{color: "#ec3232",}} fade/>
              <span className='font-bold text-white mt-1'>Too many submissions. Try later</span>
            </span>
        </div>
        ):(<></>)}
        
        <form className='flex flex-col' onSubmit={handleSubmit}>
            <label htmlFor="email" className={`transition duration-700 rounded-t-lg text-center h-9 py-1 ${currentMode=="tech" ? "bg-[#1E1D42] text-[#1C5CFF]" : "bg-[#20090F] text-[#890929]"}`}>Your Email</label>
            <input type="email" onChange={handleChange} value={formData.email} id="email" name="email" className='bg-[#36373A] text-white h-8' />
            <label htmlFor="message" className={`transition duration-700 text-center h-9 py-1 ${currentMode=="tech" ? "bg-[#1E1D42] text-[#1C5CFF]" : "bg-[#20090F] text-[#890929]"}`}>Message</label>
            <textarea type="text" onChange={handleChange} value={formData.message} id="message" name="message" className='bg-[#36373A] text-white h-40 resize-none' />
            <button type="submit" className={`transition duration-700 rounded-b-lg text-center h-9 py-1 hover:font-extrabold ${currentMode=="tech" ? "bg-[#1E1D42] text-[#1C5CFF]" : "bg-[#20090F] text-[#890929]"}`}>Send</button>
        </form>
    </div>
  )
}

export default MessageForm