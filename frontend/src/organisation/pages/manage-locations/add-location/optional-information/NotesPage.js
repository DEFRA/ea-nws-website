import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import NotesLayout from '../../../../layouts/optional-info/NotesLayout'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'

export default function AddNotesPage () {
  const navigate = useNavigate()
  const predefinedBoundaryFlow = useSelector(
    (state) => state.session.predefinedBoundaryFlow
  )

  const navigateToNextPage = () => {
    if (predefinedBoundaryFlow) {
      navigate(orgManageLocationsUrls.add.predefinedBoundary.addAnother)
    }
    // TODO: add 'else if' for other flows as needed
  }

  return (
    <>
      <NotesLayout navigateToNextPage={navigateToNextPage} />
    </>
  )
}
