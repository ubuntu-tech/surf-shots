'use client'
import { FC, useEffect, useRef, useCallback } from 'react'
import { FiSearch } from 'react-icons/fi'
import { useLoadScript } from "@react-google-maps/api";


interface SearchBarProps {
  placeholder?: string
}

const libraries: ["places"] = ["places"];

const SearchBar: FC<SearchBarProps> = ({ 
  placeholder = "Search where you surf...",
}) => {
  const inputRef = useRef(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  //eslint-disable-next-line
  const handlePlaceChanged = useCallback((autocomplete: any) => {
    if (!isLoaded) return;
    const place = autocomplete.getPlace();

    const formattedPlace = `${place.name}, ${place.address_components[1].long_name} - ${place.address_components[2].short_name}, ${place.address_components[place.address_components.length - 1].short_name}`;
    console.log('formattedPlace', formattedPlace)
  }, [isLoaded]);


  useEffect(() => {
    if (!isLoaded || loadError) return;

    const options = {
      componentRestrictions: { country: "br" },
      fields: ["address_components", 'name'],
      types: ["natural_feature"],
    };

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current!, options);
    autocomplete.addListener("place_changed", () => handlePlaceChanged(autocomplete));
  }, [isLoaded, loadError, handlePlaceChanged]);
  
  return (
    <div className="relative max-w-2xl w-full">
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        className="w-full pl-6 pr-4 py-3 rounded-full border border-gray-200 
                 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                 backdrop-blur-sm"
      />
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
