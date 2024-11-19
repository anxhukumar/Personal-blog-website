import React from 'react'
import QuillTextEditor from './QuillTextEditor'
import AdminSolidBtn from './AdminSolidBtn'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTrash} from "@fortawesome/free-solid-svg-icons"

function MainTextEditor() {
  return (
    <>
      
      <div className='flex flex-col gap-5'>
          <div className='w-full'>
              <textarea type="text" placeholder='Title' className='bg-[#ededee] w-full h-10 text-lg p-1 resize-none rounded-sm' />
          </div>
          
          <div className='w-full'>
           <textarea type="text" placeholder='Overview' className='bg-[#ededee] w-full h-40 text-lg p-1 resize-none rounded-sm ' />
          </div>

          <div className='w-full border-4'>
            <QuillTextEditor className="bg-[#ededee] text-lg h-[600px]" />
          </div>
          
          <div className='w-full'>
            <input type="text" placeholder='Tags' className='bg-[#ededee] w-full h-9 text-lg p-1 rounded-sm' />
          </div>
          
          <div className='w-full'>
            <select className='w-28 h-7 font-bold text-center rounded-sm ' name="category" id="category">
              <option className='font-bold text-center rounded-sm' value="TECH">TECH</option>
              <option className='font-bold text-center rounded-sm' value="LIFE">LIFE</option>
            </select>
          </div>

          <div className='flex justify-between mt-10'>
            <AdminSolidBtn className="w-32 rounded-lg hover:scale-105" label="SAVE" />
            <AdminSolidBtn className="bg-[#03510B] hover:text-orange-400 w-32 rounded-lg hover:scale-105" label="PUBLISH"/>
          </div>

          <AdminSolidBtn className="w-32 rounded-lg hover:scale-105 text-red-700 mt-8 mb-8" 
          label={
            <>
              <FontAwesomeIcon icon={faTrash} className='mr-2 ' />
              <span>DELETE</span>
            </>
          } />
          
      </div>  
        
    </>
  )
}

export default MainTextEditor