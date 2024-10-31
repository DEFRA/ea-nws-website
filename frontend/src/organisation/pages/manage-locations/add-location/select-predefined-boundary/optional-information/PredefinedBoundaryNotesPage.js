import React from 'react'
import { useNavigate } from 'react-router-dom'
import NotesLayout from '../../../../../layouts/location/add-or-edit-location/optional-information/NotesLayout'
import { orgManageLocationsUrls } from '../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function PredefinedBoundaryNotesPage() {
  const navigate = useNavigate()

  const NavigateToNextPage = () => {
    navigate(orgManageLocationsUrls.add.search.dropPinSearchResults)
  }

  return <NotesLayout flow='' NavigateToNextPage={NavigateToNextPage} />
}
