import { React, useState } from 'react'
import { Helmet } from 'react-helmet'
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
      <Helmet>
        <title>Edit Key Information - Next Warning Service GOV.UK</title>
      </Helmet>
      <KeyInformationLayout
        flow='edit'
        navigateToNextPage={navigateToNextPage}
        error={error}
      />
    </>
  )
}
