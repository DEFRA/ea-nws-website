import React from 'react'
import { useNavigate } from 'react-router-dom'
import NotesLayout from '../../../layouts/optional-info/NotesLayout'
export default function AddContactNotesPage () {
  const navigate = useNavigate()

  const NavigateToNextPage = () => {
    // TODO navigate to link locations
    navigate('/')
  }

  const instructionText = (
    <>
      Any notes that may be helpful to someone not familiar with this person or
      why they need to get flood messages.
    </>
  )

  return (
    <>
      <NotesLayout
        navigateToNextPage={NavigateToNextPage}
        keywordType='contact'
        instructionText={instructionText}
        buttonText='Add contact'
      />
    </>
  )
}
