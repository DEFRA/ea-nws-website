import React from 'react'
import { useSelector } from 'react-redux'
import LocationOptionsLayout from '../../../../../layouts/location/manual-add-or-edit-location/search/LocationOptionsLayout'
import { useNavigate } from 'react-router'
import { orgManageLocationsUrls } from '../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function LocationSearchOptionPage () {
  const navigate = useNavigate()

  const locationName = useSelector((state) => state.session.currentLocation.name)
  const searchOptions = [
    { label: 'Use a postcode', value: 'UseAPostcode' },
    { label: 'Use X and Y coordinates', value: 'UseXAndYCoordinates' },
    { label: 'Drop a pin on a map', value: 'DropAPinOnAMap' }
  ]

  const navigateToNextPage = (searchOption) => {
    switch(searchOption) {
      case 'UseAPostcode':
        navigate(orgManageLocationsUrls.search.postCodeSearch)
        break
      case 'UseXAndYCoordinates':
        navigate(orgManageLocationsUrls.search.xyCoordinatesSearch)
        break
      case 'DropAPinOnAMap':
        //ToDo add in when pin drop URls made
        navigate('/')
        break
        default:
          break
    }
  }

  return (
    <LocationOptionsLayout
      heading={`How do you want to find ${locationName}?`}
      searchOptions={searchOptions}
      errorMessage='Select how you want to find this location'
      navigateToNextPage={navigateToNextPage}
    />
  )
}
