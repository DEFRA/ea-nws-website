import React from 'react'
import { useNavigate } from 'react-router-dom'
import AddNotesLayout from '../../../../layouts/optional-info/AddNotesLayout'
export default function AddNotesPage() {
  const navigate = useNavigate()

  const NavigateToNextPage = () => {
    navigate('/')
  }

  const instructionText = (
    <>
      Any notes that may be helpful to someone not familiar with this location.
    </>
  )

  return (
    <>
      <AddNotesLayout
        NavigateToNextPage={NavigateToNextPage}
        KeywordType={'location'}
        InstructionText={instructionText}
      />
    </>
  )
}
