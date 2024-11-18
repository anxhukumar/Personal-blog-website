import React from 'react'
import { Link, useLocation } from "react-router-dom"
import { AdminSolidBtn, Logo } from ".."
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons'


function AdminHeader() {

  const location = useLocation();

  return (
    <div className='flex justify-between mx-32 pt-4 pb-4 border-b-2 border-[#D9D9D9]'>
        <div className='flex'>
          <Link to='admin/login'>
            <Logo className="text-black" />
          </Link>
          
          <AdminSolidBtn label="ADMIN DASHBOARD" className="w-48 rounded-full ml-3 mt-0.5 text-sm" />
        </div>
        
        <div className="flex justify-between items-center">
          <div className='mr-10'>
            {location.pathname=="/admin/messages" ? (
            
            <Link className='flex items-center hover:scale-110' to='/admin'>
            <FontAwesomeIcon icon={faCircleArrowLeft} className='size-8 mr-2'/>
            <span className='font-bold mt-1'>Back</span>
            </Link>
            ):location.pathname=="/admin" && (
            <Link className="flex items-center animate-bounce w-9 " to='/admin/messages'>
            <FontAwesomeIcon icon={faMessage} style={{color: "#000000",}} className="size-8 mr-5 relative"/>
            <span className="text-red-700 font-extrabold absolute bottom-[12px] left-[21px]">5</span>
            </Link>
            )}
          </div>
        
        {(location.pathname=="/admin" || location.pathname=="/admin/messages") && (
          <AdminSolidBtn label="Logout" className="w-32 rounded-lg hover:text-red-700" />
        )}
        </div>
    </div>
  )
}

export default AdminHeader