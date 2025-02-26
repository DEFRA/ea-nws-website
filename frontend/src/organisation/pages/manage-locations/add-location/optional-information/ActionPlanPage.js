import React, { useState } from 'react'
import ActionPlanLayout from '../../../../layouts/optional-info/ActionPlanLayout'
import updateLocationAndNavigate from '../../updateLocationAndNavigate'
import { useVerifyLocationInFloodArea } from '../not-flood-area/verfiyLocationInFloodAreaAndNavigate'

export default function ActionPlanPage() {
  const verfiyLocationInFloodAreaAndNavigate = useVerifyLocationInFloodArea()
  const [error, setError] = useState(null)

  // update this to be verify location not in flood area and navigate function
  let navigateToNextPage = updateLocationAndNavigate(setError)

  //only do this if location is xy coord, boundarys are exempt and shape file uploads
  // dont have have optional information
  navigateToNextPage = verfiyLocationInFloodAreaAndNavigate()

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
