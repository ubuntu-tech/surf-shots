'use client'

import { useState } from 'react'
import { Combobox } from '@headlessui/react'
import usePlacesAutocomplete from 'use-places-autocomplete'

interface PlacesAutocompleteProps {
  value: string
  onChange: (address: string) => void
  showLabel?: boolean
  placeholder?: string
  className?: string
}

export const PlacesAutocomplete: React.FC<PlacesAutocompleteProps> = ({
  value,
  onChange,
  showLabel = true,
  placeholder = 'Search by location',
  className,
}) => {

  const [isFocused, setIsFocused] = useState(false)
  const {
    suggestions: { status, data },
    setValue: setSearchValue,
  } = usePlacesAutocomplete({
    requestOptions: { 
        componentRestrictions: { country: "br" }, 
    },
    debounce: 300,
    defaultValue: value,
  })

  const formattedPlaces = data.map(({ place_id, terms }) => ({
    place_id,
    description: `${terms[0].value}, ${terms[1].value}`,
  }))

  return (
    <Combobox value={value} onChange={onChange}>
      <div className="relative z-[100]">
        <div className={`relative ${className}`}>
          <Combobox.Input
            className={`
              peer w-full px-4 py-3 rounded-md border border-gray-300
              bg-white text-gray-900 text-base
              transition-all duration-200
              focus:outline-none focus:ring-2
              focus:border-blue-500 focus:ring-blue-200
            `}
            onChange={(e) => {
              setSearchValue(e.target.value)
              onChange(e.target.value)
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={value}
            placeholder={!showLabel ? placeholder : ''}
          />
          {showLabel && (
            <label
              className={`
                absolute left-4 px-1 bg-white
                text-sm transition-all duration-200
                text-gray-600 peer-focus:text-blue-500
                ${value || isFocused ? '-top-2.5' : 'top-3.5 text-base text-gray-500'}
              `}
            >
              Location
            </label>
          )}
          <Combobox.Options className="absolute z-10 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto z-100">
            {status === 'OK' &&
              formattedPlaces.map(({ place_id, description }) => (
                <Combobox.Option
                  key={place_id}
                  value={description}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-3 pr-9 z-100 ${
                      active ? 'bg-blue-600 text-white' : 'text-gray-900'
                    }`
                  }
                >
                  {description}
                </Combobox.Option>
              ))}
          </Combobox.Options>
        </div>
      </div>
    </Combobox>
  )
}

export default PlacesAutocomplete
