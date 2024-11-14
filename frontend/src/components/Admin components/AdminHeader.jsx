import React from 'react'
import { Link } from "react-router-dom"
import { AdminSolidBtn, Logo } from ".."
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons'

function AdminHeader() {
  return (
    <div className='flex justify-between mx-32 pt-4 pb-4 border-b-2 border-[#D9D9D9]'>
        <div className='flex'>
          <Link to='admin/login'>
            <Logo className="text-black" />
          </Link>
          
          <AdminSolidBtn label="ADMIN DASHBOARD" className="w-48 rounded-full ml-3 mt-0.5 text-sm" />
        </div>
        
        <div className="flex items-center">
        <div className="flex items-center animate-bounce">
          <FontAwesomeIcon icon={faMessage} style={{color: "#000000",}} className="size-8 mr-5 relative"/>
          <span className="text-red-700 font-extrabold absolute bottom-[12px] left-[21px]">5</span>
        </div>
        {/* <div className='flex items-center mr-6 hover:scale-110'>
          <FontAwesomeIcon icon={faCircleArrowLeft} className='size-8 mr-2'/>
          <span className='font-bold mt-1'>Back</span>
        </div> */}
        <AdminSolidBtn label="Logout" className="w-32 rounded-lg hover:text-red-700" />
        </div>
    </div>
  )
}

export default AdminHeader