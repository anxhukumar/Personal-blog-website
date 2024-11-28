import React from 'react'
import { AdminHeader } from '../../components'
import { Outlet } from 'react-router-dom'

function AdminLayout() {
  return (
    <div className='bg-gray-600 min-h-screen w-full'>
        <AdminHeader />
        <Outlet />
    </div>
  )
}

export default AdminLayout