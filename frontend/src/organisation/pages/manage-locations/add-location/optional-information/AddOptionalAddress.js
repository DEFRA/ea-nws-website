import React from 'react'
import { useNavigate } from 'react-router'
import AddressLayout from '../../../../layouts/location/add-or-edit-location/optional-information/AddressLayout'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'

export default function AddOptionalAddress() {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate(orgManageLocationsUrls.add.optionalInformation.addKeyInformation)
  }

  return (
    <>
      <AddressLayout navigateToNextPage={navigateToNextPage} />
    </>
  )
}
