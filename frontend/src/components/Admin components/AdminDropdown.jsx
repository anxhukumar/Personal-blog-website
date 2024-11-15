import React, { useState } from 'react'

function AdminDropdown({className }) {
 
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={`${className}`}>
      <button 
        onClick={toggleDropdown} 
        className="text-[#D4D4D8] bg-black hover:bg-black active:scale-95 transition-transform duration-75 font-bold rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center h-9" 
        type="button"
      >
        CATEGORY 
        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/sv" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
        </svg>
      </button>

      
      <div id="dropdown" className={`z-10 ${isOpen ? '' : 'hidden'} bg-black/80 rounded-lg shadow w-32`}>
        <ul className="py-2 text-sm">
          <li className="h-9 flex items-center justify-center font-bold text-[#D4D4D8] hover:outline hover:outline-1 hover:outline-white cursor-pointer transition-all duration-150">
            Dashboard
          </li>
          <li className="h-9 flex items-center justify-center font-bold text-[#D4D4D8] hover:outline hover:outline-1 hover:outline-white cursor-pointer transition-all duration-150">
            Settings
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AdminDropdown;