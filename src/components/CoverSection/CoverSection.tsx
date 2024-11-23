import { SearchBar } from '@/components/SearchBar'

const CoverSection = () => {
  return (
    <section className="relative h-[400px] md:h-[500px] w-full">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/cover.jpeg")',
          backgroundPosition: 'center 30%'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4">
        <div className="h-full flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Catch Your Wave,<br />Keep The Moment
          </h1>
          <SearchBar />
        </div>
      </div>
    </section>
  )
}

export default CoverSection
