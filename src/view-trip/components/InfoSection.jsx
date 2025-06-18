import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi"

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState("/placeholder.jpg")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (trip) {
      GetPlacePhoto()
    }
  }, [trip])

  const GetPlacePhoto = async () => {
    try {
      setIsLoading(true)

      // Get photo directly using the location name
      const locationName = trip?.userSelection?.location?.label
      if (locationName) {
        const photoUrl = await PHOTO_REF_URL(locationName)
        setPhotoUrl(photoUrl)
      }
    } catch (error) {
      console.error("Error fetching location photo:", error)
      setPhotoUrl("/placeholder.jpg")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div className="relative h-[340px] w-full rounded-xl overflow-hidden bg-gray-200">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse bg-gray-300 h-full w-full" />
          </div>
        ) : (
          <img
            src={photoUrl}
            alt={trip?.userSelection?.location?.label || "Trip location"}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "/placeholder.jpg"
            }}
          />
        )}
      </div>
      <div>
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location?.label || "Unknown Location"}
          </h2>
          <div className="flex flex-wrap gap-2">
            <span className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-sm">
              📅 {trip?.userSelection?.noOfDays || 0} Day
              {trip?.userSelection?.noOfDays !== 1 ? "s" : ""}
            </span>
            <span className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-sm">
              💰 {trip?.userSelection?.budget || "N/A"} Budget
            </span>
            <span className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-sm">
              👥 {trip?.userSelection?.traveler || 0} Traveler
              {trip?.userSelection?.traveler !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoSection
