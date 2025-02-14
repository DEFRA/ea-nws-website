import { React, useState } from 'react'
import KeyInformationLayout from '../../../../../../layouts/optional-info/KeyInformationLayout'
import updateLocationAndNavigate from '../../../../updateLocationAndNavigate'

export default function KeyInformationPage () {
  const [error, setError] = useState(null)

  const navigateToNextPage = updateLocationAndNavigate(
    setError,
    'Key information changed'
  )

  return (
    <>
      <KeyInformationLayout
        flow='edit'
        navigateToNextPage={navigateToNextPage}
        error={error}
      />
    </>
  )
}
