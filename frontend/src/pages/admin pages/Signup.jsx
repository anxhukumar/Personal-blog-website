import React, { useState } from 'react'
import { AdminSolidBtn, AdminInputBox } from '../../components'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck, faSquareXmark } from '@fortawesome/free-solid-svg-icons';


function Signup() {
 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    secretKey: ""
  })
  const [registeredSuccessfully, setRegisteredSuccessfully] = useState(false)
  const [error, setError] = useState(false)
  const [serverError, setServerError] = useState(false)

  const handleChange = (e) => {
    const {placeholder, value} = e.target;

    const inputMap = {
      "First name": "firstName",
      "Last name": "lastName",
      "Username": "userName",
      "Password": "password",
      "Secret key": "secretKey"
    }

    setFormData(prevState => ({
      ...prevState,
      [inputMap[placeholder]]: value
    }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    try{
      const data = await axios.post("/api/v1/admin/register", formData);
      const backendMsg = data.data.msg;
      //conditions to show success or failure message to user
      if(backendMsg==="successful") setRegisteredSuccessfully(true)
        else if(backendMsg==="Invalid input") setError(true)
          else setServerError(true) 
      setTimeout(() => (navigate("/admin/login")), 3000);
    }catch{
      setServerError(true)
    }
  }

  return (
    <div className='flex justify-center min-h-screen mt-10 mx-32'>
      <div className='flex justify-center  bg-gray-700 w-2/4 h-[530px] rounded-lg'>
        {!registeredSuccessfully ? (
        <div className='flex flex-col w-80 mt-9'>
          <div className='text-black font-extrabold text-3xl bg-gray-600 text-center rounded-lg mb-8'>Create an account</div>
          <div className='mx-10'>
            <form onSubmit={handleSubmit}>
              <AdminInputBox onChange={handleChange} value={formData.firstName} placeholder="First name" />
              <AdminInputBox onChange={handleChange} value={formData.lastName}  placeholder="Last name" />
              <AdminInputBox onChange={handleChange} value={formData.userName}  placeholder="Username" />
              <AdminInputBox onChange={handleChange} value={formData.password}  placeholder="Password" />
              <AdminInputBox onChange={handleChange} value={formData.secretKey}  placeholder="Secret key" />
              <AdminSolidBtn type="submit" label="Create an account" className="w-60 rounded-lg mb-10 hover:bg-gray-900" />
            </form>
              <Link to='/admin/login'>
                <span className='text-[#D4D4D8] cursor-pointer mx-5 hover:underline'>Already have an account?</span>
              </Link> 
          </div>
        </div>): error==true ? (
            <div className='flex flex-col justify-center items-center transition-all duration-700'>
              <FontAwesomeIcon icon={faSquareXmark} className='size-24' style={{color: "#ec3232",}} shake />
              <span className='text-white font-semibold mt-5'>Invalid input</span>
            </div>
          ): serverError ? (
            <div className='flex flex-col justify-center items-center transition-all duration-700'>
              <FontAwesomeIcon icon={faSquareXmark} className='size-24' style={{color: "#ec3232",}} shake />
              <span className='text-white font-semibold mt-5'>Server side error</span>
            </div>
          ):(
            <div className='flex flex-col justify-center items-center transition-all duration-700'>
              <FontAwesomeIcon icon={faSquareCheck} className='size-24' style={{color: "#11fa00",}} shake />
              <span className='text-white font-semibold mt-5'>Registered successfully</span>
            </div>
            )}
          
        
    </div>
  </div>
  )
}

export default Signup