import React, { useEffect } from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSpinner, faSquareXmark } from '@fortawesome/free-solid-svg-icons'
import { AdminDropdown, MainTextEditor, SearchBar } from '../../components'
import axios from "axios"
import conf from '../../conf/conf'
import { useDebounce } from "@uidotdev/usehooks";

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
        const response = await axios.get(blogCategory==="TECH" ? (conf.FRONTEND_GET_ALL_TECH_SNIPPETS_URL) : (conf.FRONTEND_GET_ALL_LIFE_SNIPPETS_URL), {
          headers: {
            "datasourcekey": `${conf.DATA_SOURCE_KEY}`,
            "getall": true 
          },
          withCredentials: true
        });
        setBlogSnippet(response.data)
      }catch{
        setBlogSnippetError(true)
      }finally{
        setSnippetIsLoading(false)
      }
    }
    blogSnippet();
  }, [blogCategory, toggleSidebar])

  const getFullBlog = async(id) => {
    try{
      setBlogSnippetError(false)
      const response = await axios.get(conf.FRONTEND_ADMIN_GET_BLOG_BY_ID_URL, {
        headers: {
          "datasourcekey": `${conf.DATA_SOURCE_KEY}`,
          "id": id  ,
        },
        withCredentials: true
      });
      setBlog(response.data);
      }catch{
        setBlogSnippetError(true)
    }
  }

  //State to store the search bar input
  const [searchInput, setSearchInput] = useState("");

  const [isSearching, setIsSearching] = useState(false);

  //Store the value of search result
  const [searchResults, setSearchResults] = useState([])
  const [searchError, setSearchError] = useState(false)

  //Const to store the debounced value
  const debouncedInput = useDebounce(searchInput, 900);


  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
}

useEffect(() => {
        
  //exit this in the first render and if not input is provided
  if (!debouncedInput) {
      setSearchResults([]);
      setSearchError(false);
      return;
  }
  const searchSnippet = async() => {
      try{
          setSearchError(false)
          setIsSearching(true)
          let finalData;
          if(debouncedInput) {
              const response = await axios.get(`${conf.FRONTEND_ADMIN_SEARCH_BLOGS_URL}?q=${debouncedInput}`, {
                  headers: {
                    "datasourcekey": `${conf.DATA_SOURCE_KEY}`,
                  },
                  withCredentials: true
                })
              finalData = response.data;
          }
          setSearchResults(finalData || [])
      }catch{
          setSearchError(true)
      }finally{
          setIsSearching(false)
      }
  }
  searchSnippet();
}, [debouncedInput])


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
          
          <div className='flex flex-col'>
             <SearchBar className="w-96" onChange={handleSearchChange} value={searchInput} />

             {searchInput.length > 0 && 
                    (<div className='bg-white rounded-md max-h-[550px] w-96 mt-11 absolute z-10 opacity-90 overflow-y-auto custom-scrollbar'>
                        <ul className='flex flex-col gap-2'>
                            {searchError === false ? (
                                searchResults.map((data) => (
                                    
                                        <li onClick={() => getFullBlog(data._id)} key={data._id} className={`${data.category==="Tech" ? (`text-[#1C5CFF]`):(`text-[#8C1936]`) } text-md font-medium inline-block hover:underline cursor-pointer p-1`}>
                                            {data.title}
                                        </li>
                                    
                                    )
                                )
                            ):(
                                <li className='text-black font-semibold inline-block cursor-pointer p-1'>
                                    Server error
                                </li>
                            )
                            }
                        </ul>
                        {/* Show a loader while loading the search results */}
                        {isSearching && (
                            <div className='h-10 flex justify-center'>
                                <FontAwesomeIcon icon={faSpinner} className='size-8'  style={{color: "#0a0a0a",}} spin />
                            </div>
                                )
                            }
                    
                    </div>)}
          </div>
          
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
                            <span onClick={() => getFullBlog(data._id)} className='hover:underline cursor-pointer w-fit font-headline font-bold'>
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