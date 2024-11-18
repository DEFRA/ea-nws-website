import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { getLocationAdditional } from '../../../../../../common/redux/userSlice'
import LocationOptionsLayout from '../../../../../layouts/location/add-or-edit-location/search/LocationSearchOptionsLayout'
import { orgManageLocationsUrls } from '../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function AddLocationSearchOptionsPage () {
  const navigate = useNavigate()

  const locationName = useSelector(
    (state) => getLocationAdditional(state, 'locationName')
  )
  const searchOptions = [
    { label: 'Use a postcode', value: 'UseAPostcode' },
    { label: 'Use X and Y coordinates', value: 'UseXAndYCoordinates' },
    { label: 'Drop a pin on a map', value: 'DropAPinOnAMap' }
  ]

  const navigateToNextPage = (searchOption) => {
    switch (searchOption) {
      case 'UseAPostcode':
        navigate(orgManageLocationsUrls.add.search.postCodeSearch)
        break
      case 'UseXAndYCoordinates':
        navigate(orgManageLocationsUrls.add.search.xyCoordinatesSearch)
        break
      case 'DropAPinOnAMap':
        // ToDo add in when pin drop URls made
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
      navigateToNextPage={navigateToNextPage}
    />
  )
}
