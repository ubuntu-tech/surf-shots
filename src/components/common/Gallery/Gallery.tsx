import Image from 'next/image'
import { useCallback, TouchEvent, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type GalleryProps = {
    selectedImage: string | null
    images: string[]
    onClose: () => void
    onSelect: (image: string) => void
}

const Gallery = ({ selectedImage, images, onClose, onSelect }: GalleryProps) => {
    const [touchStart, setTouchStart] = useState<number>(0)
    const [touchEnd, setTouchEnd] = useState<number>(0)

    const handleTouchStart = (e: TouchEvent) => {
        setTouchStart(e.touches[0].clientX)
    }

    const handleTouchMove = (e: TouchEvent) => {
        setTouchEnd(e.touches[0].clientX)
    }

    const handleTouchEnd = useCallback(() => {
        const minSwipeDistance = 50
        const swipeDistance = touchStart - touchEnd

        if (Math.abs(swipeDistance) > minSwipeDistance) {
            const currentIndex = images.indexOf(selectedImage!)
            if (swipeDistance > 0 && currentIndex < images.length - 1) {
                // Swipe left - next image
                onSelect(images[currentIndex + 1])
            } else if (swipeDistance < 0 && currentIndex > 0) {
                // Swipe right - previous image
                onSelect(images[currentIndex - 1])
            }
        }
    }, [touchStart, touchEnd, images, selectedImage, onSelect])

    const currentIndex = selectedImage ? images.indexOf(selectedImage) : -1
    const hasNext = currentIndex < images.length - 1
    const hasPrev = currentIndex > 0

    const handleNext = () => {
        if (hasNext) {
            onSelect(images[currentIndex + 1])
        }
    }

    const handlePrev = () => {
        if (hasPrev) {
            onSelect(images[currentIndex - 1])
        }
    }

    // Add keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedImage) {
                switch (e.key) {
                    case 'ArrowRight':
                        if (hasNext) handleNext();
                        break;
                    case 'ArrowLeft':
                        if (hasPrev) handlePrev();
                        break;
                    case 'Escape':
                        onClose();
                        break;
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage, hasNext, hasPrev, handleNext, handlePrev, onClose]);

    if (!selectedImage) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col">
            {/* Close button */}
            <button 
                className="absolute top-4 right-4 text-white text-xl p-2"
                onClick={onClose}
            >
                ✕
            </button>

            {/* Navigation arrows */}
            {hasPrev && (
                <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                    onClick={handlePrev}
                >
                    <ChevronLeft size={24} />
                </button>
            )}
            {hasNext && (
                <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                    onClick={handleNext}
                >
                    <ChevronRight size={24} />
                </button>
            )}

            {/* Main image */}
            <div 
                className="flex-1 flex items-center justify-center p-4"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <Image
                    src={selectedImage}
                    alt="Selected photo"
                    className="max-h-[calc(100vh-150px)] object-contain"
                    width={1920}
                    height={1080}
                />
            </div>

            {/* Thumbnails */}
            <div className="h-[120px] bg-black bg-opacity-50">
                <div className="flex overflow-x-auto gap-2 p-4">
                    {images.map((photo, index) => (
                        <div 
                            key={index}
                            className={`flex-shrink-0 h-[100px] w-[133px] cursor-pointer ${
                                selectedImage === photo ? 'ring-2 ring-white' : ''
                            }`}
                        >
                            <Image
                                src={photo}
                                alt={`Thumbnail ${index + 1}`}
                                className="h-full w-full object-cover"
                                width={133}
                                height={100}
                                onClick={() => onSelect(photo)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Gallery