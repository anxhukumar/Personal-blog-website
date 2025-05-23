import React, { useEffect, useState } from 'react'
import { GradientBtn, HomeBlogSnippet, MessageForm, SearchBar} from '../components'
import { useSelector } from 'react-redux'
import axios from "axios"
import conf from "../conf/conf"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark, faSpinner, faSquareXmark } from '@fortawesome/free-solid-svg-icons'
import { useDebounce } from "@uidotdev/usehooks";
import { Link } from 'react-router-dom'



function Home() {

    const currentMode = useSelector((state) => state.modeSwitch.mode);
    const [messageBox, setMessageBox] = useState(false)
    
    const [snippet, setSnippet] = useState([])
    const [snippetError, setSnippetError] = useState(false)
    const [numberOfData, setNumberOfData] = useState(10)

    const [totalCount, setTotalCount] = useState(0)

    const [topics, setTopics] = useState([])

    const [currentSelectedTopic, setCurrentSelectedTopic] = useState("");
    
    const [showMenuInPhone, setShowMenuInPhone] = useState(false);

    //State to store the search bar input
    const [searchInput, setSearchInput] = useState("");

    const [isSearching, setIsSearching] = useState(false);

    //Store the value of search result
    const [searchResults, setSearchResults] = useState([])
    const [searchError, setSearchError] = useState(false)

    //Const to store the debounced value
    const debouncedInput = useDebounce(searchInput, 900);

    const [isServerMounting, setIsServerMounting] = useState(false);
    // TODO: TO BE REMOVED WHEN DEPLOYED COMPLETELY
    
    useEffect(() => {
        setSnippet([]);

        setNumberOfData(10);

        setTotalCount(0);

        setCurrentSelectedTopic("");

        const blogSnippetData = async() => {
            try{
            setIsServerMounting(true);
            // TODO: TO BE REMOVED WHEN DEPLOYED COMPLETELY
            const [snippetResponse, countResponse] = await Promise.all([ 
            axios.get(currentMode==="tech" ? (conf.FRONTEND_TECH_BLOG_HOME_URL):(conf.FRONTEND_LIFE_BLOG_HOME_URL), {
                headers: {
                  "datasourcekey": `${conf.DATA_SOURCE_KEY}`,
                  "numberOfData": 10
                }
              }),
            axios.get(currentMode==="tech" ? (conf.FRONTEND_TECH_BLOG_COUNT_URL):(conf.FRONTEND_LIFE_BLOG_COUNT_URL), {
                headers: {
                  "datasourcekey": `${conf.DATA_SOURCE_KEY}`,
                }
              }),
            ])
            setSnippet(snippetResponse.data)
            setTotalCount(countResponse.data.totalBlogCount)
            }catch{
                setSnippetError(true)
            }finally{
                setIsServerMounting(false); 
                // TODO: TO BE REMOVED WHEN DEPLOYED COMPLETELY
            }
        }
        blogSnippetData();
    }, [currentMode])

    useEffect(() => {
        const fetchTopics = async() => {
            try{
                const response = await axios.get(currentMode==="tech" ? (conf.FRONTEND_TECH_BLOG_TOPICS_URL):(conf.FRONTEND_LIFE_BLOG_TOPICS_URL), {
                    headers: {
                      "datasourcekey": `${conf.DATA_SOURCE_KEY}`
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
                axios.get(currentMode==="tech" ? (conf.FRONTEND_TECH_BLOG_HOME_URL):(conf.FRONTEND_LIFE_BLOG_HOME_URL), {
                    headers: {
                      "datasourcekey": `${conf.DATA_SOURCE_KEY}`,
                      "numberOfData": newLimit,
                      "topic": currentSelectedTopic
                    }
                  }),
                axios.get(currentMode==="tech" ? (conf.FRONTEND_TECH_BLOG_COUNT_URL):(conf.FRONTEND_LIFE_BLOG_COUNT_URL), {
                    headers: {
                      "datasourcekey": `${conf.DATA_SOURCE_KEY}`,
                      "topic": currentSelectedTopic
                    }
                  }),
                ])
            setSnippet((prevState) => [...prevState, ...snippetResponse.data])
            setTotalCount(countResponse.data.totalBlogCount)
            }catch{
                setSnippetError(true)
            }
        }

    const getTopicWiseSnippets = async(topic) => {
        setSnippet([]);

        setNumberOfData(10);

        setTotalCount(0);

        try{
        const [snippetResponse, countResponse] = await Promise.all([ 
        axios.get(currentMode==="tech" ? (conf.FRONTEND_TECH_BLOG_HOME_URL):(conf.FRONTEND_LIFE_BLOG_HOME_URL), {
            headers: {
                "datasourcekey": `${conf.DATA_SOURCE_KEY}`,
                "numberOfData": 10,
                "topic": topic
            }
            }),
        axios.get(currentMode==="tech" ? (conf.FRONTEND_TECH_BLOG_COUNT_URL):(conf.FRONTEND_LIFE_BLOG_COUNT_URL), {
            headers: {
                "datasourcekey": `${conf.DATA_SOURCE_KEY}`,
                "topic": topic
            }
            })
        ])
        setSnippet(snippetResponse.data)
        setTotalCount(countResponse.data.totalBlogCount)
        setCurrentSelectedTopic(topic)
        }catch{
            setSnippetError(true)
        }
        
    }

    const handleChange = (e) => {
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
                    const response = await axios.get(currentMode==="tech" ? (`${conf.FRONTEND_TECH_BLOG_SEARCH_URL}?q=${debouncedInput}`):(`${conf.FRONTEND_LIFE_BLOG_SEARCH_URL}?q=${debouncedInput}`), {
                        headers: {
                          "datasourcekey": `${conf.DATA_SOURCE_KEY}`,
                        }
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
    }, [debouncedInput, currentMode])
        
        

  return (
    <>
        {/* SHOW THIS DIV WHEN THE SCREEN IS LARGE (IDLE) */}
        <div className='hidden md:block'>
            <div className='flex min-h-screen mt-10 mx-32'>
                <div className='flex flex-col min-w-80 h-3/4 relative z-0'>
                    
                    <div className='flex flex-col items-center'>
                        <SearchBar onChange={handleChange} value={searchInput} />
                    {searchInput.length > 0 && 
                        (<div className='bg-white rounded-md max-h-[550px] w-72 mt-11 absolute z-10 opacity-85 overflow-y-auto custom-scrollbar'>
                            <ul className='flex flex-col gap-2'>
                                {!searchError ? (
                                    searchResults.map((data) => (
                                        <Link to={`/blog/${data.category.toLowerCase()}/${data._id}`} key={data._id}>
                                            <li key={data._id} className='text-black text-sm font-headline font-bold inline-block hover:underline cursor-pointer p-1'>
                                                {data.title}
                                            </li>
                                        </Link>
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
                    
                    
                    <div className='flex flex-col gap-1 mt-10'>
                        <span className={`transition duration-700 font-bold ${currentMode=="tech" ? "text-[#1C5CFF]" : "text-[#8C1936]"}`}>Topics</span>
                        
                        <ol className='text-white'>
                            
                        {topics.map((data) => (
                            <li key={data.id}>
                                <span onClick={() => getTopicWiseSnippets(data.topic)} 
                                className={`inline-block hover:underline cursor-pointer p-0.5 font-light font-tags rounded-md 
                                ${currentSelectedTopic === data.topic && (currentMode === "tech" ? `bg-gradient-to-r from-cyan-500 to-blue-500` : 'bg-gradient-to-r from-red-600 to-orange-400')}`}>
                                    
                                    {data.topic}
                                
                                </span>
                            </li>
                        )) }
                        
                        </ol>
                    </div>

                    {/* MessageForm with smooth transition */}
                    <div className={`mt-2 mb-10 transition-all duration-500 ease-in-out transform ${messageBox ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
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
                        {/* Show a loader while server is mounting, TODO: TO BE REMOVED WHEN DEPLOYED COMPLETELY */}
                        {isServerMounting && (
                                <div className="flex items-center justify-center">
                                    <div>
                                        <FontAwesomeIcon className={`w-6 h-6 md:w-10 md:h-10`} icon={faSpinner}  style={{color: "#ffffff",}} spin />
                                        <span className={`text-xl md:text-3xl text-white font-bold`}>Initializing the server<span className='animate-pulse'>...</span></span>
                                    </div>
                                </div>
                                    )
                                }
                        
                        
                            {snippet.map((data) => (
                                data.isPublished && (
                                    <HomeBlogSnippet link={`/blog/${data.category.toLowerCase()}/${data._id}`} key={data._id} title={data.title} overview={data.overview} datePublished={data.formattedDate}/>
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
        </div>
        

        {/* SHOW THIS DIV WHEN THE SCREEN IS SMALLER */}
        <div className='flex flex-col items-center min-h-screen mt-10 md:hidden'>
                
        {showMenuInPhone ? (<FontAwesomeIcon icon={faXmark} size="2xl" style={{color: "#ffffff",}} onClick={() => setShowMenuInPhone(false)} className='self-start ml-14 mb-3 transition-all duration-200' />):
        (<FontAwesomeIcon icon={faBars} size="2xl" style={{color: "#ffffff",}} onClick={() => setShowMenuInPhone(true)} className='self-start ml-14 mb-3 transition-all duration-200' />)}
                {showMenuInPhone && (
                                        <div className='flex flex-col items-start'>
                                            <div className='flex flex-col items-center'>
                                                    <SearchBar onChange={handleChange} value={searchInput} className="w-72" />
                                                {searchInput.length > 0 && 
                                                    (<div className='bg-white rounded-md max-h-[550px] w-72 mt-11 absolute z-10 opacity-85 overflow-y-auto custom-scrollbar'>
                                                        <ul className='flex flex-col gap-2'>
                                                            {!searchError ? (
                                                                searchResults.map((data) => (
                                                                    <Link to={`/blog/${data.category.toLowerCase()}/${data._id}`} key={data._id}>
                                                                        <li key={data._id} className='text-black text-sm font-headline font-bold inline-block hover:underline cursor-pointer p-1'>
                                                                            {data.title}
                                                                        </li>
                                                                    </Link>
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

                                            <div className='flex gap-2 items-center mt-10 w-72'>
                                                <span className={`transition duration-700 font-bold ${currentMode=="tech" ? "text-[#1C5CFF]" : "text-[#8C1936]"}`}>Topics:</span>
                                                
                                                <ol className='text-white flex gap-2 flex-wrap'>
                                                    
                                                    {topics.map((data) => (
                                                        <li key={data.id}>
                                                            <span onClick={() => getTopicWiseSnippets(data.topic)} 
                                                            className={`inline-block hover:underline cursor-pointer p-0.5 font-light font-tags rounded-md border 
                                                            ${currentSelectedTopic === data.topic && (currentMode === "tech" ? `bg-gradient-to-r from-cyan-500 to-blue-500` : 'bg-gradient-to-r from-red-600 to-orange-400')}`}>
                                                                
                                                                {data.topic}
                                                            
                                                            </span>
                                                        </li>
                                                    )) }
                                                
                                                </ol>
                                            </div>

                                                {/* MessageForm with smooth transition */}
                                                <div className={`mt-2 mb-10 transition-all duration-500 ease-in-out transform ${messageBox ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                                                    {messageBox && <MessageForm closeMessageBox={() => setMessageBox(false)} />}
                                                </div>
                                                
                                                {!messageBox && <GradientBtn label="Get in touch" onClick={() => setMessageBox(true)} className="self-center" />}


                                </div>
                )}   
               
                
                    
                    
                <div className='mt-5 flex flex-col items-center h-screen w-80 sm:w-full overflow-y-auto custom-scrollbar'>
                    
                    {snippetError ? (
                        <div className='flex justify-center items-center gap-2 w-fit mt-36 ml-40'>
                            <FontAwesomeIcon icon={faSquareXmark} className='size-16' style={{color: "#ec3232",}}/>
                            <h1 className='text-red-700 font-bold text-xl sm:text-3xl'>Server Error</h1>
                        </div>
                    ):(
                        <>
                        {/* Show a loader while server is mounting, TODO: TO BE REMOVED WHEN DEPLOYED COMPLETELY */}
                        {isServerMounting && (
                                <div className="flex items-center justify-center">
                                    <div>
                                        <FontAwesomeIcon className={`w-6 h-6 md:w-10 md:h-10`} icon={faSpinner}  style={{color: "#ffffff",}} spin />
                                        <span className={`text-xl md:text-3xl text-white font-bold`}>Initializing the server<span className='animate-pulse'>...</span></span>
                                    </div>
                                </div>
                                    )
                                }
                            
                            {snippet.map((data) => (
                                data.isPublished && (
                                    <HomeBlogSnippet link={`/blog/${data.category.toLowerCase()}/${data._id}`} key={data._id} title={data.title} overview={data.overview} datePublished={data.formattedDate}/>
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