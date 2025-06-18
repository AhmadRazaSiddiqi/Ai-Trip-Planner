import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { FaMapLocationDot } from "react-icons/fa6"
import { Link } from "react-router-dom"
import { PHOTO_REF_URL } from "@/service/GlobalApi"

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState("/placeholder.jpg")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (place) {
      GetPlacePhoto()
    }
  }, [place])

  const GetPlacePhoto = async () => {
    try {
      setIsLoading(true)
      if (place?.place) {
        const photoUrl = await PHOTO_REF_URL(place.place)
        setPhotoUrl(photoUrl)
      }
    } catch (error) {
      console.error("Error fetching place photo:", error)
      setPhotoUrl("/placeholder.jpg")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${place?.place}`}
      target="_blank"
    >
      <div className="shadow-sm border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 hover:shadow-md cursor-pointer transition-all">
        {isLoading ? (
          <div className="w-[130px] h-[130px] rounded-xl bg-gray-200 animate-pulse"></div>
        ) : (
          <img
            src={photoUrl}
            alt={place?.place || "Place image"}
            className="w-[130px] h-[130px] rounded-xl object-cover"
            onError={(e) => {
              e.target.src = "/placeholder.jpg"
            }}
          />
        )}
        <div>
          <h2 className="font-bold text-lg">
            {place?.place || "Unknown Place"}
          </h2>
          <p className="text-sm text-gray-500">{place?.details || ""}</p>
          <h2 className="text-xs font-medium mt-2 mb-2">
            🏷️Ticket: {place?.ticket_pricing || "N/A"}
          </h2>
        </div>
      </div>
    </Link>
  )
}

export default PlaceCardItem
