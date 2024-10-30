import React from 'react'
import { useNavigate } from 'react-router'
import ActionPlanLayout from '../../../../../../../layouts/location/add-or-edit-location/optional-information/ActionPlanLayout'
import { orgManageLocationsUrls } from '../../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function AddOrEditActionPlanPage() {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate(orgManageLocationsUrls.view.individualLocation.view)
  }

  return (
    <>
      <ActionPlanLayout flow={'edit'} navigateToNextPage={navigateToNextPage} />
    </>
  )
}
