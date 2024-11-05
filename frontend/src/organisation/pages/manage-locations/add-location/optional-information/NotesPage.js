import React from 'react'
import { useNavigate } from 'react-router'
import NotesLayout from '../../../../layouts/optional-info/NotesLayout'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'

export default function AddNotesPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate(orgManageLocationsUrls.add.predefinedBoundary.addAnother)
  }

  return (
    <>
      <NotesLayout navigateToNextPage={navigateToNextPage} />
    </>
  )
}
