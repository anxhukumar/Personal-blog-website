import React from 'react'

function AdminSolidBtn({className, onClick, label, type}) {
  return (
    <button type={type} className={`h-9 bg-black text-[#D4D4D8] font-bold transition-all duration-200 ${className}`} onClick={onClick}>
        {label}
    </button>
  )
}

export default AdminSolidBtn