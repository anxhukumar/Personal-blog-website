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
                const response = await axios.get(`/api/v1/${category}/`, {
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
   
        <div className='flex flex-col min-h-screen mt-20 mx-32'>
            
           {error ? (
            <div className='flex justify-center items-center gap-2 w-fit mt-40 ml-[500px]'>
                <FontAwesomeIcon icon={faSquareXmark} className='size-10' style={{color: "#ec3232",}}/>
                <h1 className='text-red-700 font-bold text-4xl'>Server Error</h1>
            </div>
           ): isLoading ? (
            <Loading className="mt-40 flex items-center justify-center" textClassName="text-4xl text-white font-bold" spinnerClassName="size-10" />
           ):(
            <>
             <div className={`mx-40`}>
                <h1 className='text-white font-bold text-3xl mb-10'>
                    {blogData.title}
                </h1>
            </div>

            <div className={`mx-40 py-3 text-sm text-gray-400 mb-8 space-y-1 border-y-4 ${currentMode=="tech" ? "border-[#1C5CFF]" : "border-[#8C1936]" }`}>
                <p className="font-medium ">{blogData.formattedDate}</p>
                <p className="font-medium ">{blogData.readingTime}</p>
            </div>
            
            {/* CONTAINER OF SANITIZED HTML CONTENT */}
                <div className='mx-40 mb-20'>
                        
                        <div
                            className='text-[#EEEEEE] text-lg' 
                            dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(blogData.mainContent)}}
                        />
                </div>
            </>
            )}
        
        </div>
    
  )
}

export default Blog