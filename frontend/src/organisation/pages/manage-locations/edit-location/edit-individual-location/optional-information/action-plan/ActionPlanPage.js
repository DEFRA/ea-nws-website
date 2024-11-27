import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import ActionPlanLayout from '../../../../../../layouts/optional-info/ActionPlanLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function ActionPlanPage() {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate(orgManageLocationsUrls.view.viewLocation, {
      state: { successMessage: 'Action plan changed' }
    })
  }

  return (
    <>
      <ActionPlanLayout navigateToNextPage={navigateToNextPage} />
    </>
  )
}
