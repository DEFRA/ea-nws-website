import React from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import DropPinOnMapLayout from '../../../../../../layouts/location/add-or-edit-location/search/drop-pin/DropPinOnMapLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function DropPinOnMapPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate(orgManageLocationsUrls.add.optionalInformation.optionalInfo)
  }

  const navigateToDropPinLocationSearchPage = () => {
    navigate(orgManageLocationsUrls.add.search.dropPinSearchResults)
  }

  const navigateToNotInEnglandPage = () => {
    navigate(orgManageLocationsUrls.add.error.dropPinNotInEngland)
  }

  return (
    <>
      <Helmet>
        <title>Find location on a map - GOV.UK</title>
      </Helmet>
      <DropPinOnMapLayout
        navigateToNextPage={navigateToNextPage}
        navigateToDropPinLocationSearchPage={navigateToDropPinLocationSearchPage}
        navigateToNotInEnglandPage={navigateToNotInEnglandPage}
      />
    </>
  )
}
