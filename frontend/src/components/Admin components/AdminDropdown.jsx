import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronDown, faCircleChevronUp } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react'

function AdminDropdown({className, menuClassName, label, oneOnClick, twoOnClick, option1, option2}) {
 
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={`${className}`}>
      <button 
        onClick={toggleDropdown} 
        className="w-28 text-[#D4D4D8] bg-black hover:bg-black active:scale-95 transition-transform duration-75 font-bold rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center h-9 gap-3" 
        type="button"
      >
        <div className='w-20'>
          {label}
        </div>
        {isOpen ? (<FontAwesomeIcon icon={faCircleChevronUp} style={{color: "#ffffff",}} beat />
      ) : (
        <FontAwesomeIcon icon={faCircleChevronDown} style={{color: "#ffffff",}} />
      )}
        
      </button>

      
      <div id="dropdown" className={`${menuClassName} z-50 ${isOpen ? '' : 'hidden'} bg-black/95 rounded-lg shadow w-32`}>
        <ul className="py-2 text-sm">
          <li className={`h-9 flex items-center justify-center font-bold text-[#D4D4D8] hover:outline hover:outline-1 hover:outline-white cursor-pointer transition-all duration-150`} onClick={oneOnClick}>
            {option1}
          </li>
          <li className={`h-9 flex items-center justify-center font-bold text-[#D4D4D8] hover:outline hover:outline-1 hover:outline-white cursor-pointer transition-all duration-150`} onClick={twoOnClick}>
            {option2}  
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AdminDropdown;