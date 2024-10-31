import React from 'react'
import { useNavigate } from 'react-router-dom'
import ActionPlanLayout from '../../../../../layouts/location/add-or-edit-location/optional-information/ActionPlanLayout'
import { orgManageLocationsUrls } from '../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function PredefinedBoundaryNotesPage() {
  const navigate = useNavigate()

  const NavigateToNextPage = () => {
    navigate(orgManageLocationsUrls.add.search.dropPinSearchResults)
  }

  return <ActionPlanLayout flow='' NavigateToNextPage={NavigateToNextPage} />
}
