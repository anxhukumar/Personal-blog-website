import React from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSquareXmark } from '@fortawesome/free-solid-svg-icons'
import { AdminDropdown, SearchBar } from '../../components'

function AdminHome() {

  const [toggleSidebar, setToggleSidebar] = useState(true)

  return (
  <div className='flex min-h-screen mt-10 mx-32'>
    
    {/* MAIN CONTAINER */}
    <div className='relative w-full'>
      
      {/* SIDEBAR */}
      {toggleSidebar ? (
      <div className='absolute right-[710px] w-[500px] rounded-md bg-[#1e293b] z-10 transition-all duration-500 opacity-90 min-h-screen'>
      
        {/* CLOSE ICON & SEARCH BAR */}
        
        <FontAwesomeIcon icon={faSquareXmark} style={{color: "#000000",}} onClick={() => setToggleSidebar(false)} className='size-10 ml-0.5 mt-1 mb-3' />
        
        <div className='ml-14 mb-7'>
          <SearchBar className="w-96"/>
          <AdminDropdown className='mt-4 ' />
        </div>
        <div className='h-[500px] overflow-y-auto custom-scrollbar flex flex-col gap-2'>
        <h3 className='text-white text-md ml-20'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-20'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-20'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-20'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-20'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-20'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-20'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-20'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-20'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-20'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-20'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-20'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-20'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-20'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-20'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-20'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-20'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-20'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-20'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-20'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-20'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-20'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-20'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-20'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-20'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-20'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-20'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-20'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-20'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-20'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-20'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-20'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-20'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-20'>dummy listdummy listdummy listdummy list</h3>
        <h3 className='text-white text-md ml-20'>dummy listdummy listdummy listdummy list</h3>
      </div>
    </div>
      ):(
        <FontAwesomeIcon icon={faBars} style={{color: "#000000"}} onClick={() => setToggleSidebar(true)} className='absolute top-0 size-10' />
      )}
      
      {/* TEXT EDITOR CONTAINER */}
      <div className='absolute left-96 flex flex-col gap-5 w-2/3 z-0'>
        {/* The text editor will come inside this div */}
        <input type='text' placeholder='dummy' className='h-32 bg-[#D4D4D8]' />
        <input type='text' placeholder='dummy' className='h-32 bg-[#D4D4D8]' />
        <input type='text' placeholder='dummy' className='h-32 bg-[#D4D4D8]' />
        <input type='text' placeholder='dummy' className='h-32 bg-[#D4D4D8]' />
      </div>
    </div>
   </div>
  )
}

export default AdminHome