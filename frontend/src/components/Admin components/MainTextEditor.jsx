import React, { useEffect, useState } from 'react'
import QuillTextEditor from './QuillTextEditor'
import {AdminSolidBtn, DeleteConfirmation} from '..'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSquareXmark, faTrash} from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import DOMPurify from "dompurify"
import conf from '../../conf/conf'


function MainTextEditor({oldBlogData}) {

  const [isPublished, setIsPublished] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    overview: "",
    mainContent: "",
    tags: [],
    category: "",
    isPublished: false 
  })

  const [blogSaveError, setBlogSaveError] = useState(false)

  const [openDeleteBox, setOpenDeleteBox] = useState(false)

  useEffect(() => {
    if(Object.keys(oldBlogData).length>0) {
      setFormData(oldBlogData)
    }
  },[oldBlogData])

  const handleChange = (e) => {
   const {name, value} = e.target;

    if(name==="tags") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value.split("|")
      }))
    }else{
      setFormData((prevState) => ({
        ...prevState,
        [name]: value
      }))
    }
  }

  const togglePublishStatus = () => {
    setFormData((prevState) => ({
      ...prevState,
      isPublished: !prevState.isPublished
    }))
  }

  const handleNewSubmission = async(e) => {
    e.preventDefault();
    
    try{
      setBlogSaveError(false)
      const sanitizedMainContent = DOMPurify.sanitize(formData.mainContent);
      const token = localStorage.getItem('token');
      const submitBlog = await axios.post(conf.FRONTEND_ADMIN_CREATE_BLOG_URL, {
        ...formData,
        mainContent: sanitizedMainContent
      }, {
        headers: {
          "authorization": `Bearer ${token}` 
      }
      })
      setFormData({
        title: "",
        overview: "",
        mainContent: "",
        tags: [],
        category: "",
        isPublished: false
      })
    }catch{
      setBlogSaveError(true)
    }
  }

  const handleUpdate = async(e) => {
    e.preventDefault();

    try{
      setBlogSaveError(false)
      const sanitizedMainContent = DOMPurify.sanitize(formData.mainContent);
      const token = localStorage.getItem('token');
      const updateBlog = await axios.patch(conf.FRONTEND_ADMIN_UPDATE_BLOG_URL, {
        ...formData,
        mainContent: sanitizedMainContent
      }, {
        headers: {
          "authorization": `Bearer ${token}` 
      }
      })
      setFormData({
        title: "",
        overview: "",
        mainContent: "",
        tags: [],
        category: "",
        isPublished: false
      })
    }catch{
      setBlogSaveError(true)
    }
  }

  const deleteBlog = async() => {
    try{
      setBlogSaveError(false)
      const id = oldBlogData._id;
      const token = localStorage.getItem('token')
      const deleteBlog = await axios.delete(`${conf.FRONTEND_ADMIN_DELETE_BLOG_URL}${id}`, {
        headers: {
          "authorization": `Bearer ${token}`
        }
      })
      setFormData({
        title: "",
        overview: "",
        mainContent: "",
        tags: [],
        category: "",
        isPublished: false
      })
    }catch{
      setBlogSaveError(true)
    }
  }
  

  return (
    <>
      
      <div>
        <form className='flex flex-col gap-5' onSubmit={Object.keys(oldBlogData).length>0 ? (handleUpdate):(handleNewSubmission)}>
            <div className='w-full'>
                <textarea  type="text" name="title" value={formData.title} onChange={handleChange} placeholder='Title' className='bg-[#1E1F21] text-white w-full h-10 text-lg p-1 resize-none rounded-sm' />
            </div>
            
            <div className='w-full'>
            <textarea type="text" name="overview" value={formData.overview} onChange={handleChange}  placeholder='Overview' className='bg-[#1E1F21] text-white w-full h-40 text-lg p-1 resize-none rounded-sm ' />
            </div>

            <div className='w-full border-4'>
              <QuillTextEditor value={formData.mainContent} onChange={(content) => handleChange({ target: { name: 'mainContent', value: content } })}  className="bg-[#ededee] text-lg h-[600px]" />
            </div>
            
            <div className='w-full mb-5'>
              <input type="text" name="tags" value={Array.isArray(formData.tags) ? formData.tags.join("|") : ""} onChange={handleChange}  placeholder='Tags' className='bg-[#1E1F21] text-white  w-full h-9 text-lg p-1 rounded-sm' />
              <span className="text-sm text-white mt-2 block">
              <span className="font-extrabold text-lg mr-1 text-orange-600">*</span>Use <span className="font-extrabold">|</span> to separate tags if giving more than one. The first tag will always be chosen as the topic under which your blog will show up.
              </span>
            </div>
            
            <div className='w-full'>
              <select className='bg-[#1E1F21] text-white w-28 h-7 font-bold text-center rounded-sm ' name="category" value={formData.category} onChange={handleChange}>
                <option value="" disabled>Category</option>
                <option className='font-bold text-center rounded-sm' value="Tech">TECH</option>
                <option className='font-bold text-center rounded-sm' value="Life">LIFE</option>
              </select>
            </div>

            <div className='flex justify-between mt-10'>
              <AdminSolidBtn className="w-32 rounded-lg hover:scale-105" type="submit" label={Object.keys(oldBlogData).length>0 ? (`UPDATE`):(`SAVE`)} />
              <AdminSolidBtn type="button" onClick={togglePublishStatus} className={`bg-[#03510B] w-32 rounded-lg hover:scale-105 ${formData.isPublished ? (`text-red-700`):(`text-green-700`)}`} 
              label={formData.isPublished ? (`UNPUBLISH`):(`PUBLISH`)}/>
            </div>

            {blogSaveError&&(
             <div className='flex justify-center items-center gap-2 w-fit ml-96'>
              <FontAwesomeIcon icon={faSquareXmark} className='size-10' style={{color: "#ec3232",}}/>
              <h1 className='text-red-700 font-bold text-4xl'>Server Error</h1>
            </div>
            )}

            <AdminSolidBtn type="button" onClick={() => { if(formData.title.length>=1) setOpenDeleteBox(true) }} className="w-32 rounded-lg hover:scale-105 text-red-700 mt-8 mb-8" 
            label={
              <>
                <FontAwesomeIcon icon={faTrash} className='mr-2 ' />
                <span>DELETE</span>
              </>
            } />

            <DeleteConfirmation isOpen={openDeleteBox} onClose={() => setOpenDeleteBox(false)} onDelete={deleteBlog} />
        </form>   
      </div>  
        
    </>
  )
}

export default MainTextEditor