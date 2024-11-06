import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import ActionPlanLayout from '../../../../../../layouts/optional-info/ActionPlanLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function ActionPlanPage () {
  const navigate = useNavigate()
  const locationName = useSelector(
    (state) =>
      state.session.currentLocation.meta_data.location_additional.location_name
  )

  const navigateToNextPage = () => {
    navigate(orgManageLocationsUrls.view.individualLocation, {
      state: { successMessage: `${locationName} action plan changed` }
    })
  }

  return (
    <>
      <ActionPlanLayout navigateToNextPage={navigateToNextPage} />
    </>
  )
}
