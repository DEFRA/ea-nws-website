import React from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { getLocationAdditional } from '../../../../../../common/redux/userSlice'
import LocationOptionsLayout from '../../../../../layouts/location/add-or-edit-location/search/LocationSearchOptionsLayout'
import { orgManageLocationsUrls } from '../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function LocationSearchOptionsPage () {
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
        navigate(orgManageLocationsUrls.add.search.dropPinSearch)
        break
      default:
        break
    }
  }

  const info = (
    <p>
      If your location is a polygon, or a line, your organization has created
      you'll need to upload your location as a shapefile in a .zip file.
    </p>
  )

  const navigateToPreviousPage = () => {
    navigate(orgManageLocationsUrls.add.name)
  }

  return (
    <>
      <Helmet>
        <title>How do you want to find location? - GOV.UK</title>
      </Helmet>
      <LocationOptionsLayout
        heading={`How do you want to find ${locationName}?`}
        info={info}
        searchOptions={searchOptions}
        navigateToNextPage={navigateToNextPage}
        navigateToPreviousPage={navigateToPreviousPage}
      />
    </>
  )
}
