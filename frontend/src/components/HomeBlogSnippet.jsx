import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenNib } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function HomeBlogSnippet({title, overview, datePublished, link}) {

  const currentMode = useSelector((state) => state.modeSwitch.mode);

  return (
    <div className='w-3/4 mb-16 flex flex-col gap-4 animate-fade-in-up'>
        
        <Link to={link}>
          <span className='text-white font-headline font-bold text-xl md:text-2xl hover:underline cursor-pointer'>{title}</span>
        </Link>
        
        <p className='text-[#C9C9C9] text-sm font-headline'>{overview}</p>
        
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