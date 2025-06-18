// import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'

// function HotelCardItem({ hotel }) {
//     const [photoUrl, setPhotoUrl] = useState();

//     useEffect(() => {
//         hotel&&GetPlacePhoto();
//     }, [hotel])

//     const GetPlacePhoto = async () => {
//         const data = {
//             textQuery: hotel?.name
//         }
//         const result = await GetPlaceDetails(data).then(resp => {
//             console.log(resp.data.places[0].photos[3].name)
//             const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name)
//             setPhotoUrl(PhotoUrl)
//         })
//     }

//     return (
//         <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.name + "," + hotel?.address} target='_blank'>

//             <div className='hover:scale-110 transition-all cursor-pointer mt-5 mb-8'>
//                 <img src={photoUrl?photoUrl:'/placeholder.jpg'} className='rounded-xl h-[180px] w-full object-cover' />
//                 <div className='my-2'>
//                     <h2 className='font-medium'>{hotel?.name}</h2>
//                     <h2 className='text-xs text-gray-500'>📍{hotel?.address}</h2>
//                     <h2 className='text-sm'>💰{hotel?.price}</h2>
//                     <h2 className='text-sm'>⭐{hotel?.rating}</h2>

//                 </div>
//             </div></Link>
//     )
// }

// export default HotelCardItem
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState("/placeholder.jpg")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (hotel) {
      GetPlacePhoto()
    }
  }, [hotel])

  const GetPlacePhoto = async () => {
    try {
      setIsLoading(true)

      // Get photo directly using the hotel name
      const photoUrl = await PHOTO_REF_URL(hotel?.name)
      setPhotoUrl(photoUrl)
    } catch (error) {
      console.error("Error fetching hotel photo:", error)
      setPhotoUrl("/placeholder.jpg")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        hotel?.name +
        "," +
        hotel?.address
      }
      target="_blank"
    >
      <div className="hover:scale-110 transition-all cursor-pointer mt-5 mb-8">
        {isLoading ? (
          <div className="rounded-xl h-[180px] w-full bg-gray-200 animate-pulse"></div>
        ) : (
          <img
            src={photoUrl}
            className="rounded-xl h-[180px] w-full object-cover"
            alt={hotel?.name}
            onError={(e) => {
              e.target.src = "/placeholder.jpg"
            }}
          />
        )}
        <div className="my-2">
          <h2 className="font-medium">{hotel?.name}</h2>
          <h2 className="text-xs text-gray-500">📍{hotel?.address}</h2>
          <h2 className="text-sm">💰{hotel?.price}</h2>
          <h2 className="text-sm">⭐{hotel?.rating}</h2>
        </div>
      </div>
    </Link>
  )
}

export default HotelCardItem
