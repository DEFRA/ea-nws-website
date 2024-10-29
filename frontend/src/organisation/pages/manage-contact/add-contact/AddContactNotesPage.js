import React from 'react'
import { useNavigate } from 'react-router-dom'
import AddNotesLayout from '../../../../layouts/additional-info/AddNotesLayout'
export default function AddContactNotesPage() {
  const navigate = useNavigate()

  const NavigateToNextPage = () => {
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
      <AddNotesLayout
        NavigateToNextPage={NavigateToNextPage}
        KeywordType={'contact'}
        InstructionText={instructionText}
      />
    </>
  )
}
