import React from 'react'
import LocationOptionsLayout from '../../../layouts/location/manual-add-or-edit-location/search/LocationOptionsLayout'
import { useNavigate } from 'react-router'
import { orgManageLocationsUrls } from '../../../routes/manage-locations/ManageLocationsRoutes'

export default function EditLocationOptionsPage () {
  const navigate = useNavigate()
  const locationOptions = [
    { value: 'Coordinates', label: 'Use X and Y coordinates' },
    { value: 'PinDrop', label: 'Drop a pin on a map' }
  ]

  const navigateToNextPage=(searchOption) => {
    switch(searchOption) {
      case "Coordinates":
        navigate(orgManageLocationsUrls.edit.xyCoordinatesSearch)
        break
      case "pinDrop":
        //ToDo add in when pin drop pages added
        navigate('/') 
        break
      default:
        break
    }
  }

  return (
    <LocationOptionsLayout
      heading='How do you want to change the existing location?'
      searchOptions={locationOptions}
      errorMessage='Select if you want to use X and Y coordinates or drop a pin on a map'
      navigateToNextPage={navigateToNextPage}
    />
  )
}
