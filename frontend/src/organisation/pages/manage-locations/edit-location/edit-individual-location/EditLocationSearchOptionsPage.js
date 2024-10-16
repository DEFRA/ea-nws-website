import React from 'react'
import { useNavigate } from 'react-router'
import LocationSearchOptionsLayout from '../../../../layouts/location/add-or-edit-location/search/LocationSearchOptionsLayout'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'

export default function EditLocationSearchOptionsPage () {
  const navigate = useNavigate()
  const locationOptions = [
    { value: 'Coordinates', label: 'Use X and Y coordinates' },
    { value: 'PinDrop', label: 'Drop a pin on a map' }
  ]

  const navigateToNextPage = (searchOption) => {
    switch (searchOption) {
      case 'Coordinates':
        navigate(
          orgManageLocationsUrls.edit.individualLocation.editLocationCoords
            .xyCoordinatesSearch
        )
        break
      case 'pinDrop':
        // ToDo add in when pin drop pages added
        navigate('/')
        break
      default:
        break
    }
  }

  return (
    <LocationSearchOptionsLayout
      heading='How do you want to change the existing location?'
      searchOptions={locationOptions}
      navigateToNextPage={navigateToNextPage}
    />
  )
}
