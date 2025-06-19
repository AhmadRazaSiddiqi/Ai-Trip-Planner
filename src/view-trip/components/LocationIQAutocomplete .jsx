import React, { useState, useEffect } from "react"
import axios from "axios"
import Select from "react-select"

const GeoapifyAutocomplete = ({ apiKey, selectProps }) => {
  const [inputValue, setInputValue] = useState("")
  const [options, setOptions] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!inputValue.trim() || inputValue.length < 2) {
      setOptions([])
      return
    }

    const delayDebounce = setTimeout(async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(
          "https://api.geoapify.com/v1/geocode/autocomplete",
          {
            params: {
              text: inputValue,
              apiKey: apiKey,
              limit: 5,
            },
          }
        )

        console.log("Geoapify response:", response.data)

        const places = response.data.features.map((feature) => ({
          label: feature.properties.formatted,
          value: feature.properties.place_id,
          lat: feature.properties.lat,
          lon: feature.properties.lon,
          address: feature.properties.address_line2,
          raw: feature.properties,
        }))
        setOptions(places)
      } catch (error) {
        console.error("Geoapify Autocomplete Error:", error)
        setOptions([])
      } finally {
        setIsLoading(false)
      }
    }, 500)

    return () => clearTimeout(delayDebounce)
  }, [inputValue, apiKey])

  return (
    <Select
      styles={customStyles}
      {...selectProps}
      onInputChange={(value, { action }) => {
        if (action === "input-change") {
          setInputValue(value)
        }
        return value
      }}
      onChange={(selectedOption, actionMeta) => {
        // Let react-select handle displaying the selected label
        if (selectProps?.onChange) {
          selectProps.onChange(selectedOption, actionMeta)
        }
      }}
      isLoading={isLoading}
      options={options}
      placeholder="Search for a place..."
      noOptionsMessage={() => "Type to search locations"}
      loadingMessage={() => "Searching..."}
    />
  )
}

export default GeoapifyAutocomplete

const customStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: "#fff",
    borderColor: "#d1d5db",
    borderRadius: "0.5rem",
    minHeight: "40px",
    boxShadow: "none",
    ":hover": {
      borderColor: "#000",
    },
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#f3f4f6" : "#fff",
    color: "#000",
    fontSize: "14px",
    padding: "10px 15px",
  }),
}
