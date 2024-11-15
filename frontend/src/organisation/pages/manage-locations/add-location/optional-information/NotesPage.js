import React from 'react'
import { useNavigate } from 'react-router'
import NotesLayout from '../../../../layouts/optional-info/NotesLayout'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'

export default function AddNotesPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    // TODO: Navigate to correct destination when available.
    //       Notes test will need updating afterwards.
    navigate(orgManageLocationsUrls.add.predefinedBoundary.addAnother)
  }

  const instructionText = (
    <>
      Any notes that may be helpful to someone not familiar with this location.
    </>
  )

  return (
    <>
      <NotesLayout
        navigateToNextPage={navigateToNextPage}
        keywordType='location'
        instructionText={instructionText}
      />
    </>
  )
}
