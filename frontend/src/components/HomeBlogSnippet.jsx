import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenNib } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function HomeBlogSnippet({title, overview, datePublished, state}) {

  const currentMode = useSelector((state) => state.modeSwitch.mode);

  return (
    <div className='w-3/4 mb-16 flex flex-col gap-4 animate-fade-in-up'>
        
        <Link to="/blog" state={state}>
          <h1 className='text-white font-bold text-3xl hover:underline cursor-pointer'>{title}</h1>
        </Link>
        
        <p className='text-[#C9C9C9] text-sm'>{overview}</p>
        
        <div className='text-white w-36 flex gap-2'>
          <FontAwesomeIcon icon={faPenNib} style={{color: "#ffffff"}} className='mt-1.5 size-3 cursor-text'/>
          <span className={`transition duration-700 ${currentMode=="tech"?"text-[#1C5CFF]":"text-[#8C1936]"}`}>
            {datePublished}
          </span>
        </div>
         
    </div>
  )
}

export default HomeBlogSnippet