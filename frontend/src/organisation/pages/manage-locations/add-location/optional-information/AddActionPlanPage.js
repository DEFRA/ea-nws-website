import React from 'react'
import { useNavigate } from 'react-router'
import ActionPlanLayout from '../../../../layouts/location/add-or-edit-location/optional-information/ActionPlanLayout'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'

export default function ActionPlanPage() {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate(orgManageLocationsUrls.add.optionalInformation.addNotes)
  }

  return (
    <>
      <ActionPlanLayout navigateToNextPage={navigateToNextPage} />
    </>
  )
}
