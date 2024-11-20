'use client'

import { FC, useState } from 'react'
import { FiSearch } from 'react-icons/fi'

interface SearchBarProps {
  placeholder?: string
  onSearch?: (value: string) => void
}

const SearchBar: FC<SearchBarProps> = ({ 
  placeholder = "Search where you surf...",
  onSearch,
}) => {
  const [searchValue, setSearchValue] = useState('');

  const _onSearch = () => {
    onSearch?.(searchValue);
  }
  
  return (
    <div className="relative max-w-2xl w-full">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full pl-6 pr-4 py-3 rounded-full border border-gray-200 
                 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                 backdrop-blur-sm"
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <div 
        className="absolute right-4 top-1/2 pr-2 -translate-y-1/2 text-gray-400 cursor-pointer"
        onClick={_onSearch}
        style={{ zIndex: 1 }}
      >
        <FiSearch size={20} />
      </div>
 
    </div>
  )
}

export default SearchBar
