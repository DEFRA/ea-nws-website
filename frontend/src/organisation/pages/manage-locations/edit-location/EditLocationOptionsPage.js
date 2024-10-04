import React from 'react'
import LocationOptionsLayout from '../../../layouts/add-location/manual-add-or-edit-location/search/LocationOptionsLayout'
export default function EditLocationOptionsPage () {
  const locationOptions = [
    { value: 'Coordinates', label: 'Use X and Y coordinates' },
    { value: 'Pin drop', label: 'Drop a pin on a map' }
  ]

  return (
    <LocationOptionsLayout
      heading='How do you want to change the existing location?'
      searchOptions={locationOptions}
      errorMessage='Select if you want to use X and Y coordinates or drop a pin on a map'
    />
  )
}
