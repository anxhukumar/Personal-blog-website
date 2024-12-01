import React, { useEffect, useState } from 'react'
import { GradientBtn, HomeBlogSnippet, MessageForm, SearchBar } from '../components'
import { useSelector } from 'react-redux'
import axios from "axios"
import conf from "../conf/conf"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faSquareXmark } from '@fortawesome/free-solid-svg-icons'
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

    //State to store the search bar input
    const [searchInput, setSearchInput] = useState("");

    const [isSearching, setIsSearching] = useState(false);

    //Store the value of search result
    const [searchResults, setSearchResults] = useState([])
    const [searchError, setSearchError] = useState(false)

    //Const to store the debounced value
    const debouncedInput = useDebounce(searchInput, 900);
    
    useEffect(() => {
        setSnippet([]);

        setNumberOfData(10);

        setTotalCount(0);

        setCurrentSelectedTopic("");

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
                axios.get(currentMode==="tech" ? (conf.TECH_BLOG_SNIPPET_URL):(conf.LIFE_BLOG_SNIPPET_URL), {
                    headers: {
                      "datasourcekey": `${conf.DATA_SOURCE_KEY}`,
                      "numberOfData": newLimit,
                      "topic": currentSelectedTopic
                    }
                  }),
                axios.get(currentMode==="tech" ? ("/api/v1/tech/totalCount"):("/api/v1/life/totalCount"), {
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
        axios.get(currentMode==="tech" ? (conf.TECH_BLOG_SNIPPET_URL):(conf.LIFE_BLOG_SNIPPET_URL), {
            headers: {
                "datasourcekey": `${conf.DATA_SOURCE_KEY}`,
                "numberOfData": 10,
                "topic": topic
            }
            }),
        axios.get(currentMode==="tech" ? ("/api/v1/tech/totalCount"):("/api/v1/life/totalCount"), {
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
                    const response = await axios.get(`/api/v1/${currentMode}/search?q=${debouncedInput}`, {
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
        <div className='flex min-h-screen mt-10 mx-32'>
            <div className='flex flex-col min-w-80 h-3/4 relative z-0'>
                
                <div className='flex flex-col items-center'>
                    <SearchBar onChange={handleChange} value={searchInput} />
                   {searchInput.length > 0 && 
                    (<div className='bg-white rounded-md max-h-[550px] w-72 mt-11 absolute z-10 opacity-85 overflow-y-auto custom-scrollbar'>
                        <ul className='flex flex-col gap-2'>
                            {!searchError ? (
                                searchResults.map((data) => (
                                    <Link to="/blog" key={data._id} state={{id: data._id, category: data.category}}>
                                        <li key={data._id} className='text-black text-sm font-medium inline-block hover:underline cursor-pointer p-1'>
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
                    <span className={`transition duration-700 ${currentMode=="tech" ? "text-[#1C5CFF]" : "text-[#8C1936]"}`}>Topics</span>
                    <ol className='text-white'>
                        
                       {topics.map((data) => (
                        <li key={data.id}>
                            <span onClick={() => getTopicWiseSnippets(data.topic)} 
                            className={`inline-block hover:underline cursor-pointer p-0.5 font-semibold rounded-md 
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