import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { AdminDropdown} from '../../components'
import axios from "axios"

function Messages() {

    const [messagesPreview, setMessagePreview] = useState([])
    const [message, setMessage] = useState({})

    useEffect(() => {
        const fetchMessagePreview= async() => {
        try{
            const token = localStorage.getItem('token');
            const response = await axios.get("/api/v1/admin/messagesPreview", {
                headers: {
                    "authorization": `Bearer ${token}` 
                }
            })
            setMessagePreview(response.data)
           
        }catch{
            console.log(false) //ERROR HANDLING 
        }
    }
      fetchMessagePreview();  
    }, [])

    const getFullMessage = async(id) => {
        try{
            const token = localStorage.getItem('token');
            const response = await axios.get(`/api/v1/admin/message?id=${id}`, {
                headers: {
                    "authorization": `Bearer ${token}` 
                }
            })
            setMessage(response.data)
        }catch{

        }
    }

  return (
    <div className='flex min-h-screen mt-10 mx-32'>
    
        {/* MAIN CONTAINER */}
        <div className='relative w-full '>
        
            {/* SIDEBAR */}
            <div className='absolute right-[710px] w-[500px] rounded-md bg-[#1e293b]  transition-all duration-500 opacity-90 min-h-screen'>
            
                <div className='ml-14 mb-4'>
                    <AdminDropdown className='mt-4' label="SORT" menuClassName='absolute' option1="Newest First" option2="Oldest First" />
                </div>
                
                <div className='h-[500px] overflow-y-auto custom-scrollbar flex flex-col gap-2'>
                    <ol className='flex flex-col gap-2'>
                        
                       {messagesPreview.map((data) => (
                        <li key={data.id} className='text-white text-md ml-14 mb-1'>
                            <div className='flex justify-between'>
                                <span onClick={() => getFullMessage(data.id)} className='hover:underline cursor-pointer w-fit'>
                                    {data.preview}
                                </span>
                                <FontAwesomeIcon  icon={faTrash} className='text-red-800 mr-2 mt-1 hover:scale-125' />    
                            </div>
                        </li> 
                       )) 
                       }
                    
                    </ol>   
                </div>
            
            </div>  
            
            {/* MESSAGE CONTAINER */}
            <div className='rounded-md bg-[#1e293b] text-[#D4D4D8] absolute left-[500px] ml-8 flex flex-col gap-5 w-[678px] h-96'>
                <div className='m-5 flex flex-col gap-5'>
                    <div>
                        <span className='font-extrabold ml-[30px] mr-5'>EMAIL:</span>
                        {message.email}
                    </div>
                    
                    <div>
                        <span className='font-extrabold ml-[37px] mr-5'>DATE:</span>
                        {message.formattedDate}    
                    </div>
                    
                    <div className='flex'>
                        <span className='font-extrabold mr-5'>MESSAGE:</span>
                        <div>
                            {message.message}
                        </div>                   
                    </div>
                </div>
            </div>
        
        </div>
   </div>
  )
}

export default Messages