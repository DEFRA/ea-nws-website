import { React, useState } from 'react'
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
      <NotesLayout
        navigateToNextPage={navigateToNextPage}
        keywordType='location'
        error={error}
        setError={setError}
      />
    </>
  )
}
