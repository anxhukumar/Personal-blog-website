import React, { useEffect, useState } from 'react'
import { GradientBtn, HomeBlogSnippet, MessageForm, SearchBar } from '../components'
import { useSelector } from 'react-redux'
import axios from "axios"
import conf from "../conf/conf"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons'



function Home() {

    const currentMode = useSelector((state) => state.modeSwitch.mode);
    const [messageBox, setMessageBox] = useState(false)
    
    const [snippet, setSnippet] = useState([])
    const [snippetError, setSnippetError] = useState(false)
    
    useEffect(() => {
        const blogSnippetData = async() => {
            try{
            const response = await axios.get(currentMode==="tech" ? (conf.TECH_BLOG_SNIPPET_URL):(conf.LIFE_BLOG_SNIPPET_URL), {
                headers: {
                  "datasourcekey": `${conf.DATA_SOURCE_KEY}` 
                }
              })
            setSnippet(response.data)
            }catch{
                setSnippetError(true)
            }
        }
        blogSnippetData();
    }, [currentMode])

  return (
    <>
        <div className='flex min-h-screen mt-10 mx-32'>
            <div className='flex flex-col gap-10 min-w-80 h-3/4'>
                <SearchBar />
                
                <div className='flex flex-col gap-1'>
                    <span className={`transition duration-700 ${currentMode=="tech" ? "text-[#1C5CFF]" : "text-[#8C1936]"}`}>Topics</span>
                    <ol className='text-white'>
                        <li>
                            <span className='inline-block hover:underline cursor-pointer'>Dummy topic</span>
                        </li>
                        
                        <li>
                            <span className='inline-block hover:underline cursor-pointer'>Dummy topic</span>
                        </li>
                        
                        <li>
                            <span className='inline-block hover:underline cursor-pointer'>Dummy topic</span>
                        </li>
                        
                        <li>
                            <span className='inline-block hover:underline cursor-pointer'>Dummy topic</span>
                        </li>
                       
                        <li>
                            <span className='inline-block hover:underline cursor-pointer'>Dummy topic</span>
                        </li>
                    </ol>
                </div>

                {/* MessageForm with smooth transition */}
                <div className={`transition-all duration-500 ease-in-out transform ${messageBox ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                    {messageBox && <MessageForm closeMessageBox={() => setMessageBox(false)} />}
                </div>
                
                {!messageBox && <GradientBtn label="Get in touch" onClick={() => setMessageBox(true)} />} 
                
            </div>
        
            
            <div className='flex flex-col items-center h-screen w-full overflow-y-auto custom-scrollbar'>
                
                {snippetError ? (
                    <div className='flex justify-center items-center gap-2 w-fit mt-36 ml-40'>
                        <FontAwesomeIcon icon={faSquareXmark} className='size-16' style={{color: "#ec3232",}}/>
                        <h1 className='text-red-700 font-bold text-4xl'>Server Error</h1>
                    </div>
                ):(
                    snippet.map((data) => (
                        data.isPublished && (
                            <HomeBlogSnippet state={{id: data._id, category: data.category.toLowerCase()}} key={data._id} title={data.title} overview={data.overview} datePublished={data.formattedDate}/>
                        )
                        
                    ))
                )}

                
            
            </div>
        </div>
    </>
  )
}

export default Home