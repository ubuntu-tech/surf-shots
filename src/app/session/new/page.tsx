'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { PlacesAutocomplete } from '@/components/common/PlacesAutocomplete';
import { useLoadScript } from '@react-google-maps/api';
import { Trash2 } from 'lucide-react';
import { Gallery } from '@/components/common/Gallery';
import Image from 'next/image';
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface PhotoItem {
  id: string;
  file: File;
  preview: string;
}

export default function NewSession() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [sessionName, setSessionName] = useState('');
  const [location, setLocation] = useState('');
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [sessionDate, setSessionDate] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [date, setDate] = useState<Date>()

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ['places'],
  })

  // Redirect if user is not authenticated or not a photographer
  useEffect(() => {
    console.log('status', session);
    if (status === 'unauthenticated') {
      router.push('/');
    } else if (status === 'authenticated' && session?.user?.role !== 'photographer') {
      router.push('/');
    }
  }, [status, session, router]);

  useEffect(() => {
    return () => {
      photos.forEach(photo => URL.revokeObjectURL(photo.preview));
    };
  }, [photos]);

  // Show loading state while checking authentication
  if (status === 'loading' || !session) {
    return <div>Loading...</div>;
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const existingFileNames = new Set(photos.map(photo => photo.file.name));
      
      const newPhotos = Array.from(e.target.files)
        .filter(file => !existingFileNames.has(file.name))
        .map(file => ({
          id: crypto.randomUUID(),
          file: file,
          preview: URL.createObjectURL(file)
        }));
      
      setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
    }
  };

  const removePhoto = (id: string) => {
    setPhotos(prevPhotos => {
      const photoToRemove = prevPhotos.find(photo => photo.id === id);
      if (photoToRemove) {
        URL.revokeObjectURL(photoToRemove.preview);
      }
      return prevPhotos.filter(photo => photo.id !== id);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('sessionName', sessionName);
      formData.append('location', location);
      formData.append('sessionDate', sessionDate);
      photos.forEach((photo) => {
        formData.append('photos', photo.file);
      });

      const response = await fetch('/api/sessions', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        router.push('/sessions');
      } else {
        throw new Error('Failed to create session');
      }
    } catch (error) {
      console.error('Error creating session:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Photo Session</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="sessionName" className="block text-sm font-medium mb-1">
            Session Name (optional)
          </label>
          <input
            type="text"
            id="sessionName"
            value={sessionName}
            onChange={(e) => setSessionName(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
          <p className="text-sm text-gray-600 mt-1 italic">
            If you don&apos;t want to add a custom name, we will use the pattern &apos;Place name - Date&apos;
          </p>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3">
            <label htmlFor="location" className="block text-sm font-medium mb-1">
              Location
            </label>
            {isLoaded && (
              <PlacesAutocomplete
                value={location}
                onChange={setLocation}
                showLabel={false}
              />
            )}
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">
              Session Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => {
                    setDate(newDate);
                    setSessionDate(newDate ? format(newDate, "yyyy-MM-dd") : "");
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 min-h-[280px] flex items-center justify-center">
            <div className="flex flex-col items-center space-y-6 w-full">
              <div className="flex gap-4">
                <label
                  htmlFor="photos"
                  className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
                >
                  Choose Photos
                </label>
                {photos.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      photos.forEach(photo => URL.revokeObjectURL(photo.preview));
                      setPhotos([]);
                    }}
                    className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Remove All
                  </button>
                )}
              </div>
              {photos.length > 0 && (
                <hr className="w-full border-gray-300" />
              )}
              <input
                type="file"
                id="photos"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                className="hidden"
                required
              />
              {photos.length > 0 && (
                <span className="text-sm text-gray-600">
                  {photos.length} photo{photos.length === 1 ? '' : 's'} selected
                </span>
              )}
              
              {photos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
                  {photos.map((photo) => (
                    <div key={photo.id} className="aspect-square relative group">
                      <Image
                        src={photo.preview}
                        alt="Preview"
                        width={200}
                        height={200}
                        className="object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removePhoto(photo.id);
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}

                  <Gallery
                    selectedImage={selectedImage}
                    images={photos.map(p => p.preview)}
                    onClose={() => setSelectedImage(null)}
                    onSelect={(image) => setSelectedImage(image)}
                  />
                </div>
              )}
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2 italic">
            Photos be whitemarked with Snapline logo. Surfers will only see the original photo after payment
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="w-1/2 px-4 py-2 bg-sunsetGold text-white rounded-md hover:bg-sunsetGold/90 disabled:bg-sunsetGold/50"
          >
            {loading ? 'Creating Session...' : 'Create Session'}
          </button>
        </div>
      </form>
    </div>
  );
}
