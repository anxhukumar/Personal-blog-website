import React from 'react'

function AdminInputBox({
  type="text",
  onChange,
  value,
  placeholder
}) {
  return (
   <>
        <input type={type} onChange={onChange} value={value} placeholder={placeholder} className='w-60 h-9 mb-5 pl-3 rounded-lg bg-[#D4D4D8] font-input' />
   </>
  )
}

export default AdminInputBox