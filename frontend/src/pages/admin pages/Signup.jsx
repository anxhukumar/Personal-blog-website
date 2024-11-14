import React from 'react'
import { AdminSolidBtn, AdminInputBox } from '../../components'
import { Link } from 'react-router-dom'

function Signup() {
  return (
    <div className='flex justify-center min-h-screen mt-10 mx-32'>
    <div className='flex justify-center  bg-gray-700 w-2/4 h-[530px] rounded-lg'>
        <div className='flex flex-col w-80 mt-9'>
          <div className='text-black font-extrabold text-3xl bg-gray-600 text-center rounded-lg mb-8'>Create an account</div>
          <div className='mx-10'>
              <AdminInputBox placeholder="First name" />
              <AdminInputBox placeholder="Last name" />
              <AdminInputBox placeholder="Username" />
              <AdminInputBox placeholder="Password" />
              <AdminInputBox placeholder="Secret key" />
              <AdminSolidBtn label="Create an account" className="w-60 rounded-lg mb-10" />
              <Link to='/admin/login'>
                <span className='text-[#D4D4D8] cursor-pointer mx-5 hover:underline'>Already have an account?</span>
              </Link> 
          </div>
        </div>
    </div>
  </div>
  )
}

export default Signup