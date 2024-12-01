import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { Loading } from '..';
import conf from '../../conf/conf';

function PrivateRoute({page}) {

    const navigate = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const verifyToken = async() => {
            try{
                const token = localStorage.getItem('token');
                const response = await axios.post(conf.FRONTEND_ADMIN_VERIFY_TOKEN_URL, {}, {
                headers: {
                    "authorization": `Bearer ${token}` 
                }
            })  
                const isAllowed = response.data.exists;
                if (isAllowed) {setIsAuthorized(true)}
                    else {navigate("/admin/login", {replace: true})}
            }catch{
                console.log("Error occured while authorization")
                navigate("/admin/login", {replace: true})
            }finally{
                setLoading(false)
            }
        }
        verifyToken();  
    }, [navigate])
    
         
  if(loading) {
    return( 
    <div className='min-h-screen flex items-center justify-center'>
        <Loading className="h-16 flex justify-center items-center" spinnerClassName="size-10" textClassName="text-3xl font-bold ml-2" />
    </div>
    )
  }

  return (
    <>
        {isAuthorized ? page : <div className='text-red-700 font-bold'>Access denied</div>}
    </>
  )
}

export default PrivateRoute