import React, { useEffect, useState } from 'react'
import { GradientBtn, HomeBlogSnippet, MessageForm, SearchBar } from '../components'
import { useSelector } from 'react-redux'
import axios from "axios"
import conf from "../conf/conf"


function Home() {

    const currentMode = useSelector((state) => state.modeSwitch.mode);
    const [messageBox, setMessageBox] = useState(false)
    const [snippet, setSnippet] = useState([])
    
    useEffect(() => {
        const blogSnippetData = async() => {
            try{
            const response = await axios.get(currentMode==="tech" ? (conf.TECH_BLOG_SNIPPET_URL):(conf.LIFE_BLOG_SNIPPET_URL))
            setSnippet(response.data)
            }catch{
                setSnippet([{"title": "Server Error"}]) //TODO: SHOW A PROPER ERROR MESSAGE
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
                
                {snippet.map((data) => (
                    <HomeBlogSnippet key={data._id} title={data.title} overview={data.overview} datePublished={data.formattedDate} />
                ))}
            
            </div>
        </div>
    </>
  )
}

export default Home