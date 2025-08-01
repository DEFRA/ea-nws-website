import { React, useState } from 'react'
import { Helmet } from 'react-helmet'
import ActionPlanLayout from '../../../../../../layouts/optional-info/ActionPlanLayout'
import updateLocationAndNavigate from '../../../../updateLocationAndNavigate'

export default function ActionPlanPage () {
  const [error, setError] = useState(null)

  const navigateToNextPage = updateLocationAndNavigate(
    setError,
    'Action plan changed'
  )

  return (
    <>
      <Helmet>
        <title>Edit this location's action plan - Manage locations - Get flood warnings (professional) - GOV.UK</title>
      </Helmet>
      <ActionPlanLayout
        navigateToNextPage={navigateToNextPage}
        error={error}
        setError={setError}
      />
    </>
  )
}
