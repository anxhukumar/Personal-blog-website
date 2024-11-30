import React, { useEffect } from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSquareXmark } from '@fortawesome/free-solid-svg-icons'
import { AdminDropdown, MainTextEditor, SearchBar } from '../../components'
import axios from "axios"
import conf from '../../conf/conf'

function AdminHome() {

  const [toggleSidebar, setToggleSidebar] = useState(false)
  const [blogCategory, setBlogCategory] = useState("TECH")

  const [blogSnippet, setBlogSnippet] = useState([{}])
  const [blogSnippetError, setBlogSnippetError] = useState(false)
  const [snippetIsLoading, setSnippetIsLoading] = useState(false)

  // Stores blog data that is to be displayed in the text editor
  const [blog, setBlog] = useState({})

  useEffect(() => {
    const blogSnippet = async() => {
      setSnippetIsLoading(true)
      setBlogSnippetError(false)
      try{
        const response = await axios.get(blogCategory==="TECH" ? ("/api/v1/tech/home") : ("/api/v1/life/home"), {
          headers: {
            "datasourcekey": `${conf.DATA_SOURCE_KEY}`,
            "getall": true 
          }
        });
        setBlogSnippet(response.data)
      }catch{
        setBlogSnippetError(true)
      }finally{
        setSnippetIsLoading(false)
      }
    }
    blogSnippet();
  }, [blogCategory])

  const getFullBlog = async(id) => {
    try{
      setBlogSnippetError(false)
      const response = await axios.get(`/api/v1/${blogCategory}/`, {
        headers: {
          "datasourcekey": `${conf.DATA_SOURCE_KEY}`,
          "id": id  
        }
      });
      setBlog(response.data);
      }catch{
        setBlogSnippetError(true)
    }
  }

  return (
  <div className='flex min-h-screen mt-10 mx-32'>
    
    {/* MAIN CONTAINER */}
    <div className='relative w-full'>
      
      {/* SIDEBAR */}
      {toggleSidebar ? (
      <div className='absolute right-[710px] w-[500px] rounded-md bg-[#1e293b] z-10 transition-all duration-500 opacity-95 h-full'>
      
        {/* CLOSE ICON & SEARCH BAR */}
        
        <FontAwesomeIcon icon={faSquareXmark} style={{color: "#000000",}} onClick={() => setToggleSidebar(false)} className='size-10 ml-0.5 mt-1 mb-3' />
        
        <div className='ml-14 mb-4'>
          <SearchBar className="w-96"/>
          <AdminDropdown className='mt-4' menuClassName='absolute' option1="TECH" option2="LIFE" oneOnClick={() => setBlogCategory("TECH")} twoOnClick={() => setBlogCategory("LIFE")} label={blogCategory=="TECH" ? "TECH" : "LIFE"}  />
        </div>
        <div className='h-[900px] overflow-y-auto custom-scrollbar'>
              <ol className='flex flex-col gap-2'>
                  {blogSnippetError ? (
                    <div className='flex justify-center items-center gap-2 w-fit mt-8 ml-32'>
                            <FontAwesomeIcon icon={faSquareXmark} className='size-7' style={{color: "#ec3232",}}/>
                            <h1 className='text-red-700 font-bold text-3xl'>Server Error</h1>
                    </div>
                  ):(
                    snippetIsLoading ? (
                    <li className='text-white text-md ml-14 mb-3'>
                      <span className='hover:underline cursor-pointer w-fit'>
                          Loading...
                      </span>
                    </li>):(
                        blogSnippet.map((data) => (
                          <li key={data._id} className='text-white text-md ml-14 mb-3'>
                            <span onClick={() => getFullBlog(data._id)} className='hover:underline cursor-pointer w-fit'>
                                {data.title}
                            </span>
                          </li>
                        ))
                       )
                    )}
              </ol>
        </div>  
     </div>
      ):(
        <FontAwesomeIcon icon={faBars} style={{color: "#000000"}} onClick={() => setToggleSidebar(true)} className='absolute top-0 size-10' />
      )}
      
      {/* TEXT EDITOR CONTAINER */}
      <div className='mx-24 w-[1000px] z-0'>
        <MainTextEditor oldBlogData={blog} />
      </div>
    
    </div>
   </div>
  )
}

export default AdminHome