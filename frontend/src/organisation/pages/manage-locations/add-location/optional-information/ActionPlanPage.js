import React, { useState } from 'react'
import ActionPlanLayout from '../../../../layouts/optional-info/ActionPlanLayout'
import updateLocationAndNavigate from '../../updateLocationAndNavigate'

export default function ActionPlanPage () {
  const [error, setError] = useState(null)

  const navigateToNextPage = updateLocationAndNavigate(setError)

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
