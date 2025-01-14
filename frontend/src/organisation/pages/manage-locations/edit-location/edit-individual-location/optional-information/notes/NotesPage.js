import React from 'react'
import { useNavigate } from 'react-router'
import NotesLayout from '../../../../../../layouts/optional-info/NotesLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function NotesPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate(orgManageLocationsUrls.view.viewLocation, {
      state: { successMessage: 'Notes changed' }
    })
  }

  return (
    <>
      <NotesLayout
        navigateToNextPage={navigateToNextPage}
        keywordType='location'
      />
    </>
  )
}
