import React from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router'
import LocationSearchOptionsLayout from '../../../../../layouts/location/add-or-edit-location/search/LocationSearchOptionsLayout'
import { orgManageLocationsUrls } from '../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function LocationSearchOptionsPage () {
  const navigate = useNavigate()
  const locationOptions = [
    { value: 'Coordinates', label: 'Use X and Y coordinates' },
    { value: 'PinDrop', label: 'Drop a pin on a map' }
  ]

  const navigateToNextPage = (searchOption) => {
    switch (searchOption) {
      case 'Coordinates':
        navigate(
          orgManageLocationsUrls.edit.individualLocation.location.xyCoords
            .search
        )
        break
      case 'PinDrop':
        navigate(
          orgManageLocationsUrls.edit.individualLocation.location.dropPin.drop
        )
        break
      default:
        break
    }
  }

  const additionalInfo = (
    <p>
      If you change the X and Y coordinates for this location the address
      associated with it will still match the X and Y coordinates previously
      provided.
      <br />
      <br />
      If this is not the address you want associated with this location you'll
      need to change the address manually.
    </p>
  )

  const navigateToPreviousPage = () => {
    navigate(orgManageLocationsUrls.view.viewLocation)
  }

  return (
    <>
      <Helmet>
        <title>Location Search Options - GOV.UK</title>
      </Helmet>
      <LocationSearchOptionsLayout
        heading='How do you want to change the existing location?'
        additionalInfo={additionalInfo}
        searchOptions={locationOptions}
        navigateToNextPage={navigateToNextPage}
        navigateToPreviousPage={navigateToPreviousPage}
      />
    </>
  )
}
