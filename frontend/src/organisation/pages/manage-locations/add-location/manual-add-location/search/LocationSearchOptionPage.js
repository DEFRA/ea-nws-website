import React from 'react'
import { useSelector } from 'react-redux'
import LocationOptionsLayout from '../../../../../layouts/add-location/manual-add-or-edit-location/search/LocationOptionsLayout'
export default function LocationSearchOptionPage () {
  const locationName = useSelector((state) => state.session.currentLocation.name)
  const searchOptions = [
    { label: 'Use a postcode', value: 'UseAPostcode' },
    { label: 'Use X and Y coordinates', value: 'UseXAndYCoordinates' },
    { label: 'Drop a pin on a map', value: 'DropAPinOnAMap' }
  ]

  return (
    <LocationOptionsLayout
      heading={`How do you want to find ${locationName}?`}
      searchOptions={searchOptions}
      errorMessage='Select how you want to find this location'
    />
  )
}
