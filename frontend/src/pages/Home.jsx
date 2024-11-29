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
    const [numberOfData, setNumberOfData] = useState(10)

    const [totalCount, setTotalCount] = useState(0)

    const [topics, setTopics] = useState([])
    
    useEffect(() => {
        setSnippet([]);

        setNumberOfData(10);

        setTotalCount(0);

        const blogSnippetData = async() => {
            try{
            const [snippetResponse, countResponse] = await Promise.all([ 
            axios.get(currentMode==="tech" ? (conf.TECH_BLOG_SNIPPET_URL):(conf.LIFE_BLOG_SNIPPET_URL), {
                headers: {
                  "datasourcekey": `${conf.DATA_SOURCE_KEY}`,
                  "numberOfData": 10
                }
              }),
            axios.get(currentMode==="tech" ? ("/api/v1/tech/totalCount"):("/api/v1/life/totalCount"), {
                headers: {
                  "datasourcekey": `${conf.DATA_SOURCE_KEY}`,
                }
              }),
            ])
            setSnippet(snippetResponse.data)
            console.log(totalCount);
            setTotalCount(countResponse.data.totalBlogCount)
            }catch{
                setSnippetError(true)
            }
        }
        blogSnippetData();
    }, [currentMode])

    useEffect(() => {
        const fetchTopics = async() => {
            try{
                const response = await axios.get(`/api/v1/${currentMode}/getTopics`, {
                    headers: {
                      "datasourcekey": `${conf.DATA_SOURCE_KEY}`,
                    }
                  })
                  setTopics(response.data)
            }catch{
                setTopics({topic: "Server Error"})
            }
        }
        fetchTopics();
        
    }, [currentMode])

    const handleViewMore = async () => {
        const newLimit = numberOfData + 10;
        setNumberOfData(newLimit)
        try{
            const [snippetResponse, countResponse] = await Promise.all([ 
                axios.get(currentMode==="tech" ? (conf.TECH_BLOG_SNIPPET_URL):(conf.LIFE_BLOG_SNIPPET_URL), {
                    headers: {
                      "datasourcekey": `${conf.DATA_SOURCE_KEY}`,
                      "numberOfData": newLimit
                    }
                  }),
                axios.get(currentMode==="tech" ? ("/api/v1/tech/totalCount"):("/api/v1/life/totalCount"), {
                    headers: {
                      "datasourcekey": `${conf.DATA_SOURCE_KEY}`,
                    }
                  }),
                ])
            setSnippet((prevState) => [...prevState, ...snippetResponse.data])
            setTotalCount(countResponse.data.totalBlogCount)
            }catch{
                setSnippetError(true)
            }
        }

        
        

  return (
    <>
        <div className='flex min-h-screen mt-10 mx-32'>
            <div className='flex flex-col gap-10 min-w-80 h-3/4'>
                <SearchBar />
                
                <div className='flex flex-col gap-1'>
                    <span className={`transition duration-700 ${currentMode=="tech" ? "text-[#1C5CFF]" : "text-[#8C1936]"}`}>Topics</span>
                    <ol className='text-white'>
                        
                       {topics.map((data) => (
                        <li>
                            <span className='inline-block hover:underline cursor-pointer'>{data.topic}</span>
                        </li>
                       )) }
                    
                    </ol>
                </div>

                {/* MessageForm with smooth transition */}
                <div className={`mb-10 transition-all duration-500 ease-in-out transform ${messageBox ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
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
                    <>
                        {snippet.map((data) => (
                            data.isPublished && (
                                <HomeBlogSnippet state={{id: data._id, category: data.category.toLowerCase()}} key={data._id} title={data.title} overview={data.overview} datePublished={data.formattedDate}/>
                            )
                            
                        ))}
                        {/* TODO: SHOW THIS ONLY IF THE SNIPPET STATE CONTAINS LESS THAN THE TOTAL NUMBER OF CURRENT MODE BLOGS */}
                        {snippet.length < totalCount && (
                        <span onClick={handleViewMore} className={`cursor-pointer transition-all duration-500 hover:underline text-xl font-bold mr-[550px] mb-16 ${currentMode=="tech" ? "text-[#1C5CFF]" : "text-[#8C1936]"}`}>
                            View More
                        </span>)}
                    </>
                )}

                
            
            </div>
        </div>
    </>
  )
}

export default Home