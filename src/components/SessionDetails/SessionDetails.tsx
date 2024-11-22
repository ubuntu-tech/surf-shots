'use client'

import useSWR from 'swr'
import Image from 'next/image'
import { useState } from 'react'
const fetcher = (url: string) => fetch(url).then((res) => res.json())

type SessionDetailsProps = {
    id: string
}

type Session = {
    placeName: string
    photographerName: string
    date: string
    thumbnailUrl: string
    photos: string[]
}

const SessionDetails = ({ id }: SessionDetailsProps) => {
    const { data, error, isLoading } = useSWR<{ session: Session }>('/api/session/' + id, fetcher)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    return (
        <>
            <div className="max-w-8xl mx-[5%] my-12">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">{data?.session.placeName}</h1>
                    <div className="text-gray-600">
                        <p>Photographer: {data?.session.photographerName}</p>
                        <p>Date: {data?.session.date}</p>
                    </div>
                </header>

                <div className="mt-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {data?.session.photos.map((photo, index) => (
                            <div key={index} className="aspect-[4/3]">
                                <Image
                                    src={photo}
                                    alt={`Photo ${index + 1}`}
                                    className="w-full h-full object-cover rounded-lg cursor-pointer"
                                    width={100}
                                    height={100}
                                    onClick={() => setSelectedImage(photo)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Gallery Modal */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col">
                    {/* Close button */}
                    <button 
                        className="absolute top-4 right-4 text-white text-xl p-2"
                        onClick={() => setSelectedImage(null)}
                    >
                        ✕
                    </button>

                    {/* Main image */}
                    <div className="flex-1 flex items-center justify-center p-4">
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
                            {data?.session.photos.map((photo, index) => (
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
                                        onClick={() => setSelectedImage(photo)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default SessionDetails