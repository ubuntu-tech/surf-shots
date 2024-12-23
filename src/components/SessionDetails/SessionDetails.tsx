'use client'

import useSWR from 'swr'
import Image from 'next/image'
import { useState } from 'react'
import { Gallery } from '../common/Gallery'
import { useCart } from '@/context/CartContext'

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

            <Gallery 
                images={data?.session.photos || []} 
                selectedImage={selectedImage} 
                onClose={() => setSelectedImage(null)} 
                onSelect={setSelectedImage}
            />
        </>
    )
}

export default SessionDetails