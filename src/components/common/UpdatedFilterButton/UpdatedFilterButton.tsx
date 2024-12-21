'use client'

import { useState } from 'react'
import { Filter, X, MapPin, Calendar, User } from 'lucide-react'
import Image from 'next/image'

// Types
interface FilterState {
  date: {
    from: string
    to: string
  }
  locations: string[]
  photographers: string[]
  priceRange: {
    min: number
    max: number
  }
  shotTypes: string[]
}

interface Location {
  id: string
  name: string
  count: number
}

interface Photographer {
  id: string
  name: string
  avatar: string
  photosCount: number
}

// Mock data
const mockLocations: Location[] = [
  { id: 'pipeline', name: 'Pipeline, Hawaii', count: 245 },
  { id: 'bells-beach', name: 'Bells Beach, Australia', count: 182 },
  { id: 'nazare', name: 'Nazaré, Portugal', count: 156 },
  { id: 'teahupoo', name: `Teahupo'o, Tahiti`, count: 134 },
  { id: 'uluwatu', name: 'Uluwatu, Bali', count: 198 }
]

const mockPhotographers: Photographer[] = [
  { id: 'mike1', name: 'Mike Waters', avatar: '/api/placeholder/100/100', photosCount: 156 },
  { id: 'sarah2', name: 'Sarah Ocean', avatar: '/api/placeholder/100/100', photosCount: 243 },
  { id: 'tom3', name: 'Tom Wave', avatar: '/api/placeholder/100/100', photosCount: 189 }
]

const FilterDrawer = ({ 
  isOpen, 
  onClose,
  filters,
  onFiltersChange
}: { 
  isOpen: boolean
  onClose: () => void
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
}) => {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters)
  
  const handleApplyFilters = () => {
    onFiltersChange(localFilters)
    onClose()
  }

  const toggleLocation = (locationId: string) => {
    setLocalFilters(prev => ({
      ...prev,
      locations: prev.locations.includes(locationId)
        ? prev.locations.filter(id => id !== locationId)
        : [...prev.locations, locationId]
    }))
  }

  const togglePhotographer = (photographerId: string) => {
    setLocalFilters(prev => ({
      ...prev,
      photographers: prev.photographers.includes(photographerId)
        ? prev.photographers.filter(id => id !== photographerId)
        : [...prev.photographers, photographerId]
    }))
  }

  return (
    <div 
      className={`fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-seaFoam flex justify-between items-center">
          <h2 className="text-xl font-bold text-oceanBlue font-primary">Filters</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-seaFoam/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-slate" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-8">
            {/* Date Range */}
            <div>
              <h3 className="text-lg font-primary font-semibold text-oceanBlue mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Date Range
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-secondary text-slate mb-2">From</label>
                  <input
                    type="date"
                    value={localFilters.date.from}
                    onChange={(e) => setLocalFilters(prev => ({
                      ...prev,
                      date: { ...prev.date, from: e.target.value }
                    }))}
                    className="w-full px-3 py-2 rounded-lg border border-seaFoam focus:ring-2 focus:ring-oceanBlue focus:border-transparent transition-all outline-none font-secondary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-secondary text-slate mb-2">To</label>
                  <input
                    type="date"
                    value={localFilters.date.to}
                    onChange={(e) => setLocalFilters(prev => ({
                      ...prev,
                      date: { ...prev.date, to: e.target.value }
                    }))}
                    className="w-full px-3 py-2 rounded-lg border border-seaFoam focus:ring-2 focus:ring-oceanBlue focus:border-transparent transition-all outline-none font-secondary"
                  />
                </div>
              </div>
            </div>

            {/* Locations */}
            <div>
              <h3 className="text-lg font-primary font-semibold text-oceanBlue mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Locations
              </h3>
              <div className="space-y-3">
                {mockLocations.map((location) => (
                  <label
                    key={location.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-seaFoam hover:bg-seaFoam/10 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={localFilters.locations.includes(location.id)}
                        onChange={() => toggleLocation(location.id)}
                        className="w-4 h-4 text-oceanBlue border-seaFoam rounded focus:ring-oceanBlue"
                      />
                      <span className="font-secondary text-slate">{location.name}</span>
                    </div>
                    <span className="text-sm text-slate/60 font-secondary">{location.count}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Photographers */}
            <div>
              <h3 className="text-lg font-primary font-semibold text-oceanBlue mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Photographers
              </h3>
              <div className="space-y-3">
                {mockPhotographers.map((photographer) => (
                  <label
                    key={photographer.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-seaFoam hover:bg-seaFoam/10 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={localFilters.photographers.includes(photographer.id)}
                        onChange={() => togglePhotographer(photographer.id)}
                        className="w-4 h-4 text-oceanBlue border-seaFoam rounded focus:ring-oceanBlue"
                      />
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden relative">
                          <Image
                            src={photographer.avatar}
                            alt={photographer.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="font-secondary text-slate">{photographer.name}</span>
                      </div>
                    </div>
                    <span className="text-sm text-slate/60 font-secondary">{photographer.photosCount}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-lg font-primary font-semibold text-oceanBlue mb-4">Price Range</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-secondary text-slate mb-2">Min ($)</label>
                  <input
                    type="number"
                    min="0"
                    value={localFilters.priceRange.min}
                    onChange={(e) => setLocalFilters(prev => ({
                      ...prev,
                      priceRange: { ...prev.priceRange, min: Number(e.target.value) }
                    }))}
                    className="w-full px-3 py-2 rounded-lg border border-seaFoam focus:ring-2 focus:ring-oceanBlue focus:border-transparent transition-all outline-none font-secondary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-secondary text-slate mb-2">Max ($)</label>
                  <input
                    type="number"
                    min="0"
                    value={localFilters.priceRange.max}
                    onChange={(e) => setLocalFilters(prev => ({
                      ...prev,
                      priceRange: { ...prev.priceRange, max: Number(e.target.value) }
                    }))}
                    className="w-full px-3 py-2 rounded-lg border border-seaFoam focus:ring-2 focus:ring-oceanBlue focus:border-transparent transition-all outline-none font-secondary"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-seaFoam bg-white">
          <div className="flex gap-4">
            <button
              onClick={() => {
                setLocalFilters({
                  date: { from: '', to: '' },
                  locations: [],
                  photographers: [],
                  priceRange: { min: 0, max: 1000 },
                  shotTypes: []
                })
              }}
              className="flex-1 px-6 py-3 border border-seaFoam text-slate font-primary font-semibold rounded-lg hover:bg-seaFoam/10 transition-all"
            >
              Reset
            </button>
            <button
              onClick={handleApplyFilters}
              className="flex-1 px-6 py-3 bg-sunsetGold text-white font-primary font-semibold rounded-lg hover:bg-sunsetGold/90 transition-all"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Update the filter button in your main page component
const UpdatedFilterButton = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    date: { from: '', to: '' },
    locations: [],
    photographers: [],
    priceRange: { min: 0, max: 1000 },
    shotTypes: []
  })

  const activeFiltersCount = [
    filters.locations.length > 0,
    filters.photographers.length > 0,
    filters.date.from || filters.date.to,
    filters.priceRange.min > 0 || filters.priceRange.max < 1000
  ].filter(Boolean).length

  return (
    <>
      <button
        onClick={() => setIsFilterOpen(true)}
        className="px-4 py-2 rounded-full font-primary text-sm whitespace-nowrap bg-white border border-seaFoam text-slate hover:bg-seaFoam/10 transition-all flex items-center gap-2"
      >
        <Filter className="w-4 h-4" />
        Filters
        {activeFiltersCount > 0 && (
          <span className="w-5 h-5 rounded-full bg-sunsetGold text-white text-xs flex items-center justify-center">
            {activeFiltersCount}
          </span>
        )}
      </button>

      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
      />
    </>
  )
}

export { FilterDrawer, UpdatedFilterButton }