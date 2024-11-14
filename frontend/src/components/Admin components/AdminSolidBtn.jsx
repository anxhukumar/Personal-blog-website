import React from 'react'

function AdminSolidBtn({className, onClick, label}) {
  return (
    <button className={`h-9 bg-black text-[#D4D4D8] font-bold hover:bg-gray-900 transition-all duration-200 ${className}`} onClick={onClick}>
        {label}
    </button>
  )
}

export default AdminSolidBtn