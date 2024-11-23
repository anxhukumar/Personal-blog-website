import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

function Loading({className, textClassName, spinnerClassName}) {
  return (
    <div className={className}>
        <FontAwesomeIcon className={spinnerClassName} icon={faSpinner}  style={{color: "#ffffff",}} spin />
        <span className={textClassName}>Loading<span className='animate-pulse'>...</span></span>
    </div>
  )
}

export default Loading