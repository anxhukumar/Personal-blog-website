import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

function SearchBar({className, onChange, value}) {
  return (
    <div className="relative">
        <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        />
        <input
        onChange={onChange}
        value={value}
        type="text"
        placeholder="Search..."
        className={`h-10 pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-gray-400 ${className}`}
        />
    </div>
  )
}

export default SearchBar