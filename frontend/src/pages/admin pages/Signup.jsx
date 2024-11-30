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
    confirmPassword: "",
    secretKey: ""
  })
  const [finalMsgToUser, setFinalMsgToUser] = useState("none")
  
  const handleChange = (e) => {
    const {placeholder, value} = e.target;

    const inputMap = {
      "First name": "firstName",
      "Last name": "lastName",
      "Username": "userName",
      "Password": "password",
      "Confirm password": "confirmPassword",
      "Admin secret key": "secretKey"
    }

    setFormData(prevState => ({
      ...prevState,
      [inputMap[placeholder]]: value
    }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    try{
      if (formData.password !== formData.confirmPassword) {return setFinalMsgToUser("Passwords don't match")}
      const data = await axios.post("/api/v1/admin/register", formData);
      const backendMsg = data.data.msg;
      //conditions to show success or failure message to user
      if(backendMsg==="successful") {setFinalMsgToUser("successful"); setTimeout(() => (navigate("/admin/login")), 2000); }
        else if(backendMsg==="Invalid input") {setFinalMsgToUser("Invalid input")}
          else if(backendMsg==="Wrong secret key") {setFinalMsgToUser("Wrong secret key")}
            else {setFinalMsgToUser("Server error")} 
    }catch{
      setFinalMsgToUser("Server error")
    }
  }

  return (
    <div className='flex justify-center min-h-screen mt-10 mx-32'>
      <div className='flex justify-center  bg-gray-700 w-2/4 h-[530px] rounded-lg'>
        {finalMsgToUser==="none" ? (
        <div className='flex flex-col w-80 mt-4'>
          <div className='text-black font-extrabold text-3xl bg-gray-600 text-center rounded-lg mb-8'>Create an account</div>
          <div className='mx-10'>
            <form onSubmit={handleSubmit}>
              <AdminInputBox onChange={handleChange} value={formData.firstName} placeholder="First name" />
              <AdminInputBox onChange={handleChange} value={formData.lastName}  placeholder="Last name" />
              <AdminInputBox onChange={handleChange} value={formData.userName}  placeholder="Username" />
              <AdminInputBox onChange={handleChange} value={formData.password}  placeholder="Password" type='password' />
              <AdminInputBox onChange={handleChange} value={formData.confirmPassword}  placeholder="Confirm password" type='password' />
              <AdminInputBox onChange={handleChange} value={formData.secretKey}  placeholder="Admin secret key" />
              <AdminSolidBtn type="submit" label="Create an account" className="w-60 rounded-lg mb-8  hover:bg-gray-900" />
            </form>
              
              <Link to='/admin/login'>
                <span className='text-[#D4D4D8] cursor-pointer mx-5 hover:underline'>Already have an account?</span>
              </Link> 
          </div>
        </div>): finalMsgToUser==="Invalid input" ? (
            <div className='flex flex-col justify-center items-center transition-all duration-700'>
              <FontAwesomeIcon icon={faSquareXmark} className='size-24' style={{color: "#ec3232",}} shake />
              <span className='text-white font-semibold mt-5'>Invalid input</span>
              
              <span onClick={() => setFinalMsgToUser("none")} className='text-[#D4D4D8] cursor-pointer mx-5 mt-8 hover:underline'>Try again?</span>
              
            </div>
          ): finalMsgToUser==="Server error" ? (
            <div className='flex flex-col justify-center items-center transition-all duration-700'>
              <FontAwesomeIcon icon={faSquareXmark} className='size-24' style={{color: "#ec3232",}} shake />
              <span className='text-white font-semibold mt-5'>There's an issue with the server. Please try again later.</span>

              <span onClick={() => setFinalMsgToUser("none")} className='text-[#D4D4D8] cursor-pointer mx-5 mt-8 hover:underline'>Try again now?</span>
              
            </div>
          ): finalMsgToUser==="Wrong secret key" ? (
            <div className='flex flex-col justify-center items-center transition-all duration-700'>
              <FontAwesomeIcon icon={faSquareXmark} className='size-24' style={{color: "#ec3232",}} shake />
              <span className='text-white font-semibold mt-5'><span className='ml-48'>Invalid secret key</span><br /> Please check with the main admin of the website for the correct key.</span>

              <span onClick={() => setFinalMsgToUser("none")} className='text-[#D4D4D8] cursor-pointer mx-5 mt-8 hover:underline'>Try again?</span>
              
            </div>
          ): finalMsgToUser==="Passwords don't match" ? (
            <div className='flex flex-col justify-center items-center transition-all duration-700'>
            <FontAwesomeIcon icon={faSquareXmark} className='size-24' style={{color: "#ec3232",}} shake />
            <span className='text-white font-semibold mt-5'>Passwords don't match</span>
            
            <span onClick={() => setFinalMsgToUser("none")} className='text-[#D4D4D8] cursor-pointer mx-5 mt-8 hover:underline'>Try again?</span>
            
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