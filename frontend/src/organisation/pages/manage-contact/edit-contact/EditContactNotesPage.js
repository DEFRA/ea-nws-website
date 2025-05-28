import { React, useState } from 'react'
import { Helmet } from 'react-helmet'
import NotesLayout from '../../../layouts/optional-info/NotesLayout'
import UpdateContactAndNavigate from '../UpdateContactAndNavigate'

export default function EditContactNotesPage () {
  const [error, setError] = useState('')

  const navigateToNextPage = UpdateContactAndNavigate(setError, 'Notes changed')

  const instructionText = (
    <>
      Any notes that may be helpful to someone not familiar with this person or
      why they need to get flood messages.
    </>
  )

  return (
    <>
      <Helmet>
        <title>Edit User Notes - GOV.UK</title>
      </Helmet>
      <NotesLayout
        navigateToNextPage={navigateToNextPage}
        keywordType='contact'
        instructionText={instructionText}
        buttonText='Add note'
        error={error}
        setError={setError}
      />
    </>
  )
}
