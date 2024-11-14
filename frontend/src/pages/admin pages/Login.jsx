import React from 'react'
import { AdminSolidBtn, AdminInputBox } from '../../components'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className='flex justify-center min-h-screen mt-10 mx-32'>
      <div className='flex justify-center  bg-gray-700 w-2/4 h-[530px] rounded-lg'>
          <div className='flex flex-col w-80 mt-24'>
            <div className='text-black font-extrabold text-3xl bg-gray-600 text-center rounded-lg mb-8'>Log in</div>
            <div className='mx-10'>
                <AdminInputBox placeholder="Username" />
                <AdminInputBox placeholder="Password" />
                <AdminSolidBtn label="Log in" className="w-60 rounded-lg mb-10" />
                <Link  to='/admin/signup'>
                  <span className='text-[#D4D4D8] cursor-pointer mx-3.5 hover:underline'>Want to create an account?</span>
                </Link> 
            </div>
          </div>
      </div>
    </div>
  )
}

export default Login  