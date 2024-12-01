import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faSquareXmark, faTrash } from '@fortawesome/free-solid-svg-icons'
import { AdminDropdown} from '../../components'
import axios from "axios"
import conf from '../../conf/conf'

function Messages() {

    const [messagesPreview, setMessagesPreview] = useState([])
    const [messagesPreviewError, setMessagesPreviewError] = useState(false)
    
    const [message, setMessage] = useState({})
    const [messageError, setMessageError] = useState(false)
    
    

    useEffect(() => {
        const fetchMessagePreview= async() => {
        try{
            const token = localStorage.getItem('token');
            const response = await axios.get(conf.FRONTEND_ADMIN_GET_MESSAGE_PREVIEW_URL, {
                headers: {
                    "authorization": `Bearer ${token}` 
                }
            })
            setMessagesPreview(response.data)
           
        }catch{
            setMessagesPreviewError(true)
        }
    }
      fetchMessagePreview();  
    }, [])

    const getFullMessage = async(id) => {
        try{

            const token = localStorage.getItem('token');
            const response = await axios.get(`${conf.FRONTEND_ADMIN_GET_MESSAGE_URL}?id=${id}`, {
                headers: {
                    "authorization": `Bearer ${token}` 
                }
            })
            setMessage(response.data)
        }catch{
           setMessageError(true)
        }
    }

  const deleteMsg = async(id) => {
    try{
        const token = localStorage.getItem('token');
        const deleteMsg = await axios.delete(`${conf.FRONTEND_ADMIN_DELETE_MESSAGE_URL}?id=${id}`, {
            headers: {
                "authorization": `Bearer ${token}` 
            }
        })
        setMessagesPreview((prevMessage) => prevMessage.filter((message) => message.id !== id))
    }catch{
        setMessagesPreviewError(true)
    }
  }

  const markAsRead = async(id) => {
    try{
        setMessage((prevMessage) => ({
            ...prevMessage,
            read:true
        }))
        const token = localStorage.getItem('token');
        const updateRead = await axios.patch(conf.FRONTEND_ADMIN_MARK_MESSAGE_AS_READ_URL, {id}, {
            headers: {
                "authorization": `Bearer ${token}` 
            }
        })
    }catch{
        setMessage((prevMessage) => ({
            ...prevMessage,
            read:false
        })); 
        setMessagesPreviewError(true)   
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
                        {/* ERROR MESSAGE */}
                        {messagesPreviewError && (<div className='flex justify-center items-center gap-2 w-fit mt-10 ml-40'>
                            <FontAwesomeIcon icon={faSquareXmark} className='size-7' style={{color: "#ec3232",}}/>
                            <h1 className='text-red-700 font-bold text-2xl'>Server Error</h1>
                        </div>)}
                        
                       {messagesPreview.map((data) => (
                        <li key={data.id} className='text-white text-md ml-14 mb-1'>
                            <div className={`flex justify-between ${data.read === false && (`bg-gradient-to-r from-blue-900 to-[#1e293b]`)}`}>
                                <span onClick={() => getFullMessage(data.id)} className='hover:underline cursor-pointer w-fit'>
                                    {data.preview}
                                </span>
                                <FontAwesomeIcon onClick={() => deleteMsg(data.id)}   icon={faTrash} className='text-red-800 mr-2 mt-1 hover:scale-125' />    
                            </div>
                        </li> 
                       )) 
                       }
                    
                    </ol>   
                </div>
            
            </div>  
            
            {/* MESSAGE CONTAINER */}
            <div className='rounded-md bg-[#1e293b] text-[#D4D4D8] absolute left-[500px] ml-8 flex flex-col gap-5 w-[678px] h-96'>
                
                {/* ERROR MESSAGE */}
                {messageError ? (
                        <div className='flex justify-center items-center gap-2 w-fit mt-44 ml-60'>
                            <FontAwesomeIcon icon={faSquareXmark} className='size-7' style={{color: "#ec3232",}}/>
                            <h1 className='text-red-700 font-bold text-2xl'>Server Error</h1>
                        </div>
                    ):(
                      <>
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
                        
                        <div className='h-9 mt-36 flex justify-center'>
                            <button onClick={() => {markAsRead(message._id)}} className={`h-8 w-32 font-bold rounded-sm hover:outline ${message.read === true ? (`bg-green-900`):(`bg-blue-900`)}`}>
                                {message.read === true ? (
                                    <FontAwesomeIcon icon={faCheck} style={{color: "#ffffff",}} />
                                ):("Mark as Read")}
                            </button>
                        </div>
                      </>  
                    )}
                
               
            
            </div>
        
        </div>
   </div>
  )
}

export default Messages