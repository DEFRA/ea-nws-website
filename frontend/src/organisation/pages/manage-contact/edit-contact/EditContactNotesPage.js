import { React, useState } from 'react'
import NotesLayout from '../../../layouts/optional-info/NotesLayout'
import UpdateContactAndNavigate from '../UpdateContactAndNavigate'

export default function EditContactNotesPage () {
  const [error, setError] = useState('')

  const navigateToNextPage = UpdateContactAndNavigate(
    setError,
    'Contact notes changed'
  )

  const instructionText = (
    <>
      Any notes that may be helpful to someone not familiar with this person or
      why they need to get flood messages.
    </>
  )

  return (
    <>
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
