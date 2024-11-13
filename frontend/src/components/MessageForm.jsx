import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'

function MessageForm({closeMessageBox}) {

  const currentMode = useSelector((state) => state.modeSwitch.mode );

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
        <form className='flex flex-col' action=''>
            <label htmlFor="email" className={`transition duration-700 rounded-t-lg text-center h-9 py-1 ${currentMode=="tech" ? "bg-[#1E1D42] text-[#1C5CFF]" : "bg-[#20090F] text-[#890929]"}`}>Your Email</label>
            <input type="email" id="email" name="email" className='bg-[#36373A] text-white h-8' />
            <label htmlFor="message" className={`transition duration-700 text-center h-9 py-1 ${currentMode=="tech" ? "bg-[#1E1D42] text-[#1C5CFF]" : "bg-[#20090F] text-[#890929]"}`}>Message</label>
            <textarea type="text" id="message" name="message" className='bg-[#36373A] text-white h-40 resize-none' />
            <input type="submit" value="Send" className={`transition duration-700 rounded-b-lg text-center h-9 py-1 ${currentMode=="tech" ? "bg-[#1E1D42] hover:bg-[#33366D] text-[#1C5CFF]" : "bg-[#20090F] hover:bg-[#3D1B22] text-[#890929]"}`} />
        </form>
    </div>
  )
}

export default MessageForm