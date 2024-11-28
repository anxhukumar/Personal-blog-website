import React from 'react'
import {Outlet} from "react-router-dom"
import {MainHeader} from "../components"

function Layout() {
  return (
   <div className='bg-[#1E1F21] min-h-screen w-full'>
    <MainHeader />
    <Outlet />
   </div>
  )
}

export default Layout