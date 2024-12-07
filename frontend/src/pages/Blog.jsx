import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { Loading } from '../components';
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import conf from '../conf/conf';
import DOMPurify from 'dompurify';
import { techMode, lifeMode } from "../features/modeSwitch/modeSwitchSlice"

function Blog() {

    const dispatch = useDispatch();

    const {id, category} = useParams() || {};


    const [blogData, setBlogData] = useState({})

    const currentMode = useSelector((state) => state.modeSwitch.mode);
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchBlog = async() => {
            try{
                setError(false)
                setIsLoading(true)
                const response = await axios.get(currentMode ? (conf.FRONTEND_TECH_BLOG_URL):(conf.FRONTEND_LIFE_BLOG_URL), {
                    headers: {
                      "datasourcekey": `${conf.DATA_SOURCE_KEY}`,
                      "id": id 
                    }
                })
                setBlogData(response.data);
            }catch{
                setError(true)
            }finally{
                setIsLoading(false)
            }
        }
        fetchBlog();
    }, [id, category])

    //change the currentMode with redux state in case of separate tabs
    useEffect(() => {
        if (category === "tech") {
            dispatch(techMode());
        } else if (category === "life") {
            dispatch(lifeMode());
        }
    }, [category]);
   
    return (
        <div className='flex flex-col min-h-screen w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 mt-16 md:mt-20'>
            {error ? (
                <div className='flex justify-center items-center gap-2 w-full mt-20 md:mt-40'> 
                    <FontAwesomeIcon icon={faSquareXmark} className='w-6 h-6 md:w-10 md:h-10' style={{color: "#ec3232"}}/>
                    <h1 className='text-red-700 font-bold text-xl md:text-3xl'>Server Error</h1>
                </div>
            ) : isLoading ? (
                <div className="mt-20 md:mt-40 flex items-center justify-center">
                    <Loading 
                        textClassName="text-xl md:text-3xl text-white font-bold" 
                        spinnerClassName="w-6 h-6 md:w-10 md:h-10"
                    />
                </div>
            ) : (
                <>
                    <div className='w-full max-w-4xl mx-auto'>
                        <h1 className='text-white font-headline font-extrabold text-xl md:text-3xl mb-6 md:mb-10'>
                            {blogData.title}
                        </h1>
                    </div>

                    <div className={`w-full max-w-4xl mx-auto py-2 md:py-3 text-xs md:text-sm text-gray-400 mb-6 md:mb-8 space-y-1 border-y-2 md:border-y-4 ${
                        currentMode === "tech" ? "border-[#1C5CFF]" : "border-[#8C1936]"
                    }`}>
                        <p className="font-headline font-bold">{blogData.formattedDate}</p>
                        <p className="font-headline font-bold">{blogData.readingTime}</p>
                    </div>
            
                    <div className='w-full max-w-4xl mx-auto mb-12 md:mb-20'>
                        <div
                            className='text-[#EEEEEE] text-base md:text-lg font-content prose prose-invert max-w-none'
                            dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(blogData.mainContent)}}
                        />
                    </div>
                </>
            )}
        </div>
    )
}

export default Blog