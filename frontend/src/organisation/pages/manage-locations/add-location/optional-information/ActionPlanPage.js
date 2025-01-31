import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import ActionPlanLayout from '../../../../layouts/optional-info/ActionPlanLayout'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'

export default function ActionPlanPage () {
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  const navigateToNextPage = async () => {
    navigate(orgManageLocationsUrls.view.viewLocation)
  }

  return (
    <>
      <ActionPlanLayout
        navigateToNextPage={navigateToNextPage}
        error={error}
        setError={setError}
      />
    </>
  )
}
