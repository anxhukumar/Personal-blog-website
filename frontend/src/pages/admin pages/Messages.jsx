import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { AdminDropdown} from '../../components'

function Messages() {
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
                        <li className='text-white text-md ml-14 mb-1'>
                            <div className='flex justify-between'>
                                <span className='hover:underline cursor-pointer w-fit'>
                                    dummy message 1
                                </span>
                                <FontAwesomeIcon  icon={faTrash} className='text-red-800 mr-2 mt-1 hover:scale-125' />    
                            </div>
                        </li>
                        <li className='text-white text-md ml-14 mb-1'>
                            <div className='flex justify-between'>
                                <span className='hover:underline cursor-pointer w-fit'>
                                    dummy message 1
                                </span>
                                <FontAwesomeIcon icon={faTrash} className='text-red-800 mr-2 mt-1 hover:scale-125' />    
                            </div>
                        </li>
                    </ol>   
                </div>
            </div>  
            
            {/* MESSAGE CONTAINER */}
            <div className='rounded-md bg-[#1e293b] text-[#D4D4D8] absolute left-[500px] ml-8 flex flex-col gap-5 w-[678px] h-96'>
                <div className='m-5 flex flex-col gap-5'>
                    <div>
                        <span className='font-extrabold ml-[30px] mr-5'>EMAIL:</span>
                        sample@gmail.com
                    </div>
                    
                    <div>
                        <span className='font-extrabold ml-[37px] mr-5'>DATE:</span>
                        Sept 12 2024   |  7:30 PM    
                    </div>
                    
                    <div className='flex'>
                        <span className='font-extrabold mr-5'>MESSAGE:</span>
                        <div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet dictum sem. Nunc sed velit eget massa egestas pellentesque. Proin at commodo neque, in lobortis turpis. Nullam placerat, dolor ut aliquam bibendum, orci felis eleifend tellus, eu aliquam odio eros nec lorem. Mauris vitae dapibus velit, eu posuere orci. Etiam in suscipit massa. Curabitur mi purus, eleifend vel mauris commodo, cursus dapibus nunc. Sed porta consequat diam, et facilisis dui eleifend a.
                        </div>                   
                    </div>
                </div>
            </div>
        
        </div>
   </div>
  )
}

export default Messages