'use client'

import { UserAvatarsGroup } from "@/components/UserAvatarsGroup";
import { SessionCardProps } from "./SessionCard.types";
import { SessionActions } from "@/components/SessionActions";
import Image from "next/image";
import Link from "next/link";

const SessionCard = ({ 
  url,
  thumbnailUrl, 
  photographerName, 
  location, 
  date,
  id
}: SessionCardProps): JSX.Element => {
  const handleLikeChange = (isLiked: boolean) => {
    // Handle like state change
    console.log('Like state changed:', isLiked)
  }

  return (
    <article className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      <Link href={`/session/${id}`}>
        <div className="relative h-48">
          <Image 
          src={thumbnailUrl} 
          alt={`${photographerName}'s session`} 
          className="w-full h-full object-cover"
          width={100}
          height={100}
        />
      </div>
      <div className="p-4">
        <h4 className="font-medium text-gray-900">{photographerName}</h4>
        <div className="mt-2 space-y-1">
          <p className="text-gray-600 text-sm flex items-center">
            <LocationIcon className="w-4 h-4 mr-1" />
            {location}
          </p>
          <p className="text-gray-500 text-sm flex items-center">
            <CalendarIcon className="w-4 h-4 mr-1" />
            {date}
          </p>
        </div>
        <div className="flex items-center justify-end mt-4">
          <SessionActions 
            onLikeChange={handleLikeChange}
            initialLiked={false}
            url={url}
          />
          <UserAvatarsGroup />
        </div>
        </div>
      </Link>
    </article>
  );
};

const LocationIcon = ({ className }: { className?: string }): JSX.Element => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const CalendarIcon = ({ className }: { className?: string }): JSX.Element => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

export default SessionCard;