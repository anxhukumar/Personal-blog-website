import React from 'react'
import {Outlet} from "react-router-dom"
import {MainHeader} from "../components"

function Layout() {
  return (
   <>
    <MainHeader />
    <Outlet />
   </>
  )
}

export default Layout