import React from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router'
import LinkLocationsLayout from '../../../../layouts/location/link-locations/LinkLocationsLayout'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'

export default function SelectNearbyFloodAreasPage () {
  const navigate = useNavigate()

  const navigateToNextPage = async () => {
    navigate(orgManageLocationsUrls.add.linkLocationToContacts)
  }

  const navigateToPreviousPage = () => {
    navigate(-1)
  }

  return (
    <>
      <Helmet>
        <title>Select nearby flood areas - Manage locations - Get flood warnings (professional) - GOV.UK</title>
      </Helmet>
      <LinkLocationsLayout
        navigateToPreviousPage={navigateToPreviousPage}
        navigateToNextPage={navigateToNextPage}
      />
    </>
  )
}
