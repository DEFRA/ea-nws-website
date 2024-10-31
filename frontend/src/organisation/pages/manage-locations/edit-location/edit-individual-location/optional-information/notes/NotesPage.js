import React from 'react'
import { useNavigate } from 'react-router'
import NotesLayout from '../../../../../../layouts/location/add-or-edit-location/optional-information/NotesLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function NotesPage() {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate(orgManageLocationsUrls.view.individualLocation)
  }

  return (
    <>
      <NotesLayout flow={'edit'} navigateToNextPage={navigateToNextPage} />
    </>
  )
}
