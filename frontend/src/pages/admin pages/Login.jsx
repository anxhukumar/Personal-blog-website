import React, { useState } from 'react'
import { AdminSolidBtn, AdminInputBox } from '../../components'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons'


function Login() {

  const navigate = useNavigate();

  const[loginData, setLoginData]=useState({
    userName:"",
    password:""
  })

  const [finalMsgToUser, setFinalMsgToUser] = useState("none")


  const handleChange=(e) => {
    const {placeholder, value} = e.target;

    const inputMap = {
      Username: "userName",
      Password: "password"
    }

    setLoginData((prevState) => ({
      ...prevState,
      [inputMap[placeholder]]: value
    }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    try{
      const response = await axios.post("/api/v1/admin/login", loginData);
      const backendMsg = response.data.status || response.data.msg;
      //Conditions to show user if there is any error
      if (backendMsg==="Logged in") {
        const jwtToken = response.data.token;
        localStorage.setItem('token', jwtToken); //TODO: THIS NEEDS TO CHANGED TO A MORE SECURE METHOD.
        navigate("/admin")
      }
       else if (backendMsg==="Invalid input") {setFinalMsgToUser("Invalid input")}
          else if (backendMsg==="Invalid username") {setFinalMsgToUser("Invalid username")}
            else if (backendMsg==="Invalid password") {setFinalMsgToUser("Invalid password")}
              else {setFinalMsgToUser("Server error")}
            
    }catch{
      setFinalMsgToUser("Server error")
    } 
  }

  return (
    <div className='flex justify-center min-h-screen mt-10 mx-32'>
      <div className='flex justify-center  bg-gray-700 w-2/4 h-[530px] rounded-lg'>
          <div className='flex flex-col w-80 mt-24'>
            <div className='text-black font-extrabold text-3xl bg-gray-600 text-center rounded-lg mb-8'>Log in</div>
            <div className='mx-10'>
              <form onSubmit={handleSubmit}>
                <AdminInputBox onChange={handleChange} value={loginData.userName} placeholder="Username" />
                <AdminInputBox onChange={handleChange} value={loginData.password} placeholder="Password" type="password" />
                <AdminSolidBtn type="submit" label="Log in" className="w-60 rounded-lg mb-10 hover:bg-gray-900" />
              </form>
                
                <Link  to='/admin/signup'>
                  <span className='text-[#D4D4D8] cursor-pointer mx-3.5 hover:underline'>Want to create an account?</span>
                </Link>
              
              {finalMsgToUser==="Invalid password" ? (
                
                <div className='rounded-lg w-auto flex items-center justify-center mt-5'>
                  <FontAwesomeIcon icon={faSquareXmark} className='size-7 mr-2' style={{color: "#ec3232",}}/>
                  <span className='text-white font-semibold'>Incorrect Password</span>
                </div> 
              
              ): finalMsgToUser==="Invalid username" ? (
                
                <div className='rounded-lg w-auto flex items-center justify-center mt-5'>
                  <FontAwesomeIcon icon={faSquareXmark} className='size-7 mr-2' style={{color: "#ec3232",}}/>
                  <span className='text-white font-semibold'>Invalid username</span>
                </div> 
              
              ): finalMsgToUser==="Invalid input" ? (
                
                <div className='rounded-lg w-auto flex items-center justify-center mt-5'>
                  <FontAwesomeIcon icon={faSquareXmark} className='size-7 mr-2' style={{color: "#ec3232",}}/>
                  <span className='text-white font-semibold'>Invalid input</span>
                </div> 
              
              ): finalMsgToUser==="Server error" ? (
                
                <div className='rounded-lg w-auto flex items-center justify-center mt-5'>
                  <FontAwesomeIcon icon={faSquareXmark} className='size-7 mr-2' style={{color: "#ec3232",}}/>
                  <span className='text-white font-semibold'>Server error</span>
                </div> 
              
              ):(<></>)}
                
            
            </div>
          </div>
      </div>
    </div>
  )
}

export default Login  