import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import NotesLayout from '../../../../../../layouts/optional-info/NotesLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function NotesPage () {
  const navigate = useNavigate()
  const locationName = useSelector(
    (state) =>
      state.session.currentLocation.meta_data.location_additional.location_name
  )

  const navigateToNextPage = () => {
    navigate(orgManageLocationsUrls.view.individualLocation, {
      state: { successMessage: `${locationName} notes changed` }
    })
  }

  return (
    <>
      <NotesLayout navigateToNextPage={navigateToNextPage} />
    </>
  )
}
