import React from "react"
import PlaceCardItem from "./PlaceCardItem"

function PlacesToVisit({ trip }) {
  if (!trip?.tripData?.itinerary?.length) {
    return (
      <div className="mt-5">
        <h2 className="font-bold text-xl">Places to Visit</h2>
        <p className="text-gray-500 mt-2">No itinerary available yet</p>
      </div>
    )
  }

  return (
    <div className="mt-5">
      <h2 className="font-bold text-xl">Places to Visit</h2>
      <div>
        {trip.tripData.itinerary.map((item, index) => (
          <div key={`day-${index}`} className="mt-5">
            <h2 className="font-bold text-lg">
              {item.day || `Day ${index + 1}`}
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {item.plan?.map((place, placeIndex) => (
                <div key={`place-${index}-${placeIndex}`} className="my-2">
                  <h2 className="font-medium text-sm text-orange-600">
                    {place.time || ""}
                  </h2>
                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PlacesToVisit
