import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AdminSolidBtn, Logo } from ".."
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faCircleArrowLeft, faXmark } from '@fortawesome/free-solid-svg-icons'
import axios from "axios"
import conf from '../../conf/conf'


function AdminHeader() {

  const location = useLocation();
  const navigate = useNavigate();
  const [unreadMsgCount, setUnreadMsgCount] = useState(0);
  const [logoutError, setLogoutError] = useState(false)

  useEffect(() => {
      const getMsgCount = async() => {
      const response = await axios.get(conf.FRONTEND_ADMIN_MESSAGE_COUNT_URL, {
        withCredentials: true
    })
      const unreadCount = response.data.unreadCount;
      setUnreadMsgCount(unreadCount)
    }
    
    getMsgCount();

    const Intervalid = setInterval(getMsgCount, 30000);
    
    return () => clearInterval(Intervalid);

  }, [location.pathname])

  const logout = async() => {
    try{
      setLogoutError(false);
      const logout = await axios.get(conf.FRONTEND_ADMIN_LOGOUT_URL, {
        withCredentials: true
      });
      navigate("/admin/login", {replace: true});
    }catch{
      setLogoutError(true);
    }
  }

  return (
    <div className='flex justify-between mx-32 pt-4 pb-4 border-b-2 border-[#D9D9D9]'>
        <div className='flex'>
          <Link to='/admin'>
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
            <Link className='relative' to="/admin/messages">
              <div className={`flex items-center ${unreadMsgCount > 0 && (`animate-bounce`)} w-9 "`}>
                <FontAwesomeIcon icon={faMessage} style={{color: "#000000",}} className="size-8 mr-5"/>
                <span className="text-red-700 font-extrabold absolute bottom-[12px] left-[21px]">{unreadMsgCount}</span>
              </div>
            </Link>   
            )}
          </div>
          <div className='flex items-center'>
            
            {/* REMOVE JWT FROM COOKIES WHEN LOGOUT IS PRESSED */}
            {logoutError && (
              <div className='flex items-center justify-center bg-black mr-3 p-0.5 rounded-md'>
                <FontAwesomeIcon icon={faXmark} style={{color: "#cc0000",}} className="size-5"/>
                <span className="text-[#cc0000] rounded-sm font-bold"> Server error</span>
              </div>
              )}
            
            {(location.pathname=="/admin" || location.pathname=="/admin/messages") && (
              <AdminSolidBtn label="Logout" className="w-32 rounded-lg hover:text-red-700" 
              onClick={logout} />
            )}
            
          </div>
        </div>
    </div>
  )
}

export default AdminHeader