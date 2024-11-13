import React from 'react'

function SolidBtn({className, onClick, label}) {
  return (
    <button className={`transition duration-700 w-32 h-9 text-white font-bold rounded-md ${className}`} onClick={onClick}>
        {label}
    </button>
  )
}

export default SolidBtn