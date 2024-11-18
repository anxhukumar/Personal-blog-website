import React from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSquareXmark } from '@fortawesome/free-solid-svg-icons'
import { AdminDropdown, SearchBar } from '../../components'

function AdminHome() {

  const [toggleSidebar, setToggleSidebar] = useState(true)
  const [blogCategory, setBlogCategory] = useState("TECH")

  return (
  <div className='flex min-h-screen mt-10 mx-32'>
    
    {/* MAIN CONTAINER */}
    <div className='relative w-full'>
      
      {/* SIDEBAR */}
      {toggleSidebar ? (
      <div className='absolute right-[710px] w-[500px] rounded-md bg-[#1e293b] z-10 transition-all duration-500 opacity-90 min-h-screen'>
      
        {/* CLOSE ICON & SEARCH BAR */}
        
        <FontAwesomeIcon icon={faSquareXmark} style={{color: "#000000",}} onClick={() => setToggleSidebar(false)} className='size-10 ml-0.5 mt-1 mb-3' />
        
        <div className='ml-14 mb-4'>
          <SearchBar className="w-96"/>
          <AdminDropdown className='mt-4' menuClassName='absolute' option1="TECH" option2="LIFE" oneOnClick={() => setBlogCategory("TECH")} twoOnClick={() => setBlogCategory("LIFE")} label={blogCategory=="TECH" ? "TECH" : "LIFE"}  />
        </div>
        <div className='h-[500px] overflow-y-auto custom-scrollbar flex flex-col gap-2'>
        <h3 className='text-white text-md ml-14'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-14'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-14'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-14'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-14'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-14'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-14'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-14'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-14'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-14'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-14'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-14'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-14'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-14'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-14'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-14'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-14'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-14'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-14'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-14'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-14'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-14'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-14'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-14'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-14'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-14'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-14'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-14'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-14'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-14'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-14'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-14'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-14'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-14'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-14'>dummy listdummy listdummy listdummy list</h3>
      </div>
    </div>
      ):(
        <FontAwesomeIcon icon={faBars} style={{color: "#000000"}} onClick={() => setToggleSidebar(true)} className='absolute top-0 size-10' />
      )}
      
      {/* TEXT EDITOR CONTAINER */}
      <div className='absolute left-96 flex flex-col gap-5 w-2/3 z-0'>
        {/* The text editor will come inside this div */}
        
      </div>
    </div>
   </div>
  )
}

export default AdminHome