import React from 'react'
import {Outlet} from "react-router-dom"
import {MainHeader} from "../components"

function Layout() {
  return (
   <div className='bg-[#1E1F23]'>
    <MainHeader />
    <Outlet />
   </div>
  )
}

export default Layout