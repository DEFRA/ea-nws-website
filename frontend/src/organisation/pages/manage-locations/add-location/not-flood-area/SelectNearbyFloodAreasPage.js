import React from 'react'
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
      <LinkLocationsLayout
        navigateToPreviousPage={navigateToPreviousPage}
        navigateToNextPage={navigateToNextPage}
      />
    </>
  )
}
