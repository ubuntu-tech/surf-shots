'use client'

import { useState } from 'react'
import { X, ArrowUpDown, ChevronDown, Calendar } from 'lucide-react'

type SortOption = {
  value: 'newest' | 'oldest' | 'price-high' | 'price-low'
  label: string
}

const sortOptions: SortOption[] = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'price-low', label: 'Price: Low to High' }
]

const SortDropdown = ({ 
  selectedSort,
  onSortChange 
}: { 
  selectedSort: SortOption['value']
  onSortChange: (value: SortOption['value']) => void 
}) => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 rounded-lg font-primary text-sm bg-white border border-seaFoam text-slate hover:bg-seaFoam/10 transition-all flex items-center gap-2"
      >
        <ArrowUpDown className="w-4 h-4" />
        Sort: {sortOptions.find(opt => opt.value === selectedSort)?.label}
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg border border-seaFoam z-50">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onSortChange(option.value)
                  setIsOpen(false)
                }}
                className={`w-full px-4 py-2 text-left font-secondary text-sm transition-colors
                  ${selectedSort === option.value 
                    ? 'bg-seaFoam/20 text-oceanBlue font-medium' 
                    : 'text-slate hover:bg-seaFoam/10'
                  } ${option.value === sortOptions[0].value ? 'rounded-t-lg' : ''}
                  ${option.value === sortOptions[sortOptions.length - 1].value ? 'rounded-b-lg' : ''}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

const FiltersSection = () => {
  const [selectedSort, setSelectedSort] = useState<SortOption['value']>('newest')
  const [dateRange, setDateRange] = useState<{ from: string; to: string }>({ from: '', to: '' })

  const onDateRangeChange = (range: { from: string; to: string }) => {
    setDateRange(range)
  }

  return (
    <section className="border-b border-seaFoam sticky top-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            {/* Date Range Input */}
            <div className="flex items-center gap-2">
              <div className="relative flex items-center">
                <Calendar className="absolute left-3 w-4 h-4 text-slate" />
                <input
                  type="date"
                  value={dateRange.from}
                  onChange={(e) => onDateRangeChange({ ...dateRange, from: e.target.value })}
                  className="pl-10 pr-3 py-2 rounded-lg border border-seaFoam focus:ring-2 focus:ring-oceanBlue focus:border-transparent transition-all outline-none font-secondary [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:left-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                />
              </div>
              
              {dateRange.from && (
                <button
                  onClick={() => onDateRangeChange({ from: '', to: '' })}
                  className="hover:text-coral transition-colors p-2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <SortDropdown 
            selectedSort={selectedSort}
            onSortChange={setSelectedSort}
          />
        </div>
      </div>
    </section>
  )
}

export default FiltersSection

