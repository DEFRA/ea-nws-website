import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { getLocationAdditional } from '../../../../../../../common/redux/userSlice'
import ActionPlanLayout from '../../../../../../layouts/optional-info/ActionPlanLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function ActionPlanPage () {
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const locationName = useSelector(
    (state) => getLocationAdditional(state, 'locationName')
  )

  const navigateToNextPage = () => {
    navigate(orgManageLocationsUrls.view.viewLocation, {
      state: { successMessage: `${locationName} action plan changed` }
    })
  }

  return (
    <>
      <ActionPlanLayout navigateToNextPage={navigateToNextPage} error={error} setError={setError} />
    </>
  )
}
