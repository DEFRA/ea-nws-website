import { React, useState } from 'react'
import { Helmet } from 'react-helmet'
import NotesLayout from '../../../../../../layouts/optional-info/NotesLayout'
import updateLocationAndNavigate from '../../../../updateLocationAndNavigate'

export default function NotesPage () {
  const [error, setError] = useState(null)

  const navigateToNextPage = updateLocationAndNavigate(
    setError,
    'Notes changed'
  )

  return (
    <>
      <Helmet>
        <title>Edit Notes - Next Warning Service GOV.UK</title>
      </Helmet>
      <NotesLayout
        navigateToNextPage={navigateToNextPage}
        keywordType='location'
        error={error}
        setError={setError}
      />
    </>
  )
}
