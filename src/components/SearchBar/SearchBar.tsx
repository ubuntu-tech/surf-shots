'use client'
import { FC, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import PlacesAutocomplete from '../common/PlacesAutocomplete/PlacesAutocomplete'
import { useLoadScript } from '@react-google-maps/api'

interface SearchBarProps {
  placeholder?: string
}

const libraries: ['places'] = ['places'];

const SearchBar: FC<SearchBarProps> = () => {
  const [location, setLocation] = useState('')
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries,
  })

  return (
    <div className="relative max-w-2xl w-full">
      {isLoaded && (
        <PlacesAutocomplete
          value={location}
        onChange={setLocation}
        showLabel={false}
        />
      )}
      <div 
        className="absolute right-4 top-1/2 pr-2 -translate-y-1/2 text-gray-400 cursor-pointer"
        style={{ zIndex: 1 }}
      >
        <FiSearch size={20} />
      </div>
    </div>
  )
}

export default SearchBar
