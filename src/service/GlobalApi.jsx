import axios from "axios"
const UNSPLASH_ACCESS_KEY = "KRM6KadiewDR4LCU8grnUMsXf0XZfrqX2PQW9mpx54M"

// Geoapify Configuration
const GEOAPIFY_KEY = import.meta.env.VITE_Geoapify_API_KEY // Get from Geoapify (free)
const GEOAPIFY_URL = "https://api.geoapify.com/v1/geocode"

/**
 * Get place details (using Geoapify)
 * @param {Object} data - Should contain either place_id or lat/lon
 * @returns {Promise<Object>} - Place details
 */
export const GetPlaceDetails = async (data) => {
  try {
    // Handle both text query and place_id cases
    if (data.textQuery) {
      const response = await axios.get(`${GEOAPIFY_URL}/search`, {
        params: {
          text: data.textQuery,
          apiKey: GEOAPIFY_KEY,
          limit: 1,
          format: "json",
        },
      })
      return response.data.features?.[0]?.properties || null
    }

    // Fallback to reverse geocoding if lat/lon provided
    if (data.lat && data.lon) {
      const response = await axios.get(`${GEOAPIFY_URL}/reverse`, {
        params: {
          lat: data.lat,
          lon: data.lon,
          apiKey: GEOAPIFY_KEY,
          format: "json",
        },
      })
      return response.data.features?.[0]?.properties || null
    }

    return null
  } catch (error) {
    console.error("GetPlaceDetails error:", error)
    return null
  }
}

/**
 * Get photo URL for a place (using Wikimedia Commons/OSM)
 * @param {string} placeName - Display name of the place
 * @returns {Promise<string>} - Photo URL
 */

export const PHOTO_REF_URL = async (placeName) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        placeName
      )}&per_page=1&client_id=${UNSPLASH_ACCESS_KEY}`
    )
    const data = await response.json()
    const results = data.results

    if (results.length > 0 && results[0].urls && results[0].urls.regular) {
      return results[0].urls.regular
    }

    // Fallback to placeholder if no image found
    return "/placeholder.jpg"
  } catch (error) {
    console.error("Unsplash fetch error:", error)
    return "/placeholder.jpg"
  }
}

// Additional helper functions
export const searchPlaces = async (query) => {
  const response = await axios.get(`${GEOAPIFY_URL}/autocomplete`, {
    params: {
      text: query,
      apiKey: GEOAPIFY_KEY,
      limit: 5,
      format: "json",
    },
  })
  return response.data.features || []
}
